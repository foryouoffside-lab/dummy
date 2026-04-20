// scripts/run-migration.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  console.log('🔄 Running database migration...\n');
  
  // 1. Check if migration folder exists
  const migrationsDir = path.join(process.cwd(), 'prisma', 'migrations');
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }
  
  // 2. Create migration folder with timestamp
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const migrationName = `${timestamp}_init`;
  const migrationDir = path.join(migrationsDir, migrationName);
  
  if (!fs.existsSync(migrationDir)) {
    fs.mkdirSync(migrationDir, { recursive: true });
  }
  
  // 3. Write migration.sql file
  const migrationSQL = `-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "bio" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastActive" DATETIME,
    "emailVerified" DATETIME,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "DrillSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "drillId" TEXT NOT NULL,
    "drillName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "accuracy" REAL NOT NULL,
    "reactionTime" INTEGER,
    "duration" INTEGER NOT NULL,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DrillSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "requirement" INTEGER NOT NULL,
    "type" TEXT NOT NULL
);

CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "earnedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "Achievement_name_key" ON "Achievement"("name");
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");`;
  
  fs.writeFileSync(path.join(migrationDir, 'migration.sql'), migrationSQL);
  console.log(`✅ Migration file created: ${migrationName}`);
  
  // 4. Apply migration
  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('\n✅ Migration applied successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
  
  // 5. Generate Prisma client
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('\n✅ Prisma client generated!');
  } catch (error) {
    console.error('\n❌ Client generation failed:', error.message);
  }
}

runMigration();