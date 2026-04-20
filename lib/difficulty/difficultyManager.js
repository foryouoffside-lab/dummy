// lib/difficulty/difficultyManager.js

/**
 * Difficulty Manager - Handles drill difficulty levels and progression
 * Manages difficulty settings, scaling, and user progression
 */

class DifficultyManager {
  constructor() {
    // Difficulty levels configuration
    this.difficultyLevels = {
      beginner: {
        id: 'beginner',
        name: 'Beginner',
        level: 1,
        multiplier: 0.5,
        color: 'text-green-600',
        bg: 'bg-green-100',
        icon: '🌱',
        description: 'Perfect for newcomers',
        thresholds: { minScore: 0, maxScore: 60, minAccuracy: 0, maxAccuracy: 70 }
      },
      easy: {
        id: 'easy',
        name: 'Easy',
        level: 2,
        multiplier: 0.7,
        color: 'text-green-600',
        bg: 'bg-green-100',
        icon: '👍',
        description: 'Gentle challenge',
        thresholds: { minScore: 0, maxScore: 70, minAccuracy: 0, maxAccuracy: 75 }
      },
      intermediate: {
        id: 'intermediate',
        name: 'Intermediate',
        level: 3,
        multiplier: 1.0,
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        icon: '⚡',
        description: 'Balanced challenge',
        thresholds: { minScore: 50, maxScore: 85, minAccuracy: 50, maxAccuracy: 85 }
      },
      medium: {
        id: 'medium',
        name: 'Medium',
        level: 3,
        multiplier: 1.0,
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        icon: '⚡',
        description: 'Balanced challenge',
        thresholds: { minScore: 50, maxScore: 85, minAccuracy: 50, maxAccuracy: 85 }
      },
      advanced: {
        id: 'advanced',
        name: 'Advanced',
        level: 4,
        multiplier: 1.3,
        color: 'text-orange-600',
        bg: 'bg-orange-100',
        icon: '🔥',
        description: 'For experienced players',
        thresholds: { minScore: 70, maxScore: 95, minAccuracy: 70, maxAccuracy: 90 }
      },
      hard: {
        id: 'hard',
        name: 'Hard',
        level: 4,
        multiplier: 1.3,
        color: 'text-orange-600',
        bg: 'bg-orange-100',
        icon: '🔥',
        description: 'For experienced players',
        thresholds: { minScore: 70, maxScore: 95, minAccuracy: 70, maxAccuracy: 90 }
      },
      expert: {
        id: 'expert',
        name: 'Expert',
        level: 5,
        multiplier: 1.5,
        color: 'text-red-600',
        bg: 'bg-red-100',
        icon: '💎',
        description: 'Ultimate challenge',
        thresholds: { minScore: 85, maxScore: 100, minAccuracy: 85, maxAccuracy: 100 }
      }
    };

    // Difficulty progression thresholds
    this.progressionThresholds = {
      unlockNextDifficulty: {
        beginner: { minScore: 70, minSessions: 3 },
        easy: { minScore: 75, minSessions: 5 },
        intermediate: { minScore: 80, minSessions: 7 },
        advanced: { minScore: 85, minSessions: 10 },
        expert: { minScore: 90, minSessions: 15 }
      },
      recommendDifficulty: {
        lowScore: 'decrease',
        highScore: 'increase',
        consistentScore: 'maintain'
      }
    };
  }

  /**
   * Get difficulty configuration by ID
   */
  getDifficulty(levelId) {
    return this.difficultyLevels[levelId?.toLowerCase()] || this.difficultyLevels.intermediate;
  }

  /**
   * Get all difficulty levels
   */
  getAllDifficulties() {
    return Object.values(this.difficultyLevels);
  }

  /**
   * Calculate points based on difficulty and performance
   * @param {Object} params - Calculation parameters
   * @returns {number} Calculated points
   */
  calculatePoints({ score, accuracy, difficulty, duration, timeBonus = true }) {
    const difficultyConfig = this.getDifficulty(difficulty);
    let points = score * difficultyConfig.multiplier;
    
    // Add accuracy bonus (up to 20% extra)
    if (accuracy) {
      points += (accuracy / 100) * 10;
    }
    
    // Add time bonus if enabled (faster completion = more points)
    if (timeBonus && duration) {
      const timeBonusValue = Math.max(0, (60 - duration) / 10);
      points += timeBonusValue;
    }
    
    // Add streak bonus (to be implemented)
    // points *= (1 + (streak * 0.05));
    
    return Math.round(points);
  }

  /**
   * Calculate XP reward based on difficulty and performance
   */
  calculateXPReward(score, difficulty, duration) {
    const difficultyConfig = this.getDifficulty(difficulty);
    let xp = Math.floor(score * difficultyConfig.multiplier * 2);
    
    // Time bonus: faster completion = more XP
    if (duration) {
      const timeBonus = Math.max(0, Math.floor((60 - duration) / 5));
      xp += timeBonus;
    }
    
    return Math.max(10, xp);
  }

  /**
   * Determine if user should progress to next difficulty
   */
  shouldProgress(userStats, currentDifficulty) {
    const thresholds = this.progressionThresholds.unlockNextDifficulty[currentDifficulty];
    if (!thresholds) return false;
    
    const meetsScore = userStats.averageScore >= thresholds.minScore;
    const meetsSessions = userStats.totalSessions >= thresholds.minSessions;
    
    return meetsScore && meetsSessions;
  }

