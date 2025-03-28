/**
 * Script para o Desafio Matemágica com Nome Flutuante
 * Desenvolvido para EscuderoDevWeb-Designer
 */

// Aguarda o carregamento completo do documento
document.addEventListener('DOMContentLoaded', () => {
    // ==== PARTE 1: MATEMÁGICA ====
    
    // Variável para armazenar o valor a ser somado
    let somaValor;
    
    /**
     * Função para gerar um número par aleatório entre min e max
     */
    function getRandomEvenNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num % 2 === 0 ? num : num + 1;
    }

    /**
     * Função para mostrar um passo específico e esconder os demais
     */
    function showStep(stepId) {
        // Esconde todos os passos
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Mostra o passo desejado
        document.getElementById(stepId).classList.add('active');
        
        // Se for o resultado final, inicia a animação de confete
        if (stepId === 'step-result') {
            createConfetti();
        }
    }
    
    /**
     * Função para gerar e animar confetes na celebração do resultado
     */
    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Posição aleatória
            const left = Math.random() * window.innerWidth;
            const top = -20;
            
            // Estilo
            confetti.style.left = `${left}px`;
            confetti.style.top = `${top}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = confetti.style.width;
            
            document.body.appendChild(confetti);
            
            // Animação
            const animation = confetti.animate(
                [
                    { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                    { transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], 
                {
                    duration: Math.random() * 3000 + 2000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                }
            );
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    /**
     * Função para definir um novo valor aleatório para o jogo
     */
    function setRandomValue() {
        somaValor = getRandomEvenNumber(2, 100);
        document.getElementById('soma-valor-display').textContent = somaValor;
        document.getElementById('result-value').textContent = somaValor / 2;
    }
    
    // === Configuração dos eventos dos botões ===
    
    // Botão de iniciar
    document.getElementById('start-btn').addEventListener('click', () => {
        showStep('step-1');
    });
    
    // Botão de "Já pensei"
    document.getElementById('next-1').addEventListener('click', () => {
        showStep('step-2');
    });
    
    // Botão de "Pronto" (dobrar)
    document.getElementById('next-2').addEventListener('click', () => {
        setRandomValue();
        showStep('step-3');
    });
    
    // Botão de "Já somei"
    document.getElementById('next-3').addEventListener('click', () => {
        showStep('step-4');
    });
    
    // Botão de "Já dividi"
    document.getElementById('next-4').addEventListener('click', () => {
        showStep('step-5');
    });
    
    // Botão de "Já subtraí"
    document.getElementById('next-5').addEventListener('click', () => {
        showStep('step-result');
    });
    
    // Botão de "Jogar novamente"
    document.getElementById('restart').addEventListener('click', () => {
        showStep('step-start');
    });
    
    // Inicializa o valor aleatório
    setRandomValue();
    
    // ==== PARTE 2: NOME FLUTUANTE ====
    
    // Cria o elemento do nome flutuante
    const floatingName = document.createElement('div');
    floatingName.id = 'floating-name';
    floatingName.innerHTML = 'EscuderoDevWeb-Designer';
    document.body.appendChild(floatingName);

    // Configurações da animação do nome flutuante
    let posX = Math.random() * (window.innerWidth - 300);
    let posY = Math.random() * (window.innerHeight - 50);
    let speedX = 2 + Math.random() * 2;
    let speedY = 1 + Math.random() * 2;
    let rotation = 0;
    let rotationSpeed = 0.5;

    // Atualiza a posição do nome flutuante
    function updatePosition() {
        // Atualiza a posição
        posX += speedX;
        posY += speedY;
        rotation += rotationSpeed;

        // Verifica colisão com as bordas da janela
        if (posX <= 0 || posX >= window.innerWidth - floatingName.offsetWidth) {
            speedX = -speedX;
            speedX *= 0.9 + Math.random() * 0.2;
            updateGradient();
        }
        if (posY <= 0 || posY >= window.innerHeight - floatingName.offsetHeight) {
            speedY = -speedY;
            speedY *= 0.9 + Math.random() * 0.2;
            updateGradient();
        }

        // Limita a velocidade
        speedX = Math.max(Math.min(speedX, 5), -5);
        speedY = Math.max(Math.min(speedY, 5), -5);

        // Aplica a nova posição
        floatingName.style.left = posX + 'px';
        floatingName.style.top = posY + 'px';
        floatingName.style.transform = `rotate(${rotation}deg)`;

        // Continua a animação
        requestAnimationFrame(updatePosition);
    }

    // Atualiza o gradiente do texto
    function updateGradient() {
        // Gera valores RGB aleatórios para o gradiente
        const r1 = Math.floor(Math.random() * 255);
        const g1 = Math.floor(Math.random() * 255);
        const b1 = Math.floor(Math.random() * 255);
        
        const r2 = Math.floor(Math.random() * 255);
        const g2 = Math.floor(Math.random() * 255);
        const b2 = Math.floor(Math.random() * 255);

        // Aplica o gradiente ao texto
        floatingName.style.background = `linear-gradient(90deg, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}))`;
        floatingName.style.webkitBackgroundClip = 'text';
        floatingName.style.backgroundClip = 'text';
    }

    // Inicia a animação do nome flutuante
    updateGradient();
    updatePosition();

    // Atualiza quando a janela é redimensionada
    window.addEventListener('resize', () => {
        posX = Math.min(posX, window.innerWidth - floatingName.offsetWidth);
        posY = Math.min(posY, window.innerHeight - floatingName.offsetHeight);
    });
});