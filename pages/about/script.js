document.addEventListener('DOMContentLoaded', () => {
    // Theme detection removed - Light Mode enforced

    // Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});