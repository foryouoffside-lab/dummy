// lib/difficulty/adaptiveDifficulty.js

import difficultyManager from './difficultyManager';

/**
 * Adaptive Difficulty - Dynamically adjusts drill difficulty based on user performance
 * Uses ELO-like algorithm and machine learning concepts for personalized difficulty
 */

class AdaptiveDifficulty {
  constructor() {
    // ELO rating system parameters
    this.eloConfig = {
      initialRating: 1200,
      kFactor: 32,
      minRating: 800,
      maxRating: 2000
    };
    
    // Adaptive algorithm settings
    this.adaptiveConfig = {
      adjustmentFactor: 0.1,
      minAdjustment: 0.05,
      maxAdjustment: 0.3,
      smoothingWindow: 5,
      confidenceThreshold: 0.7
    };
    
    // Store user difficulty ratings
    this.userRatings = new Map();
    this.userHistory = new Map();
  }

  /**
   * Get or initialize user rating
   */
  getUserRating(userId, drillType) {
    const key = `${userId}_${drillType}`;
    if (!this.userRatings.has(key)) {
      this.userRatings.set(key, this.eloConfig.initialRating);
    }
    return this.userRatings.get(key);
  }

  /**
   * Update user rating based on performance
   * Uses ELO rating system algorithm
   */
  updateUserRating(userId, drillType, score, expectedScore, actualDifficulty) {
    const key = `${userId}_${drillType}`;
    let currentRating = this.getUserRating(userId, drillType);
    
    // Calculate rating change
    const k = this.eloConfig.kFactor;
    const expected = this.calculateExpectedScore(currentRating, this.getDifficultyRating(actualDifficulty));
    const actual = score / 100;
    const change = Math.round(k * (actual - expected));
    
    // Apply change with bounds
    let newRating = currentRating + change;
    newRating = Math.max(this.eloConfig.minRating, Math.min(this.eloConfig.maxRating, newRating));
    
    this.userRatings.set(key, newRating);
    
    // Store history
    if (!this.userHistory.has(key)) {
      this.userHistory.set(key, []);
    }
    const history = this.userHistory.get(key);
    history.push({
      timestamp: Date.now(),
      rating: newRating,
      score,
      difficulty: actualDifficulty
    });
    
    // Keep only last 50 entries
    while (history.length > 50) {
      history.shift();
    }
    
    return {
      oldRating: currentRating,
      newRating,
      change,
      confidence: this.calculateConfidence(history)
    };
  }

  /**
   * Calculate expected score based on ratings
   */
  calculateExpectedScore(userRating, difficultyRating) {
    const ratingDiff = difficultyRating - userRating;
    return 1 / (1 + Math.pow(10, ratingDiff / 400));
  }

  /**
   * Get difficulty rating (ELO equivalent for difficulty levels)
   */
  getDifficultyRating(difficulty) {
    const ratings = {
      beginner: 1000,
      easy: 1100,
      intermediate: 1300,
      advanced: 1500,
      expert: 1700
    };
    return ratings[difficulty] || 1300;
  }

  /**
   * Calculate confidence score based on history consistency
   */
  calculateConfidence(history) {
    if (history.length < 5) return 0.5;
    
    const recentScores = history.slice(-10).map(h => h.score);
    const mean = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const variance = recentScores.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / recentScores.length;
    const stdDev = Math.sqrt(variance);
    
    // Lower standard deviation = higher confidence
    const confidence = Math.max(0, Math.min(1, 1 - (stdDev / 50)));
    return confidence;
  }

  /**
   * Get recommended difficulty based on user rating
   */
  getRecommendedDifficulty(userId, drillType, userLevel = 1) {
    const rating = this.getUserRating(userId, drillType);
    const history = this.userHistory.get(`${userId}_${drillType}`) || [];
    const confidence = this.calculateConfidence(history);
    
    let recommended;
    if (rating < 1000) {
      recommended = 'beginner';
    } else if (rating < 1150) {
      recommended = 'easy';
    } else if (rating < 1350) {
      recommended = 'intermediate';
    } else if (rating < 1550) {
      recommended = 'advanced';
    } else {
      recommended = 'expert';
    }
    
    // Ensure difficulty doesn't exceed user's level cap
    const levelCap = this.getLevelCap(userLevel);
    if (difficultyManager.getDifficulty(recommended).level > levelCap) {
      recommended = this.getDifficultyByLevel(levelCap);
    }
    
    return {
      difficulty: recommended,
      rating,
      confidence,
      reason: this.getRecommendationReason(rating, confidence)
    };
  }

  /**
   * Get level cap based on user level
   */
  getLevelCap(userLevel) {
    if (userLevel < 3) return 1;
    if (userLevel < 6) return 2;
    if (userLevel < 10) return 3;
    if (userLevel < 15) return 4;
    return 5;
  }

  /**
   * Get difficulty by level number
   */
  getDifficultyByLevel(level) {
    const difficulties = {
      1: 'beginner',
      2: 'easy',
      3: 'intermediate',
      4: 'advanced',
      5: 'expert'
    };
    return difficulties[level] || 'intermediate';
  }

