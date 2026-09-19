import TargetPrioritizationClient from '@/app/drills/fps/target-prioritization/TargetPrioritizationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Priorización de Objetivos FPS – Mira Táctica | SkillDrills",
  description: "Entrena priorización de objetivos, evaluación de amenazas y disciplina de gatillo en el navegador. Domina la toma de decisiones para Valorant y CS2 gratis.",
  keywords: [
    "entrenamiento de priorizacion de objetivos",
    "priorizacion de blancos fps",
    "evaluacion de amenazas fps",
    "control de impulsos disparo",
    "como elegir objetivo en tiroteo",
    "entrenamiento de toma de decisiones fps",
    "disciplina de gatillo shooter",
    "seleccion de objetivos valorant",
    "entrenador de punteria cognitiva",
    "identificacion de blancos shooter",
    "entrenamiento reflejo go no go",
    "ejercicio de priorizacion de objetivos"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/fps/target-prioritization",
    languages: getAlternateLanguages('/drills/fps/target-prioritization'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Priorización de Objetivos FPS – Mira Táctica | SkillDrills",
    description: "Entrena priorización de objetivos, evaluación de amenazas y disciplina de gatillo en el navegador. Domina la toma de decisiones para Valorant y CS2 gratis.",
    url: "https://skilldrills.online/es/drills/fps/target-prioritization",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Priorización de Objetivos FPS – Mira Táctica | SkillDrills",
    description: "Entrena priorización de objetivos, evaluación de amenazas y disciplina de gatillo en el navegador. Domina la toma de decisiones para Valorant y CS2 gratis.",
  },
};

