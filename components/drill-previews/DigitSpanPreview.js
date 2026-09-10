'use client';

// Digit Span — animated card preview.
// Authentic representation of the drill's tactical numpad & display box.
// Timeline:
//   1. Memorize: '8 3 5 9' displays with glowing purple luminescence.
//   2. Input: Monospace box clears, keys 8 -> 3 -> 5 -> 9 depress in sequence.
//   3. Submit: Emerald ENTER button pulses and display flashes confirmation.
// Pure CSS (see `.ds-prev*` in styles/globals.css).

import { Check, Delete } from 'lucide-react';

const NUMPAD_KEYS = [
  '1', '2', '3',
  '4', '5', '6',
  '7', '8', '9',
  'del', '0', 'enter'
];

export default function DigitSpanPreview() {
  return (
    <div className="ds-prev" aria-hidden="true">
      {/* Top Display Box */}
      <div className="ds-prev-display">
        <span className="ds-prev-digit-group">
          <span className="ds-prev-digit ds-digit-1">8</span>
          <span className="ds-prev-digit ds-digit-2">3</span>
          <span className="ds-prev-digit ds-digit-3">5</span>
          <span className="ds-prev-digit ds-digit-4">9</span>
        </span>
      </div>

      {/* 3x4 Numpad */}
      <div className="ds-prev-numpad">
        {NUMPAD_KEYS.map((key) => {
          let content = key;
          let extraClass = '';
          if (key === 'del') {
            content = <Delete className="w-3 h-3 text-red-400" />;
            extraClass = 'ds-key-del';
          } else if (key === 'enter') {
            content = <Check className="w-3 h-3 text-emerald-300" />;
            extraClass = 'ds-key-enter';
          } else {
            extraClass = `ds-key-${key}`;
          }

          return (
            <div key={key} className={`ds-prev-key ${extraClass}`}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
