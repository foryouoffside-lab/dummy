import StrobeLatencyClient from '@/app/drills/visual/reaction-speed/light-reaction/StrobeLatencyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Reacción a la Luz: Reflejos Visuales | SkillDrills",
  description: "Test de reacción a la luz gratis online. Mide tu tiempo de reacción visual simple en milisegundos frente a la media de 200-250 ms. Sin registro.",
  keywords: [
    "test de reacción a la luz",
    "test de tiempo de reacción visual",
    "test de reflejos visuales online",
    "tiempo de reacción simple srt",
    "latencia óptico-motora milisegundos",
    "prueba del destello de luz reflejos",
    "entrenamiento de reflejos para gaming",
    "ley de pieron luminancia reacción",
    "cronometría mental velocidad de respuesta",
    "fototransducción retiniana tiempo motor",
    "test de reflejos rápidos gratis",
    "velocidad de reacción simple"
  ],
  openGraph: {
    title: "Test de Reacción a la Luz: Reflejos Visuales | SkillDrills",
    description: "Calcula tu tiempo de reacción visual simple ante destellos estroboscópicos con precisión en milisegundos online gratis.",
    type: 'article',
    url: 'https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Reacción a la Luz: Reflejos Visuales | SkillDrills",
    description: "Mide y entrena tu velocidad de reflejos visuales ante destellos de luz en milisegundos sin coste alguno.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/light-reaction'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Catálogo de Drills", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Entrenamiento Visual", "item": "https://skilldrills.online/es/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Velocidad de Reacción", "item": "https://skilldrills.online/es/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "Test de Reacción a la Luz", "item": "https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Reacción a la Luz (Tiempo de Reacción Simple)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Prueba neurocognitiva de alta precisión para medir el tiempo de reacción visual simple (SRT) y la velocidad de respuesta neuromuscular.",
  "featureList": [
    "Medición en milisegundos de latencia con la API performance.now()",
    "Intervalos aleatorios entre 300 ms y 2.500 ms para anular la anticipación",
    "Filtro anti-spam para penalizar clics especulativos previos al destello",
    "Almacenamiento 100% local en tu navegador sin telemetría"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Reacción a la Luz — Reflejos Visuales | SkillDrills",
  "alternateName": "Light Reaction Pro",
  "url": "https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction",
  "dateModified": "2026-09-05",
  "description": "Test online gratis de reflejos visuales. Haz clic tan pronto como el círculo central parpadee en blanco brillante.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador web compatible con HTML5 Canvas.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Tiempo de Reacción Visual Simple, Latencia Óptico-Motora, Reflejos Motores, Ley de Piéron, Atención Foveal"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Drill de Reflejo de Reacción a la Luz",
  "url": "https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction",
  "description": "Juego de velocidad de reacción para entrenar la respuesta neuromuscular ante destellos ópticos.",
  "genre": ["Action", "Reaction Speed", "Reflex Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Realizar el Test de Reacción a la Luz",
  "dateModified": "2026-09-05",
  "description": "Protocolo de 4 fases para evaluar y desarrollar el tiempo de reacción visual simple ante estímulos luminosos estroboscópicos.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fija la Mirada en el Círculo Central",
      "text": "Centra la vista en el objetivo oscuro central de la pantalla, relajando la mano sin generar tensión muscular innecesaria.",
      "url": "https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Espera el Destello Blanco Imprevisible",
      "text": "Aguarda con serenidad a lo largo del intervalo aleatorio de 300 ms a 2.500 ms sin anticipar el clic.",
      "url": "https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Haz Clic Inmediatamente al Encenderse la Luz",
      "text": "Pulsa el ratón o la Barra Espaciadora en el preciso instante en que el blanco destelle en blanco intenso (+150 PTS × Multiplicador).",
      "url": "https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Evita Clics Especulativos Precipitados",
      "text": "Pulsar antes del encendido activa un bloqueo anti-spam de 1,2 segundos, asegurando que la marca sea un reflejo auténtico.",
      "url": "https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el test de reflejos de reacción a la luz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El test de reacción a la luz es una prueba psicofísica de alta exactitud para evaluar el tiempo de reacción simple (SRT). Mide los milisegundos exactos que transcurren desde que un círculo destella en blanco hasta que el usuario acciona el clic mecánico."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el tiempo promedio de reacción visual simple en milisegundos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En personas jóvenes y sanas, la media oscila entre 200 ms y 250 ms. Deportistas profesionales, velocistas y jugadores de esports de élite alcanzan habitualmente marcas comprendidas entre 160 ms y 190 ms."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué etapas fisiológicas suceden entre percibir la luz y hacer clic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El proceso transcurre en 4 fases: (1) fototransducción retiniana (~20–40 ms), (2) transporte por el nervio óptico y tálamo a la corteza visual V1 (~30–50 ms), (3) decisión motora y procesamiento en cortezas parietal y motora (~50–80 ms), y (4) orden eferente por la vía corticoespinal hacia la musculatura del dedo (~30–50 ms)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es la Ley de Piéron y cómo influye el brillo en el tiempo de reacción?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La Ley de Piéron (1952) establece que el tiempo de reacción decrece de forma hiperbólica conforme la luminancia del estímulo supera el umbral del fondo. Un destello blanco puro sobre fondo oscuro produce el mínimo retraso de transducción sensorial."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué la reacción auditiva es más rápida que la reacción visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El estímulo auditivo se procesa entre 30 y 50 ms más rápido (140–160 ms frente a 200–250 ms). La activación mecánica en los cilios cocleares toma de 1 a 3 ms, mientras que la fototransducción química en la retina demanda de 20 a 40 ms."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se puede mejorar el tiempo de reacción visual simple con entrenamiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. El entrenamiento estimula la neuroplasticidad, elevando la excitabilidad corticoespinal y agilizando la atención visual encubierta (Posner, 1980). Jugadores habituales presentan reflejos más rápidos con idéntica precisión motora (Dye et al., 2009)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo influye la tasa de refresco del monitor en la puntuación de reflejos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Una pantalla de 60 Hz añade hasta 16,7 ms de demora de visualización. Los monitores de 144 Hz y 240 Hz la reducen a 6,9 ms y 4,1 ms. Sumado a un ratón de 1.000 Hz de sondeo, se elimina prácticamente el retardo artificial."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué causa el aviso de clics repetitivos (anti-spam) en esta prueba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pulsar antes de la aparición del destello o cliquear a ritmo acelerado desencadena un enfriamiento de 1,2 segundos. Esto garantiza que la métrica corresponda a una reacción visual y no a clics por azar."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué manera afectan el sueño, la cafeína y la fatiga a la latencia de respuesta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El insomnio y el agotamiento mental ralentizan la respuesta entre 30 ms y 80 ms por reducción de la alerta prefrontal. La cafeína en dosis moderadas (100–200 mg) contrarresta la adenosina, recortando la latencia en 10 a 20 ms."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es este test de reacción a la luz gratuito y totalmente privado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. El test de SkillDrills es 100% gratuito y no requiere crear cuentas ni suscribirse. Todos los resultados y promedios se conservan exclusivamente en el almacenamiento local de tu navegador web."
      }
    }
  ]
};

