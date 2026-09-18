'use client';

import React, { useRef, useEffect } from 'react';

/**
 * StabilityChallengePreview
 * Authentic HTML5 <canvas> simulation of Stability Challenge (Balance & Postural Stability).
 * Matches StabilityChallengeClient.js:
 *
 * Simulates:
 * - Deep tactical #050508 arena with subtle coordinate grid.
 * - Central Safe Zone disc (#0d0d18) with glowing emerald (#10b981) containment ring and center pip.
 * - Dynamic wind force particles/vectors blowing across the field, pushing the crosshair off-center.
 * - Tactical player crosshair (ring, cardinal ticks, center dot) applying micro-stabilization counter-forces
 *   to remain centered inside the safe ring.
 * - Dynamic lock feedback:
 *   * In-zone lock: emerald ring glow (#10b981), subtle stabilization spark particles.
 *   * Wind gust displacement: crosshair drifts towards the edge, ring pulses amber/red briefly before snapping back to center.
 * - Zero in-preview title pills/badges/text overlays.
 * - Guaranteed first-frame draw + HiDPI scaling + ResizeObserver + IntersectionObserver auto-pause.
 */
export default function StabilityChallengePreview() {
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

    // Crosshair physics state
    let crosshair = { x: 0, y: 0, vx: 0, vy: 0 };
    let windForce = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let windTimer = 0;
    let particles = [];
    let windStreaks = [];

    // Initialize wind streaks
    for (let i = 0; i < 14; i++) {
      windStreaks.push({
        x: Math.random() * 300,
        y: Math.random() * 200,
        len: 15 + Math.random() * 25,
        speed: 80 + Math.random() * 60,
        alpha: 0.1 + Math.random() * 0.25,
      });
    }

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!width || !height) return;

      const cx = width / 2;
      const cy = height / 2;
      const safeRadius = Math.min(width, height) * 0.22;

      // Deep tactical background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      if (!prefersReducedMotion) {
        windTimer += dt;

        // Periodic dynamic wind shifts
        if (windTimer > 1.2) {
          windTimer = 0;
          const angle = Math.random() * Math.PI * 2;
          const strength = 120 + Math.random() * 110;
          windForce.targetX = Math.cos(angle) * strength;
          windForce.targetY = Math.sin(angle) * strength;
        }

        // Smooth wind vector interpolation
        windForce.x += (windForce.targetX - windForce.x) * dt * 3.5;
        windForce.y += (windForce.targetY - windForce.y) * dt * 3.5;

        // Player micro-stabilization counter-force pulling crosshair back to center
        const toCenterX = cx - crosshair.x;
        const toCenterY = cy - crosshair.y;
        const distToCenter = Math.hypot(toCenterX, toCenterY);
        const counterStrength = distToCenter > safeRadius * 0.8 ? 5.5 : 3.8;

        crosshair.vx += (windForce.x + toCenterX * counterStrength) * dt;
        crosshair.vy += (windForce.y + toCenterY * counterStrength) * dt;
        crosshair.vx *= 0.88;
        crosshair.vy *= 0.88;

        crosshair.x += crosshair.vx * dt;
        crosshair.y += crosshair.vy * dt;

        // Keep initialized in center on first run
        if (crosshair.x === 0 && crosshair.y === 0) {
          crosshair.x = cx;
          crosshair.y = cy;
        }

        // Update wind streaks
        const windAngle = Math.atan2(windForce.y, windForce.x) || 0;
        const cosA = Math.cos(windAngle);
        const sinA = Math.sin(windAngle);

        windStreaks.forEach((ws) => {
          ws.x += cosA * ws.speed * dt;
          ws.y += sinA * ws.speed * dt;
          if (ws.x < -40) ws.x = width + 40;
          if (ws.x > width + 40) ws.x = -40;
          if (ws.y < -40) ws.y = height + 40;
          if (ws.y > height + 40) ws.y = -40;
        });

        // Spawn occasional stabilization particles
        if (distToCenter < safeRadius && Math.random() < 0.2) {
          const a = Math.random() * Math.PI * 2;
          particles.push({
            x: cx + Math.cos(a) * safeRadius,
            y: cy + Math.sin(a) * safeRadius,
            vx: -Math.cos(a) * 15,
            vy: -Math.sin(a) * 15,
            alpha: 0.8,
            decay: 2.0,
          });
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= dt * p.decay;
          if (p.alpha <= 0) particles.splice(i, 1);
        }
      } else {
        crosshair.x = cx;
        crosshair.y = cy;
      }

      // Check safe zone lock
      const distFromCenter = Math.hypot(crosshair.x - cx, crosshair.y - cy);
      const isLocked = distFromCenter <= safeRadius;

      // Draw wind streaks
      ctx.save();
      const windAngle = Math.atan2(windForce.y, windForce.x) || 0;
      const cosA = Math.cos(windAngle);
      const sinA = Math.sin(windAngle);

      windStreaks.forEach((ws) => {
        ctx.beginPath();
        ctx.moveTo(ws.x, ws.y);
        ctx.lineTo(ws.x - cosA * ws.len, ws.y - sinA * ws.len);
        ctx.strokeStyle = `rgba(56, 189, 248, ${ws.alpha * 0.4})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });
      ctx.restore();

      // --- CENTRAL SAFE ZONE DISC ---
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, safeRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0d0d18';
      ctx.fill();

      // Safe Zone containment ring
      const ringColor = isLocked ? '#10b981' : '#f59e0b';
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = ringColor;
      ctx.shadowBlur = isLocked ? 14 : 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Center alignment target pip
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = isLocked ? '#10b981' : '#f59e0b';
      ctx.fill();
      ctx.restore();

      // --- PARTICLES ---
      for (const p of particles) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.restore();
      }

      // --- TACTICAL PLAYER CROSSHAIR ---
      ctx.save();
      const chColor = isLocked ? '#10b981' : '#f59e0b';
      ctx.strokeStyle = chColor;
      ctx.fillStyle = chColor;

      const chRadius = 11;
      const gap = 4;
      const tickLen = 11;

      // Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(crosshair.x, crosshair.y, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with gap
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(crosshair.x, crosshair.y - tickLen); ctx.lineTo(crosshair.x, crosshair.y - gap);
      ctx.moveTo(crosshair.x, crosshair.y + tickLen); ctx.lineTo(crosshair.x, crosshair.y + gap);
      ctx.moveTo(crosshair.x - tickLen, crosshair.y); ctx.lineTo(crosshair.x - gap, crosshair.y);
      ctx.moveTo(crosshair.x + tickLen, crosshair.y); ctx.lineTo(crosshair.x + gap, crosshair.y);
      ctx.stroke();

      // Center pip
      ctx.beginPath();
      ctx.arc(crosshair.x, crosshair.y, 1.8, 0, Math.PI * 2);
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

