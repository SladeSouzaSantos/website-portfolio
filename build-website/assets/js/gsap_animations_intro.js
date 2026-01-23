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
        y: -30, opacity: 0, duration: 1, ease: "power2.in", delay: 1.5
    });
}

const introTL = gsap.timeline();

introTL
    .to(".header__logo, .header__menu__button, .header-mudar-tema", { autoAlpha: 1, duration: 0.5 })
    .from("#home div", { y: -100, autoAlpha: 0, duration: 1.5, ease: "power3.out" }, "<")
    .from("#home a svg use", { x: -200, duration: 1, ease: "back.out(1.7)" }, "-=0.5") 
    .from("label #icon-tema use", { x: 200, duration: 1, ease: "back.out(1.7)", onComplete: animateText }, "<");

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
    .from(".about__p__1", {
        y: -20,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.2
    }, "-=0.2")
    .from(".about__p__2", {
        y: -20,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.2
    }, "-=0.2")
    .from(".about__ul__1", {
        y: -20,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.2
    }, "-=0.2")
    .from(".about__p__3", {
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

gsap.from(".skills-layout-wrapper", {
    scrollTrigger: {
        trigger: ".skills-layout-wrapper",
        start: "top 80%",
    },
    y: 100,
    autoAlpha: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
});

gsap.from(".skill-toggle-group", {
    duration: 1,
    scale: 0.9,
    repeat: -1,
    yoyo: true
})