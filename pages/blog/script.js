document.addEventListener('DOMContentLoaded', () => {
    // Theme detection
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.documentElement.classList.add('light');
    }

    // Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Simple scroll animation for cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('article').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition', 'duration-700');
        observer.observe(el);
    });

    // Quote Generator Logic (Creative Section)
    const quotes = [
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
        { text: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann" },
        { text: "Knowledge is power.", author: "Francis Bacon" },
        { text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.", author: "Dan Salomon" },
        { text: "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.", author: "Antoine de Saint-Exupery" },
        { text: "Ruby is rubbish! PHP is phpantastic!", author: "Nikita Popov" },
        { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
        { text: "Fix the cause, not the symptom.", author: "Steve McConnell" },
        { text: "Optimism is an occupational hazard of programming: feedback is the treatment.", author: "Kent Beck" },
        { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
        { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
        { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" }
    ];

    const quoteBtn = document.getElementById('newQuoteBtn');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');

    if (quoteBtn && quoteText && quoteAuthor) {
        quoteBtn.addEventListener('click', () => {
            // Animate out
            quoteText.style.opacity = '0';
            quoteAuthor.style.opacity = '0';
            
            // Wait for transition to finish before changing text
            setTimeout(() => {
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                quoteText.textContent = `"${randomQuote.text}"`;
                quoteAuthor.textContent = `- ${randomQuote.author}`;
                
                // Animate in
                quoteText.style.opacity = '1';
                quoteAuthor.style.opacity = '1';
            }, 300); // Duration matches CSS transition
        });
    }
});
