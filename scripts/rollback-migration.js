// scripts/rollback-migration.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function rollbackMigration() {
  console.log('⚠️ Database Rollback\n');
  
  const migrationsDir = path.join(process.cwd(), 'prisma', 'migrations');
  if (!fs.existsSync(migrationsDir)) {
    console.error('❌ No migrations found');
    process.exit(1);
  }
  
  const migrations = fs.readdirSync(migrationsDir)
    .filter(f => f.match(/^\d+_/))
    .sort();
  
  if (migrations.length === 0) {
    console.error('❌ No migrations found');
    process.exit(1);
  }
  
  console.log('Available migrations:');
  migrations.forEach((m, i) => {
    console.log(`   ${i + 1}. ${m}`);
  });
  
  const answer = await new Promise(resolve => {
    rl.question('\nSelect migration to rollback to (number): ', resolve);
  });
  
  const index = parseInt(answer) - 1;
  if (isNaN(index) || index < 0 || index >= migrations.length) {
    console.error('❌ Invalid selection');
    process.exit(1);
  }
  
  const targetMigration = migrations[index];
  console.log(`\n⚠️ This will rollback to: ${targetMigration}`);
  
  const confirm = await new Promise(resolve => {
    rl.question('Are you sure? (y/N): ', resolve);
  });
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ Rollback cancelled');
    process.exit(0);
  }
  
  try {
    execSync(`npx prisma migrate resolve --rolled-back "${targetMigration}"`, { stdio: 'inherit' });
    console.log('\n✅ Rollback complete!');
  } catch (error) {
    console.error('\n❌ Rollback failed:', error.message);
  }
  
  rl.close();
}

rollbackMigration();