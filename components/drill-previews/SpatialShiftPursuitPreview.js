'use client';

import React, { useRef, useEffect } from 'react';

/**
 * SpatialShiftPursuitPreview
 * Authentic HTML5 <canvas> simulation of Spatial-Shift Pursuit.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Smooth kinetic traversal with sudden spatial velocity vector deflections.
 * - Expanding cyan shift ripple pulse at each deflection inflection point.
 * - Forward directional heading vector ray updating in real-time.
 * - Faint dashed stale trajectory ghost line illustrating the deflected angle.
 * - Dynamic fading motion trail discs following the target.
 * - Canonical tactical target: concentric red rings, glowing red core, highlight sheen, white core dot.
 * - Smooth ocular pursuit reticle with realistic saccadic re-acquisition recovery following spatial shifts.
 * - Zero in-preview title pills/badges (removed legacy SPATIAL DEFLECTION RECOVERY pill).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function SpatialShiftPursuitPreview() {
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
    let px = 0;
    let py = 0;
    let vx = 115;
    let vy = 65;
    let timeSinceShift = 0;
    let shiftPulse = 0;
    let shiftPoint = { x: 0, y: 0 };
    let staleRay = null;
    let trail = [];
    let crosshair = { x: 0, y: 0 };
    let initialized = false;

    let lastTime = performance.now();

    const shiftVectors = [
      { vx: 110, vy: -70 },
      { vx: -125, vy: 60 },
      { vx: 80, vy: 110 },
      { vx: -100, vy: -85 },
      { vx: 120, vy: 50 },
    ];
    let shiftIdx = 0;

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

      const targetRadius = Math.max(8, Math.min(width, height) * 0.065);
      const minX = targetRadius + 14;
      const maxX = width - targetRadius - 14;
      const minY = targetRadius + 14;
      const maxY = height - targetRadius - 14;

      if (!initialized) {
        px = width * 0.35;
        py = height * 0.45;
        crosshair.x = px;
        crosshair.y = py;
        initialized = true;
      }

      // Physics: Movement & Spatial Shifts
      if (!prefersReducedMotion) {
        px += vx * dt;
        py += vy * dt;

        // Periodic sudden spatial vector deflection (~every 1.5s)
        timeSinceShift += dt;
        if (timeSinceShift > 1.5) {
          timeSinceShift = 0;
          shiftPulse = 1.0;
          shiftPoint = { x: px, y: py };

          // Record stale ghost ray
          staleRay = {
            sx: px,
            sy: py,
            ex: px + (vx / Math.hypot(vx, vy)) * 40,
            ey: py + (vy / Math.hypot(vx, vy)) * 40,
            alpha: 1.0
          };

          // Apply next deflected velocity
          const next = shiftVectors[shiftIdx % shiftVectors.length];
          shiftIdx++;
          vx = next.vx;
          vy = next.vy;
        }

        // Boundary reflection
        if (px <= minX) {
          px = minX;
          vx = Math.abs(vx);
        } else if (px >= maxX) {
          px = maxX;
          vx = -Math.abs(vx);
        }

        if (py <= minY) {
          py = minY;
          vy = Math.abs(vy);
        } else if (py >= maxY) {
          py = maxY;
          vy = -Math.abs(vy);
        }
      }

      // Decay shift pulse & stale ray
      if (shiftPulse > 0) {
        shiftPulse = Math.max(0, shiftPulse - dt * 2.2);
      }
      if (staleRay) {
        staleRay.alpha = Math.max(0, staleRay.alpha - dt * 1.5);
        if (staleRay.alpha <= 0) staleRay = null;
      }

      // Smooth pursuit damping with momentary saccadic catch-up lag on shift
      const catchupRate = shiftPulse > 0.4 ? 4.5 : 9.2;
      crosshair.x += (px - crosshair.x) * dt * catchupRate;
      crosshair.y += (py - crosshair.y) * dt * catchupRate;

      // Update motion trail
      if (!prefersReducedMotion) {
        trail.push({ x: px, y: py });
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

      // 3. Stale Deflected Ghost Ray (Illustrates the angular deflection)
      if (staleRay) {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${staleRay.alpha * 0.22})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(staleRay.sx, staleRay.sy);
        ctx.lineTo(staleRay.ex, staleRay.ey);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Spatial Shift Shockwave Ripple
      if (shiftPulse > 0) {
        ctx.save();
        const rippleR = targetRadius + (1 - shiftPulse) * 24;
        ctx.strokeStyle = `rgba(56, 189, 248, ${shiftPulse * 0.55})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(shiftPoint.x, shiftPoint.y, rippleR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Current Directional Velocity Ray
      const speed = Math.hypot(vx, vy) || 1;
      const nx = vx / speed;
      const ny = vy / speed;
      const rayLen = 36;

      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + nx * rayLen, py + ny * rayLen);
      ctx.stroke();
      ctx.restore();

      // 6. Gaze Motion Trail Discs
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

      // 7. Tactical Sphere Target (Concentric red rings + glow + sheen + white pip)
      ctx.save();
      // Ghost outer ring
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(px, py, targetRadius + 5, 0, Math.PI * 2);
      ctx.stroke();

      // Tactical outer ring
      ctx.globalAlpha = 0.65;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(px, py, targetRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Glowing filled body
      ctx.globalAlpha = 0.88;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(px, py, targetRadius * 0.82, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Highlight sheen
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(
        px - targetRadius * 0.2,
        py - targetRadius * 0.2,
        targetRadius * 0.28,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Bright white core dot
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, targetRadius * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 8. Smooth Pursuit Reticle
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

