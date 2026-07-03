const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\sangmesh\\Desktop\\global-drill-system-nextjs - Copy - Copy';

// ============================================================================
// PART 1: RE-GENERATE REACTION SPEED DRILLS CLIENTS
// ============================================================================
const reactionDir = path.join(baseDir, 'app', 'drills', 'reaction-speed');

const drills = {
  'saccadic-gallery': {
    className: 'SaccadicGalleryClient',
    title: 'Saccadic Gallery',
    subtitle: 'Zig-Zag Visual Reflex Calibration',
    desc: 'Sequence-based ballistic eye shifts. Track glowing targets flashing in a zig-zag gallery pattern and click/tap them before they disappear.',
    metaDesc: 'Ballistic visual scan training. Tap active glowing targets sequentially in a 5-port zig-zag gallery pattern. Optimize reaction times.',
    about: 'The Saccadic Gallery Drill conditions rapid eye movements (saccades) across horizontal and vertical vectors. In tactical shooters, visual scanning efficiency allows you to sweep corners and clear angles quickly by shifting your foveal focus between multiple target entry points without head rotation latency.',
    stateInit: `
    spots: [] as number[][],
    seq: [0, 1, 2, 3, 4],
    idx: 0,
    seqT: 0,
    show: 0.7
    `,
    onStart: `
    trackingState.current.spots = [];
    for (let i = 0; i < 5; i++) {
      trackingState.current.spots.push([w * 0.25 + i * (w * 0.125), h / 2 + (i % 2 ? -h * 0.12 : h * 0.12)]);
    }
    trackingState.current.seq = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5);
    trackingState.current.idx = 0;
    trackingState.current.seqT = 0;
    trackingState.current.show = 0.7;
    `,
    onResize: `
    trackingState.current.spots = [];
    for (let i = 0; i < 5; i++) {
      trackingState.current.spots.push([w * 0.25 + i * (w * 0.125), h / 2 + (i % 2 ? -h * 0.12 : h * 0.12)]);
    }
    trackingState.current.seq = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5);
    trackingState.current.idx = 0;
    trackingState.current.seqT = 0;
    trackingState.current.show = 0.7;
    `,
    onLoopUpdate: `
        trackingState.current.seqT += scaledDt;
        const targetDurationLimit = Math.max(0.35, 1.4 - (currentLevel - 1) * 0.16);
        if (trackingState.current.seqT > targetDurationLimit) {
          handleMiss(0, 0, true);
          trackingState.current.idx++;
          if (trackingState.current.idx >= 5) {
            trackingState.current.idx = 0;
            trackingState.current.seq.sort(() => Math.random() - 0.5);
          }
          trackingState.current.show = 0.7;
          trackingState.current.seqT = 0;
        }
    `,
    drawTarget: `
        // Draw hollow ports
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
        ctx.lineWidth = 3;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(trackingState.current.spots[i][0], trackingState.current.spots[i][1], radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw active target
        if (trackingState.current.spots.length === 5) {
          const s = trackingState.current.spots[trackingState.current.seq[trackingState.current.idx]];
          ctx.shadowColor = targetColor;
          ctx.shadowBlur = glowEffect ? 18 : 0;
          ctx.fillStyle = targetColor;
          ctx.beginPath();
          ctx.arc(s[0], s[1], radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Target core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(s[0], s[1], radius * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }
    `,
    onPointerDown: `
    if (trackingState.current.spots.length === 5) {
      const activeIdx = trackingState.current.seq[trackingState.current.idx];
      const s = trackingState.current.spots[activeIdx];
      const dx = x - s[0];
      const dy = y - s[1];
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      const currentLevel = levelRef.current;
      const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
      const radius = targetSize * deviceScale * sizeMult;
      const hitRadius = radius * 1.55; // Generous collision boundary
      
      if (dist <= hitRadius) {
        handleHit(x, y);
        trackingState.current.idx++;
        if (trackingState.current.idx >= 5) {
          trackingState.current.idx = 0;
          trackingState.current.seq.sort(() => Math.random() - 0.5);
        }
        trackingState.current.show = 0.7;
        trackingState.current.seqT = 0;
      } else {
        handleMiss(x, y);
      }
    }
    `,
    benefits: `
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Gaze Shifts</strong>: Accelerates visual scanning speeds between horizontal and vertical vectors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Corner Clearance</strong>: Calibrates ocular height tracking to standard sweeps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Target Selection</strong>: Reduces cognitive delay when identifying sequential threats.</span>
                </li>
    `
  },
  'reaction-simulator': {
    className: 'ReactionSimulatorClient',
    title: 'Reaction Simulator',
    subtitle: 'Falling Stimulus Response Trainer',
    desc: 'Rapid target intercept. Click or tap falling targets spawning from random horizontal coordinates before they hit the screen boundary.',
    metaDesc: 'Esports reaction speed simulation. Click falling spheres before they reach the bottom. Multi-level difficulty scaling and analysis.',
    about: 'The Reaction Simulator Drill targets sudden vertical visual threats. Real-world gaming and sports scenarios demand vertical scanning and hand-eye response. This drill trains you to visually lock on and click/tap multiple falling targets under high-velocity shifts.',
    stateInit: `
    targets: [] as { x: number; y: number; vy: number; id: number }[],
    spawnTimer: 0
    `,
    onStart: `
    trackingState.current.targets = [];
    trackingState.current.spawnTimer = 0;
    `,
    onResize: `
    trackingState.current.targets = [];
    trackingState.current.spawnTimer = 0;
    `,
    onLoopUpdate: `
        // Update positions & check timeouts
        const targets = trackingState.current.targets;
        for (let i = targets.length - 1; i >= 0; i--) {
          const t = targets[i];
          t.y += t.vy * scaledDt;
          if (t.y >= H + 30) {
            handleMiss(0, 0, true);
            targets.splice(i, 1);
          }
        }
        
        // Spawn logic
        trackingState.current.spawnTimer += scaledDt;
        const spawnInterval = Math.max(0.35, 1.3 - (currentLevel - 1) * 0.16);
        if (trackingState.current.spawnTimer > spawnInterval) {
          const speed = H * (0.16 + (currentLevel - 1) * 0.045);
          const tSize = targetSize * deviceScale;
          targets.push({
            x: tSize + Math.random() * (W - tSize * 2),
            y: -20,
            vy: speed,
            id: Math.random()
          });
          trackingState.current.spawnTimer = 0;
        }
    `,
    drawTarget: `
        const targets = trackingState.current.targets;
        for (let t of targets) {
          ctx.shadowColor = targetColor;
          ctx.shadowBlur = glowEffect ? 18 : 0;
          ctx.fillStyle = targetColor;
          ctx.beginPath();
          ctx.arc(t.x, t.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Target core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(t.x, t.y, radius * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }
    `,
    onPointerDown: `
    let hitAny = false;
    const currentLevel = levelRef.current;
    const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
    const radius = targetSize * deviceScale * sizeMult;
    const hitRadius = radius * 1.6;
    
    const targets = trackingState.current.targets;
    for (let i = targets.length - 1; i >= 0; i--) {
      const t = targets[i];
      const dx = x - t.x;
      const dy = y - t.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist <= hitRadius) {
        hitAny = true;
        handleHit(t.x, t.y);
        targets.splice(i, 1);
        break;
      }
    }
    
    if (!hitAny) {
      handleMiss(x, y);
    }
    `,
    benefits: `
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Vertical Reactions</strong>: Trains gaze re-acquisition on falling objects.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Spatial Timing</strong>: Builds coordination to intercept moving targets dynamically.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Multi-target Focus</strong>: Overclocks cognitive tracking for high density waves.</span>
                </li>
    `
  },
  'saccadic-snap': {
    className: 'SaccadicSnapClient',
    title: 'Saccadic Snap',
    subtitle: 'Dynamic Reflex Snap Intercept',
    desc: 'Instant click/tap reaction. The glowing target snaps dynamically to a new random location. Catch it before the timer expires.',
    metaDesc: 'Reflex snap training. Click the active target as it teleports randomly around the screen. Tests and improves mouse/touch precision.',
    about: 'Saccadic Snap is a premium motor reflex and gaze re-acquisition test. In esports, snapping your reticle to a target that suddenly appears in your peripheral vision is key. This drill forces you to rapidly spot and click/tap targets in varying locations.',
    stateInit: `
    tx: 0,
    ty: 0,
    snapTimer: 0
    `,
    onStart: `
    trackingState.current.tx = w * 0.5;
    trackingState.current.ty = h * 0.5;
    trackingState.current.snapTimer = 0;
    `,
    onResize: `
    trackingState.current.tx = w * 0.5;
    trackingState.current.ty = h * 0.5;
    trackingState.current.snapTimer = 0;
    `,
    onLoopUpdate: `
        trackingState.current.snapTimer += scaledDt;
        const targetDurationLimit = Math.max(0.4, 1.4 - (currentLevel - 1) * 0.18);
        if (trackingState.current.snapTimer > targetDurationLimit) {
          handleMiss(0, 0, true);
          const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
          const radiusMult = targetSize * deviceScale * sizeMult;
          trackingState.current.tx = radiusMult + Math.random() * (W - radiusMult * 2);
          trackingState.current.ty = radiusMult + Math.random() * (H - radiusMult * 2);
          trackingState.current.snapTimer = 0;
        }
    `,
    drawTarget: `
        const tx = trackingState.current.tx;
        const ty = trackingState.current.ty;
        
        ctx.shadowColor = targetColor;
        ctx.shadowBlur = glowEffect ? 20 : 0;
        ctx.fillStyle = targetColor;
        ctx.beginPath();
        ctx.arc(tx, ty, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(tx, ty, radius * 0.55, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tx, ty, radius * 0.2, 0, Math.PI * 2);
        ctx.fill();
    `,
    onPointerDown: `
    const tx = trackingState.current.tx;
    const ty = trackingState.current.ty;
    const dx = x - tx;
    const dy = y - ty;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    const currentLevel = levelRef.current;
    const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
    const radius = targetSize * deviceScale * sizeMult;
    const hitRadius = radius * 1.55;
    
    if (dist <= hitRadius) {
      handleHit(x, y);
      trackingState.current.tx = radius + Math.random() * (cvs.width - radius * 2);
      trackingState.current.ty = radius + Math.random() * (cvs.height - radius * 2);
      trackingState.current.snapTimer = 0;
    } else {
      handleMiss(x, y);
    }
    `,
    benefits: `
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Snap Precision</strong>: Trains immediate flick/tap alignment on static targets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Spatial Detection</strong>: Conditions visual response to outer bounds and margins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Response Cadence</strong>: Accelerates fast visual sweeps to targets.</span>
                </li>
    `
  },
  'reactive-strafe-pursuit': {
    className: 'ReactiveStrafePursuitClient',
    title: 'Reactive Strafe Pursuit',
    subtitle: 'Horizontal Strafe Target Clicker',
    desc: 'Click the moving target as it moves left and right on the central plane. Adapt to sudden speed bursts and click/tap it before it snaps.',
    metaDesc: 'Horizontal pursuit clicker. Track the moving strafe target and click it before it times out. Progressive levels and analytics.',
    about: 'This drill simulates horizontal tracking and target engagement. Enemies in games rarely move in predictable paths. Clicking this strafing target trains horizontal eye sweeps, dynamic tracking accuracy, and quick intercept coordination.',
    stateInit: `
    px: 0,
    vx: 8,
    timer: 0,
    nextSwitch: 300,
    lifeTimer: 0
    `,
    onStart: `
    trackingState.current.px = w * 0.5;
    trackingState.current.vx = 8;
    trackingState.current.timer = 0;
    trackingState.current.nextSwitch = 300;
    trackingState.current.lifeTimer = 0;
    `,
    onResize: `
    trackingState.current.px = w * 0.5;
    trackingState.current.vx = 8;
    trackingState.current.timer = 0;
    trackingState.current.nextSwitch = 300;
    trackingState.current.lifeTimer = 0;
    `,
    onLoopUpdate: `
        // Strafe physics
        trackingState.current.timer += scaledDt * 1000;
        const speedMultAdjusted = speedMultiplier * (1 + (currentLevel - 1) * 0.25);
        if (trackingState.current.timer > trackingState.current.nextSwitch) {
          trackingState.current.vx = (Math.random() > 0.5 ? 1 : -1) * (7 + Math.random() * 5) * speedMultAdjusted;
          trackingState.current.nextSwitch = 200 + Math.random() * 600;
          trackingState.current.timer = 0;
        }

        trackingState.current.px += trackingState.current.vx * (scaledDt / 0.016);
        
        // Keep in bounds
        const bounds = W * 0.22;
        if (trackingState.current.px < bounds) {
          trackingState.current.px = bounds;
          trackingState.current.vx = Math.abs(trackingState.current.vx);
          trackingState.current.timer = 0;
        } else if (trackingState.current.px > W - bounds) {
          trackingState.current.px = W - bounds;
          trackingState.current.vx = -Math.abs(trackingState.current.vx);
          trackingState.current.timer = 0;
        }
        
        // Life timer check
        trackingState.current.lifeTimer += scaledDt;
        const targetDurationLimit = Math.max(0.45, 1.5 - (currentLevel - 1) * 0.18);
        if (trackingState.current.lifeTimer > targetDurationLimit) {
          handleMiss(0, 0, true);
          trackingState.current.px = bounds + Math.random() * (W - bounds * 2);
          trackingState.current.lifeTimer = 0;
          trackingState.current.timer = 0;
        }
    `,
    drawTarget: `
        const px = trackingState.current.px;
        const py = H / 2;
        const bounds = W * 0.22;

        // Draw boundaries
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bounds, py - 20); ctx.lineTo(bounds, py + 20);
        ctx.moveTo(W - bounds, py - 20); ctx.lineTo(W - bounds, py + 20);
        ctx.stroke();

        // Draw target
        ctx.shadowColor = targetColor;
        ctx.shadowBlur = glowEffect ? 18 : 0;
        ctx.fillStyle = targetColor;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
    `,
    onPointerDown: `
    const px = trackingState.current.px;
    const py = cvs.height / 2;
    const dx = x - px;
    const dy = y - py;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    const currentLevel = levelRef.current;
    const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
    const radius = targetSize * deviceScale * sizeMult;
    const hitRadius = radius * 1.6;
    
    if (dist <= hitRadius) {
      handleHit(x, y);
      const bounds = cvs.width * 0.22;
      trackingState.current.px = bounds + Math.random() * (cvs.width - bounds * 2);
      trackingState.current.timer = 0;
      trackingState.current.vx = (Math.random() > 0.5 ? 1 : -1) * (7 + Math.random() * 5);
      trackingState.current.lifeTimer = 0;
    } else {
      handleMiss(x, y);
    }
    `,
    benefits: `
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Horizontal Aim</strong>: Calibrates reticle placement on moving horizontal vectors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Strafe Adaptability</strong>: Conditions responses to horizontal trajectory shifts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Accuracy Clicks</strong>: Enhances fine-tuning precision on constantly moving bodies.</span>
                </li>
    `
  },
  'barrier-sequence-pursuit': {
    className: 'BarrierSequencePursuitClient',
    title: 'Barrier Sequence Pursuit',
    subtitle: 'Cover Peaking Threat Elimination',
    desc: 'Spot and eliminate the peeking threat. A glowing target pops out from behind cover barriers in sequence. Tap/click it before it hides.',
    metaDesc: 'Tactical target cover training. Tap the target peeking out behind cover obstacles in a sequence before it retreats back.',
    about: 'In tactical shooters, threats peak briefly from behind columns or crates. This drill trains your focus on peripheral cover barriers. Spotting and clicking/tapping the peeking target enhances your click timing and visual focus under cover dynamics.',
    stateInit: `
    barriers: [] as number[][],
    seq: 0,
    seqT: 0,
    peek: 0.25
    `,
    onStart: `
    trackingState.current.barriers = [
      [w * 0.35, h * 0.35],
      [w * 0.65, h * 0.35],
      [w * 0.35, h * 0.65],
      [w * 0.65, h * 0.65]
    ];
    trackingState.current.seq = 0;
    trackingState.current.seqT = 0;
    trackingState.current.peek = 0.25;
    `,
    onResize: `
    trackingState.current.barriers = [
      [w * 0.35, h * 0.35],
      [w * 0.65, h * 0.35],
      [w * 0.35, h * 0.65],
      [w * 0.65, h * 0.65]
    ];
    trackingState.current.seq = 0;
    trackingState.current.seqT = 0;
    trackingState.current.peek = 0.25;
    `,
    onLoopUpdate: `
        trackingState.current.seqT += scaledDt;
        const targetDurationLimit = Math.max(0.35, 1.2 - (currentLevel - 1) * 0.15);
        if (trackingState.current.seqT > targetDurationLimit) {
          handleMiss(0, 0, true);
          trackingState.current.seq = Math.floor(Math.random() * 4);
          const peekDuration = Math.max(0.18, 0.45 - (currentLevel - 1) * 0.05);
          trackingState.current.peek = peekDuration;
          trackingState.current.seqT = 0;
        }
        
        if (trackingState.current.peek > 0) {
          trackingState.current.peek -= scaledDt;
        }
    `,
    drawTarget: `
        // Draw barriers
        ctx.fillStyle = '#161e2e';
        for (let i = 0; i < 4; i++) {
          if (i !== trackingState.current.seq || trackingState.current.peek <= 0) {
            ctx.fillRect(trackingState.current.barriers[i][0] - 40, trackingState.current.barriers[i][1] - 60, 80, 120);
          }
        }

        // Draw active target peeking
        if (trackingState.current.peek > 0 && trackingState.current.barriers.length === 4) {
          const activeB = trackingState.current.barriers[trackingState.current.seq];
          ctx.shadowColor = targetColor;
          ctx.shadowBlur = glowEffect ? 18 : 0;
          ctx.fillStyle = targetColor;
          ctx.beginPath();
          ctx.arc(activeB[0], activeB[1], radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(activeB[0], activeB[1], radius * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }
    `,
    onPointerDown: `
    if (trackingState.current.peek > 0 && trackingState.current.barriers.length === 4) {
      const activeB = trackingState.current.barriers[trackingState.current.seq];
      const dx = x - activeB[0];
      const dy = y - activeB[1];
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      const currentLevel = levelRef.current;
      const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
      const radius = targetSize * deviceScale * sizeMult;
      const hitRadius = radius * 1.55;
      
      if (dist <= hitRadius) {
        handleHit(x, y);
        trackingState.current.seq = Math.floor(Math.random() * 4);
        const peekDuration = Math.max(0.18, 0.45 - (currentLevel - 1) * 0.05);
        trackingState.current.peek = peekDuration;
        trackingState.current.seqT = 0;
      } else {
        handleMiss(x, y);
      }
    } else {
      handleMiss(x, y);
    }
    `,
    benefits: `
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Cover Isolation</strong>: Calibrates reticle placement on common cover locations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Reaction Window</strong>: Overclocks speed to engage targets during short visibility slots.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Spatial Detection</strong>: Focuses ocular tracking on multiple zones.</span>
                </li>
    `
  },
  'market-doors-pursuit': {
    className: 'MarketDoorsPursuitClient',
    title: 'Market Doors Pursuit',
    subtitle: 'Dynamic Sector Entry Drill',
    desc: 'Identify threats behind open sectors. Multiple market doors open sequentially, revealing glowing targets. Click/tap them before they shut.',
    metaDesc: 'Esports sector entry drill. Click targets appearing in doors before they shut. Develops entry reflexes, scanning, and hand-eye precision.',
    about: 'Entering new sectors or sites exposes you to multiple angles (or doors). Market Doors Pursuit places 5 sectors horizontally. Clicking the targets as doors open sequentially calibrates visual checks and improves aim precision during entry pathings.',
    stateInit: `
    doors: [] as number[][],
    active: 0,
    activeT: 0
    `,
    onStart: `
    trackingState.current.doors = [];
    for (let i = 0; i < 5; i++) {
      trackingState.current.doors.push([w * 0.23 + i * (w * 0.135), h / 2]);
    }
    trackingState.current.active = 0;
    trackingState.current.activeT = 0;
    `,
    onResize: `
    trackingState.current.doors = [];
    for (let i = 0; i < 5; i++) {
      trackingState.current.doors.push([w * 0.23 + i * (w * 0.135), h / 2]);
    }
    trackingState.current.active = 0;
    trackingState.current.activeT = 0;
    `,
    onLoopUpdate: `
        trackingState.current.activeT += scaledDt;
        const targetDurationLimit = Math.max(0.35, 1.0 - (currentLevel - 1) * 0.11);
        if (trackingState.current.activeT > targetDurationLimit) {
          handleMiss(0, 0, true);
          trackingState.current.active = Math.floor(Math.random() * 5);
          trackingState.current.activeT = 0;
        }
    `,
    drawTarget: `
        // Draw doors
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        for (let d of trackingState.current.doors) {
          ctx.strokeRect(d[0] - 25, d[1] - 45, 50, 90);
        }

        // Draw active target
        if (trackingState.current.active >= 0 && trackingState.current.doors.length === 5) {
          const actD = trackingState.current.doors[trackingState.current.active];
          ctx.shadowColor = targetColor;
          ctx.shadowBlur = glowEffect ? 20 : 0;
          ctx.fillStyle = targetColor;
          ctx.beginPath();
          ctx.arc(actD[0], actD[1], radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(actD[0], actD[1], radius * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }
    `,
    onPointerDown: `
    if (trackingState.current.active >= 0 && trackingState.current.doors.length === 5) {
      const actD = trackingState.current.doors[trackingState.current.active];
      const dx = x - actD[0];
      const dy = y - actD[1];
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      const currentLevel = levelRef.current;
      const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
      const radius = targetSize * deviceScale * sizeMult;
      const hitRadius = radius * 1.55;
      
      if (dist <= hitRadius) {
        handleHit(x, y);
        trackingState.current.active = Math.floor(Math.random() * 5);
        trackingState.current.activeT = 0;
      } else {
        handleMiss(x, y);
      }
    } else {
      handleMiss(x, y);
    }
    `,
    benefits: `
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Entry Reflexes</strong>: Conditions immediate visual checks on entry points.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Aim Correction</strong>: Builds fast corrections to adjust aim left/right dynamically.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Target Selection</strong>: Overclocks threat evaluation inside multiple windows.</span>
                </li>
    `
  },
  'slide-dash-acceleration': {
    className: 'SlideDashAccelerationClient',
    title: 'Slide Dash Acceleration',
    subtitle: 'Kinetic Accelerating Target Intercept',
    desc: 'High velocity intercept. The target slides, bounces, and suddenly dashes across the field. Stop it mid-acceleration.',
    metaDesc: 'Accelerating target tracking and intercept. Hit the target mid-dash. Progressive difficulty engine with deep reflex analysis.',
    about: 'Slide Dash Acceleration focuses on track adjustments against sudden kinetic acceleration. In tactical and arena shooters, targets change speeds abruptly. Clicking this accelerating target calibrates dynamic predictive tracking and response.',
    stateInit: `
    px: 0,
    py: 0,
    baseSpeed: 120,
    currentSpeed: 120,
    dirX: 1,
    dirY: 1,
    isDashing: false,
    timer: 0,
    lifeTimer: 0
    `,
    onStart: `
    trackingState.current.px = w * 0.2;
    trackingState.current.py = h / 2;
    trackingState.current.baseSpeed = 120;
    trackingState.current.currentSpeed = 120;
    trackingState.current.dirX = 1;
    trackingState.current.dirY = 1;
    trackingState.current.isDashing = false;
    trackingState.current.timer = 0;
    trackingState.current.lifeTimer = 0;
    `,
    onResize: `
    trackingState.current.px = w * 0.2;
    trackingState.current.py = h / 2;
    trackingState.current.baseSpeed = 120;
    trackingState.current.currentSpeed = 120;
    trackingState.current.dirX = 1;
    trackingState.current.dirY = 1;
    trackingState.current.isDashing = false;
    trackingState.current.timer = 0;
    trackingState.current.lifeTimer = 0;
    `,
    onLoopUpdate: `
        trackingState.current.timer += scaledDt * 1000;
        const speedMultAdjusted = speedMultiplier * (1 + (currentLevel - 1) * 0.22);
        
        if (!trackingState.current.isDashing && trackingState.current.timer > 1500) {
          trackingState.current.isDashing = true;
          trackingState.current.currentSpeed = 700 * speedMultAdjusted;
          trackingState.current.timer = 0;
        } else if (trackingState.current.isDashing && trackingState.current.timer > 300) {
          trackingState.current.isDashing = false;
          trackingState.current.currentSpeed = trackingState.current.baseSpeed * speedMultAdjusted;
          trackingState.current.timer = 0;
          trackingState.current.dirY = (Math.random() - 0.5) * 2;
        }

        trackingState.current.px += trackingState.current.currentSpeed * trackingState.current.dirX * scaledDt;
        trackingState.current.py += (trackingState.current.currentSpeed * 0.5) * trackingState.current.dirY * scaledDt;

        // Bounce bounds
        const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
        const radius = targetSize * deviceScale * sizeMult;
        if (trackingState.current.px < radius) {
          trackingState.current.px = radius;
          trackingState.current.dirX = 1;
        } else if (trackingState.current.px > W - radius) {
          trackingState.current.px = W - radius;
          trackingState.current.dirX = -1;
        }
        if (trackingState.current.py < radius) {
          trackingState.current.py = radius;
          trackingState.current.dirY = Math.abs(trackingState.current.dirY);
        } else if (trackingState.current.py > H - radius) {
          trackingState.current.py = H - radius;
          trackingState.current.dirY = -Math.abs(trackingState.current.dirY);
        }
        
        // Life timer check
        trackingState.current.lifeTimer += scaledDt;
        const targetDurationLimit = Math.max(0.5, 1.8 - (currentLevel - 1) * 0.2);
        if (trackingState.current.lifeTimer > targetDurationLimit) {
          handleMiss(0, 0, true);
          trackingState.current.px = radius + Math.random() * (W - radius * 2);
          trackingState.current.py = radius + Math.random() * (H - radius * 2);
          trackingState.current.timer = 0;
          trackingState.current.isDashing = false;
          trackingState.current.lifeTimer = 0;
        }
    `,
    drawTarget: `
        const px = trackingState.current.px;
        const py = trackingState.current.py;

        ctx.shadowColor = targetColor;
        ctx.shadowBlur = glowEffect ? 18 : 0;
        ctx.fillStyle = targetColor;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
    `,
    onPointerDown: `
    const px = trackingState.current.px;
    const py = trackingState.current.py;
    const dx = x - px;
    const dy = y - py;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    const currentLevel = levelRef.current;
    const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
    const radius = targetSize * deviceScale * sizeMult;
    const hitRadius = radius * 1.6;
    
    if (dist <= hitRadius) {
      handleHit(x, y);
      trackingState.current.px = radius + Math.random() * (cvs.width - radius*2);
      trackingState.current.py = radius + Math.random() * (cvs.height - radius*2);
      trackingState.current.timer = 0;
      trackingState.current.isDashing = false;
      trackingState.current.lifeTimer = 0;
    } else {
      handleMiss(x, y);
    }
    `,
    benefits: `
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Acceleration Control</strong>: Overclocks reticle control during high velocity shifts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Predictive Mechanics</strong>: Trains brain to calculate target vectors mid-dash.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Hand-Eye Reflexes</strong>: Shakes off sluggishness against speed changes.</span>
                </li>
    `
  },
  'stop-and-go-dash': {
    className: 'StopAndGoDashClient',
    title: 'Stop and Go Dash',
    subtitle: 'Decelerating Target Intercept',
    desc: 'Intercept decelerating movements. Target dashes rapidly, comes to a dead stop, then dashes again. Tap it during active frames.',
    metaDesc: 'Decelerating reflex training. Intercept targets that dash and stop. Features adaptive scoring, device-specific sizing, and feedback.',
    about: 'Enemy players use stop-and-go patterns (jiggle peeks or micro-strafes) to throw off your aim. Intercepting a target that alternates between high velocity and dead stops builds your patience, tracking adjustability, and trigger-click timing.',
    stateInit: `
    state: 'idle',
    timer: 0,
    startX: 0,
    startY: 0,
    destX: 0,
    destY: 0,
    currentX: 0,
    currentY: 0,
    lifeTimer: 0
    `,
    onStart: `
    trackingState.current.state = 'idle';
    trackingState.current.timer = 0;
    trackingState.current.startX = w / 2;
    trackingState.current.startY = h / 2;
    trackingState.current.destX = w / 2;
    trackingState.current.destY = h / 2;
    trackingState.current.currentX = w / 2;
    trackingState.current.currentY = h / 2;
    trackingState.current.lifeTimer = 0;
    `,
    onResize: `
    trackingState.current.state = 'idle';
    trackingState.current.timer = 0;
    trackingState.current.startX = w / 2;
    trackingState.current.startY = h / 2;
    trackingState.current.destX = w / 2;
    trackingState.current.destY = h / 2;
    trackingState.current.currentX = w / 2;
    trackingState.current.currentY = h / 2;
    trackingState.current.lifeTimer = 0;
    `,
    onLoopUpdate: `
        trackingState.current.timer += scaledDt * 1000;
        const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
        const radius = targetSize * deviceScale * sizeMult;
        
        if (trackingState.current.state === 'idle') {
          if (trackingState.current.timer > 1000) {
            trackingState.current.state = 'dashing';
            trackingState.current.timer = 0;
            trackingState.current.startX = trackingState.current.currentX;
            trackingState.current.startY = trackingState.current.currentY;
            trackingState.current.destX = radius + Math.random() * (W - radius * 2);
            trackingState.current.destY = radius + Math.random() * (H - radius * 2);
          }
        } else if (trackingState.current.state === 'dashing') {
          const progress = Math.min(trackingState.current.timer / 150, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);

          trackingState.current.currentX = trackingState.current.startX + (trackingState.current.destX - trackingState.current.startX) * easeOut;
          trackingState.current.currentY = trackingState.current.startY + (trackingState.current.destY - trackingState.current.startY) * easeOut;

          if (progress === 1) {
            trackingState.current.state = 'idle';
            trackingState.current.timer = 0;
          }
        }
        
        // Life timer check
        trackingState.current.lifeTimer += scaledDt;
        const targetDurationLimit = Math.max(0.5, 1.8 - (currentLevel - 1) * 0.2);
        if (trackingState.current.lifeTimer > targetDurationLimit) {
          handleMiss(0, 0, true);
          trackingState.current.state = 'idle';
          trackingState.current.timer = 1000; // force new dash
          trackingState.current.lifeTimer = 0;
        }
    `,
    drawTarget: `
        const cx = trackingState.current.currentX;
        const cy = trackingState.current.currentY;

        ctx.shadowColor = targetColor;
        ctx.shadowBlur = glowEffect ? 18 : 0;
        ctx.fillStyle = targetColor;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
    `,
    onPointerDown: `
    const cx = trackingState.current.currentX;
    const cy = trackingState.current.currentY;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    const currentLevel = levelRef.current;
    const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
    const radius = targetSize * deviceScale * sizeMult;
    const hitRadius = radius * 1.6;
    
    if (dist <= hitRadius) {
      handleHit(x, y);
      trackingState.current.state = 'idle';
      trackingState.current.timer = 1000; // force new dash
      trackingState.current.lifeTimer = 0;
    } else {
      handleMiss(x, y);
    }
    `,
    benefits: `
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Jiggle Responses</strong>: Conditions aim precision against decelerating jiggle strafes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Trigger Patience</strong>: Develops trigger control, avoiding panic-clicking during slides.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Dynamic Snapping</strong>: Trains re-acquisition of targets that decelerate to a stop.</span>
                </li>
    `
  }
};

