'use client';

import React, { useRef, useEffect } from 'react';

/**
 * CrossBodyMovementPreview
 * Authentic HTML5 <canvas> simulation of Cross-Body Movement (Bilateral Motor Coordination & Vector Sweeping).
 * Matches CrossBodyMovementClient.js:
 *
 * Simulates:
 * - Deep tactical #050508 arena with coordinate grid.
 * - Dynamic diagonal vector pairs (Node A Cyan #06b6d4 -> Node B Pink #ec4899) spanning across quadrants.
 * - Active vector corridor connecting the nodes with width tolerance and animated flow energy chevrons.
 * - Tactical crosshair initiating connection on Node A, sweeping diagonally across the arena within the corridor.
 * - Corridor state dynamics:
 *   * While sweeping inside bounds: corridor glows vivid emerald (#10b981), crosshair turns emerald.
 *   * Upon intercepting Node B: dual expanding shockwave rings and radial spark bursts emit.
 *   * Seamless autonomous repositioning to new alternating diagonal vector corridors.
 * - Zero in-preview title pills/badges/text overlays.
 * - Guaranteed first-frame draw + HiDPI scaling + ResizeObserver + IntersectionObserver auto-pause.
 */
export default function CrossBodyMovementPreview() {
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

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    requestAnimationFrame(() => {
      updateDimensions();
    });

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Vector pairs across opposing quadrants (normalized coordinates)
    const vectors = [
      { start: { x: 0.16, y: 0.78 }, end: { x: 0.84, y: 0.22 } }, // Bottom-Left to Top-Right
      { start: { x: 0.84, y: 0.78 }, end: { x: 0.16, y: 0.22 } }, // Bottom-Right to Top-Left
      { start: { x: 0.18, y: 0.24 }, end: { x: 0.82, y: 0.76 } }, // Top-Left to Bottom-Right
      { start: { x: 0.82, y: 0.24 }, end: { x: 0.18, y: 0.76 } }, // Top-Right to Bottom-Left
    ];

    let vectorIndex = 0;
    let sweepProgress = 0;
    let sweepState = 'sweeping'; // 'sweeping' | 'hit' | 'reset'
    let stateTimer = 0;
    const sweepDuration = 1.6; // 1.6s diagonal sweep

    let shockwaves = [];
    let particles = [];

    const drawTacticalSphere = (cx, cy, r, color, glow) => {
      ctx.save();
      // Outer ring
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Filled body with glow
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;
      if (glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
      }
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.75, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Specular sheen
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(cx - r * 0.22, cy - r * 0.22, r * 0.26, 0, Math.PI * 2);
      ctx.fill();

      // Core pip
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const triggerHit = (cx, cy) => {
      shockwaves.push({ x: cx, y: cy, r: 12, maxR: 44, alpha: 1.0, color: '#10b981' });
      shockwaves.push({ x: cx, y: cy, r: 8, maxR: 58, alpha: 0.8, color: '#ffffff' });
      for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const spd = 35 + Math.random() * 45;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          alpha: 1.0,
          decay: 2.2,
        });
      }
    };

    let lastTime = performance.now();

    const renderFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!width || !height) return;

      const currentVec = vectors[vectorIndex % vectors.length];
      const startX = currentVec.start.x * width;
      const startY = currentVec.start.y * height;
      const endX = currentVec.end.x * width;
      const endY = currentVec.end.y * height;

      // Deep tactical background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Coordinate grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 26;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      if (!prefersReducedMotion) {
        stateTimer += dt;

        if (sweepState === 'sweeping') {
          sweepProgress = Math.min(1, stateTimer / sweepDuration);
          if (sweepProgress >= 1) {
            sweepState = 'hit';
            stateTimer = 0;
            triggerHit(endX, endY);
          }
        } else if (sweepState === 'hit') {
          if (stateTimer >= 0.55) {
            sweepState = 'reset';
            stateTimer = 0;
          }
        } else if (sweepState === 'reset') {
          if (stateTimer >= 0.25) {
            vectorIndex++;
            sweepState = 'sweeping';
            sweepProgress = 0;
            stateTimer = 0;
          }
        }

        // Update shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const s = shockwaves[i];
          s.r += (s.maxR - s.r) * Math.min(1, dt * 8);
          s.alpha -= dt * 1.8;
          if (s.alpha <= 0) shockwaves.splice(i, 1);
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= dt * p.decay;
          if (p.alpha <= 0) particles.splice(i, 1);
        }
      } else {
        sweepProgress = 0.5;
      }

      // Calculate current crosshair position along diagonal vector
      const crosshairX = startX + (endX - startX) * sweepProgress;
      const crosshairY = startY + (endY - startY) * sweepProgress;

      // --- DRAW CORRIDOR GUIDE LINE ---
      ctx.save();
      const isConnected = sweepState === 'sweeping' || sweepState === 'hit';

      // Corridor tolerance wide track
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = isConnected ? 'rgba(16, 185, 129, 0.28)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Central vector line
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = isConnected ? '#10b981' : 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Energy chevron indicators along vector line
      const vecDx = endX - startX;
      const vecDy = endY - startY;
      const chevronCount = 4;
      const angle = Math.atan2(vecDy, vecDx);

      ctx.save();
      ctx.fillStyle = isConnected ? 'rgba(16, 185, 129, 0.6)' : 'rgba(255, 255, 255, 0.3)';
      for (let i = 1; i <= chevronCount; i++) {
        const offset = ((i / (chevronCount + 1)) + (now * 0.0006)) % 1;
        const cx = startX + vecDx * offset;
        const cy = startY + vecDy * offset;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-5, -4);
        ctx.lineTo(2, 0);
        ctx.lineTo(-5, 4);
        ctx.strokeStyle = isConnected ? '#34d399' : 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
      ctx.restore();

      // --- NODE A (Cyan Start) ---
      const pulseA = Math.sin(now * 0.004) * 3;
      ctx.save();
      ctx.beginPath();
      ctx.arc(startX, startY, 14 + pulseA, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
      drawTacticalSphere(startX, startY, 12, '#06b6d4', true);

      // --- NODE B (Pink Target) ---
      const pulseB = Math.cos(now * 0.004) * 3;
      const isTargetHit = sweepState === 'hit';
      const targetColor = isTargetHit ? '#10b981' : '#ec4899';
      ctx.save();
      ctx.beginPath();
      ctx.arc(endX, endY, 14 + pulseB, 0, Math.PI * 2);
      ctx.strokeStyle = isTargetHit ? 'rgba(16, 185, 129, 0.5)' : 'rgba(236, 72, 153, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
      drawTacticalSphere(endX, endY, 12, targetColor, true);

      // --- DRAW SHOCKWAVES ---
      for (const s of shockwaves) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.lineWidth = 2;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // --- DRAW PARTICLES ---
      for (const p of particles) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.restore();
      }

      // --- DRAW PLAYER CROSSHAIR ---
      ctx.save();
      ctx.translate(crosshairX, crosshairY);

      const chColor = isConnected ? '#10b981' : 'rgba(56, 189, 248, 0.9)';
      ctx.strokeStyle = chColor;
      ctx.fillStyle = chColor;

      // Outer ring
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      if (isConnected) {
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Cardinal ticks
      const gap = 4.5;
      const r = 13;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(0, -r); ctx.lineTo(0, -gap);
      ctx.moveTo(0, r); ctx.lineTo(0, gap);
      ctx.moveTo(-r, 0); ctx.lineTo(-gap, 0);
      ctx.moveTo(r, 0); ctx.lineTo(gap, 0);
      ctx.stroke();

      // Center laser dot
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    };

    renderFrame(performance.now());

    const loop = (now) => {
      if (isVisible) {
        renderFrame(now);
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}

