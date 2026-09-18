import ReactionTimeTestWrapper from '@/app/drills/reaction-speed/reaction-time-test/ReactionTimeTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — es-ES / LATAM (reaction-speed / reaction-time-test)
// PRIMARY DOMESTIC: "test de reflejos"   — Domestic #1 query
//                    "test de reaccion"   — Domestic #2 query
//                    "tiempo de reaccion" — High search intent
// SECONDARY / LSI:
//                    "test de reflejos online" — Utility intent
//                    "medir tiempo de reaccion" — Measurement intent
//                    "velocidad de reaccion"    — Broad query
//                    "entrenar reflejos gaming" — Esports intent
// NATIVE TITLE:      Test de Reflejos y Tiempo de Reacción – Medidor en Milisegundos (ms) | SkillDrills
// ============================================================

export const metadata = {
  title: 'Test de Tiempo de Reacción – Reflejos Online | SkillDrills',
  description:
    'Test de tiempo de reacción online gratis. Mide tu velocidad de respuesta visual en milisegundos (ms) y compara tu promedio con percentiles en el navegador.',
  keywords: [
    'test de reflejos',
    'test de reaccion',
    'tiempo de reaccion',
    'test de tiempo de reaccion',
    'test de reflejos online',
    'medir tiempo de reaccion',
    'test reflejos milisegundos',
    'velocidad de reaccion',
    'entrenar reflejos gaming',
    'reflejos gamer test',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/reaction-speed/reaction-time-test',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-time-test'),
  },
  openGraph: {
    title: 'Test de Tiempo de Reacción – Reflejos Online | SkillDrills',
    description:
      'Test de tiempo de reacción online gratis. Mide tu velocidad de respuesta visual en milisegundos (ms) y compara tu promedio con percentiles en el navegador.',
    url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-time-test',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Tiempo de Reacción – Reflejos Online | SkillDrills',
    description:
      'Mide tu velocidad de reacción visual en milisegundos online gratis. Pon a prueba tus reflejos al instante y compara tus marcas en el navegador.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Entrenamientos', item: 'https://skilldrills.online/es/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidad de Reacción', item: 'https://skilldrills.online/es/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Test de Reflejos', item: 'https://skilldrills.online/es/drills/reaction-speed/reaction-time-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Reflejos y Tiempo de Reacción – Medidor Online Gratuito',
  alternateName: ['Test de Reflejos', 'Tiempo de Reacción', 'Test de Reacción Online', 'Test Reflejos Gaming'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Herramienta en el navegador para medir la velocidad de reacción visual en milisegundos (ms). Incluye comparativas científicas, rangos competitivos de esports y entrenamiento de cronometría mental.',
  browserRequirements: 'Navegador web moderno con soporte para JavaScript (Chrome, Safari, Firefox, Edge)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Test de Reflejos — Medidor de Velocidad de Reacción Visual | SkillDrills',
  url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-time-test',
  description:
    'Herramienta gratuita para medir la velocidad de reacción visual y reflejos en milisegundos.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requiere navegador web moderno con soporte para JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Tiempo de Reacción, Velocidad de Reflejos, Procesamiento Visual, Latencia Neuromuscular',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Test de Tiempo de Reacción - Juego Gratuito de Reflejos',
  url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-time-test',
  description: 'Test de Tiempo de Reacción - Juego Gratuito de Reflejos',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo realizar el Test de Reflejos y Tiempo de Reacción',
  description: 'Instrucciones para medir tu velocidad de reacción visual en el navegador.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Iniciar el Drill',
      text: 'Haz clic en «Iniciar Entrenamiento» para activar la arena de reflejos en pantalla completa.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-time-test#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Memorizar el Intervalo',
      text: 'Observa el intervalo objetivo en milisegundos mostrado en pantalla antes de iniciar la carrera.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-time-test#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Hacer Clic en el Momento Exacto',
      text: 'Haz clic con el ratón o pulsa la pantalla lo más rápido posible cuando se active el estímulo.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-time-test#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analizar Resultados y Rango',
      text: 'Revisa tu error promedio en milisegundos, porcentaje de precisión y clasificación de esports.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-time-test#step-4'
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuál es un buen tiempo de reacción en humanos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El tiempo de reacción promedio ante estímulos visuales en adultos sanos ronda entre 200 y 250 milisegundos (ms) (Kosinski, 2008). Marcas por debajo de 200 ms se consideran sumamente rápidas, y valores inferiores a 180 ms corresponden a la élite de jugadores de esports y pilotos de Fórmula 1.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se mide el tiempo de reacción en este test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Se mide en milisegundos desde que el estímulo aparece en pantalla hasta que se registra la pulsación, utilizando la API de alta resolución performance.now() del navegador sin intermediación de servidores (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se pueden entrenar y mejorar los reflejos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El entrenamiento repetitivo optimiza las vías neuronales de percepción visual y la preparación motora, logrando mejoras consistentes de 15 a 30 ms sin sacrificar la precisión (Dye, Green, & Bavelier, 2009).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué fluctúa el tiempo de reacción según el día?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Factores biológicos como el descanso, ritmo circadiano, cansancio cognitivo y cafeína influyen directamente, además de variables técnicas como la tasa de refresco del monitor y la latencia del ratón.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Influyen los hercios (Hz) del monitor en el resultado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Un monitor estándar de 60 Hz actualiza cada 16,67 ms, mientras que pantallas gaming de 144 Hz (6,94 ms) o 240 Hz (4,17 ms) muestran el estímulo antes, reduciendo la latencia percibida en unos 10 a 12 ms (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué se diferencia un reflejo del tiempo de reacción?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un reflejo es un circuito involuntario a nivel espinal (como el rotuliano) que toma de 20 a 50 ms sin pasar por el cerebro. El tiempo de reacción implica recepción en la corteza visual, análisis cognitivo y envío de la orden motora (150 a 250+ ms).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué la reacción auditiva es más rápida que la visual?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las señales acústicas llegan a la corteza auditiva en 8–10 ms, mientras que la fototransducción retiniana toma de 20 a 40 ms. Por ende, la respuesta al sonido (140–160 ms) es 30 a 50 ms más rápida que a la luz (Shelton & Kumar, 2010).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo afecta la edad a la velocidad de reacción?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El tiempo de reacción suele alcanzar su punto más ágil entre los 18 y 24 años, incrementándose aproximadamente 2 a 6 ms por década posterior (Der & Deary, 2006). La actividad física regular y los ejercicios de reflejos ayudan a frenar este declive.',
      },
    },
    {
      '@type': 'Question',
      name: '¿La cafeína mejora los reflejos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El consumo moderado de cafeína bloquea los receptores de adenosina en el sistema nervioso, aumentando la alerta y reduciendo de forma transitoria los tiempos de reacción entre 10 y 20 ms (Smith, 2002).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué diferencia a SkillDrills de Human Benchmark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A diferencia de medir únicamente el clic reactivo rojo a verde, SkillDrills entrena la estimación temporal (cronometría mental), castiga las anticipaciones descontroladas y suma multiplicadores de combo para simular situaciones competitivas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué juegos de esports se benefician más de este entrenamiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Juegos de disparos tácticos (CS2, Valorant), battle royales (Apex Legends) y MOBAs (League of Legends), donde décimas de segundo determinan la victoria en duelos de asomadas o esquives.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se puede utilizar en teléfonos móviles y tablets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, la plataforma está 100% optimizada para pantallas táctiles en iOS y Android, tanto en posición vertical como horizontal sin necesidad de instalar aplicaciones.',
      },
    },
  ],
};

