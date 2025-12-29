document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Toggle for Mobile
    const sidebar = document.getElementById('docs-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('mobile-sidebar-toggle');

    const toggleDocsMenu = (show) => {
        if (show) {
            sidebar.classList.add('active');
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            sidebar.classList.remove('active');
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('opacity-0', 'pointer-events-none');
        }
    };

    if (toggleBtn) toggleBtn.addEventListener('click', () => toggleDocsMenu(true));
    if (overlay) overlay.addEventListener('click', () => toggleDocsMenu(false));

    // Smooth scroll for doc links
    const docLinks = document.querySelectorAll('.doc-link');
    docLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 100;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = target.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    if (window.innerWidth < 768) toggleDocsMenu(false);
                    
                    // Update active state
                    docLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // Load Dynamic Content (Git Guide)
    const loadGitGuide = async () => {
        const container = document.getElementById('git-wizard-container');
        if (!container) return;

        try {
            const response = await fetch('git-guide/index.html');
            if (response.ok) {
                const html = await response.text();
                container.parentElement.innerHTML = html;
                
                // Re-initialize intersection observer for new content
                const newSection = document.getElementById('git-guide-content');
                if (newSection) {
                    observer.observe(newSection.parentElement);
                }
            } else {
                container.innerHTML = '<p class="text-red-400">Failed to load Git Guide content.</p>';
            }
        } catch (error) {
            console.error('Error loading Git guide:', error);
            container.innerHTML = '<p class="text-red-400">An error occurred while loading the guide.</p>';
        }
    };

    // Intersection Observer for Active Navigation
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                docLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    // Initial setup for existing sections
    document.querySelectorAll('#docs-content-root section').forEach(section => observer.observe(section));

    // Load dynamic fragments
    loadGitGuide();
});