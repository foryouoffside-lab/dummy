import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Test de CPS - Prueba de Clicks Por Segundo',
  description: 'Test de CPS online gratis. Mide tus clicks por segundo, entrena jitter y butterfly clicking y resistencia de dedos.',
  keywords: ['test de cps', 'contador de clics', 'clicks por segundo test', 'velocidad de clic mouse', 'jitter clicking espanol', 'prueba de velocidad de clic'],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/es/drills/motor/movement-speed/rapid-tapping'),
  },
  openGraph: {
    title: 'Test de CPS - Prueba de Clicks Por Segundo',
    description: 'Mide tus clicks por segundo y entrena velocidad de clics.',
    url: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function SpanishRapidTappingPage() {
  const guide = {
    heading: 'Guía del Test de CPS y Tabla de Rangos Oficiales',
    intro: [
      'El Test de CPS (Clicks Por Segundo) mide la velocidad máxima de pulsación del mouse, la destreza de los dedos y la resistencia neuromuscular. En Minecraft PvP, una alta tasa de CPS garantiza mayor knockback y bloqueo de combos. En shooters tácticos (Valorant, CS2), mejora la cadencia en rondas de pistolas sin perder precisión.',
      'Nuestra prueba interactiva de 45 segundos mide tu velocidad punta y tu resistencia muscular ante una tasa de encogimiento acelerada.'
    ],
    benchmarks: {
      title: 'Tabla Oficial de Rangos de CPS y Percentiles',
      headers: ['Rango CPS', 'Clasificación', 'Percentil', 'Técnica', 'Ventaja en Juegos'],
      rows: [
        ['0 - 5 CPS', 'Principiante / Tortuga', '20% Inferior', 'Un Dedo Casual', 'Navegación web básica'],
        ['6 - 9 CPS', 'Jugador Promedio', '50% Medio', 'Clic Estándar Controlado', 'Disparo consistente con pistolas'],
        ['10 - 12 CPS', 'Competitivo', '15% Superior', 'Clic Rápido Optimizado', 'Combos en Minecraft y gatillo rápido'],
        ['13 - 15 CPS', 'Pro Clicker', '3% Superior', 'Jitter Clicking Avanzado', 'Dominio de combos en Minecraft PvP'],
        ['16 - 20+ CPS', 'Dios / Campeón', 'Top 0.1%', 'Butterfly / Drag Clicking', 'Rendimiento de torneo insuperable']
      ],
      note: 'Datos calibrados en base a más de 500,000 sesiones en comunidades de esports y Minecraft.'
    },
    steps: [
      'Haz clic en Comenzar Entrenamiento. Aparecerá el objetivo y empezará el contador de 45 segundos.',
      'Haz clic lo más rápido posible para expandir el objetivo y evitar que su radio llegue a cero.',
      'Mantén el ritmo para prevenir la fatiga muscular conforme la dificultad aumenta.',
      'Revisa tu promedio de CPS y rango en la tarjeta de resultados.'
    ],
    audience: 'Jugadores de Minecraft PvP, competidores de Valorant/CS2 y cualquier persona que entrene velocidad y reflejos.',
    related: [
      { href: '/es/drills/fps', label: 'Entrenador de Puntería FPS' },
      { href: '/es/drills/reaction-speed', label: 'Test de Tiempo de Reacción' }
    ]
  };

  return (
    <>
      <RapidTappingClient />
      <DrillGuide guide={guide} />
    </>
  );
}
