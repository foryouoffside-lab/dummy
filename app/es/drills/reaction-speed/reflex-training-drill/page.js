import ReflexTrainingDrillWrapper from '@/app/drills/reaction-speed/reflex-training-drill/ReflexTrainingDrillWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — es-ES / LATAM (reaction-speed / reflex-training-drill)
// PRIMARY DOMESTIC: "test de reflejos"   — 19 exact searches/mo
//                    "juegos de reflejos" — Gaming intent
// SECONDARY / LSI:
//                    "juego de reflejos"  — Reflex game
//                    "entrenar reflejos"  — Action intent
//                    "reflejos gamer"     — Esports intent
// WINNER TITLE:      Juego de Reflejos & Test de Reacción Multi-Objetivo | SkillDrills
// ============================================================

export const metadata = {
  title: 'Juego de Reflejos – Test de Reacción Online | SkillDrills',
  description:
    'Juego de reflejos y test de reacción online gratis. Elimina ráfagas de dianas en pantalla, mejora tu atención dividida y entrena tus reflejos para esports.',
  keywords: [
    'juego de reflejos',
    'juegos de reflejos',
    'test de reflejos',
    'entrenar reflejos',
    'velocidad de reaccion',
    'reflejos gamer',
    'atencion dividida',
    'agilidad visual gamer',
    'test de reaccion online',
    'reflejos online',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/reaction-speed/reflex-training-drill',
    languages: getAlternateLanguages('/drills/reaction-speed/reflex-training-drill'),
  },
  openGraph: {
    title: 'Juego de Reflejos & Test de Reacción Multi-Objetivo | SkillDrills',
    description:
      'Juego de reflejos y test de reacción multi-objetivo online gratis. Reacciona a ráfagas de dianas simultáneas y entrena tu agilidad visual.',
    url: 'https://skilldrills.online/es/drills/reaction-speed/reflex-training-drill',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juego de Reflejos & Test de Reacción Multi-Objetivo | SkillDrills',
    description:
      'Entrena tus reflejos y atención dividida online gratis en el navegador.',
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
    { '@type': 'ListItem', position: 4, name: 'Juego de Reflejos', item: 'https://skilldrills.online/es/drills/reaction-speed/reflex-training-drill' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Juego de Reflejos & Test de Reacción Multi-Objetivo',
  alternateName: ['Juego de Reflejos', 'Juegos de Reflejos', 'Entrenamiento de Reflejos', 'Multi-Target Reflex Trainer'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Herramienta interactiva para medir y acondicionar la velocidad de reacción y la atención dividida ante múltiples estímulos visuales en pantalla.',
  browserRequirements: 'Navegador web moderno con soporte para JavaScript (Chrome, Safari, Firefox, Edge)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Juego de Reflejos & Test de Reacción Multi-Objetivo | SkillDrills',
  url: 'https://skilldrills.online/es/drills/reaction-speed/reflex-training-drill',
  description:
    'Juego gratuito para entrenar reflejos rápidos y atención dividida con ráfagas de dianas.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requiere navegador web moderno con soporte para JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Reflejos, Atención Dividida, Coordinación Óculo-Manual, Tiempo de Decisión Visual',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Entrenamiento de Reflejos - Juego de Velocidad de Reacción Multi-Objetivo',
  url: 'https://skilldrills.online/es/drills/reaction-speed/reflex-training-drill',
  description: 'Entrenamiento de Reflejos - Juego de Velocidad de Reacción Multi-Objetivo',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo jugar al Juego de Reflejos Multi-Objetivo',
  description: 'Instrucciones para entrenar tus reflejos visuales en el navegador.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Iniciar el Drill',
      text: 'Pulsa «Iniciar Entrenamiento» para desplegar la arena en pantalla completa.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reflex-training-drill#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Escanear las Dianas',
      text: 'Observa la ráfaga de dianas que aparecen de golpe y revisa sus aros de cuenta atrás.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reflex-training-drill#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Priorizar y Pulsar',
      text: 'Haz clic en el objetivo más cercano a caducar antes de que su anillo se cierre.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reflex-training-drill#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Encadenar Rachas',
      text: 'Conserva el combo y la precisión para ganar tiempo extra y subir de nivel.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reflex-training-drill#step-4'
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
      name: '¿En qué consiste este juego de reflejos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es un ejercicio visual y motor donde múltiples dianas aparecen simultáneamente en pantalla y debes destruirlas en orden antes de que caduquen.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se puede entrenar la velocidad de reacción ante múltiples estímulos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Si bien la velocidad de transmisión nerviosa motora es fija, la latencia cognitiva central (identificar y seleccionar a qué objetivo disparar) se reduce con la práctica continua (Donders, 1868).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es la Ley de Hick y por qué es importante?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Ley de Hick (Hick, 1952) postula que el tiempo de reacción se incrementa de forma logarítmica con el número de opciones presentes. Al entrenar con este drill, el cerebro aprende a procesar agrupaciones espaciales en bloque, disminuyendo el retardo decisional.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo influye la atención dividida en los videojuegos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Permite procesar información visual en ángulos amplios de la pantalla sin caer en visión de túnel, algo clave cuando varios enemigos asoman al mismo tiempo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la mejor técnica para conseguir puntuaciones altas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Triar las dianas según el tiempo restante de su anillo y trazar una trayectoria geométrica continua sin movimientos espasmódicos del ratón.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Afectan los hercios (Hz) de la pantalla?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pantallas de 144 Hz o 240 Hz reducen el intervalo de refresco a 6,9 ms y 4,2 ms (frente a 16,7 ms en 60 Hz), exponiendo las dianas antes (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se puede jugar en móviles y tablets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, es compatible con pantallas táctiles. Girar el móvil a modo horizontal permite abarcar un campo visual mucho más amplio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo de entrenamiento al día es ideal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entre 10 y 15 minutos diarios de práctica enfocada son suficientes para estimular adaptaciones neuromusculares sin fatiga.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre tiempo de reacción simple y de elección?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El tiempo simple responde a un solo estímulo (~200–250 ms), mientras que el de elección requiere discriminar entre varias alternativas, incrementando el tiempo de procesamiento (Donders, 1868; Hick, 1952).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Influye la tasa de sondeo (polling rate) del ratón?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, una tasa de 1000 Hz envía datos cada milisegundo a la computadora, reduciendo al mínimo la latencia de entrada.',
      },
    },
  ],
};
const reflexDrillGuide = {
  heading: 'Guía del Juego de Reflejos: Dianas Múltiples y Atención Dividida',
  intro: [
    'Este juego de reflejos traslada la reacción simple (reaccionar a un único flash esperado) a la reacción de elección bajo escenarios competitivos reales.',
    'En videojuegos de disparos como CS2, Valorant o Apex Legends, rara vez te enfrentas a un estímulo aislado. A menudo aparecen múltiples amenazas simultáneas que demandan triaje inmediato y puntería rápida.',
    'Bases Científicas: Donders (1868) determinó que la reacción con elección (Tipo B) incluye discriminación visual y selección motora. La Ley de Hick-Hyman (Hick, 1952) modela el aumento del retardo según el número de alternativas.',
    'Precisión Técnica: Ejecutado en el cliente mediante HTML5 Canvas y performance.now() con precisión de sub-milisegundo (Woods et al., 2015).',
  ],
  benchmarks: {
    title: 'Tabla de Rendimiento en Adquisición Multi-Objetivo',
    headers: ['Tiempo Medio por Diana', 'Nivel / Rango', 'Perfil de Latencia', 'Perfil Cognitivo', 'Foco Recomendado'],
    rows: [
      ['< 250 ms / diana', 'Apex / Pro', 'Mínima demora de elección', 'Agrupamiento espacial instantáneo y movimientos sacádicos limpios', 'Mantener densidad máxima de objetivos'],
      ['250 – 320 ms / diana', 'Élite', 'Decisión comprimida', 'Triaje veloz y transiciones de diana firmes', 'Reducir tiempo de parada entre clics'],
      ['321 – 400 ms / diana', 'Competidor Avanzado', 'Reacción de elección normal', 'Buen clic inicial con leve vacilación en extremos', 'Emplear visión periférica para captar bordes'],
      ['401 – 500 ms / diana', 'Intermedio', 'Carga mental perceptible', 'Buen reflejo simple, pequeña congelación en ráfagas densas', 'Atender a los anillos de tiempo primero'],
      ['> 500 ms / diana', 'En Desarrollo', 'Elevada demora de decisión', 'Búsqueda visual titubeante', 'Practicar rutas geométricas suaves antes de acelerar'],
    ],
    note: 'Clasificación editorial basada en la literatura científica de cronometría humana (Donders, 1868; Hick, 1952).',
  },
  techniques: {
    title: 'Técnicas de Optimización para Reflejos Rápidos',
    items: [
      {
        name: 'Triaje y Trayectoria Geométrica',
        desc: 'Al aparecer las dianas, traza mentalmente el camino más corto en lugar de cruzar la pantalla en zigzag sin rumbo.',
        tips: 'Percibe el grupo de objetivos como una única figura en lugar de puntos aislados.',
      },
      {
        name: 'Registro Periférico del Siguiente Objetivo',
        desc: 'El centro visual ejecuta el disparo actual mientras los fotorreceptores periféricos detectan ya la siguiente diana encendida.',
        tips: 'Mantén la mirada centrada en la zona media del grupo y no pegada al cursor.',
      },
      {
        name: 'Capacidad de Frenado (Stopping Power)',
        desc: 'Pasarse del objetivo y tener que corregir cuesta entre 50 y 100 ms vitales. Frena en seco en el centro de cada diana.',
        tips: 'Una alfombrilla con textura de control facilita paradas limpias sin derrapar.',
      },
      {
        name: 'Rutina de Activación y Calentamiento',
        desc: 'Un entrenamiento de 5 a 10 minutos antes de jugar activa el sistema neuromuscular y reduce la latencia.',
        tips: 'Tener las manos y dedos calientes optimiza la velocidad de conducción nerviosa.',
      },
    ],
  },
  steps: [
    'Pulsa «Iniciar Entrenamiento» para abrir el modo pantalla completa.',
    'Mantén la vista relajada en el área central.',
    'Cuando brote la ráfaga de dianas, escanea su colocación y define el orden de pulsación.',
    'Haz clic con decisión en cada diana antes de que su aro de tiempo expire.',
  ],
  audience: 'Jugadores de FPS, MOBA, simracing y cualquiera que busque acelerar sus reflejos y atención dividida.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'dye2009', 'shelton2010', 'jain2015'),
  related: [
    { href: '/es/drills/reaction-speed', label: 'Hub de Velocidad de Reacción' },
    { href: '/es/drills/reaction-speed/reaction-time-test', label: 'Test de Reflejos y Tiempo de Reacción' },
    { href: '/es/drills/motor/movement-speed/rapid-tapping', label: 'Test de CPS y Velocidad de Clic' },
    { href: '/es/drills/reaction-speed/fps-tracking-trainer', label: 'Entrenador de Tracking FPS' },
  ],
};

export default function SpanishReflexTrainingDrillPage() {
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
      <ReflexTrainingDrillWrapper copy={{ title: 'Juego de Reflejos (Multi-Objetivo)' }} />
      <DrillGuide guide={reflexDrillGuide} />
      <DrillFooter />
    </>
  );
}
