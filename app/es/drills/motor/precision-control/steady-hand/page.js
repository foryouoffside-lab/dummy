import SteadyHandClient from '@/app/drills/motor/precision-control/steady-hand/SteadyHandClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — steady-hand (Spanish: Juego del Pulso)
// PRIMARY:  "juego del pulso"                — Universal Spanish game query
//           "test de pulso online"           — Diagnostic query
// SECONDARY / LSI:
//           "prueba de pulso ratón"          — Mouse steadiness search
//           "juego del alambre eléctrico"    — Cultural wire game query
//           "precisión de ratón test"        — Accuracy test
//           "test de temblor de manos online" — Hand tremor query
//           "control motor fino ratón"       — Fine motor control query
//           "ley de dirección de accot-zhai" — Steering Law
// ============================================================

export const metadata = {
  title: 'Juego del Pulso – Test de Precisión de Ratón y Firmeza',
  description: 'Juego del pulso online gratis. Guía el cursor por curvas estrechas sin tocar los bordes y mide tu estabilidad motora con la Ley de Dirección de Accot-Zhai.',
  keywords: [
    'juego del pulso',
    'test de pulso online',
    'prueba de pulso ratón',
    'juego del alambre eléctrico',
    'precisión de ratón test',
    'test de temblor de manos online',
    'control motor fino ratón',
    'ley de dirección de accot-zhai',
    'estabilidad de puntero',
    'juego de precisión de la mano',
    'ejercicios para mejorar el pulso',
    'entrenamiento de puntería ratón',
  ],
  openGraph: {
    title: 'Juego del Pulso – Test de Precisión de Ratón y Firmeza | SkillDrills',
    description: 'Juego del pulso online gratis. Guía el cursor por curvas estrechas sin tocar los bordes y mide tu estabilidad motora con la Ley de Dirección de Accot-Zhai.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juego del Pulso – Test de Precisión de Ratón y Firmeza | SkillDrills',
    description: 'Juego del pulso online gratis. Guía el cursor por curvas estrechas sin tocar los bordes y mide tu estabilidad motora con la Ley de Dirección de Accot-Zhai.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand',
    languages: getAlternateLanguages('/drills/motor/precision-control/steady-hand'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Entrenamiento Motor', item: 'https://skilldrills.online/es/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Control de Precisión', item: 'https://skilldrills.online/es/drills/motor/precision-control' },
    { '@type': 'ListItem', position: 4, name: 'Juego del Pulso', item: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Juego del Pulso – Test de Precisión de Ratón',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Juego del pulso y test de control motor fino gratuito para navegador. Conduce el cursor a través de un pasillo que se estrecha y evalúa tu estabilidad de mano y temblor.',
  url: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/es' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Juego del Pulso Online',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navegador moderno con compatibilidad HTML5 Canvas y Pointer Events',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Juego del Pulso y Precisión Motora',
  url: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand',
  description: 'Juego de habilidad que evalúa el temblor fisiológico y la precisión de trazado en el ratón.',
  genre: ['Precision Game', 'Action', 'Esports Training'],
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
      name: '¿Qué es el Juego del Pulso y qué habilidades motoras mide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El Juego del Pulso es una prueba neuromotora interactiva que consiste en guiar el cursor por un pasillo serpenteante sin tocar las paredes. Evalúa la estabilidad de la trayectoria, la retroalimentación visual en tiempo real y el temblor fisiológico bajo una restricción de espacio progresiva.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué ley científica describe el movimiento del ratón en pasillos estrechos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El desplazamiento por túneles restringidos está determinado por la Ley de Dirección de Accot-Zhai (1997), una extensión de la Ley de Fitts para tareas de navegación. La ley indica que el tiempo de recorrido es proporcional a la integral de la distancia dividida por el ancho del pasillo: a menor anchura, menor debe ser la velocidad para no salirse.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué se reinicia el cursor al inicio al rozar la pared?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El motor analiza de forma continua la distancia euclidiana entre las coordenadas del cursor y la línea central. Al superar la mitad del ancho permitido, se registra una falta inmediata que devuelve el puntero al inicio, exigiendo una precisión absoluta sin concesiones.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se reduce el ancho del pasillo en cada vuelta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El circuito comienza con una holgura de 50 píxeles en la vuelta 1 y se estrecha progresivamente con cada vuelta superada hasta quedar reducido a un canal de solo 12 píxeles en el nivel 12 o superior.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué causa el temblor de la mano al realizar movimientos de precisión?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El temblor fisiológico habitual (8–12 Hz) se debe a la sincronización de las unidades motoras y la resonancia mecánica de las extremidades. Sujetar el ratón con demasiada fuerza (cocontracción muscular), el estrés o la cafeína incrementan este temblor.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es el mejor agarre de ratón y la sensibilidad DPI adecuada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un agarre fingertip o claw relajado permite combinar el deslizamiento del antebrazo con sutiles microajustes de los dedos. Una sensibilidad de 400 a 800 DPI filtra eficazmente las oscilaciones involuntarias en comparación con sensibilidades altas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo explica el modelo de Woodworth (1899) el seguimiento de rutas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Robert S. Woodworth demostró que un movimiento orientado consta de un impulso balístico inicial seguido de una fase de control continuo basada en retroalimentación visual. En el Juego del Pulso, este control en bucle cerrado permite corregir el rumbo antes de tocar el borde.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Resulta útil este entrenamiento para cirujanos, dibujantes y jugadores de FPS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Tanto la cirugía laparoscópica como el entintado digital y la puntería de seguimiento en videojuegos competitivos exigen un pulso impecable, supresión del temblor y un control milimétrico del puntero.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo evitar el cansancio muscular y la tensión en la muñeca?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mantén el codo apoyado a unos 90 grados y no ejerzas presión hacia abajo contra la alfombrilla. Exhala de forma consciente antes de entrar en curvas cerradas para aflojar los hombros y realiza pausas cortas cada 5 minutos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se puede jugar con ratones trackball o lápices de tabletas gráficas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La aplicación emplea la API Pointer Events del navegador y es plenamente funcional con ratones convencionales, trackballs y lápices ópticos para evaluar el pulso en diferentes periféricos.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo entrenar el pulso y la precisión con el ratón',
  description: 'Protocolo de entrenamiento para recorrer curvas estrechas y dominar la Ley de Accot-Zhai.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand#step-1',
      name: 'Colocar el cursor en la zona de inicio',
      text: 'Haz clic en „Iniciar Drill“ y sitúa el cursor en la casilla verde de salida para activar el recorrido y el temporizador de 45 segundos.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand#step-2',
      name: 'Mantener una velocidad fluida y continua',
      text: 'Avanza con soltura por el sendero iluminado equilibrando rapidez y exactitud para no agotar el tiempo disponible.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand#step-3',
      name: 'Anticipar giros cerrados y frenar con antelación',
      text: 'Reduce la marcha un 40% antes de llegar a curvas cerradas y fija la mirada 20 o 30 píxeles por delante del cursor.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand#step-4',
      name: 'Entrar en la meta para aumentar la dificultad',
      text: 'Alcanza la zona de llegada verde para completar la vuelta. El tiempo se restablecerá y el canal se estrechará para la siguiente vuelta.',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'Cómo se mide el pulso y la estabilidad manual',
    paragraphs: [
      'Precisión de la medición y consideraciones técnicas: El registro del tiempo proviene del reloj performance.now() del navegador, limitado a aproximadamente 1 ms por motivos de seguridad. La pantalla muestra los fotogramas según su tasa de refresco — unos 16,7 ms a 60 Hz, 6,9 ms a 144 Hz y 4,1 ms a 240 Hz (Woods et al., 2015). La tasa de sondeo del ratón aporta unos 8 ms a 125 Hz frente a 1 ms a 1000 Hz. Cualquier variación inferior a 5 ms debe considerarse ruido experimental. SkillDrills guarda tus puntuaciones únicamente en tu navegador.',
    ],
  },
  benchmark: {
    title: 'Baremos de Rendimiento en el Juego del Pulso',
    description: 'Guía orientativa basada en la Ley de Accot & Zhai (1997) para analizar tu destreza. Las categorías valoran el nivel máximo superado, el ancho del pasillo y la desviación media.',
    columns: ['Categoría', 'Rango', 'Nivel Superado', 'Ancho del Pasillo', 'Desviación Media', 'Nivel de Habilidad'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Cirujano de Élite (Apex Surgeon)',
        stat: 'Nivel 12+',
        level: '12–15 px',
        accuracy: 'Menos de 2,5 px',
        percentile: 'Excepcional (Top 1%)',
      },
      {
        tier: 'Tier 2',
        rank: 'Navegante Maestro',
        stat: 'Nivel 9–11',
        level: '16–22 px',
        accuracy: 'Menos de 4,0 px',
        percentile: 'Avanzado (Top 5%)',
      },
      {
        tier: 'Tier 3',
        rank: 'Piloto Hábil',
        stat: 'Nivel 6–8',
        level: '23–32 px',
        accuracy: 'Menos de 6,5 px',
        percentile: 'Sólido (Top 25%)',
      },
      {
        tier: 'Tier 4',
        rank: 'Cursor Intermedio',
        stat: 'Nivel 3–5',
        level: '33–42 px',
        accuracy: 'Menos de 9,0 px',
        percentile: 'Promedio',
      },
      {
        tier: 'Tier 5',
        rank: 'Principiante con Temblor',
        stat: 'Nivel 1–2',
        level: '43–50 px',
        accuracy: 'Más de 9,0 px',
        percentile: 'En desarrollo',
      },
    ],
  },
  protocols: {
    title: 'Protocolos de Entrenamiento para Mejorar el Pulso',
    description: 'Directrices prácticas para atenuar el temblor involuntario y optimizar la navegación en pasillos angostos.',
    items: [
      {
        title: 'Protocolo 1: Regulación de Velocidad por Accot-Zhai (Ritmo en Pasillos)',
        description: 'Según la Ley de Accot-Zhai (1997), circular por túneles estrechos requiere graduar la velocidad en proporción inversa a la anchura. Aprovecha los tramos rectos para ganar segundos y frena un 40% al llegar a horquillas estrechas.',
      },
      {
        title: 'Protocolo 2: Enfoque Visual Anticipado de Woodworth',
        description: 'Dirige tu vista unos 20 o 30 píxeles por delante del puntero. Esta anticipación otorga a la corteza motora unos 150 ms de margen para computar correcciones antes de rozar la pared.',
      },
      {
        title: 'Protocolo 3: Atenuación del Temblor Fisiológico (8–12 Hz) y Postura',
        description: 'Traza las curvas amplias con el antebrazo y utiliza los dedos exclusivamente para microcorrecciones. Evita apretar el ratón con demasiada fuerza, ya que la tensión excesiva incrementa el temblor.',
      },
      {
        title: 'Protocolo 4: Trazado por el Vértice en Curvas Cerradas',
        description: 'A partir del nivel 6 (menos de 30 px de anchura), prioriza la trayectoria sobre la rapidez. Ceñirse al interior de la curva proporciona el mayor margen de maniobra ante la inercia centrífuga.',
      },
    ],
  },
  faqs: {
    title: 'Preguntas Frecuentes sobre el Juego del Pulso y Control del Ratón',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const esCopy = {
  h1Keyword: 'Juego del Pulso',
  h1Suffix: ' (Test de Precisión de Ratón)',
  caption: 'El Juego del Pulso evalúa la firmeza de tu mano y tu precisión motora fina al guiar el cursor por un sendero iluminado sin tocar las paredes. Basado en la Ley de Accot-Zhai (1997) y en el control en bucle cerrado de Woodworth (1899).',
  statLaps: 'Vueltas',
  statTime: 'Tiempo Restante',
  statStreak: 'Racha',
  statBest: 'Récord',
  pausedTitle: 'Pausado',
  pausedPrompt: 'Haz clic en la pantalla para fijar el cursor y reanudar.',
  startTitle: 'Circuito del Pulso',
  startSubtitle: 'Precisión Motora & Recorrido Estrecho • Temporizador de 45s',
  startBtn: 'Iniciar Drill',
  countdownSubtitle: 'PREPÁRATE',
  newBest: 'NUEVO RÉCORD',
  errorsLabel: 'Toques con la Pared',
  maxStreakLabel: 'Mejor Racha',
  difficultyLabel: 'Nivel Alcanzado',
  trainAgain: 'Repetir Intento',
  shareTitle: 'Compartir Puntuación',
  exitTitle: 'Salir y Volver',
  rulesTitle: 'Instrucciones y Sistema de Puntos',
  rulesItems: [
    { num: '1', text: 'Sigue el sendero esmeralda', highlight: 'iluminado con precisión', result: 'Llegar a la meta reinicia a 45s' },
    { num: '2', text: 'Vuelta completada', highlight: 'Escalado continuo', result: 'Pasillos más estrechos y cerrados' },
    { num: '3', text: 'Toque de pared', highlight: 'Reinicio al comienzo', result: 'Penalización de vuelta y fallo sumado' },
    { num: '4', text: 'Control de ratón', highlight: 'Recomendado para PC', result: 'Entrada 1:1 sin aceleración' },
  ],
  rule1Text: 'Sigue el sendero esmeralda',
  rule1Highlight: 'iluminado con precisión',
  rule1Result: 'Llegar a la meta reinicia a 45s',
  rule2Text: 'Vuelta completada',
  rule2Highlight: 'Escalado continuo',
  rule2Result: 'Pasillos más estrechos y cerrados',
  rule3Text: 'Toque de pared',
  rule3Highlight: 'Reinicio al comienzo',
  rule3Result: 'Penalización de vuelta y fallo sumado',
  rule4Text: 'Control de ratón',
  rule4Highlight: 'Recomendado para PC',
  rule4Result: 'Entrada 1:1 sin aceleración',
  aboutTitle: 'Acerca del Juego del Pulso',
  aboutHeading: 'Trazado Continuo de Trayectorias y Control del Temblor',
  aboutP1: 'El Juego del Pulso es una herramienta de entrenamiento diseñada para perfeccionar la coordinación mano-ojo, la motricidad fina de los dedos y la estabilidad del puntero. Guiar el ratón por pasos estrechos activa la musculatura estabilizadora del antebrazo y la muñeca.',
  aboutP2: 'Siguiendo la Ley de Accot & Zhai (1997), el tiempo necesario para cruzar un túnel se multiplica al reducirse el ancho. De 50 px a 12 px, el reto exige una corrección visual permanente (Woodworth, 1899) y una firmeza total en la mano.',
  aboutCard1Title: 'Público Recomendado',
  aboutCard1Text: 'Jugadores de FPS/MOBA, diseñadores digitales, cirujanos y cualquier persona interesada en eliminar el temblor involuntario del ratón.',
  aboutCard2Title: 'Beneficios Motores',
  aboutCard2Text: 'Coordinación motriz fina, control del pulso, dosificación de la velocidad en giros y prevención de contracturas.',
  aboutCard3Title: 'Estrechamiento Progresivo',
  aboutCard3Text: 'El pasillo se comprime en cada vuelta y los ángulos se vuelven más pronunciados para forzar una precisión milimétrica.',
  gradeLabels: {
    'S+': 'Pulso de Cirujano (Grandmaster)',
    'S': 'Control Maestro (Master)',
    'A': 'Puntería Fina (Diamond)',
    'B': 'Buena Estabilidad (Platinum)',
    'C': 'Superación Básica (Gold)',
  },
  shareDrillName: 'Juego del Pulso',
  shareUrl: 'https://skilldrills.online/es/drills/motor/precision-control/steady-hand',
  shareTextTemplate: '🖐️ ¡He superado {laps} vueltas en el {drillName} con una precisión de {acc}! Pon a prueba tu pulso y estabilidad con el ratón gratis en skilldrills.online',
  copiedAlert: '¡Puntuación copiada al portapapeles!',
};

export default function SpanishSteadyHandPage() {
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
      <SteadyHandClient copy={esCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/precision-control/steady-hand" locale="es" />
      </div>
      <DrillFooter />
    </>
  );
}