export default function TargetPrioritizationEsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Ejercicios FPS", "item": "https://skilldrills.online/es/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Priorización de Objetivos", "item": "https://skilldrills.online/es/drills/fps/target-prioritization" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenador de Priorización de Objetivos FPS",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entrenador cognitivo de priorización de blancos, toma de decisiones y control de inhibición de disparo (Go/No-Go) para shooters tácticos.",
    "genre": "Entrenamiento FPS / Puntería Cognitiva y Toma de Decisiones",
    "url": "https://skilldrills.online/es/drills/fps/target-prioritization",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entrenador de Priorización de Objetivos FPS",
    "url": "https://skilldrills.online/es/drills/fps/target-prioritization",
    "description": "Entrenador cognitivo de priorización de blancos, toma de decisiones y control de inhibición de disparo (Go/No-Go) para shooters tácticos.",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requiere soporte de HTML5 Canvas y Pointer Lock API",
    "dateModified": "2026-09-16"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Entrenador de Priorización de Objetivos FPS",
    "url": "https://skilldrills.online/es/drills/fps/target-prioritization",
    "description": "Entrenador cognitivo de priorización de blancos, toma de decisiones y control de inhibición de disparo (Go/No-Go) para shooters tácticos.",
    "dateModified": "2026-09-16",
    "gamePlatform": "Web Browser",
    "genre": ["Entrenamiento FPS", "Aim Trainer", "Priorización de Objetivos"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es la priorización de objetivos en shooters FPS competitivos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La priorización de objetivos es la función cognitiva ejecutiva que evalúa velozmente múltiples amenazas en pantalla, determina cuál posee el mayor peligro inmediato y la neutraliza primero, conteniendo el disparo ante blancos secundarios y aliados."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué los jugadores disparan en pánico al blanco equivocado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bajo niveles intensos de adrenalina, el sistema visual prioriza estímulos visuales primarios disparando al elemento más cercano en vez del más letal. El entrenamiento de inhibición ejecutiva entrena al cerebro para mantener el control bajo tensión."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo se aplica el paradigma Go/No-Go al juego táctico?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Introducido por Franciscus Donders (1868), el método Go/No-Go evalúa la capacidad de ejecutar un disparo inmediato ante estímulos válidos y suprimir el clic ante blancos neutrales o aliados, evitando el fuego amigo y la pérdida de ventaja posicional."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es el Tiempo de Reacción de Señal de Parada (SSRT)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El SSRT (Logan & Cowan, 1984) mide el tiempo que toma frenar una acción motora ya activada. En shooters, los tiradores profesionales cancelan el disparo en unos 200–240 ms al percatarse de que el cursor apunta hacia un aliado o señuelo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo ordenan las amenazas los jugadores profesionales en las entradas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los profesionales clasifican los objetivos por línea de visión directa, letalidad del armamento rival y tiempo hasta el primer disparo. Los enemigos que ya están apuntando hacia ti se abaten con prioridad sobre rivales en movimiento de espaldas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es la supresión de distractores en neurociencia visual?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es el mecanismo de atención selectiva que inhibe la respuesta a estímulos irrelevantes (Treisman, 1980), permitiendo mantener la vista central en la amenaza principal sin dejarse engañar por señuelos perimetrales."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el coste de disparar a aliados o señuelos en Valorant y CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Disparar a señuelos (como clones de Yoru o granadas señuelo) delata tu posición acústica, gasta munición y desvía la mira del oponente real, ocasionando la pérdida directa del asalto."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué sensibilidad de ratón optimiza la toma de decisiones en tiroteos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Una sensibilidad equilibrada a media-baja (30 a 42 cm por 360°) proporciona excelente poder de frenado en la alfombrilla, evitando que la retícula se desplace involuntariamente al blanco erróneo en zonas pobladas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué la adrenalina excesiva empeora la selección de objetivos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La activación simpática extrema produce visión de túnel y satura la memoria operativa, limitando la capacidad de procesar múltiples blancos sin un entrenamiento cognitivo regular."
        }
      },
      {
        "@type": "Question",
        "name": "¿Con qué frecuencia se debe practicar la priorización táctica?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dedicar 10 minutos a ejercicios de priorización y disciplina de gatillo antes de competir afianza la toma de decisiones y el autocontrol del clic sin agotar los tendones de la mano."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Dominar la Priorización de Objetivos y la Disciplina de Disparo",
    "description": "Procedimiento paso a paso para configurar la sensibilidad, categorizar amenazas y abatir blancos en el orden óptimo.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrar Sensibilidad y Entrada Directa 1:1",
        "text": "Establece tus DPI y sensibilidad idénticos a los del juego de referencia para garantizar memoria neuromuscular precisa.",
        "url": "https://skilldrills.online/es/drills/fps/target-prioritization#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Reconocer la Jerarquía de Colores",
        "text": "Asocia los objetivos rojos como amenaza prioritaria (+100 PTS), los amarillos como secundarios (+50 PTS) y los verdes como aliados prohibidos.",
        "url": "https://skilldrills.online/es/drills/fps/target-prioritization#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Abatir Objetivos Rojos Críticos de Inmediato",
        "text": "Realiza un flick preciso hacia los blancos rojos antes de que sus temporizadores se agoten y resten puntuación.",
        "url": "https://skilldrills.online/es/drills/fps/target-prioritization#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Inhibir el Disparo ante Aliados Verdes",
        "text": "Suprime deliberadamente el clic al pasar la cruceta cerca de blancos verdes para mantener intacto tu multiplicador de combo.",
        "url": "https://skilldrills.online/es/drills/fps/target-prioritization#step-4"
      }
    ]
  };

  const targetPrioritizationGuide = {
    heading: "Guía de Priorización de Objetivos FPS y Biomecánica de la Decisión Táctica",
    intro: [
      "El simulador de Priorización de Objetivos es un entrenamiento perceptual-cognitivo desarrollado para afianzar la evaluación instantánea de amenazas, el filtrado atencional y el control de inhibición motora de disparo. En títulos competitivos modernos — especialmente Valorant, Counter-Strike 2, Rainbow Six Siege y Apex Legends — las situaciones de tiroteo con múltiples enemigos se ganan con el orden de impacto: el jugador que abate la amenaza más letal en primer lugar sobrevive al intercambio.",
      "La base neuropsicológica de la inhibición motora fue explicada por Gordon D. Logan y William B. Cowan (1984) con el modelo horse-race: cuando aparece una señal de detención, la orden inhibitoria compite contra la orden motora que ya está en curso. Abortar un clic en proceso exige circuitos dedicados en la corteza prefrontal, explicando por qué los disparos involuntarios son el error más habitual en rangos intermedios.",
      "Integrando la cronometría mental de Franciscus Cornelis Donders (1868/1969) para tiempos de reacción de elección y la teoría de integración de rasgos de Anne Treisman y Garry Gelade (1980), esta práctica obliga al sistema visual a clasificar los blancos por su nivel de peligro antes de autorizar el clic.",
      "Al combinar el modelo de atención orientada de Michael I. Posner (1990), los paradigmas espaciales de C. Shawn Green y Daphne Bavelier (2003) y la medición digital precisa (Woods et al., 2015), el ejercicio erradica el tiro impulsivo y afianza reflejos analíticos bajo fuego enemigo.",
      "Cómo se evalúa: cada disparo se cronometra en milisegundos mediante performance.now() en el navegador de manera local sin transferencia externa. Factores del equipo: los relojes web presentan 1 ms de granularidad típica, y las pantallas actualizan en ciclos de 16,7 ms (60 Hz), 6,9 ms (144 Hz) y 4,1 ms (240 Hz). El polling rate del ratón suma cerca de 8 ms a 125 Hz frente a 1 ms a 1000 Hz (Woods et al., 2015). Evalúa tus registros siempre con la misma configuración."
    ],
    benchmarks: {
      title: "Baremos Científicos de Evaluación de Amenazas y Latencia de Decisión",
      headers: ["Nivel de Rendimiento", "Latencia de Resolución", "Precisión de Prioridad", "Impacto Competitivo en Partida"],
      rows: [
        ["Tier 1 (Apex Commander / Radiant)", "<280 ms", "96% – 99%+", "Evaluación intachable de amenazas; eliminación instantánea del peligro crítico con 0% de fuego amigo en entradas caóticas"],
        ["Tier 2 (Maestro Competitivo / Pro Tier-2)", "280 – 340 ms", "90% – 96%", "Rapidez de decisión excepcional; pronta recuperación tras escaladas de blancos; menos del 1% de disparos errados"],
        ["Tier 3 (Diamante / Ascendente)", "340 – 420 ms", "82% – 90%", "Fijación consistente de prioridades; duda sutil de 60 a 90 ms cuando coinciden amenazas rojas y amarillas contiguas"],
        ["Tier 4 (Intermedio / Oro / Platino)", "420 – 520 ms", "72% – 82%", "Propenso al disparo por pánico; en ocasiones impacta en verdes aliados o dispara a amarillos antes de despejar rojos"],
        ["Tier 5 (Iniciación / Disparo por Impulso)", ">520 ms", "<72%", "Frecuentes fallos de impulsividad; elevado fuego amigo; dificultad para filtrar elementos visuales en retakes"]
      ],
      note: "La latencia de resolución registra el tiempo desde que surge el blanco rojo de alta amenaza hasta el impacto validado; la precisión de prioridad divide los aciertos válidos entre los clics totales (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Respaldados por Evidencia para Dominar la Priorización",
      items: [
        {
          name: "Inhibición de Respuesta Ejecutiva (Disciplina Go/No-Go)",
          desc: "Ejercita la contención deliberada del clic inmediato al detectar movimiento. Condiciona el dedo a esperar la verificación del color en la corteza visual antes de accionar el interruptor del ratón.",
          tips: "Mantén el dedo apoyado con suavidad sobre el botón izquierdo, sin generar tensión muscular previa."
        },
        {
          name: "Inspección Dinámica de la Jerarquía de Peligro",
          desc: "Explora la escena buscando en primer lugar el color de mayor amenaza (rojo). Elimina ese blanco primordial antes de prestar atención a las amenazas secundarias en cuenta atrás (amarillo).",
          tips: "Resuelve los objetivos rojos antes de cualquier otra acción; considera los amarillos como amenazas en transición."
        },
        {
          name: "Supresión de Distractores Periféricos",
          desc: "Aprende a desestimar elementos neutros o aliados verdes que surjan en la periferia de la vista, manteniendo el foco visual en los sectores con enemigos activos.",
          tips: "No desvíes la cruceta hacia objetivos verdes aunque aparezcan muy cerca de la retícula."
        },
        {
          name: "Puntería Balística Cadenciada y Parada Firme",
          desc: "Lanza cada flick como un gesto motor intencionado y firme. Desplaza la mira con velocidad al centro del objetivo crítico y frena con decisión sobre la alfombrilla.",
          tips: "Es preferible un movimiento cadenciado y seguro a movimientos espasmódicos sin control cromático."
        }
      ]
    },
    steps: [
      "Ajusta tu juego de referencia, DPI y sensibilidad en las opciones para mantener una escala 1:1 exacta con tu juego habitual.",
      "Dirige la vista al centro de la pantalla y aguarda la salida simultánea de blancos rojos, amarillos y verdes.",
      "Detecta y neutraliza los objetivos rojos de alta prioridad con disparos veloces (+100 PTS / +0,4s de tiempo añadido).",
      "Elimina los blancos amarillos secundarios (+50 PTS / +0,4s) antes de que cambien a color rojo.",
      "Contén por completo el disparo ante objetivos verdes aliados; dispararles o fallar reinicia de inmediato tu multiplicador de combo."
    ],
    audience: "Jugadores competitivos de Valorant, Counter-Strike 2, Rainbow Six Siege y Apex Legends que buscan erradicar el clic por impulso, perfeccionar la disciplina de disparo y resolver tiroteos con múltiples blancos.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'posner1990', 'green2003', 'donders1969', 'treisman1980', 'logan1984'),
    related: [
      { href: "/es/drills/fps/target-acquisition", label: "Entrenamiento de Adquisición de Objetivos" },
      { href: "/es/drills/fps/target-switching-swarm", label: "Entrenamiento de Target Switching Swarm" },
      { href: "/es/drills/fps/vertical-air-track", label: "Entrenamiento de Rastreo Aéreo Vertical" },
      { href: "/es/drills/fps/strafe-tracking", label: "Entrenamiento de Strafe Tracking" },
      { href: "/es/drills/fps/flick-shot-training", label: "Entrenamiento de Flick Shot" }
    ]
  };

  const copyEs = {
    h1Keyword: "Priorización de Objetivos FPS",
    h1Suffix: " – Toma de Decisiones",
    subtitle: "Entrena evaluación de amenazas, filtrado cognitivo e inhibición de disparo con métricas en tiempo real.",
    statScore: "Puntuación",
    statTime: "Tiempo",
    statAccuracy: "Precisión",
    statBestScore: "Récord",
    statThreatsCleared: "Amenazas Resueltas",
    statMaxCombo: "Combo Máximo",
    statPeakLevel: "Nivel Máximo",
    startTitle: "Priorización de Objetivos Pro",
    startSubtitle: "Evaluación de Amenazas · Filtrado Cognitivo · Dificultad Dinámica",
    getReady: "PREPÁRATE",
    toggleFlash: "Alternar Flash de Fallo",
    toggleSound: "Alternar Efectos de Sonido",
    pausedTitle: "Juego en Pausa",
    pausedSubtitle: "Haz clic para reanudar — el bloqueo de cursor se activará de nuevo.",
    stageCaption: "Elimina primero los objetivos rojos de alta amenaza y luego los amarillos. ¡Contén el disparo ante aliados verdes!",
    rulesTitle: "Instrucciones del Ejercicio y Puntuación",
    rulesItems: [
      { num: "1", text: "Diana de Alta Amenaza", highlight: "Rojo (+100 PTS / +0,4s)", result: "Prioridad Máxima" },
      { num: "2", text: "Amenaza Media", highlight: "Amarillo (+50 PTS / +0,4s)", result: "Escala a Rojo tras tiempo" },
      { num: "3", text: "Unidad Aliada", highlight: "Verde (NO DISPARAR)", result: "Fallo o fuego amigo reinicia combo" },
      { num: "4", text: "Subida de Nivel", highlight: "+1 / 1400 PTS", result: "Escalado Dinámico Continuo" }
    ],
    aboutTitle: "Sobre la Priorización de Blancos en FPS",
    aboutHeading: "¿Qué es la Priorización de Objetivos?",
    aboutText: "La priorización de objetivos es la habilidad ejecutiva de elegir en milisegundos qué amenaza abatir primero mientras se frena el tiro ante el resto de estímulos. Detener una acción motora ya emprendida es un proceso neurológico propio que compite con la orden de disparo (Logan & Cowan, 1984) — motivo por el cual retener el tiro resulta más exigente que disparar."
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
      <TargetPrioritizationClient copy={copyEs} />
      <DrillGuide guide={targetPrioritizationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-prioritization"
          locale="es"
        />
      </div>
      <DrillFooter />
    </>
  );
}
