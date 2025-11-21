// Theme Switcher Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlRoot = document.documentElement; // Use documentElement for <html>
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // Function to apply theme based on 'light' or 'dark' string
    const applyTheme = (theme) => {
        if (theme === 'light') {
            htmlRoot.classList.add('light');
            if (darkIcon) darkIcon.classList.add('hidden');
            if (lightIcon) lightIcon.classList.remove('hidden');
        } else {
            htmlRoot.classList.remove('light');
            if (darkIcon) darkIcon.classList.remove('hidden');
            if (lightIcon) lightIcon.classList.add('hidden');
        }
    };

    // On page load, check for saved theme in localStorage.
    // The HTML is set to light theme by default. This JS ensures the theme
    // persists across sessions and the toggle icon is correct.
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Event listener for the toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const isLight = htmlRoot.classList.contains('light');
            const newTheme = isLight ? 'dark' : 'light';
            
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // Smooth scroll for offer link
    const scrollToOfferLink = document.getElementById('scroll-to-offer');
    if (scrollToOfferLink) {
        scrollToOfferLink.addEventListener('click', (e) => {
            e.preventDefault();
            const offerSection = document.getElementById('offer-code');
            if (offerSection) {
                offerSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

                              // Date
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu Logic
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMobileMenuButton = document.getElementById('closeMobileMenuButton');
const mobileLinks = document.querySelectorAll('[data-menu-link]');

function toggleMenu() {
    const isHidden = mobileMenuOverlay.classList.contains('hidden');
    if (isHidden) {
        mobileMenuOverlay.classList.remove('hidden');
        // tiny timeout to allow display block to render before opacity transition
        setTimeout(() => mobileMenuOverlay.classList.remove('opacity-0'), 10);
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenuOverlay.classList.add('opacity-0');
        setTimeout(() => mobileMenuOverlay.classList.add('hidden'), 300);
        document.body.style.overflow = '';
    }
}

if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMenu);
if (closeMobileMenuButton) closeMobileMenuButton.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Spotlight Effect for Cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.spotlight-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// Demo Editor Logic
const demoEditor = document.getElementById('demoEditor');
const demoPreview = document.getElementById('demoPreview');
const insertStarter = document.getElementById('insertStarter');
const downloadZip = document.getElementById('downloadZip');

// Tab Elements
const tabEditor = document.getElementById('tabEditor');
const tabPreview = document.getElementById('tabPreview');
const viewEditor = document.getElementById('viewEditor');
const viewPreview = document.getElementById('viewPreview');

function updatePreview() {
    if (!demoEditor || !demoPreview) return;
    const code = demoEditor.value;
    demoPreview.srcdoc = code;
}

function switchTab(tabName) {
    if (tabName === 'editor') {
        viewEditor.classList.remove('hidden');
        viewPreview.classList.add('hidden');
        
        tabEditor.classList.add('bg-white/10', 'text-white', 'shadow-sm');
        tabEditor.classList.remove('text-white/50');
        
        tabPreview.classList.remove('bg-white/10', 'text-white', 'shadow-sm');
        tabPreview.classList.add('text-white/50');
    } else {
        updatePreview(); // Run code on switch
        viewEditor.classList.add('hidden');
        viewPreview.classList.remove('hidden');
        
        tabPreview.classList.add('bg-white/10', 'text-white', 'shadow-sm');
        tabPreview.classList.remove('text-white/50');
        
        tabEditor.classList.remove('bg-white/10', 'text-white', 'shadow-sm');
        tabEditor.classList.add('text-white/50');
    }
}

if (tabEditor) tabEditor.addEventListener('click', () => switchTab('editor'));
if (tabPreview) tabPreview.addEventListener('click', () => switchTab('preview'));

if (insertStarter) {
    insertStarter.addEventListener('click', () => {
        const starterCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <style>
        body { font-family: sans-serif; margin: 0; background: #111; color: #eee; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
        .profile { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(45deg, #ff00cc, #3333ff); margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        h1 { margin: 0; font-size: 2.5rem; background: linear-gradient(to right, #ff00cc, #3333ff); -webkit-background-clip: text; color: transparent; }
        p { color: #888; margin-top: 10px; }
        .btn { padding: 12px 24px; background: #222; border: 1px solid #444; border-radius: 30px; color: white; text-decoration: none; margin-top: 30px; transition: 0.3s; font-weight: 600; }
        .btn:active { transform: scale(0.95); }
    </style>
</head>
<body>
    <div class="card">
        <h1>Web IDE</h1>
        <p>Edit code live.</p>
        <button onclick="alert('Hello!')">Click Me</button>
    </div>
</body>
</html>`;
        if (demoEditor) {
            demoEditor.value = starterCode;
            // If we are on the preview tab, update it immediately
            if (!viewPreview.classList.contains('hidden')) {
                 updatePreview();
            }
        }
    });
}

if (downloadZip) {
    downloadZip.addEventListener('click', () => {
        if (!demoEditor) return;
        const blob = new Blob([demoEditor.value], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Scroll Header Effect
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); // Use the new 'scrolled' class
    } else {
        header.classList.remove('scrolled');
    }
});

// Copy Code Logic
const copyCodeBtn = document.getElementById('copyCodeBtn');
const offerCodeText = document.getElementById('offerCodeText');
const copyBtnText = document.getElementById('copyBtnText');

if (copyCodeBtn && offerCodeText) {
    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(offerCodeText.textContent).then(() => {
            copyBtnText.textContent = "Copied!";
            setTimeout(() => copyBtnText.textContent = "Copy Code", 2000);
        });
    });
}

// Contact Form Logic (Mailto)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = document.getElementById('subject').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        window.location.href = `mailto:chuyongglean@gmail.com?subject=${encodeURIComponent(subject)}&body=From: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    });
}

// FAQ Accordion Logic
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        questionButton.addEventListener('click', () => {
            const isOpen = item.classList.toggle('active');
            icon.classList.toggle('rotate-180', isOpen);

            if (isOpen) {
                answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
            } else {
                answerDiv.style.maxHeight = '0';
            }
        });
    });
});

// Scroll Animation Logic (Intersection Observer)
document.addEventListener('DOMContentLoaded', () => {
    const scrollAnimatedElements = document.querySelectorAll('.scroll-fade-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified, otherwise animate immediately
                const delay = entry.target.dataset.scrollDelay ? parseInt(entry.target.dataset.scrollDelay) : 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    scrollAnimatedElements.forEach(element => {
        observer.observe(element);
    });
});
