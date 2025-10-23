/**
 * Classe para buscar dados de skills de um JSON e injetá-los
 * em um elemento HTML específico.
 */
class SkillsGenerator {
    /**
     * Construtor da classe.
     * @param {string} idElemento O ID do elemento HTML (ul) onde as skills serão injetadas.
     * @param {string} urlJsonSkills O caminho (URL) para o arquivo JSON das skills.
     */
    constructor(idElemento, urlJsonSkills) {
        // As propriedades da instância
        this.elementoInsercao = document.getElementById(idElemento);
        this.urlJsonSkills = urlJsonSkills;

        // Verifica se o elemento foi encontrado ao criar a instância
        if (!this.elementoInsercao) {
            console.error(`Elemento com ID "${idElemento}" não encontrado. A geração de skills não será executada.`);
            return; // Impede a execução se o elemento não existir
        }
        
        // Inicia o processo de geração ao criar a instância
        this.gerarSkills();
    }

    /**
     * Busca os dados do JSON de forma assíncrona.
     */
    async gerarSkills() {
        try {
            const responseJsonSkills = await fetch(this.urlJsonSkills);
            
            if (!responseJsonSkills.ok) {
                throw new Error(`Erro ao buscar o arquivo JSON: ${responseJsonSkills.statusText} (${this.urlJsonSkills})`);
            }
            
            const skills = await responseJsonSkills.json();
            
            // Chama a função que gera o HTML e insere na tela
            this.exibirSkillsCircule(skills);

        } catch (error) {
            console.error("Falha ao gerar as skills:", error);
        }
    }

    /**
     * Gera o HTML e insere as skills no elemento da instância.
     * Adiciona o evento de clique para abrir o modal.
     * @param {Array<Object>} skills O array de objetos com os dados das skills.
     */
    exibirSkillsCircule(skills) {
        // Limpa o conteúdo anterior
        this.elementoInsercao.innerHTML = '';

        // Gera o HTML para cada skill
        const htmlContent = skills.map(skill => `
            <li>
                <h3 class="skills-group__title neon">${skill.titulo}</h3>
                <div class="circle-chart surface-variant">
                    <div class="circle-chart-icon-background"></div>
                    <svg  
                        class="circle-chart-background-icon neon on-surface-filter cursor-pointer" 
                        role="img" 
                        aria-label="Ícone da Habilidade"
                        onclick='abrirModalSkill(${JSON.stringify(skill)})'
                    >
                        <use xlink:href="assets/img/icons.svg#${skill.idicon}"/>
                    </svg>
                    <div class="circle-chart-background surface"></div>
                    <div class="percentage-bar" style="background: conic-gradient(var(--start-percentagem-bar-color) 0%, var(--end-percentagem-bar-color) ${skill.percentagem}%, transparent 0% 100%);"></div>
                </div>
            </li>
        `).join(''); // Une o array de strings em uma única string HTML

        this.elementoInsercao.innerHTML = htmlContent;
    }
}

// ==========================================================
// FUNÇÕES GLOBAIS PARA O MODAL DE SKILLS
// (Mantidas fora da classe para serem acessíveis pelo HTML onclick)
// ==========================================================

/**
 * Abre o modal com os detalhes da skill.
 * @param {Object} skill Objeto contendo os dados da skill.
 */
window.abrirModalSkill = function(skill) {
    // 1. Remove qualquer modal existente para evitar duplicidade
    const modalExistente = document.querySelector('.modal__overlay');
    if (modalExistente) {
        modalExistente.remove();
    }

    // 2. Monta o conteúdo e o overlay do modal (Reutilizando as classes do portfólio)
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

    // 3. Insere o modal no corpo do documento
    document.body.insertAdjacentHTML('beforeend', modalContent);
    document.body.style.overflow = 'hidden'; // Evita scroll do fundo
}

/**
 * Fecha o modal de detalhes da skill.
 */
window.fecharModalSkill = function() {
    const modal = document.querySelector('.modal__overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = ''; // Restaura o scroll do corpo
    }
}