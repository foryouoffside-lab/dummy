'use client';

// Recoil Control Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from RecoilControlClient.js:
// 1. Tactical humanoid dummy target with head and chest hit zones
// 2. Automatic firing spray kick climbing upward
// 3. Player compensating with downward pull, landing headshots with muzzle flashes and impact hitmarkers.

export default function RecoilControlPreview() {
  return (
    <div className="rc-prev" aria-hidden="true">
      <div className="rc-prev-field">
        {/* Silhouette Dummy Target */}
        <div className="rc-target-dummy">
          {/* Head zone */}
          <div className="rc-zone-head">
            <span className="rc-head-ring" />
          </div>
          {/* Chest zone */}
          <div className="rc-zone-chest">
            <span className="rc-chest-ring" />
          </div>
          {/* Impact sparks */}
          <span className="rc-spark rc-spark-1" />
          <span className="rc-spark rc-spark-2" />
          <span className="rc-hit-ring" />
          <span className="rc-hitmarker">
            <i className="rc-hit-l1" />
            <i className="rc-hit-l2" />
          </span>
        </div>

        {/* Player crosshair pulling down against recoil kick */}
        <div className="rc-reticle">
          <span className="rc-reticle-ring" />
          <span className="rc-reticle-tick rc-tick-n" />
          <span className="rc-reticle-tick rc-tick-s" />
          <span className="rc-reticle-tick rc-tick-w" />
          <span className="rc-reticle-tick rc-tick-e" />
          <span className="rc-reticle-dot" />
          <span className="rc-muzzle-flash" />
        </div>
      </div>
    </div>
  );
}
