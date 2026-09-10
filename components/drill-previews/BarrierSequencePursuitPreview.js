'use client';

import React, { useRef, useEffect } from 'react';

/**
 * BarrierSequencePursuitPreview
 * Authentic HTML5 <canvas> simulation of the Jiggle Peek Trainer / Barrier Sequence Pursuit drill.
 *
 * Simulates:
 * - Deep dark #050508 arena with subtle coordinate grid.
 * - 4 tactical cover barriers at 4 corner quadrants with inner horizontal slats and red borders.
 * - Targets jiggle-peeking from behind barriers with smooth ease-out occlusion and countdown arcs.
 * - Saccadic snap crosshair flicking between corner gates to intercept peeking targets.
 * - Dynamic hit reactions: expanding shockwave rings, radiant red/white particle sparks,
 *   and floating +100 score popups.
 * - Zero in-preview title pills/badges (no fake title tags or telemetry badges).
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function BarrierSequencePursuitPreview() {
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

    // Compute 4 corner barriers
    let barriers = [];
    const computeBarriers = () => {
      if (width === 0 || height === 0) return [];
      const bW = Math.min(48, width * 0.13);
      const bH = Math.min(74, height * 0.38);
      return [
        { id: 0, x: width * 0.22 - bW / 2, y: height * 0.28 - bH / 2, w: bW, h: bH, peekDirX: 1, peekDirY: 0.5 }, // Top-Left
        { id: 1, x: width * 0.78 - bW / 2, y: height * 0.28 - bH / 2, w: bW, h: bH, peekDirX: -1, peekDirY: 0.5 }, // Top-Right
        { id: 2, x: width * 0.78 - bW / 2, y: height * 0.72 - bH / 2, w: bW, h: bH, peekDirX: -1, peekDirY: -0.5 }, // Bottom-Right
        { id: 3, x: width * 0.22 - bW / 2, y: height * 0.72 - bH / 2, w: bW, h: bH, peekDirX: 1, peekDirY: -0.5 }, // Bottom-Left
      ];
    };

    barriers = computeBarriers();

    // Sequence of corner barrier targets for dynamic showcase
    const sequence = [0, 1, 3, 2, 0, 2];
    let sequenceIdx = 0;

    let target = null;
    let crosshair = {
      x: width * 0.5,
      y: height * 0.5,
      fromX: width * 0.5,
      fromY: height * 0.5,
      toX: width * 0.5,
      toY: height * 0.5,
      moveProgress: 1,
    };

    let rings = [];
    let particles = [];
    let popups = [];
    let nextSpawnTime = 0;

    const spawnTargetAtBarrier = (now, barrierIdx) => {
      if (barriers.length === 0) barriers = computeBarriers();
      const b = barriers[barrierIdx % barriers.length];
      const radius = Math.max(8, Math.min(b.w * 0.38, b.h * 0.24));

      // Hidden inside cover at base, peeking out towards center
      const baseX = b.x + b.w * 0.5;
      const baseY = b.y + b.h * 0.5;
      const peekDist = b.w * 0.75;
      const peekX = baseX + b.peekDirX * peekDist;
      const peekY = baseY + b.peekDirY * (b.h * 0.25);

      target = {
        barrierIdx,
        baseX,
        baseY,
        peekX,
        peekY,
        x: baseX,
        y: baseY,
        radius,
        spawnTime: now,
        ttl: 1250,
      };

      // Initiate crosshair flick after short reaction latency (~150ms)
      setTimeout(() => {
        if (!target) return;
        crosshair.fromX = crosshair.x;
        crosshair.fromY = crosshair.y;
        crosshair.toX = target.peekX;
        crosshair.toY = target.peekY;
        crosshair.moveProgress = 0;
      }, 150);
    };

    let lastTime = performance.now();
    let initialized = false;

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isVisible && !prefersReducedMotion) {
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (width === 0 || height === 0) {
        updateDimensions();
        barriers = computeBarriers();
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (barriers.length === 0) {
        barriers = computeBarriers();
      }

      if (!initialized) {
        spawnTargetAtBarrier(now, sequence[0]);
        crosshair.x = width * 0.5;
        crosshair.y = height * 0.5;
        crosshair.toX = crosshair.x;
        crosshair.toY = crosshair.y;
        initialized = true;
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
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      if (prefersReducedMotion) {
        // Static poster for reduced motion
        const b = barriers[1] || { x: width * 0.7, y: height * 0.25, w: 45, h: 70 };
        const r = 10;
        ctx.save();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(b.x - 8, b.y + b.h * 0.5, r * 0.85, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(b.x - 8, b.y + b.h * 0.5, r * 0.2, 0, Math.PI * 2);
        ctx.fill();

        for (const bar of barriers) {
          ctx.fillStyle = '#0e0e18';
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(bar.x, bar.y, bar.w, bar.h, 6);
          else ctx.rect(bar.x, bar.y, bar.w, bar.h);
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
        return;
      }

      // --- Spawn Logic ---
      if (!target && now >= nextSpawnTime) {
        sequenceIdx = (sequenceIdx + 1) % sequence.length;
        spawnTargetAtBarrier(now, sequence[sequenceIdx]);
      }

      // --- Target Jiggle Peek Animation ---
      if (target) {
        const elapsed = now - target.spawnTime;
        const peekProgress = Math.min(1, elapsed / 220);
        // Smooth ease-out peek
        const ease = 1 - Math.pow(1 - peekProgress, 3);
        target.x = target.baseX + (target.peekX - target.baseX) * ease;
        target.y = target.baseY + (target.peekY - target.baseY) * ease;
      }

      // --- Crosshair Saccadic Motion ---
      if (crosshair.moveProgress < 1) {
        crosshair.moveProgress += dt * 4.8; // Ballistic snap (~210ms)
        if (crosshair.moveProgress >= 1) {
          crosshair.moveProgress = 1;
          crosshair.x = crosshair.toX;
          crosshair.y = crosshair.toY;

          // Crosshair arrived at target -> Trigger hit!
          if (target) {
            // Shockwave ring
            rings.push({
              x: target.x,
              y: target.y,
              startR: target.radius * 0.5,
              maxR: target.radius * 2.6,
              life: 0.35,
              maxLife: 0.35,
              color: '#ef4444',
            });

            // Spark particles
            for (let i = 0; i < 12; i++) {
              const angle = Math.random() * Math.PI * 2;
              const spd = 35 + Math.random() * 85;
              particles.push({
                x: target.x,
                y: target.y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color: Math.random() > 0.35 ? '#ef4444' : '#ffffff',
                life: 0.42,
                maxLife: 0.42,
              });
            }

            // Score popup
            popups.push({
              x: target.x,
              y: target.y - target.radius * 0.8,
              text: '+100',
              life: 0.55,
              maxLife: 0.55,
            });

            target = null;
            nextSpawnTime = now + 420 + Math.random() * 260;
          }
        } else {
          // Ballistic cubic ease out
          const tVal = crosshair.moveProgress;
          const ease = tVal < 0.5
            ? 4 * tVal * tVal * tVal
            : 1 - Math.pow(-2 * tVal + 2, 3) / 2;
          crosshair.x = crosshair.fromX + (crosshair.toX - crosshair.fromX) * ease;
          crosshair.y = crosshair.fromY + (crosshair.toY - crosshair.fromY) * ease;
        }
      }

      // --- Draw Active Target (Drawn BEFORE barriers so cover occludes it!) ---
      if (target) {
        const t = target;
        const r = t.radius;
        const remaining = Math.max(0, 1 - (now - t.spawnTime) / t.ttl);

        ctx.save();

        // 1. Depleting countdown arc ring
        ctx.globalAlpha = 0.55;
        ctx.strokeStyle = remaining < 0.3 ? '#ef4444' : '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(t.x, t.y, r + 5, -Math.PI / 2, -Math.PI / 2 + remaining * Math.PI * 2);
        ctx.stroke();

        // 2. Ghost outer ring
        ctx.globalAlpha = 0.22;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(t.x, t.y, r + 3, 0, Math.PI * 2);
        ctx.stroke();

        // 3. Tactical outer ring
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // 4. Glowing red body
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(t.x, t.y, r * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // 5. Highlight sheen
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(t.x - r * 0.22, t.y - r * 0.22, r * 0.26, 0, Math.PI * 2);
        ctx.fill();

        // 6. Bright white center core
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(t.x, t.y, Math.max(2.5, r * 0.18), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // --- Draw 4 Tactical Cover Barriers (Drawn AFTER target to provide cover occlusion) ---
      for (let i = 0; i < barriers.length; i++) {
        const b = barriers[i];
        const isTargetBarrier = target && target.barrierIdx === i;
        ctx.save();

        ctx.fillStyle = isTargetBarrier ? '#100e1c' : '#0a0a14';
        ctx.strokeStyle = isTargetBarrier ? 'rgba(239, 68, 68, 0.75)' : 'rgba(239, 68, 68, 0.38)';
        ctx.lineWidth = isTargetBarrier ? 1.8 : 1.4;
        if (isTargetBarrier) {
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 6;
        }
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(b.x, b.y, b.w, b.h, 6);
        } else {
          ctx.rect(b.x, b.y, b.w, b.h);
        }
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Inner horizontal tactical slats
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        for (let sy = b.y + 12; sy < b.y + b.h - 6; sy += 10) {
          ctx.beginPath();
          ctx.moveTo(b.x + 4, sy);
          ctx.lineTo(b.x + b.w - 4, sy);
          ctx.stroke();
        }

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
        pop.y -= dt * 25;
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
      const chLen = 7;
      const chGap = 3;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // 4 crosshair ticks
      ctx.moveTo(chX - chGap - chLen, chY);
      ctx.lineTo(chX - chGap, chY);
      ctx.moveTo(chX + chGap, chY);
      ctx.lineTo(chX + chGap + chLen, chY);
      ctx.moveTo(chX, chY - chGap - chLen);
      ctx.lineTo(chX, chY - chGap);
      ctx.moveTo(chX, chY + chGap);
      ctx.lineTo(chX, chY + chGap + chLen);
      ctx.stroke();

      // Center targeting pip
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(chX, chY, 1.2, 0, Math.PI * 2);
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
      className="w-full h-full relative overflow-hidden bg-[#050508] select-none pointer-events-none bsp-prev"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

