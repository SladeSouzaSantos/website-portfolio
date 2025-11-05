document.addEventListener('DOMContentLoaded', () => {

    if (typeof Typed === 'undefined') {
        console.error("Typed.js não carregado. Verifique o script na tag <head> ou <body>.");
        return;
    }
    
    const skillSections = [
        { name: 'Front-End', ulId: 'skills-front-end', spanId: 'frontend', jsonPath: 'assets/json/skills_front-end.json' },
        { name: 'Back-End', ulId: 'skills-back-end', spanId: 'backend', jsonPath: 'assets/json/skills_back-end.json' },
        { name: 'Database', ulId: 'skills-database', spanId: 'database', jsonPath: 'assets/json/skills_database.json' },
        { name: 'Frameworks', ulId: 'skills-frameworks', spanId: 'frameworks', jsonPath: 'assets/json/skills_frameworks.json' },
        { name: 'Tools', ulId: 'skills-tools', spanId: 'tools', jsonPath: 'assets/json/skills_tools.json' }
    ];
    
    const typedInstances = {};
    
    function escapeTypedString(str) {
        
        return str.replace(/&/g, '&amp;'); 
    }
    
    function getSkillClassSelector(title) {
        
        return title
            .toLowerCase()
            .replace(/\+/g, 'plus') 
            .replace(/&/g, '') 
            .replace(/[^a-z0-9]/g, ''); 
    }
    
    function highlightSkillIcon(ulId, skillTitle) {
        const container = document.getElementById(ulId);
        if (!container) return;

        const previouslyHighlighted = container.querySelector('.skill-highlight');
        if (previouslyHighlighted) {
            previouslyHighlighted.classList.remove('skill-highlight');
        }

        if (skillTitle) {
            const skillClass = getSkillClassSelector(skillTitle);
            const skillSelector = `.skill-${skillClass}`;
            const skillElement = container.querySelector(skillSelector);
            
            if (skillElement) {
                skillElement.classList.add('skill-highlight');
            }
        }
    }

    /**
     * @param {string} ulId O ID do container UL, necessário para o highlight durante o loop.
     */
    function initTyped(selector, stringsArray, ulId = null, typeSpeed = 60, backDelay = 3000, cursorChar = '_', loop = true) {
        const options = {
            strings: stringsArray,
            typeSpeed: typeSpeed,
            backSpeed: 30,
            backDelay: backDelay, 
            startDelay: 50,
            loop: loop,
            showCursor: true,
            cursorChar: cursorChar,
        };
        
        if (loop && ulId) {
            options.onStringTyped = function(arrayPos, self) {
                
                const originalTitle = self.strings[arrayPos].replace(/&amp;/g, '&');
                highlightSkillIcon(ulId, originalTitle);
            };
        }
        
        return new Typed(selector, options);
    }
    
    initTyped('#typed-output', [escapeTypedString("Sobre mim")], null, 50, 5000, '|', true);
    
    async function loadSkillsAndInitTyped(section) {
        try {
            const response = await fetch(section.jsonPath);
            const data = await response.json();
            
            const typedStrings = data.map(skill => escapeTypedString(skill.titulo));
            
            if (typedStrings.length > 0) {
                
                const instance = initTyped(`#${section.spanId}`, typedStrings, section.ulId);
                
                typedInstances[section.ulId] = {
                    instance: instance,
                    initialStrings: typedStrings, 
                    selector: `#${section.spanId}`,
                    hoverInstance: null, 
                    timeoutId: null 
                };
                
                highlightSkillIcon(section.ulId, data[0].titulo);
            }

        } catch (error) {
            console.warn(`Erro ao carregar ou processar o JSON para ${section.name}:`, error);
        }
    }
    
    skillSections.forEach(loadSkillsAndInitTyped);
    
    document.addEventListener('skillHoverStart', (event) => {
        const { targetId, title } = event.detail; 
        const data = typedInstances[targetId];
        
        if (!data) return; 
        
        if (data.timeoutId) {
            clearTimeout(data.timeoutId);
            data.timeoutId = null;
        }
        
        highlightSkillIcon(targetId, title);
        
        let activeHoverInstanceForSection = data.hoverInstance || null;
        
        if (activeHoverInstanceForSection) {
            activeHoverInstanceForSection.destroy();
        }

        const targetElement = document.querySelector(data.selector);

        if (data.instance && targetElement) {
            
            data.instance.destroy(); 
            
            const escapedTitle = escapeTypedString(title);
            
            const newHoverInstance = new Typed(data.selector, {
                strings: [escapedTitle],
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 999999, 
                startDelay: 50, 
                loop: false, 
                showCursor: true,
                cursorChar: '_',
            });
            
            typedInstances[targetId].hoverInstance = newHoverInstance;
        }
    });
    
    document.addEventListener('skillHoverEnd', (event) => {
        const { targetId } = event.detail;
        const data = typedInstances[targetId];
        
        if (!data) return; 
        
        let activeHoverInstanceForSection = data.hoverInstance || null;
        
        highlightSkillIcon(targetId, null);

        if (data.initialStrings.length > 0) {
            
            if (activeHoverInstanceForSection) {
                activeHoverInstanceForSection.destroy();
                
                typedInstances[targetId].hoverInstance = null;
            }
            
            data.timeoutId = setTimeout(() => {
                
                const newLoopInstance = initTyped(data.selector, data.initialStrings, targetId);
                
                typedInstances[targetId].instance = newLoopInstance;
                
                typedInstances[targetId].timeoutId = null;

            }, 200);
        }
    });

});