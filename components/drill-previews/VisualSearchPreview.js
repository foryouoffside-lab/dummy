'use client';

import React, { useRef, useEffect } from 'react';

/**
 * VisualSearchPreview
 * Authentic HTML5 <canvas> simulation of Visual Search.
 * Matches VisualSearchClient.js:
 *
 * Simulates:
 * - Deep tactical #050508 arena with subtle coordinate grid.
 * - 8x5 conjunctive feature search grid of confusable rotated glyphs (e.g. C vs O/Q/G, E vs F/L/P, P vs R/B/D).
 * - Human saccadic visual search behavior: rapid eye fixations & ballistic jumps between cells.
 * - Target acquisition & lock-on: reticle snaps directly onto the target glyph.
 * - Hit feedback: target cell blooms in vivid emerald (#10b981), expands shockwave rings, and emits radial sparks.
 * - Autonomous regeneration into new target symbol pair on completion.
 * - Zero in-preview title pills, badges, or fake "+150" score tags.
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function VisualSearchPreview() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isVisible = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // HiDPI / Resize management
    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateDimensions();

    // Fallback: ensure dimensions are set after layout paint
    requestAnimationFrame(() => {
      updateDimensions();
    });

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    // Pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Search Pairs (authentic from VisualSearchClient.js)
    const SEARCH_PAIRS = [
      { target: 'C', distractors: ['O', 'Q', 'G'] },
      { target: 'E', distractors: ['F', 'L', 'P'] },
      { target: 'P', distractors: ['R', 'B', 'D'] },
      { target: 'N', distractors: ['M', 'H', 'W'] },
      { target: 'V', distractors: ['U', 'W', 'Y'] },
      { target: '6', distractors: ['8', '9', '0'] },
    ];

    const COLS = 8;
    const ROWS = 5;
    const TOTAL_CELLS = COLS * ROWS;

    // Grid data
    let currentPairIndex = 0;
    let targetCellIndex = 19; // Col 3, Row 2 (well centered)
    let cells = [];

    // Animation & Saccade state
    // States: 'scanning' -> 'hit' -> 'transition'
    let state = 'scanning';
    let stateTimer = 0;

    // Saccade waypoints (sequence of cell indices visited before locking onto target)
    let saccadePath = [];
    let currentPathIndex = 0;
    let waypointTimer = 0;
    let waypointDuration = 0.22; // fixation + micro-jump duration

    // Reticle position & click animation
    let reticle = { x: 0, y: 0, currentX: 0, currentY: 0, clickScale: 1.0, lockGlow: 0 };

    // Effects
    let shockwaves = [];
    let particles = [];

    // Helper: calculate cell center coordinates in current canvas
    const getCellMetrics = () => {
      if (width === 0 || height === 0) return { cellW: 30, cellH: 26, gap: 5, startX: 20, startY: 20 };
      const gap = Math.max(3, Math.round(width * 0.012));
      const availW = width - 40;
      const availH = height - 36;
      const cellW = Math.floor((availW - (COLS - 1) * gap) / COLS);
      const cellH = Math.floor((availH - (ROWS - 1) * gap) / ROWS);
      const gridW = COLS * cellW + (COLS - 1) * gap;
      const gridH = ROWS * cellH + (ROWS - 1) * gap;
      const startX = Math.round((width - gridW) / 2);
      const startY = Math.round((height - gridH) / 2);
      return { cellW, cellH, gap, startX, startY };
    };

    const getCellCenter = (index) => {
      const { cellW, cellH, gap, startX, startY } = getCellMetrics();
      const col = index % COLS;
      const row = Math.floor(index / COLS);
      return {
        cx: startX + col * (cellW + gap) + cellW / 2,
        cy: startY + row * (cellH + gap) + cellH / 2,
      };
    };

    // Generate a fresh grid
    const initGrid = () => {
      const pair = SEARCH_PAIRS[currentPairIndex % SEARCH_PAIRS.length];
      // Pick target cell near middle (not on extreme perimeter)
      const validTargets = [
        10, 11, 12, 13,
        18, 19, 20, 21,
        26, 27, 28, 29
      ];
      targetCellIndex = validTargets[Math.floor(Math.random() * validTargets.length)];

      const rotations = [0, 90, 180, 270];
      cells = [];
      for (let i = 0; i < TOTAL_CELLS; i++) {
        const isTarget = i === targetCellIndex;
        const char = isTarget
          ? pair.target
          : pair.distractors[Math.floor(Math.random() * pair.distractors.length)];
        const rot = rotations[Math.floor(Math.random() * rotations.length)];
        cells.push({
          char,
          isTarget,
          rotation: rot,
          hitAlpha: 0,
        });
      }

      // Generate 2 or 3 saccadic distractor hops before hitting target
      const hops = [];
      const hop1 = (targetCellIndex - 8 + TOTAL_CELLS) % TOTAL_CELLS;
      const hop2 = (targetCellIndex + 2) % TOTAL_CELLS;
      const hop3 = (targetCellIndex - 1 + TOTAL_CELLS) % TOTAL_CELLS;
      hops.push(hop1, hop2, hop3, targetCellIndex);

      saccadePath = hops;
      currentPathIndex = 0;
      waypointTimer = 0;

      const firstCenter = getCellCenter(saccadePath[0]);
      reticle.currentX = firstCenter.cx;
      reticle.currentY = firstCenter.cy;
      reticle.clickScale = 1.0;
      reticle.lockGlow = 0;

      state = 'scanning';
      stateTimer = 0;
    };

    initGrid();

    // Trigger target hit burst
    const triggerHit = (cx, cy) => {
      shockwaves.push({ x: cx, y: cy, radius: 8, maxRadius: 52, alpha: 1.0, color: '#10b981' });
      shockwaves.push({ x: cx, y: cy, radius: 4, maxRadius: 70, alpha: 0.75, color: '#ffffff' });

      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const speed = 50 + Math.random() * 65;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          decay: 1.6 + Math.random() * 0.8,
          size: 1.8 + Math.random() * 1.5,
          color: Math.random() > 0.3 ? '#10b981' : '#6ee7b7',
        });
      }
    };

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!width || !height) return;

      // 1. Clear background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // 2. Tactical coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Simulation Update (if motion enabled)
      if (!prefersReducedMotion) {
        stateTimer += dt;
        waypointTimer += dt;

        if (state === 'scanning') {
          const currentCell = saccadePath[currentPathIndex];
          const targetPt = getCellCenter(currentCell);

          // Fast ballistic spring towards waypoint
          const lerpSpeed = 16;
          reticle.currentX += (targetPt.cx - reticle.currentX) * Math.min(1, dt * lerpSpeed);
          reticle.currentY += (targetPt.cy - reticle.currentY) * Math.min(1, dt * lerpSpeed);

          if (waypointTimer >= waypointDuration) {
            waypointTimer = 0;
            currentPathIndex++;

            if (currentPathIndex >= saccadePath.length) {
              // Reached target! Lock on and hit
              state = 'hit';
              stateTimer = 0;
              reticle.clickScale = 0.82;
              reticle.lockGlow = 1.0;
              const tCenter = getCellCenter(targetCellIndex);
              triggerHit(tCenter.cx, tCenter.cy);
              if (cells[targetCellIndex]) {
                cells[targetCellIndex].hitAlpha = 1.0;
              }
            }
          }
        } else if (state === 'hit') {
          // Recover click scale
          reticle.clickScale += (1.0 - reticle.clickScale) * Math.min(1, dt * 10);
          reticle.lockGlow = Math.max(0, reticle.lockGlow - dt * 1.5);

          const tCenter = getCellCenter(targetCellIndex);
          reticle.currentX = tCenter.cx;
          reticle.currentY = tCenter.cy;

          // Fade out hit highlight on target cell
          if (cells[targetCellIndex]) {
            cells[targetCellIndex].hitAlpha = Math.max(0, 1.0 - stateTimer * 1.5);
          }

          if (stateTimer >= 0.55) {
            state = 'transition';
            stateTimer = 0;
          }
        } else if (state === 'transition') {
          // Brief pause before new round
          if (stateTimer >= 0.25) {
            currentPairIndex++;
            initGrid();
          }
        }

        // Update shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const s = shockwaves[i];
          s.radius += (s.maxRadius - s.radius) * Math.min(1, dt * 10);
          s.alpha -= dt * 1.8;
          if (s.alpha <= 0 || s.radius >= s.maxRadius - 2) {
            shockwaves.splice(i, 1);
          }
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.alpha -= dt * p.decay;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
          }
        }
      }

      // 3. Render Grid of Cells
      const { cellW, cellH, gap, startX, startY } = getCellMetrics();
      const fontSize = Math.max(10, Math.floor(cellH * 0.52));

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `900 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

      for (let i = 0; i < TOTAL_CELLS; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const cx = startX + col * (cellW + gap) + cellW / 2;
        const cy = startY + row * (cellH + gap) + cellH / 2;
        const cLeft = cx - cellW / 2;
        const cTop = cy - cellH / 2;

        const cell = cells[i];
        if (!cell) continue;

        const hitAlpha = cell.hitAlpha || 0;

        // Cell background
        if (hitAlpha > 0) {
          // Emerald glow fill on hit
          ctx.fillStyle = `rgba(16, 185, 129, ${0.15 + hitAlpha * 0.45})`;
          ctx.strokeStyle = `rgba(52, 211, 153, ${0.4 + hitAlpha * 0.6})`;
          ctx.lineWidth = 1.5;
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1;
        }

        // Draw rounded rectangle
        const r = 3;
        ctx.beginPath();
        ctx.roundRect(cLeft, cTop, cellW, cellH, r);
        ctx.fill();
        ctx.stroke();

        // Target active bloom
        if (hitAlpha > 0.1) {
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = Math.round(12 * hitAlpha);
        } else {
          ctx.shadowBlur = 0;
        }

        // Render Character Glyph
        ctx.save();
        ctx.translate(cx, cy);
        if (cell.rotation !== 0) {
          ctx.rotate((cell.rotation * Math.PI) / 180);
        }

        if (hitAlpha > 0) {
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = 'rgba(203, 213, 225, 0.72)'; // Slate-300
        }
        ctx.fillText(cell.char, 0, 1);
        ctx.restore();
        ctx.shadowBlur = 0;
      }

      // 4. Render Shockwaves
      for (const s of shockwaves) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.strokeStyle = s.color === '#ffffff'
          ? `rgba(255, 255, 255, ${Math.max(0, s.alpha)})`
          : `rgba(16, 185, 129, ${Math.max(0, s.alpha)})`;
        ctx.lineWidth = s.color === '#ffffff' ? 1.5 : 2;
        ctx.stroke();
      }

      // 5. Render Radial Spark Particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // 6. Tactical Crosshair Reticle (matching FPS drill exact crosshair geometry)
      const rx = reticle.currentX;
      const ry = reticle.currentY;
      const isLock = state === 'hit';
      const chColor = isLock ? '#10b981' : '#38bdf8';

      ctx.save();
      ctx.translate(rx, ry);
      ctx.strokeStyle = chColor;
      ctx.fillStyle = chColor;

      const chRadius = 11;
      const chGap = 4;
      const tickLen = 11;

      // Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with gap
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(0, -tickLen); ctx.lineTo(0, -chGap);
      ctx.moveTo(0, tickLen); ctx.lineTo(0, chGap);
      ctx.moveTo(-tickLen, 0); ctx.lineTo(-chGap, 0);
      ctx.moveTo(tickLen, 0); ctx.lineTo(chGap, 0);
      ctx.stroke();

      // Center pip
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Immediate initial frame render guarantee
    renderFrame(performance.now());

    // Animation loop
    const loop = (now) => {
      if (isVisible) {
        renderFrame(now);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-[#050508] select-none pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
