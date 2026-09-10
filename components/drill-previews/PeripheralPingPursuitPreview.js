'use client';

import React, { useRef, useEffect } from 'react';

/**
 * PeripheralPingPursuitPreview
 * Authentic HTML5 <canvas> simulation of Peripheral Ping Pursuit.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Central gaze fixation crosshair with ocular stability and micro-drift damping.
 * - Edge/corner peripheral tactical ping beacons appearing in alternating visual quadrants.
 * - Expanding sonar/ping pulse rings radiating outward from the peripheral targets.
 * - Subtle peripheral visual awareness connection ray from central reticle to the active ping.
 * - Zero in-preview title pills/badges (no fake title tags or badges).
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function PeripheralPingPursuitPreview() {
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
    const pingLocations = [
      { rx: 0.82, ry: 0.26 }, // Top Right
      { rx: 0.18, ry: 0.74 }, // Bottom Left
      { rx: 0.18, ry: 0.26 }, // Top Left
      { rx: 0.82, ry: 0.74 }, // Bottom Right
    ];

    let currentPingIdx = 0;
    let pingPhaseTimer = 0; // 0..1.8s per cycle
    let pulseRings = [];
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

      initialized = true;

      const cx = width / 2;
      const cy = height / 2;
      const targetRadius = Math.max(8, Math.min(width, height) * 0.065);

      if (!prefersReducedMotion) {
        pingPhaseTimer += dt;
        if (pingPhaseTimer > 1.8) {
          pingPhaseTimer = 0;
          currentPingIdx = (currentPingIdx + 1) % pingLocations.length;
        }

        // Spawn pulse rings periodically while ping is active
        if (pingPhaseTimer > 0.2 && pingPhaseTimer < 1.3) {
          if (Math.random() < 0.09) {
            const loc = pingLocations[currentPingIdx];
            pulseRings.push({
              x: loc.rx * width,
              y: loc.ry * height,
              r: targetRadius,
              alpha: 0.7
            });
          }
        }

        // Update pulse rings
        for (let i = pulseRings.length - 1; i >= 0; i--) {
          const pr = pulseRings[i];
          pr.r += dt * 38;
          pr.alpha -= dt * 0.95;
          if (pr.alpha <= 0) pulseRings.splice(i, 1);
        }
      }

      // --- Background ---
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Coordinate Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Current active peripheral ping coordinates
      const loc = pingLocations[currentPingIdx];
      const px = loc.rx * width;
      const py = loc.ry * height;

      // Active ping visibility alpha
      let pingAlpha = 0;
      if (!prefersReducedMotion) {
        if (pingPhaseTimer < 0.25) {
          pingAlpha = pingPhaseTimer / 0.25;
        } else if (pingPhaseTimer < 1.3) {
          pingAlpha = 1.0;
        } else if (pingPhaseTimer < 1.6) {
          pingAlpha = 1.0 - (pingPhaseTimer - 1.3) / 0.3;
        }
      } else {
        pingAlpha = 0.85;
      }

      // --- Peripheral Visual Awareness Ray (Connecting center to active ping) ---
      if (pingAlpha > 0.05 && !prefersReducedMotion) {
        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.globalAlpha = pingAlpha * 0.22;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // --- Peripheral Sonar Pulse Rings ---
      for (let i = 0; i < pulseRings.length; i++) {
        const pr = pulseRings[i];
        ctx.save();
        ctx.strokeStyle = '#ef4444';
        ctx.globalAlpha = Math.max(0, pr.alpha);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, pr.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // --- Peripheral Target Beacon ---
      if (pingAlpha > 0.01) {
        ctx.save();
        const r = targetRadius;

        // 1. Ghost outer ring
        ctx.globalAlpha = pingAlpha * 0.25;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(px, py, r + 4, 0, Math.PI * 2);
        ctx.stroke();

        // 2. Tactical outer ring
        ctx.globalAlpha = pingAlpha * 0.65;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.stroke();

        // 3. Glowing red body
        ctx.globalAlpha = pingAlpha * 0.9;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(px, py, r * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // 4. Highlight sheen
        ctx.globalAlpha = pingAlpha * 0.35;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px - r * 0.22, py - r * 0.22, r * 0.26, 0, Math.PI * 2);
        ctx.fill();

        // 5. Bright white center core pip
        ctx.globalAlpha = pingAlpha * 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, Math.max(2.5, r * 0.18), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Inactive peripheral position ghost markers
      for (let i = 0; i < pingLocations.length; i++) {
        if (i === currentPingIdx && pingAlpha > 0.5) continue;
        const pl = pingLocations[i];
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pl.rx * width, pl.ry * height, targetRadius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // --- Central Gaze Fixation Reticle (In-Game Exact Geometry) ---
      ctx.save();
      // Very subtle physiological micro-drift (±0.8px)
      const driftX = !prefersReducedMotion ? Math.sin(now * 0.002) * 0.8 : 0;
      const driftY = !prefersReducedMotion ? Math.cos(now * 0.0025) * 0.8 : 0;
      const chX = cx + driftX;
      const chY = cy + driftY;

      // In-Game Central Fixation Crosshair lines (length 24px)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      // Horizontal crosshair arm
      ctx.moveTo(chX - 22, chY);
      ctx.lineTo(chX - 5, chY);
      ctx.moveTo(chX + 5, chY);
      ctx.lineTo(chX + 22, chY);
      // Vertical crosshair arm
      ctx.moveTo(chX, chY - 22);
      ctx.lineTo(chX, chY - 5);
      ctx.moveTo(chX, chY + 5);
      ctx.lineTo(chX, chY + 22);
      ctx.stroke();

      // Central fixation targeting circle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(chX, chY, 9, 0, Math.PI * 2);
      ctx.stroke();

      // Center bright fixation pip
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(chX, chY, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);

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
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
