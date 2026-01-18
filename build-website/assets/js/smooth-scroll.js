const lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
});

lenis.on('scroll', () => {
    if (typeof window.forceCarregaImagens === 'function') {
        window.forceCarregaImagens();
    }
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);