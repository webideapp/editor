document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Premium Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Intelligent Navbar States
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 20) {
                nav.classList.add('bg-dark/80', 'backdrop-blur-xl', 'py-2', 'shadow-2xl', 'border-white/10');
                const container = nav.querySelector('.max-w-7xl');
                if (container) container.classList.replace('h-20', 'h-16');
            } else {
                nav.classList.remove('bg-dark/80', 'backdrop-blur-xl', 'py-2', 'shadow-2xl', 'border-white/10');
                const container = nav.querySelector('.max-w-7xl');
                if (container) container.classList.replace('h-16', 'h-20');
            }
        });
    }

    // Side Menu Functionality
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const openMenuBtn = document.getElementById('open-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = (isOpen) => {
        if (isOpen) {
            sideMenu.classList.remove('translate-x-full');
            menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden';
        } else {
            sideMenu.classList.add('translate-x-full');
            menuOverlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        }
    };

    if (openMenuBtn) openMenuBtn.addEventListener('click', () => toggleMenu(true));
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMenu(false));
    if (menuOverlay) menuOverlay.addEventListener('click', () => toggleMenu(false));

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Premium Mouse Parallax for Hero Mockup
    const heroMockup = document.querySelector('.hero-mockup-container');
    if (heroMockup && window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            const rect = heroMockup.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const moveX = (e.clientX - centerX) / 40;
            const moveY = (e.clientY - centerY) / 40;

            heroMockup.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg) translateY(${-moveY}px)`;
        });

        document.addEventListener('mouseleave', () => {
            heroMockup.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)';
        });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------------------------------------------
    // UPDATED: Scroll To Top / Bottom Action Button Logic
    // ------------------------------------------------------------------------
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (scrollBtn) {
        const handleScroll = () => {
            // Logic: 
            // If user is near the top (e.g., < 200px), button should scroll DOWN.
            // Icon should be a DOWN Chevron (default state).
            // If user has scrolled down, button should scroll UP.
            // Icon should be an UP Chevron (rotated state).
            
            const threshold = 200;
            const currentScroll = window.scrollY;

            if (currentScroll < threshold) {
                // Near top -> Mode: Go Bottom
                // Remove 'is-top-mode' class to show down arrow (0deg)
                scrollBtn.classList.remove('is-top-mode');
                scrollBtn.setAttribute('aria-label', 'Scroll to bottom');
            } else {
                // Scrolled down -> Mode: Go Top
                // Add 'is-top-mode' class to show up arrow (180deg)
                scrollBtn.classList.add('is-top-mode');
                scrollBtn.setAttribute('aria-label', 'Scroll to top');
            }
        };

        // Debounced Scroll Event for performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial Check
        handleScroll();

        // Click Action
        scrollBtn.addEventListener('click', () => {
            if (scrollBtn.classList.contains('is-top-mode')) {
                // Action: Scroll to Top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Action: Scroll to Bottom
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
});