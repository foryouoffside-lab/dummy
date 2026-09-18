'use client';

import React, { useRef, useEffect } from 'react';

/**
 * StaircaseStepPreview
 * Authentic HTML5 <canvas> simulation of Staircase Step / Vertical Tracking.
 * Matches StaircaseStepClient.tsx:
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Multi-segment vertical zig-zag / staircase elevation guide path in glowing cyan.
 * - Corner node waypoints at each elevation inflection vertex.
 * - Horizontal step floor guide dashes showing level elevations.
 * - Smooth linear target traversal across vertical steps with velocity reversal at endpoints.
 * - Dynamic fading motion trail discs tracing recent elevation coordinates.
 * - Canonical tactical target: concentric red rings, glowing red core, highlight sheen, white core dot.
 * - Smooth ocular pursuit reticle with corner saccadic catch-up response.
 * - Zero in-preview title pills/badges (removed legacy VERTICAL STAIR ELEVATION pill).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function StaircaseStepPreview() {
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
    let pts = [];

    const computePoints = (w, h) => {
      const numPoints = 6;
      const startY = h * 0.18;
      const endY = h * 0.82;
      const startX = w * 0.22;
      const graphW = w * 0.56;
      const stepY = (endY - startY) / (numPoints - 1);

      const points = [];
      for (let i = 0; i < numPoints; i++) {
        const yPos = startY + i * stepY;
        const xPos = (i % 2 === 0) ? startX : (startX + graphW);
        points.push({ x: xPos, y: yPos });
      }
      return points;
    };

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = computePoints(width, height);
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
    let progress = 0.25;
    let direction = 1;
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

      if (width === 0 || height === 0 || pts.length === 0) {
        updateDimensions();
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      const targetRadius = Math.max(8, Math.min(width, height) * 0.065);

      // Traversal progress along vertical zig-zag staircase
      if (!prefersReducedMotion) {
        const baseSpeed = 0.28;
        progress += baseSpeed * direction * dt;

        if (progress >= 1) {
          progress = 1;
          direction = -1;
        } else if (progress <= 0) {
          progress = 0;
          direction = 1;
        }
      }

      const segmentCount = pts.length - 1;
      const scaledProgress = progress * segmentCount;
      const index = Math.min(Math.floor(scaledProgress), segmentCount - 1);
      const segmentT = scaledProgress - index;

      const tx = pts[index].x + (pts[index + 1].x - pts[index].x) * segmentT;
      const ty = pts[index].y + (pts[index + 1].y - pts[index].y) * segmentT;

      if (!initialized) {
        crosshair.x = tx;
        crosshair.y = ty;
        initialized = true;
      }

      // Smooth pursuit damping with corner catch-up response
      crosshair.x += (tx - crosshair.x) * dt * 8.5;
      crosshair.y += (ty - crosshair.y) * dt * 8.5;

      // Motion trail
      if (!prefersReducedMotion) {
        trail.push({ x: tx, y: ty });
        if (trail.length > 14) trail.shift();
      }

      // --- Draw Canvas ---
      // 1. Deep Space Background
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

      // 3. Step Elevation Floor Dashes
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      for (let i = 0; i < pts.length; i++) {
        ctx.beginPath();
        ctx.moveTo(width * 0.15, pts[i].y);
        ctx.lineTo(width * 0.85, pts[i].y);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Vertical Zig-Zag / Staircase Guide Path
      ctx.save();
      // Outer subtle glow
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();

      // Inner crisp cyan track
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.38)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();
      ctx.restore();

      // 5. Waypoint Corner Nodes
      for (let i = 0; i < pts.length; i++) {
        const pt = pts[i];
        ctx.save();
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

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

      // 7. Tactical Target (Concentric Red Rings + Glow + Sheen + White Pip)
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

      // Glowing body
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

      // Bright white center dot
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tx, ty, targetRadius * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 8. Tactical Crosshair (matching FPS drill exact crosshair geometry)
      const chX = crosshair.x;
      const chY = crosshair.y;
      const chColor = '#38bdf8';

      ctx.save();
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

      // Center pip
      ctx.beginPath();
      ctx.arc(chX, chY, 1.8, 0, Math.PI * 2);
      ctx.fill();
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
