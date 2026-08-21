'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function DrillAccordion({ id, title, subtitle = null, icon: Icon = null, iconColor = 'text-emerald-400', iconBg = 'bg-emerald-500/10 border-emerald-500/20', isOpen, onToggle, children }) {
  return (
    <div className="mt-4 border border-gray-800 bg-black rounded-2xl overflow-hidden transition-all duration-300">
      <button 
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`p-2 rounded-lg border ${iconBg} ${iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
            {subtitle && <p className="text-xs text-gray-300 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? `rotate-180 ${iconColor}` : ''}`} />
      </button>
      {/* Body uses fx-fade-up (a real keyframe in globals.css). It previously used
          `animate-in fade-in duration-200`, which is a silent no-op here — this repo
          has no tailwindcss-animate plugin installed. */}
      {/* Always rendered into the DOM, hidden with the `hidden` attribute when
          collapsed. Previously this was `{isOpen && ...}`, which kept every
          drill's instructions, About copy and FAQ out of the server HTML
          entirely — Googlebot saw ~160 words per drill page and the FAQPage
          JSON-LD referenced answers that appeared nowhere on the page.
          `hidden` is the correct ARIA pattern for an aria-controls region and
          keeps the content crawlable. */}
      <div
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        hidden={!isOpen}
        className={`px-6 pb-6 pt-4 border-t border-gray-800/80 space-y-6 text-gray-100 ${isOpen ? 'fx-fade-up' : ''}`}
      >
        {children}
      </div>
    </div>
  );
}
