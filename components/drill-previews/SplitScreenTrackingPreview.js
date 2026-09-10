'use client';

import React, { useRef, useEffect } from 'react';

/**
 * SplitScreenTrackingPreview
 * Authentic HTML5 <canvas> simulation of Split-Screen Tracking.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Center vertical dividing line splitting the screen into dual independent attention sectors.
 * - Sector A (Left): Vertical linear motion axis with vertical oscillating tactical target.
 * - Sector B (Right): Horizontal linear motion axis with horizontal oscillating tactical target.
 * - Dynamic fading motion trails behind both targets.
 * - Canonical tactical targets: concentric red rings, glowing red core, highlight sheen, white core dots.
 * - Dual smooth pursuit reticles tracking both independent target vectors.
 * - Zero in-preview title pills/badges (removed legacy DIVIDED DUAL GAZE TRACKING and SEC A/B pills).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function SplitScreenTrackingPreview() {
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
    let leftY = 0;
    let leftDir = 1;
    let rightX = 0;
    let rightDir = 1;
    let leftTrail = [];
    let rightTrail = [];
    let leftCrosshair = { x: 0, y: 0 };
    let rightCrosshair = { x: 0, y: 0 };
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

      // Sector Coordinates
      const midX = width * 0.5;
      const leftAxisX = width * 0.25;
      const leftTopY = height * 0.18;
      const leftBottomY = height * 0.82;
      const leftSpan = leftBottomY - leftTopY;

      const rightAxisY = height * 0.50;
      const rightLeftX = midX + width * 0.06;
      const rightRightX = width * 0.94;
      const rightSpan = rightRightX - rightLeftX;

      const targetRadius = Math.max(7, Math.min(width, height) * 0.058);

      if (!initialized) {
        leftY = leftTopY + leftSpan * 0.35;
        rightX = rightLeftX + rightSpan * 0.65;
        leftCrosshair = { x: leftAxisX, y: leftY };
        rightCrosshair = { x: rightX, y: rightAxisY };
        initialized = true;
      }

      // Physics: Left Target (Vertical Bounce)
      const leftSpeed = leftSpan * 0.62; // ~1.61s vertical traversal
      if (!prefersReducedMotion) {
        leftY += leftDir * leftSpeed * dt;
        if (leftY >= leftBottomY) {
          leftY = leftBottomY;
          leftDir = -1;
        } else if (leftY <= leftTopY) {
          leftY = leftTopY;
          leftDir = 1;
        }
      }

      // Physics: Right Target (Horizontal Bounce)
      const rightSpeed = rightSpan * 0.55; // ~1.82s horizontal traversal
      if (!prefersReducedMotion) {
        rightX += rightDir * rightSpeed * dt;
        if (rightX >= rightRightX) {
          rightX = rightRightX;
          rightDir = -1;
        } else if (rightX <= rightLeftX) {
          rightX = rightLeftX;
          rightDir = 1;
        }
      }

      const leftTargetX = leftAxisX;
      const leftTargetY = leftY;
      const rightTargetX = rightX;
      const rightTargetY = rightAxisY;

      // Smooth pursuit damping for dual reticles
      leftCrosshair.x += (leftTargetX - leftCrosshair.x) * dt * 9.0;
      leftCrosshair.y += (leftTargetY - leftCrosshair.y) * dt * 9.0;
      rightCrosshair.x += (rightTargetX - rightCrosshair.x) * dt * 9.0;
      rightCrosshair.y += (rightTargetY - rightCrosshair.y) * dt * 9.0;

      // Update motion trails
      if (!prefersReducedMotion) {
        leftTrail.push({ x: leftTargetX, y: leftTargetY });
        rightTrail.push({ x: rightTargetX, y: rightTargetY });
        if (leftTrail.length > 12) leftTrail.shift();
        if (rightTrail.length > 12) rightTrail.shift();
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

      // 3. Central Vertical Divider (Cyan glowing dashed separation axis)
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.40)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(midX, 0);
      ctx.lineTo(midX, height);
      ctx.stroke();
      ctx.restore();

      // 4. Sector Motion Guides
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.20)';
      ctx.lineWidth = 2;

      // Sector A (Left) vertical guide line + terminal ticks
      ctx.beginPath();
      ctx.moveTo(leftAxisX, leftTopY);
      ctx.lineTo(leftAxisX, leftBottomY);
      ctx.moveTo(leftAxisX - 6, leftTopY);
      ctx.lineTo(leftAxisX + 6, leftTopY);
      ctx.moveTo(leftAxisX - 6, leftBottomY);
      ctx.lineTo(leftAxisX + 6, leftBottomY);
      ctx.stroke();

      // Sector B (Right) horizontal guide line + terminal ticks
      ctx.beginPath();
      ctx.moveTo(rightLeftX, rightAxisY);
      ctx.lineTo(rightRightX, rightAxisY);
      ctx.moveTo(rightLeftX, rightAxisY - 6);
      ctx.lineTo(rightLeftX, rightAxisY + 6);
      ctx.moveTo(rightRightX, rightAxisY - 6);
      ctx.lineTo(rightRightX, rightAxisY + 6);
      ctx.stroke();
      ctx.restore();

      // 5. Gaze Motion Trails
      const drawTrail = (trail) => {
        if (trail.length <= 1) return;
        ctx.save();
        for (let i = 0; i < trail.length; i++) {
          const pt = trail[i];
          const progressVal = (i + 1) / trail.length;
          const alpha = progressVal * 0.30;
          const r = targetRadius * (0.25 + 0.65 * progressVal);

          ctx.fillStyle = '#ef4444';
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      };

      drawTrail(leftTrail);
      drawTrail(rightTrail);

      // 6. Tactical Targets (Dual Red Concentric Spheres)
      const drawTarget = (tx, ty) => {
        ctx.save();
        // Ghost outer ring
        ctx.globalAlpha = 0.22;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(tx, ty, targetRadius + 5, 0, Math.PI * 2);
        ctx.stroke();

        // Tactical outer ring
        ctx.globalAlpha = 0.65;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(tx, ty, targetRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Glowing filled body
        ctx.globalAlpha = 0.88;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(tx, ty, targetRadius * 0.82, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Highlight sheen
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(
          tx - targetRadius * 0.2,
          ty - targetRadius * 0.2,
          targetRadius * 0.28,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Bright white core dot
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tx, ty, targetRadius * 0.22, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      drawTarget(leftTargetX, leftTargetY);
      drawTarget(rightTargetX, rightTargetY);

      // 7. Dual Smooth Pursuit Reticles
      const drawReticle = (cx, cy) => {
        ctx.save();
        const reticleR = targetRadius + 8;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
        ctx.lineWidth = 1.4;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.arc(cx, cy, reticleR, 0, Math.PI * 2);
        ctx.stroke();

        const tickLen = 5;
        ctx.beginPath();
        ctx.moveTo(cx, cy - reticleR);
        ctx.lineTo(cx, cy - reticleR - tickLen);
        ctx.moveTo(cx, cy + reticleR);
        ctx.lineTo(cx, cy + reticleR + tickLen);
        ctx.moveTo(cx - reticleR, cy);
        ctx.lineTo(cx - reticleR - tickLen, cy);
        ctx.moveTo(cx + reticleR, cy);
        ctx.lineTo(cx + reticleR + tickLen, cy);
        ctx.stroke();
        ctx.restore();
      };

      drawReticle(leftCrosshair.x, leftCrosshair.y);
      drawReticle(rightCrosshair.x, rightCrosshair.y);

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

