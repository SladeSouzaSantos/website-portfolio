gsap.from("#home a svg use", 
    {
        x: -200,
        duration: 1,
        delay: 0
    }
);

gsap.from("#home div",
    {
        y: -200,
        duration: 2,
        delay: 0
    }
);

gsap.from("label #icon-tema use",
    {
        x: 200,
        duration: 1,
        delay: 1
    }
);

gsap.from(".skills-layout-wrapper",
    {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 3,
        stagger: 0.2,
    }
);