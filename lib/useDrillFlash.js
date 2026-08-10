'use client';

import { useState, useCallback } from 'react';
import { drillFlash } from '@/lib/drillFlash';

// Universal wrong-click / timeout red flash. Pairs with <DrillFlashOverlay>
// (components/drill/DrillFlashOverlay.js) and the .fx-flash / .fx-flash-red
// (etc.) keyframes already defined in styles/globals.css.
export default function useDrillFlash() {
  const [flashes, setFlashes] = useState([]);

  const triggerFlash = useCallback((variant = 'red') => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id, variant }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  return { flashes, triggerFlash };
}
