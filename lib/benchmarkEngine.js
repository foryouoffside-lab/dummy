'use client';

import {
  SKILL_PILLARS, DRILL_METADATA, getDrillHistory,
  getDrillSkillRating, getRecentAverage, getConsistencyScore
} from './performanceTelemetry';
import { getCurrentTier, TIERS, getSkillRating } from './adaptiveDifficulty';

const BENCHMARK_KEY = 'skilldrills_benchmarks';

const PRO_BENCHMARKS = {
  'pro-flick': {
    radiant: { accuracy: 92, reactionMs: 165, score: 95, consistency: 25 },
    diamond: { accuracy: 85, reactionMs: 195, score: 80, consistency: 35 },
    gold: { accuracy: 75, reactionMs: 240, score: 60, consistency: 45 },
    silver: { accuracy: 60, reactionMs: 320, score: 40, consistency: 60 },
    bronze: { accuracy: 40, reactionMs: 450, score: 20, consistency: 80 }
  },
  'micro-flick-burst': {
    radiant: { accuracy: 90, reactionMs: 155, score: 90, consistency: 22 },
    diamond: { accuracy: 82, reactionMs: 185, score: 75, consistency: 32 },
    gold: { accuracy: 70, reactionMs: 230, score: 55, consistency: 42 },
    silver: { accuracy: 55, reactionMs: 310, score: 35, consistency: 58 },
    bronze: { accuracy: 35, reactionMs: 440, score: 18, consistency: 78 }
  },
  'pro-tracking': {
    radiant: { trackingAccuracy: 88, score: 92, consistency: 30 },
    diamond: { trackingAccuracy: 78, score: 78, consistency: 40 },
    gold: { trackingAccuracy: 65, score: 58, consistency: 50 },
    silver: { trackingAccuracy: 48, score: 38, consistency: 65 },
    bronze: { trackingAccuracy: 30, score: 18, consistency: 85 }
  },
  'recoil-control': {
    radiant: { accuracy: 88, score: 28, consistency: 20 },
    diamond: { accuracy: 78, score: 24, consistency: 28 },
    gold: { accuracy: 65, score: 18, consistency: 38 },
    silver: { accuracy: 48, score: 12, consistency: 52 },
    bronze: { accuracy: 28, score: 6, consistency: 70 }
  }
};

const DEFAULT_BENCHMARKS = {
  radiant: { accuracy: 90, reactionMs: 170, score: 90, trackingAccuracy: 85, consistency: 25 },
  diamond: { accuracy: 80, reactionMs: 200, score: 75, trackingAccuracy: 75, consistency: 35 },
  gold: { accuracy: 68, reactionMs: 250, score: 55, trackingAccuracy: 62, consistency: 48 },
  silver: { accuracy: 50, reactionMs: 330, score: 35, trackingAccuracy: 45, consistency: 62 },
  bronze: { accuracy: 32, reactionMs: 460, score: 18, trackingAccuracy: 28, consistency: 80 }
};

export function getBenchmarks(drillId) {
  return PRO_BENCHMARKS[drillId] || DEFAULT_BENCHMARKS;
}

export function getPercentileRank(drillId) {
  const recent = getRecentAverage(drillId, 5);
  if (recent.sessions === 0) return { rank: 'Unranked', percentile: 0, nextMilestone: null };

  const benchmarks = getBenchmarks(drillId);
  const pillarKey = Object.keys(SKILL_PILLARS).find(k =>
    SKILL_PILLARS[k].drills.includes(drillId)
  ) || 'flickPrecision';
  const pillar = SKILL_PILLARS[pillarKey];

  const primaryMetric = pillar.primaryMetric;
  const userValue = recent[primaryMetric] || recent.accuracy || recent.score || 0;

  let bestTier = 'bronze';
  let bestPercentile = 0;

  const tiers = ['bronze', 'silver', 'gold', 'diamond', 'radiant'];
  for (const tier of tiers) {
    const benchmark = benchmarks[tier];
    const benchValue = benchmark[primaryMetric] || benchmark.accuracy || benchmark.score || 0;

    if (userValue >= benchValue) {
      bestTier = tier;
      const tierIndex = tiers.indexOf(tier);
      const nextBenchmark = tierIndex < tiers.length - 1 ? benchmarks[tiers[tierIndex + 1]] : null;
      const nextValue = nextBenchmark ? (nextBenchmark[primaryMetric] || nextBenchmark.accuracy || nextBenchmark.score || 100) : 100;
      const prevValue = tierIndex > 0 ? (benchmarks[tiers[tierIndex - 1]][primaryMetric] || benchmarks[tiers[tierIndex - 1]].accuracy || 0) : 0;

      const range = nextValue - benchValue;
      const progress = range > 0 ? (userValue - benchValue) / range : 1;
      bestPercentile = Math.round((tierIndex * 20) + progress * 20);
    }
  }

  return {
    rank: bestTier.charAt(0).toUpperCase() + bestTier.slice(1),
    percentile: Math.min(99, bestPercentile),
    nextMilestone: getNextMilestone(drillId, userValue, primaryMetric)
  };
}

