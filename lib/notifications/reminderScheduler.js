// lib/notifications/reminderScheduler.js

import { prisma } from '@/lib/db/prisma';
import emailNotifier from './emailNotifier';

/**
 * Reminder Scheduler - Manages scheduled reminders and notifications
 * Handles daily, weekly, and custom reminders
 */
class ReminderScheduler {
  constructor() {
    this.isRunning = false;
    this.intervals = [];
    this.reminderTypes = {
      DAILY: 'daily',
      WEEKLY: 'weekly',
      STREAK: 'streak',
      INACTIVITY: 'inactivity',
      SUBSCRIPTION: 'subscription'
    };
  }

  /**
   * Start the reminder scheduler
   */
  start() {
    if (this.isRunning) {
      console.log('⚠️ Reminder scheduler already running');
      return;
    }
    
    this.isRunning = true;
    console.log('✅ Reminder scheduler started');
    
    // Check for reminders every hour
    this.scheduleInterval(() => this.checkDailyReminders(), 60 * 60 * 1000);
    
    // Check for weekly reports every Sunday at 9 AM
    this.scheduleWeeklyCheck();
    
    // Check for streak reminders every 6 hours
    this.scheduleInterval(() => this.checkStreakReminders(), 6 * 60 * 60 * 1000);
    
    // Check for inactivity reminders every day
    this.scheduleInterval(() => this.checkInactivityReminders(), 24 * 60 * 60 * 1000);
    
    // Check for subscription reminders every day
    this.scheduleInterval(() => this.checkSubscriptionReminders(), 24 * 60 * 60 * 1000);
  }

