// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll animation for elements
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial styles for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Mobile navigation toggle
    const createMobileNav = function() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');
            
            if (!document.querySelector('.mobile-toggle')) {
                const mobileToggle = document.createElement('div');
                mobileToggle.classList.add('mobile-toggle');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                nav.insertBefore(mobileToggle, navLinks);
                
                navLinks.style.display = 'none';
                
                mobileToggle.addEventListener('click', function() {
                    if (navLinks.style.display === 'none') {
                        navLinks.style.display = 'flex';
                        navLinks.style.flexDirection = 'column';
                        navLinks.style.width = '100%';
                        navLinks.style.marginTop = '15px';
                        mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
                    } else {
                        navLinks.style.display = 'none';
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            }
        } else {
            const mobileToggle = document.querySelector('.mobile-toggle');
            if (mobileToggle) {
                mobileToggle.remove();
            }
            
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.width = 'auto';
            navLinks.style.marginTop = '0';
        }
    };
    
    // Run mobile nav function on load and resize
    window.addEventListener('load', createMobileNav);
    window.addEventListener('resize', createMobileNav);
});