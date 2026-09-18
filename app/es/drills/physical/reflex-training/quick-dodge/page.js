import QuickDodgeClient from '@/app/drills/physical/reflex-training/quick-dodge/QuickDodgeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Spain & Latin America (ES / ES-ES / ES-MX)
// Primary Intent: juego de esquivar con el raton, juegos de esquivar con el mouse, test de reflejos esquivar
// Hispanic Gaming & Athletic Context: Clásico juego del ratón para esquivar bolas rojas y entrenamiento de micro-movimiento para LoL y shooters
// High-Demand, Low-Competition Target Keywords:
//   - "juego de esquivar con el raton" (Core viral browser reflex game query)
//   - "juegos de esquivar con el mouse" (High-intent variation)
//   - "test de reflejos esquivar" (Reflex evasion assessment query)
//   - "juego de esquivar proyectiles" (Projectile evasion challenge)
//   - "entrenar reflejos raton" (Mouse reflex conditioning query)
//   - "juegos de habilidad con el raton" (Mouse dexterity gaming query)
//   - "prueba de reflejos y velocidad de reaccion" (Reflex & chronometry test)
//   - "entrenamiento de micro movimiento raton" (Esports micro-stepping drill)
//   - "juegos para mejorar reflejos pc" (PC reflex improvement query)
//   - "coordinacion ojo mano reflejos juego" (Hand-eye reflex challenge)
// ============================================================

