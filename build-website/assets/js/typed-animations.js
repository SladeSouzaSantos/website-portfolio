document.addEventListener('DOMContentLoaded', () => {    
    if (typeof Typed === 'undefined') {
        console.error("Typed.js não carregado. Verifique o script na tag <head> ou <body>.");
        return;
    }
    
    var typed = new Typed('#typed-output', {
        strings: [
            "Sobre mim"
        ],
        
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 5000, 
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    }, 100);
});