import PhysicalDrillsClient from '@/app/drills/physical/PhysicalDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const physicalDrills = DRILLS.filter((d) => d.category === 'physical');

export const metadata = {
  title: 'Entrenamiento de Agilidad & Test de Reflejos | SkillDrills',
  description: 'Entrenamiento de agilidad y reflejos online: 11 ejercicios científicos de reacción, equilibrio, coordinación motriz, evasión y velocidad de pies.',
  keywords: [
    'test de reflejos online gratis', 'ejercicios de coordinacion ojo mano', 'escalera de agilidad ejercicios online',
    'test de equilibrio online', 'juegos de esquivar obstaculos raton', 'entrenamiento de vision periferica',
    'test go no go online', 'juego de la regla reaccion test', 'test de velocidad de reaccion online',
    'como mejorar los reflejos y velocidad', 'ejercicios de coordinacion motriz', 'velocidad de pies y agilidad futbol',
    'movimiento bilateral y linea media', 'control postural y estabilidad motora', 'juego de reflejos y esquivar balas'
  ],
  openGraph: {
    title: 'Entrenamiento de Agilidad & Test de Reflejos | SkillDrills',
    description: 'Entrenamiento de agilidad y reflejos online: 11 ejercicios científicos de reacción, equilibrio, coordinación motriz, evasión y velocidad de pies.',
    type: 'website',
    url: 'https://skilldrills.online/es/drills/physical',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Entrenamiento de Agilidad y Reflejos Físicos en SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entrenamiento de Agilidad & Test de Reflejos | SkillDrills',
    description: '11 ejercicios científicos de agilidad, equilibrio, coordinación motriz y reflejos rápidos gratis en el navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical',
    languages: getAlternateLanguages('/es/drills/physical'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Ejercicios de Rendimiento", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Reflejos Físicos & Agilidad", "item": "https://skilldrills.online/es/drills/physical" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Entrenamiento de Agilidad & Reflejos (11 Ejercicios)",
  "url": "https://skilldrills.online/es/drills/physical",
  "description": "11 ejercicios interactivos para tiempo de reacción, equilibrio, coordinación motriz, escalera de agilidad y evasión de obstáculos.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": physicalDrills.map((drill) => {
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
      "name": "¿Cómo se traduce el entrenamiento de escalera de agilidad digital en juego de pies y agilidad física real?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los ejercicios de escalera de agilidad por desplazamiento visual entrenan el reconocimiento de patrones de alta velocidad y la sincronización rítmica en la corteza visual. Al condicionar al cerebro para tomar decisiones motoras en milisegundos sincronizadas con estímulos visuales, la corteza motora acelera la conducción neural, optimizando el tiempo de contacto con el suelo y los cambios de dirección (COD) en deportes como fútbol, baloncesto y tenis."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es una cadena de reacción con arresto de impulsos y cómo evita sobre-comprometerse (over-committing)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La prueba de parada de impulsos (Impulse Arrest) evalúa la capacidad neuromuscular para cancelar o rectificar abruptamente una acción ya iniciada ante la aparición de un señuelo o finta inesperada. El entrenamiento de las vías inhibitorias en los ganglios basales y la corteza prefrontal capacita a los atletas para frenar el impulso en menos de 150 ms, neutralizando los engaños del adversario."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo mejora el equilibrio físico el entrenamiento virtual de estabilidad contra vectores de fuerza?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El equilibrio dinámico depende de la integración sensorial continua entre la fijación visual, el sistema vestibular del oído interno y los propioceptores articulares y musculares. Contrarrestar vectores de viento y fuerzas dinámicas en pantalla entrena al sistema nervioso central para calcular micro-fuerzas antagonistas en tiempo real, reclutando los músculos posturales ante perturbaciones repentinas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es fundamental el movimiento cruzado de la línea media (Cross-Body Movement) en el rendimiento atlético?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Moverse cruzando la línea media corporal requiere una transmisión neuronal constante a través del cuerpo calloso entre ambos hemisferios cerebrales. Los ejercicios de interceptación coordinan cadenas cinéticas diagonales, potenciando la agilidad multidireccional, la potencia de rotación y la orientación espacial tridimensional."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto reducen los ejercicios de evasión en cuadrícula 3x3 el tiempo real de reacción ante esquivas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A diferencia de las pruebas estáticas predecibles, las zonas de peligro dinámicas exigen una actualización constante del mapa espacial en el lóbulo parietal. Esto reduce el tiempo de reacción de elección (Choice Reaction Time) bajo presión de una media de 280 ms a menos de 190 ms."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo contribuye el escaneo de visión periférica (campo visual útil UFOV) a la prevención de lesiones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las pruebas de detección perimétrica amplían el campo visual funcional (FFOV). Los estímulos en la periferia activan la vía visual magnocelular, desencadenando respuestas motoras evasivas reflejas ante peligros en puntos ciegos sin necesidad de fijación foveal directa, lo que previene impactos y colisiones deportivas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la rutina óptima para entrenar agilidad física y reflejos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se recomiendan sesiones de 15 a 25 minutos de alta intensidad, de 3 a 5 veces por semana. Dado que la precisión neuromuscular consume una gran cantidad de energía sináptica, extender la práctica más allá de 30 minutos genera fatiga en el sistema nervioso central (SNC), degradando los patrones de reacción."
      }
    },
    {
      "@type": "Question",
      "name": "¿Pueden los juegos de reflejos en el navegador complementar el entrenamiento físico en el gimnasio o la pista?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Las herramientas digitales no sustituyen la fuerza muscular ni la potencia pliométrica, pero aíslan y perfeccionan la fase perceptivo-cognitiva del movimiento. Al acelerar la detección visual, el análisis de amenazas y el envío de órdenes motoras, permiten que la potencia física se exprese en el campo sin retardos perceptivos."
      }
    }
  ]
};

export default function PhysicalDrillsPage() {
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
      <PhysicalDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
