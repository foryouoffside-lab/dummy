'use client';

import React, { useRef, useEffect } from 'react';

/**
 * SaccadicGalleryPreview
 * Authentic HTML5 <canvas> simulation of the Saccadic Gallery / Eye Exercises drill.
 *
 * Simulates:
 * - 4x3 spatial calibration node matrix for saccadic eye gaze tracking.
 * - Deep dark #050508 tactical arena with subtle white coordinate grid.
 * - Ballistic target jumping across far nodes (large angular visual sweeps).
 * - Real in-game target styling: depleting countdown timer arc, concentric tactical red rings,
 *   specular highlight, and bright white central core.
 * - Rapid ballistic crosshair flicks with settling deceleration.
 * - Dynamic hit reactions: expanding shockwave ring, radiant red/white particle sparks,
 *   and floating +100 score popup.
 * - Zero in-preview title pills/badges.
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function SaccadicGalleryPreview() {
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

    // Simulation state
    // 4 cols x 3 rows grid node definitions (normalized 0..1)
    const COLS = 4;
    const ROWS = 3;
    const MARGIN_X_RATIO = 0.15;
    const MARGIN_Y_RATIO = 0.20;

    const getNodePos = (col, row, w, h) => {
      const startX = w * MARGIN_X_RATIO;
      const endX = w * (1 - MARGIN_X_RATIO);
      const startY = h * MARGIN_Y_RATIO;
      const endY = h * (1 - MARGIN_Y_RATIO);
      const stepX = (endX - startX) / (COLS - 1);
      const stepY = (endY - startY) / (ROWS - 1);
      return {
        x: startX + col * stepX,
        y: startY + row * stepY,
      };
    };

    // Pre-choreographed saccadic sequence designed for dramatic saccades across quadrants
    const SEQUENCE = [
      { col: 0, row: 0 }, // Top-left
      { col: 3, row: 2 }, // Far diagonal jump to bottom-right
      { col: 1, row: 1 }, // Center-left
      { col: 3, row: 0 }, // Far top-right
      { col: 0, row: 2 }, // Far diagonal jump to bottom-left
      { col: 2, row: 1 }, // Center-right
      { col: 1, row: 0 }, // Upper-mid
      { col: 2, row: 2 }, // Lower-mid
    ];

    let seqIndex = 0;
    let target = null;
    let crosshair = { x: 0, y: 0, fromX: 0, fromY: 0, toX: 0, toY: 0, moveProgress: 1 };
    let rings = [];
    let particles = [];
    let popups = [];

    const TTL = 1400; // ms per target
    let nextSpawnTime = 0;

    // Spawn a target at sequence step
    const spawnNextTarget = (time) => {
      const step = SEQUENCE[seqIndex % SEQUENCE.length];
      seqIndex++;

      const pos = getNodePos(step.col, step.row, width, height);
      const radius = Math.max(10, Math.min(width, height) * 0.08);

      target = {
        col: step.col,
        row: step.row,
        x: pos.x,
        y: pos.y,
        radius,
        spawnTime: time,
        ttl: TTL,
      };

      // Set up ballistic crosshair movement
      crosshair.fromX = crosshair.x;
      crosshair.fromY = crosshair.y;
      crosshair.toX = pos.x;
      crosshair.toY = pos.y;
      crosshair.moveProgress = 0;
    };

    // Initialize crosshair at center
    crosshair.x = width * 0.5;
    crosshair.y = height * 0.5;
    crosshair.fromX = crosshair.x;
    crosshair.fromY = crosshair.y;
    crosshair.toX = crosshair.x;
    crosshair.toY = crosshair.y;

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isVisible && !prefersReducedMotion) {
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (width === 0 || height === 0) {
        updateDimensions();
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      // --- Background ---
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 28;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // --- 4x3 Saccadic Calibration Matrix Nodes ---
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const pt = getNodePos(c, r, width, height);
          const isTargetNode = target && target.col === c && target.row === r;

          // Tiny cross/dot calibration marker
          ctx.strokeStyle = isTargetNode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1;
          const markSize = 4;
          ctx.beginPath();
          ctx.moveTo(pt.x - markSize, pt.y);
          ctx.lineTo(pt.x + markSize, pt.y);
          ctx.moveTo(pt.x, pt.y - markSize);
          ctx.lineTo(pt.x, pt.y + markSize);
          ctx.stroke();

          // Outer faint dot
          ctx.fillStyle = isTargetNode ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.12)';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (prefersReducedMotion) {
        // Static frame for reduced motion
        const pt = getNodePos(1, 1, width, height);
        const r = Math.max(10, Math.min(width, height) * 0.08);

        // Draw static target
        ctx.save();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r * 0.82, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      // --- State Logic ---
      if (!target && now >= nextSpawnTime) {
        spawnNextTarget(now);
      }

      // Update crosshair ballistic saccade
      if (crosshair.moveProgress < 1) {
        // Fast saccadic jump (approx 220ms duration)
        crosshair.moveProgress += dt * 4.5;
        if (crosshair.moveProgress >= 1) {
          crosshair.moveProgress = 1;
          crosshair.x = crosshair.toX;
          crosshair.y = crosshair.toY;

          // Crosshair arrived at target -> Trigger hit!
          if (target) {
            const hitX = target.x;
            const hitY = target.y;
            const hitR = target.radius;

            // Shockwave ring
            rings.push({
              x: hitX,
              y: hitY,
              startR: hitR * 0.4,
              maxR: hitR * 2.5,
              life: 0.35,
              maxLife: 0.35,
              color: '#ef4444',
            });

            // Spark particles
            for (let i = 0; i < 12; i++) {
              const angle = Math.random() * Math.PI * 2;
              const spd = 40 + Math.random() * 90;
              particles.push({
                x: hitX,
                y: hitY,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color: Math.random() > 0.3 ? '#ef4444' : '#ffffff',
                life: 0.45,
                maxLife: 0.45,
              });
            }

            // Score popup
            popups.push({
              x: hitX,
              y: hitY - hitR * 0.5,
              text: '+100',
              life: 0.6,
              maxLife: 0.6,
            });

            target = null;
            nextSpawnTime = now + 160; // short pause before next saccadic jump
          }
        } else {
          // Ballistic cubic easing for authentic saccadic snap
          const tVal = crosshair.moveProgress;
          const ease = tVal < 0.5
            ? 4 * tVal * tVal * tVal
            : 1 - Math.pow(-2 * tVal + 2, 3) / 2;
          crosshair.x = crosshair.fromX + (crosshair.toX - crosshair.fromX) * ease;
          crosshair.y = crosshair.fromY + (crosshair.toY - crosshair.fromY) * ease;
        }
      }

      // Target rendering
      if (target) {
        const remaining = Math.max(0, 1 - (now - target.spawnTime) / target.ttl);
        const r = target.radius;
        const tx = target.x;
        const ty = target.y;

        ctx.save();

        // 1. Depleting countdown timer arc around perimeter
        ctx.strokeStyle = remaining < 0.3 ? '#ef4444' : '#ffffff';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(
          tx,
          ty,
          r + 6,
          -Math.PI / 2,
          -Math.PI / 2 + remaining * Math.PI * 2
        );
        ctx.stroke();

        // 2. Concentric tactical outer rings
        ctx.globalAlpha = 0.25;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(tx, ty, r + 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(tx, ty, r, 0, Math.PI * 2);
        ctx.stroke();

        // 3. Glowing red body
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(tx, ty, r * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // 4. Highlight sheen
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tx - r * 0.22, ty - r * 0.22, r * 0.26, 0, Math.PI * 2);
        ctx.fill();

        // 5. White central core
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tx, ty, Math.max(2.5, r * 0.18), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // --- Ring Bursts ---
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.life -= dt;
        if (ring.life <= 0) {
          rings.splice(i, 1);
          continue;
        }
        const progress = 1 - ring.life / ring.maxLife;
        const curR = ring.startR + (ring.maxR - ring.startR) * progress;
        ctx.save();
        ctx.globalAlpha = (ring.life / ring.maxLife) * 0.8;
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, curR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // --- Particles ---
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        ctx.save();
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // --- Score Popups (+100) ---
      for (let i = popups.length - 1; i >= 0; i--) {
        const pop = popups[i];
        pop.life -= dt;
        if (pop.life <= 0) {
          popups.splice(i, 1);
          continue;
        }
        pop.y -= dt * 25; // drift upward
        const alpha = pop.life / pop.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pop.text, pop.x, pop.y);
        ctx.restore();
      }

      // --- Tactical Crosshair ---
      ctx.save();
      const chX = crosshair.x;
      const chY = crosshair.y;
      const chColor = '#10b981';
      ctx.strokeStyle = chColor;
      ctx.fillStyle = chColor;

      const chRadius = 11;
      const gap = 4;
      const tickLen = 11;

      // Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(chX, chY, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with gap
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(chX, chY - tickLen); ctx.lineTo(chX, chY - gap);
      ctx.moveTo(chX, chY + tickLen); ctx.lineTo(chX, chY + gap);
      ctx.moveTo(chX - tickLen, chY); ctx.lineTo(chX - gap, chY);
      ctx.moveTo(chX + tickLen, chY); ctx.lineTo(chX + gap, chY);
      ctx.stroke();

      // Crosshair center dot
      ctx.beginPath();
      ctx.arc(chX, chY, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-[#050508] select-none pointer-events-none sg-prev"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

