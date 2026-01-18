const menuIcon = document.querySelector(".header__menu__button");
const navMenu = document.querySelector(".header__navegation");

let icon = "menu.svg";
let mm = gsap.matchMedia();

// --- ADIÇÃO PARA SINCRONIA COM LENIS ---
// Garante que o GSAP use o tempo do Lenis para animações mais suaves
gsap.ticker.add((time) => {
    window.lenis?.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
// ---------------------------------------

const clearAnimatedMobile = () => {
    gsap.set([navMenu, menuIcon], { clearProps: "all" });
    // Usamos autoAlpha (mistura de opacity e visibility) para melhor performance
    gsap.to(navMenu, { autoAlpha: 0.9, visibility: "visible" });
};

mm.add("(max-width: 1058px)", (context) => {
    icon = "menu.svg";
    gsap.to(navMenu, { autoAlpha: 0, visibility: "hidden", duration: 0 });
    gsap.set(menuIcon, { "--menu-img": "url(../../assets/img/menu.svg)" });

    return () => {
        clearAnimatedMobile();
    }
});

function animatedIconMenu() {
    const timeLineMenu = gsap.timeline();
    icon = icon == "menu.svg" ? "fechar.svg" : "menu.svg";
    
    // Transformamos em timeline para evitar callbacks aninhados (callback hell)
    timeLineMenu.to(menuIcon, {
        scale: 0.001,
        rotation: "+=180",
        duration: 0.125,
        ease: "power2.out"
    })
    .set(menuIcon, {
        "--menu-img": `url(../../assets/img/${icon})`,
    })
    .to(menuIcon, {
        scale: 1,
        rotation: "+=180",
        duration: 0.125,
        ease: "power2.in",
        onComplete: () => {
            icon == "fechar.svg" ? animatedNavMenuFadeIn() : animatedNavMenuFadeOut();
        }
    }, "+=0.25"); // delay de 0.25s
}

function animatedNavMenuFadeIn() {    
    gsap.fromTo(navMenu,
        { autoAlpha: 0, visibility: "hidden" },
        {
            autoAlpha: 0.9,
            duration: 0.5,
            visibility: "visible",
            ease: "power2.in"
        }
    );
}

function animatedNavMenuFadeOut() {
    gsap.to(navMenu, {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
            gsap.set(navMenu, { visibility: "hidden" });
        }
    });
}