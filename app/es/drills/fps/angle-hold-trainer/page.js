import AngleHoldClient from '@/app/drills/fps/angle-hold-trainer/AngleHoldClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Colocación de Mira – Entrenamiento de Ángulos | SkillDrills",
  description: "Entrena colocación de mira y retención de ángulos en el navegador. Calibra la separación de esquina y supera la ventaja del peeker en CS2 y Valorant.",
  keywords: [
    "colocacion de mira entrenamiento",
    "como aguantar angulos valorant",
    "entrenamiento de pre aim cs2",
    "ventaja del peeker como defender",
    "entrenar aguantar angulo fps",
    "distancia de la mira a la pared",
    "mira a la altura de la cabeza",
    "tiempo de reaccion al aguantar angulo",
    "como castigar peekers en fps",
    "aguantar esquinas cs2 entrenamiento",
    "entrenamiento de reflejos para esquinas",
    "entrenador de punteria de retencion"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/fps/angle-hold-trainer",
    languages: getAlternateLanguages('/drills/fps/angle-hold-trainer'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Colocación de Mira – Entrenamiento de Ángulos | SkillDrills",
    description: "Entrena colocación de mira y retención de ángulos en el navegador. Calibra la separación de esquina y supera la ventaja del peeker en CS2 y Valorant.",
    url: "https://skilldrills.online/es/drills/fps/angle-hold-trainer",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Colocación de Mira – Entrenamiento de Ángulos | SkillDrills",
    description: "Entrena colocación de mira y retención de ángulos en el navegador. Calibra la separación de esquina y supera la ventaja del peeker en CS2 y Valorant.",
  },
};

