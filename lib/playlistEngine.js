'use client';

import {
  SKILL_PILLARS, DRILL_METADATA, getWeaknessProfile,
  getDrillSkillRating, getRecentAverage
} from './performanceTelemetry';
import { getCurrentTier, getTierDisplay, TIERS } from './adaptiveDifficulty';
import { registerActivity } from './trainingPlan';

const PLAYLIST_KEY = 'skilldrills_playlists';
const PLAYLIST_PROGRESS_KEY = 'skilldrills_playlist_progress';

export const PRO_PLAYLISTS = {
  'vct-warmup': {
    id: 'vct-warmup',
    name: 'Valorant VCT Warmup',
    game: 'valorant',
    duration: 15,
    icon: '🏆',
    tier: 'gold',
    description: 'Standard pro warmup used by VCT players before matches.',
    blocks: [
      { id: 'micro-flick-burst', duration: 180, label: 'Micro-Flick Activation', mode: 'warmup', targetAccuracy: 70 },
      { id: 'target-switching-swarm', duration: 300, label: 'Target Switch Flow', mode: 'main', targetAccuracy: 65 },
      { id: 'headshot-micro-adjust', duration: 240, label: 'Headshot Precision', mode: 'main', targetAccuracy: 60 },
      { id: 'prefire-corner-clearer', duration: 180, label: 'Peek & Clear', mode: 'cooldown', targetAccuracy: 55 }
    ]
  },
  'cs2-faceit': {
    id: 'cs2-faceit',
    name: 'CS2 Faceit Level 10 Prep',
    game: 'cs2',
    duration: 20,
    icon: '⚔️',
    tier: 'diamond',
    description: 'Routine used by Faceit Level 10 players before ranked.',
    blocks: [
      { id: 'pro-flick', duration: 180, label: 'Flick Activation', mode: 'warmup', targetAccuracy: 75 },
      { id: 'counter-strafe', duration: 240, label: 'Counter-Strafe Sync', mode: 'main', targetAccuracy: 70 },
      { id: 'recoil-control', duration: 300, label: 'Spray Pattern Drill', mode: 'main', targetAccuracy: 60 },
      { id: 'target-switching-swarm', duration: 240, label: 'Multi-Target Clear', mode: 'main', targetAccuracy: 65 },
      { id: 'instant-response', duration: 240, label: 'Reaction Polish', mode: 'cooldown', targetAccuracy: 80 }
    ]
  },
  'apex-predator': {
    id: 'apex-predator',
    name: 'Apex Predator Tracking',
    game: 'apex',
    duration: 18,
    icon: '🦅',
    tier: 'diamond',
    description: 'Heavy tracking focus for Apex movement mechanics.',
    blocks: [
      { id: 'pro-tracking', duration: 240, label: 'Smooth Track Warmup', mode: 'warmup', targetAccuracy: 60 },
      { id: 'strafe-tracking', duration: 300, label: 'AD Strafe Chase', mode: 'main', targetAccuracy: 55 },
      { id: 'vertical-air-pursuit', duration: 240, label: 'Vertical Air Track', mode: 'main', targetAccuracy: 50 },
      { id: 'evasive-slide-track', duration: 180, label: 'Slide Movement Read', mode: 'main', targetAccuracy: 50 },
      { id: 'reactive-sphere-tracking', duration: 120, label: 'Reaction Track', mode: 'cooldown', targetAccuracy: 65 }
    ]
  },
  'daily-weakness': {
    id: 'daily-weakness',
    name: 'Daily Weakness Buster',
    game: 'any',
    duration: 15,
    icon: '🎯',
    tier: 'silver',
    description: 'Auto-generated from your weakest pillar. Changes daily.',
    blocks: [],
    dynamic: true
  },
  'tournament-prep': {
    id: 'tournament-prep',
    name: 'Tournament Day Protocol',
    game: 'any',
    duration: 30,
    icon: '👑',
    tier: 'radiant',
    description: 'Full pre-tournament routine. Warmup → Main → Pressure → Cooldown.',
    blocks: [
      { id: 'pro-flick', duration: 180, label: 'Flick Warmup', mode: 'warmup', targetAccuracy: 80 },
      { id: 'micro-flick-precision', duration: 180, label: 'Precision Grid', mode: 'warmup', targetAccuracy: 75 },
      { id: 'counter-strafe', duration: 300, label: 'Movement Sync', mode: 'main', targetAccuracy: 75 },
      { id: 'target-prioritization', duration: 300, label: 'Threat Assessment', mode: 'main', targetAccuracy: 70 },
      { id: 'recoil-control', duration: 300, label: 'Spray Control', mode: 'main', targetAccuracy: 65 },
      { id: '180-degree-awareness', duration: 180, label: 'Peripheral Scan', mode: 'main', targetAccuracy: 70 },
      { id: 'sound-spatial-reflex', duration: 180, label: 'Audio Reflex', mode: 'pressure', targetAccuracy: 65 },
      { id: 'instant-response', duration: 180, label: 'Cool Down', mode: 'cooldown', targetAccuracy: 85 }
    ]
  }
};

