import WordRecallClient from '@/app/drills/memory/short-term-memory/word-recall/WordRecallClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Memoria Verbal – Recuerdo de Palabras | SkillDrills",
  description: "Test de memoria verbal online gratis: Memoriza listas de palabras, comprueba el efecto de posición serial y entrena tu memoria de trabajo en el navegador.",
  keywords: [
    "test de memoria verbal",
    "memoria verbal a corto plazo",
    "test de recuerdo libre",
    "efecto de posicion serial test",
    "evaluacion de memoria verbal",
    "juego de recordar palabras",
    "memoria de trabajo verbal",
    "agrupamiento semantico palabras",
    "test de retencion verbal",
    "ejercicios de memoria verbal",
    "test neuropsicologico verbal",
    "juego de recuerdo libre"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/memory/short-term-memory/word-recall",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/word-recall', 'es'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Test de Memoria Verbal – Recuerdo de Palabras | SkillDrills",
    description: "Test de memoria verbal online gratis: Memoriza listas de palabras, comprueba el efecto de posición serial y entrena tu memoria de trabajo en el navegador.",
    url: "https://skilldrills.online/es/drills/memory/short-term-memory/word-recall",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Memoria Verbal – Recuerdo de Palabras | SkillDrills",
    description: "Test de memoria verbal online gratis: Memoriza listas de palabras, comprueba el efecto de posición serial y entrena tu memoria de trabajo en el navegador.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedWordRecallPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Entrenamiento de Memoria", "item": "https://skilldrills.online/es/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Memoria a Corto Plazo", "item": "https://skilldrills.online/es/drills/memory/short-term-memory" },
      { "@type": "ListItem", "position": 4, "name": "Test de Memoria Verbal", "item": "https://skilldrills.online/es/drills/memory/short-term-memory/word-recall" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Test de Memoria Verbal (Recuerdo Libre de Palabras)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Evaluación neuropsicológica gratuita en el navegador que mide el recuerdo libre inmediato, la codificación semántica y la capacidad del búfer de memoria de trabajo verbal.",
    "genre": "Cognitive Assessment / Verbal Memory",
    "url": "https://skilldrills.online/es/drills/memory/short-term-memory/word-recall",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Test de Memoria Verbal (Recuerdo Libre de Palabras)",
    "url": "https://skilldrills.online/es/drills/memory/short-term-memory/word-recall",
    "description": "Evaluación neuropsicológica gratuita en el navegador que mide el recuerdo libre inmediato, la codificación semántica y la capacidad del búfer de memoria de trabajo verbal.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Test de Memoria Verbal (Recuerdo Libre de Palabras)",
    "description": "Evaluación neuropsicológica gratuita en el navegador que mide el recuerdo libre inmediato, la codificación semántica y la capacidad del búfer de memoria de trabajo verbal.",
    "url": "https://skilldrills.online/es/drills/memory/short-term-memory/word-recall",
    "genre": ["Memory Game", "Cognitive Training", "Brain Game"],
    "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "value": 1
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
    {
        "@type": "Question",
        "name": "¿Qué es el Test de Memoria Verbal (Word Recall)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Es una evaluación neuropsicológica que examina la memoria verbal a corto plazo, la amplitud de memoria de trabajo y el recuerdo libre inmediato. Los participantes estudian una lista de sustantivos y recuperan tantos como puedan sin restricciones de orden."
        }
    },
    {
        "@type": "Question",
        "name": "¿Qué diferencia el recuerdo libre del reconocimiento de memoria?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "El reconocimiento solo requiere identificar si un elemento presentado ya fue visto. El recuerdo libre exige la recuperación activa y espontánea de trazas de memoria sin pistas externas, siendo cognitivamente mucho más exigente y midiendo la verdadera capacidad de almacenamiento."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cuál es la puntuación media en un test de recuerdo de palabras?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "En pruebas clínicas estandarizadas como el RAVLT, los adultos sanos recuerdan inmediatamente entre 4 y 6 palabras en el primer ensayo de una lista no familiar. El uso de estrategias mnemotécnicas puede ampliar considerablemente esa cifra."
        }
    },
    {
        "@type": "Question",
        "name": "¿Qué es el Test de Aprendizaje Auditivo Verbal de Rey (RAVLT)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Es una evaluación clínica desarrollada por André Rey en 1958 para cuantificar la tasa de aprendizaje verbal, la amplitud de memoria inmediata, la interferencia proactiva y retroactiva, y la retención a largo plazo."
        }
    },
    {
        "@type": "Question",
        "name": "¿Qué es el efecto de posición serial en listas de palabras?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Descrito por Bennet B. Murdock Jr. en 1962, demuestra que la precisión del recuerdo forma una curva en U: las primeras palabras se benefician de la primacía (consolidación a largo plazo) y las últimas de la recencia (eco sensorial fresco), dejando las del medio más propensas al olvido."
        }
    },
    {
        "@type": "Question",
        "name": "¿Por qué se recuerdan las primeras y últimas palabras pero se olvidan las del medio?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Las palabras intermedias sufren simultáneamente interferencia proactiva (de las palabras precedentes) e interferencia retroactiva (de las palabras posteriores), colapsando el búfer de la memoria de trabajo."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cómo mejora la vinculación narrativa el recuerdo de palabras?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Según el marco de Niveles de Procesamiento (Craik & Lockhart, 1972), tejer palabras aisladas en una narrativa coherente sintetiza múltiples tokens en un único esquema mental asociativo, multiplicando el éxito de recuperación."
        }
    },
    {
        "@type": "Question",
        "name": "¿Importa el orden de las palabras durante el recuerdo libre?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. En el paradigma de recuerdo libre, las palabras pueden escribirse en cualquier orden arbitrario. Medir sin restricciones seriales evalúa el volumen total de almacenamiento e indización cerebral."
        }
    },
    {
        "@type": "Question",
        "name": "¿Practicar el recuerdo de palabras mejora la memoria en general?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mejorarás en esta tarea y las mnemotecnias aprendidas (agrupación, enlace narrativo) se transfieren a listas de estudio. Sin embargo, no constituye un tratamiento médico ni una herramienta diagnóstica."
        }
    },
    {
        "@type": "Question",
        "name": "¿Es gratuito este test online de memoria verbal?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí, el Test de Memoria Verbal de SkillDrills es 100 % gratuito, se ejecuta íntegramente en tu navegador sin descargas ni registros, y proporciona métricas de span y precisión al instante."
        }
    }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo entrenar el recuerdo libre y la amplitud de memoria verbal",
    "description": "Metodología paso a paso para codificar, enlazar narrativamente y recuperar listas progresivas de palabras.",
    "step": [
    {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/es/drills/memory/short-term-memory/word-recall#step-1",
        "name": "Lectura y codificación semántica",
        "text": "Observa las palabras en la fase de memorización, pronunciando cada una subvocalmente y formando una imagen mental definida."
    },
    {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/es/drills/memory/short-term-memory/word-recall#step-2",
        "name": "Construcción de enlace narrativo asociativo",
        "text": "Entreteje las palabras en una microhistoria mental continua (ej.: 'El caballero escaló la montaña con una linterna dorada') para agrupar los elementos."
    },
    {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/es/drills/memory/short-term-memory/word-recall#step-3",
        "name": "Descarga inmediata de palabras recientes (Recency)",
        "text": "Cuando se active el cuadro de texto, escribe al instante las últimas 2 o 3 palabras mientras permanezcan frescas en la memoria sensorial ecoica."
    },
    {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/es/drills/memory/short-term-memory/word-recall#step-4",
        "name": "Recuperación de la narrativa inicial y envío",
        "text": "Desenrolla tu historia mental desde el principio para recordar las palabras iniciales, sepáralas con espacios y pulsa Enter para enviar."
    }
]
  };

  const wordRecallGuide = {
    heading: "Guía del Test de Memoria Verbal y Recuerdo Libre Inmediato",
    intro: [
      "El Test de Memoria Verbal (Word Recall) es un ejercicio cognitivo de rigor diseñado para evaluar y fortalecer la memoria de trabajo verbal, la codificación asociativa semántica y la capacidad de recuerdo libre.",
      "La investigación comenzó con Hermann Ebbinghaus (1885) y su formulación de la curva del olvido. En 1958, André Rey introdujo el RAVLT para estandarizar la evaluación clínica de listas de palabras e interferencia.",
      "Bennet B. Murdock Jr. (1962) formuló matemáticamente el efecto de posición serial, y Craik & Lockhart (1972) demostraron que la codificación semántica profunda supera con creces el repaso pasivo superficial.",
      "Con cronometría digital de alta precisión (Woods et al., 2015), este ejercicio mide tu amplitud verbal mediante una escalera adaptativa. Todos los datos permanecen en tu navegador."
],
    benchmarks: {
      title: "Baremos Normativos de Recuerdo Libre Verbal y Amplitud de Palabras",
      headers: ["Nivel de Rendimiento", "Amplitud (Palabras)", "Puntuación de Recuerdo", "Perfil Kognitivo y de Recuperación"],
      rows: [
        [
                "Nivel 1 (Superior / Percentil 99)",
                "8 – 11+ Palabras",
                "1.100+ Puntos",
                "Dominio mnemotécnico; despliega cadenas narrativas profundas (Craik & Lockhart, 1972); cadencia de recuperación inferior a 800 ms"
        ],
        [
                "Nivel 2 (Alto Promedio / Percentil 85–95)",
                "6 – 7 Palabras",
                "850 – 1.099 Puntos",
                "Supera la media adulta estándar; agrupa palabras en pares o tríadas; recuerdo consistente bajo presión de tiempo"
        ],
        [
                "Nivel 3 (Promedio Adulto / Percentil 50)",
                "4 – 5 Palabras",
                "550 – 849 Puntos",
                "Media de la población en ensayos iniciales de recuerdo libre; muestra la clásica caída en U en palabras intermedias"
        ],
        [
                "Nivel 4 (Bajo Promedio / Cuello de Botella)",
                "3 Palabras",
                "350 – 549 Puntos",
                "Depende exclusivamente del eco fonológico sin codificación semántica; dificultad para superar el búfer de recencia"
        ],
        [
                "Nivel 5 (Amplitud Reducida)",
                "< 3 Palabras",
                "< 350 Puntos",
                "Rápido desvanecimiento de trazas mnémicas; alta interferencia proactiva; dificultad para evocar sin pistas"
        ]
],
      note: "La amplitud de palabras indica la longitud máxima sin errores lograda en la escalera adaptativa; los baremos reflejan ensayos iniciales en adultos (Rey, 1964; Murdock, 1962)."
    },
    techniques: {
      title: "Protocolos Basados en Evidencia para Expandir la Amplitud Verbal",
      items: [
        {
                "name": "Enlace Narrativo y Encadenamiento Asociativo",
                "desc": "Une palabras no relacionadas en una microhistoria mental insólita (Craik & Lockhart, 1972). Enlazar 'águila', 'castillo' y 'linterna' en 'Un águila con una linterna encendida se posó en el castillo' une 3 tokens en una escena episódica duradera.",
                "tips": "Cuanto más exagerada, colorida o físicamente inverosímil sea la imagen mental, más indeleble será el recuerdo."
        },
        {
                "name": "Método de Doble Codificación (Imagen Mental + Eco Auditivo)",
                "desc": "Aplica la teoría de Allan Paivio visualizando la apariencia física de cada sustantivo mientras pronuncias mentalmente sus sílabas. Generar trazas visuales y auditivas simultáneas aporta dos vías corticales durante la recuperación.",
                "tips": "Visualiza el color y la textura del objeto durante medio segundo mientras articulas su nombre."
        },
        {
                "name": "Agrupación Categorial y Semántica",
                "desc": "Reorganiza mentalmente la lista presentada en categorías conceptuales (naturaleza, arquitectura, metales, herramientas), sin importar el orden presentado (Tulving, 1962).",
                "tips": "Etiqueta las palabras por rasgos compartidos para facilitar el cebado asociativo."
        },
        {
                "name": "Estrategia de Vaciado de Recencia Primero",
                "desc": "Al abrirse la fase de escritura, escribe de inmediato las últimas 2 o 3 palabras (Murdock, 1962). Residen en la frágil memoria sensorial y decaen en 3 a 5 segundos; descargarlas primero libera memoria para reconstruir tu historia.",
                "tips": "Escribe primero las últimas palabras que viste y luego recupera con calma la narrativa inicial."
        }
]
    },
    steps: [
      "Fija la mirada en el centro del área de visualización y concéntrate durante la fase de presentación.",
      "A medida que surjan las palabras, conéctalas de inmediato en una narrativa mental o bloques temáticos.",
      "Forma imágenes mentales de alto contraste para establecer trazas de memoria de doble código.",
      "Cuando se active el campo de texto, escribe primero las palabras recientes y luego desenrolla tu historia.",
      "Permite que la dificultad adaptativa calibre y expanda progresivamente tus límites de memoria verbal."
],
    audience: "Estudiantes, profesionales y personas interesadas en optimizar su capacidad de retención de listas y memoria de trabajo verbal.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('craik1972', 'murdock1962', 'tulving1962', 'woods2015'),
    related: [
      { href: "/drills/memory/short-term-memory/digit-span", label: "Digit Span Memory Test" },
      { href: "/drills/memory/short-term-memory/color-sequence", label: "Color Memory Game" },
      { href: "/drills/memory/spatial-memory/grid-memorization", label: "Visual Memory Test" },
      { href: "/drills/memory/spatial-memory/object-location", label: "Object Location Memory Test" },
      { href: "/drills/memory/working-memory/n-back", label: "3-Back Working Memory Test" }
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
      <WordRecallClient copy={{
          "h1Keyword": "Test de Memoria Verbal",
          "h1Suffix": " – Juego de Recuerdo de Palabras Gratis",
          "subtitle": "El recuerdo libre de una lista de palabras nunca es uniforme: recuerdas mejor las primeras y las últimas palabras y peor las del medio, el efecto de posición serial que Murdock (1962) formuló. La profundidad del procesamiento semántico (Craik & Lockhart, 1972) importa más que el tiempo que pasas mirándolas.",
          "statScore": "Puntos",
          "statTime": "Tiempo",
          "statWords": "Palabras",
          "wordsUnit": "Palabras",
          "statBestScore": "Récord",
          "memorizePhase": "MEMORIZA LAS PALABRAS",
          "btnSkip": "Saltar",
          "inputPhase": "ESCRIBE LAS PALABRAS RECORDADAS",
          "inputPlaceholder": "Escribe las palabras recordadas separadas por espacios...",
          "btnSubmit": "ENVIAR RESPUESTAS",
          "inputHint": "Pulsa Enter para enviar",
          "feedbackPhase": "EVALUACIÓN DEL RECUERDO",
          "extraWordsLabel": "Palabras incorrectas o sobrantes escritas:",
          "startTitle": "Recuerdo Verbal Pro",
          "startSubtitle": "Memoria Verbal a Corto Plazo • Recuerdo Libre",
          "countdownSubtitle": "PREPÁRATE",
          "newBest": "NUEVO RÉCORD",
          "pointsLabel": "Puntos",
          "statAccuracy": "Precisión",
          "statPeakWords": "Palabras Máx.",
          "statPerfects": "Perfectos",
          "btnPlayAgain": "Jugar de Nuevo",
          "rulesTitle": "Instrucciones del Ejercicio y Puntuación",
          "aboutTitle": "Acerca del Test de Memoria Verbal (Word Recall)",
          "rulesItems": [
                    {
                              "num": "1",
                              "text": "Recuerdo de Lista",
                              "highlight": "+150 PTS",
                              "result": "Memoriza las palabras y escríbelas en la fase de recuerdo"
                    },
                    {
                              "num": "2",
                              "text": "Bonificación de Nivel",
                              "highlight": "Hasta +135%",
                              "result": "Listas más largas otorgan significativamente más puntos"
                    },
                    {
                              "num": "3",
                              "text": "Fallo / Tiempo Agotado",
                              "highlight": "-1 Palabra",
                              "result": "Sin pérdida de puntos ni tiempo; la longitud se adapta bajando 1 nivel"
                    },
                    {
                              "num": "4",
                              "text": "Amplitud Adaptativa",
                              "highlight": "Sube y Baja",
                              "result": "Converge con precisión en tu verdadero límite de memoria verbal"
                    }
          ],
          "wordBank": [
                    "manzana",
                    "puente",
                    "castillo",
                    "diamante",
                    "águila",
                    "bosque",
                    "jardín",
                    "martillo",
                    "isla",
                    "selva",
                    "caballero",
                    "linterna",
                    "montaña",
                    "aguja",
                    "océano",
                    "palacio",
                    "reina",
                    "cohete",
                    "atardecer",
                    "templo",
                    "paraguas",
                    "valle",
                    "ventana",
                    "cebra",
                    "vela",
                    "dragón",
                    "pluma",
                    "plata",
                    "oro",
                    "mármol",
                    "terciopelo",
                    "cristal",
                    "bronce",
                    "cobre",
                    "sombra",
                    "espíritu",
                    "sabiduría",
                    "honor",
                    "gloria",
                    "sueño",
                    "tormenta",
                    "río",
                    "nube",
                    "llama",
                    "piedra",
                    "trueno",
                    "arcoíris",
                    "fénix",
                    "reloj",
                    "espejo"
          ]
}} />
      <DrillGuide guide={wordRecallGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/word-recall"
          locale="es"
        />
      </div>
    </>
  );
}
