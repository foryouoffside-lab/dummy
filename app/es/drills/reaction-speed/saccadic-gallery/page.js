import SaccadicGalleryClient from '@/app/drills/reaction-speed/saccadic-gallery/SaccadicGalleryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — es-ES / LATAM (reaction-speed / saccadic-gallery)
// PRIMARY DOMESTIC: "ejercicios sacadicos online" / "movimientos sacadicos"
// SECONDARY / LSI:
//   "entrenamiento sacadico" / "saltos oculares rapidos" / "escaneo visual"
//   "agilidad visual ocular" / "velocidad de reaccion visual"
// ============================================================

export const metadata = {
  title: 'Ejercicios Sacádicos Online – Saltos Oculares | SkillDrills',
  description:
    'Ejercicios sacádicos online gratis. Entrena saltos oculares rápidos para mejorar el escaneo visual y la adquisición de blancos en el navegador.',
  keywords: [
    'ejercicios sacadicos online',
    'movimientos sacadicos',
    'entrenamiento sacadico',
    'saltos oculares rapidos',
    'escaneo visual',
    'agilidad visual ocular',
    'velocidad de reaccion visual',
    'coordinacion ocular',
    'adquisicion de blancos',
    'fijacion foveal',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/reaction-speed/saccadic-gallery',
    languages: getAlternateLanguages('/drills/reaction-speed/saccadic-gallery'),
  },
  openGraph: {
    title: 'Ejercicios Sacádicos Online – Saltos Oculares | SkillDrills',
    description:
      'Ejercicios sacádicos online gratis. Entrena saltos oculares rápidos para mejorar el escaneo visual y la puntería foveal.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/reaction-speed/saccadic-gallery',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ejercicios Sacádicos Online – Saltos Oculares | SkillDrills',
    description:
      'Ejercicios sacádicos online gratis. Acelera tus saltos oculares y reflejos visuales en el navegador.',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Panel de Ejercicios', item: 'https://skilldrills.online/es/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidad de Reacción', item: 'https://skilldrills.online/es/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Ejercicios Sacádicos', item: 'https://skilldrills.online/es/drills/reaction-speed/saccadic-gallery' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Ejercicios Sacádicos Online – Entrenamiento de Saltos Oculares',
  alternateName: ['Entrenamiento Sacádico Online', 'Simulador de Movimientos Sacádicos', 'Test de Agilidad Visual Ocular'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Herramienta científica interactiva para entrenar la velocidad de los saltos oculares (sacadas), fijación foveal y escaneo periférico en pantalla.',
  browserRequirements: 'Navegador moderno con soporte para HTML5 Canvas y JavaScript',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Ejercicios Sacádicos Online — Saltos Oculares | SkillDrills',
  url: 'https://skilldrills.online/es/drills/reaction-speed/saccadic-gallery',
  description:
    'Entrenamiento sacádico gratuito en el navegador para aumentar la velocidad de salto ocular y la puntería foveal.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requiere navegador moderno con JavaScript activado.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Movimientos sacádicos, Saltos oculares, Fijación foveal, Escaneo visual, Tiempo de reacción',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Ejercicios Sacádicos - Juego de Reflejos Oculares',
  url: 'https://skilldrills.online/es/drills/reaction-speed/saccadic-gallery',
  description: 'Juego interactivo para medir y afilar la velocidad de saltos oculares y reflejos visuales en el navegador.',
  genre: ['Vision Training', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo realizar ejercicios sacádicos y acelerar los saltos oculares',
  description: 'Guía paso a paso para mejorar la transición de la mirada entre blancos y reducir la latencia sacádica.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Posicionamiento y fijación central',
      text: 'Siéntate a unos 50–70 cm de la pantalla y centra la vista en el punto de partida inicial.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/saccadic-gallery#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Detectar el destello periférico',
      text: 'Mantén la cabeza quieta y percibe la aparición de la diana en la visión periférica sin mover el cuello.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/saccadic-gallery#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Disparar el salto sacádico',
      text: 'Mueve ambos ojos de forma balística y rectilínea hacia las coordenadas del blanco.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/saccadic-gallery#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Fijación foveal y clic de confirmación',
      text: 'Centra la fóvea con nitidez en el blanco y pulsa de inmediato para registrar la latencia.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/saccadic-gallery#step-4',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-15',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué son los ejercicios sacádicos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Son entrenamientos visuales dirigidos a incrementar la velocidad, la precisión y la reactividad de los saltos balísticos de los ojos (sacadas) entre puntos de fijación en el campo visual.',
      },
    },
    {
      '@type': 'Question',
      name: '¿A qué velocidad se mueven los ojos durante una sacada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La velocidad angular de una sacada puede superar los 200 a 700 grados por segundo, convirtiéndose en uno de los movimientos biológicos más veloces del cuerpo humano (Rayner, 1998).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué son las sacadas exprés (Fischer & Boch, 1984)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Son saltos oculares de latencia hiperreducida (~100–120 ms) generados a través de vías subcorticales del colículo superior cuando se libera la inhibición de la fijación previa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo beneficia el entrenamiento sacádico a los jugadores de FPS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En juegos como Valorant y CS2, sacadas más rápidas permiten explorar esquinas, leer el minimapa y apuntar a enemigos imprevistos con el menor tiempo posible de supresión visual.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es la supresión sacádica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es un mecanismo protector cerebral que interrumpe temporalmente la captación visual consciente durante el salto del ojo (20–40 ms) para impedir imágenes borrosas y mareos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué se entiende por dismetría sacádica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ocurre cuando el ojo frena antes de tiempo (hipometría) o sobrepasa el objetivo (hipermetría), requiriendo micro-sacadas de corrección que restan valiosas milésimas de segundo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Influye la tasa de refresco del monitor en el entrenamiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Monitores de 144 Hz o 240 Hz renderizan estímulos con solo 4 a 7 ms de desfase (Woods et al., 2015), facilitando una detección retiniana más temprana.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pueden estos ejercicios mejorar la velocidad de lectura?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Un control sacádico fluido optimiza el paso de renglón a renglón y reduce regresiones involuntarias de la mirada al procesar texto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Con qué frecuencia se debe entrenar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De 5 a 10 minutos al día es lo óptimo. Series breves pero sumamente concentradas estimulan la plasticidad neuronal sin fatigar la musculatura ocular.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Este simulador sacádico es gratuito y en el navegador?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La herramienta de SkillDrills es 100 % gratuita, se ejecuta directamente en el navegador y registra los tiempos mediante la API High Resolution Time (performance.now()).',
      },
    },
  ],
};

