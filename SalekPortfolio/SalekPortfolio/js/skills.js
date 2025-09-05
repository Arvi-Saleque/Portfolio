// Skills Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initSkillsAnimations();
    initSkillBars();
    initSkillHoverEffects();
});

// Initialize skills section animations
function initSkillsAnimations() {
    const skillsSection = document.querySelector('.skills-section');
    
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillCategories();
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(skillsSection);
}

// Animate skill categories
function animateSkillCategories() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.classList.add('animate');
            
            // Start skill bar animations after category appears
            setTimeout(() => {
                animateSkillBarsInCategory(category);
            }, 300);
        }, index * 200); // Stagger animation
    });
}

// Animate skill bars in a specific category
function animateSkillBarsInCategory(category) {
    const skillBars = category.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.getAttribute('data-width');
            
            bar.style.width = targetWidth + '%';
            bar.classList.add('animate');
            
            // Add shimmer effect
            setTimeout(() => {
                addShimmerEffect(bar);
            }, 500);
        }, index * 150); // Stagger bar animations
    });
}

// Add shimmer effect to skill bars
function addShimmerEffect(bar) {
    const shimmer = document.createElement('div');
    shimmer.className = 'skill-shimmer';
    shimmer.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        animation: shimmer 2s infinite;
    `;
    
    bar.appendChild(shimmer);
}

// Initialize skill bar interactions
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const progress = bar.querySelector('.skill-progress');
        
        if (!progress) return;
        
        // Hover effect to show exact percentage
        bar.addEventListener('mouseenter', function() {
            const percentage = progress.getAttribute('data-width');
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = percentage + '%';
            tooltip.style.cssText = `
                position: absolute;
                top: -40px;
                left: ${percentage}%;
                transform: translateX(-50%);
                background: var(--accent-bg);
                color: var(--primary-cyan);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
                border: 1px solid var(--primary-cyan);
                z-index: 10;
                opacity: 0;
                transition: opacity 0.3s ease;
                box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
            
            // Animate tooltip appearance
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 50);
        });
        
        bar.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.skill-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    tooltip.remove();
                }, 300);
            }
        });
    });
}

// Initialize skill hover effects
function initSkillHoverEffects() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const icon = category.querySelector('h3 i');
        const skillItems = category.querySelectorAll('.skill-item');
        
        // Category hover effects
        category.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.textShadow = '0 0 20px var(--primary-cyan)';
            }
            
            // Enhance all skill bars in this category
            skillItems.forEach(item => {
                const progress = item.querySelector('.skill-progress');
                if (progress) {
                    progress.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.8)';
                }
            });
        });
        
        category.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.textShadow = 'none';
            }
            
            // Reset skill bar effects
            skillItems.forEach(item => {
                const progress = item.querySelector('.skill-progress');
                if (progress) {
                    progress.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
                }
            });
        });
        
        // Individual skill item hover effects
        skillItems.forEach(item => {
            const skillProgress = item.querySelector('.skill-progress');
            const skillPercentage = item.querySelector('.skill-percentage');
            
            item.addEventListener('mouseenter', function() {
                if (skillProgress) {
                    skillProgress.style.transform = 'scaleY(1.5)';
                    skillProgress.style.filter = 'brightness(1.2)';
                }
                
                if (skillPercentage) {
                    skillPercentage.style.transform = 'scale(1.1)';
                    skillPercentage.style.textShadow = '0 0 10px var(--primary-cyan)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (skillProgress) {
                    skillProgress.style.transform = 'scaleY(1)';
                    skillProgress.style.filter = 'brightness(1)';
                }
                
                if (skillPercentage) {
                    skillPercentage.style.transform = 'scale(1)';
                    skillPercentage.style.textShadow = 'none';
                }
            });
        });
    });
}

