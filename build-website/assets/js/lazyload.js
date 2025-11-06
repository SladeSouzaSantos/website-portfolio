(function(){

	// A função throttle (limitador de execução) permanece exatamente igual
	function throttle(fn) {
		fn.jarodei = false;
		
		return function(){
			if (fn.jarodei) return;
			fn.jarodei = true;
			setTimeout(function () { 
				fn.jarodei = false; 
			}, 200);

			fn();	
		};
	}

	// ALTERAÇÃO 1: Seleciona as DIVs com a URL no atributo data-src (para background-image)
	var bgElements = document.querySelectorAll('div[data-src]');
	var cache, alturaJanela, scrollListener, resizeListener;

	function refazCache() {
		cache = [];

		// calcula os topos no cache
		// Percorre os elementos selecionados (agora são DIVs)
		for (var i = 0; i < bgElements.length; i++) {
			cache.push({
				topo: bgElements[i].getBoundingClientRect().top + pageYOffset,
				elemento: bgElements[i]
			});
		}

		// ordena o cache pela imagem mais proxima do topo
		cache = cache.sort(function(a,b){
			return a.topo - b.topo;
		});

		// cache da altura da janela
		alturaJanela = window.innerHeight;
	}

	function carregaImagens() {
		// A condição 'cache[0].topo < pageYOffset + alturaJanela + 200' 
        // verifica se o elemento está a 200px da viewport.
		while (cache.length && cache[0].topo < pageYOffset + alturaJanela + 200) {
			var element = cache.shift().elemento;
			
			// ALTERAÇÃO 2: Aplica a URL na propriedade CSS background-image
			var imageUrl = element.getAttribute('data-src');
			element.style.backgroundImage = 'url(\'' + imageUrl + '\')';

			// Remove o atributo data-src para não ser reprocessado
			element.removeAttribute('data-src');
		}

		// removo eventos se não precisar mais deles
		// ALTERAÇÃO 3: Agora verifica se a lista de elementos 'data-src' está vazia
		if (document.querySelectorAll('div[data-src]').length == 0) {
			window.removeEventListener('scroll', scrollListener);
			window.removeEventListener('resize', resizeListener);
		}
	}

	// roda primeira vez
	refazCache();
	carregaImagens();

	// onresize refazCache e carrega eventuais imagens
	window.addEventListener('resize', resizeListener = throttle(function() {
		refazCache();
		carregaImagens();
	}));

	// onscroll só carrega imagens
	window.addEventListener('scroll', scrollListener = throttle(carregaImagens));

})();