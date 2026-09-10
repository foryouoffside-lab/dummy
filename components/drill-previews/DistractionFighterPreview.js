'use client';

// Distraction Fighter — animated card preview.
// The drill's own Stroop board, two trials on a loop:
//   1. "RED" printed in cyan ink over the drill's 2x2 answer grid
//   2. the CYAN button presses in — the ink, not the word
//   3. the next trial replaces it: "BLUE" printed in yellow, a fresh shuffle
//      with the answer in a different corner, and YELLOW presses in
//
// One trial layer is visible at a time (hard opacity steps, no cross-fade), so
// reduced motion parks on a complete, readable board rather than a blend.
// Everything is transform/opacity/background-color only — see `.df-prev*` in
// styles/globals.css.

const TRIALS = [
  { cls: 'df-prev-t1', word: 'RED',  opts: ['Red', 'Cyan', 'Yellow', 'Blue'], pick: 1 },
  { cls: 'df-prev-t2', word: 'BLUE', opts: ['Yellow', 'Blue', 'Green', 'Pink'], pick: 0 },
];

export default function DistractionFighterPreview() {
  return (
    <div className="df-prev" aria-hidden="true">
      <div className="df-prev-board">
        {TRIALS.map(t => (
          <div key={t.cls} className={`df-prev-trial ${t.cls}`}>
            <span className="df-prev-word">{t.word}</span>
            <span className="df-prev-opts">
              {t.opts.map((name, i) => (
                <span
                  key={name}
                  className={i === t.pick ? 'df-prev-opt df-prev-pick' : 'df-prev-opt'}
                >
                  {name}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
