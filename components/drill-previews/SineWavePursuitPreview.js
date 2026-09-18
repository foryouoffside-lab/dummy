'use client';

import React, { useRef, useEffect } from 'react';

/**
 * SineWavePursuitPreview
 * Authentic HTML5 <canvas> simulation of Sine-Wave Pursuit.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Horizontal midline baseline axis.
 * - Glowing cyan sinusoidal harmonic trajectory guide curve.
 * - Horizontal harmonic oscillation bouncing at boundary turnaround thresholds.
 * - Dynamic fading motion trail discs following the sine wave.
 * - Canonical tactical target: concentric red rings, glowing red core, highlight sheen, white core dot.
 * - Smooth ocular pursuit reticle locked onto the target with human physiological damping.
 * - Zero in-preview title pills/badges (removed legacy HARMONIC SINE WAVE PURSUIT pill).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function SineWavePursuitPreview() {
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
    let targetX = 0;
    let dir = 1;
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

      const leftBound = width * 0.08;
      const rightBound = width * 0.92;
      const span = rightBound - leftBound;
      const centerY = height * 0.5;
      const amplitude = height * 0.28;
      const cycles = 2.0;
      const k = (Math.PI * 2 * cycles) / (span || 1);

      const getWaveY = (x) => centerY + Math.sin((x - leftBound) * k) * amplitude;

      if (!initialized) {
        targetX = leftBound + span * 0.25;
        crosshair.x = targetX;
        crosshair.y = getWaveY(targetX);
        initialized = true;
      }

      // Physics: horizontal bounce & sinusoidal height
      if (!prefersReducedMotion) {
        const speed = span * 0.44; // smooth ~2.27s traversal
        targetX += dir * speed * dt;

        if (targetX >= rightBound) {
          targetX = rightBound;
          dir = -1;
        } else if (targetX <= leftBound) {
          targetX = leftBound;
          dir = 1;
        }
      }

      const targetY = getWaveY(targetX);
      const targetRadius = Math.max(8, Math.min(width, height) * 0.065);

      // Smooth pursuit damping
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

      // 3. Horizontal Midline
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(leftBound * 0.5, centerY);
      ctx.lineTo(width - leftBound * 0.5, centerY);
      ctx.stroke();
      ctx.restore();

      // 4. Boundary turnaround guides
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(leftBound, centerY - amplitude - 8);
      ctx.lineTo(leftBound, centerY + amplitude + 8);
      ctx.moveTo(rightBound, centerY - amplitude - 8);
      ctx.lineTo(rightBound, centerY + amplitude + 8);
      ctx.stroke();
      ctx.restore();

      // 5. Sine Wave Path (Cyan glow + crisp trajectory)
      ctx.save();
      // Outer glow line
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      for (let x = leftBound; x <= rightBound; x += 3) {
        const y = getWaveY(x);
        if (x === leftBound) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Inner crisp path
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.38)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = leftBound; x <= rightBound; x += 3) {
        const y = getWaveY(x);
        if (x === leftBound) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // 6. Gaze Motion Trail Discs
      if (trail.length > 1) {
        ctx.save();
        for (let i = 0; i < trail.length; i++) {
          const pt = trail[i];
          const progress = (i + 1) / trail.length;
          const alpha = progress * 0.32;
          const r = targetRadius * (0.25 + 0.65 * progress);

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
