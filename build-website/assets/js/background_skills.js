document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('floating-code-container');
    if (!container) return;

    // Palavras e tecnologias para alternar (Mantenha ou aumente esta lista se quiser mais variedade!)
    const words = [
        'Python', 'JavaScript', 'Node.js', 'SQL', 'C++', 'Dart', 
        'HTML', 'CSS', 'Flutter', 'API', 'Docker', 'Git', 'SOLID',
        'TypeScript', 'REST', 'Linux', 'Agile', 'Scrum', 'Figma',
        'OOP', 'DesignPatterns', 'CleanCode', 'UnitTests', 'CI/CD'
    ];
    
    // Configurações
    const maxWords = 28; // <-- MUDANÇA AQUI: Aumentado para 28
    const animationInterval = 250; // Tempo entre a aparição de uma nova palavra (reduzi o intervalo para garantir que o efeito seja preenchido mais rapidamente)
    const fadeOutTime = 5000; // Tempo até a palavra desaparecer (em ms)

    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    function createRandomWord() {
        // 1. Cria o elemento
        const wordElement = document.createElement('span');
        wordElement.className = 'floating-code-word';
        wordElement.textContent = getRandomWord();

        // 2. Calcula posição aleatória dentro do contêiner
        const containerRect = container.getBoundingClientRect();
        
        // Assegura que a palavra não fique muito perto das bordas (10% de margem)
        const leftMax = containerRect.width * 0.9;
        const topMax = containerRect.height * 0.9;
        const leftMin = containerRect.width * 0.1;
        const topMin = containerRect.height * 0.1;

        const randomLeft = Math.random() * (leftMax - leftMin) + leftMin;
        const randomTop = Math.random() * (topMax - topMin) + topMin;

        wordElement.style.transform = `translate(${randomLeft}px, ${randomTop}px)`;
        wordElement.style.fontSize = `${Math.random() * 0.8 + 1.2}rem`; // Tamanho levemente aleatório (entre 1.2rem e 2.0rem)

        // 3. Adiciona ao contêiner
        container.appendChild(wordElement);

        // 4. Animação de entrada (aparição)
        // Usamos um timeout pequeno para que a transição CSS funcione
        setTimeout(() => {
            wordElement.style.opacity = 0.15; // Torna visível (0.15 é sutil)
        }, 50);

        // 5. Animação de saída (desaparecimento)
        setTimeout(() => {
            wordElement.style.opacity = 0; // Torna invisível
            
            // Remove o elemento do DOM após a transição para limpar a memória
            setTimeout(() => {
                container.removeChild(wordElement);
            }, 1600); // Deve ser um pouco mais longo que o tempo da transição CSS (1.5s)

        }, fadeOutTime);
    }
    
    // Função principal que mantém a contagem de palavras
    function manageFloatingWords() {
        // Se houver menos palavras que o máximo, cria uma nova
        if (container.children.length < maxWords) {
            createRandomWord();
        }
    }

    // Inicia e mantém o ciclo de criação de palavras
    setInterval(manageFloatingWords, animationInterval); 
});