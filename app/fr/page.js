import HomePageClient from '../HomePageClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Aim Trainer Gratuit & Entraînement Cérébral en Ligne | SkillDrills',
  description: 'Améliorez votre visée sur Valorant, CS2, temps de réaction, CPS et mémoire avec plus de 82 exercices interactifs gratuits directement sur votre navigateur.',
  keywords: [
    'aim trainer gratuit',
    'test de temps de réaction',
    'entraînement visée valorant',
    'test cps souris',
    'jeux de mémoire gratuits',
    'améliorer ses réflexes',
    'exercices cognitifs en ligne',
    'entraînement fps en ligne'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr',
    languages: getAlternateLanguages('/fr'),
  },
  openGraph: {
    title: 'SkillDrills - Aim Trainer Gratuit & Entraînement Cérébral en Ligne',
    description: 'Améliorez votre visée sur Valorant, CS2, temps de réaction, CPS et mémoire directement dans votre navigateur.',
    url: 'https://skilldrills.online/fr',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function FrenchHomePage() {
  return <HomePageClient />;
}
