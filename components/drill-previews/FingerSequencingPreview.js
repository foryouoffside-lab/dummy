'use client';

import React, { useRef, useEffect } from 'react';

/**
 * FingerSequencingPreview
 *
 * Autonomous HTML5 canvas simulation accurately replicating live FingerSequencingClient:
 * - Dark tactical arena (#050508) with subtle emerald grid
 * - Dashed emerald corridor guidelines connecting sequential nodes
 * - Distinct in-game node states:
 *     1. Active node: Glowing radial gradient (#10b981), solid emerald core, crisp white outline, and timer pulse ring
 *     2. Future nodes: Subtle hollow guide rings (rgba(255, 255, 255, 0.2)) with translucent fill
 *     3. Completed nodes: Soft faded emerald markers
 * - Authentic FPS crosshair cursor executing rapid sequential flicks (Node 1 -> Node 2 -> Node 3)
 * - Click impact emerald particle bursts, shockwave rings, and subtle camera shake
 * - Zero in-preview title tags, badges, or fake number text
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function FingerSequencingPreview() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Simulation State
    const state = {
      chain: [],
      activeIndex: 0,
      phase: 'flick', // 'flick' | 'dwell' | 'reset'
      phaseTimer: 0,
      sequenceTimer: 2.4,
      maxSequenceTime: 2.4,
      cursor: {
        x: 0,
        y: 0,
      },
      particles: [],
      shockwaves: [],
      screenShake: 0,
    };

    const spawnHitEffects = (x, y, r) => {
      const colors = ['#10b981', '#34d399', '#6ee7b7', '#ffffff'];
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 2.8;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.026 + Math.random() * 0.024,
          size: 1.4 + Math.random() * 1.8,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      state.shockwaves.push({
        x,
        y,
        r: r + 2,
        life: 1.0,
      });
    };

    const generateChain = (w, h) => {
      const padX = w * 0.18;
      const padY = h * 0.22;
      const nodeCount = 3;
      const chain = [];

      // Generate 3 non-overlapping sequential nodes with decreasing radius (matching scale order)
      const radii = [14, 11, 8.5];

      // Distribute nodes across left, center, right zones with alternating heights
      const zones = [
        { minX: padX, maxX: w * 0.38, minY: padY, maxY: h * 0.78 },
        { minX: w * 0.42, maxX: w * 0.62, minY: padY, maxY: h * 0.78 },
        { minX: w * 0.66, maxX: w - padX, minY: padY, maxY: h * 0.78 },
      ];

      // Shuffle zones for natural variability
      const shuffledIndices = [0, 1, 2].sort(() => Math.random() - 0.5);

      for (let i = 0; i < nodeCount; i++) {
        const zone = zones[shuffledIndices[i]];
        chain.push({
          x: zone.minX + Math.random() * (zone.maxX - zone.minX),
          y: zone.minY + Math.random() * (zone.maxY - zone.minY),
          r: radii[i],
        });
      }

      state.chain = chain;
      state.activeIndex = 0;
      state.sequenceTimer = state.maxSequenceTime;
      state.phase = 'flick';
      state.phaseTimer = 0;
    };

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;

      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      generateChain(width, height);

      // Start cursor slightly offset from first node
      if (state.chain.length > 0) {
        state.cursor.x = state.chain[0].x - 30;
        state.cursor.y = state.chain[0].y + 25;
      }
    };

    updateDimensions();
    const rafId = requestAnimationFrame(() => updateDimensions());

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

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lastTimestamp = performance.now();

    const render = (now) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      if (!isVisible || prefersReducedMotion) {
        if (!prefersReducedMotion) {
          animId = requestAnimationFrame(render);
          return;
        }
      }

      if (width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const activeNode = state.chain[state.activeIndex];
      const cur = state.cursor;

      state.phaseTimer += dt;
      state.sequenceTimer = Math.max(0, state.sequenceTimer - dt * 0.7);

      // 1. Simulated Human Aim Flicks along Chain Sequence
      if (state.phase === 'flick' && activeNode) {
        const dx = activeNode.x - cur.x;
        const dy = activeNode.y - cur.y;
        const dist = Math.hypot(dx, dy);

        // High-precision ballistic flick with deceleration towards target center
        const flickSpeed = Math.min(1.0, 9.5 * dt);
        cur.x += dx * flickSpeed;
        cur.y += dy * flickSpeed;

        if (dist < 2.5 || state.phaseTimer > 0.45) {
          // Snap directly on node center & trigger click
          cur.x = activeNode.x;
          cur.y = activeNode.y;
          spawnHitEffects(activeNode.x, activeNode.y, activeNode.r);
          state.screenShake = 2.5;

          state.phase = 'dwell';
          state.phaseTimer = 0;
        }
      } else if (state.phase === 'dwell') {
        // Micro-dwell (60ms) after click registration
        if (state.phaseTimer >= 0.08) {
          if (state.activeIndex < state.chain.length - 1) {
            state.activeIndex++;
            state.phase = 'flick';
            state.phaseTimer = 0;
          } else {
            // Whole chain cleared!
            state.phase = 'reset';
            state.phaseTimer = 0;
          }
        }
      } else if (state.phase === 'reset') {
        if (state.phaseTimer >= 0.35) {
          generateChain(width, height);
        }
      }

      // Update shockwaves
      for (let i = state.shockwaves.length - 1; i >= 0; i--) {
        const sw = state.shockwaves[i];
        sw.r += dt * 45;
        sw.life -= dt * 3.0;
        if (sw.life <= 0) {
          state.shockwaves.splice(i, 1);
        }
      }

      // Update particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vx *= 0.95;
        pt.vy *= 0.95;
        pt.life -= pt.decay;
        if (pt.life <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // Screen shake decay
      let shakeX = 0;
      let shakeY = 0;
      if (state.screenShake > 0.1) {
        shakeX = (Math.random() - 0.5) * state.screenShake;
        shakeY = (Math.random() - 0.5) * state.screenShake;
        state.screenShake *= 0.8;
      } else {
        state.screenShake = 0;
      }

      // ── DRAWING ──
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Arena background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      if (shakeX !== 0 || shakeY !== 0) {
        ctx.translate(shakeX, shakeY);
      }

      // Subtle atmospheric emerald grid (matching client createBackdropCache)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Dashed Corridor Guidelines connecting chain nodes in sequence
      if (state.chain.length > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([5, 5]);
        for (let i = 0; i < state.chain.length; i++) {
          if (i === 0) ctx.moveTo(state.chain[i].x, state.chain[i].y);
          else ctx.lineTo(state.chain[i].x, state.chain[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // Render Sequence Nodes (matching client exact logic)
      for (let i = 0; i < state.chain.length; i++) {
        const node = state.chain[i];
        const isActive = i === state.activeIndex && state.phase !== 'reset';
        const isCompleted = i < state.activeIndex;

        ctx.save();

        if (isCompleted) {
          // Completed node: soft translucent emerald
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (isActive) {
          // Active node: radial glow aura + vibrant emerald body + crisp white outline
          const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 1.8);
          glowGrad.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
          glowGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r * 1.8, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.2;
          ctx.stroke();

          // Outer timer pulse ring
          const progressRatio = Math.max(0, state.sequenceTimer / state.maxSequenceTime);
          const pulseR = node.r + 4 + (1 - progressRatio) * 6;
          ctx.strokeStyle = `rgba(16, 185, 129, ${Math.max(0, progressRatio * 0.8)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Future target node: subtle hollow guide circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

        ctx.restore();
      }

      // Expanding Shockwave Rings
      for (const sw of state.shockwaves) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.life);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Particles
      for (const pt of state.particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Professional FPS Gaming Reticle Cursor (matching client exact geometry)
      const px = cur.x;
      const py = cur.y;
      const chColor = '#10b981';

      ctx.save();
      ctx.strokeStyle = chColor;
      ctx.fillStyle = chColor;

      const chRadius = 11;
      const gap = 4;
      const tickLen = 11;

      // Circle
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(px, py, chRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Cross lines with gap
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(px, py - tickLen); ctx.lineTo(px, py - gap);
      ctx.moveTo(px, py + tickLen); ctx.lineTo(px, py + gap);
      ctx.moveTo(px - tickLen, py); ctx.lineTo(px - gap, py);
      ctx.moveTo(px + tickLen, py); ctx.lineTo(px + gap, py);
      ctx.stroke();

      // Center precision dot
      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#050508',
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
