import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Todos los 81+ Ejercicios de Puntería y Entrenamiento Mental',
  description: 'Explora más de 81 ejercicios interactivos gratis en 8 categorías. Entrenador de puntería FPS, tiempo de reacción y memoria.',
  alternates: {
    canonical: 'https://skilldrills.online/es/drills',
    languages: getAlternateLanguages('/es/drills'),
  },
  openGraph: {
    title: 'Todos los 81+ Ejercicios de Puntería y Entrenamiento Mental | SkillDrills',
    description: 'Explora más de 81 ejercicios interactivos gratis en 8 categorías. Entrenador de puntería FPS, tiempo de reacción y memoria.',
    url: 'https://skilldrills.online/es/drills',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function LocalizedDrillsDirectoryPage() {
  return <DrillsDirectoryClient />;
}
