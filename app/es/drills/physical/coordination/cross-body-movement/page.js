import CrossBodyMovementClient from '@/app/drills/physical/coordination/cross-body-movement/CrossBodyMovementClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// INVESTIGACIÓN DE PALABRAS CLAVE NATIVAS (SERP ESPAÑA / LATAM)
// Búsquedas de alta intención y baja competencia:
// - "test de coordinacion ojo mano online" (Búsqueda principal neurofuncional)
// - "ejercicios de coordinacion visomotriz" (Entrenamiento psicomotor y destreza)
// - "cruce de la linea media corporal" (Concepto clave de integración sensorial y bilateral)
// - "juegos de coordinacion mano ojo gratis" (Búsqueda lúdica para navegador web)
// - "entrenamiento de coordinacion bilateral" (Control neuromuscular interhemisférico)
// - "control motor contralateral y barrido diagonal" (Mecánica psicomotriz avanzada)
// - "flick diagonal punteria raton" (Término gaming / eSports de microajuste)
// - "ejercicios de motricidad fina y precision" (Salud psicomotora y control postural)
// ============================================================

export const metadata = {
  title: "Coordinación Ojo Mano – Puntería Diagonal | SkillDrills",
  description: 'Test de coordinación ojo-mano online gratis. Conecta nodos diagonales en pantalla para entrenar coordinación bilateral y cruce de línea media en el PC.',
  keywords: [
    "test de coordinacion ojo mano online",
    "ejercicios de coordinacion visomotriz",
    "cruce de la linea media corporal",
    "juegos de coordinacion mano ojo gratis",
    "entrenamiento de coordinacion bilateral",
    "control motor contralateral y barrido diagonal",
    "flick diagonal punteria raton",
    "ejercicios de motricidad fina y precision",
    "coordinacion visomotora ejercicios",
    "test de destreza motora"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/coordination/cross-body-movement',
    languages: getAlternateLanguages('/drills/physical/coordination/cross-body-movement'),
  },
  openGraph: {
    title: "Coordinación Ojo Mano – Puntería Diagonal | SkillDrills",
    description: 'Test de coordinación ojo-mano online gratis. Conecta nodos diagonales en pantalla para entrenar coordinación bilateral y cruce de línea media en el PC.',
    url: 'https://skilldrills.online/es/drills/physical/coordination/cross-body-movement',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Coordinación Ojo Mano – Puntería Diagonal | SkillDrills",
    description: 'Test de coordinación ojo-mano online gratis. Conecta nodos diagonales en pantalla para entrenar coordinación bilateral y cruce de línea media en el PC.',
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
      "name": "Test de Coordinación Ojo Mano",
      "item": "https://skilldrills.online/es/drills/physical/coordination/cross-body-movement"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Coordinación Ojo Mano y Control Bilateral",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Herramienta online para evaluación y desarrollo del control motor contralateral y la coordinación visomotriz cruzando la línea media corporal.",
  "url": "https://skilldrills.online/es/drills/physical/coordination/cross-body-movement",
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
  "name": "Entrenador de Coordinación Ojo Mano",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador moderno con compatibilidad para HTML5 Canvas y Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/es/drills/physical/coordination/cross-body-movement",
  "inLanguage": "es-ES",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Juego de Coordinación Visomotriz (Cross-Body Movement)",
  "url": "https://skilldrills.online/es/drills/physical/coordination/cross-body-movement",
  "description": "Entrenamiento de barridos diagonales y cruce del eje medio corporal para la aceleración sináptica, reflejos y estabilidad de puntería en shooters.",
  "genre": [
    "Coordination Drill",
    "Motor Control",
    "Hand-Eye Training",
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
      "name": "¿Qué capacidades neuromotoras mide el test de coordinación ojo mano al cruzar la línea media?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El ejercicio evalúa la sincronización entre la corteza occipital visual, el lóbulo parietal posterior encargado de la cartografía espacial y la corteza motora primaria. Al ejecutar trazos diagonales cruzando el eje sagital, mide de forma precisa la velocidad de transferencia entre ambos hemisferios a través del cuerpo calloso."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué alcanzar objetivos en el espacio contralateral resulta más difícil que en el mismo lado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Según las investigaciones biomécanicas de David Carey y colaboradores (1996), los movimientos dirigidos al espacio contralateral (el lado opuesto a la mano que acciona) presentan una mayor latencia sináptica y mayor dispersión cinemática que los movimientos ipsilaterales, debido a la necesidad de coordinar simultáneamente ambos hemisferios cerebrales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo beneficia este entrenamiento la precisión y flicks diagonales en shooters como Valorant o CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La gran mayoría de jugadores practica únicamente microajustes horizontales. Sin embargo, en combates con desniveles o giros rápidos de 180 grados, el ratón debe recorrer amplios vectores diagonales. Este ejercicio entrena la palanca antebrazo-codo para evitar que la mira trace arcos curvos involuntarios sobre la alfombrilla."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué manera varían la tolerancia del corredor y el radio de los nodos entre el nivel 1 y el 15?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La dificultad se incrementa de forma dinámica cada 250 puntos acumulados. El margen de tolerancia del corredor se reduce progresivamente desde 10 píxeles en el nivel inicial hasta únicamente 4 píxeles en los niveles expertos, mientras que el radio de los nodos objetivo se reduce de 16 píxeles a 8 píxeles."
      }
    },
    {
      "@type": "Question",
      "name": "¿Salirse de los márgenes del corredor resta puntos o disminuye el tiempo de la sesión?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No se aplican penalizaciones de puntuación negativa ni se recorta el tiempo de 45 segundos. Sin embargo, desviarse fuera del corredor reinicia de inmediato el multiplicador de combo a 1.0x, lo que obliga al usuario a mantener un control cinemático continuo sin titubeos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué configuración de sensibilidad y alfombrilla se sugiere para ejecutar barridos diagonales amplios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se recomienda una sensibilidad media o moderadamente baja (entre 30 y 45 cm por giro de 360 grados) junto con una alfombrilla amplia (mínimo 450 mm de ancho). Esto permite realizar barridos completos con el antebrazo sin necesidad de levantar continuamente el ratón de la superficie."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es crucial articular desde el codo y antebrazo en lugar de mover únicamente la muñeca?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La articulación de la muñeca genera trayectorias en forma de arco circular debido a su anatomía articular. Para trazar líneas diagonales estrictamente rectas capaces de mantenerse dentro de un canal de 4 píxeles, el antebrazo debe funcionar como un brazo de palanca estable apoyado sobre el codo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo se aplica el modelo de control motor bifásico de Woodworth para frenar con precisión en el nodo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conforme al modelo de Robert Woodworth (1899), se debe ejecutar el 75% del trayecto a velocidad balística explosiva mediante el antebrazo, y utilizar el último 25% para ejercer una leve fricción con la yema de los dedos y el talón de la mano contra la alfombrilla, frenando suavemente mediante retroalimentación visual."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué técnica es indispensable para superar los 17.000 puntos y alcanzar el rango Apex Bilateral?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es vital la anticipación visual inmediata (gaze feedforward): en el milisegundo exacto en que el cursor entra en contacto con el nodo A, la mirada debe saltar al nodo B del extremo opuesto. Conservar el combo 3.0x ininterrumpidamente durante 45 segundos y sostener más del 92% de precisión en los niveles 12 a 15 garantiza el rango maestro."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se transfieren mis marcas y tiempos de reacción a servidores externos o se conservan en privado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Todos los datos de puntuación, combos y tiempos se computan en local mediante la API performance.now() y se guardan exclusivamente en el almacenamiento local del navegador (LocalStorage). Ninguna métrica individual es enviada a servidores ajenos."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo de Ejecución del Test de Coordinación Ojo Mano y Barrido Diagonal",
  "description": "Secuencia metódica de 4 pasos para conectar nodos diagonales cruzando la línea media y maximizar la puntuación.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Activación del Nodo Inicial A",
      "text": "Sitúa el cursor sobre el nodo cian visible en el borde de la pantalla para activar el vector de conexión diagonal.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/cross-body-movement#paso-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Barrido Diagonal Cruzando el Eje Sagital",
      "text": "Desplaza el ratón fluidamente en diagonal a través del centro de la pantalla sin rebasar los márgenes del canal luminoso.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/cross-body-movement#paso-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Impacto y Enlace en el Nodo Terminal B",
      "text": "Alcanza el nodo magenta del cuadrante opuesto para sellar la trayectoria, activando el estallido de partículas y sumando puntos.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/cross-body-movement#paso-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Mantenimiento Continuo de Racha y Multiplicador",
      "text": "Conecta nodos sucesivos sin salir del canal para escalar el combo hasta 3.0x y registrar la máxima puntuación durante 45 segundos.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/cross-body-movement#paso-4"
    }
  ]
};