  /**
   * Stop the reminder scheduler
   */
  stop() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    this.isRunning = false;
    console.log('⏹️ Reminder scheduler stopped');
  }

  /**
   * Schedule an interval
   */
  scheduleInterval(callback, intervalMs) {
    const interval = setInterval(callback, intervalMs);
    this.intervals.push(interval);
    // Run once immediately
    setTimeout(callback, 5000);
    return interval;
  }

  /**
   * Schedule weekly check (Sunday at 9 AM)
   */
  scheduleWeeklyCheck() {
    const now = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
    nextSunday.setHours(9, 0, 0, 0);
    
    const timeUntilSunday = nextSunday - now;
    
    setTimeout(() => {
      this.checkWeeklyReminders();
      // Then schedule every week
      setInterval(() => this.checkWeeklyReminders(), 7 * 24 * 60 * 60 * 1000);
    }, timeUntilSunday);
  }

  /**
   * Check and send daily reminders
   */
  async checkDailyReminders() {
    console.log('📧 Checking daily reminders...');
    
    try {
      // Get users who have opted in for daily reminders
      const users = await prisma.user.findMany({
        where: {
          settings: {
            path: ['notifications', 'dailyReminder'],
            equals: true
          }
        },
        select: {
          id: true,
          email: true,
          name: true,
          streak: true,
          lastActive: true
        }
      });
      
      for (const user of users) {
        // Check if user has been active today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const lastActiveDate = user.lastActive ? new Date(user.lastActive) : null;
        const wasActiveToday = lastActiveDate && lastActiveDate >= today;
        
        if (!wasActiveToday) {
          await emailNotifier.sendDailyReminder(
            user.email,
            user.name,
            user.streak,
            0,
            3 // Default daily goal
          );
          
          // Add small delay to avoid rate limiting
          await this.delay(1000);
        }
      }
      
      console.log(`✅ Sent daily reminders to ${users.length} users`);
    } catch (error) {
      console.error('❌ Failed to send daily reminders:', error);
    }
  }

  /**
   * Check and send weekly reminders
   */
  async checkWeeklyReminders() {
    console.log('📧 Checking weekly reminders...');
    
    try {
      const users = await prisma.user.findMany({
        where: {
          settings: {
            path: ['notifications', 'weeklyReport'],
            equals: true
          }
        },
        select: {
          id: true,
          email: true,
          name: true,
          drillSessions: {
            where: {
              completedAt: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              }
            }
          }
        }
      });
      
      for (const user of users) {
        const sessions = user.drillSessions;
        const totalSessions = sessions.length;
        const averageScore = totalSessions > 0
          ? Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / totalSessions)
          : 0;
        const totalTime = Math.floor(sessions.reduce((sum, s) => sum + s.duration, 0) / 60);
        
        // Calculate improvements
        const improvements = this.calculateImprovements(sessions);
        
        // Find top category
        const categoryStats = {};
        sessions.forEach(s => {
          categoryStats[s.category] = (categoryStats[s.category] || 0) + s.score;
        });
        const topCategory = Object.keys(categoryStats).length > 0
          ? Object.keys(categoryStats).reduce((a, b) => categoryStats[a] > categoryStats[b] ? a : b)
          : null;
        
        await emailNotifier.sendWeeklyReport(
          user.email,
          user.name,
          { totalSessions, averageScore, totalTime },
          improvements,
          topCategory,
          [] // Achievements would be fetched separately
        );
        
        await this.delay(1000);
      }
      
      console.log(`✅ Sent weekly reports to ${users.length} users`);
    } catch (error) {
      console.error('❌ Failed to send weekly reports:', error);
    }
  }

  /**
   * Check and send streak reminders
   */
  async checkStreakReminders() {
    console.log('📧 Checking streak reminders...');
    
    try {
      // Users with streaks of 3, 7, 14, 21, 30 days
      const milestoneStreaks = [3, 7, 14, 21, 30];
      
      for (const streak of milestoneStreaks) {
        const users = await prisma.user.findMany({
          where: {
            streak: streak,
            settings: {
              path: ['notifications', 'streakReminder'],
              equals: true
            }
          },
          select: {
            id: true,
            email: true,
            name: true,
            streak: true
          }
        });
        
        for (const user of users) {
          await emailNotifier.sendEmail({
            to: user.email,
            subject: `🔥 ${user.streak}-Day Streak! Keep Going!`,
            template: 'dailyReminder',
            data: {
              name: user.name,
              streak: user.streak,
              drillsCompleted: 0,
              goal: 3
            }
          });
          
          await this.delay(1000);
        }
      }
    } catch (error) {
      console.error('❌ Failed to send streak reminders:', error);
    }
  }

  /**
   * Check and send inactivity reminders
   */
  async checkInactivityReminders() {
    console.log('📧 Checking inactivity reminders...');
    
    try {
      const inactiveDays = [3, 7, 14];
      
      for (const days of inactiveDays) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        const users = await prisma.user.findMany({
          where: {
            lastActive: { lt: cutoffDate },
            settings: {
              path: ['notifications', 'inactivityReminder'],
              equals: true
            }
          },
          select: {
            id: true,
            email: true,
            name: true,
            lastActive: true,
            streak: true
          }
        });
        
        for (const user of users) {
          await emailNotifier.sendEmail({
            to: user.email,
            subject: `We miss you! Come back to Global Drill System`,
            template: 'dailyReminder',
            data: {
              name: user.name,
              streak: 0,
              drillsCompleted: 0,
              goal: 1
            }
          });
          
          await this.delay(1000);
        }
      }
    } catch (error) {
      console.error('❌ Failed to send inactivity reminders:', error);
    }
  }

  /**
   * Check and send subscription reminders
   */
  async checkSubscriptionReminders() {
    console.log('📧 Checking subscription reminders...');
    
    try {
      const users = await prisma.user.findMany({
        where: {
          subscriptions: {
            some: {
              status: 'active',
              currentPeriodEnd: {
                lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                gt: new Date()
              }
            }
          }
        },
        include: {
          subscriptions: true
        }
      });
      
      for (const user of users) {
        const subscription = user.subscriptions[0];
        if (!subscription) continue;
        
        const daysLeft = Math.ceil((new Date(subscription.currentPeriodEnd) - new Date()) / (1000 * 60 * 60 * 24));
        
        if (daysLeft <= 7 && daysLeft > 0) {
          await emailNotifier.sendSubscriptionExpiring(
            user.email,
            user.name,
            subscription.planId,
            daysLeft
          );
          
          await this.delay(1000);
        }
      }
    } catch (error) {
      console.error('❌ Failed to send subscription reminders:', error);
    }
  }

  /**
   * Schedule a custom reminder for a user
   */
  async scheduleCustomReminder(userId, reminderData) {
    const { type, time, message, recurring } = reminderData;
    
    const reminder = {
      userId,
      type,
      scheduledFor: time,
      message,
      recurring,
      status: 'pending',
      createdAt: new Date()
    };
    
    // Store in database
    await prisma.scheduledReminder.create({
      data: reminder
    });
    
    // Schedule the reminder
    const delay = new Date(time) - new Date();
    if (delay > 0) {
      setTimeout(async () => {
        await this.sendCustomReminder(reminder);
      }, delay);
    }
    
    return reminder;
  }

  /**
   * Send a custom reminder
   */
  async sendCustomReminder(reminder) {
    const user = await prisma.user.findUnique({
      where: { id: reminder.userId },
      select: { email: true, name: true }
    });
    
    if (user) {
      await emailNotifier.sendEmail({
        to: user.email,
        subject: 'Reminder: ' + reminder.message,
        template: 'dailyReminder',
        data: { name: user.name, message: reminder.message }
      });
      
      // Update reminder status
      await prisma.scheduledReminder.update({
        where: { id: reminder.id },
        data: { status: 'sent', sentAt: new Date() }
      });
      
      // If recurring, schedule next occurrence
      if (reminder.recurring) {
        const nextTime = new Date(reminder.scheduledFor);
        if (reminder.recurring === 'daily') {
          nextTime.setDate(nextTime.getDate() + 1);
        } else if (reminder.recurring === 'weekly') {
          nextTime.setDate(nextTime.getDate() + 7);
        }
        
        await this.scheduleCustomReminder(reminder.userId, {
          ...reminder,
          time: nextTime.toISOString()
        });
      }
    }
  }

  /**
   * Calculate improvements from session data
   */
  calculateImprovements(sessions) {
    if (sessions.length < 2) return null;
    
    const firstHalf = sessions.slice(0, Math.floor(sessions.length / 2));
    const secondHalf = sessions.slice(Math.floor(sessions.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, s) => sum + s.score, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, s) => sum + s.score, 0) / secondHalf.length;
    const improvement = secondAvg - firstAvg;
    
    if (improvement > 5) {
      return `Your average score improved by ${Math.round(improvement)}% this week! 🚀`;
    } else if (improvement < -5) {
      return `Your average score decreased by ${Math.abs(Math.round(improvement))}% this week. Keep practicing! 💪`;
    }
    return null;
  }

  /**
   * Delay helper
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new ReminderScheduler();