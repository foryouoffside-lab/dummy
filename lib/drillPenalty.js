'use client';

// Time penalty toggle — OFF by default.
//
// When enabled, a miss, timeout or idle click costs the player clock time on
// the endless drills. It is opt-in because a penalty measurably inverts session
// length: simulated over 40 runs per skill tier, +0.6s/hit with a -0.8s penalty
// gave an elite player 87s and a casual player 100s, since a strong player
// reaches high difficulty — where everyone misses — far sooner. With the
// penalty off, session length rises with skill as intended.
//
// So this is a difficulty option for players who find the drill too easy, not
// the default balance. Scores set with it on are not directly comparable to
// scores set with it off (the same caveat already applies to Target Timeouts).

const STORAGE_KEY = 'skilldrills_penalty_enabled';

class DrillPenalty {
  constructor() {
    this.enabled = false;
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved !== null) this.enabled = saved === '1';
      } catch (e) {}
    }
  }

  isEnabled() {
    return this.enabled;
  }

  setEnabled(v) {
    this.enabled = Boolean(v);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, this.enabled ? '1' : '0');
      } catch (e) {}
    }
  }
}

export const drillPenalty = new DrillPenalty();
