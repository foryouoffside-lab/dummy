'use client';

// Flick Shot Trainer — authentic animated card preview.
// Recreates the EXACT in-game visuals and mechanics from ProFlickClient.js:
// 1. Tactical grid backdrop
// 2. Peripheral emerald tactical targets (#10b981) with expanding life rings
// 3. High-velocity flick shots from center to target, hitmarker explosion, expanding hit rings, and sequential flicking.

export default function FlickShotPreview() {
  return (
    <div className="fs-flick-prev" aria-hidden="true">
      <div className="fs-flick-prev-field">
        {/* Target 1 (top-left quadrant) */}
        <div className="fs-flick-tgt fs-flick-tgt-1">
          <span className="fs-flick-life-ring" />
          <div className="fs-flick-target">
            <span className="fs-flick-ghost" />
            <span className="fs-flick-tactical" />
            <span className="fs-flick-orb" />
            <span className="fs-flick-sheen" />
            <span className="fs-flick-core" />
          </div>
          <span className="fs-flick-hit-ring" />
          <span className="fs-flick-hitmarker">
            <i className="fs-flick-hit-l1" />
            <i className="fs-flick-hit-l2" />
          </span>
        </div>

        {/* Target 2 (bottom-right quadrant) */}
        <div className="fs-flick-tgt fs-flick-tgt-2">
          <span className="fs-flick-life-ring" />
          <div className="fs-flick-target">
            <span className="fs-flick-ghost" />
            <span className="fs-flick-tactical" />
            <span className="fs-flick-orb" />
            <span className="fs-flick-sheen" />
            <span className="fs-flick-core" />
          </div>
          <span className="fs-flick-hit-ring" />
          <span className="fs-flick-hitmarker">
            <i className="fs-flick-hit-l1" />
            <i className="fs-flick-hit-l2" />
          </span>
        </div>

        {/* Flick aim reticle */}
        <div className="fs-flick-reticle">
          <span className="fs-flick-reticle-ring" />
          <span className="fs-flick-tick fs-flick-tick-n" />
          <span className="fs-flick-tick fs-flick-tick-s" />
          <span className="fs-flick-tick fs-flick-tick-w" />
          <span className="fs-flick-tick fs-flick-tick-e" />
          <span className="fs-flick-dot" />
        </div>
      </div>
    </div>
  );
}
