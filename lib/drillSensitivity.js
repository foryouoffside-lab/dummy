'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'skilldrills_mouse_sens';

export const SENS_MIN = 0.1;
export const SENS_MAX = 3.0;
export const SENS_STEP = 0.05;
export const SENS_DEFAULT = 1.0;

// 30 cm/360 at 1.00x is the reference every per-drill slider used to print, kept
// as-is so the number people already calibrated against does not move.
export function cmPer360(value) {
  return (30 / value).toFixed(1);
}

function clamp(v) {
  const n = parseFloat(v);
  if (!Number.isFinite(n)) return SENS_DEFAULT;
  return Math.min(SENS_MAX, Math.max(SENS_MIN, n));
}

/**
 * One pointer-multiplier for every mouse-aimed drill on the site. Lives here
 * instead of in each drill's start card so a user calibrates once on /drills and
 * every drill inherits it. Touch-only devices never aim with movementX/Y, so the
 * UI that writes this is desktop-only — see DrillGlobalSettings.
 */
class DrillSensitivity {
  constructor() {
    this.value = SENS_DEFAULT;
    this.listeners = new Set();
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved !== null) this.value = clamp(saved);
      } catch (e) {}
    }
  }

  get() {
    return this.value;
  }

  set(v) {
    this.value = clamp(v);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, String(this.value));
      } catch (e) {}
    }
    this.listeners.forEach((fn) => fn(this.value));
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }
}

export const drillSensitivity = new DrillSensitivity();

/**
 * How drills read the multiplier. Starts at the default so the server render and
 * the first client render agree, then syncs to the stored value on mount and
 * tracks any later change made from the settings panel.
 */
export function useDrillSensitivity() {
  const [value, setValue] = useState(SENS_DEFAULT);
  useEffect(() => {
    setValue(drillSensitivity.get());
    return drillSensitivity.subscribe(setValue);
  }, []);
  return value;
}
