// scripts/restore-database.js

/**
 * Script to restore SQLite database from backup
 * Run with: node scripts/restore-database.js [backup-file]
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DB_PATH = path.join(process.cwd(), 'prisma', 'dev.db');
const BACKUP_DIR = path.join(process.cwd(), 'backups');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function restoreDatabase() {
  const backupFile = process.argv[2];
  let backupPath;
  
  console.log('🔄 Starting database restore...\n');
  
  if (backupFile) {
    backupPath = path.isAbsolute(backupFile) ? backupFile : path.join(BACKUP_DIR, backupFile);
  } else {
    // List available backups
    if (!fs.existsSync(BACKUP_DIR)) {
      console.error('❌ No backups directory found');
      process.exit(1);
    }
    
    const backups = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('dev.db.backup'))
      .sort()
      .reverse();
    
    if (backups.length === 0) {
      console.error('❌ No backups found');
      process.exit(1);
    }
    
    console.log('Available backups:');
    backups.forEach((backup, index) => {
      const stats = fs.statSync(path.join(BACKUP_DIR, backup));
      const date = new Date(stats.mtime).toLocaleString();
      console.log(`   ${index + 1}. ${backup} (${date})`);
    });
    
    const answer = await question('\nSelect backup number (or enter filename): ');
    const selectedIndex = parseInt(answer) - 1;
    
    if (!isNaN(selectedIndex) && selectedIndex >= 0 && selectedIndex < backups.length) {
      backupPath = path.join(BACKUP_DIR, backups[selectedIndex]);
    } else {
      backupPath = path.join(BACKUP_DIR, answer);
    }
  }
  
  if (!fs.existsSync(backupPath)) {
    console.error(`❌ Backup file not found: ${backupPath}`);
    process.exit(1);
  }
  
  // Confirm restore
  const stats = fs.statSync(backupPath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n📁 Backup file: ${path.basename(backupPath)}`);
  console.log(`   Size: ${fileSizeMB} MB`);
  
  const confirm = await question('\n⚠️ This will overwrite your current database. Continue? (y/N): ');
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ Restore cancelled');
    process.exit(0);
  }
  
  try {
    // Create backup of current database before restore
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const preRestoreBackup = path.join(BACKUP_DIR, `dev.db.pre-restore.${timestamp}.db`);
    fs.copyFileSync(DB_PATH, preRestoreBackup);
    console.log(`\n💾 Pre-restore backup created: ${preRestoreBackup}`);
    
    // Restore
    fs.copyFileSync(backupPath, DB_PATH);
    console.log(`✅ Database restored from: ${backupPath}`);
    
  } catch (error) {
    console.error('❌ Restore failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

restoreDatabase()
  .then(() => console.log('\n🎉 Restore complete!'))
  .catch(console.error);