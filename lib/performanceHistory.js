// lib/performanceHistory.js
// Client-side performance tracking using localStorage

const STORAGE_KEY = 'skilldrills_performance_history';
const MAX_RECORDS_PER_DRILL = 50;

/**
 * Save a performance record to localStorage
 * @param {string} drillId - Unique drill identifier
 * @param {Object} data - Performance data { score, accuracy, wpm, time, difficulty, ... }
 */
export function savePerformanceRecord(drillId, data) {
  try {
    const history = loadAllHistory();
    const record = {
      id: `${drillId}_${Date.now()}`,
      drillId,
      timestamp: new Date().toISOString(),
      ...data,
    };

    if (!history[drillId]) {
      history[drillId] = [];
    }

    history[drillId].unshift(record);

    // Limit records per drill
    if (history[drillId].length > MAX_RECORDS_PER_DRILL) {
      history[drillId] = history[drillId].slice(0, MAX_RECORDS_PER_DRILL);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return record;
  } catch (error) {
    console.error('Failed to save performance record:', error);
    return null;
  }
}

/**
 * Load performance history for a specific drill
 * @param {string} drillId - Unique drill identifier
 * @returns {Array} Array of performance records
 */
export function loadDrillHistory(drillId) {
  try {
    const history = loadAllHistory();
    return history[drillId] || [];
  } catch {
    return [];
  }
}

/**
 * Load all performance history
 * @returns {Object} All drill records keyed by drillId
 */
export function loadAllHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/**
 * Get best score for a drill
 * @param {string} drillId - Unique drill identifier
 * @param {string} metric - Metric to find best (default: 'score')
 * @returns {Object|null} Best record or null
 */
export function getBestRecord(drillId, metric = 'score') {
  const records = loadDrillHistory(drillId);
  if (records.length === 0) return null;

  return records.reduce((best, current) =>
    (current[metric] || 0) > (best[metric] || 0) ? current : best
  );
}

/**
 * Get improvement trend (last 5 vs previous 5)
 * @param {string} drillId - Unique drill identifier
 * @param {string} metric - Metric to analyze
 * @returns {Object} Trend data
 */
export function getTrend(drillId, metric = 'score') {
  const records = loadDrillHistory(drillId);
  if (records.length < 3) return { direction: 'neutral', percentage: 0, message: 'More data needed' };

  const recent = records.slice(0, Math.min(5, Math.floor(records.length / 2)));
  const previous = records.slice(Math.min(5, Math.floor(records.length / 2)), Math.min(10, records.length));

  const recentAvg = recent.reduce((sum, r) => sum + (r[metric] || 0), 0) / recent.length;
  const previousAvg = previous.reduce((sum, r) => sum + (r[metric] || 0), 0) / previous.length;

  const diff = recentAvg - previousAvg;
  const percentage = previousAvg > 0 ? Math.round((diff / previousAvg) * 100) : 0;

  return {
    direction: diff > 5 ? 'up' : diff < -5 ? 'down' : 'neutral',
    percentage: Math.abs(percentage),
    message: diff > 5
      ? `Improving! +${Math.abs(percentage)}%`
      : diff < -5
        ? `Declining ${Math.abs(percentage)}%`
        : 'Steady',
    recentAvg: Math.round(recentAvg),
    previousAvg: Math.round(previousAvg),
  };
}

/**
 * Clear all performance history
 */
export function clearAllHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}

/**
 * Export performance history as JSON
 * @returns {string} JSON string
 */
export function exportHistory() {
  const history = loadAllHistory();
  return JSON.stringify(history, null, 2);
}

/**
 * Get total sessions count across all drills
 * @returns {number} Total sessions
 */
export function getTotalSessions() {
  const history = loadAllHistory();
  return Object.values(history).reduce((total, records) => total + records.length, 0);
}

/**
 * Get drills practiced count
 * @returns {number} Unique drills count
 */
export function getDrillsPracticedCount() {
  const history = loadAllHistory();
  return Object.keys(history).length;
}