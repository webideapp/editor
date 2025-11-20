// Helper: set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Hero mini editor
const heroEditor = document.getElementById('heroEditor');
const heroPreview = document.getElementById('heroPreview');
const runHero = document.getElementById('runHero');

const setHero = () => {
    heroPreview.srcdoc = heroEditor.value;
};

// Initialize the hero preview on page load
document.addEventListener('DOMContentLoaded', setHero);
runHero.addEventListener('click', setHero);

// Demo editor actions
const demoEditor = document.getElementById('demoEditor');
const demoPreview = document.getElementById('demoPreview');
const refreshDemo = document.getElementById('refreshDemo');
const openWindow = document.getElementById('openWindow');
const insertStarter = document.getElementById('insertStarter');
const downloadZip = document.getElementById('downloadZip');

const runDemo = () => {
    demoPreview.srcdoc = demoEditor.value;
};

// Initialize the demo preview on page load
document.addEventListener('DOMContentLoaded', runDemo);
refreshDemo.addEventListener('click', runDemo);

openWindow.addEventListener('click', () => {
    const newWin = window.open();
    if (newWin) {
        newWin.document.open();
        newWin.document.write(demoEditor.value);
        newWin.document.close();
    } else {
        alert('Please allow popups to open the preview in a new tab.');
    }
});

insertStarter.addEventListener('click', () => {
    const starter = `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>My Mobile Site</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 0; background: #0b1220; color: #e5edff; }
        .wrap { max-width: 720px; margin: 0 auto; padding: 28px 20px; }
        .btn { background: linear-gradient(90deg,#6366f1,#22d3ee); color: #0b1220; border-radius: 999px; padding: 10px 16px; font-weight: 800; display: inline-block; text-decoration: none; }
        .card { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.15); border-radius: 16px; padding: 16px; }
    </style>
</head>
<body>
    <div class="wrap">
        <h1>Built with Web IDE ✨</h1>
        <p>Create beautiful mobile sites quickly, right from your phone.</p>
        <a class="btn" href="#">Primary Button</a>
        <div style="height:16px"></div>
        <div class="card">
            <h3>A simple card</h3>
            <p>Style sections, add buttons, and ship.</p>
        </div>
    </div>
</body>
</html>`;
    demoEditor.value = starter;
    runDemo();
});

// Simple zip download (single file)
function download(filename, content) {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

downloadZip.addEventListener('click', () => {
    download('index.html', demoEditor.value);
});

// Add Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.animationDelay = delay;
                }
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // New JS for mobile menu functionality
    const mainLogoLink = document.getElementById('mainLogoLink');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenuButton = document.getElementById('closeMobileMenuButton');
    const mobileMenuLinks = mobileMenuOverlay.querySelectorAll('[data-menu-link]'); // Get all links inside the mobile menu

    // Media query to check for mobile screens (Tailwind's 'md' breakpoint is 768px and up)
    const isMobile = window.matchMedia('(max-width: 767px)'); 

    const toggleMobileMenu = (e) => {
        // Only toggle if on mobile screen
        if (isMobile.matches) {
            // Prevent default scroll behavior only for the main logo link
            // when it acts as a menu toggle, to avoid scrolling to top.
            // Navigation links should perform their default scroll to anchor.
            if (e.currentTarget.id === 'mainLogoLink') {
                e.preventDefault(); 
            }
            mobileMenuOverlay.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden'); // Prevent background scrolling
        }
    };

    // Function to explicitly close the mobile menu
    const closeMobileMenu = () => {
        // Ensure it's on a mobile screen and the menu is currently open before closing
        if (isMobile.matches && !mobileMenuOverlay.classList.contains('hidden')) {
            mobileMenuOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    };

    // Event listener for main logo (burger icon) to toggle the menu
    mainLogoLink.addEventListener('click', toggleMobileMenu);
    
    // Event listener for the close button inside the menu, which toggles it closed
    closeMobileMenuButton.addEventListener('click', toggleMobileMenu);

    // Event listeners for navigation links inside the mobile menu
    // Clicking these links should close the menu and allow default anchor navigation
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // No preventDefault() here; allow the browser to handle the anchor link navigation.f
            closeMobileMenu(); // Explicitly close the menu after the navigation
        });
    });

    // Close menu if screen resizes to desktop while menu is open
    isMobile.addEventListener('change', (e) => {
        if (!e.matches && !mobileMenuOverlay.classList.contains('hidden')) {
            closeMobileMenu(); // Use the explicit close function to ensure it's hidden
        }
    });

    // Contact form mailto functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const subject = document.getElementById('subject').value;
            const userEmail = document.getElementById('email').value; // User's email from the form
            const message = document.getElementById('message').value;
            
            const recipientEmail = 'chuyongglean@gmail.com';

            // Construct the body of the email, including the user's provided email
            const emailBody = `From: ${userEmail}\n\n${message}`;

            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            window.location.href = mailtoLink;
        });
    }

    // Offer code copy functionality
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    if (copyCodeBtn) {
        const offerCodeText = document.getElementById('offerCodeText');
        const copyBtnText = document.getElementById('copyBtnText');

        copyCodeBtn.addEventListener('click', () => {
            if (!navigator.clipboard) {
                alert('Clipboard API not available. Please copy manually.');
                return;
            }
            navigator.clipboard.writeText(offerCodeText.textContent.trim()).then(() => {
                copyBtnText.textContent = 'Copied!';
                copyCodeBtn.classList.add('text-emerald-400', 'border-emerald-400/30');
                
                setTimeout(() => {
                    copyBtnText.textContent = 'Copy Code';
                    copyCodeBtn.classList.remove('text-emerald-400', 'border-emerald-400/30');
                }, 2500);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy code. Please try again or copy manually.');
            });
        });
    }
});
