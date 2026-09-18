import FlowStateClient from '@/app/drills/fps/flow-state/FlowInductionClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Entrenamiento de Foco FPS – Estado de Flow | SkillDrills",
  description: "Entrena el estado de flow y foco para shooters en el navegador. Desarrolla enfoque sostenido y tracking suave para rendir al máximo en CS2 y Valorant.",
  keywords: [
    "entrenamiento de foco fps",
    "estado de flow punteria",
    "como entrar en la zona valorant",
    "entrenar la concentracion shooters",
    "punteria en estado de flujo",
    "como mantener la calma en clutches",
    "ejercicios de resistencia mental fps",
    "entrenador de tracking suave",
    "hipofrontalidad transitoria shooters",
    "como no desconcentrarse cs2",
    "rutina de enfoque mental gaming",
    "entrenador de punteria gratis"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/fps/flow-state",
    languages: getAlternateLanguages('/drills/fps/flow-state'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Entrenamiento de Foco FPS – Estado de Flow | SkillDrills",
    description: "Entrena el estado de flow y foco para shooters en el navegador. Desarrolla enfoque sostenido y tracking suave para rendir al máximo en CS2 y Valorant.",
    url: "https://skilldrills.online/es/drills/fps/flow-state",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Entrenamiento de Foco FPS – Estado de Flow | SkillDrills",
    description: "Entrena el estado de flow y foco para shooters en el navegador. Desarrolla enfoque sostenido y tracking suave para rendir al máximo en CS2 y Valorant.",
  },
};

