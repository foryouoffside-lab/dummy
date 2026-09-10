'use client';

// Grid Memorization — animated card preview.
// A 3×3 board plays the drill's core loop on repeat:
//   1. cells light indigo      — the pattern to memorize
//   2. the board goes dark     — recall phase begins
//   3. the same cells pop cyan, one after another in a short cascade
//   4. snap back to step 1     — a fresh pattern
//
// All motion is CSS (see `.gm-prev*` in styles/globals.css).

const LIT = [1, 3, 5, 7];

export default function GridMemorizationPreview() {
  return (
    <div className="gm-prev" aria-hidden="true">
      <div className="gm-prev-grid">
        {Array.from({ length: 9 }).map((_, i) => {
          const order = LIT.indexOf(i);
          const on = order !== -1;
          return (
            <span
              key={i}
              className={on ? 'gm-prev-cell gm-prev-on' : 'gm-prev-cell'}
              style={on ? { animationDelay: `${(-0.065 * order).toFixed(3)}s` } : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
