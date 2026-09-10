'use client';

// Divided Attention Test — animated card preview.
// The drill's dual-task training environment on a 6s loop:
//   • Left visual canvas: tactical blue target glides across the field and gets tapped
//     with its authentic SVG crosshair, outer ping halo, and pop reaction.
//   • Right telemetry panel: sequential number stream. When an EVEN number (8, 4) appears,
//     the cell flashes a green border and the "MATCH" button presses in.
//
// Elements, layouts, SVG target, and colors are lifted from DividedAttentionClient.js.

export default function DividedAttentionPreview() {
  return (
    <div className="da-prev" aria-hidden="true">
      {/* Left Canvas: Moving Tactical Target Stream */}
      <div className="da-prev-canvas">
        <div className="da-prev-target-wrap da-prev-tgt-1">
          {/* Outer Ping Ring */}
          <div className="da-prev-ping" />
          {/* Tactical Target SVG matching DividedAttentionClient & 180-degree-awareness */}
          <svg className="da-prev-svg" viewBox="0 0 100 100">
            {/* Ghost outer ring */}
            <circle cx="50" cy="50" r="46" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.25" />
            {/* Tactical outer ring */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.6" />
            {/* Outer crosshair ticks */}
            <line x1="50" y1="4" x2="50" y2="10" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
            <line x1="50" y1="90" x2="50" y2="96" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
            <line x1="4" y1="50" x2="10" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
            <line x1="90" y1="50" x2="96" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
            {/* Filled body */}
            <circle cx="50" cy="50" r="32" fill="#3b82f6" opacity="0.85" />
            {/* Inner highlight sheen */}
            <circle cx="50" cy="50" r="22" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
            {/* Bright white core dot */}
            <circle cx="50" cy="50" r="7" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* Right Stream Panel: Number Matching */}
      <div className="da-prev-side">
        {/* Number Box with green matched state on evens */}
        <div className="da-prev-num-box">
          <span className="da-prev-num da-prev-n1">3</span>
          <span className="da-prev-num da-prev-n2">8</span>
          <span className="da-prev-num da-prev-n3">7</span>
          <span className="da-prev-num da-prev-n4">4</span>
          <div className="da-prev-num-matched" />
        </div>

        <span className="da-prev-side-tag">EVEN MATCH</span>

        {/* Match Button */}
        <div className="da-prev-match-btn">
          MATCH
        </div>
      </div>
    </div>
  );
}
