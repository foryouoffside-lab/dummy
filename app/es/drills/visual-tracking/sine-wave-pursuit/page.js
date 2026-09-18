import SineWavePursuitClient from '@/app/drills/visual-tracking/sine-wave-pursuit/SineWavePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Entrenamiento Ocular Sinusoidal – SkillDrills",
  description: "Entrena el seguimiento ocular suave a traves de ondas sinusoidales. Optimiza la ganancia de velocidad y elimina el desfase visual gratis.",
  keywords: [
    "entrenamiento ocular sinusoidal",
    "seguimiento visual de ondas",
    "ejercicio ocular senoidal",
    "rastreo suave armonico",
    "ganancia de velocidad ocular",
    "control motor ocular ritmico",
    "sincronizacion cerebelosa visual",
    "latencia de fase cero ojos",
    "suprimir sacadas de recuperacion",
    "ejercicio de agilidad ocular",
    "rastreo de objetivo oscilante",
    "entrenamiento de punteria ondas"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/sine-wave-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/sine-wave-pursuit'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Entrenamiento Ocular Sinusoidal – SkillDrills",
    description: "Entrena el seguimiento ocular suave a traves de ondas sinusoidales. Optimiza la ganancia de velocidad y elimina el desfase visual gratis.",
    url: "https://skilldrills.online/es/drills/visual-tracking/sine-wave-pursuit",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Entrenamiento Ocular Sinusoidal – SkillDrills",
    description: "Entrena el seguimiento ocular suave a traves de ondas sinusoidales. Optimiza la ganancia de velocidad y elimina el desfase visual gratis.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://skilldrills.online/es"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Ejercicios",
      "item": "https://skilldrills.online/es/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Rastreo Visual",
      "item": "https://skilldrills.online/es/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Seguimiento en Onda Sinusoidal",
      "item": "https://skilldrills.online/es/drills/visual-tracking/sine-wave-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entrenamiento Ocular Sinusoidal",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Aplicacion de rastreo visual armonico para sincronizar el control motor ocular y eliminar el retraso de fase cerebeloso."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Ejercicio de Seguimiento Sinusoidal",
  "url": "https://skilldrills.online/es/drills/visual-tracking/sine-wave-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos los navegadores modernos",
  "browserRequirements": "Requiere soporte para JavaScript y HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Sine Wave Pursuit",
  "description": "Ejercicio interactivo de seguimiento visual continuo donde el usuario mantiene el foco en objetivos con oscilacion armonica.",
  "genre": ["Entrenamiento Visual", "Seguimiento Ocular", "Entrenamiento de Reflejos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar el Rastreo Armónico con Onda Sinusoidal",
  "description": "Metodologia cientifica paso a paso para sincronizar el ritmo cerebeloso y eliminar la latencia de seguimiento en curvas.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Sincronice la Frecuencia Oscilatoria",
      "text": "Sitatese a 50-70 cm de la pantalla. Observe los primeros ciclos de la onda para interiorizar mentalmente el ritmo y la cadencia."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Acelere en el Punto de Cruce",
      "text": "Incremente la velocidad de rotacion ocular al atravesar el eje central, donde el objetivo alcanza su velocidad tangencial maxima."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Amortigue la Desaceleracion en los Vertices",
      "text": "Modere progresivamente el impulso ocular al acercarse a las crestas y valles para evitar sobrepasar el punto de giro."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Suprima Sacadas Involuntarias",
      "text": "Sostenga una velocidad de seguimiento uniforme y continua en lugar de saltos sacadicos de correccion."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Que es el ejercicio Sine Wave Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sine Wave Pursuit ejercita el seguimiento visual suave en trayectorias sinusoidales horizontales y verticales, condicionando al cerebro a eliminar el desfase sensorial mediante anticipacion cerebelosa (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "En que se diferencia el rastreo sinusoidal del seguimiento a velocidad constante?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En las curvas sinusoidales, la velocidad y la aceleracion cambian continuamente: el pico de velocidad se produce en el centro y se reduce a cero en los extremos antes de invertir la marcha (Stark et al., 1962)."
      }
    },
    {
      "@type": "Question",
      "name": "Que significa el seguimiento de desfase cero?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ocurre cuando el reloj interno del cerebelo se sincroniza con el ritmo del objetivo, guiando la mirada en tiempo real sin el habitual retraso sensorial de 130 a 150 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Por que aparecen sacadas de recuperacion durante el ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si la ganancia de velocidad de seguimiento cae por debajo de 1.0, los ojos quedan retrasados. El cerebro activa entonces una sacada rapida para volver a centrar la fovea (Bahill et al., 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Como ayuda este entrenamiento a la punteria en shooters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En titulos como Apex Legends y Overwatch, los oponentes ejecutan esquivas ritmicas y saltos en arco. Este ejercicio mejora el seguimiento continuo en los puntos criticos de cambio de direccion."
      }
    },
    {
      "@type": "Question",
      "name": "Que utilidad tiene en deportes de pelota?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En tenis, padel y futbol, las pelotas trazan curvas y trayectorias oscilantes. El seguimiento suave garantiza una agudeza visual dinamica nitida en todo momento."
      }
    },
    {
      "@type": "Question",
      "name": "Por que se debe evitar mover la cabeza durante el ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El giro involuntario del cuello dispara el reflejo vestibulo-ocular (VOR), provocando micro-rotaciones correctoras que desestabilizan el seguimiento ocular suave (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Influye la tasa de refresco del monitor en el rendimiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los monitores de 144Hz o superiores muestran trayectorias continuas sin saltos de imagen, facilitando que los centros motores corticales procesen el movimiento con fluidez (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Es gratuito este entrenamiento ocular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si, SkillDrills ofrece esta plataforma interactiva de forma totalmente gratuita y accesible desde el navegador sin necesidad de registros."
      }
    },
    {
      "@type": "Question",
      "name": "Con que regularidad es conveniente entrenar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sesiones breves de 5 a 10 minutos repetidas entre 3 y 5 veces por semana consolidan la sincronizacion cerebelosa y suprimen sacadas involuntarias en menos de un mes (Barnes, 2008)."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Científicas del Rastreo en Onda Sinusoidal y Control Oculomotor",
  intro: [
    "La capacidad del sistema de seguimiento ocular suave (Smooth Pursuit) se pone a prueba con mayor rigor cuando la mirada sigue patrones de oscilacion armonica en lugar de trayectorias lineales predecibles. A lo largo de una funcion sinusoidal, la velocidad y la aceleracion cambian de manera constante: la velocidad alcanza su maximo al cruzar el eje central de equilibrio, mientras que desacelera progresivamente hasta detenerse en las crestas y valles antes de invertir el sentido (Stark et al., 1962; Robinson, 1965).",
    "Los estudios neurologicos de David Robinson (1965) y Barnes (2008) demostraron que los movimientos impredecibles conllevan un retraso sensoriomotor obligatorio de 130 a 150 milisegundos. Sin embargo, ante estimulos sinusoidales periodicos, los circuitos del cerebelo asimilan el patron en pocos ciclos y generan seales motoras anticipatorias que anulan el retraso sensorial, alcanzando la sincronizacion de desfase cero.",
    "Si la frecuencia o la velocidad exceden las capacidades neuromusculares, la ganancia de seguimiento disminuye. Segun demostraron Rashbass (1961) y Bahill et al. (1980), al retrasarse la velocidad ocular respecto al objetivo, el sistema visual recurre a sacadas compensatorias bruscas que deterioran la vision transitoriamente. Este entrenamiento acondiciona la musculatura extraocular para sostener una ganancia unitaria perfecta de 1.0 de forma fluida."
  ],
  benchmarks: {
    title: "Baremos de Rendimiento en Seguimiento Sinusoidal y Ganancia de Velocidad",
    headers: ["Nivel de Rendimiento", "Ganancia de Velocidad", "Latencia de Desfase", "Sacadas por Ciclo", "Perfil Oculomotor"],
    rows: [
      ["Élite (Esports / Pro)", "0.96 – 1.02", "< 15 ms (Sincronización Total)", "0 – 1 (Fluidez Continua)", "Sincronización rítmica cerebelosa perfecta sin desfase y enfoque foveal impecable."],
      ["Avanzado (Competitivo)", "0.90 – 0.95", "15 – 30 ms", "2 – 3", "Alta fidelidad de recorrido con mínimas micro-sacadas en puntos de inversión."],
      ["Competente (Adulto Sano)", "0.82 – 0.89", "31 – 50 ms", "4 – 5", "Buen seguimiento armónico con ligero desajuste en frecuencias elevadas."],
      ["En Desarrollo (Con Desfase)", "0.70 – 0.81", "51 – 80 ms", "6 – 8", "Inestabilidad en vértices y sacadas correctoras frecuentes para recuperar el blanco."],
      ["Principiante (Ajuste Motor)", "< 0.70", "> 80 ms", "> 9", "Incapacidad para anticipar el ritmo armónico con seguimiento puramente reactivo."]
    ],
    note: "※ Mediciones obtenidas en pantallas 1080p a 50–70 cm de distancia con velocidades de 1.0x a 1.5x. Evaluado segun el ratio de ganancia y la reduccion de sacadas correctoras."
  },
  techniques: {
    title: "Cuatro Técnicas Clave para Dominar el Rastreo Sinusoidal Armónico",
    items: [
      {
        name: "Sincronización de Fase Armónica",
        desc: "Aproveche las primeras oscilaciones para asimilar la cadencia del objetivo. Conecte el reloj interno cerebeloso para guiar la aceleracion ocular con el ritmo del movimiento (Robinson, 1965).",
        tips: "Mantenga un compas mental constante ('uno-dos, uno-dos') para eliminar el desfase sensorial."
      },
      {
        name: "Amortiguación en el Ápice",
        desc: "Al acercarse a los extremos superior o inferior, modere suavemente la tension muscular para evitar que el impulso sobrepase el punto de giro.",
        tips: "Visualice la oscilacion suave de un pendulo desacelerando en su punto mas alto antes de caer."
      },
      {
        name: "Aceleración en el Cruce Central",
        desc: "La velocidad de traslacion llega a su punto culminante al cruzar el eje horizontal neutro. Aplique un impulso activo para no perder el contacto foveal.",
        tips: "Incremente la cadencia ocular de forma deliberada en el centro para conservar la sincronia."
      },
      {
        name: "Supresión Disciplinada de Sacadas",
        desc: "Evite recurrir a saltos oculares bruscos ante minimas desviaciones. Recupere el alineamiento ajustando suavemente la velocidad de seguimiento (Bahill et al., 1980).",
        tips: "Conserve los musculos oculares relajados y flexibles para que la mirada fluya de forma ininterrumpida."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('stark1962', 'robinson1965', 'rashbass1961', 'bahill1980', 'barnes2008', 'woods2015'),
  related: [
    { href: "/es/drills/visual-tracking/constant-slow-pursuit", label: "Seguimiento Lento Continuo (Constant Slow)" },
    { href: "/es/drills/visual-tracking/directional-chaos-pursuit", label: "Seguimiento en Caos Direccional (Directional Chaos)" },
    { href: "/es/drills/visual-tracking/dynamic-evasion-pursuit", label: "Seguimiento con Evasión Dinámica (Dynamic Evasion)" },
    { href: "/es/drills/visual-tracking/ghosting-suppress-pursuit", label: "Supresión de Imágenes Fantasma (Ghosting Suppress)" },
    { href: "/es/drills/visual-tracking/infinity-pursuit", label: "Ejercicio Ocular en Forma de Ocho (Infinity)" },
    { href: "/es/drills/visual-tracking/momentum-teleport-pursuit", label: "Seguimiento con Teletransporte e Inercia (Momentum)" }
  ]
};

export default function SineWavePursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SineWavePursuitClient copy={{ title: "Seguimiento Sinusoidal", subtitle: "Entrenamiento Ocular Suave y Armónico" }} />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/sine-wave-pursuit" />
      </div>
    </>
  );
}
