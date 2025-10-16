 // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate the target position, accounting for fixed header
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without causing jump
                    history.replaceState(null, null, targetId);
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === targetId) {
                            link.classList.add('active');
                        }
                    });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });

        // Update active nav link on scroll
        let isScrolling;
        window.addEventListener('scroll', () => {
            // Clear previous timeout
            window.clearTimeout(isScrolling);
            
            // Set a timeout to run after scrolling finishes
            isScrolling = setTimeout(() => {
                const scrollPosition = window.scrollY;
                const headerHeight = document.querySelector('header').offsetHeight;
                
                document.querySelectorAll('section').forEach(section => {
                    const sectionTop = section.offsetTop - headerHeight - 50;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, 100);
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            // Set initial active nav link based on URL hash
            if (window.location.hash) {
                const targetLink = document.querySelector(`a[href="${window.location.hash}"]`);
                if (targetLink && targetLink.classList.contains('nav-link')) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    targetLink.classList.add('active');
                }
            }
        });