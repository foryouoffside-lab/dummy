'use client';

import React, { useRef, useEffect } from 'react';

/**
 * DirectionalChaosPursuitPreview
 * Authentic HTML5 <canvas> simulation of Directional Chaos Pursuit.
 *
 * Simulates:
 * - Deep dark #050508 arena with coordinate grid.
 * - Real in-game physics: erratic chaotic velocity nudges, directional shifts, wall bounces.
 * - Cyan chaotic velocity vector ray showing instantaneous trajectory.
 * - Fading motion trail discs behind the moving target.
 * - Real in-game target: concentric tactical red rings, glowing red core, specular highlight sheen, white core dot.
 * - Reactive pursuit reticle with catch-up saccades when sudden velocity changes occur.
 * - Zero in-preview title pills/badges (no fake title tags or badges).
 * - IntersectionObserver off-screen pause + prefers-reduced-motion support.
 */
export default function DirectionalChaosPursuitPreview() {
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
    let vx = 120;
    let vy = 90;
    let rx = 0;
    let ry = 0;
    let trail = [];
    let initialized = false;
    let nextJerkTimer = 1.2;

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

      const targetRadius = Math.max(9, Math.min(width, height) * 0.075);

      if (!initialized) {
        px = width * 0.5;
        py = height * 0.5;
        rx = px;
        ry = py;
        vx = (Math.random() > 0.5 ? 1 : -1) * (width * 0.4);
        vy = (Math.random() > 0.5 ? 1 : -1) * (height * 0.4);
        initialized = true;
      }

      if (!prefersReducedMotion) {
        // Chaotic velocity perturbations
        vx += (Math.random() - 0.5) * width * 3.5 * dt;
        vy += (Math.random() - 0.5) * height * 3.5 * dt;

        // Periodic sudden chaotic jerk / direction flip
        nextJerkTimer -= dt;
        if (nextJerkTimer <= 0) {
          const angle = Math.random() * Math.PI * 2;
          const speed = (width * 0.35) + Math.random() * (width * 0.3);
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          nextJerkTimer = 1.0 + Math.random() * 1.5;
        }

        // Clamp maximum speed
        const maxSpeed = width * 0.75;
        const currentSpeed = Math.hypot(vx, vy);
        if (currentSpeed > maxSpeed) {
          vx = (vx / currentSpeed) * maxSpeed;
          vy = (vy / currentSpeed) * maxSpeed;
        } else if (currentSpeed < width * 0.2) {
          vx *= 1.5;
          vy *= 1.5;
        }

        // Position update
        px += vx * dt;
        py += vy * dt;

        // Border bounce logic
        const pad = targetRadius + 6;
        if (px < pad) {
          px = pad;
          vx = Math.abs(vx) * 1.02;
        } else if (px > width - pad) {
          px = width - pad;
          vx = -Math.abs(vx) * 1.02;
        }

        if (py < pad) {
          py = pad;
          vy = Math.abs(vy) * 1.02;
        } else if (py > height - pad) {
          py = height - pad;
          vy = -Math.abs(vy) * 1.02;
        }

        // Motion trail
        trail.push({ x: px, y: py });
        if (trail.length > 12) trail.shift();

        // Reactive Ocular Pursuit & Catch-up Saccade Reticle Tracking
        const dist = Math.hypot(px - rx, py - ry);
        const trackingGain = dist > 28 ? 14 : 7.5; // Catch-up saccade when displacement is high
        rx += (px - rx) * dt * trackingGain;
        ry += (py - ry) * dt * trackingGain;
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

      // --- Chaotic Velocity Vector Indicator (Cyan Ray) ---
      if (!prefersReducedMotion) {
        ctx.save();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        const rayLen = 0.16;
        ctx.lineTo(px + vx * rayLen, py + vy * rayLen);
        ctx.stroke();

        // Velocity vector head pip
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
