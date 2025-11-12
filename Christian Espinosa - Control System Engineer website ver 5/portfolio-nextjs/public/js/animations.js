// Enhanced Animations Module
class EnhancedAnimations {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        this.setupScrollReveal();
        this.setupCustomCursor();
        this.setupParallaxEffects();
        this.setupTypewriterEffect();
        this.setupCounterAnimations();
        this.enableBackgroundDistortion();
    }

    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section, .glass-card').forEach(el => {
            observer.observe(el);
        });

        this.observers.push(observer);
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

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }

    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                if (i > text.length) {
                    clearInterval(typeInterval);
                    element.classList.add('typed');
                }
            }, 50);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const current = Math.floor(progress * target);
                counter.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    enableBackgroundDistortion() {
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            document.body.style.filter = `
                blur(${0.1 + mouseX * 0.1}px) 
                hue-rotate(${mouseY * 10}deg)
            `;
        });
    }

    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}