import SearchClient from './SearchClient';
import { DRILLS } from '@/lib/drillsRegistry';

export const metadata = {
  title: 'Search Drills | SkillDrills Pro',
  description: `Search ${DRILLS.length}+ free interactive browser drills for FPS aim training, cognitive speed, working memory, hand-eye coordination, and visual skills.`,
};

export default function SearchPage() {
  return <SearchClient />;
}
