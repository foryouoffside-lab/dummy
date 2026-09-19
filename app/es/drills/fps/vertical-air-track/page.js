import VerticalAirTrackClient from '@/app/drills/fps/vertical-air-track/VerticalAirTrackClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Puntería Vertical FPS – Rastreo en el Eje Y | SkillDrills',
  description: 'Entrena puntería vertical y rastreo aéreo en el navegador. Domina el control del eje Y y trayectorias parabólicas en Apex Legends y Overwatch 2 gratis.',
  keywords: [
    'entrenamiento de punteria vertical',
    'mira vertical fps',
    'rastreo aereo shooter',
    'seguimiento vertical apex',
    'control de raton eje y',
    'vertical aim trainer',
    'punteria parabolica overwatch',
    'smooth pursuit vertical',
    'entrenador de mira gratis',
    'precision vertical fps',
    'sensibilidad de raton vertical',
    'ejercicios de punteria'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/fps/vertical-air-track',
    languages: getAlternateLanguages('/drills/fps/vertical-air-track'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Puntería Vertical FPS – Rastreo en el Eje Y | SkillDrills',
    description: 'Entrena puntería vertical y rastreo aéreo en el navegador. Domina el control del eje Y y trayectorias parabólicas en Apex Legends y Overwatch 2 gratis.',
    url: 'https://skilldrills.online/es/drills/fps/vertical-air-track',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puntería Vertical FPS – Rastreo en el Eje Y | SkillDrills',
    description: 'Entrena puntería vertical y rastreo aéreo en el navegador. Domina el control del eje Y y trayectorias parabólicas en Apex Legends y Overwatch 2 gratis.',
  },
};

