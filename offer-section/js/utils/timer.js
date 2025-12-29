export class Timer {
    constructor(duration, callbacks) {
        this.duration = duration;
        this.remaining = duration;
        this.callbacks = callbacks;
        this.running = false;
        this.startTime = null;
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.callbacks.onStart?.();
        this.startTime = performance.now();
        this._loop();
    }

    _loop() {
        if (!this.running) return;

        requestAnimationFrame((now) => {
            if (!this.running) return;
            
            const elapsed = now - this.startTime;
            this.remaining = Math.max(0, this.duration - elapsed);

            this.callbacks.onTick?.(this.remaining);

            if (this.remaining <= 0) {
                this.running = false;
                this.callbacks.onComplete?.();
            } else {
                this._loop();
            }
        });
    }

    stop() {
        this.running = false;
    }
}