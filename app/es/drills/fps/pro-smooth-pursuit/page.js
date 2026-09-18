import ProSmoothPursuitClient from '@/app/drills/fps/pro-smooth-pursuit/ProSmoothPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Tracking Suave de Puntería – Curvas FPS | SkillDrills",
  description: "Entrena el tracking suave y seguimiento en curva en tu navegador. Domina la puntería continua y fluida para Apex Legends y Overwatch 2 gratis.",
  keywords: [
    "entrenamiento de tracking suave",
    "smooth pursuit punteria fps",
    "entrenar tracking apex legends",
    "punteria de seguimiento continuo",
    "entrenar seguimiento en curva",
    "como mejorar tracking overwatch 2",
    "movimiento ocular de seguimiento suave",
    "rastreo visual continuo punteria",
    "entrenador de tracking raton gratis",
    "eliminar temblor de punteria raton",
    "estabilidad de antebrazo punteria",
    "seguimiento de blancos moviles"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/fps/pro-smooth-pursuit",
    languages: getAlternateLanguages('/drills/fps/pro-smooth-pursuit'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tracking Suave de Puntería – Curvas FPS | SkillDrills",
    description: "Entrena el tracking suave y seguimiento en curva en tu navegador. Domina la puntería continua y fluida para Apex Legends y Overwatch 2 gratis.",
    url: "https://skilldrills.online/es/drills/fps/pro-smooth-pursuit",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tracking Suave de Puntería – Curvas FPS | SkillDrills",
    description: "Entrena el tracking suave y seguimiento en curva en tu navegador. Domina la puntería continua y fluida para Apex Legends y Overwatch 2 gratis.",
  },
};

