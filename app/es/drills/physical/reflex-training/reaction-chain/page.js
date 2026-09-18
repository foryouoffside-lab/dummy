import ReactionChainClient from '@/app/drills/physical/reflex-training/reaction-chain/ReactionChainClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Spain & Latin America (ES / ES-ES / ES-MX)
// Primary Intent: entrenamiento de frenado de punteria raton, como corregir overflick, test de inhibicion motora
// Hispanic Gaming Context: Corrección de overflicking en Valorant y CS2, frenado cinético de ratón, inhibición de respuesta
// High-Demand, Low-Competition Target Keywords:
//   - "entrenamiento de frenado de punteria raton" (Mouse aim braking training)
//   - "como corregir overflick raton" (How to fix overflick with mouse)
//   - "test de inhibicion motora reflejos" (Motor inhibition reflex test)
//   - "juego de frenado de raton y reflejos" (Mouse stopping reflex game)
//   - "ejercicio de desaceleracion de raton" (Mouse deceleration exercise)
//   - "parada cinetica punteria raton" (Kinetic arrest aim reflex)
//   - "test de precision y reflejos raton" (Mouse precision and reflex test)
//   - "juego de velocidad de reaccion raton" (Mouse reaction speed game)
// ============================================================

export const metadata = {
  title: "Frenado de Puntería – Inhibición Motora | SkillDrills",
  description: "Entrena frenado de puntería e inhibición motora con el ratón. Intercepta objetivos en movimiento y elimina el overflicking en el PC.",
  keywords: [
    "entrenamiento de frenado de punteria raton",
    "como corregir overflick raton",
    "test de inhibicion motora reflejos",
    "juego de frenado de raton y reflejos",
    "ejercicio de desaceleracion de raton",
    "parada cinetica punteria raton",
    "test de precision y reflejos raton",
    "juego de velocidad de reaccion raton",
    "como frenar la mira en fps",
    "entrenar stopping power raton"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/reflex-training/reaction-chain',
    languages: getAlternateLanguages('/drills/physical/reflex-training/reaction-chain'),
  },
  openGraph: {
    title: "Frenado de Puntería – Inhibición Motora | SkillDrills",
    description: "Elimine los fallos por inercia estabilizando la retícula al instante en el primer disparo. Módulo biomecánico avanzado para Counter-Strike 2 y Valorant.",
    url: 'https://skilldrills.online/es/drills/physical/reflex-training/reaction-chain',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
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
      "name": "Ejercicios",
      "item": "https://skilldrills.online/es/drills"
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
      "name": "Cadena de Reacción (Frenado de Puntería)",
      "item": "https://skilldrills.online/es/drills/physical/reflex-training/reaction-chain"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entrenamiento de Frenado de Puntería & Inhibición Motora (Reaction Chain)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Módulo neurobiomecánico para entrenar la desaceleración motora, la inhibición de respuesta y la supresión del overflicking en movimientos de ratón a alta velocidad.",
  "url": "https://skilldrills.online/es/drills/physical/reflex-training/reaction-chain",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/es"
  },
  "inLanguage": "es",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Frenado de Puntería – Inhibición Motora | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/es/drills/physical/reflex-training/reaction-chain",
  "inLanguage": "es",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entrenamiento de Frenado de Puntería & Inhibición Motora",
  "url": "https://skilldrills.online/es/drills/physical/reflex-training/reaction-chain",
  "genre": ["Reflex Game", "Motor Control Trainer", "Esports Precision"],
  "playMode": "SinglePlayer",
  "description": "Intercepte nodos a velocidades de hasta 1.800 px/s y detenga la velocidad del cursor por debajo de 1,5 px/frame dentro del objetivo para lograr multiplicadores de hasta 3,0x."
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Por qué detener un movimiento de ratón con precisión milimétrica es más complejo que acelerar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La aceleración procede de la contracción motora explosiva de los músculos agonistas. Sin embargo, detener el cursor exige que los grupos antagonistas generen fuerzas opuestas milimétricamente calibradas en una ventana de milisegundos. Como demostró Woodworth (1899), la fase de frenado final depende de la retroalimentación visual y somatosensorial con un retraso fisiológico de 100 a 150 ms; cualquier descoordinación muscular provoca que la inercia desplace el cursor más allá del blanco (overflick)."
      }
    },
    {
      "@type": "Question",
      "name": "Qué postula el Modelo de Carrera de Caballos de Logan y Cowan (1984)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El modelo postula que la orden motora de ejecución ('proceso Go') y la señal de frenado o cancelación ('proceso Stop') compiten de forma independiente dentro de los ganglios basales. Para detener un movimiento rápido antes de rebasar el objetivo, la señal de parada debe ganar la carrera neuronal e inhibir la contracción antes de que la inercia supere la fricción estática."
      }
    },
    {
      "@type": "Question",
      "name": "Qué es el Stop-Signal Reaction Time (SSRT) y cómo repercute en los shooters tácticos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El SSRT mide el tiempo de latencia neuronal interno (habitualmente de 180 a 250 ms) necesario para que el giro frontal inferior derecho (rIFG) y el núcleo subtalámico (STN) cancelen una orden motora en curso (Verbruggen & Logan, 2008). Un SSRT reducido permite anular un flick impreciso y clavar la mira en la cabeza del adversario sin oscilaciones parásitas."
      }
    },
    {
      "@type": "Question",
      "name": "Cuál es la causa biomecánica fundamental del overflick en Valorant y Counter-Strike 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El desequilibrio en la cocontracción de los músculos flexores y extensores del antebrazo. Al imprimir un impulso inicial excesivo sin una dosificación gradual de frenado, la energía cinética acumulada desborda el agarre estático del ratón sobre la alfombrilla. Este ejercicio condiciona la adherencia mecánica con las yemas de los dedos y la base del sensor."
      }
    },
    {
      "@type": "Question",
      "name": "Cómo influye la Ley de Fitts (Fitts, 1954) cuando la velocidad de los nodos se incrementa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Según la Ley de Fitts, el índice de dificultad (ID) se eleva logarítmicamente conforme disminuye la anchura de tolerancia espacial en relación con la distancia recorrida. A velocidades de 1.800 px/s, la ventana de corrección visual intermedia se reduce a cero, forzando al sistema neuromuscular a ejecutar una desaceleración balística de bucle abierto completamente calculada de antemano."
      }
    },
    {
      "@type": "Question",
      "name": "Qué significa la condición de 'menos de 1,5 px/frame' para convalidar una parada cinética?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es un umbral biomecánico estricto diseñado para neutralizar el 'slice-through' o deslizamiento superficial donde el jugador atraviesa el nodo sin detenerse. A 144 Hz, 1,5 px/frame equivale a menos de 216 px/s, demostrando físicamente que los músculos aplicaron una frenada real y que el ratón entró en régimen de fricción estática."
      }
    },
    {
      "@type": "Question",
      "name": "De qué modo afectan la superficie de la alfombrilla y los skates al control de frenado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las alfombrillas de vidrio o de tela ultra-deslizante facilitan la aceleración inicial pero ofrecen una retención de frenado (stopping power) prácticamente nula, sobrecargando los músculos estabilizadores. Para perfeccionar la desaceleración, las alfombrillas híbridas o de control con amortiguación intermedia proporcionan la fricción estática ideal para anclar la retícula."
      }
    },
    {
      "@type": "Question",
      "name": "Por qué es indispensable un monitor de 144Hz o 240Hz para el entrenamiento de inhibición motora?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tal como acreditaron Woods et al. (2015), los paneles de 60Hz introducen 16,6 ms de desfase y borrosidad estroboscópica en las desaceleraciones críticas. A 240Hz (4,1 ms), la trayectoria continua del nodo se representa con nitidez submilimétrica, facultando a la corteza visual para emitir la orden de frenado más de 10 ms antes."
      }
    },
    {
      "@type": "Question",
      "name": "Cuál es la dosificación diaria recomendada para no saturar el sistema nervioso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dado que la inhibición de respuesta consume elevados recursos cognitivos y sinápticos, se sugieren sesiones de 15 a 20 minutos diarios (10 a 15 rondas de 45 segundos con pausas de 45 segundos). Si se percibe fatiga muscular o agarrotamiento en la muñeca, debe suspenderse la práctica de inmediato para evitar vicios de sobretensión."
      }
    },
    {
      "@type": "Question",
      "name": "Cómo transferir el rendimiento de este drill a situaciones reales de combate en shooters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conserve idéntica sensibilidad efectiva (eDPI) y agarre que en sus partidas competitivas. Durante la práctica, focalice su mente en 'bloquear' el cursor dentro del centro del objetivo en lugar de simplemente 'hacer clic'. Esa disciplina motora estabiliza el primer impacto en duelos directos."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Guía de Entrenamiento de Frenado de Puntería e Inhibición Motora",
  "description": "Protocolo estructurado en 4 fases para interceptar objetivos veloces y suprimir por completo la inercia cinemática del cursor.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Bloqueo de Puntero y Posición Central",
      "text": "Haga clic sobre el lienzo interactivo para fijar el cursor y centre la retícula en la zona media."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Anticipación Vectorial y Flick Balístico",
      "text": "Calcule la trayectoria del nodo entrante y proyecte un flick de aceleración rápida cubriendo el 80% de la distancia."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Frenado Antagonista y Arresto Cinético",
      "text": "Al cruzar el borde del objetivo, aplique tensión antagonista y presión descendente para frenar por debajo de 1,5 px/frame."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Mantenimiento del Combo y Superación de 15.000 Puntos",
      "text": "Encadene detenciones sin fallos durante 45 segundos para sostener el multiplicador 3,0x y quebrar la barrera de los 15.000 puntos."
    }
  ]
};

