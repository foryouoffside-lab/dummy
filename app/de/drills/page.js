import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Alle 81+ Aiming- und Gehirntraining-Übungen | SkillDrills',
  description: 'Entdecke 81+ interaktive kostenlose Übungen in 8 Hauptbereichen. Aim Trainer, Reaktionstest, Gedächtnisspiele und CPS Test.',
  alternates: {
    canonical: 'https://skilldrills.online/de/drills',
    languages: getAlternateLanguages('/de/drills'),
  },
  openGraph: {
    title: 'Alle 81+ Aiming- und Gehirntraining-Übungen | SkillDrills',
    description: 'Entdecke 81+ interaktive kostenlose Übungen in 8 Hauptbereichen. Aim Trainer, Reaktionstest, Gedächtnisspiele und CPS Test.',
    url: 'https://skilldrills.online/de/drills',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedDirectoryPage() {
  return <DrillsDirectoryClient />;
}
