(function menuSelecaoExibicao(){
    let projetosData = [];

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
        
        // 1. Carrega os dados do JSON se ainda não foram carregados
        if (projetosData.length === 0) {
            try {
                const responseJsonPortfolio = await fetch("assets/json/portfolio.json");
                projetosData = await responseJsonPortfolio.json();
            } catch (error) {
                console.error("Erro ao carregar portfolio.json:", error);
                // Permite continuar mesmo se falhar, mas sem projetos
                portfolioArea.innerHTML = "<p>Não foi possível carregar os projetos.</p>";
                return;
            }
        }
        
        var portfolioAreaCodigo = "";
        
        projetosData.forEach((projeto, index) => { // IMPORTANTE: Incluir o 'index'
            if((textoTitle == "TODOS") || (textoTitle == projeto.categoria)){
                var iconesLinguagemUtilizadasDiv = "";

                projeto.linguagens.forEach(linguagem => {           
                    iconesLinguagemUtilizadasDiv += `
                    <svg class="img__or__svg portfolio__icons on-tertiary-container-filter" role="img" aria-label="Acesse o meu perfil do Linked-in"><use xlink:href="assets/img/icons.svg#${linguagem}" /></svg>
                    `;
                });
    
                // CÓDIGO DO CARD MODIFICADO: Remove a tag <a> e adiciona o onclick
                portfolioAreaCodigo += `
                <div class="portfolio__card-group card_${projeto.tipo} exibirPortfolio" onclick="abrirModalProjeto(${index})">
                    <div class="portfolio__card cursor-pointer portfolio__card-${projeto.tipo}" style="background-image: url('assets/img/${projeto.imagem}');"></div>
                    <div class="portfolio__linguagens-projeto tertiary-container">
                        ${iconesLinguagemUtilizadasDiv}
                    </div>
                    <div class="portfolio__card-titulo portfolio__card-${projeto.tipo}">
                        <div class="portfolio__button" style="text-decoration: none;">
                            <h2 class="on-surface-text">${projeto.titulo}</h2>
                            <svg class="img__or__svg portfolio__icons vibracao on-surface-filter" role="img" aria-label="Acesse o projeto"><use xlink:href="assets/img/icons.svg#${projeto.icon_acess}" /></svg>
                        </div>
                    </div>
                </div>
                `;
            }           
        });
        
        portfolioArea.innerHTML = portfolioAreaCodigo;

        if(window.lenis) window.lenis.resize();
        requestAnimationFrame(() => {
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        });
    }

    /* --- NOVAS FUNÇÕES DO MODAL (GLOBALMENTE ACESSÍVEIS) --- */
    // Adicionamos as funções ao 'window' para que sejam chamadas pelo 'onclick' no HTML gerado
    window.abrirModalProjeto = function(index) {
        if (!projetosData[index]) return; // Evita erro se o índice for inválido

        const projeto = projetosData[index];
        
        // 1. Monta o link do site, aparecendo SOMENTE se o campo 'site' não for vazio ("") ou "#"
        let linkProjetoHTML = '';
        if (projeto.site && projeto.site !== "" && projeto.site !== "#") {
            linkProjetoHTML = `
                <div class="modal__link-container">
                    <a href="${projeto.site}" target="_blank" rel="noopener noreferrer" class="modal__link-site on-primary-container-text">
                        Acessar Site do Projeto
                        <svg class="img__or__svg modal__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            `;
        }
    
        // 2. Monta o conteúdo e o overlay do modal
        const modalContent = `
            <div class="modal__overlay" onclick="fecharModalProjeto()">
                <div class="modal__content" onclick="event.stopPropagation()">
                    <button class="modal__close-button" onclick="fecharModalProjeto()">×</button>
                    <h3 class="modal__title">${projeto.titulo}</h3>
                    <p class="modal__description">${projeto.descricao}</p>
                    ${linkProjetoHTML}
                </div>
            </div>
        `;
    
        // 3. Insere o modal no corpo do documento
        document.body.insertAdjacentHTML('beforeend', modalContent);
        document.body.style.overflow = 'hidden'; 
    }
    
    window.fecharModalProjeto = function() {
        const overlay = document.querySelector('.modal__overlay');
        if (overlay) {
            overlay.remove();
            document.body.style.overflow = ''; 
        }
    }
    /* --- FIM DAS FUNÇÕES DO MODAL --- */

})();