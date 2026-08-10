// lib/performance.js
// Performance monitoring and optimization utilities

/**
 * Report Core Web Vitals to analytics
 */
export function reportWebVitals(metric) {
  // Send to Vercel Analytics (already integrated)
  if (window.gtag) {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 ${metric.name}: ${metric.value} (${metric.rating})`);
  }
}

/**
 * Lazy load a component with a minimum delay
 * Useful for below-fold content
 */
export function lazyWithDelay(importFn, delay = 0) {
  return Promise.all([
    importFn,
    new Promise(resolve => setTimeout(resolve, delay)),
  ]).then(([moduleExports]) => moduleExports);
}

/**
 * Debounce function for performance-sensitive operations
 */
export function debounce(fn, delay = 100) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle function for scroll/resize handlers
 */
export function throttle(fn, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Idle callback wrapper for non-critical work
 */
export function scheduleIdleTask(callback) {
  if ('requestIdleCallback' in window) {
    return requestIdleCallback(callback, { timeout: 2000 });
  }
  return setTimeout(callback, 1);
}

/**
 * Prefetch a page route for faster navigation
 */
export function prefetchRoute(router, path) {
  if (router && typeof router.prefetch === 'function') {
    router.prefetch(path);
  }
}

/**
 * Check if the page is visible (for pausing animations)
 */
export function usePageVisibility() {
  if (typeof document === 'undefined') return true;
  return !document.hidden;
}

/**
 * Frame budget (ms) used to cap idle-screen canvas redraws to ~60fps on
 * high-refresh-rate displays (120/144/240Hz), where an uncapped rAF loop
 * would otherwise draw 2-4x more often than needed while a drill is sitting
 * on a start/countdown/game-over screen.
 */
export const IDLE_FRAME_BUDGET_MS = 1000 / 60;

/**
 * Returns true when a render-loop frame can be skipped: the drill isn't
 * actively being played AND less than budgetMs has elapsed since the last
 * frame that was actually drawn. Callers should early-return (after
 * re-scheduling their own requestAnimationFrame) without advancing their
 * own lastTime/dt state when this returns true, so the next processed
 * frame's dt still reflects true elapsed time.
 */
export function isIdleFrameSkippable(isActive, time, lastTime, budgetMs = IDLE_FRAME_BUDGET_MS) {
  return !isActive && (time - lastTime) < budgetMs;
}

/**
 * Memory warning detection
 */
export function checkMemoryUsage() {
  if ('memory' in performance) {
    const { usedJSHeapSize, jsHeapSizeLimit } = performance.memory;
    const usagePercent = (usedJSHeapSize / jsHeapSizeLimit) * 100;
    
    if (usagePercent > 80) {
      console.warn('⚠️ High memory usage detected. Consider reducing state.');
      return true;
    }
  }
  return false;
}