function getNextMilestone(drillId, userValue, metric) {
  const benchmarks = getBenchmarks(drillId);
  const tiers = ['bronze', 'silver', 'gold', 'diamond', 'radiant'];

  for (const tier of tiers) {
    const benchValue = benchmarks[tier][metric] || benchmarks[tier].accuracy || 0;
    if (userValue < benchValue) {
      return {
        tier,
        targetValue: benchValue,
        remaining: Math.round(benchValue - userValue),
        label: `${benchValue} ${metric === 'trackingAccuracy' ? '% tracking' : metric === 'reactionMs' ? 'ms' : '%'}`
      };
    }
  }
  return null;
}

export function compareWithPro(drillId, proName) {
  const PRO_STATS = {
    'TenZ': { accuracy: 94, reactionMs: 158, score: 97 },
    's1mple': { accuracy: 93, reactionMs: 162, score: 96 },
    'NiKo': { accuracy: 91, reactionMs: 168, score: 93 },
    'Aspas': { accuracy: 93, reactionMs: 155, score: 96 },
    'Demon1': { accuracy: 92, reactionMs: 160, score: 95 }
  };

  const recent = getRecentAverage(drillId, 3);
  const proStats = PRO_STATS[proName];
  if (!proStats || recent.sessions === 0) return null;

  return {
    proName,
    yourAccuracy: recent.accuracy,
    proAccuracy: proStats.accuracy,
    yourReaction: recent.reactionTimeMs,
    proReaction: proStats.reactionMs,
    yourScore: recent.score,
    proScore: proStats.score,
    gapAccuracy: Math.round(proStats.accuracy - recent.accuracy),
    gapReaction: Math.round(recent.reactionTimeMs - proStats.reactionMs),
    gapScore: Math.round(proStats.score - recent.score)
  };
}

export function getSkillBreakdown() {
  const breakdown = {};
  Object.entries(DRILL_METADATA).forEach(([drillId, meta]) => {
    const percentile = getPercentileRank(drillId);
    const history = getDrillHistory(drillId, 10);
    const tier = getCurrentTier(drillId);
    const sr = getSkillRating(drillId);

    breakdown[drillId] = {
      name: meta.name,
      path: meta.path,
      tier,
      tierDisplay: TIERS[tier]?.label || 'Silver',
      skillRating: sr,
      percentile: percentile.percentile,
      rank: percentile.rank,
      sessions: history.length,
      recentAvg: getRecentAverage(drillId, 5),
      consistency: getConsistencyScore(drillId, 5),
      nextMilestone: percentile.nextMilestone
    };
  });
  return breakdown;
}

export function getOverallRating() {
  const breakdown = getSkillBreakdown();
  const values = Object.values(breakdown).filter(b => b.sessions > 0);

  if (values.length === 0) return { rating: 0, label: 'Unranked', tier: 'bronze' };

  const avgPercentile = values.reduce((sum, b) => sum + b.percentile, 0) / values.length;
  const avgSR = values.reduce((sum, b) => sum + b.skillRating, 0) / values.length;

  let tier = 'bronze';
  if (avgPercentile >= 90) tier = 'radiant';
  else if (avgPercentile >= 75) tier = 'diamond';
  else if (avgPercentile >= 55) tier = 'gold';
  else if (avgPercentile >= 30) tier = 'silver';

  return {
    rating: Math.round(avgPercentile),
    skillRating: Math.round(avgSR),
    label: TIERS[tier]?.label || 'Silver',
    tier,
    drillsAnalyzed: values.length,
    totalSessions: values.reduce((sum, b) => sum + b.sessions, 0)
  };
}