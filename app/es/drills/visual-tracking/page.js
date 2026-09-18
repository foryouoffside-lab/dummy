import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const trackingDrills = DRILLS.filter((d) => d.category === 'visual-tracking');

export const metadata = {
  title: 'Seguimiento Visual & Visión Dinámica Online | SkillDrills',
  description: 'Ejercicios de seguimiento visual y visión dinámica online gratis. 14 pruebas de persecución ocular suave, movimientos sacádicos y visión periférica.',
  keywords: [
    'entrenamiento de seguimiento visual', 'agudeza visual dinamica test', 'ejercicios de seguimiento ocular',
    'movimientos oculares de persecucion', 'movimientos sacadicos ejercicios', 'ejercicios para mejorar la vista deporte',
    'entrenamiento visual para gamers', 'reflejo vestibulo ocular ejercicios', 'fijacion visual y estabilidad',
    'vision periferica ejercicios online', 'prediccion de trayectoria visual', 'terapia visual ejercicios en casa',
    'ejercicios musculares de los ojos gratis', 'test de vision dinamica online', 'smooth pursuit ejercicios gratis'
  ],
  openGraph: {
    title: 'Seguimiento Visual & Visión Dinámica Online | SkillDrills',
    description: 'Ejercicios de seguimiento visual y visión dinámica online gratis. 14 pruebas de persecución ocular suave, movimientos sacádicos y visión periférica.',
    type: 'website',
    url: 'https://skilldrills.online/es/drills/visual-tracking',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Ejercicios de Seguimiento Visual y Visión Dinámica' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seguimiento Visual & Visión Dinámica Online | SkillDrills',
    description: 'Desde persecución suave hasta predicción balística: 14 ejercicios profesionales de motilidad ocular gratis en tu navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/visual-tracking',
    languages: getAlternateLanguages('/es/drills/visual-tracking'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Directorio de Ejercicios", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Seguimiento Visual y Ocular", "item": "https://skilldrills.online/es/drills/visual-tracking" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Ejercicios de Seguimiento Visual y Visión Dinámica Gratis (14 Drills)",
  "url": "https://skilldrills.online/es/drills/visual-tracking",
  "description": "14 ejercicios científicos de persecución ocular suave (Smooth Pursuit), ondas sinusoidales, trayectorias continuas, anticipación balística y visión periférica.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": trackingDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'es', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/es${drill.href}`
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia fisiológica entre la persecución ocular suave (Smooth Pursuit) y los movimientos sacádicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los movimientos de persecución suave (Smooth Pursuit Eye Movements) son movimientos oculares continuos y fluidos diseñados para mantener un estímulo en movimiento continuo exactamente en la fóvea central de la retina. Por el contrario, los movimientos sacádicos (sacadas) son saltos balísticos de altísima velocidad (hasta 900 grados por segundo) entre dos puntos fijos de atención. En el deporte de alta competición y en los videojuegos FPS, la persecución suave resulta indispensable para analizar trayectorias de vuelo y aceleraciones de rivales sin perder nitidez."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo influye el entrenamiento de la agudeza visual dinámica en el rendimiento deportivo y en videojuegos de disparos (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tener una excelente visión estática en reposo no garantiza ver con nitidez objetos a gran velocidad. El entrenamiento de la agudeza visual dinámica (DVA) optimiza la sincronización neuromuscular de los seis músculos extraoculares. Esto previene el desenfoque retiniano y reduce el retardo de procesamiento en la corteza visual entre 50 y 80 milisegundos, otorgando ventajas críticas para anticipar curvas en el tenis o béisbol y para mantener un tracking aim impecable sobre enemigos en movimiento."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es el seguimiento visual predictivo (Predictive Pursuit) y cómo reacciona el ojo ante la oclusión del objetivo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El seguimiento predictivo es la capacidad del cerebelo de calcular la trayectoria futura de un objeto basándose en su velocidad y aceleración previas cuando este desaparece momentáneamente tras un obstáculo (oclusión o parpadeo). Al ejercitar este mecanismo, los ojos continúan moviéndose por delante del objetivo anticipando con exactitud matemática el punto y el instante de reaparición para un disparo instantáneo sin tiempo muerto."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué se producen sacadas de corrección (Catch-up Saccades) durante el seguimiento y cómo se pueden eliminar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las sacadas de corrección o de alcance ocurren cuando la velocidad del ojo es inferior a la del objetivo (ganancia de seguimiento < 1,0), provocando que la mirada se retrase y tenga que dar un salto brusco hacia adelante para refovear. Esto genera inestabilidad y pérdida de fluidez motora. Se corrigen entrenando progresivamente con movimientos lineales lentos y trayectorias sinusoidales predecibles, elevando gradualmente la velocidad mientras se mantiene la relajación muscular facial."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué medida ayuda el entrenamiento de seguimiento ocular en la terapia visual y tras una conmoción cerebral?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En neurooftalmología y medicina deportiva, los ejercicios de seguimiento suave y fijación ocular son un pilar del tratamiento del síndrome posconmocional (PCS) y la disfunción oculomotora. La estimulación estructurada promueve la neuroplasticidad en el tronco encefálico y el cerebelo, restaurando la coordinación binocular y aliviando síntomas frecuentes como cefaleas, mareos por movimiento y fatiga por lectura."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué función cumple el reflejo vestíbulo-ocular (RVO) en la estabilidad de la mirada durante el movimiento corporal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El reflejo vestíbulo-ocular (RVO o VOR) es un arco reflejo que conecta el sistema vestibular del oído interno con los músculos de los ojos. Cuando la cabeza o el cuerpo se mueven, el RVO hace rotar los globos oculares a la misma velocidad pero en sentido opuesto, garantizando que el entorno no se vea borroso ni tambaleante. El entrenamiento ocular perfecciona este ajuste fino, manteniendo la retícula estable incluso durante desplazamientos tácticos exigentes."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuántos minutos al día es recomendable realizar ejercicios de seguimiento visual para evitar fatiga ocular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los músculos extraoculares son fibras sumamente finas y sensibles al agotamiento. El protocolo recomendado es de 10 a 15 minutos por sesión, entre 3 y 5 días por semana. Se aconseja incorporar la regla '20-20-20': cada 20 minutos de ejercicio de pantalla, enfocar durante 20 segundos un punto situado a más de 6 metros (20 pies) para relajar por completo el músculo ciliar y prevenir espasmos acomodativos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es fundamental utilizar un monitor de alta tasa de refresco (144Hz a 360Hz) para el entrenamiento ocular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Una pantalla de 60Hz refresca cada 16,7 ms, generando estelas borrosas (efecto fantasma o ghosting) y saltos discretos que fuerzan al ojo a realizar sacadas correctivas antinaturales. En cambio, paneles de 144Hz a 360Hz actualizan entre 6,9 ms y 2,8 ms, reproduciendo una continuidad física idéntica al mundo real que permite a los músculos oculares desarrollar un seguimiento suave auténtico y sin microtirones."
      }
    }
  ]
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VisualTrackingDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
