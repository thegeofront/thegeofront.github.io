(function () {
    const layers = [
        { el: document.querySelector('.hero .overlay-image'), depth: 12 },
        { el: document.querySelector('.hero canvas.clouds'), depth: 26 },
    ].filter(l => l.el);
    if (!layers.length) return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    for (const l of layers) {
        const pad = l.depth * 2;
        l.el.style.left = -pad + 'px';
        l.el.style.top = -pad + 'px';
        l.el.style.width = `calc(100% + ${2 * pad}px)`;
        l.el.style.height = `calc(100% + ${2 * pad}px)`;
        l.el.style.willChange = 'transform';
    }

    let targetX = 0, targetY = 0, curX = 0, curY = 0, ticking = false;

    window.addEventListener('mousemove', e => {
        targetX = (e.clientX / window.innerWidth) * 2 - 1;
        targetY = (e.clientY / window.innerHeight) * 2 - 1;
        if (!ticking) { ticking = true; requestAnimationFrame(tick); }
    });
    window.addEventListener('mouseleave', () => {
        targetX = 0; targetY = 0;
        if (!ticking) { ticking = true; requestAnimationFrame(tick); }
    });

    function tick() {
        curX += (targetX - curX) * 0.15;
        curY += (targetY - curY) * 0.15;
        for (const l of layers) {
            l.el.style.transform = `translate3d(${(-curX * l.depth).toFixed(2)}px, ${(-curY * l.depth).toFixed(2)}px, 0)`;
        }
        if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
            requestAnimationFrame(tick);
        } else {
            ticking = false;
        }
    }
})();
