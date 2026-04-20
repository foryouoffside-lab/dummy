// lib/antiCheat/behaviorMonitor.js

/**
 * Behavior Monitor - Tracks user behavior patterns over time
 * Identifies bot-like behavior and automation
 */

class BehaviorMonitor {
  constructor() {
    this.userSessions = new Map(); // Store recent sessions per user
    this.behaviorProfiles = new Map(); // Store behavior profiles
    this.suspiciousUsers = new Set(); // Track flagged users
    
    // Configuration
    this.config = {
      sessionRetention: 100, // Keep last N sessions per user
      analysisWindow: 24 * 60 * 60 * 1000, // 24 hours in ms
      clickVarianceThreshold: 0.1, // 10% variance threshold
      timingPrecisionThreshold: 5, // 5ms precision threshold for bot detection
      mouseMovementThreshold: 0.95 // 95% straight line movement threshold
    };
  }

  /**
   * Track user session data
   * @param {string} userId - User identifier
   * @param {Object} sessionData - Session data including timing, clicks, movements
   */
  trackSession(userId, sessionData) {
    // Initialize user sessions array if not exists
    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, []);
    }
    
    const sessions = this.userSessions.get(userId);
    sessions.push({
      ...sessionData,
      timestamp: Date.now()
    });
    
    // Keep only recent sessions
    while (sessions.length > this.config.sessionRetention) {
      sessions.shift();
    }
    
    // Update behavior profile
    this.updateBehaviorProfile(userId, sessionData);
    
    // Check for suspicious patterns
    this.analyzeBehavior(userId);
  }

  /**
   * Update user's behavior profile
   */
  updateBehaviorProfile(userId, sessionData) {
    let profile = this.behaviorProfiles.get(userId);
    
    if (!profile) {
      profile = {
        avgClickTiming: [],
        reactionTimes: [],
        accuracyHistory: [],
        sessionDurations: [],
        mouseMovements: [],
        keystrokeTimings: [],
        lastUpdated: Date.now()
      };
      this.behaviorProfiles.set(userId, profile);
    }
    
    // Update metrics
    if (sessionData.clickTiming) profile.avgClickTiming.push(sessionData.clickTiming);
    if (sessionData.reactionTime) profile.reactionTimes.push(sessionData.reactionTime);
    if (sessionData.accuracy) profile.accuracyHistory.push(sessionData.accuracy);
    if (sessionData.duration) profile.sessionDurations.push(sessionData.duration);
    if (sessionData.mouseMovements) profile.mouseMovements.push(sessionData.mouseMovements);
    if (sessionData.keystrokeTimings) profile.keystrokeTimings.push(sessionData.keystrokeTimings);
    
    // Keep only recent data (last 100 entries)
    const maxEntries = 100;
    ['avgClickTiming', 'reactionTimes', 'accuracyHistory', 'sessionDurations', 'mouseMovements', 'keystrokeTimings'].forEach(key => {
      if (profile[key].length > maxEntries) {
        profile[key] = profile[key].slice(-maxEntries);
      }
    });
    
    profile.lastUpdated = Date.now();
  }

  /**
   * Analyze user behavior for suspicious patterns
   */
  analyzeBehavior(userId) {
    const profile = this.behaviorProfiles.get(userId);
    if (!profile || profile.reactionTimes.length < 10) return;
    
    const flags = [];
    
    // Check for bot-like timing precision
    if (this.hasBotLikeTiming(profile)) {
      flags.push('BOT_LIKE_TIMING');
    }
    
    // Check for inhuman reaction times
    if (this.hasInhumanReactionTime(profile)) {
      flags.push('INHUMAN_REACTION_TIME');
    }
    
    // Check for perfect consistency
    if (this.hasPerfectConsistency(profile)) {
      flags.push('PERFECT_CONSISTENCY');
    }
    
    // Check for automated mouse movements
    if (this.hasAutomatedMouseMovements(profile)) {
      flags.push('AUTOMATED_MOUSE');
    }
    
    // Check for rapid session completion
    if (this.hasRapidSessionCompletion(profile)) {
      flags.push('RAPID_COMPLETION');
    }
    
    // If suspicious, add to flagged set
    if (flags.length > 0) {
      this.suspiciousUsers.add(userId);
    }
    
    return flags;
  }

  /**
   * Check for bot-like timing precision (too perfect)
   */
  hasBotLikeTiming(profile) {
    if (profile.reactionTimes.length < 10) return false;
    
    // Calculate variance in reaction times
    const mean = profile.reactionTimes.reduce((a, b) => a + b, 0) / profile.reactionTimes.length;
    const variance = profile.reactionTimes.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / profile.reactionTimes.length;
    const stdDev = Math.sqrt(variance);
    const cv = stdDev / mean; // Coefficient of variation
    
    // Bots typically have very low variance (< 5%)
    return cv < 0.05;
  }

  /**
   * Check for inhuman reaction times
   */
  hasInhumanReactionTime(profile) {
    const minReaction = Math.min(...profile.reactionTimes);
    return minReaction < 80; // Below 80ms is impossible for humans
  }

  /**
   * Check for perfect consistency (bot behavior)
   */
  hasPerfectConsistency(profile) {
    if (profile.accuracyHistory.length < 10) return false;
    
    // Check if accuracy is always perfect
    const allPerfect = profile.accuracyHistory.every(acc => acc === 100);
    if (allPerfect) return true;
    
    // Check if scores have no variation
    const uniqueScores = new Set(profile.accuracyHistory);
    return uniqueScores.size === 1 && uniqueScores.has(100);
  }

  /**
   * Check for automated mouse movements (too straight)
   */
  hasAutomatedMouseMovements(profile) {
    if (profile.mouseMovements.length === 0) return false;
    
    // Calculate average straightness
    let totalStraightness = 0;
    for (const movement of profile.mouseMovements) {
      if (movement.straightness > this.config.mouseMovementThreshold) {
        totalStraightness++;
      }
    }
    
    const straightnessRatio = totalStraightness / profile.mouseMovements.length;
    return straightnessRatio > 0.8; // 80% of movements are unnaturally straight
  }

  /**
   * Check for rapid session completion
   */
  hasRapidSessionCompletion(profile) {
    if (profile.sessionDurations.length < 10) return false;
    
    const avgDuration = profile.sessionDurations.reduce((a, b) => a + b, 0) / profile.sessionDurations.length;
    return avgDuration < 30; // Average session under 30 seconds
  }

  /**
   * Get user risk score
   * @param {string} userId - User identifier
   * @returns {Object} Risk assessment
   */
  getUserRiskScore(userId) {
    const isSuspicious = this.suspiciousUsers.has(userId);
    const profile = this.behaviorProfiles.get(userId);
    
    if (!profile) {
      return { riskLevel: 'LOW', score: 0, isSuspicious: false };
    }
    
    let riskScore = 0;
    
    // Calculate risk based on various factors
    if (this.hasBotLikeTiming(profile)) riskScore += 30;
    if (this.hasInhumanReactionTime(profile)) riskScore += 40;
    if (this.hasPerfectConsistency(profile)) riskScore += 25;
    if (this.hasAutomatedMouseMovements(profile)) riskScore += 20;
    if (this.hasRapidSessionCompletion(profile)) riskScore += 15;
    
    riskScore = Math.min(100, riskScore);
    
    let riskLevel = 'LOW';
    if (riskScore >= 70) riskLevel = 'CRITICAL';
    else if (riskScore >= 50) riskLevel = 'HIGH';
    else if (riskScore >= 25) riskLevel = 'MEDIUM';
    
    return {
      riskLevel,
      score: riskScore,
      isSuspicious,
      factors: {
        botTiming: this.hasBotLikeTiming(profile),
        inhumanReaction: this.hasInhumanReactionTime(profile),
        perfectConsistency: this.hasPerfectConsistency(profile),
        automatedMouse: this.hasAutomatedMouseMovements(profile),
        rapidCompletion: this.hasRapidSessionCompletion(profile)
      }
    };
  }

  /**
   * Log user behavior for auditing
   * @param {string} userId - User identifier
   * @param {string} action - Action performed
   * @param {Object} details - Additional details
   */
  logBehavior(userId, action, details = {}) {
    const logEntry = {
      userId,
      action,
      details,
      timestamp: Date.now(),
      riskScore: this.getUserRiskScore(userId).score
    };
    
    // In production, save to database
    console.log(`[BEHAVIOR_LOG] ${userId}: ${action}`, logEntry);
    
    return logEntry;
  }

  /**
   * Clear user data (for testing or user deletion)
   */
  clearUserData(userId) {
    this.userSessions.delete(userId);
    this.behaviorProfiles.delete(userId);
    this.suspiciousUsers.delete(userId);
  }
}

export default new BehaviorMonitor();