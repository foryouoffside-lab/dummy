// scripts/backup-database.js

/**
 * Script to backup SQLite database
 * Run with: node scripts/backup-database.js
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'prisma', 'dev.db');
const BACKUP_DIR = path.join(process.cwd(), 'backups');

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log('📁 Created backup directory');
  }
}

function getBackupFilename() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `dev.db.backup.${timestamp}.db`;
}

async function backupDatabase() {
  console.log('💾 Starting database backup...\n');
  
  ensureBackupDir();
  
  if (!fs.existsSync(DB_PATH)) {
    console.error('❌ Database file not found');
    process.exit(1);
  }
  
  const backupFilename = getBackupFilename();
  const backupPath = path.join(BACKUP_DIR, backupFilename);
  
  try {
    fs.copyFileSync(DB_PATH, backupPath);
    console.log(`✅ Database backed up to: ${backupPath}`);
    
    const stats = fs.statSync(backupPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   File size: ${fileSizeMB} MB`);
    
    // Clean old backups (keep last 10)
    const backups = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('dev.db.backup'))
      .sort()
      .reverse();
    
    const toDelete = backups.slice(10);
    for (const file of toDelete) {
      fs.unlinkSync(path.join(BACKUP_DIR, file));
      console.log(`🗑️ Deleted old backup: ${file}`);
    }
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

backupDatabase()
  .then(() => console.log('\n🎉 Backup complete!'))
  .catch(console.error);