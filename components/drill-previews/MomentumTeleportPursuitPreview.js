'use client';

import React, { useRef, useEffect } from 'react';

/**
 * MomentumTeleportPursuitPreview
 * Authentic HTML5 <canvas> simulation of Momentum Teleport Pursuit.
 * Matches MomentumTeleportPursuitClient.tsx:
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Smooth kinetic traversal with constant velocity vector and border bounces.
 * - Forward momentum vector direction beam projecting ahead along velocity.
 * - Periodic instant spatial teleportation preserving velocity momentum vector.
 * - Exit portal collapse ripple and entrance portal expansion bloom on teleport.
 * - Faint dashed displacement connector ray linking old and new coordinates.
 * - Dynamic fading motion trail discs tracing recent linear motion.
 * - Canonical tactical target: concentric red rings, glowing red core, highlight sheen, white core dot.
 * - Smooth ocular pursuit reticle with realistic human reaction latency followed by rapid ballistic saccadic re-acquisition snap.
 * - Zero in-preview title pills/badges (removed legacy TELEPORT DISPLACEMENT: MOMENTUM LOCKED pill).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function MomentumTeleportPursuitPreview() {
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
    let vx = 105;
    let vy = 55;
    let timeSinceTeleport = 0;
    let teleportPortals = []; // { exit: {x,y}, enter: {x,y}, alpha: 1.0 }
    let trail = [];
    let crosshair = { x: 0, y: 0 };
    let saccadeDelay = 0;
    let initialized = false;

    // Predefined teleport destination sequence for consistent, clean preview visual
    const teleportLocations = [
      { xFactor: 0.75, yFactor: 0.28 },
      { xFactor: 0.25, yFactor: 0.72 },
      { xFactor: 0.72, yFactor: 0.68 },
      { xFactor: 0.28, yFactor: 0.32 },
    ];
    let teleportIdx = 0;

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
      const minX = targetRadius + 14;
      const maxX = width - targetRadius - 14;
      const minY = targetRadius + 14;
      const maxY = height - targetRadius - 14;

      if (!initialized) {
        px = width * 0.32;
        py = height * 0.42;
        crosshair.x = px;
        crosshair.y = py;
        initialized = true;
      }

      // Physics: Movement & Periodic Teleportation (~every 1.6s)
      if (!prefersReducedMotion) {
        px += vx * dt;
        py += vy * dt;

        timeSinceTeleport += dt;
        if (timeSinceTeleport > 1.6) {
          timeSinceTeleport = 0;

          // Record exit and entrance portal event
          const oldX = px;
          const oldY = py;

          // Teleport to next structured waypoint while preserving vx, vy momentum
          const nextLoc = teleportLocations[teleportIdx % teleportLocations.length];
          teleportIdx++;
          px = width * nextLoc.xFactor;
          py = height * nextLoc.yFactor;

          teleportPortals.push({
            exit: { x: oldX, y: oldY },
            enter: { x: px, y: py },
            life: 1.0,
          });

          // Reset trail so no jump smear
          trail = [];

          // Reticle experiences a brief reaction hesitation before saccadic snap
          saccadeDelay = 0.14;
        }

        // Border bounce reflection
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

      // Decay portal events
      for (let i = teleportPortals.length - 1; i >= 0; i--) {
        teleportPortals[i].life -= dt * 1.8;
        if (teleportPortals[i].life <= 0) {
          teleportPortals.splice(i, 1);
        }
      }

      // Reticle pursuit physics: human latency pause on teleport, followed by fast ballistic catch-up
      if (saccadeDelay > 0) {
        saccadeDelay -= dt;
      } else {
        const dist = Math.hypot(px - crosshair.x, py - crosshair.y);
        const catchupRate = dist > targetRadius * 3 ? 14.0 : 8.5;
        crosshair.x += (px - crosshair.x) * dt * catchupRate;
        crosshair.y += (py - crosshair.y) * dt * catchupRate;
      }

      // Motion trail
      if (!prefersReducedMotion) {
        trail.push({ x: px, y: py });
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

      // 3. Teleport Portals & Displacement Vector Ray
      for (const p of teleportPortals) {
        const life = p.life;

        // Faint dashed displacement connector ray
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${life * 0.22})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(p.exit.x, p.exit.y);
        ctx.lineTo(p.enter.x, p.enter.y);
        ctx.stroke();
        ctx.restore();

        // Exit portal collapse ring
        ctx.save();
        ctx.strokeStyle = `rgba(239, 68, 68, ${life * 0.65})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(p.exit.x, p.exit.y, targetRadius * (0.4 + life * 0.8), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Entrance portal expansion bloom
        ctx.save();
        const bloomR = targetRadius + (1 - life) * 26;
        ctx.strokeStyle = `rgba(56, 189, 248, ${life * 0.75})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(p.enter.x, p.enter.y, bloomR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Forward Momentum Vector Direction Beam (Matches Client math line)
      const speed = Math.hypot(vx, vy) || 1;
      const nx = vx / speed;
      const ny = vy / speed;
      const rayLen = 42;

      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + nx * rayLen, py + ny * rayLen);
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

      // 6. Tactical Target (Concentric Red Rings + Glow + Sheen + White Pip)
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

      // Glowing body
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

      // Bright white center dot
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, targetRadius * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 7. Tactical Smooth Pursuit Reticle
      ctx.save();
      const reticleR = targetRadius + 9;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.78)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 6;

      // Outer reticle circle
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
