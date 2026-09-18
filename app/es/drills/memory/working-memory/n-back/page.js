import NBackClient from '@/app/drills/memory/working-memory/n-back/NBackClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — es-ES / es-LATAM (n-back)
// PRIMARY:  "test n-back online"          — High intent Spanish query (15 suggestions: online, test)
//           "tarea n-back"                — Academic / neurocognitive query (15 suggestions: memoria de trabajo)
// SECONDARY / LSI:
//           "tarea n back memoria de trabajo" — Core mechanism query
//           "dual n-back online"          — Web training query
//           "memoria de trabajo test"     — Domain assessment query
// ============================================================

export const metadata = {
  title: "Test N-Back Online – Memoria de Trabajo | SkillDrills",
  description: "Test N-back online gratis: Evalúa y entrena la memoria de trabajo, el control ejecutivo y la actualización continua en 2-back y 3-back en el navegador.",
  keywords: ['test n-back online', 'entrenamiento memoria de trabajo', 'tarea n-back', 'dual n-back online', 'memoria de trabajo test', 'ejercicios de memoria de trabajo', 'inteligencia fluida n-back', 'actualizacion memoria de trabajo', 'test 3-back gratis', 'control ejecutivo test', 'evaluacion neuropsicologica n-back', 'entrenamiento cognitivo online'],
  openGraph: {
    title: "Test N-Back Online – Entrenamiento de Memoria de Trabajo Gratis | SkillDrills",
    description: "Test N-back online gratis. Evalúa y entrena la actualización continua de la memoria de trabajo, el control ejecutivo y la inteligencia fluida a 2-back, 3-back y niveles superiores.",
    type: "website",
    url: "https://skilldrills.online/es/drills/memory/working-memory/n-back",
    siteName: "SkillDrills",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Test N-Back Online – Entrenamiento de Memoria de Trabajo Gratis | SkillDrills",
    description: "Test N-back online gratis. Evalúa y entrena la actualización continua de la memoria de trabajo, el control ejecutivo y la inteligencia fluida a 2-back, 3-back y niveles superiores.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/es/drills/memory/working-memory/n-back",
    languages: getAlternateLanguages('/drills/memory/working-memory/n-back'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Entrenamiento de Memoria", "item": "https://skilldrills.online/es/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "Memoria de Trabajo", "item": "https://skilldrills.online/es/drills/memory/working-memory" },
    { "@type": "ListItem", "position": 4, "name": "Test N-Back Online", "item": "https://skilldrills.online/es/drills/memory/working-memory/n-back" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test N-Back Online (Tarea N-Back Memoria de Trabajo)",
  "url": "https://skilldrills.online/es/drills/memory/working-memory/n-back",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11",
  "educationalUse": ["Capacidad de Memoria de Trabajo", "Actualización Continua", "Control Ejecutivo", "Inteligencia Fluida"]
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Juego Test N-Back Online – Memoria y Concentración",
  "url": "https://skilldrills.online/es/drills/memory/working-memory/n-back",
  "description": "Juego cognitivo gratuito en el navegador para entrenar la actualización de memoria comparando letras N pasos atrás.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Cognitive Training", "Working Memory", "Brain Training", "N-Back"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test N-Back Online (Dual N-Back)",
  "url": "https://skilldrills.online/es/drills/memory/working-memory/n-back",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar la Memoria de Trabajo con el Test N-Back",
  "description": "Estrategia de 4 pasos basada en neurociencia para dominar la actualización continua en tareas N-Back.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/es/drills/memory/working-memory/n-back#step-1",
      
      "name": "Subvocalizar la ventana objetivo como cola circular",
      "text": "Recite mentalmente la secuencia de letras activa en orden cronológico, manteniendo un búfer interno deslizante (por ej., sosteniendo 'A-T-M' en 3-back)."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/es/drills/memory/working-memory/n-back#step-2",
      
      "name": "Comparar el estímulo actual con el elemento de N pasos atrás",
      "text": "Cuando aparezca un nuevo estímulo, compárelo de inmediato con el elemento más antiguo de su búfer activo."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/es/drills/memory/working-memory/n-back#step-3",
      
      "name": "Expulsar el elemento más antiguo y añadir el nuevo",
      "text": "Ejecute una actualización mental inmediata: descarte el elemento verificado y añada la letra entrante al frente de la cola mental."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/es/drills/memory/working-memory/n-back#step-4",
      
      "name": "Mantener un ritmo atencional constante sin dudar",
      "text": "Regule su ritmo y no se detenga ante errores. En flujos continuos, dudar sobre un fallo causa la pérdida en cascada de los siguientes elementos."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el test de memoria de trabajo N-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El test N-Back es una evaluación neurocognitiva clásica que mide la actualización continua de la memoria de trabajo. Los participantes observan una secuencia de estímulos e indican si el elemento actual coincide con el presentado N pasos antes."
      }
    },
    {
      "@type": "Question",
      "name": "¿Quién inventó la tarea N-Back y cuál fue su propósito original?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wayne K. Kirchner inventó la tarea N-Back en 1958 para investigar las diferencias asociadas a la edad en la retención a corto plazo de información en rápida transformación."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué facultad cognitiva evalúa principalmente el test N-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evalúa fundamentalmente la actualización del búfer de memoria de trabajo y el control ejecutivo en la corteza prefrontal dorsolateral (DLPFC)."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué se diferencia el N-Back de los tests de amplitud de dígitos (Digit Span)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los tests de amplitud pasivos miden almacenamiento temporal estático. N-Back exige manipulación activa continua: ante cada estímulo se debe descartar el elemento más antiguo e ingresar el más reciente."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puede el entrenamiento N-Back mejorar la inteligencia fluida (CI)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El célebre estudio de Jaeggi et al. (2008, PNAS) demostró que el entrenamiento N-back adaptativo produjo mejoras en la inteligencia fluida (Gf) en tareas de razonamiento matricial no verbal."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la puntuación o precisión promedio en adultos en 3-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Adultos jóvenes sanos suelen rendir con un 65% a 80% de precisión en una tarea 3-back estándar. Lograr más del 85% de manera sostenida refleja un control ejecutivo superior."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre Single N-Back y Dual N-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Single N-Back presenta un solo flujo de estímulos (letras visuales). Dual N-Back presenta dos flujos sensoriales independientes a la vez (típicamente posiciones espaciales y consonantes sonoras)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo ayuda el repaso articulatorio subvocal en N-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Subvocalizar activa el bucle fonológico (Baddeley, 1986). Repetir mentalmente la secuencia activa N evita el decaimiento espontáneo de la huella mnémica."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué decae drásticamente el rendimiento en 4-Back y 5-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Según el modelo de Nelson Cowan (2001), el foco atencional consciente tiene un límite biológico de 4±1 unidades no agrupadas. Superar ese umbral genera interferencias cognitivas severas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo se transfiere la memoria de trabajo a la vida real?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Facilita la toma de decisiones complejas, el seguimiento de múltiples variables financieras en tiempo real, la comprensión lectora profunda, la depuración de código y la agilidad táctica en esports."
      }
    }
  ]
};

