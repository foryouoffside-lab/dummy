import EliteNeuroSwitchClient from '@/app/drills/cognitive/processing-speed/reaction-time/EliteNeuroSwitchClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Tiempo de Reacción de Elección – CRT | SkillDrills",
  description: "Test de tiempo de reacción de elección online gratis: Mide tu velocidad de toma de decisiones, discriminación visual y flexibilidad cognitiva sin registro.",
  keywords: [
    "test de tiempo de reaccion",
    "tiempo de reaccion de eleccion",
    "test tiempo de reaccion online",
    "ley de hick test",
    "test de velocidad de decision",
    "velocidad de procesamiento cognitivo",
    "test de discriminacion visual",
    "entrenamiento de reflejos cognitivos",
    "tiempo de reaccion simple vs eleccion",
    "test de agilidad mental gratis",
    "ejercicios de toma de decisiones rapidas",
    "test neurocognitivo tiempo de reaccion"
  ],
  openGraph: {
    title: "Test de Tiempo de Reacción de Elección – CRT | SkillDrills",
    description: "Test de tiempo de reacción de elección online gratis: Mide tu velocidad de toma de decisiones, discriminación visual y flexibilidad cognitiva sin registro.",
    type: 'article',
    url: 'https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Tiempo de Reacción de Elección – CRT | SkillDrills",
    description: "Test de tiempo de reacción de elección online gratis: Mide tu velocidad de toma de decisiones, discriminación visual y flexibilidad cognitiva sin registro.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/reaction-time'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://skilldrills.online/es"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Ejercicios",
      "item": "https://skilldrills.online/es/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cognitivo",
      "item": "https://skilldrills.online/es/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Tiempo de Reacción de Elección",
      "item": "https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Tiempo de Reacción de Elección – CRT",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test de tiempo de reacción de elección online gratis: Mide tu velocidad de toma de decisiones, discriminación visual y flexibilidad cognitiva sin registro.",
  "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "inLanguage": "es-ES",
  "dateModified": "2026-09-16"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Tiempo de Reacción de Elección",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requiere un navegador web moderno compatible con JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time",
  "inLanguage": "es-ES",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Test de Tiempo de Reacción de Elección – Juego Mental",
  "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time",
  "description": "Test de tiempo de reacción de elección online gratis: Mide tu velocidad de toma de decisiones, discriminación visual y flexibilidad cognitiva sin registro.",
  "genre": [
    "Action",
    "Brain Game",
    "Cognitive Training"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el tiempo de reacción de elección (CRT)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El tiempo de reacción de elección es el tiempo necesario para percibir un estímulo, discriminar su identidad entre varias opciones y ejecutar la respuesta motora adecuada."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre tiempo de reacción simple y de elección?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El tiempo simple (SRT, ~200ms) responde a un único estímulo previsto. El tiempo de elección (CRT, ~280-350ms) añade una fase de deliberación y discriminación perceptual antes de actuar (Donders, 1868)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué dice la Ley de Hick (Hick, 1952)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La Ley de Hick establece que el tiempo de reacción aumenta de forma logarítmica a medida que se incrementa el número de alternativas de estímulo-respuesta: RT = a + b * log2(n)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuáles son los valores promedio normales en humanos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En adultos sanos, el promedio oscila entre 280ms y 350ms. Deportistas de élite y jugadores profesionales de esports logran registros de entre 180ms y 230ms (Der & Deary, 2006)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué cambian las reglas de color durante el ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La alternancia dinámica de reglas fuerza a la corteza prefrontal a reconfigurar la respuesta y suprimir hábitos motores automáticos, entrenando la flexibilidad cognitiva."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es posible acelerar la velocidad de decisión con práctica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. El entrenamiento continuado consolida las rutas sinápticas, acelera la categorización visual y reduce la vacilación motora previa al clic."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo influye la edad en el tiempo de reacción?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La velocidad alcanza su cúspide entre los 18 y 25 años. A partir de entonces se produce un retraso gradual de 1 a 2ms anuales, compensable mediante entrenamiento cognitivo habitual."
      }
    },
    {
      "@type": "Question",
      "name": "¿Afectan el monitor y el ratón a la precisión del test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pantallas de 144Hz o superiores y ratones con sondeo de 1000Hz minimizan el retraso de entrada del hardware (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la rutina de entrenamiento óptima?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De 10 a 15 minutos al día son suficientes para activar la coordinación neuromuscular y optimizar los tiempos de respuesta antes de tareas exigentes."
      }
    },
    {
      "@type": "Question",
      "name": "¿Este test de velocidad de reacción es gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, SkillDrills ofrece esta evaluación de forma completamente gratuita, directa en el navegador, sin suscripciones ni descargas."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Realizar el Test de Tiempo de Reacción de Elección",
  "description": "Test de tiempo de reacción de elección online gratis: Mide tu velocidad de toma de decisiones, discriminación visual y flexibilidad cognitiva sin registro.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Observa la Regla Superior Activa",
      "text": "Fíjate en el cartel superior que indica el color del objetivo válido (ejemplo: TOCA ROJO o TOCA AZUL).",
      "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Discrimina los Objetivos Visuales",
      "text": "Cuando surjan los objetivos en el panel, identifica inmediatamente cuál coincide con la regla de color activa.",
      "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ejecuta el Clic de Decisión",
      "text": "Pulsa sobre el objetivo correcto con máxima celeridad antes de que finalice el contador de tiempo.",
      "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Reacciona a los Cambios de Regla",
      "text": "Cuando la regla se invierta, inhibe el hábito anterior y comienza a pulsar de inmediato sobre el nuevo color marcado.",
      "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('donders1969', 'hick1952', 'hyman1953', 'der2006', 'woods2015'),
  intro: {
    title: "Neurociencia del Tiempo de Reacción de Elección & Velocidad de Decisión",
    paragraphs: [
      "El tiempo de reacción de elección (CRT - Choice Reaction Time) constituye una de las métricas clásicas más representativas de la neuropsicología para evaluar el procesamiento central de la información bajo presión temporal.",
      "A diferencia de la reacción simple (SRT, ~200ms), donde solo se responde a una señal prefijada, la prueba de elección añade fases corticales de discriminación perceptual y selección de respuesta, situando el promedio humano en 280–350ms (Donders, 1868).",
      "La Ley de Hick-Hyman (Hick, 1952; Hyman, 1953) demuestra que la latencia de respuesta crece logarítmicamente con el número de opciones disponibles. Este ejercicio incorpora cambios imprevistos de reglas para desafiar la flexibilidad ejecutiva y el control inhibitorio frontal.",
    ],
  },
  benchmarks: {
    title: 'Estándares de Rendimiento Cognitivo & Baremos de Reacción de Elección (CRT)',
    headers: ['Nivel', 'Rango', 'Latencia de Respuesta', 'Tasa de Precisión', 'Percentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Élite / Jugador Pro', stat: '< 210 ms', level: 'Maestría', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Foco Avanzado', stat: '210 – 249 ms', level: 'Diamante', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Competente / Entrenado', stat: '250 – 289 ms', level: 'Platino', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Promedio Adulto Estándar', stat: '290 – 349 ms', level: 'Oro', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Iniciación / Línea Base', stat: '≥ 350 ms', level: 'Plata', accuracy: '< 78%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocolos de Optimización Neuroplástica',
    description: 'Pautas contrastadas experimentalmente para el desarrollo de reflejos y rapidez de decisión.',
    items: [
      { title: "Observa la Regla Superior Activa", description: "Fíjate en el cartel superior que indica el color del objetivo válido (ejemplo: TOCA ROJO o TOCA AZUL)." },
      { title: "Discrimina los Objetivos Visuales", description: "Cuando surjan los objetivos en el panel, identifica inmediatamente cuál coincide con la regla de color activa." },
      { title: "Ejecuta el Clic de Decisión", description: "Pulsa sobre el objetivo correcto con máxima celeridad antes de que finalice el contador de tiempo." },
      { title: "Reacciona a los Cambios de Regla", description: "Cuando la regla se invierta, inhibe el hábito anterior y comienza a pulsar de inmediato sobre el nuevo color marcado." },
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

export default function EnhancedPageEs() {
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
      <EliteNeuroSwitchClient copy={{ title: "Test de Tiempo de Reacción de Elección" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/es/drills/cognitive/processing-speed/reaction-time" />
      </div>
    </>
  );
}
