// Skills Section JavaScript - No scroll effects
document.addEventListener('DOMContentLoaded', function() {
    initSkillBars();
    initSkillInteractions();
});

// Initialize skill bar animations (basic functionality)
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        // Simple animation on load
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// Basic skill interactions
function initSkillInteractions() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Skill bar reset function (for potential future use)
function resetSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, 100);
    });
}

// Tech stack hover effects (if you have tech icons)
function initTechStackEffects() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Initialize tech stack effects
initTechStackEffects();