const nBackClientCopyEs = {
  h1Keyword: "Test N-Back Online",
  h1Suffix: " – Memoria de Trabajo",
  caption: "La tarea N-back evalúa la capacidad de determinar si el estímulo actual coincide con el presentado exactamente N pasos atrás. Este paradigma combina almacenamiento temporal y actualización activa (Baddeley & Hitch, 1974; Cowan, 2001).",
  statScore: "Puntuación",
  statTime: "Tiempo",
  statLevel: "Nivel",
  statBest: "Récord",
  hudScore: "Puntuación",
  hudTime: "Tiempo",
  modeSuffix: "-BACK ENTRENAMIENTO",
  memorizingText: "Memorizando las primeras {n} letras...",
  btnMatch: "COINCIDE (MATCH)",
  btnNoMatch: "NO COINCIDE",
  startTitle: "Dual N-Back Pro",
  startSubtitle: "Memoria de Trabajo • Actualización Continua",
  countdownSubtitle: "PREPÁRATE",
  newBest: "NUEVO RÉCORD",
  pointsLabel: "Puntos",
  statAccuracy: "Precisión",
  statPeakLevel: "Nivel Máximo",
  statPerfects: "Aciertos",
  btnPlayAgain: "Jugar de nuevo",
  rulesTitle: "Instrucciones y Sistema de Puntuación",
  rulesItems: [
    { num: "1", text: "Coincide / No Coincide (N Pasos Atrás)", highlight: "+150 PTS", result: "Por cada juicio correcto" },
    { num: "2", text: "Progresión de Nivel", highlight: "3-Back → 4-Back+", result: "Cada 1.200 puntos acumulados" },
    { num: "3", text: "Aceleración de Estímulos", highlight: "2.000 ms → 1.200 ms", result: "Mayor velocidad en niveles altos" },
    { num: "4", text: "Tiempo Agotado (Sin Respuesta)", highlight: "Sin Penalización", result: "Sin pérdida de puntos ni tiempo" },
    { num: "5", text: "Juicio Erróneo", highlight: "Rompe la Racha", result: "No descuenta tiempo — dura los 45 s completos" }
  ]
};

