// scripts/check-columns.js

/**
 * Script to check database columns and schema
 * Run with: node scripts/check-columns.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function checkColumns() {
  console.log('🔍 Checking database columns...\n');
  
  try {
    // Check User table columns
    console.log('📊 User Table Columns:');
    console.log('=' .repeat(50));
    
    const userColumns = await prisma.$queryRaw`
      PRAGMA table_info(User);
    `;
    
    userColumns.forEach(col => {
      const indicator = col.name === 'avatar' ? '✅' : '  ';
      console.log(`${indicator} ${col.name} (${col.type}) ${col.notnull ? 'NOT NULL' : ''}`);
    });
    
    console.log('\n📊 DrillSession Table Columns:');
    console.log('=' .repeat(50));
    
    const drillColumns = await prisma.$queryRaw`
      PRAGMA table_info(DrillSession);
    `;
    
    drillColumns.forEach(col => {
      console.log(`   ${col.name} (${col.type})`);
    });
    
    console.log('\n📊 Achievement Table Columns:');
    console.log('=' .repeat(50));
    
    const achievementColumns = await prisma.$queryRaw`
      PRAGMA table_info(Achievement);
    `;
    
    achievementColumns.forEach(col => {
      console.log(`   ${col.name} (${col.type})`);
    });
    
    // Check table counts
    console.log('\n📈 Table Statistics:');
    console.log('=' .repeat(50));
    
    const userCount = await prisma.user.count();
    const drillCount = await prisma.drillSession.count();
    const achievementCount = await prisma.achievement.count();
    const userAchievementCount = await prisma.userAchievement.count();
    
    console.log(`   Users: ${userCount}`);
    console.log(`   Drill Sessions: ${drillCount}`);
    console.log(`   Achievements: ${achievementCount}`);
    console.log(`   User Achievements: ${userAchievementCount}`);
    
    // Check for missing indexes
    console.log('\n🔍 Checking indexes...');
    console.log('=' .repeat(50));
    
    const indexes = await prisma.$queryRaw`
      SELECT name, sql FROM sqlite_master WHERE type='index' AND tbl_name='User';
    `;
    
    const expectedIndexes = ['User_email_idx', 'User_username_idx', 'User_level_idx', 'User_xp_idx'];
    const existingIndexes = indexes.map(i => i.name);
    
    expectedIndexes.forEach(idx => {
      if (existingIndexes.includes(idx)) {
        console.log(`✅ ${idx} exists`);
      } else {
        console.log(` ${idx} missing`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error checking columns:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the check
checkColumns()
  .then(() => {
    console.log('\n✅ Column check complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Check failed:', error);
    process.exit(1);
  });