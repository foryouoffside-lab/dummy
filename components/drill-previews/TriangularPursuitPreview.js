'use client';

import React, { useRef, useEffect } from 'react';

/**
 * TriangularPursuitPreview
 * Authentic HTML5 <canvas> simulation of Triangular Pursuit.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Triangular apex-to-base closed trajectory loop in glowing cyan.
 * - Circular waypoint nodes at all 3 apex and base vertices.
 * - Continuous vertex-to-vertex linear interpolation cycling indefinitely.
 * - Dynamic fading motion trail discs following the triangle sides.
 * - Canonical tactical target: concentric red rings, glowing red core, highlight sheen, white core dot.
 * - Smooth ocular pursuit reticle locked onto the target with human physiological damping & apex saccadic catch-up.
 * - Zero in-preview title pills/badges (removed legacy TRIANGULAR APEX: OVERSHOOT RECOVERED pill).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function TriangularPursuitPreview() {
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
    let t = 0.25;
    let currentNode = 0;
    let nextNode = 1;
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

      // Triangular vertices: Apex, Bottom-Right, Bottom-Left
      const nodes = [
        [width * 0.50, height * 0.16],
        [width * 0.82, height * 0.84],
        [width * 0.18, height * 0.84],
      ];

      // Physics: Progress along current triangle side
      const sideSpeed = 0.58; // ~1.72s per side, ~5.16s per full triangular cycle

      if (!prefersReducedMotion) {
        t += sideSpeed * dt;
        if (t >= 1) {
          t = 0;
          currentNode = nextNode;
          nextNode = (nextNode + 1) % 3;
        }
      }

      const nCurr = nodes[currentNode];
      const nNext = nodes[nextNode];
      const targetX = nCurr[0] + (nNext[0] - nCurr[0]) * t;
      const targetY = nCurr[1] + (nNext[1] - nCurr[1]) * t;
      const targetRadius = Math.max(8, Math.min(width, height) * 0.065);

      if (!initialized) {
        crosshair.x = targetX;
        crosshair.y = targetY;
        initialized = true;
      }

      // Smooth pursuit damping with physiological corner catch-up response
      crosshair.x += (targetX - crosshair.x) * dt * 9.0;
      crosshair.y += (targetY - crosshair.y) * dt * 9.0;

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

      // 3. Vertical Apex Centerline (subtle tactical guide)
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(nodes[0][0], nodes[0][1] - 8);
      ctx.lineTo(nodes[0][0], nodes[1][1] + 8);
      ctx.stroke();
      ctx.restore();

      // 4. Triangular Guide Path (Cyan glow + crisp perimeter)
      ctx.save();
      ctx.lineJoin = 'round';

      // Glow pass
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 5.5;
      ctx.beginPath();
      ctx.moveTo(nodes[0][0], nodes[0][1]);
      ctx.lineTo(nodes[1][0], nodes[1][1]);
      ctx.lineTo(nodes[2][0], nodes[2][1]);
      ctx.closePath();
      ctx.stroke();

      // Inner crisp path
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.38)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(nodes[0][0], nodes[0][1]);
      ctx.lineTo(nodes[1][0], nodes[1][1]);
      ctx.lineTo(nodes[2][0], nodes[2][1]);
      ctx.closePath();
      ctx.stroke();

      // Vertex waypoint dots at all 3 corners
      for (let i = 0; i < 3; i++) {
        const [nx, ny] = nodes[i];
        ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(nx, ny, 5.5, 0, Math.PI * 2);
        ctx.stroke();
      }
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

      // 7. Smooth Pursuit Reticle
      ctx.save();
      const reticleR = targetRadius + 9;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
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

