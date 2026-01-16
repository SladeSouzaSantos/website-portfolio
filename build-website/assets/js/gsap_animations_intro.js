const texts = ["JAVA | SPRING", "REACT | Node.js", "DART | FLUTTER", "PYTHON | DJANGO", "JAVA | ANGULAR", "REACT | DJANGO"];

const textElement = document.getElementById("about-development-text");

let index = 0;

function animateText() {
    const word = texts[index];
    textElement.textContent = word;

    gsap.fromTo(textElement, 
        { 
            y: 50, 
            opacity: 0.001 
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
        }
    );

    gsap.to(textElement, {
        y: -50,
        opacity: 0.001,
        duration: 1,
        ease: "power2.in",
        delay: 2,
        onComplete: () => {
            index = (index + 1) % texts.length;            
            animateText();
        }
    });
}

gsap.from("#home a svg use", 
    {
        x: -200,
        duration: 1,
        delay: 0
    }
);

gsap.to(".header__logo", {
    opacity: 1,
    duration: 0,
    delay: 0
});

gsap.from("#home div",
    {
        y: -200,
        duration: 2,
        delay: 0
    }
);

gsap.to(".header__menu__button", {
    opacity: 1,
    duration: 0,
    delay: 0
});

gsap.from("label #icon-tema use",
    {
        x: 200,
        duration: 1,
        delay: 1,
        onComplete: () => {
            animateText();
        }
    }
);

gsap.to(".header-mudar-tema", {
    opacity: 1,
    duration: 0,
    delay: 0
});

gsap.from(".skills-layout-wrapper",
    {
        y: 100,
        opacity: 0.001,
        duration: 1,
        delay: 3,
        stagger: 0.2      
    }
);