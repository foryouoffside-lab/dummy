'use client';

// Anti-Strafe Jitter Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from AntiStrafeJitterClient.js:
// 1. High-frequency micro-jitter erratic target vibration
// 2. Cyan tactical target (#06b6d4) with pulse ring
// 3. Player crosshair maintaining steady center-mass lock through jitter noise with continuous hit feedback.

export default function AntiStrafeJitterPreview() {
  return (
    <div className="asj-prev" aria-hidden="true">
      <div className="asj-prev-field">
        {/* Jitter moving target wrapper */}
        <div className="asj-mover">
          <span className="asj-pulse" />
          <div className="asj-target">
            <span className="asj-ghost" />
            <span className="asj-tactical" />
            <span className="asj-orb" />
            <span className="asj-sheen" />
            <span className="asj-core" />
          </div>

          {/* Smooth locked crosshair */}
          <div className="asj-reticle">
            <span className="asj-reticle-ring" />
            <span className="asj-reticle-tick asj-tick-n" />
            <span className="asj-reticle-tick asj-tick-s" />
            <span className="asj-reticle-tick asj-tick-w" />
            <span className="asj-reticle-tick asj-tick-e" />
            <span className="asj-reticle-dot" />
          </div>

          <span className="asj-hitmarker">
            <i className="asj-hit-l1" />
            <i className="asj-hit-l2" />
          </span>
        </div>
      </div>
    </div>
  );
}