const makeClientComponentCode = (key, data) => {
  return `'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Clock, Award, Activity, Play, RefreshCw, 
  Volume2, VolumeX, Maximize2, Minimize2, Eye, EyeOff,
  Trophy, Info, Check, ArrowRight, Sparkles, Sliders, 
  HelpCircle, Compass, ShieldAlert, Zap, Share2, Copy, Brain, RotateCcw, LogOut
} from 'lucide-react';

// Unified audio context synthesizer class (zero-latency)
class AudioSynthesizer {
  ctx: AudioContext | null = null;
  enabled = true;
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }
  setEnabled(status: boolean) {
    this.enabled = status;
  }
  playHit() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch(e) {}
  }
  playMiss() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch(e) {}
  }
  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, this.ctx.currentTime + 0.24); // C6
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch(e) {}
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// Score to level utility
const getLevel = (s: number) => {
  if (s < 100) return 1;
  if (s < 250) return 2;
  if (s < 500) return 3;
  if (s < 800) return 4;
  if (s < 1200) return 5;
  return Math.floor((s - 1200) / 500) + 6;
};

export default function ${data.className}() {
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Game states
  const [gameState, setGameState] = useState('start'); // start, playing, gameOver
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60.0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [avgReactionTime, setAvgReactionTime] = useState(0);
  const [feedback, setFeedback] = useState<{ x: number; y: number; text: string; type: 'hit' | 'miss'; id: number } | null>(null);
  
  // Settings (Sliders removed, default sizes and speed multiplier constants kept in states)
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [targetSize, setTargetSize] = useState(18);
  const [targetColor, setTargetColor] = useState('#ef4444');
  const [trailEffect, setTrailEffect] = useState(true);
  const [glowEffect, setGlowEffect] = useState(true);
  const [scanlinesActive, setScanlinesActive] = useState(true);
  
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // High accuracy state refs (to prevent React state delay in the physics loop)
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const maxComboRef = useRef(0);
  const levelRef = useRef(1);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const timeLeftRef = useRef(60.0);
  const reactionTimesRef = useRef<number[]>([]);
  const lastTargetSpawnTimeRef = useRef(0);
  
  // Custom physics states unique to this drill
  const trackingState = useRef({
    lastTime: 0,
    ${data.stateInit.trim()}
  });
  
  // Device Scale configuration (aim optimization)
  const [deviceScale, setDeviceScale] = useState(1.0);
  
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    if (audioSynth) {
      audioSynth.setEnabled(soundEnabled);
    }
  }, [soundEnabled]);

  // Viewport Orientation Check for Mobile
  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      if (!isMobile) {
        setShowRotateWarning(false);
        return;
      }
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        setShowRotateWarning(true);
      } else {
        setShowRotateWarning(false);
      }
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('orientationchange', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('orientationchange', checkSize);
    };
  }, []);

  // Mobile Landscape Full-Viewport Detection
  useEffect(() => {
    const checkLandscape = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      if (isMobile && window.innerWidth > window.innerHeight) {
        setIsMobileLandscape(true);
      } else {
        setIsMobileLandscape(false);
      }
    };
    checkLandscape();
    window.addEventListener('resize', checkLandscape);
    window.addEventListener('orientationchange', () => setTimeout(checkLandscape, 100));
    return () => {
      window.removeEventListener('resize', checkLandscape);
      window.removeEventListener('orientationchange', checkLandscape);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
    setLoading(false);
    
    // Set device scale based on device input and size
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      let scale = 1.0;
      if (isMobile || hasTouch) {
        scale = 0.75; // smaller target on mobile (harder)
      } else {
        scale = 1.25; // larger target on desktop
      }
      const dpr = window.devicePixelRatio || 1;
      if (dpr > 2 && (isMobile || hasTouch)) {
        scale *= 0.9;
      }
      setDeviceScale(scale);
      
      // Load best score
      try {
        const stored = localStorage.getItem('skilldrills_${key}_best');
        if (stored) setBestScore(parseInt(stored, 10));
      } catch (e) {}
    }
  }, []);

  // Handle Fullscreen Toggle
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const el = containerRef.current;
        if (el?.requestFullscreen) {
          await el.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Score increments & hits
  const handleHit = useCallback((x: number, y: number) => {
    hitsRef.current += 1;
    setHits(hitsRef.current);
    
    const currentLevel = levelRef.current;
    const scoreAdd = 10 * currentLevel;
    scoreRef.current += scoreAdd;
    setScore(scoreRef.current);
    
    comboRef.current += 1;
    setCombo(comboRef.current);
    if (comboRef.current > maxComboRef.current) {
      maxComboRef.current = comboRef.current;
      setMaxCombo(maxComboRef.current);
    }
    
    // Add +2.0s time bonus, capped at 60s
    timeLeftRef.current = Math.min(60.0, timeLeftRef.current + 2.0);
    setTimeLeft(timeLeftRef.current);
    
    if (audioSynth) audioSynth.playHit();
    
    const nextLvl = getLevel(scoreRef.current);
    if (nextLvl > levelRef.current) {
      levelRef.current = nextLvl;
      setLevel(nextLvl);
      if (audioSynth) audioSynth.playLevelUp();
    }
    
    const now = performance.now();
    const rt = now - lastTargetSpawnTimeRef.current;
    reactionTimesRef.current.push(rt);
    lastTargetSpawnTimeRef.current = now;
    
    setFeedback({ x, y, text: \`+\${scoreAdd}\`, type: 'hit', id: Math.random() });
  }, []);

  const handleMiss = useCallback((x: number, y: number, isTimeout = false) => {
    missesRef.current += 1;
    setMisses(missesRef.current);
    
    comboRef.current = 0;
    setCombo(0);
    
    // Deduct -1.5s time penalty
    timeLeftRef.current = Math.max(0.0, timeLeftRef.current - 1.5);
    setTimeLeft(timeLeftRef.current);
    
    if (audioSynth) audioSynth.playMiss();
    
    lastTargetSpawnTimeRef.current = performance.now();
    
    if (!isTimeout) {
      setFeedback({ x, y, text: \`-1.5s Miss\`, type: 'miss', id: Math.random() });
    } else {
      const cvs = canvasRef.current;
      const fx = cvs ? cvs.width / 2 : 150;
      const fy = cvs ? cvs.height / 2 : 150;
      setFeedback({ x: fx, y: fy, text: \`Time Out! -1.5s\`, type: 'miss', id: Math.random() });
    }
  }, []);

  // Main countdown game interval
  useEffect(() => {
    if (gameState === 'playing') {
      timerIntervalRef.current = setInterval(() => {
        timeLeftRef.current = Math.max(0, timeLeftRef.current - 0.1);
        setTimeLeft(timeLeftRef.current);
        
        if (timeLeftRef.current <= 0) {
          // Game Over!
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          
          // Calculate average reaction time
          const times = reactionTimesRef.current;
          const avg = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
          setAvgReactionTime(avg);
          
          // Save high score
          try {
            const stored = localStorage.getItem('skilldrills_${key}_best');
            const currentBest = stored ? parseInt(stored, 10) || 0 : 0;
            if (scoreRef.current > currentBest) {
              localStorage.setItem('skilldrills_${key}_best', scoreRef.current.toString());
              setBestScore(scoreRef.current);
              setIsNewBest(true);
            }
          } catch (e) {}
        }
      }, 100);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  // Main Canvas Render Loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const ct = containerRef.current;
      if (!ct) return;
      const rect = ct.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      cvs.width = w;
      cvs.height = h;
      cvs.style.position = 'absolute';
      cvs.style.left = '0px';
      cvs.style.top = '0px';
      
      ${data.onResize.trim()}
    };

    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    updateSize();

    trackingState.current.lastTime = 0;
    lastTargetSpawnTimeRef.current = performance.now();

    const draw = (ts: number) => {
      if (gameStateRef.current !== 'playing') return;
      if (!trackingState.current.lastTime) {
        trackingState.current.lastTime = ts;
      }
      let dt = (ts - trackingState.current.lastTime) / 1000;
      if (dt > 0.1) dt = 0.016;
      trackingState.current.lastTime = ts;

      const W = cvs.width;
      const H = cvs.height;
      const scaledDt = dt * speedMultiplier;
      const currentLevel = levelRef.current;

      // Draw background
      ctx.fillStyle = '#05070f';
      ctx.fillRect(0, 0, W, H);

      // Render gridlines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let xPos = 0; xPos < W; xPos += gridSize) {
        ctx.beginPath(); ctx.moveTo(xPos, 0); ctx.lineTo(xPos, H); ctx.stroke();
      }
      for (let yPos = 0; yPos < H; yPos += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, yPos); ctx.lineTo(W, yPos); ctx.stroke();
      }

      // Loop update physics
      {
        ${data.onLoopUpdate.trim()}
      }

      // Target size adjustments
      const sizeMult = Math.max(0.4, 1 - (currentLevel - 1) * 0.08);
      const radius = targetSize * deviceScale * sizeMult;

      // Draw customized targets
      {
        ${data.drawTarget.trim()}
      }

      // CRT Scanlines
      if (scanlinesActive) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.012)';
        for (let i = 0; i < H; i += 4) {
          ctx.fillRect(0, i, W, 1.5);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
      ro.disconnect();
    };
  }, [gameState, speedMultiplier, targetSize, targetColor, trailEffect, glowEffect, scanlinesActive, deviceScale]);

  // Click & Pointer event interception
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameStateRef.current !== 'playing') return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * cvs.width;
    const y = ((e.clientY - rect.top) / rect.height) * cvs.height;
    
    ${data.onPointerDown.trim()}
  };

  const startDrill = useCallback(() => {
    if (audioSynth) audioSynth.init();
    
    // Reset refs
    scoreRef.current = 0;
    comboRef.current = 0;
    maxComboRef.current = 0;
    levelRef.current = 1;
    hitsRef.current = 0;
    missesRef.current = 0;
    timeLeftRef.current = 60.0;
    reactionTimesRef.current = [];
    
    // Set states
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLevel(1);
    setHits(0);
    setMisses(0);
    setTimeLeft(60.0);
    setFeedback(null);
    setIsNewBest(false);
    
    setGameState('playing');
    gameStateRef.current = 'playing';

    // Reset unique physics positions
    const cvs = canvasRef.current;
    const w = cvs ? cvs.width : window.innerWidth;
    const h = cvs ? cvs.height : window.innerHeight;
    
    ${data.onStart.trim()}

    // Request auto fullscreen on mobile
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      if (isMobile) {
        try {
          const el = containerRef.current;
          if (el && el.requestFullscreen) {
            el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
          }
        } catch(e){}
      }
    }
  }, []);

  const resetDrill = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setTimeLeft(60.0);
  }, []);

  const shareScore = useCallback(async () => {
    const text = \`🎮 I scored \${score} PTS on ${data.title} reaction test! Average reaction: \${avgReactionTime}ms. Practice free reflex drills at skilldrills.online! ⚡\`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'My SkillDrills Reflex Score',
          text,
          url: 'https://skilldrills.online/drills/reaction-speed/${key}'
        });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, avgReactionTime]);

  const copyPageLink = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://skilldrills.online/drills/reaction-speed/${key}');
      alert('Link copied to clipboard!');
    }
  }, []);

  const colorPresets = [
    { name: 'Cyber Red', value: '#ef4444' },
    { name: 'Emerald Green', value: '#10b981' },
    { name: 'Neon Blue', value: '#3b82f6' },
    { name: 'Pure White', value: '#ffffff' },
    { name: 'Laser Orange', value: '#f97316' },
    { name: 'High-Vis Yellow', value: '#eab308' }
  ];

  // Calculate grade based on score and accuracy
  const overallAcc = (hits + misses) === 0 ? 100 : Math.round((hits / (hits + misses)) * 100);
  let grade = 'F';
  if (overallAcc >= 92 && score >= 800) grade = 'S';
  else if (overallAcc >= 88 && score >= 600) grade = 'A';
  else if (overallAcc >= 80 && score >= 400) grade = 'B';
  else if (overallAcc >= 70 && score >= 250) grade = 'C';
  else if (overallAcc >= 50 && score >= 100) grade = 'D';

  let suggestion = "Great effort! Regular practice of 5-10 minutes daily will significantly improve your motor reflexes and hand-eye coordination.";
  if (overallAcc < 80) {
    suggestion = "Accuracy is key! Try to slow down slightly to hit target cores. Speed will naturally follow precision.";
  } else if (avgReactionTime > 400 && hits > 0) {
    suggestion = "Focus on your fast-twitch visual reflexes. Try tapping as soon as the target spawns without over-aiming.";
  } else if (maxCombo < 15 && hits > 10) {
    suggestion = "Maintain consistency to build high combos. High combos prevent time drain and keep the session active longer.";
  } else if (grade === 'S' || grade === 'A') {
    suggestion = "Outstanding reflex control! Challenge yourself by raising the base speed multiplier slider or increasing your peak score to Level 6+.";
  }

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Initialising Ocular aim engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-red-500/30">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-955/5 via-transparent to-black/30 pointer-events-none z-0" />

      <div className={\`\${isFullscreen || isMobileLandscape ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10\`}>
        
        {/* Navigation Breadcrumbs */}
        {!isFullscreen && !isMobileLandscape && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-[10px] text-slate-550 uppercase tracking-widest font-mono">
              <li><Link href="/" className="hover:text-red-400 transition-colors">Home</Link></li>
              <li><span className="text-slate-755">/</span></li>
              <li><Link href="/drills" className="hover:text-red-400 transition-colors">Drills Hub</Link></li>
              <li><span className="text-slate-755">/</span></li>
              <li><Link href="/drills/reaction-speed" className="hover:text-red-400 transition-colors">Reaction Speed</Link></li>
              <li><span className="text-slate-755">/</span></li>
              <li><span className="text-red-400 font-bold uppercase">${data.title}</span></li>
            </ol>
          </nav>
        )}

        {/* Drill Header */}
        {!isFullscreen && !isMobileLandscape && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-red-950/30 border border-red-500/20 text-red-500 rounded-xl shadow-lg shadow-red-950/20">
                <Compass className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  ${data.title}
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 font-mono uppercase">
                  ${data.subtitle} • Level {level}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button 
                  onClick={resetDrill}
                  className="p-2.5 rounded-lg border border-slate-800 bg-[#0b0f19] text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-95"
                  title="Reset Drill"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2.5 rounded-lg border border-slate-800 bg-[#0b0f19] text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-95"
                title="Toggle Audio Cues"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleFullscreen}
                className="p-2.5 rounded-lg border border-slate-800 bg-[#0b0f19] text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-95"
                title="Toggle Viewport Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Settings Sidebar */}
          {!isFullscreen && !isMobileLandscape && (
            <div className="lg:col-span-1 bg-[#0b0f19]/80 border border-slate-900/90 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-850 pb-2 mb-4 flex items-center gap-1.5 font-mono">
                  <Sliders className="w-3.5 h-3.5 text-red-400" />
                  DRILL CONFIGS
                </h3>

                {/* Presets Color */}
                <div className="mb-5">
                  <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono mb-2">Target Color</label>
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setTargetColor(c.value)}
                        className={\`w-6 h-6 rounded-full border transition-all relative flex items-center justify-center\`}
                        style={{ backgroundColor: c.value === '#ffffff' ? '#ffffff' : c.value, borderColor: targetColor === c.value ? '#ffffff' : 'transparent' }}
                        title={c.name}
                      >
                        {targetColor === c.value && (
                          <div className={\`w-1.5 h-1.5 rounded-full \${c.value === '#ffffff' ? 'bg-black' : 'bg-white'}\`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Toggles */}
                <div className="space-y-3 pt-3 border-t border-slate-900/60 font-mono">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Gaze Trail</span>
                      <span className="text-[8px] text-slate-600 block">Renders tracking velocity</span>
                    </div>
                    <button
                      onClick={() => setTrailEffect(!trailEffect)}
                      className={\`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none \${trailEffect ? 'bg-red-500' : 'bg-slate-900'}\`}
                    >
                      <div className={\`w-3 h-3 rounded-full bg-white transition-transform duration-200 \${trailEffect ? 'transform translate-x-4' : ''}\`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Neon Glow</span>
                      <span className="text-[8px] text-slate-600 block">Renders target glow blur</span>
                    </div>
                    <button
                      onClick={() => setGlowEffect(!glowEffect)}
                      className={\`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none \${glowEffect ? 'bg-red-500' : 'bg-slate-900'}\`}
                    >
                      <div className={\`w-3 h-3 rounded-full bg-white transition-transform duration-200 \${glowEffect ? 'transform translate-x-4' : ''}\`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">CRT Scanlines</span>
                      <span className="text-[8px] text-slate-600 block">Esports screen overlay</span>
                    </div>
                    <button
                      onClick={() => setScanlinesActive(!scanlinesActive)}
                      className={\`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none \${scanlinesActive ? 'bg-red-500' : 'bg-slate-900'}\`}
                    >
                      <div className={\`w-3 h-3 rounded-full bg-white transition-transform duration-200 \${scanlinesActive ? 'transform translate-x-4' : ''}\`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Best Info Card */}
              <div className="mt-6 p-4 bg-slate-950/60 border border-slate-900 rounded-xl font-mono text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500 uppercase text-[9px]">Personal Best</span>
                  <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <div className="text-white font-black text-base">{bestScore} PTS</div>
              </div>
            </div>
          )}

          {/* Viewport Canvas Wrapper */}
          <div className={\`\${isFullscreen ? 'col-span-4' : 'lg:col-span-3'} flex flex-col\`}>
            
            {/* Viewport HUD */}
            {!isFullscreen && !isMobileLandscape && (
              <div className="flex justify-between items-center mb-3 text-xs font-mono">
                <div className="flex items-center gap-1 bg-[#0b0f19]/60 border border-slate-900 rounded-lg px-3 py-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-slate-400 uppercase text-[9px] tracking-wider">Score:</span>
                  <span className="text-white font-bold">{score}</span>
                  {combo >= 5 && (
                    <span className="ml-1 text-orange-400 font-extrabold animate-pulse">({combo}x)</span>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-[#0b0f19]/60 border border-slate-900 rounded-lg px-3 py-1.5">
                  <Clock className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-slate-400 uppercase text-[9px] tracking-wider">Survival Time:</span>
                  <span className={\`font-bold \${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}\`}>
                    {timeLeft.toFixed(1)}s
                  </span>
                </div>
              </div>
            )}

            {/* Interactive Viewport Area */}
            <div 
              ref={containerRef} 
              className={
                isFullscreen 
                  ? 'fixed inset-0 z-50 bg-[#020306] flex items-center justify-center w-[100vw] h-[100vh]' 
                  : isMobileLandscape
                  ? 'fixed inset-0 z-40 bg-[#020306] flex items-center justify-center w-[100vw] h-[100vh]'
                  : 'relative w-full aspect-video min-h-[380px] lg:min-h-[440px] bg-[#020306] border border-slate-900 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden'
              }
              style={{ touchAction: 'none' }}
            >
              {/* Orientation Warning Modal (Portrait Mobile Users) */}
              {showRotateWarning && !isMobileLandscape && gameState === 'start' && (
                <div className="absolute inset-0 z-[100] bg-[#05070e]/98 flex flex-col items-center justify-center p-6 text-center select-none backdrop-blur-md">
                  <div className="animate-bounce mb-5 text-red-500">
                    <RotateCcw className="w-14 h-14 mx-auto" />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase font-mono tracking-widest mb-2">Landscape Recommended</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6 mx-auto">
                    Please rotate your mobile device to landscape mode for the best target sizes and ocular sweep performance.
                  </p>
                  <div className="flex flex-col gap-2 w-full max-w-[200px]">
                    <button 
                      onClick={() => {
                        setShowRotateWarning(false);
                        startDrill();
                      }}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-mono text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition active:scale-95 shadow-lg font-bold"
                    >
                      Continue Anyway
                    </button>
                  </div>
                </div>
              )}
              
              {/* Floating Combo overlay */}
              {gameState === 'playing' && combo >= 5 && (
                <div className="absolute top-4 left-4 z-[35] pointer-events-none animate-bounce font-mono">
                  <div className="bg-orange-500/20 border border-orange-500 text-orange-400 px-3 py-1 rounded-full text-xs font-black shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                    🔥 {combo}x Combo!
                  </div>
                </div>
              )}

              {/* Floating Hit/Miss Feedbacks */}
              {feedback && (
                <div 
                  key={feedback.id}
                  className={\`absolute pointer-events-none z-[35] font-mono text-[11px] font-bold uppercase transition-all duration-500 animate-out fade-out slide-out-to-top-8\` }
                  style={{ left: \`\${(feedback.x / (canvasRef.current?.width || 800)) * 100}%\`, top: \`\${(feedback.y / (canvasRef.current?.height || 450)) * 100}%\`, transform: 'translate(-50%, -100%)' }}
                >
                  <span className={feedback.type === 'hit' ? 'text-green-400' : 'text-red-500'}>
                    {feedback.text}
                  </span>
                </div>
              )}

              {/* In-Game HUD overlay inside fullscreen */}
              {(isFullscreen || isMobileLandscape) && gameState === 'playing' && (
                <div className="absolute top-4 right-4 z-[35] flex items-center gap-4 text-xs font-mono bg-black/60 border border-slate-800 rounded-xl px-4 py-2 pointer-events-auto">
                  <div className="flex items-center gap-1.5 border-r border-slate-800 pr-3">
                    <Activity className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-white font-bold">{score}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-yellow-500" />
                    <span className="text-white font-bold">{timeLeft.toFixed(1)}s</span>
                  </div>
                  <button onClick={resetDrill} className="ml-2 hover:text-red-400 transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Start Overlay Screen */}
              {gameState === 'start' && (!showRotateWarning || isMobileLandscape) && (
                <div className="absolute inset-0 bg-[#05070e]/95 flex flex-col items-center justify-center p-6 z-30 select-none">
                  <div className="max-w-md text-center">
                    <div className="w-14 h-14 mx-auto mb-4 border border-red-500/25 bg-red-500/5 rounded-full flex items-center justify-center shadow-lg shadow-red-950/10">
                      <Target className="w-6 h-6 text-red-500" />
                    </div>
                    
                    <h2 className="text-lg font-black text-white uppercase tracking-wider mb-2 font-mono">
                      ${data.title}
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      ${data.desc} Complete device screen support. Targets size is optimized for your screen. No negative score penalties!
                    </p>

                    <button
                      onClick={startDrill}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.5)] uppercase tracking-widest font-mono transition-all duration-300 active:scale-95 mx-auto"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Start reflex drill
                    </button>
                  </div>
                </div>
              )}

              {/* Game Over Screen */}
              {gameState === 'gameOver' && (
                <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh]">
                  <div className="max-w-md w-full text-center">
                    {isNewBest && (
                      <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] font-mono animate-bounce">
                        ⭐ NEW PERSONAL BEST!
                      </div>
                    )}
                    
                    <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1 font-mono">
                      Drill Complete
                    </h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                      Peak difficulty reached: Level {level}
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-left">
                      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                        <span className="text-[8px] text-slate-500 block uppercase font-bold">Final Score</span>
                        <span className="text-lg font-black text-white">{score} PTS</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                        <span className="text-[8px] text-slate-500 block uppercase font-bold">Accuracy</span>
                        <span className="text-lg font-black text-white">{overallAcc}%</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                        <span className="text-[8px] text-slate-500 block uppercase font-bold">Avg Reaction</span>
                        <span className="text-lg font-black text-white">{avgReactionTime}ms</span>
                      </div>
                      
                      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                        <span className="text-[8px] text-slate-500 block uppercase font-bold">Max Combo</span>
                        <span className="text-lg font-black text-white">{maxCombo}x</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                        <span className="text-[8px] text-slate-500 block uppercase font-bold">Total Hits</span>
                        <span className="text-lg font-black text-white">{hits}</span>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                        <span className="text-[8px] text-slate-500 block uppercase font-bold">Performance Grade</span>
                        <span className={\`text-lg font-black \${grade === 'S' || grade === 'A' ? 'text-yellow-400' : grade === 'B' ? 'text-green-400' : 'text-slate-400'}\`}>
                          Grade {grade}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1 font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Improvement Suggestion:
                      </div>
                      <p className="leading-relaxed">{suggestion}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={startDrill}
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest font-mono transition-all duration-200 active:scale-95"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Run another trial
                      </button>
                      <button
                        onClick={shareScore}
                        className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95"
                        title="Share Score"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Rendering Canvas */}
              {gameState === 'playing' && (
                <canvas 
                  ref={canvasRef} 
                  className="block w-full h-full cursor-crosshair" 
                  onPointerDown={handlePointerDown}
                />
              )}
            </div>

            {/* Bottom status tip */}
            {!isFullscreen && !isMobileLandscape && (
              <div className="mt-3 text-center text-[10px] text-slate-550 flex items-center justify-center gap-2 font-mono">
                <Info className="w-3.5 h-3.5 text-slate-550" />
                <span>Drill is fully interactive. Hit targets to gain time (+2s) and build combos. Empty clicks and timeouts deduct (-1.5s).</span>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        {!isFullscreen && !isMobileLandscape && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-900 pt-8">
            <div className="md:col-span-2 bg-[#0b0f19]/40 border border-slate-900 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono flex items-center gap-2 mb-3.5">
                  <Activity className="w-4 h-4 text-red-500" />
                  ABOUT THIS DRILL: SPORTS-SCIENCE ANALYSIS
                </h3>
                <p className="text-xs leading-relaxed text-slate-400 mb-4 font-sans">
                  ${data.about}
                </p>
              </div>
            </div>

            <div className="bg-[#0b0f19]/40 border border-slate-905 p-6 rounded-2xl">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono flex items-center gap-2 mb-3.5">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                TRAINING BENEFITS
              </h3>
              <ul className="space-y-3 text-xs text-slate-400 font-mono">
                ${data.benefits.trim()}
              </ul>
            </div>
          </div>
        )}

        {/* Related Drills Section */}
        {!isFullscreen && !isMobileLandscape && (
          <section className="mt-8 border-t border-slate-900 pt-8" aria-label="Related training drills">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-red-500 to-orange-600"></div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest font-mono">Explore Related Drills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <Link href="/drills/reaction-speed/saccadic-snap" className="group relative overflow-hidden rounded-xl border border-slate-900 bg-[#0b0f19]/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest">Reaction</span>
                  </div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors font-mono uppercase mb-1">Saccadic Snap</h3>
                  <p className="text-[10px] leading-relaxed text-slate-405">Instant click reflex snaps targeting fast ocular re-acquisition.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-[9px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Start Drill <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
              <Link href="/drills/reaction-speed/reaction-simulator" className="group relative overflow-hidden rounded-xl border border-slate-900 bg-[#0b0f19]/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center justify-center">
                      <Compass className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest">Reaction</span>
                  </div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors font-mono uppercase mb-1">Reaction Sim</h3>
                  <p className="text-[10px] leading-relaxed text-slate-405">Catch falling stimuli at progressive velocities and densities.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-[9px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Start Drill <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
              <Link href="/drills/cognitive/attention/divided-attention" className="group relative overflow-hidden rounded-xl border border-slate-900 bg-[#0b0f19]/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest">Cognitive</span>
                  </div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors font-mono uppercase mb-1">Divided Attention</h3>
                  <p className="text-[10px] leading-relaxed text-slate-405">Dual-task simulator combining visual sweeps and numeric parity checks.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-[9px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Start Drill <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
              <Link href="/drills/reaction-speed/stop-and-go-dash" className="group relative overflow-hidden rounded-xl border border-slate-900 bg-[#0b0f19]/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-950/20 border border-red-500/20 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest">Reaction</span>
                  </div>
                  <h3 className="font-bold text-xs text-white group-hover:text-red-400 transition-colors font-mono uppercase mb-1">Stop & Go Dash</h3>
                  <p className="text-[10px] leading-relaxed text-slate-405">Calibrate tracking adjustments against sudden micro-strafing stops.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-[9px] font-mono uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Start Drill <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Footer */}
        {!isFullscreen && !isMobileLandscape && (
          <footer className="mt-16 border-t border-slate-900 bg-[#05070e]/40 text-slate-550 rounded-2xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8 font-mono text-xs text-left">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Reaction Drills</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/reaction-speed/saccadic-snap" className="hover:text-red-400 transition-colors">Saccadic Snap</Link></li>
                    <li><Link href="/drills/reaction-speed/reaction-simulator" className="hover:text-red-400 transition-colors">Reaction Sim</Link></li>
                    <li><Link href="/drills/reaction-speed/stop-and-go-dash" className="hover:text-red-400 transition-colors">Stop & Go Dash</Link></li>
                    <li><Link href="/drills/reaction-speed" className="text-red-500 hover:text-red-400 transition-colors font-bold">All 8 Reaction Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-red-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-red-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory/spatial-memory/path-tracing" className="hover:text-red-400 transition-colors">Path Tracing</Link></li>
                    <li><Link href="/drills/memory" className="text-red-500 hover:text-red-400 transition-colors font-bold">All 15 Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">FPS Training</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-red-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps/reactive-sphere-tracking" className="hover:text-red-400 transition-colors">Reactive Tracking</Link></li>
                    <li><Link href="/drills/fps/target-acquisition" className="hover:text-red-400 transition-colors">Target Acquisition</Link></li>
                    <li><Link href="/drills/fps" className="text-red-500 hover:text-red-400 transition-colors font-bold">All 21 FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-red-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-red-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-red-500 hover:text-red-400 transition-colors font-bold">All 16 Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Drills</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic" className="hover:text-red-400 transition-colors">Academic (12 drills)</Link></li>
                    <li><Link href="/drills/cognitive" className="hover:text-red-400 transition-colors">Cognitive</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-red-400 transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white font-bold text-lg font-mono tracking-widest">SkillDrills</span>
                </div>
                <p className="text-xs mb-2 font-mono">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[10px] max-w-2xl mx-auto leading-relaxed mb-6 font-sans text-slate-700">
                  Free online ${data.title} reaction training simulator. Optimize your gaming reflexes, aim, click timing, and hand-eye precision on mobile and desktop. No sign-up required.
                </p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={shareScore} className="text-slate-655 hover:text-white transition-colors" title="Share" aria-label="Share page link"><Share2 className="w-4 h-4" /></button>
                  <button onClick={copyPageLink} className="text-slate-655 hover:text-white transition-colors" title="Copy link" aria-label="Copy page link to clipboard"><Copy className="w-4 h-4" /></button>
                </div>
                
                {/* Social Media Links requested by user */}
                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Twitter / X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
`;
};

