(function menuMovimentacaoScroll(){
    var menuDiv = document.querySelector(".portfolio__container__menu");
    var portfolioDiv = document.querySelector(".portfolio__container__projetos");
    const widthTornarStatic = 578;
    
    var alturaTela, larguraTela, portfolioAltura, menuAltura, areaMovimentacaoMenu, variacaoMovimentoMenu;
    atualizarValores();

    window.addEventListener("scroll", ajustarPosicaoMenuScroll);
    ajustarPosicaoMenuScroll();

    function atualizarValores(){
        alturaTela = window.innerHeight;
        larguraTela = window.innerWidth;
        portfolioAltura = portfolioDiv.clientHeight;
        menuAltura = menuDiv.clientHeight;
        areaMovimentacaoMenu = portfolioAltura - menuAltura;
        variacaoMovimentoMenu = (((alturaTela-menuAltura))/2);
    }
    
    function ajustarPosicaoMenuScroll() {
        if((portfolioAltura != document.querySelector(".portfolio__container__projetos").clientHeight) || (larguraTela != window.innerWidth)){
            menuDiv = document.querySelector(".portfolio__container__menu");
            portfolioDiv = document.querySelector(".portfolio__container__projetos");
            
            atualizarValores();
            
            if(larguraTela <= (widthTornarStatic - 1)){
                menuDiv.style.paddingTop = "0px";
            }
        }

        if(larguraTela > (widthTornarStatic - 1)){
            const portfolioTop = portfolioDiv.getBoundingClientRect().top;
            const menuPaddingTop = parseFloat(window.getComputedStyle(menuDiv).getPropertyValue('padding-top'));                        
            
            const validarAreaMenuDesce = ((menuPaddingTop < areaMovimentacaoMenu) && ((portfolioTop <= variacaoMovimentoMenu)));
            const validarAreaMenuSobe = ((menuPaddingTop == areaMovimentacaoMenu) && ((portfolioTop >= -(areaMovimentacaoMenu - variacaoMovimentoMenu))));
            
            if(validarAreaMenuDesce || validarAreaMenuSobe){
                const paddingAtualizado = variacaoMovimentoMenu + (-portfolioTop);
                if(paddingAtualizado > areaMovimentacaoMenu){
                    menuDiv.style.paddingTop = areaMovimentacaoMenu+"px";
                }else if(paddingAtualizado < 0){
                    menuDiv.style.paddingTop = "0px";
                }else{
                    menuDiv.style.paddingTop = paddingAtualizado + "px";
                }                                                                  
            }else if((menuPaddingTop > 0) && (portfolioTop > variacaoMovimentoMenu)){
                menuDiv.style.paddingTop = "0px";
            }else if((menuPaddingTop > areaMovimentacaoMenu) && (portfolioTop < variacaoMovimentoMenu)){
                menuDiv.style.paddingTop = areaMovimentacaoMenu+"px";
            }
        }
    }
})();

(function menuSelecaoExibicao(){
    selecaoMenu();
    exibirPortfolio();
    
    function selecaoMenu(){
        const opcoesMenu = document.querySelectorAll(".portfolio__container__menu-opcoes");
        opcoesMenu.forEach(opcaoMenu => {
            opcaoMenu.addEventListener("click", () => {        
                opcoesMenu.forEach(menus => {
                    menus.classList.remove("menu-opcoes-selected");
                });
                opcaoMenu.classList.add("menu-opcoes-selected");
                exibirPortfolio();
            });
        });
    }
    
    function exibirPortfolio(){
        const menuSelected = document.querySelector(".menu-opcoes-selected h3");
        const textoTitle = menuSelected.textContent;
        montandoPortfolio(textoTitle);      
    }

    async function montandoPortfolio(textoTitle){
        const portfolioArea = document.querySelector(".portfolio__container__projetos");
        const responseJsonPortfolio = await fetch("assets/json/portfolio.json");
        const projetos = await responseJsonPortfolio.json();

        var portfolioAreaCodigo = "";

        projetos.forEach(projeto => {
            if((textoTitle == "TODOS") || (textoTitle == projeto.categoria)){
                var iconesLinguagemUtilizadasDiv = "";

                projeto.linguagens.forEach(linguagem => {                
                    iconesLinguagemUtilizadasDiv += `
                    <svg class="portfolio__icons on-tertiary-container-filter" role="img" aria-label="Acesse o meu perfil do Linked-in"><use xlink:href="assets/img/icons.svg#${linguagem}" /></svg>
                    `;
                });
    
                portfolioAreaCodigo += `
                <div class="portfolio__card-group card_${projeto.tipo} exibirPortfolio">
                    <div class="portfolio__card portfolio__card-${projeto.tipo}" style="background-image: url('assets/img/${projeto.imagem}');"></div>
                    <div class="portfolio__linguagens-projeto tertiary-container">
                        ${iconesLinguagemUtilizadasDiv}
                    </div>
                    <div class="portfolio__card-titulo portfolio__card-${projeto.tipo}">
                        <a class="portfolio__button" href="${projeto.site}" style="text-decoration: none;">
                            <h2 class="on-surface-text">${projeto.titulo}</h2>
                            <svg class="portfolio__icons vibracao on-surface-filter" role="img" aria-label="Acesse o meu perfil do Linked-in"><use xlink:href="assets/img/icons.svg#${projeto.icon_acess}" /></svg>
                        </a>
                    </div>
                </div>
                `;
            }            
        });
        
        portfolioArea.innerHTML = portfolioAreaCodigo;
    }

})();