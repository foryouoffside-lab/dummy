'use client';

// Target Switching Aim Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from TargetSwitchingSwarmClient.js:
// 1. Swarm of drifting cyan targets (#06b6d4)
// 2. High-speed target switching: crosshair snaps rapidly from Target 1 -> 2 -> 3
// 3. Targets flash emerald (#10b981) on hover/impact with hitmarkers and particle dispersal.

export default function TargetSwitchingSwarmPreview() {
  return (
    <div className="tss-prev" aria-hidden="true">
      <div className="tss-prev-field">
        {/* Target 1 */}
        <div className="tss-target tss-tgt-1">
          <span className="tss-pulse" />
          <div className="tss-orb-wrap">
            <span className="tss-ghost" />
            <span className="tss-tactical" />
            <span className="tss-orb" />
            <span className="tss-core" />
          </div>
          <span className="tss-hit-ring" />
          <span className="tss-hitmarker">
            <i className="tss-hit-l1" />
            <i className="tss-hit-l2" />
          </span>
        </div>

        {/* Target 2 */}
        <div className="tss-target tss-tgt-2">
          <span className="tss-pulse" />
          <div className="tss-orb-wrap">
            <span className="tss-ghost" />
            <span className="tss-tactical" />
            <span className="tss-orb" />
            <span className="tss-core" />
          </div>
          <span className="tss-hit-ring" />
          <span className="tss-hitmarker">
            <i className="tss-hit-l1" />
            <i className="tss-hit-l2" />
          </span>
        </div>

        {/* Target 3 */}
        <div className="tss-target tss-tgt-3">
          <span className="tss-pulse" />
          <div className="tss-orb-wrap">
            <span className="tss-ghost" />
            <span className="tss-tactical" />
            <span className="tss-orb" />
            <span className="tss-core" />
          </div>
          <span className="tss-hit-ring" />
          <span className="tss-hitmarker">
            <i className="tss-hit-l1" />
            <i className="tss-hit-l2" />
          </span>
        </div>

        {/* Fast switching crosshair */}
        <div className="tss-reticle">
          <span className="tss-reticle-ring" />
          <span className="tss-reticle-tick tss-tick-n" />
          <span className="tss-reticle-tick tss-tick-s" />
          <span className="tss-reticle-tick tss-tick-w" />
          <span className="tss-reticle-tick tss-tick-e" />
          <span className="tss-reticle-dot" />
        </div>
      </div>
    </div>
  );
}
