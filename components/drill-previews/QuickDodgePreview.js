'use client';

// Quick Dodge — animated card preview.
// Faithfully emulates the real drill: three hollow red hazards drifting across the
// field on straight headings while the emerald player dot weaves between them.
// Every pass is a near miss — pure CSS transform-only compositor animation.

export default function QuickDodgePreview() {
  return (
    <div className="qd-prev" aria-hidden="true">
      <div className="qd-prev-field">
        <Hazard cls="qd-prev-h1" />
        <Hazard cls="qd-prev-h2" />
        <Hazard cls="qd-prev-h3" />
        <div className="qd-prev-dot">
          <span className="qd-prev-player">
            <i className="qd-prev-halo" />
            <i className="qd-prev-pulse" />
            <i className="qd-prev-body"><i className="qd-prev-sheen" /></i>
          </span>
        </div>
      </div>
    </div>
  );
}

function Hazard({ cls }) {
  return (
    <div className={"qd-prev-haz " + cls}>
      <span className="qd-prev-ob">
        <i className="qd-prev-ob-body">
          <i className="qd-prev-ob-core" />
          <i className="qd-prev-ob-ring" />
        </i>
      </span>
    </div>
  );
}
