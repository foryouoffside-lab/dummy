// lib/engines/baseDrill.js

/**
 * Base Drill Engine - Abstract base class for all drill types
 * Provides common functionality and interface for all drills
 */

class BaseDrill {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.category = config.category;
    this.subcategory = config.subcategory;
    this.difficulty = config.difficulty || 'intermediate';
    this.duration = config.duration || 60; // seconds
    this.points = config.points || 100;
    this.description = config.description || '';
    this.instructions = config.instructions || '';
    
    // State management
    this.state = {
      isActive: false,
      isPaused: false,
      isComplete: false,
      score: 0,
      accuracy: 0,
      startTime: null,
      endTime: null,
      currentAttempt: 1,
      maxAttempts: config.maxAttempts || 3
    };
    
    // Metrics tracking
    this.metrics = {
      attempts: [],
      reactionTimes: [],
      accuracyHistory: [],
      scoreHistory: []
    };
    
    // Event callbacks
    this.callbacks = {
      onStart: null,
      onProgress: null,
      onComplete: null,
      onError: null,
      onPause: null,
      onResume: null
    };
  }

  /**
   * Initialize the drill
   */
  async initialize() {
    this.validateConfig();
    this.resetState();
    return this;
  }

  /**
   * Validate drill configuration
   */
  validateConfig() {
    if (!this.id) throw new Error('Drill ID is required');
    if (!this.name) throw new Error('Drill name is required');
    if (!this.category) throw new Error('Drill category is required');
    if (this.duration < 1) throw new Error('Duration must be at least 1 second');
    if (this.points < 0) throw new Error('Points cannot be negative');
  }

  /**
   * Start the drill
   */
  start() {
    if (this.state.isActive) {
      console.warn('Drill already active');
      return;
    }
    
    this.state.isActive = true;
    this.state.isPaused = false;
    this.state.startTime = Date.now();
    this.state.currentAttempt++;
    
    this.triggerCallback('onStart', { drillId: this.id, startTime: this.state.startTime });
    
    return this;
  }

  /**
   * Pause the drill
   */
  pause() {
    if (!this.state.isActive || this.state.isPaused) return;
    
    this.state.isPaused = true;
    this.triggerCallback('onPause', { drillId: this.id });
    
    return this;
  }

  /**
   * Resume the drill
   */
  resume() {
    if (!this.state.isActive || !this.state.isPaused) return;
    
    this.state.isPaused = false;
    this.triggerCallback('onResume', { drillId: this.id });
    
    return this;
  }

  /**
   * Complete the drill
   */
  complete() {
    if (!this.state.isActive || this.state.isComplete) return;
    
    this.state.isActive = false;
    this.state.isComplete = true;
    this.state.endTime = Date.now();
    
    const totalTime = (this.state.endTime - this.state.startTime) / 1000;
    
    this.triggerCallback('onComplete', {
      drillId: this.id,
      score: this.state.score,
      accuracy: this.state.accuracy,
      timeSpent: totalTime,
      metrics: this.metrics
    });
    
    return {
      score: this.state.score,
      accuracy: this.state.accuracy,
      timeSpent: totalTime,
      pointsEarned: this.calculatePointsEarned()
    };
  }

  /**
   * Reset the drill state
   */
  reset() {
    this.resetState();
    this.triggerCallback('onReset', { drillId: this.id });
    return this;
  }

  /**
   * Reset internal state
   */
  resetState() {
    this.state = {
      ...this.state,
      isActive: false,
      isPaused: false,
      isComplete: false,
      score: 0,
      accuracy: 0,
      startTime: null,
      endTime: null
    };
    
    this.metrics = {
      attempts: [],
      reactionTimes: [],
      accuracyHistory: [],
      scoreHistory: []
    };
  }

  /**
   * Update score during drill
   */
  updateScore(newScore) {
    this.state.score = Math.min(100, Math.max(0, newScore));
    this.metrics.scoreHistory.push({ score: this.state.score, timestamp: Date.now() });
    this.triggerCallback('onProgress', { score: this.state.score });
  }

  /**
   * Update accuracy during drill
   */
  updateAccuracy(newAccuracy) {
    this.state.accuracy = Math.min(100, Math.max(0, newAccuracy));
    this.metrics.accuracyHistory.push({ accuracy: this.state.accuracy, timestamp: Date.now() });
  }

  /**
   * Record reaction time
   */
  recordReactionTime(reactionTime) {
    this.metrics.reactionTimes.push(reactionTime);
  }

  /**
   * Calculate points earned based on performance
   */
  calculatePointsEarned() {
    let points = this.points;
    
    // Multiply by score percentage
    points *= (this.state.score / 100);
    
    // Bonus for high accuracy
    if (this.state.accuracy >= 90) points *= 1.2;
    else if (this.state.accuracy >= 75) points *= 1.1;
    
    // Time bonus for completing quickly
    const timeSpent = (this.state.endTime - this.state.startTime) / 1000;
    if (timeSpent < this.duration) {
      const timeBonus = 1 + ((this.duration - timeSpent) / this.duration) * 0.2;
      points *= timeBonus;
    }
    
    return Math.round(points);
  }

  /**
   * Get current progress percentage
   */
  getProgress() {
    if (!this.state.startTime) return 0;
    const elapsed = (Date.now() - this.state.startTime) / 1000;
    return Math.min(100, (elapsed / this.duration) * 100);
  }

  /**
   * Get remaining time
   */
  getRemainingTime() {
    if (!this.state.startTime) return this.duration;
    const elapsed = (Date.now() - this.state.startTime) / 1000;
    return Math.max(0, this.duration - elapsed);
  }

  /**
   * Check if time is up
   */
  isTimeUp() {
    return this.getRemainingTime() <= 0;
  }

  /**
   * Set event callbacks
   */
  on(event, callback) {
    if (this.callbacks.hasOwnProperty(event)) {
      this.callbacks[event] = callback;
    }
    return this;
  }

  /**
   * Trigger a callback event
   */
  triggerCallback(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event](data);
    }
  }

  /**
   * Get drill configuration
   */
  getConfig() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      subcategory: this.subcategory,
      difficulty: this.difficulty,
      duration: this.duration,
      points: this.points,
      description: this.description,
      instructions: this.instructions
    };
  }

  /**
   * Get current state
   */
  getState() {
    return {
      ...this.state,
      progress: this.getProgress(),
      remainingTime: this.getRemainingTime(),
      isTimeUp: this.isTimeUp()
    };
  }

  /**
   * Get metrics summary
   */
  getMetricsSummary() {
    const avgReactionTime = this.metrics.reactionTimes.length > 0
      ? this.metrics.reactionTimes.reduce((a, b) => a + b, 0) / this.metrics.reactionTimes.length
      : null;
    
    const avgAccuracy = this.metrics.accuracyHistory.length > 0
      ? this.metrics.accuracyHistory.reduce((a, b) => a + b, 0) / this.metrics.accuracyHistory.length
      : this.state.accuracy;
    
    return {
      score: this.state.score,
      accuracy: avgAccuracy,
      averageReactionTime: avgReactionTime,
      attempts: this.metrics.attempts.length,
      timeSpent: this.state.endTime ? (this.state.endTime - this.state.startTime) / 1000 : null
    };
  }
}

export default BaseDrill;