// lib/antiCheat/scoreValidator.js

/**
 * Score Validator - Validates drill scores for legitimacy
 * Prevents score manipulation and cheating
 */

class ScoreValidator {
  constructor() {
    // Validation thresholds
    this.thresholds = {
      maxScore: 100,
      minScore: 0,
      maxScorePerSecond: 10, // Maximum score increase per second
      maxConsecutivePerfect: 3, // Max perfect scores in a row before flagging
      minTimePerPoint: 0.5, // Minimum seconds per point earned
      scoreDeviationLimit: 3 // Standard deviations allowed from historical average
    };
  }

  /**
   * Validate a drill session score
   * @param {Object} session - Current session data
   * @param {Array} userHistory - User's historical sessions
   * @returns {Object} Validation result
   */
  validateScore(session, userHistory = []) {
    const validation = {
      isValid: true,
      isFlagged: false,
      adjustments: [],
      warnings: [],
      finalScore: session.score,
      confidence: 100
    };

    // Run all validation checks
    this.checkScoreRange(session, validation);
    this.checkScoreVelocity(session, validation);
    this.checkTimeToScoreRatio(session, validation);
    this.checkPerfectScoreFrequency(session, userHistory, validation);
    this.checkStatisticalDeviation(session, userHistory, validation);
    this.checkScoreProgression(session, userHistory, validation);

    // Apply adjustments if needed
    if (validation.adjustments.length > 0) {
      let adjustedScore = session.score;
      for (const adj of validation.adjustments) {
        adjustedScore = Math.max(this.thresholds.minScore, Math.min(this.thresholds.maxScore, adjustedScore + adj.value));
      }
      validation.finalScore = Math.round(adjustedScore);
      validation.isValid = validation.finalScore === session.score;
    }

    // Determine if session should be flagged
    validation.isFlagged = validation.warnings.length >= 2 || validation.confidence < 50;
    
    return validation;
  }

  /**
   * Check if score is within valid range
   */
  checkScoreRange(session, validation) {
    if (session.score < this.thresholds.minScore || session.score > this.thresholds.maxScore) {
      validation.warnings.push(`Score ${session.score} is outside valid range (${this.thresholds.minScore}-${this.thresholds.maxScore})`);
      validation.confidence -= 30;
      
      // Adjust to nearest valid value
      const adjustedScore = Math.max(this.thresholds.minScore, Math.min(this.thresholds.maxScore, session.score));
      if (adjustedScore !== session.score) {
        validation.adjustments.push({ 
          type: 'RANGE_ADJUSTMENT', 
          value: adjustedScore - session.score,
          reason: 'Score outside valid range'
        });
      }
    }
  }

  /**
   * Check score velocity (how fast score increased)
   */
  checkScoreVelocity(session, validation) {
    if (session.duration && session.duration > 0) {
      const scorePerSecond = session.score / session.duration;
      
      if (scorePerSecond > this.thresholds.maxScorePerSecond) {
        validation.warnings.push(`Score velocity too high: ${scorePerSecond.toFixed(2)} points/second`);
        validation.confidence -= 20;
        
        // Cap score based on time
        const maxAllowedScore = session.duration * this.thresholds.maxScorePerSecond;
        if (session.score > maxAllowedScore) {
          validation.adjustments.push({
            type: 'VELOCITY_ADJUSTMENT',
            value: maxAllowedScore - session.score,
            reason: 'Score velocity exceeds maximum'
          });
        }
      }
    }
  }

  /**
   * Check time to score ratio
   */
  checkTimeToScoreRatio(session, validation) {
    if (session.duration && session.duration > 0 && session.score > 0) {
      const timePerPoint = session.duration / session.score;
      
      if (timePerPoint < this.thresholds.minTimePerPoint) {
        validation.warnings.push(`Time per point too low: ${timePerPoint.toFixed(2)} seconds/point`);
        validation.confidence -= 15;
        
        // Adjust score based on minimum time requirement
        const maxScoreByTime = Math.floor(session.duration / this.thresholds.minTimePerPoint);
        if (session.score > maxScoreByTime) {
          validation.adjustments.push({
            type: 'TIME_ADJUSTMENT',
            value: maxScoreByTime - session.score,
            reason: 'Insufficient time to achieve score'
          });
        }
      }
    }
  }

