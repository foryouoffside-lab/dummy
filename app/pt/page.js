import HomePageClient from '../HomePageClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Treino de Mira Grátis e Aim Trainer Online | SkillDrills',
  description: 'Melhore sua mira no Valorant, CS2, tempo de reação, CPS e memória com 80+ treinos interativos grátis direto no navegador sem cadastro.',
  keywords: [
    'treino de mira', 'mira valorant', 'aim trainer', 'treino de mira cs2', 'teste de reflexo',
    'teste de cps', 'jogos de memoria', 'aim trainer gratis', 'treino de mira fps', 'reflexos gamer'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt',
    languages: getAlternateLanguages('/pt'),
  },
  openGraph: {
    title: 'SkillDrills - Treino de Mira Grátis e Aim Trainer Online',
    description: 'Melhore sua mira no Valorant, CS2, tempo de reação, CPS e memória direto no navegador.',
    url: 'https://skilldrills.online/pt',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function PortugueseHomePage() {
  return <HomePageClient />;
}
