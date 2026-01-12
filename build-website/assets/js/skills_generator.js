class SkillsGenerator {
    constructor(idElemento, urlJsonSkills) {
        this.elementoInsercao = (typeof idElemento === 'string') 
            ? document.getElementById(idElemento) 
            : idElemento;
        
        this.urlJsonSkills = urlJsonSkills;
        
        if (!this.elementoInsercao) {
            console.error(`Elemento não encontrado.`);
            return;
        }

        this.containerPai = this.elementoInsercao.closest('.skills-container');
        this.gerarSkills();
    }

    async gerarSkills() {
        try {
            const response = await fetch(this.urlJsonSkills);
            const skills = await response.json();
            this.exibirSkillsCircule(skills);
        } catch (error) {
            console.error("Falha ao gerar as skills:", error);
        }
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
                    <svg class="skill-icon" role="img" aria-label="${skill.titulo}">
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
            <div class="modal__content" style="background-color: ${corAtiva}; border: 2px solid rgba(255,255,255,0.2);" onclick="event.stopPropagation()">
                <button class="modal__close-button" onclick="fecharModalSkill()">×</button>
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 15px">
                    <svg style="fill: white; width: 40px; height: 40px;">
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