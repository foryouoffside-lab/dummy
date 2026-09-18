import ChromaSyncClient from '@/app/drills/visual/reaction-speed/go/no-go/ChromaSyncClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test Go No-Go: Inhibición y Control de Impulso | SkillDrills",
  description: "Test Go No-Go gratis online. Pulsa objetivos verdes e inhibe el clic ante señales rojas. Mide freno motor, control de impulsos y reflejos con precisión.",
  keywords: [
    "test go no-go online",
    "prueba de inhibición de respuesta",
    "test de control de impulsos",
    "tarea go no-go neuropsicología",
    "disciplina de gatillo fps",
    "funciones ejecutivas freno motor",
    "tarea de señal de parada stop signal",
    "inhibición conductual prefrontal",
    "errores de comisión y omisión",
    "entrenamiento de reflejos e inhibición",
    "tarea de atención sostenida sart",
    "cronometría mental donders c"
  ],
  openGraph: {
    title: "Test Go No-Go: Inhibición y Control de Impulso | SkillDrills",
    description: "Reacciona al verde y frena ante el rojo. Evalúa la inhibición motora y el freno préfrontal gratis online.",
    type: 'article',
    url: 'https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test Go No-Go: Inhibición y Control de Impulso | SkillDrills",
    description: "Test neurocognitivo Go/No-Go gratuito para entrenar la disciplina de gatillo y el control de impulsos.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/go/no-go'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Catálogo de Drills", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Entrenamiento Visual", "item": "https://skilldrills.online/es/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Velocidad de Reacción", "item": "https://skilldrills.online/es/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "Test Go/No-Go de Control de Impulsos", "item": "https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test Go/No-Go de Inhibición de Respuesta",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Prueba neurocognitiva interactiva de Go/No-Go para evaluar el frenado motor conductual, tasas de error de comisión y disciplina de disparo.",
  "featureList": [
    "Cronometría en milisegundos mediante la API performance.now()",
    "Ventana de presentación decreciente para evaluar límites de cancelación motora",
    "Registro preciso de errores de comisión (falsa alarma) y omisión",
    "Procesamiento 100% local en navegador sin telemetría externa"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test Go/No-Go de Inhibición de Respuesta | SkillDrills",
  "alternateName": "Go/No-Go Pro",
  "url": "https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go",
  "dateModified": "2026-09-05",
  "description": "Prueba online gratuita de Go/No-Go. Haz clic ante estímulos verdes y detén activamente el movimiento ante señales rojas No-Go.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador web moderno con soporte para HTML5 Canvas.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Inhibición de Respuesta, Freno Motor, Control de Impulsos, Disciplina de Gatillo, Funciones Ejecutivas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Drill Go/No-Go de Inhibición Motora",
  "url": "https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go",
  "description": "Juego neurocognitivo para mejorar el freno motor y el control de impulsos.",
  "genre": ["Action", "Brain Game", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Realizar el Test Go/No-Go de Inhibición de Respuesta",
  "dateModified": "2026-09-05",
  "description": "Protocolo de 4 pasos para evaluar y entrenar la inhibición motora y la supresión de impulsos mediante la tarea Go/No-Go.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fija la Mirada en la Retícula Central",
      "text": "Ubica la vista en el punto central de la pantalla donde aparecerán los discos de estímulo, manteniendo serenidad visual.",
      "url": "https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Reacciona Velozmente ante Estímulos Verdes GO",
      "text": "Haz clic o presiona la Barra Espaciadora de inmediato cuando aparezca el disco verde esmeralda (+150 PTS × Combo).",
      "url": "https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Frena en Seco ante Estímulos Rojos NO-GO",
      "text": "Inmoviliza el dedo y evita pulsar cuando surja el disco rojo carmesí (+100 PTS por contención lograda).",
      "url": "https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Conserva la Disciplina de Gatillo a Alta Velocidad",
      "text": "A medida que sube tu racha, el tiempo de visualización se reduce a 100 ms, exigiendo máxima respuesta de frenado frontal.",
      "url": "https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es la prueba Go/No-Go y qué mide neurológicamente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El test Go/No-Go es una tarea experimental clásica de neurociencia cognitiva que evalúa la inhibición motora, la atención selectiva y el autocontrol. Exige responder a estímulos habituales (Go) mientras se suprime una acción ya iniciada ante estímulos infrecuentes (No-Go)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre un error de comisión y un error de omisión?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un error de comisión (falsa alarma) ocurre cuando pulsas por error ante una señal roja No-Go, reflejando fallo en el freno inibitorio. Un error de omisión sucede al no hacer clic a tiempo ante un estímulo verde Go, evidenciando lapsos de atención."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué establece el modelo de carrera de caballos (Horse-Race Model) de Logan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Formulado por Logan y Cowan (1984), postula que la inhibición es una competencia entre dos procesos neurológicos independientes: el proceso Go (ejecución motora) y el proceso Stop (freno inhibitorio). Si el proceso Stop llega primero a su umbral, la acción queda anulada."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué se presiona impulsivamente el blanco rojo sabiendo que es No-Go?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se debe al 'cebado motor prepotente'. La repetición de estímulos Go sobreactiva la corteza motora. La luminancia y el movimiento se procesan en la corteza visual antes que el color en el área V4, desatando el clic antes de que el lóbulo frontal logre detenerlo."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué manera beneficia el entrenamiento Go/No-Go a jugadores de shooters FPS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En títulos como Valorant, CS2 o Rainbow Six Siege, la disciplina de disparo evita disparar por reflejo contra aliados o granadas de humo, protegiendo la posición táctica. El drill disocia la detección sensorial del clic compulsivo del dedo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué regiones cerebrales controlan la frenada motora hiperdirecta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La orden de detención viaja por una vía hiperdirecta que integra la corteza frontal inferior derecha (rIFC), el área motora presuplementaria (preSMA) y el núcleo subtalámico (STN) en los ganglios basales (Aron et al., 2014)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se puede entrenar y mejorar la inhibición de respuesta y el autocontrol?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. La investigación en neuroplasticidad confirma que la práctica deliberada refuerza los circuitos frontoestriatales, reduciendo el tiempo de reacción ante señales de parada (SSRT) y agudizando el control de impulsos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo influyen la tasa de refresco del monitor y el polling rate del ratón?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las pantallas a 60 Hz agregan hasta 16,7 ms de retardo, mientras que a 144 Hz o 240 Hz se reduce a 6,9 ms y 4,1 ms. Junto a un ratón de 1.000 Hz, el ojo percibe antes el color del objetivo, evitando errores de comisión."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la rutina de entrenamiento recomendada para maximizar la inhibición?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bastan de 2 a 3 sesiones breves de 3 a 5 minutos diarios. Sesiones muy largas provocan fatiga prefrontal, lo que incrementa los errores de comisión."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se transmiten los tiempos de reacción y los errores a servidores externos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Todos los datos, combos y estadísticas de latencia se almacenan estrictamente en el almacenamiento local de tu navegador sin envío de telemetría a servidores."
      }
    }
  ]
};

