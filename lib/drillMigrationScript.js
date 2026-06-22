// lib/drillMigrationScript.js
// Helper script showing how to migrate any drill to the shared engine

/**
 * Steps to migrate ANY drill to use shared GameEngine + GameEndScreen:
 *
 * 1. Add imports:
 *    import useGameEngine from '../../../../../lib/useGameEngine';
 *    import GameEndScreen from '../../../../../components/GameEndScreen';
 *
 * 2. Initialize engine:
 *    const engine = useGameEngine({
 *      category: 'fps', // or 'cognitive', 'memory', etc.
 *      drillId: 'flick-shot-training',
 *      drillName: 'Flick Shot Trainer',
 *      totalGameTime: 60,
 *    });
 *
 * 3. Replace score/localStorage/timer refs with engine equivalents:
 *    - Remove: const [score, setScore], const scoreRef, timerRef
 *    - Replace scoring: engine.recordCorrectAction({ reactionTimeMs })
 *    - Replace misses: engine.recordMiss('Miss')
 *    - Replace timer: remove setInterval, engine handles it
 *    - Replace localStorage: remove, engine handles it
 *
 * 4. Replace end screen:
 *    {engine.gameState === 'ended' && (
 *      <GameEndScreen
 *        score={engine.score}
 *        bestScore={engine.bestScore}
 *        accuracy={engine.accuracy}
 *        bestCombo={engine.bestCombo}
 *        rating={engine.rating}
 *        newBest={engine.newBest}
 *        drillName="Flick Shot Trainer"
 *        drillBackLink="/drills/fps"
 *        isDarkMode={isDarkMode}
 *        onPlayAgain={engine.startGame}
 *        onShare={engine.shareScore}
 *      />
 *    )}
 *
 * 5. For drill-specific stats (hits, kills, etc.):
 *    Keep those as local state, they get passed to GameEndScreen
 *
 * 6. Fix the score display in stats bar:
 *    Use: engine.score, engine.bestScore, engine.timeRemaining, etc.
 */

// Difficulty weights for scoring across categories
export const DIFFICULTY_WEIGHTS = {
  fps: { basePoints: 5, description: 'Expert - Fast reactions required' },
  cognitive: { basePoints: 2, description: 'Medium - Mental processing' },
  memory: { basePoints: 3, description: 'Medium - Recall accuracy' },
  academic: { basePoints: 2, description: 'Easy - Knowledge based' },
  visual: { basePoints: 3, description: 'Hard - Visual processing' },
  motor: { basePoints: 4, description: 'Hard - Fine motor control' },
  productivity: { basePoints: 2, description: 'Easy - Consistency focused' },
  'mental-fitness': { basePoints: 1, description: 'Easy - Relaxation focused' },
  physical: { basePoints: 1, description: 'Medium - Execution focused' },
};