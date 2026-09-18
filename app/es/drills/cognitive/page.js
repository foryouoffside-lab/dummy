import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const cognitiveDrills = DRILLS.filter((d) => d.category === 'cognitive');

export const metadata = {
  title: 'Entrenamiento Cognitivo & Agilidad Mental | SkillDrills',
  description: 'Entrenamiento cognitivo y gimnasia mental online. 8 ejercicios científicos para concentración, velocidad mental, test de Stroop y tablas de Schulte.',
  keywords: [
    'entrenamiento cognitivo online', 'juegos de estimulación cognitiva', 'ejercicios de agilidad mental',
    'mejorar la concentración ejercicios', 'test de velocidad de procesamiento', 'test de stroop online gratis',
    'tabla de schulte online', 'ejercicios de atención dividida', 'entrenar memoria de trabajo',
    'juegos de gimnasia cerebral', 'ejercicios de funciones ejecutivas', 'flexibilidad cognitiva ejercicios',
    'ejercicios de concentración adultos', 'entrenamiento mental para esports', 'estimulación cognitiva adultos mayores'
  ],
  openGraph: {
    title: 'Entrenamiento Cognitivo & Agilidad Mental | SkillDrills',
    description: 'Entrenamiento cognitivo y gimnasia mental online. 8 ejercicios científicos para concentración, velocidad mental, test de Stroop y tablas de Schulte.',
    type: 'website',
    url: 'https://skilldrills.online/es/drills/cognitive',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Entrenamiento Cognitivo y Ejercicios Mentales en SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entrenamiento Cognitivo & Agilidad Mental | SkillDrills',
    description: 'Mejora tu concentración, control inhibitorio, test de Stroop y tablas de Schulte con 8 ejercicios científicos en tu navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/cognitive',
    languages: getAlternateLanguages('/es/drills/cognitive'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Ejercicios de Rendimiento", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Entrenamiento Cognitivo y Mental", "item": "https://skilldrills.online/es/drills/cognitive" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Entrenamiento Cognitivo y Gimnasia Mental (8 Ejercicios)",
  "url": "https://skilldrills.online/es/drills/cognitive",
  "description": "8 ejercicios neurocientíficos interactivos para entrenar atención selectiva, control inhibitorio, velocidad de procesamiento y tablas de Schulte.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": cognitiveDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'es', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/es${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
      "description": loc.tagline || drill.description,
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el entrenamiento cognitivo y cómo mejora el rendimiento mental?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El entrenamiento cognitivo consiste en una serie de ejercicios sistemáticos basados en neurociencia diseñados para estimular y fortalecer redes neurales específicas, como la memoria de trabajo, la atención selectiva y la velocidad de procesamiento. Al practicar tareas estructuradas con regularidad, se induce plasticidad sináptica en la corteza prefrontal y parietal, lo que optimiza la toma de decisiones, la concentración bajo presión y la resistencia a la fatiga cognitiva tanto en esports como en actividades académicas y laborales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuáles son las capacidades cognitivas clave que evalúan estos ejercicios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La batería de SkillDrills evalúa y entrena componentes esenciales de la función ejecutiva: velocidad de procesamiento perceptivo (tiempo necesario para identificar y categorizar estímulos), control inhibitorio (capacidad para suprimir respuestas impulsivas mediante la tarea Stroop), atención dividida (gestión simultánea de múltiples corrientes informativas), búsqueda visual periférica con tablas de Schulte, y flexibilidad cognitiva para alternar entre diferentes reglas lógicas."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué consiste el test de Stroop y por qué es fundamental para la concentración?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Descrito originalmente por John Ridley Stroop en 1935, el efecto Stroop mide la interferencia cognitiva y el tiempo de respuesta cuando el significado semántico de una palabra (por ejemplo, AZUL) entra en conflicto con el color de la tinta con la que está impresa (por ejemplo, rojo). Resolver esta discordancia exige que el córtex cingulado anterior y la corteza dorsolateral prefrontal supriman la lectura automática para priorizar la percepción del color, fortaleciendo el autocontrol y el enfoque selectivo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo ayuda la tabla de Schulte a la velocidad de lectura y procesamiento visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La tabla de Schulte es una cuadrícula numérica desarrollada para evaluar la atención y el campo visual periférico. Al buscar y pulsar los números en orden secuencial sin mover la mirada fija del punto central, se entrena la visión periférica y la agilidad de exploración visual. Este ejercicio es ampliamente utilizado por pilotos de aviación, atletas de élite y lectores de alta velocidad para ampliar su ventana de reconocimiento visual y reducir el tiempo de búsqueda en pantallas complejas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo y con qué frecuencia se debe practicar el entrenamiento mental?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La investigación neuropsicológica sugiere que la consistencia es más eficaz que las sesiones prolongadas. Se recomienda un protocolo de 15 a 20 minutos diarios, de 3 a 5 veces por semana. Realizar sesiones breves antes de una partida de videojuegos competitivos o una jornada de trabajo exigente activa la agilidad ejecutiva sin inducir agotamiento o saturación mental."
      }
    },
    {
      "@type": "Question",
      "name": "¿El entrenamiento cognitivo en línea realmente tiene transferencia a los videojuegos competitivos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Los deportes electrónicos exigen una tasa de procesamiento de información extremadamente alta: filtrar ruidos visuales en el minimapa, anticipar jugadas rivales mediante atención periférica y tomar decisiones tácticas en fracciones de segundo. Entrenar el control inhibitorio y la memoria operativa reduce el error de visión de túnel y mejora los tiempos de reacción ante emboscadas o cambios imprevistos en la arena de juego."
      }
    },
    {
      "@type": "Question",
      "name": "¿Estos ejercicios de agilidad mental son adecuados para niños, adultos y adultos mayores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Totalmente. Los ejercicios de SkillDrills se adaptan automáticamente a cualquier nivel de destreza gracias a su diseño basado en métricas objetivas de milisegundos y precisión. En adultos jóvenes y gamers optimiza la velocidad y resistencia mental; en personas con dificultades de concentración fortalece la perseverancia focalizada; y en adultos mayores fomenta la reserva cognitiva y la agilidad mental activa."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué hardware o configuración técnica se requiere para realizar las pruebas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Todos los ejercicios de SkillDrills están desarrollados con arquitectura web nativa ultraligera a 60-120 FPS y no requieren descargas ni registros. Para obtener mediciones de latencia estrictas y fiables, se recomienda utilizar un ratón de baja latencia o pantalla táctil calibrada, deshabilitar la aceleración del puntero en el sistema operativo y cerrar aplicaciones en segundo plano que puedan generar caídas de fotogramas."
      }
    }
  ]
};

export default function LocalizedCognitiveHubClientPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CognitiveHubClient faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))} />
    </>
  );
}