const goNoGoGuide = {
  heading: "Estándares Neurocognitivos de Inhibición de Respuesta y Supresión Motora",
  intro: [
    "La inhibición de respuesta es la facultad ejecutiva clave que permite cancelar, frenar o posponer acciones motoras inapropiadas o perjudiciales. En deportes de combate, videojuegos tácticos y conducción a alta velocidad, la capacidad de interrumpir una respuesta refleja suele ser más decisiva que la velocidad pura de movimiento.",
    "El origen de este paradigma data de 1868 con Franciscus Cornelis Donders, quien introdujo el método sustractivo de la 'Reacción-C'. Donders probó que discriminar estímulos y responder selectivamente exige tiempo cognitivo adicional frente al tiempo de reacción simple.",
    "En 1984, Gordon D. Logan y colaboradores formularon el 'Horse-Race Model', describiendo el autocontrol como un duelo entre un proceso activador Go y un proceso de detención Stop. Estudios con resonancia magnética (Aron et al., 2014) demuestran que esta frenada opera a través de la vía hiperdirecta entre la corteza frontal inferior derecha (rIFC) y el núcleo subtalámico (STN).",
    "Metodología y Precisión de Medición: Los estímulos y clics se registran mediante la API performance.now() con exactitud de milisegundos. Se compensan los retardos de sincronización vertical del monitor y la tasa de sondeo USB (Woods et al., 2015), garantizando procesamiento exclusivamente local."
  ],
  benchmarks: {
    title: "Baremos de Rendimiento en Inhibición de Respuesta (Referencia Neurocientífica)",
    headers: ["Banda de Rendimiento", "Tasa de Error de Comisión (CER)", "Puntuación y Umbral Combo", "Perfil Neuromuscular y Ejecutivo"],
    rows: [
      ["Tier 1: Frenado Ejecutivo Apex", "< 2.0% CER", "16.000+ PTS | Combo 30x+", "Supresión motora hiperdirecta rIFC-STN perfecta; disociación completa entre el destello sensorial y el clic reflejo."],
      ["Tier 2: Inhibición de Respuesta Superior", "2.0% – 4.9% CER", "11.000 – 15.999 PTS | Combo 20x+", "Excelente disciplina de gatillo; rápida recuperación ante variaciones cromáticas con mínimo error de anticipación."],
      ["Tier 3: Nivel Adulto Estándar", "5.0% – 9.9% CER", "6.500 – 10.999 PTS | Combo 12x+", "Respuesta confiable a blancos Go con fallos de falsa alarma aislados bajo ritmo de alta velocidad."],
      ["Tier 4: Impulsividad Moderada", "10.0% – 18.0% CER", "3.000 – 6.499 PTS | Combo 6x+", "Elevado cebado motor prepotente; tendencia a mover el dedo al advertir el estímulo antes de validar el color."],
      ["Tier 5: Predominio Prepotente (Base)", "> 18.0% CER", "< 3.000 PTS | Combo < 6x", "Impulsividad conductual notoria; incapacidad de suspender el movimiento balístico ante señales rojas No-Go."]
    ],
    note: "Estos baremos se fundamentan en la literatura científica de cronometría mental e inhibición motora (Donders, 1868; Logan et al., 1984; Robertson et al., 1997; Aron et al., 2014). Los resultados varían según el ritmo circadiano y la latencia del equipo."
  },
  techniques: {
    title: "Métodos para Optimizar el Control de Impulsos",
    items: [
      {
        name: "Discriminación Cromática Previa a la Activación",
        desc: "Las señales de luminancia llegan a la corteza visual primaria antes de que el área V4 resuelva la identidad del color (Donders, 1868).",
        tips: "No inicies el movimiento muscular con el mero destello; entrena a tu cerebro para esperar la confirmación del tono verde esmeralda."
      },
      {
        name: "El Reinicio de Freno del Modelo de Carrera",
        desc: "Si el proceso Stop arranca antes de que el potencial Go supere el umbral, la orden se anula en la médula espinal (Logan et al., 1984).",
        tips: "Mantén el dedo relajado sobre el botón. La tensión excesiva en los flexores del antebrazo entorpece la acción del freno neural."
      },
      {
        name: "Ruptura del Ritmo Automático",
        desc: "La aparición repetida de señales Go sume al cerebro en un piloto automático rítmico, disparando los errores ante señales No-Go (Robertson et al., 1997).",
        tips: "Trata cada estímulo como un suceso novedoso e independiente, centrando la mirada en la retícula entre disparos."
      },
      {
        name: "Calibración y Hardware de Baja Latencia",
        desc: "En márgenes de respuesta de 160 ms, un monitor de 60 Hz añade hasta 16,7 ms de retardo visual (Woods et al., 2015).",
        tips: "Usa monitores de 144 Hz o 240 Hz y ratones con sondeo a 1.000 Hz para minimizar la latencia de entrada."
      }
    ]
  },
  steps: [
    "Pulsa en Iniciar Drill para comenzar la sesión de 45 segundos de Go/No-Go.",
    "Enfoca la vista en la retícula central donde aparecerán los círculos de estímulo.",
    "Haz clic al instante cuando aparezca el círculo verde GO para sumar puntos y combo.",
    "Frena el clic y mantente inmóvil cuando surja el círculo rojo NO-GO para acumular puntos de contención.",
    "Comprueba tu tasa de error de comisión, latencia media y categoría de desempeño al terminar."
  ],
  audience: "Jugadores de shooters tácticos (Valorant, CS2, Siege) que buscan perfeccionar su disciplina de tiro, conductores, deportistas y personas enfocadas en potenciar su control inhibitorio y funciones ejecutivas.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'logan1984', 'robertson1997', 'aron2014', 'woods2015'),
  related: [
    { href: "/es/drills/visual/reaction-speed/light-reaction", label: "Test de Reacción a la Luz" },
    { href: "/es/drills/visual/depth-perception/distance-judgment", label: "Juicio de Distancia y Profundidad" },
    { href: "/es/drills/visual/tracking-accuracy/moving-target", label: "Intercepción de Blanco Móvil" },
    { href: "/es/drills/visual/tracking-accuracy/multiple-targets", label: "Seguimiento de Múltiples Objetos" },
    { href: "/es/drills/visual/tracking-accuracy/pursuit-tracker", label: "Seguimiento Ocular Suave" },
    { href: "/es/drills/visual/visual-recognition/entropic-grid", label: "Búsqueda en Rejilla Entrópica" }
  ]
};

export default function ChromaSyncPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <ChromaSyncClient copy={{ title: "Test Go No-Go: Inhibición y Control de Impulso" }} />
      <DrillGuide guide={goNoGoGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/es/drills/visual/reaction-speed/go/no-go" />
      </div>
    </>
  );
}
