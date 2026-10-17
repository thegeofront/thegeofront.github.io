// Layered key-art parallax. Layers are `.scene .layer[data-depth]` elements (depth in px of travel);
// the cloud canvas, if present, rides along at its own depth. Mouse drives it on desktop, a slow drift
// on touch devices. A `.scene[data-scroll]` also separates the layers while scrolling (presskit hero).
(function () {
    const scene = document.querySelector('.scene');
    const layers = [...document.querySelectorAll('.scene .layer[data-depth]')].map(el => ({ el, depth: +el.dataset.depth }));
    const clouds = document.querySelector('.hero canvas.clouds');
    if (clouds) {
        const pad = 26 * 2;
        Object.assign(clouds.style, { left: -pad + 'px', top: -pad + 'px', width: `calc(100% + ${2 * pad}px)`, height: `calc(100% + ${2 * pad}px)` });
        layers.push({ el: clouds, depth: 26 });
    }

    // Reveal once the back layers are in (or after a short grace period).
    const root = document.body;
    const firstImgs = [...document.querySelectorAll('.scene .layer img')].slice(0, 2);
    let shown = false;
    const show = () => { if (!shown) { shown = true; requestAnimationFrame(() => root.classList.add('ready')); } };
    Promise.all(firstImgs.map(img => img.decode ? img.decode().catch(() => {}) : null)).then(show);
    setTimeout(show, 1200);
    window.addEventListener('load', show);

    if (!layers.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const touch = window.matchMedia('(hover: none)').matches;
    const scrollMode = scene && scene.hasAttribute('data-scroll');
    let targetX = 0, targetY = 0, curX = 0, curY = 0, scrollY = window.scrollY, running = false;
    const wake = () => { if (!running) { running = true; requestAnimationFrame(tick); } };

    if (!touch) {
        window.addEventListener('mousemove', e => {
            targetX = (e.clientX / window.innerWidth) * 2 - 1;
            targetY = (e.clientY / window.innerHeight) * 2 - 1;
            wake();
        });
        document.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; wake(); });
    }
    if (scrollMode) window.addEventListener('scroll', () => { scrollY = window.scrollY; wake(); }, { passive: true });

    let lastS = -1;
    function tick(t) {
        if (touch) {
            targetX = Math.sin(t / 4200) * 0.6;
            targetY = Math.sin(t / 5300) * 0.35;
        }
        curX += (targetX - curX) * 0.08;
        curY += (targetY - curY) * 0.08;
        const s = scrollMode ? Math.min(scrollY, window.innerHeight * 1.2) : 0;
        for (const l of layers) {
            const dy = -curY * l.depth + (scrollMode ? s * (0.5 - l.depth / 120) : 0);
            l.el.style.transform = `translate3d(${(-curX * l.depth).toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
        }
        // Idle when settled (touch devices keep drifting).
        const moving = touch || Math.abs(targetX - curX) > 0.0005 || Math.abs(targetY - curY) > 0.0005 || s !== lastS;
        lastS = s;
        if (moving) requestAnimationFrame(tick);
        else running = false;
    }
    wake();
})();
