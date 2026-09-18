import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

export const metadata = {
  title: 'Entrenador de Puntería: 82 Tests Gratis | SkillDrills',
  description: '82 ejercicios online gratuitos en 8 categorías: puntería FPS para shooters, test de reacción, memoria, CPS y agudeza visual directamente en el navegador.',
  keywords: [
    'aim trainer gratis',
    'entrenador de punteria online',
    'test de tiempo de reaccion',
    'juegos de entrenamiento cerebral',
    'test de memoria online',
    'seguimiento visual ejercicios',
    'test de cps clics por segundo',
    'entrenar punteria valorant',
    'flick aim entrenamiento',
    'tracking aim ejercicios',
    'test de stroop online gratis',
    'tabla de schulte online',
    'memoria de trabajo ejercicios',
    'vision periferica entrenamiento',
    'coordinacion ojo mano test'
  ],
  openGraph: {
    title: 'Entrenador de Puntería: 82 Tests Gratis | SkillDrills',
    description: '82 ejercicios online gratuitos en 8 categorías: puntería FPS para shooters, test de reacción, memoria, CPS y agudeza visual directamente en el navegador.',
    type: 'website',
    url: 'https://skilldrills.online/es/drills',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Catálogo Completo de 82 Ejercicios SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entrenador de Puntería: 82 Tests Gratis | SkillDrills',
    description: '82 ejercicios online para puntería, velocidad de reacción, cognición y agudeza visual.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills',
    languages: getAlternateLanguages('/es/drills'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://skilldrills.online/es"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Todos los Ejercicios",
      "item": "https://skilldrills.online/es/drills"
    }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Catálogo Completo de 82 Ejercicios de Rendimiento SkillDrills",
  "description": "Colección científica de 82 ejercicios interactivos para puntería FPS, velocidad de reacción, seguimiento visual, cognición, memoria, motricidad fina y percepción visual.",
  "url": "https://skilldrills.online/es/drills",
  "inLanguage": "es",
  "hasPart": DRILLS.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'es', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/es${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requiere JavaScript y soporte para HTML5 Canvas",
      "description": loc.tagline || drill.description,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      }
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuáles son las bases científicas detrás de los 82 ejercicios de SkillDrills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills se fundamenta en principios validados de la neurobiología motora y la psicología cognitiva, como la Ley de Fitts (compensación velocidad-precisión), la Ley de Hick (tiempo de decisión multialternativa), la teoría de integración de características visuales y los modelos de plasticidad sináptica. Cada ejercicio aísla circuitos neuromusculares y procesos atencionales específicos para generar adaptaciones duraderas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo mide SkillDrills los tiempos de reacción y la latencia sin retrasos en el navegador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La plataforma utiliza la API de alta precisión performance.now(), capaz de registrar marcas temporales en microsegundos (fracciones de milisegundo). Mediante bucles de animación sincronizados con la tasa de refresco (requestAnimationFrame) y la Pointer Lock API para captura directa del ratón sin aceleración artificial, se eliminan los cuellos de botella de renderizado."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la rutina de entrenamiento recomendada para maximizar el progreso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se recomienda una sesión estructurada de 15 a 20 minutos diarios antes de competir o estudiar: 5 minutos de calentamiento oculomotor (seguimiento de trayectorias), 10 minutos de trabajo motor específico (flick shot o control de microajustes) y 5 minutos de control inhibitorio o memoria de trabajo. La constancia diaria estimula la mielinización de las vías neuronales implicadas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo transfiere el entrenamiento de puntería de SkillDrills a shooters como VALORANT, CS2 o Apex Legends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nuestros ejercicios de puntería FPS entrenan los componentes biomotores fundamentales: frenado balístico del ratón (mouse braking), colocación de mira en esquinas (angle holding), seguimiento de objetivos con strafe irregular y control de microajustes. Al coincidir la relación de sensibilidad con el espacio físico del mousepad, la memoria muscular se transfiere directamente al juego real."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué se diferencia SkillDrills de los juegos casuales o pasatiempos mentales tradicionales?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A diferencia de juegos recreativos genéricos, SkillDrills emplea tareas de laboratorio estandarizadas como N-Back dual, pruebas de Stroop, redes de atención atencional y tablas de Schulte con métricas cuantitativas precisas. Los usuarios obtienen percentiles de rendimiento, distribuciones fisiológicas y curvas de aprendizaje comparadas con datos globales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo afecta la tasa de refresco del monitor (Hz) a los resultados de las pruebas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un monitor de 60 Hz actualiza la imagen cada 16,6 milisegundos, mientras que pantallas de 144 Hz (6,9 ms) o 240 Hz (4,1 ms) reducen significativamente el retraso de visualización y el desenfoque de movimiento. SkillDrills sincroniza los bucles de captura con los cuadros nativos del monitor, permitiendo aprovechar plenamente monitores gaming de alta velocidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es necesario descargar programas o registrarse para utilizar la plataforma?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Los 82 ejercicios se ejecutan íntegramente de forma local en el navegador web mediante Canvas HTML5 y WebGL ligero. No se requiere instalar software ni crear cuentas obligatorias. Todos los récords e historiales se almacenan localmente en el almacenamiento privado del navegador, garantizando total privacidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se pueden realizar estos ejercicios en dispositivos móviles o tabletas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los ejercicios de memoria, reacción táctil, agudeza visual y control cognitivo están adaptados para pantallas táctiles en smartphones y tablets. No obstante, para los entrenamientos de puntería FPS y motricidad fina de precisión, es imprescindible utilizar un ordenador con ratón físico sobre alfombrilla para asegurar mediciones biomecánicas válidas."
      }
    }
  ]
};

export default function LocalizedDrillsDirectoryPage() {
  const faqs = faqSchema.mainEntity.map((item) => ({
    q: item.name,
    a: item.acceptedAnswer.text,
  }));

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
      <DrillsDirectoryClient faqs={faqs} />
    </>
  );
}