  /**
   * Check frequency of perfect scores
   */
  checkPerfectScoreFrequency(session, userHistory, validation) {
    if (session.score === 100) {
      const recentPerfectScores = userHistory.filter(s => s.score === 100).slice(-this.thresholds.maxConsecutivePerfect);
      
      if (recentPerfectScores.length >= this.thresholds.maxConsecutivePerfect) {
        validation.warnings.push(`Multiple perfect scores in a row (${recentPerfectScores.length + 1})`);
        validation.confidence -= 25;
      }
    }
  }

  /**
   * Check statistical deviation from historical performance
   */
  checkStatisticalDeviation(session, userHistory, validation) {
    if (userHistory.length < 5) return;
    
    const scores = userHistory.map(s => s.score);
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);
    
    if (stdDev > 0) {
      const deviation = Math.abs(session.score - mean) / stdDev;
      
      if (deviation > this.thresholds.scoreDeviationLimit) {
        validation.warnings.push(`Score deviates ${deviation.toFixed(1)} standard deviations from average`);
        validation.confidence -= 20;
        
        // Cap score to reasonable range
        const maxReasonableScore = Math.min(this.thresholds.maxScore, mean + (this.thresholds.scoreDeviationLimit * stdDev));
        if (session.score > maxReasonableScore) {
          validation.adjustments.push({
            type: 'STATISTICAL_ADJUSTMENT',
            value: maxReasonableScore - session.score,
            reason: 'Score exceeds statistical boundaries'
          });
        }
      }
    }
  }

  /**
   * Check score progression (should be gradual, not instant)
   */
  checkScoreProgression(session, userHistory, validation) {
    if (userHistory.length === 0) return;
    
    const lastScore = userHistory[userHistory.length - 1]?.score || 0;
    const increase = session.score - lastScore;
    
    // Check for unrealistic jump
    if (increase > 30 && session.difficulty !== 'beginner') {
      validation.warnings.push(`Unrealistic score jump: +${increase} points from last session`);
      validation.confidence -= 15;
      
      // Gradually increase score instead of jump
      const maxIncrease = 30;
      if (increase > maxIncrease) {
        validation.adjustments.push({
          type: 'PROGRESSION_ADJUSTMENT',
          value: maxIncrease - increase,
          reason: 'Score progression too rapid'
        });
      }
    }
  }

  /**
   * Validate multiple sessions together (batch validation)
   * @param {Array} sessions - Array of sessions to validate
   * @returns {Object} Batch validation results
   */
  validateBatch(sessions) {
    const results = [];
    let totalConfidence = 0;
    let flaggedCount = 0;
    
    for (let i = 0; i < sessions.length; i++) {
      const previousSessions = sessions.slice(0, i);
      const result = this.validateScore(sessions[i], previousSessions);
      results.push(result);
      totalConfidence += result.confidence;
      if (result.isFlagged) flaggedCount++;
    }
    
    return {
      results,
      summary: {
        totalSessions: sessions.length,
        flaggedSessions: flaggedCount,
        averageConfidence: totalConfidence / sessions.length,
        isValid: flaggedCount === 0
      }
    };
  }

  /**
   * Generate validation report
   * @param {Object} validation - Validation result
   * @returns {Object} Detailed report
   */
  generateReport(validation) {
    return {
      timestamp: new Date().toISOString(),
      isValid: validation.isValid,
      isFlagged: validation.isFlagged,
      originalScore: validation.finalScore !== validation.originalScore ? validation.originalScore : null,
      adjustedScore: validation.finalScore !== validation.originalScore ? validation.finalScore : null,
      confidence: validation.confidence,
      warnings: validation.warnings,
      adjustments: validation.adjustments,
      recommendation: this.getRecommendation(validation)
    };
  }

  /**
   * Get recommendation based on validation
   */
  getRecommendation(validation) {
    if (validation.confidence >= 90) {
      return 'ACCEPT';
    } else if (validation.confidence >= 70) {
      return 'ACCEPT_WITH_REVIEW';
    } else if (validation.confidence >= 50) {
      return 'FLAG_FOR_REVIEW';
    } else {
      return 'REJECT';
    }
  }
}

export default new ScoreValidator();