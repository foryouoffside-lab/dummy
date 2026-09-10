'use client';

import React, { useRef, useEffect } from 'react';

/**
 * EntropicGridPreview
 * Authentic HTML5 <canvas> simulation of Entropic Grid (Visual Recognition & Saccadic Search).
 * Matches EntropicGridClient.js:
 *
 * Simulates:
 * - Deep tactical #050508 arena with subtle coordinate backdrop.
 * - 8×5 alphanumeric matrix (40 cells) displaying 2-character tokens (e.g., "K7", "9X", "M2", "Q5").
 * - Dynamic "Entropic Noise": 2-3 non-target cells mutate periodically every ~250ms, simulating matrix corruption.
 * - Saccadic eye-movement reticle jumping across cells in search of the active target code.
 * - Instant target lock-on:
 *   * Cell flashes vivid emerald (#10b981) with glow shadow.
 *   * Dual expanding shockwave rings (emerald + white) and radial spark particles burst.
 *   * Reticle triggers a tactile click-scale depression.
 * - Autonomous regeneration cycle with randomized next target code.
 * - Zero in-preview title pills/badges/text overlays.
 * - Guaranteed first-frame draw + HiDPI scaling + ResizeObserver + IntersectionObserver auto-pause.
 */
export default function EntropicGridPreview() {
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

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    requestAnimationFrame(() => {
      updateDimensions();
    });

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const COLS = 8;
    const ROWS = 5;
    const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const getRandomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];
    const getRandomCode = () => getRandomChar() + getRandomChar();

    // Grid state
    let targetCode = 'K7';
    let targetCellIndex = 14;
    let cells = [];

    const initGrid = () => {
      targetCode = getRandomCode();
      targetCellIndex = Math.floor(Math.random() * (COLS * ROWS));
      cells = [];
      for (let i = 0; i < COLS * ROWS; i++) {
        cells.push({
          code: i === targetCellIndex ? targetCode : getRandomCode(),
          isTarget: i === targetCellIndex,
          hitAlpha: 0,
        });
      }
    };

    initGrid();

    // Saccadic Reticle State
    let reticle = {
      x: 100,
      y: 80,
      targetX: 100,
      targetY: 80,
      clickScale: 1.0,
      state: 'scanning', // 'scanning' | 'locked' | 'cycle'
    };

    let scanTimer = 0;
    let scanHops = 0;
    let entropyTimer = 0;
    let cycleTimer = 0;

    let shockwaves = [];
    let particles = [];

    const getCellMetrics = () => {
      const padX = 14;
      const padY = 12;
      const gap = 5;
      const availableW = Math.max(10, width - padX * 2);
      const availableH = Math.max(10, height - padY * 2);
      const cellW = (availableW - gap * (COLS - 1)) / COLS;
      const cellH = (availableH - gap * (ROWS - 1)) / ROWS;
      return { padX, padY, gap, cellW, cellH };
    };

    const getCellCenter = (index) => {
      const { padX, padY, gap, cellW, cellH } = getCellMetrics();
      const col = index % COLS;
      const row = Math.floor(index / COLS);
      const x = padX + col * (cellW + gap) + cellW / 2;
      const y = padY + row * (cellH + gap) + cellH / 2;
      return { x, y };
    };

    // Set initial reticle target
    const initPos = getCellCenter(0);
    reticle.x = initPos.x;
    reticle.y = initPos.y;
    reticle.targetX = initPos.x;
    reticle.targetY = initPos.y;

    const triggerHit = (cx, cy) => {
      shockwaves.push({ x: cx, y: cy, r: 12, maxR: 48, alpha: 1.0, color: '#10b981' });
      shockwaves.push({ x: cx, y: cy, r: 8, maxR: 62, alpha: 0.8, color: '#ffffff' });
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const spd = 40 + Math.random() * 50;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          alpha: 1.0,
          decay: 2.2,
          size: 1.8 + Math.random() * 1.4,
        });
      }
    };

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!width || !height) return;

      const { padX, padY, gap, cellW, cellH } = getCellMetrics();

      // Deep tactical background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Coordinate backdrop lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 28) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += 28) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      if (!prefersReducedMotion) {
        entropyTimer += dt;
        scanTimer += dt;
        cycleTimer += dt;

        // Entropic Noise: mutate 2 non-target cells every 220ms
        if (entropyTimer > 0.22) {
          entropyTimer = 0;
          for (let k = 0; k < 2; k++) {
            const randIdx = Math.floor(Math.random() * (COLS * ROWS));
            if (randIdx !== targetCellIndex && cells[randIdx]) {
              cells[randIdx].code = getRandomCode();
            }
          }
        }

        // Saccadic Reticle Scan & Lock State Machine
        if (reticle.state === 'scanning') {
          if (scanTimer > 0.32) {
            scanTimer = 0;
            scanHops++;

            if (scanHops >= 3) {
              // Snap to target cell
              const pos = getCellCenter(targetCellIndex);
              reticle.targetX = pos.x;
              reticle.targetY = pos.y;
              reticle.state = 'locked';
              scanHops = 0;
            } else {
              // Random distractor hop
              const hopIdx = Math.floor(Math.random() * (COLS * ROWS));
              const pos = getCellCenter(hopIdx);
              reticle.targetX = pos.x;
              reticle.targetY = pos.y;
            }
          }
        } else if (reticle.state === 'locked') {
          const dx = reticle.targetX - reticle.x;
          const dy = reticle.targetY - reticle.y;
          if (Math.hypot(dx, dy) < 4) {
            // Reached target: trigger lock hit!
            reticle.state = 'hit';
            reticle.clickScale = 0.8;
            if (cells[targetCellIndex]) {
              cells[targetCellIndex].hitAlpha = 1.0;
            }
            triggerHit(reticle.targetX, reticle.targetY);
            cycleTimer = 0;
          }
        } else if (reticle.state === 'hit') {
          reticle.clickScale += (1.0 - reticle.clickScale) * Math.min(1, dt * 10);
          if (cycleTimer > 0.6) {
            // Regenerate grid with new target
            initGrid();
            const pos = getCellCenter(0);
            reticle.targetX = pos.x;
            reticle.targetY = pos.y;
            reticle.state = 'scanning';
            scanTimer = 0;
            scanHops = 0;
          }
        }

        // Smooth reticle movement (fast ballistic saccade)
        reticle.x += (reticle.targetX - reticle.x) * Math.min(1, dt * 14);
        reticle.y += (reticle.targetY - reticle.y) * Math.min(1, dt * 14);

        // Update shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const s = shockwaves[i];
          s.r += (s.maxR - s.r) * Math.min(1, dt * 8);
          s.alpha -= dt * 1.8;
          if (s.alpha <= 0) shockwaves.splice(i, 1);
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.alpha -= dt * p.decay;
          if (p.alpha <= 0) particles.splice(i, 1);
        }

        // Decay hit alphas
        cells.forEach((c) => {
          if (c.hitAlpha > 0) c.hitAlpha = Math.max(0, c.hitAlpha - dt * 1.6);
        });
      }

      // --- DRAW 8x5 MATRIX CELLS ---
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const fontSize = Math.max(9, Math.round(cellH * 0.44));
      ctx.font = `bold ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

      cells.forEach((cell, idx) => {
        const col = idx % COLS;
        const row = Math.floor(idx / COLS);
        const x = padX + col * (cellW + gap);
        const y = padY + row * (cellH + gap);
        const cx = x + cellW / 2;
        const cy = y + cellH / 2;
        const radius = 4;

        ctx.save();

        if (cell.hitAlpha > 0) {
          // Vivid Emerald Target Hit Cell
          ctx.fillStyle = `rgba(16, 185, 129, ${0.45 + cell.hitAlpha * 0.55})`;
          ctx.strokeStyle = `rgba(52, 211, 153, ${0.7 + cell.hitAlpha * 0.3})`;
          ctx.lineWidth = 1.8;
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 10;
        } else {
          // Normal Distractor Cell
          ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
          ctx.lineWidth = 1;
        }

        // Rounded cell rect
        ctx.beginPath();
        ctx.roundRect(x, y, cellW, cellH, radius);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Cell Token Text
        if (cell.hitAlpha > 0) {
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = 'rgba(203, 213, 225, 0.72)';
        }
        ctx.fillText(cell.code, cx, cy + 0.5);

        ctx.restore();
      });

      // --- DRAW SHOCKWAVES ---
      for (const s of shockwaves) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.lineWidth = 2;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // --- DRAW PARTICLES ---
      for (const p of particles) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.restore();
      }

      // --- DRAW PURSUIT RETICLE ---
      ctx.save();
      ctx.translate(reticle.x, reticle.y);
      const isLockHit = reticle.state === 'hit';
      const retColor = isLockHit ? '#10b981' : 'rgba(56, 189, 248, 0.9)';
      const retR = 15 * reticle.clickScale;

      ctx.beginPath();
      ctx.arc(0, 0, retR, 0, Math.PI * 2);
      ctx.strokeStyle = retColor;
      ctx.lineWidth = 1.6;
      if (isLockHit) {
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Cardinal ticks
      const tLen = 4;
      ctx.strokeStyle = retColor;
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(0, -retR - 1); ctx.lineTo(0, -retR - tLen); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, retR + 1); ctx.lineTo(0, retR + tLen); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-retR - 1, 0); ctx.lineTo(-retR - tLen, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(retR + 1, 0); ctx.lineTo(retR + tLen, 0); ctx.stroke();

      // Center laser dot
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    };

    renderFrame(performance.now());

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

