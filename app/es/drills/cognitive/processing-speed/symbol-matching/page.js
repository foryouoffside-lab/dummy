import SymbolMatchingClient from '@/app/drills/cognitive/processing-speed/symbol-matching/SymbolMatchingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test SDMT – Símbolos y Dígitos Online | SkillDrills",
  description: "Test SDMT y emparejamiento de símbolos y dígitos online gratis: Evalúa tu velocidad de procesamiento cognitivo, rastreo visual y memoria de trabajo asociativa.",
  keywords: [
    "test de simbolos y digitos",
    "test sdmt online",
    "test de velocidad de procesamiento",
    "sustitucion de simbolos y digitos",
    "test dsst online",
    "rastreo visual cognitivo",
    "memoria asociativa test",
    "agilidad mental test online",
    "evaluacion neuropsicologica gratis",
    "test de atencion y velocidad",
    "ejercicio de emparejamiento de simbolos",
    "test cognitivo de simbolos"
  ],
  openGraph: {
    title: "Test SDMT – Símbolos y Dígitos Online | SkillDrills",
    description: "Test SDMT y emparejamiento de símbolos y dígitos online gratis: Evalúa tu velocidad de procesamiento cognitivo, rastreo visual y memoria de trabajo asociativa.",
    type: 'article',
    url: 'https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test SDMT – Símbolos y Dígitos Online | SkillDrills",
    description: "Test SDMT y emparejamiento de símbolos y dígitos online gratis: Evalúa tu velocidad de procesamiento cognitivo, rastreo visual y memoria de trabajo asociativa.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/symbol-matching'),
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
      "name": "Test SDMT de Símbolos",
      "item": "https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test SDMT – Símbolos y Dígitos",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test SDMT y emparejamiento de símbolos y dígitos online gratis: Evalúa tu velocidad de procesamiento cognitivo, rastreo visual y memoria de trabajo asociativa.",
  "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching",
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
  "name": "Test SDMT Online",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requiere un navegador moderno con soporte JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching",
  "inLanguage": "es-ES",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Juego de Asociación de Símbolos y Dígitos",
  "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching",
  "description": "Test SDMT y emparejamiento de símbolos y dígitos online gratis: Evalúa tu velocidad de procesamiento cognitivo, rastreo visual y memoria de trabajo asociativa.",
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
      "name": "¿Qué es el test SDMT (Symbol Digit Modalities Test)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El SDMT es una prueba neuropsicológica de referencia creada por Aaron Smith (1973) para medir con precisión la velocidad de procesamiento mental y el rastreo visual."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre el test SDMT y el DSST?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En el DSST de Wechsler se trazan símbolos con lápiz. En el SDMT se seleccionan dígitos a partir de símbolos geométricos, aislando la agilidad cognitiva de las restricciones motoras de escritura."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué procesos cognitivos examina este ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mide velocidad de procesamiento perceptual, eficiencia de escaneo visual, memoria asociativa a corto plazo y atención ejecutiva sostenida."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es un test tan respetado en la neuropsicología?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Por su sensibilidad única para detectar variaciones sutiles en la velocidad de transmisión axonal y la fatiga del sistema nervioso central."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo influye la memoria de trabajo en la puntuación?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Al memorizar los emparejamientos símbolo-dígito, el sujeto prescinde de comprobar la leyenda superior en cada ensayo, acelerando sustancialmente las respuestas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué produce sensación de fatiga mental concentrada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La demanda continua de emparejamiento exige un reclutamiento sincrónico constante de los lóbulos parietal, occipital y prefrontal sin pausas intermedias."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo beneficia este entrenamiento a los jugadores competitivos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Optimiza la lectura ultrarrápida del HUD y minimiza los tiempos de reacción al identificar iconos de amenazas y estados en pantalla."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo al día conviene practicar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Una sesión diaria de 5 a 10 minutos es ideal para consolidar la rapidez de discriminación sin sobrecargar la memoria asociativa."
      }
    },
    {
      "@type": "Question",
      "name": "¿Afecta la edad a las puntuaciones del SDMT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, la velocidad suele disminuir de forma gradual después de los 30 años (Der & Deary, 2006), aunque la práctica habitual mitiga considerablemente esta pérdida."
      }
    },
    {
      "@type": "Question",
      "name": "¿Este test de símbolos y dígitos es totalmente gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, SkillDrills ofrece esta herramienta online de manera 100% gratuita, sin descargas ni registros necesarios."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Realizar el Test SDMT de Símbolos y Dígitos",
  "description": "Test SDMT y emparejamiento de símbolos y dígitos online gratis: Evalúa tu velocidad de procesamiento cognitivo, rastreo visual y memoria de trabajo asociativa.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Revisa la Clave de Emparejamiento Superior",
      "text": "Examina la tabla de referencia que asigna a cada símbolo geométrico un número del 1 al 9.",
      "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Identifica el Símbolo Presentado",
      "text": "Observa el símbolo central y localiza mentalmente su dígito asociado en la tabla de referencia.",
      "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Introduce el Dígito Correspondiente",
      "text": "Pulsa la tecla o el botón con el número correcto con máxima celeridad y sin errores.",
      "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Memoriza los Pares para Máxima Velocidad",
      "text": "Internaliza las parejas de memoria para responder de forma automática sin mirar la leyenda.",
      "url": "https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('smith1973', 'der2006', 'woods2015'),
  intro: {
    title: "Neurociencia del Test SDMT & Velocidad de Procesamiento Cognitivo",
    paragraphs: [
      "El Test de Modalidades de Dígitos y Símbolos (SDMT - Symbol Digit Modalities Test) es una prueba neurocognitiva estandarizada fundamental para determinar la velocidad con la que el cerebro procesa información visual (Smith, 1973).",
      "A diferencia de la prueba clásica DSST de lápiz y papel, el entorno digital aísla la velocidad asociativa pura eliminando los límites biomecánicos del trazado manual.",
      "La ejecución fluida exige la coordinación armónica del reconocimiento de patrones en la corteza occipital, la memoria asociativa de trabajo en el córtex prefrontal y la focalización selectiva del lóbulo parietal (Der & Deary, 2006; Woods et al., 2015).",
    ],
  },
  benchmarks: {
    title: 'Estándares de Rendimiento Cognitivo & Baremos del Test SDMT',
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
    title: 'Protocolos de Entrenamiento Neuroplástico',
    description: 'Estrategias basadas en la evidencia para optimizar el escaneo visual y la asociación de símbolos.',
    items: [
      { title: "Revisa la Clave de Emparejamiento Superior", description: "Examina la tabla de referencia que asigna a cada símbolo geométrico un número del 1 al 9." },
      { title: "Identifica el Símbolo Presentado", description: "Observa el símbolo central y localiza mentalmente su dígito asociado en la tabla de referencia." },
      { title: "Introduce el Dígito Correspondiente", description: "Pulsa la tecla o el botón con el número correcto con máxima celeridad y sin errores." },
      { title: "Memorize los Pares para Máxima Velocidad", description: "Internaliza las parejas de memoria para responder de forma automática sin mirar la leyenda." },
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
      <SymbolMatchingClient copy={{ title: "Test SDMT de Símbolos y Dígitos" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/es/drills/cognitive/processing-speed/symbol-matching" />
      </div>
    </>
  );
}
