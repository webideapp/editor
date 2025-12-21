document.addEventListener('DOMContentLoaded', () => {
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

// Footer Year
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
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// Spotlight Effect
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

// Typing Effect for Hero
const typeWriterElement = document.getElementById('heroTypewriter');
if (typeWriterElement) {
    const codeLines = [
        '<span class="text-purple-600">import</span> React <span class="text-purple-600">from</span> <span class="text-green-600">\'react\'</span>;',
        '',
        '<span class="text-purple-600">export default</span> <span class="text-blue-600">function</span> <span class="text-yellow-600">App</span>() {',
        '&nbsp;&nbsp;<span class="text-purple-600">return</span> (',
        '&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-slate-400">&lt;</span><span class="text-red-600">div</span> <span class="text-orange-600">className</span>=<span class="text-green-600">"hero"</span><span class="text-slate-400">&gt;</span>',
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-slate-400">&lt;</span><span class="text-red-600">h1</span><span class="text-slate-400">&gt;</span>Hello World<span class="text-slate-400">&lt;/</span><span class="text-red-600">h1</span><span class="text-slate-400">&gt;</span>',
        '&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-slate-400">&lt;/</span><span class="text-red-600">div</span><span class="text-slate-400">&gt;</span>',
        '&nbsp;&nbsp;);',
        '}'
    ];

    let currentLine = 0;
    let currentChar = 0;
    let isDeleting = false;
    const typeSpeed = 50;
    const deleteSpeed = 25;
    const pauseTime = 2000;

    function type() {
        let html = '';
        for (let i = 0; i < currentLine; i++) {
            html += codeLines[i] + '<br>';
        }
        if (currentLine < codeLines.length) {
             html += codeLines[currentLine].substring(0, currentChar);
        }
        html += '<span class="inline-block w-2 h-4 bg-brand-500 ml-1 animate-blink"></span>';
        typeWriterElement.innerHTML = html;

        if (!isDeleting) {
            if (currentLine < codeLines.length && currentChar < codeLines[currentLine].length) {
                currentChar++;
                setTimeout(type, typeSpeed);
            } else if (currentLine < codeLines.length - 1) {
                currentLine++;
                currentChar = 0;
                setTimeout(type, typeSpeed);
            } else {
                isDeleting = true;
                setTimeout(type, pauseTime);
            }
        } else {
            if (currentChar > 0) {
                currentChar--;
                setTimeout(type, deleteSpeed);
            } else if (currentLine > 0) {
                currentLine--;
                currentChar = codeLines[currentLine].length;
                setTimeout(type, deleteSpeed);
            } else {
                isDeleting = false;
                setTimeout(type, pauseTime / 2);
            }
        }
    }
    setTimeout(type, 1000);
}

// Phone Mockup Rotation
const phoneMockup = document.getElementById('phoneMockup');
if (phoneMockup) {
    let currentAngle = -6; 
    phoneMockup.addEventListener('click', () => {
        if (currentAngle === -6) currentAngle = 0;
        else if (currentAngle === 0) currentAngle = 6;
        else currentAngle = -6;
        phoneMockup.style.transform = `rotate(${currentAngle}deg)`;
    });
}

// Demo Editor Logic
const demoEditor = document.getElementById('demoEditor');
const demoPreview = document.getElementById('demoPreview');
const insertStarter = document.getElementById('insertStarter');
const downloadZip = document.getElementById('downloadZip');
const tabEditor = document.getElementById('tabEditor');
const tabPreview = document.getElementById('tabPreview');
const viewEditor = document.getElementById('viewEditor');
const viewPreview = document.getElementById('viewPreview');

function updatePreview() {
    if (!demoEditor || !demoPreview) return;
    demoPreview.srcdoc = demoEditor.value;
}

function switchTab(tabName) {
    if (tabName === 'editor') {
        viewEditor.classList.remove('hidden');
        viewPreview.classList.add('hidden');
        tabEditor.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
        tabEditor.classList.remove('text-slate-500');
        tabPreview.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
        tabPreview.classList.add('text-slate-500');
    } else {
        updatePreview();
        viewEditor.classList.add('hidden');
        viewPreview.classList.remove('hidden');
        tabPreview.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
        tabPreview.classList.remove('text-slate-500');
        tabEditor.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
        tabEditor.classList.add('text-slate-500');
    }
}

if (tabEditor) tabEditor.addEventListener('click', () => switchTab('editor'));
if (tabPreview) tabPreview.addEventListener('click', () => switchTab('preview'));

if (insertStarter) {
    insertStarter.addEventListener('click', () => {
        const starterCode = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<style>\n  body { margin: 0; height: 100vh; display: flex; align-items: center; justify-content: center; background: #f0f2f5; font-family: sans-serif; }\n  .box { padding: 40px; background: linear-gradient(45deg, #0ea5e9, #2dd4bf); border-radius: 20px; color: white; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }\n  h1 { font-size: 3em; margin: 0; }\n  p { opacity: 0.8; }\n</style>\n</head>\n<body>\n  <div class="box">\n    <h1>Cool!</h1>\n    <p>You loaded a template.</p>\n  </div>\n</body>\n</html>`;
        if (demoEditor) {
            demoEditor.value = starterCode;
            if (!viewPreview.classList.contains('hidden')) updatePreview();
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

// Scroll Header & Animation Logic
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.scrollDelay || 0;
            setTimeout(() => {
                entry.target.classList.add('is-visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));

// Offer Code Logic
const offerCodeBtn = document.getElementById('offerCodeBtn');

if (offerCodeBtn) {
    const offerCodeText = document.getElementById('offerCodeText');
    const offerCodePlaceholder = document.getElementById('offerCodePlaceholder');
    const offerBtnText = document.getElementById('offerBtnText');
    let countdownInterval;

    const resetToGetCode = () => {
        if(offerBtnText) offerBtnText.textContent = 'Get Code';
        if(offerCodePlaceholder) {
            offerCodePlaceholder.innerHTML = `\n             <svg class="w-6 h-6 text-slate-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>\n             <span class="text-slate-900 font-mono text-sm">[ CODE ENCRYPTED ]</span>\n             <span class="text-slate-500 text-xs">Tap "Get Code" to decrypt</span>\n            `;
            offerCodePlaceholder.classList.remove('opacity-0', 'scale-90');
        }
        if(offerCodeText) {
             offerCodeText.classList.add('opacity-0', 'pointer-events-none', 'scale-90', 'blur-sm');
             offerCodeText.classList.remove('scale-100', 'blur-0');
        }
        offerCodeBtn.dataset.state = 'get';
        offerCodeBtn.disabled = false;
    };

    offerCodeBtn.addEventListener('click', () => {
        const state = offerCodeBtn.dataset.state;
        if (state === 'get') {
            offerCodeBtn.disabled = true;
            let countdown = 10;
            if(offerBtnText) offerBtnText.textContent = `Revealing in ${countdown}...`;
            if(offerCodePlaceholder) {
                 offerCodePlaceholder.innerHTML = `\n                 <div class="animate-spin w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full mb-1"></div>\n                 <span class="text-brand-600 font-mono text-sm">DECRYPTING...</span>\n                 `;
            }
            countdownInterval = setInterval(() => {
                countdown--;
                if(offerBtnText) offerBtnText.textContent = `Revealing in ${countdown}...`;
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    if(offerCodePlaceholder) offerCodePlaceholder.classList.add('opacity-0', 'scale-90');
                    if(offerCodeText) {
                        offerCodeText.classList.remove('opacity-0', 'pointer-events-none', 'scale-90', 'blur-sm');
                        offerCodeText.classList.add('scale-100', 'blur-0');
                    }
                    if(offerBtnText) offerBtnText.textContent = 'Copy Code';
                    offerCodeBtn.dataset.state = 'copy';
                    offerCodeBtn.disabled = false;
                }
            }, 1000);
        } else if (state === 'copy') {
            if (offerCodeText && offerBtnText) {
                navigator.clipboard.writeText(offerCodeText.textContent.trim()).then(() => {
                    offerBtnText.textContent = 'Copied!';
                    offerCodeText.classList.add('opacity-0', 'pointer-events-none', 'scale-90', 'blur-sm');
                    offerCodeText.classList.remove('scale-100', 'blur-0');
                    if(offerCodePlaceholder) {
                        offerCodePlaceholder.innerHTML = '<span class="text-teal-600 font-mono font-bold">CODE COPIED</span>';
                        offerCodePlaceholder.classList.remove('opacity-0', 'scale-90');
                    }
                    offerCodeBtn.dataset.state = 'copied';
                    offerCodeBtn.disabled = true;
                    setTimeout(() => resetToGetCode(), 3000); 
                });
            }
        }
    });
}

// Contact Form
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