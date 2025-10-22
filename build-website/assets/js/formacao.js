(async function formacaoTelaDinamica(){
    const formacaoContainer = document.querySelector(".formacao__container");  
    const responseJsonformacao = await fetch("assets/json/formacao.json");
    const formacaos = await responseJsonformacao.json();
    
    const larguraTelaTransicaoReferencia = 900;
    var telaModoExibicao = "";
    var exibicaoComputador = "";
    var exibicaoMobile = "";

    window.addEventListener("resize", montarTelaFormacao);
    montarTelaFormacao();

    function montarTelaFormacao(){
        const larguraTela = window.innerWidth;

        if(telaModoExibicao == ""){
            var interacoes = 0;
            var styleUltimoContainer = "";
            formacaos.forEach(formacao => {
                interacoes++;
                if(interacoes == formacaos.length){
                    console.log("entrou aqui!!!");
                    styleUltimoContainer = 'style="padding-bottom: 6px"';
                }
                exibicaoComputador += `
                <div class="formacao__container__historico">
                    <div class="formacao__local-container">
                        <h3 class="formacao__local-titulo">${formacao.local_titulo}</h3>
                        <p class="formacao__local-duracao on-surface-variant-text">${formacao.local_duracao}</p>
                    </div>
                    <div class="formacao__linha-historica-container">
                        <div class="formacao__linha-historica"></div>
                        <svg  class="formacao__icons" role="img"><use class="on-surface-filter" xlink:href="assets/img/icons.svg#${formacao.tipo}" /></svg>                             
                    </div>
                    <div class="formacao__cargo-container" ${styleUltimoContainer}>
                        <h3 class="formacao__cargo-titulo">${formacao.cargo_titulo}</h3>
                        <p class="formacao__cargo-descricao on-surface-variant-text">${formacao.cargo_descricao}</p>
                    </div>
                </div>
                `;

                exibicaoMobile += `
                <div class="formacao__container__historico">
                    <div class="formacao__linha-historica-container">
                        <div class="formacao__linha-historica"></div>
                        <svg  class="formacao__icons" role="img"><use class="on-surface-filter" xlink:href="assets/img/icons.svg#${formacao.tipo}" /></svg>                             
                    </div>
                    <div class="formacao__container-mobile-view">
                        <div class="formacao__local-container">
                            <h3 class="formacao__local-titulo">${formacao.local_titulo}</h3>
                            <p class="formacao__local-duracao on-surface-variant-text">${formacao.local_duracao}</p>
                        </div>
                        <div class="formacao__cargo-container" ${styleUltimoContainer}>
                            <h3 class="formacao__cargo-titulo">${formacao.cargo_titulo}</h3>
                            <p class="formacao__cargo-descricao on-surface-variant-text">${formacao.cargo_descricao}</p>
                        </div>
                    </div>
                </div>
                `;
            });
        }

        if((telaModoExibicao != "computador") && (window.innerWidth >= larguraTelaTransicaoReferencia)){
            telaModoExibicao = "computador";
            formacaoContainer.innerHTML = exibicaoComputador;
            
        }else if((telaModoExibicao != "mobile") && (window.innerWidth < larguraTelaTransicaoReferencia)){
            telaModoExibicao = "mobile";
            formacaoContainer.innerHTML = exibicaoMobile;
        }
    }   
    
})();