const crossBodyGuide = {
  heading: "Fundamentación Científica: Cruce de la Línea Media y Control Motor Bilateral",
  subtitle: "Teoría de integración sensorial de Ayres, asimetría contralateral de Carey y control bifásico de Woodworth aplicados a la motricidad fina",
  intro: [
    "El entrenamiento de movimiento transcorporal (Cross-Body Movement) somete al sistema neuromuscular a la exigencia de trazar vectores diagonales continuos que atraviesan el eje medio sagital del cuerpo. A diferencia de las trayectorias confinadas a un único cuadrante de la pantalla, cruzar la línea media espacial exige una rápida y continua transferencia de información a través del cuerpo calloso para coordinar de forma sinérgica la musculatura del brazo en el espacio contralateral.",
    "La fundadora de la terapia de integración sensorial, Dra. A. Jean Ayres (1972), postuló que la capacidad de cruzar la línea media es un indicador primordial de maduración cerebral y de integración bilateral organizada. Décadas más tarde, David Carey, Hargreaves y Goodale (1996) demostraron experimentalmente que las acciones motoras dirigidas al espacio contralateral sufren de un incremento apreciable en la latencia neuromuscular y en los márgenes de error cinemático frente a las ipsilaterales. Este test está diseñado para entrenar y eliminar dicha brecha motriz.",
    "Bajo las leyes cinemáticas descritas por Paul M. Fitts (1954), al incrementarse la distancia entre extremos y reducirse la tolerancia espacial del pasillo, el Índice de Dificultad (ID) asciende de forma logarítmica. Conforme se avanza de nivel, el pasillo de error disminuye de 10 a 4 píxeles y los nodos se comprimen hasta los 8 píxeles. Superar estas cotas exige implementar el célebre modelo de control en dos fases de Robert Woodworth (1899): un primer impulso balístico acelerado por el antebrazo (75% del recorrido) seguido de una desaceleración terminal microscópica gobernada por control visual continuo (25% final).",
    "Precisión técnica y latencia de pantalla: Este test opera de forma nativa en el navegador utilizando performance.now() con resolución inferior al milisegundo. La respuesta percibida dependerá de la tasa de refresco del monitor (60Hz = 16.6ms, 144Hz = 6.9ms, 240Hz = 4.1ms) y del polling rate del ratón. Variaciones menores a 5ms corresponden a la variabilidad intrínseca del hardware."
  ],
  benchmarks: {
    title: "Baremos y Niveles de Desempeño en Coordinación Visomotora (5 Rangos)",
    headers: ["Rango / Nivel", "Título de Maestría", "Puntuación Mínima", "Nivel Alcanzado", "Precisión de Vector", "Diagnóstico Neurofisiológico"],
    rows: [
      ["Tier 1: Maestro Bilateral Supremo", "Apex Bilateral Master", "17.000+ puntos", "Nivel 12 – 15", "≥ 92% acierto", "Top 0,1%; transferencia interhemisférica excepcional; barridos perfectos en canal estrecho de 4px con pivote de codo absoluto (Ayres 1972; Fitts 1954)"],
      ["Tier 2: Barridor de Línea Media Elite", "Elite Midline Sweeper", "13.000 – 16.999 pts", "Nivel 9 – 11", "85 – 91% acierto", "Excelente aceleración contralateral con óptimo control de frenado de Woodworth sobre nodos de 8px (Carey et al. 1996)"],
      ["Tier 3: Trazador Vectorial Avanzado", "Advanced Vector Tracer", "9.500 – 12.999 pts", "Nivel 6 – 8", "76 – 84% acierto", "Habilidad notable para shooters competitivos; ligera dispersión cinemática cuando el canal se estrecha por debajo de 6px"],
      ["Tier 4: Conector Intermedio", "Intermediate Node Connector", "6.000 – 9.499 pts", "Nivel 3 – 5", "65 – 75% acierto", "Promedio habitual en adultos; pérdidas periódicas de racha causadas por rigidez de muñeca en trazos diagonales amplios"],
      ["Tier 5: Aprendiz Diagonal Inicial", "Novice Diagonal Learner", "< 6.000 puntos", "Nivel 1 – 2", "< 65% acierto", "Dificultad acusada al atravesar el eje central; tendencia a describir trayectorias parabólicas en arco con pérdida del corredor"]
    ],
    note: "Valores calibrados mediante la teoría de integración sensorial (Ayres 1972), investigaciones de alcance contralateral (Carey et al. 1996) y constantes de Fitts (1954)."
  },
  techniques: {
    title: "Estrategias de Entrenamiento para Maximizar la Puntería Diagonal y Coordinación Bilateral",
    items: [
      {
        name: "Alineación Corporal Central con el Eje Sagital (Ayres Midline Alignment)",
        desc: "Sitúa la silla y el torso alineados con el centro geométrico del monitor. Evita rotar el tronco para que el desplazamiento represente un cruce genuino del plano medio mediante la musculatura del brazo.",
        tips: "Mantén los hombros estables y apoya ligeramente el codo sobre la mesa para generar una base de deslizamiento firme."
      },
      {
        name: "Fijación Ocular Anticipatoria Feedforward (Contralateral Target Fixation)",
        desc: "Tal como evidenciaron Carey y colaboradores (1996), seguir con los ojos el cursor eleva la latencia. En el mismo instante en que toques el nodo A, proyecta la mirada directamente hacia la posición del nodo B.",
        tips: "Deja que el sistema motor periférico traslade la mano mientras tu foco visual permanece inmóvil en el punto de destino."
      },
      {
        name: "Frenado Terminal de Woodworth por Fricción (Current-Control Braking)",
        desc: "Acelera sin dudar en el primer tramo del vector y descarga suavemente peso sobre la alfombrilla con las yemas de los dedos en el último 20% del trayecto.",
        tips: "Esta fricción controlada detiene la inercia del brazo y previene el sobrepaso (overshoot) sobre nodos pequeños de 8 píxeles."
      },
      {
        name: "Pivote Mecánico de Codo vs. Rotación Curva de Muñeca (Elbow Pivot)",
        desc: "Mover únicamente la muñeca induce giros curvilíneos que rebasan de inmediato el canal de 4 píxeles. Fija la muñeca en posición neutra y ejecuta el vector utilizando el antebrazo articulado desde el codo.",
        tips: "Verifica que el cable del ratón cuente con holgura suficiente o recurre a un mouse bungee para impedir tensiones irregulares."
      }
    ]
  },
  steps: [
    "Adopta una postura erguida centrando el pecho con respecto al medio de la pantalla.",
    "Al activarse la prueba, sitúa el cursor sobre el nodo cian visible en el perímetro del lienzo.",
    "Desliza el ratón de forma recta y continua a través del centro hacia el nodo magenta opuesto.",
    "Alcanza el nodo objetivo y prolonga el multiplicador de 3.0x a lo largo de toda la sesión de 45 segundos."
  ],
  audience: "Jugadores y atletas de eSports (CS2, Valorant, Apex Legends), deportistas de disciplinas de precisión, pilotos y cualquier persona que busque optimizar su coordinación óculo-manual y control bilateral de la línea media.",
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('ayres1972', 'carey1996', 'cernacek1961', 'fitts1954', 'woodworth1899', 'woods2015'),
};

