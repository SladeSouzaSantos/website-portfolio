const btnTopo = document.getElementById("btnVoltarAoTopo");

// Função para controlar a visibilidade
const toggleVisible = (scrollPos) => {
    if (scrollPos > 300) {
        btnTopo.classList.add("visible");
    } else {
        btnTopo.classList.remove("visible");
    }
};

// Se o Lenis estiver ativo, usamos o evento dele para maior precisão
if (window.lenis) {
    window.lenis.on('scroll', (e) => {
        toggleVisible(e.scroll);
    });
} else {
    // Fallback para caso o Lenis não carregue
    window.addEventListener('scroll', () => {
        toggleVisible(window.scrollY);
    });
}

// Evento de Clique
btnTopo.addEventListener('click', () => {
    if (window.lenis) {
        // O segundo parâmetro 'duration' é opcional (em segundos)
        window.lenis.scrollTo(0, { duration: 1.5 }); 
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});