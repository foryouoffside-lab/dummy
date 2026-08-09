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

  // Call this as the first line of the drill's own exit handler so the
  // fullscreenchange/visibilitychange events that handler itself triggers
  // aren't mistaken for an unexpected exit.
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
    const onFullscreenChange = () => { if (!document.fullscreenElement) fire(); };

    // visibilitychange/pagehide are the primary signal on mobile — iOS
    // Safari's Fullscreen API is unreliable/absent there.
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', fire);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', fire);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [active, onUnexpectedExit]);

  return { markIntentionalExit };
}
