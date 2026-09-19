import EntropicGridClient from '@/app/drills/visual/visual-recognition/entropic-grid/EntropicGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Búsqueda Visual: Entropic Grid | SkillDrills",
  description: "Test de búsqueda visual y atención selectiva gratis online. Localiza códigos objetivo en una matriz de 100 celdas bajo ruido dinámico. Entrena tu rapidez.",
  keywords: [
    "test de búsqueda visual online",
    "test de atención selectiva",
    "ejercicios de rastreo visual",
    "búsqueda visual en matriz",
    "filtrado de ruido visual dinámico",
    "velocidad de escaneo visual",
    "percepción pop-out visual",
    "psicología cognitiva búsqueda",
    "atención visoespacial ejercicios",
    "test de agudeza visual selectiva",
    "tiempo de fijación ocular",
    "detección de blancos bajo ruido"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual/visual-recognition/entropic-grid",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/entropic-grid'),
  },
  openGraph: {
    title: "Test de Búsqueda Visual: Entropic Grid | SkillDrills",
    description: "Test de búsqueda visual y atención selectiva gratis online. Localiza códigos objetivo en una matriz de 100 celdas bajo ruido dinámico. Entrena tu rapidez.",
    url: "https://skilldrills.online/es/drills/visual/visual-recognition/entropic-grid",
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US", "de_DE", "ko_KR", "ja_JP", "pt_PT", "fr_FR"],
    images: [{ url: "https://skilldrills.online/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Test de Búsqueda Visual: Entropic Grid | SkillDrills",
    description: "Test de búsqueda visual y atención selectiva gratis online. Localiza códigos objetivo en una matriz de 100 celdas bajo ruido dinámico. Entrena tu rapidez.",
    images: ["https://skilldrills.online/og-default.svg"],
  },
};

const guideData = {
  eyebrow: "Psicología Cognitiva & Atención Selectiva",
  heading: "Test de Búsqueda Visual Entropic Grid – Filtrado de Ruido & Discriminación",
  intro: [
    "La búsqueda visual (Visual Search) constituye la operación perceptiva fundamental de localizar un objetivo específico dentro de un campo saturado de distractores e interferencias visuales. Desde un piloto militar explorando una cabina instrumental hasta un competidor de deportes electrónicos detectando siluetas enemigas en entornos hostiles, la eficiencia de búsqueda dicta la supervivencia y la conciencia situacional. En psicofísica visual, esta velocidad viene modulada por la interacción dinámica entre la saliencia visual ascendente (bottom-up) y el control atencional descendente (top-down) (Treisman & Gelade, 1980; Wolfe, 1994).",
    "Según la teoría de integración de características (Feature Integration Theory: FIT) postulada por Treisman y Gelade (1980), el sistema visual procesa rasgos elementales básicos —como color u orientación espacial— de forma paralela e inconsciente en una fase preatencional. Cuando un objetivo se diferencia por un único rasgo prominente, se genera un efecto 'pop-out' inmediato con latencia independiente de la densidad de distractores. Sin embargo, cuando el blanco viene definido por una conjunción compleja de caracteres alfanuméricos, la atención focalizada debe desplegarse serialmente para unificar dichos rasgos, guiada por las prioridades atencionales del modelo Guided Search de Wolfe (1994; Wolfe, 2007).",
    "La regeneración periódica de caracteres cada 700 milisegundos en el Entropic Grid modela fielmente las demandas cognitivas de distracción del mundo real bajo la teoría de la carga perceptiva (Perceptual Load Theory) de Nilli Lavie (1995). La atención selectiva opera bajo un límite de capacidad estructural: ante tareas de baja carga sensorial, los recursos atencionales sobrantes escapan involuntariamente procesando distractores irrelevantes. Por el contrario, bajo alta carga perceptiva —como inspeccionar activamente una cuadrícula de 100 celdas en permanente ebullición— el ancho de banda cognitivo queda copado por el procesamiento de la tarea, suprimiendo de forma neuroquímica automática el ruido periférico (Lavie, 1995).",
    "La atención espacial humana no opera como un foco rígido de luz, sino como una lente zoom elástica (Zoom Lens Model, Eriksen & St. James, 1986). Los observadores expertos modulan continuamente su campo focal, alternando entre una inspección global de baja resolución sobre la matriz de 10x10 y cúmulos de alta definición en cuadrantes de 2x2. Al potenciar la percepción parafoveal en la región adyacente a los 2 grados foveales centrales, los evaluados pueden descartar distractores masivamente sin incurrir en sacadas balísticas individuales (Posner, 1980; Woods et al., 2015).",
    "Esta herramienta digital implementa temporizadores de microsegundos mediante performance.now() para baremar la latencia de fijación, la tasa de identificación correcta y la resiliencia al desorden visual en pruebas estandarizadas de 45 segundos. El entrenamiento sistemático en el Entropic Grid acondiciona los circuitos frontoparietales de filtrado sensorial, optimizando la capacidad de discriminación en shooters tácticos, la conducción vehicular de alta velocidad y el análisis de flujos complejos de información."
  ],
  benchmarks: {
    title: "Baremos de Rendimiento para Búsqueda Visual y Atención Selectiva",
    headers: ["Nivel / Categoría", "Aciertos Confirmados (45s)", "Latencia Media de Fijación", "Precisión de Filtrado de Ruido", "Perfil Neurocognitivo"],
    rows: [
      ["Nivel 1: Élite Perceptiva (Top 1%)", "18+ Aciertos", "< 180 ms", "> 96%", "Síntesis perfecta de detección pop-out y escaneo top-down dirigido (Wolfe, 2007)."],
      ["Nivel 2: Búsqueda Avanzada (Top 5%)", "14 – 17 Aciertos", "180 – 230 ms", "88 – 95%", "Filtro sobresaliente de distractores dinámicos y exploración eficaz por cuadrantes."],
      ["Nivel 3: Nivel Estándar (Top 25%)", "10 – 13 Aciertos", "230 – 300 ms", "76 – 87%", "Velocidad de procesamiento habitual; combina análisis serial y percepción periférica."],
      ["Nivel 4: Nivel Básico (Top 50%)", "7 – 9 Aciertos", "300 – 400 ms", "65 – 75%", "Sensibilidad al desorden visual y lentitud ante transiciones frecuentes (clutter latency)."],
      ["Nivel 5: En Desarrollo (Baseline)", "< 7 Aciertos", "> 400 ms", "< 65%", "Fijaciones oculares dispersas y pérdida del código objetivo en la memoria de trabajo."]
    ],
    note: "Fundamentado en investigaciones sobre atención visual selectiva (Treisman & Gelade 1980; Wolfe 2007; Duncan & Humphreys 1989; Posner 1980)."
  },
  techniques: {
    title: "Estrategias Motoras y Visuales para Acelerar la Exploración",
    items: [
      {
        name: "Exploración por Bloques de Cuadrantes",
        desc: "En vez de recorrer la matriz celda por celda, divida la cuadrícula de 10x10 en 4 cuadrantes de 5x5 y sitúe la mirada en el centro de cada bloque para aprovechar la visión parafoveal.",
        tips: "Limite las sacadas oculares a unos pocos puntos fijos por ciclo de búsqueda."
      },
      {
        name: "Filtrado por Rasgos Geométricos Primarios",
        desc: "Memorice la silueta visual del código (ej: líneas rectas en 'A' o curvas en 'O') para descartar instantáneamente símbolos morfológicamente incompatibles.",
        tips: "No repita el código fonéticamente; mantenga viva su forma geométrica en la memoria visual."
      },
      {
        name: "Inmunidad ante Cambios de Contraste",
        desc: "El parpadeo periódico de la cuadrícula suele desviar la mirada involuntariamente hacia los bordes. Entrene la atención para preservar la inspección central del área elegida.",
        tips: "Resista el impulso de mirar los destellos de renovación fuera del sector actual."
      },
      {
        name: "Posicionamiento Central del Puntero",
        desc: "Ubique el cursor en la zona media de la cuadrícula para acortar el trayecto motor de confirmación tras el hallazgo visual foveal.",
        tips: "Mantenga la mano sin rigidez para permitir clics ágiles y precisos."
      }
    ]
  },
  steps: [
    "Identifique el código de dos caracteres expuesto en la barra superior del test.",
    "Haga clic en Iniciar Prueba para activar la cuenta regresiva y dar inicio a la cuadrícula de 100 celdas.",
    "Explore la matriz con rapidez y pulse sobre el código correcto antes de que concluyan los 45 segundos.",
    "Cada selección acertada otorga puntos e introduce inmediatamente un nuevo código a localizar.",
    "Al concluir el tiempo, revise sus métricas de aciertos, latencia de respuesta y porcentaje de precisión."
  ],
  audience: "Apropiado para competidores de shooters tácticos (CS2, Valorant, Apex Legends), operadores de centros de control, analistas de datos, pilotos y cualquier usuario interesado en elevar su velocidad de procesamiento visual bajo distracción.",
  faqs: [
    {
        "q": "¿Qué es el test de búsqueda visual Entropic Grid (Visual Search Task)?",
        "a": "El Entropic Grid es una aplicación empírica de la teoría de integración de rasgos (Treisman & Gelade, 1980) y del modelo de búsqueda guiada (Wolfe, 2007). Mide la capacidad del córtex cerebral para extraer un código específico entre 100 celdas mientras los distractores cambian periódicamente cada 700 ms."
    },
    {
        "q": "¿Qué diferencia existe entre la búsqueda paralela (pop-out) y la búsqueda serial?",
        "a": "La búsqueda paralela se activa cuando el blanco destaca por una propiedad óptica simple (color o brillo), percibiéndose de forma instantánea sin esfuerzo consciente. La búsqueda serial requiere un desplazamiento sacádico voluntario celda por celda para evaluar combinaciones complejas, consumiendo tiempo y carga atencional."
    },
    {
        "q": "¿Qué beneficios aporta este ejercicio para shooters tácticos como Valorant o CS2?",
        "a": "En partidas competitivas, los jugadores deben identificar siluetas y asomos de rivales camuflados en escenarios repletos de texturas, sombras y efectos de partículas. Este ejercicio entrena la velocidad de discriminación figura-fondo reduciendo el tiempo de reacción inicial."
    },
    {
        "q": "¿Cuál es la estrategia visual más eficaz para escanear una matriz de 100 celdas?",
        "a": "La técnica recomendada es el barrido foveal por cuadrantes. Divida visualmente la cuadrícula 10x10 en 4 secciones de 5x5 y fije la vista en el centro de cada bloque, dejando que la visión parafoveal examine varios caracteres simultáneamente."
    },
    {
        "q": "¿Cómo contrarrestar la distracción que provoca la regeneración cada 700 ms?",
        "a": "La regeneración de la matriz produce cambios bruscos de contraste que capturan involuntariamente el sistema atencional reflejo. Para neutralizarlo, mantenga activa la plantilla mental del código en el córtex prefrontal ejerciendo control atencional descendente (top-down)."
    },
    {
        "q": "¿En qué se diferencia el Entropic Grid de una tabla de Schulte tradicional?",
        "a": "En la tabla de Schulte las posiciones numéricas permanecen inmutables durante toda la prueba. En el Entropic Grid los distractores se modifican dinámicamente cada 700 ms, exigiendo una constante inhibición de ruido visual y mayor resistencia a la sobrecarga cognitiva."
    },
    {
        "q": "¿Mejora la búsqueda visual la velocidad de lectura y el rendimiento con pantallas?",
        "a": "Sí. Reforzar el filtrado rápido de símbolos agiliza los movimientos sacádicos y amplía la ventana de percepción visual, lo que permite una lectura más fluida y un menor cansancio al revisar documentos densos o código."
    },
    {
        "q": "¿Por qué decrece la velocidad de búsqueda visual con los años y cómo prevenirlo?",
        "a": "Con la edad se produce una disminución natural del campo visual útil (UFOV) y una mayor lentitud en la neurotransmisión parietal. La ejercitación regular con matrices visuales dinamiza las redes neuronales mitigando dicho retroceso."
    },
    {
        "q": "¿Cuál es la pauta de práctica diaria óptima sin generar fatiga mental?",
        "a": "Se aconseja realizar entre 4 y 6 series de 45 segundos al día (alrededor de 5 a 8 minutos de práctica concentrada). Realizar pausas de 30 segundos entre repeticiones previene la fatiga del lóbulo frontal."
    },
    {
        "q": "¿Quedan almacenados mis tiempos de respuesta o pulsaciones en servidores externos?",
        "a": "No. Toda la generación estocástica de caracteres, el cálculo de latencia foveal y la puntuación se computan exclusivamente en la memoria local de su navegador mediante JavaScript. No se recoge ningún dato de usuario."
    }
],
  sources: pickSources([
    "treisman1980feature",
    "wolfe2007guided",
    "duncan1989visual",
    "posner1980orienting",
    "scialfa2002visual"
  ]),
  related: [
    { href: "/es/drills/visual/tracking-accuracy/moving-target", label: "Seguimiento de Blanco Móvil" },
    { href: "/es/drills/visual/tracking-accuracy/multiple-targets", label: "Seguimiento de Múltiples Objetos" },
    { href: "/es/drills/visual/tracking-accuracy/pursuit-tracker", label: "Seguimiento Ocular Suave" },
    { href: "/es/drills/visual/reaction-speed/go/no-go", label: "Test Go/No-Go" },
    { href: "/es/drills/fps/target-prioritization", label: "Priorización de Blancos FPS" },
    { href: "/es/drills/visual-tracking/peripheral-ping-pursuit", label: "Persecución Periférica" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Entrenamientos", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Percepción Visual", "item": "https://skilldrills.online/es/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Reconocimiento Visual", "item": "https://skilldrills.online/es/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 5, "name": "Entropic Grid", "item": "https://skilldrills.online/es/drills/visual/visual-recognition/entropic-grid" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Búsqueda Visual Entropic Grid",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": { "@type": "Organization", "name": "SkillDrills" }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Búsqueda Visual Entropic Grid",
  "url": "https://skilldrills.online/es/drills/visual/visual-recognition/entropic-grid",
  "applicationCategory": "SportsApplication",
  "browserRequirements": "Requires JavaScript. Canvas support required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entrenamiento de Búsqueda Visual y Atención Selectiva Entropic Grid",
  "gamePlatform": "Web Browser",
  "genre": ["Visión Deportiva", "Entrenamiento Cognitivo", "Atención Selectiva"],
  "numberOfPlayers": { "@type": "QuantitativeValue", "value": 1 }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Realizar el Test Entropic Grid",
  "description": "Protocolo guiado para entrenar la atención selectiva y la rapidez de exploración visual en matrices dinámicas.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Paso 1", "text": "Identifique el código de dos caracteres expuesto en la barra superior del test." },
    { "@type": "HowToStep", "position": 2, "name": "Paso 2", "text": "Haga clic en Iniciar Prueba para activar la cuenta regresiva y dar inicio a la cuadrícula de 100 celdas." },
    { "@type": "HowToStep", "position": 3, "name": "Paso 3", "text": "Explore la matriz con rapidez y pulse sobre el código correcto antes de que concluyan los 45 segundos." },
    { "@type": "HowToStep", "position": 4, "name": "Paso 4", "text": "Cada selección acertada otorga puntos e introduce inmediatamente un nuevo código a localizar." },
    { "@type": "HowToStep", "position": 5, "name": "Paso 5", "text": "Al concluir el tiempo, revise sus métricas de aciertos, latencia de respuesta y porcentaje de precisión." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
        "@type": "Question",
        "name": "¿Qué es el test de búsqueda visual Entropic Grid (Visual Search Task)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "El Entropic Grid es una aplicación empírica de la teoría de integración de rasgos (Treisman & Gelade, 1980) y del modelo de búsqueda guiada (Wolfe, 2007). Mide la capacidad del córtex cerebral para extraer un código específico entre 100 celdas mientras los distractores cambian periódicamente cada 700 ms."
        }
    },
    {
        "@type": "Question",
        "name": "¿Qué diferencia existe entre la búsqueda paralela (pop-out) y la búsqueda serial?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "La búsqueda paralela se activa cuando el blanco destaca por una propiedad óptica simple (color o brillo), percibiéndose de forma instantánea sin esfuerzo consciente. La búsqueda serial requiere un desplazamiento sacádico voluntario celda por celda para evaluar combinaciones complejas, consumiendo tiempo y carga atencional."
        }
    },
    {
        "@type": "Question",
        "name": "¿Qué beneficios aporta este ejercicio para shooters tácticos como Valorant o CS2?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "En partidas competitivas, los jugadores deben identificar siluetas y asomos de rivales camuflados en escenarios repletos de texturas, sombras y efectos de partículas. Este ejercicio entrena la velocidad de discriminación figura-fondo reduciendo el tiempo de reacción inicial."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cuál es la estrategia visual más eficaz para escanear una matriz de 100 celdas?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "La técnica recomendada es el barrido foveal por cuadrantes. Divida visualmente la cuadrícula 10x10 en 4 secciones de 5x5 y fije la vista en el centro de cada bloque, dejando que la visión parafoveal examine varios caracteres simultáneamente."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cómo contrarrestar la distracción que provoca la regeneración cada 700 ms?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "La regeneración de la matriz produce cambios bruscos de contraste que capturan involuntariamente el sistema atencional reflejo. Para neutralizarlo, mantenga activa la plantilla mental del código en el córtex prefrontal ejerciendo control atencional descendente (top-down)."
        }
    },
    {
        "@type": "Question",
        "name": "¿En qué se diferencia el Entropic Grid de una tabla de Schulte tradicional?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "En la tabla de Schulte las posiciones numéricas permanecen inmutables durante toda la prueba. En el Entropic Grid los distractores se modifican dinámicamente cada 700 ms, exigiendo una constante inhibición de ruido visual y mayor resistencia a la sobrecarga cognitiva."
        }
    },
    {
        "@type": "Question",
        "name": "¿Mejora la búsqueda visual la velocidad de lectura y el rendimiento con pantallas?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Reforzar el filtrado rápido de símbolos agiliza los movimientos sacádicos y amplía la ventana de percepción visual, lo que permite una lectura más fluida y un menor cansancio al revisar documentos densos o código."
        }
    },
    {
        "@type": "Question",
        "name": "¿Por qué decrece la velocidad de búsqueda visual con los años y cómo prevenirlo?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Con la edad se produce una disminución natural del campo visual útil (UFOV) y una mayor lentitud en la neurotransmisión parietal. La ejercitación regular con matrices visuales dinamiza las redes neuronales mitigando dicho retroceso."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cuál es la pauta de práctica diaria óptima sin generar fatiga mental?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Se aconseja realizar entre 4 y 6 series de 45 segundos al día (alrededor de 5 a 8 minutos de práctica concentrada). Realizar pausas de 30 segundos entre repeticiones previene la fatiga del lóbulo frontal."
        }
    },
    {
        "@type": "Question",
        "name": "¿Quedan almacenados mis tiempos de respuesta o pulsaciones en servidores externos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Toda la generación estocástica de caracteres, el cálculo de latencia foveal y la puntuación se computan exclusivamente en la memoria local de su navegador mediante JavaScript. No se recoge ningún dato de usuario."
        }
    }
]
};

export default function EntropicGridPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <EntropicGridClient copy={{ title: "Test de Búsqueda Visual: Entropic Grid", subtitle: "Filtrado de Ruido Dinámico & Atención Selectiva" }} />
        <DrillGuide guide={guideData} />
        <RelatedDrills related={guideData.related} />
      </main>
    </>
  );
}
