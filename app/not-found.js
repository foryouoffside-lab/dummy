import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { DRILLS } from '@/lib/drillsRegistry';

export const metadata = {
  title: 'Page Not Found - SkillDrills',
  description: `The page you are looking for does not exist. Explore ${DRILLS.length}+ free brain training, FPS aim drills, cognitive exercises, memory games, typing tests, and mental fitness tools on SkillDrills.`,
  keywords: ['404', 'page not found', 'skilldrills', 'free drills', 'brain training', 'FPS aim trainer'],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Page Not Found - SkillDrills',
    description: `This page does not exist. Discover ${DRILLS.length}+ free training drills on SkillDrills.`,
    url: 'https://skilldrills.online',
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-lg text-center bg-surface-1 border border-hairline rounded-2xl p-8 sm:p-12 shadow-xl">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-8 h-8 text-blue-500" aria-hidden="true" />
        </div>

        <p className="text-2xs font-mono font-bold uppercase tracking-widest text-ink-3 mb-3">
          Error Code: 404
        </p>

        <div
          className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight leading-none"
          aria-hidden="true"
        >
          404
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-ink-1 mb-3 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-ink-2 mb-8 leading-relaxed">
          The drill page you&apos;re looking for doesn&apos;t exist or has been moved.
          Explore {DRILLS.length}+ free training drills below.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02]"
          >
            Go Home
          </Link>
          <Link
            href="/drills"
            className="px-6 py-3 bg-surface-2 text-ink-1 rounded-lg font-semibold border border-hairline hover:border-hairline-2 transition-all"
          >
            Browse All Drills
          </Link>
          <Link
            href="/drills/fps"
            className="px-6 py-3 bg-surface-2 text-ink-1 rounded-lg font-semibold border border-hairline hover:border-hairline-2 transition-all"
          >
            FPS Drills
          </Link>
        </div>
      </div>
    </div>
  );
}
