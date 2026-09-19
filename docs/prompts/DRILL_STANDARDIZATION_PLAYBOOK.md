# SkillDrills Drill Standardization Playbook
**The Canonical Specification for Drill Overhaul, Visual Polish & UX Standardization**

This document serves as the master, repeatable blueprint for upgrading any drill in the SkillDrills platform. It stores every change, code pattern, design token, and structural rule established during the canonical optimization of **Flick Shot Trainer** (`fps/flick-shot-training`).

---

## 1. Clean Target Visuals (Removal of Outer Shrinking Ring)

### The Problem
Earlier iterations drew an expanding/shrinking outer ring (`arc` with radius `tgt.radius + 4 + lifePercent * 10`) colored green-to-yellow-to-red. This created visual noise, distracted from crosshair alignment, caused perceived frame jitter, and made target hitboxes feel ambiguous.

### The Standard
- **Eliminate the Outer Timer Ring:** Remove all drawing code for the decaying/shrinking outer circle.
- **Draw Clean Tactical Targets:** Render targets as high-visibility tactical spheres with clean pulse rings:
  ```javascript
  // BEFORE (Distracting outer timer ring):
  const lifePercent = 1 - progress;
  const ringColor = lifePercent > 0.5 ? TARGET_COLOR : (lifePercent > 0.25 ? '#eab308' : '#ef4444');
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(tgt.x, tgt.y, tgt.radius + 4 + (Math.max(0, lifePercent) * 10), 0, Math.PI * 2);
  ctx.stroke();

  // AFTER (Clean, distraction-free tactical target):
  drawPulseRing(ctx, tgt.x, tgt.y, tgt.radius, TARGET_COLOR, progress);
  drawTacticalTarget(ctx, tgt.x, tgt.y, tgt.radius, TARGET_COLOR);
  ```
- **Copy Clean-Up:** Update drill captions and description text to eliminate references to "shrinking rings":
  - **Old:** *"Snap to and click spawning targets across the screen before their shrinking timer ring expires."*
  - **New:** *"Snap to and click spawning targets across the screen before their timer expires."*

---

## 2. Dynamic Hit Effect & Particle Pass

### The Standard
Hits and misses must deliver immediate, tactile visual feedback for all canvas ball/projectile targets:

> [!IMPORTANT]
> **Hit Effect Scope & Button Target Exemption:** Canvas hit effects (expanding hit rings and 14-particle delta-decay bursts) apply STRICTLY to drills featuring moving or static canvas target balls / coordinate projectiles. Drills that use DOM buttons, UI tiles, text cards, or keyboard inputs (e.g. Schulte Table, Digit Span, Word Recall, Keyboard Tester, button grids) are **EXEMPT** from canvas hit effects because hit effects cannot and should not be placed on UI buttons. These drills use clean native UI state styling (subtle CSS ring/border pulse or audio) instead.

1. **Dynamic Hit Particles (`createExplosion`):** 14 radial particles burst on every confirmed hit with random velocity (`Math.cos(angle) * speed`, `Math.sin(angle) * speed`) and decay over delta time (`p.life -= dt * 2.5`).
2. **Dual Shockwave Rings (`createHitRing`, `drawHitRings`):** An expanding tactical shockwave ring animates from the target center on click.
3. **Streak-Reactive Color Shifts:**
   - Baseline hits: Emerald `#10b981`.
   - Combo streaks (10+): Bright mint `#34d399` on particles and shockwaves.
4. **Miss Click Feedback:** Mis-clicks outside target bounds spawn an immediate crimson spark burst (`#ef4444`) with audio penalty.

```javascript
// On target hit:
const hitColor = eRef.combo >= 10 ? '#34d399' : TARGET_COLOR;
drillAudio.playHit();
createExplosion(tgt.x, tgt.y, hitColor);
eRef.hitRings.push(createHitRing(tgt.x, tgt.y, tgt.radius, hitColor));
createHitMarker(ch.x, ch.y);

// In RAF loop:
drawHitRings(ctx, e.hitRings, dt);
for (let i = e.particles.length - 1; i >= 0; i--) {
  const p = e.particles[i];
  p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
  if (p.life <= 0) { e.particles.splice(i, 1); continue; }
  ctx.globalAlpha = p.life;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
  ctx.fill();
}
ctx.globalAlpha = 1.0;
```

---

## 3. One-Pointed, Single-Line Instructions & Scoring

### The Problem
Instruction cards previously wrapped text across 2–3 awkward lines on desktop and vertically clustered into 2 lines on mobile viewports (<640px).

