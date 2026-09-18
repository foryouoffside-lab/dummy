import DynamicEvasionPursuitClient from '@/app/drills/visual-tracking/dynamic-evasion-pursuit/DynamicEvasionPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Seguimiento Ocular Evasivo – Evasion Pursuit | SkillDrills",
  description: "Entrenamiento gratuito de tracking reactivo y blancos evasivos: mejora la refijación foveal y sacadas de corrección ante cambios bruscos de dirección.",
  keywords: [
    "seguimiento de objetivos evasivos",
    "persecución evasiva dinámica",
    "entrenamiento de tracking reactivo",
    "recuperación de enfoque visual",
    "ejercicios de refijación foveal",
    "motilidad ocular para esports",
    "test de agilidad visual reactiva",
    "entrenamiento de puntería reactiva",
    "sacadas correctivas ejercicios",
    "control oculomotor frente a giros bruscos",
    "gimnasia ocular para deportistas",
    "test de seguimiento ocular gratis"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/dynamic-evasion-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/dynamic-evasion-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Seguimiento Ocular Evasivo – Evasion Pursuit | SkillDrills",
    description: "Entrenamiento gratuito de tracking reactivo y blancos evasivos: mejora la refijación foveal y sacadas de corrección ante cambios bruscos de dirección.",
    url: "https://skilldrills.online/es/drills/visual-tracking/dynamic-evasion-pursuit",
    siteName: "SkillDrills",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguimiento Ocular Evasivo – Evasion Pursuit | SkillDrills",
    description: "Entrenamiento gratuito de tracking reactivo y blancos evasivos: mejora la refijación foveal y sacadas de corrección ante cambios bruscos de dirección.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills",
      "item": "https://skilldrills.online/es"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Seguimiento Visual",
      "item": "https://skilldrills.online/es/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Persecución Evasiva Dinámica",
      "item": "https://skilldrills.online/es/drills/visual-tracking/dynamic-evasion-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Persecución Evasiva Dinámica – Seguimiento Ocular",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Seguimiento de Objetivos Evasivos y Refijación Foveal",
  "url": "https://skilldrills.online/es/drills/visual-tracking/dynamic-evasion-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Dynamic Evasion Pursuit – Entrenador Visual Reactivo",
  "description": "Entrenador visual reflexivo en el navegador para seguir blancos que ejecutan quiebres bruscos simulando rivales evasivos en videojuegos.",
  "genre": ["Aparato de Entrenamiento Ocular", "Entrenador de Visión Deportiva", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar la Refijación Sacádica ante Blancos Evasivos",
  "description": "Protocolo para optimizar respuestas visomotoras de reacción inmediata y suprimir la latencia en giros bruscos.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Estabiliza tu Postura",
      "text": "Siéntate a 50-60 cm de la pantalla. Mantén la cabeza inmóvil para evitar la intervención del reflejo vestíbulo-ocular (RVO).",
      "url": "https://skilldrills.online/es/drills/visual-tracking/dynamic-evasion-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Sigue los Tramos Lineales",
      "text": "Mantén el seguimiento suave continuo mientras el objetivo vuela a velocidad regular en su trayectoria recta.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/dynamic-evasion-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Dispara Sacadas Inmediatas al Quiebre",
      "text": "Cuando el blanco quiebre bruscamente, detecta el deslizamiento de la imagen en la retina y dispara una sacada veloz para recentrar la fóvea.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/dynamic-evasion-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Mantén Series Cortas e Intensas",
      "text": "Realiza de 5 a 8 series de 60 segundos con descansos intercalados para preservar la velocidad de respuesta sin fatigar los ojos.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/dynamic-evasion-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el ejercicio de Persecución Evasiva Dinámica (Dynamic Evasion Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es un ejercicio de motilidad ocular avanzada que combina tramos de seguimiento suave con quiebres direccionales evasivos abruptos, condicionando al sistema visual a re-centrar el blanco en menos de 180 ms."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué se diferencia de la Persecución Caótica (Chaos Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El movimiento caótico aplica perturbaciones continuas marco a marco; la persecución evasiva presenta trayectorias rectas uniformes interrumpidas por quiebres angulares discretos, reproduciendo el strafe intencional de adversarios."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué ocurre en la retina durante un quiebre imprevisto de dirección?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Al virar bruscamente el blanco, se produce un deslizamiento de la imagen sobre la retina (retinal slip). El colículo superior activa una sacada balística de compensación que recentra la fóvea sobre la nueva trayectoria en 150-180 ms (Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo mejora este entrenamiento la puntería en juegos de disparos (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En videojuegos como Apex Legends o CS2, los contrincantes alternan desplazamientos laterales rápidos. Este ejercicio entrena el reflejo de re-adquisición ocular, reduciendo la pérdida visual y acelerando el reenfoque de la mira."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es crucial mantener la cabeza inmóvil durante la prueba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Girar la cabeza activa el reflejo vestíbulo-ocular (RVO) a través de los canales vestibulares del oído interno, ocultando la lentitud muscular ocular. Inmovilizar la cabeza fuerza el trabajo puro de los seis músculos extraoculares."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la frecuencia y el tiempo de entrenamiento aconsejado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomendamos de 5 a 10 minutos diarios (5 a 8 rondas de 60 segundos). Como las sacadas de compensación exigen alta concentración y velocidad de disparo, series breves previenen la fatiga visual y consolidan la plasticidad sináptica."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué debo hacer si pierdo de vista el blanco tras una maniobra de escape?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No muevas la mirada a lo loco por la pantalla. Mantén el foco en la región central inmediata, detecta el movimiento periférico y lanza una sacada directa hacia el nuevo rumbo. Si sucede continuamente, baja la velocidad a 0.8x."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué relevancia tiene la tasa de refresco del monitor (Hz) en el seguimiento de esquivas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores de 144 Hz o superiores reducen el retraso entre cuadros a menos de 6,9 ms (Woods et al., 2015), mostrando el quiebre angular de inmediato, lo que posibilita una reacción sacádica mucho más rápida y limpia."
      }
    },
    {
      "@type": "Question",
      "name": "¿Existe transferencia de este ejercicio a deportes tradicionales como fútbol o tenis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Totalmente. En deportes de pelota o contacto, los oponentes realizan amagos y cambios de ritmo repentinos. La velocidad con la que los ojos refijan la trayectoria permite anticipar jugadas y reaccionar a tiempo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es gratuito y seguro realizar este test de seguimiento evasivo a diario?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, este test es 100 % gratuito, opera de forma nativa en el navegador sin registros ni descargas, y todos los registros de tiempos se almacenan únicamente en el almacenamiento local de tu equipo."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Neurofisiológicas de la Persecución Evasiva y Refijación Sacádica",
  intro: [
    "El seguimiento visual común suele desarrollarse sobre trayectorias predecibles, en las cuales el cerebelo reemplaza el procesamiento sensorial en tiempo real por un modelo motor predictivo (Bahill, Iandolo, & Troost, 1980). La Persecución Evasiva Dinámica (Dynamic Evasion Pursuit) neutraliza esta respuesta: el objetivo recorre tramos rectos para quebrar inesperadamente en ángulos agudos, emulando la evasión de un adversario en deportes de velocidad y videojuegos competitivos.",
    "Dinámica del Retinal Slip y Sacadas de Corrección: cuando el blanco quiebra su dirección de forma instantánea, la velocidad angular de la imagen supera la capacidad del seguimiento suave (~30°/s), generando un error retiniano inmediato (retinal slip). La corteza visual y el colículo superior miden el desfase y ejecutan una sacada correctiva (Catch-up Saccade) en 150 a 180 ms (Rashbass, 1961; Krauzlis, 2004; Barnes, 2008), recentrando la fóvea sobre la nueva trayectoria de escape.",
    "Latencia de Visualización y Frecuencia de Refresco: los paneles habituales de 60 Hz introducen un retraso de hasta 16,7 ms, mientras que pantallas para juegos a 144 Hz o 240 Hz disminuyen esta brecha por debajo de 4,2 ms (Woods et al., 2015). Esta plataforma opera íntegramente en tu navegador, garantizando total privacidad y retención local de datos."
  ],
  benchmarks: {
    title: "Estándares de Rendimiento en Persecución Evasiva y Refijación Sacádica",
    headers: ["Nivel de Rendimiento", "Multiplicador de Velocidad", "Refijación Sacádica en Quiebres Evasivos", "Perfil Neuromotor y Oculomotor"],
    rows: [
      ["Nivel 1: Apex Reactivo – Reflejos de Élite", "2.0x+ Ultra-Velocidad", "La sacada correctiva se ejecuta en menos de 150 ms; fijación foveal inmediata sin oscilaciones residuales.", "Máxima velocidad de conducción sináptica entre fóvea y centros oculomotores. Nivel de élite para esports y deportes dinámicos."],
      ["Nivel 2: Agilidad Visual Superior", "1.4x – 1.9x Alta Velocidad", "Recentrado rápido y fiable en 1 a 2 cuadros de vídeo; recuperación fluida de la velocidad de seguimiento.", "Músculos extraoculares muy entrenados. Gran control frente a maniobras de esquiva y strafes impredecibles."],
      ["Nivel 3: Estándar Funcional Sólido", "1.0x – 1.3x Velocidad Estándar", "Seguimiento estable en tramos lineales; leve retardo de latencia en giros de ángulos agudos.", "Rango habitual en adultos sanos. Suficiente para conducción cotidiana, deportes recreativos y videojuegos."],
      ["Nivel 4: Refijación Tardía – Requiere Práctica", "0.7x – 0.9x Velocidad Moderada", "El blanco escapa de la fóvea en la mayoría de quiebres; requiere múltiples sacadas sucesivas para reenganchar.", "Latencia sensoriomotora aumentada ante rupturas de trayectoria. Se sugiere practicar primero a velocidades lentas."],
      ["Nivel 5: Inestabilidad Ocular – Principiante", "< 0.7x Baja Velocidad", "La mirada se demora en la trayectoria antigua del blanco antes de poder iniciar una reacción compensatoria.", "La coordinación ocular elemental requiere desarrollo en trayectorias continuas con inmovilización rigurosa de la cabeza."]
    ],
    note: "Baremos basados en estudios neurofisiológicos sobre latencia sacádica, compensación de deslizamiento retiniano y readquisición del seguimiento ante quiebres bruscos (Bahill et al., 1980; Rashbass, 1961; Krauzlis, 2004; Barnes, 2008)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'barnes2008', 'krauzlis2004', 'robinson1965', 'rashbass1961', 'woods2015'),
  related: [
    { href: "/es/drills/visual-tracking/constant-slow-pursuit", label: "Seguimiento Ocular Lento (Constant Slow)" },
    { href: "/es/drills/visual-tracking/directional-chaos-pursuit", label: "Persecución Caótica Direccional (Chaos Pursuit)" },
    { href: "/es/drills/visual-tracking/sine-wave-pursuit", label: "Rastreo en Onda Sinusoidal (Sine Wave)" },
    { href: "/es/drills/visual-tracking/infinity-pursuit", label: "Seguimiento en Ocho Infinito (Figure-8)" }
  ]
};

export default function DynamicEvasionPursuitPageEs() {
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
      <DynamicEvasionPursuitClient
        copy={{
          title: "Persecución Evasiva Dinámica – Seguimiento Ocular",
          subtitle: "Entrenamiento de Refijación Foveal y Reacción a Quiebres Bruscos",
          description: "Al intercalar trayectorias lineales con giros repentinos e imprevistos, este ejercicio impide la predicción automática del cerebelo. El sistema oculomotor se ve obligado a reaccionar en circuito cerrado, disparando microsacadas de alta velocidad para centrar el blanco en la fóvea (Bahill et al., 1980; Krauzlis, 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/dynamic-evasion-pursuit" />
      </div>
    </>
  );
}
