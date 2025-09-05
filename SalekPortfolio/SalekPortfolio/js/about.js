// About Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAboutAnimations();
    initCounterAnimations();
    initAboutImageEffects();
});

// Initialize about section animations
function initAboutAnimations() {
    const aboutSection = document.querySelector('.about-section');
    
    if (!aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAboutElements();
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(aboutSection);
}

// Animate about elements
function animateAboutElements() {
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutText) {
        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateX(-50px)';
        aboutText.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            aboutText.style.opacity = '1';
            aboutText.style.transform = 'translateX(0)';
        }, 200);
    }
    
    if (aboutImage) {
        aboutImage.style.opacity = '0';
        aboutImage.style.transform = 'translateX(50px)';
        aboutImage.style.transition = 'all 0.8s ease 0.4s';
        
        setTimeout(() => {
            aboutImage.style.opacity = '1';
            aboutImage.style.transform = 'translateX(0)';
        }, 600);
    }
    
    // Trigger counter animations
    startCounterAnimations();
}

// Counter animation system
function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        // Set initial value to 0
        stat.textContent = '0';
    });
}

// Start counter animations
function startCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((stat, index) => {
        const targetValue = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = targetValue / (duration / 16); // 60fps
        let currentValue = 0;
        
        // Add delay for each counter
        setTimeout(() => {
            animateCounter(stat, currentValue, targetValue, increment);
        }, index * 300);
    });
}

// Animate individual counter
function animateCounter(element, currentValue, targetValue, increment) {
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
            
            // Add completion effect
            element.classList.add('counting');
            setTimeout(() => {
                element.classList.remove('counting');
            }, 600);
        }
        
        // Update display with proper formatting
        element.textContent = Math.floor(currentValue) + '+';
    }, 16); // ~60fps
}

// About image effects
function initAboutImageEffects() {
    const aboutImg = document.querySelector('.about-img');
    
    if (!aboutImg) return;
    
    // Parallax effect
    window.addEventListener('scroll', () => {
        const aboutSection = document.querySelector('.about-section');
        const rect = aboutSection.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            const parallaxSpeed = 0.1;
            const yPos = scrolled * parallaxSpeed;
            aboutImg.style.transform = `translateY(${yPos}px) scale(1.05)`;
        }
    });
    
    // Hover effects
    aboutImg.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) contrast(1.2)';
        this.style.transform = 'scale(1.08)';
    });
    
    aboutImg.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(0.9) contrast(1.1)';
        this.style.transform = 'scale(1.05)';
    });
}

// Stat items hover effects
function initStatItemEffects() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Pulse animation for the number
            const number = this.querySelector('.stat-number');
            if (number) {
                number.style.animation = 'pulse 0.6s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const number = this.querySelector('.stat-number');
            if (number) {
                number.style.animation = '';
            }
        });
    });
}

// Initialize stat item effects
initStatItemEffects();

// Background pattern animation
function initBackgroundAnimation() {
    const aboutSection = document.querySelector('.about-section');
    
    if (!aboutSection) return;
    
    // Create floating particles
    createFloatingParticles(aboutSection);
}

// Create floating particles for background effect
function createFloatingParticles(container) {
    const particleCount = 5;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--primary-cyan);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 1;
            box-shadow: 0 0 10px var(--primary-cyan);
        `;
        
        container.appendChild(particle);
        
        // Animate particle
        animateParticle(particle);
    }
}

// Animate floating particle
function animateParticle(particle) {
    const duration = Math.random() * 10000 + 15000; // 15-25 seconds
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;
    
    const startTime = Date.now();
    
    function updateParticle() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
            // Reset particle position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            animateParticle(particle);
            return;
        }
        
        // Smooth interpolation
        const currentX = startX + (endX - startX) * easeInOutQuad(progress);
        const currentY = startY + (endY - startY) * easeInOutQuad(progress);
        
        particle.style.left = currentX + '%';
        particle.style.top = currentY + '%';
        
        requestAnimationFrame(updateParticle);
    }
    
    updateParticle();
}

// Easing function
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Initialize background animation
initBackgroundAnimation();

// Responsive stats layout
function initResponsiveStats() {
    const statsContainer = document.querySelector('.stats-container');
    
    if (!statsContainer) return;
    
    function adjustStatsLayout() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 768) {
            statsContainer.style.gridTemplateColumns = '1fr';
            statsContainer.style.maxWidth = '400px';
        } else {
            statsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
            statsContainer.style.maxWidth = 'none';
        }
    }
    
    window.addEventListener('resize', adjustStatsLayout);
    adjustStatsLayout();
}

// Initialize responsive stats
initResponsiveStats();

// Performance optimization for scroll events
let aboutTicking = false;

function optimizedAboutScroll() {
    if (!aboutTicking) {
        requestAnimationFrame(() => {
            // Any scroll-based animations go here
            aboutTicking = false;
        });
        aboutTicking = true;
    }
}

window.addEventListener('scroll', optimizedAboutScroll);