export default function VerticalAirTrackEsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Entrenamientos FPS", "item": "https://skilldrills.online/es/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Vertical Air-Track", "item": "https://skilldrills.online/es/drills/fps/vertical-air-track" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenador de Puntería Vertical FPS SkillDrills",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any (Web Browser)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Entrenador en línea gratuito de puntería vertical y seguimiento de blancos aéreos bajo aceleración gravitatoria para shooters de alta movilidad."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vertical Air-Track – Rastreo Vertical FPS",
    "url": "https://skilldrills.online/es/drills/fps/vertical-air-track",
    "browserRequirements": "Requires Pointer Lock API and WebGL support",
    "applicationCategory": "ShooterTraining",
    "creator": {
      "@type": "Organization",
      "name": "SkillDrills"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Vertical Air-Track",
    "description": "Simulador de blancos aéreos en arco parabólico para perfeccionar la sincronización motora en el eje Y y anticipación de caídas.",
    "genre": ["First-Person Shooter", "Aim Trainer", "Reaction Training"],
    "playMode": "SinglePlayer",
    "gamePlatform": ["PC", "Web Browser"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es el entrenamiento de puntería vertical en juegos FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Se enfoca en el movimiento del ratón en el eje Y (vertical), un plano motriz poco practicado respecto al horizontal. Es indispensable para seguir objetivos en salto o caída en Apex Legends y Overwatch 2."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es el popcorn tracking y cómo lo desarrolla este simulador?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es el seguimiento continuo de blancos que rebotan en arcos parabólicos en el aire. El ejercicio entrena la velocidad angular constante y la predicción de la aceleración por gravedad en el vértice."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo beneficia la puntería vertical en Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex Legends cuenta con trampolines de Octane, ascensores de Horizon y tirolinas de Pathfinder. Dominar el eje Y permite castigar con ráfagas limpias a enemigos en el aire sin perder el control del retroceso."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es un 'elevator peek' en shooters competitivos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ocurre cuando un rival asciende por una cuerda o desnivel de terreno para asomarse repentinamente sobre tu retícula. El ejercicio entrena la subida rápida de mira y la fijación sobre la cabeza del enemigo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué el rastreo vertical es biomecánicamente más exigente?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El movimiento horizontal utiliza la rotación fluida del codo y flexión de muñeca. El movimiento vertical exige extensión forzada de muñeca o deslizar el antebrazo superando la fricción estática de la alfombrilla."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo entrenan los jugadores de Overwatch 2 contra héroes voladores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Practican el seguimiento continuo sobre Pharah, Echo, Mercy o saltos de Winston y Doomfist, desarrollando una sincronización de velocidad milimétrica en el eje Y sin dar tirones."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tiene impacto el entrenamiento vertical en Halo Infinite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, Halo Infinite incluye cañones de impulsión, saltos de repulsor y ganchos. Mantener el seguimiento vertical permite conectar ráfagas completas de cuatro disparos con el Battle Rifle."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo se penalizan los fallos en Vertical Air-Track?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perder el contacto con la esfera reinicia el multiplicador de racha. Si activas la penalización de tiempo opcional, dejar caer un objetivo al suelo sin destruirlo resta 0,6s de la ronda."
        }
      },
      {
        "@type": "Question",
        "name": "¿Con qué frecuencia se debe practicar la puntería vertical?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sesiones de 10 a 15 minutos, 3 a 4 veces por semana, incrementan la resistencia de los músculos extensores de la muñeca y erradican sacudidas involuntarias en duelos aéreos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Este entrenador de seguimiento vertical es gratis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Totalmente gratis, sin descargas ni registros. Funciona en cualquier navegador mediante la Pointer Lock API, replicando la sensibilidad de ratón de tu juego favorito sin latencia añadida."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Entrenar Puntería Vertical y Rastreo Aéreo en el Navegador",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Sincronizar Sensibilidad y Bloquear el Cursor",
        "text": "Configura tus DPI y sensibilidad idénticos a los de tu FPS favorito en los ajustes y bloquea el ratón."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Interceptar el Despegue del Blanco",
        "text": "Sitúa la retícula en la trayectoria ascendente del objetivo nada más ser lanzado."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Seguir la Desaceleración en el Vértice",
        "text": "Modera la velocidad de arrastre en el punto más alto del arco, donde la velocidad vertical se reduce a cero."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Acelerar en la Caída Libre por Gravedad",
        "text": "Tira firmemente hacia abajo con el ratón para acompañar la aceleración gravitacional (g = 9.81 m/s²)."
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Mantener la Racha y Subir de Nivel",
        "text": "Sostén el contacto para sumar bonificaciones de altitud (+75) y superar niveles con mayor velocidad y gravedad."
      }
    ]
  };

  const verticalAirTrackGuide = {
    heading: "Guía de Puntería Vertical FPS & Seguimiento Parabólico Aéreo",
    intro: [
      "El Entrenador de Puntería Vertical (Vertical Aim Trainer / Vertical Air-Track) es un ejercicio avanzado de control neuromotor diseñado para aislar y perfeccionar la precisión en el eje Y, la anticipación de arcos gravitatorios y la intercepción de objetivos aéreos. En shooters dinámicos modernos como Apex Legends, Overwatch 2, Halo Infinite y Destiny 2, los adversarios explotan constantemente la verticalidad mediante plataformas de salto (jump pads), ganchos de agarre, elevadores de gravedad y caídas desde alturas para romper la colocación horizontal convencional de la retícula.",
      "La neurobiología del seguimiento visual de persecución vertical difiere sustancialmente del plano horizontal. Richard J. Krauzlis (2004) demostró que el seguimiento suave (smooth pursuit) vertical activa vías neuronales específicas en el vermis cerebeloso y el tronco encefálico, mostrando una mayor vulnerabilidad al temblor motor debido a la asimetría biomecánica del sistema musculoesquelético del brazo. Cyril Rashbass (1961) probó que el smooth pursuit está impulsado por el error de velocidad retiniana (retinal slip) y no por un simple error de posición estática, exigiendo una igualación continua de la velocidad visual.",
      "Seguir y abatir entidades suspendidas en el aire exige internalizar la física de la aceleración gravitatoria (g = 9,81 m/s²). Tal como establecieron Peter R. Cavanagh et al. (1984) y Michael F. Land & Peter McLeod (2000), el sistema visomotor humano anticipa la deceleración de la trayectoria parabólica en la cúspide (ápice) del salto y su subsiguiente aceleración durante el descenso. Los jugadores que no anticipan esta curvatura cinemática sufren un desfase constante, quedando rezagados al rastrear caídas libres.",
      "Al eliminar el apoyo en movimientos horizontales y aislar la trayectoria pura en el eje vertical mediante cronometría digital de alta precisión con performance.now() (Woods et al., 2015), este entrenamiento cierra la brecha entre la memoria muscular bidimensional y el dominio del combate tridimensional en 360 grados.",
      "Cómo se mide el rendimiento: cada evento e interacción se registra directamente con el reloj de alta resolución performance.now() del navegador, ejecutándose de forma estrictamente local en tu dispositivo — ninguna puntuación se envía al exterior. Dos variables físicas no pueden controlarse: los temporizadores web sufren una atenuación deliberada para mitigar vulnerabilidades Spectre (típicamente a 1 ms) y los monitores cuantizan la señal al intervalo de su tasa de refresco — unos 16,7 ms por cuadro a 60 Hz, 6,9 ms a 144 Hz y 4,1 ms a 240 Hz (Woods et al., 2015). El polling rate del ratón añade unos 8 ms a 125 Hz frente a 1 ms a 1000 Hz. Por ello, las variaciones menores a 5 ms constituyen ruido de medición y conviene comparar series de rendimiento en el mismo equipo."
    ],
    benchmarks: {
      title: "Tablas de Rendimiento: Rastreo Vertical y Tiempo de Contacto Aéreo",
      headers: ["Nivel Competitivo", "Tiempo de Contacto Útil", "Latencia de Inversión", "Impacto en Partida Real"],
      rows: [
        ["Tier 1 (Predator / Gran Maestro / Pro)", "> 82% Uptime", "Menos de 180 ms", "Rastreo milimétrico en tirolinas y planeos; transición suave en la cúspide del arco"],
        ["Tier 2 (Maestro Competitivo / Tier 2)", "70% – 82% Uptime", "180 – 230 ms", "Seguimiento estable; leves correcciones retardadas cuando el rival invierte la dirección"],
        ["Tier 3 (Diamante / Avanzado)", "58% – 70% Uptime", "230 – 290 ms", "Sólido en la subida; pierde el contacto con frecuencia en la aceleración de descenso"],
        ["Tier 4 (Platino / Oro / Intermedio)", "45% – 58% Uptime", "290 – 360 ms", "Usa micro-flicks espasmódicos en lugar de un desplazamiento uniforme en el eje Y"],
        ["Tier 5 (Plata / Bronce / Principiante)", "< 45% Uptime", "Más de 360 ms", "Bloqueo de muñeca; la mira se queda sistemáticamente por detrás de las caídas"]
      ],
      note: "El tiempo de contacto evalúa el porcentaje de permanencia de la mira en el blanco durante el vuelo; la latencia de inversión mide la reacción en el vértice (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Clínicos para Maximizar la Puntería Vertical",
      items: [
        {
          name: "Sincronización de Velocidad Retiniana en el Eje Y",
          desc: "Concéntrate en calcar la velocidad angular del blanco en lugar de ejecutar múltiples micro-flicks correctivos (Rashbass, 1961; Krauzlis, 2004).",
          tips: "Fija la mirada en el centro del blanco aéreo y desplaza la mano de forma fluida y sin frenazos."
        },
        {
          name: "Anticipación del Vértice Parabólico",
          desc: "Modera la velocidad de arrastre antes de que el objetivo llegue a la cúspide y prepárate para tirar hacia abajo (Land & McLeod, 2000).",
          tips: "Aprovecha la ralentización en la cima del salto para asegurar la bonificación de altura (+75 PTS) antes de la caída."
        },
        {
          name: "Articulación Mixta: Dedos y Antebrazo",
          desc: "En agarres claw o fingertip, contrae y estira los dedos para ajustar pequeños ángulos verticales sin desplazar la muñeca.",
          tips: "Para desplazamientos largos por la pantalla, mueve el antebrazo sin clavar el codo en la mesa."
        },
        {
          name: "Control de Fricción Estática Vertical",
          desc: "Evita apretar el ratón contra la alfombrilla, manteniendo una presión liviana y constante que facilite los cambios de sentido.",
          tips: "Si el ratón tropieza al ascender, disminuye la fuerza con la palma y limpia la superficie de deslizamiento."
        }
      ]
    },
    steps: [
      "Configura tu sensibilidad y DPI exactos a los de tu FPS principal y bloquea el cursor.",
      "Detecta el lanzamiento del blanco e intercepta su trayectoria ascendente de inmediato.",
      "Sigue la curvatura parabólica manteniendo la retícula sobre el centro de la diana.",
      "Ajusta el ritmo al frenar en el vértice para cobrar el bônus de altura.",
      "Acelera hacia abajo durante la caída libre hasta desintegrar el blanco."
    ],
    audience: "Jugadores de Apex Legends, Overwatch 2, Halo y Destiny 2 que desean dominar el seguimiento aéreo, ganchos, saltos parabólicos y eliminar la asimetría del eje Y.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'rashbass1961', 'land2000'),
    related: [
      { href: "/es/drills/fps/pro-smooth-pursuit", label: "Pro Smooth Pursuit" },
      { href: "/es/drills/fps/strafe-tracking", label: "Rastreo de Strafe" },
      { href: "/es/drills/fps/target-switching-swarm", label: "Target Switching Swarm" },
      { href: "/es/drills/fps/target-acquisition", label: "Adquisición de Objetivos FPS" },
      { href: "/es/drills/fps/flow-state", label: "Flow State" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <VerticalAirTrackClient
        copy={{
          h1Keyword: "Puntería Vertical FPS",
          h1Suffix: " – Rastreo Aéreo y Control en el Eje Y",
          statScore: "Puntos",
          statTime: "Tiempo",
          statAccuracy: "Precisión",
          statBestScore: "Récord",
          statTargetsDestroyed: "Blancos Eliminados",
          statMaxCombo: "Combo Máximo",
          statPeakLevel: "Nivel Máximo",
          startTitle: "Vertical Air-Track",
          startSubtitle: "Entrada Raw de Hardware • Progresión Dinámica de Niveles",
          startButtonText: "Iniciar Ejercicio",
          playAgainText: "Jugar de Nuevo",
          shareText: "Compartir Puntuación",
          exitText: "Salir",
          stageCaption: "Rastrea blancos en trayectorias parabólicas en el eje Y con gravedad para afinar tu precisión vertical.",
          rulesTitle: "Instrucciones del Ejercicio y Sistema de Puntos",
          aboutTitle: "Sobre el Entrenador Vertical Air-Track",
          rulesItems: [
            {
              num: "1",
              text: "Rastrear Blanco Aéreo",
              highlight: "+100 PTS / +0,4s al destruir",
              result: "Sigue la curva parabólica de forma continua"
            },
            {
              num: "2",
              text: "Bono de Altura",
              highlight: "Hasta +75 PTS adicionales",
              result: "Elimina blancos cerca del vértice del salto"
            },
            {
              num: "3",
              text: "Regla de Penalización",
              highlight: "Reinicio de combo al perder contacto",
              result: "Tocar el suelo anula la racha (-0,6s con penalización activa)"
            },
            {
              num: "4",
              text: "Progresión de Nivel",
              highlight: "Cada 1.400 PTS +1 Nivel",
              result: "La velocidad vertical y la gravedad aumentan progresivamente"
            }
          ]
        }}
      />
      <DrillGuide guide={verticalAirTrackGuide} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/vertical-air-track"
          locale="es"
        />
      </div>
      <DrillFooter />
    </>
  );
}
