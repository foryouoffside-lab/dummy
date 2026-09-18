import PathTracingClient from '@/app/drills/memory/spatial-memory/path-tracing/PathTracingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Memoria Secuencial – Bloques de Corsi | SkillDrills",
  description: "Test de memoria secuencial gratis online: Memoriza secuencias de rutas en cuadrículas y reprodúcelas en orden exacto sin registro en el navegador.",
  keywords: ['test de memoria secuencial', 'memoria secuencial visual', 'test de bloques de corsi', 'amplitud de corsi test online', 'path tracing test memoria', 'memoria de rutas secuenciales', 'memoria visoespacial de trabajo', 'ejercicios de memoria secuencial', 'test psicometrico de corsi', 'reproduccion de trayectorias test', 'entrenamiento visoespacial online', 'evaluacion memoria espacial secuencial'],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/memory/spatial-memory/path-tracing",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/path-tracing', 'es'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Test de Memoria Secuencial (Bloques de Corsi) - Juego Gratis | SkillDrills",
    description: "Test de memoria secuencial gratis online (test de bloques de corsi / Path Tracing). Memoriza secuencias de rutas animadas en cuadrículas de 3x3 a 7x7 y reprodúcelas en orden exacto. Sin registro.",
    url: "https://skilldrills.online/es/drills/memory/spatial-memory/path-tracing",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Memoria Secuencial (Bloques de Corsi) - Juego Gratis | SkillDrills",
    description: "Test de memoria secuencial gratis online (test de bloques de corsi / Path Tracing). Memoriza secuencias de rutas animadas en cuadrículas de 3x3 a 7x7 y reprodúcelas en orden exacto. Sin registro.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedPathTracingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Entrenamiento de Memoria", "item": "https://skilldrills.online/es/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Memoria Espacial", "item": "https://skilldrills.online/es/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "Test de Memoria Secuencial", "item": "https://skilldrills.online/es/drills/memory/spatial-memory/path-tracing" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Test de Memoria Secuencial (Bloques de Corsi)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Evaluación neuropsicológica interactiva que mide la memoria de trabajo visoespacial secuencial, la retención de rutas y la amplitud de bloques de Corsi en cuadrículas expansivas.",
    "genre": "Cognitive Assessment / Spatial Memory",
    "url": "https://skilldrills.online/es/drills/memory/spatial-memory/path-tracing",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Test de Memoria Secuencial (Bloques de Corsi)",
    "url": "https://skilldrills.online/es/drills/memory/spatial-memory/path-tracing",
    "description": "Evaluación neuropsicológica interactiva que mide la memoria de trabajo visoespacial secuencial, la retención de rutas y la amplitud de bloques de Corsi en cuadrículas expansivas.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Test de Memoria Secuencial (Bloques de Corsi)",
    "description": "Evaluación neuropsicológica interactiva que mide la memoria de trabajo visoespacial secuencial, la retención de rutas y la amplitud de bloques de Corsi en cuadrículas expansivas.",
    "url": "https://skilldrills.online/es/drills/memory/spatial-memory/path-tracing",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Sequence Memory"],
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
            "name": "¿Qué es el test de memoria secuencial de rutas (Path Tracing)?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Es una prueba neurocognitiva que evalúa la memoria de trabajo visoespacial secuencial. El usuario observa una secuencia de casillas que se iluminan y debe pulsar exactamente las mismas casillas en idéntico orden cronológico."
            }
      },
      {
            "@type": "Question",
            "name": "¿Qué es el test de bloques de Corsi?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Creado por Pietro Corsi en 1972, es el estándar neuropsicológico clásico para medir la amplitud de memoria de trabajo espacial no verbal. Evalúa cuántos bloques consecutivos puede reproducir una persona en orden directo o inverso."
            }
      },
      {
            "@type": "Question",
            "name": "¿Qué es el 'Escriba Interno' (Inner Scribe) en neurociencia?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Concepto planteado por Robert H. Logie (1995) que define el subsistema motor activo de la memoria visoespacial, encargado de ensayar y mantener trayectorias dinámicas y secuencias espaciales en el tiempo."
            }
      },
      {
            "@type": "Question",
            "name": "¿Cuál es la puntuación o amplitud normal en adultos?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "En estudios normativos (Kessels et al., 2000), los adultos sanos alcanzan una amplitud espacial media de 5,4 ± 0,9 pasos. Puntuaciones a partir de 8 pasos reflejan una capacidad de agrupación excepcional."
            }
      },
      {
            "@type": "Question",
            "name": "¿Cómo funciona el agrupamiento por vectores direccionales?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consiste en codificar los pasos como flechas continuas ('derecha, arriba, diagonal') en lugar de recordar coordenadas individuales aisladas, superando el cuello de botella de 4 elementos de la memoria inmediata."
            }
      },
      {
            "@type": "Question",
            "name": "¿En qué se diferencia de un test de cuadrícula estática?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El test estático presenta todas las casillas a la vez (foto fija en el caché visual). El test secuencial exige codificar el orden temporal exacto de cada paso, exigiendo un ensayo dinámico continuo."
            }
      },
      {
            "@type": "Question",
            "name": "¿Por qué cuesta tanto retener más de 5 pasos seguidos?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Porque según el modelo de Nelson Cowan (2001), el límite biológico del foco atencional sin agrupar es de 4 elementos. A partir de ahí, la información decae si no se organiza en patrones geométricos."
            }
      },
      {
            "@type": "Question",
            "name": "¿Para qué sirve esta memoria en la vida cotidiana y los videojuegos?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Es esencial para recordar instrucciones de navegación paso a paso, coreografías, rutinas deportivas y, en gaming (MOBAs, FPS), para dominar rutas de rotación en mapas y cadenas de habilidades."
            }
      },
      {
            "@type": "Question",
            "name": "¿Se pierden puntos o tiempo por fallar una casilla?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Errar no resta puntos ni temporizador. La ronda se repite en el mismo nivel para permitirte consolidar tu técnica de agrupación."
            }
      },
      {
            "@type": "Question",
            "name": "¿Se puede mejorar la memoria secuencial con la práctica?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí. La práctica deliberada automatiza la formación de vectores direccionales, fortalece el escriba interno y optimiza la cadencia motora de respuesta."
            }
      }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo entrenar la memoria secuencial y la amplitud de Corsi",
    "description": "Protocolo estructurado de 4 fases para agrupar vectores direccionales y retener secuencias de movimiento en la memoria visoespacial.",
    "step": [
      {
            "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/path-tracing#step-1",
            
            "name": "Fijar el punto inicial y observar la trayectoria",
            "text": "Ancla la mirada en la casilla inicial y abarca el tablero global con la visión periférica para percibir el flujo vectorial sin saltos oculares bruscos."
      },
      {
            "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/path-tracing#step-2",
            
            "name": "Agrupar pasos en macrovectores direccionales",
            "text": "Comprime los puntos individuales en unidades de dirección (p. ej., 'dos a la derecha, uno arriba' o 'en L')."
      },
      {
            "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/path-tracing#step-3",
            
            "name": "Repasar la ruta mediante el escriba interno",
            "text": "Durante la breve pausa previa al clic, traza la línea continua mentalmente con la corteza motora para evitar la pérdida del rastro."
      },
      {
            "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/path-tracing#step-4",
            
            "name": "Reproducir la secuencia con cadencia rítmica",
            "text": "Pulsa las casillas con un ritmo constante sin titubeos entre clics, ejecutando el bloque en un único impulso motor fluido."
      }
]
  };

  const pathTracingGuide = {
    intro: [
      "El Test de Memoria Secuencial (Path Tracing Memory Test) es una herramienta interactiva diseñada para evaluar la memoria de trabajo visoespacial secuencial, la retención de rutas dinámicas y la reconstrucción de trayectorias en cuadrículas de 3x3 a 7x7. Basado en el histórico paradigma de los Bloques de Corsi (Milner, 1971; Corsi, 1972) y en el modelo del 'Escriba Interno' de Robert H. Logie (1995), aísla la codificación espaciotemporal activa del almacenamiento de patrones estáticos.",
      "En cada ejercicio, una secuencia de casillas se ilumina a intervalos regulares de 500 ms. El participante debe codificar simultáneamente la posición geográfica y el orden cronológico para reproducir la ruta con fidelidad durante una sesión de 45 segundos.",
      "En la estructura de la memoria de trabajo, Logie (1995) y Alan Baddeley (2000) comprobaron que el movimiento secuencial es sostenido por el Escriba Interno, un lazo activo de repaso motor. George A. Miller (1956) y Herbert A. Simon (1974) demostraron que la retención depende del agrupamiento (Chunking), mientras que Nelson Cowan (2001) fijó la capacidad del foco atencional puro en torno a 4 elementos.",
      "Los estudios normativos informatizados (Kessels et al., 2000) establecen la amplitud espacial adulta en 5,4 ± 0,9 pasos, evidenciando que esta capacidad es muy sensible a la fatiga cognitiva, el sueño y el rendimiento prefrontal.",
      "Medición y precisión técnica: cada pulsación se registra localmente con el reloj performance.now() del navegador sin enviar datos al exterior. Los temporizadores del navegador se redondean a 1 ms por protección ante ataques como Spectre, y la pantalla actualiza los fotogramas a su frecuencia de refresco (16,7 ms a 60 Hz; Woods et al., 2015). Las fluctuaciones menores de 5 ms corresponden a ruido normal del equipo.",
      "Transparencia absoluta: SkillDrills no centraliza datos de usuarios. Tus marcas se guardan únicamente en el localStorage de tu dispositivo y no publicamos clasificaciones colectivas. Todas las referencias corresponden a publicaciones científicas citadas al pie.",
      "Este juego es una herramienta gratuita concebida para el entrenamiento cognitivo y la curiosidad personal. No es un dispositivo médico ni un test diagnóstico. Si tienes dudas sobre tu memoria o atención, acude a un profesional sanitario cualificado."
],
    benchmarks: {
      title: "Baremos normativos de amplitud de memoria secuencial y bloques de Corsi",
      headers: ["Nivel de Rendimiento", "Amplitud y Cuadrícula", "Puntos", "Perfil Cognitivo y Retención de Trayectoria"],
      rows: [
        [
                "Nivel 1 (Sobresaliente / Percentil 99)",
                "Amplitud 10 – 14+ pasos (matriz 6x6–7x7)",
                "1.200+ Puntos",
                "Élite visoespacial secuencial; divide rutas complejas en 2–3 macrovectores; repaso impecable en el escriba interno; pulsación rápida en < 400 ms"
        ],
        [
                "Nivel 2 (Alto / Percentil 85–95)",
                "Amplitud 8 – 9 pasos (matriz 5x5–6x6)",
                "900 – 1.199 Puntos",
                "Supera holgadamente el promedio; agrupación vectorial sólida (giros en L, zigzags); resistente a la interferencia; cadencia de 400–600 ms"
        ],
        [
                "Nivel 3 (Promedio Adulto / Percentil 50)",
                "Amplitud 5 – 7 pasos (matriz 4x4–5x5)",
                "600 – 899 Puntos",
                "Norma poblacional estándar (Corsi, 1972; Kessels et al., 2000, 5,4 ± 0,9 pasos); reproduce 5–6 pasos con soltura; omisiones intermedias en 5x5; 600–850 ms"
        ],
        [
                "Nivel 4 (Bajo / Decaimiento Secuencial)",
                "Amplitud 4 pasos (matriz 3x3–4x4)",
                "400 – 599 Puntos",
                "Límite de la memoria sin agrupar (Cowan, 2001); memoriza puntos aislados provocando saturación temprana; cadencia de 850–1.100 ms"
        ],
        [
                "Nivel 5 (Entrenamiento Requerido / Amplitud Reducida)",
                "Amplitud < 4 pasos (matriz 3x3)",
                "< 400 Puntos",
                "Rápido desvanecimiento del rastro temporal; errores frecuentes de transposición en el orden; lentitud de pulsación superior a 1.100 ms"
        ]
],
      note: "La longitud de pasos y la cuadrícula corresponden al nivel máximo alcanzado en 45 segundos, comparado con los baremos de Corsi Block-Tapping."
    },
    techniques: {
      title: "Estrategias con respaldo científico para ampliar la memoria secuencial",
      items: [
        {
                "name": "Agrupamiento por vectores direccionales (Chunking)",
                "desc": "Agrupa los pasos en vectores continuos (p. ej., 'dos derecha, uno arriba'). Concebir la ruta como trazos geométricos en lugar de casillas aisladas reduce la carga cognitiva más del 60 %.",
                "tips": "Identifica formas en L, triángulos o escaleras en lugar de puntos sueltos."
        },
        {
                "name": "Ensayo motor con el Escriba Interno (Logie 1995)",
                "desc": "Traza mentalmente la línea continua con la corteza motora mientras observas la animación. La preactivación motriz refuerza la memoria visual con sensaciones cinestésicas.",
                "tips": "Siente el movimiento en la mano antes de tocar la pantalla."
        },
        {
                "name": "Fijación central y visión parafoveal",
                "desc": "Mantén la vista en el centro del tablero para percibir el movimiento periféricamente, evitando saltos bruscos con la mirada que generan latencia atencional.",
                "tips": "Conserva los ojos y la cabeza fijos y contempla la trayectoria como un todo."
        },
        {
                "name": "Cadencia y ritmo de pulsación constante",
                "desc": "Pulsa la secuencia a un ritmo continuo. Las pausas entre clics permiten el decaimiento de las posiciones finales; ejecuta el bloque en un único pulso fluido.",
                "tips": "Sigue un tempo uniforme sin detenerte a deliberar paso a paso."
        }
]
    },
    steps: [
      "Fija la mirada en el centro del tablero y observa la secuencia animada de casillas.",
      "Agrupa mentalmente los destellos en vectores direccionales continuos.",
      "Durante la breve pausa previa, repasa internamente la ruta con el escriba interno.",
      "Reproduce las coordenadas en idéntico orden con pulsaciones rítmicas fluidas.",
      "Supera cuadrículas crecientes de 3x3 a 7x7 para extender tu amplitud espacial al límite."
],
    audience: "Jugadores competitivos que buscan memorizar rotaciones y secuencias de habilidades, bailarines, deportistas, estudiantes técnicos y personas interesadas en potenciar la memoria visoespacial secuencial.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('corsi1972', 'milner1971', 'logie1995', 'cowan2001', 'baddeley2000', 'miller1956', 'simon1974', 'kessels2000', 'woods2015'),
    related: [
      {
            "href": "/drills/memory/spatial-memory/grid-memorization",
            "label": "Test de Memoria Visual (Memory Matrix)"
      },
      {
            "href": "/drills/memory/spatial-memory/object-location",
            "label": "Test de Memoria Espacial (Object Location)"
      },
      {
            "href": "/drills/memory/short-term-memory/digit-span",
            "label": "Test de Dígitos (Digit Span)"
      },
      {
            "href": "/drills/memory/short-term-memory/word-recall",
            "label": "Test de Memoria Verbal (Word Recall)"
      },
      {
            "href": "/drills/memory/working-memory/n-back",
            "label": "Test Dual N-Back"
      }
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
      <PathTracingClient
        copy={{
        "h1Keyword": "Test de Memoria Secuencial",
        "h1Suffix": " (Bloques de Corsi)",
        "subtitle": "La amplitud espacial es la secuencia de posiciones más larga que puedes reproducir en orden. El clásico test de bloques de Corsi sitúa el promedio de los adultos entre cinco y siete pasos (Milner, 1971; Corsi, 1972), recurriendo a circuitos cerebrales distintos de los dígitos verbales (Logie, 1995).",
        "statScore": "Puntuación",
        "statTime": "Tiempo",
        "statLevel": "Nivel",
        "statBestScore": "Mejor Récord",
        "levelPrefix": "Nv.",
        "startTitle": "Trazado de Rutas Pro",
        "startSubtitle": "Memoria Secuencial • Bloques de Corsi",
        "countdownSubtitle": "PREPÁRATE",
        "newBest": "NUEVO RÉCORD",
        "pointsLabel": "Puntos",
        "statAccuracy": "Precisión",
        "statPeakLevel": "Nivel Máximo",
        "statPerfects": "Aciertos",
        "btnPlayAgain": "Jugar de nuevo",
        "rulesTitle": "Instrucciones & Sistema de Puntuación",
        "aboutTitle": "Sobre el Test de Memoria Secuencial y Corsi",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Memoriza y reproduce la ruta",
                        "highlight": "+150 PTS",
                        "result": "Observa el recorrido secuencial y pulsa las casillas en el mismo orden"
                },
                {
                        "num": "2",
                        "text": "Progresión de tablero y pasos",
                        "highlight": "3x3 → 7x7",
                        "result": "A medida que subes de nivel aumentan el tamaño de cuadrícula y la ruta"
                },
                {
                        "num": "3",
                        "text": "Fallo o tiempo agotado",
                        "highlight": "Sin penalización",
                        "result": "No se restan puntos ni tiempo; la ronda se reinicia en el nivel actual"
                },
                {
                        "num": "4",
                        "text": "Dificultad adaptativa estable",
                        "highlight": "Sin descenso",
                        "result": "El nivel no baja, permitiéndote consolidar tu estrategia de agrupación espacial"
                }
        ]
}}
      />
      <DrillGuide guide={pathTracingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/path-tracing"
          locale="es"
        />
      </div>
    </>
  );
}
