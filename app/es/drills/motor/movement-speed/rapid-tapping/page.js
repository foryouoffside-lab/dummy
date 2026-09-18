import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — es (rapid-tapping / motor)
// PRIMARY DOMESTIC: "cps test"                  — 210 exact Bing searches/mo (ES) + 92 (MX)
//                    "clicks por segundo"        — 81 exact searches/mo (ES) + 31 (MX)
//                    "click speed test"          — 23 exact searches/mo (ES) + 30 (MX)
//                    "test cps"                  — 20 exact searches/mo (ES) + 9 (MX)
//                    "test de clicks"            — 18 exact searches/mo (ES)
//                    "clicks por segundo test"   — 14 exact searches/mo (ES) + 10 (MX)
//                    "contador de clics"         — 10 exact searches/mo (ES)
//                    "test de cps"               — 6 exact searches/mo (ES)
// SECONDARY / LSI:
//                    "velocidad de clic mouse"   — High-intent peripheral query
//                    "jitter click" / "butterfly click" — Advanced clicking mechanics
//                    "minecraft pvp cps"         — High-intent gaming search
// NATIVE TITLE:      Test de CPS – Prueba de Clicks Por Segundo & Velocidad de Clic | SkillDrills
// ============================================================

export const metadata = {
  title: 'Test de CPS – Clicks Por Segundo & Velocidad | SkillDrills',
  description: 'Test de CPS online gratis. Mide tus clicks por segundo, velocidad de cliqueo, cadencia y resistencia de dedos en una prueba de 45 segundos sin registros.',
  keywords: [
    'test de cps',
    'cps test',
    'clicks por segundo',
    'contador de clics',
    'click speed test',
    'test cps',
    'test de clicks',
    'clicks por segundo test',
    'velocidad de clic mouse',
    'prueba de clicks por segundo',
    'jitter click',
    'butterfly click',
    'minecraft pvp cps',
  ],
  openGraph: {
    title: 'Test de CPS – Clicks Por Segundo & Velocidad | SkillDrills',
    description:
      'Test de CPS online gratis. Mide tus clicks por segundo, velocidad de cliqueo, cadencia de pulsación y resistencia de dedos en una prueba de 45 segundos.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de CPS – Clicks Por Segundo & Velocidad | SkillDrills',
    description:
      'Test de CPS online gratis. Mide tus clicks por segundo, velocidad de cliqueo, cadencia de pulsación y resistencia de dedos en una prueba de 45 segundos.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/drills/motor/movement-speed/rapid-tapping'),
  },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Centro de Drills', item: 'https://skilldrills.online/es/drills' },
    { '@type': 'ListItem', position: 3, name: 'Entrenamiento Motor', item: 'https://skilldrills.online/es/drills/motor' },
    { '@type': 'ListItem', position: 4, name: 'Test de CPS (Clicks Por Segundo)', item: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de CPS – Medidor de Clicks Por Segundo y Velocidad de Clic',
  alternateName: ['Test de CPS', 'CPS Test', 'Contador de Clics', 'Clicks Por Segundo Test', 'Velocidad de Clic'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Herramienta web interactiva y gratuita para medir clicks por segundo (CPS) y cadencia muscular. Evalúa pulsación de un solo dedo, jitter clicking y butterfly clicking contra una tasa de encogimiento dinámico en 45 segundos.',
  url: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'es-ES',
  dateModified: '2026-09-11',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Test de CPS Online',
  alternateName: ['Test de CPS', 'Contador de Clics', 'Clicks Por Segundo'],
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navegador moderno compatible con HTML5 Canvas y eventos de puntero de alta frecuencia',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping',
  inLanguage: 'es-ES',
  dateModified: '2026-09-11',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Test de CPS – Test de Velocidad de Clics y Clics por Segundo',
  url: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping',
  description: 'Test de CPS – Test de Velocidad de Clics y Clics por Segundo',
  genre: ['Clicker Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};


const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es un test de CPS (Clicks Por Segundo)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un test de CPS es una prueba motora digital que mide la cantidad exacta de clics de ratón o pulsaciones en pantalla ejecutadas en un segundo. Evalúa la velocidad de disparo neuromuscular de la corteza motora, la frecuencia oscilatoria de los tendones de los dedos y la resistencia muscular del antebrazo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es el promedio normal de CPS para jugadores casuales y competitivos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un usuario casual promedio alcanza entre 5,0 y 6,5 CPS con pulsación estándar de un solo dedo. Jugadores experimentados registran entre 8,0 y 10,5 CPS con buena técnica, mientras que competidores de élite en Minecraft PvP o juegos de ritmo alcanzan entre 12,0 y 16,0+ CPS con jitter clicking y más de 16,0–22,0 CPS con butterfly clicking.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el jitter clicking y cómo funciona biomecánicamente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El jitter clicking consiste en generar una co-contracción isométrica continua en los músculos flexores y extensores del antebrazo. Esos micro-temblores de alta frecuencia se transmiten a través de la muñeca rígida directamente al interruptor del ratón, alcanzando entre 11 y 15 CPS sin requerir pulsaciones voluntarias aisladas del dedo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el butterfly clicking y en qué se diferencia del jitter clicking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El butterfly clicking utiliza pulsaciones alternadas entre el dedo índice y el dedo medio sobre el botón izquierdo del ratón. Al alternar dedos con el brazo relajado, genera menor tensión en el antebrazo y permite alcanzar entre 16 y 22+ CPS en ratones mecánicos con bajo tiempo de rebote (debounce time).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué la tasa de CPS es tan decisiva en Minecraft PvP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En Minecraft 1.8.9 y modos de combate PvP competitivos, un CPS elevado reduce el retardo de ataque tras registrar un golpe, incrementa la probabilidad de colocar golpes en el primer tick disponible y reduce drásticamente el retroceso horizontal (knockback) recibido, permitiendo encadenar combos imparables.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Ayuda el test de CPS en shooters tácticos como Valorant o CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, especialmente en rondas de pistolas (Classic, Ghost, Glock, USP-S) y armas semiautomáticas, donde una cadencia rápida y rítmica combinada con micro-correcciones de puntería permite disparar al límite de cadencia del arma sin desestabilizar la retícula.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué esta prueba dura 45 segundos en lugar de 5 o 10 segundos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las pruebas de 5 segundos solo miden ráfagas explosivas de corta duración. Una prueba de 45 segundos con encogimiento dinámico evalúa la resistencia neuromuscular real, la acumulación de fatiga en los tendones extensores y la consistencia en combates prolongados de torneos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué hardware o ratón se recomienda para obtener el máximo CPS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Se recomienda un ratón con tasa de sondeo (polling rate) de 1000 Hz o superior, interruptores mecánicos u ópticos con recorrido corto de actuación, y software que permita ajustar el debounce time a 0-4 ms para registrar clics dobles limpios sin rebote errático.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puede el jitter clicking provocar lesiones por esfuerzo repetitivo (RSI) o túnel carpiano?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, la tensión isométrica prolongada puede provocar sobrecarga en la fascia del antebrazo y los tendones extensores. Se recomienda no exceder sesiones de 15 minutos continuos, realizar estiramientos de muñeca y dedos antes y después, y detener la práctica ante cualquier molestia o dolor agudo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo calcula este test de CPS la tasa y la dificultad dinámica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El drill muestrea cada clic registrado mediante event.timeStamp de alta resolución (performance.now()). La tasa de encogimiento se acelera conforme aumenta tu puntuación hasta +600 píxeles/segundo, exigiendo una cadencia constante para mantener la esfera inflada.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Test de CPS – Test de Velocidad de Clics y Clics por Segundo',
  description: 'Test de CPS – Test de Velocidad de Clics y Clics por Segundo',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Ajustar agarre y postura',
      text: 'Apoya la muñeca cómodamente en la alfombrilla y alinea el dedo índice sobre el botón del ratón.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Iniciar sprint de 45 segundos',
      text: 'Haz clic en "Iniciar Entrenamiento" y cliquea la esfera objetivo a máxima velocidad tras la cuenta atrás.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Contrarrestar el encogimiento',
      text: 'Cada clic expande la esfera. Mantén un ritmo sostenido a medida que la velocidad de reducción se acelera.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analizar CPS promedio y ráfaga máxima',
      text: 'Comprueba tu promedio de clics por segundo (CPS), ráfaga de 5 segundos y consistencia en la tarjeta de resultados.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/rapid-tapping#step-4'
    }
  ],
};

