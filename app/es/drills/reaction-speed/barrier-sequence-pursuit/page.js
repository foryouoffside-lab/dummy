import BarrierSequencePursuitClient from '@/app/drills/reaction-speed/barrier-sequence-pursuit/BarrierSequencePursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – es-ES (reaction-speed / barrier-sequence-pursuit)
// PRIMARY DOMESTIC: "entrenador de jiggle peek" / "mantener angulos fps"
// SECONDARY / LSI:
//   "ventaja del peeker" / "mira de retencion fps"
//   "asomarse de hombro" / "contra strafe entrenamiento"
// ============================================================

export const metadata = {
  title: 'Entrenador de Jiggle Peek – Mantener Ángulos | SkillDrills',
  description: 'Entrenador de jiggle peek y ángulos online gratis. Domina cómo contrarrestar la ventaja del peeker y optimizar el offset de mira en el navegador.',
  keywords: [
    'entrenador de jiggle peek',
    'mantener angulos fps',
    'ventaja del peeker',
    'mira de retencion fps',
    'asomarse de hombro',
    'contra strafe entrenamiento',
    'posicionamiento de mira',
    'tiempo de reaccion esquinas',
    'offset de mira cs2',
    'entrenamiento de punteria valorant',
    'ejercicios de reflejos esquinas',
    'peeking defensivo online',
  ],
  openGraph: {
    title: 'Entrenador de Jiggle Peek – Mantener Ángulos | SkillDrills',
    description: 'Entrenador de jiggle peek y ángulos online gratis. Domina cómo contrarrestar la ventaja del peeker y optimizar el offset de mira en el navegador.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entrenador de Jiggle Peek – Mantener Ángulos | SkillDrills',
    description: 'Entrenador de jiggle peek y ángulos online gratis. Domina cómo contrarrestar la ventaja del peeker y optimizar el offset de mira en el navegador.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/barrier-sequence-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Ejercicios', item: 'https://skilldrills.online/es/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidad de Reacción', item: 'https://skilldrills.online/es/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Entrenador de Jiggle Peek', item: 'https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Entrenador de Jiggle Peek – Retención de Ángulos y Reflejos',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Entrenamiento online para mantener ángulos defensivos, contrarrestar la ventaja del peeker y optimizar el offset de retícula.',
  url: 'https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'es-ES',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Entrenador de Jiggle Peek',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, navegador moderno con soporte para Pointer Lock',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit',
  inLanguage: 'es-ES',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jiggle Peek Trainer – Juego de Retención de Ángulos y Coberturas',
  url: 'https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit',
  description: 'Juego de puntería táctica para perfeccionar el tiempo de reacción en esquinas y dominar el contra-strafe en shooters.',
  genre: ['Acción', 'Entrenador de Puntería', 'Shooter Táctico'],
  gamePlatform: ['Navegador Web', 'Escritorio'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es un entrenador de jiggle peek?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es una herramienta de reflejos diseñada para simular asomadas rápidas de hombro tras coberturas y la retención defensiva de ángulos estrechos en shooters tácticos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es la ventaja del peeker (peeker’s advantage)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es el desfase temporal originado por el ping de red y la interpolación del servidor (deWet & Straily, 2020), que permite a quien se asoma ver al defensor estático unos milisegundos antes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se debe mantener un ángulo para contrarrestar la ventaja del peeker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nunca pegues la mira justo al borde de la pared. Separa la retícula la distancia equivalente a 100-150 ms de reacción humana para que el enemigo se cruce directamente con tu disparo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué aporta la cronometría mental de Donders (1868) al aguante de ángulos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Donders demostró que el procesamiento del estímulo visual y el envío de la orden motora exigen al menos 200 ms. El offset de mira compensa exactamente ese retardo neurológico.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué es tan eficaz el shoulder peek (asomarse de hombro)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Muestra solo el hombro durante 50-100 ms para provocar el disparo de los francotiradores enemigos sin arriesgar la caja de impacto de la cabeza.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el contra-strafe en shooters tácticos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consiste en frenar la inercia del movimiento pulsando al instante la tecla direccional opuesta, lo que restablece de inmediato la máxima precisión del primer disparo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué la colocación anticipada de la mira ahorra tiempo de reacción?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evita tener que realizar un ajuste manual o flick. En lugar de mover el ratón en 2D, el disparo se convierte en un simple clic sincronizado en el tiempo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo afecta la frecuencia de actualización del monitor a la retención de esquinas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una pantalla de 240 Hz actualiza la imagen cada 4,1 ms frente a los 16,7 ms de 60 Hz (Woods et al., 2015), otorgando un margen superior para reaccionar ante salidas veloces.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo diario conviene practicar jiggle peek?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '10 minutos al día combinando el aguante de ángulos cerrados y asomadas rápidas bastan para afianzar la memoria muscular del espaciado de mira correcto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Este entrenador de ángulos es gratuito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, SkillDrills ofrece esta herramienta de forma 100% gratuita directamente en el navegador, sin descargas, registros ni suscripciones.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo Entrenar Jiggle Peek y Retención de Ángulos',
  description: 'Guía práctica en 4 pasos para dominar el espaciado de retícula, compensación de reacción y disparos defensivos.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Configurar geometría de la cobertura y apertura de ángulo',
      text: 'Ajuste la posición del muro conforme a los cuellos de botella habituales de su juego táctico preferido.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Aplicar offset de mira para el tiempo de reacción',
      text: 'Coloque la retícula ligeramente separada del borde de la pared para compensar su tiempo de procesamiento visual.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Fijar la atención en el umbral de aparición',
      text: 'Mantenga la vista firmemente enfocada en el borde de la cobertura para detectar el primer píxel del objetivo al asomar.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Disparar en el milisegundo de intersección',
      text: 'Accione el clic certero en el instante exacto en que el blanco cruza su plano de mira, sin intentar rectificar con la mano.',
      url: 'https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'dewet2020', 'kosinski2008', 'woods2015'),
  intro: {
    title: 'Guía de Jiggle Peek y Retención Defensiva de Ángulos',
    paragraphs: [
      'En shooters tácticos como Valorant o Counter-Strike, sostener una posición defensiva entraña un desafío crítico. El error más repetido entre jugadores de todos los niveles es pegar la retícula milimétricamente al borde de la pared, quedando indefensos ante la ventaja del peeker (deWet & Straily, 2020).',
      'La cronometría mental de Donders (1868) certifica que el cerebro humano requiere en torno a 200 ms para transformar un estímulo óptico en una pulsación digital. Los mejores tiradores compensan este margen distanciando la retícula el recorrido exacto que el rival completará durante esos 200 ms.',
      'Este ejercicio entrena el tiempo de disparo en pantallas de alta frecuencia de refresco (Woods et al., 2015), convirtiendo la defensa de esquinas en un disparo certero y reactivo.',
    ],
  },
  benchmarks: {
    title: 'Tabla de Rendimiento en Retención de Ángulos y Coberturas',
    headers: ['Nivel (Tier)', 'Clasificación', 'Tiempo de Retención', 'Precisión de Clic', 'Percentil'],
    rows: [
      ['Tier 1', 'Grandmaster / Pro', '< 150 ms', '98 %+', 'Top 1 %'],
      ['Tier 2', 'Elite / Master', '150 – 190 ms', '94 – 97 %', 'Top 5 %'],
      ['Tier 3', 'Pro / Diamond', '191 – 240 ms', '88 – 93 %', 'Top 15 %'],
      ['Tier 4', 'Intermedio / Gold', '241 – 310 ms', '78 – 87 %', 'Top 50 %'],
      ['Tier 5', 'Principiante / Silver', '> 310 ms', '< 78 %', 'Base'],
    ],
    note: 'Clasificación calculada a partir de estudios de tiempo de reacción (Donders, 1868; Kosinski, 2008) y retardos de red en videojuegos (deWet & Straily, 2020).',
  },
  protocols: {
    title: 'Protocolos de Entrenamiento en 4 Fases',
    description: 'Secuencia metódica para afianzar el reflejo neuromotor de retención en esquinas.',
    items: [
      {
        title: 'Configurar geometría de la cobertura y apertura de ángulo',
        description: 'Ajuste la posición del muro conforme a los cuellos de botella habituales de su juego táctico preferido.',
      },
      {
        title: 'Aplicar offset de mira para el tiempo de reacción',
        description: 'Coloque la retícula ligeramente separada del borde de la pared para compensar su tiempo de procesamiento visual.',
      },
      {
        title: 'Fijar la atención en el umbral de aparición',
        description: 'Mantenga la vista firmemente enfocada en el borde de la cobertura para detectar el primer píxel del objetivo al asomar.',
      },
      {
        title: 'Disparar en el milisegundo de intersección',
        description: 'Accione el clic certero en el instante exacto en que el blanco cruza su plano de mira, sin intentar rectificar con la mano.',
      },
    ],
  },
  faqs: {
    title: 'Preguntas Frecuentes (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function SpanishBarrierSequencePursuitPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BarrierSequencePursuitClient copy={{ title: 'Entrenador de Jiggle Peek' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/es/drills/reaction-speed/barrier-sequence-pursuit"
        />
      </div>
    </>
  );
}
