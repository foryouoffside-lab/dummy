'use client';

// Color Sequence — animated card preview.
// 6 colorful squircle pads in a 3×2 tactical layout.
// Timeline:
//   1. Prompt indicates "WATCH": Red -> Green -> Blue pads flash sequentially with halos.
//   2. Prompt indicates "TAP": Simulated input presses Red -> Green -> Blue in order.
//   3. Success flash confirms correct sequence recall.
// Pure CSS compositor-driven (see `.colseq-prev*` in styles/globals.css).

const PADS = [
  { id: 'red', label: 'R', colorClass: 'colseq-pad-red' },
  { id: 'blue', label: 'B', colorClass: 'colseq-pad-blue' },
  { id: 'green', label: 'G', colorClass: 'colseq-pad-green' },
  { id: 'yellow', label: 'Y', colorClass: 'colseq-pad-yellow' },
  { id: 'purple', label: 'P', colorClass: 'colseq-pad-purple' },
  { id: 'orange', label: 'O', colorClass: 'colseq-pad-orange' },
];

export default function ColorSequencePreview() {
  return (
    <div className="colseq-prev" aria-hidden="true">
      <div className="colseq-prev-header">
        <span className="colseq-prev-pill">SEQUENCE RECALL</span>
      </div>

      <div className="colseq-prev-grid">
        {PADS.map((pad, idx) => (
          <div
            key={pad.id}
            className={`colseq-prev-pad ${pad.colorClass} colseq-pad-seq-${idx}`}
          >
            <div className="colseq-prev-pad-inner" />
          </div>
        ))}
      </div>
    </div>
  );
}
