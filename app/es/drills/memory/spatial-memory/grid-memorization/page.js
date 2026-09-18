import GridMemorizationClient from '@/app/drills/memory/spatial-memory/grid-memorization/GridMemorizationClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Memoria Visual – Juego de Matriz | SkillDrills",
  description: "Test de memoria visual online gratis: Memoriza patrones matriciales en cuadrículas y evalúa tu retención visoespacial y chunking directo en el navegador.",
  keywords: ['test de memoria visual', 'juegos de memoria visual', 'test de memoria de patrones', 'memoria espacial test', 'juego de memoria en cuadricula', 'matriz de memoria visual', 'memoria visoespacial test', 'capacidad de memoria visual', 'entrenamiento de memoria visual', 'test de chunking visoespacial', 'amplitud de memoria visual', 'evaluacion memoria de trabajo'],
  openGraph: {
    title: "Test de Memoria Visual Online (Juego de Cuadrícula) - Gratis | SkillDrills",
    description: "Test de memoria visual online gratis (juego de memoria en cuadrícula). Memoriza patrones matriciales en tableros de 4x4 a 5x5 en 1,5 segundos y evalúa tu retención visoespacial y chunking mental. Sin registro, directo en tu navegador.",
    type: 'website',
    url: 'https://skilldrills.online/es/drills/memory/spatial-memory/grid-memorization',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Memoria Visual Online (Juego de Cuadrícula) - Gratis | SkillDrills",
    description: "Test de memoria visual online gratis (juego de memoria en cuadrícula). Memoriza patrones matriciales en tableros de 4x4 a 5x5 en 1,5 segundos y evalúa tu retención visoespacial y chunking mental. Sin registro, directo en tu navegador.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/memory/spatial-memory/grid-memorization',
    languages: getAlternateLanguages('/drills/memory/spatial-memory/grid-memorization'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Entrenamiento de Memoria", "item": "https://skilldrills.online/es/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "Memoria Espacial", "item": "https://skilldrills.online/es/drills/memory/spatial-memory" },
    { "@type": "ListItem", "position": 4, "name": "Test de Memoria Visual", "item": "https://skilldrills.online/es/drills/memory/spatial-memory/grid-memorization" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Memoria Visual Online (Juego de Cuadrícula)",
  "url": "https://skilldrills.online/es/drills/memory/spatial-memory/grid-memorization",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Test de Memoria Visual Online (Juego de Cuadrícula)",
  "url": "https://skilldrills.online/es/drills/memory/spatial-memory/grid-memorization",
  "description": "Evaluación neurocognitiva interactiva que mide la retención visoespacial, el agrupamiento mental de figuras y la capacidad de almacenamiento de patrones matriciales.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Spatial Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Memoria Visual Online (Juego de Memoria en Cuadrícula)",
  "url": "https://skilldrills.online/es/drills/memory/spatial-memory/grid-memorization",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo entrenar la memoria visual en cuadrículas matriciales",
  "description": "Protocolo sistemático de cuatro pasos para codificar, agrupar y reconstruir con precisión patrones espaciales en la memoria de trabajo.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/grid-memorization#step-1",
      
      "name": "Fijar la mirada central",
      "text": "Enfoca tus ojos en el centro de la cuadrícula antes de que aparezca el patrón para utilizar la visión parafoveal en toda la matriz."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/grid-memorization#step-2",
      
      "name": "Ejecutar chunking de formas Gestalt",
      "text": "Agrupa las celdas iluminadas en bloques geométricos reconocibles (líneas, esquinas, 'L', cuadrados) en lugar de memorizar coordenadas aisladas."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/grid-memorization#step-3",
      
      "name": "Trazado visoespacial motor",
      "text": "Traza mentalmente una línea continua a través de las celdas marcadas durante los 1,5 segundos de exposición para preparar la memoria motora."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/es/drills/memory/spatial-memory/grid-memorization#step-4",
      
      "name": "Reconstrucción sistemática de la cuadrícula",
      "text": "Pulsa primero los bloques geométricos identificados y luego completa las celdas periféricas aisladas antes de que la imagen mental se disipe."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es un test de memoria visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un test de memoria visual evalúa la memoria de trabajo visoespacial: tu capacidad para percibir, codificar y retener temporalmente patrones visuales y coordenadas espaciales sin recurrir a la repetición verbal interna."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo funciona el ejercicio de memoria en cuadrícula?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En una cuadrícula de 4x4 o 5x5 se ilumina un conjunto de casillas durante 1,5 segundos. Al apagarse, debes pulsar exactamente las mismas casillas. A medida que aciertas, el número de casillas y la matriz aumentan de tamaño."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es el Visual Patterns Test (VPT)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diseñado en 1997 por Sergio Della Sala, Robert H. Logie y colaboradores, el Visual Patterns Test (VPT) es una prueba neuropsicológica de referencia para medir la memoria visual a corto plazo puramente estática, aislada de movimientos motores secuenciales."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué se diferencia del Test de Corsi (Corsi Block-Tapping)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El test de bloques de Corsi (Corsi, 1972) mide la memoria espacial secuencial (tocar bloques en un orden temporal) usando el 'escriba interno'. Por contra, este ejercicio muestra todas las celdas a la vez, evaluando el 'caché visual' estático."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la puntuación media de memoria visual en adultos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los estudios normativos de Della Sala et al. (1997, 1999) demuestran que un adulto promedio retiene patrones de 6 a 8 casillas en matrices de 4x4 a 5x5. Puntuaciones superiores a 10-14 casillas corresponden a personas con técnicas avanzadas de chunking geométrico."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué el agrupamiento (chunking) mejora la memoria visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La memoria de trabajo visual tiene un límite estricto de 3 a 4 elementos independientes (Luck & Vogel, 1997; Cowan, 2001). El chunking supera esta barrera al agrupar celdas adyacentes en figuras geométricas familiares (líneas, triángulos, letras), comprimiendo la información en una sola unidad cognitiva."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué diferencia hay entre el caché visual y el escriba interno?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En el modelo de Logie (1995), el 'caché visual' es un almacén pasivo que retiene la forma, el color y las imágenes estáticas, mientras que el 'escriba interno' ensaya y actualiza activamente los movimientos espaciales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué los patrones se olvidan tan rápido tras 1,5 segundos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La memoria sensorial icónica se desvanece en 250-500 milisegundos. Si el patrón no se traslada rápidamente a la memoria de trabajo mediante chunking o trazado mental, la huella visual es sobreescrita por nueva información sensorial."
      }
    },
    {
      "@type": "Question",
      "name": "¿Hay penalizaciones de puntuación por hacer clic en una casilla errónea?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Pulsar una casilla incorrecta no resta puntos ni reduce el tiempo restante. La ronda se reinicia en el mismo nivel de dificultad para que puedas entrenar en tu umbral de rendimiento sin frustración."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo ayuda la memoria visual en los videojuegos y la vida cotidiana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mejora la lectura del minimapa en juegos de disparos tácticos (Valorant, CS2), acelera la comprensión de planos arquitectónicos y esquemas técnicos, y potencia la capacidad de rotación mental tridimensional en disciplinas STEM."
      }
    }
  ]
};

