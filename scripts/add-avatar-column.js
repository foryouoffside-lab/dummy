// scripts/add-avatar-column.js

/**
 * Script to add avatar column to User table
 * Run with: node scripts/add-avatar-column.js
 */

const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

async function addAvatarColumn() {
  console.log('🔧 Starting avatar column migration...\n');
  
  try {
    // Check if avatar column exists
    const result = await prisma.$queryRaw`
      PRAGMA table_info(User);
    `;
    
    const columns = result;
    const hasAvatar = columns.some(col => col.name === 'avatar');
    
    if (hasAvatar) {
      console.log('✅ Avatar column already exists');
      return;
    }
    
    console.log('📝 Adding avatar column to User table...');
    
    // Add avatar column
    await prisma.$executeRaw`
      ALTER TABLE User ADD COLUMN avatar TEXT;
    `;
    
    console.log('✅ Avatar column added successfully');
    
    // Verify column was added
    const updatedColumns = await prisma.$queryRaw`
      PRAGMA table_info(User);
    `;
    
    const verified = updatedColumns.some(col => col.name === 'avatar');
    if (verified) {
      console.log('✅ Avatar column verified');
    } else {
      console.log('⚠️ Avatar column could not be verified');
    }
    
  } catch (error) {
    console.error('❌ Error adding avatar column:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
addAvatarColumn()
  .then(() => {
    console.log('\n🎉 Migration complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });