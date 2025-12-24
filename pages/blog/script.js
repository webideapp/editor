/**
 * Blog Script - Optimized for Performance
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme
    const initTheme = () => {
        const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (theme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    };

    // Optimized Intersection Observer for animations
    const initAnimations = () => {
        const animatedElements = document.querySelectorAll('article, .blog-post-card, .prose > *');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
            observer.observe(el);
        });

        // Define the animation class behavior via injected style to keep file clean
        if (!document.getElementById('animation-styles')) {
            const style = document.createElement('style');
            style.id = 'animation-styles';
            style.innerHTML = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
            document.head.appendChild(style);
        }
    };

    // Footer Year
    const updateYear = () => {
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    };

    // Quote Generator Logic (Creative Section)
    const initQuoteGenerator = () => {
        const quotes = [
            { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
            { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
            { text: "Knowledge is power.", author: "Francis Bacon" },
            { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
            { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
            { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
            { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" }
        ];

        const quoteBtn = document.getElementById('newQuoteBtn');
        const quoteText = document.getElementById('quoteText');
        const quoteAuthor = document.getElementById('quoteAuthor');

        if (quoteBtn && quoteText && quoteAuthor) {
            quoteBtn.addEventListener('click', () => {
                quoteText.style.opacity = '0';
                quoteAuthor.style.opacity = '0';
                
                setTimeout(() => {
                    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                    quoteText.textContent = `"${randomQuote.text}"`;
                    quoteAuthor.textContent = `- ${randomQuote.author}`;
                    
                    quoteText.style.opacity = '1';
                    quoteAuthor.style.opacity = '1';
                }, 300);
            });
        }
    };

    // Run initializations
    initTheme();
    initAnimations();
    updateYear();
    initQuoteGenerator();
});