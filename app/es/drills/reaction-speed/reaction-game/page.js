import ReactionSimulatorWrapper from '@/app/drills/reaction-speed/reaction-game/ReactionSimulatorWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — es-ES / LATAM (reaction-speed / reaction-game)
// PRIMARY DOMESTIC: "juego de reflejos" — Top gaming reflex query in Spanish
//                   "juegos de reflejos" — Plural gaming search
// SECONDARY / LSI:  "juego de reaccion" — Reaction game query
//                   "test de reflejos" — Reflex test query
//                   "velocidad de reaccion juego" — Reaction speed game
// WINNER TITLE:     Juego de Reflejos Online – Test de Reacción | SkillDrills
// ============================================================

export const metadata = {
  title: 'Juego de Reflejos Online – Test de Reacción | SkillDrills',
  description:
    'Juego de reflejos y reacción online gratis. Intercepta objetivos en caída vertical, entrena tu seguimiento visual y mejora tu coordinación en el navegador.',
  keywords: [
    'juego de reflejos',
    'juegos de reflejos',
    'juego de reaccion',
    'test de reflejos',
    'velocidad de reaccion juego',
    'coordinacion ojo mano',
    'reflejos shooter fps',
    'objetivos en caida',
    'entrenador de reflejos online',
    'agilidad mental juego',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/reaction-speed/reaction-game',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-game'),
  },
  openGraph: {
    title: 'Juego de Reflejos Online – Test de Reacción | SkillDrills',
    description:
      'Juego de reflejos y velocidad de reacción online gratis. Intercepta objetivos descendentes acelerados y pon a prueba tu agilidad.',
    url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-game',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juego de Reflejos Online – Test de Reacción | SkillDrills',
    description:
      'Entrena tu velocidad de reacción e intercepción de objetivos en el juego de reflejos gratis de SkillDrills.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Centro de Ejercicios', item: 'https://skilldrills.online/es/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidad de Reacción', item: 'https://skilldrills.online/es/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Juego de Reflejos', item: 'https://skilldrills.online/es/drills/reaction-speed/reaction-game' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Juego de Reflejos Online – Intercepción de Objetivos',
  alternateName: ['Juego de Reflejos', 'Juegos de Reflejos', 'Juego de Reacción Online', 'Entrenador de Reflejos FPS'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Simulador online en el navegador para intercepción de objetivos en caída y entrenamiento de coordinación ojo-mano y reflejos visuales.',
  browserRequirements: 'Navegador moderno con soporte para JavaScript (Chrome, Safari, Firefox, Edge)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Juego de Reflejos Online — Test de Reacción | SkillDrills',
  url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-game',
  description:
    'Juego gratuito en el navegador para medir y optimizar la velocidad de reacción y la coordinación óculo-manual.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requiere navegador moderno con soporte para JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Velocidad de Reacción, Reflejos Visuales, Seguimiento Vertical, Coordinación Ojo-Mano',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Juego de Reflejos e Intercepción Cinética',
  url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-game',
  description: 'Intercepta objetivos en caída acelerada para poner a prueba tus reflejos motores.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo Jugar al Juego de Reflejos Online',
  description: 'Instrucciones en 4 pasos para interceptar objetivos en caída y entrenar reflejos visuales.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Iniciar el Entrenamiento',
      text: 'Haz clic en «Iniciar Entrenamiento» para activar la arena de reflejos en pantalla completa.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-game#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Rastrear Objetivos en Caída',
      text: 'Mantén la mirada relajada en la zona superior para detectar esferas en el instante en que aparezcan.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-game#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Interceptar en la Zona Alta',
      text: 'Haz clic en los objetivos en el tercio superior de la pantalla para acumular bonificaciones de tiempo.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-game#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Mantener el Combo y Nivel',
      text: 'Encadena aciertos sin fallar para activar el multiplicador 3.0x y consulta tu rango de habilidad final.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/reaction-game#step-4'
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-15',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es un juego de reflejos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un juego de reflejos es una herramienta interactiva diseñada para evaluar y acondicionar la velocidad de respuesta neuromuscular, el rastreo ocular y la coordinación visomotora ante estímulos en movimiento.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es el tiempo de reacción promedio en humanos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El tiempo medio de reacción visual simple se sitúa entre 200 y 250 ms (Kosinski, 2008). En tareas de reacción con elección entre múltiples carriles, la Ley de Hick (Hick, 1952) sitúa la respuesta entre 250 y 350 ms.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué es importante el seguimiento vertical en shooters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En títulos como Apex Legends u Overwatch 2, los enemigos caen o saltan continuamente. El seguimiento vertical entrena el control suave del eje Y para no perder el centrado de la mira.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es posible mejorar los reflejos jugando?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El entrenamiento reiterado de intercepción cinemática optimiza las vías neuronales y reduce la vacilación motora, acortando el tiempo de respuesta entre 15 y 30 ms (Dye et al., 2009).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué diferencia hay entre reacción simple y reacción de elección?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La reacción simple evalúa el clic ante un único estímulo previsto. La reacción de elección exige discernir primero en qué carril cayó el objetivo antes de enviar la orden motora al dedo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo conseguir la máxima puntuación en el juego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El método más eficaz es interceptar las esferas en el tercio superior en cuanto emergen, acumulando bonus de tiempo y sosteniendo el combo multiplicador.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tiempo de reacción tienen los jugadores profesionales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los profesionales de esports en CS2 y Valorant suelen registrar tiempos de reacción de 150 a 190 ms, lo que les confiere ventaja crítica en intercambios de disparo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué varían los reflejos de un día a otro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La fatiga cognitiva, el déficit de sueño, los ritmos circadianos y la latencia del monitor (como pantallas de 60Hz) alteran el rendimiento de los reflejos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Influye una pantalla de 144Hz o 240Hz en el resultado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Los monitores de 144Hz (6,9 ms) o 240Hz (4,1 ms) muestran las imágenes mucho antes que los de 60Hz (16,7 ms), reduciendo el retardo de hardware en más de 10 ms (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Funciona el juego en móviles y tablets táctiles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Está programado con un lienzo táctil adaptativo que responde de inmediato al toque, funcionando directamente en el navegador sin descargas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo opera la dificultad progresiva?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A medida que sumas puntos y combos, los objetivos aumentan su velocidad de caída, el intervalo entre oleadas disminuye y el área de contacto se reduce.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Con qué frecuencia conviene practicar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una sesión de 5 a 10 minutos al día antes de jugar es suficiente para calentar la coordinación neuromuscular sin fatigar la mano ni la vista.',
      },
    },
  ],
};

