'use client';

import React, { useRef, useEffect } from 'react';

/**
 * VisualTrackingSpeedTestPreview
 * Authentic HTML5 <canvas> simulation of the Visual Tracking Speed Test drill.
 *
 * Simulates:
 * - Deep dark #050508 tactical arena with coordinate grid.
 * - High-speed omnidirectional vector dashes bouncing dynamically off arena boundaries.
 * - Fading velocity speed trail behind the darting target.
 * - Real in-game target styling: depleting circular countdown timer arc, concentric tactical red rings,
 *   specular highlight sheen, and bright white central core pip.
 * - Ballistic intercept reticle with predictive tracking.
 * - Dynamic hit reactions: expanding shockwave rings, radiant red/white particle sparks,
 *   and floating +100 score popups.
 * - Zero in-preview title pills/badges (no fake title tags or speed badges).
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function VisualTrackingSpeedTestPreview() {
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
      vx: 120,
      vy: 80,
      spawnTime: 0,
      ttl: 2400,
    };

    let trail = []; // historical positions for speed trails
    let crosshair = { x: 0, y: 0 };
    let rings = [];
    let particles = [];
    let popups = [];
    let nextHitTime = 0;

    const spawnTarget = (now) => {
      const marginX = width * 0.12;
      const marginY = height * 0.16;
      target.radius = Math.max(10, Math.min(width, height) * 0.08);

      target.x = marginX + Math.random() * (width - marginX * 2);
      target.y = marginY + Math.random() * (height - marginY * 2);

      const angle = Math.random() * Math.PI * 2;
      const speed = 130 + Math.random() * 60;
      target.vx = Math.cos(angle) * speed;
      target.vy = Math.sin(angle) * speed;
      target.spawnTime = now;
      target.ttl = 2400;

      trail = [];
      nextHitTime = now + 450 + Math.random() * 300;
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
        spawnTarget(now);
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

      // Subtle arena boundary perimeter markers
      const marginX = width * 0.09;
      const marginY = height * 0.12;
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(marginX, marginY, width - marginX * 2, height - marginY * 2);

      if (prefersReducedMotion) {
        // Static frame for reduced motion
        const r = Math.max(10, Math.min(width, height) * 0.08);
        const staticX = width * 0.5;
        const staticY = height * 0.5;

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

      // --- Target Movement & Boundary Bouncing ---
      target.x += target.vx * dt;
      target.y += target.vy * dt;

      // Arena bounces
      if (target.x - target.radius < marginX) {
        target.x = marginX + target.radius;
        target.vx = Math.abs(target.vx);
      } else if (target.x + target.radius > width - marginX) {
        target.x = width - marginX - target.radius;
        target.vx = -Math.abs(target.vx);
      }

      if (target.y - target.radius < marginY) {
        target.y = marginY + target.radius;
        target.vy = Math.abs(target.vy);
      } else if (target.y + target.radius > height - marginY) {
        target.y = height - marginY - target.radius;
        target.vy = -Math.abs(target.vy);
      }

      // Record velocity trails
      trail.unshift({ x: target.x, y: target.y });
      if (trail.length > 8) trail.pop();

      // Target TTL respawn
      if (now - target.spawnTime >= target.ttl) {
        spawnTarget(now);
      }

      // --- Velocity Trails Rendering ---
      for (let i = 0; i < trail.length; i++) {
        const tr = trail[i];
        const alpha = (1 - (i + 1) / (trail.length + 1)) * 0.25;
        const trailR = target.radius * (1 - (i + 1) * 0.08);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, Math.max(2, trailR * 0.7), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // --- Predictive Intercept Crosshair ---
      // Tracks target with responsive intercept smoothing
      const trackingSpeed = 10.0;
      crosshair.x += (target.x - crosshair.x) * Math.min(dt * trackingSpeed, 1);
      crosshair.y += (target.y - crosshair.y) * Math.min(dt * trackingSpeed, 1);

      // On-target intercept hit
      const dist = Math.hypot(crosshair.x - target.x, crosshair.y - target.y);
      if (dist < target.radius * 1.2 && now >= nextHitTime) {
        rings.push({
          x: target.x,
          y: target.y,
          startR: target.radius * 0.4,
          maxR: target.radius * 2.5,
          life: 0.35,
          maxLife: 0.35,
          color: '#ef4444',
        });

        for (let i = 0; i < 11; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = 40 + Math.random() * 85;
          particles.push({
            x: target.x,
            y: target.y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            color: Math.random() > 0.3 ? '#ef4444' : '#ffffff',
            life: 0.42,
            maxLife: 0.42,
          });
        }

        popups.push({
          x: target.x,
          y: target.y - target.radius * 0.7,
          text: '+100',
          life: 0.55,
          maxLife: 0.55,
        });

        // Direction redirect on hit
        const newAngle = Math.random() * Math.PI * 2;
        const spd = 130 + Math.random() * 50;
        target.vx = Math.cos(newAngle) * spd;
        target.vy = Math.sin(newAngle) * spd;

        nextHitTime = now + 750 + Math.random() * 350;
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

      // 2. Concentric tactical outer rings
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

      // 5. White center core pip
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

      // --- Tactical Diamond Reticle ---
      ctx.save();
      const chX = crosshair.x;
      const chY = crosshair.y;
      const chLen = 8;
      const chGap = 3;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // 4 ticks
      ctx.moveTo(chX - chGap - chLen, chY);
      ctx.lineTo(chX - chGap, chY);
      ctx.moveTo(chX + chGap, chY);
      ctx.lineTo(chX + chGap + chLen, chY);
      ctx.moveTo(chX, chY - chGap - chLen);
      ctx.lineTo(chX, chY - chGap);
      ctx.moveTo(chX, chY + chGap);
      ctx.lineTo(chX, chY + chGap + chLen);
      ctx.stroke();

      // Subtle diamond marker at center
      const dSize = 3;
      ctx.beginPath();
      ctx.moveTo(chX, chY - dSize);
      ctx.lineTo(chX + dSize, chY);
      ctx.lineTo(chX, chY + dSize);
      ctx.lineTo(chX - dSize, chY);
      ctx.closePath();
      ctx.stroke();

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
      className="w-full h-full relative overflow-hidden bg-[#050508] select-none pointer-events-none vst-prev"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

