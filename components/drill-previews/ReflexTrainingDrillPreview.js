'use client';

import React, { useEffect, useRef } from 'react';

export default function ReflexTrainingDrillPreview() {
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

    const ro = new ResizeObserver(() => updateSize());
    ro.observe(container);

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    io.observe(container);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Simulation state
    let lastTime = performance.now();
    let simTime = 0;

    // Burst targets sequence setup
    const targetDefs = [
      { id: 1, relX: 0.28, relY: 0.62, radiusRel: 0.075, spawnAt: 0.2, ttl: 1.6 },
      { id: 2, relX: 0.68, relY: 0.38, radiusRel: 0.082, spawnAt: 0.5, ttl: 1.5 },
      { id: 3, relX: 0.46, relY: 0.72, radiusRel: 0.072, spawnAt: 0.8, ttl: 1.7 },
      { id: 4, relX: 0.78, relY: 0.65, radiusRel: 0.078, spawnAt: 2.2, ttl: 1.5 },
      { id: 5, relX: 0.24, relY: 0.35, radiusRel: 0.080, spawnAt: 2.5, ttl: 1.6 },
      { id: 6, relX: 0.52, relY: 0.30, radiusRel: 0.074, spawnAt: 2.8, ttl: 1.7 },
    ];

    // Crosshair keyframe trajectory snaps
    const snaps = [
      { at: 1.1, x: 0.28, y: 0.62, targetId: 1 },
      { at: 1.6, x: 0.68, y: 0.38, targetId: 2 },
      { at: 2.1, x: 0.46, y: 0.72, targetId: 3 },
      { at: 3.1, x: 0.78, y: 0.65, targetId: 4 },
      { at: 3.6, x: 0.24, y: 0.35, targetId: 5 },
      { at: 4.1, x: 0.52, y: 0.30, targetId: 6 },
    ];

    const CYCLE_DURATION = 4.8; // loop repeats every 4.8s

    let particles = [];
    let shockwaves = [];
    let scorePopups = [];
    let lastProcessedSnap = -1;

    const spawnBurst = (x, y) => {
      // Expanding ring shockwave
      shockwaves.push({ x, y, r: 8, maxR: 32, life: 1.0 });
      // Particles
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * Math.PI * 2;
        const spd = Math.random() * 90 + 35;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * spd,
          vy: Math.sin(a) * spd,
          color: Math.random() > 0.4 ? '#ef4444' : '#ffffff',
          life: 1.0,
          decay: Math.random() * 1.5 + 1.8,
          size: Math.random() * 2 + 1.2,
        });
      }
      // +100 Score Popup
      scorePopups.push({ x, y: y - 10, life: 1.0, text: '+100' });
    };

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!isVisible || width <= 0 || height <= 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      if (!prefersReducedMotion) {
        simTime = (simTime + dt) % CYCLE_DURATION;
      } else {
        simTime = 1.0;
      }

      // 1. Tactical Arena Canvas Background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Coordinate Grid Lines
      const gridStep = Math.max(24, Math.round(width / 14));
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridStep) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridStep) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Check for snap trigger
      snaps.forEach((snap, idx) => {
        if (simTime >= snap.at && simTime < snap.at + 0.1) {
          if (lastProcessedSnap !== idx) {
            lastProcessedSnap = idx;
            spawnBurst(snap.x * width, snap.y * height);
          }
        }
      });
      if (simTime < 0.2) lastProcessedSnap = -1;

      // 2. Draw Active Burst Targets
      targetDefs.forEach((def) => {
        const activeStart = def.spawnAt;
        const snap = snaps.find(s => s.targetId === def.id);
        const hitTime = snap ? snap.at : def.spawnAt + def.ttl;

        if (simTime >= activeStart && simTime < hitTime) {
          const age = simTime - activeStart;
          const remaining = Math.max(0, 1 - age / def.ttl);
          const x = def.relX * width;
          const y = def.relY * height;
          const r = Math.max(8, def.radiusRel * height);

          ctx.save();

          // Depleting Countdown Arc (turns red near decay)
          ctx.globalAlpha = 0.65;
          ctx.strokeStyle = remaining < 0.35 ? '#ef4444' : '#ffffff';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(x, y, r + 7, -Math.PI / 2, -Math.PI / 2 + remaining * Math.PI * 2);
          ctx.stroke();

          // Ghost Outer Ring
          ctx.globalAlpha = 0.2;
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.arc(x, y, r + 4, 0, Math.PI * 2);
          ctx.stroke();

          // Tactical Outer Ring
          ctx.globalAlpha = 0.65;
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.stroke();

          // Filled Red Tactical Body (subtle ambient shadow <= 3px)
          ctx.globalAlpha = 0.9;
          ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
          ctx.shadowBlur = 3;
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(x, y, r * 0.82, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Highlight Sheen
          ctx.globalAlpha = 0.35;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(x - r * 0.2, y - r * 0.2, r * 0.26, 0, Math.PI * 2);
          ctx.fill();

          // Center Bright Core
          ctx.globalAlpha = 1.0;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(x, y, Math.max(2, r * 0.18), 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });

      // 3. Shockwave Rings
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.life -= dt * 2.2;
        if (sw.life <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }
        const prog = 1 - sw.life;
        const curR = sw.r + (sw.maxR - sw.r) * prog;
        ctx.save();
        ctx.globalAlpha = sw.life * 0.8;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, curR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Hit Particle Sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Score Popups (+100)
      for (let i = scorePopups.length - 1; i >= 0; i--) {
        const pop = scorePopups[i];
        pop.life -= dt * 1.8;
        pop.y -= dt * 24;
        if (pop.life <= 0) {
          scorePopups.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, pop.life);
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pop.text, pop.x, pop.y);
        ctx.restore();
      }

      // 6. Player Crosshair Movement & Interpolation
      let curTargetX = 0.5;
      let curTargetY = 0.5;

      for (let i = 0; i < snaps.length; i++) {
        const s = snaps[i];
        const prevTime = i === 0 ? 0 : snaps[i - 1].at;
        if (simTime >= prevTime && simTime <= s.at) {
          const t = Math.min(1, Math.max(0, (simTime - prevTime) / (s.at - prevTime)));
          const ease = t < 0.7 ? Math.pow(t / 0.7, 3) * 0.9 : 0.9 + (t - 0.7) / 0.3 * 0.1;
          const prevX = i === 0 ? 0.5 : snaps[i - 1].x;
          const prevY = i === 0 ? 0.5 : snaps[i - 1].y;
          curTargetX = prevX + (s.x - prevX) * ease;
          curTargetY = prevY + (s.y - prevY) * ease;
          break;
        }
      }

      const chX = curTargetX * width;
      const chY = curTargetY * height;

      ctx.save();
      const chColor = '#ef4444';
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

      // Center reticle dot
      ctx.beginPath();
      ctx.arc(chX, chY, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
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
