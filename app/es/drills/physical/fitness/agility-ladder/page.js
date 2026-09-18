import MotorSequencingClient from '@/app/drills/physical/fitness/agility-ladder/MotorSequencingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// INVESTIGACIÓN DE PALABRAS CLAVE NATIVAS (SERP ESPAÑA / LATAM)
// Búsquedas de alta intención deportiva y de coordinación:
// - "ejercicios escalera de agilidad" (Búsqueda principal de entrenamiento funcional)
// - "entrenamiento escalera de velocidad" (Acondicionamiento físico y velocidad)
// - "escalera de coordinacion ejercicios" (Coordinación psicomotriz y juego de pies)
// - "ejercicios de footwork y agilidad" (Destreza de apoyos en fútbol, tenis y boxeo)
// - "rutina escalera de agilidad" (Secuencias de entrenamiento)
// - "entrenamiento de velocidad y coordinacion" (Capacidad neuromuscular general)
// - "ritmo de counter strafe" (Transposición para shooters y mecánicas competitivas)
// - "secuenciacion motora bilateral" (Neurociencia motora aplicada)
// ============================================================

export const metadata = {
  title: "Escalera de Agilidad – Ejercicios Footwork | SkillDrills",
  description: 'Ejercicios con escalera de agilidad online gratis. Entrena secuencias de pasos, juego de pies rápido y coordinación neuromuscular para fútbol y atletismo.',
  keywords: [
    "ejercicios escalera de agilidad",
    "entrenamiento escalera de velocidad",
    "escalera de coordinacion ejercicios",
    "ejercicios de footwork y agilidad",
    "rutina escalera de agilidad",
    "entrenamiento de velocidad y coordinacion",
    "ritmo de counter strafe",
    "secuenciacion motora bilateral",
    "juego de pies y agilidad",
    "test de velocidad de pies"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/fitness/agility-ladder',
    languages: getAlternateLanguages('/drills/physical/fitness/agility-ladder'),
  },
  openGraph: {
    title: "Escalera de Agilidad – Ejercicios Footwork | SkillDrills",
    description: 'Ejercicios con escalera de agilidad online gratis. Entrena secuencias de pasos, juego de pies rápido y coordinación neuromuscular para fútbol y atletismo.',
    url: 'https://skilldrills.online/es/drills/physical/fitness/agility-ladder',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Escalera de Agilidad – Ejercicios Footwork | SkillDrills",
    description: 'Ejercicios con escalera de agilidad online gratis. Entrena secuencias de pasos, juego de pies rápido y coordinación neuromuscular para fútbol y atletismo.',
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
      "name": "Escalera de Agilidad & Footwork",
      "item": "https://skilldrills.online/es/drills/physical/fitness/agility-ladder"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entrenamiento de Escalera de Agilidad y Secuenciación Motora",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Simulador digital de escalera de coordinación y cadencia neuromuscular para el desarrollo del ritmo de juego de pies y control bilateral.",
  "url": "https://skilldrills.online/es/drills/physical/fitness/agility-ladder",
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
  "name": "Entrenador de Cadencia y Agilidad Motora",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador moderno con soporte para HTML5 Canvas y Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/es/drills/physical/fitness/agility-ladder",
  "inLanguage": "es-ES",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Juego de Escalera de Agilidad (Agility Ladder Drill)",
  "url": "https://skilldrills.online/es/drills/physical/fitness/agility-ladder",
  "description": "Entrenamiento de ritmo psicomotor y secuenciación motriz en peldaños descendentes para dominar el footwork y el counter-strafe.",
  "genre": [
    "Fitness Drill",
    "Motor Sequencing",
    "Rhythm Training",
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
      "name": "¿Cuál es el fundamento neurofisiológico de la escalera de agilidad digital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La prueba traslada los ejercicios clásicos de escalera de velocidad del fútbol y atletismo al movimiento del cursor. Al alternar rápidamente entre peldaños descendentes (izquierda-derecha-izquierda-derecha), la corteza motora ejercita el ordenamiento serial de Lashley (1951), agrupando múltiples movimientos en un único programa motor fluido."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué establece el Programa Motor Generalizado (GMP) de Schmidt respecto al ritmo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Richard Schmidt (1975) comprobó que los movimientos cíclicos rápidos mantienen una invariancia temporal relativa. Aunque la velocidad de caída de los peldaños ascienda de 150 a 750 px/s, la estructura temporal proporcional entre apoyos (1:1:1:1) permanece constante, permitiendo adaptar la cadencia sin romper el gesto."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué modo favorece este ejercicio la mecánica de counter-strafe en juegos como CS2 y Valorant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un counter-strafe perfecto precisa alternar apoyos laterales en fracciones exactas de tiempo para frenar la inercia del personaje antes del disparo. Este entrenamiento consolida la cadencia de oscilación izquierda-derecha en el cerebro, asegurando una estabilidad total del punto de mira."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo varían la velocidad de desplazamiento y el tamaño de los peldaños en los 15 niveles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El nivel avanza cada 250 puntos. La velocidad de descenso vertical de la escalera aumenta desde 150 px/s en el nivel 1 hasta 750 px/s en los niveles 12 a 15, mientras que la zona de contacto de los peldaños se comprime progresivamente desde 18 píxeles hasta apenas 10 píxeles."
      }
    },
    {
      "@type": "Question",
      "name": "¿Omitir un peldaño o perder la secuencia resta puntos o penaliza el tiempo de la prueba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No se descuentan puntos acumulados ni se reduce el cronómetro fijo de 45 segundos. Sin embargo, saltarse un peldaño o quebrar el orden secuencial reinicia de inmediato el multiplicador de combo a 1.0x, incentivando una cadencia impecable."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es crucial interceptar los peldaños ligeramente por debajo de su centro geométrico?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dado que la escalera desciende de manera continua, apuntar al centro estático en el instante de mirar provocará que el peldaño ya haya bajado al llegar el cursor. Siguiendo la ley de interceptación de Fitts (1954), se debe calcular la trayectoria apuntando 2 o 3 píxeles por debajo del centro para que coincidan con exactitud."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué agarre y configuración de sensibilidad son idóneos para la alternancia rítmica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un agarre tipo garra (claw grip) o de punta de dedos (fingertip grip) combinado con una sensibilidad moderada (entre 30 y 40 cm por giro de 360°) facilita micro-oscilaciones ágiles de muñeca, manteniendo el péndulo del movimiento sin sobrecargar el antebrazo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la clave para alcanzar los 17.000 puntos y obtener el rango Apex Ladder Master?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es indispensable concebir los 4 peldaños como un solo impulso continuo sin pausas evaluativas intermedias, conservando el multiplicador 3.0x de principio a fin durante los 45 segundos. Sostener la precisión a más de 600 px/s define la maestría."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué técnica de visión se aconseja en velocidades extremas superiores a 500 px/s?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evita perseguir con los ojos cada peldaño individual. Fija la mirada con suavidad en el eje vertical central de la escalera y permite que la visión periférica active los movimientos pendulares de la mano como un metrónomo coordinado."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se transfieren mis puntuaciones o tiempos de reacción a servidores externos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Todo el cálculo y seguimiento se ejecuta de forma nativa en tu navegador mediante performance.now() y HTML5 Canvas. Tus marcas y registros permanecen resguardados exclusivamente en el almacenamiento local de tu equipo (LocalStorage)."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo de Ejecución de la Escalera de Agilidad y Secuenciación Motora",
  "description": "Secuencia de 4 pasos para conectar peldaños en cadencia alternada y dominar el ejercicio de footwork.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Alineación en el Eje Central de la Escalera",
      "text": "Sitúa el cursor en la línea media equidistante entre las dos guías verticales de la escalera descendente.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/agility-ladder#paso-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Primer Contacto Balístico con el Peldaño 1",
      "text": "Al descender la escalera, efectúa un snap rápido hacia el primer peldaño activo ubicado a la izquierda.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/agility-ladder#paso-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Resolución Rítmica de la Serie de 4 Peldaños",
      "text": "Completa el patrón (1 Izq → 2 Der → 3 Izq → 4 Der) en un flujo ininterrumpido para validar el tramo con luz verde.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/agility-ladder#paso-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Acumulación de Combo y Aceleración hasta 750 px/s",
      "text": "Conserva la cadencia sin saltos para maximizar el combo a 3.0x y superar las velocidades extremas de los niveles finales.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/agility-ladder#paso-4"
    }
  ]
};