const lightReactionGuide = {
  heading: "Cronometría Neurocognitiva de los Reflejos Visuales y Latencia Simple (SRT)",
  intro: [
    "El tiempo de reacción simple (SRT) cuantifica el retardo psicomotor elemental que separa la presentación de un estímulo visual imprevisto de la activación motora inmediata. En el atletismo de pista, el automovilismo, las artes marciales y el esport competitivo, diferencias de escasos milisegundos determinan fintas defensivas, salidas fulgurantes y contragolpes letales.",
    "La respuesta neuromuscular encadena cuatro fases fisiológicas cardinales: (1) fototransducción retiniana (~20–40 ms por isomerización de la rodopsina), (2) propagación aferente por el tracto óptico hacia el córtex visual primario V1 (~30–50 ms), (3) preparación perceptiva y motriz en áreas parietales y motoras suplementarias (~50–80 ms), y (4) descarga eferente por el haz corticoespinal para contraer los flexores digitales (~30–50 ms), configurando el rango biológico estándar de 200–250 ms (Kosinski, 2008; Jain et al., 2015; Shelton & Kumar, 2010).",
    "Conforme a la Ley de Piéron (1952; Pins & Bonnet, 1996), la latencia decrece de modo hiperbólico al aumentar la luminancia sobre el fondo. Este drill explota ese mecanismo proyectando un destello blanco estroboscópico de gran intensidad sobre un lienzo oscuro absorbente, generando una despolarización ganglionar inmediata. Los estudios de atención encubierta (Posner, 1980) y gaming (Dye et al., 2009) demuestran que la fijación espacial disminuye la demora en la corteza motora.",
    "Metodología y Estándares de Medición: Los estímulos y las pulsaciones se cronometran con la API de alta resolución performance.now(). Las tolerancias por tasa de refresco del display y el sondeo USB (Woods et al., 2015) se compensan para garantizar resultados fieles y de tratamiento local."
  ],
  benchmarks: {
    title: "Baremos de Latencia de Reacción Visual (Referencia Científica SRT)",
    headers: ["Banda de Rendimiento", "Latencia Media (ms)", "Puntuación y Umbral Combo", "Perfil Neuromuscular y de Reflejo"],
    rows: [
      ["Tier 1: Reflejo Neural Apex", "< 180 ms", "15.000+ PTS | Combo 28x+", "Excitabilidad sobresaliente de la corteza motora; velocidad de conducción piramidal propia de velocistas olímpicos y jugadores de élite."],
      ["Tier 2: Reflejo Visual Superior", "180 – 219 ms", "10.500 – 14.999 PTS | Combo 18x+", "Coordinación óptico-motora excelente; latencias regulares por debajo de 220 ms con escasa dispersión en sesiones largas."],
      ["Tier 3: Rendimiento Adulto Estándar", "220 – 259 ms", "6.000 – 10.499 PTS | Combo 10x+", "Promedio de adultos saludables; respuesta visual espontánea correcta con oscilaciones normales derivadas del cansancio."],
      ["Tier 4: Retardo Moderado de Respuesta", "260 – 319 ms", "2.500 – 5.999 PTS | Combo 5x+", "Procesamiento central dilatado; sensible a la fatiga visual, lapsos de vigilia o pantallas lentas de 60 Hz."],
      ["Tier 5: Latencia Extendida / Base", "> 320 ms", "< 2.500 PTS | Combo < 5x", "Retraso sensorial pronunciado; sobrecarga en la interpretación del estímulo o equipos sin calibrar de baja frecuencia."]
    ],
    note: "Estos baremos se fundamentan en la cronometría clásica y la psicofísica del tiempo de reacción (Kosinski, 2008; Woods et al., 2015; Pins & Bonnet, 1996; Jain et al., 2015). Las marcas varían por biorritmos circadianos, cafeína y características de la pantalla."
  },
  techniques: {
    title: "Técnicas Prácticas para Acelerar los Reflejos Visuales",
    items: [
      {
        name: "Preactivación Foveal y Fijación Central",
        desc: "Mantener la fóvea visual inmóvil en el centro elimina la pérdida de 20 a 30 ms debida a saltos atencionales periféricos (Posner, 1980).",
        tips: "Fija la mirada directamente en el círculo central oscuro; no dejes que los ojos recorran el marcador o los bordes de la pantalla."
      },
      {
        name: "Optimización de Contraste y Activación Retiniana",
        desc: "Un contraste alto estimula la frecuencia de disparo de las células ganglionares retinianas, minimizando la demora (Pins & Bonnet, 1996).",
        tips: "Atenúa la luz ambiental para dilatar ligeramente las pupilas, aumentando el impacto fisiológico del destello blanco."
      },
      {
        name: "Pretensión Muscular Digital Isométrica",
        desc: "La distancia de recorrido y el retardo del switch agregan latencia mecánica si los dedos se mantienen en el aire (Woods et al., 2015).",
        tips: "Apoya la yema del dedo sobre el interruptor del ratón con una suave pretensión relajada, listo para accionar sin holgura."
      },
      {
        name: "Calibración y Pantallas de Alta Frecuencia",
        desc: "Un monitor de 60 Hz introduce hasta 16,7 ms de retardo, mientras que a 240 Hz este lapso baja a 4,1 ms (Woods et al., 2015).",
        tips: "Utiliza monitores de 144 Hz o 240 Hz con ratones a 1.000 Hz de sondeo para medir reflejos puros sin barreras técnicas."
      }
    ]
  },
  steps: [
    "Haz clic en Iniciar Drill para arrancar la sesión de 45 segundos de reacción a la luz.",
    "Fija la mirada en el círculo oscuro situado en el centro de la pantalla.",
    "Aguarda con paciencia a lo largo de los intervalos aleatorios (300 ms a 2.500 ms) sin apresurarte.",
    "Pulsa la pantalla o la Barra Espaciadora en cuanto el objetivo brille en blanco intenso (+150 PTS × Multiplicador).",
    "Consulta al concluir tu latencia media, nivel máximo y categoría de precisión lograda."
  ],
  audience: "Competidores de esports tácticos, atletas de combate, velocistas de velocidad, pilotos y cualquier persona interesada en afinar la rapidez de sus reflejos ópticos.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'pins1996', 'posner1980', 'jain2015', 'dye2009'),
  related: [
    { href: "/es/drills/visual/reaction-speed/go/no-go", label: "Test Go / No-Go de Control de Impulsos" },
    { href: "/es/drills/visual/depth-perception/distance-judgment", label: "Juicio de Distancia y Profundidad" },
    { href: "/es/drills/visual/tracking-accuracy/moving-target", label: "Intercepción de Blanco Móvil" },
    { href: "/es/drills/visual/tracking-accuracy/multiple-targets", label: "Seguimiento de Múltiples Objetos" },
    { href: "/es/drills/visual/tracking-accuracy/pursuit-tracker", label: "Seguimiento Ocular Suave" },
    { href: "/es/drills/visual/visual-recognition/entropic-grid", label: "Búsqueda en Rejilla Entrópica" }
  ]
};

export default function StrobeLatencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <StrobeLatencyClient copy={{ title: "Test de Reacción a la Luz: Reflejos Visuales" }} />
      <DrillGuide guide={lightReactionGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/es/drills/visual/reaction-speed/light-reaction" />
      </div>
    </>
  );
}
