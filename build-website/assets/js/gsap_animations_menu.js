const menuIcon = document.querySelector(".header__menu__button");
const navMenu = document.querySelector(".header__navegation");

let icon = "menu.svg";

let mm = gsap.matchMedia();

clearAnimatedMobile = () => 
    {
        gsap.set([navMenu, menuIcon], { clearProps: "all" }); 
        gsap.to(navMenu, { visibility: "visible", opacity: 0.9 });
    };

mm.add("(max-width: 1058px)", (context) => {
    isMobile = true;
    icon = "menu.svg";

    gsap.to(navMenu, { opacity: 0.001, visibility: "hidden" });

    gsap.set(menuIcon, { "--menu-img": "url(../../assets/img/menu.svg)" });

    return () => {
        clearAnimatedMobile();
    }
});

function animatedIconMenu() {
    const timeLineMenu = gsap.timeline();
    
    icon = icon == "menu.svg" ? "fechar.svg" : "menu.svg";
    
    gsap.to(menuIcon, {
        scale: 0.001,
        rotation: "+=180",
        duration: 0.125,
        ease: "power2.out",
        onComplete: () => {
            timeLineMenu.to(menuIcon, 
                {
                scale: 1,
                rotation: "+=180",
                duration: 0.125,
                ease: "power2.in",
                delay: 0.25,
                onComplete: () => {
                    icon == "fechar.svg" ? animatedNavMenuFadeIn() : animatedNavMenuFadeOut();
                } 
            }).set(menuIcon, {
                "--menu-img": `url(../../assets/img/${icon})`,
            });
        }
    });
}

function animatedNavMenuFadeIn() {    
    gsap.fromTo(navMenu,
        {
            opacity: 0.001,
            visibility: "hidden"
        },
        {
            opacity: 0.9,
            duration: 0.5,
            visibility: "visible",
            ease: "power2.in"
        }
    );
}

function animatedNavMenuFadeOut() {
    gsap.fromTo(navMenu,
        {
            opacity: 0.9,
        },
        {
            opacity: 0.001,
            duration: 0.5,
            ease: "power2.out",
        }
    );
}