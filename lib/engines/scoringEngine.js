// lib/engines/scoringEngine.js

/**
 * Scoring Engine - Handles score calculation and validation
 * Provides various scoring algorithms for different drill types
 */
class ScoringEngine {
  constructor() {
    this.scoringRules = {
      // Weight configurations for different drill types
      weights: {
        memory: { accuracy: 0.6, speed: 0.3, consistency: 0.1 },
        cognitive: { accuracy: 0.5, speed: 0.3, complexity: 0.2 },
        visual: { accuracy: 0.4, speed: 0.4, precision: 0.2 },
        motor: { accuracy: 0.4, speed: 0.3, precision: 0.3 },
        academic: { accuracy: 0.6, speed: 0.2, comprehension: 0.2 },
        productivity: { efficiency: 0.5, speed: 0.3, accuracy: 0.2 },
        mental: { consistency: 0.4, duration: 0.3, adherence: 0.3 }
      },
      
      // Bonus multipliers
      bonuses: {
        perfectScore: 1.2,
        perfectAccuracy: 1.15,
        speedDemon: 1.1,
        consistencyKing: 1.1,
        streakBonus: 0.05, // per streak
        firstTimeBonus: 1.05
      },
      
      // Penalties
      penalties: {
        incorrect: -5,
        timeout: -10,
        skip: -3,
        lowAccuracy: -0.2 // per point below 50%
      }
    };
    
    // Achievement thresholds
    this.achievementThresholds = {
      perfectScore: 100,
      nearPerfect: 95,
      excellent: 90,
      good: 75,
      passing: 60
    };
  }

  /**
   * Calculate score for a drill session
   * @param {Object} params - Scoring parameters
   * @returns {Object} Score details
   */
  calculateScore(params) {
    const {
      drillType,
      accuracy,
      reactionTimes = [],
      duration,
      expectedDuration,
      complexity = 1,
      streak = 0,
      isFirstAttempt = false,
      inputCount = 0,
      correctCount = 0,
      skippedCount = 0,
      timedOut = false
    } = params;
    
    // Get weights for drill type
    const weights = this.scoringRules.weights[drillType] || this.scoringRules.weights.cognitive;
    
    // Calculate individual component scores
    const accuracyScore = this.calculateAccuracyScore(accuracy);
    const speedScore = this.calculateSpeedScore(duration, expectedDuration);
    const consistencyScore = this.calculateConsistencyScore(reactionTimes);
    const precisionScore = this.calculatePrecisionScore(correctCount, inputCount);
    const efficiencyScore = this.calculateEfficiencyScore(correctCount, duration);
    const comprehensionScore = this.calculateComprehensionScore(accuracy, complexity);
    const adherenceScore = this.calculateAdherenceScore(skippedCount, timedOut);
    
    // Weighted composite score
    let finalScore = 0;
    
    if (drillType === 'memory') {
      finalScore = (accuracyScore * weights.accuracy) + 
                   (speedScore * weights.speed) + 
                   (consistencyScore * weights.consistency);
    } else if (drillType === 'cognitive') {
      finalScore = (accuracyScore * weights.accuracy) + 
                   (speedScore * weights.speed) + 
                   (comprehensionScore * weights.complexity);
    } else if (drillType === 'visual') {
      finalScore = (accuracyScore * weights.accuracy) + 
                   (speedScore * weights.speed) + 
                   (precisionScore * weights.precision);
    } else if (drillType === 'motor') {
      finalScore = (accuracyScore * weights.accuracy) + 
                   (speedScore * weights.speed) + 
                   (precisionScore * weights.precision);
    } else if (drillType === 'academic') {
      finalScore = (accuracyScore * weights.accuracy) + 
                   (speedScore * weights.speed) + 
                   (comprehensionScore * weights.comprehension);
    } else if (drillType === 'productivity') {
      finalScore = (efficiencyScore * weights.efficiency) + 
                   (speedScore * weights.speed) + 
                   (accuracyScore * weights.accuracy);
    } else if (drillType === 'mental') {
      finalScore = (consistencyScore * weights.consistency) + 
                   (adherenceScore * weights.duration) + 
                   (accuracyScore * weights.adherence);
    } else {
      // Default scoring
      finalScore = (accuracyScore * 0.5) + (speedScore * 0.3) + (consistencyScore * 0.2);
    }
    
    // Apply bonuses
    let bonusMultiplier = 1;
    
    if (accuracy === 100) {
      bonusMultiplier *= this.scoringRules.bonuses.perfectScore;
    } else if (accuracy >= 95) {
      bonusMultiplier *= this.scoringRules.bonuses.perfectAccuracy;
    }
    
    if (duration && expectedDuration && duration < expectedDuration * 0.7) {
      bonusMultiplier *= this.scoringRules.bonuses.speedDemon;
    }
    
    if (consistencyScore >= 90) {
      bonusMultiplier *= this.scoringRules.bonuses.consistencyKing;
    }
    
    if (streak > 0) {
      bonusMultiplier += streak * this.scoringRules.bonuses.streakBonus;
    }
    
    if (isFirstAttempt) {
      bonusMultiplier *= this.scoringRules.bonuses.firstTimeBonus;
    }
    
    // Apply penalties
    let penalty = 0;
    if (accuracy < 50) {
      penalty += (50 - accuracy) * this.scoringRules.penalties.lowAccuracy;
    }
    if (skippedCount > 0) {
      penalty += skippedCount * this.scoringRules.penalties.skip;
    }
    if (timedOut) {
      penalty += this.scoringRules.penalties.timeout;
    }
    
    finalScore = (finalScore * bonusMultiplier) - penalty;
    finalScore = Math.min(100, Math.max(0, Math.round(finalScore)));
    
    // Determine grade
    const grade = this.getGrade(finalScore);
    
    return {
      score: finalScore,
      grade,
      components: {
        accuracy: accuracyScore,
        speed: speedScore,
        consistency: consistencyScore,
        precision: precisionScore,
        efficiency: efficiencyScore,
        comprehension: comprehensionScore,
        adherence: adherenceScore
      },
      bonusMultiplier,
      penalty,
      achievements: this.checkAchievements(finalScore, accuracy, consistencyScore)
    };
  }

