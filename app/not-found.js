import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found - SkillDrills',
  description: 'The page you are looking for does not exist. Explore 115+ free brain training, FPS aim drills, cognitive exercises, memory games, typing tests, and mental fitness tools on SkillDrills.',
  keywords: ['404', 'page not found', 'skilldrills', 'free drills', 'brain training', 'FPS aim trainer'],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Page Not Found - SkillDrills',
    description: 'This page does not exist. Discover 115+ free training drills on SkillDrills.',
    url: 'https://skilldrills.online',
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-ink-1 mb-2">Page Not Found</h2>
        <p className="text-ink-2 mb-8">
          The drill page you&apos;re looking for doesn&apos;t exist or has been moved.<br />
          Explore our free training drills below.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02]"
          >
            Go Home
          </Link>
          <Link
            href="/drills/fps"
            className="px-6 py-3 bg-surface-1 text-ink-1 rounded-lg font-semibold border border-hairline hover:border-hairline-2 hover:bg-surface-2 transition-all"
          >
            FPS Drills
          </Link>
          <Link
            href="/drills/cognitive"
            className="px-6 py-3 bg-surface-1 text-ink-1 rounded-lg font-semibold border border-hairline hover:border-hairline-2 hover:bg-surface-2 transition-all"
          >
            Cognitive Drills
          </Link>
        </div>
      </div>
    </div>
  );
}