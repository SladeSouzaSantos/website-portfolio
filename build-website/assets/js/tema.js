const elementoButtonTema = document.getElementById("btn-tema");
const elementoIconTema = document.getElementById("icon-tema");
const transitionMask = document.getElementById("theme-transition-mask");

function positionTransitionMask() {
    
    const rect = elementoIconTema.getBoundingClientRect();
    
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;
    
    transitionMask.style.setProperty('--click-x', `${centroX}px`);
    transitionMask.style.setProperty('--click-y', `${centroY}px`);
}

function handleThemeToggle() {

    if (elementoButtonTema) {
        elementoButtonTema.disabled = true;
    }
    
    positionTransitionMask();
    
    const isDarkModeCurrentlyActive = document.body.classList.contains("dark-mode");
    const newThemeIsDark = !isDarkModeCurrentlyActive;
    const newThemeBackgroundColor = newThemeIsDark ? "#000000" : "#FFFFFF";
    const newIconHTML = newThemeIsDark ? 
        `<use xlink:href="assets/img/icons.svg#sol"/>` : 
        `<use xlink:href="assets/img/icons.svg#lua"/>`;
    
    transitionMask.style.backgroundColor = newThemeBackgroundColor;
    transitionMask.style.clipPath = 'circle(150% at var(--click-x) var(--click-y))';
    setTimeout(() => {
        document.body.classList.toggle("dark-mode");        
        elementoIconTema.innerHTML = newIconHTML;        
        transitionMask.style.clipPath = 'circle(0% at var(--click-x) var(--click-y))';

        setTimeout(() => {
            if (elementoButtonTema) {
                elementoButtonTema.disabled = false;
            }
        }, 750);
        
    }, 700);
}

window.addEventListener('load', positionTransitionMask);
window.addEventListener('resize', positionTransitionMask);

elementoButtonTema.addEventListener("click", handleThemeToggle);