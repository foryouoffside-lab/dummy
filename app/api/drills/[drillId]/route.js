import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';

// GET - Fetch a specific drill by ID
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { drillId } = params;

    // Define all available drills
    const allDrills = {
      'cognitive-1': { id: 'cognitive-1', name: 'Memory Sequence', category: 'cognitive', subcategory: 'memory', difficulty: 'intermediate', duration: 2, points: 100, description: 'Watch the sequence of colors and repeat it in order', instructions: 'Watch the color sequence carefully, then repeat it by clicking the colors in the same order.' },
      'cognitive-2': { id: 'cognitive-2', name: 'Number Recall', category: 'cognitive', subcategory: 'memory', difficulty: 'intermediate', duration: 3, points: 150, description: 'Remember and repeat number sequences', instructions: 'Memorize the number sequence shown, then type it back in the correct order.' },
      'visual-1': { id: 'visual-1', name: 'Light Reaction', category: 'visual', subcategory: 'reaction', difficulty: 'beginner', duration: 1, points: 60, description: 'Click as fast as you can when the light appears', instructions: 'Click the screen as quickly as possible when the light appears.' },
      'motor-1': { id: 'motor-1', name: 'Aim Trainer', category: 'motor', subcategory: 'coordination', difficulty: 'intermediate', duration: 3, points: 150, description: 'Click on targets as quickly and accurately as possible', instructions: 'Click on the targets that appear on screen. Faster and more accurate clicks earn more points.' }
    };

    const drill = allDrills[drillId];

    if (!drill) {
      return NextResponse.json(
        { error: 'Drill not found' },
        { status: 404 }
      );
    }

    // Get user's best score if logged in
    let userBestScore = null;
    let timesPlayed = 0;
    
    if (session?.user?.id) {
      const userSessions = await prisma.drillSession.findMany({
        where: {
          userId: session.user.id,
          drillId
        },
        orderBy: { score: 'desc' },
        take: 1
      });
      
      timesPlayed = await prisma.drillSession.count({
        where: {
          userId: session.user.id,
          drillId
        }
      });
      
      if (userSessions.length > 0) {
        userBestScore = userSessions[0].score;
      }
    }

    return NextResponse.json({
      success: true,
      drill: {
        ...drill,
        userBestScore,
        timesPlayed
      }
    });

  } catch (error) {
    console.error('Drill fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch drill' },
      { status: 500 }
    );
  }
}