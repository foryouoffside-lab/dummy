'use client';

// Symbol Matching — animated card preview.
// The drill's SDMT (Symbol Digit Modalities) board on a 5.2s loop:
//   1. Target prompt displays "Ω" -> button 3 presses in with active scale-95
//   2. Target prompt switches to "Σ" -> button 4 presses in with active scale-95
//   3. Legend key matrix maps 6 Greek symbols to digits 1-6:
//      [Δ:1] [Φ:2] [Ω:3] [Σ:4] [Ξ:5] [Π:6]
//
// All elements, symbols, fonts, and button grids match SymbolMatchingClient.js.

const KEY_PAIRS = [
  { symbol: 'Δ', digit: 1 },
  { symbol: 'Φ', digit: 2 },
  { symbol: 'Ω', digit: 3 },
  { symbol: 'Σ', digit: 4 },
  { symbol: 'Ξ', digit: 5 },
  { symbol: 'Π', digit: 6 },
];

export default function SymbolMatchingPreview() {
  return (
    <div className="sm-prev" aria-hidden="true">
      <div className="sm-prev-grid-bg" />

      <div className="sm-prev-board">
        {/* Top: Center Target Symbol Prompt (Fits clean between top-left and top-right badges) */}
        <div className="sm-prev-target-wrap">
          <span className="sm-prev-target-label">TARGET SYMBOL</span>
          <div className="sm-prev-target-card">
            <span className="sm-prev-target-sym sm-prev-sym-1 font-serif">Ω</span>
            <span className="sm-prev-target-sym sm-prev-sym-2 font-serif">Σ</span>
          </div>
        </div>

        {/* Middle: Legend Key Mapping (6 Greek Symbols to Digits) */}
        <div className="sm-prev-legend">
          {KEY_PAIRS.map(pair => (
            <div key={pair.digit} className="sm-prev-legend-pair">
              <span className="sm-prev-sym font-serif">{pair.symbol}</span>
              <span className="sm-prev-dig">{pair.digit}</span>
            </div>
          ))}
        </div>

        {/* Bottom: 6-Digit Button Pad */}
        <div className="sm-prev-pad">
          {[1, 2, 3, 4, 5, 6].map(digit => (
            <div
              key={digit}
              className={`sm-prev-pad-btn sm-prev-btn-${digit}`}
            >
              {digit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
