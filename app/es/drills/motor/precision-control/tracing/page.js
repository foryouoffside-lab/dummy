import FineMotorClient from '@/app/drills/motor/precision-control/tracing/TracingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — tracing (Spanish: Juego de Trazado con Ratón)
// PRIMARY:  "juego de trazado con ratón"      — Core query
//           "test de seguimiento de ratón"   — Diagnostic query
// SECONDARY / LSI:
//           "prueba de trazado y precisión ratón" — Precision test
//           "entrenamiento de puntería suave"     — Smooth aim training
//           "control motor fino trazado"          — Fine motor control
//           "seguimiento ocular suave pursuit"    — Psychophysics query
//           "ley de dirección de accot-zhai"      — Steering Law
// ============================================================

export const metadata = {
  title: 'Juego de Trazado con Ratón – Test de Precisión y Tracking',
  description: 'Juego de trazado con ratón online gratis. Sigue la onda continua con el cursor para entrenar seguimiento suave (smooth pursuit) y control motor fino.',
  keywords: [
    'juego de trazado con ratón',
    'test de seguimiento de ratón',
    'prueba de trazado y precisión ratón',
    'entrenamiento de puntería suave',
    'control motor fino trazado',
    'seguimiento ocular suave pursuit',
    'ley de dirección de accot-zhai',
    'estabilidad de cursor continuo',
    'juego de seguir la línea ratón',
    'ejercicios de tracking ratón fps',
    'coordinación visomotora trazado',
    'precisión de trazado sinusoidal',
  ],
  openGraph: {
    title: 'Juego de Trazado con Ratón – Test de Precisión y Tracking | SkillDrills',
    description: 'Juego de trazado con ratón online gratis. Sigue la onda continua con el cursor para entrenar seguimiento suave (smooth pursuit) y control motor fino.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/motor/precision-control/tracing',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juego de Trazado con Ratón – Test de Precisión y Tracking | SkillDrills',
    description: 'Juego de trazado con ratón online gratis. Sigue la onda continua con el cursor para entrenar seguimiento suave (smooth pursuit) y control motor fino.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor/precision-control/tracing',
    languages: getAlternateLanguages('/drills/motor/precision-control/tracing'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Entrenamiento Motor', item: 'https://skilldrills.online/es/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Control de Precisión', item: 'https://skilldrills.online/es/drills/motor/precision-control' },
    { '@type': 'ListItem', position: 4, name: 'Juego de Trazado', item: 'https://skilldrills.online/es/drills/motor/precision-control/tracing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Juego de Trazado con Ratón – Test de Precisión Motora',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Herramienta interactiva de evaluación motora para guiar el cursor sobre una onda sinuosa en movimiento constante.',
  url: 'https://skilldrills.online/es/drills/motor/precision-control/tracing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/es' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Juego de Seguimiento Continuo Online',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navegador moderno con soporte para HTML5 Canvas y Pointer Events',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/es/drills/motor/precision-control/tracing',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Entrenamiento de Trazado y Fluidez con Ratón',
  url: 'https://skilldrills.online/es/drills/motor/precision-control/tracing',
  description: 'Juego de precisión cinética que potencia el seguimiento suave y suprime microtemblores involuntarios.',
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
      name: '¿Qué es el Juego de Trazado con Ratón y qué evalúa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es una prueba neuromotora interactiva en la que el usuario sigue con el cursor una onda senoidal en desplazamiento continuo dentro de un canal de 22 píxeles. Evalúa la estabilidad manual, la velocidad de seguimiento suave (smooth pursuit) y la rapidez de corrección durante 45 segundos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué la onda avanza de forma continua sin esperar al usuario?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El desplazamiento permanente exige una acción cinemática constante. A diferencia de las pruebas estáticas, no permite pausas para reajustar el pulso; requiere anticipación visual continua y microcorrecciones inmediatas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es la Integridad de Flujo (Flow Integrity) y cómo se calcula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Integridad de Flujo mide la regularidad del seguimiento en tiempo real (0–100%). Sube mientras el cursor se mantiene dentro del margen de 22 px y desciende gradualmente al salir de la trayectoria.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo evolucionan la velocidad y la amplitud a lo largo del ejercicio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El test inicia a 2,2 px/fotograma con una amplitud de 90 px y progresa hasta 4,5+ px/fotograma con armónicos de hasta 125 px, exigiendo una coordinación neuromuscular superior a medida que transcurren los 45 segundos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué principios científicos sustentan el seguimiento continuo de rutas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Se fundamenta en la Ley de Dirección de Accot-Zhai (1997) y en el modelo motor de Woodworth (1899), operando bajo un bucle cerrado continuo donde la visión ajusta la trayectoria cada 150–200 ms.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué se diferencian el seguimiento ocular suave y los movimientos sacádicos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Como demostraron Krauzlis (2004) y Rashbass (1961), el seguimiento suave empareja la velocidad del estímulo de forma continua, mientras que las sacadas son saltos rápidos. Al salirse de la línea, la corteza visual ejecuta una sacada de alcance y desacelera para reenganchar el trazado.',
      },
    },
    {
      '@type': 'Question',
      name: '¿De qué manera beneficia este entrenamiento en videojuegos competitivos de disparos (FPS)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los títulos con tiempo de eliminación alto (TTK) requieren mantener la mira sobre rivales esquivos. Este ejercicio elimina tirones espasmódicos, suaviza el deslizamiento del antebrazo y perfecciona los cambios de sentido.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué sensibilidad y DPI son más recomendables?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sensibilidades medias a bajas (800 DPI con 25–45 cm/360°) brindan mayor solidez física e involucran el antebrazo, atenuando el temblor involuntario. Es conveniente configurar el ratón a una tasa de sondeo de 1000 Hz.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo evitar sobrecargas musculares y fatiga en la mano?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No presiones el ratón con excesiva fuerza contra la alfombrilla. Utiliza un agarre relajado tipo fingertip o claw, desliza desde el codo en desplazamientos amplios y reserva los dedos para ajustes milimétricos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se puede entrenar con tabletas gráficas o ratones trackball?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Al utilizar la API estándar de Pointer Events, los ilustradores pueden practicar la continuidad del trazo con lápiz digital en tabletas, al igual que los usuarios de trackballs de precisión.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo entrenar el trazado y el seguimiento continuo con ratón',
  description: 'Protocolo metódico para perfeccionar el seguimiento suave y suprimir sacudidas del cursor.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Situar el cursor en el punto inicial',
      text: 'Coloca el puntero sobre el inicio iluminado de la onda antes de que se inicie el temporizador.',
      url: 'https://skilldrills.online/es/drills/motor/precision-control/tracing#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Emparejar la velocidad y el recorrido de la onda',
      text: 'Desplaza el ratón de forma uniforme sobre el filamento mientras recorre la pantalla a velocidad constante.',
      url: 'https://skilldrills.online/es/drills/motor/precision-control/tracing#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Atenuar sacudidas involuntarias y microtemblores',
      text: 'Afirma el antebrazo sin tensionar los dedos y mira unos 20 píxeles por delante del cursor.',
      url: 'https://skilldrills.online/es/drills/motor/precision-control/tracing#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Comprobar puntuación e Integridad de Flujo',
      text: 'Revisa tu porcentaje de fluidez, tiempo dentro del canal y estabilidad al concluir los 45 segundos.',
      url: 'https://skilldrills.online/es/drills/motor/precision-control/tracing#step-4'
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'krauzlis2004', 'rashbass1961', 'woodworth1899', 'woods2015'),
  intro: {
    title: 'Cómo se evalúa el seguimiento continuo',
    paragraphs: [
      'Precisión de la medición y consideraciones técnicas: El registro del tiempo proviene del reloj performance.now() del navegador (~1 ms por seguridad). La pantalla refresca las imágenes según su frecuencia nativa — unos 16,7 ms a 60 Hz, 6,9 ms a 144 Hz y 4,1 ms a 240 Hz (Woods et al., 2015). El muestreo del ratón aporta ~8 ms a 125 Hz frente a 1 ms a 1000 Hz. Variaciones menores a 5 ms representan ruido técnico. SkillDrills no almacena datos en servidores externos.',
    ],
  },
  benchmark: {
    title: 'Baremos de Rendimiento en Trazado y Seguimiento Suave',
    description: 'Guía de referencia inspirada en Krauzlis (2004) y Rashbass (1961). Pondera la puntuación global, el pico de integridad de flujo y la racha máxima de fotogramas sin salirse del trazado en 45 segundos.',
    columns: ['Categoría', 'Rango', 'Puntuación', 'Pico de Flujo', 'Racha de Fotogramas', 'Nivel Editorial'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Gran Maestro Apex',
        stat: '1400+ pts',
        level: '95–100%',
        accuracy: '600+ frames',
        percentile: 'Excepcional (Top 1%)',
      },
      {
        tier: 'Tier 2',
        rank: 'Rastreador Maestro',
        stat: '1100–1399 pts',
        level: '85–94%',
        accuracy: '400–599 frames',
        percentile: 'Avanzado (Top 5%)',
      },
      {
        tier: 'Tier 3',
        rank: 'Seguidor Competente',
        stat: '800–1099 pts',
        level: '70–84%',
        accuracy: '250–399 frames',
        percentile: 'Sólido (Top 25%)',
      },
      {
        tier: 'Tier 4',
        rank: 'Cursor Intermedio',
        stat: '500–799 pts',
        level: '50–69%',
        accuracy: '120–249 frames',
        percentile: 'Promedio',
      },
      {
        tier: 'Tier 5',
        rank: 'Iniciante en Trazado',
        stat: 'Menos de 500 pts',
        level: 'Menos de 50%',
        accuracy: 'Menos de 120 frames',
        percentile: 'En desarrollo',
      },
    ],
  },
  protocols: {
    title: 'Protocolos de Entrenamiento para Seguimiento Continuo',
    description: 'Instrucciones para optimizar el seguimiento visual suave, reducir movimientos sacádicos imprevistos y asentar el pulso.',
    items: [
      {
        title: 'Protocolo 1: Enfoque Anticipado y Seguimiento Feedforward (Krauzlis 2004)',
        description: 'Fija la mirada entre 15 y 25 píxeles por delante de la onda en lugar de hacerlo directamente sobre el cursor. Esto permite a la corteza premotora prever la aceleración en las curvas antes de los puntos de inflexión.',
      },
      {
        title: 'Protocolo 2: Seguimiento de Doble Modo de Rashbass (1961)',
        description: 'Si sales del canal de 22 px, efectúa una corrección sacádica rápida y relaja la musculatura de inmediato para retomar el seguimiento suave, evitando rebotes erráticos con los bordes.',
      },
      {
        title: 'Protocolo 3: Modulación de Curvatura de Accot-Zhai (Crestas y Valles)',
        description: 'Según la Ley de Accot-Zhai (1997), las crestas y valles demandan velocidades tangenciales menores que los tramos planos. Modula levemente la velocidad en las zonas de curva para no derrapar.',
      },
      {
        title: 'Protocolo 4: Apoyo de Antebrazo y Reducción de la Fricción',
        description: 'Apoya el antebrazo sin clavar la muñeca en el escritorio. Pivota desde el codo para abarcar las oscilaciones sinusoidales y reserva los dedos para microajustes de 1–2 px.',
      },
    ],
  },
  faqs: {
    title: 'Preguntas Frequentes sobre Trazado de Ratón y Seguimiento de Ondas',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function SpanishTracingPage() {
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
      <FineMotorClient copy={{ title: "Juego de Trazado con Ratón" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/precision-control/tracing" locale="es" />
      </div>
    </>
  );
}
