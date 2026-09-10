'use client';

// Dual N-Back Training Pro — animated card preview.
// Authentic working memory sequence updating HUD.
// Loop:
//   Step 1: 'K' appears (buffer: [K])
//   Step 2: 'B' appears (buffer: [K, B], NO MATCH)
//   Step 3: 'M' appears (buffer: [K, B, M], NO MATCH)
//   Step 4: 'K' returns! 3 steps back match! MATCH button triggers cyan pulse.
// Pure CSS compositor-driven (see `.nb-prev*` in styles/globals.css).

export default function NBackPreview() {
  return (
    <div className="nb-prev" aria-hidden="true">
      {/* 3-Back Training Mode Pill */}
      <div className="nb-prev-pill">
        <span>3-BACK TRAINING</span>
      </div>

      {/* Center Letter Box */}
      <div className="nb-prev-stimulus-box">
        <span className="nb-stimulus-letter nb-seq-1">K</span>
        <span className="nb-stimulus-letter nb-seq-2">B</span>
        <span className="nb-stimulus-letter nb-seq-3">M</span>
        <span className="nb-stimulus-letter nb-seq-4">K</span>
      </div>

      {/* Decision Buttons (MATCH / NO MATCH) */}
      <div className="nb-prev-actions">
        <div className="nb-btn nb-btn-match">
          <span>MATCH</span>
        </div>
        <div className="nb-btn nb-btn-nomatch">
          <span>NO MATCH</span>
        </div>
      </div>
    </div>
  );
}
