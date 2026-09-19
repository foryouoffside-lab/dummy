import GhostLinkClient from '@/app/drills/visual/tracking-accuracy/multiple-targets/GhostLinkClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test MOT Online: Seguimiento de Objetos | SkillDrills",
  description: "Test de seguimiento de múltiples objetos (MOT) gratis: Rastrea varios blancos entre distractores. Entrena tu atención dividida y visión periférica.",
  keywords: [
    "test de seguimiento de múltiples objetos",
    "test MOT online",
    "seguimiento visual múltiple",
    "entrenamiento de visión periférica",
    "atención visual dividida",
    "memoria de trabajo espacial",
    "agudeza visual dinámica",
    "ejercicios de visión deportiva",
    "percepción visual simultánea",
    "psicología cognitiva mot",
    "campo visual de atención",
    "rastreo paralelo de blancos"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual/tracking-accuracy/multiple-targets",
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/multiple-targets'),
  },
  openGraph: {
    title: "Test MOT Online: Seguimiento de Objetos | SkillDrills",
    description: "Test de seguimiento de múltiples objetos (MOT) gratis: Rastrea varios blancos entre distractores. Entrena tu atención dividida y visión periférica.",
    url: "https://skilldrills.online/es/drills/visual/tracking-accuracy/multiple-targets",
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US", "de_DE", "ko_KR", "ja_JP", "pt_PT", "fr_FR"],
    images: [{ url: "https://skilldrills.online/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Test MOT Online: Seguimiento de Objetos | SkillDrills",
    description: "Test de seguimiento de múltiples objetos (MOT) gratis: Rastrea varios blancos entre distractores. Entrena tu atención dividida y visión periférica.",
    images: ["https://skilldrills.online/og-default.svg"],
  },
};

const multipleTargetsGuide = {
  heading: "Test de Seguimiento de Múltiples Objetos (MOT)",
  intro: [
    "El paradigma de Seguimiento de Múltiples Objetos (MOT - Multiple Object Tracking), propuesto originalmente por Zenon Pylyshyn y Ron Storm (1988), es el estándar de referencia en la psicofísica cognitiva para investigar cómo la arquitectura visual humana mantiene representaciones espaciales en tiempo real de entidades móviles independientes. Los entornos dinámicos del mundo real —como los deportes de equipo de ritmo rápido, intersecciones viales complejas y el juego competitivo en shooters tácticos— rara vez presentan estímulos aislados; por el contrario, exigen una supervisión paralela y continua de múltiples elementos dispersos en todo el campo visual.",
    "Antes del surgimiento del paradigma MOT, los modelos clásicos de atención visual postulaban un único 'foco' móvil que examinaba los estímulos de manera puramente secuencial. Pylyshyn y Storm demostraron que los observadores humanos pueden rastrear simultáneamente entre 4 y 5 elementos idénticos en paralelo sin escanearlos uno por uno, fundamentando la teoría de indexación visual ('FINSTs' o Fingers of Instantiation). Los FINSTs operan como punteros mentales preatencionales que se adhieren a los objetos y siguen sus coordenadas espaciales a través de trayectorias complejas, con total independencia de propiedades superficiales como el color o la forma.",
    "Investigaciones psicofísicas y de neuroimagen posteriores dirigidas por Patrick Cavanagh y George Alvarez (2004, 2005) revelaron que el seguimiento atencional está mediado por focos multifocales independientes distribuidos entre los hemisferios cerebrales izquierdo y derecho. Cuando los blancos están repartidos en ambos hemicampos visuales, la capacidad de seguimiento es significativamente mayor que cuando se concentran en un único hemicampo, demostrando que cada hemisferio dispone de recursos atencionales dedicados e independientes.",
    "En el ámbito del rendimiento aplicado, Daphne Bavelier y C. Shawn Green (2006) comprobaron que los jugadores de videojuegos de acción demuestran una capacidad MOT notablemente expandida, rastreando entre 6 y 7 objetos simultáneos frente a los 3 o 4 del promedio de no jugadores. Asimismo, Jocelyn Faubert (2013) demostró que atletas profesionales de élite (deportistas de la NHL y la Premier League) poseen capacidades extraordinarias de rastreo de escenas dinámicas 3D-MOT que se adaptan con rapidez al aumento de velocidad cinemática, vinculando de forma directa la capacidad MOT con la toma de decisiones espaciales de alta precisión bajo presión."
  ],
  benchmarks: {
    title: "Niveles de Rendimiento en Seguimiento de Múltiples Objetos (Guía Editorial)",
    headers: ["Nivel de Rendimiento", "Capacidad Efectiva", "Puntuación & Umbral de Precisión", "Perfil de Atención Visual y Cognición"],
    rows: [
      ["Nivel 1: Rastreador Multifocal Apex", "5+ Blancos en Paralelo", "Score: 60 PTS (3/3) | Precisión 100% (Velocidad Máxima)", "Indexación visual paralela de nivel profesional; distribución perfecta entre hemisferios sin pérdida por colisión. Propio de atletas profesionales, pilotos militares y jugadores de élite (Faubert, 2013; Green & Bavelier, 2006)."],
      ["Nivel 2: Indexador Paralelo Avanzado", "4 Blancos en Paralelo", "Score: 50 – 59 PTS | Precisión 85 – 99%", "Rastreo multifocal robusto; mantiene diferenciación blanco-distractor en trayectorias con alta densidad de rebotes con mínimo desvío del centroide."],
      ["Nivel 3: Atención Dividida Competente", "3 Blancos en Paralelo", "Score: 40 – 49 PTS | Precisión 70 – 84%", "Referencia en adultos sanos; seguimiento fiable de 3 blancos a velocidad moderada, vulnerable a intercambios de identidad durante agrupamientos densos."],
      ["Nivel 4: Memoria Espacial en Desarrollo", "2 Blancos en Paralelo", "Score: 20 – 39 PTS | Precisión 50 – 69%", "Tendencia a colapsar la atención multifocal en un único punto foveal; dificultad para suprimir distractores en aceleraciones bruscas."],
      ["Nivel 5: Foco Inicial / Blanco Único", "1 Blanco Baseline", "Score: < 20 PTS | Precisión < 50%", "Pérdida frecuente de blancos en los primeros rebotes; requiere menor número de esferas y velocidad moderada para consolidar el anclaje preatencional."]
    ],
    note: "Estos niveles constituyen una guía editorial basada en la psicofísica del seguimiento de múltiples objetos y la memoria de trabajo visual (Pylyshyn & Storm, 1988; Cavanagh & Alvarez, 2005; Alvarez & Cavanagh, 2004; Green & Bavelier, 2006; Faubert, 2013). El rendimiento varía según la velocidad, densidad de distractores y duración del test."
  },
  techniques: {
    title: "Estrategias Neurocognitivas para Seguimiento Multifocal",
    items: [
      {
        name: "Estrategia del Centroide (Mirada Panorámica)",
        desc: "En lugar de mover la vista rápidamente entre cada blanco (sacadas continuas), fije suavemente la mirada en el baricentro geométrico imaginario formado por los blancos. Permita que la visión periférica rastree los desplazamientos simultáneamente.",
        tips: "Evite clavar la mirada en una sola esfera por más de 200 milisegundos; la visión periférica es superior detectando aceleraciones relativas."
      },
      {
        name: "Independencia de Hemisferios Visuales",
        desc: "El cerebro procesa el campo visual izquierdo y el derecho mediante subsistemas parietales independientes. Rastrear blancos repartidos entre ambos campos reduce la carga cognitiva a la mitad.",
        tips: "Coloque la pantalla a la distancia correcta y centrada; dejar que ambos hemisferios colaboren previene la saturación atencional."
      },
      {
        name: "Punteros Espaciales Preatencionales (FINSTs)",
        desc: "Confíe en los mecanismos subcorticales del sistema visual primario para etiquetar los objetos. Cuando dos esferas se crucen, no analice detalles físicos; sostenga mentalmente el vector inercial continuo.",
        tips: "Ante cruces densos, anticipe la salida lineal basada en el ángulo de rebote en vez de intentar seguir el contacto físico exacto."
      },
      {
        name: "Inhibición Activa de Distractores",
        desc: "El seguimiento efectivo requiere tanto sostener los blancos como suprimir los distractores irrelevantes. El córtex prefrontal actúa filtrando activamente señales espurias para evitar confusiones de identidad.",
        tips: "Mantenga una respiración calmada para evitar la liberación de adrenalina que provoca el estrechamiento en túnel de la atención visual."
      }
    ]
  },
  steps: [
    "Configure la duración de la sesión (15s a 60s), velocidad y número total de esferas en las opciones del test.",
    "Haga clic en Iniciar Prueba y memorice las esferas resaltadas en verde durante la vista previa de 2 segundos.",
    "Cuando los blancos vuelvan a su color neutro y empiecen a rebotar, fije su mirada en el centro y rastréelos en paralelo.",
    "Una vez concluido el movimiento, haga clic o toque sobre cada esfera que considere que era un blanco original (+20 PTS por acierto).",
    "Examine su informe de resultados con puntuación global, porcentaje de precisión y nivel de capacidad multifocal asignado."
  ],
  audience: "Indispensable para atletas de deportes de equipo (fútbol, baloncesto, balonmano), jugadores competitivos de shooters tácticos (Valorant, CS2, Apex Legends) y MOBAs (LoL, Dota 2), pilotos y cualquier profesional que requiera control simultáneo de múltiples eventos dinámicos.",
  faqs: [
    {
        "q": "¿Qué mide exactamente el test de Multiple Object Tracking (MOT)?",
        "a": "El test MOT mide la atención visual dividida, la memoria de trabajo visoespacial y la capacidad de indexación paralela. Evalúa cuántos objetivos en movimiento continuo puede supervisar simultáneamente el cerebro mientras descarta distractores visuales idénticos."
    },
    {
        "q": "¿Cuántos objetos en movimiento puede rastrear a la vez una persona promedio?",
        "a": "La media en adultos sanos se sitúa entre 3 y 4 objetos simultáneos a velocidades moderadas. Deportistas profesionales de élite y pilotos de caza entrenados logran monitorizar 5 o incluso 6 blancos en paralelo gracias a una arquitectura cortical optimizada (Cavanagh & Alvarez, 2005)."
    },
    {
        "q": "¿Por qué fracasa la estrategia de mirar cada esfera una por una de forma consecutiva?",
        "a": "Cada movimiento ocular sacádico consume entre 20 y 40 ms y produce supresión sacádica (una breve ceguera funcional transitoria). Saltar con la vista entre 4 esferas genera retrasos acumulados de cientos de milisegundos, momento en el cual los blancos colisionan y se confunden. El éxito requiere atención periférica distribuida."
    },
    {
        "q": "¿Qué es la Estrategia del Centroide (Centroid Gaze) en el seguimiento de objetivos?",
        "a": "Consiste en fijar la vista en el centro de gravedad geométrico imaginario que une a todos los blancos. Al anclar la mirada en este punto medio, todos los objetivos permanecen dentro del campo parafoveal y periférico, permitiendo un seguimiento simultáneo sin necesidad de movimientos oculares bruscos."
    },
    {
        "q": "¿Qué significa la independencia de los hemisferios visuales (Hemifield Independence)?",
        "a": "Investigaciones científicas demuestran que el hemisferio derecho gestiona el campo visual izquierdo y el hemisferio izquierdo el campo derecho de forma casi autónoma. Rastrear 2 blancos en la mitad izquierda y 2 en la derecha resulta sustancialmente más fácil que rastrear 4 concentrados en un solo lado de la pantalla."
    },
    {
        "q": "¿Cómo beneficia el entrenamiento MOT a los deportistas de equipo como fútbol o baloncesto?",
        "a": "En el fútbol o baloncesto, el deportista debe leer al mismo tiempo la trayectoria del balón, el desmarque de dos compañeros y el posicionamiento de la línea defensiva. El MOT amplía el Campo Visual Útil (UFOV) y agiliza la toma de decisiones espaciales bajo presión competitiva (Faubert, 2013)."
    },
    {
        "q": "¿Cuáles son las ventajas del test MOT para jugadores de FPS tácticos y MOBAs?",
        "a": "En videojuegos como CS2 o Valorant, el jugador debe fijar la retícula en una esquina mientras detecta amenazas emergentes en la visión periférica y comprueba el radar. El entrenamiento MOT elimina la visión en túnel y optimiza el conocimiento situacional global."
    },
    {
        "q": "¿Cómo evitar intercambios de identidad (Identity Swaps) cuando dos esferas colisionan?",
        "a": "Los intercambios de identidad ocurren cuando dos esferas cruzan la distancia mínima de resolución atencional. Para evitarlo, anticipe mentalmente la dirección inercial rectilínea de cada esfera antes y después del impacto en vez de mirar fijamente la colisión."
    },
    {
        "q": "¿Con qué frecuencia se debe entrenar el seguimiento de múltiples objetos?",
        "a": "Se recomienda realizar entre 3 y 5 sesiones semanales de 10 a 15 minutos. El entrenamiento breve pero de máxima concentración estimula la neuroplasticidad visual sin fatigar los músculos extraoculares ni saturar el córtex parietal."
    },
    {
        "q": "¿Se transmiten o almacenan mis datos de rendimiento en servidores externos?",
        "a": "No. Toda la física vectorial, renderizado de canvas y cómputo de precisión y puntaje se procesa localmente en el navegador de su dispositivo mediante JavaScript. No se recopila ni almacena información personal o de rendimiento en servidores externos."
    }
],
  sources: pickSources([
    "pylyshyn1988tracking",
    "cavanagh2005tracking",
    "faubert2013professional",
    "green2006action",
    "alvarez2004capacity",
    "scialfa2002visual"
  ]),
  related: [
    { href: "/es/drills/visual/tracking-accuracy/moving-target", label: "Seguimiento de Blanco Móvil" },
    { href: "/es/drills/visual-tracking/split-screen-tracking", label: "Seguimiento en Pantalla Dividida" },
    { href: "/es/drills/visual/reaction-speed/go/no-go", label: "Test Go/No-Go" },
    { href: "/es/drills/visual/reaction-speed/light-reaction", label: "Reacción a Estímulos Luminosos" },
    { href: "/es/drills/fps/target-prioritization", label: "Priorización de Blancos FPS" },
    { href: "/es/drills/visual-tracking/peripheral-ping-pursuit", label: "Persecución Periférica" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Entrenamientos", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Percepción Visual", "item": "https://skilldrills.online/es/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Precisión de Seguimiento", "item": "https://skilldrills.online/es/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "Seguimiento de Múltiples Objetos", "item": "https://skilldrills.online/es/drills/visual/tracking-accuracy/multiple-targets" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Seguimiento de Múltiples Objetos (MOT)",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": { "@type": "Organization", "name": "SkillDrills" }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Seguimiento de Múltiples Objetos (MOT)",
  "url": "https://skilldrills.online/es/drills/visual/tracking-accuracy/multiple-targets",
  "applicationCategory": "SportsApplication",
  "browserRequirements": "Requires JavaScript. Canvas support required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entrenamiento de Seguimiento de Múltiples Blancos (MOT)",
  "gamePlatform": "Web Browser",
  "genre": ["Visión Deportiva", "Entrenamiento Cognitivo", "Percepción Visual"],
  "numberOfPlayers": { "@type": "QuantitativeValue", "value": 1 }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Realizar el Test de Seguimiento de Múltiples Objetos (MOT)",
  "description": "Protocolo guiado paso a paso para evaluar y entrenar la atención visual dividida y visión periférica mediante el test MOT.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Paso 1", "text": "Configure la duración de la sesión (15s a 60s), velocidad y número total de esferas en las opciones del test." },
    { "@type": "HowToStep", "position": 2, "name": "Paso 2", "text": "Haga clic en Iniciar Prueba y memorice las esferas resaltadas en verde durante la vista previa de 2 segundos." },
    { "@type": "HowToStep", "position": 3, "name": "Paso 3", "text": "Cuando los blancos vuelvan a su color neutro y empiecen a rebotar, fije su mirada en el centro y rastréelos en paralelo." },
    { "@type": "HowToStep", "position": 4, "name": "Paso 4", "text": "Una vez concluido el movimiento, haga clic o toque sobre cada esfera que considere que era un blanco original (+20 PTS por acierto)." },
    { "@type": "HowToStep", "position": 5, "name": "Paso 5", "text": "Examine su informe de resultados con puntuación global, porcentaje de precisión y nivel de capacidad multifocal asignado." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
        "@type": "Question",
        "name": "¿Qué mide exactamente el test de Multiple Object Tracking (MOT)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "El test MOT mide la atención visual dividida, la memoria de trabajo visoespacial y la capacidad de indexación paralela. Evalúa cuántos objetivos en movimiento continuo puede supervisar simultáneamente el cerebro mientras descarta distractores visuales idénticos."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cuántos objetos en movimiento puede rastrear a la vez una persona promedio?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "La media en adultos sanos se sitúa entre 3 y 4 objetos simultáneos a velocidades moderadas. Deportistas profesionales de élite y pilotos de caza entrenados logran monitorizar 5 o incluso 6 blancos en paralelo gracias a una arquitectura cortical optimizada (Cavanagh & Alvarez, 2005)."
        }
    },
    {
        "@type": "Question",
        "name": "¿Por qué fracasa la estrategia de mirar cada esfera una por una de forma consecutiva?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cada movimiento ocular sacádico consume entre 20 y 40 ms y produce supresión sacádica (una breve ceguera funcional transitoria). Saltar con la vista entre 4 esferas genera retrasos acumulados de cientos de milisegundos, momento en el cual los blancos colisionan y se confunden. El éxito requiere atención periférica distribuida."
        }
    },
    {
        "@type": "Question",
        "name": "¿Qué es la Estrategia del Centroide (Centroid Gaze) en el seguimiento de objetivos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Consiste en fijar la vista en el centro de gravedad geométrico imaginario que une a todos los blancos. Al anclar la mirada en este punto medio, todos los objetivos permanecen dentro del campo parafoveal y periférico, permitiendo un seguimiento simultáneo sin necesidad de movimientos oculares bruscos."
        }
    },
    {
        "@type": "Question",
        "name": "¿Qué significa la independencia de los hemisferios visuales (Hemifield Independence)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Investigaciones científicas demuestran que el hemisferio derecho gestiona el campo visual izquierdo y el hemisferio izquierdo el campo derecho de forma casi autónoma. Rastrear 2 blancos en la mitad izquierda y 2 en la derecha resulta sustancialmente más fácil que rastrear 4 concentrados en un solo lado de la pantalla."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cómo beneficia el entrenamiento MOT a los deportistas de equipo como fútbol o baloncesto?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "En el fútbol o baloncesto, el deportista debe leer al mismo tiempo la trayectoria del balón, el desmarque de dos compañeros y el posicionamiento de la línea defensiva. El MOT amplía el Campo Visual Útil (UFOV) y agiliza la toma de decisiones espaciales bajo presión competitiva (Faubert, 2013)."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cuáles son las ventajas del test MOT para jugadores de FPS tácticos y MOBAs?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "En videojuegos como CS2 o Valorant, el jugador debe fijar la retícula en una esquina mientras detecta amenazas emergentes en la visión periférica y comprueba el radar. El entrenamiento MOT elimina la visión en túnel y optimiza el conocimiento situacional global."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cómo evitar intercambios de identidad (Identity Swaps) cuando dos esferas colisionan?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Los intercambios de identidad ocurren cuando dos esferas cruzan la distancia mínima de resolución atencional. Para evitarlo, anticipe mentalmente la dirección inercial rectilínea de cada esfera antes y después del impacto en vez de mirar fijamente la colisión."
        }
    },
    {
        "@type": "Question",
        "name": "¿Con qué frecuencia se debe entrenar el seguimiento de múltiples objetos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Se recomienda realizar entre 3 y 5 sesiones semanales de 10 a 15 minutos. El entrenamiento breve pero de máxima concentración estimula la neuroplasticidad visual sin fatigar los músculos extraoculares ni saturar el córtex parietal."
        }
    },
    {
        "@type": "Question",
        "name": "¿Se transmiten o almacenan mis datos de rendimiento en servidores externos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Toda la física vectorial, renderizado de canvas y cómputo de precisión y puntaje se procesa localmente en el navegador de su dispositivo mediante JavaScript. No se recopila ni almacena información personal o de rendimiento en servidores externos."
        }
    }
]
};

export default function MultipleTargetsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <GhostLinkClient copy={{ title: "Test de Seguimiento de Múltiples Objetos (MOT)" }} />
        <DrillGuide guide={multipleTargetsGuide} />
        <RelatedDrills related={multipleTargetsGuide.related} />
      </main>
    </>
  );
}
