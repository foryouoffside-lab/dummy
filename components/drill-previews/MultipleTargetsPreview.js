'use client';

import React, { useRef, useEffect } from 'react';

/**
 * MultipleTargetsPreview
 * Authentic HTML5 <canvas> simulation of Ghost-Link Tracking (Multiple Object Tracking).
 * Matches GhostLinkClient.js:
 *
 * Simulates:
 * - Deep tactical #050508 arena with coordinate grid.
 * - 6 tactical sphere targets bouncing and elastically colliding in 2D space.
 * - Multi-Phase Autonomous Loop:
 *   1. MEMORIZE (1.4s): 3 target balls glow vivid emerald (#10b981) with faint cyan/purple ghost-link filaments connecting them.
 *   2. TRACKING (2.2s): Ghost-links fade; target balls blend into neutral silver/slate (#94a3b8) identical to distractors while bouncing.
 *   3. IDENTIFY (1.8s): Balls decelerate; a cyan reticle sweeps in saccadic motion to identify the 3 targets, confirming each with emerald lock rings and burst pulses.
 * - Zero in-preview title pills/badges/text overlays.
 * - Guaranteed first-frame draw + HiDPI scaling + ResizeObserver + IntersectionObserver auto-pause.
 */
export default function MultipleTargetsPreview() {
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

    // Ball population: 6 balls (3 targets, 3 distractors)
    const BALL_RADIUS = 13;
    const balls = [
      { x: 70, y: 60, vx: 38, vy: 28, isTarget: true },
      { x: 260, y: 70, vx: -32, vy: 35, isTarget: true },
      { x: 170, y: 140, vx: 25, vy: -38, isTarget: true },
      { x: 130, y: 55, vx: -30, vy: 25, isTarget: false },
      { x: 80, y: 135, vx: 35, vy: -28, isTarget: false },
      { x: 270, y: 130, vx: -25, vy: -32, isTarget: false },
    ];

    // Phases: 'MEMORIZE' (1.4s) -> 'TRACK' (2.4s) -> 'IDENTIFY' (1.8s)
    let phase = 'MEMORIZE';
    let phaseTimer = 0;
    let selectedIndices = [];
    let reticle = { x: 175, y: 100, targetX: 175, targetY: 100, active: false };
    let shockwaves = [];

    const drawTacticalSphere = (cx, cy, r, color, glow) => {
      ctx.save();

      // Ghost outer ring
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
      ctx.stroke();

      // Tactical outer ring
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Filled body with glow
      ctx.globalAlpha = 0.9;
      ctx.shadowColor = color;
      ctx.shadowBlur = glow ? 12 : 0;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Highlight sheen
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - r * 0.22, cy - r * 0.22, r * 0.26, 0, Math.PI * 2);
      ctx.fill();

      // Center core
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(2, r * 0.18), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!width || !height) return;

      // Deep tactical background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Coordinate grid with faint purple/cyan tint
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 28;
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

      if (!prefersReducedMotion) {
        phaseTimer += dt;

        // Phase transitions
        if (phase === 'MEMORIZE') {
          reticle.active = false;
          selectedIndices = [];
          if (phaseTimer >= 1.4) {
            phase = 'TRACK';
            phaseTimer = 0;
          }
        } else if (phase === 'TRACK') {
          if (phaseTimer >= 2.4) {
            phase = 'IDENTIFY';
            phaseTimer = 0;
            reticle.active = true;
          }
        } else if (phase === 'IDENTIFY') {
          // Progressively pick the 3 target balls: at 0.3s, 0.8s, 1.3s
          const targetIndices = [0, 1, 2];
          if (phaseTimer >= 0.3 && !selectedIndices.includes(0)) {
            selectedIndices.push(0);
            reticle.targetX = balls[0].x;
            reticle.targetY = balls[0].y;
            shockwaves.push({ x: balls[0].x, y: balls[0].y, r: BALL_RADIUS, alpha: 1.0 });
          }
          if (phaseTimer >= 0.8 && !selectedIndices.includes(1)) {
            selectedIndices.push(1);
            reticle.targetX = balls[1].x;
            reticle.targetY = balls[1].y;
            shockwaves.push({ x: balls[1].x, y: balls[1].y, r: BALL_RADIUS, alpha: 1.0 });
          }
          if (phaseTimer >= 1.3 && !selectedIndices.includes(2)) {
            selectedIndices.push(2);
            reticle.targetX = balls[2].x;
            reticle.targetY = balls[2].y;
            shockwaves.push({ x: balls[2].x, y: balls[2].y, r: BALL_RADIUS, alpha: 1.0 });
          }
          if (phaseTimer >= 1.9) {
            // Restart cycle with new randomized directions
            phase = 'MEMORIZE';
            phaseTimer = 0;
            selectedIndices = [];
            reticle.active = false;
            balls.forEach((b) => {
              const a = Math.random() * Math.PI * 2;
              const spd = 30 + Math.random() * 20;
              b.vx = Math.cos(a) * spd;
              b.vy = Math.sin(a) * spd;
            });
          }

          // Smooth reticle movement towards current pick
          reticle.x += (reticle.targetX - reticle.x) * Math.min(1, dt * 10);
          reticle.y += (reticle.targetY - reticle.y) * Math.min(1, dt * 10);
        }

        // Ball physics
        const speedMult = phase === 'IDENTIFY' ? 0.25 : 1.0;
        const pad = BALL_RADIUS + 4;

        balls.forEach((b) => {
          b.x += b.vx * dt * speedMult;
          b.y += b.vy * dt * speedMult;

          if (b.x <= pad) {
            b.x = pad;
            b.vx = Math.abs(b.vx);
          } else if (b.x >= width - pad) {
            b.x = width - pad;
            b.vx = -Math.abs(b.vx);
          }
          if (b.y <= pad) {
            b.y = pad;
            b.vy = Math.abs(b.vy);
          } else if (b.y >= height - pad) {
            b.y = height - pad;
            b.vy = -Math.abs(b.vy);
          }
        });

        // Ball-to-ball elastic collisions
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const b1 = balls[i];
            const b2 = balls[j];
            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.hypot(dx, dy);
            const minDist = BALL_RADIUS * 2;

            if (dist < minDist && dist > 0) {
              const overlap = minDist - dist;
              const nx = dx / dist;
              const ny = dy / dist;

              b1.x -= nx * (overlap / 2);
              b1.y -= ny * (overlap / 2);
              b2.x += nx * (overlap / 2);
              b2.y += ny * (overlap / 2);

              const kx = b1.vx - b2.vx;
              const ky = b1.vy - b2.vy;
              const p = nx * kx + ny * ky;

              b1.vx -= p * nx;
              b1.vy -= p * ny;
              b2.vx += p * nx;
              b2.vy += p * ny;
            }
          }
        }

        // Update shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const s = shockwaves[i];
          s.r += dt * 38;
          s.alpha -= dt * 2.2;
          if (s.alpha <= 0) shockwaves.splice(i, 1);
        }
      }

      // Draw "Ghost-Link" filaments during MEMORIZE phase
      if (phase === 'MEMORIZE') {
        const linkAlpha = Math.sin((phaseTimer / 1.4) * Math.PI) * 0.45;
        ctx.save();
        ctx.strokeStyle = `rgba(16, 185, 129, ${Math.max(0, linkAlpha)})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        const targets = [balls[0], balls[1], balls[2]];
        ctx.beginPath();
        ctx.moveTo(targets[0].x, targets[0].y);
        ctx.lineTo(targets[1].x, targets[1].y);
        ctx.lineTo(targets[2].x, targets[2].y);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      }

      // Draw shockwaves
      for (const s of shockwaves) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${Math.max(0, s.alpha)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      // Draw balls
      balls.forEach((b, i) => {
        let color;
        let glow;

        if (phase === 'MEMORIZE') {
          color = b.isTarget ? '#10b981' : '#1e293b';
          glow = b.isTarget;
        } else if (phase === 'TRACK') {
          // Disguised phase: all balls appear identical neutral slate
          color = '#94a3b8';
          glow = false;
        } else {
          // IDENTIFY phase
          const isSelected = selectedIndices.includes(i);
          if (isSelected) {
            color = '#10b981';
            glow = true;
          } else {
            color = '#334155';
            glow = false;
          }
        }

        drawTacticalSphere(b.x, b.y, BALL_RADIUS, color, glow);

        // Selection ring & checkmark on identified balls
        if (phase === 'IDENTIFY' && selectedIndices.includes(i)) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(b.x, b.y, BALL_RADIUS + 6, 0, Math.PI * 2);
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Small checkmark
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(b.x - 4, b.y);
          ctx.lineTo(b.x - 1, b.y + 3);
          ctx.lineTo(b.x + 4, b.y - 3);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Draw selection reticle in IDENTIFY phase
      if (reticle.active) {
        ctx.save();
        ctx.translate(reticle.x, reticle.y);
        ctx.beginPath();
        ctx.arc(0, 0, BALL_RADIUS + 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Cross ticks
        const tLen = 4;
        const oR = BALL_RADIUS + 8;
        ctx.beginPath();
        ctx.moveTo(0, -oR - 1); ctx.lineTo(0, -oR - tLen);
        ctx.moveTo(0, oR + 1); ctx.lineTo(0, oR + tLen);
        ctx.moveTo(-oR - 1, 0); ctx.lineTo(-oR - tLen, 0);
        ctx.moveTo(oR + 1, 0); ctx.lineTo(oR + tLen, 0);
        ctx.stroke();

        ctx.restore();
      }
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

