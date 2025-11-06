function scrollToTop() {
    // Rola suavemente para o topo da página (compatível com a maioria dos navegadores)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

let mybutton = document.getElementById("btnVoltarAoTopo");

// Adiciona um listener para o evento de rolagem da janela
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // Mostra o botão se a rolagem for maior que 20px
    mybutton.style.display = "block";
  } else {
    // Esconde o botão se estiver no topo
    mybutton.style.display = "none";
  }
}