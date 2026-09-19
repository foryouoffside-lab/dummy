import MarketDoorsPursuitClient from '@/app/drills/reaction-speed/market-doors-pursuit/MarketDoorsPursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – es-ES (reaction-speed / market-doors-pursuit)
// PRIMARY DOMESTIC: "entrenador de corte de tarta" / "limpieza de esquinas fps"
// SECONDARY / LSI:
//   "limpiar ángulos fps" / "apertura de ángulos mira"
//   "chequeo de puertas fps" / "reflejo de esquinas táctico"
// ============================================================

export const metadata = {
  title: 'Limpieza de Esquinas – Chequeo de Ángulos | SkillDrills',
  description: 'Entrenador de limpieza de esquinas y ángulos online gratis. Domina el corte de tarta y reflejos en puertas para shooters tácticos en el navegador.',
  keywords: [
    'entrenador de corte de tarta',
    'limpieza de esquinas fps',
    'limpiar angulos fps',
    'apertura de angulos mira',
    'chequeo de puertas fps',
    'reflejo de esquinas tactico',
    'exploracion visual puertas',
    'tiempo de reaccion esquinas',
    'pre aim entrenamiento',
    'mira tactica valorant',
    'ejercicios sacadicos esquinas',
    'juego de reflejos fps navegador',
  ],
  openGraph: {
    title: 'Limpieza de Esquinas – Chequeo de Ángulos | SkillDrills',
    description: 'Entrenador de limpieza de esquinas y ángulos online gratis. Domina el corte de tarta y reflejos en puertas para shooters tácticos en el navegador.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limpieza de Esquinas – Chequeo de Ángulos | SkillDrills',
    description: 'Entrenador de limpieza de esquinas y ángulos online gratis. Domina el corte de tarta y reflejos en puertas para shooters tácticos en el navegador.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/market-doors-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Ejercicios', item: 'https://skilldrills.online/es/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidad de Reacción', item: 'https://skilldrills.online/es/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Limpieza de Esquinas', item: 'https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Entrenador de Limpieza de Esquinas y Chequeo de Ángulos',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Entrenamiento online de limpieza de esquinas, corte de tarta y reflejo de disparo en puertas para shooters competitivos.',
  url: 'https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'es-ES',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Entrenador de Limpieza de Esquinas',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, navegador moderno compatible con Pointer Lock',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit',
  inLanguage: 'es-ES',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Corner Checking Trainer – Limpieza Táctica de Puertas y Juego de Reacción',
  url: 'https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit',
  description: 'Juego de reacción y despeje de esquinas para perfeccionar movimientos sacádicos y reflejos en shooters tácticos.',
  genre: ['Acción', 'Entrenamiento Táctico', 'Visión Esports'],
  gamePlatform: ['Navegador Web', 'Escritorio'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es la limpieza de esquinas (corner checking) en shooters tácticos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es el método disciplinado de comprobar posibles ángulos de emboscada de forma individual y progresiva, asegurando no quedar expuesto a más de una línea de tiro enemiga a la vez.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué consiste la técnica del corte de tarta (slicing the pie)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consiste en desplazarse describiendo un arco alrededor de una esquina o marco de puerta, desvelando finas porciones geométricas de la habitación para aislar duelos 1 contra 1 favorables.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo ayudan los movimientos sacádicos al limpiar esquinas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con cada nuevo ángulo visible, los ojos realizan una sacada ocular ultrarrápida (20 a 40 ms; Rayner, 1998) seguida de fijación foveal inmediata para verificar la presencia de enemigos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué suelen ser eliminados los jugadores al asomarse en esquinas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los errores más comunes son abrirse en exceso rápidamente (over-peeking), exponiendo el cuerpo a múltiples ángulos a la vez, o mirar fijamente la retícula sin escanear la profundidad del espacio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el pre-aiming y cómo se relaciona con el chequeo de esquinas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es colocar la retícula a través del muro exactamente a la altura de la cabeza del adversario antes de asomarse, suprimiendo la necesidad de realizar un flick tras la detección visual.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo mejora los reflejos el ejercicio dinámico de puertas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Genera objetivos que emergen de forma impredecible desde puertas consecutivas, poniendo a prueba la discriminación visual de ángulos y el frenado inmediato de la mira (stopping power).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué papel juega la cronometría mental de Donders (1868) al limpiar ángulos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A diferencia de una reacción simple (~200 ms), múltiples aberturas implican tiempo de reacción de elección (Donders, 1868), donde el cerebro evalúa prioridades antes de disparar.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué beneficio aportan los monitores de 144 Hz o 240 Hz al limpiar esquinas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las pantallas de alta tasa de refresco reducen el retardo visual a menos de 4 a 7 ms (Woods et al., 2015), permitiendo divisar el primer píxel del enemigo mucho antes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo se recomienda entrenar la limpieza de esquinas al día?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entre 10 y 15 minutos antes de partidas competitivas bastan para afianzar patrones de escaneo visual correctos y evitar entradas apresuradas en puntos ciegos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Esta herramienta de entrenamiento es gratuita?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, SkillDrills ofrece esta herramienta de forma 100% gratuita directamente en el navegador, sin descargas, instalaciones ni registros.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo Entrenar Limpieza de Esquinas y Chequeo de Ángulos',
  description: 'Guía práctica en 4 pasos para dominar el corte de tarta, sacadas oculares y disparos de reacción en aberturas.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Examinar geometría del vano y preparar sacadas',
      text: 'Identifique la orientación de la puerta o esquina y establezca el orden secuencial de ángulos a verificar.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Cortar la tarta progresivamente (Slicing the Pie)',
      text: 'Aproximarse trazando un arco controlado, desvelando únicamente una franja estrecha de visión cada vez.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Fijar la fóvea en el blanco emergente',
      text: 'En cuanto el objetivo asome por el umbral, clave la vista instantáneamente en su centro sin balancear la cabeza.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Ejecutar disparo centrado y fijar la retícula',
      text: 'Accione el clic certero en el núcleo del blanco antes de que supere su umbral de reacción y detenga el movimiento.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('rayner1998', 'donders1868', 'woods2015'),
  intro: {
    title: 'Guía de Limpieza de Esquinas y Chequeo Táctico de Ángulos',
    paragraphs: [
      'En shooters tácticos competitivos como Valorant y CS2, la capacidad más decisiva para salir victorioso es dominar la limpieza metódica de esquinas. Adentrarse en pasajes sin aislar líneas de visión expone al jugador a múltiples rivales simultáneos.',
      'La técnica de cortar la tarta (Slicing the Pie) descompone el espacio en sectores geométricos seguros. En cada fracción desvelada, el sistema visual ejecuta sacadas rápidas (Rayner, 1998) seguidas de fijación foveal instantánea para identificar enemigos ocultos.',
      'Neurológicamente, se trata de tiempo de reacción de elección (Choice RT; Donders, 1868), en el que el cerebro debe discernir entre espacio despejado y peligro inminente. En pantallas con alta tasa de refresco (Woods et al., 2015), la práctica sistemática automatiza el pre-apuntado y minimiza la latencia de respuesta.',
    ],
  },
  benchmarks: {
    title: 'Tabla de Rendimiento en Limpieza de Ángulos y Esquinas',
    headers: ['Nivel (Tier)', 'Clasificación', 'Tiempo de Identificación', 'Precisión de Disparo', 'Percentil'],
    rows: [
      ['Tier 1', 'Grandmaster / Pro', '< 160 ms', '98 %+', 'Top 1 %'],
      ['Tier 2', 'Elite / Master', '160 – 210 ms', '94 – 97 %', 'Top 5 %'],
      ['Tier 3', 'Pro / Diamond', '211 – 270 ms', '88 – 93 %', 'Top 15 %'],
      ['Tier 4', 'Intermedio / Gold', '271 – 350 ms', '78 – 87 %', 'Top 50 %'],
      ['Tier 5', 'Principiante / Silver', '> 350 ms', '< 78 %', 'Base'],
    ],
    note: 'Criterios basados en investigaciones sobre oculomotricidad y tiempo de reacción de elección (Rayner, 1998; Donders, 1868) combinados con hardware gaming de alto rendimiento (Woods et al., 2015).',
  },
  protocols: {
    title: 'Protocolos de Entrenamiento en 4 Fases',
    description: 'Rutinas estructuradas para consolidar hábitos de exploración visual automática en esquinas.',
    items: [
      {
        title: 'Examinar geometría del vano y preparar sacadas',
        description: 'Identifique la orientación de la puerta o esquina y establezca el orden secuencial de ángulos a verificar.',
      },
      {
        title: 'Cortar la tarta progresivamente (Slicing the Pie)',
        description: 'Aproximarse trazando un arco controlado, desvelando únicamente una franja estrecha de visión cada vez.',
      },
      {
        title: 'Fijar la fóvea en el blanco emergente',
        description: 'En cuanto el objetivo asome por el umbral, clave la vista instantáneamente en su centro sin balancear la cabeza.',
      },
      {
        title: 'Ejecutar disparo centrado y fijar la retícula',
        description: 'Accione el clic certero en el núcleo del blanco antes de que supere su umbral de reacción y detenga el movimiento.',
      },
    ],
  },
  faqs: {
    title: 'Preguntas Frecuentes (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function SpanishMarketDoorsPursuitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <MarketDoorsPursuitClient copy={{ title: 'Limpieza de Esquinas' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/es/drills/reaction-speed/market-doors-pursuit"
        />
      </div>
      <DrillFooter />
    </>
  );
}
