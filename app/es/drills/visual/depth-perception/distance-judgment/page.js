import DistanceJudgmentClient from '@/app/drills/visual/depth-perception/distance-judgment/DistanceJudgmentClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — distance-judgment (Spanish: Percepción de Profundidad)
// PRIMARY:  "test de percepción de profundidad" — Core query
//           "cálculo de distancias test"         — Practical driving search
// SECONDARY / LSI:
//           "test de estereopsis online"         — Clinical stereopsis
//           "percepción espacial visual"         — Spatial perception
//           "prueba de visión tridimensional"    — 3D vision check
//           "expansión óptica looming"           — Looming velocity
//           "test de howard-dolman"              — Classical test
// ============================================================

export const metadata = {
  title: 'Test de Percepción de Profundidad – Cálculo de Distancias',
  description: 'Test de percepción de profundidad online gratis. Mide tu cálculo de distancias y tiempo de intercepción mediante expansión óptica. Prueba visual científica.',
  keywords: [
    'test de percepción de profundidad',
    'cálculo de distancias test',
    'test de estereopsis online',
    'percepción espacial visual',
    'prueba de visión tridimensional',
    'juicio de distancia visual',
    'expansión óptica looming',
    'tiempo hasta el contacto ttc',
    'test de howard-dolman',
    'percepción de profundidad carnet',
    'entrenamiento de visión 3d',
    'coordinación ojo distancia',
  ],
  openGraph: {
    title: 'Test de Percepción de Profundidad – Cálculo de Distancias | SkillDrills',
    description: 'Test de percepción de profundidad online gratis. Mide tu cálculo de distancias y tiempo de intercepción mediante expansión óptica. Prueba visual científica.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/visual/depth-perception/distance-judgment',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Percepción de Profundidad – Cálculo de Distancias | SkillDrills',
    description: 'Test de percepción de profundidad online gratis. Mide tu cálculo de distancias y tiempo de intercepción mediante expansión óptica. Prueba visual científica.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/visual/depth-perception/distance-judgment',
    languages: getAlternateLanguages('/drills/visual/depth-perception/distance-judgment'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Entrenamiento Visual', item: 'https://skilldrills.online/es/drills/visual' },
    { '@type': 'ListItem', position: 3, name: 'Percepción de Profundidad', item: 'https://skilldrills.online/es/drills/visual/depth-perception' },
    { '@type': 'ListItem', position: 4, name: 'Cálculo de Distancias', item: 'https://skilldrills.online/es/drills/visual/depth-perception/distance-judgment' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Percepción de Profundidad y Cálculo de Distancias',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Herramienta interactiva para evaluar el cálculo de distancias y la intercepción de objetos por expansión óptica.',
  url: 'https://skilldrills.online/es/drills/visual/depth-perception/distance-judgment',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/es' },
  dateModified: '2026-09-05',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Simulador de Cálculo de Distancias 3D',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navegador moderno con soporte para HTML5 Canvas y Pointer Events',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/es/drills/visual/depth-perception/distance-judgment',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Entrenamiento de Intercepción Visual en Profundidad',
  url: 'https://skilldrills.online/es/drills/visual/depth-perception/distance-judgment',
  description: 'Juego de percepción visual y cálculo de tiempo de impacto (TTC) con esferas tridimensionales.',
  genre: ['Precision Game', 'Visual Training', 'Esports'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo entrenar la percepción de profundidad y el cálculo de distancias',
  description: 'Protocolo metódico para sincronizar la expansión óptica con el momento de contacto.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Fijar el anillo de referencia en el túnel',
      text: 'Dirige tu mirada al anillo estacionario ubicado en el centro del túnel virtual.',
      url: 'https://skilldrills.online/es/drills/visual/depth-perception/distance-judgment#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Observar el acercamiento del objetivo',
      text: 'Sigue la esfera a medida que se aproxima y su imagen aumenta sobre la retina.',
      url: 'https://skilldrills.online/es/drills/visual/depth-perception/distance-judgment#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Pulsar en la coincidencia exacta',
      text: 'Pulsa la barra espaciadora o haz clic en el instante justo en que la esfera coincida con el anillo.',
      url: 'https://skilldrills.online/es/drills/visual/depth-perception/distance-judgment#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Revisar el porcentaje de desviación',
      text: 'Analiza tu error relativo de profundidad y ajusta tu sincronización para velocidades más rápidas.',
      url: 'https://skilldrills.online/es/drills/visual/depth-perception/distance-judgment#step-4'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es el test de percepción de profundidad y qué habilidades evalúa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evalúa la capacidad de calcular distancias relativas en el espacio 3D y estimar el tiempo exacto hasta el contacto (Time-to-Contact) a través de la velocidad de expansión de la imagen en la retina.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué se diferencia de la prueba clásica de Howard-Dolman?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La prueba de Howard-Dolman (1919) mide la estereopsis pura con varillas físicas. Como las pantallas de ordenador son planas y carecen de disparidad binocular real, este test entrena el componente dinámico de expansión óptica (Lee, 1976), primordial al conducir y hacer deporte.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es la variable Tau y el tiempo hasta el contacto (TTC)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'David Lee (1976) formuló que el cerebro calcula cuándo llegará un objeto dividiendo su tamaño angular actual por su tasa de expansión, sin necesitar conocer a qué distancia física se encuentra.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué se exige medir la profundidad al renovar carnets profesionales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los conductores profesionales (camiones, autobuses) deben calcular distancias de seguridad con total exactitud al adelantar y frenar para evitar choques por alcance.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puede fallar una persona con visión 20/20?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Se puede tener una vista perfecta en cada ojo por separado pero fallar al coordinar la visión binocular debido a pequeñas diferencias de graduación (anisometropía), astigmatismo o cansancio ocular.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es posible mejorar el cálculo de distancias con entrenamiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Aunque anomalías estructurales requieran oftalmólogo, la agilidad con la que el cerebro procesa la aproximación de objetos se incrementa notablemente con ejercicios específicos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se determina el porcentaje de error en la prueba?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Se calcula la diferencia porcentual entre el diámetro de la esfera en el momento del clic y el diámetro real del anillo. Menos del 5% de error se premia con máxima puntuación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué relevancia tiene en deportes de raqueta y pelota?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En tenis, béisbol o pádel, los jugadores cuentan con menos de 400 milisegundos para anticipar el punto de contacto y armar el golpe con precisión milimétrica.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Influye la tasa de refresco del monitor (Hz)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un monitor de 144 Hz o 240 Hz actualiza los fotogramas cada 4–7 ms, lo que ayuda a percibir el contorno de la esfera con mayor definición que a 60 Hz.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se recopilan datos personales o puntuaciones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Todo el historial y los récords se guardan únicamente de forma local en tu navegador (LocalStorage) respetando tu privacidad.',
      },
    },
  ],
};

const distanceGuideEs = {
  heading: 'Criterios de Percepción de Profundidad y Cálculo Espacial',
  intro: [
    'La percepción de profundidad (visión estereoscópica y cálculo espacial) es la facultad visual y neurológica que nos permite interpretar el entorno en tres dimensiones y calcular con exactitud milimétrica la distancia, volumen y trayectoria de objetos en movimiento. En el deporte de alta velocidad (béisbol, tenis, automovilismo), en la aviación, en las pruebas psicotécnicas de conducción y en los eSports tácticos, estimar distancias en fracciones de segundo marca la frontera entre una intercepción perfecta y una colisión crítica.',
    'Este ejercicio traslada a un entorno digital los principios geométricos del clásico aparato estereoscópico de Howard-Dolman (Howard, 1919) y las investigaciones de óptica ecológica de David N. Lee (1976) y David Regan & Kenneth I. Beverley (1978). Al proyectar una esfera 3D a través de un túnel visual hacia un plano de referencia fijo, el test entrena la corteza visual para procesar la velocidad de expansión retiniana (looming) y estimar con exactitud el tiempo hasta el contacto (Time-to-Contact, τ) bajo velocidades crecientes.',
    'Metodología y Precisión de Muestreo: Todas las desviaciones de intercepción se registran localmente con la API de alta resolución performance.now() en escala de submilisegundos. El error se calcula como la desviación porcentual relativa (|Diámetro Real - Diámetro Objetivo| / Diámetro Objetivo). Existen latencias físicas de cuantización de pantalla (~16,7 ms a 60 Hz, ~6,9 ms a 144 Hz, ~4,1 ms a 240 Hz) y de sondeo del ratón (125 Hz vs 1000 Hz), descritas por Woods et al. (2015). Desviaciones inferiores a 5 ms constituyen ruido de medición estándar; compare sus registros en el mismo equipo.',
    'Transparencia y Privacidad de Datos: SkillDrills no almacena ni recopila datos personales, resultados psicotécnicos ni métricas agregadas en servidores externos. Todas las puntuaciones, niveles superados y porcentajes de precisión se guardan exclusivamente en el almacenamiento local (LocalStorage) de su navegador.'
  ],
  benchmarks: {
    title: 'Tabla de Baremos en Percepción de Profundidad',
    headers: ['Nivel de Rendimiento', 'Error Medio de Profundidad', 'Puntos y Nivel', 'Perfil Visomotor'],
    rows: [
      ['Tier 1: Maestro Estereoscópico Apex', 'Menos de 5,0% de error', '1500+ pts | Nivel 7+', 'Sensibilidad extraordinaria a la expansión óptica; sincronización impecable.'],
      ['Tier 2: Alta Agudeza de Profundidad', '5,0% – 9,9% de error', '1100 – 1499 pts | Nivel 5–6', 'Fuerte anticipación espacial; excelente respuesta a altas velocidades.'],
      ['Tier 3: Nivel Estándar Saludable', '10,0% – 15,9% de error', '750 – 1099 pts | Nivel 3–4', 'Promedio normal; ligeros retrasos ante velocidades máximas.'],
      ['Tier 4: Sensibilidad Moderada', '16,0% – 25,0% de error', '450 – 749 pts | Nivel 2', 'Propensión a accionar el botón de forma prematura.'],
      ['Tier 5: En Desarrollo', 'Más de 25,0% de error', 'Menos de 450 pts | Nivel 1', 'Error temporal considerable; conviene entrenar con regularidad.'],
    ],
  },
  protocols: {
    title: 'Protocolos para Potenciar el Cálculo de Distancias',
    items: [
      {
        title: 'Protocolo 1: Atención a la Tasa de Expansión Óptica (Lee 1976)',
        description: 'Focaliza la aceleración con la que crecen los bordes de la esfera en comparación con el anillo objetivo.',
      },
      {
        title: 'Protocolo 2: Supresión del Gatillo Prematuro',
        description: 'Controla el nerviosismo de pulsar antes de tiempo al aumentar la velocidad; aguarda el encaje espacial exacto.',
      },
      {
        title: 'Protocolo 3: Fijación en el Plano Meta',
        description: 'Deja los ojos fijados sobre el anillo objetivo y permite que la esfera entre en tu foco.',
      },
      {
        title: 'Protocolo 4: Respiración Calma y Alivio Ocular',
        description: 'Pestañea entre tandas para rehidratar la córnea y evitar que la fatiga deforme las distancias.',
      },
    ],
  },
  steps: [
    'Haz clic en "Comenzar Test" para iniciar la sesión de 45 segundos de cálculo de profundidad.',
    'Fija la mirada de forma estable en el anillo cian de referencia situado en el plano medio.',
    'Observa la esfera 3D que aparece al fondo del túnel y acelera progresivamente hacia ti.',
    'Haz clic con el ratón, toca la pantalla o pulsa la barra espaciadora en el instante exacto en que la esfera coincida con el diámetro del anillo objetivo.',
    'Consulta la retroalimentación de precisión (<5% de error: Perfecto / +150 PTS) y adáptate a la velocidad creciente durante los 45 segundos.'
  ],
  audience: 'Conductores y aspirantes a permisos de conducir y licencias profesionales, operadores de maquinaria pesada, deportistas de pelota y raqueta (tenis, pádel, béisbol), pilotos y jugadores de eSports que busquen calibrar su cálculo de distancias e intercepción.',
  faqs: {
    title: 'Preguntas Frecuentes sobre Percepción de Profundidad y Distancias',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
  sources: pickSources('howard1919', 'lee1976', 'regan1978', 'julesz1971', 'woods2015'),
  related: [
    { href: "/drills/visual/tracking-accuracy/moving-target", label: "Intercepción de Objetivo Móvil" },
    { href: "/drills/visual/reaction-speed/light-reaction", label: "Test de Reacción a la Luz" },
    { href: "/drills/visual/tracking-accuracy/multiple-targets", label: "Seguimiento de Múltiples Objetos" },
    { href: "/drills/visual/tracking-accuracy/pursuit-tracker", label: "Rastreador de Persecución Ocular" },
    { href: "/drills/visual/reaction-speed/go/no-go", label: "Control de Impulsos Go / No-Go" },
    { href: "/drills/visual/visual-recognition/entropic-grid", label: "Búsqueda en Cuadrícula Entrópica" }
  ]
};

const copyEs = {
  title: 'Test de Percepción de Profundidad',
  subtitle: 'Cálculo de Distancias y Laboratorio de Intercepción 3D',
  caption: 'La percepción de profundidad calcula qué tan lejos se encuentran los elementos en el espacio. En una pantalla plana, la tasa de expansión óptica (Lee, 1976; Regan & Beverley, 1978) permite deducir el tiempo hasta el contacto (TTC) con total fidelidad sin conocer el tamaño del objeto.',
  statScore: 'Puntos',
  statTime: 'Tiempo',
  statLevel: 'Nivel',
  statBestScore: 'Récord',
  startTitle: 'Cálculo de Distancias Pro',
  startSubtitle: 'Visión 3D • Intercepción Visual de Precisión',
  startBtn: 'Comenzar Test',
  getReady: 'PREPÁRATE',
  newBest: 'NUEVO RÉCORD',
  statPoints: 'Puntos',
  statAccuracy: 'Precisión',
  statPeakLevel: 'Nivel Máximo',
  statIntercepts: 'Aciertos Plenos',
  playAgain: 'Repetir Intento',
  shareScore: 'Compartir Puntuación',
  returnOptions: 'Volver',
  rulesTitle: 'Normas y Puntuación',
  rule1Text: 'Intercepción Perfecta',
  rule1Highlight: '+150 PTS',
  rule1Result: 'Error menor al 5%',
  rule2Text: 'Intercepción Cercana',
  rule2Highlight: '+100 PTS',
  rule2Result: 'Error menor al 12%',
  rule3Text: 'Aceleración Escalonada',
  rule3Highlight: 'Mayor Velocidad',
  rule3Result: 'La esfera se acerca más rápido',
  rule4Text: 'Fallo o Tiempo Agotado',
  rule4Highlight: 'Sin Penalización',
  rule4Result: 'Nuevo objetivo sin restar puntos',
  aboutTitle: 'Sobre el Test de Percepción de Profundidad',
  overviewTitle: '¿Qué mide este test?',
  overviewLead: 'Evalúa la rapidez con la que el cerebro descifra trayectorias tridimensionales y calcula distancias de seguridad.',
  overviewBody: 'Al medir el momento exacto de impacto por expansión de contornos, la prueba afina el reflejo visomotor necesario para deportistas y conductores.',
  aboutCards: [
    { iconBg: 'bg-blue-600', title: 'Recomendado para', text: 'Conductores, pilotos, jugadores de deportes de pelota y aficionados a los videojuegos competitivos.' },
    { iconBg: 'bg-cyan-600', title: 'Capacidades Entrenadas', text: 'Expansión óptica, cálculo de tiempo de impacto, anticipación visomotriz y agudeza espacial.' },
    { iconBg: 'bg-purple-600', title: 'Clave del Éxito', text: 'Mantén la mirada en el anillo de referencia y activa el pulsador justo al solaparse.' }
  ]
};

export default function SpanishDistanceJudgmentPage() {
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
      <DistanceJudgmentClient copy={copyEs} />
      <DrillGuide guide={distanceGuideEs} />
      <RelatedDrills currentCategory="visual" currentHref="/drills/visual/depth-perception/distance-judgment" locale="es" />
    </>
  );
}
