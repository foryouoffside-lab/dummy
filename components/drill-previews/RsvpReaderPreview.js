'use client';

// RSVP Speed Reader — animated card preview.
// The drill's Rapid Serial Visual Presentation stream on a 4.5s loop:
//   1. Banner displays "TARGET WORD: BRAIN"
//   2. Words flash sequentially at a fixed focal point with the Optimal
//      Recognition Point (ORP) pivot character underlined in red:
//      "Visual" -> "Cortex" -> "Neural" -> "BRAIN" -> "Speed"
//   3. When "BRAIN" is reached, the "TARGET DETECTED" button below presses
//      in with active scale-95 and amber flash glow.
//
// Elements, styling, and typography lifted directly from RSVPReaderClient.js.

const WORDS = [
  { prefix: 'Vis', pivot: 'u', suffix: 'al', isTarget: false },
  { prefix: 'Co',  pivot: 'r', suffix: 'tex', isTarget: false },
  { prefix: 'Ne',  pivot: 'u', suffix: 'ral', isTarget: false },
  { prefix: 'Br',  pivot: 'a', suffix: 'in',  isTarget: true },
  { prefix: 'Sp',  pivot: 'e', suffix: 'ed',  isTarget: false },
];

export default function RsvpReaderPreview() {
  return (
    <div className="rsvp-prev" aria-hidden="true">
      {/* Background 40px grid */}
      <div className="rsvp-prev-grid" />

      {/* Target Word Banner Top Center */}
      <div className="rsvp-prev-banner">
        <span className="rsvp-prev-banner-label">TARGET WORD:</span>
        <span className="rsvp-prev-banner-target">BRAIN</span>
      </div>

      {/* ORP Focal Word Stream */}
      <div className="rsvp-prev-focal-wrap">
        {WORDS.map((w, idx) => (
          <div key={idx} className={`rsvp-prev-word rsvp-prev-w${idx + 1}`}>
            <span className="rsvp-prev-prefix">{w.prefix}</span>
            <span className="rsvp-prev-pivot">{w.pivot}</span>
            <span className="rsvp-prev-suffix">{w.suffix}</span>
          </div>
        ))}
      </div>

      {/* Target Detected Action Button */}
      <div className="rsvp-prev-btn-wrap">
        <div className="rsvp-prev-btn">
          TARGET DETECTED
        </div>
      </div>
    </div>
  );
}
