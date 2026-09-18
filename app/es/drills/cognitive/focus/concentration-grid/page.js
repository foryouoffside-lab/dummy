import ConcentrationGridClient from '@/app/drills/cognitive/focus/concentration-grid/ConcentrationGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — es-ES / es-419 (concentration-grid)
// PRIMARY:  "tabla de schulte"               — Top domestic query (10 Google suggestions)
//           "tabla de schulte online"        — High conversion intent
// SECONDARY / LSI:
//           "tabla schulte"                  — High volume variant (9 suggestions)
//           "tabla schulte online"           — Web app query
//           "tabla de schulte resultados"    — Benchmark intent
//           "test rejilla de concentracion"  — Alternative psychological term
//           "entrenamiento vision periferica"— Cognitive benefit phrase
//           "lectura rapida tabla schulte"   — Speed reading intent
// ============================================================

export const metadata = {
  title: "Tabla de Schulte Online – Test de Foco | SkillDrills",
  description: "Tabla de Schulte online gratis: Entrena tu visión periférica, lectura rápida y velocidad de búsqueda visual tocando números en cuadrículas (3x3 a 8x8).",
  keywords: [
    "tabla de schulte",
    "tabla de schulte online",
    "tabla schulte",
    "tabla schulte online",
    "tabla de schulte resultados",
    "rejilla de concentracion",
    "test rejilla de concentracion",
    "entrenamiento vision periferica",
    "lectura rapida tabla schulte",
    "ejercicios de concentracion online",
    "tabla de schulte 5x5 interactiva",
    "test de atencion y concentracion online"
  ],
  openGraph: {
    title: "Tabla de Schulte Online – Test de Concentración y Visión Periférica | SkillDrills",
    description: "Entrena tu visión periférica, lectura rápida y velocidad de búsqueda visual con la tabla de Schulte online gratis. Encuentra números secuenciales en cuadrículas en expansión (3x3 a 8x8) sin descargas.",
    type: "website",
    url: "https://skilldrills.online/es/drills/cognitive/focus/concentration-grid",
    siteName: "SkillDrills",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabla de Schulte Online – Test de Concentración y Visión Periférica | SkillDrills",
    description: "Entrena tu visión periférica, lectura rápida y velocidad de búsqueda visual con la tabla de Schulte online gratis. Encuentra números secuenciales en cuadrículas en expansión (3x3 a 8x8) sin descargas.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/es/drills/cognitive/focus/concentration-grid",
    languages: getAlternateLanguages('/drills/cognitive/focus/concentration-grid'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Entrenamiento Cognitivo", "item": "https://skilldrills.online/es/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "Tabla de Schulte", "item": "https://skilldrills.online/es/drills/cognitive/focus/concentration-grid" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Tabla de Schulte Online (Concentration Grid)",
  "url": "https://skilldrills.online/es/drills/cognitive/focus/concentration-grid",
  "description": "Entrenador cognitivo interactivo basado en navegador que evalúa la velocidad de búsqueda visual y la atención sostenida mediante el toque secuencial de números en matrices en expansión.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11",
  "educationalUse": ["Velocidad de Búsqueda Visual", "Expansión de Campo Periférico", "Eficiencia Sacádica", "Atención Sostenida"]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tabla de Schulte Online (Concentration Grid)",
  "url": "https://skilldrills.online/es/drills/cognitive/focus/concentration-grid",
  "description": "Entrenador cognitivo interactivo basado en navegador que evalúa la velocidad de búsqueda visual y la atención sostenida mediante el toque secuencial de números en matrices en expansión.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Tabla de Schulte Online (Concentration Grid)",
  "url": "https://skilldrills.online/es/drills/cognitive/focus/concentration-grid",
  "description": "Juego de búsqueda secuencial de números en tablas de Schulte en expansión. Entrena visión periférica y atención sostenida.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Entrenamiento Cognitivo", "Búsqueda Visual", "Tabla de Schulte", "Concentration Grid"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo entrenar con la Tabla de Schulte y Rejilla de Concentración",
  "description": "Instrucciones paso a paso para entrenar la velocidad de búsqueda visual, la visión periférica y el enfoque sostenido.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/es/drills/cognitive/focus/concentration-grid#step-1",
      "name": "Fija la mirada en el centro de la cuadrícula",
      "text": "Mantén la vista relajada en el centro de la matriz en lugar de mover los ojos desordenadamente de casilla en casilla."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/es/drills/cognitive/focus/concentration-grid#step-2",
      "name": "Localiza y toca los números en orden ascendente",
      "text": "Encuentra y pulsa cada número en secuencia numérica estricta empezando desde el 1 (1, 2, 3...) con la máxima rapidez."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/es/drills/cognitive/focus/concentration-grid#step-3",
      "name": "Utiliza tu visión periférica",
      "text": "Aprovecha el campo visual periférico para ubicar los siguientes números mientras confirmas el número actual con el dedo o ratón."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/es/drills/cognitive/focus/concentration-grid#step-4",
      "name": "Avanza por cuadrículas en expansión",
      "text": "Al completar cada cuadrícula pasarás a matrices más grandes (3x3, 4x4, 5x5...) con números rotados, desafiando tu concentración en 45 segundos."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-11",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es una tabla de Schulte y para qué sirve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La tabla de Schulte es una cuadrícula psicodiagnóstica desarrollada por el psiquiatra alemán Walter Schulte. Se utiliza para evaluar y entrenar la velocidad de búsqueda visual, la atención sostenida y la ampliación del campo de visión periférica, siendo clave en técnicas de lectura rápida y psicología deportiva."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo ayuda la tabla de Schulte a mejorar la lectura rápida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Al obligar al cerebro a captar números sin mover directamente la fóvea a cada casilla, la tabla entrena la visión parafoveal. Esto permite a los lectores abarcar frases completas de un solo vistazo en lugar de leer palabra por palabra (Rayner, 1998)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la técnica adecuada para resolver una tabla de Schulte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La técnica correcta consiste en fijar la vista en el centro exacto de la tabla y utilizar la visión periférica para detectar los números periféricos. Mover los ojos frenéticamente de esquina a esquina aumenta el tiempo total de resolución (Lu et al., 2022)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué puntuación o tiempo se considera bueno en la tabla de Schulte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En una tabla clásica de 5x5 (25 números), completar la búsqueda en menos de 25 segundos se considera un nivel excelente. En nuestro simulador dinámico de 45 segundos, alcanzar matrices de 6x6 o 7x7 y superar los 6.000 puntos sitúa al usuario en el rango de atletas de élite."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué las casillas cambian de tamaño y los números rotan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A medida que limpias cada nivel, la cuadrícula crece para ensanchar progresivamente tu campo visual. La rotación de dígitos introduce ruido perceptual que obliga a la vía ventral del cerebro a extraer características invariantes y suprimir distracciones visuales (Treisman & Gelade, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Esta herramienta es utilizada por deportistas profesionales?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Pilotos de automovilismo, aviadores militares y jugadores de esports utilizan cuadrículas de concentración y tablas de Schulte para desarrollar reflejos sacádicos y procesar múltiples estímulos visuales en milisegundos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuántos minutos al día se recomienda practicar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se recomiendan sesiones breves de 5 a 10 minutos diarios (3 a 5 rondas). La fatiga visual reduce la eficiencia de los movimientos sacádicos, por lo que la consistencia diaria supera a los entrenamientos prolongados."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cometer errores penaliza el tiempo restante?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No resta tiempo directo del reloj de 45 segundos, pero un clic incorrecto genera un destello de alerta y reduce tu porcentaje final de precisión, premiando la concentración disciplinada sobre el clic impulsivo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se puede utilizar esta herramienta en teléfonos móviles y tablets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. La plataforma está totalmente optimizada para pantallas táctiles de móviles y tabletas, permitiendo toques dactilares rápidos con baja latencia de entrada."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es necesario registrarse o pagar para usar la tabla de Schulte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. La herramienta es 100% gratuita, de libre acceso en el navegador y no requiere registro, instalación ni descargas."
      }
    }
  ]
};

