(function () {
    const canvas = document.querySelector('canvas.clouds');
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true });
    if (!gl) { canvas.remove(); return; }

    const VERT = `
        attribute vec2 a_pos;
        void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const FRAG = `
        precision highp float;

        uniform vec2 u_res;
        uniform float u_time;
        uniform sampler2D u_noise;

        const float SPEED = 0.5;
        const float SCALE = 0.45;
        const float NOISE_WIDTH = 2.8;
        const float LAYERS = 5.0;
        const float FALLOFF = 2.6;

        const vec2 OVAL_RADII = vec2(0.57735, 0.33333);

        const vec4 COL_TOP = vec4(0.925, 0.905, 0.850, 0.2);
        const vec4 COL_MID = vec4(0.640, 0.700, 0.760, 0.5);
        const vec4 COL_BOTTOM = vec4(0.290, 0.390, 0.530, 1.0);
        const vec3 COL_RIM = vec3(0.980, 0.965, 0.930);
        const float DEPTH_RANGE = 1.2;

        const float NOISE_BOUND = 1.75;

        vec2 noise_ab(vec2 pa, vec2 pb) {
            float a = texture2D(u_noise, pa).r * 2.0 - 1.0;
            float b = texture2D(u_noise, pb).g * 2.0 - 1.0;
            return vec2(a, b) * NOISE_BOUND;
        }

        float noise_sum(vec3 p) {
            vec2 tc = p.xy * 0.1;
            vec2 ab = noise_ab(tc, tc * 1.37 + vec2(0.013, 0.05) * p.z);
            return mix(ab.x, ab.y, 0.4);
        }

        vec2 cloud(float dist, vec3 wp, float amp, float time, vec3 wind) {
            float v = 0.0;
            float hmean = 0.0;
            for (float i = 0.0; i < LAYERS; i += 1.0) {
                vec3 p = wp + wind * (i + time * 0.1);
                float h = dist + amp * noise_sum(p);
            #ifdef HAS_DERIVATIVES
                float w = fwidth(h) * 0.75;
            #else
                float w = 0.006;
            #endif
                v += smoothstep(0.4 + w, 0.4 - w, h) / LAYERS;
                hmean += h / LAYERS;
            }
            float depth = clamp((0.4 - hmean) / DEPTH_RANGE, 0.0, 1.0);
            return vec2(v, depth);
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / u_res;
            float aspect = u_res.x / u_res.y;

            vec2 q = (uv - 0.5) / OVAL_RADII;
            float outside = length(q) - 1.0;

            float dist = 0.4 - outside * FALLOFF;

            float bottomMask = 1.0 - smoothstep(0.42, 0.5, uv.y);

            float amp = 0.15 * NOISE_WIDTH;
            vec3 wp = vec3(uv.x * aspect, uv.y, 0.0) * SCALE * 10.0;
            vec2 cd = cloud(dist, wp, amp, u_time * SPEED, vec3(-1.0, 0.3, 1.0));
            float v = cd.x * bottomMask;
            float depth = cd.y;

            if (v < 0.05) discard;

            vec4 body = mix(COL_TOP, COL_MID, smoothstep(0.0, 0.45, depth));
            body = mix(body, COL_BOTTOM, smoothstep(0.4, 1.0, depth));

            vec3 rgb = mix(COL_RIM, body.rgb, smoothstep(0.15, 0.8, v));

            float edge = smoothstep(0.05, 0.3, v);
            float alpha = edge * body.a;
            gl_FragColor = vec4(rgb * alpha, alpha);
        }
    `;

    function makeNoiseTexture(size) {
        const BASE_CELLS = 4, OCTAVES = 3;

        function gradientTable(period, seed) {
            const g = new Float32Array(period * period * 2);
            for (let y = 0; y < period; y++) {
                for (let x = 0; x < period; x++) {
                    let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 2246822519);
                    h = Math.imul(h ^ (h >>> 13), 1274126177);
                    h = (h ^ (h >>> 16)) >>> 0;
                    const a = (h / 4294967296) * Math.PI * 2;
                    g[(y * period + x) * 2] = Math.cos(a);
                    g[(y * period + x) * 2 + 1] = Math.sin(a);
                }
            }
            return g;
        }

        function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }

        function perlin(x, y, period, g) {
            const x0 = Math.floor(x), y0 = Math.floor(y);
            const fx = x - x0, fy = y - y0;
            const ix0 = x0 % period, iy0 = y0 % period;
            const ix1 = (ix0 + 1) % period, iy1 = (iy0 + 1) % period;
            const dot = (ix, iy, dx, dy) => {
                const k = (iy * period + ix) * 2;
                return g[k] * dx + g[k + 1] * dy;
            };
            const u = fade(fx), v = fade(fy);
            const n00 = dot(ix0, iy0, fx, fy);
            const n10 = dot(ix1, iy0, fx - 1, fy);
            const n01 = dot(ix0, iy1, fx, fy - 1);
            const n11 = dot(ix1, iy1, fx - 1, fy - 1);
            const n0 = n00 + u * (n10 - n00);
            const n1 = n01 + u * (n11 - n01);
            return (n0 + v * (n1 - n0)) * 1.414;
        }

        function field(seed) {
            const tables = [];
            for (let o = 0; o < OCTAVES; o++) tables.push(gradientTable(BASE_CELLS << o, seed + o));
            const out = new Float32Array(size * size);
            let maxAbs = 0;
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    let f = 0, amp = 1;
                    for (let o = 0; o < OCTAVES; o++) {
                        const cells = BASE_CELLS << o;
                        f += amp * perlin(x / size * cells, y / size * cells, cells, tables[o]);
                        amp *= 0.5;
                    }
                    out[y * size + x] = f;
                    if (Math.abs(f) > maxAbs) maxAbs = Math.abs(f);
                }
            }
            for (let i = 0; i < out.length; i++) out[i] /= maxAbs;
            return out;
        }

        const a = field(1), b = field(7);
        const data = new Uint8Array(size * size * 4);
        for (let i = 0; i < size * size; i++) {
            data[i * 4] = Math.round((a[i] * 0.5 + 0.5) * 255);
            data[i * 4 + 1] = Math.round((b[i] * 0.5 + 0.5) * 255);
            data[i * 4 + 2] = 0;
            data[i * 4 + 3] = 255;
        }
        return data;
    }

    function compile(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.error('clouds shader:', gl.getShaderInfoLog(s));
            return null;
        }
        return s;
    }

    const hasDerivatives = !!gl.getExtension('OES_standard_derivatives');
    const fragPrefix = hasDerivatives
        ? '#extension GL_OES_standard_derivatives : enable\n#define HAS_DERIVATIVES\n'
        : '';
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, fragPrefix + FRAG);
    if (!vs || !fs) { canvas.remove(); return; }

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('clouds program:', gl.getProgramInfoLog(prog));
        canvas.remove();
        return;
    }
    gl.useProgram(prog);

    const NOISE_SIZE = 512;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, NOISE_SIZE, NOISE_SIZE, 0, gl.RGBA, gl.UNSIGNED_BYTE, makeNoiseTexture(NOISE_SIZE));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(prog, 'u_noise'), 0);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 0.02, 1, 0.02]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const MAX_DPR = 1;
    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
        }
    }
    window.addEventListener('resize', resize);

    const start = performance.now();
    let running = true;
    document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
        if (running) requestAnimationFrame(frame);
    });

    const FRAME_MS = 1000 / 30;
    let last = 0;
    function frame(now) {
        if (!running) return;
        if (now - last < FRAME_MS) { requestAnimationFrame(frame); return; }
        last = now;
        resize();
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, (performance.now() - start) / 1000);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
})();
