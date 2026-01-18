(function(){
	
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

    var bgElements = document.querySelectorAll('div[data-src]');
    var cache, alturaJanela, scrollListener, resizeListener;

    function refazCache() {
        cache = [];
		
        bgElements = document.querySelectorAll('div[data-src]');
        
        for (var i = 0; i < bgElements.length; i++) {
            cache.push({
                topo: bgElements[i].getBoundingClientRect().top + window.pageYOffset,
                elemento: bgElements[i]
            });
        }

        cache = cache.sort(function(a,b){
            return a.topo - b.topo;
        });

        alturaJanela = window.innerHeight;
    }

    function carregaImagens() {
		
        var currentScroll = window.pageYOffset;

        while (cache.length && cache[0].topo < currentScroll + alturaJanela + 200) {
            var element = cache.shift().elemento;
            var imageUrl = element.getAttribute('data-src');
            
            if (imageUrl) {
                element.style.backgroundImage = 'url(\'' + imageUrl + '\')';
                element.removeAttribute('data-src');
            }
        }

        if (document.querySelectorAll('div[data-src]').length == 0) {
            window.removeEventListener('scroll', scrollListener);
            window.removeEventListener('resize', resizeListener);
			
            if(window.lenis) window.lenis.off('scroll', window.forceCarregaImagens);
        }
    }
	
    window.forceCarregaImagens = throttle(carregaImagens);
	
    refazCache();
    carregaImagens();

    window.addEventListener('resize', resizeListener = throttle(function() {
        refazCache();
        carregaImagens();
    }));

    window.addEventListener('scroll', scrollListener = window.forceCarregaImagens);

})();