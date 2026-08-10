'use client';

const STORAGE_KEY = 'skilldrills_timeout_enabled';

class DrillTimeout {
  constructor() {
    this.enabled = true;
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved !== null) this.enabled = saved === '1';
      } catch (e) {}
    }
  }

  isEnabled() {
    return this.enabled;
  }

  setEnabled(v) {
    this.enabled = Boolean(v);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, this.enabled ? '1' : '0');
      } catch (e) {}
    }
  }
}

export const drillTimeout = typeof window !== 'undefined' ? new DrillTimeout() : new DrillTimeout();
