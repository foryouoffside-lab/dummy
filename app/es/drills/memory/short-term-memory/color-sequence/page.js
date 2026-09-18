import ColorSequenceClient from '@/app/drills/memory/short-term-memory/color-sequence/ColorSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: "Juego Simón Online – Memoria de Colores | SkillDrills",
  description: "Juego Simón online gratis: Memoriza secuencias de colores en expansión y pon a prueba tu memoria de trabajo visual directamente en el navegador sin descargas.",
  keywords: [
    "juego de simon dice online",
    "juego de memoria de colores",
    "juego simon online gratis",
    "test de memoria secuencial",
    "juegos de memoria para adultos",
    "test de memoria a corto plazo",
    "entrenamiento de memoria de trabajo",
    "juego de recordar colores",
    "evaluacion de retencion visual",
    "ejercicios para mejorar la memoria",
    "capacidad de memoria de trabajo",
    "tecnica de chunking memoria"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/memory/short-term-memory/color-sequence",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/color-sequence'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Juego Simón Online – Memoria de Colores | SkillDrills",
    description: "Juego Simón online gratis: Memoriza secuencias de colores en expansión y pon a prueba tu memoria de trabajo visual directamente en el navegador sin descargas.",
    url: "https://skilldrills.online/es/drills/memory/short-term-memory/color-sequence",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Juego Simón Online – Memoria de Colores | SkillDrills",
    description: "Juego Simón online gratis: Memoriza secuencias de colores en expansión y pon a prueba tu memoria de trabajo visual directamente en el navegador sin descargas.",
  },
};

