'use client';

// Word Recall — animated card preview.
// Authentic verbal memory drill loop:
//   1. Memorize Phase: Three word chips display with pink luminescence.
//   2. Recall Input Phase: Monospace card inputs the recalled words; SUBMIT button clicks.
//   3. Verification: Emerald checks confirm perfect score before restarting loop.
// Pure CSS compositor-driven (see `.wr-prev*` in styles/globals.css).

export default function WordRecallPreview() {
  return (
    <div className="wr-prev" aria-hidden="true">
      {/* Header phase badge */}
      <div className="wr-prev-header">
        <span className="wr-prev-pill-mem">MEMORIZE WORDS</span>
        <span className="wr-prev-pill-rec">RECALL INPUT</span>
      </div>

      {/* Memorize Stage: 3 Word Chips */}
      <div className="wr-prev-chips">
        <span className="wr-prev-chip wr-chip-1">CASTLE</span>
        <span className="wr-prev-chip wr-chip-2">FALCON</span>
        <span className="wr-prev-chip wr-chip-3">SHIELD</span>
      </div>

      {/* Input Stage: Monospace Entry Card + Submit Button */}
      <div className="wr-prev-input-card">
        <div className="wr-prev-input-text">
          <span className="wr-type-word wr-type-1">castle</span>
          <span className="wr-type-word wr-type-2">falcon</span>
          <span className="wr-type-word wr-type-3">shield</span>
          <span className="wr-caret" />
        </div>
        <div className="wr-prev-submit">
          <span>SUBMIT</span>
        </div>
      </div>
    </div>
  );
}
