'use client';

import React, { useRef, useEffect } from 'react';

/**
 * PredictivePursuitPreview
 * Authentic HTML5 <canvas> simulation of Predictive Pursuit.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Anticipatory vector corridors between strategic tactical waypoints.
 * - Glowing cyan forward predictive vector lead beam projecting to the landing node.
 * - Anticipated landing destination beacon with pulsing radar ring.
 * - Dynamic fading motion trail discs following the velocity vector.
 * - Canonical tactical target: concentric red rings, glowing red core, highlight sheen, white core dot.
 * - Anticipatory predictive pursuit reticle leading ahead along the flight trajectory.
 * - Zero in-preview title pills/badges (removed legacy TRAJECTORY PREDICTION LEAD pill).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function PredictivePursuitPreview() {
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
    let t = 0.2;
    let fromIdx = 0;
    let toIdx = 1;
    let trail = [];
    let crosshair = { x: 0, y: 0 };
    let initialized = false;

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isVisible && !prefersReducedMotion && initialized) {
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (width === 0 || height === 0) {
        updateDimensions();
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      // 4 Strategic Waypoints for continuous predictive vector flights
      const waypoints = [
        { x: width * 0.14, y: height * 0.72 },
        { x: width * 0.46, y: height * 0.25 },
        { x: width * 0.86, y: height * 0.65 },
        { x: width * 0.50, y: height * 0.82 },
      ];

      const fromPt = waypoints[fromIdx];
      const toPt = waypoints[toIdx];

      const dx = toPt.x - fromPt.x;
      const dy = toPt.y - fromPt.y;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;

      // Physics: travel time across vector segment
      const speed = 0.52; // ~1.92s per vector leg
      if (!prefersReducedMotion) {
        t += speed * dt;
        if (t >= 1) {
          t = 0;
          fromIdx = toIdx;
          toIdx = (toIdx + 1) % waypoints.length;
        }
      }

      const targetX = fromPt.x + dx * t;
      const targetY = fromPt.y + dy * t;
      const targetRadius = Math.max(8, Math.min(width, height) * 0.065);

      // Predictive lead: reticle positions ahead along the trajectory vector
      const leadDist = Math.min(26, (1 - t) * dist * 0.32);
      const reticleTargetX = targetX + nx * leadDist;
      const reticleTargetY = targetY + ny * leadDist;

      if (!initialized) {
        crosshair.x = reticleTargetX;
        crosshair.y = reticleTargetY;
        initialized = true;
      }

      // Smooth pursuit damping towards predictive lead position
      crosshair.x += (reticleTargetX - crosshair.x) * dt * 9.0;
      crosshair.y += (reticleTargetY - crosshair.y) * dt * 9.0;

      // Update motion trail
      if (!prefersReducedMotion) {
        trail.push({ x: targetX, y: targetY });
        if (trail.length > 14) trail.shift();
      }

      // --- Draw Canvas ---
      // 1. Background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // 2. Coordinate Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 32;
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

      // 3. Anticipated Landing Node Beacon
      ctx.save();
      const pingR = 7 + Math.sin(now * 0.008) * 3;
      // Outer sonar pulse ring
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(toPt.x, toPt.y, pingR + 4, 0, Math.PI * 2);
      ctx.stroke();

      // Core landing beacon ring
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(toPt.x, toPt.y, 6, 0, Math.PI * 2);
      ctx.stroke();

      // Central beacon pip
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(toPt.x, toPt.y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Forward Predictive Trajectory Lead Vector Beam
      ctx.save();
      ctx.setLineDash([4, 4]);

      // Glow beam
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(targetX, targetY);
      ctx.lineTo(toPt.x, toPt.y);
      ctx.stroke();

      // Sharp beam
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(targetX, targetY);
      ctx.lineTo(toPt.x, toPt.y);
      ctx.stroke();
      ctx.restore();

      // 5. Gaze Motion Trail Discs
      if (trail.length > 1) {
        ctx.save();
        for (let i = 0; i < trail.length; i++) {
          const pt = trail[i];
          const progressVal = (i + 1) / trail.length;
          const alpha = progressVal * 0.32;
          const r = targetRadius * (0.25 + 0.65 * progressVal);

          ctx.fillStyle = '#ef4444';
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 6. Tactical Sphere Target (Concentric red rings + glow + sheen + white pip)
      ctx.save();
      // Ghost outer ring
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(targetX, targetY, targetRadius + 5, 0, Math.PI * 2);
      ctx.stroke();

      // Tactical outer ring
      ctx.globalAlpha = 0.65;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(targetX, targetY, targetRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Glowing filled body
      ctx.globalAlpha = 0.88;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(targetX, targetY, targetRadius * 0.82, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Highlight sheen
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(
        targetX - targetRadius * 0.2,
        targetY - targetRadius * 0.2,
        targetRadius * 0.28,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Bright white core dot
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(targetX, targetY, targetRadius * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 7. Anticipatory Predictive Lead Reticle
      ctx.save();
      const reticleR = targetRadius + 9;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.78)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 6;

      // Reticle Circle
      ctx.beginPath();
      ctx.arc(crosshair.x, crosshair.y, reticleR, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cardinal tick marks
      const tickLen = 6;
      ctx.beginPath();
      // Top
      ctx.moveTo(crosshair.x, crosshair.y - reticleR);
      ctx.lineTo(crosshair.x, crosshair.y - reticleR - tickLen);
      // Bottom
      ctx.moveTo(crosshair.x, crosshair.y + reticleR);
      ctx.lineTo(crosshair.x, crosshair.y + reticleR + tickLen);
      // Left
      ctx.moveTo(crosshair.x - reticleR, crosshair.y);
      ctx.lineTo(crosshair.x - reticleR - tickLen, crosshair.y);
      // Right
      ctx.moveTo(crosshair.x + reticleR, crosshair.y);
      ctx.lineTo(crosshair.x + reticleR + tickLen, crosshair.y);
      ctx.stroke();

      ctx.restore();

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    // Guarantee immediate first frame
    renderFrame(performance.now());
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(renderFrame);
    }

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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}