### The Golden Rule
Both the instruction title and result badge **must strictly reside on ONE horizontal line** across all screen sizes (mobile and desktop).

### Implementation Pattern (`RuleItem`)
```jsx
function RuleItem({ num, text, highlight = '', result }) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 bg-black px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10 shadow-sm font-sans">
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs sm:text-sm font-black shadow flex-shrink-0">
        {num}
      </div>
      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
        <p className="text-xs sm:text-sm font-medium text-gray-200 font-sans truncate">
          {text}{highlight && <span className="font-bold text-white"> {highlight}</span>}
        </p>
        <div className="text-[11px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#050811] border border-white/10 text-white whitespace-nowrap shadow-inner flex-shrink-0">
          {result}
        </div>
      </div>
    </div>
  );
}
```

### Punchy Text Formula (One-Pointed Phrasing)
| Slot | Rule | Phrasing Pattern | Standard Example |
| :---: | :--- | :--- | :--- |
| **1** | Target Scoring | `[Action] [PTS + Time]` ➔ `[Multiplier]` | `Target Hit` `+100 PTS (+0.6s)` ➔ `×Combo Mult` |
| **2** | Combo Streak | `[Streak Title] [Max Cap]` ➔ `[Effect]` | `Combo Streak` `Up to 3.0×` ➔ `Faster Targets` |
| **3** | Level Progression | `[Level] [PTS Step]` ➔ `[Scaling]` | `Level Up` `+1 / 1800 PTS` ➔ `Adaptive Scaling` |
| **4** | Error / Penalty | `[Error Types] [Status]` ➔ `[Deduction]` | `Miss / Timeout` `Penalty` ➔ `Resets Combo (-0.8s)` |

### Neutral White Badges (No Green)
All badge numbers, borders, and result chips use neutral white / slate tokens (`bg-white/10`, `border-white/20`, `text-white`, `bg-[#050811]`), completely avoiding green tints in the instructions accordion.

---

## 4. Professional Page Hierarchy & Layout Order

Drill pages must follow a strict, logical, conversion-optimized top-to-bottom hierarchy:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. H1 Header + Concise Subtitle / Intro                     │
├─────────────────────────────────────────────────────────────┤
│ 2. Live Stat Cards (Score, Time, Accuracy, Best Score)      │
├─────────────────────────────────────────────────────────────┤
│ 3. Interactive Game Stage (Canvas, Start Card, Countdown,   │
│    HUD, Hit FX, End Result Card)                            │
├─────────────────────────────────────────────────────────────┤
│ 4. Drill Caption (Single concise line)                      │
├─────────────────────────────────────────────────────────────┤
│ 5. Instructions & Scoring Accordion (Single-line rules)     │
├─────────────────────────────────────────────────────────────┤
│ 6. About the Drill Accordion (Mechanics, cards, systems)    │
├─────────────────────────────────────────────────────────────┤
│ 7. FAQ Accordion                                            │
├─────────────────────────────────────────────────────────────┤
│ 8. Related FPS Drills Grid                                  │
├─────────────────────────────────────────────────────────────┤
│ 9. DrillGuide (Scientific benchmarks table, techniques,     │
│    calibration tips, 10 bespoke FAQs, cited sources)        │
├─────────────────────────────────────────────────────────────┤
│ 10. DrillFooter (Social media links, copyright)             │
│     * MUST be the true bottom — nothing rendered after it.  │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Esports Tactical White Crosshair

### The Standard
- **Pure White Reticle:** `#ffffff` replacing pink (`#ff2d95`) or yellow (`#eab308`).
- **High-Contrast Shadow Outline:** Wrapped in dark drop shadow (`ctx.shadowColor = 'rgba(0, 0, 0, 0.9)'; ctx.shadowBlur = 3;`) ensuring 100% reticle visibility against bright explosions, green targets, and dark backgrounds.
- **Center Dot + 4-Axis Gap Reticle:** 14px outer radius, 4px center gap, 2px center dot.

```javascript
const activeColor = '#ffffff';
ctx.save();
ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
ctx.shadowBlur = 3;
ctx.strokeStyle = activeColor;
ctx.fillStyle = activeColor;

ctx.lineWidth = 2;
ctx.beginPath(); ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2); ctx.stroke();

const gap = 4;
ctx.beginPath();
ctx.moveTo(ch.x, ch.y - 14); ctx.lineTo(ch.x, ch.y - gap);
ctx.moveTo(ch.x, ch.y + 14); ctx.lineTo(ch.x, ch.y + gap);
ctx.moveTo(ch.x - 14, ch.y); ctx.lineTo(ch.x - gap, ch.y);
ctx.moveTo(ch.x + 14, ch.y); ctx.lineTo(ch.x + gap, ch.y);
ctx.stroke();

ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
ctx.restore();
```

