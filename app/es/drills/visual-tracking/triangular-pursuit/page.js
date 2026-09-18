import TriangularPursuitClient from '@/app/drills/visual-tracking/triangular-pursuit/TriangularPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Seguimiento Ocular Triangular – SkillDrills",
  description: "Entrene la persecución ocular a lo largo de vectores triangulares y sacadas en ángulos agudos. Ejercicio oculomotor gratuito para puntería y reflejos.",
  keywords: [
    "seguimiento ocular triangular",
    "entrenamiento de rastreo visual en polígono",
    "ejercicios de seguimiento y fijación visual",
    "sacadas correctoras en cambios de dirección",
    "precisión visual en vértices y ángulos agudos",
    "entrenamiento oculomotor para reflejos",
    "control de deceleración de la mirada",
    "ejercicios para mejorar la puntería visual",
    "test de estabilidad de la mirada online",
    "coordinación visomotora y seguimiento dinámico",
    "movimientos sacádicos y persecución ocular",
    "entrenamiento de agilidad visual deportiva"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/triangular-pursuit",
    languages: getAlternateLanguages('drills/visual-tracking/triangular-pursuit')
  },
  openGraph: {
    title: "Seguimiento Ocular Triangular – SkillDrills",
    description: "Entrene la persecución ocular a lo largo de vectores triangulares y sacadas en ángulos agudos. Ejercicio oculomotor gratuito para puntería y reflejos.",
    url: "https://skilldrills.online/es/drills/visual-tracking/triangular-pursuit",
    siteName: "SkillDrills",
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguimiento Ocular Triangular – SkillDrills",
    description: "Entrene la persecución ocular a lo largo de vectores triangulares y sacadas en ángulos agudos. Ejercicio oculomotor gratuito para puntería y reflejos."
  }
};

