'use client';

// Instant Response — authentic animated card preview.
// Recreates the EXACT in-game visuals and gameplay from InstantResponseClient.js:
// 1. Pitch black tactical canvas (#050508) with subtle green concentric radar rings
// 2. High-vis emerald player aim reticle (#10b981 circle, 4 crosshair ticks, center dot)
// 3. Central tactical target: idle state -> luminous emerald flash (#10b981)
// 4. Pro snap: reticle snaps to center, hitmarker flashes white, particle sparks burst outwards.

export default function InstantResponsePreview() {
  return (
    <div className="ir-prev" aria-hidden="true">
      <div className="ir-prev-field">
        {/* Concentric radar rings matching in-game canvas backdrop */}
        <span className="ir-prev-radar-ring ir-prev-radar-3" />
        <span className="ir-prev-radar-ring ir-prev-radar-2" />
        <span className="ir-prev-radar-ring ir-prev-radar-1" />

        {/* Central tactical target */}
        <div className="ir-prev-target-wrap">
          <span className="ir-prev-pulse-ring" />
          <div className="ir-prev-target">
            <span className="ir-prev-ghost-ring" />
            <span className="ir-prev-tactical-ring" />
            <span className="ir-prev-orb" />
            <span className="ir-prev-sheen" />
            <span className="ir-prev-core" />
          </div>

          <span className="ir-prev-hit-ring" />

          {/* Reaction hitmarker X */}
          <span className="ir-prev-hitmarker">
            <i className="ir-prev-hit-l1" />
            <i className="ir-prev-hit-l2" />
          </span>

          {/* Emerald explosion sparks (createExplosion) */}
          <span className="ir-prev-spark ir-spark-1" />
          <span className="ir-prev-spark ir-spark-2" />
          <span className="ir-prev-spark ir-spark-3" />
          <span className="ir-prev-spark ir-spark-4" />
        </div>

        {/* The player's green aim reticle */}
        <div className="ir-prev-reticle">
          <span className="ir-prev-reticle-ring" />
          <span className="ir-prev-reticle-tick ir-prev-tick-n" />
          <span className="ir-prev-reticle-tick ir-prev-tick-s" />
          <span className="ir-prev-reticle-tick ir-prev-tick-w" />
          <span className="ir-prev-reticle-tick ir-prev-tick-e" />
          <span className="ir-prev-reticle-dot" />
        </div>
      </div>
    </div>
  );
}