  /**
   * Get recommendation reason
   */
  getRecommendationReason(rating, confidence) {
    if (confidence < 0.6) {
      return 'Need more data for accurate difficulty recommendation';
    }
    if (rating < 1000) {
      return 'Starting with beginner difficulty to build foundation';
    }
    if (rating < 1150) {
      return 'Progressing well. Moving to easy difficulty';
    }
    if (rating < 1350) {
      return 'Good performance! Ready for intermediate challenges';
    }
    if (rating < 1550) {
      return 'Excellent skills! Try advanced difficulty';
    }
    return 'Master level! Expert difficulty recommended';
  }

  /**
   * Adjust difficulty based on recent performance
   */
  adjustDifficulty(currentDifficulty, recentPerformance) {
    const { averageScore, consistency, trend } = recentPerformance;
    
    let adjustment = 0;
    let reason = '';
    
    // Score-based adjustment
    if (averageScore >= 90 && trend === 'improving') {
      adjustment = 1;
      reason = 'Exceptional performance! Difficulty increased.';
    } else if (averageScore >= 80) {
      adjustment = 0.5;
      reason = 'Great performance! Slight difficulty increase.';
    } else if (averageScore <= 50) {
      adjustment = -1;
      reason = 'Having difficulty? Difficulty decreased for better learning.';
    } else if (averageScore <= 65) {
      adjustment = -0.5;
      reason = 'Slight difficulty adjustment to match your skill level.';
    }
    
    // Consistency adjustment
    if (consistency > 0.8 && averageScore >= 75) {
      adjustment += 0.3;
      reason += ' Consistent high performance noted.';
    } else if (consistency < 0.4) {
      adjustment -= 0.3;
      reason += ' Inconsistent performance detected.';
    }
    
    // Apply adjustment
    const difficultyLevels = ['beginner', 'easy', 'intermediate', 'advanced', 'expert'];
    let currentIndex = difficultyLevels.indexOf(currentDifficulty);
    let newIndex = Math.max(0, Math.min(difficultyLevels.length - 1, currentIndex + Math.round(adjustment)));
    
    const newDifficulty = difficultyLevels[newIndex];
    const changed = newDifficulty !== currentDifficulty;
    
    return {
      currentDifficulty,
      newDifficulty,
      changed,
      adjustment,
      reason: reason || 'Difficulty remains optimal for your skill level.',
      recommendation: changed ? `Difficulty ${changed ? 'increased' : 'decreased'} to ${newDifficulty}` : 'Keep up the good work!'
    };
  }

  /**
   * Analyze performance trend
   */
  analyzePerformanceTrend(scores) {
    if (scores.length < 3) return 'stable';
    
    const recentScores = scores.slice(-5);
    const firstHalf = recentScores.slice(0, Math.floor(recentScores.length / 2));
    const secondHalf = recentScores.slice(Math.floor(recentScores.length / 2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    const difference = secondAvg - firstAvg;
    
    if (difference > 10) return 'improving';
    if (difference < -10) return 'declining';
    return 'stable';
  }

  /**
   * Get performance prediction for next session
   */
  predictNextScore(userId, drillType) {
    const history = this.userHistory.get(`${userId}_${drillType}`) || [];
    if (history.length < 5) return null;
    
    const recentScores = history.slice(-10).map(h => h.score);
    const trend = this.analyzePerformanceTrend(recentScores);
    const average = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    
    let predictedScore = average;
    if (trend === 'improving') predictedScore += 5;
    if (trend === 'declining') predictedScore -= 5;
    
    return {
      predictedScore: Math.min(100, Math.max(0, Math.round(predictedScore))),
      confidence: this.calculateConfidence(history),
      trend,
      recommendation: trend === 'improving' 
        ? 'Consider increasing difficulty' 
        : trend === 'declining' 
          ? 'Consider reviewing fundamentals' 
          : 'Keep practicing consistently'
    };
  }

  /**
   * Reset user data (for testing or user reset)
   */
  resetUserData(userId) {
    // Clear ratings for this user
    for (const [key, value] of this.userRatings.entries()) {
      if (key.startsWith(userId)) {
        this.userRatings.delete(key);
      }
    }
    
    // Clear history for this user
    for (const [key, value] of this.userHistory.entries()) {
      if (key.startsWith(userId)) {
        this.userHistory.delete(key);
      }
    }
  }

  /**
   * Get user progress summary
   */
  getUserProgressSummary(userId, drillType) {
    const rating = this.getUserRating(userId, drillType);
    const history = this.userHistory.get(`${userId}_${drillType}`) || [];
    const confidence = this.calculateConfidence(history);
    const recommended = this.getRecommendedDifficulty(userId, drillType);
    const trend = this.analyzePerformanceTrend(history.map(h => h.score));
    
    return {
      userId,
      drillType,
      currentRating: rating,
      confidence,
      recommendedDifficulty: recommended.difficulty,
      trend,
      totalSessions: history.length,
      recentScores: history.slice(-5).map(h => ({ score: h.score, timestamp: h.timestamp })),
      nextMilestone: this.getNextMilestone(rating)
    };
  }

  /**
   * Get next rating milestone
   */
  getNextMilestone(currentRating) {
    const milestones = [1000, 1150, 1300, 1500, 1700, 2000];
    const next = milestones.find(m => m > currentRating);
    if (!next) return null;
    
    return {
      targetRating: next,
      pointsNeeded: next - currentRating,
      estimatedSessions: Math.ceil((next - currentRating) / 15) // ~15 points per session
    };
  }
}

export default new AdaptiveDifficulty();