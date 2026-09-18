import DropCatchClient from '@/app/drills/physical/reflex-training/drop-catch/DropCatchClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Spain & Latin America (ES / ES-ES / ES-MX)
// Primary Intent: test de la regla tiempo de reaccion, prueba de la regla reflejos, test de tiempo de reaccion online
// Hispanic Athletic/Academic Context: Test de la regla de Nelson adaptado digitalmente con paradigma Go/No-Go y blancos en caída libre
// High-Demand, Low-Competition Target Keywords:
//   - "test de la regla tiempo de reaccion" (Classic physical testing query)
//   - "prueba de la regla reflejos" (Ruler reflex assessment query)
//   - "test de tiempo de reaccion online" (High-demand digital chronometry query)
//   - "medir tiempo de reaccion online" (Reaction measurement utility query)
//   - "test go no go online" (Inhibitory control & stop-signal query)
//   - "tiempo de reaccion de eleccion" (Donders Type C choice reaction query)
//   - "test de reflejos y control de impulsos" (Impulse restraint reflex query)
//   - "mejorar tiempo de reaccion fps" (FPS gaming motor reflexes query)
//   - "ejercicios de reflejos visuales" (Visual motor conditioning query)
//   - "prueba de reaccion discriminativa" (Discriminative reaction test query)
// ============================================================

export const metadata = {
  title: "Test de la Regla – Tiempo de Reacción | SkillDrills",
  description: "Test de la regla online gratis. Atrapa objetos en caída libre para medir tu tiempo de reacción en milisegundos y entrenar reflejos rápidos en el PC.",
  keywords: [
    "test de la regla tiempo de reaccion",
    "prueba de la regla reflejos",
    "test de tiempo de reaccion online",
    "medir tiempo de reaccion online",
    "test go no go online",
    "tiempo de reaccion de eleccion",
    "test de reflejos y control de impulsos",
    "mejorar tiempo de reaccion fps",
    "ejercicios de reflejos visuales",
    "prueba de reaccion discriminativa"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/reflex-training/drop-catch',
    languages: getAlternateLanguages('/drills/physical/reflex-training/drop-catch'),
  },
  openGraph: {
    title: "Test de la Regla – Tiempo de Reacción | SkillDrills",
    description: "Test de la regla online gratis. Atrapa objetos en caída libre para medir tu tiempo de reacción en milisegundos y entrenar reflejos rápidos en el PC.",
    url: 'https://skilldrills.online/es/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de la Regla – Tiempo de Reacción | SkillDrills",
    description: "Test de la regla online gratis. Atrapa objetos en caída libre para medir tu tiempo de reacción en milisegundos y entrenar reflejos rápidos en el PC.",
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
      "name": "Test de la Regla & Drop Catch",
      "item": "https://skilldrills.online/es/drills/physical/reflex-training/drop-catch"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de la Regla Digital y Entrenador de Reflejos Drop Catch",
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
  "name": "Simulador de Caída Libre, Tiempo de Reacción y Paradigma Go/No-Go",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Reaction Time, Sports Science"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Reflex Drop Catch & Impulse Restraint Drill",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Motor Chronometry Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo traslada este simulador Drop Catch el clásico test de la regla escolar a formato digital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La prueba tradicional mide la distancia de caída de una regla física entre los dedos para calcular el tiempo de reacción por gravedad (d = 1/2gt²). Drop Catch digitaliza esta aceleración vertical no lineal (de 400 a 1250 px/s) e incorpora la complejidad cognitiva del paradigma Go/No-Go: atrapar dianas verdes válidas e ignorar señuelos rojos engañosos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué fundamento aporta la tarea de reacción discriminativa Tipo C de Donders (1868)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Franciscus Donders (1868) determinó que en las tareas Tipo C se presentan múltiples estímulos pero solo uno exige respuesta motora activa. Esta fase de clasificación perceptual previa antes de accionar el dedo añade de 80 a 120 ms en comparación con un reflejo simple ante un estímulo único."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué consiste la teoría del Tau Óptico de David N. Lee aplicada a objetos en caída libre?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Desarrollada por David N. Lee (1976), la teoría del tau óptico (τ) prueba que el cerebro no calcula distancia y velocidad de forma aislada; deduce el tiempo restante hasta el impacto (Time-to-Contact) evaluando directamente la tasa de expansión de la silueta en la retina. Esto permite anticipar el punto exacto de clic sobre la trayectoria."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo describe el modelo de carrera de caballos (Horse-Race Model) de Logan la inhibición del clic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gordon D. Logan (1984) demostró que ante un estímulo compiten dos procesos internos: el impulso motor de disparo ('Go') y la señal de freno inhibitorio ('Stop'). Si el cerebro reconoce el color rojo a tiempo, el veto inhibitorio gana la carrera y bloquea la flexión muscular del dedo, evitando una pulsación perjudicial."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué sanción se aplica al pulsar por error sobre un señuelo rojo durante el ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hacer clic sobre un señuelo rojo reinicia de inmediato la racha de combo a 1.0x, descuenta puntos acumulados y genera un parpadeo visual de fallo. En contextos competitivos, disparar a un objetivo indebido reproduce las consecuencias del fuego amigo con máxima penalización."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo compensa la bonificación de +0,6s por acierto la regularidad de juego?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cada captura válida de un círculo verde añade +0,6 segundos de extensión al reloj de la prueba. Los participantes con gran velocidad y férreo control de impulsos pueden superar con creces los 45 segundos iniciales y batir el récord de élite de 24.000 puntos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la posición visual recomendada para rastrear los objetos que descienden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conviene fijar la mirada en el tercio superior del área de juego. Mantener la atención cerca del punto de aparición permite clasificar el color verde o rojo en los primeros 50 ms y alinear el cursor en la línea de caída antes de que la aceleración gravitacional haga inalcanzable el blanco."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué las pantallas de 144Hz o 240Hz resultan determinantes frente a objetos rápidos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 1250 px/s, una pantalla de 60Hz actualiza la posición del blanco cada 20,8 píxeles, produciendo estelas borrosas. A 240Hz (4,1 ms por fotograma), la traslación entre cuadros se reduce a solo 5,2 píxeles, brindando una nitidez impecable que facilita el cálculo de intercepción visual."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué agarre de ratón optimiza las correcciones de altura en el eje vertical?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El agarre Fingertip (apoyo con las yemas) es el más indicado para movimientos gravitacionales verticales. Permite adelantar y retroceder el ratón con leves flexiones de los dedos sin desplazar el antebrazo completo, ganando valiosas fracciones de segundo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se transfieren mis tiempos de reacción o estadísticas a servidores externos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Toda la simulación física y la medición de tiempos a través de performance.now() se ejecutan íntegramente en la CPU de tu navegador web. Las puntuaciones máximas se registran únicamente de forma local en el localStorage de tu equipo, salvaguardando tu privacidad."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo en 4 Fases para Intercepción Gravitacional y Control de Impulsos",
  "description": "Entrenamiento metódico para mejorar el tiempo de reacción de elección, el cálculo de caída libre y el freno inhibitorio.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Anclaje Visual en el Tercio Superior (Upper Third Anchoring)",
      "text": "Fije la mirada en el tercio superior del recuadro para discernir si el objeto es verde (atrapar) o rojo (ignorar) en los primeros 50 ms tras surgir.",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/drop-catch#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Alineación Previa en el Eje de Caída (Vertical Pre-Positioning)",
      "text": "Sitúe el cursor con rapidez sobre el vector vertical de descenso antes de que la gravedad acelere la velocidad por encima de 800 px/s.",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/drop-catch#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Veto Inhibitorio de Logan ante Señuelos Rojos (Stop-Signal Veto)",
      "text": "Al detectar una tonalidad roja, relaje al instante los flexores del dedo índice y deje pasar el objeto sin accionar el botón del ratón.",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/drop-catch#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Captura en el Tercio Medio y Extensión Temporal (+0.6s Streak)",
      "text": "Presione el clic limpiamente en la zona central para sumar +0,6s por acierto, consolidar el multiplicador 3.0x y aspirar a los 24.000 puntos.",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/drop-catch#step-4"
    }
  ]
};

