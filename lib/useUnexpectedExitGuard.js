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
  const activeRef = useRef(active);
  activeRef.current = active;
  // Set once the drill has actually taken pointer lock, so the release-triggered
  // exit below can't fire during the brief window before the lock is granted.
  const hadPointerLockRef = useRef(false);

  // Call this as the first line of the drill's own exit handler so the events
  // that handler itself triggers aren't mistaken for an unexpected exit.
  const markIntentionalExit = useCallback(() => {
    intentionalRef.current = true;
    setTimeout(() => { intentionalRef.current = false; }, 1000);
  }, []);

  useEffect(() => {
    if (!active) return;
    hadPointerLockRef.current = false;

    const fire = () => {
      if (!intentionalRef.current) onUnexpectedExit();
    };
    const onVisibility = () => { if (document.hidden) fire(); };
    const onKeyDown = (e) => { if (e.key === 'Escape') fire(); };

    // A running drill holds pointer lock (and, on desktop, native fullscreen).
    // Pressing Esc releases the lock and the browser eats that same keydown, so
    // onKeyDown never sees it — the drill would just sit on its "paused" overlay.
    // Treat losing the lock mid-drill as the exit: only after the lock was
    // actually taken, only while the tab is still foregrounded (a deliberate Esc,
    // not a tab-away that onVisibility already covers), and deferred a tick so
    // the pointer-unlock that endGame() itself does on the finish frame has
    // flipped `active` false first.
    const onPointerLockChange = () => {
      if (document.pointerLockElement) {
        hadPointerLockRef.current = true;
        return;
      }
      if (!hadPointerLockRef.current || document.hidden) return;
      hadPointerLockRef.current = false;
      setTimeout(() => {
        if (
          activeRef.current &&
          !intentionalRef.current &&
          !document.pointerLockElement &&
          !document.hidden
        ) {
          onUnexpectedExit();
        }
      }, 0);
    };

    // visibilitychange/pagehide are the only signal on mobile: there is no
    // key to press and the back gesture unloads the page rather than the drill.
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', fire);
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', fire);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
    };
  }, [active, onUnexpectedExit]);

  return { markIntentionalExit };
}
