'use client';

// 180° Awareness Pro — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from AwarenessDrillClient.js:
// 1. Center static focus reticle in cyan (#5eead4) where player anchors gaze
// 2. Wide peripheral targets (#10b981) spawning at extreme left and right borders
// 3. Pro crosshair flicking across 180° angles to hit edge targets and recenter.

export default function Awareness180Preview() {
  return (
    <div className="aw180-prev" aria-hidden="true">
      <div className="aw180-prev-field">
        {/* Center focus reticle anchor */}
        <div className="aw180-focus">
          <span className="aw180-focus-ring" />
          <span className="aw180-focus-arm aw180-arm-n" />
          <span className="aw180-focus-arm aw180-arm-s" />
          <span className="aw180-focus-arm aw180-arm-w" />
          <span className="aw180-focus-arm aw180-arm-e" />
        </div>

        {/* Left peripheral target */}
        <div className="aw180-target-wrap aw180-tgt-left">
          <span className="aw180-pulse" />
          <div className="aw180-target">
            <span className="aw180-ghost-ring" />
            <span className="aw180-tactical-ring" />
            <span className="aw180-orb" />
            <span className="aw180-sheen" />
            <span className="aw180-core" />
          </div>
          <span className="aw180-hit-ring" />
          <span className="aw180-hitmarker">
            <i className="aw180-hit-l1" />
            <i className="aw180-hit-l2" />
          </span>
        </div>

        {/* Right peripheral target */}
        <div className="aw180-target-wrap aw180-tgt-right">
          <span className="aw180-pulse" />
          <div className="aw180-target">
            <span className="aw180-ghost-ring" />
            <span className="aw180-tactical-ring" />
            <span className="aw180-orb" />
            <span className="aw180-sheen" />
            <span className="aw180-core" />
          </div>
          <span className="aw180-hit-ring" />
          <span className="aw180-hitmarker">
            <i className="aw180-hit-l1" />
            <i className="aw180-hit-l2" />
          </span>
        </div>

        {/* Player crosshair */}
        <div className="aw180-reticle">
          <span className="aw180-reticle-ring" />
          <span className="aw180-reticle-tick aw180-rtick-n" />
          <span className="aw180-reticle-tick aw180-rtick-s" />
          <span className="aw180-reticle-tick aw180-rtick-w" />
          <span className="aw180-reticle-tick aw180-rtick-e" />
          <span className="aw180-reticle-dot" />
        </div>
      </div>
    </div>
  );
}
