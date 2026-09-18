'use client';

import React, { useRef, useEffect } from 'react';

/**
 * ConstantSlowPursuitPreview
 * Authentic HTML5 <canvas> simulation of the Constant Slow Pursuit drill.
 *
 * Simulates:
 * - Deep dark #050508 arena with subtle coordinate grid.
 * - Lissajous closed orbital trajectory guide line.
 * - Smooth constant angular velocity target progression along the path.
 * - Motion velocity trail discs fading behind the target.
 * - Real in-game target styling: concentric tactical red rings, glowing red core with shadow blur,
 *   specular highlight sheen, and bright white central core pip.
 * - Smooth ocular pursuit tracking reticle locked onto the moving target with human-like damping.
 * - Zero in-preview title pills/badges (no fake title tags or TOT badges).
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function ConstantSlowPursuitPreview() {
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
    let angle = 0;
    let trail = [];
    let crosshair = { x: 0, y: 0 };
    let initialized = false;

    const getLissajous = (t, W, H) => {
      const cx = W / 2;
      const cy = H / 2;
      return {
        x: cx + Math.cos(t * 3) * (W * 0.38),
        y: cy + Math.sin(t * 4) * (H * 0.36),
      };
    };

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isVisible && !prefersReducedMotion) {
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (width === 0 || height === 0) {
        updateDimensions();
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      // Progress along Lissajous path (constant slow pursuit ~0.30 rad/s)
      if (!prefersReducedMotion) {
        angle += dt * 0.32;
      } else {
        angle = Math.PI * 0.25;
      }

      const targetPos = getLissajous(angle, width, height);
      const targetRadius = Math.max(9, Math.min(width, height) * 0.075);

      if (!initialized) {
        crosshair.x = targetPos.x;
        crosshair.y = targetPos.y;
        initialized = true;
      } else {
        // Smooth pursuit damping
        crosshair.x += (targetPos.x - crosshair.x) * dt * 9;
        crosshair.y += (targetPos.y - crosshair.y) * dt * 9;
      }

      // Update motion trail
      if (!prefersReducedMotion) {
        trail.push({ x: targetPos.x, y: targetPos.y });
        if (trail.length > 10) trail.shift();
      }

      // --- Background ---
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 28;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // --- Lissajous Trajectory Path Guide ---
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.24)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      const step = 0.025;
      for (let t = 0; t <= Math.PI * 2 + step; t += step) {
        const pt = getLissajous(t, width, height);
        if (t === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.restore();

      // --- Motion Trail ---
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const alpha = ((i + 1) / trail.length) * 0.24;
        const scale = 0.35 + 0.55 * ((i + 1) / trail.length);
        ctx.save();
        ctx.fillStyle = '#ef4444';
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, targetRadius * scale * 0.75, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // --- Tactical Target ---
      ctx.save();
      const tx = targetPos.x;
      const ty = targetPos.y;
      const r = targetRadius;

      // 1. Ghost outer ring
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(tx, ty, r + 4, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Tactical outer ring
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(tx, ty, r, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Glowing red body
      ctx.globalAlpha = 0.9;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(tx, ty, r * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 4. Highlight sheen
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tx - r * 0.22, ty - r * 0.22, r * 0.26, 0, Math.PI * 2);
      ctx.fill();

      // 5. Bright white center core pip
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tx, ty, Math.max(2.5, r * 0.18), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      if (prefersReducedMotion) {
        return;
      }

      // --- Tactical Crosshair (matching FPS drill exact crosshair geometry) ---
      ctx.save();
      const chX = crosshair.x;
      const chY = crosshair.y;
      const chColor = '#38bdf8';
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

