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
                    const nav = document.querySelector('.nav');
                    const hamburger = document.querySelector('.hamburger');
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        hamburger.innerHTML = '☰';
                    }
                }
            });
        });
    }
}

class HamburgerMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.nav = document.querySelector('.nav');
        this.init();
    }

    init() {
        if (this.hamburger && this.nav) {
            this.hamburger.addEventListener('click', () => {
                this.nav.classList.toggle('active');
                this.hamburger.innerHTML = this.nav.classList.contains('active') ? '✕' : '☰';
            });
        }
    }
}

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

        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">×</span>
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        this.addLightboxStyles();

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => this.closeLightbox(lightbox));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox(lightbox);
            }
        });

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

class TestimonialCarousel {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonial');
        this.current = 0;
        this.init();
    }

    init() {
        setInterval(() => {
            this.testimonials[this.current].classList.remove('active');
            this.current = (this.current + 1) % this.testimonials.length;
            this.testimonials[this.current].classList.add('active');
        }, 5000);
    }
}

class BackToTop {
    constructor() {
        this.button = document.querySelector('.back-to-top');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });
        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

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

document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
    new HeaderScroll();
    new SmoothScroll();
    new HamburgerMenu();
    new GalleryLightbox();
    new AnimatedCounter();
    new ParallaxEffect();
    new TestimonialCarousel();
    new BackToTop();
    new LoadingAnimation();
});

document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
