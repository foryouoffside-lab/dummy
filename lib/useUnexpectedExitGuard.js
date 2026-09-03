'use client';

import { useEffect, useRef, useCallback } from 'react';

// Detects a player leaving mid-drill through anything OTHER than the app's
// own Exit button — Android back gesture, iOS swipe, Esc, backgrounding the
// tab. Without this, a drill's timers/RAF loop/audio can keep running after
// the player is gone. This hook doesn't own cleanup itself (every drill's
// cleanup shape differs — setInterval refs, RAF refs, timeout arrays, pointer
// lock); it just calls back into the drill's own existing `handleExitDrill`,
// the function already wired to the in-app Exit button.
export default function useUnexpectedExitGuard({ active, onUnexpectedExit }) {
  const intentionalRef = useRef(false);

  // Call this as the first line of the drill's own exit handler so the events
  // that handler itself triggers aren't mistaken for an unexpected exit.
  const markIntentionalExit = useCallback(() => {
    intentionalRef.current = true;
    setTimeout(() => { intentionalRef.current = false; }, 1000);
  }, []);

  useEffect(() => {
    if (!active) return;

    const fire = () => {
      if (!intentionalRef.current) onUnexpectedExit();
    };
    const onVisibility = () => { if (document.hidden) fire(); };
    // Esc used to reach us via fullscreenchange, back when a running drill was
    // in native fullscreen. Drills are now immersive by CSS alone, so nothing
    // else would notice the key.
    const onKeyDown = (e) => { if (e.key === 'Escape') fire(); };

    // visibilitychange/pagehide are the only signal on mobile: there is no
    // key to press and the back gesture unloads the page rather than the drill.
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', fire);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', fire);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [active, onUnexpectedExit]);

  return { markIntentionalExit };
}
