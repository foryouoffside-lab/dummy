'use client';

import React, { useRef, useEffect } from 'react';

/**
 * RhythmAnomalyPreview
 * Authentic HTML5 <canvas> simulation of Rhythm Anomaly (Temporal Visual Recognition).
 * Matches RhythmAnomalyClient.js:
 *
 * Simulates:
 * - Deep tactical #020202 arena with a 6×4 grid of rhythmic strobe cells.
 * - Steady cells pulse in synchronized harmonic luminance rhythm (period: 1.6s).
 * - A single Anomaly Cell pulses desynchronized at a faster, out-of-phase frequency (period: 1.0s) with higher peak intensity.
 * - Saccadic eye-movement reticle sweeping across cells to identify the temporal rhythm discrepancy.
 * - Lock-on and Hit Feedback:
 *   * Anomaly cell flashes vivid purple/emerald (#a855f7 / #10b981) with glow shadow.
 *   * Dual expanding shockwave rings and radial spark particles burst from the cell.
 *   * Reticle executes a click-scale depression.
 * - Seamless relocation to a new anomaly cell index for continuous autonomous demonstration.
 * - Zero in-preview title pills/badges/text overlays.
 * - Guaranteed first-frame draw + HiDPI scaling + ResizeObserver + IntersectionObserver auto-pause.
 */
