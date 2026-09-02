import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Test de Tiempo de Reacción y Reflejos en Milisegundos',
  description: 'Mide tu tiempo de reacción visual en milisegundos con esta prueba de velocidad de reflejos gratuita y compara con estándares de esports.',
  keywords: ['test de tiempo de reaccion', 'prueba de reflejos', 'medidor de reflejos ms', 'velocidad de reaccion gamer'],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/reaction-speed',
    languages: getAlternateLanguages('/es/drills/reaction-speed'),
  },
  openGraph: {
    title: 'Test de Tiempo de Reacción - Prueba de Reflejos en Milisegundos',
    description: 'Mide tu tiempo de reacción visual en milisegundos.',
    url: 'https://skilldrills.online/es/drills/reaction-speed',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function SpanishReactionHubPage() {
  return <ReactionSpeedDrillsClient />;
}
