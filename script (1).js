// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal-element');
        this.windowHeight = window.innerHeight;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkElements();
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.checkElements());
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
            this.checkElements();
        });
    }

    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < this.windowHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }
}

// Header Scroll Effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            this.header.style.background = 'rgba(10, 10, 10, 0.98)';
            this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            this.header.style.background = 'rgba(10, 10, 10, 0.95)';
            this.header.style.boxShadow = 'none';
        }
    }
}

// Smooth Scroll for Navigation Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Gallery Lightbox Effect
class GalleryLightbox {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.galleryItems.forEach(item => {
            item.addEventListener('click', () => this.openLightbox(item));
        });
    }

    openLightbox(item) {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay.querySelector('h3').textContent;
        const description = overlay.querySelector('p').textContent;

        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Add lightbox styles
        this.addLightboxStyles();

        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => this.closeLightbox(lightbox));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox(lightbox);
            }
        });

        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
            lightbox.querySelector('.lightbox-content').style.transform = 'scale(1)';
        }, 10);
    }

    closeLightbox(lightbox) {
        lightbox.style.opacity = '0';
        lightbox.querySelector('.lightbox-content').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }, 300);
    }

    addLightboxStyles() {
        if (!document.querySelector('#lightbox-styles')) {
            const styles = document.createElement('style');
            styles.id = 'lightbox-styles';
            styles.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                }
                
                .lightbox-content img {
                    width: 100%;
                    height: auto;
                    border-radius: 10px;
                }
                
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    color: white;
                    font-size: 30px;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                
                .lightbox-close:hover {
                    color: #d4af37;
                }
                
                .lightbox-info {
                    background: rgba(0, 0, 0, 0.8);
                    padding: 1rem;
                    border-radius: 0 0 10px 10px;
                    text-align: center;
                }
                
                .lightbox-info h3 {
                    color: #d4af37;
                    margin-bottom: 0.5rem;
                }
                
                .lightbox-info p {
                    color: #cccccc;
                }
            `;
            document.head.appendChild(styles);
        }
    }
}

// Animated Counter for Stats
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
}

// Parallax Effect for Hero Section
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleParallax());
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (this.hero) {
            this.hero.style.transform = `translateY(${rate}px)`;
        }
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        // Create mobile menu button if screen is small
        if (window.innerWidth <= 768) {
            this.createMobileButton();
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
                this.createMobileButton();
            } else if (window.innerWidth > 768) {
                const mobileBtn = document.querySelector('.mobile-menu-btn');
                if (mobileBtn) {
                    mobileBtn.remove();
                }
                document.querySelector('.nav').style.display = 'flex';
            }
        });
    }

    createMobileButton() {
        const header = document.querySelector('.header .container');
        const nav = document.querySelector('.nav');
        
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '☰';
        mobileBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: block;
        `;

        header.appendChild(mobileBtn);
        nav.style.display = 'none';

        mobileBtn.addEventListener('click', () => {
            if (nav.style.display === 'none') {
                nav.style.display = 'flex';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'rgba(10, 10, 10, 0.98)';
                nav.style.flexDirection = 'column';
                nav.style.padding = '1rem';
                mobileBtn.innerHTML = '✕';
            } else {
                nav.style.display = 'none';
                mobileBtn.innerHTML = '☰';
            }
        });
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
    new HeaderScroll();
    new SmoothScroll();
    new GalleryLightbox();
    new AnimatedCounter();
    new ParallaxEffect();
    new MobileMenu();
    new LoadingAnimation();
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

