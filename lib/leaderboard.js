// lib/leaderboard.js

const PLAYER_NAME_KEY = 'skilldrills_player_name';

/**
 * Get or create player name
 * @returns {string} Player name
 */
export function getPlayerName() {
  try {
    return localStorage.getItem(PLAYER_NAME_KEY) || 'Anonymous Player';
  } catch {
    return 'Anonymous Player';
  }
}
