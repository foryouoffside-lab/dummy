'use client';

import React, { useRef, useEffect } from 'react';

/**
 * GhostingSuppressPursuitPreview
 * Authentic HTML5 <canvas> simulation of Ghosting Suppress Pursuit.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - High-speed target traversal testing visual fixation stability.
 * - Trailing retinal ghosting duplicate artifacts at decreasing opacities.
 * - Cyan heading trajectory vector guide line.
 * - Authentic tactical target: concentric red rings, glowing red core, highlight sheen, white core dot.
 * - Stable ocular pursuit reticle locked onto the primary target, suppressing ghost distractions.
 * - Zero in-preview title pills/badges (no fake title tags or badges).
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function GhostingSuppressPursuitPreview() {
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
    let vx = 0;
    let vy = 0;
    let rx = 0;
    let ry = 0;
    let trail = [];
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

      const targetRadius = Math.max(9, Math.min(width, height) * 0.075);

      if (!initialized) {
        px = width * 0.25;
        py = height * 0.35;
        rx = px;
        ry = py;
        vx = width * 0.52;
        vy = height * 0.38;
        initialized = true;
      }

      if (!prefersReducedMotion) {
        // High-speed traversal
        px += vx * dt;
        py += vy * dt;

        // Border bounce mechanics
        const pad = targetRadius + 6;
        if (px < pad) {
          px = pad;
          vx = Math.abs(vx);
        } else if (px > width - pad) {
          px = width - pad;
          vx = -Math.abs(vx);
        }

        if (py < pad) {
          py = pad;
          vy = Math.abs(vy);
        } else if (py > height - pad) {
          py = height - pad;
          vy = -Math.abs(vy);
        }

        // Store positions for ghost suppression trail
        trail.unshift({ x: px, y: py });
        if (trail.length > 25) trail.pop();

        // Ocular reticle firmly tracks primary target with stable damping
        rx += (px - rx) * dt * 9;
        ry += (py - ry) * dt * 9;
      } else {
        px = width * 0.5;
        py = height * 0.5;
        rx = px;
        ry = py;
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

      // --- Heading Vector Indicator (Cyan Ray) ---
      if (!prefersReducedMotion) {
        ctx.save();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        const rayLen = 0.14;
        ctx.lineTo(px + vx * rayLen, py + vy * rayLen);
        ctx.stroke();

        ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.beginPath();
        ctx.arc(px + vx * rayLen, py + vy * rayLen, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // --- Retinal Ghosting Artifacts (Suppress Duplicates) ---
      // 3 distinct ghost images trailing behind the primary target along movement vector
      if (!prefersReducedMotion && trail.length > 6) {
        const ghostIndices = [
          { idx: Math.min(6, trail.length - 1), alpha: 0.35, scale: 0.9 },
          { idx: Math.min(13, trail.length - 1), alpha: 0.20, scale: 0.8 },
          { idx: Math.min(20, trail.length - 1), alpha: 0.10, scale: 0.7 }
        ];

        for (const g of ghostIndices) {
          const pt = trail[g.idx];
          if (!pt) continue;
          ctx.save();
          ctx.globalAlpha = g.alpha;

          // Ghost outline ring
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, targetRadius * g.scale, 0, Math.PI * 2);
          ctx.stroke();

          // Ghost faint core
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, targetRadius * g.scale * 0.7, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      // --- Primary Tactical Target ---
      ctx.save();
      const r = targetRadius;

      // 1. Ghost outer ring
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(px, py, r + 4, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Tactical outer ring
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Glowing red body
      ctx.globalAlpha = 0.9;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(px, py, r * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 4. Highlight sheen
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px - r * 0.22, py - r * 0.22, r * 0.26, 0, Math.PI * 2);
      ctx.fill();

      // 5. Bright white center core pip
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, Math.max(2.5, r * 0.18), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      if (prefersReducedMotion) {
        return;
      }

      // --- Gaze Fixation Stability Reticle (Locked on True Target) ---
      ctx.save();
      const chLen = 7;
      const chGap = 3;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // 4 crosshair ticks
      ctx.moveTo(rx - chGap - chLen, ry);
      ctx.lineTo(rx - chGap, ry);
      ctx.moveTo(rx + chGap, ry);
      ctx.lineTo(rx + chGap + chLen, ry);
      ctx.moveTo(rx, ry - chGap - chLen);
      ctx.lineTo(rx, ry - chGap);
      ctx.moveTo(rx, ry + chGap);
      ctx.lineTo(rx, ry + chGap + chLen);
      ctx.stroke();

      // Outer targeting circle
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(rx, ry, 11, 0, Math.PI * 2);
      ctx.stroke();

      // Center targeting pip
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(rx, ry, 1.2, 0, Math.PI * 2);
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
