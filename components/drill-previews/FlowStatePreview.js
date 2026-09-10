'use client';

// Flow State Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from FlowInductionClient.js:
// 1. Organic curving trajectory path
// 2. Neon emerald tactical target (#00ff88) gliding along the flow curve
// 3. Player crosshair locked onto target with active tracking rings and continuous scoring feedback.

export default function FlowStatePreview() {
  return (
    <div className="fs-prev" aria-hidden="true">
      <div className="fs-prev-field">
        {/* Curved trajectory path indicator */}
        <svg className="fs-prev-path" viewBox="0 0 300 160" fill="none">
          <path
            d="M 20 80 Q 75 20, 150 80 T 280 80"
            stroke="rgba(0, 255, 136, 0.14)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
        </svg>

        {/* Gliding tactical target & locked crosshair track */}
        <div className="fs-prev-mover">
          <span className="fs-prev-pulse" />
          <div className="fs-prev-target">
            <span className="fs-prev-ghost-ring" />
            <span className="fs-prev-tactical-ring" />
            <span className="fs-prev-orb" />
            <span className="fs-prev-sheen" />
            <span className="fs-prev-core" />
          </div>

          {/* Locked aim reticle */}
          <div className="fs-prev-reticle">
            <span className="fs-prev-reticle-ring" />
            <span className="fs-prev-reticle-tick fs-tick-n" />
            <span className="fs-prev-reticle-tick fs-tick-s" />
            <span className="fs-prev-reticle-tick fs-tick-w" />
            <span className="fs-prev-reticle-tick fs-tick-e" />
            <span className="fs-prev-reticle-dot" />
          </div>

          {/* Continuous tracking micro-sparks */}
          <span className="fs-prev-spark fs-spark-1" />
          <span className="fs-prev-spark fs-spark-2" />
        </div>
      </div>
    </div>
  );
}