export default function TriangularPursuitPageES() {
  const sources = pickSources(
    'debrouwer2002',
    'heinen2005',
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
      { "@type": "ListItem", "position": 3, "name": "Persecución Triangular", "item": "https://skilldrills.online/es/drills/visual-tracking/triangular-pursuit" }
    ]
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenador de Seguimiento Ocular Triangular",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entrenamiento neurocognitivo de seguimiento visual continuo y sacadas de alta aceleración en trayectorias poligonales cerradas."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ejercicio de Seguimiento Vectorial Triangular",
    "url": "https://skilldrills.online/es/drills/visual-tracking/triangular-pursuit",
    "applicationCategory": "TrainingTool",
    "browserRequirements": "Requires JavaScript. HTML5 Canvas compatible."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Desafío de Persecución Triangular",
    "gamePlatform": "Web Browser",
    "genre": ["Visual Training", "Eye Tracking Drill", "Esports Reflex"]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Entrenar el Seguimiento Ocular Triangular",
    "description": "Metodología para optimizar el frenado y la reorientación foveal en esquinas de 60 grados.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Alineación Ocular y Postura Estable",
        "text": "Mantenga la cabeza firme a una distancia de 50 a 60 cm de la pantalla y fije la vista en el objetivo móvil al comenzar el ciclo."
      },
      {
        "@type": "HowToStep",
        "name": "Seguimiento Suave en Aristas Diagonales",
        "text": "Siga el recorrido rectilíneo coordinando de manera simétrica los grupos musculares oculares horizontales y verticales."
      },
      {
        "@type": "HowToStep",
        "name": "Control de Frenado en el Vértice",
        "text": "Al aproximarse al ángulo agudo, aplique una desaceleración precisa para evitar sobrepasar el vértice antes de conectar con el siguiente lado."
      },
      {
        "@type": "HowToStep",
        "name": "Aumento Progresivo de Velocidad",
        "text": "Incremente la tasa de velocidad en los ajustes a medida que logre transiciones limpias con un error de esquina inferior a 35 píxeles."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Por qué el seguimiento en triángulo presenta mayor dificultad que en trayectorias curvas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A diferencia de trayectorias circulares con aceleración constante, los triángulos presentan aristas rectas unidas por vértices de 60 grados, obligando a alternar entre persecución continua y sacadas de reorientación instantánea."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué estructuras cerebrales coordinan estos cambios bruscos de sentido?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El proceso involucra los campos oculares frontales (FEF), el vermis dorsal y flóculo cerebelosos, así como los centros premotores del tronco encefálico (PPRF para plano horizontal y riMLF para vertical)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué causa el fenómeno de overshoot o sobrepaso en los vértices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Se produce por la inercia del comando motor de seguimiento suave. Sin un frenado anticipatorio feedforward adecuado, la mirada continúa en la dirección previa durante decenas de milisegundos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo ayuda este ejercicio a deportistas y jugadores de videojuegos competitivos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Desarrolla la capacidad neurobiológica de desacelerar la mirada de forma limpia y redirigir la puntería hacia un nuevo vector sin oscilaciones correctoras superfluas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué se insiste en no mover la cabeza durante la sesión?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mantener la cabeza estática fuerza el aislamiento puro de los músculos extraoculares, evitando que el reflejo vestíbulo-ocular compense y reduzca el estímulo de entrenamiento."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es la dosis de entrenamiento aconsejada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Se recomienda practicar entre 6 y 10 minutos al día en bloques breves de 60 segundos para evitar la fatiga motora de los músculos rectos del ojo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es el deslizamiento retiniano en los puntos de cambio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es el desvío súbito de la imagen del objetivo fuera del centro fóveo provocado por el giro brusco, lo que estimula el disparo de una sacada compensatoria inmediata."
        }
      },
      {
        "@type": "Question",
        "name": "¿Influye la tasa de refresco del monitor en la calidad del entrenamiento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Monitores de 144Hz o superiores ofrecen una transición de cuadros mucho más fiel en el momento del impacto en el vértice, afinando la percepción temporal de deceleración."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué define a una sacada de captura o recuperación?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es un movimiento ocular balístico ultrarrápido que ejecuta el sistema visual para recolocar instantáneamente la fóvea sobre un objetivo que ha tomado ventaja."
        }
      },
      {
        "@type": "Question",
        "name": "¿Se puede entrenar en ambos sentidos de giro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, es posible alternar entre rotación horaria y antihoraria para estimular simétricamente los circuitos motores de ambos hemisferios cerebrales."
        }
      }
    ]
  };

  const guide = {
    title: "Fundamentos Científicos de Persecución Vectorial y Control en Vértices",
    intro: "El seguimiento foveal a lo largo de geometrías cerradas exige un equilibrio motor de alta precisión. Durante el desplazamiento por los lados del triángulo, el sistema nervioso coordina componentes horizontales (PPRF) y verticales (riMLF). Sin embargo, al alcanzar cada uno de los tres vértices agudos de 60 grados, la velocidad retiniana se interrumpe y el error posicional se dispara. Las investigaciones de de Brouwer et al. (2002) y Heinen et al. (2005) demuestran que estos cambios de vector demandan sacadas balísticas de corrección orquestadas por el córtex frontal y calibradas por el cerebelo para suprimir la inercia motora residual.",
    benchmarks: {
      title: "Valores de Referencia de Persecución Triangular (Velocidad y Precisión en Vértices)",
      headers: ["Categoría de Habilidad", "Multiplicador de Velocidad", "Error en Vértice", "Latencia Sacádica de Giro", "Percentil Global"],
      rows: [
        ["Élite / Dominio Vectorial Absoluto", "3.5x – 5.0x+", "Error < 12 px (adhesión perfecta en el vértice)", "Latencia < 110 ms (frenado anticipatorio)", "Top 1.5%"],
        ["Maestro / Alto Control de Trayectoria", "2.5x – 3.5x", "Error < 22 px (únicamente microsacadas mínimas)", "Latencia < 140 ms (curvas limpias)", "Top 8%"],
        ["Avanzado / Atleta de Competición", "1.8x – 2.5x", "Error < 38 px (rápida readquisición)", "Latencia < 180 ms (giros estables)", "Top 25%"],
        ["Intermedio / Practicante Habitual", "1.2x – 1.8x", "Error 38 – 70 px (corte de esquinas / sobrepaso)", "Latencia 180 – 240 ms (sacadas múltiples)", "Rango Medio 45%"],
        ["Principiante / No Iniciado", "0.5x – 1.2x", "Error > 70 px (desconexión total en esquinas)", "Latencia > 250 ms (sobrepaso evidente)", "Nivel Base"]
      ],
      note: "Métricas basadas en de Brouwer et al. (2002) sobre dinámica de sacadas de captura y Heinen et al. (2005) sobre control motor en inversiones angulares bruscas."
    },
    instructions: [
      "Fije la vista en el objetivo circular y acompañe su recorrido lineal sin mover el cuello.",
      "Calibre la frenada a medida que el objetivo se aproxime a cada esquina del triángulo.",
      "Ejecute una sacada ágil y controlada para reenganchar de inmediato con el nuevo lado.",
      "Suba la velocidad cuando su error de vértice se mantenga consistentemente por debajo de 35 px."
    ],
    tips: [
      "No corte camino anticipadamente en las esquinas: siga la arista completa hasta el extremo angular.",
      "Conserve la mano y el antebrazo relajados sobre el ratón para evitar tensiones parásitas.",
      "Respira pausadamente para mantener una coordinación visomotora serena durante las variaciones de dirección."
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

      <TriangularPursuitClient
        copy={{
          title: "Persecución Triangular",
          subtitle: "Entrenamiento Oculomotor en Trayectoria Poligonal",
          description: "Siga un objetivo a través de vectores triangulares cerrados y entrene la transición continua entre persecución suave y sacadas correctoras inmediatas en vértices agudos de 60 grados."
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/triangular-pursuit" />
      </div>
    </>
  );
}