const reactionGuide = {
  heading: 'Guía del Test de Reflejos y Cronometría Mental',
  intro: [
    'El tiempo de reacción es el lapso transcurrido entre la percepción de un estímulo sensorial y la ejecución del movimiento motor voluntario.',
    'En esports competitivos (Valorant, CS2, League of Legends) y en deportes de motor, pequeñas diferencias de milisegundos definen quién acierta el primer disparo o reacciona a tiempo ante imprevistos.',
    'Metodología de Medición: Todas las lecturas se registran directamente en el dispositivo cliente mediante la API performance.now() de alta precisión, garantizando cero desfase por conexiones externas.',
    'Latenica de Hardware: Las pantallas habituales de 60 Hz agregan 16,7 ms de retardo por fotograma. El uso de pantallas de 144 Hz o 240 Hz y ratones con tasa de sondeo de 1000 Hz permite evaluar tu rendimiento biológico real (Woods et al., 2015).',
  ],
  benchmarks: {
    title: 'Tabla de Referencia de Tiempos de Reacción y Rangos Gamer',
    headers: ['Latencia / Error (ms)', 'Clasificación', 'Percentil', 'Rango Gamer Equivalente', 'Perfil Neurológico'],
    rows: [
      ['< 150 ms', 'Sobrehumano / Godlike', 'Top 1%', 'Piloto de F1 / Radiant Pro', 'Dominio del ritmo, anticipación precisa y sinapsis en límites fisiológicos'],
      ['150 – 190 ms', 'Élite Competitiva', 'Top 5%', 'Inmortal / Faceit Nivel 10', 'Procesamiento visual profesional y activación motora sin titubeos'],
      ['190 – 240 ms', 'Gamer Avanzado', 'Top 25%', 'Diamante / Ascendente', 'Rápida discriminación de estímulos y suelta certera del gatillo'],
      ['240 – 280 ms', 'Promedio Humano Estándar', 'Mediana 50%', 'Oro / Platino', 'Respuesta visual típica de un adulto saludable en monitor de 60Hz'],
      ['> 300 ms', 'Iniciación / Casual', 'Inferior 20%', 'Plata / Bronce', 'Latenica añadida por cansancio, falta de foco o periféricos lentos'],
    ],
    note: 'Valores basados en estudios neurológicos de cronometría humana (Kosinski, 2008; Woods et al., 2015). Pantallas de 60Hz añaden ~16,7 ms de demora.',
  },
  techniques: {
    title: 'Latencia Sensorial y Límites Fisiológicos',
    items: [
      {
        name: 'Latencia del Estímulo Visual (~200–250 ms)',
        desc: 'Los fotones alcanzan los fotorreceptores retinianos, viajan por el nervio óptico a la corteza visual primaria (V1) y activan la orden de clic en la corteza motora (Kosinski, 2008).',
        tips: 'Mantén la mirada relajada en lugar de tensar los músculos oculares; la visión periférica detecta antes las variaciones lumínicas.',
      },
      {
        name: 'Ventaja del Estímulo Auditivo (~140–170 ms)',
        desc: 'Las señales sonoras viajan por el tronco encefálico a la corteza auditiva más rápido que la luz, logrando respuestas 30 a 50 ms más veloces (Shelton & Kumar, 2010; Jain et al., 2015).',
        tips: 'En videojuegos de disparos, reaccionar a las pisadas acústicas brinda una ventaja enorme frente a esperar el contacto visual.',
      },
      {
        name: 'Procesamiento Táctil (~130–160 ms)',
        desc: 'Las vibraciones e impactos físicos evitan etapas cognitivas complejas, desencadenando arcos reflejos motores casi inmediatos.',
        tips: 'Los interruptores mecánicos con tacto marcado aseguran una respuesta de pulsación consistente.',
      },
      {
        name: 'Optimización de Pantalla y Hardware',
        desc: 'Un monitor de 60 Hz añade 16,7 ms de retraso por cuadro frente a solo 4,1 ms en uno de 240 Hz (Woods et al., 2015).',
        tips: 'Emplea ratones de 1000 Hz de sondeo y desactiva la sincronización vertical (V-Sync) para minimizar la latencia de entrada.',
      },
    ],
  },
  steps: [
    'Pulsa «Iniciar Entrenamiento» para abrir la pantalla completa del test.',
    'Memoriza el tiempo objetivo que aparece antes de comenzar la medición.',
    'Haz clic o toca la pantalla tan pronto se active la señal del objetivo.',
    'Realiza varias rondas para comprobar tu promedio de milisegundos, precisión y rango.',
  ],
  audience: 'Jugadores de esports de FPS y MOBA, pilotos de simracing, deportistas y cualquier usuario que busque poner a prueba y mejorar su agilidad mental y reflejos.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kosinski2008', 'woods2015', 'jain2015', 'shelton2010', 'dye2009', 'der2006', 'smith2002'),
  related: [
    { href: '/es/drills/reaction-speed', label: 'Hub de Velocidad de Reacción' },
    { href: '/es/drills/motor/movement-speed/rapid-tapping', label: 'Test de CPS y Velocidad de Clic' },
    { href: '/es/drills/reaction-speed/fps-tracking-trainer', label: 'Entrenador de Tracking FPS' },
    { href: '/es/drills/fps/flick-shot-training', label: 'Entrenamiento de Flick Shot' },
  ],
};

export default function SpanishReactionTimeTestPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReactionTimeTestWrapper copy={{ title: 'Test de Reflejos' }} />
      <DrillGuide guide={reactionGuide} />
    </>
  );
}
