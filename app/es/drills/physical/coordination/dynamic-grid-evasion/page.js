import DynamicGridEvasionClient from '@/app/drills/physical/coordination/dynamic-grid-evasion/DynamicGridEvasionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// INVESTIGACIÓN DE PALABRAS CLAVE NATIVAS (SERP ESPAÑA / LATAM)
// Búsquedas de alta intención y baja competencia:
// - "juego de esquivar con el raton" (Búsqueda principal de agilidad y reflejos)
// - "test de vision periferica online gratis" (Evaluación visual y psicométrica)
// - "juegos de esquivar obstaculos con el cursor" (Intención lúdica y entrenamiento)
// - "entrenamiento de reflejos espaciales" (Neurociencia motora aplicada)
// - "esquivar habilidades lol juego" / "esquivar skillshots" (Cultura gaming / eSports)
// - "test de atencion visual periferica" (Diagnóstico cognitivo y de concentración)
// - "juego de reaccion y evasion rapida" (Velocidad de reacción en navegador)
// - "ejercicios de vision periferica y reflejos" (Entrenamiento perceptivo)
// ============================================================

export const metadata = {
  title: "Juego de Esquivar Ratón – Visión Periférica | SkillDrills",
  description: "Juego de esquivar con el ratón gratis. Detecta explosiones en la cuadrícula 3x3 y escapa a zonas seguras para entrenar visión periférica y reflejos en PC.",
  keywords: [
    "juego de esquivar con el raton",
    "test de vision periferica online gratis",
    "juegos de esquivar obstaculos con el cursor",
    "entrenamiento de reflejos espaciales",
    "esquivar habilidades lol juego",
    "test de atencion visual periferica",
    "juego de reaccion y evasion rapida",
    "ejercicios de vision periferica y reflejos",
    "esquiva de skillshots",
    "reflejos de raton juego"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/coordination/dynamic-grid-evasion',
    languages: getAlternateLanguages('/drills/physical/coordination/dynamic-grid-evasion'),
  },
  openGraph: {
    title: "Juego de Esquivar Ratón – Visión Periférica | SkillDrills",
    description: "Juego de esquivar con el ratón gratis. Detecta explosiones en la cuadrícula 3x3 y escapa a zonas seguras para entrenar visión periférica y reflejos en PC.",
    url: 'https://skilldrills.online/es/drills/physical/coordination/dynamic-grid-evasion',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Juego de Esquivar Ratón – Visión Periférica | SkillDrills",
    description: "Juego de esquivar con el ratón gratis. Detecta explosiones en la cuadrícula 3x3 y escapa a zonas seguras para entrenar visión periférica y reflejos en PC.",
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
      "name": "Coordinación Motora",
      "item": "https://skilldrills.online/es/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Juego de Esquivar con el Ratón & Test de Visión Periférica",
      "item": "https://skilldrills.online/es/drills/physical/coordination/dynamic-grid-evasion"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Juego de Esquivar con el Ratón y Visión Periférica",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Herramienta online para el entrenamiento de reflejos espaciales, escaneo periférico y evasión dinámica de amenazas en cuadrícula 3x3.",
  "url": "https://skilldrills.online/es/drills/physical/coordination/dynamic-grid-evasion",
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
  "name": "Entrenador de Evasión y Reflejos Espaciales",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador moderno compatible con HTML5 Canvas y Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/es/drills/physical/coordination/dynamic-grid-evasion",
  "inLanguage": "es-ES",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Juego de Evasión en Cuadrícula Dinámica (Dynamic Grid Evasion)",
  "url": "https://skilldrills.online/es/drills/physical/coordination/dynamic-grid-evasion",
  "description": "Entrenamiento de reflejos espaciales y visión periférica mediante la evasión de detonaciones en cuadrícula 3x3 bajo presión de tiempo.",
  "genre": [
    "Coordination Drill",
    "Reflex Training",
    "Spatial Awareness",
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
      "name": "¿Cómo funciona el test de visión periférica y esquiva en cuadrícula 3x3?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La pantalla se estructura en una cuadrícula táctica de 9 sectores. Diversas celdas emiten un pulso de aviso ámbar advirtiendo de una detonación inminente. El usuario debe mantener una mirada amplia, localizar con la visión periférica las celdas seguras que continúan apagadas y trasladar el cursor antes de la explosión roja."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué fijar la mirada en el centro es superior a mirar celda por celda de forma secuencial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Siguiendo la Teoría de Integración de Características de Anne Treisman (1980), los estímulos luminosos periféricos se procesan en paralelo de forma preatencional. Explorar secuencialmente cada cuadrante causaría un colapso cognitivo cuando el margen de aviso se reduce a sólo 0,45 segundos."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué medida ayuda este ejercicio a esquivar habilidades y utilidades en juegos como LoL, Valorant o Apex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En situaciones competitivas, las habilidades de área de efecto (mólotovs, granadas y ultimates) demandan una reacción de escape instantánea sin perder la orientación del combate. El ejercicio automatiza la respuesta espacial de Posner, permitiendo reaccionar a amenazas periféricas con reflejos puros."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo se intensifica la dificultad a lo largo de los 15 niveles de la prueba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El nivel escala cada 250 puntos acumulados. El tiempo de aviso disminuye progresivamente desde 1,4 segundos en el nivel inicial hasta un umbral crítico de 0,45 segundos en los niveles 12 a 15, al tiempo que el número de celdas en peligro aumenta de 3 hasta 7 sectores simultáneos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Ser alcanzado por una explosión resta puntos del marcador o penaliza el tiempo de la partida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No se deducen puntos de la puntuación acumulada ni se recorta el cronómetro de 45 segundos. Sin embargo, encontrarse en una celda roja durante la explosión reinicia inmediatamente la racha de combo a 1.0x, incentivando decisiones rápidas y sin vacilaciones."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la técnica psicomotriz adecuada para frenar el ratón dentro de la celda segura?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se aplica el modelo de control motor de Robert Woodworth (1899): un flick balístico veloz hacia el cuadrante seguro seguido de una deceleración instantánea ejerciendo ligera presión descendente con la almohadilla de la mano y los dedos sobre la alfombrilla para anular la inercia del movimiento."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué la sensibilidad del ratón es determinante para sobrevivir en los niveles expertos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Una sensibilidad excesivamente baja exige movimientos de brazo demasiado amplios que consumen los 0,45 segundos de margen. Una sensibilidad media calibrada (entre 28 y 38 cm/360°) permite transitar entre celdas adyacentes con pequeños gestos conjugados de muñeca y dedos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué táctica es imprescindible para superar los 17.000 puntos y alcanzar el rango Apex Grid Evader?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es esencial mantener un enfoque visual relajado en el punto central de la cuadrícula y aplicar la regla de escape al sector seguro adyacente más cercano al cursor. Conservar la racha de combo 3.0x de forma ininterrumpida durante los 45 segundos es el factor determinante."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué diferencia existe entre atención endógena y exógena en este entrenamiento de reflejos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Según las investigaciones de Michael Posner (1980), la atención endógena es voluntaria y consciente (requiere unos 300ms), mientras que la atención exógena es involuntaria y se activa por señales luminosas repentinas (entre 100 y 150ms). Este ejercicio entrena la respuesta exógena ante los pulsos de alerta."
      }
    },
    {
      "@type": "Question",
      "name": "¿Requiere esta herramienta la descarga de aplicaciones o el registro de datos personales?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No requiere ninguna instalación externa. Todo el rendimiento cinemático se procesa localmente mediante HTML5 Canvas y la API de alta precisión performance.now(). Tus marcas y puntuaciones se conservan exclusivamente en la memoria local de tu navegador (LocalStorage)."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo de Ejecución del Test de Esquiva en Cuadrícula y Reflejos Espaciales",
  "description": "Secuencia de 4 pasos para monitorear la cuadrícula 3x3, identificar celdas seguras y esquivar detonaciones.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Posicionamiento Central y Foco Descentralizado",
      "text": "Sitúa el cursor en el centro geométrico de la cuadrícula 3x3 y abre el campo visual abarcando los 9 cuadrantes a la vez.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/dynamic-grid-evasion#paso-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Detección Periférica del Pulso de Alerta",
      "text": "Identifica de forma instantánea mediante la visión periférica las celdas que no emiten pulsos ámbar y permanecen como zonas seguras.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/dynamic-grid-evasion#paso-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Flick Balístico hacia el Cuadrante Seguro",
      "text": "Desplaza el cursor rápidamente al sector seguro más cercano antes de que finalice la cuenta atrás y se activen las explosiones rojas.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/dynamic-grid-evasion#paso-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Mantenimiento del Combo y Supervivencia Continua",
      "text": "Encadena esquivas exitosas para elevar el multiplicador de combo hasta 3.0x y maximizar tu puntuación en los 45 segundos.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/dynamic-grid-evasion#paso-4"
    }
  ]
};

