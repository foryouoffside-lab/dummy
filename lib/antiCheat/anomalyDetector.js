// lib/antiCheat/anomalyDetector.js

/**
 * Anomaly Detector - Identifies suspicious patterns in user behavior
 * Uses statistical analysis to detect cheating attempts
 */

class AnomalyDetector {
  constructor() {
    // Configuration thresholds
    this.thresholds = {
      // Score anomalies
      maxScoreImprovement: 50, // Maximum % improvement in single session
      maxScoreVariance: 30, // Maximum standard deviation from average
      
      // Time anomalies
      minReactionTime: 80, // Minimum possible reaction time in ms (humans ~150ms)
      maxReactionTime: 2000, // Maximum plausible reaction time
      
      // Session anomalies
      maxSessionsPerHour: 30, // Maximum drills per hour
      minSessionDuration: 5, // Minimum seconds per drill
      maxSessionDuration: 3600, // Maximum seconds per drill (1 hour)
      
      // Accuracy anomalies
      perfectScoreProbability: 0.01, // Probability threshold for perfect scores
      suspiciousAccuracyThreshold: 98, // Accuracy above this is suspicious
      
      // Pattern anomalies
      suspiciousPatternLength: 5, // Length of suspicious repeating patterns
      patternRepeatThreshold: 3 // Number of times pattern repeats to flag
    };
  }

  /**
   * Detect anomalies in drill session data
   * @param {Object} session - Current drill session
   * @param {Array} userHistory - User's historical session data
   * @returns {Object} Detection result with flags and scores
   */
  detectAnomalies(session, userHistory) {
    const anomalies = {
      isSuspicious: false,
      flags: [],
      confidenceScore: 0,
      reasons: []
    };

    // Check each type of anomaly
    const scoreAnomaly = this.detectScoreAnomaly(session, userHistory);
    const timeAnomaly = this.detectTimeAnomaly(session);
    const reactionAnomaly = this.detectReactionAnomaly(session);
    const frequencyAnomaly = this.detectFrequencyAnomaly(userHistory);
    const accuracyAnomaly = this.detectAccuracyAnomaly(session, userHistory);
    const patternAnomaly = this.detectPatternAnomaly(userHistory);

    // Aggregate results
    const allChecks = [scoreAnomaly, timeAnomaly, reactionAnomaly, frequencyAnomaly, accuracyAnomaly, patternAnomaly];
    
    allChecks.forEach(check => {
      if (check.isSuspicious) {
        anomalies.flags.push(check.flag);
        anomalies.reasons.push(check.reason);
        anomalies.confidenceScore += check.confidence;
      }
    });

    anomalies.isSuspicious = anomalies.flags.length > 0;
    anomalies.confidenceScore = Math.min(100, anomalies.confidenceScore);

    return anomalies;
  }

  /**
   * Detect score-related anomalies (too high, too fast improvement)
   */
  detectScoreAnomaly(session, userHistory) {
    const result = { isSuspicious: false, flag: null, reason: null, confidence: 0 };
    
    if (!userHistory || userHistory.length === 0) return result;

    // Calculate average score from history
    const avgScore = userHistory.reduce((sum, s) => sum + s.score, 0) / userHistory.length;
    const improvement = session.score - avgScore;

    // Check for unrealistic improvement
    if (improvement > this.thresholds.maxScoreImprovement) {
      result.isSuspicious = true;
      result.flag = 'UNREALISTIC_IMPROVEMENT';
      result.reason = `Score improved by ${improvement}% in single session (max allowed: ${this.thresholds.maxScoreImprovement}%)`;
      result.confidence = Math.min(50, improvement / 2);
    }

    // Check for perfect score on difficult drill
    if (session.score === 100 && session.difficulty === 'expert') {
      result.isSuspicious = true;
      result.flag = 'PERFECT_EXPERT_SCORE';
      result.reason = 'Perfect score on expert difficulty without prior practice';
      result.confidence = 30;
    }

    return result;
  }

  /**
   * Detect time-related anomalies (too fast completion)
   */
  detectTimeAnomaly(session) {
    const result = { isSuspicious: false, flag: null, reason: null, confidence: 0 };

    // Check if session duration is too short
    if (session.duration < this.thresholds.minSessionDuration) {
      result.isSuspicious = true;
      result.flag = 'TOO_FAST_COMPLETION';
      result.reason = `Session completed in ${session.duration}s (minimum: ${this.thresholds.minSessionDuration}s)`;
      result.confidence = 40;
    }

    // Check if session duration is too long (possible idle)
    if (session.duration > this.thresholds.maxSessionDuration) {
      result.isSuspicious = true;
      result.flag = 'TOO_LONG_SESSION';
      result.reason = `Session lasted ${Math.floor(session.duration / 60)} minutes`;
      result.confidence = 20;
    }

    return result;
  }