const ladderGuide = {
  heading: "Fundamentación Biomecánica: Secuenciación Motora Serial y Cadencia Rítmica",
  subtitle: "Ordenamiento serial de Lashley, invariancia temporal de Schmidt (GMP) e interceptación de Fitts",
  intro: [
    "El entrenamiento en escalera de agilidad (Agility Ladder Drill) constituye un pilar indispensable de la preparación atlética en disciplinas como fútbol, boxeo, atletismo y tenis para potenciar el juego de pies (footwork) y la rapidez neuromuscular. En el simulador digital, la escalera de suelo se traduce en una pauta cinemática continua que evalúa la capacidad del sistema motor para resolver secuencias bilaterales rápidas ante objetivos en desplazamiento vertical constante.",
    "El neuropsicólogo Karl Lashley (1951), en su célebre tratado sobre 'El Problema del Orden Serial en el Comportamiento', demostró que los movimientos de alta velocidad no pueden ser gobernados por bucles de retroalimentación sensorial paso a paso, debido a los retrasos fisiológicos de la conducción neural (100-150ms). El sistema nervioso debe planificar los 4 apoyos de la escalera como un 'bloque motor indivisible' (chunk motor), disparando la alternancia completa en un único paquete motriz sinérgico.",
    "Esta concepción se complementa con la Teoría del Programa Motor Generalizado (GMP) de Richard A. Schmidt (1975), que postula la invariancia del tiempo relativo: la estructura proporcional de la cadencia se mantiene constante frente a aumentos de la velocidad total. A medida que la rolación se acelera desde 150 px/s hasta unos vertiginosos 750 px/s y las hitboxes se reducen a 10 píxeles, el practicante debe aplicar las reglas de interceptación móvil descritas por Fitts (1954), anticipando la caída mediante compensaciones angulares sin alterar el compás metronómico.",
    "Rigor de medición y refresco de pantalla: Esta prueba calcula sus eventos mediante performance.now() con precisión sub-milisegundo. La respuesta percibida depende de la tasa de refresco del monitor (60Hz = 16,6ms; 144Hz = 6,9ms; 240Hz = 4,1ms) y del polling rate del ratón. Variaciones menores a 5ms corresponden a la tolerancia de hardware estándar."
  ],
  benchmarks: {
    title: "Baremos y Niveles de Desempeño en Agilidad y Secuenciación Motriz (5 Rangos)",
    headers: ["Rango / Nivel", "Título de Maestría", "Puntuación Mínima", "Nivel Alcanzado", "Velocidad de Rolación", "Diagnóstico Neurofuncional de Cadencia"],
    rows: [
      ["Tier 1: Maestro de Escalera Apex", "Apex Ladder Master", "17.000+ puntos", "Nivel 12 – 15", "600 – 750 px/s", "Chunking serial de 4 apoyos perfecto (top 0,1%); cadencia metronómica sin fallas a 750 px/s (Lashley 1951; Schmidt 1975)"],
      ["Tier 2: Velocista de Ritmo Elite", "Elite Rhythm Sprinter", "13.000 – 16.999 pts", "Nivel 9 – 11", "480 – 599 px/s", "Excelente alternancia bilateral en alta frecuencia; interceptación predictiva consistente sobre peldaños de 10-12px (Fitts 1954)"],
      ["Tier 3: Secuenciador Hábil de Pasos", "Proficient Step Sequencer", "9.500 – 12.999 pts", "Nivel 6 – 8", "350 – 479 px/s", "Nivel destacado para atletas y jugadores competitivos; buena movilidad de muñeca y ritmo periódico estable"],
      ["Tier 4: Aprendiz de Cadencia Media", "Intermediate Cadence Learner", "6.000 – 9.499 pts", "Nivel 3 – 5", "230 – 349 px/s", "Promedio funcional habitual; interrupciones de ritmo por encima de 350 px/s debido a hesitación sensorial paso a paso"],
      ["Tier 5: Escalador Inicial", "Novice Rung Climber", "< 6.000 puntos", "Nivel 1 – 2", "< 230 px/s", "Dificultad acusada para integrar los 4 peldaños como un único patrón; tendencia a reaccionar de forma fragmentada"]
    ],
    note: "Pautas calibradas con base en el ordenamiento serial (Lashley 1951), el modelo GMP (Schmidt 1975) y los principios de interceptación de Fitts (1954)."
  },
  techniques: {
    title: "Estrategias Prácticas para Dominar el Ritmo y la Agilidad en Escalera",
    items: [
      {
        name: "Chunking Motor en Bloque Único de Lashley (4-Step Serial Chunking)",
        desc: "No trates cada peldaño como una decisión individual. Concibe la secuencia 'Izq-Der-Izq-Der' como un movimiento único y fluido, disparando los 4 toques a partir del primer contacto.",
        tips: "Omite la comprobación visual entre peldaños y permite que la mano oscile con soltura como un péndulo elástico."
      },
      {
        name: "Invarianza Temporal Rítmica de Schmidt (GMP Metronomic Cadence)",
        desc: "Ante las aceleraciones de la escalera, preserva inalterable la proporción de tiempo relativo 1:1:1:1. Ajusta únicamente la energía muscular de la muñeca sin alterar el pulso interno.",
        tips: "Lleva una cuenta mental regular ('un-dos-tres-cuatro') para homogeneizar los desplazamientos."
      },
      {
        name: "Interceptación Predictiva con Compensación Descendente (Moving Target Interception)",
        desc: "Como la escalera desciende de manera ininterrumpida, apunta entre 2 y 3 píxeles por debajo del centro del peldaño. La propia caída hará coincidir el cursor en el momento exacto.",
        tips: "Evita apuntar al borde superior para no dejar que el peldaño escape antes del impacto."
      },
      {
        name: "Fijación Ocular Central en Eje Vertical para Gran Velocidad (Central Axis Gaze)",
        desc: "A más de 500 px/s, seguir los peldaños con la mirada fatiga la corteza visual. Mantén el foco relajado en la línea central y emplea la visión periférica para dirigir la muñeca.",
        tips: "Deja que el destello periférico de los peldaños active el ritmo automático de oscilación."
      }
    ]
  },
  steps: [
    "Adopta una postura estable y sitúa el cursor en el eje central de la escalera.",
    "Al iniciarse el descenso, ejecuta el primer movimiento decidido hacia el peldaño izquierdo.",
    "Conecta los peldaños 2, 3 y 4 en una secuencia rítmica continua sin interrupción.",
    "Sostén el multiplicador de 3.0x de forma ininterrumpida para coronar el rango Apex en los 45 segundos."
  ]
};

