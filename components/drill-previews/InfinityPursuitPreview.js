'use client';

import React, { useRef, useEffect } from 'react';

/**
 * InfinityPursuitPreview
 * Authentic HTML5 <canvas> simulation of Infinity Pursuit.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Vertical midline transfer guide axis.
 * - Mathematical Bernoulli Lemniscate figure-8 trajectory path in glowing cyan.
 * - Smooth continuous angular velocity target motion transferring across midline.
 * - Dynamic fading motion trail discs.
 * - Authentic tactical target: concentric red rings, glowing red core, highlight sheen, white core dot.
 * - Smooth ocular pursuit reticle locked onto the target with human damping.
 * - Zero in-preview title pills/badges (no fake title tags or badges).
 * - Guaranteed first-frame draw + IntersectionObserver pause + prefers-reduced-motion support.
 */
export default function InfinityPursuitPreview() {
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

    // Mathematical Bernoulli Lemniscate
    const getLemniscate = (tVal, W, H) => {
      const scale = 0.36;
      const denom = 1 + Math.sin(tVal) * Math.sin(tVal);
      return {
        x: W / 2 + (W * scale * Math.cos(tVal)) / denom,
        y: H / 2 + (H * scale * 0.95 * Math.sin(tVal) * Math.cos(tVal)) / denom,
      };
    };

    // Simulation state
    let t = 0;
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

      initialized = true;

      // Progress along Lemniscate figure-8
      if (!prefersReducedMotion) {
        t += dt * 0.82;
      } else {
        t = Math.PI * 0.25;
      }

      const targetPos = getLemniscate(t, width, height);
      const targetRadius = Math.max(9, Math.min(width, height) * 0.075);

      if (!crosshair.x && !crosshair.y) {
        crosshair.x = targetPos.x;
        crosshair.y = targetPos.y;
      } else {
        // Smooth pursuit damping
        crosshair.x += (targetPos.x - crosshair.x) * dt * 9;
        crosshair.y += (targetPos.y - crosshair.y) * dt * 9;
      }

      // Update motion trail
      if (!prefersReducedMotion) {
        trail.push({ x: targetPos.x, y: targetPos.y });
        if (trail.length > 12) trail.shift();
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

      // --- Midline Transfer Guide Axis ---
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(width / 2, height * 0.12);
      ctx.lineTo(width / 2, height * 0.88);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // --- Figure-8 Trajectory Path Guide ---
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.24)';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      const step = 0.03;
      for (let i = 0; i <= Math.PI * 2 + step; i += step) {
        const pt = getLemniscate(i, width, height);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
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

      // --- Smooth Pursuit Tracking Reticle ---
      ctx.save();
      const chX = crosshair.x;
      const chY = crosshair.y;
      const chLen = 7;
      const chGap = 3;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // 4 crosshair ticks
      ctx.moveTo(chX - chGap - chLen, chY);
      ctx.lineTo(chX - chGap, chY);
      ctx.moveTo(chX + chGap, chY);
      ctx.lineTo(chX + chGap + chLen, chY);
      ctx.moveTo(chX, chY - chGap - chLen);
      ctx.lineTo(chX, chY - chGap);
      ctx.moveTo(chX, chY + chGap);
      ctx.lineTo(chX, chY + chGap + chLen);
      ctx.stroke();

      // Outer targeting circle
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(chX, chY, 11, 0, Math.PI * 2);
      ctx.stroke();

      // Center targeting pip
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(chX, chY, 1.2, 0, Math.PI * 2);
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
