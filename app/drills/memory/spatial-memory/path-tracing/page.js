import PathTracingClient from './PathTracingClient';

export const metadata = {
  title: 'Path Tracing Drill - Spatial Memory & Sequential Route Recall',
  description: 'Train spatial sequence memory by watching and retracing animated paths on expanding grids. Progressive difficulty from 3×3 to 7×7 grid with path length = level + 3. Wrong click ends round immediately. 60-second timed challenge.',
  keywords: [
    'path tracing', 'route memory', 'spatial sequence recall', 'path memory drill',
    'sequential spatial memory', 'route tracing game', 'path recall training',
    'spatial navigation memory', 'dot path memory', 'sequence tracing drill',
    'visual path memory', 'route learning test', 'free memory drill',
    'spatial sequence training', 'path following memory'
  ],
  openGraph: {
    title: 'Path Tracing Drill - Spatial Sequence Memory Training',
    description: 'Watch animated dot paths then retrace them in order. Progressive grid expansion 3×3 to 7×7. Path length = level + 3 dots. +2 for perfect, -2 for wrong click. 60-second timed challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/spatial-memory/path-tracing',
  },
};

export default function PathTracingPage() {
  return <PathTracingClient />;
}