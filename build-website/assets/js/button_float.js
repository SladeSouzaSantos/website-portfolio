const btnTopo = document.getElementById("btnVoltarAoTopo");

window.addEventListener('scroll', () => {
    // Se rolar mais de 300px, adiciona a classe, senão remove
    if (window.scrollY > 300) {
        btnTopo.classList.add("visible");
    } else {
        btnTopo.classList.remove("visible");
    }
});

btnTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});