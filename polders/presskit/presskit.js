// POLDERS press kit: media gallery, inspector, bulk download.
// To add assets: drop the original in files/, a ~1400px webp preview in img/, and add an entry below.
(function () {
    const MEDIA = [
        {
            id: 'screenshots', title: 'Screenshots', wide: true,
            note: 'In-game screenshots at 1920 × 1080, the same set as on Steam.',
            items: [
                { name: 'Oudehaven from the water', file: 'files/screenshots/POLDERS_Screenshot_01.jpg', preview: 'img/screenshot_01.webp', w: 1920, h: 1080, size: 498918 },
                { name: 'Building a loam house', file: 'files/screenshots/POLDERS_Screenshot_02.jpg', preview: 'img/screenshot_02.webp', w: 1920, h: 1080, size: 408602 },
                { name: 'Farmland behind the dike', file: 'files/screenshots/POLDERS_Screenshot_03.jpg', preview: 'img/screenshot_03.webp', w: 1920, h: 1080, size: 384234 },
                { name: 'Canals and windmills', file: 'files/screenshots/POLDERS_Screenshot_04.jpg', preview: 'img/screenshot_04.webp', w: 1920, h: 1080, size: 504828 },
                { name: 'Dike Master, a special request', file: 'files/screenshots/POLDERS_Screenshot_05.jpg', preview: 'img/screenshot_05.webp', w: 1920, h: 1080, size: 244394 },
                { name: 'Oudehaven by night', file: 'files/screenshots/POLDERS_Screenshot_06.jpg', preview: 'img/screenshot_06.webp', w: 1920, h: 1080, size: 279455 },
                { name: 'The town square', file: 'files/screenshots/POLDERS_Screenshot_07.jpg', preview: 'img/screenshot_07.webp', w: 1920, h: 1080, size: 376606 },
            ],
        },
        {
            id: 'keyart', title: 'Key art', wide: true,
            note: 'Official key art in full resolution, with and without logo.',
            items: [
                { name: 'Key art', file: 'files/POLDERS_Keyart.png', preview: 'img/keyart.webp', w: 2874, h: 1608, size: 4173406 },
                { name: 'Key art, no logo', file: 'files/POLDERS_Keyart_NoLogo.png', preview: 'img/keyart_nologo.webp', w: 2874, h: 1608, size: 4278986 },
                { name: 'Key art, 1920 × 1080', file: 'files/POLDERS_Keyart_1920x1080.png', preview: 'img/keyart_1080.webp', w: 1920, h: 1080, size: 2171318 },
            ],
        },
        {
            id: 'logo', title: 'Logo & icon', alpha: true,
            note: 'Transparent PNGs. Please keep the logo white on darker backgrounds.',
            items: [
                { name: 'Logo, A Dutch City Builder', file: 'files/POLDERS_Logo.png', preview: 'img/logo.webp', w: 2000, h: 1500, size: 286083 },
                { name: 'Windmill icon', file: 'files/POLDERS_Icon_Windmill.png', preview: 'img/icon.webp', w: 470, h: 657, size: 22937 },
            ],
        },
        {
            id: 'layers', title: 'Layered key art', alpha: true,
            note: 'Every layer of the key art as a full-canvas transparent PNG (2874 × 1608), so they stack back together perfectly. Made for parallax, reframing and motion. The original PSD is included.',
            items: [
                { name: 'Sky', file: 'files/layers/POLDERS_Layer_01_sky.png', preview: 'img/layer_01_sky.webp', w: 2874, h: 1608, size: 2054240, full: true },
                { name: 'Town & water', file: 'files/layers/POLDERS_Layer_02_town_water.png', preview: 'img/layer_02_town_water.webp', w: 2874, h: 1608, size: 2548676, full: true },
                { name: 'Boat', file: 'files/layers/POLDERS_Layer_03_boat.png', preview: 'img/layer_03_boat.webp', w: 2874, h: 1608, size: 71763 },
                { name: 'Quay', file: 'files/layers/POLDERS_Layer_04_quay.png', preview: 'img/layer_04_quay.webp', w: 2874, h: 1608, size: 268308 },
                { name: 'Crates & barrels', file: 'files/layers/POLDERS_Layer_05_crates.png', preview: 'img/layer_05_crates.webp', w: 2874, h: 1608, size: 459909 },
                { name: 'Tulips', file: 'files/layers/POLDERS_Layer_06_tulips.png', preview: 'img/layer_06_tulips.webp', w: 2874, h: 1608, size: 137814 },
                { name: 'Dike Master', file: 'files/layers/POLDERS_Layer_07_dike_master.png', preview: 'img/layer_07_dike_master.webp', w: 2874, h: 1608, size: 32518 },
                { name: 'Logo: windmill', file: 'files/layers/POLDERS_Layer_08_logo_windmill.png', preview: 'img/layer_08_logo_windmill.webp', w: 2874, h: 1608, size: 40388 },
                { name: 'Logo: wordmark', file: 'files/layers/POLDERS_Layer_09_logo_wordmark.png', preview: 'img/layer_09_logo_wordmark.webp', w: 2874, h: 1608, size: 41787 },
                { name: 'Logo: tagline', file: 'files/layers/POLDERS_Layer_10_logo_tagline.png', preview: 'img/layer_10_logo_tagline.webp', w: 2874, h: 1608, size: 24412 },
                { name: 'Layered key art (PSD)', file: 'files/POLDERS_Keyart_Layered.psd', preview: 'img/keyart_nologo.webp', w: 2874, h: 1608, size: 23208431, badge: 'PSD', opaque: true },
            ],
        },
    ];

    const $ =(s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => [...el.querySelectorAll(s)];
    const all = MEDIA.flatMap((g) => g.items.map((it) => ({ ...it, group: g })));
    const mb = (b) => (b >= 1e6 ? (b / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1e3)) + ' kB');
    const ext = (f) => f.split('.').pop().toUpperCase();
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const total = all.reduce((a, it) => a + it.size, 0);

    /* ------------------------------------------------------------ gallery */
    $('#gallery').innerHTML = MEDIA.map((g) => {
        const size = g.items.reduce((a, it) => a + it.size, 0);
        return `<div class="group" id="g-${g.id}">
            <header class="group-head"><h3>${g.title}</h3><p>${g.note}</p>
            <button class="btn sm" data-zip="${g.id}"><span class="ico">↓</span> ${g.items.length} files · ${mb(size)}</button></header>
            <div class="grid${g.wide ? ' wide' : ''}">${g.items.map((it) => {
                const i = all.findIndex((a) => a.file === it.file);
                const alpha = g.alpha && !it.opaque;
                return `<figure class="tile${alpha ? ' alpha' : ''}${it.full ? ' full' : ''}" data-i="${i}">
                    <button class="pick" data-pick="${i}" aria-label="Select ${esc(it.name)}"></button>
                    ${it.badge ? `<span class="badge">${it.badge}</span>` : ''}
                    <button class="frame" data-open="${i}" aria-label="Inspect ${esc(it.name)}"><img src="${it.preview}" alt="${esc(it.name)}" loading="lazy"></button>
                    <figcaption><div class="cap"><b>${esc(it.name)}</b><span>${ext(it.file)} · ${it.w} × ${it.h} · ${mb(it.size)}</span></div>
                    <a class="dl" href="${it.file}" download title="Download ${esc(it.name)}">↓</a></figcaption>
                </figure>`;
            }).join('')}</div></div>`;
    }).join('');
    $$('[data-total]').forEach((el) => (el.textContent = mb(total)));

    /* ------------------------------------------------------------ selection */
    const picked = new Set();
    function syncSel() {
        $$('.tile').forEach((t) => t.classList.toggle('sel', picked.has(+t.dataset.i)));
        const n = picked.size;
        const size = [...picked].reduce((a, i) => a + all[i].size, 0);
        $('#selCount').textContent = n ? `${n} selected · ${mb(size)}` : 'Select files to download them together';
        $('#selZip').hidden = $('#selClear').hidden = !n;
        $('#gallery').classList.toggle('selecting', n > 0);
    }
    document.addEventListener('click', (e) => {
        const p = e.target.closest('[data-pick]');
        if (p) {
            const i = +p.dataset.pick;
            picked.has(i) ? picked.delete(i) : picked.add(i);
            syncSel();
        }
    });
    $('#selClear').addEventListener('click', () => { picked.clear(); syncSel(); });
    $('#selZip').addEventListener('click', (e) => zip([...picked].map((i) => all[i]), 'POLDERS_presskit_selection.zip', e.currentTarget));

    /* ------------------------------------------------------------ zip */
    document.addEventListener('click', (e) => {
        const b = e.target.closest('[data-zip]');
        if (!b) return;
        const id = b.dataset.zip;
        const items = id === 'all' ? all : all.filter((it) => it.group.id === id);
        zip(items, id === 'all' ? 'POLDERS_presskit.zip' : `POLDERS_${id}.zip`, b);
    });

    let zipping = false;
    async function zip(items, name, btn) {
        if (zipping || !items.length) return;
        if (!window.JSZip) return toast('Download library still loading, try again in a moment');
        zipping = true;
        const label = btn.innerHTML;
        btn.disabled = true;
        try {
            const z = new JSZip();
            let done = 0;
            const bytes = items.reduce((a, it) => a + it.size, 0);
            for (const it of items) {
                const res = await fetch(it.file);
                if (!res.ok) throw new Error(it.file);
                const folder = items.length > 1 && new Set(items.map((x) => x.group.id)).size > 1 ? it.group.title.replace(/[^\w]+/g, '_') + '/' : '';
                z.file(folder + it.file.split('/').pop(), await res.blob(), { binary: true });
                done += it.size;
                btn.innerHTML = `<span class="ico">↓</span> ${Math.round((done / bytes) * 100)}%`;
            }
            // Images are already compressed: STORE keeps it instant.
            const blob = await z.generateAsync({ type: 'blob', compression: 'STORE' });
            const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: name });
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(a.href), 10000);
            toast(`${items.length} file${items.length > 1 ? 's' : ''} zipped · ${mb(blob.size)}`);
        } catch (err) {
            console.error(err);
            toast('Download failed, please try again');
        } finally {
            zipping = false;
            btn.disabled = false;
            btn.innerHTML = label;
        }
    }

    /* ------------------------------------------------------------ lightbox */
    const lb = $('#lb'), stage = $('#lbStage'), img = $('#lbImg');
    let cur = 0, z = 1, fitZ = 1, tx = 0, ty = 0, drag = null;

    function open(i) {
        cur = (i + all.length) % all.length;
        const it = all[cur];
        stage.classList.toggle('alpha', !!it.group.alpha && !it.opaque);
        $('#lbTitle').textContent = it.name;
        $('#lbMeta').textContent = `${it.group.title} · ${ext(it.file)} · ${it.w} × ${it.h} · ${mb(it.size)}`;
        $('#lbDl').href = it.file;
        lb.hidden = false;
        document.body.style.overflow = 'hidden';
        // Show the preview at once, then swap in the full-resolution file for raster images.
        img.onload = null;
        img.src = it.preview;
        const full = /\.(png|jpe?g|webp)$/i.test(it.file) ? it.file : null;
        img.onload = () => {
            fit();
            if (full && img.src.indexOf(it.preview) !== -1) {
                const hi = new Image();
                hi.onload = () => { if (all[cur] === it) { const keep = { z: z / fitZ, tx, ty }; img.onload = null; img.src = full; fitTo(hi, keep); } };
                hi.src = full;
            }
        };
    }
    function size(el) { return [el.naturalWidth || 1, el.naturalHeight || 1]; }
    function fit() {
        const [w, h] = size(img);
        const r = stage.getBoundingClientRect();
        fitZ = z = Math.min((r.width - 80) / w, (r.height - 60) / h, 4);
        tx = -w * z / 2; ty = -h * z / 2;
        apply();
    }
    function fitTo(hi, keep) {
        // Keep the current view when the larger file replaces the preview.
        const [w, h] = [hi.naturalWidth, hi.naturalHeight];
        const r = stage.getBoundingClientRect();
        const nf = Math.min((r.width - 80) / w, (r.height - 60) / h, 4);
        const ratio = (nf * keep.z) / z;
        fitZ = nf; z = nf * keep.z;
        tx = keep.tx * ratio; ty = keep.ty * ratio;
        apply();
    }
    function apply() { img.style.transform = `translate(${tx}px, ${ty}px) scale(${z})`; }
    function zoomAt(f, cx, cy) {
        const r = stage.getBoundingClientRect();
        const px = cx - r.left - r.width / 2, py = cy - r.top - r.height / 2;
        const nz = Math.min(Math.max(z * f, fitZ * 0.5), Math.max(fitZ * 12, 2));
        const k = nz / z;
        tx = px - (px - tx) * k; ty = py - (py - ty) * k; z = nz;
        apply();
    }
    function close() { lb.hidden = true; document.body.style.overflow = ''; img.removeAttribute('src'); }

    document.addEventListener('click', (e) => { const o = e.target.closest('[data-open]'); if (o) open(+o.dataset.open); });
    $('#lbClose').onclick = close;
    $('#lbPrev').onclick = () => open(cur - 1);
    $('#lbNext').onclick = () => open(cur + 1);
    $('#lbFit').onclick = fit;
    const mid = () => { const r = stage.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
    $('#lbZoomIn').onclick = () => zoomAt(1.5, ...mid());
    $('#lbZoomOut').onclick = () => zoomAt(1 / 1.5, ...mid());
    stage.addEventListener('wheel', (e) => { e.preventDefault(); zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY); }, { passive: false });
    stage.addEventListener('dblclick', (e) => (z > fitZ * 1.05 ? fit() : zoomAt(2.5, e.clientX, e.clientY)));
    stage.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY, tx, ty }; stage.setPointerCapture(e.pointerId); stage.classList.add('drag'); });
    stage.addEventListener('pointermove', (e) => { if (!drag) return; tx = drag.tx + e.clientX - drag.x; ty = drag.ty + e.clientY - drag.y; apply(); });
    stage.addEventListener('pointerup', () => { drag = null; stage.classList.remove('drag'); });
    window.addEventListener('resize', () => { if (!lb.hidden) fit(); });
    document.addEventListener('keydown', (e) => {
        if (lb.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') open(cur - 1);
        else if (e.key === 'ArrowRight') open(cur + 1);
        else if (e.key === '+' || e.key === '=') zoomAt(1.5, ...mid());
        else if (e.key === '-') zoomAt(1 / 1.5, ...mid());
        else if (e.key === '0') fit();
    });

    /* ------------------------------------------------------------ copy text */
    document.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-copy]');
        if (!b) return;
        const text = $$(b.dataset.copy + ', ' + b.dataset.copy + ' p').filter((el) => !el.querySelector('p')).map((el) => el.innerText.trim()).join('\n\n');
        try {
            await navigator.clipboard.writeText(text);
            const t = b.textContent;
            b.textContent = 'Copied';
            b.classList.add('done');
            setTimeout(() => { b.textContent = t; b.classList.remove('done'); }, 1600);
        } catch { toast('Could not copy, select the text instead'); }
    });

    /* ------------------------------------------------------------ nav */
    const nav = $('#nav');
    const hero = $('.hero');
    const links = $$('.nav-links a');
    const secs = links.map((a) => $(a.getAttribute('href')));
    function onScroll() {
        nav.classList.toggle('on', window.scrollY > hero.offsetHeight - 120);
        let on = -1;
        secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 140) on = i; });
        links.forEach((a, i) => a.classList.toggle('on', i === on));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let toastT;
    function toast(msg) {
        const t = $('#toast');
        t.textContent = msg;
        t.hidden = false;
        clearTimeout(toastT);
        toastT = setTimeout(() => (t.hidden = true), 3000);
    }

    $('#year').textContent = new Date().getFullYear();
})();
