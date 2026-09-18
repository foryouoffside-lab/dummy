import KeyboardRecognitionClient from '@/app/drills/motor/movement-speed/keyboard-recognition/KeyboardRecognitionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Test de Velocidad de Teclado – Keybinds | SkillDrills',
  description: 'Test de velocidad de teclado online gratis. Mide tu tiempo de reacción de teclas, reflejos con keybinds y memoria muscular sin descargas ni registros.',
  keywords: [
    'test de velocidad de teclado',
    'entrenador de keybinds',
    'test de reflejos de teclado',
    'tiempo de reaccion teclado',
    'practica de teclas de atajo',
    'memoria muscular de teclado gamer',
    'velocidad de pulsacion de teclas',
    'test de respuesta motora teclado',
    'entrenamiento de teclas wasd',
    'test de reflejos gamer online',
    'velocidad de reaccion de dedos',
    'ejercicios de teclado para shooters',
  ],
  openGraph: {
    title: 'Test de Velocidad de Teclado – Keybinds | SkillDrills',
    description: 'Test de velocidad de teclado online gratis. Mide tu tiempo de reacción de teclas, reflejos con keybinds y memoria muscular sin descargas ni registros.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/motor/movement-speed/keyboard-recognition',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Velocidad de Teclado – Keybinds | SkillDrills',
    description: 'Test de velocidad de teclado online gratis. Mide tu tiempo de reacción de teclas y reflejos con keybinds.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor/movement-speed/keyboard-recognition',
    languages: getAlternateLanguages('/drills/motor/movement-speed/keyboard-recognition'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Entrenamiento Motor', item: 'https://skilldrills.online/es/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Velocidad de Movimiento', item: 'https://skilldrills.online/es/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'Test de Velocidad de Teclado', item: 'https://skilldrills.online/es/drills/motor/movement-speed/keyboard-recognition' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Velocidad de Teclado – Entrenador de Keybinds',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Entrenador de velocidad de teclado y reflejos de keybinds gratuito en el navegador. Evalúa tiempo de reacción de elección, memoria muscular e inhibición de respuesta.',
  url: 'https://skilldrills.online/es/drills/motor/movement-speed/keyboard-recognition',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Test de Velocidad de Teclado',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requiere soporte para Canvas HTML5 y JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/es/drills/motor/movement-speed/keyboard-recognition',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Test de Velocidad de Teclado – Reflejos Gamer',
  url: 'https://skilldrills.online/es/drills/motor/movement-speed/keyboard-recognition',
  description: 'Mide con qué rapidez presionas la tecla adecuada ante un estímulo visual, fundamentado en la Ley de Hick para tiempo de reacción de elección.',
  genre: ['Keyboard Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué mide un test de velocidad de teclado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evalúa el tiempo transcurrido desde que se muestra un símbolo en pantalla hasta que se activa la tecla física correspondiente en el teclado. Calibra el tiempo de reacción de elección, la familiaridad espacial del teclado y la inhibición motriz.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo beneficia el entrenamiento de keybinds en shooters tácticos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En juegos como Valorant o CS2, activar habilidades o cambiar de arma en tiroteos directos no admite demoras. El entrenamiento automatiza la orden motora en la corteza cerebral, suprimiendo la necesidad de bajar la vista y erradicar pulsaciones falsas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el tiempo de reacción de elección y cómo actúa la Ley de Hick?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Ley de Hick (Hick 1952) describe que el tiempo de reacción se incrementa logarítmicamente según el volumen de opciones. El entrenamiento muscular constante afianza las rutas motoras y reduce el proceso electivo al nivel de un reflejo simple.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué función desempeñan las órdenes trampa (Fake Prompts)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evalúan la inhibición de respuesta motora (paradigma de señal de alto de Logan 1984). Cuando se proyecta un señuelo, la corteza prefrontal debe frenar la descarga motriz ya programada antes de que el interruptor mecánico se cierre.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es el tiempo de reacción promedio en teclas gaming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los usuarios sin entrenamiento registran de 380 a 480 ms. Jugadores regulares consiguen de 240 a 300 ms, mientras que competidores de élite bajan de 240 ms con alta precisión.',
      },
    },
    {
      '@type': 'Question',
      name: '¿De qué manera el modo secuencial estimula la memoria motriz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Al pedir series continuas de 3 a 5 teclas, potencia el agrupamiento motor (chunking) y la memoria de trabajo (Sternberg 1966). Las combinaciones complejas se disparan como una única pulsación coordinada.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué características de teclado brindan la menor latencia de registro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los teclados mecánicos lineales, ópticos o de efecto Hall magnético (con Rapid Trigger) y sondeo USB de 1000 Hz o superior suprimen el retardo de debounce por contacto físico.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo al día conviene entrenar las reacciones de teclas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Se aconsejan de 10 a 15 minutos diarios estructurados en 3 o 4 bloques breves. La fatiga del sistema nervioso desgasta la capacidad de contención e induce a pulsar en falso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es provechoso para títulos MOBA como League of Legends o Dota 2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Totalmente. Encadenar destrezas (Q-W-E-R) y activar objetos sin mirar el teclado exige independencia táctil y automatización espacial precisa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se calculan las KPM (teclas por minuto) y la precisión?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las KPM dividen las pulsaciones correctas entre la duración del test en minutos. La precisión contrasta las entradas válidas frente al total de pulsaciones, incluyendo deslices y caídas en trampas.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo Entrenar Velocidad de Teclado y Memoria Muscular de Atajos',
  description: 'Guía práctica para perfeccionar tiempos de reacción en teclas y control inhibitorio.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Adopta la Posición Base Gaming',
      text: 'Coloca la mano izquierda en tu zona habitual de teclado (como WASD) con los dedos descansando suavemente sobre las teclas.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/keyboard-recognition#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Identifica el Prompt sin Mirar el Teclado',
      text: 'Fija la mirada en el centro del monitor y, al presentarse la letra objetivo, localízala mentalmente por propiocepción.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/keyboard-recognition#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Pulsa con Firmeza o Frena ante Señuelos',
      text: 'Hunde la tecla adecuada con decisión. Si brota una trampa (Fake Prompt), inhibe inmediatamente el movimiento.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/keyboard-recognition#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analiza tu Latencia y Cadencia KPM',
      text: 'Evalúa tu retardo medio, la velocidad de KPM y la proporción de trampas evitadas en el panel final.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/keyboard-recognition#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'hick1952', 'logan1984', 'sternberg1966', 'woods2015'),
  intro: {
    title: 'Fundamentos Científicos de la Velocidad de Teclado',
    paragraphs: [
      'La evaluación de la velocidad de pulsación se apoya en los principios de tiempo de reacción de elección (Donders, 1868; Hick, 1952). La recepción del estímulo visual requiere unos 200–250 ms, y cada alternativa añadida eleva la complejidad de cálculo. El entrenamiento reiterado convierte el mapeo estímulo-respuesta en un acto automático que comprime la deliberación.',
      'Parámetros de medición en el navegador: El temporizador performance.now() y la frecuencia de refresco de la pantalla (16,7 ms a 60 Hz; 4,1 ms a 240 Hz) determinan la resolución. Desviaciones menores de 5 ms corresponden al margen técnico propio del entorno.',
    ],
  },
  benchmark: {
    title: 'Tabla de Baremos en Velocidad y Reflejo de Teclas',
    description: 'Niveles de referencia para contrastar progresos personales. Analiza latencia en tecla individual, cadencia de secuencias (KPM) y precisión inhibitoria.',
    columns: ['Tier', 'Rango', 'Latencia Tecla Individual', 'Velocidad KPM', 'Precisión Inhibitoria', 'Categoría'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Keybinder',
        stat: 'Menos de 240 ms',
        level: '320+ KPM',
        accuracy: '98–100%',
        percentile: 'Top 1% (Élite)',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Tactician',
        stat: '240–300 ms',
        level: '260–319 KPM',
        accuracy: '95–97%',
        percentile: 'Top 5% (Avanzado)',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Operator',
        stat: '300–380 ms',
        level: '200–259 KPM',
        accuracy: '90–94%',
        percentile: 'Top 20% (Competente)',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Typist',
        stat: '380–480 ms',
        level: '140–199 KPM',
        accuracy: '80–89%',
        percentile: 'Promedio Típico',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Keybinder',
        stat: 'Más de 480 ms',
        level: 'Menos de 140 KPM',
        accuracy: 'Menos de 80%',
        percentile: 'Iniciación',
      },
    ],
  },
  protocols: {
    title: 'Protocolos Estructurados de Entrenamiento',
    description: 'Procedimientos destinados a agilizar la transmisión corticoespinal y robustecer el control inhibitorio.',
    items: [
      {
        title: 'Protocolo 1: Compresión de Latencia de Elección (Donders 1868)',
        description: 'Mantén la mirada fija en el monitor sin observar el teclado. Obliga al cerebro a orientarse únicamente mediante la propiocepción de los dedos.',
      },
      {
        title: 'Protocolo 2: Organización por Zonas Funcionales (Hick 1952)',
        description: 'Estructura mentalmente las teclas en bloques claros (movimiento WASD, periféricos QECX, hilera numérica 1-4) para minimizar la entropía decisoria.',
      },
      {
        title: 'Protocolo 3: Inhibición por Señal de Alto (Logan 1984)',
        description: 'Adiestra la contención motriz ante estímulos señuelo, abortando la pulsación antes de franquear el punto de actuación mecánico.',
      },
      {
        title: 'Protocolo 4: Agrupamiento Motor Secuencial (Sternberg 1966)',
        description: 'Procesa las series de varias teclas como una única unidad cinética fluida, ejecutando las pulsaciones sucesivas en una sola descarga motriz.',
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

export default function SpanishKeyboardRecognitionPage() {
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
      <KeyboardRecognitionClient />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/keyboard-recognition" />
      </div>
    </>
  );
}
