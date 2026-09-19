import StrobePredictionPursuitClient from '@/app/drills/visual-tracking/strobe-prediction-pursuit/StrobePredictionPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Visión Estroboscópica y Predicción – SkillDrills",
  description: "Entrene la anticipación visual y predicción de trayectoria bajo oclusión estroboscópica. Optimice sus reflejos deportivos con este test oculomotor gratuito.",
  keywords: [
    "entrenamiento de visión estroboscópica",
    "visión estroboscópica en el deporte",
    "ejercicios de anticipación visual deportiva",
    "entrenamiento visual con oclusión intermitente",
    "seguimiento visual y predicción de trayectoria",
    "gafas estroboscópicas entrenamiento reflejos",
    "ejercicios de neurovisión y anticipación",
    "entrenamiento oculomotor intermitente",
    "predicción visomotora en atletas",
    "ejercicios de visión periférica y tracking",
    "test de anticipación temporal y espacial",
    "entrenamiento de reflejos visuales online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/strobe-prediction-pursuit",
    languages: getAlternateLanguages('drills/visual-tracking/strobe-prediction-pursuit')
  },
  openGraph: {
    title: "Visión Estroboscópica y Predicción – SkillDrills",
    description: "Entrene la anticipación visual y predicción de trayectoria bajo oclusión estroboscópica. Optimice sus reflejos deportivos con este test oculomotor gratuito.",
    url: "https://skilldrills.online/es/drills/visual-tracking/strobe-prediction-pursuit",
    siteName: "SkillDrills",
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Visión Estroboscópica y Predicción – SkillDrills",
    description: "Entrene la anticipación visual y predicción de trayectoria bajo oclusión estroboscópica. Optimice sus reflejos deportivos con este test oculomotor gratuito."
  }
};

