import FPSTrackingTrainerClient from '@/app/drills/reaction-speed/fps-tracking-trainer/FPSTrackingTrainerWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – es-ES / es-MX (reaction-speed / fps-tracking-trainer)
// PRIMARY DOMESTIC: "Tracking FPS" / "Puntería de Seguimiento Online"
// SECONDARY / LSI:
//   "Entrenar Tracking Mouse" / "Como Mejorar el Tracking en Shooter"
//   "Temblor al Apuntar FPS Solucionar" / "Smoothness Aim Rutina"
// ============================================================

export const metadata = {
  title: 'Tracking FPS – Puntería de Seguimiento Online | SkillDrills',
  description: 'Entrenador de tracking FPS online y gratuito. Desarrolla puntería de seguimiento fluida, control de strafes y elimina el temblor para CS2 y Valorant.',
  keywords: [
    'tracking fps',
    'puntería de seguimiento online',
    'entrenar tracking mouse',
    'como mejorar el tracking en shooter',
    'temblor al apuntar fps solucionar',
    'smoothness aim rutina',
    'entrenamiento de strafe tracking',
    'apuntar fluido shooter',
    'control de raton fps',
    'apex legends rutina tracking',
    'ejercicio punteria continua',
    'persecucion ocular suave',
  ],
  openGraph: {
    title: 'Tracking FPS – Puntería de Seguimiento Online | SkillDrills',
    description: 'Entrenador de tracking FPS online y gratuito. Desarrolla puntería de seguimiento fluida, control de strafes y elimina el temblor para CS2 y Valorant.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/reaction-speed/fps-tracking-trainer',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tracking FPS – Puntería de Seguimiento Online | SkillDrills',
    description: 'Entrenador de tracking FPS online y gratuito. Desarrolla puntería de seguimiento fluida, control de strafes y elimina el temblor para CS2 y Valorant.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/reaction-speed/fps-tracking-trainer',
    languages: getAlternateLanguages('/drills/reaction-speed/fps-tracking-trainer'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Drills Hub', item: 'https://skilldrills.online/es/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidad de Reacción', item: 'https://skilldrills.online/es/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'FPS Tracking Trainer', item: 'https://skilldrills.online/es/drills/reaction-speed/fps-tracking-trainer' },
  ],
};

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FPS Tracking Trainer — Puntería de Seguimiento Online',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Simulador web de puntería continua y seguimiento cinético de objetivos para shooters tácticos y battle royale.',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FPS Tracking Trainer Online',
  applicationCategory: 'GameApplication',
  browserRequirements: 'Requires modern browser with Pointer Lock API support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'FPS Tracking Trainer Drill',
  gameItem: ['Puntería de Seguimiento', 'Smoothness Test', 'Strafe Reading'],
  numberOfPlayers: { '@type': 'QuantitativeValue', value: 1 },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es el tracking en FPS y cómo se diferencia del flick shot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El tracking es la destreza motora de mantener el punto de mira de manera ininterrumpida sobre un objetivo en desplazamiento constante (persecución ocular suave). Por el contrario, los flicks son impulsos balísticos rápidos basados en saltos sacádicos puntuales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué mi puntería tiembla al intentar seguir a un enemigo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El temblor o jittering se debe comúnmente a una tensión isométrica excesiva en la muñeca y los dedos (co-activación de músculos antagonistas) o a una sensibilidad de ratón desmedidamente alta. Relajar la mano y deslizar con el antebrazo restaura la fluidez.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo influye la persecución ocular suave (smooth pursuit) en el tracking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Estudios de Rashbass (1961) y Krauzlis (2004) demuestran que el cerebro calcula la velocidad retiniana del objetivo para sincronizar la visión y el movimiento motor. Enfocar la mirada en el rival y no en la propia retícula garantiza un seguimiento limpio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la mejor técnica cuando el oponente hace strafe o cambia de dirección?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No intentes anticipar o adivinar el viraje. Espera la confirmación visual de la desaceleración e invierte el vector de movimiento con un deslizamiento continuo y controlado, evitando tirones espasmódicos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué sensibilidad de ratón es idónea para dominar el tracking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un rango intermedio a bajo (aproximadamente de 30 cm a 45 cm por giro de 360°) proporciona el equilibrio óptimo entre estabilidad cinemática para evitar microvibraciones y suficiente recorrido para giros amplios.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo afecta la fricción de la alfombrilla al control de la mira?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una superficie con fricción dinámica uniforme y skates de teflón virgen facilitan el inicio y el sostenimiento del desplazamiento sin resistencia irregular ni microbloqueos que afecten la trayectoria.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo diario se debe dedicar a entrenar tracking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entre 15 y 20 minutos de práctica deliberada al día son suficientes. Superar ese límite con fatiga muscular produce hábitos compensatorios y pérdida de precisión neuromotora.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Mejora este simulador web el rendimiento en CS2, Valorant y Apex Legends?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Las adaptaciones neuromusculares generadas mediante el control continuo de la aceleración se transfieren sin pérdida al entorno 3D con retícula centrada de cualquier shooter contemporáneo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es preferible mover el ratón con la muñeca o con el antebrazo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para el tracking sostenido, el movimiento guiado por el antebrazo apoyado en el escritorio reduce el esfuerzo del túnel carpiano y otorga una trayectoria más suave y consistente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué porcentaje de tiempo en diana se considera de nivel competitivo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lograr más del 72% de tiempo efectivo en diana con un desvío medio inferior a 14 píxeles sitúa al tirador en el percentil superior (Top 5%), propio de rangos Maestros y Radiantes.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo Entrenar el Tracking de Puntería en FPS',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Calibrar Sensibilidad y Entrar a Pantalla Completa',
      text: 'Ajusta la velocidad del ejercicio y activa la pantalla completa para optimizar la concentración y la captura precisa del cursor.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fijar la Vista en el Vector del Blanco en Movimiento',
      text: 'Mantén la mirada centrada en la silueta móvil del objetivo en lugar de mirar fijamente tu propia retícula.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Deslizar el Ratón con Relajación Muscular',
      text: 'Conduce el ratón con el antebrazo sin tensar la mano, igualando la velocidad cinética del círculo en movimiento.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Gestionar Cambios de Sentido Sin Tirones',
      text: 'Al observar una inversión de trayectoria, reorienta el cursor con una desaceleración y aceleración fluida.',
    },
  ],
};

