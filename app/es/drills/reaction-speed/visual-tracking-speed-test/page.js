import VisualTrackingSpeedTestWrapper from '@/app/drills/reaction-speed/visual-tracking-speed-test/VisualTrackingSpeedTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — es-ES / LATAM (reaction-speed / visual-tracking-speed-test)
// PRIMARY DOMESTIC: "test de seguimiento visual" / "agudeza visual dinamica"
// SECONDARY / LSI:
//   "test de reflejos visuales" / "persecucion ocular suave"
//   "velocidad de reaccion visual" / "coordinacion ojo mano"
// ============================================================

export const metadata = {
  title: 'Test de Seguimiento Visual – Agilidad Ocular | SkillDrills',
  description:
    'Test de seguimiento visual online gratis. Sigue objetivos en movimiento con la mirada y mide tus reflejos oculares y velocidad de reacción en el navegador.',
  keywords: [
    'test de seguimiento visual',
    'agudeza visual dinamica',
    'test de reflejos visuales',
    'persecucion ocular suave',
    'velocidad de reaccion visual',
    'coordinacion ojo mano',
    'movimientos sacadicos',
    'agilidad visual',
    'reflejos oculares',
    'entrenar reflejos visuales',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/reaction-speed/visual-tracking-speed-test',
    languages: getAlternateLanguages('/drills/reaction-speed/visual-tracking-speed-test'),
  },
  openGraph: {
    title: 'Test de Seguimiento Visual – Reflejos y Agudeza | SkillDrills',
    description:
      'Test de seguimiento visual y agudeza dinámica online gratis. Mide tu velocidad de persecución ocular y reflejos en el navegador.',
    url: 'https://skilldrills.online/es/drills/reaction-speed/visual-tracking-speed-test',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Seguimiento Visual – Reflejos y Agudeza | SkillDrills',
    description:
      'Test online de seguimiento visual y agudeza dinámica. Entrena tus reflejos y movimientos sacádicos sin descargas.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Panel de Ejercicios', item: 'https://skilldrills.online/es/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidad de Reacción', item: 'https://skilldrills.online/es/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Test de Seguimiento Visual', item: 'https://skilldrills.online/es/drills/reaction-speed/visual-tracking-speed-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Seguimiento Visual – Reflejos y Agudeza Dinámica',
  alternateName: ['Test de Rastreo Ocular', 'Simulador de Agudeza Visual Dinámica', 'Test de Reflejos Oculares'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Herramienta interactiva para medir la persecución ocular suave, las sacadas correctoras y la latencia de intercepción ante estímulos visuales cinéticos.',
  browserRequirements: 'Navegador moderno con soporte para JavaScript (Chrome, Edge, Safari, Firefox)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Test de Seguimiento Visual — Reflejos y Agudeza | SkillDrills',
  url: 'https://skilldrills.online/es/drills/reaction-speed/visual-tracking-speed-test',
  description:
    'Test de reflejos visuales gratuito para entrenar persecución ocular suave, agudeza visual dinámica y sacadas directamente en el navegador.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requiere un navegador moderno con soporte JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Seguimiento visual, Persecución ocular suave, Sacadas correctoras, Agudeza visual dinámica, Coordinación ojo-mano',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Test de Seguimiento Visual - Juego de Agilidad y Reflejos',
  url: 'https://skilldrills.online/es/drills/reaction-speed/visual-tracking-speed-test',
  description: 'Juego interactivo para medir la velocidad de seguimiento visual y reflejos motores.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo entrenar la velocidad de seguimiento visual',
  description: 'Guía práctica para afinar la persecución foveal y reducir la latencia de sacadas correctoras.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Iniciar el ejercicio',
      text: 'Pulsa en «Iniciar Ejercicio» para activar la arena de seguimiento visual en pantalla completa.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/visual-tracking-speed-test#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fijar la mirada en la diana móvil',
      text: 'Mantén la fóvea ocular centrada en la esfera móvil mientras se desplaza suavemente por la arena.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/visual-tracking-speed-test#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Interceptar cambios bruscos de trayectoria',
      text: 'Cuando el objetivo cambie repentinamente de rumbo o velocidad, lanza una sacada correctora y recentra el cursor.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/visual-tracking-speed-test#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analizar la latencia de re-adquisición',
      text: 'Revisa tu tiempo medio de re-adquisición (ms) y tu puntuación de estabilidad ocular.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/visual-tracking-speed-test#step-4',
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
      name: '¿Qué mide este test de seguimiento visual?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evalúa la fluidez y precisión con la que los ojos siguen objetos dinámicos (persecución ocular suave) y la velocidad a la que disparan sacadas correctoras cuando el objetivo acelera o cambia de dirección bruscamente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre persecución ocular suave y sacadas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La persecución suave es un movimiento voluntario continuo que mantiene un objeto en movimiento centrado en la fóvea (típicamente hasta 30°–60°/s; Krauzlis, 2004). Las sacadas son saltos balísticos de enorme velocidad (200°–700°/s) que reorientan la mirada cuando el objetivo se acelera de golpe (Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Un examen de agudeza visual estándar (20/20) detecta problemas de seguimiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Los exámenes oftalmológicos tradicionales miden la agudeza estática con letras inmóviles. No evalúan el control oculomotor dinámico ni la velocidad de re-adquisición de objetivos cinéticos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué factores ralentizan el seguimiento visual y los reflejos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La fatiga de los músculos extraoculares por largas horas ante pantallas, falta de sueño, sequedad ocular o sobrecarga del sistema nervioso central aumentan la latencia de las sacadas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo afecta el seguimiento visual a los deportes y los videojuegos FPS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En deportes de pelota (tenis, béisbol) y shooters como Valorant o CS2, la velocidad de seguimiento determina la rapidez con la que se identifican las trayectorias evasivas y se alinea la mira (Land & McLeod, 2000).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se puede entrenar y mejorar la velocidad de seguimiento ocular?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El entrenamiento reiterado refuerza los circuitos corticales entre el área visual MT/V5, los campos oculares frontales (FEF) y el cerebelo, reduciendo la latencia y afinando la precisión.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué son las sacadas correctoras (Catch-up Saccades)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cuando el objetivo acelera superando la velocidad máxima del sistema de persecución suave, la imagen se desvía de la fóvea. El cerebro lanza una sacada correctora instantánea para cerrar la brecha posicional y volver a centrar el objetivo (Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Influye la tasa de refresco del monitor (Hz) en el test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Totalmente. Un monitor de 60 Hz muestra fotogramas cada 16,7 ms, mientras que uno de 144 Hz baja a 6,9 ms y uno de 240 Hz a 4,1 ms (Woods et al., 2015). Tasas altas eliminan el desenfoque de movimiento y revelan los cambios con mayor claridad.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo al día se recomienda entrenar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De 3 a 5 minutos diarios de práctica concentrada bastan para estimular la plasticidad neuromuscular sin sobrecargar los músculos ciliares de los ojos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Este test de seguimiento visual es gratuito y sin descargas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El test de SkillDrills es 100 % gratuito, se ejecuta en el navegador sin registros ni descargas y registra los tiempos mediante la API High Resolution Time (performance.now()).',
      },
    },
  ],
};

