'use client';

import { useEffect } from 'react';

const ZOOM_KEYS = new Set(['+', '-', '=', '0', 'Add', 'Subtract']);

export default function ZoomGuard() {
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) e.preventDefault();
    };

    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && ZOOM_KEYS.has(e.key)) e.preventDefault();
    };

    const handleGesture = (e) => e.preventDefault();

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeydown);
    document.addEventListener('gesturestart', handleGesture);
    document.addEventListener('gesturechange', handleGesture);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('gesturestart', handleGesture);
      document.removeEventListener('gesturechange', handleGesture);
    };
  }, []);

  return null;
}
