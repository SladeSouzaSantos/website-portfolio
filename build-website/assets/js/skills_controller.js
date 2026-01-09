/**
 * SKILLS CONTROLLER - Escala controlada via CSS
 */
document.addEventListener('DOMContentLoaded', () => {
    // === 1. CONFIGURAÇÕES E ESTADOS ===
    const LIST_ID = 'main-skills-list';
    const SPAN_SELECTOR = '#main-typed-span';
    const SOBRE_MIM_SELECTOR = '#typed-output';
    const CIRCLE_SELECTOR = '.skills-container';
    
    let typedData = {
        instance: null,      
        hoverInstance: null, 
        initialStrings: [],  
        timeoutId: null      
    };

    // === 2. FUNÇÃO: POPULAR CARDS ===
    async function populateCardPreviews() {
        const cards = document.querySelectorAll('.skill-card');
        
        for (const card of cards) {
            const jsonPath = card.dataset.json;
            const type = card.dataset.type;
            const listContainer = document.getElementById(`list-${type}`);

            if (!listContainer) continue;

            try {
                const response = await fetch(jsonPath);
                const data = await response.json();
                listContainer.innerHTML = '';
                
                data.forEach(skill => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <svg class="skill-li-icon"><use xlink:href="assets/img/icons.svg#${skill.idicon}"></use></svg>
                        <span class="skill-li-text">${skill.titulo}</span>
                    `;
                    
                    li.addEventListener('click', (e) => {
                        e.stopPropagation(); 
                        if (!card.classList.contains('active')) card.click();
                        
                        if (typedData.timeoutId) clearTimeout(typedData.timeoutId);
                        highlightSkillIcon(skill.titulo);

                        if (typedData.instance) typedData.instance.destroy();
                        if (typedData.hoverInstance) typedData.hoverInstance.destroy();

                        typedData.hoverInstance = initTyped([escapeTypedString(skill.titulo)], false);
                        
                        typedData.timeoutId = setTimeout(() => {
                            highlightSkillIcon(null);
                            if (typedData.hoverInstance) typedData.hoverInstance.destroy();
                            typedData.instance = initTyped(typedData.initialStrings, true);
                        }, 5000);
                    });
                    listContainer.appendChild(li);
                });
            } catch (error) {
                console.error(`Erro ao carregar preview:`, error);
            }
        }
    }

    // === 3. FUNÇÕES AUXILIARES ===
    function escapeTypedString(str) { 
        return str.replace(/&/g, '&amp;'); 
    }
    
    function getSkillClassSelector(title) {
        return title.toLowerCase().replace(/\+/g, 'plus').replace(/&/g, '').replace(/[^a-z0-9]/g, '');
    }

    function highlightSkillIcon(skillTitle) {
        const container = document.getElementById(LIST_ID);
        if (!container) return;

        const prev = container.querySelector('.skill-highlight');
        if (prev) {
            prev.classList.remove('skill-highlight');
        }

        if (skillTitle) {
            const el = container.querySelector(`.skill-${getSkillClassSelector(skillTitle)}`);
            if (el) {
                el.classList.add('skill-highlight');
            }
        }
    }

    function initTyped(stringsArray, isLoop = true) {
        if (typedData.instance && isLoop) typedData.instance.destroy();
        return new Typed(SPAN_SELECTOR, {
            strings: stringsArray,
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: isLoop ? 3000 : 999999,
            loop: isLoop,
            showCursor: true,
            cursorChar: '_',
            // DISPARA ANTES DE COMEÇAR A ESCREVER
            preStringTyped: (arrayPos, self) => {
                if (isLoop) {
                    // Pega a string que vai ser escrita e limpa o escape de caractere
                    const title = self.strings[arrayPos].replace(/&amp;/g, '&');
                    highlightSkillIcon(title);
                }
            }
        });
    }

    // === 4. CARREGAMENTO DE CATEGORIA (SEM ESCALA NO GSAP) ===
    async function loadCategory(jsonPath, title, color) {
        const circle = document.querySelector(CIRCLE_SELECTOR);
        const rotatingBorder = document.querySelector('.skills-rotating-border');
        const listContainer = document.getElementById(LIST_ID);
        const centerText = document.querySelector('.text-skill-center');

        if (!circle || !listContainer) return;

        gsap.to(circle, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: async () => {
                document.getElementById('main-skill-title').innerText = title;
                
                circle.style.backgroundColor = color;
                if (rotatingBorder) {
                    rotatingBorder.style.borderColor = "rgba(255,255,255,0.4)";
                    rotatingBorder.style.boxShadow = `0 0 20px ${color}`;
                }

                if (centerText && color) {
                    centerText.style.color = color;
                }

                const observer = new MutationObserver((mutations, obs) => {
                    const skillContents = document.querySelectorAll('.skill-content');
                    if (skillContents.length > 0) {
                        skillContents.forEach(content => {
                            content.style.backgroundColor = color;
                            content.style.border = `2px solid ${color}`;
                        });
                        obs.disconnect();
                    }
                });

                observer.observe(listContainer, { childList: true, subtree: true });

                if (typedData.instance) typedData.instance.destroy();
                if (typedData.hoverInstance) typedData.hoverInstance.destroy();
                clearTimeout(typedData.timeoutId);
                document.querySelector(SPAN_SELECTOR).innerText = '';

                new SkillsGenerator(LIST_ID, jsonPath);

                try {
                    const response = await fetch(jsonPath);
                    const data = await response.json();
                    typedData.initialStrings = data.map(s => escapeTypedString(s.titulo));
                    typedData.instance = initTyped(typedData.initialStrings);

                    gsap.to(circle, {
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                } catch (e) {
                    gsap.to(circle, { opacity: 1 });
                }
            }
        });
    }

    // === 5. EVENTOS E INICIALIZAÇÃO ===
    document.querySelectorAll('.skill-nav').forEach(nav => {
        nav.addEventListener('click', function() {
            if (this.classList.contains('active') && typedData.instance) return;
            document.querySelectorAll('.skill-nav').forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            const color = window.getComputedStyle(this).backgroundColor;
            loadCategory(this.dataset.json, this.dataset.type, color);
        });
    });

    document.addEventListener('skillHoverStart', (e) => {
        const { title } = e.detail;
        if (typedData.timeoutId) clearTimeout(typedData.timeoutId);
        highlightSkillIcon(title);
        if (typedData.instance) typedData.instance.destroy();
        if (typedData.hoverInstance) typedData.hoverInstance.destroy();
        typedData.hoverInstance = initTyped([escapeTypedString(title)], false);
    });

    document.addEventListener('skillHoverEnd', () => {
        highlightSkillIcon(null);
        if (typedData.hoverInstance) typedData.hoverInstance.destroy();
        typedData.timeoutId = setTimeout(() => {
            typedData.instance = initTyped(typedData.initialStrings, true);
        }, 200);
    });

    populateCardPreviews();

    if (document.querySelector(SOBRE_MIM_SELECTOR)) {
        new Typed(SOBRE_MIM_SELECTOR, {
            strings: ["Sobre mim"],
            typeSpeed: 50,
            backDelay: 2000,
            loop: true,
            cursorChar: '|'
        });
    }

    const firstCard = document.querySelector('.skill-nav.active');
    if (firstCard) {
        const color = window.getComputedStyle(firstCard).backgroundColor;
        loadCategory(firstCard.dataset.json, firstCard.dataset.type, color);
    }
});