export default function RhythmAnomalyPreview() {
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

    const COLS = 6;
    const ROWS = 4;
    const TOTAL_CELLS = COLS * ROWS;

    let anomalyIndex = 14; // Start with a prominent cell
    let state = 'scanning'; // 'scanning' | 'locked' | 'hit'
    let scanTimer = 0;
    let scanHops = 0;
    let hitTimer = 0;

    // Reticle
    let reticle = {
      x: 80,
      y: 60,
      targetX: 80,
      targetY: 60,
      clickScale: 1.0,
    };

    let shockwaves = [];
    let particles = [];
    let hitAlpha = 0;

    const getCellCenter = (index) => {
      const padX = 16;
      const padY = 12;
      const gap = 6;
      const availableW = Math.max(10, width - padX * 2);
      const availableH = Math.max(10, height - padY * 2);
      const cellW = (availableW - gap * (COLS - 1)) / COLS;
      const cellH = (availableH - gap * (ROWS - 1)) / ROWS;

      const col = index % COLS;
      const row = Math.floor(index / COLS);
      const x = padX + col * (cellW + gap) + cellW / 2;
      const y = padY + row * (cellH + gap) + cellH / 2;
      return { x, y, cellW, cellH, padX, padY, gap };
    };

    // Set initial position
    const initPos = getCellCenter(0);
    reticle.x = initPos.x;
    reticle.y = initPos.y;
    reticle.targetX = initPos.x;
    reticle.targetY = initPos.y;

    const triggerHit = (cx, cy) => {
      shockwaves.push({ x: cx, y: cy, r: 12, maxR: 46, alpha: 1.0, color: '#a855f7' });
      shockwaves.push({ x: cx, y: cy, r: 8, maxR: 60, alpha: 0.8, color: '#ffffff' });
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const spd = 35 + Math.random() * 45;
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

      const padX = 16;
      const padY = 12;
      const gap = 6;
      const availableW = Math.max(10, width - padX * 2);
      const availableH = Math.max(10, height - padY * 2);
      const cellW = (availableW - gap * (COLS - 1)) / COLS;
      const cellH = (availableH - gap * (ROWS - 1)) / ROWS;

      // Dark tactical background
      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.025)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 28) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += 28) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Rhythm pulses
      const steadyDur = 1600;
      const anomalyDur = 950;
      const steadyPhase = (now % steadyDur) / steadyDur;
      const anomalyPhase = (now % anomalyDur) / anomalyDur;

      const steadyIntensity = Math.pow(Math.sin(steadyPhase * Math.PI), 4);
      const anomalyIntensity = Math.pow(Math.sin(anomalyPhase * Math.PI), 4);

      if (!prefersReducedMotion) {
        scanTimer += dt;

        if (state === 'scanning') {
          if (scanTimer > 0.38) {
            scanTimer = 0;
            scanHops++;

            if (scanHops >= 3) {
              // Converge to anomaly cell
              const pos = getCellCenter(anomalyIndex);
              reticle.targetX = pos.x;
              reticle.targetY = pos.y;
              state = 'locked';
              scanHops = 0;
            } else {
              // Hop to random distractor cell
              const hopIdx = Math.floor(Math.random() * TOTAL_CELLS);
              const pos = getCellCenter(hopIdx);
              reticle.targetX = pos.x;
              reticle.targetY = pos.y;
            }
          }
        } else if (state === 'locked') {
          const dx = reticle.targetX - reticle.x;
          const dy = reticle.targetY - reticle.y;
          if (Math.hypot(dx, dy) < 4) {
            state = 'hit';
            reticle.clickScale = 0.8;
            hitAlpha = 1.0;
            triggerHit(reticle.targetX, reticle.targetY);
            hitTimer = 0;
          }
        } else if (state === 'hit') {
          hitTimer += dt;
          reticle.clickScale += (1.0 - reticle.clickScale) * Math.min(1, dt * 10);
          hitAlpha = Math.max(0, hitAlpha - dt * 1.8);

          if (hitTimer > 0.65) {
            // Relocate anomaly to new cell
            let nextIdx = Math.floor(Math.random() * TOTAL_CELLS);
            while (nextIdx === anomalyIndex) {
              nextIdx = Math.floor(Math.random() * TOTAL_CELLS);
            }
            anomalyIndex = nextIdx;
            const pos = getCellCenter(0);
            reticle.targetX = pos.x;
            reticle.targetY = pos.y;
            state = 'scanning';
            scanTimer = 0;
            scanHops = 0;
          }
        }

        // Smooth reticle movement
        reticle.x += (reticle.targetX - reticle.x) * Math.min(1, dt * 12);
        reticle.y += (reticle.targetY - reticle.y) * Math.min(1, dt * 12);

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
      }

      // --- DRAW 6x4 GRID CELLS ---
      for (let i = 0; i < TOTAL_CELLS; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = padX + col * (cellW + gap);
        const y = padY + row * (cellH + gap);
        const isAnomaly = i === anomalyIndex;

        ctx.save();

        if (isAnomaly && hitAlpha > 0) {
          // Vivid purple hit flash
          ctx.fillStyle = `rgba(168, 85, 247, ${0.4 + hitAlpha * 0.6})`;
          ctx.strokeStyle = `rgba(216, 180, 254, ${0.8 + hitAlpha * 0.2})`;
          ctx.lineWidth = 2;
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 12;
        } else if (isAnomaly) {
          // Desynchronized out-of-phase pulsating anomaly
          const lum = 18 + Math.round(anomalyIntensity * 55);
          ctx.fillStyle = `rgba(${lum + 15}, ${lum}, ${lum + 25}, 0.85)`;
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.18 + anomalyIntensity * 0.4})`;
          ctx.lineWidth = 1.4;
          if (anomalyIntensity > 0.4) {
            ctx.shadowColor = 'rgba(168, 85, 247, 0.4)';
            ctx.shadowBlur = 8 * anomalyIntensity;
          }
        } else {
          // Harmonized steady pulse cells
          const lum = 12 + Math.round(steadyIntensity * 22);
          ctx.fillStyle = `rgb(${lum}, ${lum}, ${lum + 3})`;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 + steadyIntensity * 0.08})`;
          ctx.lineWidth = 1;
        }

        ctx.beginPath();
        ctx.roundRect(x, y, cellW, cellH, 4);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }

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
        ctx.fillStyle = '#c084fc';
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.restore();
      }

      // --- DRAW TACTICAL CROSSHAIR (matching FPS drill exact crosshair geometry) ---
      ctx.save();
      ctx.translate(reticle.x, reticle.y);
      const isLockHit = state === 'hit';
      const chColor = isLockHit ? '#a855f7' : '#38bdf8';
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

      // 4 Cross lines with gap (inward from ring to gap)
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(0, -tickLen); ctx.lineTo(0, -chGap);
      ctx.moveTo(0, tickLen); ctx.lineTo(0, chGap);
      ctx.moveTo(-tickLen, 0); ctx.lineTo(-chGap, 0);
      ctx.moveTo(tickLen, 0); ctx.lineTo(chGap, 0);
      ctx.stroke();

      // Center laser dot
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
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
      className="w-full h-full relative overflow-hidden bg-[#020202] select-none pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}

