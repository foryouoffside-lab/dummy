// lib/taxonomy/drillTags.js

/**
 * Drill Tags Taxonomy
 * Defines tags for filtering and categorizing drills
 */

export const DRILL_TAGS = {
  // Memory Tags
  SHORT_TERM_MEMORY: {
    id: 'short-term-memory',
    name: 'Short-term Memory',
    category: 'memory',
    icon: '🔢',
    description: 'Memory that holds information for brief periods'
  },
  WORKING_MEMORY: {
    id: 'working-memory',
    name: 'Working Memory',
    category: 'memory',
    icon: '🧠',
    description: 'Memory used for manipulation and processing'
  },
  VISUAL_MEMORY: {
    id: 'visual-memory',
    name: 'Visual Memory',
    category: 'memory',
    icon: '👁️',
    description: 'Memory for visual information'
  },
  LONG_TERM_MEMORY: {
    id: 'long-term-memory',
    name: 'Long-term Memory',
    category: 'memory',
    icon: '📚',
    description: 'Memory for stored knowledge'
  },
  
  // Cognitive Tags
  ATTENTION: {
    id: 'attention',
    name: 'Attention',
    category: 'cognitive',
    icon: '🎯',
    description: 'Ability to focus on relevant information'
  },
  SUSTAINED_ATTENTION: {
    id: 'sustained-attention',
    name: 'Sustained Attention',
    category: 'cognitive',
    icon: '⏱️',
    description: 'Maintaining focus over time'
  },
  SELECTIVE_ATTENTION: {
    id: 'selective-attention',
    name: 'Selective Attention',
    category: 'cognitive',
    icon: '🔍',
    description: 'Focusing on relevant stimuli while ignoring distractions'
  },
  DIVIDED_ATTENTION: {
    id: 'divided-attention',
    name: 'Divided Attention',
    category: 'cognitive',
    icon: '🔄',
    description: 'Processing multiple streams of information'
  },
  FOCUS: {
    id: 'focus',
    name: 'Focus',
    category: 'cognitive',
    icon: '🎯',
    description: 'Concentration on a single task'
  },
  PROCESSING_SPEED: {
    id: 'processing-speed',
    name: 'Processing Speed',
    category: 'cognitive',
    icon: '⚡',
    description: 'Speed of mental processing'
  },
  PROBLEM_SOLVING: {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'cognitive',
    icon: '🧩',
    description: 'Ability to solve complex problems'
  },
  DECISION_MAKING: {
    id: 'decision-making',
    name: 'Decision Making',
    category: 'cognitive',
    icon: '⚖️',
    description: 'Making optimal choices'
  },
  
  // Visual Tags
  REACTION_SPEED: {
    id: 'reaction-speed',
    name: 'Reaction Speed',
    category: 'visual',
    icon: '⚡',
    description: 'Speed of response to visual stimuli'
  },
  TRACKING_ACCURACY: {
    id: 'tracking-accuracy',
    name: 'Tracking Accuracy',
    category: 'visual',
    icon: '🎯',
    description: 'Accuracy in following moving objects'
  },
  PERIPHERAL_VISION: {
    id: 'peripheral-vision',
    name: 'Peripheral Vision',
    category: 'visual',
    icon: '👁️',
    description: 'Awareness of surroundings'
  },
  VISUAL_RECOGNITION: {
    id: 'visual-recognition',
    name: 'Visual Recognition',
    category: 'visual',
    icon: '🔍',
    description: 'Identifying objects and patterns'
  },
  DEPTH_PERCEPTION: {
    id: 'depth-perception',
    name: 'Depth Perception',
    category: 'visual',
    icon: '📏',
    description: 'Judging distances and spatial relationships'
  },
  
  // Motor Tags
  HAND_EYE_COORDINATION: {
    id: 'hand-eye-coordination',
    name: 'Hand-Eye Coordination',
    category: 'motor',
    icon: '✋',
    description: 'Synchronization of visual input with hand movements'
  },
  TIMING_ACCURACY: {
    id: 'timing-accuracy',
    name: 'Timing Accuracy',
    category: 'motor',
    icon: '⏰',
    description: 'Precision in timing of movements'
  },
  PRECISION_CONTROL: {
    id: 'precision-control',
    name: 'Precision Control',
    category: 'motor',
    icon: '🎯',
    description: 'Fine motor control and accuracy'
  },
  MOVEMENT_SPEED: {
    id: 'movement-speed',
    name: 'Movement Speed',
    category: 'motor',
    icon: '🏃',
    description: 'Speed of physical responses'
  },
  
  // Academic Tags
  MATH_SPEED: {
    id: 'math-speed',
    name: 'Math Speed',
    category: 'academic',
    icon: '➕',
    description: 'Speed in mathematical calculations'
  },
  READING_SPEED: {
    id: 'reading-speed',
    name: 'Reading Speed',
    category: 'academic',
    icon: '📖',
    description: 'Words per minute reading rate'
  },
  WRITING_SPEED: {
    id: 'writing-speed',
    name: 'Writing Speed',
    category: 'academic',
    icon: '✍️',
    description: 'Typing or handwriting speed'
  },
  COMPREHENSION: {
    id: 'comprehension',
    name: 'Comprehension',
    category: 'academic',
    icon: '📚',
    description: 'Understanding of read material'
  },
  
  // Productivity Tags
  TASK_SWITCHING: {
    id: 'task-switching',
    name: 'Task Switching',
    category: 'productivity',
    icon: '🔄',
    description: 'Efficiency in switching between tasks'
  },
  TIME_MANAGEMENT: {
    id: 'time-management',
    name: 'Time Management',
    category: 'productivity',
    icon: '⏰',
    description: 'Effective use of time'
  },
  FOCUS_ENDURANCE: {
    id: 'focus-endurance',
    name: 'Focus Endurance',
    category: 'productivity',
    icon: '💪',
    description: 'Ability to maintain focus over long periods'
  },
  WORK_EFFICIENCY: {
    id: 'work-efficiency',
    name: 'Work Efficiency',
    category: 'productivity',
    icon: '⚡',
    description: 'Output per unit of effort'
  },
  
  // Mental Fitness Tags
  STRESS_CONTROL: {
    id: 'stress-control',
    name: 'Stress Control',
    category: 'mental-fitness',
    icon: '😌',
    description: 'Managing and reducing stress'
  },
  MINDFULNESS: {
    id: 'mindfulness',
    name: 'Mindfulness',
    category: 'mental-fitness',
    icon: '🧘',
    description: 'Present moment awareness'
  },
  MEDITATION: {
    id: 'meditation',
    name: 'Meditation',
    category: 'mental-fitness',
    icon: '🕉️',
    description: 'Focused mental practice'
  },
  BREATHING_EXERCISES: {
    id: 'breathing-exercises',
    name: 'Breathing Exercises',
    category: 'mental-fitness',
    icon: '🌬️',
    description: 'Controlled breathing techniques'
  },
  
  // Physical Tags
  BALANCE_TRAINING: {
    id: 'balance-training',
    name: 'Balance Training',
    category: 'physical',
    icon: '⚖️',
    description: 'Maintaining stability'
  },
  REFLEX_TRAINING: {
    id: 'reflex-training',
    name: 'Reflex Training',
    category: 'physical',
    icon: '⚡',
    description: 'Quick physical responses'
  },
  COORDINATION: {
    id: 'coordination',
    name: 'Coordination',
    category: 'physical',
    icon: '🔄',
    description: 'Body movement coordination'
  },
  FITNESS: {
    id: 'fitness',
    name: 'Fitness',
    category: 'physical',
    icon: '💪',
    description: 'Physical conditioning'
  },
  
  // Difficulty Tags
  BEGINNER: {
    id: 'beginner',
    name: 'Beginner',
    category: 'difficulty',
    icon: '🌱',
    level: 1
  },
  INTERMEDIATE: {
    id: 'intermediate',
    name: 'Intermediate',
    category: 'difficulty',
    icon: '⚡',
    level: 2
  },
  ADVANCED: {
    id: 'advanced',
    name: 'Advanced',
    category: 'difficulty',
    icon: '🔥',
    level: 3
  },
  EXPERT: {
    id: 'expert',
    name: 'Expert',
    category: 'difficulty',
    icon: '💎',
    level: 4
  },
  
  // Special Tags
  POPULAR: {
    id: 'popular',
    name: 'Popular',
    category: 'special',
    icon: '⭐'
  },
  NEW: {
    id: 'new',
    name: 'New',
    category: 'special',
    icon: '🆕'
  },
  FEATURED: {
    id: 'featured',
    name: 'Featured',
    category: 'special',
    icon: '🏆'
  },
  RECOMMENDED: {
    id: 'recommended',
    name: 'Recommended',
    category: 'special',
    icon: '👍'
  }
};

