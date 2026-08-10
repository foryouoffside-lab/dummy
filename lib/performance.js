// lib/performance.js
// Performance monitoring and optimization utilities

/**
 * Frame budget (ms) used to cap idle-screen canvas redraws to ~60fps on
 * high-refresh-rate displays (120/144/240Hz), where an uncapped rAF loop
 * would otherwise draw 2-4x more often than needed while a drill is sitting
 * on a start/countdown/game-over screen.
 */
export const IDLE_FRAME_BUDGET_MS = 1000 / 60;

/**
 * Returns true when a render-loop frame can be skipped: the drill isn't
 * actively being played AND less than budgetMs has elapsed since the last
 * frame that was actually drawn. Callers should early-return (after
 * re-scheduling their own requestAnimationFrame) without advancing their
 * own lastTime/dt state when this returns true, so the next processed
 * frame's dt still reflects true elapsed time.
 */
export function isIdleFrameSkippable(isActive, time, lastTime, budgetMs = IDLE_FRAME_BUDGET_MS) {
  return !isActive && (time - lastTime) < budgetMs;
}
