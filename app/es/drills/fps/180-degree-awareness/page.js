import AwarenessDrillClient from '@/app/drills/fps/180-degree-awareness/AwarenessDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Entrenamiento de Giro 180° – Reflejos | SkillDrills",
  description: "Entrena giros rápidos de 180 grados, detección periférica y reacción ante flancos en el navegador. Mejora tu puntería y control de alfombrilla en FPS.",
  keywords: [
    "entrenamiento de giro 180 fps",
    "giro de 180 grados mira",
    "giro brusco 180 grados valorant",
    "como hacer giros de 180 en cs2",
    "entrenar vision periferica fps",
    "esquivar flashbang entrenamiento",
    "entrenador de punteria 180 grados",
    "girar rapido en fps con el raton",
    "reaccion a la espalda fps entrenamiento",
    "control de espacio alfombrilla raton",
    "entrenamiento de reaccion de flanco fps",
    "tiro reactivo 180 grados pc"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/fps/180-degree-awareness",
    languages: getAlternateLanguages('/drills/fps/180-degree-awareness'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Entrenamiento de Giro 180° – Reflejos | SkillDrills",
    description: "Entrena giros rápidos de 180 grados, detección periférica y reacción ante flancos en el navegador. Mejora tu puntería y control de alfombrilla en FPS.",
    url: "https://skilldrills.online/es/drills/fps/180-degree-awareness",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Entrenamiento de Giro 180° – Reflejos | SkillDrills",
    description: "Entrena giros rápidos de 180 grados, detección periférica y reacción ante flancos en el navegador. Mejora tu puntería y control de alfombrilla en FPS.",
  },
};

