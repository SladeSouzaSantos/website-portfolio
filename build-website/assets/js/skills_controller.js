/**
 * SKILLS CONTROLLER - Galeria de Círculos Independentes
 */
document.addEventListener('DOMContentLoaded', () => {
    const skillBlocks = document.querySelectorAll('.skill-block');

    skillBlocks.forEach(async (block) => {
        const jsonPath = block.dataset.json;
        const baseColor = block.dataset.color;
        
        const ulElement = block.querySelector('.skills-group-radial');
        const typedSpan = block.querySelector('.text-skill-center');
        const circleContainer = block.querySelector('.skills-container');
        const rotatingBorder = block.querySelector('.skills-rotating-border');

        // 1. Estilização Visual do Círculo
        if (circleContainer) circleContainer.style.backgroundColor = baseColor;
        if (rotatingBorder) {
            rotatingBorder.style.boxShadow = `0 0 20px ${baseColor}`;
            rotatingBorder.style.borderColor = "rgba(255,255,255,0.4)";
        }

        // 2. Estado local para Typed e Hover
        let state = {
            instance: null,
            hoverInstance: null,
            initialStrings: [],
            timeoutId: null
        };

        // 3. Injetar Skills via Generator
        new SkillsGenerator(ulElement, jsonPath);

        // 4. PINTAR OS ÍCONES (Garante que peguem a cor do background)
        const observer = new MutationObserver(() => {
            const icons = ulElement.querySelectorAll('.skill-content');
            if (icons.length > 0) {
                icons.forEach(icon => {
                    icon.style.backgroundColor = baseColor;
                    icon.style.border = `2px solid rgba(255,255,255,0.2)`;
                });
                observer.disconnect();
            }
        });
        observer.observe(ulElement, { childList: true });

        // 5. Configuração do Typed.js e Eventos
        try {
            const response = await fetch(jsonPath);
            const data = await response.json();
            state.initialStrings = data.map(s => s.titulo.replace(/&/g, '&amp;'));

            const initTypedLocal = (strings, isLoop) => {
                return new Typed(typedSpan, {
                    strings: strings,
                    typeSpeed: 60,
                    backSpeed: 30,
                    backDelay: 3000,
                    loop: isLoop,
                    smartBackspace: false,
                    preStringTyped: (arrayPos, self) => {
                        highlightLocalIcon(ulElement, self.strings[arrayPos]);
                    }
                });
            };

            state.instance = initTypedLocal(state.initialStrings, true);

            // 6. HOVER LOCAL (Restaurado)
            ulElement.addEventListener('mouseover', (e) => {
                const node = e.target.closest('.skill-node-item');
                if (!node) return;

                const title = node.getAttribute('data-skill-title');
                if (state.timeoutId) clearTimeout(state.timeoutId);
                
                highlightLocalIcon(ulElement, title);
                if (state.instance) state.instance.destroy();
                if (state.hoverInstance) state.hoverInstance.destroy();

                state.hoverInstance = initTypedLocal([title.replace(/&/g, '&amp;')], false);
            });

            ulElement.addEventListener('mouseout', (e) => {
                const node = e.target.closest('.skill-node-item');
                if (!node) return;

                highlightLocalIcon(ulElement, null);
                if (state.hoverInstance) state.hoverInstance.destroy();

                state.timeoutId = setTimeout(() => {
                    state.instance = initTypedLocal(state.initialStrings, true);
                }, 500);
            });

        } catch (e) {
            console.error("Erro ao carregar círculo:", e);
        }
    });

    // Função de Highlight (independente de IDs)
    function highlightLocalIcon(ulContainer, skillTitle) {
        ulContainer.querySelectorAll('.skill-node-item').forEach(el => el.classList.remove('skill-highlight'));
        if (skillTitle) {
            const cleanTitle = skillTitle.replace(/&amp;/g, '&');
            const classTarget = cleanTitle.toLowerCase()
                                          .replace(/\+/g, 'plus')
                                          .replace(/&/g, '')
                                          .replace(/[^a-z0-9]/g, '');
            const el = ulContainer.querySelector(`.skill-${classTarget}`);
            if (el) el.classList.add('skill-highlight');
        }
    }
});