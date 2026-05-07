import ObjectLocationClient from './ObjectLocationClient';

export const metadata = {
  title: 'Object Location Drill - Spatial Memory & Position Recall Training',
  description: 'Train spatial position memory by remembering where objects are placed on expanding grids. Progressive difficulty from 3×3 to 7×7 grid. 10 unique emoji objects. 3-4 second memorization then locate the target. 60-second timed challenge.',
  keywords: [
    'object location memory', 'spatial position recall', 'object placement memory',
    'spatial memory grid', 'location memory drill', 'object position test',
    'spatial recall training', 'where was it memory', 'object grid memory',
    'visual spatial memory', 'location recall drill', 'position memory game',
    'free memory drill', 'spatial cognition training', 'object location test'
  ],
  openGraph: {
    title: 'Object Location Drill - Spatial Position Memory Training',
    description: '10 unique emoji objects placed on expanding grids (3×3 to 7×7). 3-4 second memorization then find the target object. Auto-advancing rounds with +1/-1 scoring. 60-second timed challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/object-location',
  },
};

export default function ObjectLocationPage() {
  return <ObjectLocationClient />;
}