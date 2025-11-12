/*! 
 * Christian Espinosa - Automation & Control Systems Engineer Portfolio
 * Optimized and Minified Main JavaScript
 * Version: 2.0.0
 * Author: MiniMax Agent
 */

// Performance optimizations
'use strict';

class AutomationPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.initializeNavigation();
        this.setupLazyLoading();
    }

    setupEventListeners() {
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollTo(link.getAttribute('href'));
            });
        });

        const mobileMenuButton = document.getElementById('mobile-menu-button');
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => this.toggleMobileMenu());
        }

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'h': e.preventDefault(); this.smoothScrollTo('#home'); break;
                    case 'p': e.preventDefault(); this.smoothScrollTo('#portfolio'); break;
                    case 'c': e.preventDefault(); this.smoothScrollTo('#contact'); break;
                }
            }
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('section, .glass-card').forEach(el => observer.observe(el));
    }

    initializeNavigation() {
        this.updateActiveNavigation();
        window.addEventListener('scroll', () => this.updateActiveNavigation());
    }

    setupLazyLoading() {
        // Lazy load 3D model when technical section is visible
        const technicalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.modelLoaded) {
                    this.load3DModelResources();
                    this.modelLoaded = true;
                }
            });
        }, { threshold: 0.2 });

        const technicalSection = document.getElementById('technical');
        if (technicalSection) technicalObserver.observe(technicalSection);
    }

    load3DModelResources() {
        if (window.ThreeDModelViewer) {
            const container = document.getElementById('three-js-container');
            if (container) {
                window.modelViewer = new window.ThreeDModelViewer();
                window.modelViewer.init(container);
            }
        }
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (!element) return;

        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        this.closeMobileMenu();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary-500');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary-500');
            }
        });
    }

    toggleMobileMenu() {
        const button = document.getElementById('mobile-menu-button');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        button.classList.toggle('text-primary-500');
    }

    closeMobileMenu() {
        const button = document.getElementById('mobile-menu-button');
        button.setAttribute('aria-expanded', 'false');
        button.classList.remove('text-primary-500');
    }
}

// 3D Model Viewer (Optimized)
class ThreeDModelViewer {
    constructor() {
        this.scene = this.camera = this.renderer = null;
        this.isInitialized = this.isVisible = false;
    }

    init(container) {
        if (this.isInitialized || !window.THREE) return;
        
        const canvas = container.querySelector('#three-canvas');
        if (!canvas) return;

        this.setupScene(canvas);
        this.setupLighting();
        this.setupModel();
        this.setupControls(canvas);
        this.startRenderLoop();
        this.isInitialized = this.isVisible = true;
        
        setTimeout(() => {
            const instructions = container.querySelector('#three-instructions');
            if (instructions) instructions.style.display = 'none';
        }, 2000);
    }

    setupScene(canvas) {
        const rect = canvas.getBoundingClientRect();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
        this.camera.position.set(8, 6, 8);
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.renderer.setSize(rect.width, rect.height);
        this.renderer.setClearColor(0x000000, 0);
    }

    setupLighting() {
        this.scene.add(new THREE.AmbientLight(0x404040, 0.6));
        
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(10, 10, 5);
        light.castShadow = true;
        this.scene.add(light);
    }

    setupModel() {
        const systemGroup = new THREE.Group();
        
        // Pump
        const pump = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 1.5, 3, 8),
            new THREE.MeshPhongMaterial({ color: 0x007BFF, transparent: true, opacity: 0.8 })
        );
        pump.position.set(-3, 1.5, 0);
        systemGroup.add(pump);

        // Valve
        const valveGroup = new THREE.Group();
        valveGroup.add(new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 1, 2),
            new THREE.MeshPhongMaterial({ color: 0x6F42C1, transparent: true, opacity: 0.8 })
        ));
        
        this.valveWheel = new THREE.Mesh(
            new THREE.TorusGeometry(0.8, 0.2, 8, 16),
            new THREE.MeshPhongMaterial({ color: 0x28A745 })
        );
        this.valveWheel.position.set(0, 2.5, 0);
        valveGroup.add(this.valveWheel);
        valveGroup.position.set(0, 0, 0);
        systemGroup.add(valveGroup);

        // Sensor
        const sensor = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 0.5, 2, 8),
            new THREE.MeshPhongMaterial({ color: 0x17A2B8, transparent: true, opacity: 0.8 })
        );
        sensor.position.set(3, 0, 0);
        systemGroup.add(sensor);

        this.scene.add(systemGroup);
    }

    setupControls(canvas) {
        let isDragging = false, rotation = { x: 0, y: 0 };
        
        canvas.addEventListener('mousedown', (e) => isDragging = true);
        canvas.addEventListener('mouseup', () => isDragging = false);
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.movementX || e.clientX - e.previousX;
            const deltaY = e.movementY || e.clientY - e.previousY;
            
            rotation.y += deltaX * 0.005;
            this.camera.position.x = Math.cos(rotation.y) * 8;
            this.camera.position.z = Math.sin(rotation.y) * 8;
            this.camera.lookAt(0, 0, 0);
        });

        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 1.1 : 0.9;
            const scale = Math.max(3, Math.min(15, this.camera.position.length() * delta));
            const direction = this.camera.position.clone().normalize();
            this.camera.position.copy(direction.multiplyScalar(scale));
        });
    }

    startRenderLoop() {
        const animate = () => {
            if (this.isVisible && this.renderer) {
                this.renderer.render(this.scene, this.camera);
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    resize() {
        if (!this.isInitialized || !this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        this.camera.aspect = rect.width / rect.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(rect.width, rect.height);
    }

    destroy() {
        if (this.renderer) this.renderer.dispose();
        this.isVisible = false;
        this.isInitialized = false;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new AutomationPortfolio();
    
    setTimeout(() => {
        if (window.EnhancedAnimations) new window.EnhancedAnimations();
    }, 500);
});

// Window resize handler
window.addEventListener('resize', () => {
    if (window.modelViewer) window.modelViewer.resize();
});

// Global error handling
window.addEventListener('error', (e) => console.error('Portfolio error:', e.error));

// Service worker registration (optional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
}

// Expose for module usage
window.AutomationPortfolio = AutomationPortfolio;
window.ThreeDModelViewer = ThreeDModelViewer;