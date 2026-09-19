'use client';

// Crosshair Placement & Angle Hold Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from AngleHoldClient.js:
// 1. Tactical defensive corner / doorway wall geometry
// 2. Pre-aimed crosshair locked on the peek seam
// 3. Peeking opponent target (#10b981) appears from behind cover; sub-180ms reflex reaction click with hitmarker.

export default function AngleHoldPreview() {
  return (
    <div className="ah-prev" aria-hidden="true">
      <div className="ah-prev-field">
        {/* Tactical corner wall obstacle */}
        <div className="ah-wall">
          <div className="ah-wall-edge" />
        </div>

        {/* Peeking target emerging from behind the corner */}
        <div className="ah-target-wrap">
          <span className="ah-pulse" />
          <div className="ah-target">
            <span className="ah-ghost" />
            <span className="ah-tactical" />
            <span className="ah-orb" />
            <span className="ah-sheen" />
            <span className="ah-core" />
          </div>
          <span className="ah-hit-ring" />
          <span className="ah-hitmarker">
            <i className="ah-hit-l1" />
            <i className="ah-hit-l2" />
          </span>
        </div>

        {/* Crosshair holding the angle */}
        <div className="ah-reticle">
          <span className="ah-reticle-ring" />
          <span className="ah-reticle-tick ah-tick-n" />
          <span className="ah-reticle-tick ah-tick-s" />
          <span className="ah-reticle-tick ah-tick-w" />
          <span className="ah-reticle-tick ah-tick-e" />
          <span className="ah-reticle-dot" />
        </div>
      </div>
    </div>
  );
}
