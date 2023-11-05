const elementoButtonTema = document.getElementById("btn-tema");
const elementoIconTema = document.getElementById("icon-tema");

elementoButtonTema.addEventListener("click", () => {    
    document.body.classList.toggle("dark-mode");
    var darkModeActived = document.body.classList.contains("dark-mode");
    
    if(darkModeActived){        
        elementoIconTema.innerHTML = `
        <use xlink:href="assets/img/icons.svg#sol"/>
        `;
    }else{
        elementoIconTema.innerHTML = `
        <use xlink:href="assets/img/icons.svg#lua"/>
        `;
    }
});