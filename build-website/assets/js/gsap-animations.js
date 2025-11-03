gsap.registerPlugin(ScrollTrigger);

const headerTimeline = gsap.timeline();

headerTimeline.from('.header', { 
    opacity: 0, 
    duration: 0.5, 
    ease: 'power2.out', 
    delay: 0.0
});

headerTimeline.from('.header__navegation__link', {
    opacity: 0,
    y: -20,
    duration: 0.3,
    stagger: 0.08,
    ease: 'power1.out',
}, 0.4);