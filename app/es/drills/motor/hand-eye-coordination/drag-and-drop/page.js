import DragAndDropClient from '@/app/drills/motor/hand-eye-coordination/drag-and-drop/DragAndDropClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Test de Drag and Drop – Precisión con el Ratón | SkillDrills',
  description: 'Test de drag and drop online gratis: Entrena precision al arrastrar el raton, frenado del cursor y soltado espacial segun la Ley de Accot-Zhai en el navegador.',
  keywords: [
    'drag and drop test',
    'test de drag and drop',
    'entrenar arrastrar y soltar',
    'precision raton arrastrar',
    'test control de cursor',
    'prueba de coordinacion raton',
    'entrenamiento raton rts',
    'frenado de raton fps',
    'gestion de inventario fps',
    'test de motricidad fina raton',
    'juego de precision raton',
    'test de raton online',
  ],
  openGraph: {
    title: 'Test de Drag and Drop – Precisión con el Ratón | SkillDrills',
    description: 'Test de drag and drop online gratis: Entrena precision al arrastrar el raton, frenado del cursor y soltado espacial segun la Ley de Accot-Zhai en el navegador.',
    type: 'article',
    url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Drag and Drop – Precisión con el Ratón | SkillDrills',
    description: 'Test de drag and drop online gratis: Entrena precision al arrastrar el raton, frenado del cursor y soltado espacial segun la Ley de Accot-Zhai en el navegador.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/drag-and-drop'),
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
      name: 'Entrenador de Drag and Drop',
      item: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop',
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Drag and Drop y Precisión con Ratón',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Herramienta online gratuita para evaluar y perfeccionar el arrastre, desaceleración y sincronización de soltado del ratón.',
  url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Entrenador de Drag and Drop',
  browserRequirements: 'Requiere HTML5 Canvas y soporte para JavaScript',
  url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Juego de Precisión Drag and Drop',
  url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop',
  description: 'Agarra y transporta objetos a receptáculos móviles con control motor y frenado dinámico.',
  genre: ['Precisión', 'Coordinación Motora', 'Esports'],
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
      name: '¿Qué mide el entrenador de Drag and Drop con ratón?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evalúa la coordinación sensoriomotora continua: adquisición del objetivo, transporte rectilíneo bajo presión isométrica, frenado antes de la meta y precisión temporal al soltar.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué arrastrar es más exigente que hacer clic simple?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Porque mantener presionado el botón impone una co-contracción continua en los flexores del dedo índice. Esto altera la fricción sobre la alfombrilla y reduce el rendimiento motor entre 15% y 25% (MacKenzie et al., 1991).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué establece la Ley de Pilotaje de Accot-Zhai (Steering Law)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Formulada en 1997 por Accot y Zhai, demuestra matemáticamente que el tiempo de movimiento en túneles restringidos depende de la longitud de la trayectoria dividida por la anchura del objetivo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo evitar sobrepasar (overshoot) el contenedor móvil?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Inicie el frenado con los extensores del antebrazo unos 40 a 50 ms antes de entrar en la zona objetivo, amortiguando la inercia antes de liberar el interruptor.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipo de agarre del ratón es más eficaz para arrastrar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El agarre de palma (palm grip) brinda mayor estabilidad y consistencia de fricción para líneas rectas, mientras que el agarre de garra (claw grip) facilita microcorrecciones verticales rápidas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Ayuda este ejercicio en videojuegos competitivos de FPS y MOBA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutamente. En shooters tácticos y battle royales (Apex Legends, Warzone), acelera el saqueo de inventarios y cambio de armaduras. En MOBAs y RTS, mejora la selección de unidades en recuadro.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué beneficia este test a diseñadores gráficos y editores?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Editores de vídeo y diseñadores CAD arrastran miles de fotogramas clave y manejadores bezier al día. Entrenar la desaceleración motora disminuye la tensión muscular repetitiva.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se calculan la precisión y las rachas de combo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La precisión es el porcentaje de depósitos exitosos sobre el total de intentos. Encadenar aciertos consecutivos activa multiplicadores de combo de hasta 3.0x.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué ajustes de hardware optimizan la precisión de arrastre?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Desactive la aceleración en Windows, configure entre 800 y 1600 DPI, emplee una alfombrilla de tela con fricción controlada y sondeo de 1000 Hz o superior.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo de práctica diaria se aconseja para fijar la memoria motora?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una rutina estructurada de 10 a 15 minutos diarios con 4 a 6 rondas de 45 segundos previene la fatiga tendinosa y consolida las conexiones neuromotoras.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Protocolo de entrenamiento de precisión en drag and drop',
  description: 'Entrenamiento sistemático para perfeccionar desaceleración de cursor, arrastre estable y soltado certero.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Posicione el cursor sobre el orbe de origen',
      text: 'Sitúe el puntero del ratón exactamente sobre el nodo marcado en el lienzo.',
      url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Presione y mantenga con tensión controlada',
      text: 'Accione el clic izquierdo con fuerza mínima constante para fijar el objeto sin agarrotar la muñeca.',
      url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Desplace el objeto en trayectoria directa',
      text: 'Lleve el orbe hacia la zona del contenedor reduciendo oscilaciones laterales y curvas innecesarias.',
      url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Suelte con precisión dentro de los límites',
      text: 'Libere el botón justamente cuando el orbe esté concéntrico con el contenedor para sumar el máximo puntaje.',
      url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'mackenzie1991', 'fitts1954', 'elliott2010', 'woods2015'),
  intro: {
    title: 'Biomecánica del Arrastre, Dirección de Cursor y Frenado Sensoriomotor',
    paragraphs: [
      'En la interacción persona-ordenador, la operación continua de arrastrar y soltar (drag and drop) impone una exigencia neuromuscular muy superior a la del simple apuntar y cliquear. Mientras que el apuntamiento discreto se rige por la Ley de Fitts (Fitts, 1954), arrastrar requiere una co-contracción isométrica prolongada de los flexores digitales mientras se coordina la traslación multiaxial del brazo sobre la superficie de apoyo.',
      'En un estudio empírico fundamental, MacKenzie, Sellen y Buxton (1991) demostraron que las tareas de arrastre presentan una penalización intrínseca de rendimiento de entre 15% y 25% frente al clic simple. La presión descendente altera el coeficiente de rozamiento de los deslizadores del ratón, coarta la destreza articular de los dedos e introduce ruido motor neuromuscular.',
      'Posteriormente, Johnny Accot y Shumin Zhai (1997) desarrollaron la Ley de Pilotaje (Steering Law) para modelar movimientos en trayectorias acotadas. En arrastres dinámicos, el usuario debe equilibrar la aceleración inicial con un frenado antagonista oportuno (Elliott et al., 2010), amortiguando el impulso para no sobrepasar el límite del receptáculo.',
      'Resolución temporal y variables del navegador: El cronometraje proviene del reloj performance.now() del navegador. La tasa de refresco del monitor (16,7 ms a 60 Hz, 6,9 ms a 144 Hz) y la tasa de sondeo del ratón determinan la discretización de las lecturas (Woods et al., 2015). SkillDrills almacena sus datos localmente sin enviarlos a servidores externos.',
    ],
  },
  benchmarks: {
    title: 'Baremos de Rendimiento en Precisión de Drag and Drop',
    caption: 'Clasificación orientativa basada en los modelos de pilotaje de Accot & Zhai (1997) y análisis de arrastre de MacKenzie et al. (1991). SkillDrills no efectúa recopilación masiva de datos.',
    headers: ['Nivel (Tier)', 'Clasificación', 'Fase / Racha Combo', 'Tiempo Medio de Arrastre', 'Porcentaje de Acierto', 'Perfil Neuromotor'],
    rows: [
      [
        'Tier 1',
        'Élite / Diseñador Pro',
        'Nv. 12–15 (Combo > 18x)',
        '< 420 ms',
        '≥ 98,0%',
        'Curva de velocidad simétrica acampanada, frenado óptimo sin desprendimientos prematuros.',
      ],
      [
        'Tier 2',
        'Avanzado / Competitivo',
        'Nv. 9–11 (Combo 12–17x)',
        '420–510 ms',
        '94,0%–97,9%',
        'Desaceleración controlada, guía precisa en el corredor y microajustes finales por debajo de 35 ms.',
      ],
      [
        'Tier 3',
        'Competente / Intermedio',
        'Nv. 6–8 (Combo 7–11x)',
        '511–640 ms',
        '87,0%–93,9%',
        'Ligeras desviaciones en fase de aceleración con desaceleración tardía antes del marco del contenedor.',
      ],
      [
        'Tier 4',
        'Inicial / En Desarrollo',
        'Nv. 3–5 (Combo 3–6x)',
        '641–800 ms',
        '78,0%–86,9%',
        'Múltiples impulsos bruscos, rigidez en los dedos con rozamiento excesivo y fallos en el borde.',
      ],
      [
        'Tier 5',
        'Principiante / Base',
        'Nv. 1–2 (Combo < 3x)',
        '> 800 ms',
        '< 78,0%',
        'Desplazamiento lento, aperturas fuera de zona y pronta fatiga de los tendones de la mano.',
      ],
    ],
  },
  protocols: {
    title: 'Protocolos de Entrenamiento para Precisión con el Ratón',
    items: [
      {
        title: 'Protocolo 1: Estabilización de la Fuerza Isométrica (Niveles 1–4)',
        description: 'Enfóquese en aplicar únicamente la fuerza mínima indispensable para no perder el clic durante el movimiento. La presión excesiva agarrota la muñeca y causa temblores.',
      },
      {
        title: 'Protocolo 2: Calibración del Túnel de Pilotaje Accot-Zhai (Niveles 5–8)',
        description: 'Reduzca la desviación lateral entre el origen y el destino. Trace mentalmente una línea recta que conecte ambos puntos y elimine oscilaciones en curva innecesarias.',
      },
      {
        title: 'Protocolo 3: Frenado Antagonista y Soltado Oportuno (Niveles 9–12)',
        description: 'Active los extensores del antebrazo 50 ms antes de alcanzar el contenedor móvil para neutralizar el impulso de inercia antes de soltar el interruptor.',
      },
      {
        title: 'Protocolo 4: Intercepción Dinámica con Ángulo de Adelanto (Niveles 13–15)',
        description: 'A altas velocidades, anticipe la coordenada de intercepción del contenedor en vez de perseguir su posición instantánea, soltando con fluidez en su trayectoria futura.',
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

export default function DragAndDropPage() {
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
      <DragAndDropClient copy={{ title: "Entrenador de Drag and Drop" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="https://skilldrills.online/es/drills/motor/hand-eye-coordination/drag-and-drop" />
      </div>
    </>
  );
}
