'use client';

// Target Acquisition Aim Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from TargetAcquisitionClient.js:
// 1. Multiple amber target orbs (rgba(245, 158, 11, ...))
// 2. High-priority target glows with luminous amber gradient & pulse ring
// 3. Pro crosshair rapidly acquires priority target, destroys it with hitmarker & particles, and transfers to next target.

export default function TargetAcquisitionPreview() {
  return (
    <div className="ta-prev" aria-hidden="true">
      <div className="ta-prev-field">
        {/* Target 1 (left) */}
        <div className="ta-prev-tgt ta-tgt-1">
          <span className="ta-pulse" />
          <div className="ta-orb" />
          <span className="ta-hitmarker">
            <i className="ta-hit-l1" />
            <i className="ta-hit-l2" />
          </span>
        </div>

        {/* Target 2 (center-top priority) */}
        <div className="ta-prev-tgt ta-tgt-2">
          <span className="ta-pulse" />
          <div className="ta-orb" />
          <span className="ta-hitmarker">
            <i className="ta-hit-l1" />
            <i className="ta-hit-l2" />
          </span>
        </div>

        {/* Target 3 (right) */}
        <div className="ta-prev-tgt ta-tgt-3">
          <span className="ta-pulse" />
          <div className="ta-orb" />
          <span className="ta-hitmarker">
            <i className="ta-hit-l1" />
            <i className="ta-hit-l2" />
          </span>
        </div>

        {/* Player crosshair */}
        <div className="ta-prev-reticle">
          <span className="ta-reticle-ring" />
          <span className="ta-reticle-tick ta-tick-n" />
          <span className="ta-reticle-tick ta-tick-s" />
          <span className="ta-reticle-tick ta-tick-w" />
          <span className="ta-reticle-tick ta-tick-e" />
          <span className="ta-reticle-dot" />
        </div>
      </div>
    </div>
  );
}
