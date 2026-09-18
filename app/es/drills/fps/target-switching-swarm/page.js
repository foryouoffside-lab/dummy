import TargetSwitchingSwarmClient from '@/app/drills/fps/target-switching-swarm/TargetSwitchingSwarmClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Target Switching FPS – Cambio Rápido de Blanco | SkillDrills',
  description: 'Entrena target switching y cambio rápido de blancos en el navegador. Elimina la duda tras cada baja y domina spray transfers en Valorant y CS2 gratis.',
  keywords: [
    'target switching aim trainer',
    'cambio de objetivo fps',
    'entrenamiento de punteria fps',
    'spray transfer cs2',
    'cambio de blanco valorant',
    'flick continuo shooter',
    'punteria rapida multi blanco',
    'entrenador de mira gratis',
    'transicion de objetivos',
    'reflejos de disparo fps',
    'control de retroceso y cambio',
    'precision de raton'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/fps/target-switching-swarm',
    languages: getAlternateLanguages('/drills/fps/target-switching-swarm'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Target Switching FPS – Cambio Rápido de Blanco | SkillDrills',
    description: 'Entrena target switching y cambio rápido de blancos en el navegador. Elimina la duda tras cada baja y domina spray transfers en Valorant y CS2 gratis.',
    url: 'https://skilldrills.online/es/drills/fps/target-switching-swarm',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Switching FPS – Cambio Rápido de Blanco | SkillDrills',
    description: 'Entrena target switching y cambio rápido de blancos en el navegador. Elimina la duda tras cada baja y domina spray transfers en Valorant y CS2 gratis.',
  },
};

export default function TargetSwitchingSwarmEsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Entrenamientos FPS", "item": "https://skilldrills.online/es/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Target Switching Swarm", "item": "https://skilldrills.online/es/drills/fps/target-switching-swarm" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenador de Target Switching FPS SkillDrills",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any (Web Browser)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Herramienta online gratuita de target switching y cambio de blancos en ráfaga para jugadores competitivos de Valorant, CS2 y Apex Legends."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Target Switching Swarm – Puntería y Cambio de Objetivos",
    "url": "https://skilldrills.online/es/drills/fps/target-switching-swarm",
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
    "name": "Target Switching Swarm",
    "description": "Simulador de enjambre de objetivos dinámicos para perfeccionar la velocidad de transición motora, spray transfer y erradicar pausas cognitivas.",
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
        "name": "¿Qué es el target switching en el entrenamiento de puntería FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El target switching (cambio de objetivo) es la técnica de eliminar un blanco y lanzar la retícula al siguiente adversario de forma instantánea y continua, sin pausas de confirmación ni regresar a un centro neutro."
        }
      },
      {
        "@type": "Question",
        "name": "¿En qué se diferencia el target switching de un flick shot estándar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un flick shot estándar involucra un único movimiento balístico desde una posición de reposo. El target switching exige enlazar múltiples flicks continuos con frenado brusco en el centro de cada blanco, encadenando impactos en sucesión inmediata."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué el formato de enjambre (swarm) mejora las jugadas de multi-kill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Al aparecer múltiples blancos al mismo tiempo con tiempo de vida limitado, el cerebro se ve obligado a utilizar la visión periférica para planificar la siguiente trayectoria mientras la mano dispara al objetivo actual, acelerando el enrutamiento espacial."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué los jugadores tienden a dudar o congelarse tras conseguir una baja?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Esa pausa involuntaria de 100 a 250 ms ocurre cuando el jugador espera el sonido o animación de confirmación de baja antes de buscar un nuevo enemigo. El entrenamiento condiciona a iniciar el movimiento sacádico sin esperar retroalimentación."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo beneficia el target switching a los spray transfers en CS2 y Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El spray transfer requiere redirigir el retroceso continuo de un enemigo a otro en una fracción de segundo. El target switching entrena la memoria motriz para frenar con exactitud sobre el nuevo objetivo sin desviar el patrón de ráfaga."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué títulos competitivos requieren mayor habilidad en cambio de blanco?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Counter-Strike 2, Valorant, Apex Legends, Overwatch 2 y Call of Duty Warzone. En shooters tácticos asegura ganar duelos en desventaja numérica (1vX); en battle royales permite cambiar de foco al derribar escudos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué agarre de ratón favorece un target switching más rápido y preciso?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El Claw grip y el Fingertip grip ofrecen la mayor ventaja porque combinan la amplitud del brazo para movimientos extensos con la articulación de los dedos para frenar y ajustar micrométricamente en el blanco."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo se aplica la Ley de Fitts al cambio de objetivos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La Ley de Fitts (Fitts, 1954) relaciona el tiempo de movimiento con la distancia y tamaño del objetivo. En target switching, aprender a elegir objetivos cercanos minimiza la distancia angular, recortando drásticamente el tiempo total por baja."
        }
      },
      {
        "@type": "Question",
        "name": "¿Con qué frecuencia se debe practicar target switching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Se recomiendan sesiones de 10 a 15 minutos al día como calentamiento antes de jugar partidas clasificatorias. Esto activa los circuitos sacádicos y la coordinación ojo-mano sin fatigar la musculatura del brazo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es gratis y compatible este entrenador de cambio de objetivos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Totalmente gratis, sin descargas ni registros. Funciona en cualquier navegador moderno mediante la Pointer Lock API, replicando la sensibilidad de ratón de tu juego favorito sin latencia artificial."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Entrenar Target Switching y Cambio Rápido de Blanco en FPS",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configurar la Sensibilidad y Bloquear el Cursor",
        "text": "Sincroniza tus DPI y sensibilidad idénticos a los de tu shooter principal en los ajustes y bloquea el cursor con un clic."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Detectar Agrupaciones de Blancos Cercanos",
        "text": "Realiza un barrido visual del enjambre para localizar pares o ternas de blancos con menor separación angular."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Disparar al Primer Blanco y Ganar Bonificación de Tiempo",
        "text": "Elimina el blanco inicial para obtener +100 puntos y sumar +0,35s al cronómetro de supervivencia."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Encadenar el Siguiente Blanco sin Pausa de Confirmación",
        "text": "Aprovecha la inercia para saltar al siguiente blanco contiguo de inmediato, sin esperar confirmaciones visuales."
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Sostener Rachas de Combo para Desbloquear Niveles Rápidos",
        "text": "Mantén el ritmo sin fallos para disparar el multiplicador de puntos y avanzar a rondas con mayor velocidad."
      }
    ]
  };

  const targetSwitchingGuide = {
    heading: "Guía de Target Switching & Cinemática de Múltiples Blancos en FPS",
    intro: [
      "Target Switching Swarm es un entrenamiento motriz y de indexación visual concebido para automatizar transiciones veloces y fluidas entre múltiples enemigos hostiles. En shooters tácticos como Counter-Strike 2 y Valorant, o juegos vertiginosos como Apex Legends, los combates no suelen ser aislados duelos 1v1. Ganar rondas cruciales exige aniquilar al primer adversario y encadenar de inmediato un cambio de blanco fulminante hacia un segundo enemigo sin vacilación cognitiva.",
      "La psicofísica del cambio de objetivo está fundamentada en la Ley de Fitts (Fitts, 1954) y en el modelo estocástico de submovimientos optimizados de David E. Meyer et al. (1988). Según estos principios, un movimiento de puntería consta de una fase balística inicial que recorre cerca del 90% de la distancia, continuada por microajustes correctivos guiados visualmente. Los jugadores aficionados pierden de 100 a 250 ms tras cada baja observando la animación del impacto. Los tiradores de élite ya han iniciado el movimiento ocular sacádico hacia el siguiente objetivo antes de finalizar el disparo anterior.",
      "El procesamiento de enjambres poblados depende de la integración de características y de la búsqueda visual preatencional (Anne M. Treisman & Garry Gelade, 1980; Jeremy M. Wolfe, 2007). El córtex visual humano registra múltiples marcadores espaciales en paralelo (teoría FINST), lo que permite estructurar rutas cinemáticas eficientes entre blancos vecinos, optimizando la trayectoria angular del ratón.",
      "Metodología de medición: todos los clics y transiciones se cronometran con el reloj de alta resolución performance.now() del navegador, ejecutándose íntegramente de manera local en tu equipo. Consideraciones técnicas: los navegadores redondean los temporizadores (~1 ms) por mitigación de Spectre y los monitores actualizan la imagen a intervalos fijos (16,7 ms a 60 Hz, 6,9 ms a 144 Hz, 4,1 ms a 240 Hz; Woods et al., 2015). El polling rate del ratón añade unos 8 ms a 125 Hz frente a 1 ms a 1000 Hz. Diferencias inferiores a 5 ms corresponden al margen normal de hardware."
    ],
    benchmarks: {
      title: "Tablas de Rendimiento: Target Switching y Latencia de Transición",
      headers: ["Nivel Competitivo", "Tiempo de Transición", "Tasa de Eliminación (Blancos/Min)", "Impacto en Partida Real"],
      rows: [
        ["Tier 1 (Radiant / Faceit Nivel 10 / Pro)", "Menos de 210 ms", "110+ Blancos/min", "Spray transfers perfectos; cero pausa de confirmación; resolución fluida de situaciones 1v3"],
        ["Tier 2 (Immortal / Faceit 8-9 / Master)", "210 – 260 ms", "92 – 110 Blancos/min", "Excelente fluidez en el encadenamiento; leve temblor en transiciones muy amplias; sólida tasa de bajas"],
        ["Tier 3 (Ascendant / Diamante / Avanzado)", "260 – 320 ms", "74 – 92 Blancos/min", "Eficaz en blancos agrupados; sufre cuando el siguiente objetivo está al otro extremo del monitor"],
        ["Tier 4 (Platino / Oro / Intermedio)", "320 – 400 ms", "56 – 74 Blancos/min", "Pausa evidente tras cada baja (100+ ms de retraso); tiende a pasarse del objetivo por frenado tardío"],
        ["Tier 5 (Plata / Bronce / Principiante)", "Más de 400 ms", "Menos de 56 Blancos/min", "Reubica la mano desde cero tras cada tiro; búsqueda visual lenta; tensión excesiva en la muñeca"]
      ],
      note: "El tiempo de transición evalúa el lapso entre la destrucción de un blanco y la llegada al siguiente; la tasa de eliminación mide la cadencia de bajas por minuto a lo largo de la ronda (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Clínicos para Maximizar el Target Switching",
      items: [
        {
          name: "Planificación Sacádica e Indexación Visual",
          desc: "Dirige la vista al siguiente blanco mientras la mano todavía asienta el microajuste en el blanco presente (Treisman & Gelade, 1980; Wolfe, 2007). El ojo se anticipa a la mano entre 50 y 80 ms.",
          tips: "No te quedes mirando el objetivo que acabas de destruir; permite que la visión periférica verifique la baja mientras la fóvea visual enfoca el próximo blanco."
        },
        {
          name: "Frenado Terminal y Control Submovimental",
          desc: "Ejerce una tensión muscular controlada en el 10% final del flick para detener el ratón en seco sobre el centro de la diana sin rebotar (Meyer et al., 1988).",
          tips: "Imagina que tu ratón tiene frenos de alto rendimiento: acelera con potencia saliendo del objetivo anterior y afianza el freno al llegar al siguiente."
        },
        {
          name: "Enrutamiento Espacial por Proximidad Inmediata",
          desc: "Prioriza eliminar blancos que compartan la menor separación angular antes de cruzar la pantalla en trayectorias caóticas (Fitts, 1954).",
          tips: "Limpia parejas contiguas primero para maximizar multiplicadores antes de realizar giros extensos."
        },
        {
          name: "Relajación Muscular y Capacidad de Microcorrección",
          desc: "Mantén una presión de agarre moderada (3 sobre 10) que permita al pulgar y meñique realizar ajustes de precisión sin tensionar el antebrazo.",
          tips: "Si notas calambres o sacudidas bruscas, afloja conscientemente la fuerza de agarre sobre los laterales del ratón."
        }
      ]
    },
    steps: [
      "Ajusta tus DPI y sensibilidad exactamente a los valores de tu shooter competitivo preferido y bloquea el ratón.",
      "Localiza rápidamente las agrupaciones de blancos con menor separación angular en la pantalla.",
      "Elimina el primer blanco para sumar +100 puntos y +0,35s adicionales al temporizador.",
      "Transfiere el movimiento de inmediato al siguiente blanco sin detenerte a verificar el impacto anterior.",
      "Encadena bajas sucesivas para acumular multiplicadores de combo y alcanzar rangos de maestría."
    ],
    audience: "Jugadores de Valorant, CS2, Apex Legends y Overwatch que buscan mayor velocidad al alternar de objetivo, spray transfers limpios y cero pausas en duelos multitudinarios.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/es/drills/fps/target-prioritization", label: "Priorización de Objetivos FPS" },
      { href: "/es/drills/fps/flick-shot-training", label: "Entrenamiento de Flick Shot" },
      { href: "/es/drills/fps/target-acquisition", label: "Adquisición de Objetivos FPS" },
      { href: "/es/drills/fps/180-degree-awareness", label: "Percepción 180° Pro" },
      { href: "/es/drills/fps/recoil-control", label: "Control de Retroceso" }
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

      <TargetSwitchingSwarmClient
        copy={{
          h1Keyword: "Entrenamiento de Target Switching FPS",
          h1Suffix: " – Cambio Rápido de Blanco y Spray Transfer",
          statScore: "Puntos",
          statTime: "Tiempo",
          statAccuracy: "Precisión",
          statBestScore: "Récord",
          statTargetsDestroyed: "Blancos Eliminados",
          statMaxCombo: "Combo Máximo",
          statPeakLevel: "Nivel Máximo",
          startTitle: "Target Switching Swarm",
          startSubtitle: "Entrada Raw de Hardware • Progresión Continua",
          getReady: "PREPÁRATE",
          pausedTitle: "PAUSADO",
          pausedSubtitle: "Haz clic para reanudar – el bloqueo del cursor se reactivará.",
          stageCaption: "Cambia rápidamente entre blancos y elimina el enjambre antes de que sus temporizadores expiren. ¡No falles para encadenar combos!",
          rulesTitle: "Reglas del Ejercicio y Sistema de Puntos",
          rulesItems: [
            { num: "1", text: "Eliminación de Blanco", highlight: "+100 PTS / +0,35s", result: "Extiende el tiempo de ronda" },
            { num: "2", text: "Penalización por Fallo", highlight: "Reinicio de Combo (-0,6s)", result: "Reinicia el multiplicador" },
            { num: "3", text: "Progresión de Nivel", highlight: "Cada 1.400 PTS +1 Nivel", result: "Mayor densidad y velocidad" },
            { num: "4", text: "Transición Inmediata", highlight: "Sin pausa de confirmación", result: "Maximiza bajas por minuto" }
          ],
          aboutTitle: "Sobre el Target Switching en Juegos FPS"
        }}
      />
      <DrillGuide guide={targetSwitchingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-switching-swarm"
          locale="es"
        />
      </div>
    </>
  );
}
