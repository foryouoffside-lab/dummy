// lib/hooks/useAnalytics.js

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

/**
 * Custom hook for analytics data fetching and management
 */
export function useAnalytics(options = {}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    performanceHistory: [],
    categoryScores: [],
    metrics: {},
    summary: {}
  });
  
  const [range, setRange] = useState(options.initialRange || 'weekly');
  const [category, setCategory] = useState(options.initialCategory || 'all');

  const fetchAnalytics = useCallback(async () => {
    if (!session?.user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/user/analytics?range=${range}&category=${category}`);
      const result = await response.json();
      
      if (response.ok) {
        setData({
          performanceHistory: result.performanceHistory || [],
          categoryScores: result.categoryScores || [],
          metrics: result.metrics || {},
          summary: result.summary || {}
        });
      } else {
        setError(result.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session, range, category]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const refresh = useCallback(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const getPerformanceTrend = useCallback(() => {
    const history = data.performanceHistory;
    if (history.length < 2) return 'stable';
    
    const firstHalf = history.slice(0, Math.floor(history.length / 2));
    const secondHalf = history.slice(Math.floor(history.length / 2));
    const firstAvg = firstHalf.reduce((sum, d) => sum + d.score, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, d) => sum + d.score, 0) / secondHalf.length;
    
    if (secondAvg > firstAvg + 5) return 'improving';
    if (secondAvg < firstAvg - 5) return 'declining';
    return 'stable';
  }, [data.performanceHistory]);

  const getBestCategory = useCallback(() => {
    if (!data.categoryScores.length) return null;
    return data.categoryScores.reduce((best, current) => 
      current.score > best.score ? current : best, data.categoryScores[0]);
  }, [data.categoryScores]);

  const getWeakestCategory = useCallback(() => {
    if (!data.categoryScores.length) return null;
    return data.categoryScores.reduce((worst, current) => 
      current.score < worst.score ? current : worst, data.categoryScores[0]);
  }, [data.categoryScores]);

  const getCategoryScore = useCallback((categoryName) => {
    const categoryData = data.categoryScores.find(c => 
      c.category.toLowerCase() === categoryName.toLowerCase()
    );
    return categoryData?.score || 0;
  }, [data.categoryScores]);

  const getAverageScore = useCallback(() => {
    if (!data.performanceHistory.length) return 0;
    const sum = data.performanceHistory.reduce((total, day) => total + day.score, 0);
    return Math.round(sum / data.performanceHistory.length);
  }, [data.performanceHistory]);

  const getTotalSessions = useCallback(() => {
    return data.summary?.totalSessions || 0;
  }, [data.summary]);

  const getTotalTimeSpent = useCallback(() => {
    return data.summary?.totalTimeSpent || 0;
  }, [data.summary]);

  const getImprovementRate = useCallback(() => {
    const history = data.performanceHistory;
    if (history.length < 7) return 0;
    
    const firstWeek = history.slice(0, 7);
    const lastWeek = history.slice(-7);
    const firstAvg = firstWeek.reduce((sum, d) => sum + d.score, 0) / firstWeek.length;
    const lastAvg = lastWeek.reduce((sum, d) => sum + d.score, 0) / lastWeek.length;
    
    return Math.round(((lastAvg - firstAvg) / firstAvg) * 100);
  }, [data.performanceHistory]);

  return {
    data,
    loading,
    error,
    range,
    category,
    setRange,
    setCategory,
    refresh,
    getPerformanceTrend,
    getBestCategory,
    getWeakestCategory,
    getCategoryScore,
    getAverageScore,
    getTotalSessions,
    getTotalTimeSpent,
    getImprovementRate
  };
}

export default useAnalytics;