export default function CrossBodyMovementPageEs() {
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
      <CrossBodyMovementClient
        copy={{
          title: "Test de Coordinación Ojo Mano",
          subtitle: "Cruce de Línea Media & Control Motor Bilateral • 15 Niveles",
          hudLabels: {
            score: "Puntuación",
            timeLeft: "Tiempo Restante",
            bestScore: "Mejor Puntuación",
            bestCombo: "Mejor Combo"
          },
          rulesTitle: "Reglas de la Prueba de Coordinación y Puntuación",
          rules: [
            { title: "Activación del Nodo Inicial", text: "Toca con el cursor el nodo cian en el borde de la pantalla para encender la trayectoria diagonal." },
            { title: "Barrido Diagonal en Línea Media", text: "Cruza la pantalla en línea recta sin superar las bandas de tolerancia del pasillo iluminado." },
            { title: "Impacto y Multiplicador", text: "Alcanza el nodo magenta del extremo opuesto para sumar puntos y elevar el multiplicador de combo." },
            { title: "Tolerancia de Trayectoria", text: "Salirse del corredor reinicia el combo a 1.0x sin restar puntuación ni descontar tiempo." }
          ],
          aboutTitle: "Acerca del Entrenamiento de Coordinación",
          aboutHeading: "Neurofisiología del Cruce de Línea Media e Integración Bilateral",
          aboutText: "Este ejercicio se sustenta en la teoría de Integración Sensorial de Jean Ayres (1972) y en las investigaciones de alcance contralateral de David Carey (1996). Los barridos diagonales que cruzan el eje sagital demandan una rápida transferencia interhemisférica por el cuerpo calloso, entrenando al sistema neuromuscular para ejecutar flicks de 180 grados y transiciones rápidas con absoluta estabilidad.",
          aboutCards: [
            {
              title: "Público Objetivo",
              desc: "Jugadores competitivos que buscan perfeccionar flicks diagonales y giros amplios de puntería, así como personas interesadas en optimizar la motricidad fina."
            },
            {
              title: "Beneficios Neurológicos",
              desc: "Activación interhemisférica coordinada, perfeccionamiento del frenado agonista-antagonista y supresión del retraso motriz en espacio contralateral."
            },
            {
              title: "Dificultad Adaptativa",
              desc: "El pasillo se estrecha de 10px a 4px, los nodos disminuyen de 16px a 8px y los vectores alcanzan las esquinas más alejadas de la pantalla."
            }
          ]
        }}
      />
      <DrillGuide guide={crossBodyGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/cross-body-movement"
          locale="es"
        />
      </div>
    </>
  );
}
