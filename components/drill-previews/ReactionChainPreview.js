'use client';

import React, { useRef, useEffect } from 'react';

/**
 * ReactionChainPreview
 *
 * Autonomous HTML5 canvas simulation replicating live ReactionChainClient:
 * - High-speed incoming kinetic nodes with directional velocity trails and radar rings
 * - Reticle prepositioning along flight paths followed by complete zero-velocity kinetic arrest
 * - Perfect stationary interception triggering crystalline emerald arrest bursts, shockwaves, and sparks
 * - Zero in-preview text, badges, or telemetry pills
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function ReactionChainPreview() {
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
      phase: 'approach', // 'approach' | 'arrest' | 'cooldown'
      phaseTimer: 0,
      node: {
        x: -40,
        y: 0,
        vx: 240,
        vy: 0,
        radius: 12,
        color: '#10b981',
      },
      reticle: {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        isStill: true,
        scale: 1.0,
      },
      particles: [],
      shockwaves: [],
      screenShake: 0,
    };

    const spawnParticles = (x, y, color = '#10b981', count = 16) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.4 + Math.random() * 4.2;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.022 + Math.random() * 0.03,
          size: 1.8 + Math.random() * 2.2,
          color,
        });
      }
    };

    const spawnNextNode = (w, h) => {
      // Alternate left-to-right or right-to-left
      const leftToRight = Math.random() > 0.5;
      const laneY = h * 0.35 + Math.random() * (h * 0.3);

      const speed = 260 + Math.random() * 70;
      state.node.vx = leftToRight ? speed : -speed;
      state.node.vy = 0;
      state.node.x = leftToRight ? -30 : w + 30;
      state.node.y = laneY;
      state.node.color = Math.random() > 0.4 ? '#10b981' : '#38bdf8';

      // Preposition reticle on the node path ahead
      const interceptX = leftToRight ? w * 0.55 + Math.random() * (w * 0.15) : w * 0.45 - Math.random() * (w * 0.15);
      state.reticle.targetX = interceptX;
      state.reticle.targetY = laneY;
      state.reticle.isStill = false;

      state.phase = 'approach';
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

      state.reticle.x = width * 0.5;
      state.reticle.y = height * 0.5;
      spawnNextNode(width, height);
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

      const node = state.node;
      const ret = state.reticle;

      state.phaseTimer += dt;

      // 1. Reticle Movement: Snap ahead to intercept coordinate and hold perfectly still
      const dx = ret.targetX - ret.x;
      const dy = ret.targetY - ret.y;
      const distToStation = Math.hypot(dx, dy);

      if (distToStation > 1.5) {
        ret.x += dx * Math.min(1.0, 12.0 * dt);
        ret.y += dy * Math.min(1.0, 12.0 * dt);
        ret.isStill = false;
      } else {
        ret.x = ret.targetX;
        ret.y = ret.targetY;
        ret.isStill = true; // Complete zero-velocity kinetic arrest ready!
      }

      // 2. Node Kinematics & Kinetic Arrest
      if (state.phase === 'approach') {
        node.x += node.vx * dt;
        node.y += node.vy * dt;

        // Check arrest intercept with stationary reticle
        const distToReticle = Math.hypot(ret.x - node.x, ret.y - node.y);
        if (distToReticle < node.radius + 8 && ret.isStill) {
          // KINETIC ARREST!
          state.phase = 'arrest';
          state.phaseTimer = 0;
          state.screenShake = 4;
          ret.scale = 0.78; // click depression

          // Dual expanding arrest shockwaves
          state.shockwaves.push({
            x: ret.x,
            y: ret.y,
            radius: node.radius,
            color: node.color,
            life: 1.0,
          });
          state.shockwaves.push({
            x: ret.x,
            y: ret.y,
            radius: node.radius * 0.5,
            color: '#ffffff',
            life: 0.8,
          });

          spawnParticles(ret.x, ret.y, node.color, 18);
          spawnParticles(ret.x, ret.y, '#ffffff', 8);
        } else if ((node.vx > 0 && node.x > width + 40) || (node.vx < 0 && node.x < -40)) {
          // Node passed off screen without arrest
          spawnNextNode(width, height);
        }
      } else if (state.phase === 'arrest') {
        if (state.phaseTimer >= 0.28) {
          state.phase = 'cooldown';
          state.phaseTimer = 0;
        }
      } else if (state.phase === 'cooldown') {
        if (state.phaseTimer >= 0.14) {
          spawnNextNode(width, height);
        }
      }

      // Recover reticle scale
      ret.scale += (1.0 - ret.scale) * Math.min(1.0, 16.0 * dt);

      // Update shockwaves
      for (let i = state.shockwaves.length - 1; i >= 0; i--) {
        const sw = state.shockwaves[i];
        sw.life -= dt * 2.5;
        if (sw.life <= 0) {
          state.shockwaves.splice(i, 1);
        }
      }

      // Update particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life -= p.decay;
        if (p.life <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // Screen shake decay
      let shakeX = 0;
      let shakeY = 0;
      if (state.screenShake > 0.2) {
        shakeX = (Math.random() - 0.5) * state.screenShake;
        shakeY = (Math.random() - 0.5) * state.screenShake;
        state.screenShake *= 0.85;
      } else {
        state.screenShake = 0;
      }

      // ── DRAWING ──
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Tactical Arena Background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      if (shakeX !== 0 || shakeY !== 0) {
        ctx.translate(shakeX, shakeY);
      }

      // Subtle atmospheric coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Intercept Flight Corridor Guideline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(0, ret.targetY); ctx.lineTo(width, ret.targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Incoming Kinetic Node
      if (state.phase === 'approach') {
        ctx.save();
        ctx.translate(node.x, node.y);

        // Velocity Trail Line
        const trailLen = 32;
        const trailDir = node.vx > 0 ? -1 : 1;
        const trailGrad = ctx.createLinearGradient(0, 0, trailDir * trailLen, 0);
        trailGrad.addColorStop(0, node.color);
        trailGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(trailDir * trailLen, 0);
        ctx.stroke();

        // Outer Radar Ring
        ctx.strokeStyle = `rgba(255, 255, 255, 0.25)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, node.radius * 2.0, 0, Math.PI * 2);
        ctx.stroke();

        // Outer tactical ring
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, node.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Glowing body fill
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, node.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Specular highlight
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(-node.radius * 0.2, -node.radius * 0.2, node.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Bright white center core
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Draw Shockwaves
      for (const sw of state.shockwaves) {
        ctx.save();
        ctx.globalAlpha = sw.life;
        const currentR = sw.radius + (1 - sw.life) * 36;
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, currentR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw Particles
      for (const p of state.particles) {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Tactical Arrest Crosshair
      ctx.save();
      ctx.translate(ret.x, ret.y);
      ctx.scale(ret.scale, ret.scale);

      const isStationary = ret.isStill;
      const crosshairColor = isStationary ? '#10b981' : 'rgba(255, 255, 255, 0.65)';

      // Primary tactical ring
      ctx.strokeStyle = crosshairColor;
      ctx.lineWidth = 2;
      if (isStationary) {
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
      }
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.stroke();

      // Secondary outer arrest ring (present when stationary)
      if (isStationary) {
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Cardinal crosshair ticks
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = crosshairColor;
      const gap = 4;
      const tickLen = 12;
      ctx.beginPath();
      ctx.moveTo(0, -tickLen); ctx.lineTo(0, -gap);
      ctx.moveTo(0, tickLen); ctx.lineTo(0, gap);
      ctx.moveTo(-tickLen, 0); ctx.lineTo(-gap, 0);
      ctx.moveTo(tickLen, 0); ctx.lineTo(gap, 0);
      ctx.stroke();

      // Center laser pip
      ctx.fillStyle = isStationary ? '#ffffff' : crosshairColor;
      ctx.shadowColor = isStationary ? '#ffffff' : 'transparent';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
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

