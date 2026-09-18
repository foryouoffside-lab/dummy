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
  const sources = pickSources([
    "Appelbaum et al. (2011) - Improved Visual Cognition Through Stroboscopic Training",
    "Mitroff et al. (2013) - Enhancing Athletic Visual Skills Through Stroboscopic Training",
    "Smith & Mitroff (2016) - Stroboscopic Training Enhances Anticipatory Timing",
    "Bennett et al. (2007) - Extrapolation of Accelerated Motion in Visual Trajectory Prediction"
  ]);

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
    intro: "El entrenamiento estroboscópico opera privando transitoriamente a la retina de estimulación lumínica continua. Cuando la imagen desaparece en ciclos periódicos, las áreas corticales parietales y el cerebelo no pueden depender de la corrección de errores en tiempo real. En su lugar, el sistema nervioso central debe activar un modelo motor feedforward que calcula la posición futura estimada del objeto a partir de su inercia y velocidad angular previa. Esta demanda cognitiva estimula la neuroplasticidad en los circuitos oculomotores, optimizando el tiempo de anticipación espacial en situaciones dinámicas reales.",
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
      note: "Parámetros registrados a velocidad 1.0x con ciclos estroboscópicos de 400ms encendido / 400ms apagado a 60 fotogramas por segundo."
    },
    instructions: [
      "Fije la mirada en el objetivo y acompáñelo de forma continua durante la fase iluminada inicial.",
      "Al producirse el corte estroboscópico, continúe desplazando el cursor hacia la posición donde estima que viajará el objetivo.",
      "Cuando vuelva a encenderse la luz, compruebe su precisión relativa y sincronice la velocidad sin sacadas violentas.",
      "Avance en dificultad aumentando la velocidad del objetivo una vez alcance con soltura una precisión superior al 70%."
    ],
    tips: [
      "Nunca detenga el cursor durante el apagón: la extrapolación motora activa es la clave biológica del ejercicio.",
      "Procure realizar un barrido suave y armonioso en lugar de pequeñas correcciones bruscas.",
      "Conserve un parpadeo natural entre rondas para asegurar una hidratación corneal adecuada."
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
