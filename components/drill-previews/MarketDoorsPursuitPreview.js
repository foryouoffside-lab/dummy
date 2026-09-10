'use client';

import React, { useRef, useEffect } from 'react';

/**
 * MarketDoorsPursuitPreview
 * Authentic HTML5 <canvas> simulation of the Corner Checking Trainer / Market Doors Pursuit drill.
 *
 * Simulates:
 * - Deep dark #050508 arena with subtle coordinate grid.
 * - 5 tactical centered doorways (D-01 through D-05) with dark recessed interiors and red border frames.
 * - Target flashing inside doorways with depleting countdown arcs and concentric red tactical rings.
 * - Fast saccadic sweep crosshair checking angles and snapping onto flashing door targets.
 * - Dynamic hit reactions: expanding shockwave rings, radiant red/white particle sparks,
 *   and floating +100 score popups.
 * - Zero in-preview title pills/badges (no fake title tags or telemetry badges).
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function MarketDoorsPursuitPreview() {
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
    const doorCount = 5;
    let doors = [];

    const computeDoors = () => {
      if (width === 0 || height === 0) return [];
      const dw = Math.min(52, width * 0.135);
      const dh = Math.min(88, height * 0.44);
      const totalDoorsW = doorCount * dw;
      const spacing = (width * 0.84 - totalDoorsW) / (doorCount - 1);
      const startX = (width - (totalDoorsW + spacing * (doorCount - 1))) / 2;
      const doorY = (height - dh) * 0.42;

      const res = [];
      for (let i = 0; i < doorCount; i++) {
        res.push({
          x: startX + i * (dw + spacing),
          y: doorY,
          w: dw,
          h: dh,
          label: `D-0${i + 1}`,
        });
      }
      return res;
    };

    doors = computeDoors();

    // Sequence of door targets for dynamic showcase
    const doorSequence = [1, 3, 0, 4, 2, 3, 1, 4];
    let sequenceIdx = 0;

    let target = null;
    let crosshair = {
      x: width * 0.5,
      y: height * 0.45,
      fromX: width * 0.5,
      fromY: height * 0.45,
      toX: width * 0.5,
      toY: height * 0.45,
      moveProgress: 1,
    };

    let rings = [];
    let particles = [];
    let popups = [];
    let nextSpawnTime = 0;

    const spawnTargetAtDoor = (now, doorIdx) => {
      if (doors.length === 0) doors = computeDoors();
      const d = doors[doorIdx % doors.length];
      const radius = Math.max(8, Math.min(d.w * 0.38, d.h * 0.22));

      target = {
        doorIdx,
        x: d.x + d.w * 0.5,
        y: d.y + d.h * 0.48,
        radius,
        spawnTime: now,
        ttl: 1200,
      };

      // Initiate crosshair flick after short human reaction latency (~140ms)
      setTimeout(() => {
        if (!target) return;
        crosshair.fromX = crosshair.x;
        crosshair.fromY = crosshair.y;
        crosshair.toX = target.x;
        crosshair.toY = target.y;
        crosshair.moveProgress = 0;
      }, 140);
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
        doors = computeDoors();
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (doors.length === 0) {
        doors = computeDoors();
      }

      if (!initialized) {
        spawnTargetAtDoor(now, doorSequence[0]);
        crosshair.x = doors[2] ? doors[2].x + doors[2].w * 0.5 : width * 0.5;
        crosshair.y = doors[2] ? doors[2].y + doors[2].h * 0.5 : height * 0.45;
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

      // --- Render 5 Tactical Doorways ---
      for (let i = 0; i < doors.length; i++) {
        const d = doors[i];
        const isTargetDoor = target && target.doorIdx === i;
        ctx.save();

        // Dark recessed doorway interior
        ctx.fillStyle = isTargetDoor ? '#0c0a14' : '#070710';
        ctx.strokeStyle = isTargetDoor ? 'rgba(239, 68, 68, 0.75)' : 'rgba(239, 68, 68, 0.35)';
        ctx.lineWidth = isTargetDoor ? 1.8 : 1.4;
        if (isTargetDoor) {
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 6;
        }
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(d.x, d.y, d.w, d.h, 4);
        } else {
          ctx.rect(d.x, d.y, d.w, d.h);
        }
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Interior horizontal shutter slats
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
        ctx.lineWidth = 1;
        for (let sy = d.y + 14; sy < d.y + d.h - 8; sy += 11) {
          ctx.beginPath();
          ctx.moveTo(d.x + 4, sy);
          ctx.lineTo(d.x + d.w - 4, sy);
          ctx.stroke();
        }

        // Door frame header bar
        ctx.fillStyle = isTargetDoor ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(d.x, d.y, d.w, 4);

        // Doorway number label
        ctx.fillStyle = isTargetDoor ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255, 255, 255, 0.35)';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(d.label, d.x + d.w / 2, d.y + d.h + 13);

        ctx.restore();
      }

      if (prefersReducedMotion) {
        // Static frame for reduced motion
        const d = doors[2] || { x: width * 0.5 - 20, y: height * 0.3, w: 40, h: 70 };
        const r = 11;
        const tx = d.x + d.w * 0.5;
        const ty = d.y + d.h * 0.5;

        ctx.save();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(tx, ty, r * 0.82, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tx, ty, r * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      // --- Spawn logic ---
      if (!target && now >= nextSpawnTime) {
        sequenceIdx = (sequenceIdx + 1) % doorSequence.length;
        spawnTargetAtDoor(now, doorSequence[sequenceIdx]);
      }

      // --- Crosshair Saccadic Motion Logic ---
      if (crosshair.moveProgress < 1) {
        crosshair.moveProgress += dt * 5.0; // Fast ballistic saccade (~200ms)
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
            nextSpawnTime = now + 450 + Math.random() * 250;
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

      // --- Draw Target Inside Doorway ---
      if (target) {
        const t = target;
        const r = t.radius;
        const remaining = Math.max(0, 1 - (now - t.spawnTime) / t.ttl);

        ctx.save();

        // 1. Depleting countdown ring
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
      className="w-full h-full relative overflow-hidden bg-[#050508] select-none pointer-events-none mdp-prev"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