const visualTrackingGuide = {
  heading: 'Guía del Test de Seguimiento Visual: Persecución Ocular y Re-Adquisición de Objetivos',
  intro: [
    'La velocidad de seguimiento visual es la tasa a la que el sistema oculomotor y motor sigue desplazamientos dinámicos, detecta anomalías cinemáticas repentinas y realinea el enfoque foveal (Krauzlis, 2004; Land & McLeod, 2000).',
    'Este test mide tu capacidad de reacción ante giros y aceleraciones imprevistas del objetivo. Mientras el objeto se desplaza a velocidad constante, la mirada lo acompaña mediante persecución ocular suave (Smooth Pursuit). Si el objetivo quiebra su trayectoria de golpe, la persecución colapsa y el sistema nervioso central dispara una sacada correctora (Rashbass, 1961). El software registra la latencia de re-adquisición usando el reloj de alta precisión performance.now().',
    'Precisión de las mediciones y factores de hardware: todas las operaciones se realizan localmente en tu equipo. Los temporizadores del navegador se cuantifican a aproximadamente 1 ms por motivos de seguridad, y la tasa de refresco del monitor añade cuantización de fotogramas (~16,7 ms a 60 Hz, ~6,9 ms a 144 Hz y ~4,1 ms a 240 Hz; Woods et al., 2015). El polling rate del ratón añade ~8 ms a 125 Hz frente a ~1 ms a 1000 Hz. Las diferencias menores a 5 ms deben considerarse ruido de medición.',
    'Compara tus resultados siempre en el mismo equipo para monitorizar fielmente tus avances neuromusculares con el paso de las semanas.',
  ],
  benchmarks: {
    title: 'Tabla de Rendimiento en Seguimiento Visual y Re-Adquisición',
    headers: ['Latencia de Re-Adquisición', 'Clasificación Oculomotora', 'Mecánica de Persecución y Sacadas', 'Contexto Funcional', 'Enfoque de Entrenamiento'],
    rows: [
      ['< 180 ms', 'Re-Adquisición Predictiva Rápida', 'Realineamiento foveal casi instantáneo; proyección de trayectoria precisa', 'Pilotos de élite / Cazas / Jugadores profesionales (Land & McLeod, 2000)', 'Mantener relajación de la musculatura ocular en series largas'],
      ['180 – 230 ms', 'Persecución Dinámica de Alta Velocidad', 'Mínimo retraso de sacada correctora y rápida sincronización de velocidad', 'Deportes de pelota / Jugadores de alto rango (Krauzlis, 2004)', 'Afinar visión periférica para evitar sobrepasarse'],
      ['231 – 290 ms', 'Seguimiento Estándar Normal', 'Latencia fisiológica habitual para re-adquisición visual en adultos', 'Nivel de referencia saludable para adultos', 'Acondicionar músculos rectos extraoculares para cambios rápidos'],
      ['291 – 360 ms', 'Retraso / Fatiga Ocular', 'Demora apreciable al activar la sacada; el cursor queda rezagado', 'Tiempo excesivo ante pantallas, sequedad o bajo contraste', 'Aplicar regla 20-20-20; revisar tasa de refresco del monitor'],
      ['> 360 ms', 'Persecución Dismétrica / En Desarrollo', 'Múltiples micro-sacadas correctoras necesarias para recentrar', 'Músculos oculares no acondicionados o distracciones visuales', 'Priorizar trayectorias suaves antes de acelerar'],
    ],
    note: 'Clasificación basada en literatura científica de oculomotricidad y persecución suave (Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000) adaptada a entornos de visualización digital (Woods et al., 2015).',
  },
  techniques: {
    title: 'Técnicas para Maximizar el Seguimiento Visual',
    items: [
      {
        name: 'Persecución Suave vs. Sacadas Correctoras',
        desc: 'Con velocidades moderadas, mantén la mirada serena. Usa sacadas rápidas únicamente cuando ocurra un rebote o un desvío repentino.',
        tips: 'Evita anticiparte sin comprobar la trayectoria real del objetivo.',
      },
      {
        name: 'Mirada Anticipatoria (Anticipatory Gaze)',
        desc: 'En lugar de mirar la cola del objeto, ubica tu punto focal ligeramente por delante de su vector de desplazamiento.',
        tips: 'Espera a que el objetivo rebote en el borde antes de mover bruscamente el ratón.',
      },
      {
        name: 'Relajación de Muñeca y Antebrazo',
        desc: 'La tensión excesiva en la mano bloquea los micromovimientos de los dedos necesarios para ajustes finos a alta velocidad.',
        tips: 'Haz estiramientos suaves de muñeca y respira con calma entre rondas.',
      },
      {
        name: 'Optimización de la Agudeza Dinámica (DVA)',
        desc: 'La nitidez con la que percibes detalles en movimiento mejora notablemente con buena iluminación ambiental y monitores rápidos.',
        tips: 'Ajusta tu monitor al máximo refresco disponible (144 Hz o más) para reducir estelas.',
      },
    ],
  },
  steps: [
    'Siéntate a una distancia confortable de la pantalla (aproximadamente a la longitud de tu brazo).',
    'Haz clic en «Iniciar Ejercicio» y fija la vista en la esfera en movimiento.',
    'Acompaña el objetivo con suavidad a lo largo de su recorrido inicial.',
    'En cuanto la esfera varíe de dirección repentinamente, reacciona y centra el cursor.',
    'Al finalizar la prueba, examina tu tiempo medio de re-adquisición y tu consistencia.',
  ],
  audience: 'Jugadores de shooters (Valorant, CS2, Apex), pilotos, deportistas de raqueta y pelota, y cualquier persona interesada en mejorar su agudeza visual y reflejos motores.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('krauzlis2004', 'rashbass1961', 'land2000', 'woods2015'),
  related: [
    { href: '/es/drills/reaction-speed', label: 'Panel de Velocidad de Reacción' },
    { href: '/es/drills/reaction-speed/reaction-time-test', label: 'Test de Tiempo de Reacción' },
    { href: '/es/drills/reaction-speed/reflex-training-drill', label: 'Juego de Reflejos (Multi-Objetivo)' },
    { href: '/es/drills/reaction-speed/reaction-game', label: 'Juego de Reflejos y Reacción' },
  ],
};

export default function SpanishVisualTrackingSpeedTestPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VisualTrackingSpeedTestWrapper copy={{ title: 'Test de Seguimiento Visual' }} />
      <DrillGuide guide={visualTrackingGuide} />
    </>
  );
}