export const metadata = {
  title: "Juego de Esquivar con el Ratón – Reflejos | SkillDrills",
  description: "Juego de esquivar con el ratón online gratis. Esquiva proyectiles veloces con el cursor para medir reflejos motores y tiempo de evasión en el PC.",
  keywords: [
    "juego de esquivar con el raton",
    "juegos de esquivar con el mouse",
    "test de reflejos esquivar",
    "juego de esquivar proyectiles",
    "entrenar reflejos raton",
    "juegos de habilidad con el raton",
    "prueba de reflejos y velocidad de reaccion",
    "entrenamiento de micro movimiento raton",
    "juegos para mejorar reflejos pc",
    "coordinacion ojo mano reflejos juego"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/reflex-training/quick-dodge',
    languages: getAlternateLanguages('/drills/physical/reflex-training/quick-dodge'),
  },
  openGraph: {
    title: "Juego de Esquivar con el Ratón – Reflejos | SkillDrills",
    description: "Juego de esquivar con el ratón online gratis. Esquiva proyectiles veloces con el cursor para medir reflejos motores y tiempo de evasión en el PC.",
    url: 'https://skilldrills.online/es/drills/physical/reflex-training/quick-dodge',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Juego de Esquivar con el Ratón – Reflejos | SkillDrills",
    description: "Juego de esquivar con el ratón online gratis. Esquiva proyectiles veloces con el cursor para medir reflejos motores y tiempo de evasión en el PC.",
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
      "name": "Centro de Entrenamiento Físico",
      "item": "https://skilldrills.online/es/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Entrenamiento de Reflejos",
      "item": "https://skilldrills.online/es/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Juego de Esquivar con el Ratón & Quick Dodge",
      "item": "https://skilldrills.online/es/drills/physical/reflex-training/quick-dodge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Juego de Esquivar con el Ratón y Simulador de Evasión Cinética",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Simulador de Esquiva de Proyectiles y Modelos Predictivos Cerebelares",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Evasion, Esports"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Quick Dodge Cursor Evasion Challenge",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Motor Chronometry Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Por qué esquivar proyectiles a alta velocidad es un reto de predicción y no de mera reacción?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cuando una esfera viaja a 400–600 px/s, el retardo intrínseco del bucle visual (100 a 150 ms) hace que cualquier corrección reactiva llegue tras el impacto. Como formuló Mitsuo Kawato (1999), el cerebelo recurre a modelos internos de avance (Forward Models) para proyectar la trayectoria futura en bucle abierto, anticipando el cursor hacia el espacio libre antes de que la vista lo verifique."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué refugiarse en las esquinas o bordes de la pantalla es la peor opción en rondas avanzadas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Desplazar el cursor hacia las paredes contrae las opciones de fuga física a un ángulo menor de 90 grados, facilitando que proyectiles convergentes bloqueen cualquier salida. Los tiradores expertos conservan el centro del tablero (área del 30%), garantizando rutas de escape simétricas en 360 grados mediante micro-maniobras de dedos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo se calculan la puntuación continua y los multiplicadores de racha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cada segundo de supervivencia suma puntos base continuos. Realizar una esquiva rozando el proyectil a escasos píxeles (Close Shave) eleva exponencialmente el multiplicador hasta el tope de 3.0x. Completar los 45 segundos sin recibir impactos es la única vía para franquear la meta de élite de 24.000 puntos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la precisión de la caja de colisión (hitbox) del cursor del ratón?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El cursor cuenta con un punto de impacto central estrictamente delimitado a 4 px de radio. La separación euclídea respecto a los proyectiles en avance (radio de 10 a 25 px) se evalúa a nivel de subpíxel en cada cuadro mediante la API performance.now(), eliminando imprecisiones físicas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué sanción se aplica cuando el cursor colisiona con un obstáculo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tocar una esfera genera un destello visual rojo en pantalla, disminuye la vitalidad de la sesión y reinicia automáticamente la racha acumulada a 1.0x, anulando el ritmo de progresión hacia puntuaciones récord."
      }
    },
    {
      "@type": "Question",
      "name": "¿Favorece esta prueba el esquive de skillshots en juegos competitivos como LoL o Valorant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, de manera concluyente. Estimula las mismas redes neuromotoras de 'anticipación geométrica de trayectoria y micro-frenada manual' imprescindibles para sortear habilidades lineales en League of Legends o ejecutar contramovimientos y strafes esquivos en shooters como CS2 y Valorant."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué tipo de agarre de ratón (Grip) otorga mayor agilidad para esquivar proyectiles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los agarres Fingertip (apoyo con yemas) y Claw son notablemente más eficaces que el agarre de palma (Palm Grip). Posibilitan quiebros rápidos de 5 a 15 px doblando únicamente las articulaciones de los dedos, prescindiendo de la fricción pesada de arrastrar todo el antebrazo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué ventajas proporcionan los monitores de 144Hz o 240Hz en ejercicios de esquiva rápida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 60Hz, un proyectil rápido salta unos 8,3 px por fotograma con arrastre visual. A 240Hz (4,1 ms entre cuadros), la distancia entre muestras cae a 2,1 px, proyectando una cinemática continua que clarifica la lectura de los corredores de escape seguros."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo prevenir la sobrecarga en la muñeca durante sesiones intensivas de micro-movimiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sujele el ratón sin tensión desmedida, como si sostuviera un objeto delicado. Apoye el antebrazo con comodidad y realice pausas de 60 segundos cada 3 partidas para distender los tendones extensores y flexores de la mano."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se transfieren mis tiempos o récords de esquiva a servidores en línea?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Toda la física vectorial y la cronometría operan en la CPU de tu navegador web. Las puntuaciones máximas y estadísticas se almacenan de modo seguro y exclusivo en el localStorage de tu propio ordenador."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo en 4 Fases para Esquiva de Proyectiles y Micro-Movimiento Predictivo",
  "description": "Secuencia científica para anticipar trayectorias balísticas, salvaguardar el centro y conservar el multiplicador 3.0x bajo máxima densidad.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Calibración Central Neutra (Center Calibration)",
      "text": "Ubique el cursor en el centro del espacio y apoye los dedos en postura Fingertip para permitir respuestas elásticas inmediatas en 360 grados.",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/quick-dodge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Predicción de Trayectorias de Kawato (Kawato Trajectory Prediction)",
      "text": "Advierta el origen de las esferas en los límites exteriores y anticipe los huecos resultantes del cruce de trayectorias en lugar de reaccionar tarde.",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/quick-dodge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Esquiva Milimétrica por Micro-Ajuste (Micro-Evasion Snapping)",
      "text": "Prescinda de giros amplios. Esquive pasando a 5–10 px de las esferas mediante toques sutiles de dedos para conservar el espacio vital.",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/quick-dodge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Consolidación del Combo y Supervivencia (Streak Heat Maintenance)",
      "text": "Supere los 45 segundos completos sin ningún impacto para afianzar el multiplicador 3.0x y sobrepasar la cota de 24.000 puntos.",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/quick-dodge#step-4"
    }
  ]
};