const saccadicGuide = {
  heading: 'Guía de Ejercicios Sacádicos: Velocidad de Saltos Oculares y Fijación Foveal',
  intro: [
    'Los movimientos sacádicos son desplazamientos balísticos hiperveloces que trasladan el centro de la mirada de un punto de fijación a otro (Rayner, 1998; Fischer & Boch, 1984).',
    'Con velocidades que alcanzan los 700°/s, el cerebro activa la supresión sacádica para neutralizar el desenfoque en la retina. Si la mirada no frena exactamente en el blanco (dismetria sacádica), se requerirán micro-sacadas correctoras que añadirán retrasos sensibles. Este ejercicio busca afinar la frenada ocular en un único salto definitivo.',
    'Metodología en navegador: todos los cálculos se realizan localmente mediante la High Resolution Time API (performance.now()). Se deben tener en cuenta las latencias del monitor (~16,7 ms a 60 Hz, ~6,9 ms a 144 Hz y ~4,1 ms a 240 Hz; Woods et al., 2015) y el sondeo del ratón. Variaciones por debajo de 5 ms corresponden a ruido estadístico.',
    'Entrena de forma continuada en el mismo entorno para monitorizar fielmente tus avances en agilidad visual y reflejos oculares.',
  ],
  benchmarks: {
    title: 'Tabla de Rendimiento en Latencia Sacádica y Precisión',
    headers: ['Latencia Sacádica', 'Clasificación', 'Dinámica del Salto Ocular', 'Contexto Funcional', 'Foco Recomendado'],
    rows: [
      ['< 130 ms', 'Nivel 1 (Sacadas Exprés / Pro)', 'Disparo subcortical vía colículo superior; mínima inhibición', 'Deportistas profesionales y pilotos de caza (Fischer & Boch, 1984)', 'Entrenar amplitud máxima de salto visual'],
      ['130 – 170 ms', 'Nivel 2 (Élite)', 'Activación cortical veloz; sin titubeos de fijación', 'Competidores de alto nivel en deportes de reacción', 'Consolidar precisión de parada sin sobrepasar el blanco'],
      ['171 – 220 ms', 'Nivel 3 (Avanzado / Estándar)', 'Latencia saludable de referencia para adultos', 'Promedio esperado en adultos sanos (Rayner, 1998)', 'Expandir el radio de percepción periférica'],
      ['221 – 280 ms', 'Nivel 4 (Intermedio)', 'Demora al soltar la fijación previa; leve retraso', 'Fatiga ocasional o recuperación incompleta', 'Hacer pausas 20-20-20 para descansar la vista'],
      ['> 280 ms', 'Nivel 5 (Base / Dismetría)', 'Dismetría sacádica visible con múltiples correcciones', 'Músculos oculares fatigados o distracciones en pantalla', 'Priorizar aterrizaje exacto antes que acelerar'],
    ],
    note: 'Clasificación basada en estudios de oculomotricidad (Rayner, 1998; Fischer & Boch, 1984; Leigh & Zee, 2015) adaptada para monitores digitales (Woods et al., 2015).',
  },
  techniques: {
    title: 'Técnicas para Maximizar la Velocidad de los Saltos Oculares',
    items: [
      {
        name: 'Aislar el Movimiento de la Cabeza',
        desc: 'Mueve exclusivamente los globos oculares, manteniendo cabeza y cuello inmóviles. Los saltos puramente oculares son dos veces más veloces que girar la cabeza.',
        tips: 'Apoya el mentón sobre la mano si notas que giras la cara sin darte cuenta.',
      },
      {
        name: 'Percepción Periférica Anticipada',
        desc: 'Usa la retina periférica para ubicar la posición del blanco antes de lanzar el desplazamiento foveal.',
        tips: 'Mantén una mirada suave y abierta sobre el centro de la pantalla.',
      },
      {
        name: 'Freno Ocular Preciso (Stopping Power)',
        desc: 'Evita sobrepasar el blanco o frenar antes: anclar la mirada en el centro exacto elimina sacadas de ajuste.',
        tips: 'Afinar la frenada ahorra más tiempo que precipitarse con torpeza.',
      },
      {
        name: 'Hidratación y Descanso Ocular',
        desc: 'La concentración fija ante el monitor reduce el parpadeo hasta un 60 %, causando sequedad y lentitud muscular.',
        tips: 'Parpadea conscientemente entre series y mira hacia el horizonte.',
      },
    ],
  },
  steps: [
    'Siéntate alineado al centro del monitor a unos 60 cm de distancia.',
    'Comienza el ejercicio y fija la vista en el marcador inicial central.',
    'En cuanto un blanco destelle en el campo visual, lanza los ojos rápidamente sobre él.',
    'Centra la fóvea en el centro de la diana y pulsa para registrar la latencia.',
    'Completa la sesión y consulta tu latencia sacádica media.',
  ],
  audience: 'Jugadores de shooters (Valorant, CS2, Apex Legends), pilotos, deportistas de reacción y cualquier persona interesada en entrenar su agudeza visual y reflejos oculares.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rayner1998', 'fischer1984', 'leigh2015', 'woods2015'),
  related: [
    { href: '/es/drills/reaction-speed', label: 'Panel de Velocidad de Reacción' },
    { href: '/es/drills/reaction-speed/reaction-time-test', label: 'Test de Tiempo de Reacción' },
    { href: '/es/drills/reaction-speed/reflex-training-drill', label: 'Juego de Reflejos (Multi-Objetivo)' },
    { href: '/es/drills/reaction-speed/visual-tracking-speed-test', label: 'Test de Seguimiento Visual' },
  ],
};

export default function SpanishSaccadicGalleryPage() {
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
      <SaccadicGalleryClient copy={{ title: 'Ejercicios Sacádicos Online' }} />
      <DrillGuide guide={saccadicGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="reaction-speed" currentHref="https://skilldrills.online/es/drills/reaction-speed/saccadic-gallery" />
      </div>
    </>
  );
}