/**
 * Get tag by ID
 */
export function getTagById(tagId) {
  return DRILL_TAGS[tagId.toUpperCase().replace(/-/g, '_')] || null;
}

/**
 * Get tags by category
 */
export function getTagsByCategory(category) {
  return Object.values(DRILL_TAGS).filter(tag => tag.category === category);
}

/**
 * Get tags for a specific drill type
 */
export function getTagsForDrillType(drillType) {
  const tagMap = {
    memory: ['short-term-memory', 'working-memory', 'visual-memory', 'long-term-memory'],
    cognitive: ['attention', 'focus', 'processing-speed', 'problem-solving', 'decision-making'],
    visual: ['reaction-speed', 'tracking-accuracy', 'peripheral-vision', 'visual-recognition', 'depth-perception'],
    motor: ['hand-eye-coordination', 'timing-accuracy', 'precision-control', 'movement-speed'],
    academic: ['math-speed', 'reading-speed', 'writing-speed', 'comprehension'],
    productivity: ['task-switching', 'time-management', 'focus-endurance', 'work-efficiency'],
    'mental-fitness': ['stress-control', 'mindfulness', 'meditation', 'breathing-exercises'],
    physical: ['balance-training', 'reflex-training', 'coordination', 'fitness']
  };
  
  const tagIds = tagMap[drillType] || [];
  return tagIds.map(id => getTagById(id)).filter(Boolean);
}

/**
 * Get difficulty tags
 */
export function getDifficultyTags() {
  return getTagsByCategory('difficulty');
}

/**
 * Get special tags (popular, new, featured, recommended)
 */
export function getSpecialTags() {
  return getTagsByCategory('special');
}

/**
 * Get tag icon
 */
export function getTagIcon(tagId) {
  const tag = getTagById(tagId);
  return tag?.icon || '🏷️';
}

/**
 * Get tag name
 */
export function getTagName(tagId) {
  const tag = getTagById(tagId);
  return tag?.name || tagId;
}

/**
 * Validate if tag exists
 */
export function isValidTag(tagId) {
  return !!getTagById(tagId);
}

/**
 * Get all tags as array
 */
export function getAllTags() {
  return Object.values(DRILL_TAGS);
}

export default DRILL_TAGS;