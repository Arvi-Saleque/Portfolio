// About Section JavaScript - No scroll effects
document.addEventListener('DOMContentLoaded', function() {
    initStatsCounter();
});

// Animated counter for statistics (basic functionality only)
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50; // Simple increment
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 30);
    });
}

// Basic image loading
function initAboutImageLoading() {
    const aboutImg = document.querySelector('.about-img');
    
    if (aboutImg) {
        aboutImg.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Fallback if image is already loaded
        if (aboutImg.complete) {
            aboutImg.style.opacity = '1';
        }
    }
}

// Initialize image loading
initAboutImageLoading();