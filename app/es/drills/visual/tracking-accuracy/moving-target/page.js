import KineticInterceptClient from '@/app/drills/visual/tracking-accuracy/moving-target/KineticInterceptClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Seguimiento de Blancos: Visión Dinámica | SkillDrills",
  description: "Test de seguimiento de blancos móviles gratis. Intercepta objetivos dinámicos y evalúa persecución ocular suave y cálculo de trayectoria online.",
  keywords: [
    "test de seguimiento de blancos móviles",
    "test de agudeza visual dinámica",
    "entrenamiento de puntería objetivo en movimiento",
    "seguimiento ocular suave test",
    "intercepción de objetivos dinámicos",
    "coordinación ojo-mano blancos móviles",
    "test de visión dinámica online",
    "anticipación de trayectoria visual",
    "entrenamiento de tracking fps",
    "movimientos sacádicos y persecución visual",
    "test de velocidad de rastreo visual",
    "visión cinética e intercepción motora"
  ],
  openGraph: {
    title: "Seguimiento de Blancos: Visión Dinámica | SkillDrills",
    description: "Intercepta blancos móviles y mide la persecución ocular suave y la agudeza visual dinámica online.",
    type: 'article',
    url: 'https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Seguimiento de Blancos: Visión Dinámica | SkillDrills",
    description: "Entrenamiento cinético online para mejorar el seguimiento ocular y la intercepción de blancos.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/moving-target'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Catálogo de Drills", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Entrenamiento Visual", "item": "https://skilldrills.online/es/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Precisión de Seguimiento", "item": "https://skilldrills.online/es/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "Intercepción de Blancos Móviles", "item": "https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Intercepción de Blancos Móviles",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Prueba psicofísica interactiva para medir la persecución ocular suave, la predicción de trayectorias y la exactitud en la intercepción de objetivos.",
  "featureList": [
    "Física de trayectoria 2D con vectores de rebote y colisión en bordes",
    "Cronometría en milisegundos y multiplicadores progresivos de combo",
    "Aceleración progresiva y reducción del tamaño de los blancos por nivel",
    "Procesamiento local seguro en el navegador sin transmisión de datos"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Intercepción de Blancos Móviles — Visión Dinámica | SkillDrills",
  "alternateName": "Moving Target Pro",
  "url": "https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target",
  "dateModified": "2026-09-05",
  "description": "Test online gratis de seguimiento visual cinético. Intercepta esferas en movimiento acelerado dentro del canvas con cálculo predictivo.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador web moderno con soporte para HTML5 Canvas.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Persecución Ocular Suave, Agudeza Visual Dinámica, Extrapolación de Velocidad, Intercepción Balística, Control Motor de Bucle Cerrado"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Drill de Intercepción de Blancos Móviles",
  "url": "https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target",
  "description": "Juego de seguimiento de blancos dinámicos para entrenar reflejos y puntería en movimiento.",
  "genre": ["Action", "Aim Trainer", "Visual Tracking"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar con el Test de Blancos Móviles",
  "dateModified": "2026-09-05",
  "description": "Protocolo de 4 fases para desarrollar la persecución ocular suave, el cálculo de trayectorias y la precisión motora.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fija la Fóvea en el Blanco Móvil",
      "text": "Detecta la esfera nada más aparecer y ancla la mirada en su centroide para establecer una persecución ocular suave.",
      "url": "https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Anticipa la Trayectoria y los Rebotes",
      "text": "Calcula mentalmente la velocidad de avance y el ángulo de rebote en los bordes, adelantando el cursor a la esfera.",
      "url": "https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ejecuta el Clic Balístico de Intercepción",
      "text": "Haz clic sobre la esfera antes de que finalice el intervalo (+150 PTS × Combo × Nivel y +0,6 s añadidos al reloj).",
      "url": "https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Conserva la Racha de Combos a Gran Velocidad",
      "text": "Mantén la precisión al aumentar la aceleración y reducirse el tamaño del blanco, evitando clics en vacío.",
      "url": "https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target#step-4"
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
      "name": "¿Qué es el test de intercepción de blancos móviles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es una prueba de psicofísica visual creada para medir y entrenar los movimientos de persecución ocular suave (smooth pursuit), la predicción espacial de trayectorias y la precisión en la intercepción motora. El usuario intercepta esferas dinámicas que rebotan a velocidades variables."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo procesa el cerebro el rastreo y la captura de un objetivo en movimiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las señales retinarias viajan al área visual temporal media (MT/V5) para calcular vectores de velocidad y dirección. Los campos oculares frontales (FEF) y el cerebelo adaptan la velocidad ocular al objetivo, mientras la corteza parietal diseña la intercepción manual."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia fisiológica entre persecución ocular suave y sacadas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Como comprobó Rashbass (1961), son subsistemas independientes: la persecución suave es un movimiento continuo (hasta 30–40°/s) guiado por la velocidad del estímulo para evitar el desenfoque retiniano. Las sacadas son saltos balísticos veloces (hasta 900°/s) para reubicar la fóvea en blancos desplazados."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es necesario calcular el adelanto (lead) en blancos dinámicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El retardo sensoriomotor humano oscila entre 150 y 220 ms desde la visión hasta el clic. Un blanco que se mueve a 500 px/s recorre más de 100 píxeles en ese tiempo. Disparar a la posición visible provoca fallos por alcance tardío; hay que apuntar por delante (Land & McLeod, 2000)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué límites de velocidad posee el seguimiento ocular suave humano?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La persecución suave opera de forma óptima por debajo de 30°/s (Bahill et al., 1980; Krauzlis, 2004). Por encima de ese umbral o ante giros súbitos, la ganancia disminuye y el cerebro introduce sacadas de alcance (catch-up saccades) para reorientar la vista."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se pueden entrenar la agudeza visual dinámica y la puntería en movimiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. La práctica deliberada optimiza el procesamiento cortical en el área MT/V5, perfecciona la calibración cerebelosa y reduce la latencia motora en deportes de acción y videojuegos tácticos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo influyen los hercios del monitor (60 Hz vs 144 Hz vs 240 Hz) en el tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En 60 Hz la pantalla se actualiza cada 16,7 ms, causando saltos visuales que dificultan la predicción. Monitores a 144 Hz (6,9 ms) y 240 Hz (4,1 ms) garantizan un movimiento continuo, rebajando el error retiniano y elevando el porcentaje de aciertos (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué manera afectan la aceleración y los rebotes a la precisión de clic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los movimientos lineales se predicen con facilidad. Sin embargo, un rebote contra la pared invalida la extrapolación previa, demandando de 150 a 200 ms de latencia para recalcular la trayectoria y disparar una sacada correctora."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre control visuomotor de bucle abierto y bucle cerrado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los primeros ~100 ms del disparo se realizan en bucle abierto (acción balística sin opción a corrección inmediata). Pasado ese umbral, el control pasa a bucle cerrado, donde el feedback visual corrige la posición del cursor de forma continua hasta el impacto."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es este test de seguimiento de blancos gratuito y con datos privados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. El test de SkillDrills es 100% gratuito y no requiere registro ni descargas. Todos los registros y métricas de rendimiento quedan guardados únicamente en el almacenamiento local de tu navegador."
      }
    }
  ]
};

