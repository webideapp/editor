document.addEventListener('DOMContentLoaded', () => {
    // Theme detection removed

    // Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Form Logic
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const subject = document.getElementById('subject').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Open Mail Client
            window.location.href = `mailto:support@webide.app?subject=${encodeURIComponent(subject)}&body=From: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
        });
    }
});