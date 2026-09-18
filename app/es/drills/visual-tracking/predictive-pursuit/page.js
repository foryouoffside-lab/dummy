import PredictivePursuitClient from '@/app/drills/visual-tracking/predictive-pursuit/PredictivePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SPANISH SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "seguimiento ocular predictivo" / "entrenamiento de anticipación visual"
// Secondary:    "persecución suave predictiva", "predicción de trayectoria ocluida", "ejercicio de puntería predictiva"
// LSI / Domain:  "memoria de trabajo visual", "control motor anticipatorio", "anticipación de trayectorias fps",
//               "seguimiento visual con oclusión", "visión predictiva para shooters", "agudeza visual de extrapolación", "test de seguimiento predictivo"
// Authentic Domain Terms: Seguimiento Ocular Predictivo（Predictive Smooth Pursuit）, Anticipación de Trayectoria（Trajectory Anticipation）, Oclusión Visual（Visual Occlusion）, Modelo Interno Cerebelar（Internal Cerebellar Forward Model）, Control Motor Feedforward（Feedforward Control）, Ganancia de Oclusión（Occlusion Gain）
// ============================================================

export const metadata = {
  title: "Seguimiento Ocular Predictivo – SkillDrills",
  description: "Entrena seguimiento ocular predictivo y anticipacion de trayectorias ocluidas: mejora la memoria visual motriz y control anticipatorio en el navegador.",
  keywords: [
    "seguimiento ocular predictivo",
    "entrenamiento de anticipación visual",
    "persecución suave predictiva",
    "predicción de trayectoria ocluida",
    "ejercicio de puntería predictiva",
    "memoria de trabajo visual",
    "control motor anticipatorio",
    "anticipación de trayectorias fps",
    "seguimiento visual con oclusión",
    "visión predictiva para shooters",
    "agudeza visual de extrapolación",
    "test de seguimiento predictivo"
  ],
  openGraph: {
    title: "Seguimiento Ocular Predictivo – SkillDrills",
    description: "Entrena seguimiento ocular predictivo y anticipacion de trayectorias ocluidas: mejora la memoria visual motriz y control anticipatorio en el navegador.",
    type: "website",
    url: "https://skilldrills.online/es/drills/visual-tracking/predictive-pursuit",
    siteName: "SkillDrills",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguimiento Ocular Predictivo – SkillDrills",
    description: "Entrena seguimiento ocular predictivo y anticipacion de trayectorias ocluidas: mejora la memoria visual motriz y control anticipatorio en el navegador.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/predictive-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/predictive-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Ejercicios", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Seguimiento Visual", "item": "https://skilldrills.online/es/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Seguimiento Ocular Predictivo", "item": "https://skilldrills.online/es/drills/visual-tracking/predictive-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entrenamiento de Seguimiento Ocular Predictivo",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Entrenamiento oculomotor avanzado para desarrollar modelos predictivos cerebelares y seguimiento foveal durante oclusiones visuales."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Aplicación de Seguimiento Predictivo",
  "url": "https://skilldrills.online/es/drills/visual-tracking/predictive-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos los navegadores modernos",
  "browserRequirements": "Requiere compatibilidad con JavaScript y HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Seguimiento Predictivo",
  "description": "Ejercicio visual avanzado donde el usuario extrapola y proyecta mentalmente la trayectoria de blancos que cruzan sectores de oclusión.",
  "genre": ["Entrenamiento Visual", "Puntería Predictiva", "Entrenamiento de Reflejos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar la Anticipación de Trayectorias con el Seguimiento Predictivo",
  "description": "Protocolo neurofisiológico para entrenar modelos internos de avance cerebelar ante interrupciones de visibilidad.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Codificación del Vector Inicial",
      "text": "Fija la mirada en el blanco durante los primeros 100 a 200 ms para captar con precisión su velocidad y dirección."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Extrapolación Ocular Mental",
      "text": "Al ocultarse el blanco, continúa desplazando los ojos con velocidad constante sobre la trayectoria estimada."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Inhibición de Sacadas Erráticas",
      "text": "Evita movimientos bruscos de búsqueda en el vacío; mantén la continuidad del seguimiento fluido."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Intercepción Foveal en la Salida",
      "text": "Coloca la fóvea con exactitud en el punto de reaparición justo al momento en que el objetivo vuelve a emerger."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el seguimiento ocular predictivo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es una función visual avanzada en la que el cerebro extrapola el recorrido de un objeto que se oculta temporalmente, guiando los ojos sin esperar confirmación sensorial (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo anula el seguimiento predictivo la latencia biológica de los ojos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El retardo neuromuscular es de 130 a 150 ms. Los modelos feedforward del cerebelo generan órdenes motoras anticipadas que eliminan ese retraso por completo (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué estructuras cerebrales sostienen la persecución visual en la oclusión?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los campos oculares frontales (FEF) y la memoria de trabajo visual preservan el vector cinético y continúan guiando los ojos aunque la retina no reciba luz (Bennett & Barnes, 2003)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo optimiza este ejercicio el tiro anticipado (lead aim) en shooters (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Al ocultarse un enemigo tras una cobertura o humo, los jugadores entrenados colocan la retícula en la coordenada de salida antes de que el rival aparezca, en vez de reaccionar después."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué utilidad tiene en deportes como béisbol o tenis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La velocidad de la pelota supera con frecuencia la capacidad de seguimiento foveal puro. Los deportistas usan modelos predictivos para proyectar la trayectoria antes del golpeo (Kowler, 1989)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué no se deben hacer sacadas de búsqueda durante la oclusión?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Buscar con sacadas provoca supresión sacádica y borrosidad retiniana, rompiendo la sincronía de velocidad. El seguimiento suave continuo asegura una recepción impecable (Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué significa la ganancia de oclusión en pruebas de visión?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Representa la relación entre la velocidad de los ojos durante la zona ciega y la velocidad real del blanco. Un valor de 1.0 refleja velocidad constante sin frenado."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo repercute la tasa de refresco del monitor en la extrapolación?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores de alta frecuencia proporcionan más muestras del movimiento previo al corte, lo que permite al cerebelo calcular vectores más exactos (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Esta herramienta de entrenamiento predictivo es gratuita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, SkillDrills ofrece esta aplicación sin costes, sin registros y sin anuncios invasivos, accesible directamente desde cualquier navegador web moderno."
      }
    },
    {
      "@type": "Question",
      "name": "¿Pueden los adultos mayores mejorar su seguimiento predictivo mediante práctica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Aunque la velocidad refleja disminuye levemente con la edad, los modelos predictivos del cerebelo conservan una elevada plasticidad y mejoran notoriamente con entrenamiento (Kowler, 1989)."
      }
    }
  ]
};

const guideProps = {
  heading: "Fundamentos Científicos del Seguimiento Ocular Predictivo y Extrapolación de Trayectoria",
  intro: [
    "El sistema visual humano está supeditado a un obstáculo fisiológico ineludible: el periodo de latencia sensomotora de 130 a 150 milisegundos que necesitan los impulsos lumínicos para recorrer la corteza visual y movilizar los músculos oculomotores. Si los ojos funcionaran únicamente mediante retroalimentación en bucle cerrado, la fóvea sufriría un desajuste retiniano constante (retinal slip), quedando rezagada respecto a cualquier móvil veloz. La solución adaptativa a este desfase es el seguimiento ocular predictivo.",
    "Investigaciones pioneras de Robinson (1965) y Barnes (2008) demostraron que el cerebelo, en estrecha sincronía con los campos oculares frontales (FEF), deduce la velocidad y dirección del blanco en los primeros 100 a 200 ms de su avance. Con estos parámetros, genera un modelo interno feedforward que impulsa a los ojos a la velocidad exacta esperada, suprimiendo la demora temporal biológica.",
    "En situaciones competitivas de deportes de equipo y videojuegos, los objetivos quedan ocultos periódicamente tras coberturas o desniveles. Los trabajos de Bennett & Barnes (2003) constataron que la memoria de trabajo visual del lóbulo frontal conserva la información de velocidad y sostiene la persecución ocular sin estímulo directo durante lapsos de hasta dos segundos. El ejercicio Predictive Pursuit aísla y entrena esta crucial competencia motora anticipatoria."
  ],
  benchmarks: {
    title: "Métricas de Extrapolación de Trayectoria y Precisión en Oclusión",
    headers: ["Nivel de Rendimiento", "Precisión de Extrapolación (%)", "Desvío de Aterrizaje en Salida", "Ganancia de Seguimiento (Gain)", "Perfil Predictivo"],
    rows: [
      ["Élite (Esports / Deportistas)", "Más de 94%", "Menos de 15 px (Aterrizaje Exacto)", "0.95 – 1.02", "Modelo cerebelar impecable; anticipación milimétrica sin sacadas correctoras posteriores."],
      ["Avanzado (Nivel Competitivo)", "86% – 93%", "15 px – 28 px", "0.88 – 0.94", "Excelente extrapolación de vector con mínimo ajuste tras la reaparición."],
      ["Competente (Adulto Sano)", "76% – 85%", "29 px – 45 px", "0.78 – 0.87", "Predicción sólida con leve desviación en oclusiones prolongadas."],
      ["En Desarrollo", "62% – 75%", "46 px – 65 px", "0.65 – 0.77", "Predominio de control reactivo; desaceleración evidente durante el lapso de oclusión."],
      ["Iniciante / Nivel Base", "Menos de 62%", "Más de 65 px", "Menos de 0.65", "Freno visual inmediato al ocultarse el blanco; marcada tardanza en la reincorporación."]
    ],
    note: "※ Baremos medidos en resolución 1080p a 50–70 cm con velocidades de 1.0x a 1.5x. Se califica la precisión foveal al punto de emergencia sin sacadas de ajuste post-salida."
  },
  techniques: {
    title: "Cuatro Principios Clave para una Extrapolación Precisa de Trayectoria",
    items: [
      {
        name: "Captación Inicial de Velocidad",
        desc: "Fija el blanco con máxima nitidez en los primeros 100 a 200 ms. El cerebelo precisa parámetros limpios de aceleración para estructurar la proyección mental correcta (Barnes, 2008).",
        tips: "Atiende a la rapidez con que el punto recorre las referencias de la pantalla en lugar de mirar su diseño gráfico."
      },
      {
        name: "Extrapolación Mental Continua",
        desc: "Al perder de vista el blanco, no detengas los ojos bajo ninguna circunstancia. Desplaza la mirada a la misma velocidad sobre la ruta imaginaria hacia el lugar de salida.",
        tips: "No fijes la vista donde el blanco desapareció; desliza la mirada hacia adelante en el espacio vacío."
      },
      {
        name: "Supresión de Sacadas Ansiosas",
        desc: "La falta momentánea de señal estimula al cerebro a realizar sacadas erráticas de rastreo. Dichos saltos destruyen la inercia motora. Conserva la calma y la suavidad de movimiento (Krauzlis, 2004).",
        tips: "Imagina que tu mirada corre sobre un riel magnético perfectamente silencioso a través de la oscuridad."
      },
      {
        name: "Llegada Anticipada a la Coordenada de Salida",
        desc: "Calcula el punto exacto por donde emergerá el blanco. Sincroniza la llegada de la fóvea con la aparición del objetivo para evitar desfases.",
        tips: "Es preferible tocar el punto de salida una fracción de milisegundo antes que llegar tarde al encuentro."
      }
    ]
  },
  steps: [
    "Sitúate en una postura cómoda a 50–70 cm del monitor manteniendo la cabeza perfectamente quieta.",
    "Ajusta la velocidad de la prueba y selecciona la opción de ocultar línea para potenciar el reto mental.",
    "Sigue con atención el blanco visible asimilando su velocidad y dirección de avance.",
    "Durante el tramo oculto, sostén el desplazamiento continuo de los ojos por la trayectoria estimada.",
    "Reubica la fóvea justo en el instante en que el blanco vuelve a aparecer y analiza tu exactitud."
  ],
  audience: "Jugadores de shooters tácticos (Valorant, CS2, Overwatch 2, Apex Legends), deportistas de béisbol, tenis y pádel, y deportistas visuales enfocados en optimizar la anticipación perceptiva.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('robinson1965', 'kowler1989', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/es/drills/visual-tracking/constant-slow-pursuit", label: "Seguimiento Ocular Suave Continuo (Constant Slow)" },
    { href: "/es/drills/visual-tracking/directional-chaos-pursuit", label: "Seguimiento con Caos Direccional (Directional Chaos)" },
    { href: "/es/drills/visual-tracking/dynamic-evasion-pursuit", label: "Persecución Evasiva Reactiva (Dynamic Evasion)" },
    { href: "/es/drills/visual-tracking/ghosting-suppress-pursuit", label: "Estabilidad de Fijación Ocular (Ghosting Suppress)" },
    { href: "/es/drills/visual-tracking/infinity-pursuit", label: "Ejercicio Ocular en Ocho Infinito (Infinity)" },
    { href: "/es/drills/visual-tracking/momentum-teleport-pursuit", label: "Seguimiento de Blanco Teletransportado (Momentum)" }
  ]
};

export default function SpanishPredictivePursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PredictivePursuitClient
        copy={{
          title: "Seguimiento Ocular Predictivo y Extrapolación de Trayectoria",
          subtitle: "Entrenamiento Neurovisual de Modelos Cerebelares Feedforward y Persecución en Oclusión",
          description: "Entrenamiento neurovisual gratuito para dominar la anticipación de trayectorias y el tiro anticipado. Extrapola mentalmente el desplazamiento de blancos ocultos y coloca la fijación foveal con precisión en el punto de salida sin demora. Gratuito en el navegador."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/predictive-pursuit" />
      </div>
    </>
  );
}
