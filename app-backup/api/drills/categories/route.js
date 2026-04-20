import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Fetch all drill categories
export async function GET(request) {
  try {
    // Define all categories with their details
    const categories = [
      { 
        id: 'memory', 
        name: 'Memory', 
        slug: 'memory',
        icon: '🧠',
        description: 'Train your short-term and working memory',
        color: 'from-indigo-500 to-purple-600',
        drillCount: 0,
        subcategories: ['Short-term Memory', 'Working Memory', 'Visual Memory', 'Long-term Memory']
      },
      { 
        id: 'cognitive', 
        name: 'Cognitive', 
        slug: 'cognitive',
        icon: '🧠',
        description: 'Improve attention, focus, and problem-solving',
        color: 'from-purple-500 to-indigo-600',
        drillCount: 0,
        subcategories: ['Attention', 'Focus', 'Processing Speed', 'Problem Solving', 'Decision Making']
      },
      { 
        id: 'visual', 
        name: 'Visual', 
        slug: 'visual',
        icon: '👁️',
        description: 'Enhance reaction speed and visual tracking',
        color: 'from-blue-500 to-cyan-600',
        drillCount: 0,
        subcategories: ['Reaction Speed', 'Tracking Accuracy', 'Peripheral Vision', 'Visual Recognition', 'Depth Perception']
      },
      { 
        id: 'motor', 
        name: 'Motor', 
        slug: 'motor',
        icon: '✋',
        description: 'Develop hand-eye coordination and precision',
        color: 'from-green-500 to-emerald-600',
        drillCount: 0,
        subcategories: ['Hand-Eye Coordination', 'Timing Accuracy', 'Precision Control', 'Movement Speed']
      },
      { 
        id: 'academic', 
        name: 'Academic', 
        slug: 'academic',
        icon: '📚',
        description: 'Boost math, reading, and comprehension skills',
        color: 'from-yellow-500 to-orange-600',
        drillCount: 0,
        subcategories: ['Math Speed', 'Reading Speed', 'Writing Speed', 'Comprehension']
      },
      { 
        id: 'productivity', 
        name: 'Productivity', 
        slug: 'productivity',
        icon: '⚡',
        description: 'Master task switching and time management',
        color: 'from-orange-500 to-red-600',
        drillCount: 0,
        subcategories: ['Task Switching', 'Time Management', 'Focus Endurance', 'Work Efficiency']
      },
      { 
        id: 'mental-fitness', 
        name: 'Mental Fitness', 
        slug: 'mental-fitness',
        icon: '🧘',
        description: 'Practice stress control and mindfulness',
        color: 'from-pink-500 to-rose-600',
        drillCount: 0,
        subcategories: ['Stress Control', 'Mindfulness', 'Meditation', 'Breathing Exercises']
      },
      { 
        id: 'physical', 
        name: 'Physical', 
        slug: 'physical',
        icon: '💪',
        description: 'Improve balance, reflexes, and coordination',
        color: 'from-red-500 to-orange-600',
        drillCount: 0,
        subcategories: ['Balance Training', 'Reflex Training', 'Coordination', 'Fitness']
      }
    ];

    // Get actual drill counts from database (if you have a drills table)
    // For now, using placeholder counts
    const categoriesWithCounts = categories.map(cat => ({
      ...cat,
      drillCount: 12 // Placeholder - replace with actual count from DB
    }));

    return NextResponse.json({
      success: true,
      categories: categoriesWithCounts
    });

  } catch (error) {
    console.error('Categories fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}