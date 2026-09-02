'use client';

import React, { useState, useRef } from 'react';
import { RefreshCw, Share2, LogOut, Copy, Check, MessageSquare, Download, X } from 'lucide-react';
import { toPng, toBlob } from 'html-to-image';
import { useTranslation } from '@/lib/i18n/useTranslation';

const ACCENTS = {
  emerald: { glow: 'rgba(16,185,129,.12)',  btn: 'from-emerald-600 to-teal-600' },
  blue:    { glow: 'rgba(59,130,246,.12)',  btn: 'from-blue-600 to-indigo-600' },
  violet:  { glow: 'rgba(139,92,246,.12)',  btn: 'from-violet-600 to-purple-600' },
  amber:   { glow: 'rgba(245,158,11,.12)',  btn: 'from-amber-600 to-orange-600' },
  rose:    { glow: 'rgba(244,63,94,.12)',   btn: 'from-rose-600 to-pink-600' },
  cyan:    { glow: 'rgba(34,211,238,.12)',  btn: 'from-cyan-600 to-sky-600' },
};

export default function DrillResultCard({
  accent = 'emerald',
  grade,
  score,
  isNewBest = false,
  stats = [],
  onPlayAgain,
  onShare,
  onExit,
}) {
  const { t } = useTranslation();
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef(null);

  if (!grade) return null;
  const theme = ACCENTS[accent] || ACCENTS.emerald;
  const tiles = stats.slice(0, 4);

  const handleNativeOrModalShare = async () => {
    if (onShare) {
      onShare();
      return;
    }
    setShowShareModal(true);
  };

  const copyCardImage = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const blob = await toBlob(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      if (blob && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        downloadCardImage();
      }
    } catch (e) {
      console.warn('Clipboard image write failed, falling back to download', e);
      downloadCardImage();
    } finally {
      setIsExporting(false);
    }
  };

  const downloadCardImage = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `SkillDrills-Score-${score}.png`;
      link.href = dataUrl;
      link.click();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to export scorecard image', err);
    } finally {
      setIsExporting(false);
    }
  };

  const shareText = `I just scored ${score} pts (Rank ${grade.letter} - ${grade.label}) on SkillDrills! Can you beat my score? %23SkillDrills %23AimTrainer %23BrainTraining`;
  const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : 'https://skilldrills.online';

  return (
    <div
      className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans"
      style={{ background: 'rgba(5,5,8,0.97)' }}
      onPointerDown={e => e.stopPropagation()}
    >
      {/* Captured Scorecard Area */}
      <div ref={cardRef} className="flex w-full h-full relative">
        {/* Grade panel */}
        <div
          className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4 relative"
          style={{ background: `radial-gradient(ellipse 260px 200px at 50% 30%, ${theme.glow}, transparent 70%)` }}
        >
          {isNewBest && (
            <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
              NEW BEST
            </span>
          )}
          <div className={`text-5xl sm:text-6xl font-black leading-none ${grade.color}`}>{grade.letter}</div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">{grade.label}</div>
          <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">{score}</div>
          <div className="text-[9px] uppercase tracking-widest text-slate-500">{t('ui.points', 'Points')}</div>

          {/* Watermark */}
          <div className="absolute bottom-2 text-[8px] font-bold tracking-wider text-slate-500 uppercase">
            SkillDrills.online
          </div>
        </div>

        {/* Stats + actions */}
        <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {tiles.map((s, i) => (
              <div key={i} className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                <p className="text-sm sm:text-base font-black text-white tabular-nums">
                  {s.value}
                  {s.suffix && <span className="text-[10px] text-gray-500">{s.suffix}</span>}
                </p>
                <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onPlayAgain}
              className={`flex-1 py-3 rounded-[13px] bg-gradient-to-r ${theme.btn} text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5`}
            >
              <RefreshCw className="w-3.5 h-3.5" /> {t('ui.playAgain', 'Play Again')}
            </button>
            <button
              onClick={handleNativeOrModalShare}
              className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
              title="Share Score Card"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onExit}
              className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
              title="Exit Fullscreen & Return"
            >
              <LogOut className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Viral Share Modal */}
      {showShareModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-5 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h3 className="text-sm font-black uppercase tracking-wider text-white mb-1">
              Share Your Score
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Challenge friends or post your score card to Reddit/Discord!
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={copyCardImage}
                disabled={isExporting}
                className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Scorecard Copied to Clipboard!' : isExporting ? 'Generating Image...' : 'Copy Score Card Image'}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 text-sky-300 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" /> Twitter / X
                </a>
                <a
                  href={`https://reddit.com/submit?url=${shareUrl}&title=I%20hit%20${score}%20points%20on%20SkillDrills!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-300 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Reddit
                </a>
              </div>

              <button
                onClick={downloadCardImage}
                className="py-2 text-[11px] text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1 mt-1"
              >
                <Download className="w-3 h-3" /> Download PNG Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
