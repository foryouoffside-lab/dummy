'use client';

import React, { useEffect, useRef } from 'react';

export default function ReactionTimeTestPreview() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;

    const ctx = cvs.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId = null;
    let isVisible = true;
    let dpr = 1;
    let width = 0;
    let height = 0;

    const updateSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (width > 0 && height > 0) {
        cvs.width = width * dpr;
        cvs.height = height * dpr;
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Simulation Engine State
    let state = 'TARGET'; // 'TARGET' | 'TIMER' | 'RESULT'
    let stateTimer = 1.1; // seconds in current state
    let timerStart = 0;
    let lastTime = performance.now();
    let particles = [];

    const spawnSparks = (cx, cy) => {
      particles = [];
      const colors = ['#00ff88', '#38bdf8', '#ffffff', '#22d3ee'];
      for (let i = 0; i < 18; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 80 + 30;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1.0,
          maxLife: Math.random() * 0.4 + 0.6,
          size: Math.random() * 2 + 1.5,
        });
      }
    };

    const render = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (!isVisible || width <= 0 || height <= 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // --- State Transitions ---
      if (!prefersReducedMotion) {
        stateTimer -= dt;

        if (state === 'TARGET' && stateTimer <= 0) {
          state = 'TIMER';
          stateTimer = 2.3;
          timerStart = performance.now();
        } else if (state === 'TIMER' && stateTimer <= 0) {
          state = 'RESULT';
          stateTimer = 1.3;
          spawnSparks(width / 2, height / 2);
        } else if (state === 'RESULT' && stateTimer <= 0) {
          state = 'TARGET';
          stateTimer = 1.1;
        }
      }

      // --- 1. Background Fill ---
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // --- 2. Tactical Coordinate Grid ---
      const gridStep = Math.max(22, Math.round(width / 14));
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.045)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridStep) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridStep) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // --- 3. Render State Gameplay ---
      if (state === 'TARGET') {
        // Monospace Target Interval Readout
        const fontSize = Math.round(height * 0.17);
        ctx.fillStyle = '#ffffff';
        ctx.font = `900 ${fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('2.400s', cx, cy - height * 0.02);

        // Memorization Progress Bar
        const barW = Math.min(180, width * 0.44);
        const barH = 3;
        const prog = Math.max(0, Math.min(1, stateTimer / 1.1));

        ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.fillRect(cx - barW / 2, cy + height * 0.13, barW, barH);

        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(cx - barW / 2, cy + height * 0.13, barW * prog, barH);
      }

      if (state === 'TIMER') {
        const elapsed = performance.now() - timerStart;

        // Center Glowing Tactical Orb
        const orbR = Math.max(5, height * 0.038);
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.7)';
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(cx, cy, orbR, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner Pulsing Wave
        const pulseCycle = (elapsed % 900) / 900;
        const waveR = orbR + 10 + pulseCycle * (height * 0.22);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.35 * (1 - pulseCycle)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, waveR, 0, Math.PI * 2);
        ctx.stroke();

        // Rotating Inner Dashed Ring (Clockwise)
        const innerR = height * 0.18;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(elapsed * 0.0012);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.55)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 8]);
        ctx.beginPath();
        ctx.arc(0, 0, innerR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Counter-Rotating Outer Orbital Ring (Counter-Clockwise)
        const outerR = height * 0.27;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-elapsed * 0.0006);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, outerR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (state === 'RESULT') {
        // Result Readout
        const fontSize = Math.round(height * 0.17);
        ctx.fillStyle = '#ffffff';
        ctx.font = `900 ${fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('2.418s', cx, cy - height * 0.05);

        // Latency Error & Grade
        const subFontSize = Math.round(height * 0.08);
        ctx.fillStyle = '#00ff88';
        ctx.font = `bold ${subFontSize}px monospace`;
        ctx.fillText('+18ms  PERFECT', cx, cy + height * 0.09);

        // Transition Progress Bar
        const barW = Math.min(180, width * 0.44);
        const barH = 3;
        const prog = Math.max(0, Math.min(1, stateTimer / 1.3));

        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.fillRect(cx - barW / 2, cy + height * 0.18, barW, barH);

        ctx.fillStyle = '#00ff88';
        ctx.fillRect(cx - barW / 2, cy + height * 0.18, barW * prog, barH);

        // Click Crosshair
        const crosshairSize = 10;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 4); ctx.lineTo(cx, cy - crosshairSize);
        ctx.moveTo(cx, cy + 4); ctx.lineTo(cx, cy + crosshairSize);
        ctx.moveTo(cx - 4, cy); ctx.lineTo(cx - crosshairSize, cy);
        ctx.moveTo(cx + 4, cy); ctx.lineTo(cx + crosshairSize, cy);
        ctx.stroke();

        // Render Burst Particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.life -= dt / p.maxLife;

          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      ctx.restore();

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

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
        className="w-full h-full block"
      />
    </div>
  );
}
