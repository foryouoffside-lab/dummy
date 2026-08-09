'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  calculateTotalPoints,
  calculateEndGameBonuses,
  getScoreRating,
  isValidReactionTime,
  DRIFFICULTY_CONFIG,
} from './scoringEngine';
import {
  saveLeaderboardEntry,
  getPlayerName,
  getPersonalBest,
  getDrillLeaderboard,
  generateChallengeUrl,
  generateShareScoreText,
} from './leaderboard';
import generateShareCard, { shareScoreCard } from '../components/ShareScoreCard';

/**
 * Shared game engine hook for all SkillDrills
 * Standardizes: game state, scoring, timers, sharing, leaderboard, achievements
 */
export default function useGameEngine({
  category = 'cognitive',
  drillId = 'drill',
  drillName = 'Drill',
  totalGameTime = 60,
  sharePath = null,
}) {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(totalGameTime);
  const [lives, setLives] = useState(5);
  const [missedCount, setMissedCount] = useState(0);
  const [totalActions, setTotalActions] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [rating, setRating] = useState(null);
  const [newBest, setNewBest] = useState(false);

  const accuracy = totalActions === 0 ? 100 : Math.round(((totalActions - missedCount) / totalActions) * 100);

  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const livesRef = useRef(5);
  const missedCountRef = useRef(0);
  const totalActionsRef = useRef(0);
  const timerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const lastActionTimeRef = useRef(null);
  const config = DRIFFICULTY_CONFIG[category] || DRIFFICULTY_CONFIG.cognitive;
  const bestScoreRef = useRef(0); // sync localStorage best score

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { livesRef.current = lives; }, [lives]);

  // Load best score on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`${drillId}BestScore`);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed)) {
          setBestScore(parsed);
          bestScoreRef.current = parsed;
        }
      }
    } catch (e) {}
  }, [drillId]);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  }, []);

  const playSound = useCallback((type) => {
    try {
      const a = new (window.AudioContext || window.webkitAudioContext)();
      if (a.state === 'suspended') a.resume();
      const o = a.createOscillator();
      const g = a.createGain();
      o.connect(g);
      g.connect(a.destination);
      const n = a.currentTime;
      const fm = { correct: 880, wrong: 440, penalty: 220, newBest: 1318.5 };
      const vol = { correct: 0.1, wrong: 0.12, penalty: 0.15, newBest: 0.15 };
      o.frequency.setValueAtTime(fm[type] || 660, n);
      g.gain.setValueAtTime(vol[type] || 0.1, n);
      g.gain.exponentialRampToValueAtTime(0.001, n + 0.15);
      o.start(n);
      o.stop(n + 0.15);
      setTimeout(() => { a.close(); }, 200);
    } catch (e) {}
  }, []);

  const recordCorrectAction = useCallback(({
    reactionTimeMs = null,
    livesRemaining = null,
  } = {}) => {
    if (gameStateRef.current !== 'playing') return { total: 0 };
    
    if (reactionTimeMs !== null && !isValidReactionTime(reactionTimeMs)) {
      reactionTimeMs = null;
    }

    const points = calculateTotalPoints({
      category,
      reactionTimeMs,
      livesRemaining: livesRemaining ?? livesRef.current,
      maxLives: config.maxLives || 5,
      timeRemaining,
      totalGameTime,
    });

    const pointsToAdd = points.total;
    scoreRef.current += pointsToAdd;
    setScore(scoreRef.current);

    totalActionsRef.current++;
    setTotalActions(totalActionsRef.current);

    lastActionTimeRef.current = Date.now();

    playSound('correct');
    let msg = `✓ +${pointsToAdd}`;
    if (points.speedBonus > 0) msg += ` (⚡+${points.speedBonus})`;
    showFeedback(msg, 'success');

    return points;
  }, [category, timeRemaining, totalGameTime, config.maxLives, playSound, showFeedback]);

  const recordMiss = useCallback((reason = 'Miss') => {
    if (gameStateRef.current !== 'playing') return;

    missedCountRef.current++;
    setMissedCount(missedCountRef.current);
    totalActionsRef.current++;
    setTotalActions(totalActionsRef.current);

    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('wrong');
      showFeedback(`✗ ${reason} -1 life`, 'error');
    } else {
      // Out of lives already — no further score or time penalty, matching
      // every other drill's zero-penalty-on-miss rule.
      playSound('penalty');
      showFeedback(`✗ ${reason}`, 'error');
    }
  }, [playSound, showFeedback]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // === End Game: saves best score IMMEDIATELY (synchronous localStorage) ===
  const endGame = useCallback(() => {
    if (gameStateRef.current === 'ended') return;
    gameStateRef.current = 'ended';
    setGameState('ended');
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    
    const endBonus = calculateEndGameBonuses({
      category,
      totalScore: scoreRef.current,
      accuracy,
      livesRemaining: livesRef.current,
      maxLives: config.maxLives || 5,
    });
    
    const finalScore = endBonus.finalScore;
    scoreRef.current = finalScore;
    setScore(finalScore);
    
    const rating = getScoreRating(accuracy);
    setRating(rating);
    
    // ★ IMMEDIATE best score save (synchronous, no useEffect race condition) ★
    try {
      const storedKey = `${drillId}BestScore`;
      const stored = localStorage.getItem(storedKey);
      const currentBest = stored ? parseInt(stored, 10) || 0 : 0;
      
      if (finalScore > currentBest) {
        localStorage.setItem(storedKey, finalScore.toString());
        setBestScore(finalScore);
        bestScoreRef.current = finalScore;
        if (currentBest > 0) setNewBest(true);
      } else if (currentBest === 0 && finalScore > 0) {
        // First score ever → save it
        localStorage.setItem(storedKey, finalScore.toString());
        setBestScore(finalScore);
        bestScoreRef.current = finalScore;
      } else {
        // Ensure bestScore state matches localStorage
        setBestScore(currentBest);
        bestScoreRef.current = currentBest;
      }
    } catch (e) {}
    
    try {
      saveLeaderboardEntry({
        drillId,
        drillName,
        category,
        score: finalScore,
        accuracy,
        livesRemaining: livesRef.current,
        finalScore,
      });
    } catch (e) {}
    
    playSound('newBest');
    showFeedback(`🏆 Final: ${finalScore} pts (${rating.letter})`, 'success');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, accuracy, totalGameTime, config.maxLives, playSound, showFeedback, drillId, drillName]);

  const startGame = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    
    scoreRef.current = 0;
    livesRef.current = config.maxLives || 5;
    missedCountRef.current = 0;
    totalActionsRef.current = 0;
    lastActionTimeRef.current = null;

    setScore(0);
    setLives(config.maxLives || 5);
    setTimeRemaining(totalGameTime);
    setMissedCount(0);
    setTotalActions(0);
    setFeedback('');
    setRating(null);
    setNewBest(false);

    gameStateRef.current = 'playing';
    setGameState('playing');
    playSound('correct');
  }, [totalGameTime, config.maxLives, playSound]);

  const resetGame = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (feedbackTimeoutRef.current) { clearTimeout(feedbackTimeoutRef.current); }
    
    scoreRef.current = 0;
    livesRef.current = config.maxLives || 5;
    missedCountRef.current = 0;
    totalActionsRef.current = 0;

    gameStateRef.current = 'start';
    setGameState('start');
    setScore(0);
    setLives(config.maxLives || 5);
    setTimeRemaining(totalGameTime);
    setMissedCount(0);
    setTotalActions(0);
    setFeedback('');
    setRating(null);
    setNewBest(false);
  }, [totalGameTime, config.maxLives]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  const shareScore = useCallback(async () => {
    const playerName = getPlayerName();
    const text = generateShareScoreText({
      drillName,
      score,
      playerName,
      rankName: rating?.label || 'N/A',
      rankIcon: rating?.emoji || '🎯',
      accuracy,
      bestScore,
    });
    
    const challengeUrl = generateChallengeUrl({
      drillId,
      drillName,
      score,
      playerName,
      category,
      rankName: rating?.label || 'N/A',
      customPath: sharePath || `drills/${category}/${drillId}`,
    });
    
    try {
      const canvas = generateShareCard({
        score,
        bestScore,
        accuracy,
        rating,
        newBest,
        drillName,
        playerName,
      });
      await shareScoreCard(challengeUrl, canvas);
      showFeedback('📸 Score card shared!', 'success');
    } catch (e) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${drillName} Score | SkillDrills`,
            text,
            url: challengeUrl,
          });
        } catch (err) {}
      } else {
        navigator.clipboard.writeText(challengeUrl);
        showFeedback('📋 Link copied!', 'success');
      }
    }
  }, [drillName, drillId, score, bestScore, accuracy, rating, newBest, category, showFeedback, sharePath]);

  const downloadScore = useCallback(async () => {
    try {
      const playerName = getPlayerName();
      const canvas = generateShareCard({
        score, bestScore, accuracy, rating, newBest, drillName, playerName,
      });
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Failed');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `skilldrills-${drillId}-score.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showFeedback('📥 Score card downloaded!', 'success');
    } catch (e) {
      showFeedback('Download failed', 'error');
    }
  }, [drillName, drillId, score, bestScore, accuracy, rating, newBest, showFeedback]);

  const copyScore = useCallback(() => {
    const text = `🎯 ${drillName}: ${score} pts | Accuracy: ${accuracy}% | Play free at skilldrills.online 🎮`;
    navigator.clipboard.writeText(text);
    showFeedback('📋 Copied!', 'success');
  }, [drillName, score, accuracy, showFeedback]);

  const getLeaderboardData = useCallback((limit = 10) => {
    return getDrillLeaderboard(drillId, limit);
  }, [drillId]);

  const getPersonalBestData = useCallback(() => {
    return getPersonalBest(drillId);
  }, [drillId]);

  return {
    gameState, score, bestScore,
    timeRemaining, lives, accuracy, missedCount, totalActions,
    feedback, feedbackType, rating, newBest, showLeaderboard,
    setShowLeaderboard,
    gameStateRef, scoreRef, livesRef, lastActionTimeRef,
    config, totalGameTime,
    startGame, resetGame, endGame,
    recordCorrectAction, recordMiss,
    shareScore, copyScore, downloadScore,
    getLeaderboardData, getPersonalBestData,
    showFeedback, playSound,
    setGameState, setScore, setLives,
  };
}