const dropGuide = {
  heading: "Guía de Biomecánica de Caída Libre, Tiempo de Reacción y Control Inhibitorio",
  intro: {
    title: "Fundamentos Científicos de la Discriminación de Estímulos y Freno Motor",
    paragraphs: [
      "Drop Catch es un simulador de cronometría psicomotora y control de impulsos que eleva la tradicional prueba de la regla escolar a un estándar digital de alta competición. En lugar de limitarse a cerrar los dedos sobre un objeto en caída física, el participante se enfrenta a una prueba de reacción discriminativa Tipo C de Donders (1868): atrapar dianas válidas en aceleración continua suprimiendo simultáneamente cualquier disparo frente a señuelos distractores.",
      "Bajo la influencia de la aceleración gravitatoria (s = 1/2gt²), la velocidad vertical de los objetos pasa de 400 px/s a un máximo de 1250 px/s. Conforme a la teoría del tau óptico (τ) de David N. Lee (1976), el córtex visual estima el margen hasta el impacto (Time-to-Contact) a través de la tasa de expansión retiniana del estímulo. Intentar calcular mentalmente la aceleración produce demoras fatales; la destreza radica en colocar el cursor de forma anticipada sobre la línea de caída.",
      "El mayor reto neurocognitivo estriba en los señuelos rojos que aparecen de forma aleatoria. Según el modelo de carrera de caballos (Horse-Race Model) de Gordon D. Logan (1984), en el sistema nervioso pugnan dos órdenes simultáneas: el impulso de acción predeterminado ('Go') y la orden de freno prefrontal ('Stop'). Solo cuando el control inhibitorio se impone al automatismo motor se evitan pulsaciones erróneas, habilidad indispensable en tiradores de élite.",
      "Con vistas a garantizar una exactitud cronométrica estricta, la aplicación utiliza la interfaz performance.now() del navegador. En monitores de 144Hz o 240Hz, el rastro visual en blancos que caen a 1250 px/s se suprime por completo, posibilitando una discriminación perceptiva sin retardo de fotograma (Woods et al., 2015). Tus puntuaciones se resguardan únicamente en el almacenamiento local de tu ordenador."
    ]
  },
  benchmarks: {
    title: "Baremo de Rendimiento en 5 Niveles para Tiempo de Reacción de Elección",
    headers: ["Nivel y Categoría", "Título (Rank Title)", "Objetivo de Puntos", "Tiempo de Reacción y Precisión", "Calificación", "Perfil Neuromotor"],
    rows: [
      ["Tier 1: Interceptor Gravitacional Ápice", "Apex Gravitational Interceptor", "24.000+ puntos", "< 190 ms / > 95%", "Grade S", "Top 0,1% de élite en eSports y pilotos de combate. Inhibición de Logan intachable y captura impecable a 1250 px/s (Lee 1976; Logan 1984)"],
      ["Tier 2: Atacante Reflexivo de Precisión", "Precision Reflex Striker", "17.000 – 23.999 puntos", "195 – 240 ms / 90 – 94%", "Grade A", "Top 10% semiprofesional. Anticipación visual destacada y racha de 3.0x conservada con un 45% de señuelos en velocidad extrema"],
      ["Tier 3: Interceptor Hábil de Caída", "Skilled Drop Catcher", "11.000 – 16.999 puntos", "245 – 310 ms / 82 – 89%", "Grade B", "Top 35% jugadores habituales. Coordinación óculo-manual eficiente y aprovechamiento constante del bono de +0,6s para prolongar la partida"],
      ["Tier 4: Aprendiz en Desarrollo de Reflejos", "Developing Reflex Trainee", "6.000 – 10.999 puntos", "311 – 370 ms / 70 – 81%", "Grade C", "Nivel promedio adulto. Por encima de 800 px/s surgen pulsaciones involuntarias en señuelos rojos y rupturas de serie"],
      ["Tier 5: Principiante en Freno Inhibitorio", "Novice Decoy Learner", "< 6.000 puntos", "> 370 ms / < 70%", "Grade D", "Fase inicial de aclimatación. Dificultad para discernir colores a alta velocidad; se aconseja fijar la vista en el tercio superior de la pantalla"]
    ],
    note: "Parámetros basados en la cronometría Tipo C de Donders (1868), la teoría del tau de Lee (1976) y el marco inhibitorio de Logan (1984)."
  },
  techniques: {
    title: "4 Protocolos Prácticos para Reacción de Caída y Supresión de Errores",
    items: [
      {
        name: "Anclaje Visual en el Tercio Superior (Upper Third Visual Anchoring)",
        desc: "No persiga el objetivo con los ojos desde el techo hasta el suelo. Ancle la mirada en el tercio superior para clasificar el color en 50 ms y situar el ratón en la línea de descenso con antelación.",
        tips: "No intente alcanzar el blanco por detrás: espérelo en el punto de intercepción proyectado."
      },
      {
        name: "Veto Inhibitorio Stop-Signal de Logan (Logan Stop-Signal Veto)",
        desc: "Neutralice el impulso automático del dedo índice ante cualquier movimiento. En cuanto perciba el menor destello rojo, relaje la musculatura de los dedos de forma instantánea.",
        tips: "Un clic sobre un señuelo anula todo el multiplicador de 3.0x; la contención es tan valiosa como el acierto."
      },
      {
        name: "Intercepción Gravitatoria por Tau Óptico (Optical Tau Interception)",
        desc: "La velocidad se multiplica conforme el blanco se acerca al fondo. Ejecute el clic con firmeza en el tercio medio de la pantalla antes de que el objeto alcance velocidad de escape.",
        tips: "No demore el disparo hasta la zona límite inferior; asegure el impacto en la amplia ventana intermedia."
      },
      {
        name: "Microajuste Vertical con las Yemas (Fingertip Vertical Micro-Steering)",
        desc: "No apoye la palma con rigidez sobre el ratón. Sujete el dispositivo con las yemas de los dedos para realizar avances y retrocesos verticales inmediatos sin fricción excesiva.",
        tips: "Utilice la flexión de las falanges para rectificar la altura, manteniendo el antebrazo firme y relajado."
      }
    ]
  },
  steps: [
    "Mantenga la espalda erguida y centre la atención en el tercio superior de la pantalla.",
    "Compruebe en 50 ms si el círculo en descenso es verde (atrapar) o rojo (ignorar).",
    "Capture las dianas verdes en la zona media y permita que los señuelos rojos caigan libremente.",
    "Aproveche la adición de +0,6s por acierto para sostener el multiplicador 3.0x hacia los 24.000 puntos."
  ],
  audience: "Estudiantes y atletas que deseen comprobar su tiempo de reacción en el test de la regla con precisión digital, así como jugadores de shooters que requieran afinar puntería y control de impulsos.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'lee1976', 'logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedDropCatchPageEs() {
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
      <DropCatchClient
        copy={{
          title: "Test de la Regla & Tiempo de Reacción Online",
          subtitle: "Discriminación Visual y Control de Impulsos • Dificultad con Escalado Continuo",
          description: "La prueba de la regla y caída libre evalúa la rapidez de respuesta ante un objeto en descenso y la disciplina para contener el clic cuando procede. La intercepción no exige calcular distancia y velocidad de forma aislada: la imagen retiniana en expansión precisa el tiempo de contacto por sí misma (Lee, 1976). La contención responde a otro proceso — la orden de actuar y la de detenerse disputan una carrera interna y vence la más rápida (Logan & Cowan, 1984). La reacción visual simple consume entre 200 y 250 ms antes de cualquier movimiento (Woods et al., 2015).",
          hudLabels: {
            score: "Puntuación",
            time: "Tiempo",
            bestScore: "Mejor Puntuación",
            bestCombo: "Mejor Racha",
            getReady: "PREPÁRATE"
          },
          resultLabels: {
            accuracy: "Precisión",
            catches: "Capturas",
            fatalDecoys: "Señuelos Fatales",
            peakLevel: "Nivel Máximo"
          },
          rulesTitle: "Instrucciones del Drill y Sistema de Puntuación",
          rulesItems: [
            { title: "Captura de Dianas Válidas", text: "Haga clic en los círculos verdes antes de que toquen el suelo. Cada captura otorga 100 puntos base (multiplicados por nivel y racha) y añade +0,6s al temporizador." },
            { title: "Señuelos Trampa (Decoys)", text: "No pulse sobre círculos rojos. Déjelos caer libremente. Hacer clic en un señuelo reinicia toda su racha de combo y genera aviso visual." },
            { title: "Escalado Progresivo", text: "Al incrementar la puntuación, la velocidad de caída se eleva de 400 px/s a 1250 px/s, el diámetro de los blancos se contrae y la proporción de señuelos alcanza el 45%." },
            { title: "Multiplicador y Supervivencia", text: "Encadene capturas acertadas para alcanzar el multiplicador 3.0x y utilice la extensión de +0,6s por blanco para mantener la partida activa." }
          ],
          aboutTitle: "Sobre el Test de la Regla e Intercepción Gravitacional",
          aboutSections: [
            {
              title: "Aceleración Gravitacional y Tau Óptico de Intercepción",
              subtitle: "Cálculo de tiempo de contacto bajo aceleración vertical continua",
              content: "Los objetos en caída libre aceleran continuamente por gravedad. El sistema visual humano estima la ventana de impacto mediante el tau óptico (τ), la tasa inversa de dilatación retiniana (Lee, 1976). Esto permite predecir el milisegundo exacto de intercepción."
            },
            {
              title: "Control Inhibitorio y Señales de Freno de Logan",
              subtitle: "Paradigma de contra-orden y freno motor en el córtex prefrontal",
              content: "La presencia de señuelos rojos suscita una pugna interna entre el impulso motor automático 'Go' y el freno inhibitorio 'Stop' (Logan et al., 1984). Los tiradores disciplinados contienen el disparo hasta verificar el color de la diana."
            },
            {
              title: "Cronometría Discriminativa Tipo C de Donders",
              subtitle: "Tiempo de clasificación del estímulo previo a la ejecución motriz",
              content: "A diferencia de pruebas de reflejo simple, Drop Catch recrea la tarea Tipo C de Donders (1868): surgen múltiples estímulos pero solo los correctos requieren pulsación motora, demandando entre 80 y 120 ms adicionales de análisis cognitivo."
            },
            {
              title: "Flick Balístico y Deceleración Final en Dos Fases",
              subtitle: "Impulso en bucle abierto de Woodworth acoplado a ajustes ópticos",
              content: "El ajuste del cursor se rige por el modelo en dos etapas de Woodworth (1899): un primer desplazamiento balístico que recorre más del 85% de la trayectoria seguido de correcciones ópticas finales bajo la Ley de Fitts (1954)."
            }
          ]
        }}
      />
      <DrillGuide {...dropGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/drop-catch" />
    </>
  );
}
