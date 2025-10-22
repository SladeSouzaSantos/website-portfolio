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
            
            this.exibirSkillsCircule(skills);

        } catch (error) {
            console.error("Falha ao gerar as skills:", error);
        }
    }

    /**
     * Gera o HTML e insere as skills no elemento da instância.
     * @param {Array<Object>} skills O array de objetos com os dados das skills.
     */
    exibirSkillsCircule(skills) {
        // Limpa o conteúdo anterior
        this.elementoInsercao.innerHTML = '';

        // Gera o HTML para cada skill (usando .map e .join é mais eficiente que innerHTML +=)
        const htmlContent = skills.map(skill => `
            <li>
                <h3 class="skills-group__title neon">${skill.titulo}</h3>
                <div class="circle-chart surface-variant">
                    <div class="circle-chart-icon-background"></div>
                    <svg class="circle-chart-background-icon neon surface-variant-filter" role="img" aria-label="Ícone da Habilidade"><use xlink:href="assets/img/icons.svg#${skill.idicon}"/></svg>
                    <div class="circle-chart-background surface"></div>
                    <div class="percentage-bar" style="background: conic-gradient(var(--start-percentagem-bar-color) 0%, var(--end-percentagem-bar-color) ${skill.percentagem}%, transparent 0% 100%);"></div>
                </div>
            </li>
        `).join(''); // Une o array de strings em uma única string HTML

        // Injeta todo o conteúdo de uma vez
        this.elementoInsercao.innerHTML = htmlContent;
    }
}