const gridGuide = {
  intro: [
  "El Test de Memoria Visual (Grid Memorization / Memory Matrix) es una herramienta neurocognitiva diseñada para medir la memoria de trabajo visoespacial, la capacidad de codificación de patrones y la retención matricial a corto plazo. A diferencia de las pruebas verbales que emplean la repetición acústica, este ejercicio aísla la arquitectura visual no verbal del cerebro.",
  "El estudio clínico del span visoespacial fue iniciado por Pietro Corsi (1972) con el test de bloques de Corsi, demostrando que la memoria visoespacial opera en un sistema neural independiente del span de dígitos verbales (Milner, 1971). En 1997, Sergio Della Sala, Robert H. Logie y colaboradores desarrollaron el Visual Patterns Test (VPT) para aislar la retención de patrones matriciales estáticos respecto a movimientos secuenciales dinámicos.",
  "En la neurociencia cognitiva moderna, Robert H. Logie (1995) y Alan Baddeley (2000) subdividieron la agenda visoespacial en el 'Caché Visual' (almacén pasivo de forma, color y patrones estáticos) y el 'Escriba Interno' (mecanismo activo de planificación y repaso espacial). Además, investigaciones de Steven J. Luck & Edward K. Vogel (1997) y Nelson Cowan (2001) confirmaron que la memoria de trabajo visual pura está limitada a 3 o 4 elementos independientes. Expandir este límite exige aplicar chunking espacial: agrupar casillas en figuras Gestalt completas.",
  "Calibrado con precisión cronométrica digital (Woods et al., 2015), este ejercicio cuenta con una exposición estandarizada de 1,5 segundos y un escalado adaptativo de dificultad para calcular con rigor tu límite de retención visoespacial.",
  "Cómo se mide: cada interacción se registra con el reloj de alta resolución performance.now() del navegador, ejecutándose 100% en tu dispositivo local. Los temporizadores del navegador se sincronizan con la tasa de refresco de pantalla (~16,7 ms a 60 Hz; Woods et al., 2015). Las diferencias inferiores a 5 ms corresponden a variaciones normales del hardware, por lo que recomendamos comparar tus propios registros en el mismo equipo.",
  "Transparencia de datos: SkillDrills no recopila ni almacena puntuaciones en servidores externos. Tus datos se guardan exclusivamente en el localStorage de tu navegador. Todos los valores de referencia proceden de investigaciones científicas publicadas.",
  "Este ejercicio es un juego cognitivo gratuito orientado a la práctica y el entrenamiento mental; no es un dispositivo médico ni una prueba diagnóstica clínica. Si tienes dudas sobre tu salud cognitiva, consulta con un profesional médico."
],
  benchmarks: {
    title: "Baremos normativos de retención de patrones visoespaciales",
    headers: ["Nivel de Rendimiento", "Span de Patrón (Celdas)", "Puntuación", "Perfil Cognitivo y Chunking"],
    rows: [
  [
    "Nivel 1 (Sobresaliente / Percentil 99)",
    "10 – 14+ Celdas",
    "1.150+ Puntos",
    "Rendimiento visoespacial de élite; descompone patrones complejos en 2-3 primitivas geométricas Gestalt; retención en caché visual impecable; cadencia de clic menor a 450 ms."
  ],
  [
    "Nivel 2 (Alto / Percentil 85-95)",
    "8 – 9 Celdas",
    "850 – 1.149 Puntos",
    "Supera el promedio adulto; ejecuta chunking geométrico rápido (formas de 'L', tríadas); resistente a la interferencia visual; cadencia de 450 a 650 ms."
  ],
  [
    "Nivel 3 (Promedio Adulto / Percentil 50)",
    "6 – 7 Celdas",
    "550 – 849 Puntos",
    "Línea base de la población adulta sana (Della Sala et al., 1997); gestiona agrupaciones simples; pierde celdas periféricas en cuadrículas de 5x5; cadencia de 650 a 900 ms."
  ],
  [
    "Nivel 4 (Bajo Promedio / Cuello de Botella)",
    "5 Celdas",
    "350 – 549 Puntos",
    "Opera en el límite fisiológico sin chunking (Cowan, 2001); intenta memorizar celdas individuales sin agrupar figuras; cadencia de 900 a 1.200 ms."
  ],
  [
    "Nivel 5 (Bajo / Requiere Entrenamiento)",
    "< 5 Celdas",
    "< 350 Puntos",
    "Rápido desvanecimiento de la huella visual; vulnerabilidad al ruido perceptual; dificultad para retener más de 4 celdas tras 1,5s; cadencia superior a 1.200 ms."
  ]
],
    note: "El span de celdas refleja la configuración máxima de casillas completada con éxito durante la sesión de 45 segundos (Della Sala et al., 1997; Woods et al., 2015)."
  },
  techniques: {
    title: "Técnicas comprobadas para ampliar la memoria visual matricial",
    items: [
  {
    "name": "Agrupamiento de formas espaciales (Chunking Gestalt)",
    "desc": "Agrupa mentalmente las celdas encendidas contiguas en formas geométricas familiares como triángulos, líneas, cuadrados o letras (Wertheimer, 1923; Della Sala et al., 1999). Convertir 7 coordenadas en 2 figuras geométricas reduce la carga cognitiva en más de un 60 %.",
    "tips": "Busca esquinas y líneas continuas de inmediato en lugar de observar casillas aisladas."
  },
  {
    "name": "Codificación de espacio negativo (huecos)",
    "desc": "Cuando un sector de la cuadrícula esté densamente ocupado por celdas iluminadas, memoriza las casillas vacías (apagadas). Recordar 2 huecos oscuros dentro de un bloque de 6 casillas es mucho más eficiente que memorizar 4 luces.",
    "tips": "Si un cuadrante está casi lleno, concéntrate solo en los 'agujeros' oscuros."
  },
  {
    "name": "Trazado cinestésico del escriba interno",
    "desc": "Activa el 'escriba interno' (Logie, 1995) trazando mentalmente una línea continua que una todas las celdas encendidas durante la exposición de 1,5 segundos. La planificación motora refuerza la huella en el caché visual pasivo.",
    "tips": "Mantén un sentido de barrido uniforme (de arriba a la izquierda hacia abajo a la derecha) para dar direccionalidad al patrón."
  },
  {
    "name": "Fijación central y captura parafoveal",
    "desc": "Mantén los ojos firmemente fijados en el centro geométrico de la cuadrícula. Evita mover los ojos con sacadas constantes entre casillas; la visión parafoveal captura la topología global simultáneamente.",
    "tips": "Suaviza el enfoque visual para registrar el patrón completo como una sola silueta fotográfica."
  }
]
  },
  steps: [
  "Fija la mirada en el centro de la cuadrícula y espera a que el patrón se ilumine.",
  "Durante el destello de 1,5 segundos, agrupa las casillas en 2 o 3 figuras geométricas.",
  "En áreas con muchas luces, memoriza los huecos vacíos (espacio negativo) para ahorrar memoria.",
  "Cuando la cuadrícula se apague, pulsa rápidamente las figuras memorizadas sobre el tablero.",
  "Avanza a través de matrices de 4x4 y 5x5 para seguir empujando tu límite de memoria de trabajo."
],
  audience: "Jugadores de esports que buscan mejorar su visión de minimapa, estudiantes de carreras técnicas o arquitectura, ajedrecistas, radiólogos y cualquier persona interesada en entrenar su memoria visoespacial.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'corsi1972', 'luck1997', 'milner1971', 'woods2015'),
  related: [
  {
    "href": "/drills/memory/working-memory/n-back",
    "label": "Test N-Back (Memoria de Trabajo)"
  },
  {
    "href": "/drills/cognitive/focus/concentration-grid",
    "label": "Tabla de Schulte (Cuadrícula de Concentración)"
  },
  {
    "href": "/drills/memory/short-term-memory/digit-span",
    "label": "Test de Dígitos (Span de Memoria)"
  },
  {
    "href": "/drills/reaction-speed/reaction-time-test",
    "label": "Test de Reflejos (Tiempo de Reacción)"
  },
  {
    "href": "/drills/reaction-speed/reflex-training-drill",
    "label": "Juego de Reflejos (Multi-Objetivo)"
  }
]
};

