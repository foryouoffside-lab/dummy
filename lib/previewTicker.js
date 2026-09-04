// lib/previewTicker.js
// Shared 30fps animation clock for drill preview canvases.
// One requestAnimationFrame loop drives all cards on the page.

class PreviewTicker {
  constructor() {
    this.subscribers = new Set();
    this.rafId = null;
    this.running = false;
    this.startTime = 0;
    this.lastFrameTime = 0;
    this.frameInterval = 1000 / 30; // 30 fps cap (~33.3ms)

    this.tick = this.tick.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);

    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', this.handleVisibility);
      window.addEventListener('blur', this.handleVisibility);
      window.addEventListener('focus', this.handleVisibility);
    }
  }

  handleVisibility() {
    if (typeof document === 'undefined') return;
    if (document.hidden) {
      this.stop();
    } else if (this.subscribers.size > 0 && !this.running) {
      this.start();
    }
  }

  start() {
    if (this.running || typeof window === 'undefined') return;
    this.running = true;
    if (!this.startTime) {
      this.startTime = performance.now();
    }
    this.lastFrameTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  tick(now) {
    if (!this.running) return;

    this.rafId = requestAnimationFrame(this.tick);

    const delta = now - this.lastFrameTime;
    if (delta < this.frameInterval) return;

    // Adjust lastFrameTime to prevent frame-drift accumulation
    this.lastFrameTime = now - (delta % this.frameInterval);
    const elapsedMs = now - this.startTime;

    for (const fn of this.subscribers) {
      try {
        fn(elapsedMs);
      } catch (err) {
        console.error('PreviewTicker subscriber error:', err);
      }
    }
  }

  subscribe(fn) {
    this.subscribers.add(fn);
    if (this.subscribers.size === 1 && (typeof document === 'undefined' || !document.hidden)) {
      this.start();
    }
    return () => {
      this.subscribers.delete(fn);
      if (this.subscribers.size === 0) {
        this.stop();
      }
    };
  }
}

export const previewTicker = new PreviewTicker();
export default previewTicker;
