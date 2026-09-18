import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const visualDrills = DRILLS.filter((d) => d.category === 'visual');

export const metadata = {
  title: 'Test de Agudeza Visual & Percepción | SkillDrills',
  description: 'Entrenamiento visual online: 9 ejercicios científicos de agudeza visual dinámica, percepción de profundidad, seguimiento ocular y velocidad de reacción.',
  keywords: [
    'test de agudeza visual online', 'ejercicios para mejorar la vista', 'test de vision estereoscopica',
    'percepcion de profundidad prueba', 'entrenamiento de vision periferica', 'tiempo de reaccion visual online',
    'test de reflejo de luz', 'seguimiento de objetos multiples', 'ejercicios oculares de seguimiento',
    'busqueda visual atencion selectiva', 'gimnasia visual para ojos cansados', 'evaluacion de agudeza visual dinamica',
    'movimientos oculares sacadicos', 'discriminacion temporal visual', 'entrenamiento de vision deportiva'
  ],
  openGraph: {
    title: 'Test de Agudeza Visual & Percepción | SkillDrills',
    description: 'Entrenamiento visual online: 9 ejercicios científicos de agudeza visual dinámica, percepción de profundidad, seguimiento ocular y velocidad de reacción.',
    type: 'website',
    url: 'https://skilldrills.online/es/drills/visual',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Entrenamiento de Agudeza Visual y Rendimiento Óptico en SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Agudeza Visual & Percepción | SkillDrills',
    description: '9 ejercicios científicos de agudeza visual dinámica, percepción de profundidad, seguimiento ocular y velocidad de reacción.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/visual',
    languages: getAlternateLanguages('/es/drills/visual'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Ejercicios de Rendimiento", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Percepción Visual & Profundidad", "item": "https://skilldrills.online/es/drills/visual" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Entrenamiento de Percepción Visual & Profundidad (9 Ejercicios)",
  "url": "https://skilldrills.online/es/drills/visual",
  "description": "9 ejercicios interactivos para agudeza visual dinámica, visión estereoscópica, seguimiento ocular continuo, búsqueda visual y tiempo de reacción.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": visualDrills.map((drill) => {
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
      "name": "¿Cómo mejora el entrenamiento de agudeza visual dinámica (DVA) el rendimiento en deportes y videojuegos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A diferencia de la agudeza estática en optotipos, la agudeza visual dinámica evalúa la capacidad de la fóvea central de mantener enfocada la imagen retiniana de un blanco en rápido movimiento. Interceptar trayectorias balísticas entrena los seis músculos extraoculares y la corteza visual, optimizando el tiempo de impacto en tenis, béisbol y la precisión de rastreo en shooters en primera persona."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué evalúa la prueba de percepción de profundidad basada en el método de las tres varillas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Esta prueba mide la estereopsis mediante la disparidad binocular: las sutiles diferencias angulares proyectadas en cada retina. Detectar con precisión milimétrica cuándo las varillas móviles se alinean con la fija es crucial para calcular distancias de frenado en conducción y juzgar pases en profundidad en deportes de equipo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué el seguimiento de objetos múltiples (MOT) es clave para ampliar la visión periférica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El paradigma MOT estimula intensamente la atención espacial dividida en el lóbulo parietal y la memoria de trabajo visoespacial. Al fijar la mirada en el centro mientras se vigilan varios objetivos errantes en la periferia, se expande el campo visual útil (UFOV), mejorando la anticipación táctica y el control situacional."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre el seguimiento ocular suave (Smooth Pursuit) y los saltos sacádicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El seguimiento suave permite a los ojos deslizarse de forma continua tras un objeto en movimiento sin interrupciones visuales. Los movimientos sacádicos, en cambio, son saltos bruscos que generan breves supresiones de la visión. Entrenar el seguimiento continuo evita que los detalles dinámicos se desenfoquen en momentos críticos."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué se diferencia el test de reacción a la luz de una prueba de reflejos común?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las pruebas de reacción estándar implican procesamiento cognitivo complejo como discriminación de formas o colores. El test de reacción a la luz aísla la latencia visuomotora primaria: mide estrictamente el tiempo desde la fototransducción retiniana del destello estroboscópico hasta la primera contracción muscular en el dedo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué procesos cognitivos se activan con el ejercicio de búsqueda visual en matrices densas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las tareas de búsqueda entre distractores activan la integración de rasgos en la corteza visual primaria y el filtrado inhibitorio en la corteza prefrontal dorsolateral. Este entrenamiento enseña al cerebro a ignorar el ruido ambiental caótico y localizar patrones relevantes en fracciones de segundo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la frecuencia y duración óptima para los ejercicios de entrenamiento visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se recomienda realizar sesiones de 15 a 20 minutos de alta concentración, entre 3 y 5 veces por semana. Los músculos ciliares y extraoculares sufren fatiga rápida si se sobrepasan los 25 minutos continuos, lo que reduce la plasticidad neural. Las sesiones cortas y regulares garantizan adaptaciones óptimas sin fatiga ocular."
      }
    },
    {
      "@type": "Question",
      "name": "¿Pueden los ejercicios visuales en el navegador reemplazar las consultas con el optometrista u oftalmólogo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Estas herramientas están diseñadas para el acondicionamiento sensoriomotor y la agilidad visual funcional en personas sanas o deportistas, pero no sustituyen los exámenes clínicos de refracción, patología ocular o salud retiniana periódicos con un especialista médico."
      }
    }
  ]
};

export default function VisualDrillsPage() {
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
      <VisualDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
