// lib/engines/nonInteractiveDrillEngine.js

import BaseDrill from './baseDrill';

/**
 * Non-Interactive Drill Engine - Handles guided exercises and sessions
 * Supports timers, instructions, and passive tracking
 */
class NonInteractiveDrillEngine extends BaseDrill {
  constructor(config) {
    super(config);
    
    // Non-interactive specific configuration
    this.sessionConfig = {
      type: config.sessionType || 'guided', // guided, meditation, breathing, reading
      hasInstructions: config.hasInstructions !== false,
      hasProgressTracking: config.hasProgressTracking !== false,
      requiresCompletion: config.requiresCompletion !== false,
      autoComplete: config.autoComplete || false,
      breakInterval: config.breakInterval || null // seconds between segments
    };
    
    // Session state
    this.sessionState = {
      currentSegment: 0,
      totalSegments: config.segments?.length || 1,
      segments: config.segments || [],
      segmentStartTime: null,
      segmentEndTime: null,
      breaksTaken: 0,
      completedSegments: [],
      userResponses: [],
      isFollowingInstructions: true
    };
    
    // Progress tracking
    this.progress = {
      focusScore: 0,
      completionRate: 0,
      adherenceScore: 100,
      interruptions: 0
    };
  }

  /**
   * Initialize non-interactive drill
   */
  async initialize() {
    await super.initialize();
    this.initializeSegments();
    return this;
  }

  /**
   * Initialize session segments
   */
  initializeSegments() {
    if (this.sessionState.segments.length === 0) {
      // Create default segment
      this.sessionState.segments = [{
        id: 1,
        title: 'Main Session',
        duration: this.duration,
        instructions: this.instructions,
        type: 'guided'
      }];
      this.sessionState.totalSegments = 1;
    }
  }

  /**
   * Start the session
   */
  start() {
    super.start();
    this.sessionState.segmentStartTime = Date.now();
    this.startCurrentSegment();
    return this;
  }

  /**
   * Start current segment
   */
  startCurrentSegment() {
    const segment = this.sessionState.segments[this.sessionState.currentSegment];
    if (segment) {
      this.sessionState.segmentStartTime = Date.now();
      this.triggerCallback('onSegmentStart', {
        segment: this.sessionState.currentSegment + 1,
        total: this.sessionState.totalSegments,
        title: segment.title,
        duration: segment.duration
      });
    }
  }

  /**
   * Complete current segment and move to next
   */
  completeSegment() {
    const segmentEndTime = Date.now();
    const segmentDuration = (segmentEndTime - this.sessionState.segmentStartTime) / 1000;
    
    this.sessionState.completedSegments.push({
      segment: this.sessionState.currentSegment,
      duration: segmentDuration,
      completedAt: segmentEndTime
    });
    
    this.sessionState.currentSegment++;
    
    if (this.sessionState.currentSegment < this.sessionState.totalSegments) {
      // Move to next segment
      this.startCurrentSegment();
      this.triggerCallback('onSegmentComplete', {
        segment: this.sessionState.currentSegment,
        remaining: this.sessionState.totalSegments - this.sessionState.currentSegment
      });
    } else {
      // All segments complete
      this.complete();
    }
  }

  /**
   * Track user's focus/adherence during session
   */
  trackFocus(isFocused = true) {
    if (!isFocused) {
      this.progress.interruptions++;
      this.progress.adherenceScore = Math.max(0, this.progress.adherenceScore - 5);
      this.sessionState.isFollowingInstructions = false;
      
      this.triggerCallback('onFocusLost', {
        interruptions: this.progress.interruptions,
        adherenceScore: this.progress.adherenceScore
      });
    } else {
      this.sessionState.isFollowingInstructions = true;
    }
  }

  /**
   * Record user response to prompts
   */
  recordResponse(questionId, response) {
    this.sessionState.userResponses.push({
      questionId,
      response,
      timestamp: Date.now(),
      segment: this.sessionState.currentSegment
    });
    
    this.triggerCallback('onResponse', { questionId, response });
  }

  /**
   * Take a break (if break interval is set)
   */
  takeBreak() {
    if (!this.sessionConfig.breakInterval) return false;
    
    this.sessionState.breaksTaken++;
    this.triggerCallback('onBreak', { breakNumber: this.sessionState.breaksTaken });
    
    return true;
  }

  /**
   * Calculate focus score based on adherence and interruptions
   */
  calculateFocusScore() {
    let score = 100;
    
    // Deduct for interruptions
    score -= this.progress.interruptions * 10;
    
    // Deduct for missed adherence
    score -= (100 - this.progress.adherenceScore);
    
    // Bonus for completing all segments
    if (this.sessionState.completedSegments.length === this.sessionState.totalSegments) {
      score += 10;
    }
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Calculate completion rate
   */
  calculateCompletionRate() {
    return (this.sessionState.completedSegments.length / this.sessionState.totalSegments) * 100;
  }

  /**
   * Complete the session
   */
  complete() {
    this.progress.focusScore = this.calculateFocusScore();
    this.progress.completionRate = this.calculateCompletionRate();
    
    // Calculate overall score based on focus and completion
    this.state.score = Math.round(
      (this.progress.focusScore * 0.6) + 
      (this.progress.completionRate * 0.4)
    );
    
    this.state.accuracy = this.progress.adherenceScore;
    
    super.complete();
  }

  /**
   * Get current segment info
   */
  getCurrentSegmentInfo() {
    const segment = this.sessionState.segments[this.sessionState.currentSegment];
    const elapsed = this.sessionState.segmentStartTime 
      ? (Date.now() - this.sessionState.segmentStartTime) / 1000 
      : 0;
    
    return {
      segmentNumber: this.sessionState.currentSegment + 1,
      totalSegments: this.sessionState.totalSegments,
      title: segment?.title || 'Session',
      duration: segment?.duration || this.duration,
      elapsed: Math.min(elapsed, segment?.duration || this.duration),
      remaining: Math.max(0, (segment?.duration || this.duration) - elapsed),
      progress: (elapsed / (segment?.duration || this.duration)) * 100
    };
  }

  /**
   * Get session summary
   */
  getSessionSummary() {
    return {
      completed: this.state.isComplete,
      segmentsCompleted: this.sessionState.completedSegments.length,
      totalSegments: this.sessionState.totalSegments,
      completionRate: this.progress.completionRate,
      focusScore: this.progress.focusScore,
      adherenceScore: this.progress.adherenceScore,
      interruptions: this.progress.interruptions,
      breaksTaken: this.sessionState.breaksTaken,
      userResponses: this.sessionState.userResponses,
      finalScore: this.state.score
    };
  }

  /**
   * Get current instructions
   */
  getCurrentInstructions() {
    const segment = this.sessionState.segments[this.sessionState.currentSegment];
    return segment?.instructions || this.instructions;
  }

  /**
   * Check if session requires user interaction
   */
  requiresInteraction() {
    return this.sessionConfig.requiresCompletion;
  }

  /**
   * Auto-complete if configured
   */
  checkAutoComplete() {
    if (this.sessionConfig.autoComplete && this.getRemainingTime() <= 0) {
      this.complete();
      return true;
    }
    return false;
  }
}

export default NonInteractiveDrillEngine;