---

## 6. Direct Exit & `Esc` Key Lifecycle (Zero Stuck Screens)

### The Problem
Previously:
1. Pressing `Esc` mid-drill merely released browser pointer lock, trapping the player in a full-screen "GAME PAUSED" overlay.
2. Clicking "Exit" on the Game Over screen (`DrillResultCard`) failed to cleanly reset the page, forcing players to manually refresh the browser.

### The Golden Solution
1. **Delete the "GAME PAUSED" Overlay:** Remove the pause overlay entirely. Pressing `Esc` or losing pointer lock mid-drill should **directly quit** the drill.
2. **Instant Exit on ESC / Pointer Lock Loss / Fullscreen Exit:**
   - Listen to `keydown` (`e.key === 'Escape'`).
   - Listen to `pointerlockchange` (if pointer lock drops during `playing` or `countdown`).
   - Listen to `fullscreenchange` (if native fullscreen closes during `playing` or `countdown`).
   - All three immediately invoke `handleExitDrill()`.
3. **Clean Start Page Return:** `handleExitDrill` drops fullscreen, releases pointer lock, cancels animation frames and countdowns, and resets React state to `setGameState('start')` with zeroed score counters (Score: 0, Time: 45s, Accuracy: 100%), immediately displaying the start card (`FpsStartCard`).

```javascript
const handleExitDrill = useCallback(() => {
  countdownTimeoutsRef.current.forEach(clearTimeout);
  countdownTimeoutsRef.current = [];
  startingRef.current = false;
  gameActiveRef.current = false;

  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
  }

  if (document.pointerLockElement) {
    try { document.exitPointerLock(); } catch (e) {}
  }
  if (document.fullscreenElement) {
    try { document.exitFullscreen(); } catch (e) {}
  }

  setIsFullscreen(false);
  setPointerLocked(false);
  setGameState('start');
  setUiScore(0);
  setUiTimeLeft(DRILL_DURATION);
  setUiAccuracy(100);

  const w = engine.current?.logicalWidth || 800;
  const h = engine.current?.logicalHeight || 450;
  engine.current = {
    crosshair: { x: w / 2, y: h / 2, initialized: false },
    target: { active: false, x: 0, y: 0, radius: 32, spawnTime: 0, ttl: 1300, pulseSeed: 0.5 },
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION,
    nextSpawnTime: 0, successfulHits: 0, missedClicks: 0,
    idleClicks: 0, timeouts: 0, totalActions: 0, flickTimes: [], maxCombo: 0,
    particles: [], hitMarkers: [], hitRings: [], screenShake: 0, logicalWidth: w, logicalHeight: h
  };
}, []);

// ESC key listener (capture phase):
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (gameState === 'playing' || gameState === 'countdown' || gameState === 'gameOver') {
        e.preventDefault();
        e.stopPropagation();
        handleExitDrill();
      }
    }
  };
  window.addEventListener('keydown', handleKeyDown, true);
  return () => window.removeEventListener('keydown', handleKeyDown, true);
}, [gameState, handleExitDrill]);

// Pointer lock release listener:
useEffect(() => {
  const handlePointerLockChange = () => {
    const isLocked = document.pointerLockElement === canvasRef.current;
    setPointerLocked(isLocked);
    if (!isLocked && (gameState === 'playing' || gameState === 'countdown')) {
      handleExitDrill();
    }
  };
  document.addEventListener('pointerlockchange', handlePointerLockChange);
  return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
}, [gameState, handleExitDrill]);

// Fullscreen exit listener:
useEffect(() => {
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement && isFullscreen && (gameState === 'playing' || gameState === 'countdown')) {
      handleExitDrill();
    }
  };
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
}, [isFullscreen, gameState, handleExitDrill]);
```

---

## 7. Fast Page Reload & Skeleton Architecture

1. **Instant Matching Skeleton Loader:** In `<DrillLoader />` (e.g. `ProFlickClientLoader.js`), provide a matching dark `#080811` aspect-ratio container with an emerald spinner (`loading: () => <... />`) so the page paints immediately on first load without layout shifts (CLS: 0).
2. **Dynamic Import Guard:** Always use standard dynamic imports (`ssr: false`) without `export const dynamic = 'force-static'` on canvas drill pages to prevent pre-render crashes on window/document APIs.

---

## 8. Rollout Checklist for the Next Drill

When modernizing the next drill, follow this step-by-step checklist:

