gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true
});

function preloadImg(selector = "img") {
  return new Promise((resolve) => {
    imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
  });
}


preloadImg(".img__or__svg").then(() => {   
    lenisInitStart();
}).catch(err => {
    console.warn("Aviso: Algumas imagens falharam, iniciando GSAP mesmo assim.", err);
    lenisInitStart();
});

function lenisInitStart() {
    const lenis = new Lenis({ 
        duration: 1.2, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        smooth: true, 
        direction: 'vertical', 
        gesturedirection: 'vertical', 
        smoothtouch: false, 
        smoothWheel: true,
        touchmultiplier: 2, 
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    window.lenis = lenis;
    window.ScrollTrigger = ScrollTrigger;

    gsap.ticker.add((time) => lenis.raf(time * 1000)); 
    gsap.ticker.lagSmoothing(0);

    const resizeObserver = new ResizeObserver(() => {
        if (window.lenis) {
            window.lenis.resize();
            window.ScrollTrigger.refresh();            
        }
    });
    resizeObserver.observe(document.body);

    let resizeTimer;
    window.addEventListener('resize', () => {
        if (window.lenis) window.lenis.resize();

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            if(window.telaExibicaoReferencia != window.telaModoExibicao){
                window.animations_update();            
                window.telaExibicaoReferencia = window.telaModoExibicao;
            }else{
                if (window.ScrollTrigger) window.ScrollTrigger.refresh();
            }
        }, 200);
    });

    window.addEventListener('load', () => {
        if (window.lenis) window.lenis.resize();
        
        if (window.experienciaPronta && window.formacaoPronta) {
            window.animations_update();
        }
    });
}