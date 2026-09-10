'use client';

import React, { useRef, useEffect } from 'react';

/**
 * PursuitTrackerPreview
 * Authentic HTML5 <canvas> simulation of Auto-Pursuit (Smooth Pursuit Tracking).
 * Matches AutoPursuitClient.js:
 *
 * Simulates:
 * - Deep tactical #050508 arena with coordinate grid.
 * - Smooth continuous target motion with velocity steering and wall bounces.
 * - Fading motion path trail behind the target.
 * - Layered tactical target sphere (ghost ring, outer ring, glowing body, highlight sheen, white core).
 * - Smooth pursuit crosshair tracking the target with realistic human-like lag and catch-up saccades.
 * - Dual state behavior:
 *   * Locked state (emerald #10b981): 360° lock-on progress ring sweeps around target, tracking pulse burst.
 *   * Re-acquiring state (orange #f97316): Target turns corner, reticle lags behind then smoothly catches up.
 * - Expanding pulse rings on complete lock cycles.
 * - Zero in-preview title pills/badges/text overlays.
 * - Guaranteed first-frame draw + HiDPI scaling + ResizeObserver + IntersectionObserver auto-pause.
 */
export default function PursuitTrackerPreview() {
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

    // Target state
    const targetRadius = 16;
    let target = {
      x: 100,
      y: 90,
      vx: 45,
      vy: 35,
      trail: [],
    };

    // Reticle state
    let reticle = {
      x: 90,
      y: 80,
      radius: 14,
    };

    // Tracking physics & simulation
    let continuousTrackTime = 0;
    const pulseCycleDuration = 1.2; // 1.2s to complete one lock-on pulse
    let pulseRings = [];
    let particles = [];
    let turnTimer = 0;

    const spawnPulse = (cx, cy) => {
      pulseRings.push({
        x: cx,
        y: cy,
        radius: targetRadius + 6,
        maxRadius: targetRadius + 42,
        alpha: 1.0,
        color: '#10b981',
      });
      pulseRings.push({
        x: cx,
        y: cy,
        radius: targetRadius + 2,
        maxRadius: targetRadius + 28,
        alpha: 0.8,
        color: '#ffffff',
      });
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const spd = 30 + Math.random() * 40;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          alpha: 1.0,
          decay: 2.2,
          size: 1.8 + Math.random() * 1.2,
        });
      }
    };

    const drawTacticalSphere = (cx, cy, r, color, glow) => {
      ctx.save();

      // Ghost outer ring
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 5, 0, Math.PI * 2);
      ctx.stroke();

      // Tactical outer ring
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Filled body with glow
      ctx.globalAlpha = 0.9;
      ctx.shadowColor = color;
      ctx.shadowBlur = glow ? 14 : 0;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Highlight sheen
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - r * 0.22, cy - r * 0.22, r * 0.28, 0, Math.PI * 2);
      ctx.fill();

      // Bright white center core
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(2.5, r * 0.2), 0, Math.PI * 2);
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

      // Coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 26;
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
        turnTimer += dt;

        // Periodic gentle steering change to simulate organic target evasion
        if (turnTimer > 1.8) {
          turnTimer = 0;
          const steerAngle = (Math.random() - 0.5) * 1.4;
          const currentSpeed = Math.hypot(target.vx, target.vy) || 50;
          const currentAngle = Math.atan2(target.vy, target.vx);
          const newAngle = currentAngle + steerAngle;
          target.vx = Math.cos(newAngle) * currentSpeed;
          target.vy = Math.sin(newAngle) * currentSpeed;
        }

        // Move target
        target.x += target.vx * dt;
        target.y += target.vy * dt;

        // Wall bounce with boundary padding
        const pad = targetRadius + 8;
        if (target.x <= pad) {
          target.x = pad;
          target.vx = Math.abs(target.vx);
        } else if (target.x >= width - pad) {
          target.x = width - pad;
          target.vx = -Math.abs(target.vx);
        }
        if (target.y <= pad) {
          target.y = pad;
          target.vy = Math.abs(target.vy);
        } else if (target.y >= height - pad) {
          target.y = height - pad;
          target.vy = -Math.abs(target.vy);
        }

        // Store trail
        target.trail.push({ x: target.x, y: target.y, age: 0 });
        for (let i = target.trail.length - 1; i >= 0; i--) {
          target.trail[i].age += dt;
          if (target.trail[i].age > 0.6) {
            target.trail.splice(i, 1);
          }
        }

        // Pursuit Reticle tracking logic
        // Reticle pursues target with spring physics + intentional human lag
        const dx = target.x - reticle.x;
        const dy = target.y - reticle.y;
        const dist = Math.hypot(dx, dy);

        // Responsive spring tracking
        const trackSpeed = dist > 40 ? 8.5 : 5.8;
        reticle.x += dx * Math.min(1, dt * trackSpeed);
        reticle.y += dy * Math.min(1, dt * trackSpeed);

        // Tracking lock check (within 24px)
        const isTracked = dist < targetRadius + 14;

        if (isTracked) {
          continuousTrackTime += dt;
          if (continuousTrackTime >= pulseCycleDuration) {
            continuousTrackTime = 0;
            spawnPulse(target.x, target.y);
          }
        } else {
          continuousTrackTime = Math.max(0, continuousTrackTime - dt * 2.0);
        }

        // Update pulse rings
        for (let i = pulseRings.length - 1; i >= 0; i--) {
          const p = pulseRings[i];
          p.radius += (p.maxRadius - p.radius) * Math.min(1, dt * 8);
          p.alpha -= dt * 1.8;
          if (p.alpha <= 0) pulseRings.splice(i, 1);
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const pt = particles[i];
          pt.x += pt.vx * dt;
          pt.y += pt.vy * dt;
          pt.vx *= 0.94;
          pt.vy *= 0.94;
          pt.alpha -= dt * pt.decay;
          if (pt.alpha <= 0) particles.splice(i, 1);
        }
      }

      // Draw faint motion trail path
      if (target.trail.length > 2) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(target.trail[0].x, target.trail[0].y);
        for (let i = 1; i < target.trail.length; i++) {
          ctx.lineTo(target.trail[i].x, target.trail[i].y);
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Distance to evaluate lock state
      const currentDist = Math.hypot(target.x - reticle.x, target.y - reticle.y);
      const isLocked = currentDist < targetRadius + 14;
      const targetColor = isLocked ? '#10b981' : '#f97316';

      // Draw Lock-On Circular Progress Ring around target when tracked
      if (isLocked && continuousTrackTime > 0) {
        const progress = Math.min(1, continuousTrackTime / pulseCycleDuration);
        const progressAngle = progress * Math.PI * 2;
        const ringR = targetRadius + 7;

        // Background subtle guide ring
        ctx.beginPath();
        ctx.arc(target.x, target.y, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Progress arc
        ctx.beginPath();
        ctx.arc(target.x, target.y, ringR, -Math.PI / 2, -Math.PI / 2 + progressAngle, false);
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw main tactical target
      drawTacticalSphere(target.x, target.y, targetRadius, targetColor, true);

      // Draw expanding pulse rings
      for (const p of pulseRings) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.lineWidth = 2;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // Draw hit spark particles
      for (const pt of particles) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fill();
        ctx.restore();
      }

      // Draw Smooth Pursuit Crosshair Reticle
      ctx.save();
      ctx.translate(reticle.x, reticle.y);

      const reticleColor = isLocked ? '#10b981' : 'rgba(56, 189, 248, 0.85)';
      const reticleR = reticle.radius;

      // Outer reticle circle
      ctx.beginPath();
      ctx.arc(0, 0, reticleR, 0, Math.PI * 2);
      ctx.strokeStyle = reticleColor;
      ctx.lineWidth = 1.5;
      if (isLocked) {
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Reticle Crosshair Ticks (Cardinal)
      const tickExt = 6;
      ctx.strokeStyle = reticleColor;
      ctx.lineWidth = 1.5;
      // Top
      ctx.beginPath();
      ctx.moveTo(0, -reticleR - 1);
      ctx.lineTo(0, -reticleR - tickExt);
      ctx.stroke();
      // Bottom
      ctx.beginPath();
      ctx.moveTo(0, reticleR + 1);
      ctx.lineTo(0, reticleR + tickExt);
      ctx.stroke();
      // Left
      ctx.beginPath();
      ctx.moveTo(-reticleR - 1, 0);
      ctx.lineTo(-reticleR - tickExt, 0);
      ctx.stroke();
      // Right
      ctx.beginPath();
      ctx.moveTo(reticleR + 1, 0);
      ctx.lineTo(reticleR + tickExt, 0);
      ctx.stroke();

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