export default function AwarenessDrillEsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Drills de FPS", "item": "https://skilldrills.online/es/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Entrenamiento de Giro 180°", "item": "https://skilldrills.online/es/drills/fps/180-degree-awareness" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenamiento de Giro 180°",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Navegador Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Simulador interactivo de giros de 180 grados para FPS. Desarrolla velocidad de brazo, reflejos contra flancos y visión periférica.",
    "genre": "Entrenamiento FPS / Percepción Espacial",
    "url": "https://skilldrills.online/es/drills/fps/180-degree-awareness",
    "dateModified": "2026-09-16",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entrenamiento de Giro 180°",
    "url": "https://skilldrills.online/es/drills/fps/180-degree-awareness",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requiere soporte para JavaScript y HTML5 Canvas con Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Entrenador de puntería 180 grados gratuito en navegador. Practica giros bruscos, esquivar flashbangs y frenado de ratón para CS2 y Valorant."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Entrenamiento de Giro 180°",
    "gamePlatform": "Web Browser",
    "genre": ["Entrenamiento de FPS", "Entrenador de Puntería"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "url": "https://skilldrills.online/es/drills/fps/180-degree-awareness",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "dateModified": "2026-09-16"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es el entrenamiento de percepción y giro de 180 grados en FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es una práctica diseñada para condicionar la detección en la visión periférica y la reorientación motora del ratón cuando aparecen enemigos fuera del campo visual central."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo mejoran los jugadores profesionales la orientación espacial de 360°?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los profesionales de e-sports entrenan con escenarios de wide flick, posicionamiento de mira y sonido posicional 3D para mantener un mapa mental constante del entorno virtual."
        }
      },
      {
        "@type": "Question",
        "name": "¿Pueden los ejercicios de 180° mejorar el tiempo de reacción?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Responder a estímulos en los bordes de la pantalla activa más rápido los bastones de la retina y el colículo superior, reduciendo la duda antes de iniciar el movimiento del brazo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo ayuda la visión periférica en los juegos de disparos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La visión foveal central abarca solo unos 2 grados, mientras que la visión periférica detecta movimiento en casi 180 grados, permitiendo ver a enemigos de flanco sin descolocar la mira del ángulo principal."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo evitar que me flanqueen o eliminen por la espalda en FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Combinando información auditiva con giros rápidos y precisos de 180 grados. Entrenar la distancia exacta en la alfombrilla asegura neutralizar enemigos a la espalda antes de caer eliminado."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es la conciencia situacional en e-sports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es la integración mental continua de minimapa, sonidos de pasos, habilidades gastadas y visión periférica para anticipar la posición y el tiempo de llegada de los rivales."
        }
      },
      {
        "@type": "Question",
        "name": "¿Sirve este ejercicio para CS2, Valorant y otros shooters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. En juegos tácticos como CS2 y Valorant, girar 180° es crucial para esquivar flashbangs y cubrir ángulos ciegos. En Apex Legends y Overwatch 2, resulta vital para el combate cerrado."
        }
      },
      {
        "@type": "Question",
        "name": "¿Con qué frecuencia se debe entrenar el giro rápido de 180 grados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Una rutina de 10 a 15 minutos diarios es suficiente para fijar la memoria muscular sin sobrecargar la muñeca ni los tendones del brazo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Se debe usar la muñeca o el brazo para girar 180 grados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los giros amplios de 180 grados deben realizarse principalmente con el antebrazo, el codo y el hombro, dejando la muñeca y las yemas de los dedos solo para la microcorrección final."
        }
      },
      {
        "@type": "Question",
        "name": "¿Admite este simulador entrada directa de ratón (raw input)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Utiliza la API HTML5 Pointer Lock para brindar una respuesta 1:1 sin aceleración ni suavizado de software del sistema operativo."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Practicar Giros de 180° y Orientación Espacial",
    "description": "Pasos detallados para entrenar giros rápidos de 180 grados y detección de amenazas en la periferia de la pantalla.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Activa el Pointer Lock y centra el ratón",
        "text": "Haz clic en Iniciar Drill para bloquear el cursor y coloca el ratón físico en el centro exacto de tu alfombrilla."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Detecta el objetivo con visión periférica",
        "text": "Mantén la mirada relajada en el centro y localiza la aparición del objetivo en los bordes con tu visión periférica."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Ejecuta el barrido balístico de antebrazo",
        "text": "Realiza un movimiento horizontal rápido con codo y hombro que cubra la distancia calibrada para girar 180°."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Aplica frenado muscular y confirma el disparo",
        "text": "Usa los músculos antagonistas para detener la cruceta sobre el objetivo, confirma la alineación y haz clic."
      }
    ]
  };

  const awarenessGuideEs = {
    heading: "Guía de Giro 180° y Benchmarks Psicomotores de Orientación",
    intro: [
      "El giro de 180° es una tarea sensoriomotora multimodal que demanda una sincronización milimétrica entre detección visual periférica, sacadas oculares y biomecánica balística de las extremidades. En la neurobiología humana, los bastones de la retina periférica captan cambios intensos de luminancia y movimiento más allá de los 90° respecto a la línea visual, activando sacadas mediante el colículo superior (Rayner, 1998; Leigh & Zee, 2015).",
      "La ejecución de un giro de 180° responde al modelo de impulso motor en dos fases (Elliott et al., 2010): un barrido balístico en bucle abierto ejecutado por hombro y codo que cubre entre el 80% y el 90% del arco de giro, seguido por el frenado muscular antagonista para evitar el sobreimpulso (Schmidt et al., 1979). Bajo la Ley de Fitts (Fitts, 1954), la gran amplitud angular eleva el índice de dificultad, por lo que el stopping power y el espacio en la alfombrilla son fundamentales.",
      "La medición cronométrica se efectúa con la función de alta resolución performance.now() mediante la API Pointer Lock de HTML5. Las diferencias menores a 5 ms corresponden a fluctuaciones normales de temporizadores y refresco de pantalla. Disponer de un ratón a 1000 Hz de sondeo y monitor de altos hercios minimiza la cuantización de entrada y refleja fielmente tu velocidad de reacción (Woods et al., 2015).",
      "Medición de rendimiento: cada movimiento y clic se procesa en tu propio ordenador con reloj de alta precisión. Mantener constantes el DPI, la sensibilidad y el espacio físico entre sesiones te permitirá asentar una memoria muscular sólida."
    ],
    benchmarks: {
      title: "Benchmarks de Giro de 180° y Reincorporación Espacial",
      headers: ["Fase del Giro / Métrica", "Latencia Típica (ms)", "Mecanismo Biomecánico Motor", "Clasificación Psicomotora"],
      rows: [
        ["Detección Periférica y Disparo Sacádico", "140 – 190 ms", "Bastones retinianos y colículo superior", "Orientación visual preatencional (Rayner 1998)"],
        ["Barrido Balístico del Brazo (Giro 180°)", "180 – 260 ms", "Propulsión de antebrazo, codo y hombro", "Aceleración cinemática de bucle abierto (Elliott 2010)"],
        ["Desaceleración y Frenado de Mira", "60 – 110 ms", "Frenado de músculos antagonistas (stopping power)", "Amortiguación de impulso de frenado (Schmidt 1979)"],
        ["Microcorrección Terminal y Clic", "70 – 130 ms", "Retroalimentación visual foveal y clic", "Fase de aproximación de la Ley de Fitts (Fitts 1954)"],
        ["Tiempo Total de Reincorporación 180°", "450 – 690 ms", "Bucle sensoriomotor completo de giro", "Línea base competitiva estándar entre jugadores"],
        ["Ejecución Subconsciente de Élite 180°", "320 – 420 ms", "Sinergia de sensibilidad y memoria muscular pura", "Maestría en e-sports en situaciones de clutch en FPS"]
      ],
      note: "Datos extraídos de estudios biomecánicos y psicomotores (Rayner 1998; Fitts 1954; Schmidt et al. 1979; Elliott et al. 2010) y cronometría digital (Woods et al. 2015). La latencia final varía según la sensibilidad (cm/360°), la fricción de la alfombrilla y los hercios del monitor."
    },
    techniques: {
      title: "Biomecánica y Consejos para Giros de 180° a Gran Velocidad",
      items: [
        {
          name: "Mecánica de Brazo y Puntos de Apoyo",
          desc: "Ejecuta los giros amplios apoyándote en el codo y el hombro en lugar de forzar la muñeca. Coloca el antebrazo paralelo a la mesa para favorecer desplazamientos horizontales limpios y fluidos.",
          tips: "Despeja espacio suficiente en tu alfombrilla para hacer un giro completo de 180° en una sola pasada sin levantar el ratón."
        },
        {
          name: "Calibración de cm/360° y Sensibilidad",
          desc: "En juegos como Valorant y CS2, los profesionales suelen calibrar entre 35 y 55 cm para un giro de 360° (unos 18 a 28 cm para 180°). Ajusta tu sensibilidad de modo que el recorrido desde el centro al borde de la alfombrilla equivalga a media vuelta exacta.",
          tips: "Evita cambiar el DPI frecuentemente; el cerebro necesita un mapa espacial constante entre sesiones."
        },
        {
          name: "Esquiva de Flashbangs y Giro Inverso",
          desc: "En shooters competitivos, girar 180° de inmediato es esencial para evitar el cegado por granadas aturdidoras. Girar para evadir el destello y reincorporarse enseguida requiere un frenado impecable.",
          tips: "Practica devolver la cruceta a la altura de la cabeza de inmediato tras completar el giro de evasión."
        },
        {
          name: "Recentrado Rápido en la Alfombrilla",
          desc: "Tras efectuar un giro de 180 grados y neutralizar a un enemigo en tu espalda, aprovecha el tiempo muerto para recentrar el ratón en la alfombrilla y evitar quedarte sin recorrido físico.",
          tips: "Levanta el ratón con suavidad durante las transiciones para no desgastar los deslizadores del ratón."
        }
      ]
    },
    steps: [
      "Haz clic en Iniciar Drill para bloquear el cursor y pasar a pantalla completa.",
      "Mantén la cruceta en el centro con la mirada abierta a ambos lados.",
      "Cuando aparezca un objetivo en el borde extremo, lanza un barrido horizontal explosivo hacia él.",
      "Frena en seco junto al objetivo, alinea la cruceta y pulsa el botón del ratón.",
      "Consulta tu precisión, tiempo de adquisición y mejor racha en el panel final."
    ],
    audience: "Jugadores de CS2, Valorant, Apex Legends, Overwatch y shooters que deseen mejorar sus giros de 180°, defensa contra ataques traseros y rapidez con el ratón.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'elliott2010', 'fitts1954', 'schmidt1979', 'leigh2015', 'rayner1998'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "Entrenamiento de Flick Shot" },
      { href: "/drills/fps/angle-hold-trainer", label: "Entrenador de Colocación de Mira (Crosshair Placement)" },
      { href: "/drills/fps/micro-correction-precision", label: "Entrenamiento de Microcorrección" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Test de Tiempo de Reacción" }
    ]
  };

  const copyEs = {
    h1Keyword: "Entrenamiento de Giro 180°",
    h1Suffix: " — Reflejos y Puntería FPS",
    statScore: "Puntos",
    statTime: "Tiempo",
    statAccuracy: "Precisión",
    statBestScore: "Récord",
    startTitle: "Entrenamiento de Giro 180°",
    startSubtitle: "Entrada Directa de Ratón • Niveles Infinitos",
    getReady: "PREPÁRATE",
    pausedTitle: "Juego en Pausa",
    pausedSubtitle: "Haz clic en la pantalla para reactivar el bloqueo del cursor",
    stageCaption: "Localiza objetivos en los bordes con visión periférica y realiza giros rápidos de 180°.",
    rulesTitle: "Reglas de Entrenamiento y Puntuación",
    rulesItems: [
      { title: "Impacto en Objetivo (+100 pts)", text: "Los impactos consecutivos aumentan el multiplicador de combo hasta 3.0x." },
      { title: "Bordes de 180° y Racha", text: "Los objetivos aparecen en los extremos, se reducen y exigen mayor velocidad." },
      { title: "Fallo de Disparo / Tiempo Límite", text: "Fallar o no disparar a tiempo reinicia el combo. Con penalización, se descuentan 0.8s." }
    ],
    aboutTitle: "Sobre el Entrenamiento de Giro 180°",
    aboutHeading: "¿Por qué entrenar giros de 180 grados?",
    aboutText1: "El giro de 180 grados es el movimiento físico más amplio en un shooter de primera persona. Según la Ley de Fitts (1954), el tiempo necesario depende de la distancia y el tamaño del blanco; por ello, la verdadera dificultad radica en detener el ratón justo sobre la cabeza tras el giro.",
    aboutText2: "180° Awareness Pro aisla y entrena la capacidad de procesar estímulos fuera del foco central. A diferencia de los ejercicios estándar de microcorrección, este drill reta tus límites de desplazamiento lateral.",
    aboutText3: "Al entrenar grandes giros con frecuencia, sincronizas el espacio físico de tu alfombrilla con el espacio 3D del juego, logrando reacciones instintivas cuando te disparan por la espalda en CS2 y Valorant."
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

      <AwarenessDrillClient copy={copyEs} />

      <DrillGuide guide={awarenessGuideEs} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/180-degree-awareness"
          locale="es"
        />
      </div>
    </>
  );
}
