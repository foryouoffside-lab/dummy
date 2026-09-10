'use client';

// Object Location — animated card preview.
// 3×3 spatial object memory matrix using crisp vector icons (no emojis).
// Timeline:
//   1. Memorize: 3 distinct vector symbols appear at coordinate cells.
//   2. Target Prompt: Grid clears; header displays "TARGET: [GEM]".
//   3. Locate Hit: Correct cell is tapped, bursting in emerald confirmation.
// Pure CSS compositor-driven (see `.ol-prev*` in styles/globals.css).

import { Gem, Target, Flame } from 'lucide-react';

export default function ObjectLocationPreview() {
  return (
    <div className="ol-prev" aria-hidden="true">
      {/* Target prompt pill above grid */}
      <div className="ol-prev-target">
        <span className="ol-target-label">TARGET:</span>
        <Gem className="ol-target-icon" />
      </div>

      {/* 3x3 Matrix Grid */}
      <div className="ol-prev-grid">
        {Array.from({ length: 9 }).map((_, i) => {
          let symbol = null;
          let cellCls = 'ol-cell-blank';

          if (i === 1) {
            symbol = <Gem className="w-[60%] h-[60%] text-cyan-400 ol-sym-gem" />;
            cellCls = 'ol-cell-gem';
          } else if (i === 5) {
            symbol = <Target className="w-[60%] h-[60%] text-amber-400 ol-sym-tgt" />;
            cellCls = 'ol-cell-tgt';
          } else if (i === 6) {
            symbol = <Flame className="w-[60%] h-[60%] text-rose-400 ol-sym-flm" />;
            cellCls = 'ol-cell-flm';
          }

          return (
            <div key={i} className={`ol-prev-cell ${cellCls}`}>
              {symbol}
            </div>
          );
        })}
      </div>
    </div>
  );
}
