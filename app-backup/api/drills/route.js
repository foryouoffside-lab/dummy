import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';

// GET - Fetch all drills with filters and pagination
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const subcategory = searchParams.get('subcategory');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    // Get user's completed drill sessions for stats
    let drillSessions = [];
    if (session?.user?.id) {
      drillSessions = await prisma.drillSession.findMany({
        where: { userId: session.user.id },
        select: { drillId: true, score: true, completedAt: true, duration: true }
      });
    }
    
    // Complete database of all drills (in production, this would come from a Drill table)
    const allDrills = [
      // ========== MEMORY DRILLS ==========
      { id: 'memory-1', name: 'Memory Sequence', category: 'memory', subcategory: 'short-term', difficulty: 'intermediate', duration: 2, points: 100, description: 'Watch the sequence of colors and repeat it in order', instructions: 'Pay attention to the color sequence. After it ends, click the colors in the same order.' },
      { id: 'memory-2', name: 'Number Recall', category: 'memory', subcategory: 'short-term', difficulty: 'intermediate', duration: 3, points: 150, description: 'Remember and repeat number sequences', instructions: 'Memorize the number sequence shown, then type it back in the correct order.' },
      { id: 'memory-3', name: 'Pattern Recognition', category: 'memory', subcategory: 'visual', difficulty: 'advanced', duration: 2, points: 200, description: 'Identify patterns and complete the sequence', instructions: 'Look at the pattern and select the next item in the sequence.' },
      { id: 'memory-4', name: 'Card Matching', category: 'memory', subcategory: 'visual', difficulty: 'beginner', duration: 2, points: 80, description: 'Match pairs of cards to test your visual memory', instructions: 'Flip cards and match pairs. Remember the positions of each card.' },
      { id: 'memory-5', name: 'Dual Task', category: 'memory', subcategory: 'working', difficulty: 'advanced', duration: 4, points: 180, description: 'Remember information while performing another task', instructions: 'Complete the primary task while remembering the secondary information.' },
      { id: 'memory-6', name: 'N-Back', category: 'memory', subcategory: 'working', difficulty: 'expert', duration: 5, points: 200, description: 'Advanced working memory challenge', instructions: 'Indicate when the current item matches the one from N steps earlier.' },
      
      // ========== COGNITIVE DRILLS ==========
      { id: 'cognitive-1', name: 'Sustained Attention', category: 'cognitive', subcategory: 'attention', difficulty: 'intermediate', duration: 5, points: 120, description: 'Maintain focus over extended periods', instructions: 'Stay focused on the task and respond to relevant stimuli.' },
      { id: 'cognitive-2', name: 'Selective Attention', category: 'cognitive', subcategory: 'attention', difficulty: 'advanced', duration: 4, points: 180, description: 'Focus on relevant information while ignoring distractions', instructions: 'Pay attention to the target while ignoring distracting information.' },
      { id: 'cognitive-3', name: 'Divided Attention', category: 'cognitive', subcategory: 'attention', difficulty: 'expert', duration: 4, points: 220, description: 'Handle multiple tasks simultaneously', instructions: 'Monitor and respond to multiple streams of information at once.' },
      { id: 'cognitive-4', name: 'Reaction Time', category: 'cognitive', subcategory: 'processing', difficulty: 'beginner', duration: 1, points: 60, description: 'Test how quickly you can respond to stimuli', instructions: 'Click as fast as possible when the screen changes.' },
      { id: 'cognitive-5', name: 'Quick Math', category: 'cognitive', subcategory: 'processing', difficulty: 'intermediate', duration: 2, points: 100, description: 'Solve math problems under time pressure', instructions: 'Solve the arithmetic problems as quickly as you can.' },
      { id: 'cognitive-6', name: 'Symbol Matching', category: 'cognitive', subcategory: 'processing', difficulty: 'intermediate', duration: 2, points: 100, description: 'Match symbols quickly and accurately', instructions: 'Match the target symbol with one of the options.' },
      { id: 'cognitive-7', name: 'Tower of Hanoi', category: 'cognitive', subcategory: 'problem-solving', difficulty: 'advanced', duration: 5, points: 200, description: 'Solve the classic tower puzzle', instructions: 'Move all disks to the target peg. You cannot place a larger disk on a smaller one.' },
      { id: 'cognitive-8', name: 'Risk Assessment', category: 'cognitive', subcategory: 'decision-making', difficulty: 'intermediate', duration: 3, points: 150, description: 'Evaluate risks and make optimal choices', instructions: 'Choose the option with the best risk-reward ratio.' },
      
      // ========== VISUAL DRILLS ==========
      { id: 'visual-1', name: 'Light Reaction', category: 'visual', subcategory: 'reaction', difficulty: 'beginner', duration: 1, points: 60, description: 'Click as fast as you can when the light appears', instructions: 'Click the screen immediately when you see the light.' },
      { id: 'visual-2', name: 'Sound Reaction', category: 'visual', subcategory: 'reaction', difficulty: 'beginner', duration: 1, points: 60, description: 'React to audio cues as quickly as possible', instructions: 'Click when you hear the sound cue.' },
      { id: 'visual-3', name: 'Moving Target', category: 'visual', subcategory: 'tracking', difficulty: 'intermediate', duration: 2, points: 120, description: 'Track and click on moving targets', instructions: 'Follow the moving target and click on it accurately.' },
      { id: 'visual-4', name: 'Multiple Targets', category: 'visual', subcategory: 'tracking', difficulty: 'advanced', duration: 3, points: 180, description: 'Track multiple moving objects simultaneously', instructions: 'Keep track of all moving targets and click them when they change color.' },
      { id: 'visual-5', name: 'Peripheral Flash', category: 'visual', subcategory: 'peripheral', difficulty: 'intermediate', duration: 2, points: 100, description: 'Detect flashes in your peripheral vision', instructions: 'Look at the center and click when you see a flash at the edges.' },
      { id: 'visual-6', name: 'Difference Spotter', category: 'visual', subcategory: 'recognition', difficulty: 'medium', duration: 2, points: 120, description: 'Find differences between similar images', instructions: 'Find and click on the differences between the two images.' },
      { id: 'visual-7', name: 'Visual Search', category: 'visual', subcategory: 'recognition', difficulty: 'intermediate', duration: 2, points: 100, description: 'Find specific objects among distractors', instructions: 'Find the target object among many similar objects.' },
      
      // ========== MOTOR DRILLS ==========
      { id: 'motor-1', name: 'Aim Trainer', category: 'motor', subcategory: 'coordination', difficulty: 'intermediate', duration: 3, points: 150, description: 'Click on targets as quickly and accurately as possible', instructions: 'Click on the targets that appear. Faster and more accurate clicks earn more points.' },
      { id: 'motor-2', name: 'Click Accuracy', category: 'motor', subcategory: 'coordination', difficulty: 'medium', duration: 2, points: 100, description: 'Click on targets as accurately as possible', instructions: 'Click precisely on the targets. Accuracy is more important than speed.' },
      { id: 'motor-3', name: 'Steady Hand', category: 'motor', subcategory: 'precision', difficulty: 'advanced', duration: 2, points: 120, description: 'Navigate a maze without touching the walls', instructions: 'Move your cursor through the maze without touching the walls.' },
      { id: 'motor-4', name: 'Fine Motor', category: 'motor', subcategory: 'precision', difficulty: 'intermediate', duration: 2, points: 110, description: 'Perform precise fine motor movements', instructions: 'Complete the precise movements with accuracy.' },
      { id: 'motor-5', name: 'Rhythm Tap', category: 'motor', subcategory: 'timing', difficulty: 'beginner', duration: 2, points: 80, description: 'Tap in time with the beat', instructions: 'Tap along with the rhythm. Timing accuracy determines your score.' },
      { id: 'motor-6', name: 'Rapid Tapping', category: 'motor', subcategory: 'speed', difficulty: 'easy', duration: 1, points: 70, description: 'Tap as quickly as you can', instructions: 'Tap the button as many times as possible within the time limit.' },
      
      // ========== ACADEMIC DRILLS ==========
      { id: 'academic-1', name: 'Typing Test', category: 'academic', subcategory: 'writing', difficulty: 'intermediate', duration: 3, points: 150, description: 'Test your typing speed and accuracy', instructions: 'Type the displayed text as quickly and accurately as possible.' },
      { id: 'academic-2', name: 'Speed Reader', category: 'academic', subcategory: 'reading', difficulty: 'beginner', duration: 5, points: 120, description: 'Practice reading at increasing speeds', instructions: 'Read the text as it appears and answer comprehension questions.' },
      { id: 'academic-3', name: 'Reading Comprehension', category: 'academic', subcategory: 'comprehension', difficulty: 'advanced', duration: 5, points: 200, description: 'Read passages and answer questions correctly', instructions: 'Read the passage carefully and answer the questions that follow.' },
      { id: 'academic-4', name: 'Arithmetic Race', category: 'academic', subcategory: 'math', difficulty: 'medium', duration: 2, points: 100, description: 'Solve arithmetic problems as quickly as possible', instructions: 'Solve the math problems as fast as you can.' },
      
      // ========== PRODUCTIVITY DRILLS ==========
      { id: 'productivity-1', name: 'Task Switching', category: 'productivity', subcategory: 'switching', difficulty: 'advanced', duration: 4, points: 200, description: 'Switch between different tasks quickly', instructions: 'Switch between tasks as efficiently as possible.' },
      { id: 'productivity-2', name: 'Time Estimation', category: 'productivity', subcategory: 'management', difficulty: 'intermediate', duration: 2, points: 100, description: 'Estimate time intervals accurately', instructions: 'Click when you think the time interval has passed.' },
      { id: 'productivity-3', name: 'Pomodoro Timer', category: 'productivity', subcategory: 'focus', difficulty: 'beginner', duration: 25, points: 150, description: 'Practice focused work sessions', instructions: 'Work without interruption until the timer ends.' },
      { id: 'productivity-4', name: 'Priority Sorting', category: 'productivity', subcategory: 'management', difficulty: 'medium', duration: 3, points: 120, description: 'Sort tasks by urgency and importance', instructions: 'Arrange tasks in order of priority.' },
      
      // ========== MENTAL FITNESS DRILLS ==========
      { id: 'mental-1', name: 'Box Breathing', category: 'mental', subcategory: 'breathing', difficulty: 'beginner', duration: 5, points: 75, description: 'Practice the 4-4-4-4 breathing technique', instructions: 'Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4.' },
      { id: 'mental-2', name: 'Body Scan', category: 'mental', subcategory: 'mindfulness', difficulty: 'intermediate', duration: 10, points: 150, description: 'Guided body awareness meditation', instructions: 'Follow the guided meditation to scan your body for sensations.' },
      { id: 'mental-3', name: 'Mindful Breathing', category: 'mental', subcategory: 'meditation', difficulty: 'beginner', duration: 3, points: 50, description: 'Focus on your breath for relaxation', instructions: 'Focus your attention on your breath. When your mind wanders, gently return to the breath.' },
      { id: 'mental-4', name: 'Stress Inoculation', category: 'mental', subcategory: 'stress', difficulty: 'advanced', duration: 10, points: 200, description: 'Build resilience against stressful situations', instructions: 'Practice coping techniques under increasing pressure.' },
      
      // ========== PHYSICAL DRILLS ==========
      { id: 'physical-1', name: 'Single Leg Hold', category: 'physical', subcategory: 'balance', difficulty: 'medium', duration: 2, points: 100, description: 'Maintain balance on one leg while performing tasks', instructions: 'Stand on one leg and maintain balance while completing tasks.' },
      { id: 'physical-2', name: 'Drop Catch', category: 'physical', subcategory: 'reflex', difficulty: 'easy', duration: 1, points: 60, description: 'Catch falling objects as quickly as possible', instructions: 'Click on falling objects before they hit the ground.' },
      { id: 'physical-3', name: 'Cross Body Movement', category: 'physical', subcategory: 'coordination', difficulty: 'medium', duration: 3, points: 120, description: 'Coordinate opposite limbs simultaneously', instructions: 'Perform movements that require coordination between opposite limbs.' }
    ];
    
    // Apply filters
    let filteredDrills = [...allDrills];
    
    if (category && category !== 'all') {
      filteredDrills = filteredDrills.filter(drill => drill.category === category);
    }
    
    if (subcategory && subcategory !== 'all') {
      filteredDrills = filteredDrills.filter(drill => drill.subcategory === subcategory);
    }
    
    if (difficulty && difficulty !== 'all') {
      filteredDrills = filteredDrills.filter(drill => drill.difficulty === difficulty);
    }
    
    // Add user-specific data (best score, times played, etc.)
    const drillsWithUserData = filteredDrills.map(drill => {
      const userSessions = drillSessions.filter(s => s.drillId === drill.id);
      const bestScore = userSessions.length > 0 
        ? Math.max(...userSessions.map(s => s.score)) 
        : null;
      const timesPlayed = userSessions.length;
      const totalTimeSpent = userSessions.reduce((sum, s) => sum + (s.duration || 0), 0);
      const lastPlayed = userSessions.length > 0 
        ? userSessions.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0].completedAt 
        : null;
      
      return {
        ...drill,
        bestScore,
        timesPlayed,
        totalTimeSpent,
        lastPlayed
      };
    });
    
    // Pagination
    const paginatedDrills = drillsWithUserData.slice(skip, skip + limit);
    const total = drillsWithUserData.length;
    
    return NextResponse.json({
      success: true,
      drills: paginatedDrills,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      filters: {
        category: category || 'all',
        subcategory: subcategory || 'all',
        difficulty: difficulty || 'all'
      }
    });
    
  } catch (error) {
    console.error('Drills fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch drills' },
      { status: 500 }
    );
  }
}

