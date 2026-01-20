class SkillsGenerator {
    constructor(idElemento, urlJsonSkills) {
        this.elementoInsercao = (typeof idElemento === 'string') 
            ? document.getElementById(idElemento) 
            : idElemento;
        
        this.urlJsonSkills = urlJsonSkills;
        
        if (!this.elementoInsercao) return;

        this.containerPai = this.elementoInsercao.closest('.skills-container');
        this.blockPai = this.elementoInsercao.closest('.skill-block'); // Pega o bloco todo
        this.gerarSkills();
        this.setupToggleEvents(); // Prepara o clique nos ícones
    }

    async gerarSkills() {
        try {
            const response = await fetch(this.urlJsonSkills);
            const skills = await response.json();
            
            // 1. Gera o Círculo (Sua lógica atual)
            this.exibirSkillsCircule(skills);
            
            // 2. Gera a Lista (Nova lógica)
            this.exibirSkillsLista(skills);
            
        } catch (error) {
            console.error("Falha ao gerar as skills:", error);
        }
    }

    exibirSkillsLista(skills) {
        const corAtiva = window.getComputedStyle(this.containerPai).backgroundColor;
        
        const listUl = document.createElement('ul');
        listUl.className = 'skills-list-view hidden'; // Começa escondida
        
        skills.forEach(skill => {
            const skillJson = JSON.stringify(skill).replace(/"/g, '&quot;');
            const li = document.createElement('li');
            li.className = 'skill-list-item';
            li.onclick = () => window.abrirModalSkill(skillJson, corAtiva);
            
            li.innerHTML = `
                <svg class="img__or__svg" style="width:32px; height:32px; color:${corAtiva}; fill:${corAtiva}"><use xlink:href="assets/img/icons.svg#${skill.idicon}"/></svg>
                <span style="color:${corAtiva}; font-weight:bold;">${skill.titulo}</span>
            `;
            listUl.appendChild(li);
        });

        this.containerPai.appendChild(listUl);
    }

    setupToggleEvents() {
        const btnList = this.blockPai.querySelector('#card-list-skill');
        const btnCircle = this.blockPai.querySelector('#circle-skill');
        const container = this.containerPai;
        const corAtiva = window.getComputedStyle(container).backgroundColor;

        const circleElements = [
            this.elementoInsercao, 
            container.querySelector('.skills__center-node'), 
            container.querySelector('.skills-rotating-border')
        ];

        btnList.addEventListener('click', () => {
            // 1. Botão de Lista: Fade linear que você gostou
            gsap.to(btnList, { 
                opacity: 0, 
                duration: 0.3, 
                ease: "none",
                onComplete: () => btnList.classList.add('hidden') 
            });

            // 2. Transição Suave do Container (Cor e Posição)
            // Isso evita o bug no layout porque o GSAP interpola os valores
            gsap.to(container, {
                backgroundColor: "transparent",
                top: "-8px",
                duration: 0.4,
                ease: "power2.in"
            });

            // 3. Círculo sumindo para dar lugar à lista
            gsap.to(circleElements, { 
                opacity: 0, 
                scale: 0.8, 
                duration: 0.4, 
                ease: "power2.inOut",
                onComplete: () => {
                    circleElements.forEach(el => el.classList.add('hidden'));
                    
                    const listView = container.querySelector('.skills-list-view');
                    listView.classList.remove('hidden');
                                        
                    // Entrada suave da Lista
                    gsap.fromTo(listView, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4});
                    gsap.fromTo(listView.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.5, ease: "power3.out" });

                    // Entrada suave do botão de Círculo
                    btnCircle.classList.remove('hidden');
                    gsap.fromTo(btnCircle, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" });
                }
            });
        });

        btnCircle.addEventListener('click', () => {
            // 1. Botão de Círculo: Fade linear
            gsap.to(btnCircle, { 
                opacity: 0, 
                duration: 0.3, 
                ease: "none",
                onComplete: () => btnCircle.classList.add('hidden') 
            });

            const listView = container.querySelector('.skills-list-view');

            // 2. Saída da lista
            gsap.to(listView, {
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                onComplete: () => {
                    listView.classList.add('hidden');
                    circleElements.forEach(el => el.classList.remove('hidden'));

                    // 3. Círculo reaparece
                    gsap.fromTo(circleElements, 
                        { opacity: 0, scale: 0.8 }, 
                        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
                    );

                    // 4. Container voltando ao estado original
                    gsap.to(container, {
                        backgroundColor: corAtiva,
                        top: "8px",
                        duration: 0.4,
                        ease: "power2.inOut"
                    });

                    // Botão de Lista volta
                    btnList.classList.remove('hidden');
                    gsap.fromTo(btnList, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" });
                }
            });
        });
    }

    getDynamicRadius() {
        if (this.containerPai) {
            return (this.containerPai.clientWidth / 2) - 20; 
        }
        return 150;
    }

    exibirSkillsCircule(skills) {
        const dynamicRadius = this.getDynamicRadius();
        this.elementoInsercao.innerHTML = '';
        if (!skills || skills.length === 0) return;

        const numSkills = skills.length;
        const angleIncrement = 360 / numSkills;
        let currentAngle = 0;

        // CAPTURA A COR AQUI
        const corAtiva = window.getComputedStyle(this.containerPai).backgroundColor;

        skills.forEach((skill) => {
            const angleRadians = (currentAngle - 90) * (Math.PI / 180); 
            const x = dynamicRadius * Math.cos(angleRadians);
            const y = dynamicRadius * Math.sin(angleRadians);
            
            // Sanitização da classe para o Typed.js
            const skillClass = skill.titulo.toLowerCase()
                .replace(/\+/g, 'plus')
                .replace(/&/g, '')
                .replace(/[^a-z0-9]/g, '');
            
            const listItem = document.createElement('li');
            listItem.classList.add('skill-node-item', `skill-${skillClass}`); 
            listItem.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
            
            listItem.setAttribute('data-skill-title', skill.titulo);
            listItem.setAttribute('data-skill-description', skill.descricao);

            // CORREÇÃO NA PASSAGEM DE PARÂMETROS:
            // O JSON vai primeiro, e a cor vai como uma segunda string separada.
            const skillJson = JSON.stringify(skill).replace(/"/g, '&quot;'); 

            listItem.innerHTML = ` 
                <div 
                    class="skill-content cursor-pointer"
                    onclick="abrirModalSkill('${skillJson}', '${corAtiva}')"
                    style="background-color: ${corAtiva}; border: 2px solid rgba(255,255,255,0.2);"
                >
                    <svg class="img__or__svg skill-icon" role="img" aria-label="${skill.titulo}">
                        <use xlink:href="assets/img/icons.svg#${skill.idicon}"></use>
                    </svg>
                </div>
            `;
            
            this.elementoInsercao.appendChild(listItem);
            currentAngle += angleIncrement;

            // Eventos de Hover para o Typed.js
            listItem.addEventListener('mouseenter', (event) => {
                const title = event.currentTarget.getAttribute('data-skill-title');
                document.dispatchEvent(new CustomEvent('skillHoverStart', {
                    detail: { title: title, targetId: this.elementoInsercao.id }
                }));
            });

            listItem.addEventListener('mouseleave', () => {
                document.dispatchEvent(new CustomEvent('skillHoverEnd', {
                    detail: { targetId: this.elementoInsercao.id }
                }));
            });
        });
    }
}

// ==========================================================
// FUNÇÕES GLOBAIS
// ==========================================================

window.abrirModalSkill = function(skillJsonString, corAtiva) {
    // 1. Decodifica o JSON da skill
    const skill = JSON.parse(skillJsonString.replace(/&quot;/g, '"')); 
    
    // 2. Limpa modal anterior
    const modalExistente = document.querySelector('.modal__overlay');
    if (modalExistente) modalExistente.remove();
    
    // 3. Cria o conteúdo usando a cor passada por argumento
    const modalContent = `
        <div class="modal__overlay" onclick="fecharModalSkill()">
            <div class="modal__content" style="color: white; background-color: ${corAtiva}; border: 2px solid rgba(255,255,255,0.2);" onclick="event.stopPropagation()">
                <button class="modal__close-button" onclick="fecharModalSkill()">×</button>
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 15px">
                    <svg class="img__or__svg" style="fill: white; width: 40px; height: 40px;">
                        <use xlink:href="assets/img/icons.svg#${skill.idicon}"/>
                    </svg>
                    <h3 style="color: white; margin: 0; font-size: 1.5rem;">${skill.titulo}</h3>
                </div>
                <p style="color: white; line-height: 1.6; font-size: 1rem;">${skill.descricao || 'Nenhuma descrição detalhada fornecida.'}</p>                
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
    document.body.style.overflow = 'hidden';
}

window.fecharModalSkill = function() {
    const modal = document.querySelector('.modal__overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}