  /**
   * Calculate accuracy score
   */
  calculateAccuracyScore(accuracy) {
    return accuracy;
  }

  /**
   * Calculate speed score based on time taken
   */
  calculateSpeedScore(duration, expectedDuration) {
    if (!duration || !expectedDuration) return 100;
    
    const ratio = duration / expectedDuration;
    if (ratio <= 0.5) return 100;
    if (ratio <= 0.75) return 90;
    if (ratio <= 1) return 80;
    if (ratio <= 1.25) return 70;
    if (ratio <= 1.5) return 60;
    return Math.max(0, 100 - (ratio - 1.5) * 40);
  }

  /**
   * Calculate consistency score based on reaction times
   */
  calculateConsistencyScore(reactionTimes) {
    if (!reactionTimes || reactionTimes.length < 2) return 100;
    
    const mean = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    const variance = reactionTimes.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / reactionTimes.length;
    const stdDev = Math.sqrt(variance);
    const cv = stdDev / mean; // Coefficient of variation
    
    // Lower CV = better consistency
    if (cv <= 0.1) return 100;
    if (cv <= 0.2) return 90;
    if (cv <= 0.3) return 80;
    if (cv <= 0.4) return 70;
    if (cv <= 0.5) return 60;
    return Math.max(0, 100 - (cv - 0.5) * 100);
  }

  /**
   * Calculate precision score
   */
  calculatePrecisionScore(correctCount, inputCount) {
    if (!inputCount || inputCount === 0) return 0;
    return (correctCount / inputCount) * 100;
  }

  /**
   * Calculate efficiency score (correct inputs per second)
   */
  calculateEfficiencyScore(correctCount, duration) {
    if (!duration || duration === 0) return 0;
    const efficiency = correctCount / duration;
    return Math.min(100, efficiency * 20);
  }

  /**
   * Calculate comprehension score
   */
  calculateComprehensionScore(accuracy, complexity) {
    // Base score on accuracy, adjusted by complexity
    let score = accuracy;
    if (complexity > 1) {
      score *= (1 + (complexity - 1) * 0.1);
    }
    return Math.min(100, score);
  }

  /**
   * Calculate adherence score
   */
  calculateAdherenceScore(skippedCount, timedOut) {
    let score = 100;
    score -= skippedCount * 5;
    if (timedOut) score -= 20;
    return Math.max(0, score);
  }

  /**
   * Get grade based on score
   */
  getGrade(score) {
    if (score >= 97) return 'S';
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  /**
   * Check achievements unlocked
   */
  checkAchievements(score, accuracy, consistency) {
    const achievements = [];
    
    if (score === 100) achievements.push('perfect_score');
    else if (score >= 95) achievements.push('near_perfect');
    
    if (accuracy === 100) achievements.push('perfect_accuracy');
    else if (accuracy >= 95) achievements.push('excellent_accuracy');
    
    if (consistency >= 95) achievements.push('consistency_master');
    else if (consistency >= 85) achievements.push('consistent_performer');
    
    if (score >= 90 && accuracy >= 90 && consistency >= 90) {
      achievements.push('triple_crown');
    }
    
    return achievements;
  }

  /**
   * Calculate XP earned
   */
  calculateXP(score, difficultyMultiplier = 1, bonus = 0) {
    let xp = Math.floor(score * difficultyMultiplier * 2);
    xp += bonus;
    return Math.max(10, xp);
  }

  /**
   * Validate if score is legitimate
   */
  validateScore(score, accuracy, duration, expectedDuration) {
    const issues = [];
    
    if (score < 0 || score > 100) {
      issues.push('Score out of range');
    }
    
    if (accuracy < 0 || accuracy > 100) {
      issues.push('Accuracy out of range');
    }
    
    if (duration && expectedDuration && duration < expectedDuration * 0.1) {
      issues.push('Completion time unrealistically fast');
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  }

  /**
   * Get scoring breakdown for display
   */
  getScoreBreakdown(scoreDetails) {
    return {
      total: scoreDetails.score,
      grade: scoreDetails.grade,
      breakdown: [
        { name: 'Accuracy', value: scoreDetails.components.accuracy, weight: 'High' },
        { name: 'Speed', value: scoreDetails.components.speed, weight: 'Medium' },
        { name: 'Consistency', value: scoreDetails.components.consistency, weight: 'Low' }
      ].filter(c => c.value !== undefined),
      bonus: scoreDetails.bonusMultiplier > 1 ? `${(scoreDetails.bonusMultiplier - 1) * 100}% bonus` : null,
      penalty: scoreDetails.penalty > 0 ? `${scoreDetails.penalty} point penalty` : null
    };
  }
}

export default new ScoringEngine();