const guideProps = {
  sources: pickSources('halstead1947', 'todor1980', 'keele1968', 'woods2015'),
  intro: {
    title: 'Medición de la velocidad de clic y fundamentación científica',
    paragraphs: [
      'El test de CPS (Clicks Por Segundo) mide cuántos clics de ratón puedes ejecutar en un segundo. La pulsación sostenida con un solo dedo alcanza típicamente entre 5 y 7 clics por segundo, respaldado en la norma neuropsicológica de 50 a 55 pulsaciones en 10 segundos para el dedo índice dominante en adultos saludables (Halstead, 1947; Todor & Kyprie, 1980). Las ráfagas rápidas que superan este umbral funcionan como secuencias motoras preprogramadas en circuito abierto (Keele, 1968).',
      'Precisión de la medición y sincronización de pantalla: el temporizador utiliza performance.now() del navegador con resolución de ~1 ms. Los monitores actualizan fotogramas a 16,7 ms (60 Hz), 6,9 ms (144 Hz) o 4,1 ms (240 Hz, Woods et al., 2015), mientras que la tasa de sondeo del ratón (polling rate) introduce entre 1 y 8 ms. Variaciones inferiores a 5 ms son ruido de muestreo instrumental. SkillDrills almacena todos los registros localmente en el navegador.',
    ],
  },
  benchmark: {
    title: 'Clasificación de CPS & Tabla Oficial de Percentiles',
    description: 'Baremos objetivos para interpretar tu velocidad de pulsación. Las categorías de un solo dedo se basan en la literatura de motricidad neurofisiológica (Halstead 1947; Todor & Kyprie 1980), mientras que los rangos de jitter y butterfly reflejan datos empíricos de competidores de esports.',
    columns: ['Nivel', 'Título de Rango', 'CPS Promedio', 'Pico (5s)', 'Técnica de Clic', 'Clasificación'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Clicador Élite (Apex Tapper)',
        stat: '16.0+ CPS',
        level: '20.0+ CPS',
        accuracy: 'Butterfly / Drag Clicking',
        percentile: 'Top 0.1% Excepcional',
      },
      {
        tier: 'Tier 2',
        rank: 'Competidor Pro (Pro Competitor)',
        stat: '12.0–15.9 CPS',
        level: '15.0–19.0 CPS',
        accuracy: 'Jitter Clicking Dominado',
        percentile: 'Top 3% Avanzado',
      },
      {
        tier: 'Tier 3',
        rank: 'Jugador Competitivo (Competitive Gamer)',
        stat: '9.0–11.9 CPS',
        level: '11.0–14.0 CPS',
        accuracy: 'Dedo Único Rápido / Tensión',
        percentile: 'Top 15% Sólido',
      },
      {
        tier: 'Tier 4',
        rank: 'Jugador Promedio (Proficient Casual)',
        stat: '6.0–8.9 CPS',
        level: '7.5–10.0 CPS',
        accuracy: 'Dedo Único Estándar',
        percentile: 'Top 50% Medio',
      },
      {
        tier: 'Tier 5',
        rank: 'Principiante (Novice Tapper)',
        stat: '< 6.0 CPS',
        level: '< 7.5 CPS',
        accuracy: 'Dedo Único Básico',
        percentile: 'Base 20% En Entrenamiento',
      },
    ],
  },
  protocols: {
    title: '4 Protocolos Científicos para Aumentar el CPS',
    description: 'Rutinas estructuradas para elevar la tasa de disparo de unidades motoras, fortalecer tendones y retrasar la fatiga del antebrazo.',
    items: [
      {
        title: 'Protocolo 1: Calibración de Ritmo Motor Halstead (Pivote MCP Relajado)',
        description: 'En el clic estándar de un solo dedo, apoya la muñeca ligeramente en la alfombrilla y ejecuta el movimiento solo desde la articulación del nudillo (MCP). Mantener el antebrazo relajado evita fatiga prematura y conserva el control de la puntería.',
      },
      {
        title: 'Protocolo 2: Intervalos de Sprint Todor-Kyprie (Descanso Rápido)',
        description: 'Alterna 5 segundos de pulsación a máxima velocidad con 3 segundos de pulsación rítmica y pausada. Este entrenamiento por intervalos entrena al sistema neuromuscular para sostener ráfagas de alta frecuencia y retrasar el lactato.',
      },
      {
        title: 'Protocolo 3: Micro-Vibración Isométrica (Estabilización de Jitter Clicking)',
        description: 'Genera una contracción isométrica leve en los músculos flexores y extensores del antebrazo, canalizando el temblor hacia el dedo índice. Alivia la presión contra el ratón para mantener un deslizamiento suave.',
      },
      {
        title: 'Protocolo 4: Articulación Dual Alternada (Cadencia de Butterfly Clicking)',
        description: 'Coloca el índice y el dedo medio sobre el botón izquierdo. Alterna las pulsaciones como si tamborilearas sobre una mesa. Configura el debounce time del ratón al mínimo (0–4 ms) para aprovechar el rebote del interruptor.',
      },
    ],
  },
  faqs: {
    title: 'Preguntas Frecuentes Sobre el Test de CPS y Velocidad de Clic (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function SpanishRapidTappingPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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

      <RapidTappingClient />

      <DrillGuide {...guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/rapid-tapping" />
      </div>
    </>
  );
}

