import PrecisionFlickShotClient from '@/app/drills/motor/hand-eye-coordination/precision-flick-shot/PrecisionFlickShotClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Test de Flick Shot – Precisión con el Ratón | SkillDrills',
  description: 'Entrenador de flick shot online gratis: Mide precision de disparo, velocidad de adquisicion y aciertos en el blanco segun el modelo balistico en el navegador.',
  keywords: [
    'flick aim trainer',
    'test de flick shot',
    'precision de raton test',
    'entrenar punteria flick',
    'test de punteria fps',
    'entrenador de tiro rapido',
    'micro flick trainer',
    'precision raton valorant',
    'test de precision cs2',
    'disparo rapido raton',
    'entrenar reflejos raton',
    'flick shot online gratis',
  ],
  openGraph: {
    title: 'Test de Flick Shot – Precisión con el Ratón | SkillDrills',
    description: 'Entrenador de flick shot online gratis: Mide precision de disparo, velocidad de adquisicion y aciertos en el blanco segun el modelo balistico en el navegador.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/precision-flick-shot',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Flick Shot – Precisión con el Ratón | SkillDrills',
    description: 'Entrenador de flick shot online gratis: Mide precision de disparo, velocidad de adquisicion y aciertos en el blanco segun el modelo balistico en el navegador.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/precision-flick-shot',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/precision-flick-shot'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'SkillDrills Inicio',
      item: 'https://skilldrills.online/es',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Entrenamiento Motor',
      item: 'https://skilldrills.online/es/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Coordinación Ojo-Mano',
      item: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Flick Shot de Precisión',
      item: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/precision-flick-shot',
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Flick Shot y Precisión con Ratón',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Herramienta online gratuita para evaluar puntería balística, tiempo de adquisición y aciertos en la diana con progresión adaptativa.',
  url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/precision-flick-shot',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Entrenador de Flick Shot',
  browserRequirements: 'Requiere HTML5 Canvas y compatibilidad con JavaScript',
  url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/precision-flick-shot',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Juego de Flick Shot y Precisión de Puntería',
  url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/precision-flick-shot',
  description: 'Pon a prueba tus reflejos y puntería rápida con snaps balísticos sobre blancos dinámicos.',
  genre: ['Tiro', 'Reflejos', 'Esports'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-16',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es un flick shot en el entrenamiento de puntería?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es un movimiento de puntería rápido y balístico que traslada el cursor instantáneamente desde una posición neutra hasta la cabeza o centro del blanco.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué consiste el modelo de dos fases de Woodworth (1899)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plantea que los movimientos dirigidos comprenden un impulso balístico inicial (primario) seguido por una fase de control guiada por retroalimentación visual.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué es fundamental la deceleración o frenado del ratón?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Porque sobrepasar el objetivo (overshoot) exige movimientos correctivos adicionales que demoran el disparo. La frenada firme garantiza el impacto a la primera.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué ventaja tiene la puntuación adicional por diana (bulls-eye)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Premiar con doble puntaje los aciertos en el centro de 8 píxeles obliga al sistema motor a reducir la dispersión en lugar de conformarse con clics en los bordes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se traslada este entrenamiento a juegos como CS2 y Valorant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, decisivamente. En shooters tácticos la efectividad del primer tiro tras un micro-flick suele resolver el duelo antes de entrar en ráfagas prolongadas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo actuar cuando aparecen varios blancos a la vez?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La visión periférica debe evaluar los anillos de vida de los objetivos, eliminando primero el blanco a punto de caducar antes de cambiar al nuevo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la sensibilidad recomendada para entrenar flickeo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 800 DPI, una sensibilidad de 30 a 45 cm por giro completo de 360 grados ofrece la estabilidad óptima entre giros con el antebrazo y microajustes de muñeca.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se determinan las calificaciones y rangos de la prueba?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Se ponderan precisión por clic, aciertos en la diana central, racha de combo y tiempo medio de adquisición para asignar calificaciones de D a S+.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué configuraciones técnicas favorecen la respuesta del ratón?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pantalla de 144 Hz o superior, entrada directa sin aceleración de Windows y un ratón ligero que reduzca la inercia del movimiento.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo se recomienda entrenar antes de competir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una rutina de 10 a 15 minutos con 4 a 6 repeticiones focalizadas activa las conexiones neuromusculares sin sobrecargar las articulaciones de la mano.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo entrenar flick shots y precisión con el ratón',
  description: 'Metodología sistemática para dominar desplazamientos balísticos, acierto en la diana y frenada de cursor.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Ajuste la sensibilidad y fije la vista',
      text: 'Haga coincidir los parámetros con su videojuego habitual y centre la mirada en la retícula.',
      url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/precision-flick-shot#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Detecte y priorice el objetivo emergente',
      text: 'Localice la diana y compruebe los anillos de caducidad para impactar primero en la más urgente.',
      url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/precision-flick-shot#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Ejecute el snap balístico en un solo movimiento',
      text: 'Desplace el cursor decididamente hacia el centro del blanco sin titubeos ni paradas intermedias.',
      url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/precision-flick-shot#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Frene con firmeza sobre la diana y dispare',
      text: 'Utilice la musculatura antagonista de la muñeca para anular la inercia antes de pulsar el clic.',
      url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/precision-flick-shot#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('meyer1988', 'fitts1954', 'mackenzie1992', 'elliott2010', 'woodworth1899', 'woods2015'),
  intro: {
    title: 'Biomecánica de Micro-Flicks Balísticos y Optimización de Submovimientos',
    paragraphs: [
      'En el marco del deporte electrónico y la ergonomía de interfaces, el flick shot es una acción manual de alta velocidad y carácter discreto ejecutada bajo fuerte presión temporal. Robert S. Woodworth (1899) postuló que los movimientos orientados a un fin se gestionan mediante una arquitectura de control en dos fases: un impulso balístico inicial que proyecta la extremidad hacia la meta, y una fase de control continuo para el ajuste ocular.',
      'En su formulación matemática, David E. Meyer et al. (1988) desarrollaron el Modelo de Submovimientos Estocásticos Optimizados, probando que la acción motriz humana conlleva ruido neuromuscular correlacionado con la velocidad. Si se acelera en demasía, aumenta la dispersión del punto final. Fallar el área diana obliga a un costoso submovimiento corrector secundario (~150–200 ms de latencia).',
      'Para conseguir el rendimiento de puntería más alto (MacKenzie, 1992), el jugador debe modular la velocidad del impulso primario de tal modo que coincida con el blanco. La recompensa adicional en el centro (bulls-eye) estrecha la distribución de los impactos y perfecciona el control de frenada.',
      'El compromiso clásico entre distancia y tamaño responde a la Ley de Fitts (Fitts, 1954), con bases neuromotoras complementarias en Elliott et al. (2010).',
      'Precisión del navegador y consideraciones: La medición temporal se apoya en performance.now(). La frecuencia de actualización del monitor (16,7 ms a 60 Hz, 6,9 ms a 144 Hz) y la tasa de sondeo del periférico marcan los límites de resolución física (Woods et al., 2015). SkillDrills almacena sus puntuaciones de forma local.',
    ],
  },
  benchmarks: {
    title: 'Baremos de Rendimiento en Flick Shot y Precisión de Ratón',
    caption: 'Clasificación basada en las investigaciones de Woodworth (1899) y Meyer et al. (1988). SkillDrills no efectúa recopilación masiva de datos.',
    headers: ['Nivel (Tier)', 'Clasificación', 'Fase y Racha Combo', 'Latencia Media', 'Precisión de Clic', 'Ratio Bulls-Eye', 'Perfil Neuromotor'],
    rows: [
      [
        'Tier 1',
        'Maestro del Flick Apex',
        'Nv. 15+ (Combo > 20x)',
        '< 340 ms',
        '≥ 96,0%',
        '> 65%',
        'Trayectorias balísticas directas de impulso único, ausencia de submovimientos secundarios, frenado < 10 ms.',
      ],
      [
        'Tier 2',
        'Tirador de Élite',
        'Nv. 11–14 (Combo 14–19x)',
        '340–420 ms',
        '91,0%–95,9%',
        '45%–64%',
        'Verificación visual rápida, microcorrecciones por debajo de 30 ms, desviación de línea insignificante.',
      ],
      [
        'Tier 3',
        'Tirador Competente',
        'Nv. 7–10 (Combo 8–13x)',
        '421–520 ms',
        '84,0%–90,9%',
        '25%–44%',
        'Aciertos reiterados en el anillo exterior, ligeras sobrecargas en transiciones rápidas de blanco.',
      ],
      [
        'Tier 4',
        'Fragger en Formación',
        'Nv. 4–6 (Combo 4–7x)',
        '521–660 ms',
        '74,0%–83,9%',
        '10%–24%',
        'Movimientos entrecortados en múltiples impulsos, dispersión alta por sobreacelerar, vacilación al tirar.',
      ],
      [
        'Tier 5',
        'Principiante / Base',
        'Nv. 1–3 (Combo < 4x)',
        '> 660 ms',
        '< 74,0%',
        '< 10%',
        'Tiros cortos que no alcanzan, fallos continuos, reacquisición lenta y falta de sincronía muñeca-brazo.',
      ],
    ],
  },
  protocols: {
    title: 'Protocolos de Entrenamiento para Precisión de Flick Shot',
    items: [
      {
        title: 'Protocolo 1: Calibración del Impulso Primario (Niveles 1–4)',
        description: 'Priorice la fluidez de un snap único sin cortes. Descarte pausas a mitad del trayecto y confíe en la memoria motora para situar el cursor sobre el blanco.',
      },
      {
        title: 'Protocolo 2: Reducción de Submovimientos de Meyer (Niveles 5–8)',
        description: 'Concentre la puntería en la diana interior de 8 píxeles. Apuntar a un núcleo reducido estimula a la corteza cerebral a acotar la dispersión global.',
      },
      {
        title: 'Protocolo 3: Secuenciación Prioritaria de Blancos (Niveles 9–12)',
        description: 'Ante dos objetivos simultáneos, examine con la visión periférica el temporizador y liquide primero la diana en fase terminal de caducidad.',
      },
      {
        title: 'Protocolo 4: Frenado Antagonista contra el Overshoot (Niveles 13–15)',
        description: 'A altas velocidades, active los extensores de la muñeca para clavar el ratón sobre el centro de la diana, evitando derrapes indeseados.',
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

const copyEs = {
  title: "Flick Shot de Precisión – Test de Puntería con Ratón",
  subtitle: "Decaimiento de Objetivos & Micro-Flicks al Centro • Progresión Infinita",
  startButtonText: "INICIAR DRILL",
  playAgainText: "Jugar de nuevo",
  shareText: "Compartir resultado",
  exitText: "Salir",
  accuracyLabel: "Precisión",
  targetHitsLabel: "Impactos",
  bullseyesLabel: "Centro (Diana)",
  peakLevelLabel: "Nivel Máximo",
  rulesTitle: "Instrucciones del Drill y Sistema de Puntuación",
  rulesItems: [
    { num: "1", text: "Impacto al Centro (Diana)", highlight: "+200 PTS / +0.6s", result: "Precisión milimétrica en el núcleo" },
    { num: "2", text: "Impacto Estándar", highlight: "+100 PTS / +0.6s", result: "Adquisición periférica rápida" },
    { num: "3", text: "Progresión de Nivel", highlight: "+1 Nivel / 1400 PTS", result: "Objetivos se reducen y expiran más rápido" },
    { num: "4", text: "Fallo o Expiración", highlight: "Reinicio de combo", result: "Penalización resta -0.8s" }
  ],
};

export default function PrecisionFlickShotPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <PrecisionFlickShotClient copy={copyEs} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="motor"
          currentHref="/drills/motor/hand-eye-coordination/precision-flick-shot"
          locale="es"
        />
      </div>
      <DrillFooter />
    </>
  );
}
