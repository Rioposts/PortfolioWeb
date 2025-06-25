// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll behavior
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav item on scroll
    const highlightNav = () => {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    
    // Header styling on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Fractal tree animation
    const createFractalTree = () => {
        const svg = document.querySelector('.fractal-tree svg');
        if (!svg) return;
        
        // Basic fractal pattern
        const branch = (x1, y1, length, angle, depth) => {
            if (depth === 0) return;
            
            const x2 = x1 + length * Math.cos(angle);
            const y2 = y1 + length * Math.sin(angle);
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M${x1},${y1} L${x2},${y2}`);
            path.setAttribute('stroke', 'rgba(255,255,255,0.8)');
            path.setAttribute('stroke-width', (depth * 0.5) + 'px');
            path.setAttribute('fill', 'none');
            
            svg.appendChild(path);
            
            // Recursively create branches
            branch(x2, y2, length * 0.7, angle - 0.5, depth - 1);
            branch(x2, y2, length * 0.7, angle + 0.5, depth - 1);
        };
        
        // Clear previous tree
        svg.innerHTML = '';
        
        // Start drawing from bottom center
        branch(100, 180, 40, -Math.PI/2, 5);
    };
    
    // Initialize fractal tree
    createFractalTree();
    
    // Subtle animation for CTA button
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transition = 'transform 0.3s ease-in-out';
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });
    
    // Add animation to project cards
    const animateProjectCards = () => {
        const projectCards = document.querySelectorAll('.project-card');
        
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    };
    
    // Initialize animations with a slight delay
    setTimeout(() => {
        animateProjectCards();
    }, 500);
});