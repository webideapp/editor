import { Timer } from './js/utils/timer.js';

/**
 * Offer Section Logic Controller
 * Manages the interactive code reveal experience with premium animations.
 */

const CONFIG = {
    CODE_VALUE: "W5B7I4EM8K9",
    COUNTDOWN_DURATION: 8000, // 8 seconds in milliseconds
    RESET_DELAY: 4000,
    SELECTORS: {
        container: '#special-offer',
        btn: '#reveal-offer-btn',
        btnText: '#offer-btn-text',
        btnIcon: '#offer-copy-icon',
        codeDisplay: '#offer-code-display',
        overlay: '#offer-overlay',
        timerContainer: '#offer-timer-container',
        timerCount: '#offer-timer-count'
    }
};

class OfferManager {
    constructor() {
        this.elements = {};
        this.state = 'idle'; // idle | counting | revealed | copied
        this.timer = null;
    }

    init() {
        if (!this._cacheElements()) return;
        this._initTimer();
        this._attachListeners();
        this._setInitialState();
    }

    _cacheElements() {
        let allFound = true;
        for (const [key, selector] of Object.entries(CONFIG.SELECTORS)) {
            const el = document.querySelector(selector);
            if (!el) {
                console.warn(`OfferManager: Element not found for selector: ${selector}`);
                allFound = false;
            }
            this.elements[key] = el;
        }
        return allFound;
    }

    _initTimer() {
        this.timer = new Timer(CONFIG.COUNTDOWN_DURATION, {
            onStart: () => {
                this.elements.timerContainer.classList.remove('hidden');
                this.elements.timerContainer.classList.add('flex');
                this.elements.overlay.classList.add('opacity-0', 'pointer-events-none');
                this._updateButton('Decrypting...', 'fa-circle-notch', true, true);
            },
            onTick: (timeLeftMs) => {
                if (this.elements.timerCount) {
                    // Convert ms to seconds, ensuring 2 digits
                    const seconds = Math.ceil(timeLeftMs / 1000);
                    const formattedSeconds = seconds.toString().padStart(2, '0');
                    this.elements.timerCount.textContent = `00:${formattedSeconds}`;
                }
            },
            onComplete: () => {
                this._revealCode();
            }
        });
    }

    _attachListeners() {
        this.elements.btn.addEventListener('click', () => this._handleButtonClick());
        
        // Interactive overlay click
        this.elements.overlay.addEventListener('click', () => {
            if (this.state === 'idle') this._startProcess();
        });
        
        // Keyboard accessibility
        this.elements.overlay.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && this.state === 'idle') {
                this._startProcess();
            }
        });
    }

    _handleButtonClick() {
        switch (this.state) {
            case 'idle':
                this._startProcess();
                break;
            case 'revealed':
                this._copyCode();
                break;
            default:
                break;
        }
    }

    _startProcess() {
        this.state = 'counting';
        this.timer.start();
    }

    _revealCode() {
        this.state = 'revealed';
        
        // Animation transition
        this.elements.timerContainer.classList.add('hidden');
        this.elements.timerContainer.classList.remove('flex');
        
        this.elements.codeDisplay.classList.remove('hidden');
        this.elements.codeDisplay.classList.add('reveal-pulse');
        
        // Set the actual code text
        this.elements.codeDisplay.textContent = CONFIG.CODE_VALUE;

        this._updateButton('Copy Code', 'fa-copy', false);
    }

    _copyCode() {
        navigator.clipboard.writeText(CONFIG.CODE_VALUE).then(() => {
            this.state = 'copied';
            this._updateButton('Copied!', 'fa-check', false);
            
            // Premium success state
            this.elements.btn.classList.remove('bg-accent', 'hover:bg-accent-dark');
            this.elements.btn.classList.add('bg-green-600', 'border-green-500', 'hover:bg-green-700');

            setTimeout(() => this._reset(), CONFIG.RESET_DELAY);
        }).catch(err => {
            console.error('Failed to copy:', err);
            this._updateButton('Error', 'fa-triangle-exclamation', false);
        });
    }

    _reset() {
        this.state = 'idle';
        this._setInitialState();
        
        // Reset button styles
        this.elements.btn.classList.remove('bg-green-600', 'border-green-500', 'hover:bg-green-700');
        this.elements.btn.classList.add('bg-accent', 'hover:bg-accent-dark');
    }

    _setInitialState() {
        this.elements.codeDisplay.classList.add('hidden');
        this.elements.codeDisplay.classList.remove('reveal-pulse');
        this.elements.codeDisplay.textContent = ''; // Clear DOM
        
        this.elements.timerContainer.classList.add('hidden');
        this.elements.timerContainer.classList.remove('flex');
        
        this.elements.overlay.classList.remove('opacity-0', 'pointer-events-none');
        
        this._updateButton('Reveal Code', 'fa-unlock-keyhole', false);
    }

    _updateButton(text, iconClass, disabled, spin = false) {
        this.elements.btnText.textContent = text;
        this.elements.btn.disabled = disabled;
        this.elements.btnIcon.className = `fa-solid ${iconClass} ${spin ? 'fa-spin' : ''}`;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new OfferManager().init());
} else {
    new OfferManager().init();
}