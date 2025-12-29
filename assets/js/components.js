/**
 * Component Loader
 * Dynamically loads HTML fragments into the DOM.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Load 'Start Coding Anywhere' Section
    loadComponent('start-coding-container', 'sections/start-coding-anywhere/index.html');
});

async function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const html = await response.text();
            container.innerHTML = html;
            
            // Execute scripts in the loaded content if any (simple implementation)
            const scripts = container.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        } else {
            console.error(`Failed to load component: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error loading component ${filePath}:`, error);
    }
}