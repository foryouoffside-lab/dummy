import HomePageClient from '../HomePageClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Aim Trainer Gratis y Entrenamiento Cerebral | SkillDrills',
  description: 'Mejora tu puntería en Valorant, CS2, tiempo de reacción y memoria con más de 80 ejercicios interactivos gratis directamente en tu navegador.',
  keywords: [
    'aim trainer', 'juegos de memoria', 'punteria valorant', 'test de tiempo de reaccion',
    'test de cps', 'juegos mentales gratis', 'aim trainer gratis', 'entrenamiento fps online'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es',
    languages: getAlternateLanguages('/es'),
  },
  openGraph: {
    title: 'SkillDrills - Aim Trainer Gratis y Entrenamiento Cerebral',
    description: 'Mejora tu puntería en Valorant, CS2, tiempo de reacción y memoria directamente en tu navegador.',
    url: 'https://skilldrills.online/es',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function SpanishHomePage() {
  return <HomePageClient />;
}
