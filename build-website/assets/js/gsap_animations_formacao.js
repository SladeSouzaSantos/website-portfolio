window.animation_formacao = function animation_formacao() {
    const historicoFormacaoLocal = document.querySelectorAll(".formacao__local-container");
    const historicoFormacaoLinha = document.querySelectorAll(".formacao__linha-historica");
    const historicoFormacaoIcon = document.querySelectorAll(".formacao__icons");
    const historicoFormacaoCargo = document.querySelectorAll(".formacao__cargo-container");

    gsap.from(".formacao__title", {
        scrollTrigger: {
            trigger: ".formacao__title",
            start: "top bottom",
            end: "bottom 75%",
            markers: false,
            scrub: 1,
            invalidateOnRefresh: true
        },
        y: -50,
        autoAlpha: 0,
        duration: 0.25,
        ease: "power2.out"
    });
    
    historicoFormacaoLocal.forEach((formacao) => {
        gsap.from(formacao, {
            scrollTrigger: {
                trigger: formacao,
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

    historicoFormacaoLinha.forEach((linha) => {
        gsap.from(linha, {
            scrollTrigger: {
                trigger: ".formacao__container",
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

    historicoFormacaoIcon.forEach((icon) => {
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
    
    historicoFormacaoCargo.forEach((cargo) => {
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