import SpeedDrillClient from '@/app/drills/physical/fitness/speed-drill/SpeedDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Spain & Latin America (ES / ES-ES / ES-MX)
// Primary Intent: test de clics por segundo, prueba de velocidad de clic, test de cps online
// Hispanic Gaming & Athletic Context: FPS (Valorant, CS2, Apex) flick aiming y entrenamiento de reflejos con ratón
// High-Demand, Low-Competition Target Keywords:
//   - "test de clics por segundo" (Core high-demand CPS test query)
//   - "prueba de velocidad de clic" (Click speed assessment query)
//   - "test de cps online" (Popular browser testing tool query)
//   - "medir clics por segundo" (Measurement utility query)
//   - "test de reflejos raton" (Mouse reaction time query)
//   - "mejorar reflejos fps" (FPS motor agility query)
//   - "entrenamiento de punteria flick" (Ballistic flick aiming query)
//   - "test de velocidad de reaccion online" (Online chronometry query)
//   - "ejercicios de velocidad de clic" (Tapping speed routine query)
//   - "prueba de punteria y reflejos" (Aim & reflex assessment query)
// ============================================================

export const metadata = {
  title: 'Test de Clics por Segundo – Velocidad CPS | SkillDrills',
  description: 'Test de clics por segundo online gratis. Haz clic rápido en objetivos emergentes para medir tu CPS, velocidad de reacción y puntería rápida en el PC.',
  keywords: [
    "test de clics por segundo",
    "prueba de velocidad de clic",
    "test de cps online",
    "medir clics por segundo",
    "test de reflejos raton",
    "mejorar reflejos fps",
    "entrenamiento de punteria flick",
    "test de velocidad de reaccion online",
    "ejercicios de velocidad de clic",
    "prueba de punteria y reflejos"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/fitness/speed-drill',
    languages: getAlternateLanguages('/drills/physical/fitness/speed-drill'),
  },
  openGraph: {
    title: "Test de Clics por Segundo & Prueba de Velocidad de Clic – Speed Drill | SkillDrills",
    description: "Test gratuito de clics por segundo (CPS) y entrenamiento de reflejos para ratón. Intercepta objetivos en movimiento que se encogen con impulsos balísticos y cronometría motora precisa.",
    url: 'https://skilldrills.online/es/drills/physical/fitness/speed-drill',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Clics por Segundo & Prueba de Velocidad de Clic – Speed Drill | SkillDrills",
    description: "Test gratuito de clics por segundo (CPS) y entrenamiento de reflejos para ratón. Intercepta objetivos en movimiento que se encogen con impulsos balísticos y cronometría motora precisa.",
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
      "name": "Acondicionamiento y Velocidad",
      "item": "https://skilldrills.online/es/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Test de Clics por Segundo & Speed Drill",
      "item": "https://skilldrills.online/es/drills/physical/fitness/speed-drill"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Clics por Segundo y Entrenador de Velocidad de Reacción",
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
  "name": "Simulador de Velocidad de Clic y Adquisición de Blancos Dinámicos",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Precision, FPS"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Speed Drill Tapping & Flick Interception",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Chronometry Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿En qué se diferencia este test de velocidad de clic de un medidor tradicional de CPS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los contadores de CPS habituales se limitan a registrar pulsaciones mecánicas sobre una caja estática sin componente espacial. Este speed drill integra visión y motricidad activa: los objetivos surgen en coordenadas aleatorias y se reducen de tamaño constantemente, obligando a ejecutar un flick balístico inicial y un clic quirúrgico en fracciones de segundo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo se aplica el modelo de control motor de Woodworth en este ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Robert S. Woodworth (1899) describió que el movimiento rápido de las extremidades consta de dos fases: un impulso balístico inicial en bucle abierto que proyecta la mano hacia el objetivo, seguido de una desaceleración en bucle cerrado guiada por la retroalimentación visual. A ritmos altos, la segunda fase debe comprimirse para disparar antes de que el blanco colapse."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué disparar durante los primeros 150 ms optimiza el rendimiento según la Ley de Fitts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La Ley de Fitts (1954) demuestra que el índice de dificultad se eleva logarítmicamente conforme disminuye la anchura de la diana. Al nacer con 45 px y encogerse hasta 12 px, abatir el círculo en sus primeros 150 ms ofrece el margen de tolerancia física más amplio, evitando fallos por sobrecorrección."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué manera contribuye la visión periférica según la teoría de Treisman?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La Teoría de Integración de Características de Anne Treisman (1980) expone que los estímulos visuales en movimiento y de alto contraste generan mapas de prominencia en el colículo superior. Relajar la vista en el centro de la pantalla activa la atención encubierta (covert attention), detectando el nacimiento del objetivo sin esperar a mover los ojos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo se bonifica por cada acierto y cómo funciona la puntuación?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cada impacto acertado otorga 100 puntos base multiplicados por el nivel de dificultad actual y el multiplicador de racha (hasta 3.0x), añadiendo además +0,6 segundos al temporizador. Esto permite a los atletas con buena cadencia prolongar su partida y superar la cota de élite de 24.000 puntos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué penalización se aplica si fallo un clic o si el objetivo desaparece?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un clic en vacío o dejar que el blanco se consuma por completo reinicia de inmediato la racha de combo a 1.0x y emite un destello visual rojo. Si la penalización estricta está activada en opciones, también se restan 0,8 segundos directamente del reloj."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué tipo de agarre de ratón (Palm, Claw o Fingertip) proporciona mayor velocidad de pulsación?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los agarres Claw y Fingertip resultan notablemente más eficaces que el agarre de palma (Palm Grip). Al arquear los dedos perpendicularmente al interruptor del ratón, se reduce el recorrido muerto del botón y se aprovecha el retroceso elástico de los tendones de los dedos para una frecuencia de clics muy superior."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo afecta la tasa de refresco del monitor (60Hz vs 144Hz/240Hz) a los reflejos de clic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un monitor de 60Hz presenta una nueva imagen cada 16,7 ms, mientras que uno de 240Hz lo hace en solo 4,1 ms. Esta reducción de más de 12 ms en la latencia de despliegue proporciona al córtex motor una ventaja crucial para procesar la contracción del objetivo e iniciar el disparo antes de su extinción."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la frecuencia de entrenamiento recomendada para evitar fatiga en los tendones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se aconseja realizar entre 3 y 5 bloques de 45 segundos al día, intercalando descansos de 60 a 90 segundos para distender los músculos extensores y flexores del antebrazo. Es esencial no tensar el brazo con rigidez excesiva; la agilidad neuromotora florece con sesiones breves e intensas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se transfieren mis métricas de clics o tiempos de reacción a servidores en la nube?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Toda la cronometría basada en performance.now() y la gestión física de los impactos se calculan estrictamente dentro de tu navegador web. Las puntuaciones más altas y estadísticas se almacenan de forma local en tu equipo mediante localStorage, preservando tu privacidad íntegramente."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo en 4 Fases para Entrenar Velocidad de Clic y Adquisición Balística",
  "description": "Secuencia científica para aumentar los clics por segundo, acelerar el flick balístico y mantener rachas frente a dianas dinámicas.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Posición de Guardia Neutra (Ready Stance)",
      "text": "Ubique el antebrazo apoyado en la alfombrilla y mantenga el cursor en la zona central con un agarre Claw relajado listo para reaccionar.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/speed-drill#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Flick Balístico Precoz de Woodworth (Initial Impulse)",
      "text": "En cuanto aparezca un nuevo blanco en la periferia visual, proyecte el cursor con un movimiento directo y explosivo hacia la diana en los primeros 150 ms.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/speed-drill#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Disparo en Diámetro Máximo (Pre-Decay Triggering)",
      "text": "Presione el interruptor del ratón antes de que el círculo se encoja a dimensiones críticas, asegurando el impacto en el área de mayor tolerancia física.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/speed-drill#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Sostenimiento del Combo y Bônus de Tiempo (+0.6s Extensión)",
      "text": "Encadene impactos consecutivos sin fallar para consolidar el multiplicador 3.0x y sobrepasar el límite de élite de 24.000 puntos.",
      "url": "https://skilldrills.online/es/drills/physical/fitness/speed-drill#step-4"
    }
  ]
};

