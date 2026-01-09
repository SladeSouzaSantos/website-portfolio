class SkillsGenerator {
    /**
     * Construtor da classe.
     * @param {string} idElemento O ID do elemento HTML (ul) onde as skills serão injetadas.
     * @param {string} urlJsonSkills O caminho (URL) para o arquivo JSON das skills.
     */
    constructor(idElemento, urlJsonSkills) {
        
        this.elementoInsercao = document.getElementById(idElemento);
        this.urlJsonSkills = urlJsonSkills;
        
        if (!this.elementoInsercao) {
            console.error(`Elemento com ID "${idElemento}" não encontrado. A geração de skills não será executada.`);
            return;
        }

        this.containerPai = this.elementoInsercao.closest('.skills-container');
        
        this.gerarSkills();
    }

    // Modifique o método gerarSkills()
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
     * Calcula o raio dinamicamente baseado na largura do container.
     * @returns {number} O valor do raio (metade da largura do container).
     */
    getDynamicRadius() {
        if (this.containerPai) {
            return (this.containerPai.clientWidth / 2) - 20; 
        }
        return 150; // Valor fallback
    }

    /**
     * Gera o HTML e insere as skills em um layout circular (Radial).
     * @param {Array<Object>} skills O array de objetos com os dados das skills.
     */
    exibirSkillsCircule(skills) {

        const dynamicRadius = this.getDynamicRadius();
        
        this.elementoInsercao.innerHTML = '';

        if (!skills || skills.length === 0) {
            return; 
        }

        const numSkills = skills.length;
        
        const angleIncrement = numSkills > 0 ? 360 / numSkills : 0;
        let currentAngle = 0;

        skills.forEach((skill) => {
            
            const angleRadians = (currentAngle - 90) * (Math.PI / 180); 
            
            const x = dynamicRadius * Math.cos(angleRadians);
            const y = dynamicRadius * Math.sin(angleRadians);
            
            const skillJsonString = JSON.stringify(skill).replace(/"/g, '&quot;'); 
            
            // FUNÇÃO DE SANITIZAÇÃO CORRIGIDA
            const skillClass = skill.titulo
                .toLowerCase()
                .replace(/\+/g, 'plus') // Trata o '+' (C++ -> cplusplus)
                .replace(/&/g, '') // Trata o '&' (Git & GitHub -> gitgithub)
                .replace(/[^a-z0-9]/g, ''); // Remove outros caracteres não alfanuméricos
            
            const listItem = document.createElement('li');
            
            // ADIÇÃO: Adiciona a classe única para mapeamento no Typed.js
            listItem.classList.add('skill-node-item', `skill-${skillClass}`); 
            
            // O estilo 'transform' posiciona o ícone no círculo.
            // A remoção da rotação inversa GSAP garante que este 'transform' seja o único aplicado.
            listItem.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
            
            // --- DATA ATTRIBUTES (para o hover e modal) ---
            listItem.setAttribute('data-skill-title', skill.titulo);
            listItem.setAttribute('data-skill-description', skill.descricao);
            // ------------------------------------

            listItem.innerHTML = ` 
                <div 
                    class="skill-content cursor-pointer"
                    onclick="abrirModalSkill('${skillJsonString}')"
                >
                    <svg class="skill-icon on-secondary-container-filter" role="img" aria-label="${skill.titulo}">
                        <use xlink:href="assets/img/icons.svg#${skill.idicon}"></use>
                    </svg>
                </div>
            `;
            
            this.elementoInsercao.appendChild(listItem);
            
            currentAngle += angleIncrement;

            // --- EVENT LISTENERS PARA O HOVER ---
            listItem.addEventListener('mouseenter', (event) => {
                const title = event.currentTarget.getAttribute('data-skill-title');
                const description = event.currentTarget.getAttribute('data-skill-description');
                
                // Dispara um evento customizado
                document.dispatchEvent(new CustomEvent('skillHoverStart', {
                    detail: {
                        targetId: this.elementoInsercao.id, 
                        title: title,
                        description: description
                    }
                }));
            });

            listItem.addEventListener('mouseleave', () => {
                // Dispara um evento customizado para sinalizar o fim do hover
                document.dispatchEvent(new CustomEvent('skillHoverEnd', {
                    detail: {
                        targetId: this.elementoInsercao.id
                    }
                }));
            });
            // --------------------------------------------------
        });
    }
}

// ==========================================================
// FUNÇÕES GLOBAIS PARA O MODAL DE SKILLS (Mantidas)
// ==========================================================

/**
 * Abre o modal com os detalhes da skill.
 * @param {string} skillJsonString String JSON contendo os dados da skill (escapada).
 */
window.abrirModalSkill = function(skillJsonString) {
    const skill = JSON.parse(skillJsonString.replace(/&quot;/g, '"')); 
    
    // CAPTURAR A COR ATIVA: Pegamos a cor de fundo do círculo atual
    const corAtiva = document.querySelector('.skills-container').style.backgroundColor;

    const modalExistente = document.querySelector('.modal__overlay');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    const modalContent = `
        <div class="modal__overlay" onclick="fecharModalSkill()">
            <div class="modal__content" style="background-color: ${corAtiva}; border: 2px solid rgba(255,255,255,0.2);" onclick="event.stopPropagation()">
                <button class="modal__close-button" onclick="fecharModalSkill()">×</button>
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px; border-bottom: 2px solid rgba(255,255,255,0.2); padding-bottom: 10px">
                    <svg class="skills__icons__about" style="fill: white; width: 40px; height: 40px;" role="img" aria-label="${skill.titulo}">
                        <use xlink:href="assets/img/icons.svg#${skill.idicon}"/>
                    </svg>
                    <h3 class="modal__title" style="color: white; border-bottom: none; margin-bottom: 0px; padding-bottom: 0px">${skill.titulo}</h3>
                </div>
                <p class="modal__description" style="color: white;">${skill.descricao || 'Nenhuma descrição detalhada fornecida.'}</p>                
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