Object.keys(drills).forEach(key => {
  const data = drills[key];
  const code = makeClientComponentCode(key, data);
  const filePath = path.join(reactionDir, key, `${data.className}.tsx`);
  console.log(`Writing Reaction Speed Drill: ${filePath}`);
  fs.writeFileSync(filePath, code, 'utf8');
});

// ============================================================================
// PART 2: REMOVE REDUNDANT VISUAL TRACKING DRILLS
// ============================================================================
const trackingDir = path.join(baseDir, 'app', 'drills', 'visual-tracking');
const redundantDirs = ['circular-pursuit', 'slow-precision-tracking'];
redundantDirs.forEach(r => {
  const rPath = path.join(trackingDir, r);
  if (fs.existsSync(rPath)) {
    console.log(`Deleting redundant visual tracking folder: ${rPath}`);
    fs.rmSync(rPath, { recursive: true, force: true });
  }
});

// ============================================================================
// PART 3: UPGRADE REMAINING 15 VISUAL TRACKING CLIENTS WITH DAY MODE
// ============================================================================
const remainingDirs = fs.readdirSync(trackingDir).filter(f => {
  const stat = fs.statSync(path.join(trackingDir, f));
  return stat.isDirectory() && !redundantDirs.includes(f) && f !== 'circular-pursuit' && f !== 'slow-precision-tracking';
});

