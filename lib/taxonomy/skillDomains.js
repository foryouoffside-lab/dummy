// lib/taxonomy/skillDomains.js

/**
 * Skill Domains Taxonomy
 * Defines high-level skill domains and their relationships
 */

export const SKILL_DOMAINS = {
  COGNITIVE: {
    id: 'cognitive',
    name: 'Cognitive Skills',
    description: 'Mental processes related to thinking, learning, and memory',
    icon: '🧠',
    color: 'from-purple-500 to-indigo-600',
    skills: [
      {
        id: 'memory',
        name: 'Memory',
        subSkills: ['short-term', 'working', 'visual', 'long-term']
      },
      {
        id: 'attention',
        name: 'Attention',
        subSkills: ['sustained', 'selective', 'divided']
      },
      {
        id: 'focus',
        name: 'Focus',
        subSkills: ['concentration', 'flow-state', 'deep-work']
      },
      {
        id: 'processing-speed',
        name: 'Processing Speed',
        subSkills: ['reaction-time', 'mental-math', 'rapid-cognition']
      },
      {
        id: 'problem-solving',
        name: 'Problem Solving',
        subSkills: ['logical-reasoning', 'critical-thinking', 'analytical']
      },
      {
        id: 'decision-making',
        name: 'Decision Making',
        subSkills: ['risk-assessment', 'strategic-choice', 'judgment']
      }
    ]
  },
  
  PERCEPTUAL: {
    id: 'perceptual',
    name: 'Perceptual Skills',
    description: 'Processing and interpreting sensory information',
    icon: '👁️',
    color: 'from-blue-500 to-cyan-600',
    skills: [
      {
        id: 'reaction-speed',
        name: 'Reaction Speed',
        subSkills: ['visual-reaction', 'auditory-reaction', 'go-no-go']
      },
      {
        id: 'tracking',
        name: 'Tracking',
        subSkills: ['moving-target', 'pursuit', 'multiple-targets']
      },
      {
        id: 'peripheral-vision',
        name: 'Peripheral Vision',
        subSkills: ['wide-field', 'edge-detection', 'spatial-awareness']
      },
      {
        id: 'recognition',
        name: 'Recognition',
        subSkills: ['pattern-recognition', 'object-identification', 'difference-spotting']
      },
      {
        id: 'depth-perception',
        name: 'Depth Perception',
        subSkills: ['distance-judgment', 'parallax', '3D-spatial']
      }
    ]
  },
  
  MOTOR: {
    id: 'motor',
    name: 'Motor Skills',
    description: 'Physical movement and coordination',
    icon: '✋',
    color: 'from-green-500 to-emerald-600',
    skills: [
      {
        id: 'coordination',
        name: 'Coordination',
        subSkills: ['hand-eye', 'bilateral', 'cross-lateral']
      },
      {
        id: 'timing',
        name: 'Timing',
        subSkills: ['rhythm', 'synchronization', 'interval-timing']
      },
      {
        id: 'precision',
        name: 'Precision',
        subSkills: ['fine-motor', 'steady-hand', 'aiming']
      },
      {
        id: 'speed',
        name: 'Movement Speed',
        subSkills: ['rapid-tapping', 'gesture-speed', 'response-time']
      }
    ]
  },
  
  ACADEMIC: {
    id: 'academic',
    name: 'Academic Skills',
    description: 'Learning and knowledge-based abilities',
    icon: '📚',
    color: 'from-yellow-500 to-orange-600',
    skills: [
      {
        id: 'mathematical',
        name: 'Mathematical',
        subSkills: ['arithmetic', 'algebra', 'mental-math']
      },
      {
        id: 'reading',
        name: 'Reading',
        subSkills: ['speed-reading', 'comprehension', 'vocabulary']
      },
      {
        id: 'writing',
        name: 'Writing',
        subSkills: ['typing', 'handwriting', 'transcription']
      },
      {
        id: 'comprehension',
        name: 'Comprehension',
        subSkills: ['reading-comprehension', 'listening', 'inference']
      }
    ]
  },
  
  PRODUCTIVITY: {
    id: 'productivity',
    name: 'Productivity Skills',
    description: 'Efficiency and effectiveness in work',
    icon: '⚡',
    color: 'from-orange-500 to-red-600',
    skills: [
      {
        id: 'task-management',
        name: 'Task Management',
        subSkills: ['switching', 'prioritization', 'batching']
      },
      {
        id: 'time-management',
        name: 'Time Management',
        subSkills: ['estimation', 'scheduling', 'pomodoro']
      },
      {
        id: 'focus',
        name: 'Focus',
        subSkills: ['endurance', 'deep-work', 'flow']
      },
      {
        id: 'efficiency',
        name: 'Efficiency',
        subSkills: ['workflow', 'automation', 'optimization']
      }
    ]
  },
  
  MENTAL: {
    id: 'mental',
    name: 'Mental Fitness',
    description: 'Psychological and emotional well-being',
    icon: '🧘',
    color: 'from-pink-500 to-rose-600',
    skills: [
      {
        id: 'stress',
        name: 'Stress Management',
        subSkills: ['inoculation', 'calming', 'resilience']
      },
      {
        id: 'mindfulness',
        name: 'Mindfulness',
        subSkills: ['awareness', 'presence', 'acceptance']
      },
      {
        id: 'meditation',
        name: 'Meditation',
        subSkills: ['guided', 'transcendental', 'loving-kindness']
      },
      {
        id: 'breathing',
        name: 'Breathing',
        subSkills: ['box-breathing', 'wim-hof', '4-7-8']
      }
    ]
  },
  
  PHYSICAL: {
    id: 'physical',
    name: 'Physical Fitness',
    description: 'Body awareness and physical capabilities',
    icon: '💪',
    color: 'from-red-500 to-orange-600',
    skills: [
      {
        id: 'balance',
        name: 'Balance',
        subSkills: ['static', 'dynamic', 'stability']
      },
      {
        id: 'reflexes',
        name: 'Reflexes',
        subSkills: ['catch', 'dodge', 'reaction-chain']
      },
      {
        id: 'coordination',
        name: 'Coordination',
        subSkills: ['cross-body', 'rhythm', 'complex-patterns']
      },
      {
        id: 'fitness',
        name: 'Fitness',
        subSkills: ['agility', 'speed', 'endurance']
      }
    ]
  }
};

