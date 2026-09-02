import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Treino de Mira Grátis para Valorant e CS2 - Aim Trainer',
  description: 'Melhore sua mira no Valorant, CS2 e Apex Legends. Treinos grátis de flick shots, rastreamento dinâmico e tempo de reação no navegador.',
  keywords: ['treino de mira', 'mira valorant', 'aim trainer', 'treino de mira cs2', 'flick shot treino', 'treino de mira online'],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/fps',
    languages: getAlternateLanguages('/pt/drills/fps'),
  },
  openGraph: {
    title: 'Treino de Mira Grátis para Valorant e CS2 - Aim Trainer',
    description: 'Melhore sua mira no Valorant, CS2 e Apex Legends.',
    url: 'https://skilldrills.online/pt/drills/fps',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function PortugueseFPSHubPage() {
  return <FPSHubClient />;
}
