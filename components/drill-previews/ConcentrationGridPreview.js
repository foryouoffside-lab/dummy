'use client';

// Concentration Grid — animated card preview.
// The drill's board being cleared: a shuffled number grid, tapped 1, 2, 3, 4…
// in order, each cell taking the drill's "found" style as it goes — green-500
// at 20%, its green border and text, scaled to 95% and dimmed to 55%. The
// board finishes clear, holds, and a fresh one starts.

const BOARD = [7, 13, 2, 10, 14, 4, 16, 5, 1, 11, 8, 15, 12, 6, 3, 9];

export default function ConcentrationGridPreview() {
  return (
    <div className="cg-prev" aria-hidden="true">
      <div className="cg-prev-grid">
        {BOARD.map(n => (
          <span key={n} className={`cg-prev-cell cg-prev-n${n}`}>{n}</span>
        ))}
      </div>
    </div>
  );
}