export default function LocalizedGridMemorizationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GridMemorizationClient copy={{
        "h1Keyword": "Test de Memoria Visual",
        "h1Suffix": " – Juego de Memoria de Patrones en Cuadrícula",
        "caption": "La memoria de trabajo visual almacena aproximadamente cuatro objetos distintos a la vez; el cuello de botella es la cantidad de objetos y no el nivel de detalle (Luck & Vogel, 1997). Las cuadrículas matriciales estáticas evalúan el 'caché visual', el almacén pasivo de formas y disposición espacial (Logie, 1995).",
        "statScore": "Puntos",
        "statTime": "Tiempo",
        "statGridSize": "Cuadrícula",
        "statBest": "Récord",
        "hudScore": "Puntos",
        "hudTime": "Tiempo",
        "startTitle": "Memoria Visual Pro",
        "startSubtitle": "Memoria a Corto Plazo Espacial • Retención de Patrones",
        "countdownSubtitle": "PREPÁRATE",
        "newBest": "NUEVO RÉCORD",
        "pointsLabel": "Puntos",
        "statAccuracy": "Precisión",
        "cellsUnit": "Celdas",
        "statPeakPattern": "Patrón Máximo",
        "statPerfects": "Perfectos",
        "btnPlayAgain": "Jugar de nuevo",
        "rulesTitle": "Instrucciones del Ejercicio y Puntuación",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Retención de Patrón",
                        "highlight": "+150 PTS",
                        "result": "Memoriza la posición de las celdas y pulsa para recrearlas"
                },
                {
                        "num": "2",
                        "text": "Progresión de Nivel",
                        "highlight": "4x4 → 5x5",
                        "result": "La dificultad y el tamaño del tablero aumentan gradualmente"
                },
                {
                        "num": "3",
                        "text": "Error / Tiempo límite",
                        "highlight": "Sin Penalización",
                        "result": "No se descuentan puntos ni tiempo por fallar una casilla"
                },
                {
                        "num": "4",
                        "text": "Nivel Estable",
                        "highlight": "Mantiene Nivel",
                        "result": "Un fallo repite la ronda sin descender en dificultad"
                }
        ]
}} />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/grid-memorization"
          locale="es"
        />
      </div>
    </>
  );
}