export function buildDynamicWeaknessPlaylist() {
  const profile = getWeaknessProfile();
  const entries = Object.entries(profile)
    .filter(([, p]) => p.drillCount > 0)
    .sort(([, a], [, b]) => a.score - b.score);

  if (entries.length === 0) {
    return [DRILL_METADATA['pro-flick']?.path || '/drills/fps/flick-shot-training'];
  }

  const weakest = entries[0];
  const pillar = SKILL_PILLARS[weakest[0]];
  const blocks = [];

  blocks.push({
    id: pillar.drills[0],
    duration: 180,
    label: `${pillar.label} Activation`,
    mode: 'warmup',
    targetAccuracy: pillar.proThreshold - 10
  });

  const ranked = [...pillar.drills]
    .map(id => ({ id, sr: getDrillSkillRating(id, 3) }))
    .sort((a, b) => a.sr - b.sr);

  for (let i = 0; i < Math.min(3, ranked.length); i++) {
    blocks.push({
      id: ranked[i].id,
      duration: 240,
      label: DRILL_METADATA[ranked[i].id]?.name || ranked[i].id,
      mode: 'main',
      targetAccuracy: pillar.proThreshold - 5
    });
  }

  const strengths = entries.slice(-2);
  if (strengths.length > 0) {
    const strengthPillar = SKILL_PILLARS[strengths[0][0]];
    blocks.push({
      id: strengthPillar.drills[0],
      duration: 180,
      label: `${strengthPillar.label} Confidence`,
      mode: 'cooldown',
      targetAccuracy: strengthPillar.proThreshold
    });
  }

  PRO_PLAYLISTS['daily-weakness'].blocks = blocks;
  return PRO_PLAYLISTS['daily-weakness'];
}

export function getPlaylistById(playlistId) {
  if (playlistId === 'daily-weakness') {
    return buildDynamicWeaknessPlaylist();
  }
  return PRO_PLAYLISTS[playlistId] || null;
}

export function getAllPlaylists() {
  const dynamic = buildDynamicWeaknessPlaylist();
  return { ...PRO_PLAYLISTS, 'daily-weakness': dynamic };
}

export function getPlaylistsForTier(tier) {
  const tierOrder = TIERS[tier]?.order || 1;
  const all = getAllPlaylists();
  return Object.values(all).filter(p => {
    const playlistTierOrder = TIERS[p.tier]?.order || 1;
    return playlistTierOrder <= tierOrder + 1;
  });
}

export function getPlaylistsForGame(game) {
  const all = getAllPlaylists();
  return Object.values(all).filter(p => p.game === game || p.game === 'any');
}

export function getPlaylistProgress() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PLAYLIST_PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
  } catch (e) { return {}; }
}

export function markPlaylistBlockDone(playlistId, blockIndex) {
  if (typeof window === 'undefined') return;
  try {
    const progress = getPlaylistProgress();
    if (!progress[playlistId]) progress[playlistId] = [];
    if (!progress[playlistId].includes(blockIndex)) {
      progress[playlistId].push(blockIndex);
    }
    localStorage.setItem(PLAYLIST_PROGRESS_KEY, JSON.stringify(progress));
    registerActivity();
  } catch (e) {}
}

export function resetPlaylistProgress(playlistId) {
  if (typeof window === 'undefined') return;
  try {
    const progress = getPlaylistProgress();
    delete progress[playlistId];
    localStorage.setItem(PLAYLIST_PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {}
}

export function getPlaylistCompletionPercent(playlistId) {
  const playlist = getPlaylistById(playlistId);
  if (!playlist || !playlist.blocks || playlist.blocks.length === 0) return 0;
  const progress = getPlaylistProgress();
  const done = (progress[playlistId] || []).length;
  return Math.round((done / playlist.blocks.length) * 100);
}

export function getNextPlaylistBlock(playlistId) {
  const playlist = getPlaylistById(playlistId);
  if (!playlist) return null;
  const progress = getPlaylistProgress();
  const done = progress[playlistId] || [];
  for (let i = 0; i < playlist.blocks.length; i++) {
    if (!done.includes(i)) {
      return { block: playlist.blocks[i], index: i, total: playlist.blocks.length, playlist };
    }
  }
  return null;
}