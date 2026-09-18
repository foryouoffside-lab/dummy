import ObjectLocationClient from '@/app/drills/memory/spatial-memory/object-location/ObjectLocationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Memoria Espacial – Localización | SkillDrills",
  description: "Test de memoria espacial gratis: Memoriza la posición de objetos en cuadrículas de 3x3 a 7x7 en 1,5s y localiza las coordenadas sin registro.",
  keywords: ['test de memoria espacial', 'memoria espacial ejercicios', 'test de memoria visual y espacial', 'memoria de localizacion de objetos', 'test de retencion espacial', 'memoria de trabajo visoespacial', 'object location memory test', 'evaluacion de memoria espacial', 'test silverman eals', 'juego de memoria espacial online', 'ejercicios de orientacion espacial', 'memoria topografica test'],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/memory/spatial-memory/object-location",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/object-location', 'es'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Test de Memoria Espacial (Localización de Objetos) - Juego Gratis | SkillDrills",
    description: "Test de memoria espacial gratis (memoria de localización de objetos / Object Location Memory). Memoriza la posición de objetos en cuadrículas de 3x3 a 7x7 en 1,5 segundos y localiza las coordenadas del objetivo exacto. Sin registro.",
    url: "https://skilldrills.online/es/drills/memory/spatial-memory/object-location",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Memoria Espacial (Localización de Objetos) - Juego Gratis | SkillDrills",
    description: "Test de memoria espacial gratis (memoria de localización de objetos / Object Location Memory). Memoriza la posición de objetos en cuadrículas de 3x3 a 7x7 en 1,5 segundos y localiza las coordenadas del objetivo exacto. Sin registro.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedObjectLocationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Entrenamiento de Memoria", "item": "https://skilldrills.online/es/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Memoria Espacial", "item": "https://skilldrills.online/es/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "Test de Memoria Espacial", "item": "https://skilldrills.online/es/drills/memory/spatial-memory/object-location" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Test de Memoria Espacial (Localización de Objetos)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Evaluación neuropsicológica interactiva que mide la unión de características visuales y espaciales (Feature Binding), el mapa cognitivo y la memoria de posición en cuadrículas expansivas.",
    "genre": "Cognitive Assessment / Spatial Memory",
    "url": "https://skilldrills.online/es/drills/memory/spatial-memory/object-location",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Test de Memoria Espacial (Localización de Objetos)",
    "url": "https://skilldrills.online/es/drills/memory/spatial-memory/object-location",
    "description": "Evaluación neuropsicológica interactiva que mide la unión de características visuales y espaciales (Feature Binding), el mapa cognitivo y la memoria de posición en cuadrículas expansivas.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Test de Memoria Espacial (Localización de Objetos)",
    "description": "Evaluación neuropsicológica interactiva que mide la unión de características visuales y espaciales (Feature Binding), el mapa cognitivo y la memoria de posición en cuadrículas expansivas.",
    "url": "https://skilldrills.online/es/drills/memory/spatial-memory/object-location",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Memory"],
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
            "name": "¿Qué es un test de memoria espacial de localización de objetos?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Es una prueba neurocognitiva que evalúa la capacidad del cerebro para unir la identidad visual de un objeto ('qué es') con sus coordenadas espaciales exactas ('dónde está'), proceso conocido como vinculación de características (Feature Binding)."
            }
      },
      {
            "@type": "Question",
            "name": "¿Cómo funciona este ejercicio?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Se muestran varios objetos en cuadrículas de 3x3 a 7x7 durante 1,5 segundos. Tras despejarse el tablero, se presenta un icono objetivo y debes marcar la celda exacta en la que se encontraba."
            }
      },
      {
            "@type": "Question",
            "name": "¿Qué es el test de Silverman-Eals sobre memoria de objetos?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Un paradigma neuropsicológico clásico propuesto en 1994 por Marion Eals e Irwin Silverman que demostró que la memoria de ubicación opera como un mecanismo evolutivo diferenciado de la rotación mental."
            }
      },
      {
            "@type": "Question",
            "name": "¿Qué es el 'Feature Binding' en neurociencia cognitiva?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El proceso neurológico por el cual la vía visual ventral (procesamiento del objeto) y la vía dorsal (procesamiento espacial) se integran en el hipocampo formando una representación episódica unificada."
            }
      },
      {
            "@type": "Question",
            "name": "¿Cuál es la puntuación media de un adulto en esta prueba?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "En evaluaciones clínicas como CANTAB PAL, los adultos sanos ubican con precisión entre 4 y 6 objetos en matrices intermedias. Esta versión es un juego de navegador y sus puntos deben considerarse como práctica personal, no como un diagnóstico clínico."
            }
      },
      {
            "@type": "Question",
            "name": "¿En qué se diferencia de un test de cuadrícula tradicional?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Los tests de memoria de cuadrícula pura solo evalúan casillas iluminadas de forma homogénea (patrones geométricos). La localización de objetos requiere recordar qué objeto específico ocupaba cada celda, duplicando la exigencia cognitiva."
            }
      },
      {
            "@type": "Question",
            "name": "¿Por qué es más difícil recordar la ubicación de objetos que simples figuras?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Porque la conjunción de características impone un alto coste atencional en la memoria de trabajo (Luck & Vogel, 1997), requiriendo sostener dos dimensiones simultáneas en lugar de una sola."
            }
      },
      {
            "@type": "Question",
            "name": "¿Qué áreas cerebrales intervienen en la memoria de localización?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Principalmente el hipocampo bilateral, el giro parahipocampal, la corteza parietal posterior y la corteza prefrontal dorsolateral (DLPFC) para el mantenimiento activo de coordenadas."
            }
      },
      {
            "@type": "Question",
            "name": "¿Hay penalizaciones de tiempo o puntos por equivocarse?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Errar en una casilla no resta puntos ni reduce el temporizador. La ronda se repite en el mismo nivel para permitirte consolidar tu estrategia de anclaje."
            }
      },
      {
            "@type": "Question",
            "name": "¿Cómo influye este entrenamiento en la vida diaria y en los videojuegos?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mejora la retención de dónde dejamos objetos habituales (llaves, móvil, aparcamiento) y en gaming optimiza la lectura rápida de minimapas, posición de enemigos y tiempos de recarga."
            }
      }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo entrenar la memoria espacial y la localización de objetos",
    "description": "Protocolo sistemático de 4 fases para codificar identidades de objetos, anclar coordenadas espaciales y precisar ubicaciones objetivo.",
    "step": [
      {
            "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/object-location#step-1",
            
            "name": "Escaneo por cuadrantes",
            "text": "Durante los primeros 500 ms divide mentalmente el tablero en 4 sectores (superior izquierdo, superior derecho, inferior izquierdo e inferior derecho) para evaluar la distribución."
      },
      {
            "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/object-location#step-2",
            
            "name": "Anclaje en puntos de referencia",
            "text": "Vincula la posición de cada objeto con puntos fijos como las esquinas, los bordes exteriores o la celda central."
      },
      {
            "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/object-location#step-3",
            
            "name": "Emparejamiento semántico-espacial",
            "text": "Crea asociaciones verbales o visuales inmediatas entre el tipo de objeto y su dirección (p. ej., 'estrella arriba, llave abajo')."
      },
      {
            "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/object-location#step-4",
            
            "name": "Localización y clic del objetivo",
            "text": "Cuando el tablero quede vacío y aparezca el icono a buscar, consulta tu mapa mental y pulsa sin dudar en la celda correcta."
      }
]
  };

  const objectLocationGuide = {
    intro: [
      "El Test de Memoria Espacial (Object Location Memory Test) es una herramienta interactiva diseñada para evaluar la memoria de posición espacial, la vinculación objeto-localización (Object-Location Binding) y el recuerdo de distribuciones visuales. A diferencia de las pruebas de cuadrícula anónima, este ejercicio requiere enlazar tokens visuales específicos con coordenadas espaciales exactas.",
      "El fundamento empírico de esta evaluación proviene de las investigaciones de Marion Eals e Irwin Silverman (1994), quienes demostraron que recordar la posición de objetos constituye un módulo adaptativo independiente de la rotación espacial euclidiana. Anteriormente, Edward C. Tolman (1948) sentó las bases del mapa cognitivo (Cognitive Map), explicando cómo los seres vivos estructuran representaciones internas de su entorno.",
      "En el campo de la memoria de trabajo, Robert H. Logie (1995) y Alan Baddeley (2000) identificaron que la unión objeto-posición es coordinada por el búfer episódico (Episodic Buffer), que integra datos del caché visual con el escriba interno espacial. Asimismo, Steven J. Luck y Edward K. Vogel (1997) probaron que las conjunciones de características conllevan una alta sobrecarga atencional, y Nelson Cowan (2001) demostró que el foco atencional no asistido está limitado a 3 o 4 parejas objeto-coordenada.",
      "Siguiendo los estándares de cronometría establecidos por Woods et al. (2015), este test emplea una ventana de memorización de 1,5 segundos y una escala de dificultad adaptativa (de matrices de 3x3 a 7x7) para determinar tu umbral de retención visoespacial.",
      "Medición y precisión técnica: cada interacción se cronometra localmente mediante el reloj de alta resolución performance.now() del navegador, sin subir ningún dato a servidores externos. Por mitigaciones de seguridad (Spectre), los navegadores redondean los tiempos a aproximadamente 1 ms, y la pantalla actualiza los frames según su frecuencia de refresco (aprox. 16,7 ms a 60 Hz; Woods et al., 2015). Las variaciones inferiores a 5 ms deben considerarse ruido de medición.",
      "Transparencia total: SkillDrills no recopila estadísticas de usuarios. Tus marcas y ajustes se guardan exclusivamente en el localStorage de tu dispositivo y no se transmiten a ninguna base de datos externa. Las referencias citadas proceden de publicaciones científicas formales detalladas al pie.",
      "Este ejercicio es un juego de navegador concebido para entrenamiento y curiosidad intelectual. No es un dispositivo médico ni una prueba diagnóstica para ningún trastorno de salud. Si tienes dudas sobre tu memoria o concentración, consulta con un profesional médico cualificado."
],
    benchmarks: {
      title: "Baremos normativos de capacidad de memoria de localización de objetos",
      headers: ["Nivel de Rendimiento", "Objetos y Cuadrícula", "Puntuación", "Perfil de Vinculación y Mapa Espacial"],
      rows: [
        [
                "Nivel 1 (Sobresaliente / Percentil 99)",
                "Nivel 8 – 10+ (8–10+ objetos, matriz 6x6–7x7)",
                "1.000+ Puntos",
                "Rendimiento visoespacial de élite; utiliza escaneo por cuadrantes y anclaje por puntos clave; retiene 8+ parejas objeto-lugar con rapidez; localización en < 500 ms"
        ],
        [
                "Nivel 2 (Alto / Percentil 85–95)",
                "Nivel 6 – 7 (6–7 objetos, matriz 5x5–6x6)",
                "750 – 999 Puntos",
                "Supera holgadamente la media; emparejamiento semántico-espacial sólido; resistente a la interferencia visual en cuadrículas amplias; localización en 500–700 ms"
        ],
        [
                "Nivel 3 (Promedio Adulto / Percentil 50)",
                "Nivel 4 – 5 (4–5 objetos, matriz 4x4–5x5)",
                "450 – 749 Puntos",
                "Rango normal poblacional (Eals & Silverman, 1994); maneja unas 4 conjunciones (límite de Cowan); empieza a perder objetos centrales en 5x5; localización en 700–950 ms"
        ],
        [
                "Nivel 4 (Bajo / Cuello de Botella en Vinculación)",
                "Nivel 3 (3 objetos, matriz 3x3–4x4)",
                "250 – 449 Puntos",
                "Solo retiene 2–3 objetos aislados; confunde coordenadas adyacentes; vulnerable ante distractores; localización en 950–1.300 ms"
        ],
        [
                "Nivel 5 (Entrenamiento Requerido / Brecha Retentiva)",
                "Nivel 1 – 2 (2 objetos, matriz 3x3)",
                "< 250 Puntos",
                "Rápido desvanecimiento del rastro visual; dificultad para vincular objetos a coordenadas; lentitud de respuesta superior a 1.300 ms"
        ]
],
      note: "El número de objetos y la matriz representan el nivel máximo alcanzado en una sesión de 45 segundos, equiparado a los estándares de Silverman-Eals y CANTAB PAL."
    },
    techniques: {
      title: "Estrategias con base científica para potenciar la retención espacial",
      items: [
        {
                "name": "Anclaje en puntos de referencia (Landmark Anchoring)",
                "desc": "Fija los objetos respecto a esquinas, bordes o el centro de la cuadrícula (Tolman, 1948). Asociar 'el diamante está en la esquina superior izquierda' permite prescindir del cálculo numérico de coordenadas.",
                "tips": "Durante los primeros 500 ms identifica qué iconos ocupan los bordes y esquinas."
        },
        {
                "name": "Emparejamiento semántico-espacial",
                "desc": "Crea asociaciones mentales inmediatas entre el objeto y su dirección (Baddeley, 2000). Por ejemplo, asocia una estrella superior con el cielo y una llave inferior con una cerradura en el suelo.",
                "tips": "Utiliza etiquetas verbales concisas como 'estrella arriba, fuego al centro'."
        },
        {
                "name": "Zonificación por cuadrantes",
                "desc": "Subdivide mentalmente los tableros grandes en cuatro cuadrantes y cuenta cuántos objetos habitan en cada uno antes de detallar su posición.",
                "tips": "Fija primero la cantidad de elementos por zona y luego determina su celda específica."
        },
        {
                "name": "Fijación central y barrido parafoveal",
                "desc": "Mantén la mirada en el centro del tablero para captar la distribución general con la visión periférica, aplicando solo 1 o 2 microsacadas a iconos dudosos.",
                "tips": "Evita movimientos erráticos con los ojos; mantén la cabeza quieta y realiza un barrido sereno."
        }
]
    },
    steps: [
      "Fija la mirada en el centro del tablero y observa la disposición inicial de los objetos.",
      "Durante los 1,5 s de muestra, ancla cada objeto a un punto de referencia (esquinas, bordes o centro).",
      "Genera asociaciones semántico-espaciales inmediatas que unan el icono con su ubicación.",
      "Cuando el tablero se despeje y veas el objetivo, busca en tu mapa mental y pulsa la celda correspondiente.",
      "Avanza por cuadrículas progresivas de 3x3 a 7x7 para expandir tu capacidad de conjunción visual."
],
    audience: "Jugadores competitivos que buscan optimizar el control del minimapa, radiólogos, estudiantes de ciencias técnicas y personas interesadas en potenciar su memoria de trabajo visoespacial.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'luck1997', 'tolman1948', 'eals1994', 'woods2015'),
    related: [
      {
            "href": "/drills/memory/spatial-memory/grid-memorization",
            "label": "Test de Memoria Visual (Memory Matrix)"
      },
      {
            "href": "/drills/memory/spatial-memory/path-tracing",
            "label": "Test de Trazado de Rutas (Path Tracing)"
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
      <ObjectLocationClient
        copy={{
        "h1Keyword": "Test de Memoria Espacial",
        "h1Suffix": " (Localización de Objetos)",
        "subtitle": "La memoria de localización de objetos recuerda qué estaba en cada lugar. Eals y Silverman (1994) la evaluaron con matrices de objetos similares a esta, alcanzando el límite biológico de unos cuatro elementos de la memoria de trabajo visual (Luck & Vogel, 1997).",
        "statScore": "Puntuación",
        "statTime": "Tiempo",
        "statLevel": "Nivel",
        "statBestScore": "Mejor Récord",
        "levelPrefix": "Nv.",
        "memorizePrompt": "MEMORIZA LAS POSICIONES",
        "targetPrompt": "OBJETIVO:",
        "startTitle": "Localización de Objetos Pro",
        "startSubtitle": "Memoria Espacial • Recuerdo de Ubicaciones",
        "countdownSubtitle": "PREPÁRATE",
        "newBest": "NUEVO RÉCORD",
        "pointsLabel": "Puntos",
        "statAccuracy": "Precisión",
        "statPeakLevel": "Nivel Máximo",
        "statPerfects": "Aciertos",
        "btnPlayAgain": "Jugar de nuevo",
        "rulesTitle": "Instrucciones & Sistema de Puntuación",
        "aboutTitle": "Sobre el Entrenamiento de Memoria Espacial",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Memoriza y localiza el objetivo",
                        "highlight": "+150 PTS",
                        "result": "Memoriza la matriz en 1,5 s y pulsa la casilla del objetivo indicado"
                },
                {
                        "num": "2",
                        "text": "Progresión de cuadrícula",
                        "highlight": "3x3 → 7x7",
                        "result": "Al subir de nivel aumentan el tamaño del tablero y los objetos"
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
                        "result": "El nivel no retrocede, lo que te permite consolidar tu mapa mental"
                }
        ]
}}
      />
      <DrillGuide guide={objectLocationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/object-location"
          locale="es"
        />
      </div>
    </>
  );
}
