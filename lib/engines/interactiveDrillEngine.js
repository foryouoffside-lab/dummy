// lib/engines/interactiveDrillEngine.js

import BaseDrill from './baseDrill';

/**
 * Interactive Drill Engine - Handles real-time interactive drills
 * Supports user input, timing, scoring, and feedback
 */
class InteractiveDrillEngine extends BaseDrill {
  constructor(config) {
    super(config);
    
    // Interactive-specific configuration
    this.inputConfig = {
      inputTypes: config.inputTypes || ['click', 'keyboard', 'mouse'],
      requiredInputs: config.requiredInputs || 1,
      timeLimitPerInput: config.timeLimitPerInput || 5, // seconds
      allowRetry: config.allowRetry !== false,
      showFeedback: config.showFeedback !== false
    };
    
    // Interactive state
    this.interactiveState = {
      currentInputIndex: 0,
      totalInputs: 0,
      correctInputs: 0,
      incorrectInputs: 0,
      skippedInputs: 0,
      inputHistory: [],
      currentInputStartTime: null,
      lastInputTime: null
    };
    
    // Scoring weights
    this.scoringWeights = {
      accuracy: 0.5,
      speed: 0.3,
      consistency: 0.2
    };
  }

  /**
   * Initialize interactive drill
   */
  async initialize() {
    await super.initialize();
    this.generateInputSequence();
    return this;
  }

  /**
   * Generate sequence of inputs required for the drill
   */
  generateInputSequence() {
    // This should be overridden by specific drill types
    // Example: generate random sequence for memory drill
    this.interactiveState.totalInputs = this.inputConfig.requiredInputs;
    this.interactiveState.inputHistory = [];
    this.interactiveState.currentInputIndex = 0;
  }

  /**
   * Process user input
   */
  processInput(userInput, expectedInput) {
    if (!this.state.isActive || this.state.isPaused) {
      return { valid: false, reason: 'Drill not active' };
    }
    
    const inputTime = Date.now();
    const reactionTime = this.interactiveState.currentInputStartTime 
      ? inputTime - this.interactiveState.currentInputStartTime 
      : null;
    
    const isCorrect = this.validateInput(userInput, expectedInput);
    
    // Record input
    this.interactiveState.inputHistory.push({
      index: this.interactiveState.currentInputIndex,
      userInput,
      expectedInput,
      isCorrect,
      reactionTime,
      timestamp: inputTime
    });
    
    // Update stats
    if (isCorrect) {
      this.interactiveState.correctInputs++;
      if (reactionTime) {
        this.recordReactionTime(reactionTime);
      }
    } else {
      this.interactiveState.incorrectInputs++;
    }
    
    // Update score based on input
    this.updateScoreBasedOnInput(isCorrect, reactionTime);
    
    // Move to next input
    this.interactiveState.currentInputIndex++;
    this.interactiveState.currentInputStartTime = Date.now();
    this.interactiveState.lastInputTime = inputTime;
    
    // Check if drill is complete
    if (this.interactiveState.currentInputIndex >= this.interactiveState.totalInputs) {
      this.complete();
    }
    
    return {
      valid: true,
      isCorrect,
      reactionTime,
      remainingInputs: this.interactiveState.totalInputs - this.interactiveState.currentInputIndex,
      currentScore: this.state.score
    };
  }

  /**
   * Validate user input against expected input
   */
  validateInput(userInput, expectedInput) {
    // Default comparison - can be overridden by specific drills
    if (typeof expectedInput === 'object') {
      return JSON.stringify(userInput) === JSON.stringify(expectedInput);
    }
    return userInput === expectedInput;
  }