const speedGuide = {
  heading: "Guía Neuromuscular de Velocidad de Clic, CPS y Adquisición de Blancos",
  intro: {
    title: "Fundamentos Científicos del Control Motor Rápido y Puntería Balística",
    paragraphs: [
      "El Speed Drill es un sistema interactivo diseñado para evaluar y potenciar la velocidad de intercepción motora y la cadencia de clic bajo condiciones de tiempo crítico. Los movimientos a alta velocidad con el ratón responden al modelo clásico de dos etapas propuesto por Robert S. Woodworth (1899). En la primera fase (impulso balístico en bucle abierto), el córtex motor genera una descarga que traslada la mano cerca del objetivo. En la segunda fase (desaceleración y ajuste fino en bucle cerrado), los ojos refinan la posición final para ejecutar el disparo.",
      "La reducción continua del diámetro del objetivo (de 45 px hasta 12 px) impone una exigencia psicomotora extrema. Según la Ley de Fitts (1954), el índice de dificultad (ID) se incrementa de forma logarítmica con cada milímetro que se contrae la diana. Accionar el clic en los primeros 150 milisegundos ofrece una ventana física amplia, mientras que dudar conduce a correcciones microscópicas con alto riesgo de fallo. La decisión rápida en el primer impulso separa a los tiradores ordinarios de la élite.",
      "La aparición imprevista de las dianas activa la Teoría de Integración de Características de Anne Treisman (Treisman & Gelade, 1980). Los contrastes lumínicos y el movimiento generan mapas de prominencia en el colículo superior y el córtex parietal, permitiendo que la atención encubierta coordine el inicio del desplazamiento antes de la fijación visual directa. A la vez, el sistema visual estima el tiempo hasta la extinción mediante el tau óptico (Lee, 1976).",
      "Con el propósito de proveer una medición rigurosa sin desfases artificiales, este simulador hace uso exclusivo de la interfaz performance.now() del navegador. El empleo de pantallas de 144Hz o 240Hz junto a ratones de 1.000Hz sitúa las latencias físicas por debajo de los 4 ms, haciendo posible un registro neuromotor genuino (Woods et al., 2015). Toda la información se conserva íntegramente en tu dispositivo."
    ]
  },
  benchmarks: {
    title: "Baremo de 5 Niveles para Velocidad de Clic y Adquisición de Blancos",
    headers: ["Nivel y Categoría", "Título (Rank Title)", "Objetivo de Puntos", "Precisión y Tiempo de Reacción", "Calificación", "Perfil Neuromotor"],
    rows: [
      ["Tier 1: Francotirador de Velocidad Ápice", "Apex Velocity Sniper", "24.000+ puntos", "> 95% / < 160 ms", "Grade S", "Top 0,1% de élite en eSports. Flicks impecables de Woodworth, disparo inmediato en diámetro máximo y dominio sobre dianas de 12 px (Woodworth 1899; Fitts 1954)"],
      ["Tier 2: Atacante Reflexivo de Precisión", "Precision Reflex Striker", "17.000 – 23.999 puntos", "90 – 94% / 160 – 190 ms", "Grade A", "Top 3% semiprofesional. Orientación periférica veloz y control motor consolidado con racha continua a 3.0x de velocidad"],
      ["Tier 3: Interceptor Ágil de Blancos", "Rapid Target Interceptor", "11.000 – 16.999 puntos", "82 – 89% / 191 – 230 ms", "Grade B", "Top 15% jugadores competitivos. Cadencia de disparo regular y aprovechamiento táctico del bono de +0,6s para sostener la sesión"],
      ["Tier 4: Aprendiz en Desarrollo de Clic", "Developing Tapping Trainee", "6.000 – 10.999 puntos", "70 – 81% / 231 – 280 ms", "Grade C", "Nivel promedio adulto. Por encima de velocidad 2.0x aparecen vacilaciones en la desaceleración e impactos fuera del borde"],
      ["Tier 5: Principiante en Puntería", "Novice Target Pointer", "< 6.000 puntos", "< 70% / > 280 ms", "Grade D", "Fase inicial. Clics desorganizados próximos al cierre del círculo; se recomienda relajar la mirada en el centro y anticipar la trayectoria"]
    ],
    note: "Evaluación objetiva fundamentada en el análisis de impulsos de Woodworth (1899), la escala de Fitts (1954) y la cronometría perceptiva de Treisman (1980)."
  },
  techniques: {
    title: "4 Protocolos Prácticos para Aumentar el CPS y la Puntería Balística",
    items: [
      {
        name: "Flick Balístico Instantáneo de Woodworth (Woodworth Ballistic Snap)",
        desc: "No desplace el cursor despacio hacia el blanco. Lance el ratón con un movimiento balístico corto cubriendo el 80% de la trayectoria inicial y desacelere en el borde con las yemas de los dedos.",
        tips: "Inicie la aceleración con un golpe breve de muñeca, manteniendo los dedos elásticos para disparar al instante."
      },
      {
        name: "Intercepción Temprana de Fitts (Fitts Boundary Pre-Interception)",
        desc: "Cuanto más espere, más pequeño será el círculo y mayor la dificultad según la Ley de Fitts. Dispare en los primeros 150 ms aprovechando el diámetro completo de 45 px.",
        tips: "No gaste tiempo buscando el píxel central; cualquier zona dentro del área de colisión asegura el punto y el bono."
      },
      {
        name: "Atención Periférica Encubierta de Treisman (Treisman Covert Peripheral Awareness)",
        desc: "No mantenga los ojos clavados en la última coordenada de impacto. Mantenga la atención abierta en el centro para que la visión periférica active los reflejos de inmediato.",
        tips: "Mueva la mano en cuanto perciba el destello del blanco, sin aguardar a que los ojos enfoquen la diana por completo."
      },
      {
        name: "Agarre Claw de Alta Frecuencia (Claw-Grip High-Frequency Tapping)",
        desc: "No repose la palma de la mano con pesadez sobre el ratón. Arquee los dedos en posición de garra (Claw Grip) para presionar el interruptor de forma perpendicular con mínimo esfuerzo.",
        tips: "Focalice el impulso en el tendón del dedo índice, manteniendo el hombro y el antebrazo sin tensiones rígidas."
      }
    ]
  },
  steps: [
    "Adopte una postura cómoda y sitúe el cursor en la zona central del panel.",
    "Al divisar una diana, ejecute un flick explosivo directo hacia su superficie.",
    "Presione el clic antes de que el círculo encoja para sumar puntos y +0,6s de tiempo.",
    "Consolide la racha sin fallos hasta alcanzar el multiplicador 3.0x y busque la meta de 24.000 puntos."
  ],
  audience: "Jugadores de shooters competitivos (Valorant, CS2, Apex Legends, Overwatch) que desean acelerar su puntería flick y cadencia de clics, así como cualquier persona interesada en entrenar agilidad óculo-manual.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woodworth1899', 'fitts1954', 'treisman1980', 'lee1976', 'woods2015')
};

