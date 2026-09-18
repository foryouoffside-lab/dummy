import GhostingSuppressPursuitClient from '@/app/drills/visual-tracking/ghosting-suppress-pursuit/GhostingSuppressPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Estabilidad de Fijación Ocular – Ghosting | SkillDrills",
  description: "Entrenamiento gratuito de fijación foveal y supresión de estelas visuales: mejora la nitidez dinámica y la estabilidad de la mirada frente al movimiento.",
  keywords: [
    "estabilidad de fijación ocular",
    "supresión de imágenes residuales",
    "entrenamiento de foco foveal dinámico",
    "ejercicios contra borrosidad de movimiento",
    "control de microsacadas visuales",
    "rastreo visual de alta estabilidad",
    "gimnasia ocular para gamers esports",
    "test de nitidez visual dinámica online",
    "entrenamiento de motilidad ocular",
    "fijación sobre blancos con estela",
    "agudeza visual de movimiento gratis",
    "estabilización de la mirada test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/ghosting-suppress-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/ghosting-suppress-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Estabilidad de Fijación Ocular – Ghosting | SkillDrills",
    description: "Entrenamiento gratuito de fijación foveal y supresión de estelas visuales: mejora la nitidez dinámica y la estabilidad de la mirada frente al movimiento.",
    url: "https://skilldrills.online/es/drills/visual-tracking/ghosting-suppress-pursuit",
    siteName: "SkillDrills",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estabilidad de Fijación Ocular – Ghosting | SkillDrills",
    description: "Entrenamiento gratuito de fijación foveal y supresión de estelas visuales: mejora la nitidez dinámica y la estabilidad de la mirada frente al movimiento.",
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
      "name": "Supresión de Estelas y Fijación",
      "item": "https://skilldrills.online/es/drills/visual-tracking/ghosting-suppress-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Supresión de Estelas Visuales – Fijación Ocular",
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
  "name": "Test de Estabilidad de Fijación Ocular y Supresión de Imágenes Residuales",
  "url": "https://skilldrills.online/es/drills/visual-tracking/ghosting-suppress-pursuit",
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
  "name": "Ghosting Suppress Pursuit – Entrenador de Fijación Foveal",
  "description": "Entrenador visual reflexivo en el navegador para afianzar el anclaje foveal y suprimir activamente estelas y artefactos de movimiento.",
  "genre": ["Aparato de Entrenamiento Ocular", "Entrenador de Visión Deportiva", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar la Fijación Foveal ante Estelas Visuales",
  "description": "Protocolo para optimizar la supresión cortical de borrosidad y mantener el anclaje visual en blancos con artefactos de arrastre.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Inmoviliza Cabeza y Cuello",
      "text": "Siéntate a 50-60 cm de la pantalla con la cabeza inmóvil para suprimir la ayuda refleja del sistema vestibular.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/ghosting-suppress-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Clava la Mirada en el Núcleo Central",
      "text": "Fija la atención foveal únicamente en el centro del blanco, ignorando deliberadamente los anillos y halos que lo persiguen.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/ghosting-suppress-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Suprime el Deslizamiento Retiniano Posterior",
      "text": "Evita que la vista retroceda hacia la estela. Mantén las microsacadas orientadas de forma continua en la dirección del desplazamiento.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/ghosting-suppress-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Completa Series de Alta Concentración",
      "text": "Ejecuta de 5 a 8 series de 60 segundos con descansos periódicos para prevenir el agotamiento de los fotorreceptores y de la corteza visual.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/ghosting-suppress-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el entrenamiento de Supresión de Estelas y Fijación (Ghosting Suppress Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es un ejercicio neuro-ocular diseñado para entrenar la estabilidad foveal y la supresión activa de estelas dinámicas (motion blur/ghosting) producidas por blancos a gran velocidad, reforzando la nitidez retiniana."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo elimina el cerebro la borrosidad de movimiento de forma natural?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La corteza visual primaria (V1) y el área temporal media (MT) ejercen una inhibición temporal retrógrada que silencia las señales de los fotorreceptores desfasados para mantener nítidos los bordes de objetos en movimiento (Burr, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la función de las microsacadas en la fijación ocular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incluso durante la fijación estricta, los ojos generan microsacadas de alta frecuencia que renuevan la estimulación de la fóvea y evitan el desvanecimiento perceptivo (efecto Troxler) sin perder el objetivo (Martinez-Conde et al., 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué la mirada tiende a desviarse hacia las estelas posteriores (ghost rings)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los fotorreceptores periféricos responden de forma automática a cambios bruscos de contraste. Sin una inhibición cortical entrenada, el cerebro interpreta la estela como un nuevo blanco y desplaza la mirada hacia atrás."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué manera favorece este ejercicio a los jugadores de FPS y deportes electrónicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En tiroteos cargados de partículas, humo y proyectiles, fijar la retícula en el centro exacto del adversario sin distraerse por estelas luminosas permite disparar con mayor certeza y evitar fallos por fatiga visual."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es crucial no mover la cabeza durante la prueba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El movimiento cefálico activa el reflejo vestíbulo-ocular (RVO), compensando el desajuste con el oído interno. Mantener la cabeza fija garantiza que los músculos extraoculares asuman toda la carga de estabilización."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el tiempo y la frecuencia diaria recomendados para este test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De 5 a 10 minutos al día (entre 5 y 8 bloques de 60 segundos). Como la supresión de ruido visual demanda esfuerzo cognitivo continuo, series cortas evitan la astenopia y favorecen la plasticidad motora."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué relevancia tiene el tiempo de respuesta del monitor (GtG) y los Hz en esta práctica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores rápidos (1 ms GtG y 144 Hz o más) suprimen el ghosting propio del hardware (Woods et al., 2015), garantizando que el usuario entrene de forma pura el filtro biológico del sistema visual."
      }
    },
    {
      "@type": "Question",
      "name": "¿Existe transferencia de este ejercicio a disciplinas como tenis, béisbol o fútbol?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Una pelota bateada o lanzada con rotación genera estelas visuales en la retina. Los deportistas con fijación avanzada distinguen los giros y la costura de la pelota con gran nitidez a pesar de su alta velocidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es seguro y gratuito realizar este ejercicio de fijación diariamente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Totalmente. El test es 100 % gratuito, opera en el navegador sin descargas ni registros, y los registros de puntuación se conservan únicamente en el almacenamiento local de tu dispositivo."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Neurofisiológicas de la Fijación Foveal y Supresión de Estelas Visuales",
  intro: [
    "El seguimiento de objetos a gran velocidad supone un reto biofísico exigente para la retina: la persistencia química de los fotorreceptores suele generar un halo de arrastre (motion smear) que enturbia los límites de las formas. En personas no entrenadas, la mirada se ve atrapada por estas estelas posteriores de contraste, expulsando al blanco de la fóvea central (Burr, 1980; Burr & Morgan, 1997).",
    "Mecanismo de Desemborronamiento Cortical y Microsacadas de Fijación: la corteza visual primaria (V1) y las áreas parietales desarrollan una inhibición temporal activa que atenúa el ruido retiniano residual para que la fóvea distinga nítidamente el núcleo del objeto. Al mismo tiempo, el aparato oculomotor ejecuta microsacadas de gran precisión (< 1° de amplitud) para neutralizar la deriva ocular y anclar la mirada en el blanco en movimiento (Martinez-Conde, Macknik, & Hubel, 2004; Rolfs, 2009; Krauzlis, 2004).",
    "Interacción con Hardware y Tasa de Muestreo: los monitores de 60 Hz acumulan desenfoque derivado del tiempo de transición de los cristales líquidos. Las pantallas para esports de 144 Hz a 240 Hz mitigan este desfase (Woods et al., 2015), logrando que el ejercicio estimule exclusivamente el filtrado neural biológico. Todo el proceso corre en el navegador con máxima confidencialidad y almacenamiento local."
  ],
  benchmarks: {
    title: "Estándares de Rendimiento en Fijación Foveal y Supresión de Estelas Visuales",
    headers: ["Nivel de Rendimiento", "Multiplicador de Velocidad", "Estabilidad de Fijación ante Estelas Visuales", "Perfil Neuromotor y Oculomotor"],
    rows: [
      ["Nivel 1: Apex Fijación – Bloqueo Foveal Puro", "2.0x+ Ultra-Velocidad", "La mirada permanece firmemente anclada en el núcleo del blanco a pesar de los densos anillos de estela y rebotes bruscos.", "Supresión cortical perfecta del desenfoque de movimiento y precisión absoluta en microsacadas (Burr, 1980; Martinez-Conde et al., 2004). Nivel de élite para deportes y esports."],
      ["Nivel 2: Agudeza de Fijación Superior", "1.4x – 1.9x Alta Velocidad", "El contorno del blanco se percibe nítido a gran velocidad; mínima distracción ocasionada por los anillos de arrastre.", "Excelente filtrado sensoriomotor de los músculos extraoculares. Gran eficacia en situaciones colmadas de efectos visuales y partículas."],
      ["Nivel 3: Estándar Funcional Sólido", "1.0x – 1.3x Velocidad Estándar", "Seguimiento regular a velocidad habitual; breve titubeo durante rebotes rápidos o cuando los anillos se vuelven muy densos.", "Rango habitual en adultos sanos. Suficiente para la conducción vehicular, deportes recreativos y videojuegos convencionales."],
      ["Nivel 4: Deriva Visual – Requiere Práctica", "0.7x – 0.9x Velocidad Moderada", "La mirada se desvía periódicamente hacia las estelas posteriores; el núcleo del objetivo abandona frecuentemente la fóvea.", "Filtrado cortical pausado frente al ruido visual. Se aconseja consolidar la fijación en las velocidades más bajas."],
      ["Nivel 5: Pérdida de Fijación – Principiante", "< 0.7x Baja Velocidad", "Los ojos oscilan de manera errática entre el objetivo y los halos residuales, perdiendo el blanco por completo.", "La coordinación neuromuscular básica debe desarrollarse a bajas velocidades manteniendo la cabeza estrictamente fija."]
    ],
    note: "Baremos fundamentados en investigaciones neurofisiológicas sobre control de fijación foveal, dinámica de microsacadas y supresión cortical de estelas de movimiento (Burr, 1980; Martinez-Conde et al., 2004; Rolfs, 2009; Krauzlis, 2004)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('burr1980', 'martinezconde2004', 'rolfs2009', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/es/drills/visual-tracking/constant-slow-pursuit", label: "Seguimiento Ocular Lento (Constant Slow)" },
    { href: "/es/drills/visual-tracking/directional-chaos-pursuit", label: "Persecución Caótica Direccional (Chaos Pursuit)" },
    { href: "/es/drills/visual-tracking/dynamic-evasion-pursuit", label: "Persecución Evasiva Dinámica (Dynamic Evasion)" },
    { href: "/es/drills/visual-tracking/infinity-pursuit", label: "Seguimiento en Ocho Infinito (Figure-8)" }
  ]
};

export default function GhostingSuppressPursuitPageEs() {
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
      <GhostingSuppressPursuitClient
        copy={{
          title: "Supresión de Estelas Visuales – Fijación Ocular",
          subtitle: "Entrenamiento de Estabilidad Foveal y Supresión de Imágenes Residuales",
          description: "Al proyectar estelas de arrastre y anillos fantasma estocásticos, este ejercicio entrena a la corteza visual para inhibir activamente las distracciones lumínicas, afianzando la fóvea en el centro del blanco (Burr, 1980; Martinez-Conde et al., 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/ghosting-suppress-pursuit" />
      </div>
    </>
  );
}
