class SkillsGenerator {
    /**
     * Construtor da classe.
     * @param {string} idElemento O ID do elemento HTML (ul) onde as skills serão injetadas.
     * @param {string} urlJsonSkills O caminho (URL) para o arquivo JSON das skills.
     */
    constructor(idElemento, urlJsonSkills) {
        
        this.elementoInsercao = document.getElementById(idElemento);
        this.urlJsonSkills = urlJsonSkills;
        
        this.RADIUS = 150; 
        
        if (!this.elementoInsercao) {
            console.error(`Elemento com ID "${idElemento}" não encontrado. A geração de skills não será executada.`);
            return;
        }
        
        this.gerarSkills();
    }
    
    async gerarSkills() {
        try {
            const responseJsonSkills = await fetch(this.urlJsonSkills);
            
            if (!responseJsonSkills.ok) {
                throw new Error(`Erro ao buscar o arquivo JSON: ${responseJsonSkills.statusText} (${this.urlJsonSkills})`);
            }
            
            const skills = await responseJsonSkills.json();
            
            this.exibirSkillsCircule(skills);

        } catch (error) {
            console.error("Falha ao gerar as skills:", error);
        }
    }

    /**
     * Gera o HTML e insere as skills em um layout circular (Radial).
     * Mantém o evento de clique para abrir o modal.
     * @param {Array<Object>} skills O array de objetos com os dados das skills.
     */
    exibirSkillsCircule(skills) {
        
        this.elementoInsercao.innerHTML = '';

        if (!skills || skills.length === 0) {
            return; 
        }

        const numSkills = skills.length;
        
        const angleIncrement = numSkills > 0 ? 360 / numSkills : 0; 
        let currentAngle = 0;

        skills.forEach((skill) => {
            
            const angleRadians = (currentAngle - 90) * (Math.PI / 180); 
            
            const x = this.RADIUS * Math.cos(angleRadians);
            const y = this.RADIUS * Math.sin(angleRadians);
            
            const skillJsonString = JSON.stringify(skill).replace(/"/g, '&quot;'); 
            
            const listItem = document.createElement('li');
            
            listItem.classList.add('skill-node-item');
            
            listItem.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
            
            listItem.innerHTML = ` 
                <div 
                    class="skill-content-zoom cursor-pointer" 
                    title="${skill.titulo}"
                    onclick="abrirModalSkill('${skillJsonString}')"
                >
                    <svg class="skill-icon zoom on-secondary-container-filter" role="img" aria-label="${skill.titulo}">
                        <use xlink:href="assets/img/icons.svg#${skill.idicon}"></use>
                    </svg>
                </div>
            `;
            
            this.elementoInsercao.appendChild(listItem);
            
            currentAngle += angleIncrement;
        });
    }
}

// ==========================================================
// FUNÇÕES GLOBAIS PARA O MODAL DE SKILLS - CORRIGIDAS
// ==========================================================

/**
 * Abre o modal com os detalhes da skill.
 * Foi modificado para receber e PARSEAR uma string JSON (escapada),
 * garantindo compatibilidade com o HTML do layout radial.
 * @param {string} skillJsonString String JSON contendo os dados da skill (escapada).
 */
window.abrirModalSkill = function(skillJsonString) {
    
    const skill = JSON.parse(skillJsonString.replace(/&quot;/g, '"')); 
    
    const modalExistente = document.querySelector('.modal__overlay');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    const modalContent = `
        <div class="modal__overlay" onclick="fecharModalSkill()">
            <div class="modal__content" onclick="event.stopPropagation()">
                <button class="modal__close-button" onclick="fecharModalSkill()">×</button>
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px; border-bottom: 2px solid var(--md-sys-color-on-surface-variant); padding-bottom: 10px">
                    <svg class="about__icons on-secondary-container-filter" role="img" aria-label="${skill.titulo}">
                        <use xlink:href="assets/img/icons.svg#${skill.idicon}"/>
                    </svg>
                    <h3 class="modal__title on-secondary-container-text" style="border-bottom: none; margin-bottom: 0px; padding-bottom: 0px">${skill.titulo}</h3>
                </div>
                <p class="modal__description">${skill.descricao || 'Nenhuma descrição detalhada fornecida.'}</p>                
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