export default function AgilityLadderPageEs() {
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
      <MotorSequencingClient
        copy={{
          title: "Ejercicios de Escalera de Agilidad & Footwork",
          subtitle: "Secuenciación Motora Bilateral & Cadencia Rítmica • 15 Niveles",
          hudLabels: {
            score: "Puntuación",
            timeLeft: "Tiempo Restante",
            bestScore: "Mejor Puntuación",
            bestCombo: "Mejor Combo"
          },
          rulesTitle: "Reglas de la Prueba de Escalera de Agilidad y Puntuación",
          rules: [
            { title: "Contacto Secuencial de Peldaños", text: "Toca los peldaños en el orden estricto de descenso (1 Izq → 2 Der → 3 Izq → 4 Der) para completar cada tramo." },
            { title: "Multiplicador de Combo", text: "Resuelve escaleras sucesivas sin fallar para elevar el multiplicador de puntos hasta 3.0x." },
            { title: "Incremento de Velocidad", text: "Cada 250 puntos la velocidad de descenso asciende de 150 a 750 px/s y las hitboxes se estrechan." },
            { title: "Ruptura de Cadencia", text: "Omitir un peldaño o quebrar el orden secuencial restablece el multiplicador a 1.0x sin restar puntos." }
          ],
          aboutTitle: "Acerca de la Escalera de Agilidad y Secuenciación Motora",
          aboutHeading: "Coordinación Bilateral y Ritmo Neuromuscular de Footwork",
          aboutText: "Inspirado en los ejercicios tradicionales de escalera de velocidad del fútbol y el boxeo, este entrenamiento potencia la rapidez de apoyos y el ordenamiento serial de Lashley (1951). La alternancia rítmica del cursor desarrolla automatismos indispensables para el counter-strafe en shooters y refina la cadencia psicomotriz de deportistas y jugadores de eSports.",
          aboutCards: [
            {
              title: "Público Objetivo",
              desc: "Jugadores que buscan perfeccionar el ritmo de counter-strafe y paradas de mira, atletas que entrenan el juego de pies y practicantes de coordinación fina."
            },
            {
              title: "Habilidades Potenciadas",
              desc: "Cadencia rítmica bilateral, secuenciación motriz de 4 pasos, interceptación dinámica de blancos móviles y control de frenado."
            },
            {
              title: "Velocidad Progresiva",
              desc: "El descenso vertical se acelera de 150 a 750 px/s con sutiles variaciones laterales, demandando una constante adaptación bajo presión."
            }
          ]
        }}
      />
      <DrillGuide guide={ladderGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/agility-ladder"
          locale="es"
        />
      </div>
    </>
  );
}