  /**
   * Detect reaction time anomalies
   */
  detectReactionAnomaly(session) {
    const result = { isSuspicious: false, flag: null, reason: null, confidence: 0 };

    if (!session.reactionTime) return result;

    // Check if reaction time is impossibly fast
    if (session.reactionTime < this.thresholds.minReactionTime) {
      result.isSuspicious = true;
      result.flag = 'IMPOSSIBLE_REACTION_TIME';
      result.reason = `Reaction time of ${session.reactionTime}ms is below human limit (${this.thresholds.minReactionTime}ms)`;
      result.confidence = 90;
    }

    // Check for unusually consistent reaction times (bot behavior)
    if (session.reactionTimeVariation && session.reactionTimeVariation < 5) {
      result.isSuspicious = true;
      result.flag = 'PERFECT_CONSISTENCY';
      result.reason = 'Reaction times are unnaturally consistent';
      result.confidence = 60;
    }

    return result;
  }

  /**
   * Detect frequency anomalies (too many sessions)
   */
  detectFrequencyAnomaly(userHistory) {
    const result = { isSuspicious: false, flag: null, reason: null, confidence: 0 };

    if (!userHistory || userHistory.length < 10) return result;

    // Count sessions in last hour
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const recentSessions = userHistory.filter(s => new Date(s.createdAt).getTime() > oneHourAgo);
    
    if (recentSessions.length > this.thresholds.maxSessionsPerHour) {
      result.isSuspicious = true;
      result.flag = 'EXCESSIVE_SESSIONS';
      result.reason = `${recentSessions.length} sessions in the last hour (max: ${this.thresholds.maxSessionsPerHour})`;
      result.confidence = Math.min(50, recentSessions.length * 5);
    }

    return result;
  }

  /**
   * Detect accuracy anomalies
   */
  detectAccuracyAnomaly(session, userHistory) {
    const result = { isSuspicious: false, flag: null, reason: null, confidence: 0 };

    // Check for suspiciously high accuracy
    if (session.accuracy > this.thresholds.suspiciousAccuracyThreshold) {
      result.isSuspicious = true;
      result.flag = 'SUSPICIOUS_ACCURACY';
      result.reason = `Accuracy of ${session.accuracy}% is unusually high`;
      result.confidence = 25;
    }

    // Check for perfect accuracy on all attempts
    if (session.accuracy === 100 && userHistory && userHistory.length > 0) {
      const perfectCount = userHistory.filter(s => s.accuracy === 100).length;
      if (perfectCount > 3) {
        result.isSuspicious = true;
        result.flag = 'MULTIPLE_PERFECT_SCORES';
        result.reason = `${perfectCount + 1} perfect accuracy scores recorded`;
        result.confidence = 40;
      }
    }

    return result;
  }

  /**
   * Detect pattern anomalies (repeating sequences indicating bot)
   */
  detectPatternAnomaly(userHistory) {
    const result = { isSuspicious: false, flag: null, reason: null, confidence: 0 };

    if (!userHistory || userHistory.length < this.thresholds.suspiciousPatternLength * 2) return result;

    // Extract score pattern
    const scorePattern = userHistory.slice(-this.thresholds.suspiciousPatternLength).map(s => s.score);
    
    // Check for repeating pattern
    let repeats = 0;
    for (let i = 0; i < userHistory.length - this.thresholds.suspiciousPatternLength; i++) {
      const pattern = userHistory.slice(i, i + this.thresholds.suspiciousPatternLength).map(s => s.score);
      if (JSON.stringify(pattern) === JSON.stringify(scorePattern)) {
        repeats++;
      }
    }

    if (repeats >= this.thresholds.patternRepeatThreshold) {
      result.isSuspicious = true;
      result.flag = 'REPEATING_PATTERN';
      result.reason = `Score pattern repeated ${repeats} times, indicating possible automation`;
      result.confidence = 70;
    }

    return result;
  }

  /**
   * Calculate statistical anomaly score using Z-score
   * @param {number} value - Current value
   * @param {Array} historicalValues - Historical data
   * @returns {number} Z-score indicating how many std deviations from mean
   */
  calculateZScore(value, historicalValues) {
    if (historicalValues.length === 0) return 0;
    
    const mean = historicalValues.reduce((a, b) => a + b, 0) / historicalValues.length;
    const variance = historicalValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / historicalValues.length;
    const stdDev = Math.sqrt(variance);
    
    if (stdDev === 0) return 0;
    return Math.abs((value - mean) / stdDev);
  }

  /**
   * Get overall risk assessment
   * @param {Object} anomalies - Detection results
   * @returns {Object} Risk assessment with action recommendations
   */
  assessRisk(anomalies) {
    const confidence = anomalies.confidenceScore;
    
    if (confidence >= 80) {
      return {
        level: 'CRITICAL',
        action: 'FLAG_USER',
        message: 'Highly suspicious activity detected. Immediate review required.',
        shouldBlock: true
      };
    } else if (confidence >= 50) {
      return {
        level: 'HIGH',
        action: 'REVIEW_SESSION',
        message: 'Suspicious pattern detected. Session marked for review.',
        shouldBlock: false
      };
    } else if (confidence >= 25) {
      return {
        level: 'MEDIUM',
        action: 'LOG_WARNING',
        message: 'Unusual activity detected. Monitoring increased.',
        shouldBlock: false
      };
    } else {
      return {
        level: 'LOW',
        action: 'ALLOW',
        message: 'No suspicious activity detected.',
        shouldBlock: false
      };
    }
  }
}

export default new AnomalyDetector();