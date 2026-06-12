"use client";

import { usePathname } from 'next/navigation';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function FPSLayout({ children }) {
  const pathname = usePathname();
  // Check if current page is the main FPS hub index page
  const isHubPage = pathname === '/drills/fps' || pathname === '/drills/fps/';

  if (isHubPage) {
    return <>{children}</>;
  }

  // Otherwise, display Sector Locked screen for all individual FPS drills
  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.08) 0%, rgba(5, 5, 8, 1) 85%)'
        }}
      />
      <div className="relative z-10 max-w-md w-full bg-[#0E111A]/80 border border-red-500/20 rounded-2xl p-8 text-center backdrop-blur-md shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-6 border border-red-500/30 bg-red-500/10 rounded-full flex items-center justify-center animate-pulse">
          <Lock className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-3">
          Sector Locked
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          This FPS conditioning module is temporarily locked for maintenance, optimization, and system upgrades.
        </p>
        <div className="flex flex-col gap-3">
          <Link 
            href="/drills/fps" 
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition duration-200 uppercase text-xs tracking-wider"
          >
            Back to FPS Hub
          </Link>
          <Link 
            href="/drills" 
            className="w-full py-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 rounded-xl transition duration-200 uppercase text-xs tracking-wider font-semibold"
          >
            All Training Sectors
          </Link>
        </div>
      </div>
    </div>
  );
}
