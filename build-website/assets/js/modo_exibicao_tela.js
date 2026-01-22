window.addEventListener("resize", () => {
    const larguraTelaTransicaoReferencia = 900;
    window.telaModoExibicao = window.innerWidth >= larguraTelaTransicaoReferencia ? "computador" : "mobile";
});