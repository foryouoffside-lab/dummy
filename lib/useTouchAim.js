'use client';

import { useEffect, useState } from 'react';

// A phone or tablet: touch-capable with no mouse attached.
export function useIsTouchOnly() {
  const [touchOnly, setTouchOnly] = useState(false);
  useEffect(() => {
    setTouchOnly(
      ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
      !window.matchMedia('(pointer: fine)').matches
    );
  }, []);
  return touchOnly;
}

// Drives a drill's crosshair from a finger.
//
// The path-following drills aim with a pointer-locked mouse and integrate
// `movementX/Y` — relative input a touchscreen never produces. Pointer lock
// itself is also mouse-only: on a phone the request is rejected, so the drill
// sat behind its "click to lock cursor" overlay forever, unplayable. A finger
// has no relative motion to give, but it has something better: it is already
// pointing at the exact spot the player means. So on touch the crosshair simply
// goes where the finger is, in canvas pixels.
//
// `onMove` must be stable (useCallback) — it is a dependency of the listener.
export function useTouchAim({ active, canvasRef, onMove }) {
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!active || !cvs) return;
    const move = (e) => {
      const r = cvs.getBoundingClientRect();
      if (!r.width || !r.height) return;
      onMove(
        ((e.clientX - r.left) / r.width) * cvs.width,
        ((e.clientY - r.top) / r.height) * cvs.height
      );
    };
    // pointerdown as well as pointermove, so the first touch places the
    // crosshair rather than leaving it wherever the last run left it.
    cvs.addEventListener('pointerdown', move);
    cvs.addEventListener('pointermove', move);
    return () => {
      cvs.removeEventListener('pointerdown', move);
      cvs.removeEventListener('pointermove', move);
    };
  }, [active, canvasRef, onMove]);
}