console.log(`Remaining visual tracking drills to upgrade: ${remainingDirs.length}`);

remainingDirs.forEach(dirName => {
  const cName = dirName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Client.tsx';
  const filePath = path.join(trackingDir, dirName, cName);
  
  if (fs.existsSync(filePath)) {
    console.log(`Patching Day Mode in: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add Day Mode state if not present
    if (!content.includes('const [dayMode')) {
      content = content.replace(
        "const [loading, setLoading] = useState(true);",
        "const [loading, setLoading] = useState(true);\n  const [dayMode, setDayMode] = useState(false);"
      );
    }

    // 2. Add Day Mode to settingsRef
    if (!content.includes('dayMode\n  })') && !content.includes('dayMode,\n    trailEffect')) {
      content = content.replace(
        `  const settingsRef = useRef({
    speedMultiplier,
    targetSize,
    targetColor,
    scanlinesActive,
    trailEffect,
    glowEffect
  });`,
        `  const settingsRef = useRef({
    speedMultiplier,
    targetSize,
    targetColor,
    scanlinesActive,
    trailEffect,
    glowEffect,
    dayMode
  });`
      );

      // Sync useEffect for settingsRef
      content = content.replace(
        `  useEffect(() => {
    settingsRef.current = {
      speedMultiplier,
      targetSize,
      targetColor,
      scanlinesActive,
      trailEffect,
      glowEffect
    };
  }, [speedMultiplier, targetSize, targetColor, scanlinesActive, trailEffect, glowEffect]);`,
        `  useEffect(() => {
    settingsRef.current = {
      speedMultiplier,
      targetSize,
      targetColor,
      scanlinesActive,
      trailEffect,
      glowEffect,
      dayMode
    };
  }, [speedMultiplier, targetSize, targetColor, scanlinesActive, trailEffect, glowEffect, dayMode]);`
      );
    }

    // 3. Update canvas loop graphics color replacements
    // Clear rect fillStyle
    content = content.replace("ctx.fillStyle = '#05070f';", "ctx.fillStyle = dayMode ? '#f8fafc' : '#05070f';");
    content = content.replace("ctx.fillStyle = '#05070f'", "ctx.fillStyle = dayMode ? '#f8fafc' : '#05070f'");
    
    // Gridline strokeStyle
    content = content.replace("ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';", "ctx.strokeStyle = dayMode ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.015)';");
    content = content.replace("ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)'", "ctx.strokeStyle = dayMode ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.015)'");

    // Scanline fillStyle
    content = content.replace("ctx.fillStyle = 'rgba(255, 255, 255, 0.012)';", "ctx.fillStyle = dayMode ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.012)';");
    content = content.replace("ctx.fillStyle = 'rgba(255, 255, 255, 0.012)'", "ctx.fillStyle = dayMode ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.012)'");

    // Shadow glow
    content = content.replace("ctx.shadowBlur = glowEffect ? 18 : 0;", "ctx.shadowBlur = (glowEffect && !dayMode) ? 18 : 0;");
    content = content.replace("ctx.shadowBlur = glowEffect ? 20 : 0;", "ctx.shadowBlur = (glowEffect && !dayMode) ? 20 : 0;");
    content = content.replace("ctx.shadowBlur = glowEffect ? 18 : 0", "ctx.shadowBlur = (glowEffect && !dayMode) ? 18 : 0");
    content = content.replace("ctx.shadowBlur = glowEffect ? 20 : 0", "ctx.shadowBlur = (glowEffect && !dayMode) ? 20 : 0");

    // target core white/black
    content = content.replace("ctx.fillStyle = '#ffffff';", "ctx.fillStyle = dayMode ? '#0f172a' : '#ffffff';");
    content = content.replace("ctx.strokeStyle = '#ffffff';", "ctx.strokeStyle = dayMode ? '#0f172a' : '#ffffff';");
    content = content.replace("ctx.fillStyle = '#ffffff'", "ctx.fillStyle = dayMode ? '#0f172a' : '#ffffff'");
    content = content.replace("ctx.strokeStyle = '#ffffff'", "ctx.strokeStyle = dayMode ? '#0f172a' : '#ffffff'");
    
    // Guide curves/Lissajous curves strokeStyle
    content = content.replace("ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';", "ctx.strokeStyle = dayMode ? 'rgba(15, 23, 42, 0.15)' : 'rgba(51, 65, 85, 0.4)';");
    content = content.replace("ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)'", "ctx.strokeStyle = dayMode ? 'rgba(15, 23, 42, 0.15)' : 'rgba(51, 65, 85, 0.4)'");
    content = content.replace("ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';", "ctx.strokeStyle = dayMode ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.1)';");
    content = content.replace("ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'", "ctx.strokeStyle = dayMode ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.1)'");

    // 4. Update container styling
    content = content.replace(
      `              className={
                isFullscreen 
                  ? 'fixed inset-0 z-50 bg-[#020306] flex items-center justify-center' 
                  : isMobileLandscape
                  ? 'fixed inset-0 z-40 bg-[#020306] flex items-center justify-center'
                  : 'relative w-full aspect-video min-h-[380px] lg:min-h-[440px] bg-[#020306] border border-slate-900 rounded-2xl flex items-center justify-center shadow-2xl'
              }`,
      `              className={
                isFullscreen 
                  ? \`fixed inset-0 z-50 flex items-center justify-center \${dayMode ? 'bg-[#f8fafc]' : 'bg-[#020306]'}\` 
                  : isMobileLandscape
                  ? \`fixed inset-0 z-40 flex items-center justify-center \${dayMode ? 'bg-[#f8fafc]' : 'bg-[#020306]'}\`
                  : \`relative w-full aspect-video min-h-[380px] lg:min-h-[440px] border flex items-center justify-center shadow-2xl rounded-2xl \${dayMode ? 'bg-[#f8fafc] border-slate-200' : 'bg-[#020306] border-slate-900'}\`
              }`
    );

    // 5. Update overlay background
    content = content.replace(
      'className="absolute inset-0 bg-[#05070e]/95 flex flex-col items-center justify-center p-6 z-30 select-none"',
      'className={`absolute inset-0 flex flex-col items-center justify-center p-6 z-30 select-none ${dayMode ? \'bg-[#f1f5f9]/98 text-slate-800\' : \'bg-[#05070e]/95 text-slate-100\'}`}'
    );
    content = content.replace(
      'className="absolute inset-0 bg-[#05070e]/95 flex flex-col items-center justify-center p-6 z-30 select-none"',
      'className={`absolute inset-0 flex flex-col items-center justify-center p-6 z-30 select-none ${dayMode ? \'bg-[#f1f5f9]/98 text-slate-800\' : \'bg-[#05070e]/95 text-slate-100\'}`}'
    );

    // 6. Update overlay text classes
    content = content.replace(
      'className="text-lg font-black text-white uppercase tracking-wider mb-2 font-mono"',
      'className={`text-lg font-black uppercase tracking-wider mb-2 font-mono ${dayMode ? \'text-slate-900\' : \'text-white\'}`}'
    );
    content = content.replace(
      'className="text-xs text-slate-400 leading-relaxed mb-6"',
      'className={`text-xs leading-relaxed mb-6 ${dayMode ? \'text-slate-650\' : \'text-slate-400\'}`}'
    );

    // 7. Inject Day Mode Sidebar Toggle
    if (!content.includes('block">Day Mode')) {
      const crtBlock = `                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">CRT Scanlines</span>
                      <span className="text-[8px] text-slate-600 block">Esports screen overlay</span>
                    </div>
                    <button
                      onClick={() => setScanlinesActive(!scanlinesActive)}
                      className={\`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none \${scanlinesActive ? 'bg-red-500' : 'bg-slate-900'}\`}
                    >
                      <div className={\`w-3 h-3 rounded-full bg-white transition-transform duration-200 \${scanlinesActive ? 'transform translate-x-4' : ''}\`} />
                    </button>
                  </div>`;
                  
      const newBlock = crtBlock + `\n\n                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Day Mode</span>
                      <span className="text-[8px] text-slate-600 block">Light box background</span>
                    </div>
                    <button
                      onClick={() => setDayMode(!dayMode)}
                      className={\`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none \${dayMode ? 'bg-red-500' : 'bg-slate-900'}\`}
                    >
                      <div className={\`w-3 h-3 rounded-full bg-white transition-transform duration-200 \${dayMode ? 'transform translate-x-4' : ''}\`} />
                    </button>
                  </div>`;
      content = content.replace(crtBlock, newBlock);
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Finished updating Visual Tracking drills with Day Mode!');
