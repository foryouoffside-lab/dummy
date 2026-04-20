// scripts/seed-achievements.js

/**
 * Script to seed achievements into database
 * Run with: node scripts/seed-achievements.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const achievements = [
  { name: "First Drill", description: "Complete your first drill", icon: "🎯", requirement: 1, type: "sessions" },
  { name: "10 Drills", description: "Complete 10 drills", icon: "🏆", requirement: 10, type: "sessions" },
  { name: "50 Drills", description: "Complete 50 drills", icon: "🏅", requirement: 50, type: "sessions" },
  { name: "100 Drills", description: "Complete 100 drills", icon: "💎", requirement: 100, type: "sessions" },
  { name: "Sharpshooter", description: "Achieve 90% accuracy", icon: "🎯", requirement: 90, type: "accuracy" },
  { name: "Perfect Score", description: "Get 100% on any drill", icon: "⭐", requirement: 100, type: "accuracy" },
  { name: "7 Day Streak", description: "Train for 7 days in a row", icon: "🔥", requirement: 7, type: "streak" },
  { name: "30 Day Streak", description: "Train for 30 days in a row", icon: "⚡", requirement: 30, type: "streak" },
  { name: "Speed Demon", description: "Complete a drill in under 30 seconds", icon: "💨", requirement: 30, type: "speed" },
  { name: "Perfectionist", description: "Get 10 perfect scores", icon: "✨", requirement: 10, type: "perfect_score" }
];

async function seedAchievements() {
  console.log('🌱 Seeding achievements...\n');
  
  for (const achievement of achievements) {
    try {
      const existing = await prisma.achievement.findUnique({
        where: { name: achievement.name }
      });
      
      if (existing) {
        console.log(`⏭️ Achievement "${achievement.name}" already exists`);
      } else {
        await prisma.achievement.create({
          data: achievement
        });
        console.log(`✅ Created achievement: ${achievement.name}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create achievement "${achievement.name}":`, error.message);
    }
  }
  
  console.log('\n🎉 Seeding complete!');
}

seedAchievements()
  .catch(console.error)
  .finally(() => prisma.$disconnect());