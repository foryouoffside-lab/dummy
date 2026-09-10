'use client';

// Vertical Aim Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from VerticalAirTrackClient.js:
// 1. Airborne target launched upward into a high parabolic trajectory
// 2. Luminous sky-blue (#38bdf8) tactical target with trailing flight velocity
// 3. Player crosshair tracking vertical ascent and descent with impact hitmarkers.

export default function VerticalAirTrackPreview() {
  return (
    <div className="vat-prev" aria-hidden="true">
      <div className="vat-prev-field">
        {/* Parabolic flight track */}
        <div className="vat-mover">
          <span className="vat-pulse" />
          <div className="vat-target">
            <span className="vat-ghost" />
            <span className="vat-tactical" />
            <span className="vat-orb" />
            <span className="vat-sheen" />
            <span className="vat-core" />
          </div>

          {/* Tracking crosshair */}
          <div className="vat-reticle">
            <span className="vat-reticle-ring" />
            <span className="vat-reticle-tick vat-tick-n" />
            <span className="vat-reticle-tick vat-tick-s" />
            <span className="vat-reticle-tick vat-tick-w" />
            <span className="vat-reticle-tick vat-tick-e" />
            <span className="vat-reticle-dot" />
          </div>

          <span className="vat-hitmarker">
            <i className="vat-hit-l1" />
            <i className="vat-hit-l2" />
          </span>
        </div>
      </div>
    </div>
  );
}