const dodgeGuide = {
  heading: "Guía de Biomecánica de Esquiva con Ratón, Cinemática de Proyectiles y Modelos Cerebelares",
  intro: {
    title: "Fundamentos Científicos de los Modelos Internos de Kawato y la Evasión Balística de Woodworth",
    paragraphs: [
      "Quick Dodge es un simulador de motricidad fina y respuesta visomotora ideado para entrenar la navegación ágil a través de torbellinos de proyectiles cinéticos mediante movimientos milimétricos de ratón. Más allá de un mero reflejo visual pasivo, el reto radica en resolver problemas de intercepción espacial inversa: calcular huecos dinámicos en un entorno sometido a aceleración constante.",
      "A tenor de los modelos internos del cerebelo descubiertos por Mitsuo Kawato (1999), la alta velocidad de los proyectiles (más de 500 px/s) hace inviable la corrección reactiva por bucle visual continuo debido al retardo aferente (100 a 150 ms). El sistema nervioso se protege anticipando la cinemática de los cuerpos: al detectar el vector de nacimiento de una esfera, el cerebelo descarga una orden motora balística precalculada para posicionar el ratón en la zona de menor riesgo.",
      "Conforme al modelo de control motor bifásico de Robert S. Woodworth (1899), todo movimiento rápido arranca con un impulso balístico inicial y concluye con una deceleración de precisión. En fases de alta velocidad, la Ley de Fitts (1954) indica que la merma del espacio libre (W) dispara de forma logarítmica la dificultad. Desplazarse con trazados amplios dilapida espacio y conduce al error; la maestría pertenece al micro-movimiento retenido en márgenes menores de 15 px.",
      "Para proveer una medición cronométrica rigurosa sin variabilidad externa, el entorno hace uso de la interfaz performance.now() del navegador. En monitores de 144Hz o 240Hz junto a ratones con 1000Hz de tasa de sondeo, el retardo se comprime por debajo de los 4 ms, suprimiendo estelas a velocidades vertiginosas y garantizando precisión pura (Woods et al., 2015). Tus datos se conservan estrictamente en tu terminal."
    ]
  },
  benchmarks: {
    title: "Baremo Oficial de Clasificación en 5 Niveles para Esquiva con Ratón",
    headers: ["Nivel y Categoría", "Título (Rank Title)", "Puntos Meta", "Tasa de Supervivencia y Velocidad", "Calificación", "Perfil Neuromotor"],
    rows: [
      ["Tier 1: Maestro Supremo de Esquiva Cinética", "Apex Kinetic Evader", "24.000+ puntos", "> 95% / 500+ px/s", "Grade S", "Top 0,1% de élite en eSports. Predicción cerebelar intachable de Kawato y micro-movimiento impecable entre más de 50 proyectiles (Kawato 1999; Woodworth 1899)"],
      ["Tier 2: Estratega de Trayectoria Precisa", "Precision Trajectory Striker", "17.000 – 23.999 puntos", "90 – 94% / 400 – 499 px/s", "Grade A", "Top 3% semiprofesional. Gran discernimiento espacial y conservación firme del enclave central frente a fuego nutrido"],
      ["Tier 3: Piloto Ágil de Evasión", "Skilled Evasion Pilot", "11.000 – 16.999 puntos", "82 – 89% / 300 – 399 px/s", "Grade B", "Top 15% jugadores competitivos. Control estable de muñeca y capacidad temprana para leer los vectores de peligro"],
      ["Tier 4: Aprendiz en Desarrollo", "Developing Dodger", "6.000 – 10.999 puntos", "70 – 81% / 200 – 299 px/s", "Grade C", "Promedio adulto. Tendencia a buscar refugio en las esquinas a velocidades altas; se aconseja ejercitar el retorno al centro"],
      ["Tier 5: Principiante en Esquiva Motora", "Novice Evasion Trainee", "< 6.000 puntos", "< 70% / < 200 px/s", "Grade D", "Nivel inicial. Impactos frecuentes por demora perceptiva; se recomienda relajar la muñeca y abarcar visualmente la pantalla entera"]
    ],
    note: "Parámetros basados en las formulaciones de Kawato (1999), el modelo en dos etapas de Woodworth (1899) y la escala de Fitts (1954)."
  },
  techniques: {
    title: "4 Protocolos Prácticos para Esquiva de Proyectiles y Destreza con el Ratón",
    items: [
      {
        name: "Anticipación Cerebelar de Kawato (Kawato Cerebellar Anticipation)",
        desc: "No reaccione cuando el proyectil esté encima. Identifique la dirección en cuanto surja en los márgenes y ubique el cursor en el vacío que se creará tras el cruce.",
        tips: "Preste atención a las aberturas libres entre las esferas, no a los proyectiles individuales."
      },
      {
        name: "Micro-Frenada de Dedos de Woodworth (Woodworth Micro-Snap)",
        desc: "Prescinda de trayectorias circulares amplias. Limite sus movimientos a un radio de 10 a 20 px y aplique un bloqueo seco con las yemas para detener el cursor.",
        tips: "Presione ligeramente la base sobre la alfombrilla para atajar deslizamientos incontrolados."
      },
      {
        name: "Disciplina de Anclaje Central (Central Anchoring Discipline)",
        desc: "Buscar la pared reduce las rutas de escape en 90 grados provocando la eliminación inmediata. Tras esquivar una oleada, devuelva el cursor al tercio central de inmediato.",
        tips: "Incorpore la secuencia de 'esquivar y recentrar' como una respuesta automática integrada."
      },
      {
        name: "Barrido Periférico Panorámico (Peripheral Cluster Scanning)",
        desc: "No concentre la vista en la punta del cursor. Mantenga una mirada difusa y abierta a la superficie completa, valiéndose de la propiocepción para guiar el ratón.",
        tips: "Una visión relajada en el centro revela la cadencia y el sentido de avance de los proyectiles de un vistazo."
      }
    ]
  },
  steps: [
    "Adopte una postura erguida y sitúe el cursor en la zona central del panel.",
    "Anticipe el curso de las esferas que emergen y desplace el ratón mínimamente a las zonas despejadas.",
    "Regrese sin demora al tercio central tras cada maniobra para evitar verse acorralado en las bandas.",
    "Complete los 45 segundos sin recibir impactos para sostener el multiplicador 3.0x y sobrepasar los 24.000 puntos."
  ],
  audience: "Jugadores de LoL, Valorant, CS2 y Apex que buscan potenciar el esquive de skillshots y la micro-movilidad de ratón, así como cualquier usuario interesado en agudizar reflejos y coordinación visomotriz.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kawato1999', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedQuickDodgePageEs() {
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
      <QuickDodgeClient
        copy={{
          title: "Juego de Esquivar con el Ratón & Test de Reflejos",
          subtitle: "Esquiva Cinética de Proyectiles y Modelos Predictivos • 15 Niveles de Dificultad",
          description: "Esquivar a un perseguidor es una cuestión de predicción, no de simple reacción: en el momento en que observas dónde está, ya ha cambiado de posición. Las maniobras rápidas se planifican de antemano mediante modelos internos cerebelares (Kawato, 1999) en vez de rectificarse en pleno vuelo, dado que la visión precisa de 100 a 150 ms para intervenir (Woodworth, 1899). Conforme la velocidad escala, la ventana de corrección se extingue y solo la predicción garantiza el éxito.",
          badge: "Test de Esquiva y Reflejos",
          hudLabels: {
            score: "Puntuación",
            time: "Tiempo",
            bestScore: "Mejor Puntuación",
            bestCombo: "Mejor Racha",
            getReady: "PREPÁRATE"
          },
          resultLabels: {
            newBest: "NUEVO RÉCORD",
            points: "Puntos",
            accuracy: "Precisión",
            dodges: "Esquivas",
            peakSpeed: "Vel. Máxima",
            peakLevel: "Nivel Máximo",
            playAgain: "Jugar de Nuevo"
          },
          rulesTitle: "Reglas del Drill y Sistema de Puntuación",
          rulesItems: [
            { title: "Esquiva de Proyectiles y Puntos", text: "Eluda cualquier contacto con las esferas rojas. Cada segundo de supervivencia añade puntuación constante." },
            { title: "Esquiva Rozando (Close Shave)", text: "Pase a escasos píxeles de los proyectiles para percibir bonificaciones añadidas y acelerar su racha de combo." },
            { title: "Incremento Progresivo de Velocidad", text: "Al elevar la puntuación, las esferas aceleran hasta 500 px/s y los intervalos de generación se estrechan drásticamente." },
            { title: "Sanción por Impacto", text: "Colisionar con un proyectil restablece la racha de combo a 1.0x y emite una advertencia visual en rojo." }
          ],
          aboutTitle: "Sobre el Juego de Esquivar con el Ratón y Biomecánica de la Evasión",
          aboutSections: [
            {
              title: "Evasión de Choques Cinéticos y Modelos Predictivos de Kawato",
              subtitle: "Simulación cerebelar de vectores previa a la latencia óptica aferente",
              content: "Esquivar objetos veloces descansa en la anticipación cerebelar descrita por Kawato (1999). Leer el ángulo inicial permite situar el ratón en la trayectoria segura antes de que el retardo visual comprometa la maniobra."
            },
            {
              title: "Control Bifásico de Woodworth y Micro-Frenado",
              subtitle: "Equilibrio entre impulso inicial balístico y bloqueo milimétrico",
              content: "Toda respuesta ágil combina una aceleración primera y un frenado exacto (Woodworth, 1899). Bloquear la posición con las yemas evita derrapes que ocasionarían impactos posteriores."
            },
            {
              title: "Ley de Fitts y Reducción del Espacio Seguro",
              subtitle: "Crecimiento logarítmico del índice de dificultad bajo lluvia de proyectiles",
              content: "Al multiplicarse los obstáculos, la anchura útil de paso (W) mengua de manera exponencial, exigiendo una finura motora extrema (Fitts, 1954)."
            },
            {
              title: "Altas Frecuencias de Refresco y Nitidez de Desplazamiento",
              subtitle: "Pantallas de 144Hz/240Hz con latencias de 4,1 ms para un seguimiento nítido",
              content: "Los paneles de alta tasa eliminan estelas en proyectiles a 500 px/s, suministrando al cerebro información sin distorsiones temporales (Woods et al., 2015)."
            }
          ]
        }}
      />
      <DrillGuide {...dodgeGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/quick-dodge" />
    </>
  );
}
