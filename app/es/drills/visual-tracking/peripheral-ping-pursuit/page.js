import PeripheralPingPursuitClient from '@/app/drills/visual-tracking/peripheral-ping-pursuit/PeripheralPingPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SPANISH SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "entrenamiento de visión periférica" / "ejercicios para visión periférica"
// Secondary:    "atención encubierta espacial", "ampliación del campo visual", "estabilidad foveal central"
// LSI / Domain:  "detección periférica de estímulos", "percepción visual lateral", "seguimiento visual y visión amplia",
//               "visión periférica para shooters", "agudeza visual periférica deportes", "coordinación foveal periférica", "campo visual dinámico ejercicio"
// Authentic Domain Terms: Entrenamiento de Visión Periférica（Peripheral Vision Training）, Atención Espacial Encubierta（Covert Spatial Attention）, Campo Visual Útil（Useful Field of View / UFOV）, Fijación Foveal（Foveal Fixation）, Bastones Retinianos（Retinal Rods）, Supresión Sacádica（Saccadic Suppression）, Visión en Túnel（Tunnel Vision）
// ============================================================

export const metadata = {
  title: "Entrenamiento de Visión Periférica – SkillDrills",
  description: "Entrena tu vision periferica y estabilidad foveal central: detecta impulsos laterales mientras sigues el blanco continuo. Gratis en el navegador.",
  keywords: [
    "entrenamiento de visión periférica",
    "ejercicios para visión periférica",
    "atención encubierta espacial",
    "ampliación del campo visual",
    "estabilidad foveal central",
    "detección periférica de estímulos",
    "percepción visual lateral",
    "seguimiento visual y visión amplia",
    "visión periférica para shooters",
    "agudeza visual periférica deportes",
    "coordinación foveal periférica",
    "campo visual dinámico ejercicio"
  ],
  openGraph: {
    title: "Entrenamiento de Visión Periférica – SkillDrills",
    description: "Entrena tu vision periferica y estabilidad foveal central: detecta impulsos laterales mientras sigues el blanco continuo. Gratis en el navegador.",
    type: "website",
    url: "https://skilldrills.online/es/drills/visual-tracking/peripheral-ping-pursuit",
    siteName: "SkillDrills",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrenamiento de Visión Periférica – SkillDrills",
    description: "Entrena tu vision periferica y estabilidad foveal central: detecta impulsos laterales mientras sigues el blanco continuo. Gratis en el navegador.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/peripheral-ping-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/peripheral-ping-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Ejercicios", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Seguimiento Visual", "item": "https://skilldrills.online/es/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Entrenamiento de Visión Periférica – Ping Pursuit", "item": "https://skilldrills.online/es/drills/visual-tracking/peripheral-ping-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entrenamiento de Visión Periférica y Atención Encubierta",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Herramienta de doble tarea neurovisual para evaluar la estabilidad foveal central y la velocidad de detección en el campo periférico."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Aplicación de Visión Periférica Ping Pursuit",
  "url": "https://skilldrills.online/es/drills/visual-tracking/peripheral-ping-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos los navegadores modernos",
  "browserRequirements": "Requiere compatibilidad con JavaScript y HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entrenamiento de Visión Periférica Ping Pursuit",
  "description": "Ejercicio visual interactivo donde el usuario mantiene el seguimiento del blanco central mientras detecta señales en las esquinas de la pantalla.",
  "genre": ["Entrenamiento Visual", "Visión Periférica", "Entrenamiento de Reflejos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar la Visión Periférica con el Ping Pursuit",
  "description": "Protocolo neurofisiológico para expandir el campo visual útil sosteniendo una fijación foveal estable.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Anclaje Foveal Central",
      "text": "Sitúate a una distancia de 50 a 70 cm del monitor. Fija la mirada en el blanco central en desplazamiento sin desviar los ojos."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Expansión de la Atención Encubierta",
      "text": "Amplía el campo consciente hacia los márgenes de la pantalla manteniendo el eje ocular físico en el centro."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Detección de Impulsos Periféricos",
      "text": "Al percibir un destello momentáneo en la periferia, capta el estímulo mediante los bastones retinianos sin lanzar la mirada."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Respuesta Motriz Inmediata",
      "text": "Activa la respuesta de inmediato manteniendo la trayectoria fluida de seguimiento sobre el objetivo principal."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿En qué consiste el entrenamiento de visión periférica Ping Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es una prueba de doble tarea neurovisual que entrena la atención espacial encubierta y amplía el campo visual útil (UFOV) sin perder el seguimiento foveal continuo (Posner, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia fisiológica entre la fóvea y la periferia retiniana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La fóvea abarca los 1 o 2 grados centrales con alta densidad de conos para ver detalles. La periferia está formada por bastones y la vía magnocelular, orientada a detectar movimiento y cambios de brillo (Wolfe, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo opera la atención espacial encubierta sin mover los ojos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La atención encubierta es gestionada por la red frontoparietal dorsal, permitiendo desplazar el foco mental por el campo visual sin rotar físicamente los ojos (Eriksen & St. James, 1986)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo previene este ejercicio la visión en túnel bajo tensión?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El estrés cognitivo constriñe el campo visual útil. El acondicionamiento con doble tarea entrena a la corteza visual para preservar un ancho de banda amplio en situaciones exigentes."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué no se debe desviar la mirada hacia el destello periférico?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mirar directamente dispara una sacada balística que induce supresión sacádica durante 50 a 100 ms, provocando una ceguera momentánea respecto al blanco central (Findlay & Walker, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué ventajas aporta este entrenamiento en videojuegos de disparos (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los jugadores de élite fijan la retícula en la zona de contacto mientras monitorean el minimapa y los flancos, evitando descuidos tácticos por visión en túnel."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo se transfiere este entrenamiento al rendimiento deportivo tradicional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En fútbol, baloncesto o tenis, los atletas siguen la pelota centralmente mientras detectan los movimientos de rivales y compañeros en los laterales (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué efecto tiene la tasa de refresco del monitor en la prueba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las pantallas de alta frecuencia (144Hz o superiores) muestran los destellos sin persistencia borrosa, permitiendo a los bastones periféricos registrar el impulso más rápido (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Esta herramienta de entrenamiento es gratuita y sin anuncios invasivos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, SkillDrills ofrece esta aplicación sin coste alguno, sin necesidad de registro ni descargas, directamente en el navegador."
      }
    },
    {
      "@type": "Question",
      "name": "¿Con qué frecuencia se debe practicar para lograr mejoras perceptivas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Practicar de 3 a 5 veces por semana en sesiones cortas de 5 a 10 minutos amplía de forma demostrada el campo visual útil en un lapso de 4 a 6 semanas."
      }
    }
  ]
};

const guideProps = {
  heading: "Fundamentos Científicos de Visión Periférica y Atención Espacial",
  intro: [
    "La retina humana cuenta con una marcada división de tareas: la visión foveal nítida ocupa apenas los 1° a 2° centrales del campo visual (vía parvocelular), mientras que la mayor parte del espacio circundante es procesada por la retina periférica, rica en bastones y asociada a la vía magnocelular, experta en cambios de luminosidad y movimiento rápido (Wolfe, 1994; Leigh & Zee, 2015). De forma instintiva, el cerebro tiende a lanzar sacadas hacia cualquier estímulo periférico.",
    "El ejercicio Ping Pursuit entrena la atención espacial encubierta: la facultad de ensanchar el campo visual útil y captar sucesos periféricos sin apartar los ojos del blanco central (Posner, 1980; Eriksen & St. James, 1986). Al mantener una fijación foveal estricta en el centro, se condiciona al campo ocular frontal a contener sacadas reflejas y se optimiza la sensibilidad magnocelular (Findlay & Walker, 1999).",
    "Los tiempos de respuesta del monitor y las latencias de entrada repercuten en la detección de impulsos breves (Woods et al., 2015). Todas las mediciones se efectúan de forma local en la memoria de tu navegador, garantizando confidencialidad absoluta."
  ],
  benchmarks: {
    title: "Métricas de Campo Visual Útil (UFOV) y Latencia Periférica",
    headers: ["Nivel de Rendimiento", "Campo Visual Útil (UFOV %)", "Tiempo de Reacción Periférico", "Estabilidad Central", "Perfil Neurofisiológico"],
    rows: [
      ["Élite (Esports / Deportistas)", "Más de 92%", "Menos de 280 ms", "Más de 95%", "Desacoplamiento foveal perfecto; conciencia panorámica sin desviar la mirada central."],
      ["Avanzado (Nivel Competitivo)", "85% – 92%", "280 ms – 340 ms", "90% – 95%", "Excelente distribución de atención encubierta; mínima demora ante estímulos laterales."],
      ["Competente (Adulto Sano)", "75% – 84%", "341 ms – 410 ms", "82% – 89%", "Sólida capacidad de doble tarea; leve visión en túnel con movimientos centrales rápidos."],
      ["En Desarrollo", "60% – 74%", "411 ms – 500 ms", "70% – 81%", "Retraso apreciable; micro-sacadas involuntarias frecuentes hacia los destellos periféricos."],
      ["Iniciante / Nivel Base", "Menos de 60%", "Más de 500 ms", "Menos de 70%", "Marcada visión en túnel; pérdida constante del seguimiento central al activarse el impulso."]
    ],
    note: "※ Baremos basados en pruebas estandarizadas a 50–70 cm con series de doble tarea de 60 segundos. Solo se puntúan las repeticiones donde se mantiene el seguimiento central."
  },
  techniques: {
    title: "Cuatro Principios Clave para Desarrollar la Visión Periférica",
    items: [
      {
        name: "Protocolo de Anclaje Foveal",
        desc: "Condiciona los músculos extraoculares para mantenerse fijados en el blanco central móvil. Reprime el impulso de mirar el destello lateral para no sufrir periodos de supresión sacádica (Findlay & Walker, 1999).",
        tips: "Visualiza que tu mirada central es un punto magnético firme mientras tu mente cubre la pantalla como un radar abierto."
      },
      {
        name: "Ampliación de la Atención Encubierta",
        desc: "Extiende tu atención desde el centro hacia los cuatro bordes del monitor. Pasa a una modalidad de enfoque difuso donde los bastones perciben cambios lumínicos sin fijar la vista (Posner, 1980).",
        tips: "No trates de distinguir la forma exacta del destello; pulsa el botón en cuanto percibas la alteración de brillo."
      },
      {
        name: "Activación de la Vía Dorsal",
        desc: "Las señales visuales viajan por la vía ventral ('qué es') y dorsal ('dónde está'). La detección periférica depende de la vía dorsal. Evita el análisis verbal y confía en el reflejo motor directo.",
        tips: "Responde de forma inmediata al estímulo luminoso sin detenerte a pensar o procesar la señal."
      },
      {
        name: "Control Respiratorio Antiestrés",
        desc: "La activación simpática reduce el campo visual generando visión en túnel repentina (Eriksen & St. James, 1986). La respiración nasal rítmica y pausada estabiliza las pulsaciones y mantiene amplio el campo visual.",
        tips: "Inhala despacio durante 4 segundos y exhala en 6 segundos para destensar la musculatura del cuello y de los ojos."
      }
    ]
  },
  steps: [
    "Ubícate en una posición equilibrada a 50–70 cm del monitor manteniendo la cabeza inmóvil.",
    "Configura el tiempo de la prueba (30 a 120 segundos) y la velocidad del blanco central.",
    "Fija la vista en el objetivo del centro acompañando su recorrido de forma continua.",
    "Al percibir un destello en la periferia, regístralo sin mover los ojos de la trayectoria central.",
    "Presiona de inmediato la tecla de reacción y evalúa tu porcentaje de campo visual útil."
  ],
  audience: "Jugadores de shooters competitivos (Valorant, CS2, Overwatch 2, Apex Legends), deportistas de equipo, conductores y cualquier persona que desee superar la visión en túnel y aumentar su agilidad visual.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('posner1980', 'eriksen1986', 'wolfe1994', 'findlay1999', 'leigh2015', 'woods2015'),
  related: [
    { href: "/es/drills/visual-tracking/constant-slow-pursuit", label: "Seguimiento Ocular Suave Continuo (Constant Slow)" },
    { href: "/es/drills/visual-tracking/directional-chaos-pursuit", label: "Seguimiento con Caos Direccional (Directional Chaos)" },
    { href: "/es/drills/visual-tracking/dynamic-evasion-pursuit", label: "Persecución Evasiva Reactiva (Dynamic Evasion)" },
    { href: "/es/drills/visual-tracking/ghosting-suppress-pursuit", label: "Estabilidad de Fijación Ocular (Ghosting Suppress)" },
    { href: "/es/drills/visual-tracking/infinity-pursuit", label: "Ejercicio Ocular en Ocho Infinito (Infinity)" },
    { href: "/es/drills/visual-tracking/momentum-teleport-pursuit", label: "Seguimiento de Blanco Teletransportado (Momentum)" }
  ]
};

export default function SpanishPeripheralPingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PeripheralPingPursuitClient
        copy={{
          title: "Entrenamiento de Visión Periférica y Expansión del Campo Visual",
          subtitle: "Evaluación de Doble Tarea: Fijación Foveal Central y Detección de Estímulos Laterales",
          description: "Entrenamiento visual avanzado para mitigar la visión en túnel y desarrollar la atención espacial encubierta. Sigue el objetivo central con estabilidad mientras detectas destellos en los márgenes de la pantalla sin apartar los ojos. Gratuito en el navegador."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/peripheral-ping-pursuit" />
      </div>
    </>
  );
}
