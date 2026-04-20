// lib/taxonomy/categories.js

/**
 * Drill Categories Taxonomy
 * Defines all main categories for the Global Drill System
 */

export const CATEGORIES = {
  MEMORY: {
    id: 'memory',
    name: 'Memory',
    slug: 'memory',
    icon: '🧠',
    description: 'Train your short-term, working, and long-term memory',
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    order: 1,
    isActive: true,
    subcategories: ['short-term', 'working', 'visual', 'long-term']
  },
  COGNITIVE: {
    id: 'cognitive',
    name: 'Cognitive',
    slug: 'cognitive',
    icon: '🧠',
    description: 'Improve attention, focus, processing speed, and problem-solving',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    order: 2,
    isActive: true,
    subcategories: ['attention', 'focus', 'processing', 'problem-solving', 'decision-making']
  },
  VISUAL: {
    id: 'visual',
    name: 'Visual',
    slug: 'visual',
    icon: '👁️',
    description: 'Enhance reaction speed, tracking accuracy, and visual recognition',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    order: 3,
    isActive: true,
    subcategories: ['reaction', 'tracking', 'peripheral', 'recognition', 'depth']
  },
  MOTOR: {
    id: 'motor',
    name: 'Motor',
    slug: 'motor',
    icon: '✋',
    description: 'Develop hand-eye coordination, timing, and precision control',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    order: 4,
    isActive: true,
    subcategories: ['coordination', 'timing', 'precision', 'speed']
  },
  ACADEMIC: {
    id: 'academic',
    name: 'Academic',
    slug: 'academic',
    icon: '📚',
    description: 'Boost math, reading, writing, and comprehension skills',
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    order: 5,
    isActive: true,
    subcategories: ['math', 'reading', 'writing', 'comprehension']
  },
  PRODUCTIVITY: {
    id: 'productivity',
    name: 'Productivity',
    slug: 'productivity',
    icon: '⚡',
    description: 'Master task switching, time management, and work efficiency',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    order: 6,
    isActive: true,
    subcategories: ['switching', 'management', 'focus', 'efficiency']
  },
  MENTAL_FITNESS: {
    id: 'mental-fitness',
    name: 'Mental Fitness',
    slug: 'mental-fitness',
    icon: '🧘',
    description: 'Practice stress control, mindfulness, and meditation',
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    order: 7,
    isActive: true,
    subcategories: ['stress', 'mindfulness', 'meditation', 'breathing']
  },
  PHYSICAL: {
    id: 'physical',
    name: 'Physical',
    slug: 'physical',
    icon: '💪',
    description: 'Improve balance, reflexes, coordination, and fitness',
    color: 'from-red-500 to-orange-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    order: 8,
    isActive: true,
    subcategories: ['balance', 'reflex', 'coordination', 'fitness']
  }
};

/**
 * Get category by ID
 */
export function getCategoryById(categoryId) {
  return Object.values(CATEGORIES).find(cat => cat.id === categoryId) || null;
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug) {
  return Object.values(CATEGORIES).find(cat => cat.slug === slug) || null;
}

/**
 * Get all active categories
 */
export function getActiveCategories() {
  return Object.values(CATEGORIES).filter(cat => cat.isActive);
}

/**
 * Get categories sorted by order
 */
export function getSortedCategories() {
  return Object.values(CATEGORIES).sort((a, b) => a.order - b.order);
}

/**
 * Get category icon by ID
 */
export function getCategoryIcon(categoryId) {
  const category = getCategoryById(categoryId);
  return category?.icon || '🎯';
}

/**
 * Get category color by ID
 */
export function getCategoryColor(categoryId) {
  const category = getCategoryById(categoryId);
  return {
    gradient: category?.color || 'from-gray-500 to-gray-600',
    bg: category?.bgColor || 'bg-gray-50',
    text: category?.textColor || 'text-gray-600'
  };
}

/**
 * Validate if category exists
 */
export function isValidCategory(categoryId) {
  return !!getCategoryById(categoryId);
}

/**
 * Get category count
 */
export function getCategoryCount() {
  return Object.keys(CATEGORIES).length;
}

/**
 * Get category navigation items
 */
export function getCategoryNavItems() {
  return getSortedCategories().map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    icon: cat.icon,
    href: `/drills/${cat.slug}`
  }));
}

export default CATEGORIES;