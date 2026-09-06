// components/drill/previews/scenes.js
// Pure canvas draw functions for drill card previews.
// Each scene is a deterministic, time-based loop (2.5–3.6s) representing
// the drill's real mechanic in miniature.

function drawSubtleGrid(ctx, w, h, dimColor) {
  ctx.strokeStyle = dimColor || 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  const step = 26;
  ctx.beginPath();
  for (let x = step; x < w; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = step; y < h; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
}

function drawCrosshair(ctx, x, y, size = 6, color = '#ffffff') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  // Horizontal with center gap
  ctx.moveTo(x - size, y);
  ctx.lineTo(x - 2, y);
  ctx.moveTo(x + 2, y);
  ctx.lineTo(x + size, y);
  // Vertical with center gap
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y - 2);
  ctx.moveTo(x, y + 2);
  ctx.lineTo(x, y + size);
  ctx.stroke();

  // Micro center dot
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 0.9, 0, Math.PI * 2);
  ctx.fill();
}

function drawHitRing(ctx, x, y, radius, color, alpha) {
  if (alpha <= 0.01) return;
  ctx.strokeStyle = color;
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1.0;
}

// Ease in-out cubic
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export const SCENES = {
  // 1. REFLEX: Idle beat, sudden flash, reactive snap & tap (reaction-time-test)
  reflex: {
    id: 'reflex',
    label: 'Reflex Trigger',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 1000) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const flashStart = 1100;
      const hitTime = 1420;
      const isLit = cycle >= flashStart && cycle < hitTime + 700;

      // Outer dashed orbital ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(cycle * 0.001);
      ctx.strokeStyle = isLit ? accent : 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Center orb
      ctx.beginPath();
      ctx.arc(cx, cy, isLit ? 11 : 7, 0, Math.PI * 2);
      ctx.fillStyle = isLit ? accent : 'rgba(255, 255, 255, 0.25)';
      ctx.fill();

      // Hit ripple
      if (cycle >= hitTime && cycle < hitTime + 650) {
        const p = (cycle - hitTime) / 650;
        drawHitRing(ctx, cx, cy, 11 + p * 30, accent, 1 - p);
      }

      // Crosshair: arrives around hitTime
      let chX = cx;
      let chY = cy;
      if (cycle < flashStart) {
        chX = cx + Math.sin(cycle * 0.002) * 16;
        chY = cy + Math.cos(cycle * 0.002) * 10;
      } else if (cycle < hitTime) {
        const snapP = (cycle - flashStart) / (hitTime - flashStart);
        const startX = cx + 16;
        const startY = cy + 10;
        chX = startX + (cx - startX) * easeInOutCubic(snapP);
        chY = startY + (cy - startY) * easeInOutCubic(snapP);
      }
      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 2. BURST: Multiple targets flash simultaneously, cleared in quick succession (reflex-training-drill)
  burst: {
    id: 'burst',
    label: 'Burst Targets',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 1200) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const targets = [
        { x: w * 0.28, y: h * 0.36, hitAt: 800 },
        { x: w * 0.74, y: h * 0.34, hitAt: 1600 },
        { x: w * 0.50, y: h * 0.68, hitAt: 2400 },
      ];

      // Draw active targets
      targets.forEach((tgt) => {
        if (cycle < tgt.hitAt) {
          // Shrinking countdown TTL ring
          const ttlProgress = Math.max(0, (tgt.hitAt - cycle) / tgt.hitAt);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 8 + ttlProgress * 12, 0, Math.PI * 2);
          ctx.stroke();

          // Target core disc
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 7, 0, Math.PI * 2);
          ctx.fill();
        } else if (cycle < tgt.hitAt + 400) {
          // Burst ripple
          const p = (cycle - tgt.hitAt) / 400;
          drawHitRing(ctx, tgt.x, tgt.y, 7 + p * 20, accent, 1 - p);
        }
      });

      // Crosshair tracking between targets
      let chX = w * 0.5;
      let chY = h * 0.5;
      if (cycle < targets[0].hitAt) {
        const p = Math.min(1, cycle / targets[0].hitAt);
        const ep = easeInOutCubic(p);
        chX = (w * 0.5) + (targets[0].x - w * 0.5) * ep;
        chY = (h * 0.5) + (targets[0].y - h * 0.5) * ep;
      } else if (cycle < targets[1].hitAt) {
        const p = (cycle - targets[0].hitAt) / (targets[1].hitAt - targets[0].hitAt);
        const ep = easeInOutCubic(p);
        chX = targets[0].x + (targets[1].x - targets[0].x) * ep;
        chY = targets[0].y + (targets[1].y - targets[0].y) * ep;
      } else if (cycle < targets[2].hitAt) {
        const p = (cycle - targets[1].hitAt) / (targets[2].hitAt - targets[1].hitAt);
        const ep = easeInOutCubic(p);
        chX = targets[1].x + (targets[2].x - targets[1].x) * ep;
        chY = targets[1].y + (targets[2].y - targets[1].y) * ep;
      } else {
        const p = (cycle - targets[2].hitAt) / (3200 - targets[2].hitAt);
        const ep = easeInOutCubic(p);
        chX = targets[2].x + (w * 0.5 - targets[2].x) * ep;
        chY = targets[2].y + (h * 0.5 - targets[2].y) * ep;
      }
      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 3. SACCADIC: Ballistic saccadic eye shifts jumping across a grid of nodes (saccadic-gallery)
  saccadic: {
    id: 'saccadic',
    label: 'Saccadic Gallery',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 900) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cols = 4;
      const rows = 3;
      const marginX = w * 0.16;
      const marginY = h * 0.22;
      const stepX = (w - marginX * 2) / (cols - 1);
      const stepY = (h - marginY * 2) / (rows - 1);

      // Draw subtle gallery node slots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.10)';
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          ctx.beginPath();
          ctx.arc(marginX + c * stepX, marginY + r * stepY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Three jump stages
      const stages = [
        { c: 1, r: 1, start: 0, hit: 650, end: 950 },
        { c: 3, r: 2, start: 1000, hit: 1650, end: 1950 },
        { c: 0, r: 0, start: 2000, hit: 2650, end: 2950 },
      ];

      let chX = w * 0.5;
      let chY = h * 0.5;

      stages.forEach((stg, idx) => {
        const tx = marginX + stg.c * stepX;
        const ty = marginY + stg.r * stepY;

        if (cycle >= stg.start && cycle < stg.end) {
          // Target glows at node
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(tx, ty, 8, 0, Math.PI * 2);
          ctx.fill();

          // Target outer pulse
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(tx, ty, 13, 0, Math.PI * 2);
          ctx.stroke();

          // Hit ripple
          if (cycle >= stg.hit) {
            const p = (cycle - stg.hit) / (stg.end - stg.hit);
            drawHitRing(ctx, tx, ty, 8 + p * 20, accent, 1 - p);
          }

          // Crosshair snap to target
          const prev = idx === 0
            ? { x: marginX + stages[2].c * stepX, y: marginY + stages[2].r * stepY }
            : { x: marginX + stages[idx - 1].c * stepX, y: marginY + stages[idx - 1].r * stepY };
          const p = Math.min(1, (cycle - stg.start) / (stg.hit - stg.start));
          const ep = easeInOutCubic(p);
          chX = prev.x + (tx - prev.x) * ep;
          chY = prev.y + (ty - prev.y) * ep;
        }
      });

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 4. TRACK: Target executing erratic horizontal strafing while crosshair stays glued (fps-tracking-trainer)
  track: {
    id: 'track',
    label: 'Tracking Trainer',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 1100) % 3600;
      drawSubtleGrid(ctx, w, h, dim);

      const p = cycle / 3600;
      // Multi-harmonic horizontal strafing curve
      const tgtX = w * 0.5 + Math.sin(p * Math.PI * 2) * (w * 0.32) + Math.sin(p * Math.PI * 6) * (w * 0.08);
      const tgtY = h * 0.5 + Math.cos(p * Math.PI * 4) * (h * 0.12);

      // Target tail trail
      ctx.strokeStyle = dim || 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tgtX - 18 * Math.cos(p * Math.PI * 2), tgtY);
      ctx.lineTo(tgtX, tgtY);
      ctx.stroke();

      // Target orb
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Subtle target outer ring
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 14, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshair tracking with slight lag
      const lagP = (cycle - 35) / 3600;
      const chX = w * 0.5 + Math.sin(lagP * Math.PI * 2) * (w * 0.32) + Math.sin(lagP * Math.PI * 6) * (w * 0.08);
      const chY = h * 0.5 + Math.cos(lagP * Math.PI * 4) * (h * 0.12);

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 5. DASH: Target glides smoothly, sudden high-speed burst dash, crosshair snaps and catches (visual-tracking-speed-test)
  dash: {
    id: 'dash',
    label: 'Tracking Dash',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 1300) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      let tgtX = w * 0.25;
      let tgtY = h * 0.5;
      let chX = tgtX;
      let chY = tgtY;
      let isDashing = false;
      const hitAt = 1850;

      if (cycle < 1000) {
        // Slow glide from left
        const p = cycle / 1000;
        tgtX = w * 0.22 + p * (w * 0.20);
        tgtY = h * 0.48 + Math.sin(p * Math.PI) * 8;
        chX = tgtX;
        chY = tgtY;
      } else if (cycle < 1450) {
        // Sudden high-speed dash across screen
        isDashing = true;
        const p = (cycle - 1000) / 450;
        const ep = p * p; // rapid acceleration
        tgtX = w * 0.42 + ep * (w * 0.40);
        tgtY = h * 0.48 + Math.sin(p * Math.PI * 2) * 16;
        // Crosshair falls slightly behind during dash
        chX = w * 0.42 + (ep * 0.7) * (w * 0.40);
        chY = tgtY;
      } else if (cycle < hitAt) {
        // Crosshair catches up to target
        tgtX = w * 0.82;
        tgtY = h * 0.48;
        const p = (cycle - 1450) / (hitAt - 1450);
        const ep = easeInOutCubic(p);
        const startChX = w * 0.42 + 0.7 * (w * 0.40);
        chX = startChX + (tgtX - startChX) * ep;
        chY = tgtY;
      } else {
        // Post-hit glide back to left
        const p = (cycle - hitAt) / (3200 - hitAt);
        const ep = easeInOutCubic(p);
        tgtX = w * 0.82 - ep * (w * 0.60);
        tgtY = h * 0.48 + Math.sin(p * Math.PI) * 10;
        chX = tgtX;
        chY = tgtY;
      }

      // Motion speed lines during dash
      if (isDashing) {
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(tgtX - 35, tgtY);
        ctx.lineTo(tgtX - 8, tgtY);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // Target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Hit ripple on catch
      if (cycle >= hitAt && cycle < hitAt + 450) {
        const p = (cycle - hitAt) / 450;
        drawHitRing(ctx, tgtX, tgtY, 8 + p * 24, accent, 1 - p);
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 6. LANES: Targets dropping along parallel vertical lanes, clicked before baseline (reaction-game)
  lanes: {
    id: 'lanes',
    label: 'Parallel Lanes',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 950) % 3200;

      // Draw 4 vertical lanes
      const laneCount = 4;
      const laneWidth = w / laneCount;
      ctx.strokeStyle = dim || 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 1; i < laneCount; i++) {
        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.moveTo(i * laneWidth, 0);
        ctx.lineTo(i * laneWidth, h);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Baseline limit near bottom
      const baselineY = h * 0.84;
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, baselineY);
      ctx.lineTo(w, baselineY);
      ctx.stroke();

      // Drop 1: Lane 1 (x: laneWidth * 1.5)
      const hit1 = 1350;
      const drop1Y = (cycle / hit1) * baselineY;
      const drop1X = laneWidth * 1.5;

      // Drop 2: Lane 3 (x: laneWidth * 3.5)
      const hit2 = 2750;
      const drop2Start = 1400;
      const drop2Y = ((cycle - drop2Start) / (hit2 - drop2Start)) * baselineY;
      const drop2X = laneWidth * 3.5;

      let chX = laneWidth * 1.5;
      let chY = h * 0.5;

      if (cycle < hit1) {
        // Target 1 falling
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(drop1X, drop1Y, 7.5, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair tracks down to intercept
        chX = drop1X;
        chY = Math.max(h * 0.3, drop1Y);
      } else if (cycle < hit1 + 350) {
        // Hit 1 ripple
        const p = (cycle - hit1) / 350;
        drawHitRing(ctx, drop1X, baselineY, 7.5 + p * 18, accent, 1 - p);
      }

      if (cycle >= drop2Start && cycle < hit2) {
        // Target 2 falling
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(drop2X, drop2Y, 7.5, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair sweeps to Lane 3 and intercepts
        const sweepP = Math.min(1, (cycle - drop2Start) / 400);
        chX = drop1X + (drop2X - drop1X) * easeInOutCubic(sweepP);
        chY = Math.max(h * 0.3, drop2Y);
      } else if (cycle >= hit2 && cycle < hit2 + 350) {
        // Hit 2 ripple
        const p = (cycle - hit2) / 350;
        drawHitRing(ctx, drop2X, baselineY, 7.5 + p * 18, accent, 1 - p);
      }

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 7. DOORS: Saccadic sweeps across 5 centered doorways catching flashing targets (market-doors-pursuit)
  doors: {
    id: 'doors',
    label: 'Market Doors',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 1050) % 3200;

      const doorCount = 5;
      const doorW = w * 0.14;
      const doorH = h * 0.55;
      const doorY = h * 0.26;
      const totalW = doorCount * doorW + (doorCount - 1) * 8;
      const startX = (w - totalW) * 0.5;

      // Draw doorways
      for (let i = 0; i < doorCount; i++) {
        const dx = startX + i * (doorW + 8);
        ctx.fillStyle = dim || 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(dx, doorY, doorW, doorH, 4);
        ctx.fill();
        ctx.stroke();
      }

      // Door 1 target flash (Door index 1)
      const door1X = startX + 1 * (doorW + 8) + doorW * 0.5;
      const door1Y = doorY + doorH * 0.45;
      const hit1 = 1200;

      // Door 2 target flash (Door index 3)
      const door2X = startX + 3 * (doorW + 8) + doorW * 0.5;
      const door2Y = doorY + doorH * 0.45;
      const hit2 = 2600;

      let chX = w * 0.5;
      let chY = doorY + doorH * 0.5;

      if (cycle < hit1) {
        // Target flashes inside door 1
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(door1X, door1Y, 7, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair sweeps to door 1
        const p = Math.min(1, cycle / hit1);
        chX = (w * 0.5) + (door1X - w * 0.5) * easeInOutCubic(p);
        chY = door1Y;
      } else if (cycle < hit1 + 350) {
        const p = (cycle - hit1) / 350;
        drawHitRing(ctx, door1X, door1Y, 7 + p * 16, accent, 1 - p);
      }

      if (cycle >= 1400 && cycle < hit2) {
        // Target flashes inside door 3
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(door2X, door2Y, 7, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair sweeps across to door 3
        const p = Math.min(1, (cycle - 1400) / (hit2 - 1400));
        chX = door1X + (door2X - door1X) * easeInOutCubic(p);
        chY = door2Y;
      } else if (cycle >= hit2 && cycle < hit2 + 350) {
        const p = (cycle - hit2) / 350;
        drawHitRing(ctx, door2X, door2Y, 7 + p * 16, accent, 1 - p);
      }

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 8. PEEK: Jiggle peeking behind tactical corner barriers (barrier-sequence-pursuit)
  peek: {
    id: 'peek',
    label: 'Barrier Peek',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 1150) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      // Left and Right tactical cover pillars
      const b1 = { x: w * 0.22, y: h * 0.20, w: w * 0.12, h: h * 0.60 };
      const b2 = { x: w * 0.66, y: h * 0.20, w: w * 0.12, h: h * 0.60 };

      // Phase 1: Target peeks from right edge of Left Barrier
      const peek1At = 500;
      const hit1 = 1200;
      let tgt1X = b1.x + b1.w;
      const tgt1Y = b1.y + b1.h * 0.45;

      // Phase 2: Target peeks from left edge of Right Barrier
      const peek2At = 1900;
      const hit2 = 2600;
      let tgt2X = b2.x;
      const tgt2Y = b2.y + b2.h * 0.50;

      let chX = w * 0.5;
      let chY = h * 0.5;

      // Draw peek targets (behind barriers)
      if (cycle >= peek1At && cycle < hit1 + 300) {
        if (cycle < hit1) {
          const p = (cycle - peek1At) / (hit1 - peek1At);
          tgt1X = b1.x + b1.w + Math.sin(p * Math.PI) * 14;
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(tgt1X, tgt1Y, 7, 0, Math.PI * 2);
          ctx.fill();

          const snapP = Math.min(1, (cycle - peek1At) / 450);
          chX = (w * 0.5) + (tgt1X - w * 0.5) * easeInOutCubic(snapP);
          chY = tgt1Y;
        } else {
          const p = (cycle - hit1) / 300;
          drawHitRing(ctx, tgt1X, tgt1Y, 7 + p * 16, accent, 1 - p);
        }
      }

      if (cycle >= peek2At && cycle < hit2 + 300) {
        if (cycle < hit2) {
          const p = (cycle - peek2At) / (hit2 - peek2At);
          tgt2X = b2.x - Math.sin(p * Math.PI) * 14;
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(tgt2X, tgt2Y, 7, 0, Math.PI * 2);
          ctx.fill();

          const snapP = Math.min(1, (cycle - peek2At) / 450);
          chX = tgt1X + (tgt2X - tgt1X) * easeInOutCubic(snapP);
          chY = tgt2Y;
        } else {
          const p = (cycle - hit2) / 300;
          drawHitRing(ctx, tgt2X, tgt2Y, 7 + p * 16, accent, 1 - p);
        }
      }

      // Draw barrier pillars over peek targets to show cover
      [b1, b2].forEach((b) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, b.w, b.h, 6);
        ctx.fill();
        ctx.stroke();

        // Pillar accent grip stripes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.beginPath();
        ctx.moveTo(b.x + 4, b.y + b.h * 0.35);
        ctx.lineTo(b.x + b.w - 4, b.y + b.h * 0.35);
        ctx.moveTo(b.x + 4, b.y + b.h * 0.65);
        ctx.lineTo(b.x + b.w - 4, b.y + b.h * 0.65);
        ctx.stroke();
      });

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 9. FLICK: Classic flick shot snap target to target with hit ring (flick-shot-training)
  flick: {
    id: 'flick',
    label: 'Flick Shot',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 800) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const hitAt = 1200;
      const tx = w * 0.72;
      const ty = h * 0.35;

      // Target
      if (cycle < hitAt) {
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(tx, ty, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(tx, ty, 13, 0, Math.PI * 2);
        ctx.stroke();
      } else if (cycle < hitAt + 450) {
        const p = (cycle - hitAt) / 450;
        drawHitRing(ctx, tx, ty, 8 + p * 24, accent, 1 - p);
      }

      // Flick snap
      let chX = cx;
      let chY = cy;
      if (cycle < hitAt) {
        const p = Math.min(1, cycle / hitAt);
        const ep = easeInOutCubic(p);
        chX = cx + (tx - cx) * ep;
        chY = cy + (ty - cy) * ep;
      } else {
        const p = (cycle - hitAt) / (2800 - hitAt);
        const ep = easeInOutCubic(p);
        chX = tx + (cx - tx) * ep;
        chY = ty + (cy - ty) * ep;
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 10. STROOP: Word in conflicting ink color, correct color swatch chosen (distraction-fighter)
  stroop: {
    id: 'stroop',
    label: 'Stroop Interference',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 900) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const cy = h * 0.38;

      const isPhase1 = cycle < 1500;
      const word = isPhase1 ? 'BLUE' : 'RED';
      const inkColor = isPhase1 ? '#ef4444' : accent;
      const hitAt = isPhase1 ? 950 : 2450;

      // Word display box
      ctx.fillStyle = dim || 'rgba(255, 255, 255, 0.04)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx - 42, cy - 18, 84, 36, 6);
      ctx.fill();
      ctx.stroke();

      // Conflicting word text
      ctx.fillStyle = inkColor;
      ctx.font = 'bold 15px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(word, cx, cy);

      // Color swatches below: Red, Accent, Blue
      const swatches = [
        { x: cx - 36, y: h * 0.74, color: '#ef4444' },
        { x: cx,      y: h * 0.74, color: accent },
        { x: cx + 36, y: h * 0.74, color: '#3b82f6' },
      ];

      swatches.forEach((sw) => {
        ctx.fillStyle = sw.color;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      const targetSw = isPhase1 ? swatches[0] : swatches[1];

      // Hit ring
      if (cycle >= hitAt && cycle < hitAt + 350) {
        const p = (cycle - hitAt) / 350;
        drawHitRing(ctx, targetSw.x, targetSw.y, 8 + p * 16, targetSw.color, 1 - p);
      }

      // Cursor movement
      const phaseStart = isPhase1 ? 0 : 1500;
      const moveP = Math.min(1, (cycle - phaseStart) / (hitAt - phaseStart));
      const ep = easeInOutCubic(moveP);
      const startX = isPhase1 ? swatches[1].x : swatches[0].x;
      const startY = h * 0.60;
      const chX = startX + (targetSw.x - startX) * ep;
      const chY = startY + (targetSw.y - startY) * ep;

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 11. SCAN: Sweeping sequential numbers across a grid (concentration-grid)
  scan: {
    id: 'scan',
    label: 'Concentration Grid',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 850) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const gridSize = 3;
      const cellSize = Math.min(w, h) * 0.22;
      const startX = (w - gridSize * cellSize) * 0.5;
      const startY = (h - gridSize * cellSize) * 0.5;

      const grid = [
        [4, 1, 8],
        [7, 3, 2],
        [9, 6, 5],
      ];

      const seq = [
        { num: 1, c: 1, r: 0, hitAt: 650 },
        { num: 2, c: 2, r: 1, hitAt: 1400 },
        { num: 3, c: 1, r: 1, hitAt: 2150 },
        { num: 4, c: 0, r: 0, hitAt: 2900 },
      ];

      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const x = startX + c * cellSize;
          const y = startY + r * cellSize;
          const num = grid[r][c];

          const cleared = seq.some((s) => s.num === num && cycle >= s.hitAt);

          ctx.fillStyle = cleared ? 'rgba(139, 92, 246, 0.20)' : 'rgba(255, 255, 255, 0.03)';
          ctx.strokeStyle = cleared ? accent : 'rgba(255, 255, 255, 0.10)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, cellSize - 4, cellSize - 4, 4);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = cleared ? accent : 'rgba(255, 255, 255, 0.70)';
          ctx.fillText(String(num), x + cellSize * 0.5, y + cellSize * 0.5);
        }
      }

      let currentStep = 0;
      if (cycle < seq[0].hitAt) currentStep = 0;
      else if (cycle < seq[1].hitAt) currentStep = 1;
      else if (cycle < seq[2].hitAt) currentStep = 2;
      else currentStep = 3;

      const target = seq[currentStep];
      const prev = currentStep === 0
        ? { c: 0, r: 2 }
        : seq[currentStep - 1];

      const stepStart = currentStep === 0 ? 0 : seq[currentStep - 1].hitAt;
      const p = Math.min(1, (cycle - stepStart) / (target.hitAt - stepStart));
      const ep = easeInOutCubic(p);

      const fromX = startX + (prev.c + 0.5) * cellSize;
      const fromY = startY + (prev.r + 0.5) * cellSize;
      const toX = startX + (target.c + 0.5) * cellSize;
      const toY = startY + (target.r + 0.5) * cellSize;

      const chX = fromX + (toX - fromX) * ep;
      const chY = fromY + (toY - fromY) * ep;

      if (cycle >= target.hitAt && cycle < target.hitAt + 300) {
        const hp = (cycle - target.hitAt) / 300;
        drawHitRing(ctx, toX, toY, 6 + hp * 18, accent, 1 - hp);
      }

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 12. STREAM: RSVP speed reading word stream with focal notch (rsvp-reader)
  stream: {
    id: 'stream',
    label: 'RSVP Stream',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 750) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const words = ['FOCUS', 'SPEED', 'PULSE', 'NEURAL', 'FLOW'];
      const wordDuration = 2800 / words.length;
      const wordIdx = Math.floor(cycle / wordDuration);
      const currentWord = words[Math.min(wordIdx, words.length - 1)];

      const cx = w * 0.5;
      const cy = h * 0.48;

      // Optical focal frame
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy - 20);
      ctx.lineTo(cx + 50, cy - 20);
      ctx.moveTo(cx - 50, cy + 20);
      ctx.lineTo(cx + 50, cy + 20);
      ctx.stroke();

      // Center vertical Optimal Recognition Point notch
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 24);
      ctx.lineTo(cx, cy - 16);
      ctx.moveTo(cx, cy + 16);
      ctx.lineTo(cx, cy + 24);
      ctx.stroke();

      // Word text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentWord, cx, cy);

      // RSVP reading progress bar
      const barW = 100;
      const barH = 3;
      const barX = cx - barW * 0.5;
      const barY = cy + 32;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = accent;
      ctx.fillRect(barX, barY, barW * (cycle / 2800), barH);
    }
  },

  // 13. CHOICE: Choice reaction discrimination between target rules (reaction-time)
  choice: {
    id: 'choice',
    label: 'Choice Discrimination',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 950) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const isPhase1 = cycle < 1500;
      const ruleText = isPhase1 ? 'TAP RED' : 'TAP BLUE';
      const ruleColor = isPhase1 ? '#ef4444' : '#3b82f6';
      const hitAt = isPhase1 ? 850 : 2350;

      // Top rule pill
      ctx.fillStyle = isPhase1 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)';
      ctx.strokeStyle = ruleColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx - 40, h * 0.14, 80, 20, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = ruleColor;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ruleText, cx, h * 0.14 + 10);

      // Two target nodes: Left & Right
      const n1 = { x: w * 0.32, y: h * 0.60, color: isPhase1 ? '#ef4444' : '#3b82f6' };
      const n2 = { x: w * 0.68, y: h * 0.60, color: isPhase1 ? '#3b82f6' : '#ef4444' };

      const target = isPhase1 ? n1 : n1;

      [n1, n2].forEach((node) => {
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Target focus ring
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(target.x, target.y, 14, 0, Math.PI * 2);
      ctx.stroke();

      // Hit ring
      if (cycle >= hitAt && cycle < hitAt + 350) {
        const p = (cycle - hitAt) / 350;
        drawHitRing(ctx, target.x, target.y, 9 + p * 20, target.color, 1 - p);
      }

      // Crosshair movement
      const phaseStart = isPhase1 ? 0 : 1500;
      const p = Math.min(1, (cycle - phaseStart) / (hitAt - phaseStart));
      const ep = easeInOutCubic(p);
      const startX = isPhase1 ? n2.x : n2.x;
      const startY = h * 0.60;
      const chX = startX + (target.x - startX) * ep;
      const chY = startY + (target.y - startY) * ep;

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 14. SYMBOL-MATCH: Matching symbol ciphers to digit buttons (symbol-matching)
  'symbol-match': {
    id: 'symbol-match',
    label: 'Symbol Matching',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 900) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const isPhase1 = cycle < 1500;
      const hitAt = isPhase1 ? 850 : 2350;

      // Top cipher key: [Δ:1] [Ω:2] [Φ:3]
      const keyPairs = [
        { sym: 'Δ', digit: '1', x: cx - 44 },
        { sym: 'Ω', digit: '2', x: cx },
        { sym: 'Φ', digit: '3', x: cx + 44 },
      ];

      keyPairs.forEach((pair) => {
        ctx.fillStyle = dim || 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(pair.x - 18, h * 0.12, 36, 18, 3);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = accent;
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${pair.sym}:${pair.digit}`, pair.x, h * 0.12 + 9);
      });

      // Prompt symbol in center
      const promptSym = isPhase1 ? 'Ω' : 'Δ';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(promptSym, cx, h * 0.44);

      // Response buttons below: [1] [2] [3]
      const btns = [
        { digit: '1', x: cx - 38, y: h * 0.74 },
        { digit: '2', x: cx,      y: h * 0.74 },
        { digit: '3', x: cx + 38, y: h * 0.74 },
      ];

      const targetBtn = isPhase1 ? btns[1] : btns[0];

      btns.forEach((btn) => {
        const isTarget = btn === targetBtn && cycle >= hitAt;
        ctx.fillStyle = isTarget ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.05)';
        ctx.strokeStyle = isTarget ? accent : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(btn.x - 14, btn.y - 12, 28, 24, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isTarget ? accent : 'rgba(255, 255, 255, 0.8)';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(btn.digit, btn.x, btn.y);
      });

      // Hit ring
      if (cycle >= hitAt && cycle < hitAt + 350) {
        const p = (cycle - hitAt) / 350;
        drawHitRing(ctx, targetBtn.x, targetBtn.y, 10 + p * 16, accent, 1 - p);
      }

      // Cursor movement
      const phaseStart = isPhase1 ? 0 : 1500;
      const p = Math.min(1, (cycle - phaseStart) / (hitAt - phaseStart));
      const ep = easeInOutCubic(p);
      const startX = isPhase1 ? btns[0].x : btns[1].x;
      const chX = startX + (targetBtn.x - startX) * ep;
      const chY = targetBtn.y;

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 15. DIVIDED: Ball tracking on left, number discrimination on right (divided-attention)
  divided: {
    id: 'divided',
    label: 'Divided Attention',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 1000) % 3200;

      // Vertical split divider
      const cx = w * 0.5;
      ctx.strokeStyle = dim || 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // Left Half: Continuous ball tracking task
      const ballCycle = cycle * 0.003;
      const ballX = cx * 0.5 + Math.sin(ballCycle) * (cx * 0.32);
      const ballY = h * 0.5 + Math.cos(ballCycle * 1.5) * (h * 0.22);

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(ballX, ballY, 7, 0, Math.PI * 2);
      ctx.fill();

      // Tracking cursor glued to left ball
      drawCrosshair(ctx, ballX, ballY, 5, '#ffffff');

      // Right Half: Number matching task
      const numCycle = cycle % 1600;
      const isEven = numCycle > 800;
      const numText = isEven ? '8' : '3';
      const rightCx = cx + (w - cx) * 0.5;
      const rightCy = h * 0.5;

      ctx.fillStyle = isEven ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)';
      ctx.strokeStyle = isEven ? '#10b981' : 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(rightCx - 24, rightCy - 20, 48, 40, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isEven ? '#10b981' : 'rgba(255, 255, 255, 0.7)';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(numText, rightCx, rightCy);

      // Hit ring when even number tapped
      if (isEven && numCycle >= 1200 && numCycle < 1550) {
        const p = (numCycle - 1200) / 350;
        drawHitRing(ctx, rightCx, rightCy, 12 + p * 20, '#10b981', 1 - p);
        drawCrosshair(ctx, rightCx, rightCy, 6, '#ffffff');
      }
    }
  },

  // 16. DUAL-FLOW: Two opposing target streams monitored concurrently (multi-tasking)
  'dual-flow': {
    id: 'dual-flow',
    label: 'Dual Stream Multitasking',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 1050) % 3400;

      const lane1Y = h * 0.32;
      const lane2Y = h * 0.68;

      ctx.strokeStyle = dim || 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      ctx.lineTo(w, h * 0.5);
      ctx.stroke();

      const gateX = w * 0.5;
      [lane1Y, lane2Y].forEach((ly) => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(gateX - 16, ly - 16, 32, 32);
      });

      // Top lane flows right to left
      const p1 = (cycle % 1700) / 1700;
      const tgt1X = w * 0.9 - p1 * (w * 0.8);
      const hit1 = 850;

      // Bottom lane flows left to right
      const p2 = ((cycle + 850) % 1700) / 1700;
      const tgt2X = w * 0.1 + p2 * (w * 0.8);
      const hit2 = 2550;

      // Top target (triangle)
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(tgt1X, lane1Y - 7);
      ctx.lineTo(tgt1X - 7, lane1Y + 6);
      ctx.lineTo(tgt1X + 7, lane1Y + 6);
      ctx.closePath();
      ctx.fill();

      // Bottom target (circle)
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(tgt2X, lane2Y, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair switches between lanes
      let chX = gateX;
      let chY = lane1Y;
      if (cycle < 1700) {
        chY = lane1Y;
        if (cycle >= hit1 && cycle < hit1 + 350) {
          const p = (cycle - hit1) / 350;
          drawHitRing(ctx, gateX, lane1Y, 8 + p * 18, accent, 1 - p);
        }
      } else {
        chY = lane2Y;
        if (cycle >= hit2 && cycle < hit2 + 350) {
          const p = (cycle - hit2) / 350;
          drawHitRing(ctx, gateX, lane2Y, 8 + p * 18, '#10b981', 1 - p);
        }
      }

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 17. RULE-SWITCH: Vigilance stamina under alternating rule sets (concentration-stamina)
  'rule-switch': {
    id: 'rule-switch',
    label: 'Rule-Switching Stamina',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 950) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const isPhase1 = cycle < 1600;
      const ruleText = isPhase1 ? 'RULE: VOWEL' : 'RULE: PRIME';
      const stim = isPhase1 ? 'A' : '7';
      const hitAt = isPhase1 ? 950 : 2550;

      // Top rule pill
      ctx.fillStyle = dim || 'rgba(139, 92, 246, 0.15)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx - 48, h * 0.14, 96, 20, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ruleText, cx, h * 0.14 + 10);

      // Center stimulus card
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx - 28, h * 0.40, 56, 44, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px monospace';
      ctx.fillText(stim, cx, h * 0.40 + 22);

      // Hit ring when matching stimulus tapped
      if (cycle >= hitAt && cycle < hitAt + 400) {
        const p = (cycle - hitAt) / 400;
        drawHitRing(ctx, cx, h * 0.40 + 22, 14 + p * 24, accent, 1 - p);
      }

      // Crosshair
      const phaseStart = isPhase1 ? 0 : 1600;
      const p = Math.min(1, (cycle - phaseStart) / (hitAt - phaseStart));
      const ep = easeInOutCubic(p);
      const startX = cx - 24;
      const startY = h * 0.70;
      const chX = startX + (cx - startX) * ep;
      const chY = startY + ((h * 0.40 + 22) - startY) * ep;

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 18. SEQUENCE: 4-pad Simon color sequence played then repeated (color-sequence)
  sequence: {
    id: 'sequence',
    label: 'Color Sequence',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 900) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const radius = Math.min(w, h) * 0.28;
      const padR = radius * 0.42;

      const pads = [
        { id: 0, x: cx, y: cy - radius * 0.65, color: '#ef4444' },
        { id: 1, x: cx + radius * 0.65, y: cy, color: '#3b82f6' },
        { id: 2, x: cx, y: cy + radius * 0.65, color: '#eab308' },
        { id: 3, x: cx - radius * 0.65, y: cy, color: '#10b981' },
      ];

      const isPlayback = cycle < 1500;

      let litPadId = -1;
      if (isPlayback) {
        if (cycle >= 100 && cycle < 500) litPadId = 0;
        else if (cycle >= 550 && cycle < 950) litPadId = 1;
        else if (cycle >= 1000 && cycle < 1400) litPadId = 3;
      } else {
        if (cycle >= 1850 && cycle < 2100) litPadId = 0;
        else if (cycle >= 2350 && cycle < 2600) litPadId = 1;
        else if (cycle >= 2850 && cycle < 3100) litPadId = 3;
      }

      pads.forEach((p) => {
        const isLit = p.id === litPadId;
        ctx.fillStyle = isLit ? p.color : 'rgba(255, 255, 255, 0.05)';
        ctx.strokeStyle = isLit ? p.color : (dim || 'rgba(255, 255, 255, 0.15)');
        ctx.lineWidth = isLit ? 2 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, padR, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        if (isLit) {
          drawHitRing(ctx, p.x, p.y, padR + 6, p.color, 0.6);
        }
      });

      if (!isPlayback) {
        let targetPad = pads[0];
        let prevPad = pads[2];
        let stepStart = 1500;
        let stepEnd = 1900;

        if (cycle < 1900) {
          targetPad = pads[0];
          prevPad = { x: cx, y: cy };
          stepStart = 1500;
          stepEnd = 1900;
        } else if (cycle < 2400) {
          targetPad = pads[1];
          prevPad = pads[0];
          stepStart = 1900;
          stepEnd = 2400;
        } else {
          targetPad = pads[3];
          prevPad = pads[1];
          stepStart = 2400;
          stepEnd = 2900;
        }

        const moveP = Math.min(1, (cycle - stepStart) / (stepEnd - stepStart));
        const ep = easeInOutCubic(moveP);
        const chX = prevPad.x + (targetPad.x - prevPad.x) * ep;
        const chY = prevPad.y + (targetPad.y - prevPad.y) * ep;
        drawCrosshair(ctx, chX, chY, 6, accent || '#ffffff');
      }
    }
  },

  // 19. DIGIT-SPAN: Digits flashed then recalled on numeric input line (digit-span)
  'digit-span': {
    id: 'digit-span',
    label: 'Digit Span',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 900) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const digits = ['7', '3', '9'];

      if (cycle < 1500) {
        const dIdx = Math.min(2, Math.floor(cycle / 500));
        const currentDigit = digits[dIdx];

        ctx.fillStyle = dim || 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(cx - 25, h * 0.30, 50, 50, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentDigit, cx, h * 0.30 + 25);

        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = i <= dIdx ? accent : 'rgba(255, 255, 255, 0.15)';
          ctx.beginPath();
          ctx.arc(cx - 20 + i * 20, h * 0.74, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const recallProgress = cycle - 1500;
        const count = recallProgress > 1200 ? 3 : recallProgress > 600 ? 2 : 1;

        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < 3; i++) {
          const slotX = cx - 36 + i * 36;
          const isEntered = i < count;

          ctx.fillStyle = isEntered ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255, 255, 255, 0.03)';
          ctx.strokeStyle = isEntered ? accent : 'rgba(255, 255, 255, 0.12)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(slotX - 14, h * 0.40, 28, 32, 4);
          ctx.fill();
          ctx.stroke();

          if (isEntered) {
            ctx.fillStyle = '#ffffff';
            ctx.fillText(digits[i], slotX, h * 0.40 + 16);
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillText('_', slotX, h * 0.40 + 16);
          }
        }

        const currentSlotX = cx - 36 + Math.min(2, count - 1) * 36;
        drawCrosshair(ctx, currentSlotX, h * 0.40 + 16, 6, '#ffffff');

        if (count === 3 && recallProgress > 1400) {
          drawHitRing(ctx, cx + 36, h * 0.40 + 16, 14, accent, 0.8);
        }
      }
    }
  },

  // 20. GRID-RECALL: Cells light up, hide, then recalled by cursor (grid-memorization)
  'grid-recall': {
    id: 'grid-recall',
    label: 'Grid Recall',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 850) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const gridSize = 4;
      const cellSize = Math.min(w, h) * 0.18;
      const startX = (w - gridSize * cellSize) * 0.5;
      const startY = (h - gridSize * cellSize) * 0.5;

      const targets = [
        { r: 0, c: 1, hitAt: 1900 },
        { r: 1, c: 3, hitAt: 2300 },
        { r: 2, c: 0, hitAt: 2700 },
        { r: 3, c: 2, hitAt: 3050 },
      ];

      const isShowing = cycle < 1200;
      const isBlank = cycle >= 1200 && cycle < 1600;

      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const x = startX + c * cellSize;
          const y = startY + r * cellSize;
          const isTarget = targets.some((tgt) => tgt.r === r && tgt.c === c);

          let lit = false;
          if (isShowing && isTarget) {
            lit = true;
          } else if (!isBlank && !isShowing && isTarget) {
            const tgtObj = targets.find((tgt) => tgt.r === r && tgt.c === c);
            if (tgtObj && cycle >= tgtObj.hitAt) {
              lit = true;
            }
          }

          ctx.fillStyle = lit ? accent : 'rgba(255, 255, 255, 0.03)';
          ctx.strokeStyle = lit ? accent : 'rgba(255, 255, 255, 0.10)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, cellSize - 4, cellSize - 4, 4);
          ctx.fill();
          ctx.stroke();
        }
      }

      if (!isShowing && !isBlank) {
        let currIdx = 0;
        if (cycle < targets[0].hitAt) currIdx = 0;
        else if (cycle < targets[1].hitAt) currIdx = 1;
        else if (cycle < targets[2].hitAt) currIdx = 2;
        else currIdx = 3;

        const currentTgt = targets[currIdx];
        const prevTgt = currIdx === 0
          ? { r: 1, c: 1 }
          : targets[currIdx - 1];

        const stepStart = currIdx === 0 ? 1600 : targets[currIdx - 1].hitAt;
        const p = Math.min(1, (cycle - stepStart) / (currentTgt.hitAt - stepStart));
        const ep = easeInOutCubic(p);

        const fromX = startX + (prevTgt.c + 0.5) * cellSize;
        const fromY = startY + (prevTgt.r + 0.5) * cellSize;
        const toX = startX + (currentTgt.c + 0.5) * cellSize;
        const toY = startY + (currentTgt.r + 0.5) * cellSize;

        const chX = fromX + (toX - fromX) * ep;
        const chY = fromY + (toY - fromY) * ep;

        if (cycle >= currentTgt.hitAt && cycle < currentTgt.hitAt + 300) {
          const hp = (cycle - currentTgt.hitAt) / 300;
          drawHitRing(ctx, toX, toY, 6 + hp * 16, accent, 1 - hp);
        }

        drawCrosshair(ctx, chX, chY, 6, '#ffffff');
      }
    }
  },

  // 21. N-BACK: Continuous letter stream matching 2 steps back (n-back)
  'n-back': {
    id: 'n-back',
    label: 'N-Back Working Memory',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 950) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const letters = ['K', 'M', 'K'];
      const hitAt = 2250;

      let lIdx = 0;
      if (cycle < 900) lIdx = 0;
      else if (cycle < 1800) lIdx = 1;
      else lIdx = 2;

      const currentL = letters[lIdx];
      const isMatch = lIdx === 2;

      ctx.fillStyle = dim || 'rgba(255, 255, 255, 0.04)';
      ctx.strokeStyle = isMatch && cycle >= hitAt ? accent : 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cx - 28, h * 0.22, 56, 56, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentL, cx, h * 0.22 + 28);

      const btnY = h * 0.76;
      const isPressed = isMatch && cycle >= hitAt;
      ctx.fillStyle = isPressed ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)';
      ctx.strokeStyle = isPressed ? accent : 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(cx - 44, btnY - 14, 88, 28, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isPressed ? accent : 'rgba(255, 255, 255, 0.7)';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('2-BACK MATCH', cx, btnY);

      if (cycle >= 1800) {
        const p = Math.min(1, (cycle - 1800) / (hitAt - 1800));
        const ep = easeInOutCubic(p);
        const startX = cx - 25;
        const startY = h * 0.50;
        const chX = startX + (cx - startX) * ep;
        const chY = startY + (btnY - startY) * ep;

        if (cycle >= hitAt && cycle < hitAt + 400) {
          const hp = (cycle - hitAt) / 400;
          drawHitRing(ctx, cx, btnY, 14 + hp * 22, accent, 1 - hp);
        }

        drawCrosshair(ctx, chX, chY, 6, '#ffffff');
      }
    }
  },

  // 22. OBJECT-LOCATION: Memorize item placement then locate target (object-location)
  'object-location': {
    id: 'object-location',
    label: 'Object Location',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 900) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const gridSize = 3;
      const cellSize = Math.min(w, h) * 0.22;
      const startX = (w - gridSize * cellSize) * 0.5;
      const startY = (h - gridSize * cellSize) * 0.5;

      const items = [
        { r: 0, c: 1, sym: '★', label: 'Star', isTarget: true },
        { r: 1, c: 2, sym: '◆', label: 'Gem', isTarget: false },
        { r: 2, c: 0, sym: '▲', label: 'Delta', isTarget: false },
      ];

      const isShowing = cycle < 1300;
      const isBlank = cycle >= 1300 && cycle < 1600;
      const hitAt = 2400;

      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const x = startX + c * cellSize;
          const y = startY + r * cellSize;
          const item = items.find((it) => it.r === r && it.c === c);

          const isRevealed = !isShowing && !isBlank && item && item.isTarget && cycle >= hitAt;
          const showSym = (isShowing && item) || isRevealed;

          ctx.fillStyle = isRevealed ? 'rgba(99, 102, 241, 0.20)' : 'rgba(255, 255, 255, 0.03)';
          ctx.strokeStyle = isRevealed ? accent : (dim || 'rgba(255, 255, 255, 0.10)');
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, cellSize - 4, cellSize - 4, 4);
          ctx.fill();
          ctx.stroke();

          if (showSym && item) {
            ctx.fillStyle = item.isTarget ? accent : '#ffffff';
            ctx.font = 'bold 15px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(item.sym, x + cellSize * 0.5, y + cellSize * 0.5);
          }
        }
      }

      if (!isShowing && !isBlank) {
        const targetX = startX + 1.5 * cellSize;
        const targetY = startY + 0.5 * cellSize;

        const p = Math.min(1, (cycle - 1600) / (hitAt - 1600));
        const ep = easeInOutCubic(p);
        const startXPos = w * 0.5;
        const startYPos = h * 0.8;
        const chX = startXPos + (targetX - startXPos) * ep;
        const chY = startYPos + (targetY - startYPos) * ep;

        if (cycle >= hitAt && cycle < hitAt + 350) {
          const hp = (cycle - hitAt) / 350;
          drawHitRing(ctx, targetX, targetY, 8 + hp * 18, accent, 1 - hp);
        }

        drawCrosshair(ctx, chX, chY, 6, '#ffffff');
      }
    }
  },

  // 23. WORD-RECALL: Study words, mask, then retrieve (word-recall)
  'word-recall': {
    id: 'word-recall',
    label: 'Word Recall',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 900) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const words = ['RIVER', 'STONE', 'CLOUD'];
      const hitTimes = [1900, 2350, 2800];

      const isStudy = cycle < 1300;
      const isMasked = cycle >= 1300 && cycle < 1600;

      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < 3; i++) {
        const rowY = h * 0.30 + i * (h * 0.22);
        const isRecalled = !isStudy && !isMasked && cycle >= hitTimes[i];

        ctx.fillStyle = isRecalled ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = isRecalled ? accent : 'rgba(255, 255, 255, 0.10)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(cx - 50, rowY - 12, 100, 24, 4);
        ctx.fill();
        ctx.stroke();

        let displayTxt = '';
        if (isStudy) {
          displayTxt = words[i];
          ctx.fillStyle = '#ffffff';
        } else if (isRecalled) {
          displayTxt = `✓ ${words[i]}`;
          ctx.fillStyle = accent;
        } else {
          displayTxt = '•••••';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        }

        ctx.fillText(displayTxt, cx, rowY);

        if (isRecalled && cycle >= hitTimes[i] && cycle < hitTimes[i] + 250) {
          drawHitRing(ctx, cx + 40, rowY, 8, accent, 0.8);
        }
      }
    }
  },

  // 24. PATH-TRACE: Watch path drawn between nodes, then retrace from memory (path-tracing)
  'path-trace': {
    id: 'path-trace',
    label: 'Spatial Path Tracing',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 950) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const nodes = [
        { x: w * 0.22, y: h * 0.70 },
        { x: w * 0.40, y: h * 0.30 },
        { x: w * 0.68, y: h * 0.38 },
        { x: w * 0.80, y: h * 0.72 },
      ];

      const isDrawing = cycle < 1300;
      const isHidden = cycle >= 1300 && cycle < 1600;

      nodes.forEach((n) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      if (isDrawing) {
        const p = cycle / 1300;
        const totalSegments = nodes.length - 1;
        const currentSeg = Math.min(totalSegments - 1, Math.floor(p * totalSegments));
        const segP = (p * totalSegments) - currentSeg;

        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i <= currentSeg; i++) {
          ctx.lineTo(nodes[i].x, nodes[i].y);
        }
        const lastNode = nodes[currentSeg];
        const nextNode = nodes[currentSeg + 1];
        ctx.lineTo(lastNode.x + (nextNode.x - lastNode.x) * segP, lastNode.y + (nextNode.y - lastNode.y) * segP);
        ctx.stroke();
      } else if (!isHidden) {
        const p = (cycle - 1600) / 1600;
        const totalSegments = nodes.length - 1;
        const currentSeg = Math.min(totalSegments - 1, Math.floor(p * totalSegments));
        const segP = (p * totalSegments) - currentSeg;

        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i <= currentSeg; i++) {
          ctx.lineTo(nodes[i].x, nodes[i].y);
        }
        const lastNode = nodes[currentSeg];
        const nextNode = nodes[currentSeg + 1];
        const curX = lastNode.x + (nextNode.x - lastNode.x) * segP;
        const curY = lastNode.y + (nextNode.y - lastNode.y) * segP;
        ctx.lineTo(curX, curY);
        ctx.stroke();

        drawCrosshair(ctx, curX, curY, 6, '#ffffff');
      }
    }
  },

  // ---------------- MOTOR PREVIEW SCENES (25–32) ----------------

  // 25. TAP: Rapid CPS cadence test with speed meter & rhythmic tap ripples (rapid-tapping)
  tap: {
    id: 'tap',
    label: 'Rapid Tapping Cadence',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 850) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.45;
      const cy = h * 0.54;
      const tapTimestamps = [500, 750, 1000, 1250, 1500, 1750, 2000];

      // Gauge arc on the right/top
      const gx = w * 0.82;
      const gy = h * 0.44;
      const gr = 24;

      // Draw gauge background arc
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, Math.PI * 0.75, Math.PI * 2.25);
      ctx.stroke();

      // Determine current CPS gauge fill
      let cpsRatio = 0;
      if (cycle >= 450 && cycle < 2100) {
        const p = (cycle - 450) / 1650;
        cpsRatio = Math.min(1, p * 1.15);
      } else if (cycle >= 2100) {
        const p = (cycle - 2100) / 700;
        cpsRatio = Math.max(0, 1 - p * 1.4);
      }

      // Gauge active accent arc
      if (cpsRatio > 0.01) {
        ctx.strokeStyle = accent;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        const startAng = Math.PI * 0.75;
        const endAng = startAng + cpsRatio * (Math.PI * 1.5);
        ctx.arc(gx, gy, gr, startAng, endAng);
        ctx.stroke();
      }

      // CPS numeric readout
      const cpsVal = (cpsRatio * 12.8).toFixed(1);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${cpsVal}`, gx, gy + 3);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '6px ui-monospace, monospace';
      ctx.fillText('CPS', gx, gy + 12);

      // Check if current frame is close to any tap timestamp
      let activeTapP = 0;
      for (const tapT of tapTimestamps) {
        if (cycle >= tapT && cycle < tapT + 220) {
          activeTapP = 1 - (cycle - tapT) / 220;
          break;
        }
      }

      // Button scale pulse
      const btnScale = 1 - activeTapP * 0.08;
      const btnR = 24 * btnScale;

      // Pad halo
      ctx.fillStyle = dim || 'rgba(16, 185, 129, 0.12)';
      ctx.beginPath();
      ctx.arc(cx, cy, btnR + 6, 0, Math.PI * 2);
      ctx.fill();

      // Pad base
      ctx.fillStyle = activeTapP > 0 ? accent : 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = activeTapP > 0 ? '#ffffff' : accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, btnR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Pad center target mark
      ctx.fillStyle = activeTapP > 0 ? '#ffffff' : accent;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      // Expand ripple rings for recent taps
      tapTimestamps.forEach((tapT) => {
        if (cycle >= tapT && cycle < tapT + 380) {
          const rp = (cycle - tapT) / 380;
          drawHitRing(ctx, cx, cy, btnR + rp * 22, accent, 1 - rp);
        }
      });

      // Finger / Cursor pointer tapping down
      const cursorY = cy + (activeTapP > 0 ? 0 : -8);
      drawCrosshair(ctx, cx, cursorY, 6, '#ffffff');
    }
  },

  // 26. AIM-SHRINK: Dynamic shrinking targets with rapid precision acquisition (aim-trainer)
  'aim-shrink': {
    id: 'aim-shrink',
    label: 'Aim Target Shrinking',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 920) % 2700;
      drawSubtleGrid(ctx, w, h, dim);

      const targets = [
        { x: w * 0.28, y: h * 0.38, start: 100, hit: 850 },
        { x: w * 0.72, y: h * 0.34, start: 900, hit: 1650 },
        { x: w * 0.50, y: h * 0.68, start: 1700, hit: 2450 },
      ];

      let chX = w * 0.5;
      let chY = h * 0.5;

      targets.forEach((tgt) => {
        if (cycle >= tgt.start && cycle < tgt.hit) {
          const p = (cycle - tgt.start) / (tgt.hit - tgt.start);
          const shrinkR = 24 * (1 - p * 0.65);

          // Inner bullseye
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Center micro dot
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Shrinking perimeter ring
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, Math.max(7.5, shrinkR), 0, Math.PI * 2);
          ctx.stroke();
        } else if (cycle >= tgt.hit && cycle < tgt.hit + 300) {
          // Hit flash
          const hp = (cycle - tgt.hit) / 300;
          drawHitRing(ctx, tgt.x, tgt.y, 8 + hp * 24, accent, 1 - hp);
        }
      });

      // Cursor movement tracking between targets
      if (cycle < targets[0].hit) {
        const p = Math.max(0, (cycle - targets[0].start) / (targets[0].hit - targets[0].start));
        const ep = easeInOutCubic(p);
        chX = (w * 0.5) + (targets[0].x - w * 0.5) * ep;
        chY = (h * 0.5) + (targets[0].y - h * 0.5) * ep;
      } else if (cycle < targets[1].hit) {
        const p = Math.max(0, (cycle - targets[1].start) / (targets[1].hit - targets[1].start));
        const ep = easeInOutCubic(p);
        chX = targets[0].x + (targets[1].x - targets[0].x) * ep;
        chY = targets[0].y + (targets[1].y - targets[0].y) * ep;
      } else if (cycle < targets[2].hit) {
        const p = Math.max(0, (cycle - targets[2].start) / (targets[2].hit - targets[2].start));
        const ep = easeInOutCubic(p);
        chX = targets[1].x + (targets[2].x - targets[1].x) * ep;
        chY = targets[1].y + (targets[2].y - targets[1].y) * ep;
      } else {
        const p = (cycle - targets[2].hit) / (2700 - targets[2].hit);
        const ep = easeInOutCubic(p);
        chX = targets[2].x + (w * 0.5 - targets[2].x) * ep;
        chY = targets[2].y + (h * 0.5 - targets[2].y) * ep;
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 27. KEY-PRESS: Keyboard recognition with prompt cues & rhythmic depression (keyboard-recognition)
  'key-press': {
    id: 'key-press',
    label: 'Keyboard Recognition',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 800) % 2700;
      drawSubtleGrid(ctx, w, h, dim);

      const keys = [
        { label: 'A', x: w * 0.26, hit: 650 },
        { label: 'S', x: w * 0.42, hit: 1350 },
        { label: 'D', x: w * 0.58, hit: 2050 },
        { label: 'F', x: w * 0.74, hit: -1 },
      ];

      // Active target key determination
      let activeIdx = 0;
      if (cycle < 1000) activeIdx = 0;
      else if (cycle < 1700) activeIdx = 1;
      else if (cycle < 2400) activeIdx = 2;
      else activeIdx = 0;

      // Top target prompt
      const promptY = h * 0.28;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(w * 0.5 - 18, promptY - 14, 36, 20, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.font = 'bold 11px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(keys[activeIdx].label, w * 0.5, promptY - 4);

      // Keycaps layout
      const keyY = h * 0.62;
      const kw = 26;
      const kh = 30;

      keys.forEach((k, idx) => {
        const isHit = k.hit > 0 && cycle >= k.hit && cycle < k.hit + 320;
        const hitP = isHit ? 1 - (cycle - k.hit) / 320 : 0;
        const isTarget = idx === activeIdx;

        const offY = hitP * 4;

        // Keycap shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.roundRect(k.x - kw / 2, keyY - kh / 2 + 4, kw, kh, 4);
        ctx.fill();

        // Keycap body
        if (hitP > 0) {
          ctx.fillStyle = accent;
          ctx.strokeStyle = '#ffffff';
        } else if (isTarget) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.strokeStyle = accent;
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        }
        ctx.lineWidth = isTarget ? 1.5 : 1;

        ctx.beginPath();
        ctx.roundRect(k.x - kw / 2, keyY - kh / 2 + offY, kw, kh, 4);
        ctx.fill();
        ctx.stroke();

        // Keycap letter
        ctx.fillStyle = hitP > 0 ? '#000000' : isTarget ? '#ffffff' : 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'bold 11px ui-monospace, monospace';
        ctx.fillText(k.label, k.x, keyY + offY);

        if (hitP > 0) {
          drawHitRing(ctx, k.x, keyY + offY, kw * 0.7 + (1 - hitP) * 16, accent, hitP);
        }
      });
    }
  },

  // 28. PRECISION-FLICK: Centering snaps into narrowing aperture rings (precision-flick-shot)
  'precision-flick': {
    id: 'precision-flick',
    label: 'Precision Flick Centering',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 980) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const center = { x: w * 0.5, y: h * 0.5 };
      const targets = [
        { x: w * 0.76, y: h * 0.32, flickStart: 250, hit: 650, returnEnd: 1150 },
        { x: w * 0.24, y: h * 0.68, flickStart: 1350, hit: 1750, returnEnd: 2250 },
      ];

      // Draw home anchor ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(center.x, center.y, 6, 0, Math.PI * 2);
      ctx.stroke();

      let chX = center.x;
      let chY = center.y;

      targets.forEach((tgt) => {
        // Draw aperture target if active
        if (cycle >= tgt.flickStart - 150 && cycle < tgt.hit) {
          const p = Math.max(0, (cycle - tgt.flickStart) / (tgt.hit - tgt.flickStart));
          const apertureR = 20 * (1 - p * 0.6);

          // Outer ring
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, apertureR, 0, Math.PI * 2);
          ctx.stroke();

          // Reticle tick marks
          const tickLen = 4;
          ctx.beginPath();
          ctx.moveTo(tgt.x - apertureR - tickLen, tgt.y);
          ctx.lineTo(tgt.x - apertureR, tgt.y);
          ctx.moveTo(tgt.x + apertureR, tgt.y);
          ctx.lineTo(tgt.x + apertureR + tickLen, tgt.y);
          ctx.moveTo(tgt.x, tgt.y - apertureR - tickLen);
          ctx.lineTo(tgt.x, tgt.y - apertureR);
          ctx.moveTo(tgt.x, tgt.y + apertureR);
          ctx.lineTo(tgt.x, tgt.y + apertureR + tickLen);
          ctx.stroke();

          // Center target pip
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (cycle >= tgt.hit && cycle < tgt.hit + 350) {
          const hp = (cycle - tgt.hit) / 350;
          drawHitRing(ctx, tgt.x, tgt.y, 8 + hp * 22, accent, 1 - hp);
        }
      });

      // Ballistic flick motion
      if (cycle >= targets[0].flickStart && cycle < targets[0].hit) {
        const p = (cycle - targets[0].flickStart) / (targets[0].hit - targets[0].flickStart);
        const ep = easeInOutCubic(p);
        chX = center.x + (targets[0].x - center.x) * ep;
        chY = center.y + (targets[0].y - center.y) * ep;
      } else if (cycle >= targets[0].hit && cycle < targets[0].returnEnd) {
        const p = (cycle - targets[0].hit) / (targets[0].returnEnd - targets[0].hit);
        const ep = easeInOutCubic(p);
        chX = targets[0].x + (center.x - targets[0].x) * ep;
        chY = targets[0].y + (center.y - targets[0].y) * ep;
      } else if (cycle >= targets[1].flickStart && cycle < targets[1].hit) {
        const p = (cycle - targets[1].flickStart) / (targets[1].hit - targets[1].flickStart);
        const ep = easeInOutCubic(p);
        chX = center.x + (targets[1].x - center.x) * ep;
        chY = center.y + (targets[1].y - center.y) * ep;
      } else if (cycle >= targets[1].hit && cycle < targets[1].returnEnd) {
        const p = (cycle - targets[1].hit) / (targets[1].returnEnd - targets[1].hit);
        const ep = easeInOutCubic(p);
        chX = targets[1].x + (center.x - targets[1].x) * ep;
        chY = targets[1].y + (center.y - targets[1].y) * ep;
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 29. STEADY-CORRIDOR: Tremor suppression winding corridor navigation (steady-hand)
  'steady-corridor': {
    id: 'steady-corridor',
    label: 'Steady Corridor Traversal',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 910) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const pathPoints = [
        { x: w * 0.12, y: h * 0.50 },
        { x: w * 0.32, y: h * 0.28 },
        { x: w * 0.52, y: h * 0.72 },
        { x: w * 0.72, y: h * 0.32 },
        { x: w * 0.88, y: h * 0.50 },
      ];

      // Corridor half-width
      const hw = 14;

      // Draw corridor walls
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';

      // Upper wall
      ctx.beginPath();
      ctx.moveTo(pathPoints[0].x, pathPoints[0].y - hw);
      for (let i = 1; i < pathPoints.length; i++) {
        const prev = pathPoints[i - 1];
        const cur = pathPoints[i];
        const midX = (prev.x + cur.x) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y - hw, midX, (prev.y + cur.y) / 2 - hw);
      }
      const last = pathPoints[pathPoints.length - 1];
      ctx.lineTo(last.x, last.y - hw);
      ctx.stroke();

      // Lower wall
      ctx.beginPath();
      ctx.moveTo(pathPoints[0].x, pathPoints[0].y + hw);
      for (let i = 1; i < pathPoints.length; i++) {
        const prev = pathPoints[i - 1];
        const cur = pathPoints[i];
        const midX = (prev.x + cur.x) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y + hw, midX, (prev.y + cur.y) / 2 + hw);
      }
      ctx.lineTo(last.x, last.y + hw);
      ctx.stroke();

      // Guide center dotted line
      ctx.strokeStyle = dim || 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
      for (let i = 1; i < pathPoints.length; i++) {
        const prev = pathPoints[i - 1];
        const cur = pathPoints[i];
        const midX = (prev.x + cur.x) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, midX, (prev.y + cur.y) / 2);
      }
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Progress along corridor: 200ms to 2700ms
      let p = 0;
      if (cycle >= 200 && cycle < 2700) {
        p = (cycle - 200) / 2500;
      } else if (cycle >= 2700) {
        p = 1;
      }

      // Spline interpolation for current position
      const segCount = pathPoints.length - 1;
      const segIndex = Math.min(segCount - 1, Math.floor(p * segCount));
      const segT = (p * segCount) - segIndex;
      const p0 = pathPoints[segIndex];
      const p1 = pathPoints[segIndex + 1];
      const curX = p0.x + (p1.x - p0.x) * segT;
      const curY = p0.y + (p1.y - p0.y) * easeInOutCubic(segT);

      // Traversed path trail in accent
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
      for (let i = 1; i <= segIndex; i++) {
        ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
      }
      ctx.lineTo(curX, curY);
      ctx.stroke();

      // Steady hand probe orb
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(curX, curY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Precision micro crosshair surrounding orb
      drawCrosshair(ctx, curX, curY, 6, '#ffffff');
    }
  },

  // 30. DRAG-DROP: Cursor grabs moving target and transports cleanly into receptacle (drag-and-drop)
  'drag-drop': {
    id: 'drag-drop',
    label: 'Drag & Drop Intercept',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 940) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const sourcePos = { x: w * 0.24, y: h * 0.52 };
      const targetPos = { x: w * 0.76, y: h * 0.48 };

      // Receptacle ring
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(targetPos.x, targetPos.y, 16, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Receptacle center notch
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.arc(targetPos.x, targetPos.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Determine orb position and cursor state
      let orbX = sourcePos.x;
      let orbY = sourcePos.y;
      let isGrabbed = false;

      let chX = w * 0.15;
      let chY = h * 0.35;

      if (cycle < 400) {
        // Cursor moves to source
        const p = cycle / 400;
        const ep = easeInOutCubic(p);
        chX = (w * 0.15) + (sourcePos.x - w * 0.15) * ep;
        chY = (h * 0.35) + (sourcePos.y - h * 0.35) * ep;
        orbX = sourcePos.x;
        orbY = sourcePos.y;
      } else if (cycle < 1600) {
        // Dragging phase
        isGrabbed = true;
        const p = (cycle - 400) / 1200;
        const ep = easeInOutCubic(p);
        const arcLift = Math.sin(p * Math.PI) * 22;
        orbX = sourcePos.x + (targetPos.x - sourcePos.x) * ep;
        orbY = sourcePos.y + (targetPos.y - sourcePos.y) * ep - arcLift;
        chX = orbX;
        chY = orbY;
      } else {
        // Delivered / socketed phase
        orbX = targetPos.x;
        orbY = targetPos.y;
        chX = targetPos.x;
        chY = targetPos.y;
      }

      // Draw drag flight arc hint
      ctx.strokeStyle = dim || 'rgba(16, 185, 129, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sourcePos.x, sourcePos.y);
      ctx.quadraticCurveTo(
        (sourcePos.x + targetPos.x) / 2,
        (sourcePos.y + targetPos.y) / 2 - 22,
        targetPos.x,
        targetPos.y
      );
      ctx.stroke();

      // Source base ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(sourcePos.x, sourcePos.y, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Orb
      ctx.fillStyle = isGrabbed ? accent : '#ffffff';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(orbX, orbY, isGrabbed ? 9 : 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Success ripple on drop
      if (cycle >= 1600 && cycle < 2100) {
        const dp = (cycle - 1600) / 500;
        drawHitRing(ctx, targetPos.x, targetPos.y, 16 + dp * 20, accent, 1 - dp);
      }

      // Cursor crosshair / grab grip
      if (isGrabbed) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        const gr = 13;
        ctx.strokeRect(chX - gr, chY - gr, gr * 2, gr * 2);
      } else {
        drawCrosshair(ctx, chX, chY, 6, '#ffffff');
      }
    }
  },

  // 31. WAVE-TRACE: Continuous sine filament velocity tracking (tracing)
  'wave-trace': {
    id: 'wave-trace',
    label: 'Wave Filament Tracing',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 990) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const startX = w * 0.14;
      const endX = w * 0.86;
      const waveLen = endX - startX;
      const midY = h * 0.50;
      const amp = h * 0.22;

      // Full wave guideline in dim
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const steps = 40;
      for (let i = 0; i <= steps; i++) {
        const wx = startX + (i / steps) * waveLen;
        const norm = (i / steps) * Math.PI * 2.5;
        const wy = midY + Math.sin(norm) * amp;
        if (i === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.stroke();

      // Tolerance bounds (upper & lower ghost waves)
      ctx.strokeStyle = dim || 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const wx = startX + (i / steps) * waveLen;
        const norm = (i / steps) * Math.PI * 2.5;
        const wy = midY + Math.sin(norm) * amp - 9;
        if (i === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const wx = startX + (i / steps) * waveLen;
        const norm = (i / steps) * Math.PI * 2.5;
        const wy = midY + Math.sin(norm) * amp + 9;
        if (i === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Progress along wave: 200ms to 2600ms
      let p = 0;
      if (cycle >= 200 && cycle < 2600) {
        p = (cycle - 200) / 2400;
      } else if (cycle >= 2600) {
        p = 1;
      }

      // Traced portion of wave in vibrant accent
      if (p > 0.01) {
        const tracedSteps = Math.floor(steps * p);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= tracedSteps; i++) {
          const wx = startX + (i / steps) * waveLen;
          const norm = (i / steps) * Math.PI * 2.5;
          const wy = midY + Math.sin(norm) * amp;
          if (i === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
        const curX = startX + p * waveLen;
        const curNorm = p * Math.PI * 2.5;
        const curY = midY + Math.sin(curNorm) * amp;
        ctx.lineTo(curX, curY);
        ctx.stroke();

        // Stylus / tracking probe at current head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        drawCrosshair(ctx, curX, curY, 6, accent);
      } else {
        const curX = startX;
        const curY = midY;
        drawCrosshair(ctx, curX, curY, 6, '#ffffff');
      }
    }
  },

  // 32. SCALE-SEQUENCE: Size-ordered circular node sequence taps (finger-sequencing)
  'scale-sequence': {
    id: 'scale-sequence',
    label: 'Finger Scale Sequencing',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 860) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const nodes = [
        { x: w * 0.22, y: h * 0.60, r: 21, num: '1', hit: 600 },
        { x: w * 0.44, y: h * 0.36, r: 16, num: '2', hit: 1250 },
        { x: w * 0.68, y: h * 0.64, r: 12, num: '3', hit: 1900 },
        { x: w * 0.84, y: h * 0.38, r: 8, num: '4', hit: 2550 },
      ];

      // Draw connecting lines between already-tapped nodes
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let hasLine = false;
      for (let i = 0; i < nodes.length - 1; i++) {
        if (cycle >= nodes[i].hit) {
          if (!hasLine) {
            ctx.moveTo(nodes[i].x, nodes[i].y);
            hasLine = true;
          }
          if (cycle >= nodes[i + 1].hit) {
            ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
          } else {
            const p = (cycle - nodes[i].hit) / (nodes[i + 1].hit - nodes[i].hit);
            const midX = nodes[i].x + (nodes[i + 1].x - nodes[i].x) * p;
            const midY = nodes[i].y + (nodes[i + 1].y - nodes[i].y) * p;
            ctx.lineTo(midX, midY);
            break;
          }
        }
      }
      if (hasLine) ctx.stroke();

      // Draw each node
      nodes.forEach((n) => {
        const isHit = cycle >= n.hit;
        const isRecent = isHit && cycle < n.hit + 350;

        // Node base fill
        if (isHit) {
          ctx.fillStyle = accent;
          ctx.strokeStyle = '#ffffff';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        }
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Node rank number
        ctx.fillStyle = isHit ? '#000000' : '#ffffff';
        ctx.font = `bold ${Math.max(8, n.r * 0.85)}px ui-monospace, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.num, n.x, n.y);

        // Tap ripple ring
        if (isRecent) {
          const hp = (cycle - n.hit) / 350;
          drawHitRing(ctx, n.x, n.y, n.r + hp * 16, accent, 1 - hp);
        }
      });

      // Cursor targeting nodes sequentially
      let chX = w * 0.5;
      let chY = h * 0.5;
      if (cycle < nodes[0].hit) {
        const p = cycle / nodes[0].hit;
        const ep = easeInOutCubic(p);
        chX = (w * 0.5) + (nodes[0].x - w * 0.5) * ep;
        chY = (h * 0.5) + (nodes[0].y - h * 0.5) * ep;
      } else if (cycle < nodes[1].hit) {
        const p = (cycle - nodes[0].hit) / (nodes[1].hit - nodes[0].hit);
        const ep = easeInOutCubic(p);
        chX = nodes[0].x + (nodes[1].x - nodes[0].x) * ep;
        chY = nodes[0].y + (nodes[1].y - nodes[0].y) * ep;
      } else if (cycle < nodes[2].hit) {
        const p = (cycle - nodes[1].hit) / (nodes[2].hit - nodes[1].hit);
        const ep = easeInOutCubic(p);
        chX = nodes[1].x + (nodes[2].x - nodes[1].x) * ep;
        chY = nodes[1].y + (nodes[2].y - nodes[1].y) * ep;
      } else if (cycle < nodes[3].hit) {
        const p = (cycle - nodes[2].hit) / (nodes[3].hit - nodes[2].hit);
        const ep = easeInOutCubic(p);
        chX = nodes[2].x + (nodes[3].x - nodes[2].x) * ep;
        chY = nodes[2].y + (nodes[3].y - nodes[2].y) * ep;
      } else {
        chX = nodes[3].x;
        chY = nodes[3].y;
      }

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // ---------------- FPS PREVIEW SCENES (33–46) ----------------

  // 33. PERIPHERAL-SNAP: Screen-edge threat indicators & wide 180° sweeps (180-degree-awareness)
  'peripheral-snap': {
    id: 'peripheral-snap',
    label: '180° Peripheral Awareness',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 950) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const center = { x: w * 0.5, y: h * 0.5 };
      const targets = [
        { x: w * 0.10, y: h * 0.45, cueStart: 200, snapStart: 500, hit: 900, side: 'left' },
        { x: w * 0.90, y: h * 0.55, cueStart: 1300, snapStart: 1600, hit: 2000, side: 'right' },
      ];

      // Draw subtle peripheral radar brackets on left and right screen borders
      ctx.strokeStyle = dim || 'rgba(239, 68, 68, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(8, h * 0.2);
      ctx.lineTo(8, h * 0.8);
      ctx.moveTo(w - 8, h * 0.2);
      ctx.lineTo(w - 8, h * 0.8);
      ctx.stroke();

      let chX = center.x;
      let chY = center.y;

      targets.forEach((tgt) => {
        // Flashing peripheral directional chevrons before snap
        if (cycle >= tgt.cueStart && cycle < tgt.hit) {
          const flash = Math.sin((cycle - tgt.cueStart) * 0.02) > 0;
          ctx.strokeStyle = flash ? accent : 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          if (tgt.side === 'left') {
            ctx.moveTo(tgt.x + 14, tgt.y - 7);
            ctx.lineTo(tgt.x + 7, tgt.y);
            ctx.lineTo(tgt.x + 14, tgt.y + 7);
          } else {
            ctx.moveTo(tgt.x - 14, tgt.y - 7);
            ctx.lineTo(tgt.x - 7, tgt.y);
            ctx.lineTo(tgt.x - 14, tgt.y + 7);
          }
          ctx.stroke();

          // Target disc
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 7.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (cycle >= tgt.hit && cycle < tgt.hit + 350) {
          const p = (cycle - tgt.hit) / 350;
          drawHitRing(ctx, tgt.x, tgt.y, 8 + p * 22, accent, 1 - p);
        }
      });

      // Crosshair trajectory: Center -> Left -> Right -> Center
      if (cycle < targets[0].snapStart) {
        chX = center.x;
        chY = center.y;
      } else if (cycle < targets[0].hit) {
        const p = (cycle - targets[0].snapStart) / (targets[0].hit - targets[0].snapStart);
        const ep = easeInOutCubic(p);
        chX = center.x + (targets[0].x - center.x) * ep;
        chY = center.y + (targets[0].y - center.y) * ep;
      } else if (cycle < targets[1].snapStart) {
        chX = targets[0].x;
        chY = targets[0].y;
      } else if (cycle < targets[1].hit) {
        // Extreme 180° flick across entire screen
        const p = (cycle - targets[1].snapStart) / (targets[1].hit - targets[1].snapStart);
        const ep = easeInOutCubic(p);
        chX = targets[0].x + (targets[1].x - targets[0].x) * ep;
        chY = targets[0].y + (targets[1].y - targets[0].y) * ep;
      } else {
        const p = (cycle - targets[1].hit) / (3000 - targets[1].hit);
        const ep = easeInOutCubic(p);
        chX = targets[1].x + (center.x - targets[1].x) * ep;
        chY = targets[1].y + (center.y - targets[1].y) * ep;
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 34. INSTANT-TRIGGER: Micro-reaction trigger shot with ms stopwatch readout (instant-response)
  'instant-trigger': {
    id: 'instant-trigger',
    label: 'Instant Trigger Response',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 880) % 2600;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const stimStart = 900;
      const shotAt = 1060;

      // Crosshair gate / sensor box
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - 24, cy - 18, 48, 36);

      // Target stimulus: flashes or sweeps in
      if (cycle >= stimStart && cycle < shotAt) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.stroke();
      } else if (cycle >= shotAt && cycle < shotAt + 400) {
        // Shot explosion & muzzle ripple
        const p = (cycle - shotAt) / 400;
        drawHitRing(ctx, cx, cy, 6 + p * 28, accent, 1 - p);
      }

      // Reaction timer badge
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.strokeStyle = cycle >= shotAt ? accent : 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx - 28, h * 0.76, 56, 18, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = cycle >= shotAt ? accent : 'rgba(255, 255, 255, 0.5)';
      ctx.font = 'bold 9px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const readout = cycle < stimStart ? 'READY' : cycle < shotAt ? '...' : '158ms';
      ctx.fillText(readout, cx, h * 0.76 + 9);

      // Crosshair
      drawCrosshair(ctx, cx, cy, 7, cycle >= shotAt && cycle < shotAt + 200 ? accent : '#ffffff');
    }
  },

  // 35. FLOW-RHYTHM: Rhythmic tempo clicking in seamless flowing motion (flow-state)
  'flow-rhythm': {
    id: 'flow-rhythm',
    label: 'Flow State Rhythm',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 920) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const nodes = [
        { x: w * 0.18, y: h * 0.55, hit: 500 },
        { x: w * 0.38, y: h * 0.35, hit: 1050 },
        { x: w * 0.62, y: h * 0.65, hit: 1600 },
        { x: w * 0.82, y: h * 0.40, hit: 2150 },
      ];

      // Flow spline guide
      ctx.strokeStyle = dim || 'rgba(239, 68, 68, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i++) {
        const prev = nodes[i - 1];
        const cur = nodes[i];
        ctx.quadraticCurveTo((prev.x + cur.x) / 2, (prev.y + cur.y) / 2 - 10, cur.x, cur.y);
      }
      ctx.stroke();

      // Draw targets
      nodes.forEach((n) => {
        const isHit = cycle >= n.hit;
        const isRecent = isHit && cycle < n.hit + 300;

        ctx.fillStyle = isHit ? accent : 'rgba(255, 255, 255, 0.08)';
        ctx.strokeStyle = isHit ? '#ffffff' : accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        if (isRecent) {
          const p = (cycle - n.hit) / 300;
          drawHitRing(ctx, n.x, n.y, 7 + p * 18, accent, 1 - p);
        }
      });

      // Flowing crosshair following rhythm
      let chX = nodes[0].x;
      let chY = nodes[0].y;
      if (cycle < nodes[0].hit) {
        chX = nodes[0].x;
        chY = nodes[0].y;
      } else if (cycle < nodes[1].hit) {
        const p = (cycle - nodes[0].hit) / (nodes[1].hit - nodes[0].hit);
        const ep = easeInOutCubic(p);
        chX = nodes[0].x + (nodes[1].x - nodes[0].x) * ep;
        chY = nodes[0].y + (nodes[1].y - nodes[0].y) * ep;
      } else if (cycle < nodes[2].hit) {
        const p = (cycle - nodes[1].hit) / (nodes[2].hit - nodes[1].hit);
        const ep = easeInOutCubic(p);
        chX = nodes[1].x + (nodes[2].x - nodes[1].x) * ep;
        chY = nodes[1].y + (nodes[2].y - nodes[1].y) * ep;
      } else if (cycle < nodes[3].hit) {
        const p = (cycle - nodes[2].hit) / (nodes[3].hit - nodes[2].hit);
        const ep = easeInOutCubic(p);
        chX = nodes[2].x + (nodes[3].x - nodes[2].x) * ep;
        chY = nodes[2].y + (nodes[3].y - nodes[2].y) * ep;
      } else {
        const p = (cycle - nodes[3].hit) / (2800 - nodes[3].hit);
        const ep = easeInOutCubic(p);
        chX = nodes[3].x + (nodes[0].x - nodes[3].x) * ep;
        chY = nodes[3].y + (nodes[0].y - nodes[3].y) * ep;
      }

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 36. MICRO-CORRECTION: Coarse flick landing slightly off followed by instant micro-adjustment (micro-correction-precision)
  'micro-correction': {
    id: 'micro-correction',
    label: 'Micro-Correction Precision',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 940) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const target = { x: w * 0.68, y: h * 0.40 };
      const origin = { x: w * 0.28, y: h * 0.65 };
      const undershoot = { x: target.x - 15, y: target.y + 12 };

      const flickEnd = 600;
      const microEnd = 950;
      const hitAt = 1000;

      // Draw headshot target with precision concentric rings
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(target.x, target.y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Precision micro dot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(target.x, target.y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair trajectory
      let chX = origin.x;
      let chY = origin.y;

      if (cycle < flickEnd) {
        // Stage 1: Coarse flick to undershoot position
        const p = cycle / flickEnd;
        const ep = easeInOutCubic(p);
        chX = origin.x + (undershoot.x - origin.x) * ep;
        chY = origin.y + (undershoot.y - origin.y) * ep;
      } else if (cycle < microEnd) {
        // Stage 2: Sharp micro-adjustment from undershoot straight to bullseye
        const p = (cycle - flickEnd) / (microEnd - flickEnd);
        const ep = easeInOutCubic(p);
        chX = undershoot.x + (target.x - undershoot.x) * ep;
        chY = undershoot.y + (target.y - undershoot.y) * ep;
      } else if (cycle < 2000) {
        // Locked on target
        chX = target.x;
        chY = target.y;
      } else {
        // Return to origin
        const p = (cycle - 2000) / 800;
        const ep = easeInOutCubic(p);
        chX = target.x + (origin.x - target.x) * ep;
        chY = target.y + (origin.y - target.y) * ep;
      }

      // Hit confirmation spark
      if (cycle >= hitAt && cycle < hitAt + 400) {
        const p = (cycle - hitAt) / 400;
        drawHitRing(ctx, target.x, target.y, 11 + p * 20, accent, 1 - p);
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 37. ANGLE-HOLD: Tactical corner pre-aim holding and instant peek elimination (angle-hold-trainer)
  'angle-hold': {
    id: 'angle-hold',
    label: 'Tactical Angle Hold',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 860) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const wallX = w * 0.58;
      const headY = h * 0.48;
      const crosshairX = wallX - 16;
      const crosshairY = headY;

      // Draw tactical doorway / wall obstacle
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fillRect(wallX, 0, w - wallX, h);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(wallX, 0);
      ctx.lineTo(wallX, h);
      ctx.stroke();

      // Enemy peek animation
      const peekStart = 900;
      const hitAt = 1250;
      let enemyX = wallX + 18;

      if (cycle >= peekStart && cycle < hitAt) {
        const p = (cycle - peekStart) / (hitAt - peekStart);
        enemyX = (wallX + 18) - p * 34;
      } else if (cycle >= hitAt) {
        enemyX = crosshairX;
      }

      if (cycle >= peekStart && cycle < hitAt) {
        // Enemy silhouette
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(enemyX, headY, 8, 0, Math.PI * 2);
        ctx.fill();
      } else if (cycle >= hitAt && cycle < hitAt + 450) {
        // Hit explosion right on the angle hold
        const p = (cycle - hitAt) / 450;
        drawHitRing(ctx, crosshairX, headY, 8 + p * 24, accent, 1 - p);
      }

      // Pre-aim crosshair holding angle
      drawCrosshair(ctx, crosshairX, crosshairY, 7, cycle >= hitAt && cycle < hitAt + 200 ? accent : '#ffffff');
    }
  },

  // 38. JITTER-DUEL: High-frequency erratic strafe tracking with physics damping (anti-strafe-jitter-duel)
  'jitter-duel': {
    id: 'jitter-duel',
    label: 'Anti-Strafe Jitter Duel',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 910) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.5;

      // Fast erratic jitter target position
      const jitterFreq = 0.012;
      const targetX = midX + Math.sin(cycle * jitterFreq) * (w * 0.22) + Math.cos(cycle * 0.027) * (w * 0.08);
      const targetY = midY + Math.sin(cycle * 0.005) * 6;

      // Target core disc
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Slightly lag-damped crosshair tracking
      const lagCycle = Math.max(0, cycle - 45);
      const chX = midX + Math.sin(lagCycle * jitterFreq) * (w * 0.21) + Math.cos(lagCycle * 0.027) * (w * 0.07);
      const chY = midY + Math.sin(lagCycle * 0.005) * 6;

      // Tracking laser connection beam
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(chX, chY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 39. ZIGZAG-TRACK: Sharp 45° evasive diagonal corner tracking (anti-zigzag-movement-trainer)
  'zigzag-track': {
    id: 'zigzag-track',
    label: 'Anti-Zigzag Movement',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 970) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const corners = [
        { x: w * 0.16, y: h * 0.68 },
        { x: w * 0.38, y: h * 0.28 },
        { x: w * 0.62, y: h * 0.72 },
        { x: w * 0.84, y: h * 0.32 },
      ];

      // Draw faint zigzag guide path
      ctx.strokeStyle = dim || 'rgba(239, 68, 68, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      for (let i = 1; i < corners.length; i++) {
        ctx.lineTo(corners[i].x, corners[i].y);
      }
      ctx.stroke();

      // Target traversal across 3 segments
      const segCount = corners.length - 1;
      const p = (cycle / 3000) % 1;
      const segIdx = Math.min(segCount - 1, Math.floor(p * segCount));
      const segT = (p * segCount) - segIdx;

      const p0 = corners[segIdx];
      const p1 = corners[segIdx + 1];
      const tgtX = p0.x + (p1.x - p0.x) * segT;
      const tgtY = p0.y + (p1.y - p0.y) * segT;

      // Evasive target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 7.5, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair closely tracking with slight momentum
      drawCrosshair(ctx, tgtX, tgtY, 7, '#ffffff');
    }
  },

  // 40. CONTRAST-SNAP: Sudden contrast illumination and rapid acquisition (target-acquisition)
  'contrast-snap': {
    id: 'contrast-snap',
    label: 'Contrast Target Acquisition',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 890) % 2700;
      drawSubtleGrid(ctx, w, h, dim);

      const targets = [
        { x: w * 0.28, y: h * 0.38, lightAt: 200, hitAt: 750 },
        { x: w * 0.72, y: h * 0.58, lightAt: 950, hitAt: 1500 },
        { x: w * 0.48, y: h * 0.32, lightAt: 1700, hitAt: 2250 },
      ];

      // Draw decoy / dim targets
      targets.forEach((tgt) => {
        const isIlluminated = cycle >= tgt.lightAt && cycle < tgt.hitAt;
        const isHit = cycle >= tgt.hitAt && cycle < tgt.hitAt + 350;

        if (isIlluminated) {
          // Sudden high-contrast flash
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = accent;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 14, 0, Math.PI * 2);
          ctx.stroke();
        } else if (isHit) {
          const hp = (cycle - tgt.hitAt) / 350;
          drawHitRing(ctx, tgt.x, tgt.y, 8 + hp * 22, accent, 1 - hp);
        } else {
          // Blended dim target
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      });

      // Crosshair snap to illuminated target
      let chX = w * 0.5;
      let chY = h * 0.5;
      if (cycle < targets[0].hitAt) {
        const p = Math.max(0, (cycle - targets[0].lightAt) / (targets[0].hitAt - targets[0].lightAt));
        const ep = easeInOutCubic(p);
        chX = (w * 0.5) + (targets[0].x - w * 0.5) * ep;
        chY = (h * 0.5) + (targets[0].y - h * 0.5) * ep;
      } else if (cycle < targets[1].hitAt) {
        const p = Math.max(0, (cycle - targets[1].lightAt) / (targets[1].hitAt - targets[1].lightAt));
        const ep = easeInOutCubic(p);
        chX = targets[0].x + (targets[1].x - targets[0].x) * ep;
        chY = targets[0].y + (targets[1].y - targets[0].y) * ep;
      } else if (cycle < targets[2].hitAt) {
        const p = Math.max(0, (cycle - targets[2].lightAt) / (targets[2].hitAt - targets[2].lightAt));
        const ep = easeInOutCubic(p);
        chX = targets[1].x + (targets[2].x - targets[1].x) * ep;
        chY = targets[1].y + (targets[2].y - targets[1].y) * ep;
      } else {
        chX = targets[2].x;
        chY = targets[2].y;
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 41. TARGET-PRIORITY: Priority threat order triage (target-prioritization)
  'target-priority': {
    id: 'target-priority',
    label: 'Target Prioritization',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 930) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const targets = [
        { x: w * 0.30, y: h * 0.60, priority: '1', hit: 850, isUrgent: true },
        { x: w * 0.70, y: h * 0.35, priority: '2', hit: 1700, isUrgent: false },
        { x: w * 0.50, y: h * 0.70, priority: '3', hit: 2550, isUrgent: false },
      ];

      targets.forEach((tgt) => {
        if (cycle < tgt.hit) {
          // Threat urgency ring
          ctx.strokeStyle = tgt.isUrgent ? accent : 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 12, 0, Math.PI * 2);
          ctx.stroke();

          // Target core disc
          ctx.fillStyle = tgt.isUrgent ? accent : 'rgba(255, 255, 255, 0.1)';
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 8, 0, Math.PI * 2);
          ctx.fill();

          // Priority badge number
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 8px ui-monospace, monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(tgt.priority, tgt.x, tgt.y);
        } else if (cycle < tgt.hit + 350) {
          const p = (cycle - tgt.hit) / 350;
          drawHitRing(ctx, tgt.x, tgt.y, 8 + p * 20, accent, 1 - p);
        }
      });

      // Crosshair sequential elimination in priority order (1 -> 2 -> 3)
      let chX = w * 0.5;
      let chY = h * 0.5;
      if (cycle < targets[0].hit) {
        const p = cycle / targets[0].hit;
        const ep = easeInOutCubic(p);
        chX = (w * 0.5) + (targets[0].x - w * 0.5) * ep;
        chY = (h * 0.5) + (targets[0].y - h * 0.5) * ep;
      } else if (cycle < targets[1].hit) {
        const p = (cycle - targets[0].hit) / (targets[1].hit - targets[0].hit);
        const ep = easeInOutCubic(p);
        chX = targets[0].x + (targets[1].x - targets[0].x) * ep;
        chY = targets[0].y + (targets[1].y - targets[0].y) * ep;
      } else if (cycle < targets[2].hit) {
        const p = (cycle - targets[1].hit) / (targets[2].hit - targets[1].hit);
        const ep = easeInOutCubic(p);
        chX = targets[1].x + (targets[2].x - targets[1].x) * ep;
        chY = targets[1].y + (targets[2].y - targets[1].y) * ep;
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');
    }
  },

  // 42. SWITCHING-SWARM: High-tempo target switching through 5-target swarm (target-switching-swarm)
  'switching-swarm': {
    id: 'switching-swarm',
    label: 'Target Switching Swarm',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 850) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const swarm = [
        { x: w * 0.22, y: h * 0.38, hit: 450 },
        { x: w * 0.42, y: h * 0.65, hit: 900 },
        { x: w * 0.60, y: h * 0.32, hit: 1350 },
        { x: w * 0.78, y: h * 0.62, hit: 1800 },
        { x: w * 0.50, y: h * 0.48, hit: 2250 },
      ];

      swarm.forEach((node) => {
        if (cycle < node.hit) {
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 6.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (cycle < node.hit + 300) {
          const p = (cycle - node.hit) / 300;
          drawHitRing(ctx, node.x, node.y, 6.5 + p * 16, accent, 1 - p);
        }
      });

      // Rapid snap chain
      let chX = swarm[0].x;
      let chY = swarm[0].y;
      for (let i = 0; i < swarm.length; i++) {
        const cur = swarm[i];
        const prev = i > 0 ? swarm[i - 1] : { x: w * 0.5, y: h * 0.5 };
        const prevHit = i > 0 ? swarm[i - 1].hit : 0;
        if (cycle >= prevHit && cycle < cur.hit) {
          const p = (cycle - prevHit) / (cur.hit - prevHit);
          const ep = easeInOutCubic(p);
          chX = prev.x + (cur.x - prev.x) * ep;
          chY = prev.y + (cur.y - prev.y) * ep;
          break;
        } else if (i === swarm.length - 1 && cycle >= cur.hit) {
          chX = cur.x;
          chY = cur.y;
        }
      }

      drawCrosshair(ctx, chX, chY, 6, '#ffffff');
    }
  },

  // 43. RECOIL-SPRAY: Recoil pattern compensation counter-pull keeping tight impact group (recoil-control)
  'recoil-spray': {
    id: 'recoil-spray',
    label: 'Recoil Pattern Compensation',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 960) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const targetPos = { x: w * 0.5, y: h * 0.36 };

      // Bullseye target
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(targetPos.x, targetPos.y, 16, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(targetPos.x, targetPos.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Recoil spray phase: 400ms to 2200ms
      const isFiring = cycle >= 400 && cycle < 2200;
      let recoilP = 0;
      if (isFiring) {
        recoilP = (cycle - 400) / 1800;
      }

      // Gun reticle pulls downward to compensate upward muzzle climb
      // S-curve recoil offset: pulls down and counter-sways horizontally
      const reticleY = targetPos.y + (isFiring ? recoilP * 26 : 0);
      const reticleX = targetPos.x + (isFiring ? Math.sin(recoilP * Math.PI * 3) * 10 : 0);

      // Gun reticle position
      drawCrosshair(ctx, reticleX, reticleY, 7, isFiring ? accent : '#ffffff');

      // Clustered bullet impact impacts on target
      if (isFiring) {
        const shotCount = Math.floor(recoilP * 12);
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < shotCount; i++) {
          const jitterX = targetPos.x + (Math.sin(i * 9) * 4);
          const jitterY = targetPos.y + (Math.cos(i * 7) * 4);
          ctx.beginPath();
          ctx.arc(jitterX, jitterY, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Active muzzle spark ring at target center
        drawHitRing(ctx, targetPos.x, targetPos.y, 5 + (cycle % 200) / 200 * 12, accent, 0.6);
      }
    }
  },

  // 44. VERTICAL-PARABOLA: Parabolic aerial jump arc tracking (vertical-air-track)
  'vertical-parabola': {
    id: 'vertical-parabola',
    label: 'Vertical Parabolic Air Track',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 915) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const startX = w * 0.18;
      const endX = w * 0.82;
      const groundY = h * 0.78;
      const peakY = h * 0.22;

      // Draw faint parabolic aerial flight curve
      ctx.strokeStyle = dim || 'rgba(239, 68, 68, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX, groundY);
      ctx.quadraticCurveTo((startX + endX) / 2, peakY - 14, endX, groundY);
      ctx.stroke();

      // Current airborne target position
      const p = (cycle / 3000);
      const tgtX = startX + (endX - startX) * p;
      // Parabolic altitude: 4 * h * p * (1 - p)
      const altitude = 4 * (groundY - peakY) * p * (1 - p);
      const tgtY = groundY - altitude;

      // Airborne target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Tracking lock crosshair
      drawCrosshair(ctx, tgtX, tgtY, 7, '#ffffff');
    }
  },

  // 45. STRAFE-ADAD: Horizontal ADAD erratic strafe tracking with direction indicator (strafe-tracking)
  'strafe-adad': {
    id: 'strafe-adad',
    label: 'ADAD Strafe Tracking',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 925) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.5;

      // Compound strafe waveform: long strafe + short reversal
      const s1 = Math.sin(cycle * 0.003) * (w * 0.28);
      const s2 = Math.sin(cycle * 0.009) * (w * 0.08);
      const tgtX = midX + s1 + s2;
      const tgtY = midY;

      // Directional velocity indicator line
      const vel = Math.cos(cycle * 0.003) + Math.cos(cycle * 0.009);
      const dirArrow = vel > 0 ? 1 : -1;

      // Target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Micro velocity arrow behind target
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tgtX - dirArrow * 14, tgtY);
      ctx.lineTo(tgtX - dirArrow * 8, tgtY);
      ctx.stroke();

      // Close tracking crosshair
      drawCrosshair(ctx, tgtX, tgtY, 7, '#ffffff');
    }
  },

  // 46. SMOOTH-PURSUIT: 360Hz continuous figure-8 orbital pursuit with smoothness index (pro-smooth-pursuit)
  'smooth-pursuit': {
    id: 'smooth-pursuit',
    label: '360Hz Smooth Pursuit',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 945) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.5;
      const rx = w * 0.30;
      const ry = h * 0.25;

      // Draw faint figure-8 / infinity orbital track
      ctx.strokeStyle = dim || 'rgba(239, 68, 68, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const ang = (i / steps) * Math.PI * 2;
        const ox = midX + Math.sin(ang) * rx;
        const oy = midY + Math.sin(ang * 2) * (ry * 0.8);
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
      }
      ctx.stroke();

      // Target position along figure-8
      const ang = (cycle / 3200) * Math.PI * 2;
      const tgtX = midX + Math.sin(ang) * rx;
      const tgtY = midY + Math.sin(ang * 2) * (ry * 0.8);

      // Target core
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 7.5, 0, Math.PI * 2);
      ctx.fill();

      // Precision tracking beam & crosshair
      drawCrosshair(ctx, tgtX, tgtY, 7, '#ffffff');

      // Smoothness readout badge
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SMOOTHNESS: 99.4%', midX, h * 0.86);
    }
  },

  // ---------------- PHYSICAL PREVIEW SCENES (47–57) ----------------

  // 47. STABILITY-HOLD: Wind-force equilibrium & safe zone centering (stability-challenge)
  'stability-hold': {
    id: 'stability-hold',
    label: 'Wind-Force Equilibrium',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 910) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const safeRadius = Math.min(w, h) * 0.28;

      // Outer safe zone circular boundary
      ctx.strokeStyle = dim || 'rgba(244, 63, 94, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, safeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed inner perimeter ring
      ctx.save();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 5]);
      ctx.beginPath();
      ctx.arc(cx, cy, safeRadius * 0.75, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Horizontal wind vector streamlines drifting left to right
      const windSpeed = 0.08;
      const windStep = h * 0.22;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        const wy = i * windStep;
        const offset = ((cycle * windSpeed * (0.8 + i * 0.2)) + i * 40) % (w + 40) - 20;
        ctx.beginPath();
        ctx.moveTo(offset - 25, wy);
        ctx.lineTo(offset + 25, wy);
        ctx.stroke();
      }

      // Wind gust disturbance force & counter-stabilization
      const gust = Math.sin(cycle * 0.004) * (safeRadius * 0.35);
      const counterDamping = -gust * 0.88;
      const orbX = cx + gust + counterDamping;
      const orbY = cy + Math.cos(cycle * 0.005) * 4;

      // Stabilization pulse ring every 1.5s
      const pulseCycle = cycle % 1500;
      if (pulseCycle < 700) {
        const pp = pulseCycle / 700;
        drawHitRing(ctx, cx, cy, 10 + pp * (safeRadius - 10), accent, 1 - pp);
      }

      // Center crosshair and stabilization core
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(orbX, orbY, 5.5, 0, Math.PI * 2);
      ctx.fill();

      drawCrosshair(ctx, orbX, orbY, 6, '#ffffff');

      // Status readout
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('EQUILIBRIUM: 99.4%', cx, h * 0.90);
    }
  },

  // 48. PATTERN-TRACE: Memorize geometric path & recreate from memory (complex-pattern)
  'pattern-trace': {
    id: 'pattern-trace',
    label: 'Memory Path Reconstruction',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 920) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const nodes = [
        { x: w * 0.20, y: h * 0.72 },
        { x: w * 0.38, y: h * 0.26 },
        { x: w * 0.62, y: h * 0.32 },
        { x: w * 0.80, y: h * 0.68 },
      ];

      const isMemorize = cycle < 1000;
      const isHidden = cycle >= 1000 && cycle < 1350;
      const isDrawing = cycle >= 1350 && cycle < 2750;
      const isDone = cycle >= 2750;

      // Draw waypoints
      nodes.forEach((n, idx) => {
        ctx.fillStyle = idx === 0 ? 'rgba(6, 182, 212, 0.25)' : (idx === 3 ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.08)');
        ctx.strokeStyle = idx === 0 ? '#06b6d4' : (idx === 3 ? accent : 'rgba(255, 255, 255, 0.3)');
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      if (isMemorize) {
        // Flash guide path
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i < nodes.length; i++) {
          ctx.lineTo(nodes[i].x, nodes[i].y);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '7px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('MEMORIZE VECTOR', w * 0.5, h * 0.90);
      } else if (isHidden) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '7px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('RECONSTRUCT...', w * 0.5, h * 0.90);
      } else if (isDrawing) {
        const p = (cycle - 1350) / 1400;
        const totalSegments = nodes.length - 1;
        const currentSeg = Math.min(totalSegments - 1, Math.floor(p * totalSegments));
        const segP = (p * totalSegments) - currentSeg;

        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i <= currentSeg; i++) {
          ctx.lineTo(nodes[i].x, nodes[i].y);
        }
        const lastNode = nodes[currentSeg];
        const nextNode = nodes[currentSeg + 1];
        const curX = lastNode.x + (nextNode.x - lastNode.x) * segP;
        const curY = lastNode.y + (nextNode.y - lastNode.y) * segP;
        ctx.lineTo(curX, curY);
        ctx.stroke();

        drawCrosshair(ctx, curX, curY, 6, '#ffffff');

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '7px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('TRACING MEMORY PATH', w * 0.5, h * 0.90);
      } else if (isDone) {
        // Complete path drawn
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i < nodes.length; i++) {
          ctx.lineTo(nodes[i].x, nodes[i].y);
        }
        ctx.stroke();

        const endNode = nodes[nodes.length - 1];
        const flashP = (cycle - 2750) / 450;
        drawHitRing(ctx, endNode.x, endNode.y, 6 + flashP * 24, '#10b981', 1 - flashP);

        ctx.fillStyle = '#10b981';
        ctx.font = '7px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('ACCURACY: 98.7% (PERFECT)', w * 0.5, h * 0.90);
      }
    }
  },

  // 49. CROSS-BODY: Diagonal vector sweep across screen through corridor (cross-body-movement)
  'cross-body': {
    id: 'cross-body',
    label: 'Bilateral Cross-Body Sweep',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 930) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const nStart = { x: w * 0.18, y: h * 0.78 };
      const nEnd = { x: w * 0.82, y: h * 0.22 };

      // Diagonal corridor boundary
      ctx.save();
      ctx.strokeStyle = dim || 'rgba(244, 63, 94, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      const dx = -(nEnd.y - nStart.y) * 0.08;
      const dy = (nEnd.x - nStart.x) * 0.08;
      ctx.beginPath();
      ctx.moveTo(nStart.x + dx, nStart.y + dy);
      ctx.lineTo(nEnd.x + dx, nEnd.y + dy);
      ctx.moveTo(nStart.x - dx, nStart.y - dy);
      ctx.lineTo(nEnd.x - dx, nEnd.y - dy);
      ctx.stroke();
      ctx.restore();

      // Start and end nodes
      ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(nStart.x, nStart.y, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = 'rgba(244, 63, 94, 0.3)';
      ctx.strokeStyle = accent;
      ctx.beginPath();
      ctx.arc(nEnd.x, nEnd.y, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Motion phases
      if (cycle < 400) {
        drawCrosshair(ctx, nStart.x, nStart.y, 6, '#ffffff');
      } else if (cycle < 2000) {
        const p = easeInOutCubic((cycle - 400) / 1600);
        const curX = nStart.x + (nEnd.x - nStart.x) * p;
        const curY = nStart.y + (nEnd.y - nStart.y) * p;

        // Glowing sweep laser
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(nStart.x, nStart.y);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        drawCrosshair(ctx, curX, curY, 7, '#ffffff');
      } else if (cycle < 2600) {
        // Full connection beam
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(nStart.x, nStart.y);
        ctx.lineTo(nEnd.x, nEnd.y);
        ctx.stroke();

        const p = (cycle - 2000) / 600;
        drawHitRing(ctx, nEnd.x, nEnd.y, 6 + p * 28, accent, 1 - p);
        drawCrosshair(ctx, nEnd.x, nEnd.y, 6, '#ffffff');
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CROSS-SWEEP: 100% IN CORRIDOR', w * 0.5, h * 0.90);
    }
  },

  // 50. GRID-EVASION: 3x3 danger cell blast warning and safe hop (dynamic-grid-evasion)
  'grid-evasion': {
    id: 'grid-evasion',
    label: '3x3 Hazard Grid Evasion',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 940) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const gw = w * 0.54;
      const gh = h * 0.64;
      const gx = (w - gw) / 2;
      const gy = (h - gh) / 2 - 2;
      const cw = gw / 3;
      const ch = gh / 3;

      // Hazard cells in this wave: (0,1), (1,1), (2,1), (0,2)
      const hazardCells = [
        { r: 0, c: 1 },
        { r: 1, c: 1 },
        { r: 2, c: 1 },
        { r: 0, c: 2 },
      ];

      const isWarning = cycle < 1300;
      const isHop = cycle >= 1300 && cycle < 1650;
      const isBlast = cycle >= 1650 && cycle < 2350;

      // Draw 3x3 grid cells
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const cx = gx + c * cw;
          const cy = gy + r * ch;
          const isHazard = hazardCells.some((hc) => hc.r === r && hc.c === c);

          if (isHazard && isWarning) {
            const pulse = 0.15 + 0.12 * Math.sin(cycle * 0.015);
            ctx.fillStyle = `rgba(239, 68, 68, ${pulse})`;
            ctx.fillRect(cx + 2, cy + 2, cw - 4, ch - 4);
          } else if (isHazard && isBlast) {
            const blastAlpha = 0.55 * (1 - (cycle - 1650) / 700);
            ctx.fillStyle = `rgba(239, 68, 68, ${Math.max(0, blastAlpha)})`;
            ctx.fillRect(cx + 2, cy + 2, cw - 4, ch - 4);
          }

          ctx.strokeStyle = isHazard && (isWarning || isBlast) ? 'rgba(239, 68, 68, 0.6)' : 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
          ctx.strokeRect(cx, cy, cw, ch);
        }
      }

      // Player orb position: starts at center (1,1), hops to safe corner (2,0)
      const p1 = { x: gx + 1.5 * cw, y: gy + 1.5 * ch };
      const p2 = { x: gx + 0.5 * cw, y: gy + 2.5 * ch };
      let px = p1.x;
      let py = p1.y;

      if (isHop) {
        const hp = easeInOutCubic((cycle - 1300) / 350);
        px = p1.x + (p2.x - p1.x) * hp;
        py = p1.y + (p2.y - p1.y) * hp;
      } else if (isBlast || cycle >= 2350) {
        px = p2.x;
        py = p2.y;
      }

      // Player orb
      ctx.fillStyle = isBlast ? '#10b981' : accent;
      ctx.beginPath();
      ctx.arc(px, py, 5.5, 0, Math.PI * 2);
      ctx.fill();

      // Safe shield pulse on player when blast triggers
      if (isBlast) {
        const sp = (cycle - 1650) / 700;
        drawHitRing(ctx, px, py, 6 + sp * 14, '#10b981', 1 - sp);
      }

      drawCrosshair(ctx, px, py, 5.5, '#ffffff');

      ctx.fillStyle = isBlast ? '#10b981' : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isBlast ? 'EVADED BLAST (+100 PTS)' : 'WARNING: DETONATION IMMINENT', w * 0.5, h * 0.92);
    }
  },

  // 51. AGILITY-LADDER: Descending rungs with rhythmic alternating footwork (agility-ladder)
  'agility-ladder': {
    id: 'agility-ladder',
    label: 'Motor Agility Ladder',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 950) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const lw = w * 0.38;
      const lx = (w - lw) / 2;
      const rungSpacing = h * 0.22;
      const scrollOffset = (cycle * 0.05) % rungSpacing;

      // Draw ladder vertical rails
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(lx, 0);
      ctx.lineTo(lx, h);
      ctx.moveTo(lx + lw, 0);
      ctx.lineTo(lx + lw, h);
      ctx.stroke();

      // Draw scrolling rungs
      ctx.strokeStyle = dim || 'rgba(244, 63, 94, 0.18)';
      ctx.lineWidth = 1;
      for (let y = -rungSpacing + scrollOffset; y < h + rungSpacing; y += rungSpacing) {
        ctx.beginPath();
        ctx.moveTo(lx, y);
        ctx.lineTo(lx + lw, y);
        ctx.stroke();
      }

      // 4 steps cadence (Left, Right, Left, Right)
      const stepTimes = [450, 1100, 1750, 2400];
      const isLeft = (stepIdx) => stepIdx % 2 === 0;

      // Current footstep index
      let curStep = 0;
      for (let i = 0; i < stepTimes.length; i++) {
        if (cycle >= stepTimes[i]) curStep = i;
      }

      const leftX = lx + lw * 0.28;
      const rightX = lx + lw * 0.72;
      const stepY = h * 0.50;

      // Crosshair / stepping indicator
      const nextStep = Math.min(stepTimes.length - 1, curStep + 1);
      const prevT = stepTimes[curStep];
      const nextT = stepTimes[nextStep];
      const prog = nextT > prevT ? Math.min(1, Math.max(0, (cycle - prevT) / (nextT - prevT))) : 0;
      const fromX = isLeft(curStep) ? leftX : rightX;
      const toX = isLeft(nextStep) ? leftX : rightX;
      const stepCurX = fromX + (toX - fromX) * easeInOutCubic(prog);

      // Hit rings on each step tap
      stepTimes.forEach((st, idx) => {
        if (cycle >= st && cycle < st + 500) {
          const hp = (cycle - st) / 500;
          const sx = isLeft(idx) ? leftX : rightX;
          drawHitRing(ctx, sx, stepY, 5 + hp * 18, accent, 1 - hp);
        }
      });

      // Active stepping foot/dot
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(stepCurX, stepY, 5, 0, Math.PI * 2);
      ctx.fill();

      drawCrosshair(ctx, stepCurX, stepY, 6, '#ffffff');

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CADENCE: 180 BPM (L-R-L-R)', w * 0.5, h * 0.90);
    }
  },

  // 52. JUMP-PARABOLA: Ground charge & mid-air parabolic steering intercept (jump-sequence)
  'jump-parabola': {
    id: 'jump-parabola',
    label: 'Aerial Vector Intercept',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 960) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const groundY = h * 0.80;
      const startX = w * 0.22;
      const targetX = w * 0.68;
      const targetY = h * 0.30;

      // Ground baseline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, groundY);
      ctx.lineTo(w * 0.9, groundY);
      ctx.stroke();

      // Floating aerial target
      const isIntercepted = cycle >= 1700 && cycle < 2300;
      if (!isIntercepted) {
        ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(targetX, targetY, 7.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        const ip = (cycle - 1700) / 600;
        drawHitRing(ctx, targetX, targetY, 8 + ip * 26, '#06b6d4', 1 - ip);
      }

      // Parabolic jump trajectory
      let px = startX;
      let py = groundY;

      if (cycle < 550) {
        // Charging on ground
        const chargeP = cycle / 550;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(startX, groundY - 5, 14 * (1 - chargeP * 0.5), 0, Math.PI * 2);
        ctx.stroke();
        py = groundY - 4;
      } else if (cycle < 1700) {
        // Airborne jump arc
        const p = (cycle - 550) / 1150;
        px = startX + (targetX - startX) * p;
        // Parabola: peaks at targetY
        py = groundY - 4 * (groundY - targetY) * p * (1 - 0.5 * p);

        // Faint flight trail
        ctx.strokeStyle = dim || 'rgba(244, 63, 94, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, groundY);
        for (let s = 0; s <= 10; s++) {
          const sp = (s / 10) * p;
          const sx = startX + (targetX - startX) * sp;
          const sy = groundY - 4 * (groundY - targetY) * sp * (1 - 0.5 * sp);
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      } else if (cycle < 2500) {
        // Falling back to ground
        const p = (cycle - 1700) / 800;
        px = targetX + (w * 0.82 - targetX) * p;
        py = targetY + (groundY - targetY) * (p * p);
      } else {
        px = w * 0.82;
        py = groundY - 4;
      }

      // Player orb
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(px, py, 5.5, 0, Math.PI * 2);
      ctx.fill();

      drawCrosshair(ctx, px, py, 5.5, '#ffffff');

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(cycle < 550 ? 'CHARGING JUMP (100%)' : (cycle < 1700 ? 'MID-AIR STEERING' : 'TARGET INTERCEPT!'), w * 0.5, h * 0.92);
    }
  },

  // 53. SPEED-RINGS: Shrinking rings vanishing under high burst flick tempo (speed-drill)
  'speed-rings': {
    id: 'speed-rings',
    label: 'Vanishing Target Acceleration',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 970) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const targets = [
        { x: w * 0.26, y: h * 0.38, start: 0, hit: 650, end: 850 },
        { x: w * 0.72, y: h * 0.40, start: 750, hit: 1450, end: 1650 },
        { x: w * 0.48, y: h * 0.68, start: 1550, hit: 2250, end: 2450 },
      ];

      // Draw shrinking rings
      targets.forEach((tgt) => {
        if (cycle >= tgt.start && cycle < tgt.hit) {
          const age = cycle - tgt.start;
          const maxAge = tgt.hit - tgt.start;
          const shrinkRadius = Math.max(6, 22 * (1 - age / (maxAge * 1.3)));

          // Inner core
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 5, 0, Math.PI * 2);
          ctx.fill();

          // Shrinking perimeter ring
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, shrinkRadius, 0, Math.PI * 2);
          ctx.stroke();
        } else if (cycle >= tgt.hit && cycle < tgt.end) {
          // Hit flash burst
          const hp = (cycle - tgt.hit) / (tgt.end - tgt.hit);
          drawHitRing(ctx, tgt.x, tgt.y, 6 + hp * 22, accent, 1 - hp);
        }
      });

      // Crosshair flicking between targets
      let curX = targets[0].x;
      let curY = targets[0].y;

      if (cycle < 650) {
        curX = targets[0].x;
        curY = targets[0].y;
      } else if (cycle < 1450) {
        const p = easeInOutCubic(Math.min(1, (cycle - 650) / 450));
        curX = targets[0].x + (targets[1].x - targets[0].x) * p;
        curY = targets[0].y + (targets[1].y - targets[0].y) * p;
      } else if (cycle < 2250) {
        const p = easeInOutCubic(Math.min(1, (cycle - 1450) / 450));
        curX = targets[1].x + (targets[2].x - targets[1].x) * p;
        curY = targets[1].y + (targets[2].y - targets[1].y) * p;
      } else {
        curX = targets[2].x;
        curY = targets[2].y;
      }

      drawCrosshair(ctx, curX, curY, 7, '#ffffff');

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('VANISHING TARGET BURST: 3.4/S', w * 0.5, h * 0.90);
    }
  },

  // 54. DROP-CATCH: Catch falling green items & let red decoy traps pass (drop-catch)
  'drop-catch': {
    id: 'drop-catch',
    label: 'Drop Catch & Decoy Avoidance',
    draw(ctx, { t, w, h, dim, seed = 0 }) {
      const cycle = (t + seed * 980) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const catchY = h * 0.62;
      const baselineY = h * 0.85;

      // Bottom baseline catcher line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, baselineY);
      ctx.lineTo(w * 0.9, baselineY);
      ctx.stroke();

      // Target 1: Green drop at x = w * 0.36
      const g1X = w * 0.36;
      if (cycle < 1200) {
        const p = cycle / 1200;
        const gy = p * catchY;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(g1X, gy, 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (cycle < 1600) {
        const hp = (cycle - 1200) / 400;
        drawHitRing(ctx, g1X, catchY, 6 + hp * 22, '#10b981', 1 - hp);
      }

      // Target 2: Red decoy drop at x = w * 0.64 (falls completely without click)
      const rX = w * 0.64;
      if (cycle >= 300 && cycle < 2400) {
        const p = (cycle - 300) / 2100;
        const ry = p * baselineY;
        // Red decoy with spike warning ticks
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(rX, ry, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.strokeRect(rX - 8, ry - 8, 16, 16);
      }

      // Target 3: Second green drop at x = w * 0.50
      const g2X = w * 0.50;
      if (cycle >= 1400 && cycle < 2500) {
        const p = (cycle - 1400) / 1100;
        const gy = p * catchY;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(g2X, gy, 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (cycle >= 2500 && cycle < 2900) {
        const hp = (cycle - 2500) / 400;
        drawHitRing(ctx, g2X, catchY, 6 + hp * 22, '#10b981', 1 - hp);
      }

      // Crosshair tracking: moves to G1 at 1200ms, ignores Red decoy, moves to G2 at 2500ms
      let chX = g1X;
      let chY = catchY;

      if (cycle < 1200) {
        chX = g1X;
      } else if (cycle < 2500) {
        const p = easeInOutCubic(Math.min(1, (cycle - 1300) / 600));
        chX = g1X + (g2X - g1X) * p;
      } else {
        chX = g2X;
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');

      ctx.fillStyle = '#10b981';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CATCH GREEN · EVADE RED DECOYS', w * 0.5, h * 0.92);
    }
  },

  // 55. PERIPHERAL-SWEEP: Central fixation crosshair sweeping inward radial perimeter threats (peripheral-threat-sweeper)
  'peripheral-sweep': {
    id: 'peripheral-sweep',
    label: 'Perimeter Radial Scan',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 990) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cx = w * 0.5;
      const cy = h * 0.5;

      // Defense core perimeter ring
      ctx.strokeStyle = dim || 'rgba(244, 63, 94, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Outer radar sweep circle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.42, 0, Math.PI * 2);
      ctx.stroke();

      // Threat 1: Top-Right perimeter threat
      const t1Start = { x: cx + w * 0.36, y: cy - h * 0.32 };
      const t1Intercept = { x: cx + w * 0.20, y: cy - h * 0.18 };
      if (cycle < 1000) {
        const p = cycle / 1000;
        const tx = t1Start.x + (t1Intercept.x - t1Start.x) * p;
        const ty = t1Start.y + (t1Intercept.y - t1Start.y) * p;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(tx, ty, 5.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (cycle < 1400) {
        const hp = (cycle - 1000) / 400;
        drawHitRing(ctx, t1Intercept.x, t1Intercept.y, 6 + hp * 22, accent, 1 - hp);
      }

      // Threat 2: Bottom-Left perimeter threat
      const t2Start = { x: cx - w * 0.36, y: cy + h * 0.30 };
      const t2Intercept = { x: cx - w * 0.20, y: cy + h * 0.16 };
      if (cycle >= 1000 && cycle < 2200) {
        const p = (cycle - 1000) / 1200;
        const tx = t2Start.x + (t2Intercept.x - t2Start.x) * p;
        const ty = t2Start.y + (t2Intercept.y - t2Start.y) * p;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(tx, ty, 5.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (cycle >= 2200 && cycle < 2600) {
        const hp = (cycle - 2200) / 400;
        drawHitRing(ctx, t2Intercept.x, t2Intercept.y, 6 + hp * 22, accent, 1 - hp);
      }

      // Crosshair: sits in center, snaps out to T1 at 1000ms, back to center, snaps out to T2 at 2200ms
      let chX = cx;
      let chY = cy;

      if (cycle < 750) {
        chX = cx;
        chY = cy;
      } else if (cycle < 1000) {
        const p = easeInOutCubic((cycle - 750) / 250);
        chX = cx + (t1Intercept.x - cx) * p;
        chY = cy + (t1Intercept.y - cy) * p;
      } else if (cycle < 1400) {
        chX = t1Intercept.x;
        chY = t1Intercept.y;
      } else if (cycle < 1700) {
        const p = easeInOutCubic((cycle - 1400) / 300);
        chX = t1Intercept.x + (cx - t1Intercept.x) * p;
        chY = t1Intercept.y + (cy - t1Intercept.y) * p;
      } else if (cycle < 2200) {
        const p = easeInOutCubic((cycle - 1950) / 250);
        chX = cx + (t2Intercept.x - cx) * p;
        chY = cy + (t2Intercept.y - cy) * p;
      } else if (cycle < 2600) {
        chX = t2Intercept.x;
        chY = t2Intercept.y;
      } else {
        const p = easeInOutCubic((cycle - 2600) / 300);
        chX = t2Intercept.x + (cx - t2Intercept.x) * p;
        chY = t2Intercept.y + (cy - t2Intercept.y) * p;
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PERIMETER RADIAL INTERCEPT', cx, h * 0.90);
    }
  },

  // 56. QUICK-DODGE: Fluid cursor evasion weaving between dynamic homing obstacles (quick-dodge)
  'quick-dodge': {
    id: 'quick-dodge',
    label: 'Reflex Chaos Evasion',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 1000) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.5;

      // Player orb weaves smoothly in figure/curve
      const angle = (cycle / 3200) * Math.PI * 2;
      const px = midX + Math.sin(angle) * (w * 0.22);
      const py = midY + Math.cos(angle * 2) * (h * 0.22);

      // 3 red homing threat obstacles converging
      const threats = [
        { startX: w * 0.15, startY: h * 0.15, speed: 0.9 },
        { startX: w * 0.85, startY: h * 0.25, speed: 1.1 },
        { startX: w * 0.80, startY: h * 0.80, speed: 1.0 },
      ];

      threats.forEach((th, idx) => {
        const tp = ((cycle * 0.0008 * th.speed) + idx * 0.33) % 1.0;
        const tx = th.startX + (px - th.startX) * tp * 0.85;
        const ty = th.startY + (py - th.startY) * tp * 0.85;

        // Threat chevron / spike
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(tx, ty, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Velocity trail
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(th.startX, th.startY);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      });

      // Player orb
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      // Near miss shock halo
      if (cycle >= 1400 && cycle < 1900) {
        const p = (cycle - 1400) / 500;
        drawHitRing(ctx, px, py, 7 + p * 16, accent, 1 - p);
      }

      drawCrosshair(ctx, px, py, 6.5, '#ffffff');

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('EVASION STREAK: 100% COLLISION FREE', midX, h * 0.90);
    }
  },

  // 57. KINETIC-ARREST: Snap deceleration & complete cursor freeze over flying node (reaction-chain)
  'kinetic-arrest': {
    id: 'kinetic-arrest',
    label: 'Reaction Chain Kinetic Arrest',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 1010) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midY = h * 0.50;
      const arrestX = w * 0.52;

      // Incoming node flies from left to right
      let nodeX = w * 0.12;
      const isFlying = cycle < 1100;
      const isArrested = cycle >= 1100 && cycle < 2400;

      if (isFlying) {
        const p = easeInOutCubic(cycle / 1100);
        nodeX = w * 0.12 + (arrestX - w * 0.12) * p;
      } else {
        nodeX = arrestX;
      }

      // Flying trail
      if (isFlying) {
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(w * 0.12, midY);
        ctx.lineTo(nodeX, midY);
        ctx.stroke();
      }

      // Target node
      ctx.fillStyle = isArrested ? '#10b981' : accent;
      ctx.beginPath();
      ctx.arc(nodeX, midY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair position
      let chX = isFlying ? (cycle > 600 ? nodeX : arrestX) : arrestX;

      if (isArrested) {
        // Arrest lock brackets around the node: [  ]
        const bracketP = Math.min(1, (cycle - 1100) / 200);
        const gap = 12 - bracketP * 3;
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        // Left bracket [
        ctx.beginPath();
        ctx.moveTo(nodeX - gap + 3, midY - 8);
        ctx.lineTo(nodeX - gap, midY - 8);
        ctx.lineTo(nodeX - gap, midY + 8);
        ctx.lineTo(nodeX - gap + 3, midY + 8);
        // Right bracket ]
        ctx.moveTo(nodeX + gap - 3, midY - 8);
        ctx.lineTo(nodeX + gap, midY - 8);
        ctx.lineTo(nodeX + gap, midY + 8);
        ctx.lineTo(nodeX + gap - 3, midY + 8);
        ctx.stroke();

        // Lock damping pulse
        if (cycle < 1700) {
          const lp = (cycle - 1100) / 600;
          drawHitRing(ctx, nodeX, midY, 8 + lp * 24, '#10b981', 1 - lp);
        }
      }

      drawCrosshair(ctx, chX, midY, 7, isArrested ? '#10b981' : '#ffffff');

      ctx.fillStyle = isArrested ? '#10b981' : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isArrested ? 'ARREST LOCKED (VELOCITY: 0.0 PX/S)' : 'DECELERATION BRAKE READY', w * 0.5, h * 0.90);
    }
  },

  // ---------------- VISUAL TRACKING PREVIEW SCENES (58–72) ----------------

  // 58. LISSAJOUS-SLOW: Low-velocity continuous Lissajous curve pursuit with micro-catchup saccade (constant-slow-pursuit)
  'lissajous-slow': {
    id: 'lissajous-slow',
    label: 'Low Velocity Lissajous Pursuit',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 950) % 3600;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;
      const rx = w * 0.36;
      const ry = h * 0.30;

      // Draw faint Lissajous track
      ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const steps = 72;
      for (let i = 0; i <= steps; i++) {
        const ang = (i / steps) * Math.PI * 2;
        const ox = midX + Math.cos(ang * 3) * rx;
        const oy = midY + Math.sin(ang * 4) * ry;
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
      }
      ctx.stroke();

      // Target position
      const ang = (cycle / 3600) * Math.PI * 2;
      const tgtX = midX + Math.cos(ang * 3) * rx;
      const tgtY = midY + Math.sin(ang * 4) * ry;

      // Draw target orb with outer ring
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Subtle micro-catchup saccade lag simulation every 1200ms
      const sub = cycle % 1200;
      let chX = tgtX;
      let chY = tgtY;
      if (sub < 160) {
        const lagP = sub / 160;
        chX = tgtX - Math.sin(ang * 3) * 5 * (1 - lagP);
        chY = tgtY - Math.cos(ang * 4) * 4 * (1 - lagP);
      }

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PURSUIT GAIN: 0.98 (SMOOTH)', midX, h * 0.90);
    },
  },

  // 59. DIRECTIONAL-CHAOS: Erratic unpredictable motion with continuous random velocity nudges (directional-chaos-pursuit)
  'directional-chaos': {
    id: 'directional-chaos',
    label: 'Erratic Motion Pursuit',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 920) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;

      // Multi-harmonic chaotic trajectory
      const sec = cycle * 0.001;
      const tgtX = midX + (Math.sin(sec * 2.1) * 0.32 + Math.sin(sec * 4.7) * 0.10 + Math.cos(sec * 1.3) * 0.05) * w;
      const tgtY = midY + (Math.cos(sec * 2.7) * 0.28 + Math.cos(sec * 5.3) * 0.08 + Math.sin(sec * 1.9) * 0.05) * h;

      // Trailing erratic motion breadcrumbs
      ctx.fillStyle = dim || 'rgba(6, 182, 212, 0.2)';
      for (let i = 1; i <= 3; i++) {
        const pastSec = Math.max(0, sec - i * 0.08);
        const px = midX + (Math.sin(pastSec * 2.1) * 0.32 + Math.sin(pastSec * 4.7) * 0.10 + Math.cos(pastSec * 1.3) * 0.05) * w;
        const py = midY + (Math.cos(pastSec * 2.7) * 0.28 + Math.cos(pastSec * 5.3) * 0.08 + Math.sin(pastSec * 1.9) * 0.05) * h;
        ctx.beginPath();
        ctx.arc(px, py, 4 - i * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Chaotic target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Velocity jitter vector indicator
      const vx = Math.cos(sec * 4.7) * 12;
      const vy = -Math.sin(sec * 5.3) * 12;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(tgtX, tgtY);
      ctx.lineTo(tgtX + vx, tgtY + vy);
      ctx.stroke();

      // Crosshair with recovery latency
      const latSec = Math.max(0, sec - 0.09);
      const chX = midX + (Math.sin(latSec * 2.1) * 0.32 + Math.sin(latSec * 4.7) * 0.10 + Math.cos(latSec * 1.3) * 0.05) * w;
      const chY = midY + (Math.cos(latSec * 2.7) * 0.28 + Math.cos(latSec * 5.3) * 0.08 + Math.sin(latSec * 1.9) * 0.05) * h;

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('RECOVERY LATENCY: 138MS', midX, h * 0.90);
    },
  },

  // 60. DYNAMIC-EVASION: Sudden 90° evasive heading cut with momentum overshoot recovery (dynamic-evasion-pursuit)
  'dynamic-evasion': {
    id: 'dynamic-evasion',
    label: 'Sudden Evasive Cut',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 890) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const startX = w * 0.18;
      const startY = h * 0.34;
      const turnX = w * 0.68;
      const turnY = h * 0.34;
      const endX = w * 0.68;
      const endY = h * 0.74;

      // Draw faint guide paths
      ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(turnX, turnY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Evasion corner node marker
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.beginPath();
      ctx.arc(turnX, turnY, 3, 0, Math.PI * 2);
      ctx.fill();

      let tgtX, tgtY, chX, chY;

      if (cycle < 1300) {
        // Phase 1: Steady linear glide to turn point
        const p = cycle / 1300;
        tgtX = startX + (turnX - startX) * p;
        tgtY = startY;
        chX = tgtX;
        chY = tgtY;
      } else if (cycle < 1700) {
        // Phase 2: Sudden 90° cut downward + Crosshair overshoot
        const p = (cycle - 1300) / 400;
        tgtX = turnX;
        tgtY = turnY + (endY - turnY) * p;

        // Crosshair overshoots along previous heading then recovers downward
        const overP = Math.sin(p * Math.PI);
        chX = turnX + overP * 14;
        chY = turnY + (endY - turnY) * Math.pow(p, 2);

        // Turn ripple burst
        if (cycle < 1550) {
          const rp = (cycle - 1300) / 250;
          drawHitRing(ctx, turnX, turnY, 6 + rp * 18, accent, 1 - rp);
        }
      } else if (cycle < 2500) {
        // Phase 3: Steady vertical pursuit downward
        const p = (cycle - 1700) / 800;
        tgtX = turnX;
        tgtY = turnY + (endY - turnY) * (0.5 + p * 0.5);
        chX = tgtX;
        chY = tgtY;
      } else {
        // Phase 4: Smooth reset glide
        const p = (cycle - 2500) / 700;
        const ep = easeInOutCubic(p);
        tgtX = endX + (startX - endX) * ep;
        tgtY = endY + (startY - endY) * ep;
        chX = tgtX;
        chY = tgtY;
      }

      // Target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');

      // Cut angle badge
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(cycle >= 1300 && cycle < 2000 ? '90° CUT DETECTED: SNAP' : 'EVASIVE TURN: READY', w * 0.5, h * 0.90);
    },
  },

  // 61. GHOSTING-SUPPRESS: Target with trailing decaying ghost copies; fixation locked on leading edge (ghosting-suppress-pursuit)
  'ghosting-suppress': {
    id: 'ghosting-suppress',
    label: 'Ghosting Suppression',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 940) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;

      // High-speed horizontal sweep
      const p = 0.5 - 0.5 * Math.cos((cycle / 2800) * Math.PI * 2);
      const tgtX = w * 0.18 + p * (w * 0.64);
      const tgtY = midY + Math.sin(p * Math.PI) * (h * 0.18);

      // Trailing ghost duplicates (simulating display persistence & afterimages)
      const isMovingRight = Math.sin((cycle / 2800) * Math.PI * 2) > 0;
      const ghostDirection = isMovingRight ? -1 : 1;

      for (let g = 3; g >= 1; g--) {
        const gx = tgtX + ghostDirection * g * 14;
        const gy = tgtY;
        const ghostAlpha = 0.38 - g * 0.10;

        ctx.fillStyle = accent;
        ctx.globalAlpha = ghostAlpha;
        ctx.beginPath();
        ctx.arc(gx, gy, 6 - g * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Ghost smear blur lines
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(gx - 4, gy);
        ctx.lineTo(gx + 4, gy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // True leading edge target
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Reticle locked exclusively onto the true leading target
      drawCrosshair(ctx, tgtX, tgtY, 8, accent);

      // Suppression lock brackets around the true target
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tgtX - 10, tgtY - 5);
      ctx.lineTo(tgtX - 10, tgtY + 5);
      ctx.moveTo(tgtX + 10, tgtY - 5);
      ctx.lineTo(tgtX + 10, tgtY + 5);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('AFTERIMAGE FILTER: SUPPRESSED', midX, h * 0.90);
    },
  },

  // 62. INFINITY-LOOP: Figure-8 lemniscate tracking with crossing midline and curvature reversals (infinity-pursuit)
  'infinity-loop': {
    id: 'infinity-loop',
    label: 'Midline Lemniscate Pursuit',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 910) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;
      const rx = w * 0.32;
      const ry = h * 0.28;

      // Vertical dashed midline axis (the core transfer zone)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(midX, h * 0.12);
      ctx.lineTo(midX, h * 0.84);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw continuous figure-8 lemniscate track
      ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const steps = 64;
      for (let i = 0; i <= steps; i++) {
        const ang = (i / steps) * Math.PI * 2;
        const ox = midX + Math.sin(ang) * rx;
        const oy = midY + Math.sin(ang * 2) * (ry * 0.85);
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
      }
      ctx.stroke();

      // Current target position along figure-8
      const ang = (cycle / 3200) * Math.PI * 2;
      const tgtX = midX + Math.sin(ang) * rx;
      const tgtY = midY + Math.sin(ang * 2) * (ry * 0.85);

      // Midline crossing pulse
      const distToMid = Math.abs(tgtX - midX);
      const isCrossing = distToMid < 6;
      if (isCrossing) {
        drawHitRing(ctx, midX, midY, 14, accent, 0.6);
      }

      // Target core
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      drawCrosshair(ctx, tgtX, tgtY, 7, '#ffffff');

      ctx.fillStyle = isCrossing ? accent : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isCrossing ? 'MIDLINE HANDOFF: ACTIVE' : 'FIGURE-8 PURSUIT: LOCKED', midX, h * 0.90);
    },
  },

  // 63. MOMENTUM-TELEPORT: Target preserves velocity vector across sudden quantum teleport (momentum-teleport-pursuit)
  'momentum-teleport': {
    id: 'momentum-teleport',
    label: 'Momentum Teleport Pursuit',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 960) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;

      // Phase 1: 0–1200ms -> vector 1: from (0.16*w, 0.72*h) to (0.46*w, 0.42*h)
      // Phase 2: 1200–2600ms -> teleport to (0.34*w, 0.66*h) -> continue along IDENTICAL heading to (0.84*w, 0.26*h)
      const v1Start = { x: w * 0.16, y: h * 0.72 };
      const v1End = { x: w * 0.46, y: h * 0.42 };
      const v2Start = { x: w * 0.34, y: h * 0.68 };
      const v2End = { x: w * 0.84, y: h * 0.28 };

      // Draw faint trajectory vectors
      ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(v1Start.x, v1Start.y);
      ctx.lineTo(v1End.x, v1End.y);
      ctx.moveTo(v2Start.x, v2Start.y);
      ctx.lineTo(v2End.x, v2End.y);
      ctx.stroke();

      let tgtX, tgtY, chX, chY;
      const isTeleporting = cycle >= 1200 && cycle < 1450;

      if (cycle < 1200) {
        const p = cycle / 1200;
        tgtX = v1Start.x + (v1End.x - v1Start.x) * p;
        tgtY = v1Start.y + (v1End.y - v1Start.y) * p;
        chX = tgtX;
        chY = tgtY;
      } else if (cycle < 2600) {
        const p = (cycle - 1200) / 1400;
        tgtX = v2Start.x + (v2End.x - v2Start.x) * p;
        tgtY = v2Start.y + (v2End.y - v2Start.y) * p;

        // Crosshair snaps from v1End to new position over 200ms
        if (cycle < 1400) {
          const sp = (cycle - 1200) / 200;
          const ep = easeInOutCubic(sp);
          chX = v1End.x + (tgtX - v1End.x) * ep;
          chY = v1End.y + (tgtY - v1End.y) * ep;
        } else {
          chX = tgtX;
          chY = tgtY;
        }
      } else {
        // Reset loop
        const p = (cycle - 2600) / 400;
        tgtX = v2End.x + (v1Start.x - v2End.x) * p;
        tgtY = v2End.y + (v1Start.y - v2End.y) * p;
        chX = tgtX;
        chY = tgtY;
      }

      // Teleport visual effects
      if (cycle >= 1200 && cycle < 1550) {
        const tp = (cycle - 1200) / 350;
        // Vanish ring at v1End
        drawHitRing(ctx, v1End.x, v1End.y, 6 + tp * 20, '#ef4444', 1 - tp);
        // Entry arrival ring at v2Start
        drawHitRing(ctx, v2Start.x, v2Start.y, 6 + tp * 24, accent, 1 - tp);
      }

      // Target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Heading vector arrow
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tgtX, tgtY);
      ctx.lineTo(tgtX + 10, tgtY - 9);
      ctx.stroke();

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');

      ctx.fillStyle = isTeleporting ? accent : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(cycle >= 1200 && cycle < 1700 ? 'POSITION TELEPORT: VECTOR LOCKED' : 'MOMENTUM PRESERVED: 320 PX/S', midX, h * 0.90);
    },
  },

  // 64. PERIPHERAL-PING: Steady central fixation while peripheral stimuli ping at screen perimeter (peripheral-ping-pursuit)
  'peripheral-ping': {
    id: 'peripheral-ping',
    label: 'Peripheral Ping Suppression',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 970) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;

      // 3 Peripheral nodes at the corners
      const nodes = [
        { x: w * 0.16, y: h * 0.24, start: 400, end: 1200 },
        { x: w * 0.84, y: h * 0.72, start: 1300, end: 2100 },
        { x: w * 0.82, y: h * 0.26, start: 2200, end: 2950 },
      ];

      // Draw faint peripheral radar circles
      nodes.forEach((n) => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Active peripheral ping
      nodes.forEach((n) => {
        if (cycle >= n.start && cycle < n.end) {
          // Blooming peripheral stimulus
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 7, 0, Math.PI * 2);
          ctx.fill();

          // Expanding radar ripple
          const p = (cycle - n.start) / (n.end - n.start);
          drawHitRing(ctx, n.x, n.y, 7 + p * 22, accent, 1 - p);

          // Subtle peripheral detection beam connecting center to active ping
          ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.15)';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(midX, midY);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // FIXED CENTRAL RETICLE: Stays locked at screen center (suppresses saccadic reflex)
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(midX, midY, 14, 0, Math.PI * 2);
      ctx.stroke();

      drawCrosshair(ctx, midX, midY, 8, '#ffffff');

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CENTRAL FIXATION: 100% (STABLE)', midX, h * 0.90);
    },
  },

  // 65. PREDICTIVE-LEAD: Trajectory interpolation where crosshair anticipates and leads ahead of the target (predictive-pursuit)
  'predictive-lead': {
    id: 'predictive-lead',
    label: 'Trajectory Interpolation Lead',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 930) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;

      // Smooth sweeping wave arc
      const p = (cycle / 3000);
      const tgtX = w * 0.15 + p * (w * 0.70);
      const tgtY = midY + Math.sin(p * Math.PI * 2) * (h * 0.24);

      // Lookahead lead crosshair (positioned +120ms ahead of target)
      const leadP = Math.min(1, p + 0.12);
      const leadX = w * 0.15 + leadP * (w * 0.70);
      const leadY = midY + Math.sin(leadP * Math.PI * 2) * (h * 0.24);

      // Dashed lookahead trajectory projection line
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(tgtX, tgtY);
      ctx.lineTo(leadX, leadY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target orb
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Lead reticle waiting ahead
      drawCrosshair(ctx, leadX, leadY, 7, '#ffffff');

      // Lead bracket
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(leadX, leadY, 11, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TRAJECTORY LEAD: +180MS ANTICIPATED', midX, h * 0.90);
    },
  },

  // 66. SINE-WAVE: Rhythmic horizontal sinusoidal wave pursuit with reversal deceleration (sine-wave-pursuit)
  'sine-wave': {
    id: 'sine-wave',
    label: 'Rhythmic Sine Wave Pursuit',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 905) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;
      const amp = h * 0.26;
      const startX = w * 0.16;
      const spanX = w * 0.68;

      // Draw continuous sine wave path
      ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const ox = startX + (i / steps) * spanX;
        const oy = midY + Math.sin(((ox - startX) / spanX) * Math.PI * 2) * amp;
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
      }
      ctx.stroke();

      // Oscillating target
      const p = 0.5 - 0.5 * Math.cos((cycle / 3000) * Math.PI * 2);
      const tgtX = startX + p * spanX;
      const tgtY = midY + Math.sin(p * Math.PI * 2) * amp;

      // Target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair tracking smoothly
      drawCrosshair(ctx, tgtX, tgtY, 7, '#ffffff');

      // Peak & trough reversal indicators
      const isReversing = p < 0.05 || p > 0.95;
      if (isReversing) {
        drawHitRing(ctx, tgtX, tgtY, 12, accent, 0.5);
      }

      ctx.fillStyle = isReversing ? accent : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isReversing ? 'REVERSAL DECEL: 0.0 PX/S' : 'RHYTHMIC PURSUIT: SYNCED', midX, h * 0.90);
    },
  },

  // 67. SPATIAL-SHIFT: Target suddenly shifts trajectory and speed, testing fast expectation abandonment (spatial-shift-pursuit)
  'spatial-shift': {
    id: 'spatial-shift',
    label: 'Spatial Shift Deflection',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 880) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const p0 = { x: w * 0.16, y: h * 0.38 };
      const pShift = { x: w * 0.50, y: h * 0.38 };
      const pStale = { x: w * 0.84, y: h * 0.38 }; // Stale prediction continues horizontally
      const pActual = { x: w * 0.82, y: h * 0.74 }; // Actual trajectory shifts down-right

      // Draw faint initial path + deflected path
      ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(pShift.x, pShift.y);
      ctx.lineTo(pActual.x, pActual.y);
      ctx.stroke();

      // Stale ghost trajectory projection (the invalid expectation)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(pShift.x, pShift.y);
      ctx.lineTo(pStale.x, pStale.y);
      ctx.stroke();
      ctx.setLineDash([]);

      let tgtX, tgtY, chX, chY;
      const isShifted = cycle >= 1200;

      if (cycle < 1200) {
        const p = cycle / 1200;
        tgtX = p0.x + (pShift.x - p0.x) * p;
        tgtY = p0.y;
        chX = tgtX;
        chY = tgtY;
      } else if (cycle < 2500) {
        const p = (cycle - 1200) / 1300;
        tgtX = pShift.x + (pActual.x - pShift.x) * p;
        tgtY = pShift.y + (pActual.y - pShift.y) * p;

        // Crosshair briefly lags toward stale vector then snaps onto deflected path
        if (cycle < 1450) {
          const sp = (cycle - 1200) / 250;
          const staleX = pShift.x + (pStale.x - pShift.x) * sp;
          chX = staleX + (tgtX - staleX) * easeInOutCubic(sp);
          chY = pShift.y + (tgtY - pShift.y) * easeInOutCubic(sp);
        } else {
          chX = tgtX;
          chY = tgtY;
        }
      } else {
        const p = (cycle - 2500) / 500;
        tgtX = pActual.x + (p0.x - pActual.x) * p;
        tgtY = pActual.y + (p0.y - pActual.y) * p;
        chX = tgtX;
        chY = tgtY;
      }

      // Shift impulse ring at turn node
      if (cycle >= 1200 && cycle < 1550) {
        const sp = (cycle - 1200) / 350;
        drawHitRing(ctx, pShift.x, pShift.y, 6 + sp * 22, accent, 1 - sp);
      }

      // Target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');

      ctx.fillStyle = isShifted ? accent : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(cycle >= 1200 && cycle < 1800 ? 'STALE EXPECTATION ABANDONED' : 'SPATIAL DEFLECTION: ADAPTED', midX, h * 0.90);
    },
  },

  // 68. SPLIT-SCREEN: Divided visual attention across split screen with bilateral peripheral monitoring (split-screen-tracking)
  'split-screen': {
    id: 'split-screen',
    label: 'Divided Attention Split Tracking',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 915) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;

      // Vertical dividing line down center (separating Sector A and Sector B)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(midX, h * 0.10);
      ctx.lineTo(midX, h * 0.84);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sector labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '6px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SECTOR L', w * 0.25, h * 0.16);
      ctx.fillText('SECTOR R', w * 0.75, h * 0.16);

      // Target L: Oscillates vertically in Sector L
      const lY = midY + Math.sin((cycle / 3200) * Math.PI * 4) * (h * 0.26);
      const lX = w * 0.25;

      // Target R: Oscillates diagonally in Sector R
      const rP = (cycle / 3200) * Math.PI * 2;
      const rX = w * 0.75 + Math.cos(rP * 2) * (w * 0.12);
      const rY = midY + Math.sin(rP * 3) * (h * 0.24);

      // Target L & Target R orbs
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(lX, lY, 5.5, 0, Math.PI * 2);
      ctx.arc(rX, rY, 5.5, 0, Math.PI * 2);
      ctx.fill();

      // Center fixation reticle (monitoring both simultaneously)
      drawCrosshair(ctx, midX, midY, 8, '#ffffff');

      // Bilateral radar monitoring beams from center to both targets
      ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(midX, midY);
      ctx.lineTo(lX, lY);
      ctx.moveTo(midX, midY);
      ctx.lineTo(rX, rY);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BILATERAL PURSUIT: 2 TARGETS', midX, h * 0.90);
    },
  },

  // 69. STAIRCASE-STEP: Vertical eye tracking across multi-segment staircase elevation steps (staircase-step)
  'staircase-step': {
    id: 'staircase-step',
    label: 'Vertical Staircase Elevation',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 925) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;

      // 4 Staircase step points (tread -> riser)
      const steps = [
        { x: w * 0.16, y: h * 0.76 },
        { x: w * 0.36, y: h * 0.76 },
        { x: w * 0.36, y: h * 0.54 },
        { x: w * 0.56, y: h * 0.54 },
        { x: w * 0.56, y: h * 0.32 },
        { x: w * 0.76, y: h * 0.32 },
        { x: w * 0.76, y: h * 0.18 },
      ];

      // Draw staircase outline
      ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(steps[0].x, steps[0].y);
      for (let i = 1; i < steps.length; i++) {
        ctx.lineTo(steps[i].x, steps[i].y);
      }
      ctx.stroke();

      // Step nodes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      steps.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Traversal across segments
      const segCount = steps.length - 1;
      const p = (cycle / 3200) % 1;
      const segIdx = Math.min(segCount - 1, Math.floor(p * segCount));
      const segT = (p * segCount) - segIdx;

      const p0 = steps[segIdx];
      const p1 = steps[segIdx + 1];
      const tgtX = p0.x + (p1.x - p0.x) * segT;
      const tgtY = p0.y + (p1.y - p0.y) * segT;

      // Target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair tracking with vertical emphasis
      drawCrosshair(ctx, tgtX, tgtY, 7, '#ffffff');

      // Elevation meter tick
      const isVerticalRiser = Math.abs(p0.x - p1.x) < 2;
      ctx.fillStyle = isVerticalRiser ? accent : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isVerticalRiser ? 'VERTICAL RISER: ELEVATION GAIN' : 'HORIZONTAL TREAD: TRACKING', midX, h * 0.90);
    },
  },

  // 70. STROBE-OCCLUSION: Intermittent visual blackout / occlusion gap with predictive trajectory bridging (strobe-prediction-pursuit)
  'strobe-occlusion': {
    id: 'strobe-occlusion',
    label: 'Cyclic Strobe Occlusion',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 935) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;

      // Occlusion corridor in center (w * 0.38 to w * 0.62)
      const occLeft = w * 0.38;
      const occRight = w * 0.62;
      const occTop = h * 0.16;
      const occHeight = h * 0.64;

      // Draw shaded occlusion corridor
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(occLeft, occTop, occRight - occLeft, occHeight);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(occLeft, occTop, occRight - occLeft, occHeight);

      // Hazard hatch lines inside occlusion box
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = occLeft + 8; x < occRight; x += 12) {
        ctx.moveTo(x, occTop);
        ctx.lineTo(x - 8, occTop + occHeight);
      }
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '6px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('OCCLUSION ZONE', midX, occTop + 10);

      // Trajectory horizontal sweep
      const p = (cycle / 3000);
      const tgtX = w * 0.16 + p * (w * 0.68);
      const tgtY = midY;

      const isOccluded = tgtX >= occLeft && tgtX <= occRight;

      // Predictive trajectory bridge (dashed across occlusion)
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(w * 0.16, midY);
      ctx.lineTo(w * 0.84, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target: Hidden while inside occlusion zone!
      if (!isOccluded) {
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Crosshair continues forward without visual feedback based purely on model prediction
      drawCrosshair(ctx, tgtX, tgtY, 7, isOccluded ? '#ffffff' : accent);

      ctx.fillStyle = isOccluded ? accent : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isOccluded ? 'VISUAL BLACKOUT: PREDICTION ACTIVE' : 'RE-ACQUIRED POST-OCCLUSION', midX, h * 0.90);
    },
  },

  // 71. TRIANGULAR-TRACK: Closed triangular pursuit with sharp vertex corners and momentum recovery (triangular-pursuit)
  'triangular-track': {
    id: 'triangular-track',
    label: 'Sharp Triangular Apex Pursuit',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 945) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;

      const v0 = { x: midX, y: h * 0.22 }; // Top apex
      const v1 = { x: w * 0.82, y: h * 0.74 }; // Bottom right
      const v2 = { x: w * 0.18, y: h * 0.74 }; // Bottom left

      // Draw faint triangle outline
      ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(v0.x, v0.y);
      ctx.lineTo(v1.x, v1.y);
      ctx.lineTo(v2.x, v2.y);
      ctx.closePath();
      ctx.stroke();

      // Vertex anchor dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      [v0, v1, v2].forEach((v) => {
        ctx.beginPath();
        ctx.arc(v.x, v.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      let tgtX, tgtY, chX, chY;
      let isCorner = false;

      if (cycle < 1000) {
        // Edge 1: v0 -> v1
        const p = cycle / 1000;
        tgtX = v0.x + (v1.x - v0.x) * p;
        tgtY = v0.y + (v1.y - v0.y) * p;
        chX = tgtX;
        chY = tgtY;
      } else if (cycle < 2000) {
        // Edge 2: v1 -> v2
        const p = (cycle - 1000) / 1000;
        tgtX = v1.x + (v2.x - v1.x) * p;
        tgtY = v1.y + (v2.y - v1.y) * p;

        // Momentary corner overshoot at v1
        if (cycle < 1140) {
          isCorner = true;
          const cp = (cycle - 1000) / 140;
          const ep = easeInOutCubic(cp);
          chX = v1.x + 8 * (1 - ep) + (tgtX - v1.x) * ep;
          chY = v1.y + 6 * (1 - ep) + (tgtY - v1.y) * ep;
        } else {
          chX = tgtX;
          chY = tgtY;
        }
      } else {
        // Edge 3: v2 -> v0
        const p = (cycle - 2000) / 1000;
        tgtX = v2.x + (v0.x - v2.x) * p;
        tgtY = v2.y + (v0.y - v2.y) * p;

        // Momentary corner overshoot at v2
        if (cycle < 2140) {
          isCorner = true;
          const cp = (cycle - 2000) / 140;
          const ep = easeInOutCubic(cp);
          chX = v2.x - 8 * (1 - ep) + (tgtX - v2.x) * ep;
          chY = v2.y + 4 * (1 - ep) + (tgtY - v2.y) * ep;
        } else {
          chX = tgtX;
          chY = tgtY;
        }
      }

      // Target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      drawCrosshair(ctx, chX, chY, 7, '#ffffff');

      ctx.fillStyle = isCorner ? accent : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isCorner ? 'VERTEX CORNER: OVERSHOOT RECOVERED' : 'TRIANGULAR PURSUIT: LOCKED', midX, h * 0.90);
    },
  },

  // 72. ZIGZAG-PATH: Open irregular zig-zag with varied segment lengths and abrupt turns (zig-zag-path-pursuit)
  'zigzag-path': {
    id: 'zigzag-path',
    label: 'Irregular Zig-Zag Path',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 955) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;

      const pts = [
        { x: w * 0.16, y: h * 0.30 },
        { x: w * 0.38, y: h * 0.74 },
        { x: w * 0.52, y: h * 0.36 },
        { x: w * 0.70, y: h * 0.68 },
        { x: w * 0.84, y: h * 0.26 },
      ];

      // Draw faint irregular zig-zag track
      ctx.strokeStyle = dim || 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();

      // Corner anchor nodes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Target traversal across the 4 segments
      const segCount = pts.length - 1;
      const p = (cycle / 3200) % 1;
      const segIdx = Math.min(segCount - 1, Math.floor(p * segCount));
      const segT = (p * segCount) - segIdx;

      const p0 = pts[segIdx];
      const p1 = pts[segIdx + 1];
      const tgtX = p0.x + (p1.x - p0.x) * segT;
      const tgtY = p0.y + (p1.y - p0.y) * segT;

      // Target
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair tracking smoothly through sharp corners
      drawCrosshair(ctx, tgtX, tgtY, 7, '#ffffff');

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('IRREGULAR CORNERS: ADAPTIVE', midX, h * 0.90);
    },
  },

  // ---------------- VISUAL HUB PREVIEW SCENES (73–81) ----------------

  // 73. DEPTH-INTERCEPT: 3D perspective wireframe tunnel with moving depth sphere intercepted at target depth (distance-judgment)
  'depth-intercept': {
    id: 'depth-intercept',
    label: '3D Depth Intercept',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 960) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;

      // 3D perspective tunnel wireframe rectangles
      ctx.strokeStyle = dim || 'rgba(217, 70, 239, 0.15)';
      ctx.lineWidth = 1;
      const depths = [0.25, 0.5, 0.75, 1.0];
      depths.forEach((scale) => {
        const rw = w * 0.78 * scale;
        const rh = h * 0.68 * scale;
        ctx.strokeRect(midX - rw * 0.5, midY - rh * 0.5, rw, rh);
      });

      // Perspective corner vanishing lines
      ctx.beginPath();
      ctx.moveTo(w * 0.11, h * 0.14);
      ctx.lineTo(midX, midY);
      ctx.moveTo(w * 0.89, h * 0.14);
      ctx.lineTo(midX, midY);
      ctx.moveTo(w * 0.11, h * 0.82);
      ctx.lineTo(midX, midY);
      ctx.moveTo(w * 0.89, h * 0.82);
      ctx.lineTo(midX, midY);
      ctx.stroke();

      // Target depth calibration ring (fixed at depth 0.52)
      const targetR = 22;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(midX, midY, targetR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sphere traveling in depth toward viewer: starts small, scales to large
      const p = (cycle / 3000);
      const sphereR = 6 + p * 34;

      // Intercept hit window around p = 0.50 (when sphere radius matches targetR)
      const isIntercept = cycle >= 1400 && cycle < 1850;
      if (cycle >= 1400 && cycle < 1850) {
        const hp = (cycle - 1400) / 450;
        drawHitRing(ctx, midX, midY, targetR + hp * 22, '#10b981', 1 - hp);
      }

      // 3D Sphere orb
      ctx.fillStyle = isIntercept ? '#10b981' : accent;
      ctx.beginPath();
      ctx.arc(midX, midY, Math.min(sphereR, 28), 0, Math.PI * 2);
      ctx.fill();

      // Concentric sphere contour
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(midX, midY, Math.min(sphereR, 28) * 0.6, 0, Math.PI * 2);
      ctx.stroke();

      drawCrosshair(ctx, midX, midY, 8, isIntercept ? '#10b981' : '#ffffff');

      ctx.fillStyle = isIntercept ? '#10b981' : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isIntercept ? 'DEPTH INTERCEPT: 0.0% ERROR' : 'CALIBRATING DEPTH PLANE', midX, h * 0.90);
    },
  },

  // 74. GO-NOGO: Impulse control stimulus switching between Green GO (tap) and Red NO-GO (hold) (go/no-go)
  'go-nogo': {
    id: 'go-nogo',
    label: 'Selective Response Chroma Sync',
    draw(ctx, { t, w, h, dim, seed = 0 }) {
      const cycle = (t + seed * 940) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;

      // Phase 1: 0–1600ms -> GO trial (Green)
      // Phase 2: 1600–3200ms -> NO-GO trial (Red)
      const isGoPhase = cycle < 1600;
      const subCycle = isGoPhase ? cycle : cycle - 1600;

      const isStimulusLit = subCycle >= 400 && subCycle < 1400;
      const isGo = isGoPhase && isStimulusLit;
      const isNoGo = !isGoPhase && isStimulusLit;

      // Center stimulus orb
      let orbColor = 'rgba(255, 255, 255, 0.15)';
      if (isGo) orbColor = '#10b981';
      else if (isNoGo) orbColor = '#ef4444';

      ctx.fillStyle = orbColor;
      ctx.beginPath();
      ctx.arc(midX, midY, isStimulusLit ? 10 : 7, 0, Math.PI * 2);
      ctx.fill();

      // Outer stimulus status ring
      ctx.strokeStyle = isStimulusLit ? (isGo ? '#10b981' : '#ef4444') : (dim || 'rgba(217, 70, 239, 0.15)');
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(midX, midY, 18, 0, Math.PI * 2);
      ctx.stroke();

      // GO Tap hit burst at subCycle = 650ms
      if (isGoPhase && subCycle >= 650 && subCycle < 1150) {
        const hp = (subCycle - 650) / 500;
        drawHitRing(ctx, midX, midY, 10 + hp * 24, '#10b981', 1 - hp);
      }

      // Crosshair behavior:
      // In GO phase: crosshair snaps in and taps at center.
      // In NO-GO phase: crosshair holds back at safe standoff distance.
      let chX = midX;
      let chY = midY;
      if (isNoGo) {
        chX = midX - 16;
        chY = midY;
      } else if (!isStimulusLit) {
        chX = midX - 10 + Math.sin(cycle * 0.003) * 6;
      }

      drawCrosshair(ctx, chX, chY, 7, isGo ? '#10b981' : (isNoGo ? '#ef4444' : '#ffffff'));

      ctx.fillStyle = isGo ? '#10b981' : (isNoGo ? '#ef4444' : 'rgba(255, 255, 255, 0.55)');
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      let statusText = 'STIMULUS PRIMED';
      if (isGo) statusText = 'GO STIMULUS: CLICK CONFIRMED';
      else if (isNoGo) statusText = 'NO-GO: IMPULSE INHIBITED';
      ctx.fillText(statusText, midX, h * 0.90);
    },
  },

  // 75. STROBE-LATENCY: Center orb flashes white within tight 100-200ms window with rapid latency tap (light-reaction)
  'strobe-latency': {
    id: 'strobe-latency',
    label: 'Strobe Flash Latency',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 910) % 2800;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;

      const flashStart = 900;
      const hitTime = 1040;
      const flashEnd = 1600;

      const isFlashing = cycle >= flashStart && cycle < flashEnd;
      const isHit = cycle >= hitTime && cycle < flashEnd;

      // Outer strobe warning gauge ring
      ctx.strokeStyle = isFlashing ? '#ffffff' : (dim || 'rgba(217, 70, 239, 0.15)');
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(midX, midY, 20, 0, Math.PI * 2);
      ctx.stroke();

      // Center orb
      ctx.fillStyle = isFlashing ? '#ffffff' : 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(midX, midY, isFlashing ? 11 : 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Strobe expanding shockwave ripple
      if (cycle >= hitTime && cycle < hitTime + 550) {
        const p = (cycle - hitTime) / 550;
        drawHitRing(ctx, midX, midY, 11 + p * 30, '#ffffff', 1 - p);
      }

      // Crosshair reactive snap
      let chX = midX;
      let chY = midY;
      if (cycle < flashStart) {
        chX = midX + Math.sin(cycle * 0.002) * 8;
        chY = midY + Math.cos(cycle * 0.002) * 6;
      }

      drawCrosshair(ctx, chX, chY, 7, isHit ? '#ffffff' : accent);

      ctx.fillStyle = isHit ? '#ffffff' : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isHit ? 'STROBE LATENCY: 140MS (ELITE)' : 'ARMED: AWAITING PHOTIC TRIGGER', midX, h * 0.90);
    },
  },

  // 76. KINETIC-INTERCEPT: High-velocity moving target with circular relocation timer arc intercepted before timeout (moving-target)
  'kinetic-intercept': {
    id: 'kinetic-intercept',
    label: 'Kinetic Velocity Intercept',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 950) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;

      const isRound1 = cycle < 1500;
      const sub = isRound1 ? cycle : cycle - 1500;

      const p0 = isRound1 ? { x: w * 0.16, y: h * 0.72 } : { x: w * 0.80, y: h * 0.70 };
      const p1 = isRound1 ? { x: w * 0.76, y: h * 0.32 } : { x: w * 0.22, y: h * 0.28 };

      const moveP = Math.min(1, sub / 1400);
      const tgtX = p0.x + (p1.x - p0.x) * moveP;
      const tgtY = p0.y + (p1.y - p0.y) * moveP;

      // Relocation circular countdown arc wrapping around target
      const timerP = Math.min(1, sub / 1000);
      ctx.strokeStyle = timerP > 0.75 ? '#ef4444' : accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 12, -Math.PI * 0.5, -Math.PI * 0.5 + timerP * Math.PI * 2);
      ctx.stroke();

      // Intercept hit burst at sub = 950ms
      const isIntercepted = sub >= 950 && sub < 1400;
      if (sub >= 950 && sub < 1350) {
        const hp = (sub - 950) / 400;
        drawHitRing(ctx, tgtX, tgtY, 12 + hp * 22, '#10b981', 1 - hp);
      }

      // Target sphere
      ctx.fillStyle = isIntercepted ? '#10b981' : accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Crosshair tracking and snapping
      let chX = tgtX;
      let chY = tgtY;
      if (sub < 700) {
        const ep = easeInOutCubic(sub / 700);
        chX = p0.x + (tgtX - p0.x) * ep;
        chY = p0.y + (tgtY - p0.y) * ep;
      }

      drawCrosshair(ctx, chX, chY, 7, isIntercepted ? '#10b981' : '#ffffff');

      ctx.fillStyle = isIntercepted ? '#10b981' : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isIntercepted ? 'INTERCEPT CONFIRMED (+150 PTS)' : 'KINETIC VELOCITY: 18.5 PX/S', midX, h * 0.90);
    },
  },

  // 77. MULTI-OBJECT-TRACK: Multiple Object Tracking (MOT) with memorize phase, tracking bounce, and identification (multiple-targets)
  'multi-object-track': {
    id: 'multi-object-track',
    label: 'Multiple Object Tracking',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 920) % 3600;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;

      const isMemorize = cycle < 1000;
      const isIdentify = cycle >= 2700;

      const sec = cycle * 0.001;

      // Parametric bouncing positions
      const b0 = { x: midX + Math.sin(sec * 2.2) * (w * 0.32), y: h * 0.48 + Math.cos(sec * 2.8) * (h * 0.28) };
      const b1 = { x: midX + Math.cos(sec * 1.9) * (w * 0.34), y: h * 0.48 + Math.sin(sec * 2.5) * (h * 0.24) };
      const b2 = { x: midX + Math.sin(sec * 2.6 + 1.2) * (w * 0.30), y: h * 0.48 + Math.cos(sec * 2.1 + 0.5) * (h * 0.26) };
      const b3 = { x: midX + Math.cos(sec * 2.3 + 2.0) * (w * 0.35), y: h * 0.48 + Math.sin(sec * 1.7 + 1.8) * (h * 0.25) };

      const balls = [b0, b1, b2, b3];

      balls.forEach((b, idx) => {
        const isTarget = idx < 2;
        let color = 'rgba(255, 255, 255, 0.35)';

        if (isMemorize && isTarget) {
          color = accent;
        } else if (isIdentify && isTarget) {
          color = '#10b981';
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
        ctx.fill();

        if ((isMemorize || isIdentify) && isTarget) {
          ctx.strokeStyle = isIdentify ? '#10b981' : accent;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(b.x, b.y, 10, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      let chX = b0.x;
      let chY = b0.y;
      drawCrosshair(ctx, chX, chY, 7, isIdentify ? '#10b981' : '#ffffff');

      ctx.fillStyle = isIdentify ? '#10b981' : (isMemorize ? accent : 'rgba(255, 255, 255, 0.55)');
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      let phaseLabel = 'TRACKING 2 TARGETS';
      if (isMemorize) phaseLabel = 'MEMORIZE 2 TARGETS';
      else if (isIdentify) phaseLabel = 'IDENTIFIED: 2/2 CORRECT';
      ctx.fillText(phaseLabel, midX, h * 0.90);
    },
  },

  // 78. AUTO-PURSUIT: Smooth pursuit with continuous cursor alignment and circular lock-on progress gauge (pursuit-tracker)
  'auto-pursuit': {
    id: 'auto-pursuit',
    label: 'Continuous Auto Pursuit',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 935) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const midX = w * 0.5;
      const midY = h * 0.48;

      // Smooth orbital curve
      const p = (cycle / 3200) * Math.PI * 2;
      const tgtX = midX + Math.sin(p) * (w * 0.32);
      const tgtY = midY + Math.sin(p * 2) * (h * 0.25);

      // Target orb
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Circular Lock-On progress gauge wrapping around target
      const lockP = Math.min(1, cycle / 2600);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tgtX, tgtY, 14, -Math.PI * 0.5, -Math.PI * 0.5 + lockP * Math.PI * 2);
      ctx.stroke();

      // Full lock pulse
      if (cycle >= 2600) {
        const lp = (cycle - 2600) / 600;
        drawHitRing(ctx, tgtX, tgtY, 14 + lp * 18, '#10b981', 1 - lp);
      }

      // Crosshair locked squarely on target
      drawCrosshair(ctx, tgtX, tgtY, 7, '#ffffff');

      ctx.fillStyle = '#10b981';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      const pct = Math.round(lockP * 100);
      ctx.fillText(`LOCK-ON ALIGNMENT: ${pct}% (+5 PTS/S)`, midX, h * 0.90);
    },
  },

  // 79. ENTROPIC-GRID: 10x10 matrix of digital character glyph cells with noise corruption and target isolation (entropic-grid)
  'entropic-grid': {
    id: 'entropic-grid',
    label: 'Entropic Matrix Isolation',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 975) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cols = 7;
      const rows = 4;
      const marginX = w * 0.16;
      const marginY = h * 0.20;
      const stepX = (w - marginX * 2) / (cols - 1);
      const stepY = (h - marginY * 2) / (rows - 1);

      const targetCol = 4;
      const targetRow = 1;
      const targetX = marginX + targetCol * stepX;
      const targetY = marginY + targetRow * stepY;

      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const corruptFlicker = Math.floor(cycle / 600) % 2 === 0;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = marginX + c * stepX;
          const y = marginY + r * stepY;
          const isTarget = c === targetCol && r === targetRow;

          if (isTarget) {
            ctx.fillStyle = accent;
            ctx.fillText('A4', x, y);

            ctx.strokeStyle = accent;
            ctx.lineWidth = 1;
            ctx.strokeRect(x - 9, y - 7, 18, 14);
          } else {
            const isCorrupt = corruptFlicker && ((c * 3 + r * 7) % 5 === 0);
            ctx.fillStyle = isCorrupt ? 'rgba(217, 70, 239, 0.4)' : 'rgba(255, 255, 255, 0.18)';
            ctx.fillText(isCorrupt ? '##' : '..', x, y);
          }
        }
      }

      // Scanner reticle sweeps to target and locks at cycle = 1200ms
      const isLocked = cycle >= 1200;
      let chX = targetX;
      let chY = targetY;
      if (cycle < 1200) {
        const sp = cycle / 1200;
        const ep = easeInOutCubic(sp);
        chX = marginX + (targetX - marginX) * ep;
        chY = marginY + (targetY - marginY) * ep;
      } else if (cycle < 1650) {
        const hp = (cycle - 1200) / 450;
        drawHitRing(ctx, targetX, targetY, 12 + hp * 20, accent, 1 - hp);
      }

      drawCrosshair(ctx, chX, chY, 8, isLocked ? accent : '#ffffff');

      ctx.fillStyle = isLocked ? accent : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isLocked ? 'TARGET CODE [A4]: ISOLATED' : 'SCANNING ENTROPIC NOISE MATRIX', w * 0.5, h * 0.90);
    },
  },

  // 80. RHYTHM-ANOMALY: Grid of pulsating nodes with one anomaly cell pulsing out of frequency (rhythm-anomaly)
  'rhythm-anomaly': {
    id: 'rhythm-anomaly',
    label: 'Temporal Frequency Anomaly',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 945) % 3200;
      drawSubtleGrid(ctx, w, h, dim);

      const cols = 5;
      const rows = 3;
      const marginX = w * 0.20;
      const marginY = h * 0.24;
      const stepX = (w - marginX * 2) / (cols - 1);
      const stepY = (h - marginY * 2) / (rows - 1);

      const anomalyCol = 3;
      const anomalyRow = 1;
      const anomalyX = marginX + anomalyCol * stepX;
      const anomalyY = marginY + anomalyRow * stepY;

      // Steady pulse period = 2000ms
      const steadyIntensity = Math.pow(Math.sin((cycle / 2000) * Math.PI), 4);
      // Anomaly pulse period = 1200ms
      const anomalyIntensity = Math.pow(Math.sin((cycle / 1200) * Math.PI), 4);

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = marginX + c * stepX;
          const y = marginY + r * stepY;
          const isAnomaly = c === anomalyCol && r === anomalyRow;

          const intensity = isAnomaly ? anomalyIntensity : steadyIntensity;
          const radius = 4 + intensity * 4;

          ctx.fillStyle = isAnomaly ? accent : 'rgba(255, 255, 255, 0.25)';
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Scanner locates and brackets the anomaly node at cycle = 1400ms
      const isDetected = cycle >= 1400;
      let chX = anomalyX;
      let chY = anomalyY;
      if (cycle < 1400) {
        const sp = cycle / 1400;
        const ep = easeInOutCubic(sp);
        chX = marginX + (anomalyX - marginX) * ep;
        chY = marginY + (anomalyY - marginY) * ep;
      } else {
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(anomalyX, anomalyY, 14, 0, Math.PI * 2);
        ctx.stroke();
      }

      drawCrosshair(ctx, chX, chY, 7, isDetected ? accent : '#ffffff');

      ctx.fillStyle = isDetected ? accent : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isDetected ? 'ANOMALY DETECTED: 1.2S vs 2.0S' : 'SCANNING RHYTHMIC FREQUENCIES', w * 0.5, h * 0.90);
    },
  },

  // 81. VISUAL-SEARCH: Dense distractor field search isolating target symbol among noise (visual-search)
  'visual-search': {
    id: 'visual-search',
    label: 'Conjunctive Visual Search',
    draw(ctx, { t, w, h, accent, dim, seed = 0 }) {
      const cycle = (t + seed * 915) % 3000;
      drawSubtleGrid(ctx, w, h, dim);

      const cols = 7;
      const rows = 4;
      const marginX = w * 0.18;
      const marginY = h * 0.22;
      const stepX = (w - marginX * 2) / (cols - 1);
      const stepY = (h - marginY * 2) / (rows - 1);

      const targetCol = 4;
      const targetRow = 1;
      const targetX = marginX + targetCol * stepX;
      const targetY = marginY + targetRow * stepY;

      ctx.font = '8px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = marginX + c * stepX;
          const y = marginY + r * stepY;
          const isTarget = c === targetCol && r === targetRow;

          if (isTarget) {
            ctx.fillStyle = accent;
            ctx.fillText('C', x, y);
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
            ctx.fillText('O', x, y);
          }
        }
      }

      const isFound = cycle >= 1100;
      let chX = targetX;
      let chY = targetY;
      if (cycle < 1100) {
        const sp = cycle / 1100;
        const ep = easeInOutCubic(sp);
        chX = marginX + (targetX - marginX) * ep;
        chY = marginY + (targetY - marginY) * ep;
      } else {
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(targetX - 8, targetY - 8, 16, 16);

        if (cycle < 1600) {
          const hp = (cycle - 1100) / 500;
          drawHitRing(ctx, targetX, targetY, 10 + hp * 18, accent, 1 - hp);
        }
      }

      drawCrosshair(ctx, chX, chY, 7, isFound ? accent : '#ffffff');

      ctx.fillStyle = isFound ? accent : 'rgba(255, 255, 255, 0.55)';
      ctx.font = '7px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isFound ? 'FEATURE ISOLATED [C]: 184MS' : 'SEARCHING CONJUNCTIVE FIELD', w * 0.5, h * 0.90);
    },
  },
};

export function getScene(id) {
  return SCENES[id] || null;
}
