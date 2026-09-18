import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const reactionDrills = DRILLS.filter((d) => d.category === 'reaction-speed');

export const metadata = {
  title: 'Test de Reflejos y Velocidad de Reacción | SkillDrills',
  description: 'Test de tiempo de reacción y entrenamiento de reflejos online gratis. Mide tus reflejos en milisegundos con 8 ejercicios científicos en tu navegador.',
  keywords: [
    'test de tiempo de reaccion', 'test de reflejos online', 'mejorar velocidad de reaccion',
    'entrenamiento de reflejos gaming', 'prueba de reflejos en milisegundos',
    'tiempo de reaccion simple y eleccion', 'ejercicios de seguimiento ocular',
    'agudeza visual dinamica', 'reflejos pantalla verde test', 'coordinacion ojo mano ejercicios',
    'input lag monitor reaccion', 'juegos de reflejos gratis navegador',
    'vision periferica entrenamiento', 'promedio tiempo de reaccion humano', 'esports test de reflejos'
  ],
  openGraph: {
    title: 'Test de Reflejos y Velocidad de Reacción | SkillDrills',
    description: 'Test de tiempo de reacción y entrenamiento de reflejos online gratis. Mide tus reflejos en milisegundos con 8 ejercicios científicos en tu navegador.',
    type: 'website',
    url: 'https://skilldrills.online/es/drills/reaction-speed',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Test de Reflejos y Velocidad de Reacción Online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Reflejos y Velocidad de Reacción | SkillDrills',
    description: 'Mide tus reflejos en milisegundos con 8 ejercicios científicos de velocidad de reacción en tu navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/reaction-speed',
    languages: getAlternateLanguages('/es/drills/reaction-speed'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Directorio de Ejercicios", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Velocidad de Reacción", "item": "https://skilldrills.online/es/drills/reaction-speed" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Test de Reflejos Gratis y Centro de Entrenamiento de Reacción",
  "url": "https://skilldrills.online/es/drills/reaction-speed",
  "description": "Colección de 8 ejercicios interactivos para medir y entrenar el tiempo de reacción, agudeza visual dinámica, movimientos sacádicos y reflejos de clic. Sin descargas.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": reactionDrills.map((drill) => {
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
      "name": "¿Cuál es la diferencia fisiológica entre el tiempo de reacción simple (Simple RT) y el tiempo de reacción de elección (Choice RT)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El tiempo de reacción simple (Simple RT) es el lapso transcurrido entre un único estímulo sensorial predecible (como la pantalla cambiando a color verde) y la ejecución de una respuesta motora prefijada (un clic de ratón), rondando entre 200 y 250 milisegundos en adultos sanos. En cambio, el tiempo de reacción de elección (Choice RT) exige un procesamiento cognitivo previo para discernir entre múltiples estímulos (identificar a un aliado frente a un enemigo o decidir hacia qué lado esquivar según la Ley de Hick), elevando la latencia a 300 o más de 450 ms. En los esports tácticos, la velocidad de reacción de elección es el factor primordial que define los enfrentamientos de alto nivel."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el tiempo de reacción visual promedio en humanos y es posible alcanzar niveles profesionales?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El promedio de tiempo de reacción visual en adultos no entrenados se sitúa entre 240 y 270 ms. Esta cifra incluye la transducción fotoquímica en los fotorreceptores retinianos (20 a 40 ms), la transmisión por el nervio óptico hasta la corteza visual (60 a 80 ms) y la señal motora eferente enviada desde la corteza motora a través de la médula espinal hasta los flexores de los dedos (50 a 70 ms). Mediante entrenamientos neurokinesiológicos continuos y optimización de la plasticidad sináptica, los jugadores competitivos y atletas pueden reducir su tiempo de reacción hasta el rango de 150 a 180 ms."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo influyen el entrenamiento de agudeza visual dinámica (DVA) y los movimientos sacádicos en los reflejos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La rapidez de reacción no depende solo de la musculatura de la mano, sino de la velocidad con la que los ojos fijan el objetivo en la fóvea central de la retina (la zona de máxima resolución visual). Al ejercitar los movimientos de seguimiento ocular suave (smooth pursuit) y los saltos visuales balísticos (sacadas oculares), se fortalece la musculatura extraocular. Esto recorta decenas de milisegundos vitales en el reconocimiento del blanco, permitiendo al cerebro tomar decisiones de disparo o esquiva con mucha mayor anticipación."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué impacto tienen la tasa de refresco del monitor (Hz) y la tasa de sondeo del ratón en la medición de reflejos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La latencia de entrada del hardware puede distorsionar notablemente las mediciones. Un monitor estándar de 60 Hz actualiza la imagen cada 16,6 ms, mientras que una pantalla de 144 Hz (6,9 ms) o 240 Hz (4,1 ms) muestra el estímulo visual casi de inmediato. Si se combina con un ratón gaming configurado a 1000 Hz o más y la API estándar Pointer Lock del W3C en el navegador, se evitan el suavizado y los retrasos de búfer del sistema operativo, midiendo el tiempo de reacción neurológica real con una precisión de 1 ms."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué forma afectan la falta de sueño, el consumo de cafeína y la deshidratación a los reflejos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La neurociencia demuestra que tan solo 2 horas de privación de sueño ralentizan la velocidad de transmisión sináptica en 30 a 50 ms, un deterioro cognitivo similar al provocado por niveles leves de alcohol. Por otro lado, dosis moderadas de cafeína (100 a 200 mg) bloquean los receptores de adenosina mejorando temporalmente la reacción en 10 a 15 ms, aunque un exceso provoca temblor muscular involuntario que destruye la precisión. Asimismo, una pérdida de hidratación corporal de apenas el 2% reduce drásticamente la capacidad de inhibición y la atención selectiva del lóbulo frontal."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo interactúa el ping de red con el tiempo de reacción biológico en juegos de disparos online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El retraso total acumulado hasta que el servidor valida un impacto es la suma de: tiempo de reacción biológico + latencia de entrada del equipo + ping de conexión. Si un jugador tiene 200 ms de reacción física, 15 ms de retraso de sistema y 35 ms de ping, el impacto llega al servidor en 250 ms. Si un oponente cuenta con 20 ms de ventaja por mejor conexión a internet, entrenar tus reflejos para recortar 30 ms en tu respuesta biológica compensará por completo la desventaja de red y te otorgará la primera baja en el enfrentamiento."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la rutina diaria ideal y la duración recomendada para mejorar los reflejos sin saturación nerviosa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El sistema nervioso central se agota con gran rapidez durante ejercicios que exigen una concentración refleja extrema. Entrenar en estado de fatiga neuronal consolida patrones de respuesta lentos e ineficientes. El protocolo óptimo consiste en sesiones concentradas de 15 a 20 minutos al día, de 4 a 5 días por semana. Realizar calentamientos y estiramientos suaves de muñeca y dedos antes de empezar, junto a pausas de descanso ocular de 1 minuto entre series, estimula la mielinización de las conexiones nerviosas de forma mucho más eficaz que sesiones maratonianas esporádicas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Los tests y ejercicios de reacción de SkillDrills funcionan con precisión en dispositivos móviles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Todos los ejercicios de SkillDrills están adaptados tanto para pantallas táctiles en móviles como para ratón en ordenador. No obstante, las pantallas táctiles capacitivas de los teléfonos añaden físicamente una latencia de hardware táctil de unos 20 a 40 ms. Por ello, para mediciones absolutas en milisegundos y entrenamientos de microajustes competitivos se recomienda utilizar un PC con monitor de 144 Hz o superior, mientras que el móvil es una herramienta fantástica para estimulación cognitiva y calentamiento de reflejos en cualquier lugar."
      }
    }
  ]
};

export default function SpanishReactionHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ReactionSpeedDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

