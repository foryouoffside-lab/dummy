'use client';

// Reaction Time (Elite Neuro-Switch) — animated card preview.
// The drill's dynamic choice discrimination test on a 5.6s loop:
//   1. Banner displays "RULE: TAP RED TARGET"
//      Red and Blue target nodes appear on the grid.
//      The RED target is tapped (active scale-90 + flash); BLUE is ignored.
//   2. Dynamic rule switch: Banner switches to "RULE: TAP BLUE TARGET"
//      Positions shift. The BLUE target is tapped; RED is ignored.
//
// Elements, shapes, and colors are lifted directly from EliteNeuroSwitchClient.js.

export default function ReactionTimePreview() {
  return (
    <div className="rt-prev" aria-hidden="true">
      {/* Background 40px grid matching EliteNeuroSwitchClient */}
      <div className="rt-prev-grid" />

      {/* Dynamic Rule Banner Top Center */}
      <div className="rt-prev-banner-wrap">
        <div className="rt-prev-banner rt-prev-banner-r1">
          <span className="rt-prev-banner-label">RULE:</span>
          <span className="rt-prev-banner-text text-red-400">TAP RED TARGET</span>
        </div>
        <div className="rt-prev-banner rt-prev-banner-r2">
          <span className="rt-prev-banner-label">RULE:</span>
          <span className="rt-prev-banner-text text-cyan-400">TAP BLUE TARGET</span>
        </div>
      </div>

      {/* Target Nodes Field */}
      <div className="rt-prev-field">
        {/* Trial 1: Tap RED */}
        <div className="rt-prev-trial rt-prev-trial-1">
          {/* Active Red Target */}
          <div className="rt-prev-node rt-prev-red rt-prev-node-hit rt-prev-pos-r1">
            <div className="rt-prev-node-core rt-prev-core-red">
              <span className="rt-prev-sheen" />
              <span className="rt-prev-dot" />
            </div>
          </div>
          {/* Distractor Blue Target */}
          <div className="rt-prev-node rt-prev-blue rt-prev-pos-b1">
            <div className="rt-prev-node-core rt-prev-core-blue">
              <span className="rt-prev-sheen" />
              <span className="rt-prev-dot" />
            </div>
          </div>
        </div>

        {/* Trial 2: Tap BLUE */}
        <div className="rt-prev-trial rt-prev-trial-2">
          {/* Active Blue Target */}
          <div className="rt-prev-node rt-prev-blue rt-prev-node-hit rt-prev-pos-b2">
            <div className="rt-prev-node-core rt-prev-core-blue">
              <span className="rt-prev-sheen" />
              <span className="rt-prev-dot" />
            </div>
          </div>
          {/* Distractor Red Target */}
          <div className="rt-prev-node rt-prev-red rt-prev-pos-r2">
            <div className="rt-prev-node-core rt-prev-core-red">
              <span className="rt-prev-sheen" />
              <span className="rt-prev-dot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
