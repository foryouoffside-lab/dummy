import ZigZagPathPursuitClient from '@/app/drills/visual-tracking/zig-zag-path-pursuit/ZigZagPathPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Seguimiento Ocular en Zigzag – SkillDrills",
  description: "Entrene el rastreo ocular rápido en zigzag y suprima el sobrepaso en reversiones agudas. Ejercicio oculomotor gratuito para reflejos y puntería.",
  keywords: [
    "seguimiento ocular en zigzag",
    "entrenamiento de rastreo visual dinámico",
    "ejercicios de cambios bruscos de dirección visual",
    "control de frenado motor ocular",
    "sacadas correctoras y persecución suave",
    "supresión de overshoot de la mirada",
    "ejercicios de coordinación visomotora online",
    "entrenamiento oculomotor para deportes de pelota",
    "puntería y tracking en trayectoria quebrada",
    "test de agilidad visual y reflejos",
    "estabilidad de la fijación foveal en giros",
    "ejercicios para mejorar reflejos de la mirada"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/zig-zag-path-pursuit",
    languages: getAlternateLanguages('drills/visual-tracking/zig-zag-path-pursuit')
  },
  openGraph: {
    title: "Seguimiento Ocular en Zigzag – SkillDrills",
    description: "Entrene el rastreo ocular rápido en zigzag y suprima el sobrepaso en reversiones agudas. Ejercicio oculomotor gratuito para reflejos y puntería.",
    url: "https://skilldrills.online/es/drills/visual-tracking/zig-zag-path-pursuit",
    siteName: "SkillDrills",
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguimiento Ocular en Zigzag – SkillDrills",
    description: "Entrene el rastreo ocular rápido en zigzag y suprima el sobrepaso en reversiones agudas. Ejercicio oculomotor gratuito para reflejos y puntería."
  }
};

export default function ZigZagPathPursuitPageES() {
  const sources = pickSources(
    'debrouwer2002',
    'krauzlis2004',
    'orbandexivry2007',
    'bennett2006',
    'barnes2008',
    'woods2015'
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Entrenamiento Visual", "item": "https://skilldrills.online/es/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Persecución en Zigzag", "item": "https://skilldrills.online/es/drills/visual-tracking/zig-zag-path-pursuit" }
    ]
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenador de Persecución en Zigzag",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entrenamiento neurocognitivo de seguimiento visual en trayectorias quebradas de alta frecuencia y control de frenado sacádico."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ejercicio de Seguimiento Vectorial en Zigzag",
    "url": "https://skilldrills.online/es/drills/visual-tracking/zig-zag-path-pursuit",
    "applicationCategory": "TrainingTool",
    "browserRequirements": "Requires JavaScript. HTML5 Canvas compatible."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Desafío de Persecución en Zigzag",
    "gamePlatform": "Web Browser",
    "genre": ["Visual Training", "Eye Tracking Drill", "Esports Reflex"]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Entrenar la Persecución Ocular en Zigzag",
    "description": "Metodología para optimizar el frenado ocular y la readquisición foveal en reversiones angulares rápidas.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Postura Estable y Enfoque Inicial",
        "text": "Sitúese a una distancia fija de 50 a 60 cm de la pantalla con la cabeza relajada y enfoque el objetivo en su primer trayecto diagonal."
      },
      {
        "@type": "HowToStep",
        "name": "Seguimiento Suave Rectilíneo",
        "text": "Acompañe la trayectoria rectilínea coordinando de forma equilibrada los músculos rectos horizontales y verticales."
      },
      {
        "@type": "HowToStep",
        "name": "Frenado en el Punto de Giro",
        "text": "Al aproximarse a la esquina de inflexión, active la desaceleración motora anticipada para prevenir el sobrepaso."
      },
      {
        "@type": "HowToStep",
        "name": "Incremento de Cadencia",
        "text": "Aumente progresivamente la velocidad cuando complete las inversiones de marcha con un error inferior a 38 píxeles."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Por qué el seguimiento en zigzag es uno de los ejercicios más exigentes para la visión?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Porque combina velocidad lineal sostenida con cambios bruscos de sentido en ángulos agudos, obligando a alternar instantáneamente la contracción y el frenado de músculos oculares antagonistas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué regiones cerebrales controlan la desaceleración previa a cada giro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El cerebelo (flóculo y vermis dorsal), los ganglios basales y el área ocular frontal (FEF) emiten señales inhibidoras feedforward para detener el globo ocular antes del vértice."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es el sobrepaso ocular (overshoot) y por qué sucede?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es el desvío en el que el ojo sobrepasa el punto de inflexión debido a la inercia motora de la persecución previa, requiriendo luego sacadas de corrección hacia atrás."
        }
      },
      {
        "@type": "Question",
        "name": "¿En qué beneficia esta práctica a deportistas y jugadores de acción?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Entrena al cerebro para clavar la mirada sobre objetivos que cambian súbitamente de dirección sin perder tiempo en reajustes vacilantes."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué es crucial mantener la cabeza completamente quieta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Inmovilizar la cabeza asegura que el estímulo neurocognitivo recaiga exclusivamente en los circuitos oculomotores puros sin compensación vestibular."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuántos minutos al día es recomendable practicar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Entre 6 y 10 minutos diarios distribuidos en rondas cortas de 60 segundos son ideales para maximizar la adaptación neuronal sin agotar la vista."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué función cumple el deslizamiento retiniano en estos cambios?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es la señal de alerta visual que detecta la fuga del objetivo de la fóvea en el momento del giro, disparando la sacada correctora de enganche."
        }
      },
      {
        "@type": "Question",
        "name": "¿Aporta ventajas utilizar un monitor gaming de alta frecuencia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pantallas de 144Hz o 240Hz muestran el instante preciso del quiebre direccional sin desenfoque, facilitando una respuesta motora mucho más oportuna."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué diferencia hay entre el patrón senoidal y el zigzag?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La onda senoidal reduce su velocidad gradualmente en las crestas, mientras que el zigzag mantiene una velocidad constante y corta de golpe en cada vértice."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo calcula el programa la puntuación de precisión?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mide de manera continua la distancia euclidiana entre el cursor y el objetivo, con énfasis riguroso en el error milimétrico registrado en cada vértice agudo."
        }
      }
    ]
  };

  const guide = {
    title: "Fundamentos Científicos de Persecución en Zigzag y Control de Inflexión",
    intro: [
      "El seguimiento visual a lo largo de líneas poligonales en zigzag de múltiples segmentos constituye uno de los desafíos visomotores más exigentes en el ámbito del rendimiento deportivo y la neuro-optometría. A diferencia de los desplazamientos cardinales puros, el rastreo de trayectorias diagonales continuas requiere una inervación proporcional y constante de grupos musculares antagonistas, coordinando los centros premotores pontinos horizontales (PPRF) y los núcleos mesencefálicos verticales (riMLF; Orban de Xivry & Lefèvre, 2007).",
      "El mayor estrés neurocomputacional se produce en los vértices agudos de inflexión donde la trayectoria invierte súbitamente su sentido. En el instante de la deflexión, el deslizamiento retiniano se intensifica de forma drástica mientras el error de posición foveal se dispara. Las investigaciones fundamentales de de Brouwer et al. (2002) y Heinen et al. (2005) demostraron que las sacadas correctoras de captura (catch-up saccades) se desencadenan mediante un circuito computacional compartido en el colículo superior y los campos oculares frontales (FEF), integrando simultáneamente el desfase posicional y el error de velocidad para ejecutar correcciones balísticas exactas.",
      "Sin un acondicionamiento específico, el sistema oculomotor tiende a sobrepasar los vértices por inercia (overshoot) o a cortar esquinas prematuramente, prolongando el tiempo de readquisición foveal y provocando oscilaciones visuales parásitas. En contraste, la exposición continua a trayectorias alternantes en zigzag consolida los modelos internos anticipatorios del cerebelo (Barnes, 2008; Krauzlis, 2004; Orban de Xivry & Lefèvre, 2007), permitiendo una deceleración predictiva antes de los vértices, reduciendo el sobrepaso sacádico y acelerando el reenganche fluido sobre la diagonal de salida.",
      "El ejercicio de Persecución en Trayectoria en Zigzag (Zig-Zag Path Pursuit) aísla y entrena estos circuitos sensoriomotores críticos en el navegador. Al seguir el objetivo en su trayectoria quebrada ininterrumpida, el usuario sincroniza la velocidad de persecución suave con una reancoración foveal precisa en los vértices. La opción de ocultar la guía ('Hide Line') elimina los apoyos espaciales para evaluar la estimación visual en tiempo real, mientras que la velocidad aleatoria ('Random Speed') rompe automatismos para desarrollar adaptabilidad visual reactiva.",
      "Metodología de medición y latencia de hardware: Las mediciones de tiempo y precisión visual están sujetas a la cuantización de refresco de pantalla (~16,7 ms a 60 Hz, ~6,9 ms a 144 Hz, ~4,1 ms a 240 Hz) y a las tasas de sondeo de los periféricos (~8 ms a 125 Hz frente a ~1 ms a 1.000 Hz), tal como documentan Woods et al. (2015). Todas las puntuaciones y perfiles de seguimiento se registran exclusivamente en el almacenamiento local (localStorage) del navegador del usuario, sin transmisión externa de telemetría."
    ],
    benchmarks: {
      title: "Valores de Referencia en Zigzag (Velocidad y Error de Inflexión)",
      headers: ["Nivel de Habilidad", "Multiplicador de Velocidad", "Error en Vértice", "Latencia Sacádica de Giro", "Percentil Global"],
      rows: [
        ["Élite / Maestro de la Reversión Rápida", "3.5x – 5.0x+", "Error < 12 px (adhesión perfecta en el giro)", "Latencia < 110 ms (frenado anticipatorio)", "Top 1.5%"],
        ["Maestro / Alta Disciplina Vectorial", "2.5x – 3.5x", "Error < 22 px (únicamente microsacadas mínimas)", "Latencia < 140 ms (curvas fluidas)", "Top 8%"],
        ["Avanzado / Atleta de Competición", "1.8x – 2.5x", "Error < 38 px (rápida readquisición)", "Latencia < 180 ms (giros estables)", "Top 25%"],
        ["Intermedio / Practicante Habitual", "1.2x – 1.8x", "Error 38 – 70 px (sobrepaso y corte de esquinas)", "Latencia 180 – 240 ms (múltiples correcciones)", "Rango Medio 45%"],
        ["Principiante / No Iniciado", "0.5x – 1.2x", "Error > 70 px (pérdida total en esquinas)", "Latencia > 250 ms (sobrepaso evidente)", "Nivel Base"]
      ],
      note: "Métricas fundamentadas en de Brouwer et al. (2002) sobre dinámica de sacadas correctoras y Krauzlis (2004) sobre control motor en cambios rápidos de velocidad y sentido."
    },
    instructions: [
      "Fije la mirada en el objetivo y acompáñelo de forma uniforme en la diagonal inicial.",
      "Anticipe la llegada a la esquina del zigzag para modular el frenado del puntero.",
      "Aplique una sacada veloz para alinearse sin demora con el vector contrario.",
      "Incremente la velocidad una vez que logre sostener un error menor a 38 px en las curvas."
    ],
    tips: [
      "No corte camino antes de tiempo: apure la trayectoria completa hasta la cúspide del vértice.",
      "Mantenga el brazo y la muñeca sueltos sobre el ratón para una movilidad limpia.",
      "Respire con naturalidad para asegurar una oxigenación constante durante las aceleraciones."
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

      <ZigZagPathPursuitClient
        copy={{
          title: "Persecución en Zigzag",
          subtitle: "Entrenamiento Oculomotor en Trayectoria Quebrada",
          description: "Acompañe un objetivo a lo largo de patrones en zigzag de alta exigencia y condicione el control feedforward para frenar la mirada en seco y eliminar el sobrepaso en esquinas agudas."
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/zig-zag-path-pursuit" />
      </div>
    </>
  );
}
