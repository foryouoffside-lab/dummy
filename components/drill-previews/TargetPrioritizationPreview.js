'use client';

// Target Prioritization Aim Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from TargetPrioritizationClient.js:
// 1. Multi-tier threat targets: Red (High threat), Yellow (Medium threat), Green (Low threat)
// 2. High-threat Red target with urgent shrinking timer ring
// 3. Player crosshair prioritizing Red target first, destroying it with hitmarker, then acquiring Yellow.

export default function TargetPrioritizationPreview() {
  return (
    <div className="tp-prev" aria-hidden="true">
      <div className="tp-prev-field">
        {/* Low threat target (Green) */}
        <div className="tp-target tp-tgt-green">
          <span className="tp-pulse tp-pulse-green" />
          <div className="tp-orb-wrap">
            <span className="tp-ghost tp-ghost-green" />
            <span className="tp-tactical tp-tactical-green" />
            <span className="tp-orb tp-orb-green" />
            <span className="tp-core" />
          </div>
        </div>

        {/* Medium threat target (Yellow) */}
        <div className="tp-target tp-tgt-yellow">
          <span className="tp-pulse tp-pulse-yellow" />
          <div className="tp-orb-wrap">
            <span className="tp-ghost tp-ghost-yellow" />
            <span className="tp-tactical tp-tactical-yellow" />
            <span className="tp-orb tp-orb-yellow" />
            <span className="tp-core" />
          </div>
        </div>

        {/* High threat priority target (Red) with timer ring */}
        <div className="tp-target tp-tgt-red">
          <span className="tp-timer-ring" />
          <span className="tp-pulse tp-pulse-red" />
          <div className="tp-orb-wrap">
            <span className="tp-ghost tp-ghost-red" />
            <span className="tp-tactical tp-tactical-red" />
            <span className="tp-orb tp-orb-red" />
            <span className="tp-core" />
          </div>
          <span className="tp-hit-ring" />
          <span className="tp-hitmarker">
            <i className="tp-hit-l1" />
            <i className="tp-hit-l2" />
          </span>
        </div>

        {/* Player crosshair */}
        <div className="tp-reticle">
          <span className="tp-reticle-ring" />
          <span className="tp-reticle-tick tp-tick-n" />
          <span className="tp-reticle-tick tp-tick-s" />
          <span className="tp-reticle-tick tp-tick-w" />
          <span className="tp-reticle-tick tp-tick-e" />
          <span className="tp-reticle-dot" />
        </div>
      </div>
    </div>
  );
}
