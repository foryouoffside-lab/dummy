import MomentumTeleportPursuitClient from '@/app/drills/visual-tracking/momentum-teleport-pursuit/MomentumTeleportPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SPANISH SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "seguimiento de blanco teletransportado" / "entrenamiento de punteria al teletransporte"
// Secondary:    "reincorporacion sacadica ocular", "seguimiento visual con inercia", "ejercicio de sacadas oculares rapidas"
// LSI / Domain:  "movimiento sacadico de correccion", "persecucion ocular suave", "fijacion foveal rapida",
//               "reflejos visuales para shooters", "coordinacion ojo raton teletransporte", "control oculomotor dinamico", "recuperacion de blanco visual"
// Authentic Domain Terms: Blanco Teletransportado（Teleported Target）, Inercia Cinética（Momentum Preservation）, Reincorporación Sacádica（Saccadic Re-acquisition）, Supresión Sacádica（Saccadic Suppression）, Persecución Suave Pospasadada（Post-saccadic Smooth Pursuit）, Salto Balístico Ocular（Ballistic Saccade）
// ============================================================

export const metadata = {
  title: "Seguimiento de Blanco Teletransportado – SkillDrills",
  description: "Entrena seguimiento visual de blancos con inercia y teletransporte: mejora la reincorporacion sacadica rapida y persecucion suave gratis en el navegador.",
  keywords: [
    "seguimiento de blanco teletransportado",
    "entrenamiento de punteria al teletransporte",
    "reincorporacion sacadica ocular",
    "seguimiento visual con inercia",
    "ejercicio de sacadas oculares rapidas",
    "movimiento sacadico de correccion",
    "persecucion ocular suave",
    "fijacion foveal rapida",
    "reflejos visuales para shooters",
    "coordinacion ojo raton teletransporte",
    "control oculomotor dinamico",
    "recuperacion de blanco visual"
  ],
  openGraph: {
    title: "Seguimiento de Blanco Teletransportado – SkillDrills",
    description: "Entrena seguimiento visual de blancos con inercia y teletransporte: mejora la reincorporacion sacadica rapida y persecucion suave gratis en el navegador.",
    type: "website",
    url: "https://skilldrills.online/es/drills/visual-tracking/momentum-teleport-pursuit",
    siteName: "SkillDrills",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguimiento de Blanco Teletransportado – SkillDrills",
    description: "Entrena seguimiento visual de blancos con inercia y teletransporte: mejora la reincorporacion sacadica rapida y persecucion suave gratis en el navegador.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/momentum-teleport-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/momentum-teleport-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Ejercicios", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Seguimiento Visual", "item": "https://skilldrills.online/es/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Seguimiento de Blanco Teletransportado", "item": "https://skilldrills.online/es/drills/visual-tracking/momentum-teleport-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entrenamiento de Seguimiento de Blanco Teletransportado con Inercia",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Entrenamiento oculomotor interactivo para ejercitar la reincorporación sacádica foveal y persecución suave continua en blancos con inercia."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Aplicación de Seguimiento de Blancos Teletransportados",
  "url": "https://skilldrills.online/es/drills/visual-tracking/momentum-teleport-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos los navegadores modernos",
  "browserRequirements": "Requiere compatibilidad con JavaScript y HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Seguimiento de Blanco Teletransportado con Inercia",
  "description": "Ejercicio visual de alta precisión donde blancos dinámicos saltan bruscamente de coordenadas conservando sus vectores de inercia y velocidad.",
  "genre": ["Entrenamiento de Puntería", "Evaluación Oculomotora", "Entrenamiento de Reflejos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar la Reincorporación Sacádica con Blancos Teletransportados",
  "description": "Protocolo neurofisiológico estructurado para recapturar blancos con saltos espaciales conservando continuidad de movimiento foveal.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fijación Foveal Inicial",
      "text": "Siéntate a una distancia de 50 a 70 cm del monitor manteniendo la cabeza erguida y fija la mirada en el blanco en desplazamiento continuo."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Detección Periférica del Salto",
      "text": "En el instante en que el blanco se teletransporte, detecta la nueva posición mediante la visión periférica sin mover el cuello."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ejecución de la Sacada Balística",
      "text": "Lanza un salto ocular rectilíneo veloz directamente hacia la coordenada de destino para devolver el blanco al centro foveal."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Sincronización Inmediata de Velocidad",
      "text": "Dado que el vector cinético se conserva, acopla inmediatamente la persecución suave sin vacilaciones de búsqueda ocular."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿En qué consiste el ejercicio de blanco teletransportado con inercia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es una prueba oculomotora avanzada que acondiciona el enlace inmediato entre una sacada balística de reincorporación y la persecución suave continua sobre un blanco que salta conservando su velocidad (Rashbass, 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia fisiológica entre una sacada y el seguimiento suave?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La sacada es un salto ocular balístico explosivo (hasta 700 grados/s) destinado a reorientar la fovea, mientras que el seguimiento suave es un ajuste cinético continuo (hasta 40 grados/s) para estabilizar una imagen móvil."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo beneficia este ejercicio a jugadores de videojuegos de disparos (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En juegos como Apex Legends, Valorant u Overwatch 2, los adversarios ejecutan saltos repentinos y teletransportes. Entrenar la reincorporación inmediata reduce la deriva del punto de mira tras el desplazamiento."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo ayuda la inercia del blanco a desarrollar la anticipación visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Al conservar la velocidad y el ángulo tras el salto, el cerebelo recurre a modelos predictivos internos para proyectar el recorrido continuo durante la supresión sacádica (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué produce la disminución visual durante un salto sacádico?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El cerebro activa la supresión sacádica para mitigar el desenfoque retiniano provocado por la velocidad de rotación. La nitidez se restaura de forma instantánea al tocar la coordenada foveal (Findlay & Walker, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es crucial mantener la cabeza inmóvil durante el entrenamiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mover la cabeza dispara el reflejo vestíbulo-ocular (RVO), generando un contra-movimiento de compensación que retrasa la estabilización del blanco. Mantén la mandíbula fija para activar solo los músculos extraoculares (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es la dismetría o error de aterrizaje sacádico?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es el desvío por exceso (overshoot) o defecto (undershoot) respecto a la coordenada final, requiriendo una micro-sacada de ajuste. La práctica regular entrena la calibración cerebelar reduciendo dicho error."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo influye la tasa de refresco del monitor en el rendimiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los monitores de alta frecuencia (144Hz a 360Hz) renuevan los fotogramas cada 2,7ms a 6,9ms, minimizando la incertidumbre temporal y facilitando reincorporaciones sacádicas precisas (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Esta herramienta de entrenamiento es gratuita y sin suscripciones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, SkillDrills ofrece esta aplicación sin costes, sin registros y sin anuncios invasivos, accesible directamente desde cualquier navegador web moderno."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo potencia la neuroplasticidad la práctica ocular repetitiva?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Coordinar de forma iterativa sacadas balísticas y persecución suave estimula el flóculo cerebelar y las vías corticoestriadas, incrementando la agudeza visual dinámica y la estabilidad del enfoque (Bahill et al., 1980)."
      }
    }
  ]
};

const guideProps = {
  heading: "Directrices Científicas de Seguimiento Ocular con Inercia y Saltos Espaciales",
  intro: [
    "En entornos dinámicos e interactivos, los objetivos rara vez siguen trayectorias lineales ininterrumpidas. Los rebotes súbitos, cambios de posición y oclusiones obligan al sistema visual humano a articular de manera coordinada dos subsistemas motores distintos: las sacadas balísticas para relocalizar el objetivo y la persecución suave continua para igualar su velocidad (Rashbass, 1961; Findlay & Walker, 1999).",
    "El ejercicio de Seguimiento de Blanco Teletransportado aísla con exactitud esta dinámica neuromuscular. El blanco cambia de ubicación en un instante conservando su vector de inercia y dirección. Para dominar el ejercicio, los circuitos oculomotores deben lanzar una sacada correctora directa y sincronizar de inmediato la velocidad de persecución foveal al aterrizar sin oscilaciones intermedias (Bahill et al., 1980; Barnes, 2008).",
    "La latencia de entrada y la cuantización de visualización en monitores estándar inciden en la precisión de reincorporación (Woods et al., 2015). Las métricas se procesan íntegramente en la memoria de tu navegador con plena privacidad."
  ],
  benchmarks: {
    title: "Métricas de Reincorporación Espacial y Sincronización de Inercia",
    headers: ["Nivel de Rendimiento", "Latencia de Reincorporación (Foveación)", "Desvío de Aterrizaje (Overshoot)", "Sincronización Cinética (Ganancia)", "Perfil Neurofisiológico"],
    rows: [
      ["Élite (Pro-Aiming & Deportes)", "< 140 ms", "< 3% (bloqueo foveal exacto)", "97%+", "Precisión balística impecable. Transición instantánea a la persecución suave sin oscilaciones de búsqueda."],
      ["Avanzado (Nivel Competitivo)", "140 – 180 ms", "3% – 6%", "91% – 96%", "Rápida recuperación espacial. Micro-sacada correctora mínima con alta fidelidad cinemática tras el aterrizaje."],
      ["Competente (Adulto Sano)", "181 – 240 ms", "7% – 14%", "80% – 90%", "Parámetro estándar saludable. Breve periodo refractario pos-sacádico seguido de persecución estable."],
      ["En Desarrollo", "241 – 320 ms", "15% – 24%", "68% – 79%", "Retraso perceptible en el salto ocular. Desvíos frecuentes por exceso requiriendo múltiples correcciones."],
      ["Iniciante / Nivel Base", "> 320 ms", "> 24%", "< 68%", "Dificultad acusada en saltos angulares amplios. Compensación con movimientos de cuello no deseados."]
    ],
    note: "※ Valores de referencia fundamentados en estudios oculomotores a 50–70 cm con velocidades de 1,0x a 2,0x durante intervalos de 60 segundos. La latencia mide el tiempo transcurrido desde el salto del blanco hasta el reacoplamiento foveal."
  },
  techniques: {
    title: "Cuatro Principios Clave para una Reincorporación Visual Instantánea",
    items: [
      {
        name: "Trayectoria Balística Rectilínea Directa",
        desc: "Traza el salto sacádico por la línea recta más corta entre el punto de fuga y la coordenada de llegada. Cualquier desvío curvo penaliza drásticamente el tiempo de reacción foveal (Findlay & Walker, 1999).",
        tips: "Confía en las señales de tu visión periférica y lanza la mirada de manera decidida hacia el nuevo punto luminoso."
      },
      {
        name: "Retención del Vector de Inercia Mental",
        desc: "Aunque el objetivo cambie bruscamente de lugar, conserva su rapidez y ángulo de avance. Activa el modelo cerebelar predictivo para anticipar el desplazamiento durante la supresión sacádica (Barnes, 2008).",
        tips: "No asumas que el blanco se ha detenido; prepara tu sistema visual para fluir junto a él inmediatamente al hacer contacto."
      },
      {
        name: "Adelanto Predictivo al Aterrizar",
        desc: "La sacada requiere de 20 a 40 ms de vuelo ocular, intervalo durante el cual el blanco continúa avanzando. Dirige la mirada levemente por delante de las coordenadas de destino.",
        tips: "Un pequeño margen de anticipación compensa el tiempo de tránsito y evita quedar rezagado al aterrizar."
      },
      {
        name: "Aislamiento Cervical Riguroso",
        desc: "Los desplazamientos angulares amplios incitan a girar el cuello. El reflejo vestíbulo-ocular desestabiliza la fijación foveal al generar contra-rotaciones (Leigh & Zee, 2015).",
        tips: "Mantén el mentón firme y estable, asegurando que el movimiento provenga de los músculos del ojo."
      }
    ]
  },
  steps: [
    "Ubícate en una postura cómoda a 50–70 cm del monitor manteniendo la cabeza perfectamente estable.",
    "Selecciona la duración de la sesión (30 a 120 segundos) y el multiplicador de velocidad (0,5x a 9,0x).",
    "Fija el centro foveal sobre el blanco y acompaña su recorrido inicial de forma uniforme.",
    "Al producirse el teletransporte, lanza una sacada lineal inmediata hacia la nueva coordenada espacial.",
    "Al aterrizar, acopla suavemente la persecución continua siguiendo el vector de inercia del objetivo."
  ],
  audience: "Jugadores de shooters competitivos (Valorant, CS2, Overwatch 2, Apex Legends), atletas de deportes de pelota expuestos a desvíos veloces y deportistas visuales que buscan máxima agilidad sacádica.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('rashbass1961', 'bahill1980', 'findlay1999', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/es/drills/visual-tracking/constant-slow-pursuit", label: "Seguimiento Ocular Suave Continuo (Constant Slow)" },
    { href: "/es/drills/visual-tracking/directional-chaos-pursuit", label: "Seguimiento con Caos Direccional (Directional Chaos)" },
    { href: "/es/drills/visual-tracking/dynamic-evasion-pursuit", label: "Persecución Evasiva Reactiva (Dynamic Evasion)" },
    { href: "/es/drills/visual-tracking/ghosting-suppress-pursuit", label: "Estabilidad de Fijación Ocular (Ghosting Suppress)" },
    { href: "/es/drills/visual-tracking/infinity-pursuit", label: "Ejercicio Ocular en Ocho Infinito (Infinity)" },
    { href: "/es/drills/visual-tracking/predictive-pursuit", label: "Seguimiento Ocular Predictivo (Predictive)" }
  ]
};

export default function SpanishMomentumTeleportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MomentumTeleportPursuitClient
        copy={{
          title: "Seguimiento de Blancos Teletransportados con Inercia",
          subtitle: "Evaluación Oculomotora de Sacadas Balísticas y Reconexión de Persecución Suave",
          description: "Entrenamiento visual avanzado para blancos que conservan vectores de velocidad y se teletransportan bruscamente en pantalla. Optimiza la alternancia rápida entre sacadas balísticas y persecución continua sin oscilaciones parásitas. Gratuito en el navegador."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/momentum-teleport-pursuit" />
      </div>
    </>
  );
}
