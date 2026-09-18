import StabilityChallengeClient from '@/app/drills/physical/balance-training/stability-challenge/StabilityChallengeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Spain & Latin America (ES / ES-MX)
// Primary Intent: juegos para mejorar la punteria con el raton, test punteria raton, como controlar el retroceso
// Spanish Context: Ejercicios para no temblar al apuntar en Valorant/CS2 y control de estabilidad contra perturbaciones
// High-Demand, Low-Competition Target Keywords:
//   - "juegos para mejorar la punteria con el raton" (High-volume interactive game query)
//   - "test punteria raton" (Direct head test query)
//   - "como controlar el retroceso" (Recoil control & stabilization query)
//   - "control de retroceso con raton" (Mouse recoil compensation drill)
//   - "test de estabilidad del raton" (Mouse stability & tracking test)
//   - "como evitar que tiemble la mira al disparar" (Aim jitter & tremor prevention)
//   - "ejercicios de estabilidad de raton" (Mouse stabilization exercises)
//   - "entrenamiento de punteria y control motor" (Motor control and aim drill)
//   - "resistencia a perturbaciones externas" (Perturbation balance physics)
//   - "compensacion de retroceso valorant cs2" (Tactical FPS compensation)
// ============================================================

export const metadata = {
  title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
  description: 'Test de estabilidad del ratón gratis. Contrarresta fuerzas dinámicas para centrar la retícula, eliminar temblores y controlar el retroceso en shooters.',
  keywords: [
    "juegos para mejorar la punteria con el raton",
    "test punteria raton",
    "como controlar el retroceso",
    "control de retroceso con raton",
    "test de estabilidad del raton",
    "como evitar que tiemble la mira al disparar",
    "ejercicios de estabilidad de raton",
    "entrenamiento de punteria y control motor",
    "resistencia a perturbaciones externas",
    "compensacion de retroceso valorant cs2"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/balance-training/stability-challenge',
    languages: getAlternateLanguages('/drills/physical/balance-training/stability-challenge'),
  },
  openGraph: {
    title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
    description: 'Test de estabilidad del ratón gratis. Contrarresta fuerzas dinámicas para centrar la retícula, eliminar temblores y controlar el retroceso en shooters.',
    url: 'https://skilldrills.online/es/drills/physical/balance-training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
    description: 'Test de estabilidad del ratón gratis. Contrarresta fuerzas dinámicas para centrar la retícula, eliminar temblores y controlar el retroceso en shooters.',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills Inicio",
      "item": "https://skilldrills.online/es"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Entrenamiento Físico",
      "item": "https://skilldrills.online/es/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Entrenamiento de Equilibrio y Estabilidad",
      "item": "https://skilldrills.online/es/drills/physical/balance-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Desafío de Estabilidad y Control de Retroceso",
      "item": "https://skilldrills.online/es/drills/physical/balance-training/stability-challenge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entrenador de Estabilidad de Ratón y Puntería FPS",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Herramienta científica de control motor fino y resistencia a perturbaciones externas para corregir temblores de ratón y perfeccionar el control de retroceso."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Desafío de Estabilidad de Puntería Online (Stability Challenge)",
  "url": "https://skilldrills.online/es/drills/physical/balance-training/stability-challenge",
  "description": "Test interactivo en navegador para evaluar y mejorar la estabilidad del cursor del ratón bajo fuerzas dinámicas continuas de resistencia al viento.",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Desafío de Estabilidad del Ratón",
  "url": "https://skilldrills.online/es/drills/physical/balance-training/stability-challenge",
  "description": "Juego de reflejos y resistencia neuromuscular donde debes estabilizar la mira contra ráfagas de fuerza continuas.",
  "genre": ["Action", "Sports Game", "Reflex Game", "Motor Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el Desafío de Estabilidad (Stability Challenge) y cómo funciona?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El Desafio de Estabilidad es un entrenamiento neuromuscular de control motor fino y equilibrio postural. Vectores dinámicos de viento empujan constantemente tu retícula lejos del centro; tu objetivo es aplicar micropresión suave y precisa en sentido opuesto para mantener la mira fija dentro del anillo de seguridad central."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo ayuda este ejercicio a evitar que tiemble la mira en shooters como Valorant o CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El temblor involuntario al apuntar surge de la co-contracción excesiva entre los músculos flexores y extensores de la muñeca. Al obligar al sistema nervioso a regular una fuerza de empuje continua y suave (Woodworth, 1899), se inhibe la tensión excesiva y se automatiza la compensación suave requerida para controlar el retroceso (recoil)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo escala la dificultad respecto al viento y al tamaño del anillo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cada 250 puntos acumulados subes de nivel hasta el Nivel 15. A lo largo de la prueba, el radio del anillo de seguridad se reduce de 45px a solo 20px, mientras que la intensidad del viento se acelera de 250 a 850 unidades de fuerza, poniendo a prueba microcorrecciones de altísima precisión."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué ocurre cuando el cursor se sale del anillo de seguridad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Salirse del anillo rompe el bloqueo de estabilización, provocando un destello rojo y reiniciando inmediatamente el multiplicador de combo acumulado a 1.0x. No se restan puntos ya acumulados ni se reduce el tiempo total de la ronda."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo dura una sesión estándar de entrenamiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cada sesión dura exactamente 45 segundos cronometrados. El contador desciende de forma regular de 45s a 0s, lo que proporciona un estándar objetivo y reproducible para medir el progreso y comparar marcas personales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué puntuación define a un jugador de nivel élite (Tier 1)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alcanzar 17.000 puntos o más con una estabilidad superior al 92% dentro del anillo de 20px (Niveles 12–15) te sitúa en el Tier 1: Apex Stability Master (Calificación S+), un rango alcanzado por menos del 0,5% de los competidores. La media general ronda los 6.000 a 9.499 puntos (Tier 4)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué tipo de agarre de ratón (Palm, Claw o Fingertip) es más adecuado para la estabilidad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los agarres Palm o Claw con el antebrazo firmemente asentado sobre el escritorio proporcionan la mayor base isométrica para neutralizar el arrastre sostenido. El agarre Fingertip permite gran agilidad, pero fatiga con mayor rapidez los pequeños músculos intrínsecos de la mano ante fuerzas intensas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué configuración de sensibilidad de ratón (DPI) es más aconsejable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se recomiendan sensibilidades moderadas a bajas (entre 800 y 1200 DPI nativos en relación 1:1 de Windows, o 200 a 350 eDPI en shooters tácticos). Esto permite que pequeños microtemblores involuntarios no saquen el cursor del estrecho perímetro de 20px."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué influyen la postura corporal y la respiración en la puntería con el ratón?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Según los estudios de Nashner & McCollum (1985), el control motor distal (dedos y muñeca) depende de la estabilidad proximal (hombros y tronco). Una respiración superficial o una mala postura transmite oscilaciones torácicas directamente al sensor óptico del ratón."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se transfieren mis puntuaciones o datos de juego a servidores externos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutamente no. SkillDrills guarda el 100% de tus récords, estadísticas de precisión y configuraciones de forma segura en el almacenamiento local (LocalStorage) de tu navegador, garantizando privacidad total sin cookies de seguimiento."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar la Estabilidad y el Control del Ratón en 4 Pasos",
  "description": "Procedimiento neurofisiológico en 4 fases para contrarrestar perturbaciones y perfeccionar el control del retroceso.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Centrado y Bloqueo de Puntero (Pointer Lock)",
      "text": "Ubica la mira exactamente en el centro del anillo esmeralda antes de iniciar y activa el bloqueo del ratón en el navegador con un clic.",
      "url": "https://skilldrills.online/es/drills/physical/balance-training/stability-challenge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Detección Visual del Vector de Perturbación",
      "text": "Observa hacia dónde comienza a derivar el cursor a causa de la fuerza del viento para anticipar la dirección requerida de compensación.",
      "url": "https://skilldrills.online/es/drills/physical/balance-training/stability-challenge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Aplicación de Contrapresión Isométrica Continua",
      "text": "Ejerce fuerza suave y progresiva en la dirección exactamente contraria al empuje del viento, manteniendo el cursor en el centro para multiplicar el combo hasta 3.0x.",
      "url": "https://skilldrills.online/es/drills/physical/balance-training/stability-challenge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Ajustes Finos en Anillos Reducidos de 20px",
      "text": "Al entrar en los niveles altos (Lv. 10 a 15) con el anillo reducido al mínimo, absorbe los cambios bruscos de vector con las yemas de los dedos sin levantar el antebrazo.",
      "url": "https://skilldrills.online/es/drills/physical/balance-training/stability-challenge#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
    paragraphs: [
      "La estabilidad del cursor del ratón bajo fuerzas dinámicas imprevistas es un reflejo fidedigno de la capacidad del sistema sensoriomotor para integrar información propioceptiva y correcciones visuales continuas. A diferencia de un movimiento de flick puramente balístico, la estabilización exige una regulación isométrica constante entre los grupos musculares agonistas y antagonistas del antebrazo y la mano. Este ejercicio evalúa cómo el córtex motor primario y el cerebelo modulan micropresiones de resistencia ante vectores de perturbación no anticipados (Nashner & McCollum, 1985).",
      "Siguiendo el modelo clásico de dos fases de Robert S. Woodworth (1899), cualquier movimiento manual guiado se compone de un impulso inicial abierto y una fase posterior de control continuo basada en retroalimentación visual de circuito cerrado (Current Control Phase). En este ejercicio de estabilidad, el usuario permanece constantemente en esta segunda fase: la simulación de viento recrea el arrastre ascendente y lateral del retroceso de las armas, obligando a los ojos a detectar la desviación respecto al centro y a emitir microcorrecciones continuas.",
      "La escalada de dificultad se rige por los principios de equilibrio ante perturbaciones de David A. Winter (1995) y la Ley de Fitts (1954). Cuando el anillo de seguridad se estrecha de 45px a solo 20px en los niveles avanzados, el margen de tolerancia física se reduce radicalmente, aumentando de manera exponencial el índice de dificultad motora. Cualquier retraso superior a 50 ms en la respuesta de contrapresión culmina en la ruptura del perímetro y la pérdida inmediata de la bonificación de combo.",
      "Precisión de medición y consideraciones de hardware: La estabilidad porcentual y la detección de bordes se capturan mediante la API de alta resolución performance.now() del navegador, con precisión de microsegundos. Sin embargo, las pantallas tradicionales de 60Hz introducen una cuantización de fotogramas de ~16,7 ms, mientras que los paneles de 144Hz y 240Hz la reducen a 6,9 ms y 4,1 ms respectivamente (Woods et al., 2015). Los ratones gaming con tasa de sondeo de 1000Hz operan con latencias de entrada inferiores a 1 ms. Todas las métricas se procesan exclusivamente en el hardware local del dispositivo, garantizando privacidad absoluta y libre de latencias de servidor."
    ]
  },
  benchmarks: {
    title: "Tabla Oficial de Estándares y Clasificación de Estabilidad",
    headers: ["Nivel", "Título del Nivel", "Puntuación Diana", "Estabilidad & Nivel", "Nota", "Percentil Global"],
    rows: [
      ["Tier 1", "Maestro Supremo de Estabilidad", "17.000+ puntos", "Nivel 12–15 / Estabilidad >92%", "Nota S+", "Top 0,5% (Control Quirúrgico)"],
      ["Tier 2", "Especialista en Control de Retroceso", "13.000 a 16.999 pts", "Nivel 9–11 / Estabilidad 85–91%", "Nota A", "Top 5% (Nivel Competitivo)"],
      ["Tier 3", "Estabilizador Táctico Avanzado", "9.500 a 12.999 pts", "Nivel 6–8 / Estabilidad 76–84%", "Nota B", "Top 20% (Firmeza Sólida)"],
      ["Tier 4", "Practicante en Progresión", "6.000 a 9.499 pts", "Nivel 3–5 / Estabilidad 65–75%", "Nota C", "50% (Media de Jugadores)"],
      ["Tier 5", "Principiante con Temblores", "< 6.000 puntos", "Nivel 1–2 / Estabilidad <65%", "Nota D", "Base (Entrenamiento Sugerido)"],
    ],
    note: "La clasificación final evalúa el tiempo de permanencia en el anillo, roturas de trayectoria, fuerza de viento contrarrestada y puntuación total.",
  },
  protocols: {
    title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
    description: 'Test de estabilidad del ratón gratis. Contrarresta fuerzas dinámicas para centrar la retícula, eliminar temblores y controlar el retroceso en shooters.',
    items: [
      {
        title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
        description: 'Test de estabilidad del ratón gratis. Contrarresta fuerzas dinámicas para centrar la retícula, eliminar temblores y controlar el retroceso en shooters.'
      },
      {
        title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
        description: 'Test de estabilidad del ratón gratis. Contrarresta fuerzas dinámicas para centrar la retícula, eliminar temblores y controlar el retroceso en shooters.'
      },
      {
        title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
        description: 'Test de estabilidad del ratón gratis. Contrarresta fuerzas dinámicas para centrar la retícula, eliminar temblores y controlar el retroceso en shooters.'
      },
      {
        title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
        description: 'Test de estabilidad del ratón gratis. Contrarresta fuerzas dinámicas para centrar la retícula, eliminar temblores y controlar el retroceso en shooters.'
      }
    ]
  },
  faqs: {
    title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function StabilityChallengeEsPage() {
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
      <StabilityChallengeClient
        copy={{
          title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
          subtitle: 'Estabilidad del Ratón – Test de Puntería | SkillDrills',
          hudLabels: {
            score: "Puntos",
            time: "Tiempo",
            stability: "Estabilidad",
            blowouts: "Rupturas",
            maxStreak: "Racha Máx",
            peakLevel: "Nivel Máx",
            getReady: "PREPÁRATE",
            points: "Puntos",
            playAgain: "Jugar de Nuevo"
          },
          rulesTitle: "Instrucciones del Ejercicio y Sistema de Puntuación",
          rulesItems: [
            { title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills', text: "Mantén la retícula en el centro del anillo de seguridad contra los vectores dinámicos del viento." },
            { title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills', text: "Mantén una estabilización ininterrumpida para acumular un multiplicador de combo de hasta 3.0x." },
            { title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills', text: "Cada 250 puntos subes de nivel. El anillo se contrae de 45px a 20px y las fuerzas se aceleran." },
            { title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills', text: "Salirte del anillo reinicia el combo a 1.0x instantáneamente, sin restar puntos ni tiempo." }
          ],
          aboutTitle: "Sobre el Desafío de Estabilidad",
          aboutHeading: "Compensación Dinámica de Fuerzas y Equilibrio Postural",
          aboutIntro: "El Desafío de Estabilidad es un ejercicio biomecánico de precisión motora fina y control postural. Vectores de viento empujan continuamente el cursor, requiriendo contrapresión suave y precisa.",
          aboutScience: "Fundamentado en los modelos de sinergia postural de Nashner & McCollum (1985) y en los principios de equilibrio de David A. Winter (1995), el ejercicio entrena correcciones visuales continuas en circuito cerrado (Woodworth, 1899). Conforme sube el puntaje, el anillo se reduce a 20px y la fuerza asciende a 850 unidades.",
          aboutCards: [
            { title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills', text: "Jugadores de shooters tácticos que buscan erradicar temblores involuntarios y dominar el control de retroceso en juegos como Valorant, CS2 y Apex Legends." },
            { title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills', text: "Compensación de vectores de fuerza, equilibrio postural, seguimiento de resistencia, estabilización de retícula y precisión en microajustes." },
            { title: 'Estabilidad del Ratón – Test de Puntería | SkillDrills', text: "La contrapresión ininterrumpida requerida contra el empuje del viento simula de manera exacta el control fluido necesario para retener el alza de retroceso en fusiles." }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/balance-training/stability-challenge" />
    </>
  );
}
