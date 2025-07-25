document.addEventListener('DOMContentLoaded', () => {

    // --- PRELOADER ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 300); // Pequeno delay para garantir que tudo carregou
    });

    // --- CURSOR PERSONALIZADO ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // --- MENU HAMBÚRGUER ---
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.overlay-nav .nav-link');
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        menuBtn.classList.toggle('open', isMenuOpen);
        menuOverlay.classList.toggle('open', isMenuOpen);
        document.body.classList.toggle('modal-open', isMenuOpen);
    };

    menuBtn.addEventListener('click', toggleMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                // Apenas fecha se não for um link de modal
                if (!link.hasAttribute('data-modal')) {
                    toggleMenu();
                }
            }
        });
    });
    
    // --- HEADER SCROLL EFFECT ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- REVEAL ON SCROLL ---
    const revealElements = document.querySelectorAll('.reveal-element');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- ANIMATED COUNTER FOR STATS ---
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetText = element.textContent;
                const target = parseInt(targetText.replace(/\D/g, ''));
                const suffix = targetText.replace(/\d/g, '').trim();
                let current = 0;
                const duration = 2000; // 2 segundos
                const stepTime = 30; // ms
                const totalSteps = duration / stepTime;
                const increment = target / totalSteps;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target + (suffix ? ` ${suffix}` : '+');
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + (suffix ? ` ${suffix}` : '+');
                    }
                }, stepTime);

                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(counter => counterObserver.observe(counter));


    // --- MODAL LOGIC ---
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(`${modalId}-modal`);
            if (modal) {
                modal.classList.add('visible');
                document.body.classList.add('modal-open');
                if (isMenuOpen) toggleMenu(); // Fecha o menu overlay se estiver aberto
            }
        });
    });

    const closeModal = (modal) => {
        modal.classList.remove('visible');
        if (!isMenuOpen) { // Só remove a classe se o menu não estiver aberto
           document.body.classList.remove('modal-open');
        }
    };

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(button.closest('.modal'));
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
});
