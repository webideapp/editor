document.addEventListener('DOMContentLoaded', () => {
    // Theme detection removed

    // Sidebar Mobile Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const links = sidebar.querySelectorAll('a');

    function toggleMenu() {
        const isClosed = sidebar.classList.contains('-translate-x-full');
        if (isClosed) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);
            document.body.style.overflow = 'hidden';
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
            document.body.style.overflow = '';
        }
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Close sidebar on link click (mobile)
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggleMenu();
            }
        });
    });

    // Scroll Spy for Sidebar
    const sections = document.querySelectorAll('article');
    const navLinks = document.querySelectorAll('#sidebar nav a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active', 'text-brand-400');
                    link.classList.add('text-white/60');
                });

                // Add active class to current link
                const activeLink = document.querySelector(`#sidebar nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active', 'text-brand-400');
                    activeLink.classList.remove('text-white/60');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});