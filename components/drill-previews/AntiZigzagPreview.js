'use client';

// Anti-Zigzag Aim Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from AntiZigzagClient.js:
// 1. Target executing sharp evasive diagonal zig-zag movement
// 2. Health bar mounted above target with dynamic tracking color change
// 3. Player crosshair maintaining continuous tracking lock through rapid directional shifts.

export default function AntiZigzagPreview() {
  return (
    <div className="az-prev" aria-hidden="true">
      <div className="az-prev-field">
        {/* Zig-zag movement track */}
        <div className="az-prev-mover">
          {/* Target HP bar */}
          <div className="az-hp-wrap">
            <div className="az-hp-bar" />
          </div>

          <span className="az-pulse" />
          <div className="az-target">
            <span className="az-ghost-ring" />
            <span className="az-tactical-ring" />
            <span className="az-orb" />
            <span className="az-sheen" />
            <span className="az-core" />
          </div>

          {/* Tracking crosshair */}
          <div className="az-reticle">
            <span className="az-reticle-ring" />
            <span className="az-reticle-tick az-tick-n" />
            <span className="az-reticle-tick az-tick-s" />
            <span className="az-reticle-tick az-tick-w" />
            <span className="az-reticle-tick az-tick-e" />
            <span className="az-reticle-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}
