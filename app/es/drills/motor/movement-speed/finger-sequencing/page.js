import FingerSequencingClient from '@/app/drills/motor/movement-speed/finger-sequencing/FingerSequencingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Aim Trainer Secuencial – Velocidad de Dedos | SkillDrills',
  description: 'Entrenador de puntería secuencial gratis. Mejora la velocidad de cambio de objetivo y la precisión de clic en orden numérico directo en tu navegador.',
  keywords: [
    'aim trainer secuencial',
    'entrenador de punteria en secuencia',
    'test de velocidad de dedos',
    'clic secuencial test',
    'cambio rapido de objetivos aim',
    'target switching entrenamiento',
    'ejercicios de punteria valorant cs2',
    'coordinacion motora de dedos',
    'entrenamiento de precision de clic',
    'test de velocidad de raton',
    'control del cursor secuencial',
    'test de reflejos con raton',
  ],
  openGraph: {
    title: 'Aim Trainer Secuencial – Velocidad de Dedos | SkillDrills',
    description: 'Entrenador de puntería secuencial gratis. Mejora la velocidad de cambio de objetivo y la precisión de clic en orden numérico directo en tu navegador.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/motor/movement-speed/finger-sequencing',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aim Trainer Secuencial – Velocidad de Dedos | SkillDrills',
    description: 'Entrenador de puntería secuencial gratis. Mejora la velocidad de cambio de objetivo y la precisión de clic en orden numérico.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor/movement-speed/finger-sequencing',
    languages: getAlternateLanguages('/drills/motor/movement-speed/finger-sequencing'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Entrenamiento Motor', item: 'https://skilldrills.online/es/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Velocidad de Movimiento', item: 'https://skilldrills.online/es/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'Aim Trainer Secuencial', item: 'https://skilldrills.online/es/drills/motor/movement-speed/finger-sequencing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Aim Trainer Secuencial – Test de Velocidad de Dedos',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Entrenador de puntería secuencial y test de rapidez de dedos en el navegador. Practica el cambio ordenado de blancos, trayectoria óptima y precisión motriz.',
  url: 'https://skilldrills.online/es/drills/motor/movement-speed/finger-sequencing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Entrenador de Puntería Secuencial',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requiere soporte para Canvas HTML5 y JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/es/drills/motor/movement-speed/finger-sequencing',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Aim Trainer Secuencial – Test de Dedos',
  url: 'https://skilldrills.online/es/drills/motor/movement-speed/finger-sequencing',
  description: 'Mide la velocidad al alternar entre objetivos en orden prescrito según programas motores secuenciales.',
  genre: ['Aim Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es un entrenador de puntería secuencial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es un ejercicio motor interactivo donde se debe hacer clic en varios objetivos en un estricto orden de numeración o tamaño decreciente antes de que venza el tiempo. Desarrolla la adquisición balística de blancos y la fluidez de trayectoria.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo mejora la puntería en shooters tácticos como Valorant o CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En situaciones con múltiples enemigos simultáneos, es vital cambiar de objetivo con inmediatez. El entrenamiento secuencial acostumbra a la corteza motora a preconcebir bloques de movimiento (Lashley 1951), suprimiendo la pausa entre disparos sucesivos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué diferencia hay con una prueba habitual de CPS (clics por segundo)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un test de CPS mide únicamente la pulsación repetitiva sobre un botón estático. El ejercicio secuencial aúna velocidad de pulsación con navegación espacial bajo la Ley de Fitts, demandando frenado antagónico y microcorrecciones.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué disminuye el tamaño de los objetivos a lo largo de la cadena?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Replica las condiciones de combate reales: un primer movimiento amplio y rápido hacia una zona extensa (cuerpo/pecho), seguido de ajustes milimétricos sobre puntos críticos reducidos (cabeza/headshot).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué sensibilidad de ratón es idónea para este ejercicio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mantén la misma sensibilidad con la que juegas en tus shooters habituales (generalmente de 25 a 45 cm por giro de 360 grados). Así aseguras una transferencia directa a tu memoria muscular.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el "motor chunking" (agrupamiento motor)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es el proceso neuronal por el cual el cerebro integra varios gestos independientes en una única macroinstrucción motora (Lashley 1951). Al no tener que decidir en cada parada, se recortan los tiempos de transición más del 50%.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuántos minutos al día se aconseja entrenar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entre 10 y 15 minutos diarios de práctica concentrada, organizados en 3 o 4 bloques breves con descansos de 60 segundos. Entrenar con tensión o fatiga excesiva deforma la técnica y degrada el control fino.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Resulta útil para juegos rítmicos como osu!?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La lectura anticipada de patrones geométricos y la ejecución rítmica de clics ordenados se transfieren inmediatamente a la precisión de lectura y golpeo en mapas musicales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué requisitos de hardware proporcionan los registros más fiables?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un monitor de 144 Hz o superior, un ratón con tasa de sondeo (polling rate) de 1000 Hz y la desactivación de la aceleración del cursor de Windows para asegurar un seguimiento lineal 1:1 inalterado.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se determina el porcentaje de precisión (Accuracy)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Calcula la relación entre clics certeros en la secuencia y el total de clics registrados (incluyendo disparos fallidos al aire o fuera de turno). Conservar más del 95% en rondas rápidas denota maestría.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo Entrenar Puntería Secuencial y Agilidad de Dedos',
  description: 'Guía paso a paso para dominar transiciones rápidas entre objetivos en orden numérico.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Escanear el Patrón de Objetivos',
      text: 'Inspecciona la disposición en pantalla para trazar mentalmente el recorrido geométrico más eficiente.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/finger-sequencing#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Impactar el Primer Blanco sin Demora',
      text: 'Dirige un movimiento rápido hacia el nodo inicial y haz clic de inmediato para comenzar la cuenta atrás.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/finger-sequencing#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Completar la Cadena en Orden Riguroso',
      text: 'Fluye de blanco en blanco (1 a 2 a 3) conservando un compás regular y minimizando el tiempo muerto.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/finger-sequencing#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Revisar Métricas y Latencia Intermedia',
      text: 'Comprueba el tiempo de cambio entre nodos, la velocidad media y el porcentaje de acierto en el panel final.',
      url: 'https://skilldrills.online/es/drills/motor/movement-speed/finger-sequencing#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('lashley1951', 'keele1968', 'fitts1954', 'mackenzie1992', 'woods2015'),
  intro: {
    title: 'Fundamentos Científicos de la Puntería Secuencial',
    paragraphs: [
      'El cambio de blancos en orden estricto constituye una función motora compleja: la duración de cada salto sigue la Ley de Fitts (Fitts, 1954; MacKenzie, 1992), determinada por la relación logarítmica entre distancia y amplitud. A su vez, la secuencia se programa como un bloque motor unitario antes de iniciar el movimiento (Lashley, 1951; Keele, 1968).',
      'Factores de medición en el navegador: La marca temporal depende de performance.now() y del refresco del monitor (16,7 ms a 60 Hz; 4,1 ms a 240 Hz). Toda discrepancia inferior a 5 ms forma parte del margen técnico de medición.',
    ],
  },
  benchmark: {
    title: 'Tabla de Rendimiento y Baremos de Puntería Secuencial',
    description: 'Niveles de referencia basados en latencia entre clics (Inter-Tap Latency), nivel máximo alcanzado y precisión de la cadena.',
    columns: ['Tier', 'Rango', 'Latencia entre Clics', 'Nivel Alcanzado', 'Precisión de Cadena', 'Categoría'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Secuenciador Apex (Apex Sequencer)',
        stat: 'Menos de 180 ms',
        level: 'Nivel 12+',
        accuracy: '98–100%',
        percentile: 'Top 1% (Élite)',
      },
      {
        tier: 'Tier 2',
        rank: 'Táctico Maestro (Master Tactician)',
        stat: '180–230 ms',
        level: 'Nivel 9–11',
        accuracy: '95–97%',
        percentile: 'Top 5% (Avanzado)',
      },
      {
        tier: 'Tier 3',
        rank: 'Operador Competente (Proficient Operator)',
        stat: '230–300 ms',
        level: 'Nivel 6–8',
        accuracy: '90–94%',
        percentile: 'Top 20% (Competente)',
      },
      {
        tier: 'Tier 4',
        rank: 'Clickeador Intermedio (Intermediate Clicker)',
        stat: '300–400 ms',
        level: 'Nivel 3–5',
        accuracy: '82–89%',
        percentile: 'Promedio Típico',
      },
      {
        tier: 'Tier 5',
        rank: 'Secuenciador Novato (Novice Sequencer)',
        stat: 'Más de 400 ms',
        level: 'Nivel 1–2',
        accuracy: 'Menos de 82%',
        percentile: 'Iniciación',
      },
    ],
  },
  protocols: {
    title: 'Protocolos Estructurados de Entrenamiento',
    description: 'Metodologías para acelerar la velocidad de cambio de objetivo y la precisión de clic.',
    items: [
      {
        title: 'Protocolo 1: Agrupamiento Motor Jerárquico (Lashley 1951)',
        description: 'Examina todos los nodos antes de pulsar el primero. Graba la ruta en la memoria premotora como un único bloque para evitar pausas intermedias.',
      },
      {
        title: 'Protocolo 2: Ritmo Balístico en Bucle Abierto (Keele 1968)',
        description: 'Cubre distancias amplias a la mayor velocidad posible sin rectificaciones a mitad de trayectoria, desacelerando con firmeza al rozar el borde del blanco.',
      },
      {
        title: 'Protocolo 3: Modulación de Frenada ante Nodos Reducidos',
        description: 'Adapta la intensidad de parada conforme menguan los círculos: impulsos enérgicos de brazo al inicio y microajustes de muñeca y dedos para los finales.',
      },
      {
        title: 'Protocolo 4: Sincronización Rítmica Constante',
        description: 'Mantén un compás metronómico. Las aceleraciones desordenadas inducen disparos errados y penalizaciones severas.',
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

const esCopy = {
  title: "Aim Trainer Secuencial",
  desc: "El cambio secuencial de objetivos entrena el clic rápido en nodos ordenados numéricamente en lugar del blanco más cercano. Basado en los programas motores en serie de Lashley (1951) y Keele (1968), perfecciona la planificación de trayectorias balísticas y las microcorrecciones de puntería.",
  score: "Puntos",
  timeLeft: "Tiempo Restante",
  accuracy: "Precisión",
  bestScore: "Mejor Puntuación",
  startButtonText: "Iniciar Entrenamiento",
  startSubtitle: "Precisión Motora y Trayectorias Secuenciales • Entrada Directa 1:1",
  getReady: "PREPÁRATE",
  rulesTitle: "Instrucciones del Ejercicio y Sistema de Puntos",
  rulesItems: [
    { num: "1", text: "Impacto Secuencial de Nodos", highlight: "Secuencia Esmeralda", result: "+150 PTS × Combo (+0.6s)" },
    { num: "2", text: "Multiplicador de Combo", highlight: "Hasta 3.0×", result: "Aumenta la puntuación exponencialmente" },
    { num: "3", text: "Progresión de Nivel", highlight: "Escalado Continuo", result: "Los objetivos reducen su tamaño dinámicamente" },
    { num: "4", text: "Fallo / Expiración", highlight: "Reinicio de Combo", result: "Penalización de -0.8s" }
  ],
  chainsCleared: "Cadenas Completadas",
  peakLevel: "Nivel Máximo",
  maxCombo: "Combo Máximo",
  playAgain: "Entrenar de Nuevo",
  shareTitle: "Compartir Puntuación",
  exitTitle: "Salir"
};

export default function SpanishFingerSequencingPage() {
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
      <FingerSequencingClient copy={esCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/es/drills/motor/movement-speed/finger-sequencing" />
      </div>
      <DrillFooter />
    </>
  );
}
