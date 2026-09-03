'use client';

import { useEffect, useRef } from 'react';

/**
 * Immersive mode — the full-viewport layout a drill switches into when it starts.
 *
 * TWO LAYERS, AND WHY
 *
 * 1. The layout itself is CSS, not the Fullscreen API. Every drill keys its own
 *    `fixed inset-0 z-[100] h-[100dvh]` classes off the same flag passed in here,
 *    so flipping the flag paints the drill across the viewport on its own. This
 *    layer runs everywhere, and the page behind it is scroll- and rubber-band
 *    locked for as long as it is up.
 *
 * 2. On top of that, on pointer-and-hover devices only, we also ask the browser
 *    to go actually fullscreen, which is the only way to get rid of the browser's
 *    own chrome — tab strip, address bar. Layer 1 fills the viewport; it cannot
 *    reach past it, and a drill with the address bar still overhead is not the
 *    fullscreen players expect.
 *
 * WHY LAYER 2 IS GATED TO POINTER DEVICES
 * On Android Chrome, `requestFullscreen()` makes the browser paint its own toast —
 * "skilldrills.online – to exit full screen, drag from the top and touch the back
 * button" — across the bottom of the screen, on top of the GET READY countdown.
 * That toast is browser chrome: no CSS or JS can style, move or dismiss it, and it
 * reappears on every drill start. A previous pass dropped the API site-wide to be
 * rid of it, which also cost desktop its real fullscreen. The gate keeps both: the
 * toast never fires on a touch device because we never ask there, and desktop gets
 * its chrome-free screen back. Touch devices keep layer 1, which is what they had.
 *
 * Esc leaves the drill through useUnexpectedExitGuard, which listens for the key
 * itself; it does not ride on `fullscreenchange`.
 */

// Desktop-shaped input. Android and iOS report `pointer: coarse` / no hover, so
// this is false on exactly the devices whose browsers paint the exit toast. iOS
// Safari has no element fullscreen at all, so it would be a no-op there anyway.
function prefersNativeFullscreen(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export default function useImmersiveMode(active: boolean): void {
  // Only ever exit fullscreen we ourselves entered — the player may have been in
  // F11 fullscreen before the drill started, and dropping them out of it on exit
  // would be us undoing something we did not do.
  const enteredRef = useRef(false);

  useEffect(() => {
    if (!active) return;
    const { overflow, overscrollBehavior } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    if (prefersNativeFullscreen() && !document.fullscreenElement) {
      // Fires inside the click's transient user activation, so the request is
      // allowed. It still rejects if the browser or an iframe policy says no —
      // that only costs us layer 2, and layer 1 has already painted.
      document.documentElement.requestFullscreen?.()
        .then(() => { enteredRef.current = true; })
        .catch(() => { enteredRef.current = false; });
    }

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.overscrollBehavior = overscrollBehavior;
      if (enteredRef.current && document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
      }
      enteredRef.current = false;
    };
  }, [active]);
}
