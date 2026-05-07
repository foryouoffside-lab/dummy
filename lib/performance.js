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