- [ ] **1. Clean Target Visuals:** Remove outer shrinking/expanding timer rings and update copy.
- [ ] **2. Hit Effect Pass:** Add 14-particle burst, dual expanding hit rings, and combo color shifts.
- [ ] **3. White Crosshair:** Set `#ffffff` with dark drop shadow (`rgba(0, 0, 0, 0.9)`, blur 3).
- [ ] **4. Single-Line Rules:** Convert instructions to `RuleItem` with neutral white badges.
- [ ] **5. Page Hierarchy:** Arrange into Header ➔ Stats ➔ Game Stage ➔ Rules ➔ About ➔ FAQ ➔ Related ➔ DrillGuide ➔ DrillFooter (true bottom).
- [ ] **6. Direct Exit / ESC:** Remove "GAME PAUSED" screen; wire `Escape`, `pointerlockchange`, and `fullscreenchange` to `handleExitDrill`.
- [ ] **7. Loader Skeleton:** Ensure dark aspect-ratio skeleton with spinner.
- [ ] **8. Multi-Locale Standardization:** Propagate the exact copy structure, 4 single-line rules items with neutral white badges, clean captions (no timer ring), and true bottom `DrillFooter` across all 6 locales (`ko`, `ja`, `de`, `es`, `fr`, `pt`) with authentic native keyword research and zero content trimming.
- [ ] **9. Verification:** Compile and test all 7 locales on dev server (HTTP 200, 0 errors) with strict Bing/IndexNow guardrails preserved.

---

## 9. International SEO & Localization Mandate (No Translation, Native Search Research Only)

### 1. Absolute Ban on Mechanical Translation & Transcription
- **NEVER** transcribe or directly translate English drill pages, titles, descriptions, instructions, or FAQs into target languages (Korean, Japanese, German, Spanish, French, Portuguese).
- **NEVER** use mechanical dictionary translation or word-for-word substitution tools.

### 2. Mandatory Country-Specific Keyword Research
- Every drill page for every locale MUST be built around real, native search terms researched specifically in that country's language and search ecosystem:
  - **Korean (`ko`):** Researched in Naver & Google Korea with authentic esports terminology (`끌어치기`, `에임 브레이킹`, `위협 평가`, `사격 억제`, `피아식별 훈련`).
  - **Japanese (`ja`):** Researched in Yahoo Japan & Google Japan (`フリック エイム 練習`, `スナップ エイム`, `ターゲット優先度`, `脅威判定`, `射撃抑制`).
  - **German (`de`):** Researched in German gaming search (`Zielpriorisierung FPS`, `Trigger-Disziplin trainieren`, `Schusshemmung FPS`, `Muskelbremsung`).
  - **Spanish (`es`):** Researched in Hispanic gaming ecosystems (`priorización de objetivos fps`, `disciplina de gatillo`, `evaluación de amenazas aim`).
  - **French (`fr`):** Researched in francophone gaming ecosystems (`priorisation des cibles fps`, `discipline de tir shooter`, `évaluation des menaces visée`).
  - **Portuguese (`pt`):** Researched in Brazilian / Lusophone gaming ecosystems (`priorização de alvos fps`, `disciplina de gatilho fps`, `avaliação de ameaças mira`).
- Prioritize **high-demand, low-competition ("Soft SERP") keywords** country-wise, targeting what real native users actually search for.

### 3. Authentic Native Transcreation
- Transcreate copy around discovered keywords rather than translating English copy.
- Write instruction cards, game captions, and descriptions directly in the natural grammar, tone, and competitive slang used by high-tier players in each specific region.

### 4. Zero Content Trimming (Preserve Full Depth)
- Localized pages must match or exceed the full depth of the standard:
  - Full scientific introductions citing real motor control literature (Logan & Cowan 1984, Donders 1868, Woods et al. 2015, Broadbent 1958, Treisman 1980).
  - Multi-tier benchmark tables (`benchmarks: { title, headers, rows, note }`) with localized metrics, percentiles, and physiological milestones.
  - In-depth training protocols and device/calibration guidance.
  - **10 bespoke, scientifically grounded FAQs** per page answering distinct questions (ZERO placeholder titles like `Q4..Q10` and ZERO repeated/boilerplate answers).

### 5. One Drill at a Time Rule (No Batch Generation)
- Work strictly **one drill at a time**.
- NEVER use batch generation scripts, loops, or templated shortcuts across multiple drills.
- Research keywords, draft authentic native copy, verify schemas, compile, and validate each drill individually before moving to the next.

### 6. Pre-Deployment Search Engine Guardrail
- Absolute ZERO submissions to Bing API or IndexNow (`ENABLE_INDEXNOW=true` strictly forbidden) until final site deployment.

