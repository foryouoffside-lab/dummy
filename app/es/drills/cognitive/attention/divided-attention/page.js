import DividedAttentionClient from '@/app/drills/cognitive/attention/divided-attention/DividedAttentionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Atención Dividida – Doble Tarea | SkillDrills",
  description: "Test de atención dividida y doble tarea online gratis: Rastrea objetivos visuales móviles y procesa secuencias numéricas simultáneas sin registro previo.",
  keywords: [
    "test de atencion dividida",
    "atencion dividida ejercicios",
    "test de doble tarea online",
    "entrenamiento de atencion dividida",
    "periodo refractario psicologico",
    "cuello de botella cognitivo test",
    "test de atencion compartida",
    "multitarea cognitiva test",
    "rastreo visual y numeros",
    "evaluacion neuropsicologica atencion dividida",
    "ejercicio de doble foco mental",
    "entrenamiento de doble tarea"
  ],
  openGraph: {
    title: "Test de Atención Dividida – Doble Tarea | SkillDrills",
    description: "Test de atención dividida y doble tarea online gratis: Rastrea objetivos visuales móviles y procesa secuencias numéricas simultáneas sin registro previo.",
    type: 'article',
    url: 'https://skilldrills.online/es/drills/cognitive/attention/divided-attention',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Atención Dividida – Doble Tarea | SkillDrills",
    description: "Test de atención dividida y doble tarea online gratis: Rastrea objetivos visuales móviles y procesa secuencias numéricas simultáneas sin registro previo.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/cognitive/attention/divided-attention',
    languages: getAlternateLanguages('/drills/cognitive/attention/divided-attention'),
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
      "name": "Atención Dividida y Doble Tarea",
      "item": "https://skilldrills.online/es/drills/cognitive/attention/divided-attention"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Atención Dividida – Doble Tarea",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test de atención dividida y doble tarea online gratis: Rastrea objetivos visuales móviles y procesa secuencias numéricas simultáneas sin registro previo.",
  "url": "https://skilldrills.online/es/drills/cognitive/attention/divided-attention",
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
  "name": "Test de Atención Dividida Online",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requiere un navegador moderno compatible con JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/es/drills/cognitive/attention/divided-attention",
  "inLanguage": "es-ES",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Juego de Foco Dividido y Multitarea Cognitiva",
  "url": "https://skilldrills.online/es/drills/cognitive/attention/divided-attention",
  "description": "Test de atención dividida y doble tarea online gratis: Rastrea objetivos visuales móviles y procesa secuencias numéricas simultáneas sin registro previo.",
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
      "name": "¿Qué es la atención dividida y qué evalúa esta prueba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La atención dividida es la facultad de procesar de manera simultánea dos o más fuentes de información ejecutando acciones paralelas con mínima interferencia."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es el Periodo Refractario Psicológico (PRP, Pashler 1994)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El PRP describe el retardo temporal que ocurre al procesar un segundo estímulo cuando se presenta instantes después del primero, debido a un cuello de botella central."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué explica la Teoría de Recursos Múltiples de Wickens (2002)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wickens descubrió que dividir la atención resulta mucho más eficiente cuando las tareas involucran códigos sensoriales y motores diferenciados."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se puede entrenar la capacidad de realizar dos tareas a la vez?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. La práctica deliberada automatiza las respuestas primarias, liberando recursos ejecutivos prefrontales para procesar la tarea secundaria con soltura."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué combina seguimiento espacial y clasificación numérica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Porque estimula simultáneamente la vía visual dorsal (coordinación visoespacial) y la vía ventral/prefrontal (decodificación abstracta de reglas numéricas)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo mejora este test el rendimiento en videojuegos y deportes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capacita al usuario para mantener el control mecánico de un objetivo mientras lee interfaces, mapas o comunicaciones sin ralentizar la respuesta motora."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es el coste de doble tarea (dual-task cost)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es la merma porcentual en velocidad o acierto observada al llevar a cabo dos actividades concurrentes en relación a su ejecución individual."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la pauta de práctica diaria óptima?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De 10 a 15 minutos diarios antes de actividades cognitivamente densas fortalecen la velocidad de alternancia atencional sin fatiga mental extrema."
      }
    },
    {
      "@type": "Question",
      "name": "¿Afecta la edad a la atención dividida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El coste de doble tarea tiende a incrementarse con los años, pero el acondicionamiento cognitivo habitual mantiene la elasticidad del procesamiento ejecutivo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Este test de atención dividida es gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, SkillDrills proporciona esta herramienta de forma 100% gratuita y ejecutable directamente en el navegador sin registros ni descargas."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Realizar el Test de Atención Dividida",
  "description": "Test de atención dividida y doble tarea online gratis: Rastrea objetivos visuales móviles y procesa secuencias numéricas simultáneas sin registro previo.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Sigue el Objetivo Visoespacial Móvil",
      "text": "Mantén la vista anclada en el objetivo en movimiento para intervenir con precisión en cuanto sea requerido.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/divided-attention#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Decodifica el Flujo de Números",
      "text": "Sin desviar por completo la mirada del centro, analiza si los dígitos mostrados cumplen la regla vigente.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/divided-attention#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ejecuta Respuestas Rápidas en Ambos Canales",
      "text": "Acciona los controles correspondientes con el ratón o el teclado para responder a ambas demandas sin pausas.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/divided-attention#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Equilibra el Rendimiento Global",
      "text": "Procura no descuidar ninguna de las dos pruebas: la puntuación premia la exactitud coordinada en paralelo.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/divided-attention#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('pashler1994', 'wickens2002', 'strayer2001', 'spelke1976', 'woods2015'),
  intro: {
    title: "Neurociencia de la Atención Dividida & Cuello de Botella Central de Pashler",
    paragraphs: [
      "La atención dividida representa la capacidad del cerebro para distribuir eficientemente recursos de procesamiento ejecutivo entre dos tareas que compiten de manera simultánea.",
      "Los estudios de Harold Pashler (1994) sobre el Periodo Refractario Psicológico (PRP) evidencian que, si bien la percepción inicial puede ocurrir en paralelo, la selección de respuestas motrices sufre un cuello de botella serial en el córtex prefrontal.",
      "Aplicando la Teoría de Recursos Múltiples de Christopher Wickens (2002), este ejercicio empareja una tarea de seguimiento espacial continuo con otra de clasificación numérica discreta, reduciendo interferencias directas y potenciando la alternancia rápida de foco.",
    ],
  },
  benchmarks: {
    title: 'Estándares de Rendimiento Cognitivo & Baremos de Doble Tarea (Dual-Task)',
    headers: ['Nivel', 'Categoría', 'Rango de Eficiencia', 'Precisión', 'Percentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Gran Maestro / Élite', stat: 'Top 1%', level: 'Maestría', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Foco Avanzado', stat: 'Top 5%', level: 'Diamante', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Operador Competente', stat: 'Top 15%', level: 'Platino', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Promedio Adulto Estándar', stat: 'Top 50%', level: 'Oro', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Línea Base Inicial', stat: 'Base', level: 'Plata', accuracy: '< 78%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocolos de Optimización en Doble Tarea',
    description: 'Estrategias con sustento experimental para mitigar el cuello de botella cognitivo y coordinar dos focos.',
    items: [
      { title: "Sigue el Objetivo Visoespacial Móvil", description: "Mantén la vista anclada en el objetivo en movimiento para intervenir con precisión en cuanto sea requerido." },
      { title: "Decodifica el Flujo de Números", description: "Sin desviar por completo la mirada del centro, analiza si los dígitos mostrados cumplen la regla vigente." },
      { title: "Ejecuta Respuestas Rápidas en Ambos Canales", description: "Acciona los controles correspondientes con el ratón o el teclado para responder a ambas demandas sin pausas." },
      { title: "Equilibra el Rendimiento Global", description: "Procura no descuidar ninguna de las dos pruebas: la puntuación premia la exactitud coordinada en paralelo." },
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
      <DividedAttentionClient copy={{ title: "Test de Atención Dividida – Doble Tarea" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/es/drills/cognitive/attention/divided-attention" />
      </div>
    </>
  );
}
