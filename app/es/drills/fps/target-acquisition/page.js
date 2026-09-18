import TargetAcquisitionClient from '@/app/drills/fps/target-acquisition/TargetAcquisitionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Adquisición de Objetivos FPS – Primer Disparo | SkillDrills",
  description: "Entrena adquisición de objetivos, detección visual y precisión del primer tiro en el navegador. Domina el primer disparo para CS2 y Valorant gratis.",
  keywords: [
    "entrenamiento de adquisicion de blancos",
    "adquisicion de objetivos fps",
    "entrenar primer disparo fps",
    "precision de primer tiro",
    "como mejorar el primer disparo",
    "flick al primer tiro",
    "deteccion de objetivos fps",
    "punteria rapida primer disparo",
    "entrenador de mira cs2 valorant",
    "reconocimiento visual shooter",
    "entrenamiento de reflejos y punteria",
    "ejercicio de adquisicion de blancos"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/fps/target-acquisition",
    languages: getAlternateLanguages('/drills/fps/target-acquisition'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Adquisición de Objetivos FPS – Primer Disparo | SkillDrills",
    description: "Entrena adquisición de objetivos, detección visual y precisión del primer tiro en el navegador. Domina el primer disparo para CS2 y Valorant gratis.",
    url: "https://skilldrills.online/es/drills/fps/target-acquisition",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Adquisición de Objetivos FPS – Primer Disparo | SkillDrills",
    description: "Entrena adquisición de objetivos, detección visual y precisión del primer tiro en el navegador. Domina el primer disparo para CS2 y Valorant gratis.",
  },
};

