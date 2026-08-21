import SearchClient from './SearchClient';
import { DRILLS } from '@/lib/drillsRegistry';

export const metadata = {
  title: 'Search Drills | SkillDrills Pro',
  description: `Search ${DRILLS.length}+ free interactive browser drills for FPS aim training, cognitive speed, working memory, hand-eye coordination, and visual skills.`,
  // Internal search results: keep them out of the index (Google explicitly asks
  // for this) but let the crawler follow through to the drill pages they link.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <SearchClient />;
}
