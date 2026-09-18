'use client';

import React, { useRef, useEffect } from 'react';

/**
 * FPSTrackingTrainerPreview
 * Authentic HTML5 <canvas> simulation of the FPS Tracking Trainer drill.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Horizontal A-D strafe corridor with tactical boundary goalposts.
 * - Dynamic evasive target executing erratic human-like horizontal strafes with velocity reversals.
 * - Real in-game target styling: depleting countdown timer arc, concentric tactical red rings,
 *   specular highlight sheen, and bright white core pip.
 * - Ballistic smooth pursuit crosshair tracking the target along its path.
 * - Dynamic hit reactions: expanding shockwave rings, radiant red/white particle sparks,
 *   and floating +100 score popups.
 * - Zero in-preview title pills/badges (no fake title tags or telemetry badges).
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function FPSTrackingTrainerPreview() {
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
    let target = {
      x: 0,
      y: 0,
      radius: 12,
      vx: 140,
      spawnTime: 0,
      ttl: 2600,
      nextSwitchTime: 0,
    };

    let crosshair = { x: 0, y: 0, vx: 0, vy: 0 };
    let rings = [];
    let particles = [];
    let popups = [];
    let nextHitTime = 0;

    const resetTarget = (now) => {
      const bounds = width * 0.14;
      const spawnLeft = Math.random() > 0.5;
      target.radius = Math.max(10, Math.min(width, height) * 0.08);
      target.x = spawnLeft ? bounds + target.radius + 15 : width - bounds - target.radius - 15;
      target.y = height * 0.52;
      target.vx = (spawnLeft ? 1 : -1) * (110 + Math.random() * 50);
      target.spawnTime = now;
      target.ttl = 2600;
      target.nextSwitchTime = now + 650 + Math.random() * 500;
      nextHitTime = now + 400 + Math.random() * 300;
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
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (!initialized) {
        resetTarget(now);
        crosshair.x = target.x;
        crosshair.y = target.y;
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
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // --- Horizontal Strafe Bounds & Guidelines ---
      const bounds = width * 0.14;
      const py = height * 0.52;

      // Dashed centerline corridor
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(bounds, py);
      ctx.lineTo(width - bounds, py);
      ctx.stroke();
      ctx.restore();

      // Goalpost boundary brackets (left and right)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.lineWidth = 1.8;
      const goalH = 20;
      ctx.beginPath();
      // Left boundary
      ctx.moveTo(bounds, py - goalH);
      ctx.lineTo(bounds, py + goalH);
      // Right boundary
      ctx.moveTo(width - bounds, py - goalH);
      ctx.lineTo(width - bounds, py + goalH);
      ctx.stroke();

      if (prefersReducedMotion) {
        // Static frame for reduced motion
        const r = Math.max(10, Math.min(width, height) * 0.08);
        const staticX = width * 0.5;
        const staticY = py;

        ctx.save();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(staticX, staticY, r * 0.82, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(staticX, staticY, r * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      // --- Target Physics & Movement ---
      target.x += target.vx * dt;

      // Wall bounce on boundary goalposts
      if (target.x <= bounds + target.radius) {
        target.x = bounds + target.radius;
        target.vx = Math.abs(target.vx);
      } else if (target.x >= width - bounds - target.radius) {
        target.x = width - bounds - target.radius;
        target.vx = -Math.abs(target.vx);
      }

      // Human-like evasive strafe direction reversal
      if (now >= target.nextSwitchTime) {
        target.vx = -target.vx * (0.9 + Math.random() * 0.25);
        target.nextSwitchTime = now + 600 + Math.random() * 650;
      }

      // Target TTL respawn
      if (now - target.spawnTime >= target.ttl) {
        resetTarget(now);
      }

      // --- Smooth Pursuit Crosshair ---
      // Crosshair pursues target position with realistic human tracking lag/smoothing
      const trackingSpeed = 12.0;
      crosshair.x += (target.x - crosshair.x) * Math.min(dt * trackingSpeed, 1);
      crosshair.y += (target.y - crosshair.y) * Math.min(dt * trackingSpeed, 1);

      // Periodic on-target hit confirmation
      const dist = Math.hypot(crosshair.x - target.x, crosshair.y - target.y);
      if (dist < target.radius * 1.2 && now >= nextHitTime) {
        // Trigger hit effects
        rings.push({
          x: target.x,
          y: target.y,
          startR: target.radius * 0.4,
          maxR: target.radius * 2.4,
          life: 0.32,
          maxLife: 0.32,
          color: '#ef4444',
        });

        for (let i = 0; i < 10; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = 35 + Math.random() * 80;
          particles.push({
            x: target.x,
            y: target.y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            color: Math.random() > 0.3 ? '#ef4444' : '#ffffff',
            life: 0.4,
            maxLife: 0.4,
          });
        }

        popups.push({
          x: target.x,
          y: target.y - target.radius * 0.7,
          text: '+100',
          life: 0.55,
          maxLife: 0.55,
        });

        nextHitTime = now + 750 + Math.random() * 400;
      }

      // --- Target Rendering ---
      const remaining = Math.max(0, 1 - (now - target.spawnTime) / target.ttl);
      const r = target.radius;
      const tx = target.x;
      const ty = target.y;

      ctx.save();

      // 1. Depleting countdown timer arc
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

      // 2. Tactical concentric rings
      ctx.globalAlpha = 0.22;
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

      // 3. Glowing red core body
      ctx.globalAlpha = 0.9;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(tx, ty, r * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 4. Specular highlight sheen
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tx - r * 0.22, ty - r * 0.22, r * 0.26, 0, Math.PI * 2);
      ctx.fill();

      // 5. Crisp white center core pip
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tx, ty, Math.max(2.5, r * 0.18), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

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
      const chColor = '#22c55e';
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
      className="w-full h-full relative overflow-hidden bg-[#050508] select-none pointer-events-none ftt-prev"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

