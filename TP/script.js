// Efectos interactivos para Spotify Wrapped Style
document.addEventListener('DOMContentLoaded', function() {
    
    // Efecto de partículas flotantes adicionales
    createFloatingParticles();
    
    // Efecto de hover en los paneles
    addPanelHoverEffects();
    
    // Efecto de typing en el título
    addTypingEffect();
    
    // Efecto de scroll parallax
    addScrollEffects();
});

// Crear partículas flotantes adicionales
function createFloatingParticles() {
    const colors = ['#1DB954', '#FF6B9D', '#FF8A00', '#FFD93D', '#8B5CF6'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 6 + 4}px;
            height: ${Math.random() * 6 + 4}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        document.body.appendChild(particle);
    }
}

// Efectos de hover en los paneles
function addPanelHoverEffects() {
    const panels = document.querySelectorAll('.chart-panel');
    
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.8)';
            
            // Agregar efecto de brillo
            const glow = document.createElement('div');
            glow.className = 'panel-glow';
            glow.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 24px;
                box-shadow: 0 0 30px currentColor;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            `;
            
            if (this.classList.contains('left')) {
                glow.style.color = '#1DB954';
            } else {
                glow.style.color = '#8B5CF6';
            }
            
            this.appendChild(glow);
            setTimeout(() => glow.style.opacity = '0.3', 10);
        });
        
        panel.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
            
            const glow = this.querySelector('.panel-glow');
            if (glow) {
                glow.style.opacity = '0';
                setTimeout(() => glow.remove(), 300);
            }
        });
    });
}

// Efecto de typing en el título
function addTypingEffect() {
    const title = document.querySelector('header h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Iniciar el efecto después de un pequeño delay
    setTimeout(typeWriter, 500);
}

// Efectos de scroll
function addScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        
        // Efecto parallax en el fondo
        if (parallax) {
            document.body.style.setProperty('--scroll-offset', `${scrolled * 0.5}px`);
        }
        
        // Efecto de aparición en los paneles
        const panels = document.querySelectorAll('.chart-panel');
        panels.forEach((panel, index) => {
            const rect = panel.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }
        });
    });
}

// Agregar estilos CSS dinámicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes floatParticle {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.3;
        }
        25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg); 
            opacity: 0.6;
        }
        50% { 
            transform: translateY(-40px) translateX(-5px) rotate(180deg); 
            opacity: 0.3;
        }
        75% { 
            transform: translateY(-20px) translateX(-15px) rotate(270deg); 
            opacity: 0.6;
        }
    }
    
    .chart-panel {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .chart-panel.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .panel-glow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 24px;
        box-shadow: 0 0 30px currentColor;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
`;

document.head.appendChild(dynamicStyles);

// Efecto de aparición al cargar la página
window.addEventListener('load', function() {
    const panels = document.querySelectorAll('.chart-panel');
    panels.forEach((panel, index) => {
        setTimeout(() => {
            panel.classList.add('visible');
        }, index * 200);
    });
});
