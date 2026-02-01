/**
 * Prompts Market - Interactive Features
 * Developed for Web IDE AI Startup
 */

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-prompt');
    const promptText = document.getElementById('prompt-text');

    /**
     * Copy to Clipboard Functionality
     * Provides haptic feedback and visual confirmation
     */
    // Handle all copy buttons in the market
    const copyButtons = document.querySelectorAll('.copy-prompt-btn, #copy-prompt');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const container = btn.closest('.relative.group');
            const textElement = container.querySelector('.prompt-content-text, #prompt-text');
            
            if (textElement) {
                try {
                    await navigator.clipboard.writeText(textElement.innerText);
                    const originalIcon = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-check text-green-400"></i>';
                    showToast('Prompt copied to clipboard!');
                    setTimeout(() => {
                        btn.innerHTML = originalIcon;
                    }, 2000);
                } catch (err) {
                    showToast('Failed to copy text', 'error');
                }
            }
        });
    });

    if (false && copyBtn && promptText) {
        copyBtn.addEventListener('click', async () => {
            try {
                // Extract text and copy to clipboard
                const text = promptText.innerText;
                await navigator.clipboard.writeText(text);

                // Visual Feedback - Icon Change
                const originalIcon = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fa-solid fa-check text-green-400"></i>';
                copyBtn.classList.add('copy-success');

                // Toast Notification (Optional but premium)
                showToast('Prompt copied to clipboard!');

                // Revert after delay
                setTimeout(() => {
                    copyBtn.innerHTML = originalIcon;
                    copyBtn.classList.remove('copy-success');
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);
                showToast('Failed to copy. Please select manually.', 'error');
            }
        });
    }

    /**
     * UI Enhancement: Toast Notification System
     */
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-surface border border-white/10 shadow-2xl z-[100] transition-all duration-500 transform translate-y-20 opacity-0`;
        
        const icon = type === 'success' 
            ? '<i class="fa-solid fa-circle-check text-green-400 mr-3"></i>' 
            : '<i class="fa-solid fa-circle-exclamation text-red-400 mr-3"></i>';
            
        toast.innerHTML = `<div class="flex items-center text-sm font-medium">${icon}${message}</div>`;
        
        document.body.appendChild(toast);

        // Animate In
        setTimeout(() => {
            toast.classList.remove('translate-y-20', 'opacity-0');
        }, 100);

        // Animate Out and Remove
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    /**
     * Scroll Animation Implementation
     * Leverages Intersection Observer for performant reveals
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target grid items and content blocks
    document.querySelectorAll('.grid > div, main > div').forEach(el => {
        el.style.opacity = '0'; // Initial state for JS-based reveal
        revealObserver.observe(el);
    });
});