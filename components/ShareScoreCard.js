'use client';

import { getPlayerName } from '../lib/leaderboard';

/**
 * Generate a shareable score card image and share it via Web Share API
 */
export default function generateShareCard({
  score,
  bestScore,
  accuracy,
  bestCombo,
  rating,
  newBest,
  visualHits,
  numberHits,
  drillName,
  playerName,
}) {
  const isNewBest = newBest && score >= bestScore && bestScore > 0;
  const r = rating || { letter: 'C', label: 'Keep Going', emoji: '🎯', color: '#6B7280' };

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 600, 400);
  gradient.addColorStop(0, '#1e1b4b');
  gradient.addColorStop(0.5, '#0f172a');
  gradient.addColorStop(1, '#020617');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 600, 400);

  // Border accent
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(0, 0, 600, 4);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏆 SkillDrills', 300, 55);

  // Drill name
  ctx.fillStyle = '#94a3b8';
  ctx.font = '16px Arial, sans-serif';
  ctx.fillText(drillName || 'Drill', 300, 85);

  // Divider
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 105);
  ctx.lineTo(540, 105);
  ctx.stroke();

  // Score - large display
  ctx.fillStyle = '#eab308';
  ctx.font = 'bold 64px Arial, sans-serif';
  ctx.fillText(`${score}`, 300, 170);

  // Rating
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText(`${r.emoji} ${r.letter} - ${r.label}`, 300, 205);

  // New Best badge
  if (isNewBest && score > 0) {
    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 14px Arial, sans-serif';
    const badgeX = 300;
    const badgeY = 230;
    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.roundRect(badgeX - 80, badgeY - 14, 160, 28, 14);
    ctx.fill();
    ctx.fillStyle = '#4ade80';
    ctx.fillText('🏆 NEW PERSONAL BEST!', badgeX, badgeY + 5);
  }

  // Stats row 1
  const stats = [
    { label: 'Accuracy', value: `${accuracy}%`, x: 110 },
    { label: 'Best Combo', value: `${bestCombo}x`, x: 300 },
    { label: 'Best Score', value: `${bestScore}`, x: 490 },
  ];

  ctx.font = '13px Arial, sans-serif';
  stats.forEach(s => {
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.fillText(s.label, s.x, 275);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText(s.value, s.x, 298);
    ctx.font = '13px Arial, sans-serif';
  });

  // Stats row 2 (if applies)
  if (visualHits !== undefined || numberHits !== undefined) {
    const stats2 = [];
    if (visualHits !== undefined) stats2.push({ label: 'Ball Hits', value: visualHits, x: 150 });
    if (numberHits !== undefined) stats2.push({ label: 'Number Hits', value: numberHits, x: 450 });
    stats2.forEach(s => {
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';
      ctx.font = '12px Arial, sans-serif';
      ctx.fillText(s.label, s.x, 325);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 15px Arial, sans-serif';
      ctx.fillText(String(s.value), s.x, 345);
    });
  }

  // Footer
  ctx.fillStyle = '#475569';
  ctx.font = '12px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${playerName || 'Player'} • skilldrills.online`, 300, 380);

  return canvas;
}

/**
 * Share a score card image with challenge link
 */
export async function shareScoreCard(challengeUrl, canvas) {
  try {
    // Convert canvas to blob
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('Failed to create image');

    const file = new File([blob], 'skilldrills-score.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'SkillDrills Score',
        text: 'Can you beat my score? 🎮',
        url: challengeUrl,
        files: [file],
      });
    } else {
      // Fallback: copy image to clipboard + share link
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      // Also copy text
      await navigator.clipboard.writeText(challengeUrl);
      alert('Score image copied to clipboard! Share it with friends.');
    }
  } catch (e) {
    // Fallback: just copy the link
    try {
      await navigator.clipboard.writeText(challengeUrl);
      alert('Link copied!');
    } catch (err) {}
  }
}