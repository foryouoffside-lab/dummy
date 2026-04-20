// lib/notifications/emailNotifier.js

import nodemailer from 'nodemailer';

/**
 * Email Notifier - Handles all email notifications
 * Supports various email templates and scheduling
 */
class EmailNotifier {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.initTransporter();
  }

  /**
   * Initialize email transporter
   */
  initTransporter() {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        connectionTimeout: 10000,
        socketTimeout: 10000,
      });
      this.isConfigured = true;
      console.log('✅ Email notifier configured');
    } else {
      console.warn('⚠️ Email notifier not configured - emails will be logged');
    }
  }

  /**
   * Send email with template
   */
  async sendEmail({ to, subject, template, data, from }) {
    const emailContent = this.getEmailTemplate(template, data);
    
    const mailOptions = {
      from: from || `"Global Drill System" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to,
      subject,
      html: emailContent.html,
      text: emailContent.text,
    };

    if (!this.isConfigured) {
      console.log('\n📧 [DEV MODE] Email would be sent:');
      console.log(`   To: ${to}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Template: ${template}`);
      console.log(`   Data:`, data);
      return { success: true, devMode: true };
    }

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${to} (${info.messageId})`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Email failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get email template by name
   */
  getEmailTemplate(template, data) {
    const templates = {
      welcome: this.getWelcomeTemplate(data),
      verification: this.getVerificationTemplate(data),
      passwordReset: this.getPasswordResetTemplate(data),
      dailyReminder: this.getDailyReminderTemplate(data),
      weeklyReport: this.getWeeklyReportTemplate(data),
      achievement: this.getAchievementTemplate(data),
      rankUpdate: this.getRankUpdateTemplate(data),
      subscriptionRenewal: this.getSubscriptionRenewalTemplate(data),
      subscriptionExpiring: this.getSubscriptionExpiringTemplate(data),
      newFeature: this.getNewFeatureTemplate(data),
    };

    return templates[template] || templates.welcome;
  }

  /**
   * Welcome email template
   */
  getWelcomeTemplate(data) {
    const { name, username, verificationLink } = data;
    
    return {
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none; }
            .button { display: inline-block; background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Welcome to Global Drill System!</h1>
            </div>
            <div class="content">
              <h2>Welcome aboard${name ? `, ${name}` : ''}! 👋</h2>
              <p>We're excited to have you on board. Get ready to transform your skills with our comprehensive training platform.</p>
              ${verificationLink ? `
                <div style="text-align: center;">
                  <a href="${verificationLink}" class="button">Verify Your Email</a>
                </div>
              ` : ''}
              <p>Your username: <strong>@${username}</strong></p>
              <p>Get started by exploring our 100+ drills across 8 skill categories.</p>
            </div>
            <div class="footer">
              <p>Global Drill System - Complete Human Skill Training Platform</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to Global Drill System!

Welcome aboard${name ? `, ${name}` : ''}!

We're excited to have you on board. Get ready to transform your skills.

${verificationLink ? `Verify your email: ${verificationLink}` : ''}

Your username: @${username}

Get started by exploring our 100+ drills across 8 skill categories.
      `
    };
  }

  /**
   * Verification email template
   */
  getVerificationTemplate(data) {
    const { name, verificationLink, code } = data;
    
    return {
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .code { font-size: 32px; font-weight: bold; letter-spacing: 5px; text-align: center; padding: 20px; background: #f3f4f6; border-radius: 12px; font-family: monospace; margin: 20px 0; }
            .button { display: inline-block; background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Verify Your Email</h1>
            </div>
            <div class="content" style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px;">
              <h2>Hi${name ? ` ${name}` : ''},</h2>
              <p>Please verify your email address to complete your registration.</p>
              ${code ? `<div class="code">${code}</div>` : ''}
              ${verificationLink ? `
                <div style="text-align: center;">
                  <a href="${verificationLink}" class="button">Verify Email Address</a>
                </div>
                <p>Or copy this link: ${verificationLink}</p>
              ` : ''}
              <p><strong>⚠️ This verification will expire in 24 hours.</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Verify Your Email

Hi${name ? ` ${name}` : ''},

Please verify your email address to complete your registration.

${code ? `Your verification code: ${code}` : `Verification link: ${verificationLink}`}

This verification will expire in 24 hours.
      `
    };
  }

  /**
   * Password reset email template
   */
  getPasswordResetTemplate(data) {
    const { name, resetCode, resetLink } = data;
    
    return {
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .code { font-size: 36px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 20px; background: #f3f4f6; border-radius: 12px; font-family: monospace; margin: 20px 0; }
            .button { display: inline-block; background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
            </div>
            <div class="content" style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px;">
              <h2>Hi${name ? ` ${name}` : ''},</h2>
              <p>We received a request to reset your password.</p>
              ${resetCode ? `<div class="code">${resetCode}</div>` : ''}
              ${resetLink ? `
                <div style="text-align: center;">
                  <a href="${resetLink}" class="button">Reset Password</a>
                </div>
              ` : ''}
              <p><strong>⚠️ This code will expire in 15 minutes.</strong></p>
              <p>If you didn't request this, please ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Password Reset Request

Hi${name ? ` ${name}` : ''},

We received a request to reset your password.

${resetCode ? `Your reset code: ${resetCode}` : `Reset link: ${resetLink}`}

This code will expire in 15 minutes.

If you didn't request this, please ignore this email.
      `
    };
  }

  /**
   * Daily reminder email template
   */
  getDailyReminderTemplate(data) {
    const { name, streak, drillsCompleted, goal } = data;
    
    return {
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .button { display: inline-block; background: linear-gradient(135deg, #f59e0b, #ef4444); color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⏰ Time to Train!</h1>
            </div>
            <div class="content" style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px;">
              <h2>Good ${getTimeOfDay()}${name ? `, ${name}` : ''}! 💪</h2>
              ${streak > 0 ? `<p>🔥 You're on a <strong>${streak}-day streak</strong>! Don't break it now!</p>` : ''}
              ${drillsCompleted > 0 ? `<p>📊 You completed <strong>${drillsCompleted} drills</strong> yesterday. Can you beat that today?</p>` : ''}
              ${goal ? `<p>🎯 Your daily goal: Complete ${goal} drills today.</p>` : ''}
              <p>Just 5 minutes of daily practice can make a huge difference in your performance.</p>
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}/drills" class="button">Start Training Now →</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Time to Train!

Good ${getTimeOfDay()}${name ? `, ${name}` : ''}!

${streak > 0 ? `🔥 You're on a ${streak}-day streak! Don't break it now!` : ''}
${drillsCompleted > 0 ? `📊 You completed ${drillsCompleted} drills yesterday. Can you beat that today?` : ''}

Just 5 minutes of daily practice can make a huge difference.

Start training: ${process.env.NEXTAUTH_URL}/drills
      `
    };
  }

  /**
   * Weekly report email template
   */
  getWeeklyReportTemplate(data) {
    const { name, stats, improvements, topCategory, achievements } = data;
    
    return {
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .stat-box { display: inline-block; width: 30%; text-align: center; margin: 10px 1%; padding: 15px; background: #f3f4f6; border-radius: 8px; }
            .stat-value { font-size: 24px; font-weight: bold; color: #10b981; }
            .button { display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Your Weekly Performance Report</h1>
            </div>
            <div class="content" style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px;">
              <h2>Hi${name ? ` ${name}` : ''},</h2>
              <p>Here's your performance summary for the past week:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div class="stat-box">
                  <div class="stat-value">${stats?.totalSessions || 0}</div>
                  <div>Drills Completed</div>
                </div>
                <div class="stat-box">
                  <div class="stat-value">${stats?.averageScore || 0}%</div>
                  <div>Average Score</div>
                </div>
                <div class="stat-box">
                  <div class="stat-value">${stats?.totalTime || 0} min</div>
                  <div>Time Trained</div>
                </div>
              </div>
              
              ${improvements ? `<p>📈 ${improvements}</p>` : ''}
              ${topCategory ? `<p>🏆 Your strongest category this week: <strong>${topCategory}</strong></p>` : ''}
              ${achievements?.length > 0 ? `<p>🎉 New achievements unlocked: ${achievements.join(', ')}</p>` : ''}
              
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}/analytics" class="button">View Detailed Analytics →</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Weekly Performance Report

Hi${name ? ` ${name}` : ''},

Here's your performance summary for the past week:

Drills Completed: ${stats?.totalSessions || 0}
Average Score: ${stats?.averageScore || 0}%
Time Trained: ${stats?.totalTime || 0} minutes

${improvements ? improvements : ''}
${topCategory ? `Your strongest category: ${topCategory}` : ''}

View detailed analytics: ${process.env.NEXTAUTH_URL}/analytics
      `
    };
  }

  /**
   * Achievement unlocked email template
   */
  getAchievementTemplate(data) {
    const { name, achievementName, achievementIcon, achievementDescription, xpEarned } = data;
    
    return {
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .achievement-icon { font-size: 64px; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏆 Achievement Unlocked!</h1>
            </div>
            <div class="content" style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px;">
              <div class="achievement-icon">${achievementIcon || '🏆'}</div>
              <h2 style="text-align: center;">${achievementName}</h2>
              <p style="text-align: center; color: #6b7280;">${achievementDescription}</p>
              ${xpEarned ? `<p style="text-align: center;">✨ +${xpEarned} XP earned!</p>` : ''}
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}/profile" class="button" style="background: linear-gradient(135deg, #f59e0b, #ef4444);">View Your Achievements →</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Achievement Unlocked!

${achievementName}
${achievementDescription}
${xpEarned ? `+${xpEarned} XP earned!` : ''}

View your achievements: ${process.env.NEXTAUTH_URL}/profile
      `
    };
  }

  /**
   * Rank update email template
   */
  getRankUpdateTemplate(data) {
    const { name, oldRank, newRank, improvement } = data;
    
    return {
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📈 Rank Update</h1>
            </div>
            <div class="content" style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px;">
              <h2>Hi${name ? ` ${name}` : ''},</h2>
              <p>Your global rank has changed!</p>
              <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 48px;">${oldRank} → ${newRank}</span>
              </div>
              <p>${improvement ? `You climbed ${improvement} spots! 🚀` : ''}</p>
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}/leaderboard" class="button" style="background: linear-gradient(135deg, #2563eb, #7c3aed);">View Leaderboard →</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Rank Update

Hi${name ? ` ${name}` : ''},

Your global rank has changed: ${oldRank} → ${newRank}

${improvement ? `You climbed ${improvement} spots!` : ''}

View leaderboard: ${process.env.NEXTAUTH_URL}/leaderboard
      `
    };
  }

  /**
   * Subscription renewal email template
   */
  getSubscriptionRenewalTemplate(data) {
    const { name, planName, amount, nextBillingDate } = data;
    
    return {
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔄 Subscription Renewal</h1>
            </div>
            <div class="content" style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px;">
              <h2>Hi${name ? ` ${name}` : ''},</h2>
              <p>Your ${planName} subscription has been successfully renewed.</p>
              <p>Amount: <strong>$${amount}</strong></p>
              <p>Next billing date: ${new Date(nextBillingDate).toLocaleDateString()}</p>
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}/profile/subscription" class="button" style="background: linear-gradient(135deg, #10b981, #059669);">Manage Subscription →</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Subscription Renewal

Hi${name ? ` ${name}` : ''},

Your ${planName} subscription has been successfully renewed.

Amount: $${amount}
Next billing date: ${new Date(nextBillingDate).toLocaleDateString()}

Manage subscription: ${process.env.NEXTAUTH_URL}/profile/subscription
      `
    };
  }

  /**
   * Subscription expiring email template
   */
  getSubscriptionExpiringTemplate(data) {
    const { name, planName, daysLeft } = data;
    
    return {
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ef4444, #dc2626); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚠️ Subscription Expiring Soon</h1>
            </div>
            <div class="content" style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px;">
              <h2>Hi${name ? ` ${name}` : ''},</h2>
              <p>Your ${planName} subscription will expire in <strong>${daysLeft} days</strong>.</p>
              <p>Renew now to continue enjoying premium features and avoid interruption.</p>
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}/pricing" class="button" style="background: linear-gradient(135deg, #ef4444, #dc2626);">Renew Now →</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Subscription Expiring Soon

Hi${name ? ` ${name}` : ''},

Your ${planName} subscription will expire in ${daysLeft} days.

Renew now to continue enjoying premium features.

Renew: ${process.env.NEXTAUTH_URL}/pricing
      `
    };
  }

  /**
   * New feature email template
   */
  getNewFeatureTemplate(data) {
    const { name, featureName, featureDescription, featureIcon } = data;
    
    return {
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8b5cf6, #6d28d9); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ New Feature Alert!</h1>
            </div>
            <div class="content" style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px;">
              <div style="font-size: 48px; text-align: center;">${featureIcon || '✨'}</div>
              <h2 style="text-align: center;">${featureName}</h2>
              <p style="text-align: center;">${featureDescription}</p>
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}/drills" class="button" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9);">Try It Now →</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Feature Alert!

${featureName}
${featureDescription}

Try it now: ${process.env.NEXTAUTH_URL}/drills
      `
    };
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(to, name, username) {
    return this.sendEmail({
      to,
      subject: 'Welcome to Global Drill System! 🎯',
      template: 'welcome',
      data: { name, username, verificationLink: `${process.env.NEXTAUTH_URL}/login` }
    });
  }

  /**
   * Send verification email
   */
  async sendVerificationEmail(to, name, code, verificationLink) {
    return this.sendEmail({
      to,
      subject: 'Verify Your Email - Global Drill System',
      template: 'verification',
      data: { name, code, verificationLink }
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(to, name, resetCode, resetLink) {
    return this.sendEmail({
      to,
      subject: 'Password Reset Request - Global Drill System',
      template: 'passwordReset',
      data: { name, resetCode, resetLink }
    });
  }

  /**
   * Send daily reminder
   */
  async sendDailyReminder(to, name, streak, drillsCompleted, goal) {
    return this.sendEmail({
      to,
      subject: '⏰ Time to Train - Global Drill System',
      template: 'dailyReminder',
      data: { name, streak, drillsCompleted, goal }
    });
  }

  /**
   * Send weekly report
   */
  async sendWeeklyReport(to, name, stats, improvements, topCategory, achievements) {
    return this.sendEmail({
      to,
      subject: '📊 Your Weekly Performance Report',
      template: 'weeklyReport',
      data: { name, stats, improvements, topCategory, achievements }
    });
  }

  /**
   * Send achievement notification
   */
  async sendAchievementNotification(to, name, achievementName, achievementIcon, achievementDescription, xpEarned) {
    return this.sendEmail({
      to,
      subject: `🏆 Achievement Unlocked: ${achievementName}!`,
      template: 'achievement',
      data: { name, achievementName, achievementIcon, achievementDescription, xpEarned }
    });
  }

  /**
   * Send rank update notification
   */
  async sendRankUpdate(to, name, oldRank, newRank, improvement) {
    return this.sendEmail({
      to,
      subject: '📈 Your Rank Has Changed!',
      template: 'rankUpdate',
      data: { name, oldRank, newRank, improvement }
    });
  }

  /**
   * Send subscription renewal confirmation
   */
  async sendSubscriptionRenewal(to, name, planName, amount, nextBillingDate) {
    return this.sendEmail({
      to,
      subject: '🔄 Subscription Renewed Successfully',
      template: 'subscriptionRenewal',
      data: { name, planName, amount, nextBillingDate }
    });
  }

  /**
   * Send subscription expiring reminder
   */
  async sendSubscriptionExpiring(to, name, planName, daysLeft) {
    return this.sendEmail({
      to,
      subject: '⚠️ Your Subscription is Expiring Soon',
      template: 'subscriptionExpiring',
      data: { name, planName, daysLeft }
    });
  }
}

// Helper function to get time of day
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

export default new EmailNotifier();