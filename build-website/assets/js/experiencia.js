(async function experienciaTelaDinamica(){
    const experienciaContainer = document.querySelector(".experiencia__container");  
    const responseJsonExperiencia = await fetch("assets/json/experiencia.json");
    const experiencias = await responseJsonExperiencia.json();
    
    const larguraTelaTransicaoReferencia = 900;
    var telaModoExibicao = "";
    var exibicaoComputador = "";
    var exibicaoMobile = "";

    window.addEventListener("resize", montarTelaExperiencia);
    montarTelaExperiencia();

    function montarTelaExperiencia(){
        const larguraTela = window.innerWidth;

        if(telaModoExibicao == ""){
            var interacoes = 0;
            var styleUltimoContainer = "";
            experiencias.forEach(experiencia => {
                interacoes++;
                if(interacoes == experiencias.length){
                    styleUltimoContainer = 'style="padding-bottom: 6px"';
                }
                exibicaoComputador += `
                <div class="experiencia__container__historico">
                    <div class="experiencia__local-container">
                        <h3 class="experiencia__local-titulo">${experiencia.local_titulo}</h3>
                        <p class="experiencia__local-duracao on-surface-variant-text">${experiencia.local_duracao}</p>
                    </div>
                    <div class="experiencia__linha-historica-container">
                        <div class="experiencia__linha-historica"></div>
                        <svg  class="experiencia__icons" role="img"><use xlink:href="assets/img/icons.svg#${experiencia.tipo}" /></svg>                             
                    </div>
                    <div class="experiencia__cargo-container" ${styleUltimoContainer}>
                        <h3 class="experiencia__cargo-titulo">${experiencia.cargo_titulo}</h3>
                        <p class="experiencia__cargo-descricao on-surface-variant-text">${experiencia.cargo_descricao}</p>
                    </div>
                </div>
                `;

                exibicaoMobile += `
                <div class="experiencia__container__historico">
                    <div class="experiencia__linha-historica-container">
                        <div class="experiencia__linha-historica"></div>
                        <svg  class="experiencia__icons" role="img"><use xlink:href="assets/img/icons.svg#${experiencia.tipo}" /></svg>                             
                    </div>
                    <div class="experiencia__container-mobile-view">
                        <div class="experiencia__local-container">
                            <h3 class="experiencia__local-titulo">${experiencia.local_titulo}</h3>
                            <p class="experiencia__local-duracao on-surface-variant-text">${experiencia.local_duracao}</p>
                        </div>
                        <div class="experiencia__cargo-container" ${styleUltimoContainer}>
                            <h3 class="experiencia__cargo-titulo">${experiencia.cargo_titulo}</h3>
                            <p class="experiencia__cargo-descricao on-surface-variant-text">${experiencia.cargo_descricao}</p>
                        </div>
                    </div>
                </div>
                `;
            });
        }

        if((telaModoExibicao != "computador") && (window.innerWidth >= larguraTelaTransicaoReferencia)){
            telaModoExibicao = "computador";
            experienciaContainer.innerHTML = exibicaoComputador;
            
        }else if((telaModoExibicao != "mobile") && (window.innerWidth < larguraTelaTransicaoReferencia)){
            telaModoExibicao = "mobile";
            experienciaContainer.innerHTML = exibicaoMobile;
        }
    }   
    
})();