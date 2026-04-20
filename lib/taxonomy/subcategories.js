// lib/taxonomy/subcategories.js

/**
 * Subcategories Taxonomy
 * Defines subcategories for each main category
 */

export const SUBCATEGORIES = {
  // Memory Subcategories
  SHORT_TERM_MEMORY: {
    id: 'short-term',
    name: 'Short-term Memory',
    category: 'memory',
    icon: '🔢',
    description: 'Holding information for brief periods',
    drills: ['memory-sequence', 'number-recall', 'pattern-recognition']
  },
  WORKING_MEMORY: {
    id: 'working',
    name: 'Working Memory',
    category: 'memory',
    icon: '🧠',
    description: 'Manipulating and processing information',
    drills: ['dual-task', 'n-back', 'operation-span']
  },
  VISUAL_MEMORY: {
    id: 'visual',
    name: 'Visual Memory',
    category: 'memory',
    icon: '👁️',
    description: 'Remembering visual information',
    drills: ['photo-recall', 'spatial-recall', 'card-matching']
  },
  LONG_TERM_MEMORY: {
    id: 'long-term',
    name: 'Long-term Memory',
    category: 'memory',
    icon: '📚',
    description: 'Storing and retrieving knowledge',
    drills: ['story-recall', 'fact-retention', 'association-chain']
  },
  
  // Cognitive Subcategories
  ATTENTION: {
    id: 'attention',
    name: 'Attention',
    category: 'cognitive',
    icon: '🎯',
    description: 'Focusing on relevant information',
    drills: ['sustained-attention', 'selective-attention', 'divided-attention']
  },
  FOCUS: {
    id: 'focus',
    name: 'Focus',
    category: 'cognitive',
    icon: '🎯',
    description: 'Concentrating on tasks',
    drills: ['focus-timer', 'distraction-fighter', 'concentration-grid']
  },
  PROCESSING: {
    id: 'processing',
    name: 'Processing Speed',
    category: 'cognitive',
    icon: '⚡',
    description: 'Speed of mental operations',
    drills: ['reaction-time', 'quick-math', 'symbol-matching']
  },
  PROBLEM_SOLVING: {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'cognitive',
    icon: '🧩',
    description: 'Solving complex problems',
    drills: ['tower-of-hanoi', 'sudoku', 'logic-puzzles']
  },
  DECISION_MAKING: {
    id: 'decision-making',
    name: 'Decision Making',
    category: 'cognitive',
    icon: '⚖️',
    description: 'Making optimal choices',
    drills: ['risk-assessment', 'strategic-choice']
  },
  
  // Visual Subcategories
  REACTION: {
    id: 'reaction',
    name: 'Reaction Speed',
    category: 'visual',
    icon: '⚡',
    description: 'Quick response to stimuli',
    drills: ['light-reaction', 'sound-reaction', 'go-no-go']
  },
  TRACKING: {
    id: 'tracking',
    name: 'Tracking Accuracy',
    category: 'visual',
    icon: '🎯',
    description: 'Following moving objects',
    drills: ['moving-target', 'pursuit-tracker', 'multiple-targets']
  },
  PERIPHERAL: {
    id: 'peripheral',
    name: 'Peripheral Vision',
    category: 'visual',
    icon: '👁️',
    description: 'Awareness of surroundings',
    drills: ['peripheral-flash', 'wide-field']
  },
  RECOGNITION: {
    id: 'recognition',
    name: 'Visual Recognition',
    category: 'visual',
    icon: '🔍',
    description: 'Identifying objects',
    drills: ['rapid-object-id', 'difference-spotter', 'visual-search']
  },
  DEPTH: {
    id: 'depth',
    name: 'Depth Perception',
    category: 'visual',
    icon: '📏',
    description: 'Judging distances',
    drills: ['distance-judgment', 'parallax-test']
  },
  
  // Motor Subcategories
  COORDINATION: {
    id: 'coordination',
    name: 'Hand-Eye Coordination',
    category: 'motor',
    icon: '✋',
    description: 'Synchronizing vision and movement',
    drills: ['click-accuracy', 'drag-and-drop', 'aim-trainer']
  },
  TIMING: {
    id: 'timing',
    name: 'Timing Accuracy',
    category: 'motor',
    icon: '⏰',
    description: 'Precise timing of actions',
    drills: ['rhythm-tap', 'stopwatch-click', 'synchronization']
  },
  PRECISION: {
    id: 'precision',
    name: 'Precision Control',
    category: 'motor',
    icon: '🎯',
    description: 'Fine motor control',
    drills: ['steady-hand', 'fine-motor', 'tracing']
  },
  SPEED: {
    id: 'speed',
    name: 'Movement Speed',
    category: 'motor',
    icon: '🏃',
    description: 'Quick physical responses',
    drills: ['rapid-tapping', 'finger-sequencing', 'gesture-speed']
  },
  
  // Academic Subcategories
  MATH: {
    id: 'math',
    name: 'Math Speed',
    category: 'academic',
    icon: '➕',
    description: 'Quick mathematical calculations',
    drills: ['arithmetic-race', 'multiplication-tables', 'mental-math']
  },
  READING: {
    id: 'reading',
    name: 'Reading Speed',
    category: 'academic',
    icon: '📖',
    description: 'Fast reading comprehension',
    drills: ['speed-reader', 'rsvp-reader', 'peripheral-reader']
  },
  WRITING: {
    id: 'writing',
    name: 'Writing Speed',
    category: 'academic',
    icon: '✍️',
    description: 'Fast and accurate writing',
    drills: ['typing-test', 'transcription', 'code-typing']
  },
  COMPREHENSION: {
    id: 'comprehension',
    name: 'Comprehension',
    category: 'academic',
    icon: '📚',
    description: 'Understanding and retention',
    drills: ['reading-comprehension', 'listening-comprehension', 'inference-drill']
  },
  
  // Productivity Subcategories
  SWITCHING: {
    id: 'switching',
    name: 'Task Switching',
    category: 'productivity',
    icon: '🔄',
    description: 'Efficient task transitions',
    drills: ['switch-cost', 'multi-tasking', 'context-switch']
  },
  MANAGEMENT: {
    id: 'management',
    name: 'Time Management',
    category: 'productivity',
    icon: '⏰',
    description: 'Effective time use',
    drills: ['time-estimation', 'pomodoro-timer', 'priority-sorting']
  },
  ENDURANCE: {
    id: 'endurance',
    name: 'Focus Endurance',
    category: 'productivity',
    icon: '💪',
    description: 'Sustained concentration',
    drills: ['deep-work', 'concentration-stamina', 'flow-state']
  },
  EFFICIENCY: {
    id: 'efficiency',
    name: 'Work Efficiency',
    category: 'productivity',
    icon: '⚡',
    description: 'Optimizing workflows',
    drills: ['batch-processing', 'workflow-optimization']
  },
  
  // Mental Fitness Subcategories
  STRESS: {
    id: 'stress',
    name: 'Stress Control',
    category: 'mental-fitness',
    icon: '😌',
    description: 'Managing stress levels',
    drills: ['biofeedback', 'stress-inoculation', 'calm-under-pressure']
  },
  MINDFULNESS: {
    id: 'mindfulness',
    name: 'Mindfulness',
    category: 'mental-fitness',
    icon: '🧘',
    description: 'Present moment awareness',
    drills: ['body-scan', 'mindful-breathing', 'sensory-awareness']
  },
  MEDITATION: {
    id: 'meditation',
    name: 'Meditation',
    category: 'mental-fitness',
    icon: '🕉️',
    description: 'Focused mental practice',
    drills: ['guided-meditation', 'transcendental', 'loving-kindness']
  },
  BREATHING: {
    id: 'breathing',
    name: 'Breathing Exercises',
    category: 'mental-fitness',
    icon: '🌬️',
    description: 'Controlled breathing techniques',
    drills: ['box-breathing', 'wim-hof', '4-7-8']
  },
  
  // Physical Subcategories
  BALANCE: {
    id: 'balance',
    name: 'Balance Training',
    category: 'physical',
    icon: '⚖️',
    description: 'Maintaining stability',
    drills: ['single-leg-hold', 'dynamic-balance', 'stability-challenge']
  },
  REFLEX: {
    id: 'reflex',
    name: 'Reflex Training',
    category: 'physical',
    icon: '⚡',
    description: 'Quick physical responses',
    drills: ['drop-catch', 'quick-dodge', 'reaction-chain']
  },
  PHYSICAL_COORDINATION: {
    id: 'physical-coordination',
    name: 'Coordination',
    category: 'physical',
    icon: '🔄',
    description: 'Body movement coordination',
    drills: ['cross-body-movement', 'rhythm-coordination', 'complex-pattern']
  },
  FITNESS: {
    id: 'fitness',
    name: 'Fitness',
    category: 'physical',
    icon: '💪',
    description: 'Physical conditioning',
    drills: ['agility-ladder', 'jump-sequence', 'speed-drill']
  }
};