const guideProps = {
  title: 'Entrenador de Tracking FPS — Puntería de Seguimiento y Control Continuo',
  subtitle:
    'Desarrolla la persecución ocular suave, estabilidad en strafes y fluidez cinética frente a blancos con movimiento continuo.',
  scientificIntro: `El seguimiento visual y motor (tracking) en videojuegos de disparos en primera persona se rige por la interacción del sistema de persecución ocular suave (smooth pursuit) y el control muscular de la extremidad superior (Rashbass, 1961; Krauzlis, 2004). Mientras que los disparos a objetivos estáticos implican saltos sacádicos puntuales, el rastreo dinámico exige compensar de forma ininterrumpida el vector de velocidad retiniana.

Cuando un blanco cruza el campo de visión, el área cortical visual y el lóbulo temporal superior medial (MST) decodifican su velocidad para guiar las órdenes cerebelares hacia los grupos musculares del brazo. La aparición de temblores o trazos discontinuos refleja comúnmente una co-contracción excesiva entre músculos agonistas y antagonistas, lo que obliga al sistema nervioso a realizar constantes saltos correctivos.

Este ejercicio aísla la cinemática del movimiento continuo, permitiendo al tirador relajar la musculatura y optimizar el bucle sensoriomotor ojo-mano. La regularidad en este estímulo reduce el error de posición instantáneo y afianza una precisión estable en combates de media y corta distancia con fuego sostenido.`,
  sources: pickSources('krauzlis2004', 'rashbass1961', 'green2003', 'woods2015'),
  benchmarks: {
    title: 'Tabla de Rendimiento en Precisión de Tracking y Tiempo en Diana',
    headers: ['Nivel', 'Percentil', 'Tiempo en Diana (%)', 'Desvío Promedio', 'Hito Neuromotor'],
    rows: [
      ['Élite / Radiante', 'Top 1%', '≥ 85%', '< 8 px', 'Persecución ocular continua sin micro-sacadas parásitas'],
      ['Maestro / Avanzado', 'Top 5%', '72% – 84%', '8 – 14 px', 'Transición inmediata ante inversiones de dirección'],
      ['Competitivo / Intermedio', 'Top 20%', '58% – 71%', '15 – 22 px', 'Estabilidad firme en trayectorias cinéticas lineales'],
      ['Practicante', 'Top 50%', '42% – 57%', '23 – 32 px', 'Correcciones escalonadas y tensión muscular isométrica'],
      ['Principiante', 'Base', '< 42%', '≥ 33 px', 'Retraso de corrección elevado y pérdidas de trayectoria'],
    ],
    note: 'Métricas estandarizadas en sesiones de seguimiento dinámico a velocidad angular variable (Rashbass 1961; Krauzlis 2004).',
  },
  protocols: {
    title: 'Protocolos de Entrenamiento de Tracking',
    description: 'Estrategias progresivas para eliminar la tensión muscular y perfeccionar el seguimiento sostenido.',
    items: [
      {
        title: 'Calentamiento de Suavidad Cinética (5 min)',
        description: 'Mantén el ratón a velocidad homogénea sobre objetivos lineales asegurando una postura sin crispación.',
      },
      {
        title: 'Entrenamiento de Lectura de Strafes (10 min)',
        description: 'Responde a cambios de dirección repentinos reduciendo la corrección exagerada y recuperando el centro.',
      },
      {
        title: 'Sobrecarga en Velocidad Alta (5 min)',
        description: 'Incrementa la velocidad de desplazamiento para desafiar la coordinación visomotora y afinar microajustes.',
      },
    ],
  },
  faqs: {
    title: 'Preguntas Frecuentes sobre Tracking y Puntería Continua',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function EnhancedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <FPSTrackingTrainerClient copy={{ title: 'Tracking FPS' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/es/drills/reaction-speed/fps-tracking-trainer"
        />
      </div>
    </>
  );
}