export default function SpanishAngleHoldPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Drills de FPS", "item": "https://skilldrills.online/es/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Colocación de Mira", "item": "https://skilldrills.online/es/drills/fps/angle-hold-trainer" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Angle Hold Pro",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entrenador en línea de colocación de mira, retención defensiva de esquinas y pre-aiming para shooters tácticos.",
    "genre": "Entrenamiento FPS / Colocación de Mira",
    "url": "https://skilldrills.online/es/drills/fps/angle-hold-trainer",
    "dateModified": "2026-09-16",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Angle Hold Pro",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Simulador interactivo de retención de ángulos y disciplina de disparo para contrarrestar el peeker's advantage en CS2 y Valorant.",
    "genre": "Entrenamiento FPS / Colocación de Mira",
    "url": "https://skilldrills.online/es/drills/fps/angle-hold-trainer",
    "dateModified": "2026-09-16",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Angle Hold Pro",
    "url": "https://skilldrills.online/es/drills/fps/angle-hold-trainer",
    "description": "Entrenador interactivo de reflejos y colocación de retícula en esquinas para shooters competitivos.",
    "gamePlatform": "Web Browser",
    "genre": ["Entrenamiento de FPS", "Entrenador de Puntería"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es la colocación de la mira (crosshair placement)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es la mecánica táctica básica de mantener el retículo siempre a la altura de la cabeza y en el punto exacto donde asomará el adversario, evitando tener que realizar flicks reactivos al verlo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es la ventaja del peeker (peeker's advantage) en shooters tácticos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es el desfase de latencia de red cliente-servidor. El atacante que asoma una esquina envía sus paquetes antes de que el defensor estático los reciba, otorgando al peeker una ventaja de 40 a 90 ms."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo aguantan ángulos los jugadores competitivos de CS2 y Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Colocando el retículo ligeramente separado del borde de la pared. Este hueco absorbe el tiempo de reacción humano y la velocidad de desplazamiento, permitiendo un clic limpio en cuanto el rival entra en la mira."
        }
      },
      {
        "@type": "Question",
        "name": "¿A qué distancia de la pared debe colocarse la mira al defender una esquina?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Varía según la velocidad prevista del atacante: ante asomos abiertos a máxima velocidad, separa más la mira. Ante jiggles cortos o aperturas lentas en shift, acércala al borde de la pared."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué provoca disparar antes de tiempo (prefire accidental) al aguantar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La ansiedad anticipatoria y fallar en la discriminación cognitiva Go/No-Go ante fintas o cebos. Entrenar la disciplina de gatillo enseña a disparar únicamente cuando el objetivo se muestra por completo."
        }
      },
      {
        "@type": "Question",
        "name": "¿En qué se diferencia aguantar un ángulo de hacer jiggle peek?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aguantar un ángulo es una posición defensiva pasiva basada en velocidad de reacción pura. Hacer jiggle peek es un movimiento activo con strafes A-D para sacar información o forzar tiros sin arriesgarse."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es la fórmula de red que define la ventaja del peeker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La ecuación es: T_advantage = (RTT_peeker / 2) + (RTT_holder / 2) + T_interp. La demora equivale a la mitad del ping de ambos jugadores sumada al búfer de interpolación del servidor."
        }
      },
      {
        "@type": "Question",
        "name": "¿Afectan los hercios del monitor a la reacción al aguantar ángulos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Un monitor a 240 Hz refresca fotogramas cada 4,17 ms frente a los 16,67 ms de una pantalla a 60 Hz, mostrando los primeros píxeles del cuerpo rival mucho antes y reduciendo el retardo global."
        }
      },
      {
        "@type": "Question",
        "name": "¿Con qué frecuencia se debe entrenar la colocación de la mira?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sesiones diarias de 10 a 15 minutos combinadas con partidas de deathmatch bastan para consolidar la respuesta refleja del dedo sin sobrecargar los tendones del brazo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Admite este simulador entrada directa de ratón (raw input)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Opera con la API HTML5 Pointer Lock y medición temporal mediante performance.now(), eliminando cualquier aceleración artificial del sistema operativo."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Practicar la Colocación de Mira y Retención de Ángulos",
    "description": "Pasos detallados para calibrar la altura de la retícula, distancia a la pared y contrarrestar el peeker's advantage.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibra la separación de la mira respecto a la pared",
        "text": "Sitúa el retículo ligeramente despegado de la esquina para dejar el margen que exige tu tiempo de reacción.",
        "url": "https://skilldrills.online/es/drills/fps/angle-hold-trainer#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Fija la mira exactamente a la altura de la cabeza",
        "text": "Alinea la retícula con marcas del entorno a nivel de la cabeza para acertar sin tener que hacer microcorrecciones.",
        "url": "https://skilldrills.online/es/drills/fps/angle-hold-trainer#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Anticipa la velocidad de carrera del oponente",
        "text": "Amplía la separación ante asomos abiertos en carrera y redúcela si esperas asomos lentos o precavidos.",
        "url": "https://skilldrills.online/es/drills/fps/angle-hold-trainer#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Dispara en cuanto el objetivo entre en la retícula",
        "text": "Confía en tu pre-aim y haz un clic inmediato al cruzar el blanco la retícula, sin intentar flicks secundarios.",
        "url": "https://skilldrills.online/es/drills/fps/angle-hold-trainer#step-4"
      }
    ]
  };

  const angleHoldGuideEs = {
    heading: "Guía de Colocación de Mira y Retención de Ángulos — Latencia y Geometría",
    intro: [
      "La retención defensiva de ángulos es una técnica clave en los shooters tácticos regida por el tiempo de reacción simple de Donders (Donders, 1868) y la discriminación visual Go/No-Go. A diferencia del tiro por flick, que exige acelerar y frenar el ratón en dos fases (Woodworth, 1899; Meyer et al., 1988), aguantar una esquina sitúa la mira previamente en el plano horizontal de la cabeza, transformando la búsqueda 2D en una cuestión de timing de clic 1D.",
      "En redes multijugador (como el sistema sub-tick de CS2 o los servidores de Valorant), el retardo de paquetes causa el conocido peeker's advantage: T_advantage = (RTT_peeker / 2) + (RTT_holder / 2) + T_interp. Para neutralizar esta desventaja, el defensor debe separar la mira de la pared en D_offset = v_peeker × T_reaccion, permitiendo que el rival entre en el retículo justo cuando se ejecuta el clic.",
      "La precisión motora responde a la Ley de Fitts (Fitts, 1954): añadir microflicks de corrección de última hora introduce ruido neuromuscular innecesario. Angle Hold Pro utiliza la función performance.now() y sincronización con el refresco de pantalla para proporcionar una medición exacta de la disciplina de disparo y detección de fintas (Hick, 1952; Woods et al., 2015).",
      "Medición de rendimiento: cada impacto y tiempo de respuesta se calcula de forma local con reloj de alta resolución. Conserva la misma sensibilidad y espacio físico en la alfombrilla entre sesiones para asentar patrones reflejos consistentes."
    ],
    benchmarks: {
      title: "Benchmarks de Retención Defensiva y Reacción al Peek",
      headers: ["Fase del Combate / Métrica", "Latencia Típica (ms)", "Factor Sensoriomotor y de Red", "Clasificación de Rendimiento"],
      rows: [
        ["Latencia de Disparo Visual Simple", "150 – 190 ms", "Activación retiniana foveal y clic en la corteza motora", "Disparo motor inconsciente ante estímulo anticipado (Donders, 1868)"],
        ["Latencia de Discriminación (Fake/Jiggle Peek)", "210 – 280 ms", "Identificación cognitiva Go/No-Go del asomo real", "Disciplina de gatillo bajo presión de señuelo (Hick, 1952)"],
        ["Déficit de Latencia por Peeker's Advantage", "40 – 90 ms", "Tránsito de paquetes RTT cliente-servidor + buffer de interpolación", "Ventaja de transmisión del atacante en movimiento"],
        ["Ventana Efectiva de Respuesta Defensiva Neta", "250 – 340 ms", "Latencia visual combinada + compensación de déficit de red", "Línea base estándar para defensores en FPS tácticos"],
        ["Precisión de Élite en Retención con Pre-Aim", "170 – 220 ms", "Separación óptima alineada con la velocidad de desplazamiento", "Maestría defensiva de alto nivel (Valorant Radiante / CS2 Faceit 10)"]
      ],
      note: "Métricas sintetizadas a partir de estudios de cronometría cognitiva (Donders, 1868; Hick, 1952; Woods et al., 2015) y análisis de código de red en FPS tácticos. Los tiempos varían según los hercios de la pantalla, tasa de sondeo del ratón y nivel de concentración."
    },
    techniques: {
      title: "Geometría de Colocación y Directrices para Aguantar Ángulos",
      items: [
        {
          name: "Calibración del Margen respecto a la Esquina",
          desc: "No pegues la mira al borde de la pared. Deja una separación horizontal proporcional a tus reflejos: más amplia contra asomos rápidos en carrera y más ceñida ante asomos lentos.",
          tips: "Si los rivales suelen rebasar tu mira antes de que dispares, ensancha el margen de colocación entre un 15% y un 20%."
        },
        {
          name: "Disciplina Horizontal a la Altura de la Cabeza",
          desc: "Fija la elevación de la mira usando referencias del mapa como cajas, marcos de puertas o marcas de pared alineadas con la cabeza a distancias habituales.",
          tips: "Evita que la mano se relaje hacia abajo haciendo caer la mira al suelo en ángulos pasivos."
        },
        {
          name: "La Regla 'Haz Clic, No Corrijas'",
          desc: "Al aguantar un ángulo con pre-aim calibrado, comprométete a hacer clic en cuanto el rival entre en el retículo, sin intentar microflicks que suman de 80 a 120 ms de retraso.",
          tips: "Confía en tu colocación y centra la mirada un poco por delante del retículo."
        },
        {
          name: "Posicionamiento en Off-Angles",
          desc: "Las esquinas habituales reciben disparos anticipados (prefires). Da medio paso hacia posiciones atípicas para descolocar el pre-aim rival manteniendo tu ángulo de tiro.",
          tips: "Planea siempre una vía de escape segura antes de tomar un off-angle arriesgado."
        }
      ]
    },
    steps: [
      "Haz clic en Iniciar para activar la pantalla completa y bloquear el cursor.",
      "Apunta a la esquina prevista a la altura de la cabeza, ajustando la separación respecto al muro.",
      "Mantén la mano firme con una tensión suave para evitar temblores por anticipación.",
      "En el instante en que el objetivo cruce la línea del retículo, haz un único clic inmediato.",
      "Monitorea tu latencia media de reacción (ms) y disciplina de disparo en las diferentes rondas."
    ],
    audience: "Jugadores de CS2, Valorant y Rainbow Six Siege que buscan perfeccionar su colocación de mira, disciplina de gatillo y reflejos de retención en esquinas.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'woodworth1899'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "Entrenamiento de Flick Shot" },
      { href: "/drills/fps/180-degree-awareness", label: "Entrenamiento de Giro 180°" },
      { href: "/drills/fps/micro-correction-precision", label: "Entrenamiento de Microcorrección" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Test de Tiempo de Reacción" }
    ]
  };

  const copyEs = {
    h1Prefix: null,
    h1Keyword: "Colocación de Mira",
    h1Suffix: " — Entrenamiento de Ángulos",
    subtitle: "Entrenamiento de Retención de Esquinas y Defensa contra Peeker's Advantage",
    rulesItems: [
      { num: "1", text: "Impacto en Objetivo", highlight: "+100 PTS (+0,6s)", result: "×Multiplicador" },
      { num: "2", text: "Spawns en Esquinas", highlight: "Aparición Rápida", result: "Ventana Menor" },
      { num: "3", text: "Progresión de Nivel", highlight: "+1 Nivel / 1400 PTS", result: "Escalado Adaptativo" },
      { num: "4", text: "Fallo / Prefire", highlight: "Penalización", result: "Reinicio Combo (-0,8s)" }
    ],
    aboutCards: [
      { iconBg: "bg-blue-600", title: "Recomendado para", text: "Defensores de zonas en Valorant, anclajes de CS2, jugadores de R6 Siege y quienes quieran dominar esquinas con disciplina." },
      { iconBg: "bg-orange-600", title: "Habilidades Entrenadas", text: "Calibración de distancia a la esquina, disciplina de gatillo frente a fintas, tiempo de reacción y consistencia de altura de cabeza." },
      { iconBg: "bg-purple-600", title: "Detección de Asomos Falsos", text: "Niveles avanzados simulan jiggles y amagos. Entrena el juicio Go/No-Go para disparar solo ante avances confirmados." }
    ],
    aboutSections: [
      {
        title: "Separación Óptima de la Pared (Geometría de Offset)",
        paragraphs: [
          "El fallo más común al aguantar un ángulo es pegar la mira al borde de la pared. Dado que procesar la imagen y mover el dedo toma entre 180 y 220 ms, un rival que asoma en carrera sobrepasará la mira pegada antes de que puedas disparar.",
          "Al dejar una separación horizontal entre la esquina y el retículo (D_offset = v_peeker × T_reacción), el enemigo entra exactamente en el punto donde se activa tu disparo, sin requerir microflicks desesperados."
        ]
      },
      {
        title: "Neutralización Matemática del Peeker's Advantage",
        paragraphs: [
          "Por la latencia de red (RTT), el atacante en carrera ve al defensor quieto entre 40 y 90 ms antes. Esta desventaja solo se compensa abriendo más la mira de la pared para absorber la velocidad transversal del adversario."
        ]
      },
      {
        title: "Metodología de Medición y Precisión",
        paragraphs: [
          "Angle Hold Pro emplea la API HTML5 Pointer Lock y marcas temporales de performance.now() para registrar latencias de clic a nivel de submilissegundo sin aceleración de ratón."
        ]
      }
    ]
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <AngleHoldClient copy={copyEs} />

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/angle-hold-trainer" locale="es" />
      </div>

      <DrillGuide guide={angleHoldGuideEs} />
      <DrillFooter />
    </>
  );
}
