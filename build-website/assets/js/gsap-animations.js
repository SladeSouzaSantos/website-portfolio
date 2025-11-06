gsap.registerPlugin(ScrollTrigger);

const headerTimeline = gsap.timeline();

headerTimeline.from('.header__navegation__link', {
    opacity: 0,
    y: -20,
    duration: 0.9,
    stagger: 0.05,
    ease: 'power1.out',
    delay: 0.0
});

gsap.to(".skills-group-radial", {
    rotation: 360,
    duration: 120,
    ease: "none",
    repeat: -1,
});