// Skill comparison feature
function initSkillComparison() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Add comparison button to each category
    skillCategories.forEach(category => {
        const compareBtn = document.createElement('button');
        compareBtn.textContent = 'Compare Skills';
        compareBtn.className = 'compare-btn';
        compareBtn.style.cssText = `
            background: linear-gradient(45deg, var(--neon-purple), var(--primary-cyan));
            color: var(--text-primary);
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1.5rem;
            transition: all 0.3s ease;
            width: 100%;
        `;
        
        category.appendChild(compareBtn);
        
        compareBtn.addEventListener('click', function() {
            showSkillComparison(category);
        });
        
        compareBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(128, 0, 255, 0.3)';
        });
        
        compareBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Show skill comparison modal
function showSkillComparison(category) {
    const skillItems = category.querySelectorAll('.skill-item');
    const categoryTitle = category.querySelector('h3').textContent;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'skill-comparison-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--accent-bg);
        border: 2px solid var(--primary-cyan);
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        position: relative;
    `;
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 2rem;
        cursor: pointer;
    `;
    
    closeBtn.addEventListener('click', () => modal.remove());
    
    // Modal title
    const title = document.createElement('h3');
    title.textContent = `${categoryTitle} Skills Comparison`;
    title.style.cssText = `
        color: var(--primary-cyan);
        margin-bottom: 2rem;
        text-align: center;
    `;
    
    // Skills chart
    const chartContainer = document.createElement('div');
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-header span:first-child').textContent;
        const skillValue = parseInt(item.querySelector('.skill-progress').getAttribute('data-width'));
        
        const skillRow = document.createElement('div');
        skillRow.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding: 1rem;
            background: var(--secondary-bg);
            border-radius: 10px;
        `;
        
        skillRow.innerHTML = `
            <span style="color: var(--text-primary); font-weight: 600;">${skillName}</span>
            <span style="color: var(--primary-cyan); font-weight: 700; font-size: 1.2rem;">${skillValue}%</span>
        `;
        
        chartContainer.appendChild(skillRow);
    });
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(chartContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

// Initialize skill comparison
initSkillComparison();

// Responsive skills layout
function initResponsiveSkills() {
    const skillsContent = document.querySelector('.skills-content');
    
    if (!skillsContent) return;
    
    function adjustSkillsLayout() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 768) {
            skillsContent.style.gridTemplateColumns = '1fr';
        } else if (screenWidth < 1024) {
            skillsContent.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            skillsContent.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        }
    }
    
    window.addEventListener('resize', adjustSkillsLayout);
    adjustSkillsLayout();
}

// Initialize responsive skills
initResponsiveSkills();

// Skill progress reset and replay
function initSkillReplay() {
    const skillsSection = document.querySelector('.skills-section');
    
    if (!skillsSection) return;
    
    // Add replay button
    const replayBtn = document.createElement('button');
    replayBtn.innerHTML = '<i class="fas fa-redo"></i> Replay Animations';
    replayBtn.className = 'skills-replay-btn';
    replayBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: linear-gradient(45deg, var(--primary-cyan), var(--neon-blue));
        color: var(--primary-bg);
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    skillsSection.style.position = 'relative';
    skillsSection.appendChild(replayBtn);
    
    replayBtn.addEventListener('click', function() {
        replaySkillAnimations();
    });
    
    replayBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 255, 255, 0.3)';
    });
    
    replayBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
}

// Replay skill animations
function replaySkillAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Reset all animations
    skillCategories.forEach(category => {
        category.classList.remove('animate');
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
    });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        bar.classList.remove('animate');
    });
    
    // Restart animations
    setTimeout(() => {
        animateSkillCategories();
    }, 100);
}

// Initialize skill replay
initSkillReplay();

// Performance optimization
let skillsTicking = false;

function optimizedSkillsScroll() {
    if (!skillsTicking) {
        requestAnimationFrame(() => {
            // Any scroll-based animations go here
            skillsTicking = false;
        });
        skillsTicking = true;
    }
}

window.addEventListener('scroll', optimizedSkillsScroll);