const movingTargetGuide = {
  heading: "Ciencia del Rastreo Cinético y la Intercepción de Trayectorias",
  intro: [
    "La intercepción dinámica de objetivos constituye una destreza sensoriomotora básica en deportes de alto rendimiento, aviación, artes marciales y esports tácticos. Acertar sobre un blanco en aceleración y trayectoria variable exige sincronizar movimientos oculares de persecución suave, extrapolación espacial y correcciones motoras en bucle cerrado.",
    "El procesamiento neuronal del movimiento se origina en neuronas selectivas a la dirección del área visual temporal media (MT/V5) y temporal superior medial (MST). Estas áreas calculan los vectores de velocidad y proyectan señales hacia los campos oculares frontales (FEF) y el cerebelo para mantener la ganancia de seguimiento (Krauzlis, 2004).",
    "En su célebre estudio, Rashbass (1961) demostró que la persecución suave y las sacadas dependen de sistemas de control disociados: la persecución responde a la velocidad de desplazamiento en la retina, mientras que las sacadas corrigen discrepancias posicionales. Ante giros bruscos o aceleraciones superiores a 30–40°/s, intervienen sacadas de recuperación inmediata (Bahill et al., 1980).",
    "Asimismo, las investigaciones de Land & McLeod (2000) en deportistas de raqueta revelan que los jugadores expertos no persiguen la pelota en todo momento, sino que efectúan sacadas anticipatorias hacia los puntos de rebote calculados. Este ejercicio entrena con exactitud esa competencia predictiva bajo presión temporal."
  ],
  benchmarks: {
    title: "Baremos de Intercepción de Blancos Móviles (Referencia Científica)",
    headers: ["Banda de Rendimiento", "Ventana de Pacing", "Puntuación y Umbral Combo", "Perfil de Seguimiento e Intercepción"],
    rows: [
      ["Tier 1: Interceptor Cinético Apex", "< 0.25s Ventana", "16.000+ PTS | Combo 25x+", "Persecución suave de élite; extrapolación perfecta sin retraso de sacada correctora. Nivel de pilotos y profesionales."],
      ["Tier 2: Rastreador Dinámico Superior", "0.25 – 0.45s Ventana", "10.500 – 15.999 PTS | Combo 16x+", "Fluidez ocular notable; ajustes rápidos en bucle cerrado con mínimo sobreimpulso en blancos acelerados."],
      ["Tier 3: Rendimiento Adulto Estándar", "0.46 – 0.70s Ventana", "6.000 – 10.499 PTS | Combo 9x+", "Seguimiento solvente en tramos rectos; leve retardo de adaptación ante rebotes imprevistos contra las paredes."],
      ["Tier 4: Rastreador en Desarrollo", "0.71 – 1.00s Ventana", "2.500 – 5.999 PTS | Combo 4x+", "Alta dependencia de sacadas reactivas frente a la persecución suave; vacilación apreciable a velocidades elevadas."],
      ["Tier 5: Jitter de Seguimiento (Base)", "> 1.00s Ventana", "< 2.500 PTS | Combo < 4x", "Sobreimpulso motor frecuente; dificultad para mantener la fóvea sobre el blanco móvil; requiere estabilización previa."]
    ],
    note: "Estos baremos se fundamentan en la psicofísica del seguimiento ocular y la cronometría de intercepción (Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000; Bahill et al., 1980; Woods et al., 2015). Las marcas varían según la tasa de refresco de la pantalla y el ratón."
  },
  techniques: {
    title: "Técnicas Clave para Perfeccionar la Intercepción de Blancos",
    items: [
      {
        name: "Anticipación Vectorial de la Trayectoria (Regla de Rashbass)",
        desc: "Dado el retardo sensoriomotor de 150 a 220 ms, hacer clic sobre la posición presente del blanco causa fallos por alcance tardío (Rashbass, 1961).",
        tips: "Extrapola la velocidad y sitúa el clic entre 5 y 15 píxeles por delante del blanco a lo largo de su ruta."
      },
      {
        name: "Anticipación de Rebotes (Fijación Sacádica de Land & McLeod)",
        desc: "Los atletas de élite desplazan la vista al punto de rebote futuro antes de que la esfera toque el muro (Land & McLeod, 2000).",
        tips: "Cuando el blanco se aproxime a un borde, coloca el cursor hacia el ángulo de rebote estimado en vez de perseguirlo hacia el muro."
      },
      {
        name: "Estabilización Retiniana Continua (Bucle de Krauzlis)",
        desc: "Un buen seguimiento exige conservar el objetivo en el centro de la fóvea para anular el desenfoque visual (Krauzlis, 2004).",
        tips: "Acompaña el desplazamiento de la esfera de forma continua con los ojos, en lugar de fijar la vista y esperar a que pase."
      },
      {
        name: "Desacoplamiento Rítmico y Disciplina de Disparo",
        desc: "Las trayectorias variables provocan sacadas de reajuste (Bahill et al., 1980); cliquear a ciegas rompe la racha de puntos.",
        tips: "No pulses con cadencia automática. Verifica visualmente que la mira coincida con el objetivo antes de accionar el clic."
      }
    ]
  },
  steps: [
    "Haz clic en Iniciar Drill para comenzar la ronda de 45 segundos de intercepción cinética.",
    "Localiza la esfera con los ojos y establece un seguimiento ocular fluido y sostenido.",
    "Calcula la trayectoria y adelanta ligeramente el punto de mira a la trayectoria del blanco.",
    "Pulsa sobre la esfera antes de que finalice el intervalo (+150 PTS × Multiplicador y +0,6 s de tiempo extra).",
    "Comprueba tus aciertos, combo máximo y nivel de desempeño al concluir la sesión."
  ],
  audience: "Jugadores de shooters y MOBAs, deportistas de contacto y raqueta, pilotos de carreras y cualquier persona que desee potenciar su seguimiento visual dinámico.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rashbass1961', 'krauzlis2004', 'land2000', 'bahill1980', 'woods2015'),
  related: [
    { href: "/es/drills/visual/tracking-accuracy/multiple-targets", label: "Seguimiento de Múltiples Objetos" },
    { href: "/es/drills/visual/tracking-accuracy/pursuit-tracker", label: "Seguimiento Ocular Suave" },
    { href: "/es/drills/visual/reaction-speed/light-reaction", label: "Test de Reacción a la Luz" },
    { href: "/es/drills/visual/reaction-speed/go/no-go", label: "Test Go / No-Go de Control de Impulsos" },
    { href: "/es/drills/visual/depth-perception/distance-judgment", label: "Juicio de Distancia y Profundidad" },
    { href: "/es/drills/visual/visual-recognition/entropic-grid", label: "Búsqueda en Rejilla Entrópica" }
  ]
};

export default function KineticInterceptPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <KineticInterceptClient copy={{ title: "Seguimiento de Blancos: Visión Dinámica" }} />
      <DrillGuide guide={movingTargetGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/es/drills/visual/tracking-accuracy/moving-target" />
      </div>
    </>
  );
}
