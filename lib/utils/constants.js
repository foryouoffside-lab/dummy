// lib/utils/constants.js

/**
 * Application Constants
 * Centralized constants for the entire application
 */

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    SESSION: '/api/auth/session',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email'
  },
  USER: {
    PROFILE: '/api/user/profile',
    STATS: '/api/user/stats',
    ACHIEVEMENTS: '/api/user/achievements',
    PROGRESS: '/api/user/progress',
    SESSIONS: '/api/user/sessions',
    ANALYTICS: '/api/user/analytics',
    UPLOAD_AVATAR: '/api/user/upload-avatar',
    DELETE_AVATAR: '/api/user/delete-avatar'
  },
  DRILLS: {
    BASE: '/api/drills',
    CATEGORIES: '/api/drills/categories',
    SEARCH: '/api/drills/search',
    SUBMIT: '/api/drills/submit'
  },
  LEADERBOARD: {
    GLOBAL: '/api/leaderboard/global',
    DRILL: '/api/leaderboard/drill'
  },
  SUBSCRIPTION: {
    PLANS: '/api/subscription/plans',
    CHECKOUT: '/api/subscription/checkout',
    WEBHOOK: '/api/subscription/webhook'
  },
  NOTIFICATIONS: {
    BASE: '/api/notifications',
    MARK_READ: '/api/notifications/mark-read'
  }
};

// Drill Categories
export const DRILL_CATEGORIES = {
  MEMORY: 'memory',
  COGNITIVE: 'cognitive',
  VISUAL: 'visual',
  MOTOR: 'motor',
  ACADEMIC: 'academic',
  PRODUCTIVITY: 'productivity',
  MENTAL_FITNESS: 'mental-fitness',
  PHYSICAL: 'physical'
};

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: { id: 'beginner', name: 'Beginner', level: 1, multiplier: 0.5, color: 'text-green-600', bg: 'bg-green-100' },
  EASY: { id: 'easy', name: 'Easy', level: 1, multiplier: 0.6, color: 'text-green-600', bg: 'bg-green-100' },
  INTERMEDIATE: { id: 'intermediate', name: 'Intermediate', level: 2, multiplier: 1.0, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  MEDIUM: { id: 'medium', name: 'Medium', level: 2, multiplier: 1.0, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  ADVANCED: { id: 'advanced', name: 'Advanced', level: 3, multiplier: 1.3, color: 'text-orange-600', bg: 'bg-orange-100' },
  HARD: { id: 'hard', name: 'Hard', level: 3, multiplier: 1.3, color: 'text-orange-600', bg: 'bg-orange-100' },
  EXPERT: { id: 'expert', name: 'Expert', level: 4, multiplier: 1.5, color: 'text-red-600', bg: 'bg-red-100' }
};

// Time Constants (in milliseconds)
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000
};

// Score Thresholds
export const SCORE_THRESHOLDS = {
  PERFECT: 100,
  EXCELLENT: 90,
  GOOD: 75,
  FAIR: 60,
  POOR: 40,
  VERY_POOR: 25
};

// XP Levels
export const XP_LEVELS = {
  BASE_XP: 1000,
  MAX_LEVEL: 100,
  XP_PER_LEVEL: 1000
};

// Achievement Types
export const ACHIEVEMENT_TYPES = {
  SESSIONS: 'sessions',
  ACCURACY: 'accuracy',
  STREAK: 'streak',
  XP: 'xp',
  PERFECT_SCORE: 'perfect_score',
  SPEED: 'speed'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  ACHIEVEMENT: 'achievement',
  CHALLENGE: 'challenge',
  SUBSCRIPTION: 'subscription'
};

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  FREE: { id: 'free', name: 'Free', price: 0, interval: 'month' },
  PRO: { id: 'pro', name: 'Pro', price: 9.99, interval: 'month' },
  PREMIUM: { id: 'premium', name: 'Premium', price: 19.99, interval: 'month' },
  PRO_YEARLY: { id: 'pro_yearly', name: 'Pro Yearly', price: 99.99, interval: 'year' }
};

// File Upload Limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  MAX_AVATAR_DIMENSION: 500 // pixels
};

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100
};

// Cache Keys
export const CACHE_KEYS = {
  USER_STATS: 'user_stats',
  LEADERBOARD: 'leaderboard',
  DRILLS: 'drills',
  ACHIEVEMENTS: 'achievements',
  USER_PROFILE: 'user_profile'
};

// Cache Durations (in seconds)
export const CACHE_DURATIONS = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400 // 24 hours
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  EMAIL_EXISTS: 'An account with this email already exists.',
  USERNAME_EXISTS: 'Username is already taken.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload an image.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Logged in successfully!',
  REGISTER: 'Account created successfully!',
  LOGOUT: 'Logged out successfully.',
  PROFILE_UPDATE: 'Profile updated successfully!',
  AVATAR_UPLOAD: 'Avatar uploaded successfully!',
  AVATAR_DELETE: 'Avatar removed successfully!',
  PASSWORD_RESET: 'Password reset successfully!',
  SUBSCRIPTION_CANCEL: 'Subscription cancelled successfully.'
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DRILLS: '/drills',
  ANALYTICS: '/analytics',
  LEADERBOARD: '/leaderboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  PRICING: '/pricing',
  HELP: '/help',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  TOKEN: 'token',
  USER: 'user',
  REDIRECT_AFTER_LOGIN: 'redirectAfterLogin',
  RECENT_SEARCHES: 'recentSearches',
  NOTIFICATION_PREFS: 'notificationPrefs'
};

// Date Formats
export const DATE_FORMATS = {
  FULL: 'MMMM Do, YYYY',
  SHORT: 'MMM D, YYYY',
  TIME: 'h:mm A',
  DATETIME: 'MMM D, YYYY h:mm A',
  RELATIVE: 'relative'
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#8B5CF6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  DANGER: '#EF4444',
  INFO: '#06B6D4',
  PURPLE: '#8B5CF6',
  PINK: '#EC4899',
  INDIGO: '#6366F1'
};

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
};

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

export default {
  API_ENDPOINTS,
  DRILL_CATEGORIES,
  DIFFICULTY_LEVELS,
  TIME,
  SCORE_THRESHOLDS,
  XP_LEVELS,
  ACHIEVEMENT_TYPES,
  NOTIFICATION_TYPES,
  SUBSCRIPTION_PLANS,
  UPLOAD_LIMITS,
  PAGINATION,
  CACHE_KEYS,
  CACHE_DURATIONS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ROUTES,
  STORAGE_KEYS,
  DATE_FORMATS,
  CHART_COLORS,
  ANIMATION,
  BREAKPOINTS
};