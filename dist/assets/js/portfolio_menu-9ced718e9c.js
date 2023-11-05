"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _regeneratorRuntime(){_regeneratorRuntime=function(){return a};var u,a={},t=Object.prototype,s=t.hasOwnProperty,l=Object.defineProperty||function(t,e,r){t[e]=r.value},e="function"==typeof Symbol?Symbol:{},n=e.iterator||"@@iterator",r=e.asyncIterator||"@@asyncIterator",o=e.toStringTag||"@@toStringTag";function i(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{i({},"")}catch(u){i=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var o,i,a,c,e=e&&e.prototype instanceof v?e:v,e=Object.create(e.prototype),n=new j(n||[]);return l(e,"_invoke",{value:(o=t,i=r,a=n,c=p,function(t,e){if(c===y)throw new Error("Generator is already running");if(c===d){if("throw"===t)throw e;return{value:u,done:!0}}for(a.method=t,a.arg=e;;){var r=a.delegate;if(r){r=function t(e,r){var n=r.method,o=e.iterator[n];if(o===u)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=u,t(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;n=f(o,e.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,g;o=n.arg;return o?o.done?(r[e.resultName]=o.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=u),r.delegate=null,g):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}(r,a);if(r){if(r===g)continue;return r}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(c===p)throw c=d,a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);c=y;r=f(o,i,a);if("normal"===r.type){if(c=a.done?d:h,r.arg===g)continue;return{value:r.arg,done:a.done}}"throw"===r.type&&(c=d,a.method="throw",a.arg=r.arg)}})}),e}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}a.wrap=c;var p="suspendedStart",h="suspendedYield",y="executing",d="completed",g={};function v(){}function m(){}function _(){}var e={},w=(i(e,n,function(){return this}),Object.getPrototypeOf),w=w&&w(w(O([]))),x=(w&&w!==t&&s.call(w,n)&&(e=w),_.prototype=v.prototype=Object.create(e));function b(t){["next","throw","return"].forEach(function(e){i(t,e,function(t){return this._invoke(e,t)})})}function L(a,c){var e;l(this,"_invoke",{value:function(r,n){function t(){return new c(function(t,e){!function e(t,r,n,o){var i,t=f(a[t],a,r);if("throw"!==t.type)return(r=(i=t.arg).value)&&"object"==_typeof(r)&&s.call(r,"__await")?c.resolve(r.__await).then(function(t){e("next",t,n,o)},function(t){e("throw",t,n,o)}):c.resolve(r).then(function(t){i.value=t,n(i)},function(t){return e("throw",t,n,o)});o(t.arg)}(r,n,t,e)})}return e=e?e.then(t,t):t()}})}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function O(e){if(e||""===e){var r,t=e[n];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length))return r=-1,(t=function t(){for(;++r<e.length;)if(s.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=u,t.done=!0,t}).next=t}throw new TypeError(_typeof(e)+" is not iterable")}return l(x,"constructor",{value:m.prototype=_,configurable:!0}),l(_,"constructor",{value:m,configurable:!0}),m.displayName=i(_,o,"GeneratorFunction"),a.isGeneratorFunction=function(t){t="function"==typeof t&&t.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},a.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,i(t,o,"GeneratorFunction")),t.prototype=Object.create(x),t},a.awrap=function(t){return{__await:t}},b(L.prototype),i(L.prototype,r,function(){return this}),a.AsyncIterator=L,a.async=function(t,e,r,n,o){void 0===o&&(o=Promise);var i=new L(c(t,e,r,n),o);return a.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},b(x),i(x,o,"Generator"),i(x,n,function(){return this}),i(x,"toString",function(){return"[object Generator]"}),a.keys=function(t){var e,r=Object(t),n=[];for(e in r)n.push(e);return n.reverse(),function t(){for(;n.length;){var e=n.pop();if(e in r)return t.value=e,t.done=!1,t}return t.done=!0,t}},a.values=O,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=u,this.done=!1,this.delegate=null,this.method="next",this.arg=u,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&s.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=u)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var n=this;function t(t,e){return i.type="throw",i.arg=r,n.next=t,e&&(n.method="next",n.arg=u),!!e}for(var e=this.tryEntries.length-1;0<=e;--e){var o=this.tryEntries[e],i=o.completion;if("root"===o.tryLoc)return t("end");if(o.tryLoc<=this.prev){var a=s.call(o,"catchLoc"),c=s.call(o,"finallyLoc");if(a&&c){if(this.prev<o.catchLoc)return t(o.catchLoc,!0);if(this.prev<o.finallyLoc)return t(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return t(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return t(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&s.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}var i=(o=o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc?null:o)?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r,n,o=this.tryEntries[e];if(o.tryLoc===t)return"throw"===(r=o.completion).type&&(n=r.arg,S(o)),n}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=u),g}},a}function asyncGeneratorStep(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function _asyncToGenerator(c){return function(){var t=this,a=arguments;return new Promise(function(e,r){var n=c.apply(t,a);function o(t){asyncGeneratorStep(n,e,r,o,i,"next",t)}function i(t){asyncGeneratorStep(n,e,r,o,i,"throw",t)}o(void 0)})}}!function(){var t,n,o,e,i,a,c=document.querySelector(".portfolio__container__menu"),u=document.querySelector(".portfolio__container__projetos");function s(){t=window.innerHeight,n=window.innerWidth,o=u.clientHeight,e=c.clientHeight,i=o-e,a=(t-e)/2}function r(){var t,e,r;o==document.querySelector(".portfolio__container__projetos").clientHeight&&n==window.innerWidth||(c=document.querySelector(".portfolio__container__menu"),u=document.querySelector(".portfolio__container__projetos"),s(),n<=577&&(c.style.paddingTop="0px")),577<n&&(t=u.getBoundingClientRect().top,(e=parseFloat(window.getComputedStyle(c).getPropertyValue("padding-top")))<i&&t<=a||e==i&&-(i-a)<=t?(r=a+-t,c.style.paddingTop=i<r?i+"px":r<0?"0px":r+"px"):0<e&&a<t?c.style.paddingTop="0px":i<e&&t<a&&(c.style.paddingTop=i+"px"))}s(),window.addEventListener("scroll",r),r()}(),function(t){var e;function r(){!function(){(t=t||_asyncToGenerator(_regeneratorRuntime().mark(function t(r){var e,n,o;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=document.querySelector(".portfolio__container__projetos"),t.next=3,fetch("assets/json/portfolio.json");case 3:return n=t.sent,t.next=6,n.json();case 6:n=t.sent,o="",n.forEach(function(t){var e;"TODOS"!=r&&r!=t.categoria||(e="",t.linguagens.forEach(function(t){e+='\n                    <svg class="portfolio__icons on-tertiary-container-filter" role="img" aria-label="Acesse o meu perfil do Linked-in"><use xlink:href="assets/img/icons.svg#'.concat(t,'" /></svg>\n                    ')}),o+='\n                <div class="portfolio__card-group card_'.concat(t.tipo,' exibirPortfolio">\n                    <div class="portfolio__card portfolio__card-').concat(t.tipo,'" style="background-image: url(\'assets/img/').concat(t.imagem,'\');"></div>\n                    <div class="portfolio__linguagens-projeto tertiary-container">\n                        ').concat(e,'\n                    </div>\n                    <div class="portfolio__card-titulo portfolio__card-').concat(t.tipo,'">\n                        <a class="portfolio__button" href="').concat(t.site,'" style="text-decoration: none;">\n                            <h2 class="on-surface-text">').concat(t.titulo,'</h2>\n                            <svg class="portfolio__icons vibracao on-surface-filter" role="img" aria-label="Acesse o meu perfil do Linked-in"><use xlink:href="assets/img/icons.svg#').concat(t.icon_acess,'" /></svg>\n                        </a>\n                    </div>\n                </div>\n                '))}),e.innerHTML=o;case 10:case"end":return t.stop()}},t)}))).apply(this,arguments)}(document.querySelector(".menu-opcoes-selected h3").textContent)}(e=document.querySelectorAll(".portfolio__container__menu-opcoes")).forEach(function(t){t.addEventListener("click",function(){e.forEach(function(t){t.classList.remove("menu-opcoes-selected")}),t.classList.add("menu-opcoes-selected"),r()})}),r()}();