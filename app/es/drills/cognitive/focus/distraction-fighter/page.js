import DistractionFighterClient from '@/app/drills/cognitive/focus/distraction-fighter/DistractionFighterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Stroop Online – Control Inhibitorio | SkillDrills",
  description: "Test de Stroop online gratis: mida su inhibición cognitiva y atención selectiva indicando el color de la tinta sin dejarse confundir por la palabra escrita.",
  keywords: [
    "test de stroop",
    "test de stroop online",
    "efecto stroop",
    "atencion selectiva test",
    "control inhibitorio test",
    "test de colores y palabras",
    "interferencia de stroop",
    "ejercicios de concentracion mental",
    "velocidad de procesamiento cognitivo",
    "test psicologico de stroop gratis",
    "entrenamiento de flexibilidad cognitiva",
    "juego de atencion y reflejos online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/cognitive/focus/distraction-fighter",
    languages: getAlternateLanguages('/drills/cognitive/focus/distraction-fighter')
  },
  openGraph: {
    title: "Test de Stroop Online – Control Inhibitorio | SkillDrills",
    description: "Test de Stroop online gratis: mida su inhibición cognitiva y atención selectiva indicando el color de la tinta sin dejarse confundir por la palabra escrita.",
    url: "https://skilldrills.online/es/drills/cognitive/focus/distraction-fighter",
    siteName: "SkillDrills",
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Test de Stroop Online – Control Inhibitorio | SkillDrills",
    description: "Test de Stroop online gratis: mida su inhibición cognitiva y atención selectiva indicando el color de la tinta sin dejarse confundir por la palabra escrita."
  }
};

