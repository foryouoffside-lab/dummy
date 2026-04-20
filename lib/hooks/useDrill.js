// lib/hooks/useDrill.js

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/**
 * Custom hook for drill management and execution
 */
export function useDrill(drillId, options = {}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drill, setDrill] = useState(null);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState(null);
  
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Fetch drill data
  useEffect(() => {
    if (drillId) {
      fetchDrill();
    }
  }, [drillId]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const fetchDrill = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/drills/${drillId}`);
      const data = await response.json();
      
      if (response.ok) {
        setDrill(data.drill);
        setTimeLeft(data.drill.duration * 60);
        setProgress(0);
        setScore(0);
        setAccuracy(0);
        setIsActive(false);
        setIsPaused(false);
        setIsComplete(false);
      } else {
        setError(data.error || 'Failed to load drill');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startDrill = useCallback(() => {
    if (!drill) return;
    
    setIsActive(true);
    setIsPaused(false);
    startTimeRef.current = Date.now();
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          completeDrill();
          return 0;
        }
        return prev - 1;
      });
      
      // Update progress
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const totalDuration = drill.duration * 60;
      setProgress(Math.min(100, (elapsed / totalDuration) * 100));
    }, 1000);
  }, [drill]);

  const pauseDrill = useCallback(() => {
    if (!isActive || isPaused) return;
    
    setIsPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [isActive, isPaused]);

  const resumeDrill = useCallback(() => {
    if (!isActive || !isPaused) return;
    
    setIsPaused(false);
    // Restart timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          completeDrill();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isActive, isPaused]);

  const updateScore = useCallback((newScore) => {
    setScore(prev => Math.min(100, Math.max(0, prev + newScore)));
  }, []);

  const updateAccuracy = useCallback((newAccuracy) => {
    setAccuracy(prev => Math.min(100, Math.max(0, (prev + newAccuracy) / 2)));
  }, []);

  const completeDrill = useCallback(async (finalScore = null, finalAccuracy = null) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsActive(false);
    setIsComplete(true);
    
    const finalScoreValue = finalScore !== null ? finalScore : score;
    const finalAccuracyValue = finalAccuracy !== null ? finalAccuracy : accuracy;
    const timeSpent = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;
    
    // Save results
    const resultData = {
      score: finalScoreValue,
      accuracy: finalAccuracyValue,
      duration: Math.round(timeSpent),
      completedAt: new Date().toISOString()
    };
    
    setResults(resultData);
    
    // Submit to API if user is logged in
    if (session?.user?.id && drill) {
      try {
        const response = await fetch(`/api/drills/${drillId}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            score: finalScoreValue,
            accuracy: finalAccuracyValue,
            duration: Math.round(timeSpent),
            drillName: drill.name,
            category: drill.category
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setResults(prev => ({ ...prev, xpEarned: data.xpEarned, achievements: data.achievements }));
        }
      } catch (err) {
        console.error('Failed to submit drill results:', err);
      }
    }
    
    return resultData;
  }, [drill, drillId, session, score, accuracy]);

  const resetDrill = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setTimeLeft(drill?.duration * 60 || 0);
    setProgress(0);
    setScore(0);
    setAccuracy(0);
    setIsActive(false);
    setIsPaused(false);
    setIsComplete(false);
    setResults(null);
    startTimeRef.current = null;
  }, [drill]);

  const retryDrill = useCallback(() => {
    resetDrill();
    startDrill();
  }, [resetDrill, startDrill]);

  const getTimeFormatted = useCallback(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  const getScoreColor = useCallback(() => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  }, [score]);

  const getAccuracyColor = useCallback(() => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 70) return 'text-blue-600';
    if (accuracy >= 50) return 'text-yellow-600';
    return 'text-red-600';
  }, [accuracy]);

  const isTimeRunningOut = useCallback(() => {
    return timeLeft <= 10 && timeLeft > 0;
  }, [timeLeft]);

  return {
    drill,
    loading,
    error,
    progress,
    score,
    accuracy,
    isActive,
    isPaused,
    isComplete,
    timeLeft,
    results,
    startDrill,
    pauseDrill,
    resumeDrill,
    completeDrill,
    resetDrill,
    retryDrill,
    updateScore,
    updateAccuracy,
    getTimeFormatted,
    getScoreColor,
    getAccuracyColor,
    isTimeRunningOut
  };
}

export default useDrill;