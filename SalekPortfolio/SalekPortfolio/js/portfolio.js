// Portfolio Section JavaScript - No scroll effects
document.addEventListener('DOMContentLoaded', function() {
    initPortfolioModal();
    initPortfolioHover();
    initPortfolioFilter();
});

// Portfolio modal functionality
function initPortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const closeBtn = document.querySelector('.close');
    
    // Portfolio data (you can expand this)
    const portfolioData = {
        'E-commerce Platform': {
            image: 'img/project1.jpg',
            description: 'A comprehensive e-commerce solution built with ASP.NET Core, featuring user authentication, product management, shopping cart, and payment processing.',
            tech: ['ASP.NET Core', 'SQL Server', 'JavaScript', 'Bootstrap', 'Entity Framework']
        },
        'Task Management System': {
            image: 'img/project2.jpg',
            description: 'Real-time task management application with team collaboration features, built using SignalR for live updates.',
            tech: ['C#', 'SignalR', 'Bootstrap', 'SQL Server', 'jQuery']
        },
        'Banking System': {
            image: 'img/project3.jpg',
            description: 'Secure banking application with advanced security measures, transaction processing, and account management.',
            tech: ['ASP.NET', 'Entity Framework', 'Security', 'SQL Server', 'C#']
        },
        'Portfolio Website': {
            image: 'img/project4.jpg',
            description: 'Modern responsive portfolio website showcasing web development skills with clean design and smooth interactions.',
            tech: ['HTML/CSS', 'JavaScript', 'Responsive', 'CSS Grid', 'Flexbox']
        }
    };
    
    // Open modal when portfolio item is clicked
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const data = portfolioData[title];
            
            if (data) {
                document.getElementById('modalImage').src = data.image;
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalDescription').textContent = data.description;
                
                const techContainer = document.getElementById('modalTech');
                techContainer.innerHTML = '';
                data.tech.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    techContainer.appendChild(span);
                });
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Basic portfolio hover effects
function initPortfolioHover() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Portfolio filter functionality (optional)
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });
}

// Portfolio lazy loading (basic implementation)
function initPortfolioLazyLoading() {
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    
    portfolioImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Fallback if image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Initialize lazy loading
initPortfolioLazyLoading();

// Portfolio item click handling for links
function initPortfolioLinks() {
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent modal from opening
            
            // You can add specific functionality here
            const isEyeIcon = this.querySelector('.fa-eye');
            const isGithubIcon = this.querySelector('.fa-github');
            
            if (isEyeIcon) {
                // Handle demo link
                console.log('Opening demo...');
            } else if (isGithubIcon) {
                // Handle GitHub link
                console.log('Opening GitHub...');
            }
        });
    });
}

// Initialize portfolio links
initPortfolioLinks();