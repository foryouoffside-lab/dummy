import MemoryClient from '@/app/drills/memory/MemoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const memoryDrills = DRILLS.filter((d) => d.category === 'memory');

export const metadata = {
  title: 'Juegos de Memoria & Memoria de Trabajo | SkillDrills',
  description: 'Juegos de memoria gratis online. 7 ejercicios científicos para memoria de trabajo (N-Back), span de dígitos y memoria visual espacial en el navegador.',
  keywords: [
    'juegos de memoria gratis online', 'entrenar memoria de trabajo', 'test de memoria a corto plazo',
    'test de span de digitos online', 'tarea n-back online gratis', 'ejercicios de memoria espacial',
    'ejercicios para mejorar la memoria', 'test de memoria visual gratis', 'matriz de corsi test online',
    'metodo de chunking memoria', 'estimulacion cognitiva memoria adultos', 'ejercicios para la perdida de memoria',
    'ejercicios de retencion mental', 'memoria y concentracion para estudiantes', 'esports mapa tactico memoria espacial'
  ],
  openGraph: {
    title: 'Juegos de Memoria & Memoria de Trabajo | SkillDrills',
    description: 'Juegos de memoria gratis online. 7 ejercicios científicos para memoria de trabajo (N-Back), span de dígitos y memoria visual espacial en el navegador.',
    type: 'website',
    url: 'https://skilldrills.online/es/drills/memory',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Juegos de Memoria y Memoria de Trabajo en SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juegos de Memoria & Memoria de Trabajo | SkillDrills',
    description: 'Memoria de trabajo (N-Back), span de dígitos, recuerdo de palabras y memoria espacial: 7 ejercicios científicos gratis en el navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/memory',
    languages: getAlternateLanguages('/es/drills/memory'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Ejercicios de Rendimiento", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Memoria & Memoria de Trabajo", "item": "https://skilldrills.online/es/drills/memory" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Juegos de Memoria & Memoria de Trabajo (7 Ejercicios)",
  "url": "https://skilldrills.online/es/drills/memory",
  "description": "7 ejercicios neurocientíficos interactivos para entrenar memoria a corto plazo, memoria de trabajo (N-Back), retención de dígitos y memoria visoespacial.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": memoryDrills.map((drill) => {
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
      "name": "¿Cuál es la diferencia entre memoria a corto plazo y memoria de trabajo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La memoria a corto plazo es un almacén temporal pasivo que retiene pequeñas cantidades de información durante 15 a 30 segundos sin alterarla. Por el contrario, la memoria de trabajo (Working Memory), regulada por la corteza prefrontal bajo el modelo de Baddeley, es un espacio de trabajo mental activo. Permite retener información mientras simultáneamente se manipula, actualiza y combina con otros datos en tiempo real, como al calcular cuentas mentalmente o anticipar tácticas enemigas durante una partida competitiva."
      }
    },
    {
      "@type": "Question",
      "name": "¿El entrenamiento N-Back realmente mejora la inteligencia fluida y la memoria de trabajo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. La literatura en neurociencia cognitiva (como los estudios pioneros de Jaeggi et al.) demuestra que las tareas N-Back y Dual N-Back adaptativas fortalecen la red de control frontoparietal. Al exigir una actualización constante de estímulos mientras se suprimen activamente las interferencias anteriores, se expande la capacidad de la memoria de trabajo y se generan efectos positivos de transferencia hacia la inteligencia fluida (Gf) y la resolución de problemas abstractos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el promedio humano en el test de retención de dígitos (Digit Span) y cómo se mejora?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Según la Ley de Miller, el promedio en adultos para la repetición directa de dígitos es de 7 ± 2 elementos, mientras que en orden inverso (mayor carga ejecutiva) ronda los 5 ± 1 dígitos. Los modelos contemporáneos fijan la capacidad bruta sin agrupar en torno a 4 elementos. Para duplicar tu marca, la estrategia más efectiva es el 'chunking' o fragmentación: agrupar los números en bloques rítmicos de 3 o 4 cifras activando el bucle fonológico."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo benefician los ejercicios de memoria espacial (cuadrícula y trazo de rutas) a la vida diaria y a los videojuegos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los ejercicios de retención espacial activan intensamente el hipocampo, el córtex parietal y la agenda visoespacial. Entrenar el recuerdo de cuadrículas matriciales (tipo bloques de Corsi) y trayectorias dinámicas agudiza la orientación geográfica, la comprensión de esquemas y planos, la rotación mental de figuras tridimensionales y la lectura instantánea del minimapa en juegos competitivos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es la técnica de fragmentación (Chunking) y cómo amplía la capacidad mental?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El 'chunking' es una técnica cognitiva de codificación que agrupa elementos aislados en unidades compactas dotadas de significado o patrón rítmico. Dado que la memoria operativa humana tiene un límite estricto de ranuras activas pero no de densidad informativa por ranura, convertir una secuencia de 12 dígitos en tres grupos familiares (como años o prefijos) permite almacenar gran cantidad de datos sin colapsar el ancho de banda mental."
      }
    },
    {
      "@type": "Question",
      "name": "¿Practicar ejercicios de memoria a diario ayuda a prevenir el deterioro cognitivo y el envejecimiento cerebral?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Así es. La estimulación mental regular induce plasticidad neuronal y promueve la arborización dendrítica en el hipocampo, lo que contribuye a formar la llamada 'reserva cognitiva'. Un cerebro con sólida reserva cognitiva es mucho más resistente frente a la neurodegeneración asociada a la edad, retrasando la aparición de fallos de memoria cotidianos y protegiendo la funcionalidad cognitiva en la adultez avanzada."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo al día se debe dedicar al entrenamiento de memoria para lograr avances óptimos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los expertos en neuroergonomía aconsejan sesiones focalizadas de 15 a 20 minutos diarios, entre 3 y 5 veces por semana. Las tareas de memoria de trabajo consumen altas tasas de energía cerebral, por lo que prolongar las sesiones más allá de 25 minutos provoca fatiga y disminuye el rendimiento. Breves sesiones intensivas, seguidas de un descanso adecuado con sueño profundo, garantizan la consolidación sináptica a largo plazo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Son científicamente precisos y confiables los tests de memoria interactivos en el navegador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. La suite SkillDrills traslada con rigor los paradigmas neuropsicológicos tradicionales, como la prueba de dígitos de Wechsler, la tarea de bloques de Corsi y los protocolos N-Back estandarizados. Gracias a su motor nativo con sincronización a nivel de milisegundos, ofrece una precisión idéntica a la de un laboratorio de evaluación cognitiva, de forma completamente gratuita y sin descargas."
      }
    }
  ]
};

export default function LocalizedMemoryClientPage() {
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
      <MemoryClient faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))} />
    </>
  );
}

