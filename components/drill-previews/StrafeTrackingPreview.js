'use client';

// Strafe Tracking Aim Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from StrafeTrackingClient.js:
// 1. Vertical capsule / pill-shaped tactical target
// 2. High-speed AD-AD counter-strafing back and forth horizontally
// 3. Player crosshair maintaining steady target lock through acceleration and direction changes.

export default function StrafeTrackingPreview() {
  return (
    <div className="st-prev" aria-hidden="true">
      <div className="st-prev-field">
        {/* Counter-strafing capsule track */}
        <div className="st-mover">
          <span className="st-pulse" />
          <div className="st-capsule">
            <span className="st-capsule-body" />
            <span className="st-capsule-core" />
          </div>

          {/* Tracking Crosshair */}
          <div className="st-reticle">
            <span className="st-reticle-ring" />
            <span className="st-reticle-tick st-tick-n" />
            <span className="st-reticle-tick st-tick-s" />
            <span className="st-reticle-tick st-tick-w" />
            <span className="st-reticle-tick st-tick-e" />
            <span className="st-reticle-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}
