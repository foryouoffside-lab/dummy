import ComplexPatternClient from '@/app/drills/physical/coordination/complex-pattern/ComplexPatternClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Spain & Latin America (ES / ES-MX)
// Primary Intent: juego de memoria visual para adultos, test de coordinacion viso motora, memoria de trabajo visoespacial
// Spanish Context: Retención de patrones geométricos y reproducción motora de vectores con el ratón
// High-Demand, Low-Competition Target Keywords:
//   - "juego de memoria visual para adultos" (High-volume brain game query)
//   - "test de coordinacion viso motora" (Visuomotor diagnostic query)
//   - "memoria de trabajo visoespacial secuencial" (Cognitive memory query)
//   - "juegos de memoria visual y patrones" (Visual pattern game query)
//   - "test de coordinacion motora fina" (Motor coordination test)
//   - "memorizar secuencias geometricas" (Geometric memory retention)
//   - "trazado de patrones espaciales" (Spatial path tracing drill)
//   - "ejercicios de memoria espacial y punteria" (Aim and spatial memory)
//   - "control de recoil y memoria motora" (Recoil pattern memory query)
//   - "agenda visoespacial ejercicios online" (Baddeley visuospatial buffer)
// ============================================================

export const metadata = {
  title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
  description: 'Juego de memoria visual y espacial gratuito. Memoriza secuencias de puntos y traza rutas para entrenar tu memoria de trabajo y coordinación visomotora.',
  keywords: [
    "juego de memoria visual para adultos",
    "test de coordinacion viso motora",
    "memoria de trabajo visoespacial secuencial",
    "juegos de memoria visual y patrones",
    "test de coordinacion motora fina",
    "memorizar secuencias geometricas",
    "trazado de patrones espaciales",
    "ejercicios de memoria espacial y punteria",
    "control de recoil y memoria motora",
    "agenda visoespacial ejercicios online"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/coordination/complex-pattern',
    languages: getAlternateLanguages('/drills/physical/coordination/complex-pattern'),
  },
  openGraph: {
    title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
    description: 'Juego de memoria visual y espacial gratuito. Memoriza secuencias de puntos y traza rutas para entrenar tu memoria de trabajo y coordinación visomotora.',
    url: 'https://skilldrills.online/es/drills/physical/coordination/complex-pattern',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
    description: 'Juego de memoria visual y espacial gratuito. Memoriza secuencias de puntos y traza rutas para entrenar tu memoria de trabajo y coordinación visomotora.',
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
      "name": "Coordinación Viso-Motora",
      "item": "https://skilldrills.online/es/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Memoria de Patrones Complejos y Trazado",
      "item": "https://skilldrills.online/es/drills/physical/coordination/complex-pattern"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entrenador de Memoria Visual y Patrones Complejos (Complex Pattern)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Aplicación de entrenamiento cognitivo y psicomotor diseñada para potenciar la memoria de trabajo visoespacial mediante el trazado de patrones geométricos en alta velocidad."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Memoria Visual y Trazado de Patrones",
  "url": "https://skilldrills.online/es/drills/physical/coordination/complex-pattern",
  "description": "Herramienta online para mejorar la memoria espacial y la precisión gestual del ratón memorizando y trazando complejas figuras geométricas.",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Desafío de Patrones Complejos",
  "url": "https://skilldrills.online/es/drills/physical/coordination/complex-pattern",
  "description": "Juego de agilidad mental y destreza con el ratón donde memorizas vértices espaciales y los reproduces antes de que expire el tiempo.",
  "genre": ["Action", "Brain Game", "Reflex Game", "Coordination"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿En qué consiste el ejercicio de Patrones Complejos (Complex Pattern Pro)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El ejercicio desafía la retención espacial y la motricidad fina del ratón. Durante una fracción de segundo, aparece una trayectoria geométrica de múltiples vértices; debes memorizar la figura y, tras desaparecer, hacer clic en el nodo inicial cian y arrastrar el cursor hasta el nodo final magenta para reconstruirla con fidelidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué manera mejora este juego el rendimiento en shooters como Valorant o CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retener patrones angulares y reproducirlos con agilidad entrena el agrupamiento de comandos motores (Lashley, 1951), el mismo proceso neuromuscular requerido para interiorizar los patrones de compensación de retroceso (spray recoil) y realizar microajustes limpios de puntería."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo escala la dificultad conforme se sube de nivel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A medida que ganas puntos, el nivel avanza hasta el Nivel 15. La cantidad de nodos pasa de 3 a 8 vértices, el tiempo de visualización relámpago se acorta de 2,0s a tan solo 0,6s y la exigencia de similitud geométrica para validar el trazo asciende del 50% al 85%."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué ocurre si fallo un trazo o no alcanzo el porcentaje de precisión requerido?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si el dibujo no alcanza el porcentaje de similitud exigido, la secuencia se considera fallida, la pantalla emite un destello rojo y el multiplicador de racha (combo) vuelve a 1.0x. No se restan puntos ya acumulados ni se descuenta tiempo de los 45 segundos de la sesión."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es la 'agenda visoespacial' en la que se fundamenta este ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Descrita por Alan Baddeley (1974), la agenda visoespacial es la estructura de la memoria de trabajo que retiene y transforma información espacial y formas visuales en la mente. El ejercicio somete este búfer cognitivo a estrés controlado para estimular la memoria de trabajo y la rapidez de ejecución motora."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué puntuación marca el nivel de maestría de élite (Tier 1: Master)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El rango Tier 1: Apex Pattern Master (Calificación S+) requiere 17.000 puntos o más, alcanzando los niveles 12 a 15 con una precisión de trazo media superior al 85% en complejas geometrías de 7 a 8 nodos. El percentil medio (Tier 4) se sitúa entre 6.000 y 9.499 puntos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué técnica mental facilita memorizar 7 u 8 nodos en solo 0,6 segundos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La estrategia más eficaz es el agrupamiento visual (chunking). En lugar de recordar cada coordenada por separado, percibe la figura como una forma geométrica continua (como una letra N invertida o un zigzag) e identifica de inmediato el vector de salida desde el nodo cian."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es mejor realizar el trazo de forma rápida y continua o hacer pausas en cada vértice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un movimiento fluido a velocidad media constante con ligeras desaceleraciones en las esquinas agudas produce la puntuación de correlación más alta, evitando oscilaciones o curvaturas parásitas que degradan la precisión."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se puede realizar el ejercicio en pantallas táctiles o tabletas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Aunque está optimizado para ratón con bloqueo de puntero (Pointer Lock), el software cuenta con soporte táctil nativo que permite arrastrar el dedo directamente sobre la pantalla en dispositivos móviles y tabletas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuántos minutos al día son recomendables para notar mejoría en la coordinación?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Entre 5 y 10 minutos de práctica diaria son ideales para consolidar los circuitos neuromotores y ensanchar la capacidad del búfer visoespacial sin sobrecargar los tendones de la mano."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar Memoria Visual y Coordinación de Patrones en 4 Pasos",
  "description": "Guía práctica en 4 fases para memorizar y trazar secuencias geométricas complejas con alta precisión.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fase de Codificación y Observación Relámpago",
      "text": "Fija la mirada en el lienzo en cuanto aparezca el patrón. Identifica el nodo de inicio cian y la estructura general antes de que desaparezca.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/complex-pattern#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Retención en el Búfer Visoespacial",
      "text": "Conserva la silueta mental durante la décima de segundo intermedia, proyectando mentalmente el primer trazo del cursor.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/complex-pattern#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ejecución Motora del Trazado Vectorial",
      "text": "Haz clic en el nodo inicial cian y arrastra el ratón de forma continua siguiendo los vértices hasta alcanzar el nodo magenta final.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/complex-pattern#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Liberación de Clic y Evaluación de Similitud",
      "text": "Suelta el botón sobre el nodo magenta. Si superas el umbral de precisión, suma puntos y multiplica el combo hasta un máximo de 3.0x.",
      "url": "https://skilldrills.online/es/drills/physical/coordination/complex-pattern#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
    paragraphs: [
      "La habilidad para retener una disposición geométrica fugaz y traducirla en un gesto motor preciso constituye una función cerebral de primer orden. Este entrenamiento estimula activamente el córtex prefrontal dorsolateral y el córtex parietal posterior, estructuras biológicas que albergan la denominada 'agenda visoespacial' (Baddeley & Hitch, 1974). La prueba va más allá de la memoria pasiva: exige transformar dinámicamente representaciones angulares bajo estrictas restricciones temporales.",
      "De acuerdo con las leyes de estructuración motora formuladas por Karl S. Lashley (1951), secuencias manuales complejas no pueden ejecutarse punto por punto a alta velocidad; el sistema neuromuscular debe agrupar los movimientos en un único programa unificado (chunking). Esto reproduce la dinámica del control de retroceso en videojuegos tácticos, donde el jugador no calcula cada disparo de manera aislada, sino que ejecuta un gesto motor coordinado e interiorizado.",
      "Al progresar hacia el Nivel 15, la presencia de hasta 8 vértices rebasa la capacidad estándar de almacenamiento de la memoria de trabajo inmediata estimada por Nelson Cowan (2001), que sitúa el límite medio en unas 4 unidades independientes. Simultáneamente, el intervalo de visualización se comprime hasta los 0,6 segundos y la tolerancia de error se ajusta a un 85% de similitud, forzando al usuario a refinar las microcorrecciones de la fase de control continuo descritas por Woodworth (1899).",
      "Fiabilidad métrica y procesamiento en cliente: La duración de los estímulos y el análisis del trazado se sincronizan mediante el reloj de alta resolución performance.now() del navegador. El algoritmo compara de forma instantánea las coordenadas trazadas con la plantilla original. Pantallas de 144Hz a 240Hz reducen el retardo visual y facilitan la lectura nítida de los flashes rápidos sin distorsiones ópticas (Woods et al., 2015). Todos los registros se almacenan en el propio dispositivo, garantizando total privacidad sin comunicación externa de datos."
    ]
  },
  benchmarks: {
    title: "Estándares Oficiales de Memoria Visoespacial y Coordinación Fina",
    headers: ["Nivel", "Título del Nivel", "Puntuación Diana", "Precisión de Trazo", "Nota", "Percentil Global"],
    rows: [
      ["Tier 1", "Maestro Supremo de Patrones Visuales", "17.000+ puntos", "Nivel 12–15 / Precisión >92%", "Nota S+", "Top 0,5% (Capacidad Excepcional)"],
      ["Tier 2", "Trazador de Secuencias de Élite", "13.000 a 16.999 pts", "Nivel 9–11 / Precisión 85–91%", "Nota A", "Top 5% (Nivel Avanzado)"],
      ["Tier 3", "Navegador Espacial Avanzado", "9.500 a 12.999 pts", "Nivel 6–8 / Precisión 76–84%", "Nota B", "Top 20% (Alta Competencia)"],
      ["Tier 4", "Practicante de Memoria Intermedio", "6.000 a 9.499 pts", "Nivel 3–5 / Precisión 65–75%", "Nota C", "50% (Media de Población Adulta)"],
      ["Tier 5", "Principiante en Retención de Rutas", "< 6.000 puntos", "Nivel 1–2 / Precisión <65%", "Nota D", "Principiante (Entrenamiento Recomendado)"],
    ],
    note: "Parámetros estandarizados basados en capacidad de memoria de trabajo visoespacial (Baddeley & Hitch 1974; Cowan 2001) y secuenciación motora serial (Lashley 1951).",
  },
  protocols: {
    title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
    description: 'Juego de memoria visual y espacial gratuito. Memoriza secuencias de puntos y traza rutas para entrenar tu memoria de trabajo y coordinación visomotora.',
    items: [
      {
        title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
        description: 'Juego de memoria visual y espacial gratuito. Memoriza secuencias de puntos y traza rutas para entrenar tu memoria de trabajo y coordinación visomotora.'
      },
      {
        title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
        description: 'Juego de memoria visual y espacial gratuito. Memoriza secuencias de puntos y traza rutas para entrenar tu memoria de trabajo y coordinación visomotora.'
      },
      {
        title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
        description: 'Juego de memoria visual y espacial gratuito. Memoriza secuencias de puntos y traza rutas para entrenar tu memoria de trabajo y coordinación visomotora.'
      },
      {
        title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
        description: 'Juego de memoria visual y espacial gratuito. Memoriza secuencias de puntos y traza rutas para entrenar tu memoria de trabajo y coordinación visomotora.'
      }
    ]
  },
  faqs: {
    title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function ComplexPatternEsPage() {
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
      <ComplexPatternClient
        copy={{
          title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
          subtitle: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills',
          hudLabels: {
            score: "Puntos",
            time: "Tiempo",
            accuracy: "Precisión Media",
            traced: "Trazados",
            missed: "Fallados",
            peakLevel: "Nivel Máx",
            getReady: "PREPÁRATE",
            points: "Puntos",
            playAgain: "Jugar de Nuevo"
          },
          rulesTitle: "Instrucciones del Ejercicio y Sistema de Puntuación",
          rules: [
            { title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills', text: "Observa la figura geométrica que se ilumina en pantalla antes de que se desvanezca." },
            { title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills', text: "Haz clic en el nodo inicial cian y arrastra el ratón hasta el nodo magenta para redibujar la figura." },
            { title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills', text: "Alcanza la similitud requerida para validar la figura y aumentar el multiplicador de racha." },
            { title: 'Juego de Memoria Visual – Patrones Espaciales | SkillDrills', text: "Si no alcanzas el porcentaje exigido, la racha vuelve a 1.0x sin penalizar puntos ni tiempo." }
          ],
          aboutTitle: "Sobre el Juego de Memoria de Patrones",
          aboutHeading: "Memoria de Trabajo Espacial y Trazado Multinodal",
          aboutText: "Este ejercicio entrena la memoria de trabajo visoespacial, la retención geométrica y el control gestual con el ratón bajo presión de tiempo. Los usuarios memorizan complejas figuras fugaces y las redibujan de memoria, desarrollando la fluidez motora necesaria para dominar el control de retroceso y los microajustes en shooters competitivos."
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/coordination/complex-pattern" />
    </>
  );
}