/**
 * Get domain by ID
 */
export function getDomainById(domainId) {
  return SKILL_DOMAINS[domainId.toUpperCase()] || null;
}

/**
 * Get all domains
 */
export function getAllDomains() {
  return Object.values(SKILL_DOMAINS);
}

/**
 * Get skills for a domain
 */
export function getSkillsForDomain(domainId) {
  const domain = getDomainById(domainId);
  return domain?.skills || [];
}

/**
 * Get all skills across all domains
 */
export function getAllSkills() {
  const allSkills = [];
  for (const domain of Object.values(SKILL_DOMAINS)) {
    allSkills.push(...domain.skills);
  }
  return allSkills;
}

/**
 * Get skill by ID
 */
export function getSkillById(skillId) {
  for (const domain of Object.values(SKILL_DOMAINS)) {
    const skill = domain.skills.find(s => s.id === skillId);
    if (skill) return { ...skill, domain: domain.id };
  }
  return null;
}

/**
 * Get domain for a skill
 */
export function getDomainForSkill(skillId) {
  for (const domain of Object.values(SKILL_DOMAINS)) {
    if (domain.skills.some(s => s.id === skillId)) {
      return domain;
    }
  }
  return null;
}

/**
 * Get skill progression path
 */
export function getSkillProgressionPath(skillId) {
  const skill = getSkillById(skillId);
  if (!skill) return null;
  
  return {
    beginner: `${skill.name} Basics`,
    intermediate: `${skill.name} Mastery`,
    advanced: `${skill.name} Expert`,
    expert: `Elite ${skill.name}`
  };
}

/**
 * Get recommended skill order
 */
export function getRecommendedSkillOrder() {
  // Order from foundational to advanced
  return [
    'attention',
    'focus',
    'reaction-speed',
    'coordination',
    'memory',
    'processing-speed',
    'problem-solving',
    'decision-making'
  ];
}

/**
 * Get related skills
 */
export function getRelatedSkills(skillId) {
  const domain = getDomainForSkill(skillId);
  if (!domain) return [];
  
  return domain.skills
    .filter(s => s.id !== skillId)
    .map(s => ({ ...s, domain: domain.id }));
}

/**
 * Get skill level description
 */
export function getSkillLevelDescription(skillScore) {
  if (skillScore >= 90) return 'Expert';
  if (skillScore >= 75) return 'Advanced';
  if (skillScore >= 60) return 'Intermediate';
  if (skillScore >= 40) return 'Beginner';
  return 'Novice';
}

/**
 * Get skill improvement tips
 */
export function getSkillImprovementTips(skillId) {
  const tips = {
    memory: [
      'Practice daily recall exercises',
      'Use mnemonic devices',
      'Get adequate sleep',
      'Stay hydrated'
    ],
    attention: [
      'Minimize distractions',
      'Practice mindfulness',
      'Take regular breaks',
      'Set clear goals'
    ],
    'reaction-speed': [
      'Get enough rest',
      'Practice regularly',
      'Stay focused',
      'Reduce stress'
    ],
    coordination: [
      'Start with simple movements',
      'Increase difficulty gradually',
      'Practice consistently',
      'Use feedback loops'
    ]
  };
  
  return tips[skillId] || [
    'Practice regularly',
    'Track your progress',
    'Challenge yourself',
    'Review fundamentals'
  ];
}

export default SKILL_DOMAINS;