export default function DistractionFighterPageES() {
  const sources = pickSources(
    "Stroop (1935) - Studies of Interference in Serial Verbal Reactions",
    "MacLeod (1991) - Half a Century of Research on the Stroop Effect",
    "Logan & Cowan (1984) - On the Ability to Inhibit Thought and Action: A Theory of an Act of Control",
    "Posner & Petersen (1990) - The Attention System of the Human Brain"
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Entrenamiento Cognitivo", "item": "https://skilldrills.online/es/drills/cognitive" },
      { "@type": "ListItem", "position": 3, "name": "Test de Stroop", "item": "https://skilldrills.online/es/drills/cognitive/focus/distraction-fighter" }
    ]
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Test de Stroop Trainer",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entrenamiento neurocognitivo de inhibición atencional y control ejecutivo basado en el paradigma de interferencia color-palabra de Stroop."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Test de Stroop Online Interactivo",
    "url": "https://skilldrills.online/es/drills/cognitive/focus/distraction-fighter",
    "applicationCategory": "TrainingTool",
    "browserRequirements": "Requires JavaScript. HTML5 Canvas compatible."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Desafío de Inhibición Cognitiva de Stroop",
    "gamePlatform": "Web Browser",
    "genre": ["Brain Training", "Cognitive Drill", "Focus Training"]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Realizar el Test de Stroop Online",
    "description": "Metodología para aislar el color de la fuente y suprimir la lectura automática de la palabra.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enfoque en el Estímulo Central",
        "text": "Mire la palabra en pantalla sin pronunciar interiormente su significado textual."
      },
      {
        "@type": "HowToStep",
        "name": "Supresión del Impulso Lector",
        "text": "Inhiba activamente la respuesta automática de lectura y discrimine únicamente la longitud de onda de la tinta."
      },
      {
        "@type": "HowToStep",
        "name": "Selección del Botón Correcto",
        "text": "Pulse el botón del color físico correspondiente antes de que finalice la ventana de tiempo."
      },
      {
        "@type": "HowToStep",
        "name": "Sostenimiento del Ritmo",
        "text": "Mantenga una cadencia constante a lo largo de los 45 segundos para potenciar su combo y multiplicador de puntuación."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es el efecto Stroop y a qué se debe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es el retraso en el tiempo de reacción cuando el color de la tinta entra en conflicto con el significado semántico de la palabra. Se produce porque la lectura es un proceso cerebral automático que compite con la identificación voluntaria del color."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué estructuras cerebrales modulan este conflicto cognitivo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Intervienen de manera decisiva la corteza cingulada anterior (ACC), encargada de la detección de errores y conflictos, y la corteza prefrontal dorsolateral (DLPFC), responsable del control atencional top-down."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué cuesta más nombrar el color que leer la palabra?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La lectura de palabras familiares es una habilidad sobreaprendida que se procesa de forma pasiva e instantánea, requiriendo un esfuerzo cognitivo activo para ser bloqueada."
        }
      },
      {
        "@type": "Question",
        "name": "¿En qué medida ayuda este ejercicio a deportistas y jugadores de videojuegos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mejora la capacidad de ignorar estímulos visuales engañosos y previene errores por impulsividad en situaciones críticas de competición."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo se aconseja entrenar al día?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Entre 5 y 10 minutos al día en series cortas de 45 segundos resultan ideales para estimular la plasticidad prefrontal sin generar sobrecarga cognitiva."
        }
      },
      {
        "@type": "Question",
        "name": "¿Desaparece el efecto Stroop tras entrenar de forma continuada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La latencia de interferencia disminuye de manera sustancial, pero la tendencia refleja a leer nunca desaparece por completo en individuos alfabetizados."
        }
      },
      {
        "@type": "Question",
        "name": "¿Existe algún truco para mejorar la velocidad en el test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dirigir la mirada hacia el borde o extremo de una sola letra en lugar de ver la palabra completa reduce la activación de los centros del lenguaje."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo pondera el sistema la puntuación final?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tiene en cuenta el tiempo de respuesta en milisegundos, el número de aciertos consecutivos y el mantenimiento del combo multiplicador en rondas sucesivas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Pueden realizarlo personas con dificultades para distinguir colores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Personas con daltonismo marcado pueden experimentar discrepancias con ciertos tonos, aunque la interfaz utiliza combinaciones cromáticas contrastadas para mitigar confusiones."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo repercute este entrenamiento en la capacidad de concentración diaria?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fortalece las redes de inhibición frontal, facilitando el bloqueo de alertas del teléfono, conversaciones de fondo y pensamientos dispersos."
        }
      }
    ]
  };

  const guide = {
    title: "Fundamentos Científicos del Test de Stroop y Neurobiología Inhibitoria",
    intro: [
      "El efecto Stroop, descrito originalmente por J. Ridley Stroop en 1935, constituye uno de los hallazgos más sólidos de la psicología cognitiva. Al enfrentarse a palabras donde el texto contradice la tinta (por ejemplo, 'AMARILLO' en letras rojas), los tiempos de respuesta se demoran y la probabilidad de error se multiplica.",
      "La explicación reside en la velocidad disimétrica de procesamiento cerebral: leer es una conducta casi refleja y automática (MacLeod, 1991). Según el modelo de carrera de Logan & Cowan (1984), el impulso de lectura gana la competición interna a menos que las áreas frontales ejerzan una inhibición deliberada.",
      "La neurociencia confirma que la corteza cingulada anterior y la corteza prefrontal modulan esta resolución de interferencias. El entrenamiento sistemático incrementa la tolerancia a la distracción y afina el autocontrol bajo apremio de tiempo."
    ],
    benchmarks: {
      title: "Baremos de Rendimiento en el Test de Stroop (Sesión de 45 Segundos)",
      headers: ["Nivel de Habilidad", "Puntuación (45s)", "Tasa de Precisión", "Evaluación Neurocognitiva"],
      rows: [
        ["Tier 1 (Élite / Maestro de la Inhibición)", "18.000+ PTS", "96%+", "Control de impulsos sobresaliente; supresión instantánea de la lectura con respuesta ultrarrápida."],
        ["Tier 2 (Avanzado / Nivel Competitivo)", "12.000 – 17.999 PTS", "92% – 95%", "Interferencia mínima de Stroop; cadencia sólida y elevada flexibilidad cognitiva."],
        ["Tier 3 (Medio / Usuario Habitual)", "7.000 – 11.999 PTS", "85% – 91%", "Demora de interferencia normal en adultos sanos; ligeras vacilaciones ante contrastes marcados."],
        ["Tier 4 (Básico / Atención Intermitente)", "3.000 – 6.999 PTS", "75% – 84%", "Influencia predominante del impulso lector; enlentecimiento claro ante mayor dificultad."],
        ["Tier 5 (Iniciación / Alta Impulsividad)", "< 3.000 PTS", "< 75%", "Fallos reiterados y pérdidas de tiempo; alta propensión al cansancio atencional."]
      ],
      note: "Baremos obtenidos en sesiones de 45 segundos con diversidad de colores progresiva y tiempos de respuesta exigentes (Stroop, 1935; Woods et al., 2015)."
    },
    instructions: [
      "Observe la palabra y elija el botón correspondiente al color de la tinta.",
      "Ignore la palabra escrita: procese únicamente el color visible.",
      "Conserve un ritmo ágil para multiplicar la puntuación acumulada.",
      "Priorice la exactitud para no perder multiplicadores de acierto."
    ],
    tips: [
      "Fije la atención en la silueta o terminación de una letra y no en el término entero.",
      "No verbalice mentalmente los nombres de los colores para no entorpecer el procesamiento.",
      "Mantenga una respiración calmada para sostener la concentración durante las fases rápidas."
    ],
    sources
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <DistractionFighterClient
        copy={{
          title: "Test de Stroop",
          subtitle: "Interferencia Color-Palabra & Control Inhibitorio",
          caption: "Indique el color de la tinta e ignore el significado del texto. La interferencia entre lectura automática y discriminación de color mide su control inhibitorio ejecutivo (Stroop, 1935).",
          stageCaption: "Pulse el botón del color de la tinta e ignore la palabra contradictoria.",
          rulesTitle: "Instrucciones del Ejercicio y Puntuación",
          aboutTitle: "Acerca del Test de Stroop y la Inhibición Cognitiva",
          aboutText: "El efecto Stroop refleja la ralentización al indicar el color de una palabra cuando el significado entra en desacuerdo con la tinta (Stroop, 1935; MacLeod, 1991).\n\nLeer es una acción muy arraigada. La corteza cerebral debe inhibir voluntariamente la lectura para dar prioridad al color.\n\nEl entrenamiento metódico potencia la concentración frente a ruidos e interrupciones del entorno.",
          aboutCards: [
            { title: "¿Para quién es útil?", desc: "Personas en entornos de oficina compartida, estudiantes y competidores de videojuegos de acción.", color: "bg-blue-600" },
            { title: "Capacidades Entrenadas", desc: "Tolerancia a la interferencia, inhibición cognitiva, atención focalizada y autocontrol.", color: "bg-emerald-600" },
            { title: "Control Inhibitorio", desc: "Suprima el impulso reflejo de lectura e identifique los colores con rapidez y precisión.", color: "bg-purple-600" }
          ],
          rulesItems: [
            { title: "Interferencia de Stroop", text: "Aparece una palabra escrita (por ejemplo, 'VERDE') con una tinta de otro color (por ejemplo, azul)." },
            { title: "Criterio de Elección", text: "Toque el botón del COLOR DE LA TINTA (Azul) ignorando el significado (+100 Pts x Combo x Nivel, +0,6s)." },
            { title: "Errores", text: "Un fallo reinicia el combo y consume tiempo valioso. La ronda concluye al llegar a cero." },
            { title: "Rachas de Acierto", text: "Encadenar respuestas correctas amplifica la puntuación en los niveles más avanzados." }
          ]
        }}
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="cognitive"
          currentHref="/drills/cognitive/focus/distraction-fighter"
          locale="es"
        />
      </div>
    </>
  );
}
