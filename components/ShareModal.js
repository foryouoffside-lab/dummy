'use client';

import { useState, useCallback } from 'react';
import { Share2, X, Check, Link, Globe, MessageCircle, Briefcase, ExternalLink } from 'lucide-react';

/**
 * Share Modal component for drill results
 * @param {Object} props
 * @param {string} props.title - Drill title
 * @param {string} props.text - Share text
 * @param {string} props.url - Share URL
 * @param {Object} props.stats - Performance stats to include
 */
export default function ShareModal({ title, text, url, stats = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = text || `I scored ${stats.score || '?'} on ${title || 'a drill'}! Can you beat me? 🎯`;

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const shareLinks = [
    {
      name: 'Twitter / X',
      icon: ExternalLink,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-500',
    },
    {
      name: 'Facebook',
      icon: Globe,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-blue-600',
    },
    {
      name: 'LinkedIn',
      icon: Briefcase,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-700',
    },
    {
      name: 'Reddit',
      icon: MessageCircle,
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-orange-500',
    },
  ];

  return (
    <>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
        aria-label="Share results"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Share</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95"
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close share dialog"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <h2 id="share-modal-title" className="text-xl font-bold mb-2">Share Your Results</h2>
            {stats.score && (
              <p className="text-gray-600 mb-4">
                Score: <span className="font-semibold text-teal-600">{stats.score}</span>
                {stats.accuracy && ` | Accuracy: ${stats.accuracy}%`}
                {stats.wpm && ` | WPM: ${stats.wpm}`}
              </p>
            )}

            {/* Social Share Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-lg ${link.color} hover:text-white transition-colors`}
                  onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              ))}
            </div>

            {/* Copy Link */}
            <div className="flex gap-2">
              <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 truncate border">
                {shareUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Link className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}