import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'CPS Test - Klick-Geschwindigkeit & Klicks Pro Sekunde Messen',
  description: 'Kostenloser CPS Test online. Miss deine Klicks pro Sekunde (CPS), trainiere Jitter- und Butterfly-Clicking sowie Fingerausdauer.',
  keywords: ['CPS Test', 'Klicks Pro Sekunde', 'Maus Klick Geschwindigkeit', 'Jitter Clicking Test'],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/de/drills/motor/movement-speed/rapid-tapping'),
  },
  openGraph: {
    title: 'CPS Test - Klick-Geschwindigkeit & Klicks Pro Sekunde Messen',
    description: 'Kostenloser CPS Test online. Miss deine Klicks pro Sekunde (CPS), trainiere Jitter- und Butterfly-Clicking sowie Fingerausdauer.',
    url: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedRapidTappingPage() {
  const guide = {
    heading: 'CPS Test Anleitung & Offizielle Rangliste',
    intro: [
      'Der CPS-Test (Klicks pro Sekunde) misst die maximale Klickgeschwindigkeit, Fingerfertigkeit und neuromuskuläre Ausdauer. Bei Minecraft PvP und taktischen Shootern (Valorant, CS2) sorgt ein hoher CPS für schnelle Schussfolgen ohne Aim-Verlust.',
      'Unser 45-Sekunden-Test bewertet sowohl den initialen Klick-Sprint als auch die Ausdauer gegen beschleunigte Zielschrumpfung.'
    ],
    benchmarks: {
      title: 'Benchmark & Percentile Tier Table',
      tiers: [
        { range: '14+ CPS', tier: 'Ascendant / God Tier', percentile: 'Top 1%', desc: 'Elite jitter/butterfly clicker' },
        { range: '10 - 13 CPS', tier: 'Diamond / Pro', percentile: 'Top 10%', desc: 'Fast burst clicking with rhythm control' },
        { range: '7 - 9 CPS', tier: 'Gold / Average', percentile: 'Top 50%', desc: 'Standard single-finger click cadence' },
        { range: '< 6 CPS', tier: 'Silver / Novice', percentile: 'Bottom 40%', desc: 'Room for finger mobility & grip improvement' },
      ]
    },
    tips: [
      'Experiment with jitter clicking (forearm vibration) vs butterfly clicking (alternating two fingers).',
      'Maintain a light claw grip to reduce finger fatigue across the 45-second duration.',
      'Calibrate mouse debounce time in hardware settings to prevent missed clicks.'
    ]
  };

  return (
    <>
      <RapidTappingClient />
      <DrillGuide
        heading={guide.heading}
        intro={guide.intro}
        benchmarks={guide.benchmarks}
        tips={guide.tips}
        faq={[
          { q: 'What is a good CPS score for gaming?', a: '6.5 to 8 CPS is average. Competitive Minecraft PvP and tactical shooter players typically achieve 10 to 14+ CPS using specialized clicking techniques.' },
          { q: 'How does SkillDrills calculate CPS?', a: 'CPS is calculated using high-precision requestAnimationFrame and Performance.now() timers to track valid clicks over time without input buffer delay.' }
        ]}
      />
    </>
  );
}
