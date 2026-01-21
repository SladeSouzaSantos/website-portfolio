window.animations_update = function animations_update(){
    requestAnimationFrame(() => {

        if (window.ScrollTrigger) {

            const seletoresPreservados = [
                ".header__navegation",
                ".header__menu__button",
                ".header__logo", 
                ".header-mudar-tema",
                "#home div",
                "#home a svg use",
                "label #icon-tema use",
                "#about-development-text",
                ".about__group",
                ".about__perfil",
                ".about__title",
                ".about__context p",
                ".about__icons",
                ".skills-layout-wrapper"
            ];

            window.ScrollTrigger.getAll().forEach(st => {
                if (!st.trigger) return;
                
                const devePreservar = seletoresPreservados.some(seletor => 
                    st.trigger.matches(seletor)
                );

                if (!devePreservar) {
                    st.kill();
                }
            });
        }
        
        if (typeof window.animation_experiencia === "function") {
            window.animation_experiencia();
            window.ScrollTrigger.refresh();
        }

        if (typeof window.animation_formacao === "function") {
            window.animation_formacao();
            window.ScrollTrigger.refresh();
        }        
    });
}