  /**
   * Get recommended next difficulty based on performance
   */
  getRecommendedDifficulty(userStats, currentDifficulty) {
    const currentConfig = this.getDifficulty(currentDifficulty);
    const allDifficulties = this.getAllDifficulties();
    const currentIndex = allDifficulties.findIndex(d => d.id === currentDifficulty);
    
    // Determine if difficulty should increase or decrease
    if (userStats.averageScore >= 85 && userStats.totalSessions >= 10) {
      // Increase difficulty
      const nextDifficulty = allDifficulties[currentIndex + 1];
      if (nextDifficulty) {
        return {
          difficulty: nextDifficulty.id,
          reason: 'Excellent performance! Ready for more challenge.',
          action: 'increase'
        };
      }
    } else if (userStats.averageScore <= 50 && userStats.totalSessions >= 5) {
      // Decrease difficulty
      const prevDifficulty = allDifficulties[currentIndex - 1];
      if (prevDifficulty) {
        return {
          difficulty: prevDifficulty.id,
          reason: 'Having trouble? Try an easier level to build confidence.',
          action: 'decrease'
        };
      }
    }
    
    return {
      difficulty: currentDifficulty,
      reason: 'Keep practicing to unlock higher difficulties!',
      action: 'maintain'
    };
  }

  /**
   * Validate if user can access a difficulty level
   */
  canAccessDifficulty(userLevel, requestedDifficulty) {
    const difficultyConfig = this.getDifficulty(requestedDifficulty);
    return userLevel >= difficultyConfig.level;
  }

  /**
   * Get difficulty parameters for drill generation
   */
  getDrillParameters(difficulty) {
    const config = this.getDifficulty(difficulty);
    
    const parameters = {
      beginner: {
        speed: 800,
        complexity: 1,
        timeLimit: 60,
        targetSize: 60,
        targetCount: 1,
        sequenceLength: 3,
        numberRange: 20,
        operations: ['+', '-']
      },
      easy: {
        speed: 700,
        complexity: 1,
        timeLimit: 60,
        targetSize: 55,
        targetCount: 1,
        sequenceLength: 4,
        numberRange: 30,
        operations: ['+', '-']
      },
      intermediate: {
        speed: 600,
        complexity: 2,
        timeLimit: 50,
        targetSize: 45,
        targetCount: 2,
        sequenceLength: 5,
        numberRange: 50,
        operations: ['+', '-', '*']
      },
      advanced: {
        speed: 500,
        complexity: 3,
        timeLimit: 40,
        targetSize: 35,
        targetCount: 3,
        sequenceLength: 6,
        numberRange: 100,
        operations: ['+', '-', '*', '/']
      },
      expert: {
        speed: 400,
        complexity: 4,
        timeLimit: 30,
        targetSize: 25,
        targetCount: 4,
        sequenceLength: 8,
        numberRange: 200,
        operations: ['+', '-', '*', '/']
      }
    };
    
    return parameters[config.id] || parameters.intermediate;
  }

  /**
   * Calculate difficulty score based on user performance
   * @returns {number} Score between 0-100 indicating user's skill level
   */
  calculateUserDifficultyScore(userStats) {
    const { averageScore, averageAccuracy, totalSessions, consistency } = userStats;
    
    let score = 0;
    
    // Score contribution (40%)
    score += (averageScore / 100) * 40;
    
    // Accuracy contribution (30%)
    score += (averageAccuracy / 100) * 30;
    
    // Experience contribution (20%)
    const experienceScore = Math.min(20, totalSessions / 5);
    score += experienceScore;
    
    // Consistency contribution (10%)
    if (consistency) {
      score += (consistency / 100) * 10;
    }
    
    return Math.min(100, Math.max(0, score));
  }

  /**
   * Get difficulty badge styling
   */
  getDifficultyBadge(difficulty) {
    const config = this.getDifficulty(difficulty);
    return {
      text: config.name,
      color: config.color,
      bg: config.bg,
      icon: config.icon,
      className: `px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`
    };
  }

  /**
   * Get difficulty progression requirements
   */
  getProgressionRequirements(currentDifficulty) {
    const thresholds = this.progressionThresholds.unlockNextDifficulty[currentDifficulty];
    if (!thresholds) return null;
    
    return {
      nextDifficulty: this.getNextDifficulty(currentDifficulty),
      minScore: thresholds.minScore,
      minSessions: thresholds.minSessions,
      description: `Score at least ${thresholds.minScore}% in ${thresholds.minSessions} sessions to unlock next difficulty`
    };
  }

  /**
   * Get next difficulty level
   */
  getNextDifficulty(currentDifficulty) {
    const allDifficulties = this.getAllDifficulties();
    const currentIndex = allDifficulties.findIndex(d => d.id === currentDifficulty);
    return allDifficulties[currentIndex + 1]?.id || null;
  }

  /**
   * Get previous difficulty level
   */
  getPreviousDifficulty(currentDifficulty) {
    const allDifficulties = this.getAllDifficulties();
    const currentIndex = allDifficulties.findIndex(d => d.id === currentDifficulty);
    return allDifficulties[currentIndex - 1]?.id || null;
  }
}

export default new DifficultyManager();