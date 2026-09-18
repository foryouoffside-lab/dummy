import ConstantSlowPursuitClient from '@/app/drills/visual-tracking/constant-slow-pursuit/ConstantSlowPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Movimientos Oculares – Seguimiento Suave | SkillDrills',
  description: 'Entrena movimientos oculares de seguimiento suave (smooth pursuit) en curva de Lissajous. Mejora la estabilidad de la mirada y el rastreo visual gratis.',
  keywords: [
    'entrenamiento de movimientos oculares',
    'ejercicio de seguimiento suave',
    'smooth pursuit online',
    'estabilidad de la mirada',
    'rastreo visual continuo',
    'seguimiento ocular lissajous',
    'supresion de sacadas',
    'fijacion foveal',
    'agudeza visual dinamica',
    'entrenamiento ocular gratis',
    'motilidad ocular ejercicios',
    'ejercicio para ojos pantalla'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/visual-tracking/constant-slow-pursuit',
    languages: getAlternateLanguages('/drills/visual-tracking/constant-slow-pursuit'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Movimientos Oculares – Seguimiento Suave | SkillDrills',
    description: 'Entrena movimientos oculares de seguimiento suave (smooth pursuit) en curva de Lissajous. Mejora la estabilidad de la mirada y el rastreo visual gratis.',
    url: 'https://skilldrills.online/es/drills/visual-tracking/constant-slow-pursuit',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movimientos Oculares – Seguimiento Suave | SkillDrills',
    description: 'Entrena movimientos oculares de seguimiento suave (smooth pursuit) en curva de Lissajous. Mejora la estabilidad de la mirada y el rastreo visual gratis.',
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Rastreo Visual", "item": "https://skilldrills.online/es/drills/visual-tracking" },
    { "@type": "ListItem", "position": 3, "name": "Constant Slow Pursuit", "item": "https://skilldrills.online/es/drills/visual-tracking/constant-slow-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entrenador de Seguimiento Ocular Suave SkillDrills",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any (Web Browser)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Entrenador visual en línea para optimizar la motilidad ocular y fijación foveal continua mediante curvas harmónicas de Lissajous."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Constant Slow Pursuit – Entrenamiento de Seguimiento Ocular",
  "url": "https://skilldrills.online/es/drills/visual-tracking/constant-slow-pursuit",
  "browserRequirements": "Requires Canvas and High-Resolution Performance Timer API",
  "applicationCategory": "EyeTrainingApplication",
  "creator": {
    "@type": "Organization",
    "name": "SkillDrills"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Constant Slow Pursuit",
  "description": "Simulador de seguimiento ocular suave para eliminar sacadas correctivas y maximizar la agudeza dinámica en deportes y shooters.",
  "genre": ["Visual Training", "Eye Exercise", "Reaction Training"],
  "playMode": "SinglePlayer",
  "gamePlatform": ["PC", "Web Browser", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el seguimiento ocular suave (smooth pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es el movimiento ocular continuo y voluntario que permite mantener enfocada la imagen de un objeto en la fóvea de la retina mientras se desplaza, sin dar saltos bruscos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué se utiliza una curva de Lissajous para este ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Porque combina frecuencias harmónicas en los ejes horizontal y vertical sin esquinas ni frenazos, obligando al sistema ocular a ajustar la velocidad motriz de manera continua."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué son las sacadas correctoras (catch-up saccades)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Son saltos rápidos involuntarios del ojo cuando la velocidad de la mirada se queda rezagada frente al objetivo. El entrenamiento busca suprimirlas para lograr una visión nítida y fluida."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué beneficia a jugadores de shooters (Apex, Overwatch, Valorant)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Permite fijar la vista en enemigos en movimiento sin desenfoque retiniano, mejorando el micro-tracking del ratón al acoplar la percepción visual con la motricidad fina."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es crucial no mover la cabeza durante el entrenamiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mover la cabeza activa el Reflejo Vestíbulo-Ocular (RVO) del oído interno, lo que anula la sobrecarga neuromuscular en los músculos oculares que necesitamos fortalecer."
      }
    },
    {
      "@type": "Question",
      "name": "¿Sirve este ejercicio para deportes tradicionales como tenis o béisbol?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Seguir la pelota con la fóvea hasta el instante del golpeo optimiza la toma de decisiones y la precisión espacial en situaciones de alta velocidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Ayuda a aliviar la fatiga visual frente a pantallas de ordenador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Pasar horas fijando texto estático agarrota los músculos oculares. Los movimientos fluidos relajan los rectos y oblicuos y estimulan el parpadeo natural."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la velocidad recomendada para comenzar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comienza en 1.0x. Si experimentas pequeños saltos en la mirada, baja a 0.7x hasta que el deslizamiento sea impecable, y luego progresa a 1.4x o más."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo al día se debe practicar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De 3 a 5 minutos, una o dos veces al día, es el estímulo ideal para generar plasticidad neuromuscular sin sobrecargar la musculatura ocular."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es gratis y compatible con dispositivos móviles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Totalmente gratis, sin descargas ni registros, accesible desde cualquier navegador en PC, tableta o smartphone."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar el Seguimiento Ocular Suave en el Navegador",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Estabilizar la Cabeza y la Postura",
      "text": "Colócate a 50–70 cm de la pantalla con la cabeza inmóvil, apoyando la barbilla si lo consideras necesario."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Elegir la Velocidad de Desplazamiento",
      "text": "Selecciona la velocidad inicial (1.0x para empezar) y pulsa para iniciar la ronda de 60 segundos."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Anclar la Mirada en el Núcleo del Objetivo",
      "text": "Fija los ojos con precisión en el centro del punto luminoso según recorre la trayectoria de Lissajous."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Deslizar la Vista con Fluidez Continua",
      "text": "Acompaña la velocidad del blanco de forma continua sin adelantar la mirada ni generar saltos bruscos."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Aumentar la Dificultad",
      "text": "Una vez logres un seguimiento limpio, sube a 1.5x o desactiva la línea de guía para forzar la predicción mental."
    }
  ]
};

const guideProps = {
  heading: "Guía de Seguimiento Ocular Suave & Estabilidad de Fijación Foveal",
  intro: [
    "El seguimiento ocular suave (smooth pursuit) es la rotación continua y voluntaria de los ojos para conservar la imagen de un blanco móvil enfocada en la fóvea central de la retina. Cuando un objeto se traslada, el sistema oculomotor evalúa el deslizamiento retiniano (retinal slip) —la diferencia de velocidad entre la imagen proyectada y la retina— activando circuitos en el cerebelo y la corteza cerebral (área temporal media y campos oculares frontales) para modular las órdenes motoras en tiempo real (Krauzlis, 2004). A velocidades lentas y moderadas, sostener este flujo exige una ganancia neuromuscular elevada; si la velocidad decae, el cerebro se ve forzado a desencadenar sacadas correctoras súbitas (Robinson, 1965).",
    "Constant Slow Pursuit genera una trayectoria continua y sin ángulos rectos mediante curvas de Lissajous, concebida para fortalecer el seguimiento a velocidad constante sin recurrir a inercias lineales predecibles. Al prescindir de giros bruscos y posibilitar la ocultación de la línea guía, el ejercicio potencia la estabilidad de fijación requerida en deportes de alto rendimiento, rastreo de blancos en eSports y gimnasia visual contra la fatiga de pantalla.",
    "Rigor metodológico y postura: El progreso neuromuscular depende del aislamiento del Reflejo Vestíbulo-Ocular (RVO). Si la cabeza gira junto a los ojos, el laberinto vestibular del oído interno compensa el movimiento, anulando el esfuerzo de los músculos oculares que se pretende entrenar (Leigh & Zee, 2015). Mantén la cabeza firme. Pantallas de 144 Hz o más garantizan una representación continua sin saltos de muestreo temporal (Woods et al., 2015). Ningún dato personal se transfiere a servidores externos."
  ],
  benchmarks: {
    title: "Baremo de Rendimiento en Seguimiento Suave & Fijación Foveal",
    headers: ["Nivel de Habilidad", "Multiplicador de Velocidad", "Estabilidad de la Mirada & Supresión de Sacadas", "Perfil Neuromotor Ocular"],
    rows: [
      ["Tier 1: Apex Gaze Lock", "2.0x o superior", "Cero sacadas correctoras; fóvea fijada como un imán en el blanco incluso en curvas cerradas.", "Modelos de predicción cerebelosa perfectamente acoplados (Barnes, 2008); nivel de atletas y jugadores profesionales."],
      ["Tier 2: Seguimiento Superior", "1.4x – 1.9x", "Deslizamiento continuo y suave; micro-oscilaciones mínimas en las inflexiones con recuperación inmediata.", "Excelente coordinación de músculos rectos y oblicuos; los contornos de objetos veloces permanecen nítidos."],
      ["Tier 3: Estándar Saludable", "1.0x – 1.3x", "Seguimiento estable a velocidad normal; sacadas ocasionales en los cambios de sentido de la curva.", "Nivel fisiológico sano en adultos; totalmente adecuado para la vida diaria y videojuegos casuales."],
      ["Tier 4: Seguimiento en Desarrollo", "0.7x – 0.9x", "La mirada se queda rezagada con frecuencia, produciendo pequeños saltos escalonados de reajuste.", "Ganancia neuromuscular baja a ritmo lento; requiere práctica aislada manteniendo la cabeza bien firme."],
      ["Tier 5: Fase Inicial", "Inferior a 0.7x", "Pérdida frecuente de la trayectoria; movimiento involuntario de la cabeza o fatiga muscular precoz.", "Etapa de acondicionamiento básico; se recomienda empezar en la velocidad más baja priorizando la relajación facial."]
    ],
    note: "Baremo formulado a partir de la literatura en neurociencia visual (Robinson, 1965; Rashbass, 1961; Krauzlis, 2004; Leigh & Zee, 2015) para la valoración cualitativa de la continuidad ocular."
  },
  techniques: {
    title: "Cuatro Métodos Científicos para Optimizar el Smooth Pursuit",
    items: [
      {
        name: "Inmovilización de la Cabeza para Aislar el RVO",
        desc: "Como comprobaron Leigh & Zee (2015), mover la cabeza activa el reflejo del oído interno, eliminando la sobrecarga sobre los circuitos corticales de seguimiento suave.",
        tips: "Apoya la barbilla con suavidad y asegúrate de que solo se muevan los globos oculares en sus órbitas."
      },
      {
        name: "Anclaje Foveal en el Centro del Objetivo",
        desc: "Krauzlis (2004) demostró que el deslizamiento retiniano dirige la mirada. Fijar el centro microscópico evita desvíos sensoriales.",
        tips: "No observes la figura de forma difusa; clava la visión en el núcleo exacto del punto en movimiento."
      },
      {
        name: "Proyección Predictiva Cerebelosa",
        desc: "Barnes (2008) constató que el cerebelo memoriza trayectorias harmónicas, neutralizando el retardo biológico de 100 ms.",
        tips: "Anticipa mentalmente el recorrido de la curva para que los ojos fluyan sin frenazos en los cambios de dirección."
      },
      {
        name: "Higiene de Parpadeo y Tasa de Refresco",
        desc: "Pantallas de 144 Hz o 240 Hz facilitan un movimiento continuo sin parpadeos artificiales (Woods et al., 2015).",
        tips: "Parpadea con firmeza entre rondas para lubricar la córnea y prevenir la sequedad ocular."
      }
    ]
  },
  steps: [
    "Ajusta la velocidad inicial (0.7x a 1.2x) y activa la sesión de 60 segundos.",
    "Coloca la cabeza completamente inmóvil a unos 60 cm del monitor.",
    "Fija la fóvea en el centro del punto luminoso en cuanto comience a desplazarse.",
    "Sigue el recorrido con una velocidad ocular constante, evitando sacadas correctoras.",
    "Cuando logres una trayectoria limpia, sube la velocidad o desactiva la línea guía."
  ],
  audience: "Jugadores de eSports y FPS (Apex Legends, Valorant, CS2), deportistas de pelota (tenis, béisbol, pádel), estudiantes y personas expuestas a largas horas de pantalla.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('robinson1965', 'rashbass1961', 'krauzlis2004', 'barnes2008', 'leigh2015', 'woods2015'),
  related: [
    { href: "/es/drills/visual-tracking/sine-wave-pursuit", label: "Seguimiento en Onda Senoidal" },
    { href: "/es/drills/visual-tracking/infinity-pursuit", label: "Seguimiento en Bucle Infinito" },
    { href: "/es/drills/visual-tracking/directional-chaos-pursuit", label: "Seguimiento en Caos Direccional" },
    { href: "/es/drills/visual-tracking/predictive-pursuit", label: "Seguimiento Predictivo" },
    { href: "/es/drills/visual-tracking/dynamic-evasion-pursuit", label: "Seguimiento de Evasión Dinámica" },
    { href: "/es/drills/visual-tracking/ghosting-suppress-pursuit", label: "Estabilidad y Supresión de Ghosting" }
  ]
};

export default function ConstantSlowPursuitEsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ConstantSlowPursuitClient
        copy={{
          title: "Movimientos Oculares – Ejercicio Smooth Pursuit",
          subtitle: "Seguimiento Suave y Estabilidad de la Mirada en Curva de Lissajous"
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="/drills/visual-tracking/constant-slow-pursuit" locale="es" />
      </div>
    </>
  );
}
