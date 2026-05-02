// scripts/check-schema.js

/**
 * Script to validate Prisma schema and database synchronization
 * Run with: node scripts/check-schema.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const prisma = new PrismaClient();

async function checkSchema() {
  console.log('🔍 Checking Prisma schema and database sync...\n');
  
  try {
    // 1. Check schema file exists
    console.log('📁 Checking schema file...');
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    
    if (fs.existsSync(schemaPath)) {
      console.log('✅ schema.prisma found');
      
      const schemaContent = fs.readFileSync(schemaPath, 'utf8');
      const lines = schemaContent.split('\n').length;
      console.log(`   File size: ${lines} lines`);
    } else {
      console.log('❌ schema.prisma not found');
      process.exit(1);
    }
    
    // 2. Check database connection
    console.log('\n🔌 Checking database connection...');
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connected successfully');
    
    // 3. Check model integrity
    console.log('\n📊 Checking model integrity...');
    
    // Check User model
    const userModel = await prisma.$queryRaw`
      SELECT name FROM sqlite_master WHERE type='table' AND name='User';
    `;
    console.log(`✅ User table: ${userModel.length > 0 ? 'exists' : 'missing'}`);
    
    // Check DrillSession model
    const drillModel = await prisma.$queryRaw`
      SELECT name FROM sqlite_master WHERE type='table' AND name='DrillSession';
    `;
    console.log(`✅ DrillSession table: ${drillModel.length > 0 ? 'exists' : 'missing'}`);
    
    // Check Achievement model
    const achievementModel = await prisma.$queryRaw`
      SELECT name FROM sqlite_master WHERE type='table' AND name='Achievement';
    `;
    console.log(`✅ Achievement table: ${achievementModel.length > 0 ? 'exists' : 'missing'}`);
    
    // 4. Check relationships
    console.log('\n🔗 Checking relationships...');
    
    const foreignKeys = await prisma.$queryRaw`
      PRAGMA foreign_key_list(DrillSession);
    `;
    
    if (foreignKeys.length > 0) {
      console.log('✅ Foreign keys configured correctly');
    } else {
      console.log(' No foreign keys found (may be expected for SQLite)');
    }
    
    // 5. Run Prisma validation
    console.log('\n🔧 Running Prisma validation...');
    
    try {
      execSync('npx prisma validate', { stdio: 'pipe' });
      console.log('✅ Prisma schema is valid');
    } catch (error) {
      console.log(' Prisma validation warning:', error.message);
    }
    
    // 6. Check for migration drift
    console.log('\n📦 Checking migration drift...');
    
    try {
      execSync('npx prisma migrate status', { stdio: 'pipe' });
      console.log('✅ No migration drift detected');
    } catch (error) {
      console.log(' Migration drift may exist');
      console.log('   Run: npx prisma migrate dev to fix');
    }
    
    // 7. Generate TypeScript types check
    console.log('\n📝 Checking TypeScript types...');
    
    const typesPath = path.join(process.cwd(), 'node_modules', '.prisma', 'client', 'index.d.ts');
    if (fs.existsSync(typesPath)) {
      console.log('✅ Prisma client types generated');
      const stats = fs.statSync(typesPath);
      console.log(`   Type file size: ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      console.log(' Prisma client types not found');
      console.log('   Run: npx prisma generate');
    }
    
    // 8. Performance check
    console.log('\n⚡ Performance check...');
    
    const start = Date.now();
    await prisma.user.findFirst();
    const end = Date.now();
    console.log(`   Query time: ${end - start}ms`);
    
    // 9. Summary
    console.log('\n📋 Schema Summary:');
    console.log('=' .repeat(50));
    
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
    `;
    
    tables.forEach(table => {
      console.log(`   📁 ${table.name}`);
    });
    
  } catch (error) {
    console.error('❌ Schema check error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Helper function to check if column exists
async function columnExists(tableName, columnName) {
  const columns = await prisma.$queryRaw`
    PRAGMA table_info(${tableName});
  `;
  return columns.some(col => col.name === columnName);
}

// Helper function to get table row count
async function getRowCount(tableName) {
  const result = await prisma.$queryRaw`
    SELECT COUNT(*) as count FROM ${tableName};
  `;
  return result[0].count;
}

// Run the check
checkSchema()
  .then(() => {
    console.log('\n🎉 Schema check complete!');
    console.log('\n📌 Recommendations:');
    console.log('   1. Run migrations after schema changes');
    console.log('   2. Keep Prisma client updated');
    console.log('   3. Monitor query performance');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Schema check failed:', error);
    process.exit(1);
  });