export default function TargetAcquisitionEsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Ejercicios FPS", "item": "https://skilldrills.online/es/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Adquisición de Objetivos", "item": "https://skilldrills.online/es/drills/fps/target-acquisition" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenador de Adquisición de Objetivos FPS",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entrenador online de adquisición de objetivos, detección visual rápida y precisión del primer disparo para shooters tácticos como CS2 y Valorant.",
    "genre": "Entrenamiento FPS / Precisión Primer Disparo",
    "url": "https://skilldrills.online/es/drills/fps/target-acquisition",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entrenador de Adquisición de Objetivos FPS",
    "url": "https://skilldrills.online/es/drills/fps/target-acquisition",
    "description": "Entrenador online de adquisición de objetivos, detección visual rápida y precisión del primer disparo para shooters tácticos como CS2 y Valorant.",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requiere soporte de HTML5 Canvas y Pointer Lock API",
    "dateModified": "2026-09-16"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Entrenador de Adquisición de Objetivos FPS",
    "url": "https://skilldrills.online/es/drills/fps/target-acquisition",
    "description": "Entrenador online de adquisición de objetivos, detección visual rápida y precisión del primer disparo para shooters tácticos como CS2 y Valorant.",
    "dateModified": "2026-09-16",
    "gamePlatform": "Web Browser",
    "genre": ["Entrenamiento FPS", "Aim Trainer", "Adquisición de Objetivos"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es la adquisición de objetivos en shooters FPS competitivos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La adquisición de objetivos es la secuencia visomotora y cognitiva que coordina detectar a un enemigo en el campo visual, discriminarlo del fondo y aliados, planificar la trayectoria del cursor y ejecutar un flick balístico para conectar el primer disparo."
        }
      },
      {
        "@type": "Question",
        "name": "¿En qué se diferencia la adquisición de blancos del tiempo de reacción simple?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El tiempo de reacción simple evalúa solo el retardo entre un estímulo predecible y un clic. La adquisición de objetivos integra búsqueda espacial, atención selectiva, discriminación de contrastes y precisión motora bajo presión de tiempo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo explica la Teoría de Integración de Características la detección de enemigos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Formulada por Anne Treisman y Garry Gelade (1980), esta teoría demuestra que las características primarias (luminancia, color, orientación) se analizan en paralelo por el campo visual antes de que la atención focalizada las ensamble como una amenaza individual."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué los profesionales adquieren y disparan a objetivos más rápido que los novatos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los profesionales cuentan con un filtrado de prominencia visual superior (Wolfe, 2007) y programas motores optimizados (Meyer et al., 1988). Su sistema visual evita el rastreo secuencial y dirige el cursor directamente al elemento de mayor amenaza sin titubear."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué impacto tiene la precisión del primer disparo en CS2 y Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En shooters tácticos donde un único impacto a la cabeza es mortal (como Vandal o AK-47), el duelista que identifica y acierta el primer tiro gana el asalto. Fallar el flick inicial supone desaprovechar la ventana de máxima precisión."
        }
      },
      {
        "@type": "Question",
        "name": "¿Se debe usar la visión central o periférica para detectar blancos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Detecta los blancos con la visión periférica y usa la visión fóvea central junto con la cruceta para fijar el disparo. Quedarse mirando fijamente la retícula reduce la ventana de atención y retrasa la reacción periférica."
        }
      },
      {
        "@type": "Question",
        "name": "¿De qué forma afecta la densidad visual de elementos a la velocidad de puntería?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cuando varios distractores comparten atributos con el blanco principal, la búsqueda cambia de procesamiento paralelo rápido a búsqueda secuencial lenta, añadiendo de 40 a 120 ms de retardo por cada distractor presente."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el mejor agarre de ratón para la rápida adquisición de múltiples blancos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los agarres Claw y Fingertip son los más adecuados, ya que facilitan micro-correcciones inmediatas con las yemas y una frenada firme en la alfombrilla, manteniendo el antebrazo ágil para giros amplios."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo mejora el Raw Input la regularidad en la adquisición de objetivos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La entrada directa por hardware mantiene una correlación física estrictamente lineal entre la mano y la pantalla, permitiendo al sistema neuromuscular calcular el impulso balístico exacto sin las distorsiones de la aceleración."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo se aconseja entrenar adquisición de blancos al día?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De 10 a 15 minutos diarios antes de empezar las partidas es suficiente para agudizar la sensibilidad al contraste y afianzar la memoria muscular del primer disparo sin sobrecargar los músculos."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Dominar la Adquisición de Objetivos y el Primer Tiro",
    "description": "Procedimiento paso a paso para identificar objetivos clave, suprimir dudas visuales y acertar el primer impacto.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrar Sensibilidad con Entrada Directa",
        "text": "Ajusta tu sensibilidad y DPI exactos en la configuración de sesión para sincronizar la relación 1:1 y bloquear el ratón.",
        "url": "https://skilldrills.online/es/drills/fps/target-acquisition#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Conservar Atención Periférica Relajada",
        "text": "Mantén la vista relajada en el centro de la pantalla para percibir la aparición del conjunto de blancos con visión periférica.",
        "url": "https://skilldrills.online/es/drills/fps/target-acquisition#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Discriminar el Contraste del Objetivo Principal",
        "text": "Identifica de inmediato el objetivo con mayor brillo sin realizar barridos oculares individuales sobre cada elemento.",
        "url": "https://skilldrills.online/es/drills/fps/target-acquisition#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Lanzar Flick Balístico con Frenado en Alfombrilla",
        "text": "Desplaza la cruceta velozmente al centro del blanco y dispara, empleando el rozamiento del tapete para evitar sobretiros.",
        "url": "https://skilldrills.online/es/drills/fps/target-acquisition#step-4"
      }
    ]
  };

  const targetAcquisitionGuide = {
    heading: "Guía de Adquisición de Objetivos FPS y Biomecánica de la Discriminación Visual",
    intro: [
      "El simulador de Adquisición de Objetivos es un entrenamiento perceptivo-cognitivo diseñado para perfeccionar la detección visual veloz, la discriminación de contrastes y la letalidad en el primer disparo. En juegos tácticos de disparos como Valorant, Counter-Strike 2 y Rainbow Six Siege, las rondas se deciden en los primeros 300 milisegundos de contacto visual: el jugador que localiza, discrimina y acierta en el objetivo antes asegura el asalto.",
      "La base científica de la búsqueda visual y la identificación de objetivos fue formulada por Anne Treisman y Garry Gelade (1980) en su Teoría de Integración de Características. Treisman demostró que las propiedades visuales elementales —como contraste de luminancia, tono y orientación de bordes— se extraen de forma simultánea y paralela por todo el campo de visión. Solo cuando la atención focalizada apunta a una coordenada exacta, estos atributos se unen en una amenaza reconocible.",
      "Ampliando el procesamiento paralelo, el modelo Guided Search de Jeremy M. Wolfe (1994, 2007) explica cómo los mapas sensoriales de prominencia se coordinan con las expectativas del jugador para dirigir la atención. Al entrenar la discriminación de contrastes, la corteza visual aprende a ignorar ruidos y elementos secundarios de forma instantánea, recortando el tiempo entre el estímulo visual y el movimiento manual.",
      "Integrando las leyes psicomotoras de Paul M. Fitts (1954), la teoría de submovimientos balísticos de David E. Meyer et al. (1988) y la cronometría digital de alta precisión (Woods et al., 2015), este ejercicio prepara los reflejos para erradicar dudas cognitivas y conectar tiros firmes y precisos bajo presión.",
      "Cómo se evalúa: cada registro se calcula mediante el reloj de alta resolución performance.now() en tu navegador de forma estrictamente local — ningún registro sale de tu dispositivo. Parámetros de hardware: los cronómetros web operan con una resolución habitual de 1 ms, y los monitores muestran los cambios según su tasa de refresco — 16,7 ms a 60 Hz, 6,9 ms a 144 Hz y 4,1 ms a 240 Hz (Woods et al., 2015). El polling rate del ratón añade 8 ms a 125 Hz frente a 1 ms a 1000 Hz. Compara tus avances usando el mismo equipo."
    ],
    benchmarks: {
      title: "Baremos Científicos de Adquisición de Blancos y Latencia de Discriminación",
      headers: ["Nivel de Rendimiento", "Latencia de Adquisición", "Precisión de Primer Tiro", "Impacto Competitivo en Partida"],
      rows: [
        ["Tier 1 (Apex Sentinel / Radiant Pro)", "<260 ms", "95% – 99%+", "Detección inmediata de blancos; tiros a la cabeza impecables a la primera bala sin vacilaciones de discriminación"],
        ["Tier 2 (Maestro Competitivo / Tier-2 Esports)", "260 – 320 ms", "88% – 95%", "Gran velocidad de detección; acierto decisivo sobre la amenaza prioritaria con mínima distracción periférica"],
        ["Tier 3 (Diamante / Ascendente)", "320 – 400 ms", "80% – 88%", "Precisión sólida de primer disparo; manifiesta leves demoras de 50 a 80 ms ante múltiples blancos agrupados"],
        ["Tier 4 (Intermedio / Oro / Platino)", "400 – 500 ms", "70% – 80%", "Inclinación a búsquedas secuenciales lentas; en ocasiones dispara a distractores secundarios o sobrepasa el blanco"],
        ["Tier 5 (Iniciación / Novato)", ">500 ms", "<70%", "Confusión ante elementos visuales complejos; lentitud en la fijación de objetivos que causa derrotas en los primeros intercambios"]
      ],
      note: "La latencia de adquisición representa el tiempo transcurrido desde la aparición del conjunto hasta el primer clic válido en el objetivo prioritario, medido con cronometría digital (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Respaldados por Evidencia para Perfeccionar la Adquisición",
      items: [
        {
          name: "Búsqueda Paralela frente a Inspección Secuencial",
          desc: "Evita mirar una por una las zonas de la pantalla. Aprovecha los filtros preatencionales (Treisman & Gelade, 1980) para percibir cambios de contraste con visión periférica manteniendo la mirada en el centro.",
          tips: "Mantén la vista relajada en el centro de la pantalla; deja que el blanco de mayor brillo dirija tu sacada ocular inicial."
        },
        {
          name: "Acoplamiento Sacádico-Motor en el Flick",
          desc: "Desvincula el movimiento de ojos y manos: realiza primero la sacada ocular para fijar el centro del blanco, permitiendo que la memoria muscular dirija el cursor velozmente hacia él.",
          tips: "Tus ojos deben alcanzar el objetivo 30 o 50 ms antes que el ratón, confirmando el blanco antes del clic."
        },
        {
          name: "Filtrado Rápido del Umbral de Contraste",
          desc: "En zonas con varios elementos, las siluetas atenuadas corresponden a distractores, mientras que el brillo intenso delata la amenaza prioritaria. Aprende a filtrar el ruido sin frenar el flick.",
          tips: "Acostúmbrate a descartar los blancos secundarios menos visibles hasta abatir el objetivo principal."
        },
        {
          name: "Frenado Dinámico en Alfombrilla",
          desc: "Equilibra la rapidez del flick con la capacidad de detención (Meyer et al., 1988). Emplea el rozamiento de la alfombrilla y la presión de los dedos para frenar en el centro exacto sin pasarte.",
          tips: "Ejerce una sutil presión descendente con los dedos al final del recorrido para frenar el ratón de forma mecánica."
        }
      ]
    },
    steps: [
      "Indica tu juego de referencia, DPI y sensibilidad en los ajustes de sesión para mantener la correspondencia 1:1 y bloquear el cursor.",
      "Mantén la vista descansada en el centro de la pantalla, esperando la aparición del conjunto de objetivos.",
      "Identifica al instante el blanco de mayor brillo y prioridad mediante el filtrado visual de contrastes en paralelo.",
      "Ejecuta un flick limpio y rápido al centro del blanco y dispara para sumar +100 PTS (+0,4s de tiempo adicional).",
      "Elimina los blancos restantes en orden decreciente de luminancia para conseguir el bono de +400 PTS y superar el nivel."
    ],
    audience: "Jugadores competitivos de Valorant, Counter-Strike 2, Apex Legends y Overwatch 2 que buscan mejorar la detección de rivales, conectar primeros tiros letales a la cabeza y evitar distracciones en pantalla.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/es/drills/fps/target-prioritization", label: "Entrenamiento de Priorización de Objetivos" },
      { href: "/es/drills/fps/flick-shot-training", label: "Entrenamiento de Flick Shot" },
      { href: "/es/drills/fps/micro-correction-precision", label: "Entrenamiento de Micro-Corrección" },
      { href: "/es/drills/fps/strafe-tracking", label: "Entrenamiento de Strafe Tracking" },
      { href: "/es/drills/fps/180-degree-awareness", label: "Entrenamiento de Conciencia 180° Pro" }
    ]
  };

  const copyEs = {
    h1Keyword: "Adquisición de Objetivos FPS",
    h1Suffix: " – Primer Disparo",
    statScore: "Puntuación",
    statTime: "Tiempo",
    statAccuracy: "Precisión",
    statBestScore: "Récord",
    statSetsCleared: "Series Completadas",
    statMaxCombo: "Combo Máximo",
    statPeakLevel: "Nivel Máximo",
    startTitle: "Adquisición de Objetivos Pro",
    startSubtitle: "Velocidad de Reconocimiento Visual · Niveles Dinámicos Ilimitados",
    getReady: "PREPÁRATE",
    toggleFlash: "Alternar Flash de Fallo",
    toggleSound: "Alternar Efectos de Sonido",
    pausedTitle: "Juego Pausado",
    pausedSubtitle: "Haz clic para reanudar — el bloqueo de cursor se activará de nuevo.",
    stageCaption: "Localiza y haz clic en el blanco más brillante (mayor opacidad) de cada grupo con la mayor rapidez y precisión posible.",
    rulesTitle: "Instrucciones del Ejercicio y Puntuación",
    rulesItems: [
      {
        title: "Disparo Acertado (+100 PTS / +0,4s)",
        text: "Dispara primero al objetivo de mayor brillo. Los multiplicadores de combo y las bonificaciones de nivel se acumulan."
      },
      {
        title: "Disparo Incorrecto u Orden Erróneo (-50 PTS / -1,0s)",
        text: "Hacer clic en un blanco secundario antes que en el principal reinicia el combo y resta tiempo del cronómetro."
      },
      {
        title: "Serie Completa Eliminada (+400 PTS)",
        text: "Despejar todos los blancos en la secuencia correcta otorga una bonificación notable y presenta una ronda más compleja."
      }
    ],
    aboutTitle: "Acerca del Entrenamiento de Adquisición",
    aboutHeading: "¿Qué es la Adquisición de Objetivos?",
    aboutText: "La adquisición de objetivos consiste en identificar la amenaza pertinente y desplazar la mira hacia ella. Las cualidades visuales básicas como color, brillo y orientación se procesan en paralelo a través del campo visual antes de que la atención focalice estos rasgos en un objeto (Treisman & Gelade, 1980) — motivo por el cual un rival contrastado se percibe con mucha mayor celeridad que uno camuflado."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
      <TargetAcquisitionClient copy={copyEs} />
      <DrillGuide guide={targetAcquisitionGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-acquisition"
          locale="es"
        />
      </div>
    </>
  );
}
