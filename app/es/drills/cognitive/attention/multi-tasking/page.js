import DualTargetFlowClient from '@/app/drills/cognitive/attention/multi-tasking/DualTargetFlowClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Multitarea – Foco en Flujo Doble | SkillDrills",
  description: "Test de multitarea y flexibilidad cognitiva online: Rastrea dos flujos visuales opuestos en tiempo real y evalua el coste de alternancia mental sin registro.",
  keywords: [
    "test de multitarea",
    "test de flexibilidad cognitiva",
    "test de alternancia de tareas",
    "test de atencion dividida online",
    "juego de multitarea mental",
    "entrenamiento de procesamiento paralelo",
    "evaluacion de sobrecarga cognitiva",
    "coste de cambio cognitivo test",
    "test de capacidad multitarea online",
    "ejercicios de agilidad mental gratis",
    "coordinacion interhemisferica test",
    "velocidad de alternancia atencional"
  ],
  openGraph: {
    title: "Test de Multitarea – Foco en Flujo Doble | SkillDrills",
    description: "Test de multitarea y flexibilidad cognitiva online: Rastrea dos flujos visuales opuestos en tiempo real y evalua el coste de alternancia mental sin registro.",
    type: 'article',
    url: 'https://skilldrills.online/es/drills/cognitive/attention/multi-tasking',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Multitarea – Foco en Flujo Doble | SkillDrills",
    description: "Test de multitarea y flexibilidad cognitiva online: Rastrea dos flujos visuales opuestos en tiempo real y evalua el coste de alternancia mental sin registro.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/cognitive/attention/multi-tasking',
    languages: getAlternateLanguages('/drills/cognitive/attention/multi-tasking'),
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
      "name": "Entrenamientos",
      "item": "https://skilldrills.online/es/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Entrenamiento Cognitivo",
      "item": "https://skilldrills.online/es/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Test de Multitarea",
      "item": "https://skilldrills.online/es/drills/cognitive/attention/multi-tasking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Multitarea — Entrenamiento de Atencion en Flujo Doble",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test de multitarea y flexibilidad cognitiva online: Rastrea dos flujos visuales opuestos en tiempo real y evalua el coste de alternancia mental sin registro.",
  "url": "https://skilldrills.online/es/drills/cognitive/attention/multi-tasking",
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
  "name": "Test de Multitarea",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requiere un navegador moderno compatible con JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/es/drills/cognitive/attention/multi-tasking",
  "inLanguage": "es-ES",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Juego de Multitarea – Flujo Visual Dual",
  "url": "https://skilldrills.online/es/drills/cognitive/attention/multi-tasking",
  "description": "Test de multitarea y flexibilidad cognitiva online: Rastrea dos flujos visuales opuestos en tiempo real y evalua el coste de alternancia mental sin registro.",
  "genre": [
    "Accion",
    "Juego Mental",
    "Entrenamiento Cognitivo"
  ],
  "gamePlatform": [
    "Navegador Web",
    "Escritorio",
    "Dispositivos Moviles"
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
      "name": "Que es el Test de Multitarea (Dual-Target Flow)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es una prueba neurocognitiva disenada para desafiar al cerebro a rastrear dos flujos continuos de figuras geometricas en sentidos opuestos, evaluando la atencion bilateral y la agilidad de discriminacion."
      }
    },
    {
      "@type": "Question",
      "name": "Que es el coste de cambio (switch cost) segun Rogers y Monsell (1995)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es el decremento observable en velocidad de respuesta y precision que ocurre cuando el sistema ejecutivo debe reconfigurar sus redes cognitivas al alternar entre criterios de tarea diferentes."
      }
    },
    {
      "@type": "Question",
      "name": "Puede el cerebro humano procesar tareas complejas en paralelo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La evidencia neurocientifica senala que ante tareas que exigen atencion focalizada deliberada, el cerebro realiza un procesamiento serial con division temporal rapida (Pashler, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "Que hallaron Ophir, Nass y Wagner (2009) en usuarios de multitarea intensiva?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comprobaron que quienes practican multitarea continua en medios digitales experimentan mayor propension a la distraccion y menor capacidad para filtrar estimulos irrelevantes."
      }
    },
    {
      "@type": "Question",
      "name": "Como se activa el rastreo bi-hemisferico en este ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Al presentar flujos independientes en ambos hemicampos visuales, se estimulan simultaneamente los circuitos parieto-occipitales de ambos hemisferios, exigiendo comunicacion por el cuerpo calloso."
      }
    },
    {
      "@type": "Question",
      "name": "Que estrategias optimizan el rendimiento en flujo doble?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Centra tu mirada en el espacio intermedio entre ambos canales y utiliza la vision periferica para detectar las figuras correctas antes de activar la respuesta motora."
      }
    },
    {
      "@type": "Question",
      "name": "Como incrementa la dificultad la progresion de niveles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aumenta la velocidad de avance, los patrones diana cambian con mayor dinamismo y la ventana temporal util se acorta, poniendo a prueba el control ejecutivo superior."
      }
    },
    {
      "@type": "Question",
      "name": "Afecta la latencia del hardware la evaluacion de multitarea?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si, monitores de 144Hz o superiores y dispositivos de entrada de baja latencia minimizan el desenfoque de movimiento (Woods et al., 2015), facilitando la discriminacion precisa."
      }
    },
    {
      "@type": "Question",
      "name": "Cuanto tiempo se recomienda entrenar la atencion multitarea?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sesiones diarias de 10 a 15 minutos permiten activar adaptaciones neuroplasticas sin sobrecargar el sistema de control ejecutivo."
      }
    },
    {
      "@type": "Question",
      "name": "Es gratuito y accesible este test de multitarea?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si, SkillDrills ofrece esta evaluacion de forma 100% gratuita directamente en el navegador, sin descargas ni registros previos."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar el Test de Multitarea",
  "description": "Metodologia para rastrear flujos visuales paralelos y entrenar la agilidad de conmutacion atencional.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Centra la Mirada en la Zona Intermedia",
      "text": "Enfoca la vista en el punto central entre ambos flujos para supervisar de manera equilibrada los dos canales.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/multi-tasking#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Reconoce los Simbolos Objetivo",
      "text": "Memoriza las plantillas de figuras diana activas que aparecen senaladas en el panel informativo superior.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/multi-tasking#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Presiona las Figuras Coincidentes",
      "text": "Haz clic o toca con rapidez sobre los simbolos que coincidan con las figuras activas antes de que salgan de la pantalla.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/multi-tasking#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Conserva el Ritmo con Aceleracion",
      "text": "Adapta tus reflejos al incremento gradual de velocidad para extender tu racha de aciertos y maximizar la puntuacion.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/multi-tasking#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rogers1995', 'monsell2003', 'pashler1994', 'wickens2002', 'ophir2009', 'woods2015'),
  intro: {
    title: "Test de Multitarea y Flexibilidad Cognitiva",
    paragraphs: [
      "El test de multitarea en flujo doble pone a prueba la capacidad del sistema ejecutivo superior para procesar canales sensoriales concurrentes bajo exigencia temporal estricta.",
      "El coste de conmutacion (switch cost) refleja la demora y el incremento en errores que surgen al cambiar entre objetivos cognitivos divergentes en lugar de sostener una sola regla operativa (Rogers & Monsell, 1995).",
      "Estudios en ergonomia cognitiva y neurociencia avalan que la coordinacion atencional bilateral se fortalece mediante el entrenamiento sistematico de la alternancia deliberada (Pashler, 1994; Wickens, 2002).",
    ],
  },
  benchmarks: {
    title: 'Estandares y Baremos de Rendimiento en Multitarea',
    headers: ['Nivel', 'Rango', 'Calificacion', 'Precision', 'Percentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Gran Maestro / Elite', stat: 'Top 1%', level: 'Maestria', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Foco Avanzado', stat: 'Top 5%', level: 'Diamante', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Operador Competente', stat: 'Top 15%', level: 'Platino', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Promedio Adulto', stat: 'Top 50%', level: 'Oro', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Base Inicial', stat: 'Base', level: 'Plata', accuracy: '<78%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocolos de Estimulacion Neurocognitiva',
    description: 'Pautas contrastadas cientificamente para potenciar la flexibilidad y la velocidad de conmutacion mental.',
    items: [
      { title: "Centra la Mirada en la Zona Intermedia", description: "Enfoca la vista en el punto central entre ambos flujos para supervisar de manera equilibrada los dos canales." },
      { title: "Reconoce los Simbolos Objetivo", description: "Memoriza las plantillas de figuras diana activas que aparecen senaladas en el panel informativo superior." },
      { title: "Presiona las Figuras Coincidentes", description: "Haz clic o toca con rapidez sobre los simbolos que coincidan con las figuras activas antes de que salgan de la pantalla." },
      { title: "Conserva el Ritmo con Aceleracion", description: "Adapta tus reflejos al incremento gradual de velocidad para extender tu racha de aciertos y maximizar la puntuacion." },
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

export default function EnhancedPage() {
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
      <DualTargetFlowClient copy={{ title: "Test de Multitarea – Foco en Flujo Doble" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/es/drills/cognitive/attention/multi-tasking" />
      </div>
    </>
  );
}
