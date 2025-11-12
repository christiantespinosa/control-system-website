// Portfolio Management Module
class AutomationPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = false;
        this.animationDelay = 100;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.initializeNavigation();
    }

    setupEventListeners() {
        // Navigation clicks
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.smoothScrollTo(target);
            });
        });

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'h':
                        e.preventDefault();
                        this.smoothScrollTo('#home');
                        break;
                    case 'p':
                        e.preventDefault();
                        this.smoothScrollTo('#portfolio');
                        break;
                    case 'c':
                        e.preventDefault();
                        this.smoothScrollTo('#contact');
                        break;
                }
            }
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleSectionVisibility(entry.target.id);
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    setupScrollAnimations() {
        // Parallax scroll effects
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.speed) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });

        // Custom cursor effects
        this.setupCustomCursor();
    }

    setupCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor fixed top-0 left-0 w-4 h-4 bg-primary-500 rounded-full pointer-events-none z-50 transition-all duration-200 opacity-70';
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX - 8;
            mouseY = e.clientY - 8;
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0.7';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
    }

    initializeNavigation() {
        // Highlight current section in navigation
        this.updateActiveNavigation();
        
        // Update on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        }, { passive: true });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary-500');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary-500');
            }
        });
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (!element) return;

        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        this.closeMobileMenu();
    }

    toggleMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenuButton.classList.toggle('text-primary-500');
    }

    closeMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.classList.remove('text-primary-500');
    }

    handleSectionVisibility(sectionId) {
        if (sectionId !== this.currentSection) {
            this.currentSection = sectionId;
            
            // Trigger section-specific animations
            switch (sectionId) {
                case 'technical':
                    this.initialize3DModel();
                    break;
                case 'portfolio':
                    this.animatePortfolioCards();
                    break;
            }
        }
    }

    initialize3DModel() {
        const threeJsContainer = document.getElementById('three-js-container');
        if (threeJsContainer && window.ThreeDModelViewer) {
            if (!window.modelViewer) {
                window.modelViewer = new ThreeDModelViewer();
            }
            window.modelViewer.init(threeJsContainer);
        }
    }

    animatePortfolioCards() {
        const cards = document.querySelectorAll('#portfolio .glass-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    showLoadingState() {
        this.isLoading = true;
        document.body.classList.add('loading');
    }

    hideLoadingState() {
        this.isLoading = false;
        document.body.classList.remove('loading');
    }

    destroy() {
        if (window.modelViewer) {
            window.modelViewer.destroy();
        }
    }
}

// Export for use in main script
window.AutomationPortfolio = AutomationPortfolio;