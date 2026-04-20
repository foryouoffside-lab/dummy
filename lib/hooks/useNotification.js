// lib/hooks/useNotification.js

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

/**
 * Custom hook for notification management
 */
export function useNotification(options = {}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1
  });
  
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!session?.user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const url = `/api/notifications?page=${page}&limit=20${unreadOnly ? '&unreadOnly=true' : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
        setPagination({
          total: data.pagination?.total || 0,
          page: data.pagination?.page || 1,
          limit: data.pagination?.limit || 20,
          totalPages: data.pagination?.totalPages || 1
        });
      } else {
        setError(data.error || 'Failed to fetch notifications');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session, page, unreadOnly]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      const response = await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId })
      });
      
      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
        return true;
      }
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
    return false;
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      const response = await fetch('/api/notifications', { method: 'PUT' });
      
      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => ({ ...n, read: true }))
        );
        setUnreadCount(0);
        return true;
      }
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
    return false;
  }, []);

  const deleteNotification = useCallback(async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications?id=${notificationId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        const deleted = notifications.find(n => n.id === notificationId);
        if (deleted && !deleted.read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
        return true;
      }
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
    return false;
  }, [notifications]);

  const deleteAllNotifications = useCallback(async () => {
    try {
      const response = await fetch('/api/notifications', { method: 'DELETE' });
      
      if (response.ok) {
        setNotifications([]);
        setUnreadCount(0);
        return true;
      }
    } catch (err) {
      console.error('Failed to delete all notifications:', err);
    }
    return false;
  }, []);

  const addNotification = useCallback(async (notification) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notification)
      });
      
      if (response.ok) {
        await fetchNotifications();
        return true;
      }
    } catch (err) {
      console.error('Failed to add notification:', err);
    }
    return false;
  }, [fetchNotifications]);

  const getUnreadNotifications = useCallback(() => {
    return notifications.filter(n => !n.read);
  }, [notifications]);

  const getNotificationsByType = useCallback((type) => {
    return notifications.filter(n => n.type === type);
  }, [notifications]);

  const hasUnread = useCallback(() => {
    return unreadCount > 0;
  }, [unreadCount]);

  return {
    notifications,
    unreadCount,
    pagination,
    loading,
    error,
    page,
    unreadOnly,
    setPage,
    setUnreadOnly,
    refresh: fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    addNotification,
    getUnreadNotifications,
    getNotificationsByType,
    hasUnread
  };
}

export default useNotification;