import JumpSequenceClient from '@/app/drills/physical/fitness/jump-sequence/JumpSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// INVESTIGACIÓN DE PALABRAS CLAVE NATIVAS (SERP ESPAÑA / LATAM)
// Búsquedas de alta intención deportiva y salto vertical:
// - "ejercicios para saltar mas alto" (Búsqueda principal de potencia y voleibol/baloncesto)
// - "entrenamiento de salto vertical voleibol y basket" (Condicionamiento deportivo clave)
// - "ejercicios pliometricos para potencia" (Ciclo de estiramiento-acortamiento)
// - "como aumentar el salto vertical" (Consulta masiva de rendimiento atlético)
// - "test de salto vertical online" (Evaluación de salto y timing de despegue)
// - "punteria en el aire y parabola fps" (Mecánica de disparo y tracking aéreo)
// - "interceptacion de trayectorias aereas" (Cálculo psicomotor de colisión)
// - "tiempo de suspension en el aire" (Control de hang time y rebote)
// ============================================================

export const metadata = {
  title: 'Saltar Más Alto – Salto Vertical | SkillDrills',
  description: 'Ejercicios para saltar más alto online gratis. Intercepta objetivos en el vértice de su parábola y entrena sincronización motora y ritmo pliométrico en PC.',
  keywords: [
    "ejercicios para saltar mas alto",
    "entrenamiento de salto vertical voleibol y basket",
    "ejercicios pliometricos para potencia",
    "como aumentar el salto vertical",
    "test de salto vertical online",
    "punteria en el aire y parabola fps",
    "interceptacion de trayectorias aereas",
    "tiempo de suspension en el aire",
    "salto vertical ejercicios en casa",
    "potencia de piernas entrenamiento"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/fitness/jump-sequence',
    languages: getAlternateLanguages('/drills/physical/fitness/jump-sequence'),
  },
  openGraph: {
    title: "Ejercicios para Saltar Más Alto & Entrenamiento de Salto Vertical | SkillDrills",
    description: "Entrenamiento online gratuito de salto vertical y cálculo de trayectoria aérea. Domina el impulso pliométrico, el control en suspensión y la interceptación de blancos hasta 900 px/s basado en el ciclo de estiramiento-acortamiento.",
    url: 'https://skilldrills.online/es/drills/physical/fitness/jump-sequence',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ejercicios para Saltar Más Alto & Entrenamiento de Salto Vertical | SkillDrills",
    description: "Entrenamiento online gratuito de salto vertical y cálculo de trayectoria aérea. Domina el impulso pliométrico, el control en suspensión y la interceptación de blancos hasta 900 px/s basado en el ciclo de estiramiento-acortamiento.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills Inicio",
      "item": "https://skilldrills.online/es"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Entrenamiento Físico",
      "item": "https://skilldrills.online/es/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Acondicionamiento y Agilidad",
      "item": "https://skilldrills.online/es/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Salto Vertical & Ejercicios Pliométricos",
      "item": "https://skilldrills.online/es/drills/physical/fitness/jump-sequence"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entrenador de Salto Vertical y Trayectoria Aérea",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Simulador psicomotor para el cálculo de impulsión vertical, control en suspensión gravitacional e interceptación de blancos móviles.",
  "url": "https://skilldrills.online/es/drills/physical/fitness/jump-sequence",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/es"
  },
  "inLanguage": "es-ES",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Entrenador de Impulso y Timing Aéreo",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador moderno con soporte para HTML5 Canvas y Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/es/drills/physical/fitness/jump-sequence",
  "inLanguage": "es-ES",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Juego de Salto e Interceptación Aérea (Jump Sequence)",
  "url": "https://skilldrills.online/es/drills/physical/fitness/jump-sequence",
  "description": "Entrenamiento dinámico de cálculo de parábolas gravitacionales e interceptación de blancos para deportes de salto y puntería vertical en shooters.",
  "genre": [
    "Fitness Drill",
    "Aerial Timing",
    "Trajectory Interception",
    "Action"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué mide exactamente esta prueba en cuanto a salto vertical y cálculo motriz aéreo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La herramienta evalúa la precisión psicomotriz para sincronizar el impulso vertical acumulado con la trayectoria parabólica de un objetivo móvil. Mide la capacidad del cerebro para dosificar la energía de despegue y orientar el curso del salto sin depender de apoyos terrestres."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué manera el Ciclo de Estiramiento-Acortamiento (SSC) de Komi fundamenta el despegue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Según Paavo Komi (2000), la potencia elástica muscular se optimiza cuando la fase excéntrica de carga se encadena rápidamente con la concéntrica de impulsión. Mantener el ratón presionado para graduar la barra simula este acúmulo neuromuscular de energía proporcional."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué función desempeñan los modelos internos del cerebelo descritos por Kawato durante el vuelo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mitsuo Kawato (1999) demostró que en el aire el cerebelo emplea modelos predictivos hacia adelante para anticipar la caída gravitatoria. Dado el retraso de la retroalimentación visual (100 a 150ms), el movimiento correctivo debe proyectarse hacia el punto de convergencia futuro."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo interviene la teoría óptica Tau (τ) de Lee en la colisión precisa con el blanco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "David Lee (1976) probó que el sistema visual calcula el tiempo hasta el impacto (TTC) a partir de la tasa de expansión de la imagen retiniana. Esto permite ejecutar un microajuste terminal decisivo en los últimos 100 milisegundos antes del contacto."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo asciende la dificultad en cuanto a velocidad del blanco y radio de la esfera en los 15 niveles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La dificultad escala cada 250 puntos. La velocidad de traslación del objetivo pasa de 120 px/s en el nivel inicial hasta 900 px/s en los niveles 12 a 15, mientras que el radio de la esfera disminuye de 35 píxeles hasta unos compactos 12 píxeles."
      }
    },
    {
      "@type": "Question",
      "name": "¿Fallar un salto o caer al suelo sin interceptar la esfera penaliza la puntuación o reduce el tiempo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No se restan puntos del marcador acumulado ni se acorta el límite de 45 segundos. No obstante, tocar el suelo sin haber impactado el blanco reinicia de inmediato el multiplicador de combo a 1.0x, recompensando la consistencia rítmica."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo ayuda este entrenamiento en situaciones de tiro aéreo en juegos como Apex Legends o Overwatch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En títulos con gran verticalidad (saltadores, impulsos y personajes voladores), los rivales trazan parábolas dinámicas. La prueba entrena el cálculo espacial intuitivo, eliminando el fallo recurrente de apuntar a la posición actual en lugar del punto de aterrizaje futuro."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué cargar la barra de salto al 100% de manera continuada es un error de técnica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cargar siempre al máximo eleva el cursor por encima del blanco, perdiendo tiempo durante la caída mientras el objetivo ya ha cruzado la pantalla. El dominio consiste en cargar exclusivamente el impulso necesario para que la cúspide de la parábola coincida con la altura del proyectil."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la estrategia para superar los 17.000 puntos y asegurar el rango Apex Trajectory Master?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es esencial iniciar la recarga del siguiente salto en el mismo instante en que el cursor toca el suelo (rebote continuo), conservando el combo de 3.0x de forma ininterrumpida a lo largo de los 45 segundos y sosteniendo más del 92% de precisión en los niveles más rápidos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se transfieren datos o es necesario descargar software para realizar la prueba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No se requiere ninguna descarga ni registro. Todo el cálculo de físicas y rendimiento opera de manera local mediante HTML5 Canvas y performance.now(). Tus marcas se guardan únicamente en la memoria local de tu navegador (LocalStorage)."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo de Ejecución de Salto Vertical e Interceptación Parabólica",
  "description": "Secuencia metódica de 4 pasos para calibrar el impulso, pilotar en suspensión y colisionar con blancos móviles.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Alineación en la Base de Lanzamiento",
      "text": "Sitúa el cursor en la posición inferior central sincronizándolo con la cota base de impulsión.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/jump-sequence#paso-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Graduación Proporcional del Impulso Elástico",
      "text": "Mantén pulsado el botón del ratón para ajustar la potencia al nivel del objetivo y suelta para iniciar el salto.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/jump-sequence#paso-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Maniobra en Suspensión e Interceptación Óptica",
      "text": "Desplaza lateralmente el cursor en el aire para hacer coincidir el ápice de la parábola con la esfera en movimiento.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/jump-sequence#paso-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Rebote Inmediato en el Suelo y Multiplicador 3.0x",
      "text": "Engarza el siguiente salto en el mismo instante del contacto con el suelo para preservar el combo máximo en los 45 segundos.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/jump-sequence#paso-4"
    }
  ]
};

