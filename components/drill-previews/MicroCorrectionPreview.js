'use client';

// Micro-Correction Aim Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from MicroCorrectionClient.js:
// 1. Primary Cyan (#06b6d4) anchor target
// 2. Once anchor is struck, a tight Micro Target in Emerald (#10b981) immediately spawns adjacent
// 3. Player crosshair hits anchor, micro-adjusts rapidly across tight distance, hits micro target.

export default function MicroCorrectionPreview() {
  return (
    <div className="mc-prev" aria-hidden="true">
      <div className="mc-prev-field">
        {/* Anchor Target (Cyan) */}
        <div className="mc-target mc-anchor">
          <span className="mc-pulse mc-pulse-cyan" />
          <div className="mc-orb-wrap">
            <span className="mc-ghost mc-ghost-cyan" />
            <span className="mc-tactical mc-tactical-cyan" />
            <span className="mc-orb mc-orb-cyan" />
            <span className="mc-sheen" />
            <span className="mc-core" />
          </div>
          <span className="mc-hit-ring" />
          <span className="mc-hitmarker mc-hit-cyan">
            <i className="mc-hit-l1" />
            <i className="mc-hit-l2" />
          </span>
        </div>

        {/* Micro Target (Emerald) - tight offset adjacent */}
        <div className="mc-target mc-micro">
          <span className="mc-pulse mc-pulse-green" />
          <div className="mc-orb-wrap">
            <span className="mc-ghost mc-ghost-green" />
            <span className="mc-tactical mc-tactical-green" />
            <span className="mc-orb mc-orb-green" />
            <span className="mc-sheen" />
            <span className="mc-core" />
          </div>
          <span className="mc-hit-ring" />
          <span className="mc-hitmarker mc-hit-green">
            <i className="mc-hit-l1" />
            <i className="mc-hit-l2" />
          </span>
        </div>

        {/* Player crosshair */}
        <div className="mc-reticle">
          <span className="mc-reticle-ring" />
          <span className="mc-reticle-tick mc-tick-n" />
          <span className="mc-reticle-tick mc-tick-s" />
          <span className="mc-reticle-tick mc-tick-w" />
          <span className="mc-reticle-tick mc-tick-e" />
          <span className="mc-reticle-dot" />
        </div>
      </div>
    </div>
  );
}