export default function SpanishColorSequencePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Entrenamientos de Memoria", "item": "https://skilldrills.online/es/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Memoria a Corto Plazo", "item": "https://skilldrills.online/es/drills/memory" },
      { "@type": "ListItem", "position": 4, "name": "Juego Simón de Colores", "item": "https://skilldrills.online/es/drills/memory/short-term-memory/color-sequence" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Juego Simón Online",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": "Entrenamiento interactivo gratuito de memoria de trabajo visual que evalua la retencion de patrones cromaticos secuenciales, agrupamiento cognitivo y foco atencional.",
    "genre": "Entrenamiento Cognitivo / Memoria Visual de Trabajo",
    "url": "https://skilldrills.online/es/drills/memory/short-term-memory/color-sequence",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Juego Simón Online",
    "url": "https://skilldrills.online/es/drills/memory/short-term-memory/color-sequence",
    "description": "Juego de memoria tipo Simon en linea gratuito para navegador con 6 bloques cromaticos y protocolo adaptativo en escalera. Practica retencion secuencial.",
    "dateModified": "2026-09-16",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Juego Simón – Secuencia de Colores",
    "url": "https://skilldrills.online/es/drills/memory/short-term-memory/color-sequence",
    "description": "Clasico juego electronico de memoria de secuencias de colores en el navegador para aumentar la retencion y la agilidad mental.",
    "genre": ["Juego de Memoria", "Entrenamiento Cerebral", "Puzzle"],
    "gamePlatform": ["Navegador Web", "Movil", "Tablet", "Escritorio"],
    "applicationCategory": "Game",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Que es el Juego Simón y como funciona en linea?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El juego Simon es una prueba clasica de memoria secuencial. El sistema muestra una sucesion progresiva de luces de colores y tonos auditivos. El jugador debe memorizar la secuencia y reproducirla exactamente presionando los paneles correspondientes."
        }
      },
      {
        "@type": "Question",
        "name": "Que funciones cerebrales se ejercitan al recordar secuencias de colores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Estimula principalmente la memoria de trabajo visual y la agenda visoespacial (Baddeley & Hitch, 1974), fortaleciendo la atencion selectiva, la codificacion serial y la plasticidad en la corteza prefrontal dorsolateral."
        }
      },
      {
        "@type": "Question",
        "name": "Cual es el limite de elementos segun Luck y Vogel (1997)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Steven Luck y Edward Vogel demostraron que la memoria de trabajo visual humana retiene un promedio estricto de unas 4 unidades independientes. Superar secuencias mas largas exige tecnicas activas de agrupamiento mental."
        }
      },
      {
        "@type": "Question",
        "name": "Que es la tecnica de agrupamiento (chunking) y como se aplica?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El chunking (Miller, 1956) consiste en combinar estimulos individuales en bloques coherentes. Al agrupar seis colores en dos pares o ternas (ej. Rojo-Azul-Verde como una unidad), la carga cognitiva sobre la memoria se reduce a la mitad."
        }
      },
      {
        "@type": "Question",
        "name": "Por que esta version incluye 6 colores en vez de los 4 tradicionales?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La inclusion de violeta y naranja amplia el abanico visual a 6 paneles, incrementando la entropia de eleccion y ofreciendo un reto de memoria operativa superior para usuarios avanzados."
        }
      },
      {
        "@type": "Question",
        "name": "Hay penalizacion de tiempo por cometer fallos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No se resta tiempo del cronometro. Al fallar, el algoritmo adaptativo simplemente retrocede un nivel en la longitud de la cadena, permitiendo continuar la sesion sin interrupciones frustrantes."
        }
      },
      {
        "@type": "Question",
        "name": "Que nivel o puntuacion se considera un rendimiento sobresaliente?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alcanzar los niveles 7 u 8 (secuencias de 7 u 8 colores) representa una excelente marca promedio. Superar el nivel 10 (mas de 1.300 puntos) requiere un dominio consistente del chunking y corresponde al percentil de elite."
        }
      },
      {
        "@type": "Question",
        "name": "Ayuda este juego a prevenir olvidos cotidianos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Si. Entrenar la retencion de patrones secuenciales optimiza la estabilidad atencional en la vida diaria, facilitando recordar codigos numericos, instrucciones por pasos y listas cortas sin anotarlas."
        }
      },
      {
        "@type": "Question",
        "name": "Esta adaptado para pantallas tactiles y moviles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La interfaz responde instantaneamente y sin retardo a toques tactiles en telefonos inteligentes y tabletas, asi como a clics de raton en ordenadores personales."
        }
      },
      {
        "@type": "Question",
        "name": "Es gratuito y requiere registro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es 100% gratuito, sin descargas ni creacion de cuentas. Tus records personales se guardan de forma privada y local en tu propio navegador."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Jugar al Juego Simón de Memoria de Colores",
    "description": "Metodo en 4 pasos para ejercitar la memoria de trabajo visual y dominar secuencias extensas en el juego Simon.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "url": "https://skilldrills.online/es/drills/memory/short-term-memory/color-sequence#step-1",
        "name": "Observa con Atencion los Destellos",
        "text": "Fija la mirada en el centro de los 6 paneles y sigue atentamente el orden de las luces y sonidos."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "url": "https://skilldrills.online/es/drills/memory/short-term-memory/color-sequence#step-2",
        "name": "Agrupa Mentalmente los Colores",
        "text": "Divide los estimulos en parejas o tripletas ritmicas para eludir la barrera de 4 elementos de la memoria."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "url": "https://skilldrills.online/es/drills/memory/short-term-memory/color-sequence#step-3",
        "name": "Reproduce la Secuencia sin Vacilar",
        "text": "Presiona los botones correspondientes en el orden exacto manteniendo un ritmo fluido y constante."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "url": "https://skilldrills.online/es/drills/memory/short-term-memory/color-sequence#step-4",
        "name": "Supera Niveles y Eleva tu Puntuacion",
        "text": "Con cada ronda superada la cadena incorpora un color extra, aumentando el multiplicador de puntos."
      }
    ]
  };

  const esCopy = {
    title: 'Juego Simón Online',
    subtitle: 'Test de Memoria Operativa Visual y Retencion de Secuencias de Colores',
    caption: 'Observa y reproduce la secuencia luminosa de colores en el orden exacto a medida que el patron se expande.',
    statScore: 'Puntuacion',
    statTime: 'Tiempo',
    statLevel: 'Nivel',
    statBestScore: 'Record',
    rulesTitle: 'Instrucciones del Juego y Sistema de Puntos',
    rule1Text: 'Retencion Secuencial',
    rule1Highlight: '+100 PTS',
    rule1Result: 'Reproduce el patron luminoso en el orden exacto de presentacion',
    rule2Text: 'Bonus de Nivel',
    rule2Highlight: '+10% PTS / Nivel',
    rule2Result: 'Secuencias mas largas acumulan multiplicadores progresivos',
    rule3Text: 'Fallo o Tiempo Agotado',
    rule3Highlight: '-1 Nivel',
    rule3Result: 'Sin perdida de puntos acumulados; reajusta la dificultad',
    rule4Text: 'Dificultad Adaptativa',
    rule4Highlight: 'Dinamico',
    rule4Result: 'La longitud de la secuencia se adapta a tu rendimiento actual',
    aboutTitle: 'Sobre el Juego Simon de Secuencia de Colores',
    overviewTitle: 'Que entrena el juego de memoria de colores?',
    overviewLead: 'La memoria de trabajo visual solo retiene unas 4 unidades independientes de informacion simultanea (Luck & Vogel, 1997; Cowan, 2001). Una secuencia creciente de colores pone a prueba de forma directa este limite neurocognitivo.',
    aboutIntro: [
      'El entrenamiento de memoria visual aisla y ejercita la capacidad cerebral de codificar, retener y recuperar patrones cromaticos en sucesion temporal estricta.',
      'Al practicar la reproduccion secuencial de colores, perfeccionas tecnicas de agrupamiento cognitivo (chunking) y desarrollas resistencia a la distraccion bajo tiempo limitado.',
    ],
    aboutCards: [
      { title: 'Para quien esta indicado?', text: 'Estudiantes, profesionales, opositores y jugadores de deportes electronicos que buscan reforzar su memoria a corto plazo y foco mental.' },
      { title: 'Funciones potenciadas', text: 'Amplitud de memoria visual, codificacion secuencial en la agenda visoespacial (Baddeley & Hitch, 1974) y rapidez de ejecucion.' },
      { title: 'Estrategia de Chunking', text: 'Agrupa colores en bloques ritmicos o trayectorias para superar con soltura la barrera de 4 unidades de la memoria operativa (Miller, 1956).' },
    ],
  };

  const esColorSequenceGuide = {
    heading: 'Guia del Juego Simon y Memoria de Trabajo Visual',
    intro: [
      'Reproducir secuencias cromaticas constituye uno de los metodos mas consolidados para evaluar la memoria de trabajo visoespacial y la atencion serial. Popularizado por Ralph Baer y Howard Morrison con el dispositivo Simon en 1978, este paradigma exige el almacenamiento y reensamblaje inmediato de estimulos dinamicos.',
      'El reto cognitivo reside en la capacidad finita de la agenda visoespacial (Visuospatial Sketchpad, Baddeley & Hitch, 1974). Las investigaciones de Steven J. Luck & Edward K. Vogel (1997) y Nelson Cowan (2001) corroboran que el almacen visual humano activo se restringe a unas 3 o 4 unidades independientes.',
      'Para superar cadenas extensas, el cerebro aplica tecnicas espontaneas de agrupamiento o chunking (Miller, 1956): los colores se asocian en pares ritmicos o formas espaciales, compactando multiples estimulos en una sola unidad de memoria.',
      'Todas las respuestas se cronometran con precision de milisegundos a traves de las APIs nativas del navegador (Woods et al., 2015).'
    ],
    benchmarks: {
      title: 'Baremos de Rendimiento en Juego Simon (Sesion de 45 segundos)',
      headers: ['Nivel de Rendimiento', 'Nivel Alcanzado', 'Puntuacion (45s)', 'Estrategia de Memoria y Evaluacion'],
      rows: [
        ['Tier 1 (Gran Maestro / Elite)', 'Nivel 11+', 'Mas de 1.500 PTS', 'Chunking multimodal excelente; codificacion visual y melodica simultanea'],
        ['Tier 2 (Avanzado / Nivel Torneo)', 'Nivel 8 – 10', '1.100 – 1.499 PTS', 'Superacion solida del limite de Cowan (4 elementos); agrupamiento consistente en parejas'],
        ['Tier 3 (Promedio Solido)', 'Nivel 5 – 7', '700 – 1.099 PTS', 'Capacidad tipica de memoria a corto plazo; ligera vacilacion ante secuencias rapidas'],
        ['Tier 4 (Base / Olvidos Ocasionales)', 'Nivel 3 – 4', '350 – 699 PTS', 'Memoria de trabajo al limite natural; ausencia de chunking estructurado'],
        ['Tier 5 (Iniciacion / Alta Tasa de Error)', 'Inferior a Nivel 3', 'Menos de 350 PTS', 'Dificultad a partir del tercer color; interferencia por persistencia visual']
      ],
      note: 'Baremos calculados a partir de sesiones de 45 segundos con patrones adaptativos de 6 colores (Luck & Vogel, 1997; Cowan, 2001; Woods et al., 2015).'
    },
    techniques: {
      title: '4 estrategias contrastadas para memorizar cadenas de colores mas largas',
      items: [
        {
          name: 'Agrupamiento Ritmico (Chunking)',
          desc: 'Evita memorizar cada color por separado. Construye bloques ritmicos nombrando mentalmente las iniciales de los colores con una cadencia fija (ej. "Rojo-Azul ... Verde-Amarillo").',
          tips: 'Divide la cadena en bloques de 2 o 3 colores en cuanto supere los 4 elementos.'
        },
        {
          name: 'Mapeo Espacial de Trayectorias',
          desc: 'Traza mentalmente una linea geometrica que conecte las posiciones de las luces encendidas (triangulos, zigzag o rombos) en lugar de retener nombres abstractos.',
          tips: 'La corteza parietal procesa el recorrido geometrico como un solo esquema continuo.'
        },
        {
          name: 'Asociacion Tonal Auditiva',
          desc: 'Cada panel emite una nota musical diferenciada. Memoriza la melodia resultante para activar la memoria auditiva a corto plazo como respaldo redundante.',
          tips: 'Manten el sonido activo para aprovechar la doble codificacion sensorial.'
        },
        {
          name: 'Atencion Focalizada en el Extremo Final',
          desc: 'El inicio de la cadena se reitera en cada turno; fija la maxima concentracion en el nuevo color agregado al final de la secuencia.',
          tips: 'Afianza el tramo inicial en el bucle fonologico y reserva la atencion activa para el ultimo impulso.'
        }
      ]
    },
    steps: [
      'Inicia la sesion de 45 segundos y enfoca la mirada en el anillo central.',
      'Sigue con atencion la secuencia progresiva de destellos luminosos y tonos.',
      'Reorganiza mentalmente la cadena en bloques emparejados de dos o tres colores.',
      'Al concluir la muestra, pulsa los botones en el orden exacto y con cadencia firme.',
      'Eleva tu nivel progresivamente para maximizar el multiplicador y el record final.'
    ],
    audience: 'Estudiantes, profesionales, opositores y deportistas electronicos que deseen potenciar su amplitud de memoria operativa, tecnicas de chunking y concentracion bajo presion de tiempo.',
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'luck1997', 'woods2015'),
    related: [
      { href: "/es/drills/memory/short-term-memory/digit-span", label: "Test de Digitos (Digit Span)" },
      { href: "/es/drills/memory/short-term-memory/word-recall", label: "Test de Memoria Verbal" },
      { href: "/es/drills/memory/spatial-memory/grid-memorization", label: "Memoria Espacial en Cuadricula" },
      { href: "/es/drills/cognitive/focus/concentration-grid", label: "Tabla de Schulte Online" },
      { href: "/es/drills/cognitive/focus/distraction-fighter", label: "Test de Stroop Online" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <ColorSequenceClient copy={esCopy} />
      <DrillGuide guide={esColorSequenceGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="memory" currentHref="/drills/memory/short-term-memory/color-sequence" locale="es" />
      </div>
    </>
  );
}
