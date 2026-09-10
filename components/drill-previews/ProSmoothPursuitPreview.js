'use client';

// Smooth Pursuit Aim Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from ProSmoothPursuitClient.js:
// 1. Lissajous figure-8 / harmonic motion curve
// 2. Neon emerald tactical target (#00ff88) traversing the smooth trajectory
// 3. Player crosshair maintaining uninterrupted pursuit tracking with active pulse feedback.

export default function ProSmoothPursuitPreview() {
  return (
    <div className="psp-prev" aria-hidden="true">
      <div className="psp-prev-field">
        {/* Subtle Lissajous Figure-8 Track Guide */}
        <svg className="psp-track-svg" viewBox="0 0 280 160" fill="none">
          <path
            d="M 140 80 C 180 30, 250 30, 250 80 C 250 130, 180 130, 140 80 C 100 30, 30 30, 30 80 C 30 130, 100 130, 140 80 Z"
            stroke="rgba(0, 255, 136, 0.12)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />
        </svg>

        {/* Lissajous moving target & locked reticle track */}
        <div className="psp-mover">
          <span className="psp-pulse" />
          <div className="psp-target">
            <span className="psp-ghost-ring" />
            <span className="psp-tactical-ring" />
            <span className="psp-orb" />
            <span className="psp-sheen" />
            <span className="psp-core" />
          </div>

          <div className="psp-reticle">
            <span className="psp-reticle-ring" />
            <span className="psp-reticle-tick psp-tick-n" />
            <span className="psp-reticle-tick psp-tick-s" />
            <span className="psp-reticle-tick psp-tick-w" />
            <span className="psp-reticle-tick psp-tick-e" />
            <span className="psp-reticle-dot" />
          </div>

          <span className="psp-spark psp-spark-1" />
          <span className="psp-spark psp-spark-2" />
        </div>
      </div>
    </div>
  );
}