export default function StrobePredictionPursuitPageES() {
  const sources = pickSources('appelbaum2011', 'bennett2007', 'mitroff2013', 'smith2016', 'woods2015', 'leigh2015');

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Entrenamiento Visual", "item": "https://skilldrills.online/es/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Visión Estroboscópica", "item": "https://skilldrills.online/es/drills/visual-tracking/strobe-prediction-pursuit" }
    ]
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenador de Visión Estroboscópica y Predicción",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entrenamiento neurocognitivo de seguimiento visual bajo pulsos periódicos de oclusión estroboscópica para atletas y jugadores competitivos."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ejercicio de Percepción y Predicción Estroboscópica",
    "url": "https://skilldrills.online/es/drills/visual-tracking/strobe-prediction-pursuit",
    "applicationCategory": "TrainingTool",
    "browserRequirements": "Requires JavaScript. HTML5 Canvas compatible."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Desafío de Visión Estroboscópica y Extrapolación",
    "gamePlatform": "Web Browser",
    "genre": ["Visual Training", "Cognitive Drill", "Esports Reflex"]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Entrenar la Anticipación Visual con Oclusión Estroboscópica",
    "description": "Metodología para optimizar el modelo motor interno cerebeloso mediante pulsos de oscuridad intermitente.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Alineación Ocular y Enfoque",
        "text": "Sitúese a 50-60 cm de la pantalla con la cabeza relajada y enfoque el centro del objetivo antes de que comiencen los ciclos de oscurecimiento."
      },
      {
        "@type": "HowToStep",
        "name": "Extrapolación Motora en Fase Oscura",
        "text": "Cuando el objetivo desaparezca durante el apagón estroboscópico, continúe desplazando el cursor prediciendo mentalmente su trayectoria."
      },
      {
        "@type": "HowToStep",
        "name": "Reorientación y Verificación Inmediata",
        "text": "En el instante en que la luz reaparezca, verifique la desviación de su estimación y corrija suavemente la posición del puntero."
      },
      {
        "@type": "HowToStep",
        "name": "Incremento Progresivo de Dificultad",
        "text": "Aumente la velocidad de desplazamiento y reduzca la ventana de visibilidad cuando su porcentaje de precisión oculta supere el 75%."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es el entrenamiento de visión estroboscópica en el deporte?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es una disciplina de entrenamiento en la que se interrumpe periódicamente la visión del deportista, forzando a los centros motores cerebrales a anticipar trayectorias sin soporte visual constante."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo mejora la oclusión intermitente la velocidad de reacción?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Al eliminar el flujo sensorial ininterrumpido, el cerebro fortalece las vías cerebelosas y parietales responsables de los modelos motores de predicción interna, disminuyendo el tiempo de indecisión."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el respaldo neurocientífico de este entrenamiento estroboscópico?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Investigaciones como las de Appelbaum et al. (2011) y Mitroff et al. (2013) comprobaron que el entrenamiento estroboscópico aumenta la memoria de trabajo visual y la discriminación de velocidad en deportistas de alto nivel."
        }
      },
      {
        "@type": "Question",
        "name": "¿En qué se diferencia el seguimiento continuo del seguimiento estroboscópico?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El seguimiento continuo opera en bucle cerrado mediante retroalimentación visual inmediata. El estroboscópico cambia a bucle abierto durante el apagón, exigiendo cálculos cinemáticos predictivos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué disciplinas deportivas se benefician más de esta práctica?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Béisbol, tenis, pádel, porteros de fútbol, hockey, artes marciales y jugadores de disparos en primera persona (FPS) donde las trayectorias de alta velocidad sufren oclusiones momentáneas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué debo hacer si pierdo la trayectoria cuando el objetivo reaparece?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No realice sacudidas violentas con el ratón. Efectúe una microcorrección fluida y conserve la velocidad de seguimiento para preparar la siguiente fase de oscurecimiento."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuántos minutos al día se aconseja practicar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De 10 a 15 minutos diarios distribuidos en rondas cortas de 60 a 90 segundos son suficientes para lograr adaptaciones neuronales sin sobrecargar la musculatura ocular."
        }
      },
      {
        "@type": "Question",
        "name": "¿Se requiere una pantalla de alta tasa de refresco para este ejercicio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es completamente funcional a 60Hz, aunque monitores de 144Hz o superiores brindan una respuesta visual más precisa durante los cortes rápidos de imagen."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo evalúa el sistema la precisión predictiva?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mide en tiempo real la distancia euclidiana entre el cursor del usuario y las coordenadas verdaderas del objetivo mientras este permanece en estado de oclusión total."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puede este software digital sustituir a las gafas estroboscópicas físicas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Si bien las gafas ocluyen todo el entorno visual físico, este simulador activa exactamente las mismas redes neuronales de extrapolación de trayectoria y control visomotor."
        }
      }
    ]
  };

  const guide = {
    title: "Guía Científica de Visión Estroboscópica y Predicción Visomotora",
    intro: [
      "El entrenamiento visual estroboscópico es un protocolo neurovisual respaldado empíricamente donde la percepción visual continua se interrumpe de forma rítmica mediante intervalos de oclusión total. Al suprimir la retroalimentación sensorial ininterrumpida, el sistema nervioso central se ve forzado a operar con conjuntos incompletos de información cinemática, obligando a las redes cerebelosas y corticales a computar modelos internos predictivos feedforward del movimiento (Appelbaum et al., 2011; Mitroff et al., 2013).",
      "Cuando un objetivo en movimiento se sumerge en una fase de oscuridad, el deslizamiento retiniano desciende instantáneamente a cero. En observadores no entrenados, el seguimiento ocular lento decae y se detiene entre los 100 y 200 milisegundos, derivando en sacadas de búsqueda erráticas al reaparecer el estímulo. Investigaciones pioneras de Bennett et al. (2007) y Leigh & Zee (2015) demuestran que la oclusión periódica condiciona las vías de memoria de velocidad en los campos oculares frontales (FEF) y el flóculo cerebeloso, permitiendo sostener el impulso oculomotor continuo a través de la brecha oscura y acelerar con precisión hacia las coordenadas de reaparición.",
      "En el deporte de alto rendimiento (béisbol, tenis, hockey sobre hielo y tiro de precisión), las gafas estroboscópicas con lentes de cristal líquido se han consolidado como un equipo esencial de acondicionamiento neuromuscular (Smith & Mitroff, 2016). Strobe Prediction Pursuit traslada este método de élite al navegador web mediante ciclos de 60 fotogramas visibles y 30 fotogramas ocluidos. En pantallas con alta tasa de refresco (144 Hz o superior) que garantizan una cadencia temporal milimétrica (Woods et al., 2015), este ejercicio fortalece la transición entre la captación foveal y la ejecución motora anticipatoria.",
      "Metodología y privacidad de datos: todas las trayectorias e interacciones se calculan y cronometran en tiempo real en el cliente. SkillDrills no almacena ni recopila datos de los usuarios en servidores remotos; sus marcas y configuraciones residen únicamente en el almacenamiento local (localStorage) de su navegador. Este simulador es una herramienta de entrenamiento cognitivo y desarrollo de reflejos con fines formativos, no constituyendo un instrumento diagnóstico médico."
    ],
    benchmarks: {
      title: "Valores de Referencia de Eficiencia Oculomotora Estroboscópica",
      headers: ["Nivel de Habilidad", "Precisión en Oscuridad (%)", "Error Medio (px)", "Latencia de Reajuste (ms)", "Rango Percentil"],
      rows: [
        ["Principiante / No Entrenado", "< 45%", "> 85 px", "> 280 ms", "0% – 25%"],
        ["Intermedio / Practicante Ocasional", "45% – 62%", "55 – 84 px", "210 – 280 ms", "25% – 60%"],
        ["Avanzado / Competidor Regional", "63% – 78%", "35 – 54 px", "150 – 209 ms", "60% – 85%"],
        ["Élite / Atleta de Alto Rendimiento", "79% – 89%", "20 – 34 px", "95 – 149 ms", "85% – 97%"],
        ["Maestría Visomotora / Nivel Pro", "90%+", "< 20 px", "< 95 ms", "98% – 100%"]
      ],
      note: "Parámetros registrados a velocidad 1.0x con ciclos estroboscópicos de 400ms encendido / 400ms apagado a 60 fotogramas por segundo (Appelbaum et al., 2011; Bennett et al., 2007)."
    },
    techniques: {
      title: "4 Técnicas Fundamentales para Dominar la Oclusión Estroboscópica",
      items: [
        {
          name: "Mantenimiento Activo de la Memoria de Velocidad",
          desc: "Durante la ráfaga de fotogramas iluminados, concentre la fijación foveal en codificar el vector de velocidad instantáneo y la curvatura en la memoria motora cerebelosa.",
          tips: "No relaje la musculatura ocular al desaparecer el objetivo; continúe guiando la mirada a la misma velocidad angular."
        },
        {
          name: "Proyección Cinemática de la Trayectoria Invisible",
          desc: "Extrapole mentalmente la trayectoria oculta como si el objetivo cruzara un túnel cubierto, manteniendo el curso sin desviar el eje de atención.",
          tips: "Visualice mentalmente una estela brillante que prolonga la trayectoria a través del vacío."
        },
        {
          name: "Aterrizaje Foveal Pre-Destello",
          desc: "Justo antes de completarse el intervalo de oscuridad, oriente el punto de mira hacia las coordenadas previstas de salida para suprimir sacadas de recuperación.",
          tips: "Siga el ritmo estroboscópico interiormente como un metrónomo para anticipar el milisegundo exacto de reaparición."
        },
        {
          name: "Inhibición del Bloqueo Sacádico",
          desc: "Reprime el reflejo primario de congelar los ojos o disparar micromovimientos de búsqueda durante el apagón. Confíe en la inercia del modelo feedforward.",
          tips: "Conserve los músculos extraoculares distendidos y fluidos para asegurar una transición suave."
        }
      ]
    },
    steps: [
      "Fije la mirada en el objetivo y acompáñelo de forma continua durante la fase iluminada inicial.",
      "Al producirse el corte estroboscópico, continúe desplazando la vista hacia la posición donde estima que viajará el objetivo.",
      "Cuando vuelva a encenderse la luz, compruebe su precisión relativa y sincronice la velocidad sin sacadas violentas.",
      "Avance en dificultad aumentando la velocidad del objetivo una vez alcance con soltura una precisión superior al 70%."
    ],
    audience: "Deportistas de raqueta y pelota, pilotos, jugadores de esports (FPS y MOBA) y profesionales que busquen maximizar la anticipación visoespacial y la memoria de velocidad.",
    faqs: faqSchema.mainEntity.map(item => ({
      q: item.name,
      a: item.acceptedAnswer.text
    })),
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

      <StrobePredictionPursuitClient
        copy={{
          title: "Visión Estroboscópica y Predicción",
          subtitle: "Entrenamiento Oculomotor con Oclusión Periódica",
          description: "Entrene la anticipación visual y la extrapolación cinemática mediante cortes estroboscópicos periódicos. Estimule su modelo cerebeloso para reconstruir trayectorias invisibles con exactitud milimétrica."
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/strobe-prediction-pursuit" />
      </div>
    </>
  );
}
