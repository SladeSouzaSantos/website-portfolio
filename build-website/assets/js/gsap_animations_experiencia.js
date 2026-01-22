window.animation_experiencia = function animation_experiencia() {
    const historicoExperienciaLocal = document.querySelectorAll(".experiencia__local-container");
    const historicoExperienciaLinha = document.querySelectorAll(".experiencia__linha-historica");
    const historicoExperienciaIcon = document.querySelectorAll(".experiencia__icons");
    const historicoExperienciaCargo = document.querySelectorAll(".experiencia__cargo-container");
    
    historicoExperienciaLocal.forEach((experiencia) => {
        gsap.from(experiencia, {
            scrollTrigger: {
                trigger: experiencia,
                start: "top bottom",
                end: "bottom 75%",
                markers: false,
                scrub: 1,
                invalidateOnRefresh: true
            },
            x: -50,
            autoAlpha: 0,
            duration: 0.25,
            ease: "power2.out"
        });
    });

    historicoExperienciaLinha.forEach((linha) => {
        gsap.from(linha, {
            scrollTrigger: {
                trigger: ".experiencia__container",
                start: "top bottom",
                end: "bottom 75%",
                markers: false,
                scrub: 1,
                invalidateOnRefresh: true
            },
            y: 50,
            duration: 0.25,
            ease: "power2.out"
        });
    });

    historicoExperienciaIcon.forEach((icon) => {
        gsap.from(icon, {
            scrollTrigger: {
                trigger: icon,
                start: "top bottom",
                end: "bottom center",
                markers: false,
                scrub: 1,
                invalidateOnRefresh: true
            },
            scale: 0.001,
            duration: 0.25,
            ease: "power2.out"
        });
    });
    
    historicoExperienciaCargo.forEach((cargo) => {
        gsap.from(cargo, {
            scrollTrigger: {
                trigger: cargo,
                start: "top bottom",
                end: "bottom 75%",
                markers: false,
                scrub: 1,
                invalidateOnRefresh: true
            },
            x: 50,
            autoAlpha: 0,
            duration: 0.25,
            ease: "power2.out"
        });
    });
}