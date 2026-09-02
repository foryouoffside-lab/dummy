'use client';

import { useEffect } from 'react';

/**
 * Immersive mode — the full-viewport layout a drill switches into when it starts.
 *
 * WHY THIS IS NOT THE FULLSCREEN API
 * It used to be. On Android Chrome, `requestFullscreen()` makes the browser paint
 * its own toast — "skilldrills.online – to exit full screen, drag from the top and
 * touch the back button" — across the bottom of the screen, on top of the GET READY
 * countdown. That toast is browser chrome: no CSS or JS can style, move or dismiss
 * it, and it reappears on every drill start. The only way to be rid of it is not to
 * ask for fullscreen at all.
 *
 * Nothing is lost by dropping it. The full-viewport layout never came from the API —
 * every drill keys its own `fixed inset-0 z-[100] h-[100dvh]` classes off the same
 * flag passed in here, so flipping the flag paints the same screen, minus the toast.
 * The one thing the API did own is what this hook now does: while a drill fills the
 * screen, the page behind it must not scroll or rubber-band. Esc still leaves the
 * drill — that path used to ride on `fullscreenchange` and now lives in
 * useUnexpectedExitGuard.
 */
export default function useImmersiveMode(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const { overflow, overscrollBehavior } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.overscrollBehavior = overscrollBehavior;
    };
  }, [active]);
}
