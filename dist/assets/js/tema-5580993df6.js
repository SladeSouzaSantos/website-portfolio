"use strict";var elementoButtonTema=document.getElementById("btn-tema"),elementoIconTema=document.getElementById("icon-tema");elementoButtonTema.addEventListener("click",function(){document.body.classList.toggle("dark-mode");var e=document.body.classList.contains("dark-mode");elementoIconTema.innerHTML=e?'\n        <use xlink:href="assets/img/icons.svg#sol"/>\n        ':'\n        <use xlink:href="assets/img/icons.svg#lua"/>\n        '});