import ConcentrationStaminaClient from '@/app/drills/cognitive/attention/concentration-stamina/ConcentrationStaminaClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Concentración – Atención Sostenida | SkillDrills",
  description: "Test de concentración y atención sostenida online gratis: Mide decaimiento de vigilancia, foco visual continuo y control inhibitorio sin registro.",
  keywords: [
    "test de concentracion",
    "test de atencion sostenida",
    "test cpt online",
    "test de foco y atencion",
    "test de fatiga mental",
    "test de vigilancia cognitiva",
    "resistencia a la distraccion test",
    "entrenamiento de concentracion gratis",
    "test de deficit de atencion online",
    "control inhibitorio y atencion",
    "evaluacion neuropsicologica atencion",
    "ejercicio de concentracion prolongada"
  ],
  openGraph: {
    title: "Test de Concentración – Atención Sostenida | SkillDrills",
    description: "Test de concentración y atención sostenida online gratis: Mide decaimiento de vigilancia, foco visual continuo y control inhibitorio sin registro.",
    type: 'article',
    url: 'https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Concentración – Atención Sostenida | SkillDrills",
    description: "Test de concentración y atención sostenida online gratis: Mide decaimiento de vigilancia, foco visual continuo y control inhibitorio sin registro.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina',
    languages: getAlternateLanguages('/drills/cognitive/attention/concentration-stamina'),
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
      "name": "Atención Sostenida y Concentración",
      "item": "https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Concentración y Atención Sostenida",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test de concentración y atención sostenida online gratis: Mide decaimiento de vigilancia, foco visual continuo y control inhibitorio sin registro.",
  "url": "https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina",
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
  "name": "Test de Concentración Online",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requiere un navegador moderno compatible con JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina",
  "inLanguage": "es-ES",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Juego de Resistencia de Foco y Concentración",
  "url": "https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina",
  "description": "Test de concentración y atención sostenida online gratis: Mide decaimiento de vigilancia, foco visual continuo y control inhibitorio sin registro.",
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
      "name": "¿Qué es el Test de Atención Sostenida y Resistencia de Concentración?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es una prueba de rendimiento continuo (CPT) que valora la capacidad del cerebro para mantener un estado de alerta óptimo, detectar señales infrecuentes y suprimir distracciones."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué significa el decaimiento de vigilancia (Mackworth, 1948)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es la disminución sistemática en la tasa de detección de estímulos tras periodos prolongados de atención continua, ocasionada por el agotamiento de recursos atencionales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué cambian las reglas de clasificación periódicamente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La alternancia entre reglas (ej: vocales vs números primos) exige a la corteza prefrontal reconfigurar la memoria de trabajo y evitar automatismos mecánicos (Monsell, 2003)."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué se diferencia de una prueba de reacción motora simple?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evalúa la resistencia temporal del foco y la tasa de errores de comisión (pulsar ante estímulos incorrectos) y omisión (no pulsar ante objetivos válidos)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo saber si mi concentración está decayendo durante la prueba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un incremento abrupto en los tiempos de respuesta o fallos frecuentes por precipitación reflejan cansancio y pérdida de vigilancia ejecutiva."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es beneficioso para personas con dificultades atencionales o TDAH?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, las evaluaciones de tipo CPT entrenan activamente el control inhibitorio y la capacidad de perseverar en tareas monótonas de alta exigencia."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la frecuencia ideal de práctica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Una sesión diaria de 10 a 15 minutos previa a jornadas de estudio o trabajo exigente fortalece la resistencia mental y el foco sostenido."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo afecta la falta de sueño a los resultados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La fatiga por privación de sueño acelera exponencialmente el decaimiento de vigilancia y reduce a la mitad la estabilidad de respuesta."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué significan los niveles de rendimiento obtenidos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comparan tu índice de estabilidad atencional y precisión con baremos normalizados de baterías neuropsicológicas estandarizadas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Este test de concentración es totalmente gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, SkillDrills ofrece esta herramienta online de forma 100% gratuita y sin necesidad de descargas ni suscripciones."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Realizar el Test de Concentración Continua",
  "description": "Test de concentración y atención sostenida online gratis: Mide decaimiento de vigilancia, foco visual continuo y control inhibitorio sin registro.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Consulta la Regla Activa Inicial",
      "text": "Verifica en el banner superior cuál es el criterio que define un objetivo válido (ejemplo: Vocales o Números Primos).",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Mantén la Mirada Fija y Atenta",
      "text": "Observa el flujo sucesivo de caracteres sin apartar la atención del centro del panel interactivo.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Pulsa Únicamente ante Objetivos Válidos",
      "text": "Acciona la tecla o pulsa la pantalla con rapidez y precisión solo cuando el carácter cumpla la condición activa.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Adáptate a la Inversión de Reglas",
      "text": "Cada 10 segundos, reconfigura tu criterio mental sin titubear cuando el cartel superior indique la nueva condición.",
      "url": "https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('mackworth1948', 'parasuraman1979', 'robertson1997', 'monsell2003', 'broadbent1958', 'woods2015'),
  intro: {
    title: "Neurociencia de la Atención Sostenida & Decaimiento de Vigilancia de Mackworth",
    paragraphs: [
      "La atención sostenida o vigilancia continua es la capacidad del sistema nervioso central para mantener el procesamiento sensorial focalizado durante tareas repetitivas o prolongadas.",
      "Las investigaciones clásicas de Norman Mackworth (1948) con operadores de radar revelaron que la detección de señales decae de forma crítica a partir de los 20-30 minutos por agotamiento de recursos noradrenérgicos en el córtex prefrontal (Parasuraman, 1979; Robertson et al., 1997).",
      "Este ejercicio desafía adicionalmente la resistencia ejecutiva mediante el cambio dinámico de consignas cada 10 segundos, obligando al cerebro a reiniciar los conjuntos de tareas activas (Monsell, 2003).",
    ],
  },
  benchmarks: {
    title: 'Estándares de Rendimiento Cognitivo & Baremos de Atención Sostenida (CPT)',
    headers: ['Nivel', 'Categoría', 'Rango de Rendimiento', 'Precisión', 'Percentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Gran Maestro / Élite', stat: 'Top 1%', level: 'Maestría', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Foco Avanzado', stat: 'Top 5%', level: 'Diamante', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Operador Competente', stat: 'Top 15%', level: 'Platino', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Promedio Adulto Estándar', stat: 'Top 50%', level: 'Oro', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Línea Base Inicial', stat: 'Base', level: 'Plata', accuracy: '< 78%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocolos de Resistencia Atencional y Foco',
    description: 'Estrategias basadas en la neurociencia para optimizar la perseverancia mental y evitar distracciones.',
    items: [
      { title: "Consulta la Regla Activa Inicial", description: "Verifica en el banner superior cuál es el criterio que define un objetivo válido (ejemplo: Vocales o Números Primos)." },
      { title: "Mantén la Mirada Fija y Atenta", description: "Observa el flujo sucesivo de caracteres sin apartar la atención del centro del panel interactivo." },
      { title: "Pulsa Únicamente ante Objetivos Válidos", description: "Acciona la tecla o pulsa la pantalla con rapidez y precisión solo cuando el carácter cumpla la condición activa." },
      { title: "Adáptate a la Inversión de Reglas", description: "Cada 10 segundos, reconfigura tu criterio mental sin titubear cuando el cartel superior indique la nueva condición." },
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
      <ConcentrationStaminaClient copy={{ title: "Test de Concentración y Atención Sostenida" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/es/drills/cognitive/attention/concentration-stamina" />
      </div>
    </>
  );
}