/**
 * Get subcategory by ID
 */
export function getSubcategoryById(subcategoryId) {
  return Object.values(SUBCATEGORIES).find(sub => sub.id === subcategoryId) || null;
}

/**
 * Get subcategories by category
 */
export function getSubcategoriesByCategory(categoryId) {
  return Object.values(SUBCATEGORIES).filter(sub => sub.category === categoryId);
}

/**
 * Get all subcategories
 */
export function getAllSubcategories() {
  return Object.values(SUBCATEGORIES);
}

/**
 * Get subcategory name
 */
export function getSubcategoryName(subcategoryId) {
  const subcategory = getSubcategoryById(subcategoryId);
  return subcategory?.name || subcategoryId;
}

/**
 * Get subcategory icon
 */
export function getSubcategoryIcon(subcategoryId) {
  const subcategory = getSubcategoryById(subcategoryId);
  return subcategory?.icon || '📁';
}

/**
 * Get subcategory description
 */
export function getSubcategoryDescription(subcategoryId) {
  const subcategory = getSubcategoryById(subcategoryId);
  return subcategory?.description || '';
}

/**
 * Get drills for subcategory
 */
export function getDrillsForSubcategory(subcategoryId) {
  const subcategory = getSubcategoryById(subcategoryId);
  return subcategory?.drills || [];
}

/**
 * Validate if subcategory exists
 */
export function isValidSubcategory(subcategoryId) {
  return !!getSubcategoryById(subcategoryId);
}

/**
 * Get subcategory count
 */
export function getSubcategoryCount() {
  return Object.keys(SUBCATEGORIES).length;
}

/**
 * Get subcategory navigation
 */
export function getSubcategoryNav(categoryId) {
  return getSubcategoriesByCategory(categoryId).map(sub => ({
    id: sub.id,
    name: sub.name,
    icon: sub.icon,
    href: `/drills/${categoryId}#${sub.id}`
  }));
}

export default SUBCATEGORIES;