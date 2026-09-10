'use client';

import React, { useRef, useEffect } from 'react';

/**
 * KeyboardRecognitionPreview
 *
 * Autonomous HTML5 canvas simulation accurately replicating live KeyboardRecognitionClient:
 * - Deep tactical carbon arena (#080811) with subtle coordinate grid
 * - Rhythmic alternation across the core training modes:
 *     1. Single Rapid Keybind: Mechanical keycap with countdown progress arc, rapid latency press,
 *        emerald bloom (#10b981), mechanical key depression, and radial spark burst
 *     2. 3-Key Sequence Cascade: Multi-key chain (e.g. W -> E -> R) executing rapid successive presses,
 *        transitioning from waiting slate -> active white -> locked emerald with individual shockwaves
 *     3. Response Inhibition Trap (Fake Amber Prompt): Amber warning keycap (#f59e0b) depleting its timer
 *        while motor inhibition holds steady, concluding with a clean golden clearance ripple
 * - Multi-layer mechanical keycap rendering: drop shadow, side chamfer bevel, top face, and monospace glyph
 * - Zero in-preview title tags, badges, or fake pill text
 * - HiDPI Retina DPR scaling, ResizeObserver + rAF fallback, IntersectionObserver auto-pause
 */
export default function KeyboardRecognitionPreview() {
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
      mode: 'single', // 'single' | 'sequence' | 'fake'
      modeStep: 0,
      timer: 0,
      duration: 1.2,
      // Single Key State
      singleKey: { label: 'E', pressed: false, depressY: 0, flashLife: 0 },
      // Sequence State
      seqKeys: [
        { label: 'W', state: 'active', depressY: 0 },
        { label: 'E', state: 'waiting', depressY: 0 },
        { label: 'R', state: 'waiting', depressY: 0 },
      ],
      seqIndex: 0,
      seqStepTimer: 0,
      // Fake Key State
      fakeKey: { label: 'K', cleared: false },
      particles: [],
      shockwaves: [],
      screenShake: 0,
    };

    const singleKeyPool = ['E', 'R', 'F', 'Q', 'C', 'SPACE', '1', '2'];
    const seqSets = [
      ['W', 'E', 'R'],
      ['A', 'S', 'D'],
      ['Q', 'E', 'F'],
      ['1', '2', '3'],
    ];
    const fakeKeyPool = ['K', '9', 'P', 'L', 'M'];

    const spawnSparkBurst = (x, y, isAmber = false) => {
      const colors = isAmber
        ? ['#f59e0b', '#fbbf24', '#fde68a', '#ffffff']
        : ['#10b981', '#34d399', '#6ee7b7', '#ffffff'];

      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 3.0;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: 0.026 + Math.random() * 0.022,
          size: 1.3 + Math.random() * 1.6,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const spawnShockwave = (x, y, r, isAmber = false) => {
      state.shockwaves.push({
        x,
        y,
        r,
        maxR: r + 24,
        life: 1.0,
        color: isAmber ? '#f59e0b' : '#10b981',
      });
    };

    const startNextMode = () => {
      state.modeStep = (state.modeStep + 1) % 4;
      state.timer = 0;

      if (state.modeStep === 0 || state.modeStep === 2) {
        // Single Keybind Mode
        state.mode = 'single';
        state.duration = 1.05;
        const nextLabel = singleKeyPool[Math.floor(Math.random() * singleKeyPool.length)];
        state.singleKey = { label: nextLabel, pressed: false, depressY: 0, flashLife: 0 };
      } else if (state.modeStep === 1) {
        // 3-Key Sequence Cascade Mode
        state.mode = 'sequence';
        state.duration = 1.35;
        const nextSet = seqSets[Math.floor(Math.random() * seqSets.length)];
        state.seqKeys = nextSet.map((label, i) => ({
          label,
          state: i === 0 ? 'active' : 'waiting',
          depressY: 0,
        }));
        state.seqIndex = 0;
        state.seqStepTimer = 0;
      } else {
        // Response Inhibition Trap (Fake Key)
        state.mode = 'fake';
        state.duration = 1.1;
        const nextFake = fakeKeyPool[Math.floor(Math.random() * fakeKeyPool.length)];
        state.fakeKey = { label: nextFake, cleared: false };
      }
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

      startNextMode();
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

    // Helper: draw a rounded rectangle
    const roundRect = (c, x, y, w, h, r) => {
      c.beginPath();
      c.moveTo(x + r, y);
      c.lineTo(x + w - r, y);
      c.quadraticCurveTo(x + w, y, x + w, y + r);
      c.lineTo(x + w, y + h - r);
      c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      c.lineTo(x + r, y + h);
      c.quadraticCurveTo(x, y + h, x, y + h - r);
      c.lineTo(x, y + r);
      c.quadraticCurveTo(x, y, x + r, y);
      c.closePath();
    };

    // Helper: draw multi-layer mechanical keycap
    const drawKeycap = (cx, cy, kw, kh, label, keyState, depressOffset = 0, flash = 0) => {
      const kx = cx - kw / 2;
      const ky = cy - kh / 2 + depressOffset;

      ctx.save();

      // 1. Keycap Base / Bevel Drop Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      roundRect(ctx, kx, ky + 4 - depressOffset * 0.6, kw, kh, 11);
      ctx.fill();

      // 2. Keycap Lower Chamfer / Body Wall
      let bodyWall = '#1e293b';
      if (keyState === 'locked') bodyWall = '#065f46';
      else if (keyState === 'fake') bodyWall = '#78350f';
      else if (keyState === 'active') bodyWall = '#334155';

      ctx.fillStyle = bodyWall;
      roundRect(ctx, kx, ky + 2, kw, kh - 1, 10);
      ctx.fill();

      // 3. Keycap Top Face
      let faceColor = '#0f172a';
      let strokeColor = 'rgba(255, 255, 255, 0.12)';
      let textColor = '#64748b';
      let glowColor = 'transparent';

      if (keyState === 'locked') {
        faceColor = 'rgba(16, 185, 129, 0.18)';
        strokeColor = '#10b981';
        textColor = '#34d399';
        glowColor = 'rgba(16, 185, 129, 0.4)';
      } else if (keyState === 'active') {
        faceColor = '#1e293b';
        strokeColor = '#ffffff';
        textColor = '#ffffff';
        glowColor = 'rgba(255, 255, 255, 0.25)';
      } else if (keyState === 'fake') {
        faceColor = 'rgba(245, 158, 11, 0.14)';
        strokeColor = '#f59e0b';
        textColor = '#fbbf24';
        glowColor = 'rgba(245, 158, 11, 0.35)';
      }

      if (glowColor !== 'transparent') {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 12;
      }

      ctx.fillStyle = faceColor;
      roundRect(ctx, kx, ky, kw, kh - 3, 9);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = keyState === 'active' || keyState === 'locked' || keyState === 'fake' ? 2 : 1.2;
      roundRect(ctx, kx, ky, kw, kh - 3, 9);
      ctx.stroke();

      // Flash illumination sheen on top face
      if (flash > 0) {
        ctx.save();
        ctx.globalAlpha = flash * 0.4;
        ctx.fillStyle = '#ffffff';
        roundRect(ctx, kx, ky, kw, kh - 3, 9);
        ctx.fill();
        ctx.restore();
      }

      // 4. Monospace Character Glyph
      ctx.save();
      const fontSize = label.length > 2 ? Math.floor(kh * 0.28) : Math.floor(kh * 0.46);
      ctx.font = `900 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = textColor;
      if (keyState === 'locked' || keyState === 'active' || keyState === 'fake') {
        ctx.shadowColor = textColor;
        ctx.shadowBlur = 8;
      }
      ctx.fillText(label, cx, ky + (kh - 3) / 2);
      ctx.restore();

      ctx.restore();
    };

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

      // State Progression
      state.timer += dt;

      // 1. Single Keybind Logic
      if (state.mode === 'single') {
        const sk = state.singleKey;
        // Latency reaction delay (~0.28s) before physical keypress
        if (!sk.pressed && state.timer >= 0.28) {
          sk.pressed = true;
          sk.depressY = 3.2;
          sk.flashLife = 1.0;
          state.screenShake = 2.4;

          const keyW = sk.label === 'SPACE' ? 96 : 58;
          spawnSparkBurst(width * 0.5, height * 0.5, false);
          spawnShockwave(width * 0.5, height * 0.5, keyW * 0.5, false);
        }

        if (sk.pressed) {
          sk.depressY = Math.max(0, sk.depressY - dt * 10);
          sk.flashLife = Math.max(0, sk.flashLife - dt * 4.5);
        }

        if (state.timer >= state.duration) {
          startNextMode();
        }
      }

      // 2. Sequence Cascade Logic
      else if (state.mode === 'sequence') {
        state.seqStepTimer += dt;
        const curIdx = state.seqIndex;

        // Interval between sequence key presses (~0.24s)
        if (curIdx < state.seqKeys.length && state.seqStepTimer >= 0.24) {
          const keyObj = state.seqKeys[curIdx];
          keyObj.state = 'locked';
          keyObj.depressY = 2.8;
          state.screenShake = 1.8;

          const kw = 46;
          const gap = 14;
          const totalW = state.seqKeys.length * kw + (state.seqKeys.length - 1) * gap;
          const startX = (width - totalW) / 2 + kw / 2;
          const kx = startX + curIdx * (kw + gap);

          spawnSparkBurst(kx, height * 0.5, false);
          spawnShockwave(kx, height * 0.5, kw * 0.5, false);

          state.seqIndex++;
          state.seqStepTimer = 0;

          if (state.seqIndex < state.seqKeys.length) {
            state.seqKeys[state.seqIndex].state = 'active';
          }
        }

        // Recover depression
        for (const k of state.seqKeys) {
          if (k.depressY > 0) k.depressY = Math.max(0, k.depressY - dt * 10);
        }

        if (state.timer >= state.duration) {
          startNextMode();
        }
      }

      // 3. Fake Key Response Inhibition Logic
      else if (state.mode === 'fake') {
        // Player refrains from pressing throughout the entire prompt
        if (!state.fakeKey.cleared && state.timer >= state.duration - 0.25) {
          state.fakeKey.cleared = true;
          spawnShockwave(width * 0.5, height * 0.5, 34, true);
        }

        if (state.timer >= state.duration) {
          startNextMode();
        }
      }

      // Update Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vx *= 0.94;
        pt.vy *= 0.94;
        pt.life -= pt.decay;
        if (pt.life <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // Update Shockwaves
      for (let i = state.shockwaves.length - 1; i >= 0; i--) {
        const sw = state.shockwaves[i];
        sw.r += dt * 48;
        sw.life -= dt * 3.2;
        if (sw.life <= 0) {
          state.shockwaves.splice(i, 1);
        }
      }

      // Screen Shake Decay
      let shakeX = 0;
      let shakeY = 0;
      if (state.screenShake > 0.1) {
        shakeX = (Math.random() - 0.5) * state.screenShake;
        shakeY = (Math.random() - 0.5) * state.screenShake;
        state.screenShake *= 0.82;
      } else {
        state.screenShake = 0;
      }

      // ── CANVAS RENDERING ──
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Arena background (#080811)
      ctx.fillStyle = '#080811';
      ctx.fillRect(0, 0, width, height);

      if (shakeX !== 0 || shakeY !== 0) {
        ctx.translate(shakeX, shakeY);
      }

      // Subtle atmospheric tactical grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // 1. Render Mode A: Single Keybind
      if (state.mode === 'single') {
        const sk = state.singleKey;
        const kw = sk.label === 'SPACE' ? 96 : 56;
        const kh = 56;
        const keyState = sk.pressed ? 'locked' : 'active';

        // Background ambient glow
        const glowColor = sk.pressed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.06)';
        const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 70);
        glowGrad.addColorStop(0, glowColor);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.fill();

        // Depleting progress arc around key
        const progress = Math.max(0, 1 - state.timer / state.duration);
        ctx.beginPath();
        ctx.arc(centerX, centerY, 42, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
        ctx.strokeStyle = sk.pressed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        drawKeycap(centerX, centerY, kw, kh, sk.label, keyState, sk.depressY, sk.flashLife);
      }

      // 2. Render Mode B: 3-Key Sequence
      else if (state.mode === 'sequence') {
        const kw = 46;
        const kh = 52;
        const gap = 12;
        const totalW = state.seqKeys.length * kw + (state.seqKeys.length - 1) * gap;
        const startX = (width - totalW) / 2 + kw / 2;

        // Ambient sequence glow behind active/locked keys
        const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 90);
        glowGrad.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
        ctx.fill();

        // Connecting sequence flow guideline
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.moveTo(startX, centerY);
        ctx.lineTo(startX + (state.seqKeys.length - 1) * (kw + gap), centerY);
        ctx.stroke();
        ctx.restore();

        for (let i = 0; i < state.seqKeys.length; i++) {
          const k = state.seqKeys[i];
          const kx = startX + i * (kw + gap);
          drawKeycap(kx, centerY, kw, kh, k.label, k.state, k.depressY);
        }
      }

      // 3. Render Mode C: Response Inhibition Trap (Fake Amber Prompt)
      else if (state.mode === 'fake') {
        const fk = state.fakeKey;
        const kw = 56;
        const kh = 56;

        // Warning amber ambient glow
        const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 70);
        glowGrad.addColorStop(0, 'rgba(245, 158, 11, 0.14)');
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.fill();

        // Amber countdown timer arc (drain down to 0)
        const progress = Math.max(0, 1 - state.timer / state.duration);
        ctx.beginPath();
        ctx.arc(centerX, centerY, 42, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        drawKeycap(centerX, centerY, kw, kh, fk.label, 'fake', 0);
      }

      // 4. Render Expanding Shockwaves
      for (const sw of state.shockwaves) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.life);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Render Kinetic Spark Particles
      for (const pt of state.particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

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
        background: '#080811',
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

