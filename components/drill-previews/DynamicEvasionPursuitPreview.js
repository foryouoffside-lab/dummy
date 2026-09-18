'use client';

import React, { useRef, useEffect } from 'react';

/**
 * DynamicEvasionPursuitPreview
 * Authentic HTML5 <canvas> simulation of Dynamic Evasion Pursuit.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Dynamic evasive motion: rapid directional cuts (~0.5s interval), acute evasive jukes.
 * - Expanding evade bloom shockwave at each evasive inflection point.
 * - Cyan evasion trajectory indicator ray.
 * - Fading motion trail discs behind the target.
 * - Authentic tactical target: concentric red rings, glowing core, highlight sheen, white core dot.
 * - Reactive ocular pursuit reticle: slight reaction latency on acute turn followed by catch-up saccade.
 * - Zero in-preview title pills/badges.
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function DynamicEvasionPursuitPreview() {
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
    let evadeBlooms = [];
    let turnTimer = 0;
    let initialized = false;

    let lastTime = performance.now();

    const triggerEvasiveTurn = () => {
      // Create evade bloom ring at current point
      evadeBlooms.push({ x: px, y: py, r: 4, alpha: 0.8 });

      // Pick an evasive cut direction (distinct angle from current heading)
      const currentAngle = Math.atan2(vy, vx);
      const angleOffset = (Math.random() > 0.5 ? 1 : -1) * (Math.PI * 0.4 + Math.random() * Math.PI * 0.35);
      const newAngle = currentAngle + angleOffset;
      const speed = (width * 0.45) + Math.random() * (width * 0.25);
      vx = Math.cos(newAngle) * speed;
      vy = Math.sin(newAngle) * speed;
    };

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

      const targetRadius = Math.max(9, Math.min(width, height) * 0.075);

      if (!initialized) {
        px = width * 0.3;
        py = height * 0.5;
        rx = px;
        ry = py;
        const initialAngle = (Math.random() - 0.5) * Math.PI * 0.5;
        const initialSpeed = width * 0.5;
        vx = Math.cos(initialAngle) * initialSpeed;
        vy = Math.sin(initialAngle) * initialSpeed;
        initialized = true;
      }

      if (!prefersReducedMotion) {
        // Evasion timer logic: sudden sharp turn every 450ms - 750ms
        turnTimer += dt;
        if (turnTimer > 0.55) {
          triggerEvasiveTurn();
          turnTimer = 0;
        }

        // Position update
        px += vx * dt;
        py += vy * dt;

        // Border bounce mechanics
        const pad = targetRadius + 6;
        let bounced = false;
        if (px < pad) {
          px = pad;
          vx = Math.abs(vx) * 1.02;
          bounced = true;
        } else if (px > width - pad) {
          px = width - pad;
          vx = -Math.abs(vx) * 1.02;
          bounced = true;
        }

        if (py < pad) {
          py = pad;
          vy = Math.abs(vy) * 1.02;
          bounced = true;
        } else if (py > height - pad) {
          py = height - pad;
          vy = -Math.abs(vy) * 1.02;
          bounced = true;
        }

        if (bounced) {
          evadeBlooms.push({ x: px, y: py, r: 4, alpha: 0.6 });
        }

        // Motion trail
        trail.push({ x: px, y: py });
        if (trail.length > 12) trail.shift();

        // Evade blooms update
        for (let i = evadeBlooms.length - 1; i >= 0; i--) {
          const b = evadeBlooms[i];
          b.r += dt * 45;
          b.alpha -= dt * 1.8;
          if (b.alpha <= 0) evadeBlooms.splice(i, 1);
        }

        // Reticle tracking with human reaction latency + catch-up saccades
        const dist = Math.hypot(px - rx, py - ry);
        const gain = dist > 26 ? 15 : 8;
        rx += (px - rx) * dt * gain;
        ry += (py - ry) * dt * gain;
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

      // --- Evasive Inflection Blooms ---
      for (let i = 0; i < evadeBlooms.length; i++) {
        const b = evadeBlooms[i];
        ctx.save();
        ctx.strokeStyle = '#ef4444';
        ctx.globalAlpha = Math.max(0, b.alpha);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // --- Evasion Trajectory Vector Indicator (Cyan Ray) ---
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

      // --- Motion Trail ---
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const alpha = ((i + 1) / trail.length) * 0.22;
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

      // --- Tactical Crosshair (matching FPS drill exact crosshair geometry) ---
      ctx.save();
      const chColor = '#38bdf8';
      ctx.strokeStyle = chColor;
      ctx.fillStyle = chColor;

      const chRadius = 11;
      const gap = 4;
      const tickLen = 11;

      // Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(rx, ry, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with gap
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(rx, ry - tickLen); ctx.lineTo(rx, ry - gap);
      ctx.moveTo(rx, ry + tickLen); ctx.lineTo(rx, ry + gap);
      ctx.moveTo(rx - tickLen, ry); ctx.lineTo(rx - gap, ry);
      ctx.moveTo(rx + tickLen, ry); ctx.lineTo(rx + gap, ry);
      ctx.stroke();

      // Center pip
      ctx.beginPath();
      ctx.arc(rx, ry, 1.8, 0, Math.PI * 2);
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
