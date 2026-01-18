// 1. REGISTRO E CONFIGURAÇÃO
gsap.registerPlugin(ScrollTrigger);

gsap.ticker.add((time) => {
    window.lenis?.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --- 2. LÓGICA DO TEXTO ROTATIVO ---
const texts = ["JAVA | SPRING", "REACT | Node.js", "DART | FLUTTER", "PYTHON | DJANGO", "JAVA | ANGULAR", "REACT | DJANGO"];
const textElement = document.getElementById("about-development-text");
let index = 0;

function animateText() {
    if (!textElement) return;
    const word = texts[index];
    textElement.textContent = word;

    const tl = gsap.timeline({
        onComplete: () => {
            index = (index + 1) % texts.length;            
            animateText();
        }
    });

    tl.fromTo(textElement, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
    ).to(textElement, {
        y: -30, opacity: 0, duration: 1, ease: "power2.in", delay: 2
    });
}

// --- 3. TIMELINE DE ENTRADA INICIAL (HERO SECTION) ---
const introTL = gsap.timeline();

introTL
    .to(".header__logo, .header__menu__button, .header-mudar-tema", { autoAlpha: 1, duration: 0.5 })
    .from("#home div", { y: -100, autoAlpha: 0, duration: 1.5, ease: "power3.out" }, "<")
    .from("#home a svg use", { x: -200, duration: 1, ease: "back.out(1.7)" }, "-=0.5") 
    .from("label #icon-tema use", { x: 200, duration: 1, ease: "back.out(1.7)", onComplete: animateText }, "<");

// --- 4. ANIMAÇÃO DA SEÇÃO ABOUT (SUBSTITUINDO O CSS) ---
const aboutTL = gsap.timeline({
    scrollTrigger: {
        trigger: ".about__group",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

aboutTL
    .from(".about__perfil", {
        scale: 0.9,
        y: -20,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out"
    })
    .from(".about__title", {
        y: -20,
        autoAlpha: 0,
        duration: 0.5
    }, "-=0.4")
    .from(".about__context p", {
        y: -20,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.2
    }, "-=0.2")
    .from(".about__icons", {
        y: 20,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.3");

// --- 5. ANIMAÇÕES DE REVELAÇÃO NO SCROLL RESTANTES ---

// Revelar as Skills
gsap.from(".skills-layout-wrapper", {
    scrollTrigger: {
        trigger: ".skills-layout-wrapper",
        start: "top 85%",
        toggleActions: "play none none none"
    },
    y: 100,
    autoAlpha: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
});

// Revelar Histórico de Experiência
gsap.from(".experiencia__container__historico", {
    scrollTrigger: {
        trigger: ".experiencia__container",
        start: "top 80%"
    },
    x: -50,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});

// Revelar Histórico de Formação
gsap.from(".formacao__container__historico", {
    scrollTrigger: {
        trigger: ".formacao__container",
        start: "top 80%"
    },
    x: 50,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});