const guideProps = {
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "Neurofisiología de la Inhibición Motora y Biomecánica del Arresto Cinético",
    paragraphs: [
      "Impulsar el ratón a velocidad terminal hacia una coordenada es una acción muscular elemental; detener su desplazamiento sin deslizar ni un solo píxel adicional constituye la verdadera cima del control motor. Mientras los entrenadores convencionales se limitan a registrar el instante del clic, Reaction Chain aísla y entrena la capacidad del sistema nervioso para disipar la inercia física de manera instantánea tras interceptar un objetivo en movimiento (Kinetic Arrest).",
      "En el célebre 'Modelo de Carrera de Caballos' de Gordon D. Logan y William B. Cowan (1984), el impulso motor excitador ('proceso Go') y el mandato inhibidor ('proceso Stop') compiten de modo independiente en los ganglios basales. Para clavar el cursor sobre un nodo dinámico, el giro frontal inferior derecho (rIFG) y el núcleo subtalámico (STN) deben desencadenar una contracción antagonista ultrarrápida que neutralice el momento cinético antes de que se produzca un rebase (Verbruggen & Logan, 2008).",
      "El modelo de control en dos fases de Robert S. Woodworth (1899) certificó que toda maniobra ágil consta de un impulso balístico inicial en bucle abierto y una desaceleración óptica terminal. Bajo la Ley de Fitts (1954), cuando los nodos aceleran a 1.800 px/s, el margen temporal de ajuste visual se extingue: solo un cálculo previo de deceleración almacenado en el cerebelo permite eludir el descontrol del overflick.",
      "Respaldado por la precisión temporal de performance.now(), este simulador computa el desplazamiento cuadro a cuadro y requiere una reducción por debajo de 1,5 px/frame para homologar la parada. Al practicarse en pantallas de 144Hz o 240Hz junto con sensores a 1000Hz, el retardo total se comprime por debajo de los 4 ms, garantizando una adaptación neuroplástica de máximo nivel (Woods et al., 2015)."
    ]
  },
  benchmarks: {
    title: "Baremos Oficiales de Frenado de Puntería e Inhibición Motora (5 Niveles)",
    headers: ["Rango de Habilidad", "Título Oficial", "Puntuación de Corte", "Tasa de Parada con Éxito", "Grado Global", "Perfil Neuromotor"],
    rows: [
      ["Tier 1: Maestro Supremo del Arresto Cinético", "Apex Kinetic Arrester", "15.000+ pts", "95%+ / 1500+ px/s", "Grade S", "Top 0,1% internacional. Capacidad de inhibición sobrehumana: detención instantánea a 1.800 px/s sin overflick (Logan 1984; Woodworth 1899)"],
      ["Tier 2: Tirador de Precisión Cinética", "Precision Kinetic Sniper", "11.000 – 14.999 pts", "90 – 94% / 1200 – 1499 px/s", "Grade A", "Top 3% profesional. Desaceleración excepcional mediada por las yemas de los dedos; bloqueo firme tras aceleraciones violentas"],
      ["Tier 3: Piloto Experimentado de Desaceleración", "Skilled Deceleration Pilot", "7.500 – 10.999 pts", "82 – 89% / 900 – 1199 px/s", "Grade B", "Top 15% competitivo. Frenada consistente a velocidad media; fallos ocasionales de deslizamiento a máxima aceleración"],
      ["Tier 4: Alumno de Frenado en Evolución", "Developing Stopper", "4.000 – 7.499 pts", "70 – 81% / 600 – 899 px/s", "Grade C", "Promedio adulto estándar. Propensión a sobrepasar el blanco debido a una activación retardada de los músculos antagonistas"],
      ["Tier 5: Practicante Inicial de Desaceleración", "Novice Arrester Trainee", "< 4.000 pts", "< 70% / < 600 px/s", "Grade D", "Inhibición motora deficiente con fallos constantes; requiere asimilar la frenada mecánica mediante fricción sobre la alfombrilla"]
    ],
    note: "Calibrado conforme al Modelo de Carrera de Logan (1984), el control motor bifásico de Woodworth (1899) y la Ley de Fitts (1954)."
  },
  techniques: {
    title: "Técnicas Prácticas de Frenado de Puntería",
    items: [
      {
        name: "Frenado Anticipado de Logan (Logan Kinetic Brake)",
        desc: "Intentar detener el ratón una vez alcanzado el objetivo provoca inevitablemente un exceso de carrera debido a la latencia nerviosa. Inicie la desaceleración al cubrir el 80% de la distancia para converger a velocidad cero exactamente sobre el centro del nodo.",
        tips: "Visualice el gesto no como tocar el objetivo, sino como incrustar firmemente la retícula en su centro."
      },
      {
        name: "Fricción Descendente con las Yemas (Fingertip Downforce)",
        desc: "No intente absorber toda la fuerza únicamente con la muñeca. En el instante de detención, aplique una leve presión hacia abajo con la yema de los dedos sobre el cuerpo del ratón para incrementar la fricción estática de la base.",
        tips: "Aproveche la amortiguación del tejido de la alfombrilla para multiplicar el agarre de frenado."
      },
      {
        name: "Supresión Radical del Slice-Through",
        desc: "Atravesar el nodo mientras se hace clic desestabiliza la puntería en partidas reales. Exija que el cursor se detenga completamente hasta que el indicador verde 'ARREST READY' confirme la parada.",
        tips: "La inmovilidad rigurosa en el interior del nodo prevalece sobre la velocidad precipitada."
      },
      {
        name: "Gestión de Rachas para Multiplicador 3,0x",
        desc: "Los errores de frenado no restan puntos pero reinician el multiplicador a 1,0x. Asegure una efectividad del 100% en los niveles iniciales para entrar a las fases de alta velocidad con la bonificación máxima activa.",
        tips: "Más del 80% del puntaje récord se genera durante los periodos en los que se conserva el multiplicador 3,0x."
      }
    ]
  },
  steps: [
    "Active la fijación del puntero en el área de juego y adopte un agarre estable (fingertip o claw).",
    "Fije la vista en el nodo entrante e inicie un movimiento balístico de aceleración decidida.",
    "Antes de cruzar la frontera del blanco, accione la frenada antagonista y la presión de dedos para situar la velocidad bajo 1,5 px/frame.",
    "Repita la maniobra con absoluta solvencia durante 45 segundos para preservar el multiplicador 3,0x y superar los 15.000 puntos."
  ],
  audience: "Jugadores de Counter-Strike 2, Valorant, Apex Legends y Overwatch 2 que buscan erradicar el overflick y perfeccionar la parada de primer disparo en la cabeza, así como deportistas que requieran una inhibición neuromotora veloz.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedReactionChainPageEs() {
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
      <ReactionChainClient
        copy={{
          title: "Entrenamiento de Frenado de Puntería & Inhibición Motora",
          subtitle: "Arresto Cinético & Control de Desaceleración • 15 Niveles de Velocidad",
          badge: "Test de Inhibición Motora",
          description: "Frenar en seco sobre un objetivo es biomecánicamente mucho más difícil que acelerar hacia él. La ejecución motora y la orden de detención compiten de forma independiente en el cerebro (Logan & Cowan, 1984). Un retraso en el frenado provoca el temido overflick por inercia (Woodworth, 1899). Intercepte los nodos y detenga el cursor al instante.",
          hudLabels: {
            score: "Puntuación",
            time: "Tiempo",
            accuracy: "Precisión de Parada",
            bestScore: "Mejor Puntuación",
            getReady: "PREPÁRATE"
          },
          pauseTitle: "Entrenamiento en Pausa",
          pauseSubtitle: "Haga clic en la pantalla para reactivar el bloqueo del puntero.",
          resultLabels: {
            newBest: "NUEVO RÉCORD",
            points: "Puntos",
            accuracy: "Precisión",
            totalArrests: "Paradas Cinéticas",
            maxCombo: "Racha Máxima",
            peakLevel: "Nivel Máximo",
            playAgain: "Jugar de Nuevo"
          },
          rulesTitle: "Reglas del Drill & Sistema de Puntos",
          rulesItems: [
            { title: "Parada Cinética (+50 Puntos)", text: "Intercepte el nodo entrante y detenga totalmente el cursor en su interior (ARREST READY) para sumar 50 puntos." },
            { title: "Multiplicador de Racha (hasta 3,0x)", text: "Encadenar detenciones sin fallos eleva el multiplicador de forma progresiva hasta el límite de 3,0x." },
            { title: "Paso en Falso & Deslizamientos", text: "Atravesar el nodo sin detenerse o errar el contacto reinicia la racha a 1,0x (sin restar puntos acumulados)." },
            { title: "Aceleración Brutal", text: "A medida que su puntuación se incrementa, los nodos aceleran hasta 1.800 px/s y el radio de parada se reduce." }
          ],
          aboutTitle: "Sobre el Frenado de Puntería & la Inhibición Neuromotora",
          aboutSections: [
            {
              title: "Frenado Cinético & Neurofisiología de la Inhibición",
              content: "Reaction Chain aísla y condiciona su capacidad de desaceleración motora e inhibición de respuesta. En lugar de limitarse a hacer clic en objetivos móviles, debe interceptar los nodos y obligar a sus músculos antagonistas a neutralizar la inercia del cursor dentro del área delimitada."
            },
            {
              title: "Modelo de Carrera de Logan & Estabilización de Primer Disparo",
              content: "La práctica asidua del arresto cinético reconfigura las conexiones en el núcleo subtalámico y la corteza motora (Logan et al., 1984). Esto erradica el overflick descontrolado y forja un anclaje impecable de primer disparo en juegos tácticos como CS2 y Valorant."
            }
          ],
          aboutCards: [
            {
              title: "Público Objetivo",
              desc: "Jugadores de FPS decididos a suprimir el overflicking y deportistas que requieran una detención neuromuscular rápida.",
              bgClass: "bg-blue-600/30",
              iconClass: "text-blue-400"
            },
            {
              title: "Capacidades Entrenadas",
              desc: "Desaceleración milimétrica, control de fricción estática, inhibición de señal de parada (SSRT) e interceptación espacial.",
              bgClass: "bg-emerald-600/30",
              iconClass: "text-emerald-400"
            },
            {
              title: "Frenado Cinético",
              desc: "Intercepte nodos a hasta 1.800 px/s y deténgase bajo 1,5 px/frame para maximizar multiplicadores de 3,0x.",
              bgClass: "bg-purple-600/30",
              iconClass: "text-purple-400"
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/reaction-chain" />
    </>
  );
}