const concentrationGridGuideEs = {
  heading: "Guía Completa de la Tabla de Schulte y Psicología de la Atención Visual",
  intro: [
    "La Tabla de Schulte (Concentration Grid) es uno de los instrumentos psicodiagnósticos y de acondicionamiento cognitivo más estudiados en neurociencia visual. Diseñada originalmente por el psiquiatra Walter Schulte, su propósito es ensanchar el campo visual funcional (Functional Field of View) y reducir la latencia de fijación ocular durante la exploración secuencial (Lu et al., 2022; Rayner, 1998).",
    "A diferencia de las pruebas de búsqueda estáticas, este simulador implementa matrices en expansión continua (desde 3x3 hasta 8x8) bajo un límite estricto de 45 segundos. A medida que el usuario encuentra cada número, la densidad estimular aumenta, sometiendo al sistema atencional a un fenómeno de apiñamiento visual progresivo (Crowding Effect) que exige una estricta integración de características perceptuales (Treisman & Gelade, 1980; Wolfe, 2007).",
    "Evidencia en lectura rápida y deportes de alta velocidad: Las investigaciones demuestran que los lectores eficientes no fijan cada palabra de manera individual, sino que utilizan el campo parafoveal para procesar hasta 14-15 caracteres a la derecha de la fijación (Rayner, 2016). En el ámbito deportivo, pilotos y atletas de élite recurren a estas cuadrículas para reducir los tiempos de reacción sacádica y sostener la agudeza atencional bajo situaciones de estrés competitivo (Woods et al., 2015)."
  ],
  benchmarks: {
    title: "Baremos de Rendimiento y Rango de Visión Periférica",
    headers: ["Nivel de Rendimiento", "Puntuación (45s)", "Cuadrícula Máxima", "Interpretación Neurocognitiva"],
    rows: [
      ["Élite (Pilotos / Esports Pro)", "7.500+ pts", "7x7 o superior", "Excelente amplitud de visión parafoveal. Mínima latencia sacádica, localización simultánea de dígitos adyacentes sin fijación central obligatoria."],
      ["Avanzado (Lectores Rápidos)", "5.500 – 7.499 pts", "6x6 – 7x7", "Gran disciplina atencional. Capacidad constante de pre-planificación de movimientos oculares (Lookahead Saccades) sin saltos erráticos."],
      ["Competente (Promedio Entrenado)", "3.500 – 5.499 pts", "5x5 – 6x6", "Búsqueda visual organizada. Ligera desaceleración ante dígitos rotados o en las esquinas más alejadas de la cuadrícula."],
      ["Intermedio", "2.000 – 3.499 pts", "4x4 – 5x5", "Dependencia de movimientos oculares fóvea a fóvea. Tendencia a perder el ritmo al pasar de una fila a otra."],
      ["Principiante", "< 2.000 pts", "3x3 – 4x4", "Búsqueda desordenada con frecuentes regresiones oculares. Dificultad para inhibir distractores numéricos cercanos."]
    ],
    note: "Puntuaciones basadas en sesiones fijas de 45 segundos sin tiempo añadido. Las cuadrículas limpiadas con precisión superior al 95% reflejan un control óptimo de la atención sostenida."
  },
  techniques: {
    title: "Protocolos y Estrategias Científicas de Optimización",
    items: [
      {
        name: "Anclaje Central Fóveo-Parafoveal",
        desc: "Mantén la mirada descansada en el centro geométrico de la matriz. En lugar de mover activamente los ojos hacia cada número, permite que la visión parafoveal detecte las siluetas numéricas en los bordes (Lu et al., 2022).",
        tips: "Evita girar la cabeza o perseguir los dígitos uno por uno con la mirada."
      },
      {
        name: "Técnica de Anticipación Doble (Lookahead Chunking)",
        desc: "Mientras tu mano se desplaza para pulsar el número actual (por ejemplo, el 4), tus ojos ya deben estar identificando y almacenando en la memoria de trabajo visuoespacial la posición del siguiente (el 5) (Rayner, 1998).",
        tips: "Nunca busques un solo dígito de manera aislada; procesa siempre en parejas secuenciales."
      },
      {
        name: "Búsqueda Guiada e Integración de Rasgos (Wolfe, 2007)",
        desc: "Las expectativas cognitivas de arriba hacia abajo (Top-Down) modulan los mapas de saliencia de la corteza visual. Mantener viva la forma geométrica del próximo número activa selectivamente los detectores de rasgos neuronales.",
        tips: "Visualiza mentalmente la forma del siguiente número antes de escanear la tabla."
      },
      {
        name: "Invarianza a la Rotación Perceptual",
        desc: "Los números invertidos o inclinados rompen las plantillas visuales habituales. La vía ventral del cerebro debe extraer características estructurales invariantes (como el bucle del 6/9 o el travesaño del 4) para confirmar el objetivo.",
        tips: "Identifica elementos clave de la forma en lugar de intentar enderezar el número mentalmente."
      }
    ]
  },
  steps: [
    "Coloca tu mirada de forma suave en el centro de la cuadrícula.",
    "Ubica el número 1 y pulsa sobre él para activar el conteo secuencial.",
    "Aplica anticipación visual: al pulsar el número actual, busca periféricamente el siguiente.",
    "Avanza rápidamente para desbloquear cuadrículas superiores de 5x5, 6x6 y 7x7.",
    "Mantén la concentración frente a dígitos rotados durante los 45 segundos ininterrumpidos."
  ],
  audience: "Lectores rápidos, estudiantes, pilotos, atletas de alto rendimiento, competidores de videojuegos tácticos y entusiastas del biohacking cerebral que buscan expandir su foco visual.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('lu2022', 'treisman1980', 'rayner1998', 'rayner2016', 'wolfe2007', 'woods2015'),
  related: [
    { href: "/drills/cognitive/attention/concentration-stamina", label: "Test de Atención Sostenida" },
    { href: "/drills/cognitive/focus/distraction-fighter", label: "Test Stroop Online" },
    { href: "/drills/cognitive/attention/divided-attention", label: "Test de Atención Dividida" },
    { href: "/drills/cognitive/processing-speed/rsvp-reader", label: "Test de Lectura Rápida" },
    { href: "/drills/cognitive/processing-speed/symbol-matching", label: "Test de Sustitución de Símbolos" },
    { href: "/drills/cognitive/processing-speed/reaction-time", label: "Test de Velocidad de Reacción" }
  ]
};

