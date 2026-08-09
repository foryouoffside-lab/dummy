'use client';

import { getPlayerName } from '../lib/leaderboard';

/**
 * Generate a shareable score card image and share it via Web Share API
 */
export default function generateShareCard({
  score,
  bestScore,
  accuracy,
  rating,
  newBest,
  visualHits = 0,
  numberHits = 0,
  bestCombo = 0,
  drillName,
  playerName,
}) {
  const isNewBest = newBest && score >= bestScore && bestScore > 0;
  const r = rating || { letter: 'C', label: 'Keep Going', emoji: '🎯', color: '#6B7280' };

  // Render at 3840x2560 (4K UHD width) for ultra-crisp resolution
  const SCALE = 6.4;
  const canvas = document.createElement('canvas');
  canvas.width = 600 * SCALE;
  canvas.height = 400 * SCALE;
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

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
    { label: 'Grade', value: `${r.letter}`, x: 300 },
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
 * Generate a shareable session-summary image for drills that track
 * settings/reps instead of a score (e.g. free-practice pursuit-tracking
 * drills). Same 4K canvas + visual language as generateShareCard, but the
 * hero slot shows the drill name instead of a score number.
 */
export function generateSessionCard({
  drillName,
  badgeText,
  stats, // [{ label, value }] — up to 4 rendered as a 2x2 grid
  playerName,
}) {
  const SCALE = 6.4;
  const canvas = document.createElement('canvas');
  canvas.width = 600 * SCALE;
  canvas.height = 400 * SCALE;
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

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

  // Drill name — the hero element for scoreless drills
  ctx.fillStyle = '#eab308';
  ctx.font = 'bold 40px Arial, sans-serif';
  const maxNameWidth = 520;
  let nameFontSize = 40;
  ctx.font = `bold ${nameFontSize}px Arial, sans-serif`;
  while (ctx.measureText(drillName || 'Drill').width > maxNameWidth && nameFontSize > 22) {
    nameFontSize -= 2;
    ctx.font = `bold ${nameFontSize}px Arial, sans-serif`;
  }
  ctx.fillText(drillName || 'Drill', 300, 135);

  // Badge
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 16px Arial, sans-serif';
  ctx.fillText(badgeText || 'Session Complete', 300, 165);

  // Divider
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 190);
  ctx.lineTo(540, 190);
  ctx.stroke();

  // Stats — 2x2 grid
  const gridStats = (stats || []).slice(0, 4);
  const cols = gridStats.length > 2 ? 2 : gridStats.length;
  const rows = Math.ceil(gridStats.length / 2);
  const cellW = 480 / Math.max(cols, 1);
  const startX = 300 - (240);
  const rowYs = [250, 320];

  gridStats.forEach((s, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = 300 - 120 + col * 240;
    const y = rowYs[row] || (250 + row * 70);

    ctx.fillStyle = '#64748b';
    ctx.font = '13px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(s.label, x, y);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText(String(s.value), x, y + 28);
  });

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
    // Convert canvas to JPEG blob (compressed, crisp, mobile friendly)
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.92));
    if (!blob) throw new Error('Failed to create image');

    const file = new File([blob], 'skilldrills-score.jpg', { type: 'image/jpeg' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'SkillDrills Score',
        text: 'Can you beat my score? 🎮',
        url: challengeUrl,
        files: [file],
      });
    } else {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/jpeg': blob })
        ]);
        alert('Score image copied to clipboard! Share it with friends.');
      } catch (err) {
        await navigator.clipboard.writeText(challengeUrl);
        alert('Link copied to clipboard!');
      }
    }
  } catch (e) {
    try {
      await navigator.clipboard.writeText(challengeUrl);
      alert('Link copied!');
    } catch (err) {}
  }
}