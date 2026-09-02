import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Reaktionstest - Millisekunden Reflex-Messung Online',
  description: 'Teste deine visuelle Reaktionszeit in Millisekunden. Vergleiche deine Ergebnisse mit Benchmarks von Esports-Profis.',
  keywords: ['Reaktionstest Online', 'Reaktionszeit Testen', 'Reflexe Testen', 'Reaktion in Millisekunden'],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/reaction-speed',
    languages: getAlternateLanguages('/de/drills/reaction-speed'),
  },
  openGraph: {
    title: 'Reaktionstest - Millisekunden Reflex-Messung Online',
    description: 'Teste deine visuelle Reaktionszeit in Millisekunden. Vergleiche deine Ergebnisse mit Benchmarks von Esports-Profis.',
    url: 'https://skilldrills.online/de/drills/reaction-speed',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedReactionHubPage() {
  return <ReactionSpeedDrillsClient />;
}
