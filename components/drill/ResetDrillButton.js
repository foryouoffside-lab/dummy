'use client';

import { Trash2 } from 'lucide-react';

// Small trash-icon button for a drill card on a category landing page.
// Clears every localStorage key that drill's progress could live under, so
// the player's next session starts completely fresh (back to the base
// difficulty level). Lives inside a <Link> card, so it must stop the click
// from also navigating.
export default function ResetDrillButton({ storageKeys = [], drillName = 'this drill', onReset, className = '' }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window === 'undefined') return;
    const ok = window.confirm(`Reset progress for ${drillName}? Your saved level and stats will be cleared and the next session starts from the beginning. This can't be undone.`);
    if (!ok) return;
    try {
      storageKeys.forEach((k) => window.localStorage.removeItem(k));
    } catch (err) {}
    onReset?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`Reset ${drillName} progress`}
      aria-label={`Reset ${drillName} progress`}
      className={`p-1 rounded-full border border-hairline bg-surface-2 text-ink-3 hover:text-red-400 hover:border-red-500/40 active:scale-90 transition-colors cursor-pointer ${className}`}
    >
      <Trash2 className="w-3 h-3" />
    </button>
  );
}