const copyEs = {
  h1Keyword: "Tabla de Schulte",
  h1Suffix: " Online – Rejilla de Concentración",
  caption: "Pulsa los números en estricto orden secuencial sobre cuadrículas Schulte en continua expansión. Entrena tu visión periférica, velocidad de búsqueda visual y resistencia atencional.",
  statScore: "Puntos",
  statTime: "Tiempo",
  statGridSize: "Cuadrícula",
  statBest: "Récord",
  hudTarget: "Objetivo:",
  startTitle: "Tabla de Schulte Trainer",
  startSubtitle: "Búsqueda Numérica Secuencial • Cuadrículas Schulte Dinámicas",
  startButtonText: "Iniciar Entrenamiento",
  getReady: "PREPÁRATE",
  statPoints: "Puntos",
  statAccuracy: "Precisión",
  statGridsCleared: "Completadas",
  statPeakGrid: "Máx. Cuadrícula",
  playAgainText: "Jugar de Nuevo",
  shareText: "Compartir Resultado",
  exitText: "Salir",
  stageCaption: "Encuentra y pulsa los números en orden ascendente en cuadrículas cada vez mayores antes de que expire el tiempo.",
  rulesTitle: "Reglas y Sistema de Puntuación",
  rulesItems: [
    { title: "Búsqueda Secuencial", text: "Toca los números en orden numérico estricto desde el 1 hasta el número más alto de la matriz." },
    { title: "Cuadrículas en Expansión", text: "Completar una cuadrícula te hace avanzar a tamaños mayores (3x3 → 4x4 → 5x5...), retando tu visión periférica." },
    { title: "Sesión Fija de 45s", text: "Dispones de una única ventana de 45 segundos. Cada cuadrícula limpia amplía el tablero sin alterar el reloj." },
    { title: "Precisión y Enfoque", text: "Los toques incorrectos emiten un destello de aviso y reducen tu precisión final, pero no detienen la sesión." }
  ],
  aboutTitle: "Acerca de la Tabla de Schulte y Rejilla de Concentración",
  aboutLead: "La tabla de Schulte es una cuadrícula psicodiagnóstica de búsqueda visual concebida para ensanchar el campo periférico funcional y minimizar la latencia de fijación durante la lectura y exploración visual (Lu et al., 2022; Rayner, 1998).",
  aboutCards: [
    { title: "¿Quién debería usarla?", text: "Atletas de élite, pilotos, estudiantes y competidores de deportes electrónicos que necesitan procesar información visual a gran velocidad.", color: "bg-blue-600" },
    { title: "Habilidades Desarrolladas", text: "Velocidad de escaneo visual, eficiencia en movimientos sacádicos, disciplina espacial y resistencia atencional.", color: "bg-emerald-600" },
    { title: "Visión Periférica", text: "Cada nivel superado amplía la cuadrícula, forzando a la retina a abarcar un campo visual mucho más ancho sin perder la secuencia.", color: "bg-purple-600" }
  ]
};

export default function ConcentrationGridPageEs() {
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

      <ConcentrationGridClient copy={copyEs} />
      <DrillGuide guide={concentrationGridGuideEs} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="/drills/cognitive/focus/concentration-grid" locale="es" />
      </div>
    </>
  );
}
