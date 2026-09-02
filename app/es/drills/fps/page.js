import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Aim Trainer Gratis para Valorant y CS2 - Puntería FPS',
  description: 'Mejora tu puntería para Valorant, CS2 y Apex Legends. Ejercicios interactivos gratis de flick shots, seguimiento y reflejos.',
  keywords: ['aim trainer', 'punteria valorant', 'aim trainer gratis', 'mejorar punteria cs2', 'entrenamiento fps'],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/fps',
    languages: getAlternateLanguages('/es/drills/fps'),
  },
  openGraph: {
    title: 'Aim Trainer Gratis para Valorant y CS2 - Puntería FPS',
    description: 'Mejora tu puntería para Valorant, CS2 y Apex Legends.',
    url: 'https://skilldrills.online/es/drills/fps',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function SpanishFPSHubPage() {
  return <FPSHubClient />;
}
