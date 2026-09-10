'use client';

// Concentration Stamina (Continuous Performance Test) — animated card preview.
// The drill's continuous vigilance and dynamic rule switching test on a 5.8s loop:
//   1. Top pill displays "Rule: VOWELS (A E I O U)"
//      Monospace stimulus stream flashes:
//      - 'K' (consonant distractor - no reaction)
//      - 'E' (vowel TARGET - pops with indigo scale and glow pulse)
//   2. Dynamic rule switch: Top pill shifts to "Rule: PRIMES (2 3 5 7)"
//      Stimulus stream flashes:
//      - 'B' (distractor - no reaction)
//      - '7' (prime TARGET - pops with indigo scale and glow pulse)
//
// Elements, typography, and colors are lifted directly from ConcentrationStaminaClient.js.

export default function ConcentrationStaminaPreview() {
  return (
    <div className="cs-prev" aria-hidden="true">
      <div className="cs-prev-grid-bg" />

      {/* Dynamic Rule Banner Top Center */}
      <div className="cs-prev-banner-wrap">
        <div className="cs-prev-banner cs-prev-rule-vowels">
          <span className="cs-prev-rule-lbl text-indigo-300">Rule:</span>
          <span className="cs-prev-rule-txt text-white">VOWELS (A E I O U)</span>
        </div>
        <div className="cs-prev-banner cs-prev-rule-primes">
          <span className="cs-prev-rule-lbl text-indigo-300">Rule:</span>
          <span className="cs-prev-rule-txt text-white">PRIMES (2 3 5 7)</span>
        </div>
      </div>

      {/* Central High-Density Monospace Stimulus Stream */}
      <div className="cs-prev-stim-wrap">
        {/* Stimulus 1: 'K' (distractor under vowels) */}
        <span className="cs-prev-stim cs-prev-s1 font-mono">K</span>

        {/* Stimulus 2: 'E' (TARGET under vowels - reacts) */}
        <span className="cs-prev-stim cs-prev-s2 cs-prev-hit font-mono">E</span>

        {/* Stimulus 3: 'B' (distractor under primes) */}
        <span className="cs-prev-stim cs-prev-s3 font-mono">B</span>

        {/* Stimulus 4: '7' (TARGET under primes - reacts) */}
        <span className="cs-prev-stim cs-prev-s4 cs-prev-hit font-mono">7</span>
      </div>
    </div>
  );
}