const reactionGameGuideEs = {
  heading: 'Guía del Juego de Reflejos: Seguimiento Vertical e Intercepción Cinética',
  intro: [
    'Un juego de reflejos es una herramienta interactiva diseñada para evaluar y acondicionar la velocidad de respuesta neuromuscular, el rastreo ocular y la coordinación visomotora ante estímulos en movimiento.',
    'A diferencia de los tests básicos de clic de luz roja a verde, este juego multilínea demanda tiempo de reacción con elección fundamentado en la Ley de Hick (Hick, 1952): el cerebro debe localizar objetivos en caída libre, calcular su aceleración y activar el clic antes de que alcancen el borde inferior.',
    'Metodología de Medición y Latencia de Pantalla: El tiempo de respuesta se mide localmente en el navegador mediante la API de alta resolución performance.now(). Las pantallas normales de 60Hz introducen hasta 16,7 ms de retardo de búfer, mientras que los monitores de 144Hz (6,9 ms) y 240Hz (4,1 ms) minimizan la latencia de hardware (Woods et al., 2015).',
  ],
  benchmarks: {
    title: 'Tabla de Rendimiento y Niveles de Puntuación del Juego de Reflejos (45 segundos)',
    headers: ['Rango de Puntos', 'Nivel de Habilidad', 'Perfil Psicomotor', 'Enfoque de Entrenamiento'],
    rows: [
      ['15.000+ puntos', 'Gran Maestro / Pro', 'Captura foveal instantánea y disparo motor en sub-milisegundos', 'Mantener serenidad visual ante caídas simultáneas en varias líneas'],
      ['10.000 – 14.999 puntos', 'Élite Competitiva', 'Anticipación cinemática precisa con fallos casi nulos', 'Interceptar objetivos en el tercio superior de la pantalla'],
      ['6.000 – 9.999 puntos', 'Avanzado', 'Reflejos consistentes y buena adaptación a ondas aceleradas', 'Priorizar visión periférica sobre seguimiento focal aislado'],
      ['2.500 – 5.999 puntos', 'Intermedio', 'Seguro ante esferas únicas, exigido ante oleadas continuas', 'Minimizar desplazamiento del ratón reposicionando al centro'],
      ['< 2.500 puntos', 'Principiante', 'Clics puramente reactivos con titubeo perceptivo', 'Priorizar precisión sobre velocidad para consolidar el ritmo'],
    ],
    note: 'Estos rangos de rendimiento toman como base estudios de cronometría e intercepción visual (Hick, 1952; Carpenter, 1988; Woods et al., 2015). Las pantallas estándar de 60Hz añaden ~16,7 ms de búfer.',
  },
  techniques: {
    title: 'Mecánicas de Intercepción Cinética y Reflejos',
    items: [
      {
        name: 'Intercepción en la Zona Superior',
        desc: 'Hacer clic en los objetivos nada más aparecer en la zona alta otorga mayor margen de maniobra y bonificaciones de tiempo.',
        tips: 'Sitúa el cursor ligeramente por encima del centro para alcanzar los nuevos objetivos con trayectorias cortas.',
      },
      {
        name: 'Proyección de Trayectoria y Anticipación',
        desc: 'En lugar de perseguir el objetivo reactivamente, anticipa dónde estará en 100–150 ms y deja que caiga en tu retícula (Carpenter, 1988).',
        tips: 'La planificación motora anticipada en la corteza cerebral previene sobrecorrecciones bruscas con el ratón.',
      },
      {
        name: 'Visión Periférica para Detección Rápida',
        desc: 'Fijar la mirada en un solo carril te hace perder los adyacentes. Mantén un foco visual suave en la parte superior central.',
        tips: 'Los bastones de la retina periférica procesan el movimiento brusco mucho más rápido que la fóvea central.',
      },
      {
        name: 'Optimización de Latencia y Tasa de Sondeo',
        desc: 'Las pantallas de 60Hz agregan 16,7 ms por fotograma, mientras que las de 240Hz bajan a 4,1 ms (Woods et al., 2015).',
        tips: 'Emplea un ratón gaming a 1000Hz de sondeo y desactiva la sincronización vertical (V-Sync) en el controlador.',
      },
    ],
  },
  steps: [
    'Haz clic en «Iniciar Entrenamiento» para activar la arena a pantalla completa.',
    'Ubica el cursor en el centro superior con un agarre suave y relajado.',
    'Vigila la línea de aparición con visión periférica para captar al instante las esferas.',
    'Haz clic en los objetivos en la parte alta antes de que adquieran velocidad punta.',
    'Mantén la racha de combos activa y consulta tu puntuación y percentil de habilidad.',
  ],
  audience: 'Jugadores de shooters con movimiento vertical (Apex Legends, Overwatch 2, Fortnite), atletas que busquen agudizar sus reflejos y cualquiera que desee mejorar su coordinación ojo-mano.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('hick1952', 'carpenter1988', 'woods2015', 'kosinski2008'),
  related: [
    { href: '/es/drills/reaction-speed/reaction-time-test', label: 'Test de Tiempo de Reacción' },
    { href: '/es/drills/reaction-speed/reflex-training-drill', label: 'Entrenador de Reflejos' },
    { href: '/es/drills/reaction-speed/fps-tracking-trainer', label: 'Entrenador de Tracking FPS' },
    { href: '/es/drills/motor/movement-speed/rapid-tapping', label: 'Test de CPS y Clics por Segundo' },
  ],
};

export default function SpanishReactionGamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ReactionSimulatorWrapper copy={{ title: 'Juego de Reflejos Online' }} />
      <DrillGuide guide={reactionGameGuideEs} />
    </>
  );
}