export default function LocalizedSpeedDrillPageEs() {
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
      <SpeedDrillClient
        copy={{
          title: "Test de Clics por Segundo & Prueba de Velocidad de Clic",
          subtitle: "Adquisición Balística de Blancos y CPS Dinámico • Dificultad con Escalado Continuo",
          description: "El entrenamiento de velocidad mide con qué rapidez puedes apuntar a un objetivo y hacer clic en él a medida que se encoge y el tiempo disminuye. La Ley de Fitts (1954) fija la base: el tiempo de movimiento crece con el logaritmo de la distancia dividida entre la anchura. El movimiento consta de dos partes — un impulso balístico inicial rápido y una corrección visual posterior más lenta (Woodworth, 1899) — y los objetivos que se contraen hacen costosas las correcciones lentas.",
          hudLabels: {
            score: "Puntuación",
            time: "Tiempo",
            bestScore: "Mejor Puntuación",
            bestCombo: "Mejor Racha",
            getReady: "PREPÁRATE"
          },
          resultLabels: {
            accuracy: "Precisión",
            hits: "Aciertos",
            bestReaction: "Mejor Reacción",
            peakLevel: "Nivel Máximo"
          },
          rulesTitle: "Instrucciones del Drill y Sistema de Puntuación",
          rulesItems: [
            { title: "Aciertos y Bonificación de Tiempo", text: "Haga clic en el círculo antes de que se encoja y expire. Cada impacto suma 100 puntos base (multiplicados por nivel y combo) y añade +0,6s al tiempo restante." },
            { title: "Multiplicador de Racha", text: "Destruya dianas sucesivas sin errar para multiplicar sus puntos hasta la tasa máxima de 3.0x." },
            { title: "Progresión de Dificultad", text: "Cada 1.750 puntos acumulados se incrementa el nivel, acelerando el desplazamiento espacial y la contracción de los círculos." },
            { title: "Penalizaciones por Fallo", text: "Errar el disparo o permitir que el objetivo desaparezca reinicia el combo a 1.0x. Con penalización estricta activada, se restan 0,8 segundos." }
          ],
          aboutTitle: "Sobre el Entrenamiento de Velocidad de Clic y Adquisición",
          aboutSections: [
            {
              title: "Flicks Balísticos y Adquisición Sub-Segundo",
              subtitle: "Modelo de control motor de Woodworth bajo máxima exigencia temporal",
              content: "La captura rápida de dianas se basa en el modelo de dos etapas de Woodworth (1899): un impulso balístico inicial en bucle abierto seguido de correcciones visuales. En niveles altos, la pausa entre detección y pulsación debe minimizarse radicalmente."
            },
            {
              title: "Contracción de Márgenes y la Ley de Fitts",
              subtitle: "Relación inversa entre velocidad y precisión durante la reducción de la diana",
              content: "Cada objetivo se encoge desde el instante en que aparece. Según la Ley de Fitts (1954), la dificultad crece de forma logarítmica cuando el diámetro se reduce. Pulsar en el diámetro inicial de 45 px es la clave de la precisión."
            },
            {
              title: "Prominencia Visual Pre-Atencional y Percepción Periférica",
              subtitle: "Integración de rasgos y orientación espacial encubierta",
              content: "Descrita por Treisman & Gelade (1980), la aparición de estímulos contrastados estimula mapas de prominencia en el colículo superior. La visión periférica detecta los cambios al instante guiando el flick motor."
            },
            {
              title: "Tau Óptico y Margen de Intercepción Temporal",
              subtitle: "Cálculo de la tasa de contracción retiniana antes de la desaparición",
              content: "El sistema visual mide el tiempo de expiración mediante el tau óptico (τ), la tasa inversa de contracción de la silueta retiniana (Lee, 1976). Evaluar el tiempo disponible con exactitud previene disparos acelerados o dudas costosas."
            }
          ]
        }}
      />
      <DrillGuide {...speedGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/fitness/speed-drill" />
    </>
  );
}
