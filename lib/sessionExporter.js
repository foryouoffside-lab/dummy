'use client';

import {
  getDrillHistory, getAllDrillHistories, getWeaknessProfile,
  SKILL_PILLARS, DRILL_METADATA, getRecentAverage
} from './performanceTelemetry';
import { getCurrentTier, getSkillRating, getAllDrillTiers } from './adaptiveDifficulty';
import { getPercentileRank, getOverallRating } from './benchmarkEngine';
import { getStreak, buildDailyPlan } from './trainingPlan';

export function exportSessionAsJSON(drillId) {
  const history = getDrillHistory(drillId);
  if (history.length === 0) return null;

  const exportData = {
    exportDate: new Date().toISOString(),
    drillId,
    drillName: DRILL_METADATA[drillId]?.name || drillId,
    tier: getCurrentTier(drillId),
    skillRating: getSkillRating(drillId),
    percentile: getPercentileRank(drillId),
    recentAverage: getRecentAverage(drillId, 5),
    sessions: history.map(s => ({
      timestamp: new Date(s.timestamp).toISOString(),
      score: s.score,
      accuracy: s.accuracy,
      reactionTimeMs: s.reactionTimeMs,
      trackingAccuracy: s.trackingAccuracy,
      comboMax: s.comboMax,
      consistency: s.consistency,
      ttkMs: s.ttkMs,
      sensitivity: s.sensitivity,
      dpi: s.dpi,
      gameType: s.gameType,
      duration: s.duration
    }))
  };

  return exportData;
}

export function exportFullProfile() {
  const allHistory = getAllDrillHistories();
  const tiers = getAllDrillTiers();
  const weakness = getWeaknessProfile();
  const overall = getOverallRating();
  const streak = getStreak();
  const dailyPlan = buildDailyPlan();

  const profile = {
    exportDate: new Date().toISOString(),
    overall: {
      percentile: overall.rating,
      skillRating: overall.skillRating,
      tier: overall.label,
      drillsAnalyzed: overall.drillsAnalyzed,
      totalSessions: overall.totalSessions,
      streak: streak.count
    },
    pillars: Object.entries(SKILL_PILLARS).map(([key, pillar]) => ({
      pillar: key,
      label: pillar.label,
      score: weakness[key]?.score || 0,
      proThreshold: pillar.proThreshold,
      drills: pillar.drills.map(drillId => ({
        drillId,
        name: DRILL_METADATA[drillId]?.name || drillId,
        tier: tiers[drillId]?.tier || 'silver',
        skillRating: tiers[drillId]?.skillRating || 0,
        sessions: (allHistory[drillId] || []).length,
        recentAvg: getRecentAverage(drillId, 3),
        percentile: getPercentileRank(drillId).percentile
      }))
    })),
    dailyPlan: dailyPlan ? {
      focus: dailyPlan.focus,
      focusLabel: dailyPlan.focusLabel,
      blocks: dailyPlan.blocks.map(b => ({
        label: b.label || b.focusLabel,
        drills: b.drills.map(d => d.name)
      }))
    } : null
  };

  return profile;
}

export function downloadJSON(data, filename) {
  if (typeof window === 'undefined') return;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadCSV(data, filename) {
  if (typeof window === 'undefined') return;
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map(h => {
      const val = row[h];
      if (val === null || val === undefined) return '';
      if (typeof val === 'string' && val.includes(',')) return `"${val}"`;
      return String(val);
    });
    csvRows.push(values.join(','));
  }

  const csv = csvRows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportSessionCSV(drillId) {
  const history = getDrillHistory(drillId);
  if (history.length === 0) return;

  const rows = history.map(s => ({
    date: new Date(s.timestamp).toISOString().split('T')[0],
    score: s.score,
    accuracy: s.accuracy || '',
    reactionTimeMs: s.reactionTimeMs || '',
    trackingAccuracy: s.trackingAccuracy || '',
    comboMax: s.comboMax || '',
    consistency: s.consistency || '',
    ttkMs: s.ttkMs || '',
    sensitivity: s.sensitivity || '',
    dpi: s.dpi || '',
    gameType: s.gameType || '',
    duration: s.duration || 60
  }));

  const drillName = DRILL_METADATA[drillId]?.name || drillId;
  downloadCSV(rows, `${drillName.replace(/\s+/g, '_')}_sessions.csv`);
}

export function exportFullProfileJSON() {
  const profile = exportFullProfile();
  if (profile) {
    downloadJSON(profile, `skilldrills_profile_${new Date().toISOString().split('T')[0]}.json`);
  }
}

export function shareProfileText() {
  const overall = getOverallRating();
  const weakness = Object.entries(getWeaknessProfile())
    .sort(([, a], [, b]) => a.score - b.score);

  let text = `SkillDrills Profile\n`;
  text += `Overall: ${overall.label} (Top ${100 - overall.rating}%)\n`;
  text += `Skill Rating: ${overall.skillRating}/1000\n`;
  text += `Sessions: ${overall.totalSessions}\n\n`;
  text += `Strongest: ${weakness[weakness.length - 1]?.[1]?.label || 'N/A'}\n`;
  text += `Weakest: ${weakness[0]?.[1]?.label || 'N/A'}\n\n`;
  text += `Train free at skilldrills.online/drills/fps`;

  return text;
}

export function copyToClipboard(text) {
  if (typeof window === 'undefined' || !navigator.clipboard) return;
  navigator.clipboard.writeText(text).catch(() => {});
}