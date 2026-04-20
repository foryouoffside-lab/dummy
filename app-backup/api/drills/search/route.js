import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Search drills by name or description
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Define all available drills (this would come from database in production)
    const allDrills = [
      // Cognitive Drills
      { id: 'cognitive-1', name: 'Memory Sequence', category: 'cognitive', subcategory: 'memory', difficulty: 'intermediate', duration: 2, points: 100, description: 'Watch the sequence of colors and repeat it in order' },
      { id: 'cognitive-2', name: 'Number Recall', category: 'cognitive', subcategory: 'memory', difficulty: 'intermediate', duration: 3, points: 150, description: 'Remember and repeat number sequences' },
      { id: 'cognitive-3', name: 'Pattern Recognition', category: 'cognitive', subcategory: 'memory', difficulty: 'advanced', duration: 2, points: 200, description: 'Identify patterns and complete the sequence' },
      { id: 'cognitive-4', name: 'Card Matching', category: 'cognitive', subcategory: 'memory', difficulty: 'beginner', duration: 2, points: 80, description: 'Match pairs of cards to test your visual memory' },
      { id: 'cognitive-5', name: 'Reaction Time', category: 'cognitive', subcategory: 'processing', difficulty: 'beginner', duration: 1, points: 60, description: 'Test how quickly you can respond to stimuli' },
      { id: 'cognitive-6', name: 'Quick Math', category: 'cognitive', subcategory: 'processing', difficulty: 'intermediate', duration: 2, points: 100, description: 'Solve math problems under time pressure' },
      
      // Visual Drills
      { id: 'visual-1', name: 'Light Reaction', category: 'visual', subcategory: 'reaction', difficulty: 'beginner', duration: 1, points: 60, description: 'Click as fast as you can when the light appears' },
      { id: 'visual-2', name: 'Moving Target', category: 'visual', subcategory: 'tracking', difficulty: 'intermediate', duration: 2, points: 120, description: 'Track and click on moving targets' },
      { id: 'visual-3', name: 'Peripheral Flash', category: 'visual', subcategory: 'peripheral', difficulty: 'advanced', duration: 3, points: 180, description: 'Detect flashes in your peripheral vision' },
      
      // Motor Drills
      { id: 'motor-1', name: 'Aim Trainer', category: 'motor', subcategory: 'coordination', difficulty: 'intermediate', duration: 3, points: 150, description: 'Click on targets as quickly and accurately as possible' },
      { id: 'motor-2', name: 'Steady Hand', category: 'motor', subcategory: 'precision', difficulty: 'advanced', duration: 2, points: 120, description: 'Navigate a maze without touching the walls' },
      { id: 'motor-3', name: 'Rhythm Tap', category: 'motor', subcategory: 'timing', difficulty: 'beginner', duration: 2, points: 80, description: 'Tap in time with the beat' },
      
      // Academic Drills
      { id: 'academic-1', name: 'Typing Test', category: 'academic', subcategory: 'writing', difficulty: 'intermediate', duration: 3, points: 150, description: 'Test your typing speed and accuracy' },
      { id: 'academic-2', name: 'Speed Reader', category: 'academic', subcategory: 'reading', difficulty: 'beginner', duration: 5, points: 120, description: 'Practice reading at increasing speeds' },
      
      // Productivity Drills
      { id: 'productivity-1', name: 'Task Switching', category: 'productivity', subcategory: 'switching', difficulty: 'advanced', duration: 4, points: 200, description: 'Switch between different tasks quickly' },
      { id: 'productivity-2', name: 'Time Estimation', category: 'productivity', subcategory: 'management', difficulty: 'intermediate', duration: 2, points: 100, description: 'Estimate time intervals accurately' },
      
      // Mental Fitness Drills
      { id: 'mental-1', name: 'Box Breathing', category: 'mental', subcategory: 'breathing', difficulty: 'beginner', duration: 5, points: 75, description: 'Practice the 4-4-4-4 breathing technique' },
      { id: 'mental-2', name: 'Body Scan', category: 'mental', subcategory: 'mindfulness', difficulty: 'intermediate', duration: 10, points: 150, description: 'Guided body awareness meditation' }
    ];

    // Filter drills based on search query
    let filteredDrills = allDrills;
    
    if (query) {
      const searchLower = query.toLowerCase();
      filteredDrills = filteredDrills.filter(drill =>
        drill.name.toLowerCase().includes(searchLower) ||
        drill.description.toLowerCase().includes(searchLower) ||
        drill.category.toLowerCase().includes(searchLower) ||
        drill.subcategory.toLowerCase().includes(searchLower)
      );
    }
    
    if (category && category !== 'all') {
      filteredDrills = filteredDrills.filter(drill => drill.category === category);
    }
    
    if (difficulty && difficulty !== 'all') {
      filteredDrills = filteredDrills.filter(drill => drill.difficulty === difficulty);
    }

    // Pagination
    const paginatedDrills = filteredDrills.slice(skip, skip + limit);
    const total = filteredDrills.length;

    return NextResponse.json({
      success: true,
      drills: paginatedDrills,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      searchQuery: query
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search drills' },
      { status: 500 }
    );
  }
}