// Simple Interaction Logic for Blog Posts

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = document.getElementById('shareBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Copied!</span>';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
}

function estimateReadTime() {
    const text = document.querySelector('.prose').innerText;
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    const readTimeEl = document.getElementById('readTime');
    if (readTimeEl) {
        readTimeEl.textContent = `${time} Min Read`;
    }
}

document.addEventListener('DOMContentLoaded', estimateReadTime);
          