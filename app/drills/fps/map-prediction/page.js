import MapPredictionClient from './MapPredictionClient';

export const metadata = {
  title: 'Map Prediction Drill - Enemy Path Anticipation & FPS Gamesense Training',
  description: 'Train enemy movement prediction with directional trails showing movement paths. Target fades in at predicted location. Adaptive speed increases with hits, decreases with misses. 5 lives with penalty scoring. 60-second challenge.',
  keywords: [
    'map prediction', 'enemy movement prediction', 'FPS gamesense training',
    'path anticipation drill', 'movement prediction aim', 'tactical prediction FPS',
    'enemy path training', 'gamesense drill', 'prediction aim trainer',
    'FPS game sense', 'movement reading drill', 'free prediction trainer',
    'tactical awareness FPS', 'enemy positioning practice'
  ],
  openGraph: {
    title: 'Map Prediction Drill - Enemy Path Anticipation Training',
    description: 'Dashed directional trails show enemy movement paths. Target fades in at the predicted endpoint. Adaptive speed rewards hits and slows on misses. 5 lives with penalty scoring.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/map-prediction',
  },
};

export default function MapPredictionPage() {
  return <MapPredictionClient />;
}