export default function FlowStateEsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Entrenamientos FPS", "item": "https://skilldrills.online/es/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Entrenamiento de Foco FPS", "item": "https://skilldrills.online/es/drills/fps/flow-state" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entrenador de Foco y Estado de Flow FPS",
    "url": "https://skilldrills.online/es/drills/fps/flow-state",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requiere navegador compatible con HTML5 Canvas y JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Entrenador de atención sostenida y estado de flow para shooters. Elimina dudas y entrena un seguimiento suave y continuo con el ratón."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenador de Flow State SkillDrills",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Herramienta científica de entrenamiento psicomotor para inducir el estado de zona y resistencia atencional en deportes electrónicos.",
    "genre": "Entrenamiento FPS / Foco Mental",
    "url": "https://skilldrills.online/es/drills/fps/flow-state",
    "dateModified": "2026-09-05",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Entrenador de Estado de Flow",
    "url": "https://skilldrills.online/es/drills/fps/flow-state",
    "description": "Simulador dinámico con curvas Bézier orgánicas enfocado en eliminar vacilaciones motoras y sostener la máxima concentración.",
    "gamePlatform": "Web Browser",
    "genre": ["Entrenamiento FPS", "Entrenador de Puntería"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es el estado de flow en los shooters FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El estado de flow (o entrar en la zona) es un estado psicológico óptimo donde la dificultad del reto y la destreza del jugador se coordinan a la perfección (Csikszentmihalyi, 1990), eliminando dudas y automatizando los movimientos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo entrar en la Zona en partidas de Valorant y CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Entra en la zona manteniendo una respiración serena, aislando cualquier distracción ambiental y siguiendo la dirección de los objetivos con suavidad en vez de pensar en la posición de tus dedos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es la hipofrontalidad transitoria en la puntería?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es la desactivación selectiva y temporal del córtex prefrontal dorsolateral en tareas de alta exigencia (Dietrich, 2004), permitiendo que los ganglios basales y el cerebelo ejecuten los reflejos sin interferencia analítica."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué tiembla la puntería al estar bajo presión?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La tensión activa el sistema simpático provocando co-contracción de músculos agonistas y antagonistas. Esta sobrecarga muscular interrumpe la suavidad del rastreo y produce movimientos toscos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué las curvas Bézier favorecen la concentración continua?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Las trayectorias Bézier generan aceleraciones continuas sin cortes bruscos, exigiendo al sistema visual mantener un seguimiento foveal suave (Krauzlis, 2004) y suprimiendo saltos sacádicos innecesarios."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué sensibilidad de ratón es recomendable para el flow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Utiliza tu sensibilidad habitual en juego con entrada directa sin aceleración. El objetivo del flow es consolidar la memoria muscular que empleas en competición real."
        }
      },
      {
        "@type": "Question",
        "name": "¿Se debe mirar al centro de la mira o anticipar el blanco?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fija la mirada ligeramente por delante del objetivo en la dirección del desplazamiento. Esta técnica activa los circuitos de predicción motora y previene la fatiga ocular."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué decae la puntería tras varias horas seguidas de juego?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El esfuerzo atencional continuado agota los neurotransmisores de la red atencional frontoparietal (Posner & Petersen, 1990), transformando el seguimiento suave en micro-correcciones erráticas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué pausas ayudan a no perder el foco entre rondas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mira hacia un punto lejano durante 30 a 60 segundos, hidrátate periódicamente y relaja los hombros para eliminar la tensión isométrica acumulada en el antebrazo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Ayuda este entrenamiento al rendimiento laboral o académico?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. La capacidad de sostener atención ininterrumpida e ignorar estímulos irrelevantes es una función cognitiva generalizable al trabajo profundo, la lectura compleja o la programación."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Entrenar el Foco e Inducir el Estado de Flow en Shooters",
    "description": "Instrucciones paso a paso para alcanzar concentración plena y seguimiento visual ininterrumpido.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Ajustar Sensibilidad Equivalente",
        "text": "Selecciona tu shooter principal e introduce tu sensibilidad para conservar total correspondencia biomecánica.",
        "url": "https://skilldrills.online/es/drills/fps/flow-state#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Activar Modo Pantalla Completa y Bloqueo de Puntero",
        "text": "Haz clic en iniciar para capturar el ratón sin aceleración por software y con entrada de coordenadas 1:1.",
        "url": "https://skilldrills.online/es/drills/fps/flow-state#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Anticipar la Curvatura de la Trayectoria",
        "text": "Orienta la mirada ligeramente por delante del objetivo anticipando la curva para lograr un seguimiento armónico.",
        "url": "https://skilldrills.online/es/drills/fps/flow-state#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Mantener Rachas en la Zona de Máxima Puntuación",
        "text": "Permanece dentro del radio del blanco para cargar el medidor de flow y activar multiplicadores elevados.",
        "url": "https://skilldrills.online/es/drills/fps/flow-state#step-4"
      }
    ]
  };

  const copyEs = {
    h1Keyword: "Entrenamiento de Foco FPS",
    h1Suffix: " – Estado de Flow",
    statScore: "Puntuación",
    statTime: "Tiempo Restante",
    statAccuracy: "Precisión de Rastreo",
    statBestScore: "Récord Personal",
    startTitle: "Entrenamiento de Foco FPS y Estado de Flow",
    startSubtitle: "Entrada RAW de ratón • Resistencia de foco • Dificultad adaptativa",
    getReady: "Prepararse",
    pausedTitle: "Foco en Pausa",
    pausedSubtitle: "Haz clic para reanudar (se reactivará el bloqueo de puntero)",
    stageCaption: "Sigue la trayectoria de curvas Bézier sin perder la cadencia y mantén un ritmo de puntería continuo.",
    rulesTitle: "Reglas de Entrenamiento y Puntuación",
    rulesItems: [
      { num: "1", text: "Alineación Continua", highlight: "+10 PTS (+0,4s/s)", result: "Permanencia ininterrumpida sobre el blanco" },
      { num: "2", text: "Multiplicador de Flow", highlight: "Hasta 3,0x puntos", result: "Crece con secuencias sostenidas de concentración" },
      { num: "3", text: "Subida de Nivel", highlight: "+1 Nivel / 1400 PTS", result: "La velocidad se calibra según tu rendimiento" },
      { num: "4", text: "Pérdida de Foco", highlight: "Reinicio de Combo", result: "1,0s fuera del objetivo reinicia el multiplicador" }
    ],
    aboutTitle: "Acerca del Entrenador de Estado de Flow y Foco FPS"
  };

  const flowStateGuide = {
    heading: "Guía de Inducción al Estado de Flow y Puntos de Referencia Cognitivos",
    intro: [
      "El Entrenador de Estado de Flow combina neurociencia motora y psicología cognitiva para desarrollar atención sostenida, resistencia a la fatiga y precisión de seguimiento visual. De acuerdo con las investigaciones de Mihaly Csikszentmihalyi (1975, 1990), el estado de flujo surge cuando el desafío propuesto y las capacidades del tirador coinciden en equilibrio perfecto, disolviendo dudas y distracciones.",
      "La hipótesis de hipofrontalidad transitoria planteada por Dietrich (2004) explica la base biológica de este proceso: al modular a la baja la actividad analítica del córtex prefrontal dorsolateral (DLPFC), el control motor pasa directamente a los ganglios basales y al cerebelo. En shooters competitivos, este estado libera a los reflejos de la vacilación consciente y permite microajustes veloces e instintivos.",
      "A través de la API performance.now() del navegador con resolución de submilisegundos (Woods et al., 2015) y trayectorias generadas mediante curvas Bézier suaves (Krauzlis, 2004; Posner & Petersen, 1990), este simulador entrena la resistencia mental sin necesidad de descargas ni instalaciones locales.",
      "Medición técnica en tu dispositivo: cada evento se registra de forma local mediante el temporizador de alta resolución de tu navegador, sin transferir datos a servidores ajenos. Ten en cuenta que los navegadores limitan la resolución a ~1 ms para evitar ataques de temporización, y los monitores muestran cuadros a frecuencias concretas (16.7 ms a 60 Hz frente a 4.1 ms a 240 Hz). Por tanto, evalúa tu progreso comparando sesiones en el mismo equipo."
    ],
    benchmarks: {
      title: "Fases de Inducción de Flow y Niveles de Resistencia Atencional",
      headers: ["Nivel", "Dimensión del Flow", "Indicador Fisiológico", "Mecanismo Cognitivo", "Objetivo Práctico"],
      rows: [
        ["Nivel 1", "Orientación Atencional", "Filtrado sensorial y fijación ocular", "La red de alerta de Posner inhibe estímulos ambientales", "Contacto foveal con el objetivo en menos de 200 ms"],
        ["Nivel 2", "Equilibrio Reto-Habilidad", "Calibración dinámica de velocidad", "Canal de Csikszentmihalyi: velocidad adaptada a la destreza", "Sostener entre 70% y 80% de permanencia sobre el objetivo"],
        ["Nivel 3", "Seguimiento Suave Foveal", "Alineación continua de velocidad", "Vías corticoestriatales de Krauzlis suprimen sacadas innecesarias", "Más de 85% de seguimiento estable en curvas Bézier complejas"],
        ["Nivel 4", "Hipofrontalidad Transitoria", "Desconexión relativa del DLPFC", "Hipótesis de Dietrich: automatización refleja sin autocrítica", "Más de 30 segundos continuos en flow sin vacilar"],
        ["Nivel 5", "Resistencia Máxima de Foco", "Tolerancia a la fatiga ejecutiva", "La red ejecutiva previene la degradación del tiempo de respuesta", "Completar más de 60 segundos manteniendo el multiplicador máximo"]
      ],
      note: "Métricas sintetizadas a partir de la psicología del flow (Csikszentmihalyi, 1975, 1990), neurociencia cognitiva (Dietrich, 2004), seguimiento ocular suave (Krauzlis, 2004) y redes de atención humana (Posner & Petersen, 1990)."
    },
    techniques: {
      title: "Protocolos para Estimular el Estado de Flow en Shooters",
      items: [
        {
          name: "Seguimiento Predictivo Tangencial",
          desc: "Evita mirar por detrás del centro del blanco; dirige la vista de 2 a 3 grados por delante en el vector de movimiento. Este enfoque anticipatorio reduce el sobreesfuerzo muscular.",
          tips: "Presta atención a las variaciones graduales en la curva de avance."
        },
        {
          name: "Relajación Muscular y Respiración Profunda",
          desc: "La sobretensión del antebrazo degrada el pulso fino. Emplea respiraciones pausadas antes de rondas decisivas para calmar el sistema autónomo.",
          tips: "Afloja la fuerza de agarre del ratón al inicio de giros amplios."
        },
        {
          name: "Eliminación del Diálogo Interno",
          desc: "Pensar en el resultado en pleno tiroteo reanima el DLPFC y entorpece los reflejos. Dirige toda la atención únicamente a la trayectoria del enemigo.",
          tips: "Interpreta los fallos como simples datos para corregir, no como errores graves."
        },
        {
          name: "Gestión de Descansos e Hidratación",
          desc: "El cerebro gasta reservas metabólicas elevadas durante rachas intensas. Breves tragos de agua y pausas de 60 segundos despejan la agudeza mental.",
          tips: "Toma un breve descanso cada 45 o 60 minutos de juego competitivo."
        }
      ]
    },
    scientificPrinciples: {
      title: "Fundamentos Psicológicos y Neurales del Flow",
      items: [
        {
          name: "El Canal de Flow de Csikszentmihalyi",
          desc: "Las tareas demasiado sencillas generan desinterés, mientras que las excesivamente complejas provocan ansiedad. El estado de flow reside en la franja donde la dificultad desafía las destrezas al límite."
        },
        {
          name: "Modelo de Redes Atencionales de Posner",
          desc: "La atención humana coordina redes de alerta, orientación y control ejecutivo. El entrenamiento continuado silencia interferencias secundarias y refuerza el enfoque motor."
        },
        {
          name: "Eficiencia Subcortical del Movimiento",
          desc: "Al sustituir la supervisión deliberada por la ejecución motora automática, el sistema nervioso ahorra energía y responde a la velocidad máxima permitida por la fisiología."
        }
      ]
    }
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
      <FlowStateClient copy={copyEs} />
      <div className="max-w-6xl mx-auto px-4 w-full pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/flow-state" locale="es" />
      </div>
      <DrillGuide guide={flowStateGuide} />
    </>
  );
}