  /**
   * Update score based on input correctness and speed
   */
  updateScoreBasedOnInput(isCorrect, reactionTime) {
    let pointsToAdd = 0;
    
    if (isCorrect) {
      // Base points
      pointsToAdd = 10;
      
      // Speed bonus (faster = more points)
      if (reactionTime && this.inputConfig.timeLimitPerInput) {
        const speedBonus = Math.max(0, (this.inputConfig.timeLimitPerInput - reactionTime / 1000) / this.inputConfig.timeLimitPerInput) * 5;
        pointsToAdd += speedBonus;
      }
      
      // Streak bonus
      const streak = this.getCurrentStreak();
      if (streak > 0) {
        pointsToAdd += Math.min(10, streak);
      }
    } else {
      // Penalty for incorrect input
      pointsToAdd = -5;
    }
    
    const newScore = Math.max(0, Math.min(100, this.state.score + pointsToAdd));
    this.updateScore(newScore);
  }

  /**
   * Get current correct streak
   */
  getCurrentStreak() {
    let streak = 0;
    for (let i = this.interactiveState.inputHistory.length - 1; i >= 0; i--) {
      if (this.interactiveState.inputHistory[i].isCorrect) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  /**
   * Calculate final accuracy
   */
  calculateAccuracy() {
    const total = this.interactiveState.correctInputs + this.interactiveState.incorrectInputs;
    if (total === 0) return 0;
    return (this.interactiveState.correctInputs / total) * 100;
  }

  /**
   * Calculate score based on multiple factors
   */
  calculateCompositeScore() {
    const accuracy = this.calculateAccuracy();
    const avgReactionTime = this.metrics.reactionTimes.length > 0
      ? this.metrics.reactionTimes.reduce((a, b) => a + b, 0) / this.metrics.reactionTimes.length
      : this.inputConfig.timeLimitPerInput * 1000;
    
    // Normalize reaction time (faster = higher score)
    const speedScore = Math.max(0, Math.min(100, 
      (1 - (avgReactionTime / 1000 / this.inputConfig.timeLimitPerInput)) * 100
    ));
    
    // Calculate consistency (low variation in reaction times)
    let consistencyScore = 100;
    if (this.metrics.reactionTimes.length > 1) {
      const variance = this.metrics.reactionTimes.reduce((sum, time) => {
        return sum + Math.pow(time - avgReactionTime, 2);
      }, 0) / this.metrics.reactionTimes.length;
      const stdDev = Math.sqrt(variance);
      consistencyScore = Math.max(0, 100 - (stdDev / 10));
    }
    
    // Weighted composite score
    const compositeScore = 
      (accuracy * this.scoringWeights.accuracy) +
      (speedScore * this.scoringWeights.speed) +
      (consistencyScore * this.scoringWeights.consistency);
    
    return Math.round(compositeScore);
  }

  /**
   * Complete the drill and calculate final metrics
   */
  complete() {
    this.state.accuracy = this.calculateAccuracy();
    this.state.score = this.calculateCompositeScore();
    
    super.complete();
  }

  /**
   * Skip current input (if allowed)
   */
  skipCurrentInput() {
    if (!this.inputConfig.allowRetry) return false;
    
    this.interactiveState.skippedInputs++;
    this.interactiveState.currentInputIndex++;
    this.interactiveState.currentInputStartTime = Date.now();
    
    return true;
  }

  /**
   * Get detailed performance report
   */
  getPerformanceReport() {
    return {
      summary: {
        totalInputs: this.interactiveState.totalInputs,
        correct: this.interactiveState.correctInputs,
        incorrect: this.interactiveState.incorrectInputs,
        skipped: this.interactiveState.skippedInputs,
        accuracy: this.calculateAccuracy(),
        finalScore: this.state.score,
        averageReactionTime: this.metrics.reactionTimes.length > 0
          ? this.metrics.reactionTimes.reduce((a, b) => a + b, 0) / this.metrics.reactionTimes.length
          : null
      },
      details: this.interactiveState.inputHistory,
      metrics: this.getMetricsSummary()
    };
  }

  /**
   * Get current input number
   */
  getCurrentInputNumber() {
    return this.interactiveState.currentInputIndex + 1;
  }

  /**
   * Get total inputs
   */
  getTotalInputs() {
    return this.interactiveState.totalInputs;
  }

  /**
   * Check if all inputs have been processed
   */
  isComplete() {
    return this.interactiveState.currentInputIndex >= this.interactiveState.totalInputs;
  }
}

export default InteractiveDrillEngine;