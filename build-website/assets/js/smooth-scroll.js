gsap.registerPlugin(ScrollTrigger);

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
        touchmultiplier: 2, 
    });

    function raf(time) { 
        lenis.raf(time); 
        requestAnimationFrame(raf); 
    } 
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    lenis.on('scroll', () => ScrollTrigger.update());

    
    window.lenis = lenis;
    window.ScrollTrigger = ScrollTrigger;

    gsap.ticker.add((time) => lenis.raf(time * 1000)); 
    gsap.ticker.lagSmoothing(0);

    gsap.ticker.add(() => {
        if (window.lenis) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            if (Math.round(docHeight) !== Math.round(window.lenis.limit)) {                
                window.lenis.resize();
                ScrollTrigger.refresh();
            }
        }
    });

    window.addEventListener('resize', () => {
        window.lenis.resize();
        if(window.telaExibicaoReferencia != window.telaModoExibicao){
            window.animations_update();            
            window.telaExibicaoReferencia = window.telaModoExibicao;
        }else{
            window.ScrollTrigger.refresh();
        }
    });

    window.addEventListener('load', () => {
        window.lenis.resize();
        window.animations_update();
    });
}