const jumpGuide = {
  heading: "Fundamentación Biomecánica: Potencia de Salto e Interceptación en Vuelo",
  subtitle: "Ciclo de estiramiento-acortamiento de Komi, modelos cerebelares de Kawato y teoría óptica Tau de Lee",
  intro: [
    "La prueba de secuencia de salto (Jump Sequence Training) traslada los fundamentos cinemáticos de la impulsión vertical y la coordinación aérea a un entorno psicomotor de precisión. En deportes como el voleibol, baloncesto o balonmano, la efectividad de un bloqueo o remate reside en sincronizar de forma micrométrica el despegue corporal con la velocidad y trayectoria del balón; este simulador aísla y entrena exactamente esa competencia de cálculo gravitatorio.",
    "El célebre investigador Paavo V. Komi (2000), pionero en la biomecánica del Ciclo de Estiramiento-Acortamiento (Stretch-Shortening Cycle, SSC), acreditó que la rápida transición de una carga excéntrica a una acción concéntrica aprovecha la energía elástica del complejo músculo-tendinoso. El mecanismo de carga proporcional de este ejercicio reproduce esta acumulación neuromuscular, demandando que el usuario dose el impulso en función de la altura y velocidad del blanco.",
    "Durante la fase aérea, la corrección del rumbo queda gobernada por los modelos internos cerebelares estudiados por Mitsuo Kawato (1999). Al carecer de tracción en el suelo, el cerebro debe anticipar la trayectoria de encuentro. Esta anticipación se calibra en tiempo real a través de la variable óptica Tau (τ) formulada por David N. Lee (1976), que extrae el tiempo restante para el impacto a partir de la tasa de expansión de la imagen visual, permitiendo corregir la posición en los últimos 100ms de aproximación a velocidades de hasta 900 px/s.",
    "Especificaciones de medición y muestreo: La prueba opera en tiempo real con la API performance.now() en resolución sub-milisegundo. La respuesta percibida depende de la tasa de refresco del monitor (60Hz = 16,6ms; 144Hz = 6,9ms; 240Hz = 4,1ms) y del polling rate del ratón. Variaciones menores a 5ms corresponden a la tolerancia de hardware estándar."
  ],
  benchmarks: {
    title: "Baremos y Niveles de Desempeño en Salto e Interceptación (5 Rangos)",
    headers: ["Rango / Nivel", "Título de Maestría", "Puntuación Mínima", "Velocidad de Blanco / Precisión", "Grado Global", "Perfil Neurofuncional en Suspensión"],
    rows: [
      ["Tier 1: Maestro de Trayectoria Apex", "Apex Trajectory Master", "17.000+ puntos", "800 – 900 px/s / ≥ 92%", "Grade S", "Predicción gravitacional de élite (top 0,1%); convergencia perfecta ante blancos ultrarrápidos y óptimo cálculo SSC (Komi 2000; Kawato 1999)"],
      ["Tier 2: Atacante Aéreo de Precisión", "Precision Aerial Striker", "12.000 – 16.999 pts", "650 – 799 px/s / 84 – 91%", "Grade A", "Notable pilotaje en suspensión por modelo cerebelar; interceptación regular sobre esferas reducidas de 15-18px"],
      ["Tier 3: Interceptor de Salto Hábil", "Skilled Jump Interceptor", "7.500 – 11.999 pts", "500 – 649 px/s / 75 – 83%", "Grade B", "Nivel competitivo regular; buena dosificación del impulso y recuperación ágil tras el contacto con el suelo"],
      ["Tier 4: Navegador Parabólico en Desarrollo", "Developing Parabola Navigator", "4.000 – 7.499 pts", "350 – 499 px/s / 65 – 74%", "Grade C", "Promedio funcional habitual; pérdidas de racha por excesiva potencia de salto en blancos de baja cota"],
      ["Tier 5: Alumno de Salto Inicial", "Novice Liftoff Trainee", "< 4.000 puntos", "< 350 px/s / < 65%", "Grade D", "Dificultad en la graduación de energía; tendencia a cargar la barra al 100% y perder la ventana de contacto"]
    ],
    note: "Baremos consolidados a partir del ciclo de estiramiento-acortamiento (Komi 2000), modelos cerebelares hacia adelante (Kawato 1999) y la óptica Tau (Lee 1976)."
  },
  techniques: {
    title: "Estrategias Prácticas para Maximizar la Impulsión y la Interceptación Aérea",
    items: [
      {
        name: "Modulación de Impulso Elástico de Komi (Proportional Impulse Charging)",
        desc: "Evita cargar la barra al máximo de forma rutinaria. Observa la cota vertical del objetivo y libera el despegue exactamente cuando la barra alcance la altura requerida para que el ápice de la parábola coincida con el paso de la esfera.",
        tips: "Asimila el gesto a la flexión elástica previa a un mate o remate: rápido, concentrado y proporcional."
      },
      {
        name: "Pilotaje Parabólico mediante Modelo Cerebelar de Kawato (Feedforward Air Steering)",
        desc: "Una vez en el aire, no persigas el blanco desde atrás. Orienta el cursor suavemente hacia la coordenada futura en la que la caída gravitatoria colisionará frontalmente con el proyectil.",
        tips: "Anticípate al cruce de trayectorias en lugar de fijar la posición actual del objeto."
      },
      {
        name: "Microajuste Terminal por Óptica Tau de Lee (Final 100ms Optical Tau Lock)",
        desc: "En los últimos instantes antes de la colisión, enfoca la atención en la velocidad de expansión visual de la esfera para asestar una corrección final milimétrica con los dedos.",
        tips: "Apunta al núcleo geométrico para evitar contactos marginales en los bordes."
      },
      {
        name: "Cadencia de Rebote Continuo al Contactar el Suelo (Rebound Cadence)",
        desc: "No permanezcas inmóvil al aterrizar. En el instante exacto en que el cursor toque la base, inicia la recarga del siguiente salto hacia el nuevo blanco.",
        tips: "El ritmo ininterrumpido de rebote es el pilar para sostener el combo de 3.0x hasta el final."
      }
    ]
  },
  steps: [
    "Adopta una postura firme con el cursor centrado en la base inferior de despegue.",
    "Analiza la cota y velocidad del blanco entrante y carga el impulso en la medida justa.",
    "Modula suavemente la trayectoria en el aire para intersectar el centro de la esfera.",
    "Encadena el aterrizaje con el siguiente salto de inmediato para mantener 3.0x de combo en 45 segundos."
  ],
  audience: "Atletas (voleibol, baloncesto, fútbol, atletismo) que buscan mejorar el timing de salto e interceptación, y jugadores de eSports que entrenan la puntería contra blancos aéreos veloces.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('komi2000', 'kawato1999', 'lee1976', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function JumpSequencePageEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <JumpSequenceClient
        copy={{
          title: "Salto Vertical & Ejercicios Pliométricos",
          subtitle: "Cálculo de Impulso & Interceptación en Suspensión • 15 Niveles",
          hudLabels: {
            score: "Puntuación",
            timeLeft: "Tiempo Restante",
            bestScore: "Mejor Puntuación",
            bestCombo: "Mejor Combo"
          },
          rulesTitle: "Reglas de la Prueba de Salto y Sistema de Puntos",
          rules: [
            { title: "Carga Proporcional de Impulso", text: "Mantén presionado el ratón para acumular energía elástica y suelta para iniciar el arco parabólico." },
            { title: "Interceptación en el Ápice", text: "Maniobra lateralmente en el aire para colisionar con la esfera móvil antes de descender al suelo." },
            { title: "Aceleración Progresiva", text: "Cada 250 puntos el nivel aumenta, acelerando los blancos de 120 a 900 px/s y reduciendo el radio de la esfera." },
            { title: "Aterrizaje sin Impacto y Reset de Combo", text: "Tocar el suelo sin interceptar el blanco reinicia el multiplicador a 1.0x sin restar puntos acumulados." }
          ],
          aboutTitle: "Acerca del Entrenamiento de Salto y Trayectoria Aérea",
          aboutHeading: "Biomecánica de la Impulsión e Interceptación en Arco Parabólico",
          aboutText: "Fundamentado en las investigaciones del Ciclo de Estiramiento-Acortamiento de Paavo Komi (2000), en los modelos cerebelares anticipatorios de Mitsuo Kawato (1999) y en la teoría óptica Tau de David Lee (1976), este simulador desarrolla el cálculo gravitatorio intuitivo indispensable para deportes de impulsión (voleibol, baloncesto) y puntería de alta velocidad en videojuegos competitivos con gran movilidad aérea.",
          aboutCards: [
            {
              title: "Público Objetivo",
              desc: "Atletas que buscan mejorar el timing de salto e interceptación, y jugadores de eSports que entrenan la puntería contra blancos aéreos veloces."
            },
            {
              title: "Habilidades Potenciadas",
              desc: "Dosificación proporcional de fuerza de despegue, pilotaje en suspensión gravitatoria, cálculo de tiempo hasta el impacto (TTC) y rebote continuo."
            },
            {
              title: "Velocidad Progresiva",
              desc: "Los blancos aceleran de 120 a 900 px/s con alturas y parábolas variables, forzando un ajuste instantáneo a cada lanzamiento."
            }
          ]
        }}
      />
      <DrillGuide guide={jumpGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/jump-sequence"
          locale="es"
        />
      </div>
    </>
  );
}