const guideEs = {
  heading: "Guía del Test N-Back y Baremos de Rendimiento",
  intro: [
    "El test de memoria de trabajo N-Back es el paradigma neuropsicológico de referencia para evaluar la actualización continua de la información, el control cognitivo ejecutivo y el mantenimiento activo bajo presión temporal. Originado en las investigaciones pioneras de Wayne K. Kirchner (1958), se ha consolidado como un estándar esencial en neurociencia cognitiva.",
    "A diferencia de las pruebas de memoria pasivas, N-Back exige la actualización constante de un búfer mental dinámico. A medida que las letras aparecen en rápida sucesión, el usuario debe decidir si la letra actual coincide con la mostrada exactamente N pasos antes.",
    "Metodología de medición: todos los eventos se registran localmente con el reloj de alta resolución performance.now() de su navegador; ningún dato es transmitido a servidores. Considere diferencias menores a 5 ms como variabilidad de medición normal y compare sus marcas en el mismo dispositivo.",
    "Transparencia: SkillDrills no almacena datos de rendimiento de los usuarios. Todas las puntuaciones quedan guardadas exclusivamente en el almacenamiento local (localStorage) de su navegador.",
    "Este ejercicio es un juego en línea gratuito con fines de entrenamiento y estimulación mental. No constituye un dispositivo médico ni un test diagnóstico clínico."
  ],
  metrics: [
    { label: "Nivel N-Back Máximo", desc: "Mayor profundidad alcanzada (3-Back estándar, 4-Back avanzado, 5-Back+ élite)." },
    { label: "Puntuación Total", desc: "Puntos acumulados en la sesión de 45 segundos (+150 PTS por acierto)." },
    { label: "Precisión de Juicio", desc: "Porcentaje de decisiones correctas de coincidencia y no coincidencia." },
    { label: "Tasa de Actualización", desc: "Velocidad de decisión y latencia durante la exposición de los estímulos." }
  ],
  benchmarks: [
    { tier: "Tier 1: Memoria de Trabajo Superior (Élite / Percentil 99)", range: "4-Back a 5-Back+ (1.200+ Puntos)", desc: "Control ejecutivo sobresaliente; cola mental FIFO de 4 a 5 ítems; latencia inferior a 600 ms; precisión superior al 92%." },
    { tier: "Tier 2: Alto Promedio (Control Firme / Percentil 85–95)", range: "3-Back sólido con paso a 4-Back (900 – 1.199 Puntos)", desc: "Supera el estándar promedio; actualización 3-back con mínimos fallos de intrusión; precisión del 80% al 91%." },
    { tier: "Tier 3: Promedio Normal Adulto (Percentil 50)", range: "3-Back Estable (600 – 899 Puntos)", desc: "Línea base adulta normativa (Kirchner, 1958); mantiene búfer de 3 ítems con pérdidas esporádicas; precisión del 65% al 79%." },
    { tier: "Tier 4: Bajo Promedio (Percentil 15–30)", range: "3-Back Inconsistente (400 – 599 Puntos)", desc: "Dificultades con la actualización continua de 3 elementos; interferencia por familiaridad; precisión del 50% al 64%." },
    { tier: "Tier 5: Necesita Mejora (< Percentil 15)", range: "Inferior a 3-Back (< 400 Puntos)", desc: "Cuello de botella severo en la actualización de memoria; frecuentes tiempos agotados; precisión inferior al 50%." }
  ],
  science: [
    { title: "Wayne K. Kirchner (1958): Origen del paradigma N-Back", body: "Introdujo la tarea en 1958 para evaluar la retención de datos en constante cambio con la edad." },
    { title: "Alan Baddeley (1986, 2000): Control ejecutivo central", body: "En el modelo multicomponente, N-back mide la coordinación entre el bucle fonológico y la corteza prefrontal." },
    { title: "Adele Diamond (2013): Tríada de funciones ejecutivas", body: "Identificó la actualización de memoria de trabajo, el control inhibitorio y la flexibilidad cognitiva." },
    { title: "Susanne M. Jaeggi et al. (2008): Transferencia a inteligencia fluida", body: "Demostró incrementos en pruebas de matrices progresivas tras entrenamiento N-back adaptativo." },
    { title: "Nelson Cowan (2001): Restricción de capacidad 4±1", body: "Demostró que el foco atencional consciente abarca cerca de 4 elementos independientes." },
    { title: "David L. Woods et al. (2015): Estándares cronométricos cognitivos", body: "Normalizó métricas de latencia de reacción y sensibilidad d' con precisión de milisegundos." }
  ],
  protocols: [
    { title: "Subvocalización en cola deslizante", body: "Repita interiormente la tríada activa con ritmo constante (p. ej. 'B-M-T' pasando a ser 'M-T-R')." },
    { title: "Inhibición activa frente a estímulos trampa", body: "Freney controle el impulso de marcar estímulos que se presentaron hace 1 o 2 pasos en vez de 3." },
    { title: "Doble codificación fonológico-espacial", body: "Visualice 3 casillas donde cada letra se desplaza hacia la izquierda con cada nueva entrada." },
    { title: "Reinicio atencional instantáneo", body: "Si pierde la secuencia, no intente recordar el pasado: tome la siguiente letra como punto 1 y reconstruya el búfer." }
  ],
  sources: pickSources('baddeley1974', 'baddeley1986', 'cowan2001', 'woods2015'),
  faqs: [
    { q: "¿Qué es el test de memoria de trabajo N-Back?", a: "Evaluación neurocognitiva que mide la actualización continua de la memoria de trabajo ante estímulos dinámicos." },
    { q: "¿Quién inventó la tarea N-Back y cuál fue su propósito original?", a: "Wayne K. Kirchner en 1958, para estudiar los cambios en la retención de información con el envejecimiento." },
    { q: "¿Qué facultad cognitiva evalúa principalmente el test N-Back?", a: "La actualización activa de la memoria de trabajo y el control ejecutivo prefrontal." },
    { q: "¿En qué se diferencia el N-Back de los tests de amplitud de dígitos?", a: "N-Back requiere manipulación y reemplazo continuo en lugar de almacenamiento pasivo." },
    { q: "¿Puede el entrenamiento N-Back mejorar la inteligencia fluida (CI)?", a: "Estudios científicos avalan mejoras significativas en razonamiento y control atencional." },
    { q: "¿Cuál es la puntuación o precisión promedio en adultos en 3-Back?", a: "Entre el 65% y el 80% de aciertos en población adulta sana." },
    { q: "¿Cuál es la diferencia entre Single N-Back y Dual N-Back?", a: "Single sigue un canal sensorial; Dual entrena visual y auditivo de forma simultánea e independiente." },
    { q: "¿Cómo ayuda el repaso articulatorio subvocal en N-Back?", a: "Mantiene activas las huellas auditivas dentro del bucle fonológico impidiendo su pérdida." },
    { q: "¿Por qué decae drásticamente el rendimiento en 4-Back y 5-Back?", a: "Porque sobrepasa el límite biológico del foco de atención humana de 4±1 ítems (Cowan, 2001)." },
    { q: "¿Cómo se transfiere la memoria de trabajo a la vida real?", a: "Potencia la agilidad mental en análisis de datos, lectura compleja, programación y toma de decisiones tácticas." }
  ],
  related: [
    { href: "/es/drills/memory/spatial-memory/path-tracing", title: "Test de Trazado de Rutas", desc: "Retener rutas espaciales dinámicas sobre matrices progresivas." },
    { href: "/es/drills/memory/spatial-memory/grid-memorization", title: "Test de Memoria Visual de Cuadrícula", desc: "Memorizar patrones de tablero 2D y medir la capacidad de caché visual." },
    { href: "/es/drills/memory/spatial-memory/object-location", title: "Test de Localización de Objetos", desc: "Evaluar la memoria espacial y relacional de objetos en mapas multidivisión." },
    { href: "/es/drills/memory/short-term-memory/digit-span", title: "Test de Retención de Dígitos (Digit Span)", desc: "Medir la capacidad numérica hacia adelante y el bucle fonológico." },
    { href: "/es/drills/memory/short-term-memory/word-recall", title: "Test de Memoria Verbal", desc: "Evaluar el recuerdo inmediato y la categorización bajo presión temporal." },
    { href: "/es/drills/memory/short-term-memory/color-sequence", title: "Juego de Memoria de Colores", desc: "Recordar secuencias progresivas de colores a velocidades ascendentes." }
  ]
};

export default function NBackPageEs() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <NBackClient copy={nBackClientCopyEs} />

      <DrillGuide
        lead={guideEs.lead}
        metrics={guideEs.metrics}
        benchmarks={guideEs.benchmarks}
        science={guideEs.science}
        protocols={guideEs.protocols}
        sources={guideEs.sources}
        faqs={guideEs.faqs}
        related={guideEs.related}
      />

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="memory" currentHref="/drills/memory/working-memory/n-back" locale="es" />
      </div>
    </>
  );
}