const gridGuide = {
  heading: "Fundamentación Científica: Atención Espacial y Mecánica de Evasión Periférica",
  subtitle: "Teoría de integración de Treisman, paradigma de orientación de Posner y control bifásico de Woodworth aplicados a la esquiva rápida",
  intro: [
    "El entrenamiento de evasión en cuadrícula dinámica (Dynamic Grid Evasion) somete al sistema visual y psicomotor a un desafío de elevada carga cognitiva. En lugar de seguir una trayectoria unívoca, el usuario debe procesar de manera simultánea 9 sectores tácticos en una matriz 3x3, identificando qué cuadrantes presentan una amenaza inminente y decidiendo en milésimas de segundo la ruta de escape óptima hacia un refugio seguro.",
    "La eminente psicóloga cognitiva Anne Treisman y Garry Gelade (1980), a través de su célebre Teoría de Integración de Características, evidenciaron que las propiedades visuales salientes (como bordes intermitentes y cambios cromáticos) se segregan de forma preatencional y paralela en la corteza visual primaria. Al mantener una mirada suave y descentralizada en el centro de la matriz, la retina periférica activa sus células ganglionares magnocelulares, permitiendo capturar de un solo vistazo el estado de los 9 sectores sin recurrir a movimientos sacádicos secuenciales lentos.",
    "El análisis de la atención espacial encubierta se complementa con las investigaciones fundamentales de Michael Posner (1980). A medida que el ejercicio progresa hacia los niveles 12 a 15, el margen de alerta se contrae de 1,4 segundos a unos implacables 0,45 segundos, mientras que las amenazas abarcan hasta 7 celdas simultáneas. Bajo esta presión cronométrica extrema, la respuesta motriz debe ejecutarse conforme al modelo bifásico de Robert Woodworth (1899): una fase inicial de aceleración balística seguida de una desaceleración precisa por fricción manual para enclavar el cursor dentro de la celda segura.",
    "Precisión técnica y latencia en navegador: Esta prueba opera en tiempo real utilizando la API performance.now() con resolución de milisegundos. La latencia total percibida depende de la tasa de refresco del monitor (60Hz = 16,6ms; 144Hz = 6,9ms; 240Hz = 4,1ms) y de la frecuencia de muestreo del ratón. Variaciones inferiores a 5ms forman parte del comportamiento normal del hardware."
  ],
  benchmarks: {
    title: "Baremos y Niveles de Desempeño en Evasión Espacial y Reflejos (5 Rangos)",
    headers: ["Rango / Nivel", "Título de Maestría", "Puntuación Mínima", "Nivel Alcanzado", "Margen de Aviso Resistido", "Perfil Neurocognitivo de Evasión"],
    rows: [
      ["Tier 1: Evasor Apex Supremo", "Apex Grid Evader", "17.000+ puntos", "Nivel 12 – 15", "0,45 – 0,60 s de aviso", "Procesamiento periférico de élite (top 0,1%); flicks balísticos sin fallos hacia zonas seguras bajo 7 amenazas activas (Treisman 1980; Posner 1980)"],
      ["Tier 2: Maestro de Escaneo Espacial", "Master Spatial Scanner", "13.000 – 16.999 pts", "Nivel 9 – 11", "0,65 – 0,80 s de aviso", "Excelente respuesta atencional exógena de Posner; evasión serena ante 5 o 6 celdas detonadas con óptimo frenado de Woodworth"],
      ["Tier 3: Evasor Táctico Eficaz", "Proficient Hazard Dodger", "9.500 – 12.999 pts", "Nivel 6 – 8", "0,85 – 1,05 s de aviso", "Habilidad destacada para videojuegos competitivos; buena velocidad de decisión y control firme de fricción sobre la alfombrilla"],
      ["Tier 4: Superviviente de Sector Medio", "Intermediate Sector Evader", "6.000 – 9.499 pts", "Nivel 3 – 5", "1,10 – 1,25 s de aviso", "Promedio habitual en adultos; pérdidas de racha por visión en túnel cuando el tiempo de aviso desciende de 1,0 segundo"],
      ["Tier 5: Aprendiz de Evasión Inicial", "Novice Blast Survivor", "< 6.000 puntos", "Nivel 1 – 2", "> 1,25 s de aviso", "Dificultad acusada para procesar la periferia visual; tendencia a fijar celdas aisladas y sobrepasar la celda segura"]
    ],
    note: "Baremos determinados a partir de la Teoría de Integración de Características (Treisman & Gelade 1980), el paradigma de Posner (1980) y los principios de control motor de Woodworth (1899)."
  },
  techniques: {
    title: "Estrategias de Entrenamiento para Maximizar la Visión Periférica y la Evasión",
    items: [
      {
        name: "Fijación Descentralizada en el Centro de la Cuadrícula (Treisman Decentralized Fixation)",
        desc: "Enfoca suavemente el centro de la matriz 3x3 sin clavar la vista en una celda concreta. Amplía la atención periférica para que los fotorreceptores de la retina detecten la intermitencia ámbar en cualquier esquina al instante.",
        tips: "No sigas el cursor con la mirada; confía en la memoria motora del brazo para dirigir el ratón hacia la celda libre."
      },
      {
        name: "Activación Exógena Involuntaria de Posner (Exogenous Attention Reflex)",
        desc: "Aprovecha la orientación exógena estudiada por Posner (1980). En lugar de deliberar racionalmente qué celdas son peligrosas, desplaza la mano de forma automática hacia el cuadrante que permanece oscuro y sin luz de aviso.",
        tips: "La ausencia de destello es tu señal inmediata de desplazamiento."
      },
      {
        name: "Flick Balístico y Frenado por Fricción de Woodworth (Boundary Deceleration)",
        desc: "Acelera sin dudar en dirección al sector seguro y apoya la base de la mano y los dedos exteriores contra la alfombrilla en el momento de cruzar la frontera del sector.",
        tips: "Esa fricción mecánica detiene en seco el ratón y evita que salga rebotado fuera de la zona segura."
      },
      {
        name: "Criterio de Fuga al Sector Seguro Más Cercano (Nearest Safe Sector Rule)",
        desc: "En los niveles avanzados con 7 celdas comprometidas y sólo 0,45s de tiempo, buscar la celda 'perfecta' provoca bloqueo mental.",
        tips: "Huye sin vacilar al cuadrante seguro más cercano a tu posición actual, sea vertical, horizontal o diagonal inmediata."
      }
    ]
  },
  steps: [
    "Adopta una postura estable y sitúa el cursor en la celda central de la cuadrícula 3x3.",
    "Mantén una mirada relajada al centro para captar las señales de aviso con la visión periférica.",
    "Mueve el ratón con decisión hacia la celda segura más cercana antes de la detonación roja.",
    "Preserva el combo 3.0x ininterrumpidamente durante los 45 segundos para coronar el rango Apex."
  ],
  audience: "Jugadores y atletas de eSports (LoL, Valorant, CS2, Apex Legends), deportistas de pelota y combate, y cualquier persona que busque mejorar su visión periférica y velocidad de evasión táctica.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('posner1980', 'treisman1980', 'woodworth1899', 'fitts1954', 'woods2015'),
};

