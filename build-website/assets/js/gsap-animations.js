gsap.registerPlugin(ScrollTrigger);

const headerTimeline = gsap.timeline();

headerTimeline.from('.header', { 
    opacity: 0, 
    duration: 0.8, 
    ease: 'power2.out', 
    delay: 0.2
});

headerTimeline.from('.header__navegation__link', {
    opacity: 0,
    y: -20,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power1.out',
}, 0.9);