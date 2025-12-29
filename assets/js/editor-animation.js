document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('ai-terminal-output');
    if (!terminalOutput) return;

    const messages = [
        { text: "> Analyzing workspace...", color: "text-slate" },
        { text: "> Deep-linking AI context for main.py", color: "text-slate" },
        { text: "[SYSTEM] Detected complex algorithm on line 42", color: "text-accent font-bold" },
        { text: "> Requesting optimization suggestion...", color: "text-slate" },
        { text: "\n# AI Suggestion:", color: "text-white font-bold" },
        { text: "# You are using a nested loop for data filtering.", color: "text-slate" },
        { text: "# Suggest using a hash map for O(1) lookups.", color: "text-slate" },
        { text: "\n# Recommended change:", color: "text-green-400 font-bold" },
        { text: "lookup = {item.id: item for item in collection}", color: "text-green-400" },
        { text: "result = [lookup[key] for key in target_keys]", color: "text-green-400" },
        { text: "\n[OK] Optimization applied successfully.", color: "text-accent" },
        { text: "> Ready to ship to App Store.", color: "text-slate" }
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isTyping = false;

    function typeEffect() {
        if (messageIndex < messages.length) {
            const currentMsg = messages[messageIndex];
            
            if (charIndex === 0) {
                const line = document.createElement('div');
                line.className = currentMsg.color + ' mb-1 min-h-[1.2rem]';
                line.id = `ai-line-${messageIndex}`;
                terminalOutput.appendChild(line);
            }

            const currentLine = document.getElementById(`ai-line-${messageIndex}`);
            
            if (charIndex < currentMsg.text.length) {
                currentLine.textContent += currentMsg.text.charAt(charIndex);
                charIndex++;
                
                // Dynamic speed: comments and system messages type slightly faster
                let delay = 20;
                if (currentMsg.text.includes('#')) delay = 10;
                if (currentMsg.text.charAt(charIndex-1) === '.') delay = 150;

                setTimeout(typeEffect, delay);
            } else {
                messageIndex++;
                charIndex = 0;
                setTimeout(typeEffect, 400);
            }

            // Smooth scrolling to follow output
            const container = terminalOutput.parentElement;
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        } else {
            // End of script, reset after pause
            setTimeout(() => {
                terminalOutput.innerHTML = "";
                messageIndex = 0;
                charIndex = 0;
                typeEffect();
            }, 6000);
        }
    }

    // Intersection Observer to start animation when visible
    const terminalObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isTyping) {
            isTyping = true;
            typeEffect();
            terminalObserver.disconnect();
        }
    }, { threshold: 0.3 });

    terminalObserver.observe(terminalOutput);
});