import AutoPursuitClient from '@/app/drills/visual/tracking-accuracy/pursuit-tracker/AutoPursuitClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test Smooth Pursuit: Seguimiento Ocular | SkillDrills",
  description: "Test de seguimiento ocular suave (Smooth Pursuit) gratis online. Mide la precisión de rastreo visual continuo y fijación ocular. Entrena tu control motriz.",
  keywords: [
    "test de seguimiento ocular suave",
    "test smooth pursuit online",
    "entrenamiento oculomotor",
    "movimientos oculares de persecución",
    "agudeza visual de seguimiento",
    "ejercicios de visión deportiva",
    "precisión de rastreo continuo",
    "evaluación neuroftalmológica",
    "supresión de sacadas correctivas",
    "entrenamiento de aim tracking",
    "control motor ocular",
    "visión dinámica en línea"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual/tracking-accuracy/pursuit-tracker",
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/pursuit-tracker'),
  },
  openGraph: {
    title: "Test Smooth Pursuit: Seguimiento Ocular | SkillDrills",
    description: "Test de seguimiento ocular suave (Smooth Pursuit) gratis online. Mide la precisión de rastreo visual continuo y fijación ocular. Entrena tu control motriz.",
    url: "https://skilldrills.online/es/drills/visual/tracking-accuracy/pursuit-tracker",
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US", "de_DE", "ko_KR", "ja_JP", "pt_PT", "fr_FR"],
    images: [{ url: "https://skilldrills.online/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Test Smooth Pursuit: Seguimiento Ocular | SkillDrills",
    description: "Test de seguimiento ocular suave (Smooth Pursuit) gratis online. Mide la precisión de rastreo visual continuo y fijación ocular. Entrena tu control motriz.",
    images: ["https://skilldrills.online/og-default.svg"],
  },
};

const guideData = {
  eyebrow: "Neurooftalmología & Control Oculomotor",
  heading: "Smooth Pursuit Eye-Tracking – Seguimiento Ocular & Precisión Visomotora",
  intro: [
    "El sistema de movimientos oculares de persecución suave (Smooth Pursuit Eye Movements - SPEM) rige la alineación continua y sin saltos de la fóvea central sobre objetivos visuales dinámicos. Fisiológicamente, este circuito de retroalimentación en bucle cerrado se diferencia de forma sustancial de los saltos sacádicos balísticos, que se activan por error de posición estática y son generados por redes premotoras independientes en el tronco del encéfalo (Rashbass, 1961; Krauzlis, 2004).",
    "El principal estímulo neurofisiológico para la persecución suave es el deslizamiento retiniano (retinal slip), es decir, la velocidad a la que la imagen del blanco se desplaza sobre el mosaico de fotorreceptores (Leigh & Zee, 2015). Las señales de movimiento visual procesadas en el área visual primaria (V1) se descomponen en vectores de dirección y velocidad en las áreas corticales MT/V5 y MST. A través de los campos oculares frontales (FEF) y los núcleos pontinos, la señal se proyecta al cerebelo (flóculo y vermis dorsal), enviando patrones motores de alta precisión a los núcleos oculomotores (Krauzlis, 2004; Lisberger, 2010).",
    "Los límites biomecánicos del seguimiento visual se hacen patentes cuando la velocidad angular del objetivo rebasa los 30 a 40 grados por segundo o describe trayectorias impredecibles (Bahill, Iandolo & Troost, 1980). En tales regímenes cinemáticos, el sistema oculomotor no puede conservar una ganancia unitaria (velocidad ocular igual a la del blanco). Al acumularse el error posicional por encima del umbral retiniano, el sistema nervioso central interviene activando sacadas de alcance (catch-up saccades) —rápidas correcciones balísticas de 20 a 40 milisegundos que saltan hacia adelante para reenganchar el blanco (Leigh & Zee, 2015). Los deportistas de alto nivel y jugadores profesionales de deportes electrónicos minimizan la amplitud de estas sacadas correctivas perfeccionando la estimación continua de la aceleración.",
    "Dado que la conducción sensorial en el sistema visomotor humano sufre un retardo fisiológico ineludible de entre 100 y 130 milisegundos entre la estimulación retiniana y la ejecución motriz, el seguimiento puramente reactivo conduce invariablemente al sobreimpulso (overshoot) y la pérdida del blanco (Woods et al., 2015). Para superar este desfase, el córtex motor y el cerebelo ejecutan modelos predictivos internos (Internal Predictive Models), proyectando la cinemática futura del objetivo y anticipando vectores de rebote (Land & McLeod, 2000; Barnes, 2008).",
    "Este sistema de evaluación en línea implementa cronometría de alta resolución mediante performance.now() y renderizado subpíxel para registrar el tiempo efectivo en el blanco (Time on Target), la desviación angular promedio y la racha máxima de contacto continuo a lo largo de un protocolo de 45 segundos. El entrenamiento regular de seguimiento oculomotor optimiza la coordinación neuromotora ojo-mano, reportando beneficios inmediatos en el tracking aim de shooters en primera persona, la anticipación cinemática en deportes de pelota y la mitigación de la fatiga visual."
  ],
  benchmarks: {
    title: "Baremos Estandarizados de Seguimiento Ocular Smooth Pursuit",
    headers: ["Nivel / Categoría", "Tiempo en el Blanco (Time-on-Target)", "Precisión Media de Rastreo", "Supresión de Sacadas", "Hito Neurofisiológico"],
    rows: [
      ["Nivel 1: Élite Mundial (Top 1%)", "≥ 88%", "≥ 92%", "≥ 95% Supresión", "Persecución fluida ininterrumpida, deslizamiento retiniano nulo. Modelo interno cerebelar sincronizado (Lisberger, 2010)."],
      ["Nivel 2: Atleta Avanzado (Top 5%)", "76 – 87%", "84 – 91%", "88 – 94% Supresión", "Excelente control oculomotor con inmediata adaptación de fase ante cambios angulares bruscos."],
      ["Nivel 3: Estándar Competente (Top 25%)", "62 – 75%", "72 – 83%", "78 – 87% Supresión", "Rastreo consistente en curvas suaves, sacadas de ajuste esporádicas en aceleraciones."],
      ["Nivel 4: Nivel Base (Top 50%)", "48 – 61%", "60 – 71%", "65 – 77% Supresión", "Desvíos reiterados del cursor y dependencia constante de sacadas de alcance escalonadas."],
      ["Nivel 5: Principiante (Baseline)", "< 48%", "< 60%", "< 65% Supresión", "Marcada latencia visual, trazos manuales bruscos y excesivo sobreimpulso (overshoot)."]
    ],
    note: "Basado en literatura neuroftalmológica y de ciencias del deporte (Rashbass 1961; Krauzlis 2004; Leigh & Zee 2015; Lisberger 2010)."
  },
  techniques: {
    title: "Estrategias de Control Motor para el Seguimiento Visual",
    items: [
      {
        name: "Fijación Foveal en el Borde Guía",
        desc: "Enfoque su mirada en el borde de avance de la esfera, nunca sobre el cursor. Permita que el sistema propioceptivo del brazo alinee el cursor en la periferia atencional mientras su vista procesa la velocidad.",
        tips: "Evite mirar el puntero del ratón; la coordinación visuomotora es más veloz de forma automática."
      },
      {
        name: "Desplazamiento con Pivote en el Codo",
        desc: "Mantenga la muñeca alineada y mueva el antebrazo sobre la alfombrilla para cubrir trayectorias largas. Esto impide espasmos musculares de los dedos que causan sacadas parásitas.",
        tips: "Regule la silla de modo que los antebrazos descansen paralelos a la superficie de trabajo."
      },
      {
        name: "Control Inercial de Rebotes",
        desc: "Cuando la esfera cambie de sentido, no fuerce un tirón violento. Reduzca la velocidad progresivamente apoyándose en la fricción estática de la superficie.",
        tips: "Alfombrillas de textura equilibrada (control híbrido) evitan deslizamientos incontrolados."
      },
      {
        name: "Respiración Diafragmática Estable",
        desc: "La apnea involuntaria en situaciones de estrés competitivo tensa la musculatura del hombro y degrada la fluidez motriz fina.",
        tips: "Mantenga un patrón constante de inhalación nasal y exhalación bucal relajada durante los 45 segundos."
      }
    ]
  },
  steps: [
    "Sitúe el cursor dentro de la esfera central para activar la cuenta regresiva de 3 segundos.",
    "Siga la esfera verde en movimiento manteniendo el cursor centrado sobre ella durante los 45 segundos.",
    "Permanezca sobre el blanco de forma continua para incrementar el medidor de racha y sumar puntos extra.",
    "Al concluir el tiempo, revise sus métricas de Time-on-Target, porcentaje de precisión y tasa de supresión sacádica.",
    "Complete de 3 a 5 rondas diarias para estimular la neuroplasticidad del circuito oculomotor."
  ],
  audience: "Recomendado para deportistas de shooters tácticos (CS2, Valorant, Apex Legends), practicantes de deportes de raqueta (pádel, tenis de mesa), automovilismo y profesionales que requieran vigilancia visual dinámica prolongada.",
  faqs: [
    {
        "q": "¿Qué es el movimiento ocular de seguimiento suave (Smooth Pursuit)?",
        "a": "El sistema de seguimiento suave (SPEM - Smooth Pursuit Eye Movements) es el mecanismo neurooculomotor voluntario que desplaza continuamente la mirada para mantener enfocado un objetivo dinámico sobre la fóvea central. Se distingue funcionalmente de las sacadas, que son saltos rápidos entre posiciones estáticas (Rashbass, 1961)."
    },
    {
        "q": "¿Por qué el rastreo visual se siente entrecortado o vibra durante giros rápidos?",
        "a": "Cuando la velocidad o aceleración del blanco supera la velocidad de ganancia del circuito del cerebelo y tronco encefálico, la imagen resbala fuera de la fóvea (retinal slip). El sistema visual activa sacadas de compensación para reenganchar el blanco, provocando la sensación de trazos escalonados o microtirones."
    },
    {
        "q": "¿Qué relevancia tiene este ejercicio para juegos FPS como Apex Legends o Overwatch?",
        "a": "En títulos de disparo donde los adversarios esquivan continuamente (ADAD strafe), mantener la retícula sobre el modelo del enemigo sin sacadas descoordinadas reduce drásticamente el tiempo para eliminar (TTK). El smooth pursuit optimiza la fluidez motora con armas automáticas."
    },
    {
        "q": "¿Qué configuración de sensibilidad y DPI del ratón es más recomendable?",
        "a": "Sensibilidades medias o moderadamente bajas (800 DPI con 1.0 a 1.5 en el juego, o 28–45 cm/360°) brindan el mejor control. Sensibilidades muy elevadas fuerzan a los micromúsculos de los dedos, provocando microespasmos y pérdidas frecuentes de seguimiento."
    },
    {
        "q": "¿Entrenar el seguimiento ocular mejora la concentración y la salud visual general?",
        "a": "Sí. Tonificar la musculatura extraocular y el circuito foveal disminuye la fatiga visual digital (astenoopía), mejora el rendimiento lector y afianza la atención visual sostenida en entornos de alta exigencia cognitiva."
    },
    {
        "q": "¿Deportes reales como tenis, tenis de mesa o automovilismo aprovechan este entrenamiento?",
        "a": "Absolutamente. Pilotos de carreras y tenistas confían en la pericia de su seguimiento suave para predecir trayectorias de pelotas a gran velocidad o trazar vértices de curvas sin perder la referencia espacial (Land & McLeod, 2000)."
    },
    {
        "q": "¿Se debe mover el ratón con la muñeca o principalmente con el antebrazo?",
        "a": "Para arcos de seguimiento continuo y amplios, el movimiento debe nacer del antebrazo con pivote en el codo. La muñeca y los dedos solo deben realizar microajustes dentro del radio del blanco para prevenir lesiones por tensión repetitiva."
    },
    {
        "q": "¿Cuál es la mejor técnica ante cambios bruscos de trayectoria del blanco?",
        "a": "Evite anticiparse adivinando el rebote, ya que equivocarse provoca una pérdida total del blanco (overshoot). Mantenga la vista en el borde delantero del objetivo y utilice la resistencia superficial de la alfombrilla para frenar y reanudar el trazo con suavidad."
    },
    {
        "q": "¿Cuál es la rutina ideal para entrenar sin fatigar la vista?",
        "a": "Se aconseja realizar entre 3 y 5 repeticiones de 45 segundos al día, con descansos de 30 segundos entre series. Parpadee conscientemente y enfoque un punto distante a 6 metros durante 10 segundos al terminar cada serie."
    },
    {
        "q": "¿Se guardan o transmiten mis coordenadas de seguimiento a servidores externos?",
        "a": "No. Toda la física vectorial, el renderizado de canvas y el cálculo de porcentajes y tiempos de contacto se procesan íntegramente en la memoria de su navegador mediante JavaScript local. Ningún dato sale de su equipo."
    }
],
  sources: pickSources([
    "rashbass1961smooth",
    "lisberger2010visual",
    "krauzlis2004recurrent",
    "leigh2015neurology",
    "land2000eye"
  ]),
  related: [
    { href: "/es/drills/visual/tracking-accuracy/moving-target", label: "Seguimiento de Blanco Móvil" },
    { href: "/es/drills/visual/tracking-accuracy/multiple-targets", label: "Seguimiento de Múltiples Objetos" },
    { href: "/es/drills/visual/reaction-speed/go/no-go", label: "Test Go/No-Go" },
    { href: "/es/drills/visual/reaction-speed/light-reaction", label: "Reacción a la Luz" },
    { href: "/es/drills/fps/strafe-tracking", label: "Strafe Tracking FPS" },
    { href: "/es/drills/fps/pro-smooth-pursuit", label: "Pro Smooth Pursuit FPS" }
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
    { "@type": "ListItem", "position": 5, "name": "Seguimiento Ocular Suave", "item": "https://skilldrills.online/es/drills/visual/tracking-accuracy/pursuit-tracker" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Seguimiento Ocular Suave (Smooth Pursuit)",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": { "@type": "Organization", "name": "SkillDrills" }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Seguimiento Ocular Suave (Smooth Pursuit)",
  "url": "https://skilldrills.online/es/drills/visual/tracking-accuracy/pursuit-tracker",
  "applicationCategory": "SportsApplication",
  "browserRequirements": "Requires JavaScript. Canvas support required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entrenamiento de Persecución Ocular Smooth Pursuit",
  "gamePlatform": "Web Browser",
  "genre": ["Visión Deportiva", "Entrenamiento Cognitivo", "Control Oculomotor"],
  "numberOfPlayers": { "@type": "QuantitativeValue", "value": 1 }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Realizar el Test de Smooth Pursuit",
  "description": "Protocolo guiado para evaluar y perfeccionar el seguimiento visual continuo y la precisión oculomotora.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Paso 1", "text": "Sitúe el cursor dentro de la esfera central para activar la cuenta regresiva de 3 segundos." },
    { "@type": "HowToStep", "position": 2, "name": "Paso 2", "text": "Siga la esfera verde en movimiento manteniendo el cursor centrado sobre ella durante los 45 segundos." },
    { "@type": "HowToStep", "position": 3, "name": "Paso 3", "text": "Permanezca sobre el blanco de forma continua para incrementar el medidor de racha y sumar puntos extra." },
    { "@type": "HowToStep", "position": 4, "name": "Paso 4", "text": "Al concluir el tiempo, revise sus métricas de Time-on-Target, porcentaje de precisión y tasa de supresión sacádica." },
    { "@type": "HowToStep", "position": 5, "name": "Paso 5", "text": "Complete de 3 a 5 rondas diarias para estimular la neuroplasticidad del circuito oculomotor." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
        "@type": "Question",
        "name": "¿Qué es el movimiento ocular de seguimiento suave (Smooth Pursuit)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "El sistema de seguimiento suave (SPEM - Smooth Pursuit Eye Movements) es el mecanismo neurooculomotor voluntario que desplaza continuamente la mirada para mantener enfocado un objetivo dinámico sobre la fóvea central. Se distingue funcionalmente de las sacadas, que son saltos rápidos entre posiciones estáticas (Rashbass, 1961)."
        }
    },
    {
        "@type": "Question",
        "name": "¿Por qué el rastreo visual se siente entrecortado o vibra durante giros rápidos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cuando la velocidad o aceleración del blanco supera la velocidad de ganancia del circuito del cerebelo y tronco encefálico, la imagen resbala fuera de la fóvea (retinal slip). El sistema visual activa sacadas de compensación para reenganchar el blanco, provocando la sensación de trazos escalonados o microtirones."
        }
    },
    {
        "@type": "Question",
        "name": "¿Qué relevancia tiene este ejercicio para juegos FPS como Apex Legends o Overwatch?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "En títulos de disparo donde los adversarios esquivan continuamente (ADAD strafe), mantener la retícula sobre el modelo del enemigo sin sacadas descoordinadas reduce drásticamente el tiempo para eliminar (TTK). El smooth pursuit optimiza la fluidez motora con armas automáticas."
        }
    },
    {
        "@type": "Question",
        "name": "¿Qué configuración de sensibilidad y DPI del ratón es más recomendable?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sensibilidades medias o moderadamente bajas (800 DPI con 1.0 a 1.5 en el juego, o 28–45 cm/360°) brindan el mejor control. Sensibilidades muy elevadas fuerzan a los micromúsculos de los dedos, provocando microespasmos y pérdidas frecuentes de seguimiento."
        }
    },
    {
        "@type": "Question",
        "name": "¿Entrenar el seguimiento ocular mejora la concentración y la salud visual general?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Tonificar la musculatura extraocular y el circuito foveal disminuye la fatiga visual digital (astenoopía), mejora el rendimiento lector y afianza la atención visual sostenida en entornos de alta exigencia cognitiva."
        }
    },
    {
        "@type": "Question",
        "name": "¿Deportes reales como tenis, tenis de mesa o automovilismo aprovechan este entrenamiento?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutamente. Pilotos de carreras y tenistas confían en la pericia de su seguimiento suave para predecir trayectorias de pelotas a gran velocidad o trazar vértices de curvas sin perder la referencia espacial (Land & McLeod, 2000)."
        }
    },
    {
        "@type": "Question",
        "name": "¿Se debe mover el ratón con la muñeca o principalmente con el antebrazo?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para arcos de seguimiento continuo y amplios, el movimiento debe nacer del antebrazo con pivote en el codo. La muñeca y los dedos solo deben realizar microajustes dentro del radio del blanco para prevenir lesiones por tensión repetitiva."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cuál es la mejor técnica ante cambios bruscos de trayectoria del blanco?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Evite anticiparse adivinando el rebote, ya que equivocarse provoca una pérdida total del blanco (overshoot). Mantenga la vista en el borde delantero del objetivo y utilice la resistencia superficial de la alfombrilla para frenar y reanudar el trazo con suavidad."
        }
    },
    {
        "@type": "Question",
        "name": "¿Cuál es la rutina ideal para entrenar sin fatigar la vista?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Se aconseja realizar entre 3 y 5 repeticiones de 45 segundos al día, con descansos de 30 segundos entre series. Parpadee conscientemente y enfoque un punto distante a 6 metros durante 10 segundos al terminar cada serie."
        }
    },
    {
        "@type": "Question",
        "name": "¿Se guardan o transmiten mis coordenadas de seguimiento a servidores externos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Toda la física vectorial, el renderizado de canvas y el cálculo de porcentajes y tiempos de contacto se procesan íntegramente en la memoria de su navegador mediante JavaScript local. Ningún dato sale de su equipo."
        }
    }
]
};

export default function PursuitTrackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <AutoPursuitClient copy={{ title: "Test de Seguimiento Ocular Suave (Smooth Pursuit)", subtitle: "Persecución Ocular Continua & Precisión Motora" }} />
        <DrillGuide guide={guideData} />
        <RelatedDrills related={guideData.related} />
      </main>
    </>
  );
}