export default function ProSmoothPursuitPage() {
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
        "name": "Ejercicios FPS",
        "item": "https://skilldrills.online/es/drills/fps"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Tracking Suave Profesional",
        "item": "https://skilldrills.online/es/drills/fps/pro-smooth-pursuit"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entrenador de Tracking Suave SkillDrills",
    "url": "https://skilldrills.online/es/drills/fps/pro-smooth-pursuit",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requiere navegador moderno con soporte de API Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenamiento de Tracking Suave y Curvas",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Pro Smooth Pursuit Curve Tracking Trainer",
    "description": "Simulador de seguimiento continuo en curvas armónicas de Lissajous con bloqueo de cursor.",
    "genre": ["Action", "Esports Trainer", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Browser Game"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es el entrenamiento de Smooth Pursuit (seguimiento suave) en FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smooth Pursuit es la capacidad fisiológica de coordinar el sistema oculomotor y los músculos del brazo para mantener la retícula alineada continuamente sobre un objetivo en movimiento mediante la sincronización fluida de velocidades sin saltos bruscos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es la diferencia neurológica entre seguimiento suave y movimientos sacádicos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los movimientos sacádicos (flicks) son impulsos balísticos directos regulados por el colículo superior, mientras que el Smooth Pursuit es gestionado por la corteza temporal media (área MT/V5) y el cerebelo para computar velocidad y mantener aceleración continua sin interrupciones visuales."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué tiembla mi puntería al intentar rastrear trayectorias curvas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El temblor se produce cuando el jugador intenta realizar el seguimiento mediante micro flicks sucesivos en vez de un deslizamiento continuo. La tensión muscular excesiva en la muñeca genera fricción estática que rompe la fluidez motora."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es la anticipación visual foveal (Foveal Gaze Leading) en el tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consiste en fijar la mirada milimétricamente por delante de la silueta del blanco en movimiento. Este adelanto perceptivo alimenta al córtex premotor con la información de trayectoria necesaria para modular la velocidad con mínima latencia de reacción."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué el Smooth Pursuit es crucial en juegos de alto TTK como Apex Legends y Overwatch 2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En títulos con prolongado Time-to-Kill, abatir a un rival requiere mantener fuego efectivo durante varios segundos mientras el enemigo maniobra o salta. Una puntería de seguimiento continua optimiza el daño por segundo (DPS) de forma letal."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es una curva de Lissajous y por qué se emplea en este ejercicio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Las curvas de Lissajous son figuras armónicas bidimensionales generadas por oscilaciones sinusoidales en los ejes X e Y. Obligan a la mano y al brazo a modular aceleraciones complejas en diagonales variables, replicando maniobras de evasión avanzadas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo afectan los hercios del monitor y el polling rate del ratón al tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Monitores de alta tasa de refresco (144Hz a 360Hz) proporcionan una transición visual ininterrumpida de la posición del blanco. Polling rates de 1000Hz o superiores brindan reportes del sensor cada milisegundo, permitiendo un seguimiento sub-pixel totalmente fluido."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué agarre de ratón proporciona mayor estabilidad en el tracking prolongado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los agarres tipo Palm o Claw relajados proporcionan un apoyo equilibrado sobre el chasis del ratón, permitiendo que los grupos musculares del antebrazo y hombro guíen el movimiento sin cargar tensiones en la articulación de la muñeca."
        }
      },
      {
        "@type": "Question",
        "name": "¿Con qué frecuencia se debe practicar el seguimiento suave de puntería?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Se recomienda practicar entre 10 y 15 minutos diarios antes de iniciar sesiones clasificatorias. Dado el alto nivel de concentración sensoriomotora, descansos breves previenen la fatiga de los tendones del antebrazo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué perder contacto con la diana reinicia el combo en este entrenador?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El multiplicador de racha premia la consistencia temporal absoluta. En tiroteos reales de alto TTK, perder de vista el objetivo permite que el rival recupere coberturas o escudos, desaprovechando la ventaja táctica del enfrentamiento."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Entrenar el Tracking Suave y Seguimiento en Curva",
    "description": "Guía práctica para sincronizar velocidad de retícula y eliminar temblores en trayectorias armónicas.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configuración y Bloqueo de Puntero",
        "text": "Configura tus parámetros habituales de DPI y sensibilidad para mantener correspondencia de cm/360 y activa el Pointer Lock."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Fijación Inicial en el Blanco",
        "text": "Al aparecer la esfera móvil, alinea la retícula suavemente sin tirones bruscos de la mano."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Deslizamiento Guiado por el Antebrazo",
        "text": "Conduce el ratón desde el antebrazo siguiendo la curva de Lissajous con presión ligera y velocidad constante."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Sostén del Multiplicador de Combo",
        "text": "Mantén la retícula firme sobre la esfera durante las aceleraciones para alcanzar multiplicadores de puntuación elevados."
      }
    ]
  };

  const copyEs = {
    h1Keyword: "Tracking Suave de Puntería",
    h1Suffix: " – Curvas FPS & Fluidez",
    statScore: "Puntuación",
    statTime: "Tiempo",
    statAccuracy: "Precisión",
    statBestScore: "Récord",
    pausedTitle: "Juego Pausado",
    pausedSubtitle: "Haz clic en la pantalla para reactivar el bloqueo de cursor.",
    startTitle: "Tracking Suave Profesional",
    startSubtitle: "Seguimiento en Curva de Lissajous • Progresión Continua",
    getReady: "PREPÁRATE",
    stageCaption: "Sigue continuamente el objetivo en movimiento oscilatorio por las curvas de la pantalla sin perder contacto visual.",
    rulesTitle: "Instrucciones de Entrenamiento y Puntuación",
    rulesItems: [
      { num: "1", text: "Mantener Retícula en Objetivo", highlight: "+10 pts/segundo", result: "Seguimiento continuo de la esfera" },
      { num: "2", text: "Multiplicador de Combo", highlight: "hasta 5x bonus", result: "Aumenta al conservar el contacto ininterrumpido" },
      { num: "3", text: "Subida de Nivel", highlight: "cada 1.500 puntos", result: "Incrementa velocidad y reduce tamaño de diana" },
      { num: "4", text: "Pérdida de Contacto", highlight: "Reinicia Combo", result: "Salir de la diana restablece el combo al instante" }
    ],
    aboutTitle: "Sobre el Entrenador de Tracking Suave",
    aboutHeading: "¿Qué es el Seguimiento Suave (Smooth Pursuit)?",
    aboutText: "El seguimiento suave (Smooth Pursuit) es la facultad oculomotora de mantener el foco visual sobre un objeto en movimiento continuo mediante la modulación de velocidad de los músculos oculares y el antebrazo (Krauzlis, 2004; Barnes, 2008). Este ejercicio erradica micro flicks innecesarios transformando tu puntería en un trazo fluido y constante."
  };

  const smoothPursuitGuide = {
    heading: "Guía de Tracking Suave & Curvas de Lissajous",
    intro: [
      "El Entrenador de Tracking Suave Profesional es un entorno sensoriomotor ideado para aislar y afinar la sincronización continua de velocidad visomotora. En juegos competitivos de alto TTK como Apex Legends, Overwatch 2 y The Finals, imponerse en duelos sostenidos demanda una retícula inquebrantable sobre siluetas en constante aceleración.",
      "A diferencia de los flicks balísticos gobernados por la Ley de Fitts (1954), el seguimiento suave involucra estructuras corticales especializadas en el área temporal medial (MT/V5) y en el cerebelo (Krauzlis, 2004; Lisberger et al., 1987). Estos centros procesan vectores ópticos continuos y calibran el tono neuromuscular para igualar la velocidad del blanco.",
      "La cinemática del ejercicio emplea trayectorias armónicas de Lissajous generadas por funciones sinusoidales en ambos ejes. Esta configuración imposibilita patrones lineales previsibles y estimula el control predictivo (Barnes, 2008) sin provocar sobresaltos sacádicos intermitentes.",
      "Mediante la integración de la API Pointer Lock y cronometría de alta resolución con performance.now() (Woods et al., 2015), la aplicación monitoriza el tiempo exacto de permanencia en la diana, facilitando la eliminación progresiva de temblores para consolidar una puntería fluida y consistente.",
      "Cómo se mide: el porcentaje de permanencia y la estabilidad del cursor se registran localmente en tiempo real. Diferencias menores a 5 ms corresponden a tolerancias naturales de refresco de pantalla y muestreo del sensor."
    ],
    benchmarks: {
      title: "Niveles de Rendimiento de Tracking Continuo y Ajuste de Velocidad",
      headers: ["Nivel de Rendimiento", "Tiempo en Diana (%)", "Estado Neuromuscular y Oculomotor", "Impacto Competitivo en Juego"],
      rows: [
        ["Tier 1 (Trazo Perfecto)", "85% – 95%+", "Fijación foveal ininterrumpida; sincronización exacta en inflexiones de curvatura sin micro sacadas", "Puntería de élite en rangos Apex Predator, Top 500 Overwatch y torneos profesionales"],
        ["Tier 2 (Pro Competitivo)", "72% – 85%", "Modulación fluida del antebrazo; adaptación inmediata al alcanzar los vértices de curva", "Gana duelos prolongados 1v1 contra rivales con movilidad compleja y alto aprovechamiento de cargador"],
        ["Tier 3 (Nivel Avanzado FPS)", "58% – 72%", "Tracking lineal consistente; ligeras vacilaciones de 10 a 15% en cambios súbitos de trayectoria", "Excelente rendimiento general; pequeña pérdida de contacto frente a impulsos verticales o ganchos"],
        ["Tier 4 (Intermedio)", "42% – 58%", "Tendencia a emplear micro flicks en vez de un desplazamiento continuo; rigidez muscular que produce temblor", "Dificultad contra personajes ágiles; alto gasto de munición sin impacto efectivo"],
        ["Tier 5 (En Desarrollo)", "Menos de 42%", "Arrastre constante retrasado respecto a la diana; incapacidad de sincronizar velocidad en curvas", "Pérdida habitual de enfrentamientos directos; la retícula se descuelga continuamente"]
      ],
      note: "Los niveles reflejan el porcentaje de tiempo con la retícula sobre el objetivo en curvas sinusoidales de Lissajous medido mediante performance.now() (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Basados en Evidencia para Optimizar el Tracking Suave",
      items: [
        {
          name: "Deslizamiento con el Antebrazo y Muñeca Neutra",
          desc: "Ejecuta la mayor parte del recorrido continuo moviendo el antebrazo desde el codo, conservando la muñeca relajada para evitar micro frenados provocados por fricción estática.",
          tips: "Apoya cómodamente el antebrazo sobre el escritorio para mantener un plano de movimiento estable en curvas amplias."
        },
        {
          name: "Anticipación Visual Foveal (Gaze Leading)",
          desc: "Orienta tu mirada 1 o 2 milímetros por delante del centro del objetivo en la dirección del movimiento. Esta anticipación nutre a los centros motores con el vector direcional futuro.",
          tips: "No fijes la vista en tu propia retícula; concéntrate en el borde frontal del blanco en movimiento."
        },
        {
          name: "Modulación Suave en Puntos de Inflexión",
          desc: "En los vértices de la curva donde la diana reduce su marcha para cambiar de sentido, no frenes bruscamente. Disminuye la velocidad gradualmente e invierte el desplazamiento con suavidad.",
          tips: "Visualiza la trayectoria como un flujo armónico continuo y no como segmentos angulados independientes."
        },
        {
          name: "Presión Uniforme sobre la Alfombrilla",
          desc: "Aplica una presión descendente suave y constante para mantener una resistencia cinética homogénea en la base del ratón durante todo el trayecto.",
          tips: "Una alfombrilla con textura equilibrada y baja fricción estática previene tirones al inicio de curvaturas pronunciadas."
        }
      ]
    },
    steps: [
      "Configura tu sensibilidad y DPI habituales para preservar correspondencia motriz de cm/360 exacta y activa el Pointer Lock.",
      "Al generarse la esfera en movimiento, acopla la retícula al centro con un movimiento gradual.",
      "Acompaña la trayectoria de Lissajous deslizando el antebrazo a la misma velocidad que describe la diana.",
      "Conserva la retícula sobre el objetivo para prolongar el multiplicador de combo y superar niveles más veloces."
    ],
    audience: "Jugadores de Apex Legends, Overwatch 2 y The Finals orientados a erradicar temblores y afinar un seguimiento constante de alta precisión.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'barnes2008', 'krauzlis2004', 'lisberger1987'),
    related: [
      { href: "/es/drills/fps/anti-zigzag-movement-trainer", label: "Entrenador de Movimiento Anti-Zigzag" },
      { href: "/es/drills/fps/anti-strafe-jitter-duel", label: "Duelo Anti-Strafe Jitter" },
      { href: "/es/drills/fps/flick-shot-training", label: "Entrenamiento de Flick Shot" },
      { href: "/es/drills/fps/micro-correction-precision", label: "Micro Corrección de Puntería" }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <ProSmoothPursuitClient copy={copyEs} />

      <DrillGuide guide={smoothPursuitGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/pro-smooth-pursuit"
          locale="es"
        />
      </div>
    </>
  );
}
