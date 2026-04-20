// lib/hooks/useLeaderboard.js

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

/**
 * Custom hook for leaderboard data fetching
 */
export function useLeaderboard(options = {}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 50,
    totalPages: 1
  });
  
  const [timeframe, setTimeframe] = useState(options.initialTimeframe || 'all');
  const [page, setPage] = useState(1);
  const [limit] = useState(options.limit || 50);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `/api/leaderboard/global?timeframe=${timeframe}&page=${page}&limit=${limit}${searchQuery ? `&search=${searchQuery}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setLeaderboard(data.leaderboard || []);
        setCurrentUserRank(data.currentUserRank);
        setStats(data.stats);
        setPagination({
          total: data.pagination?.total || 0,
          page: data.pagination?.page || 1,
          limit: data.pagination?.limit || limit,
          totalPages: data.pagination?.totalPages || 1
        });
      } else {
        setError(data.error || 'Failed to fetch leaderboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [timeframe, page, limit, searchQuery]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const refresh = useCallback(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const goToPage = useCallback((newPage) => {
    setPage(Math.max(1, Math.min(pagination.totalPages, newPage)));
  }, [pagination.totalPages]);

  const nextPage = useCallback(() => {
    if (page < pagination.totalPages) {
      setPage(page + 1);
    }
  }, [page, pagination.totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const getUserRank = useCallback((userId) => {
    const user = leaderboard.find(u => u.id === userId);
    return user?.rank || null;
  }, [leaderboard]);

  const getTopPerformers = useCallback((count = 10) => {
    return leaderboard.slice(0, count);
  }, [leaderboard]);

  const getUsersAroundRank = useCallback((rank, range = 5) => {
    const index = leaderboard.findIndex(u => u.rank === rank);
    if (index === -1) return [];
    
    const start = Math.max(0, index - range);
    const end = Math.min(leaderboard.length, index + range + 1);
    return leaderboard.slice(start, end);
  }, [leaderboard]);

  const getLeaderboardByCategory = useCallback(async (category) => {
    try {
      const response = await fetch(`/api/leaderboard/category/${category}?timeframe=${timeframe}`);
      const data = await response.json();
      return data.leaderboard || [];
    } catch (err) {
      console.error('Failed to fetch category leaderboard:', err);
      return [];
    }
  }, [timeframe]);

  const getDrillLeaderboard = useCallback(async (drillId) => {
    try {
      const response = await fetch(`/api/leaderboard/drill/${drillId}?timeframe=${timeframe}`);
      const data = await response.json();
      return data.leaderboard || [];
    } catch (err) {
      console.error('Failed to fetch drill leaderboard:', err);
      return [];
    }
  }, [timeframe]);

  return {
    leaderboard,
    currentUserRank,
    stats,
    pagination,
    loading,
    error,
    timeframe,
    page,
    searchQuery,
    setTimeframe,
    setPage,
    setSearchQuery,
    refresh,
    goToPage,
    nextPage,
    prevPage,
    getUserRank,
    getTopPerformers,
    getUsersAroundRank,
    getLeaderboardByCategory,
    getDrillLeaderboard
  };
}

export default useLeaderboard;