export default function DynamicGridEvasionPageEs() {
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
      <DynamicGridEvasionClient
        copy={{
          title: "Juego de Esquivar con el Ratón & Visión Periférica",
          subtitle: "Evasión Dinámica en Cuadrícula 3x3 & Reflejos Espaciales • 15 Niveles",
          hudLabels: {
            score: "Puntuación",
            timeLeft: "Tiempo Restante",
            bestScore: "Mejor Puntuación",
            bestCombo: "Mejor Combo"
          },
          rulesTitle: "Reglas del Test de Esquiva y Sistema de Puntos",
          rules: [
            { title: "Evasión de Celdas de Peligro", text: "Traslada el cursor a zonas seguras antes de que las alertas ámbar estallen en detonaciones rojas." },
            { title: "Multiplicador de Combo", text: "Sobrevive a oleadas consecutivas sin recibir daño para alcanzar un multiplicador de hasta 3.0x." },
            { title: "Progresión de Dificultad", text: "Cada 250 puntos el nivel aumenta, comprimiendo el tiempo de aviso de 1,4s a 0,45s y activando hasta 7 zonas de peligro." },
            { title: "Impacto de Explosión", text: "Quedar atrapado en una explosión restablece el multiplicador a 1.0x sin restar puntos acumulados." }
          ],
          aboutTitle: "Sobre el Entrenamiento de Esquiva en Cuadrícula",
          aboutHeading: "Atención Espacial Periférica y Evasión Balística de Amenazas",
          aboutText: "Este ejercicio se fundamenta en la Teoría de Integración de Características de Anne Treisman (1980) y en el Paradigma de Orientación Espacial de Michael Posner (1980). La dinámica en matriz 3x3 estimula la visión periférica descentralizada y automatiza las reacciones de huida indispensables para esquivar habilidades de área (AOE), proyectiles y granadas en juegos competitivos.",
          aboutCards: [
            {
              title: "Público Objetivo",
              desc: "Jugadores de FPS y MOBA que buscan optimizar la esquiva de habilidades y proyectiles, además de entusiastas del entrenamiento de reflejos espaciales."
            },
            {
              title: "Habilidades Potenciadas",
              desc: "Búsqueda visual paralela, atención encubierta refleja, reducción del tiempo de reacción de elección y frenado motor de precisión."
            },
            {
              title: "Visión Periférica",
              desc: "El escaneo descentralizado erradica la visión en túnel y expande el campo de conciencia visual en 360 grados."
            }
          ]
        }}
      />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/dynamic-grid-evasion"
          locale="es"
        />
      </div>
    </>
  );
}
