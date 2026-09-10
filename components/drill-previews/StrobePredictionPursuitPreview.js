'use client';

import React, { useRef, useEffect } from 'react';

/**
 * StrobePredictionPursuitPreview
 * Authentic HTML5 <canvas> simulation of Strobe Prediction Pursuit.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Smooth continuous target traversal with wall bounces.
 * - Periodic strobe occlusion cycles (Visible phase vs Occluded blind phase).
 * - Visible Phase: Full tactical red target, glowing core, highlight sheen, and fading motion trail.
 * - Occluded Phase: Target vanishes; subtle dashed extrapolation ghost vector guides cognitive tracking.
 * - Smooth ocular pursuit reticle maintaining forward model extrapolation throughout the blind phase.
 * - Re-emergence pulse bloom as the target flashes back into visibility.
 * - Zero in-preview title pills/badges (removed legacy OCCLUSION TUNNEL EXTRAPOLATION and BLIND TUNNEL pills).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function StrobePredictionPursuitPreview() {
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
    let vx = 110;
    let vy = 75;
    let strobeTimer = 0;
    let trail = [];
    let crosshair = { x: 0, y: 0 };
    let reemergePulse = 0;
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

      const targetRadius = Math.max(8, Math.min(width, height) * 0.065);
      const minX = targetRadius + 12;
      const maxX = width - targetRadius - 12;
      const minY = targetRadius + 12;
      const maxY = height - targetRadius - 12;

      if (!initialized) {
        px = width * 0.28;
        py = height * 0.38;
        crosshair.x = px;
        crosshair.y = py;
        initialized = true;
      }

      // Physics: Movement & Bounces
      if (!prefersReducedMotion) {
        px += vx * dt;
        py += vy * dt;

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

        // Strobe cycle: 1.4s visible, 0.8s dark (total period 2.2s)
        const prevTimer = strobeTimer;
        strobeTimer = (strobeTimer + dt) % 2.2;

        // Trigger re-emergence pulse when cycling from dark back to visible
        if (prevTimer >= 1.4 && strobeTimer < 1.4) {
          reemergePulse = 1.0;
        }
      }

      if (reemergePulse > 0) {
        reemergePulse = Math.max(0, reemergePulse - dt * 2.5);
      }

      const isVisiblePhase = prefersReducedMotion || strobeTimer < 1.4;

      // Smooth ocular pursuit reticle tracks target position
      crosshair.x += (px - crosshair.x) * dt * 9.0;
      crosshair.y += (py - crosshair.y) * dt * 9.0;

      // Update motion trail during visible phase
      if (!prefersReducedMotion) {
        if (isVisiblePhase) {
          trail.push({ x: px, y: py });
          if (trail.length > 14) trail.shift();
        } else {
          // Trail quickly decays during blind phase
          if (trail.length > 0) trail.shift();
        }
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

      // 3. Directional Heading Velocity Ray
      const speed = Math.hypot(vx, vy) || 1;
      const nx = vx / speed;
      const ny = vy / speed;
      const rayLen = isVisiblePhase ? 32 : 46;

      ctx.save();
      ctx.strokeStyle = isVisiblePhase ? 'rgba(56, 189, 248, 0.40)' : 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = 1.5;
      if (!isVisiblePhase) ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + nx * rayLen, py + ny * rayLen);
      ctx.stroke();
      ctx.restore();

      // 4. Gaze Motion Trail Discs (Visible Phase)
      if (trail.length > 1) {
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
      }

      // 5. Target Rendering (Strobe: Full Tactical vs Occluded Ghost)
      if (isVisiblePhase) {
        // Re-emergence flash bloom
        if (reemergePulse > 0) {
          ctx.save();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(px, py, targetRadius + (1 - reemergePulse) * 16, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Full Canonical Tactical Sphere
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
      } else {
        // Occluded Blind Phase: Faint Dashed Ghost Outline
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.arc(px, py, targetRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Subtle center extrapolation pip
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 6. Smooth Pursuit Reticle (Continuously locked across both phases)
      ctx.save();
      const reticleR = targetRadius + 9;
      ctx.strokeStyle = isVisiblePhase
        ? 'rgba(56, 189, 248, 0.78)'
        : 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = isVisiblePhase ? 6 : 2;

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