// POST - Create a new drill (admin only)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check admin access (only specific email can create drills)
    const isAdmin = session.user.email === 'admin@example.com';
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { name, category, subcategory, difficulty, duration, points, description, instructions } = body;
    
    // Validate required fields
    if (!name || !category || !difficulty || !duration || !points) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, difficulty, duration, points' },
        { status: 400 }
      );
    }
    
    // Validate field values
    const validCategories = ['memory', 'cognitive', 'visual', 'motor', 'academic', 'productivity', 'mental', 'physical'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }
    
    const validDifficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
    if (!validDifficulties.includes(difficulty)) {
      return NextResponse.json(
        { error: 'Invalid difficulty' },
        { status: 400 }
      );
    }
    
    if (duration < 1 || duration > 60) {
      return NextResponse.json(
        { error: 'Duration must be between 1 and 60 minutes' },
        { status: 400 }
      );
    }
    
    if (points < 10 || points > 1000) {
      return NextResponse.json(
        { error: 'Points must be between 10 and 1000' },
        { status: 400 }
      );
    }
    
    // Generate unique ID
    const id = `${category}-${Date.now()}`;
    
    // Create new drill object
    const newDrill = {
      id,
      name,
      category,
      subcategory: subcategory || 'general',
      difficulty,
      duration,
      points,
      description: description || '',
      instructions: instructions || 'Complete the drill to earn points.'
    };
    
    // In production, you would save this to a database
    // For now, just return the created drill
    
    return NextResponse.json({
      success: true,
      drill: newDrill,
      message: 'Drill created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Drill creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create drill' },
      { status: 500 }
    );
  }
}

// PUT - Update a drill (admin only)
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const isAdmin = session.user.email === 'admin@example.com';
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Drill ID is required' },
        { status: 400 }
      );
    }
    
    // In production, you would update in database
    // For now, just return success
    
    return NextResponse.json({
      success: true,
      message: 'Drill updated successfully'
    });
    
  } catch (error) {
    console.error('Drill update error:', error);
    return NextResponse.json(
      { error: 'Failed to update drill' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a drill (admin only)
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const isAdmin = session.user.email === 'admin@example.com';
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Drill ID is required' },
        { status: 400 }
      );
    }
    
    // In production, you would delete from database
    // For now, just return success
    
    return NextResponse.json({
      success: true,
      message: 'Drill deleted successfully'
    });
    
  } catch (error) {
    console.error('Drill deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete drill' },
      { status: 500 }
    );
  }
}