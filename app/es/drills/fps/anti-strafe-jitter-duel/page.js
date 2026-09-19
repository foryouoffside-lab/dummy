import AntiStrafeJitterClient from '@/app/drills/fps/anti-strafe-jitter-duel/AntiStrafeJitterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Tracking Reactivo – Entrenamiento Anti-Strafe | SkillDrills",
  description: "Entrena tracking reactivo contra strafes erráticos ADAD en el navegador. Domina duelos a corta distancia y microcorrecciones en Apex Legends y Overwatch 2.",
  keywords: [
    "entrenamiento de tracking reactivo",
    "anti strafe entrenamiento fps",
    "como seguir el strafe adad",
    "tracking a corta distancia fps",
    "jitter aim entrenamiento raton",
    "entrenar punteria en movimiento rapido",
    "microcorrecciones de tracking fps",
    "punteria contra strafe rapido apex",
    "entrenador de tracking reactivo gratis",
    "duelos a corta distancia overwatch 2",
    "cambios de direccion tracking raton",
    "seguimiento de blancos esquivos pc"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/fps/anti-strafe-jitter-duel",
    languages: getAlternateLanguages('/drills/fps/anti-strafe-jitter-duel'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tracking Reactivo – Entrenamiento Anti-Strafe | SkillDrills",
    description: "Entrena tracking reactivo contra strafes erráticos ADAD en el navegador. Domina duelos a corta distancia y microcorrecciones en Apex Legends y Overwatch 2.",
    url: "https://skilldrills.online/es/drills/fps/anti-strafe-jitter-duel",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tracking Reactivo – Entrenamiento Anti-Strafe | SkillDrills",
    description: "Entrena tracking reactivo contra strafes erráticos ADAD en el navegador. Domina duelos a corta distancia y microcorrecciones en Apex Legends y Overwatch 2.",
  },
};

export default function AntiStrafeJitterEsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
      { "@type": "ListItem", "position": 2, "name": "Drills de FPS", "item": "https://skilldrills.online/es/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Entrenador Anti-Strafe", "item": "https://skilldrills.online/es/drills/fps/anti-strafe-jitter-duel" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Anti-Strafe Jitter Trainer",
    "url": "https://skilldrills.online/es/drills/fps/anti-strafe-jitter-duel",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requiere soporte para JavaScript y HTML5 Canvas con Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Entrenador online de tracking reactivo contra strafes rápidos ADAD. Perfecciona tu puntería contra blancos impredecibles en Apex Legends y Overwatch 2."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Anti-Strafe Jitter Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Mejora el tracking reactivo, la puntería anti-strafe y el control de duelos a corta distancia con entrada directa de ratón.",
    "genre": "Entrenamiento FPS / Anti-Strafe",
    "url": "https://skilldrills.online/es/drills/fps/anti-strafe-jitter-duel",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Anti-Strafe Jitter Trainer",
    "gamePlatform": "Web Browser",
    "genre": ["Entrenamiento de FPS", "Entrenador de Puntería"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "url": "https://skilldrills.online/es/drills/fps/anti-strafe-jitter-duel",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "dateModified": "2026-09-16"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es el tracking reactivo en juegos de disparos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es la capacidad neuromuscular de reajustar la mira de forma inmediata cuando un enemigo cambia de dirección de forma imprevista, sin seguir un patrón constante."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo combatir a oponentes que hacen strafe rápido ADAD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evitando tensar excesivamente la mano y manteniendo la atención en el centro del cuerpo rival. El antebrazo realiza frenados suaves en lugar de movimientos bruscos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué cuesta tanto acertar a rivales con cambios de sentido rápidos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Por la latencia de procesamiento visual (deslizamiento retiniano): el cerebro tarda entre 160 y 200 ms en percibir que el rival ha cambiado de dirección."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es el 'death grip' y por qué perjudica la puntería?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es agarrar el ratón con demasiada fuerza por tensión nerviosa. Contrae los músculos antagonistas del brazo, bloquea la muñeca y vuelve la mira rígida e incontrolable."
        }
      },
      {
        "@type": "Question",
        "name": "¿Sirve este ejercicio para Apex Legends, Overwatch 2 y Warzone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. En juegos con tiempo para matar (TTK) elevado, los combates cercanos se ganan manteniendo el retículo pegado al cuerpo del adversario mientras se mueve."
        }
      },
      {
        "@type": "Question",
        "name": "¿Debo mirar mi propia cruceta o directamente al enemigo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mira siempre al modelo del enemigo. La corteza visual analiza la velocidad a partir de los bordes del objetivo y guía la mano mediante la vía visual dorsal."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es la sensibilidad adecuada para tracking a corta distancia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sensibilidades intermedias de entre 28 cm y 38 cm por 360 grados proporcionan suficiente agilidad de muñeca sin sacrificar la estabilidad del antebrazo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Con qué frecuencia se debe practicar tracking reactivo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sesiones diarias de 10 a 15 minutos fijan los reflejos en los músculos del brazo sin sobrecargar tendones ni provocar dolores articulares."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es la diferencia entre tracking suave y reactivo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El tracking suave sigue movimientos lineales y previsibles. El tracking reactivo responde a frenazos, fintas y aceleraciones erráticas e instantáneas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Admite el simulador entrada directa de ratón sin aceleración?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Opera con la API HTML5 Pointer Lock y cronometría mediante performance.now(), garantizando una respuesta limpia y directa de 1:1."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Entrenar Puntería Anti-Strafe y Tracking Reactivo",
    "description": "Instrucciones paso a paso para mejorar el tracking contra strafes de alta frecuencia.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibra la sensibilidad de tu juego",
        "text": "Ajusta la sensibilidad para replicar con precisión 1:1 la memoria muscular de tu shooter habitual."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Bloquea el cursor mediante Pointer Lock",
        "text": "Haz clic en Iniciar Drill para bloquear el puntero y eliminar las curvas de aceleración del navegador."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Enfoca la mirada en el cuerpo del blanco",
        "text": "Mantén la concentración visual en la masa del blanco para anticipar los cambios de sentido al instante."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Realiza microinversiones suaves y sin rigidez",
        "text": "Sostén el ratón con soltura y absorbe los cambios con la muñeca y los dedos, evitando movimientos bruscos."
      }
    ]
  };

  const antiStrafeGuideEs = {
    heading: "Guía de Tracking Reactivo y Benchmarks Psicomotores Anti-Strafe",
    intro: [
      "En combates cerrados a corta distancia, los duelos se resuelven en décimas de segundo donde los rivales realizan strafes imprevisibles en ADAD, agachamientos rápidos y cambios súbitos de velocidad. A diferencia del tracking de persecución suave, donde se sigue un vector lineal continuo (Krauzlis, 2004), el tracking reactivo exige corregir errores retinianos en bucle cerrado de forma ininterrumpida (Rashbass, 1961). Los jugadores de videojuegos de acción poseen mejor atención visual y procesamiento temporal (Green & Bavelier, 2003), pero siguen sujetos a límites fisiológicos cada vez que el oponente invierte la marcha.",
      "Cuando un objetivo cambia bruscamente de dirección, la imagen sale de la fóvea y se produce un deslizamiento retiniano. El cerebro no puede predecir el giro: necesita captar la desaceleración, emitir la orden motora de frenado, detener la mano e impulsar el movimiento contrario. En juegos con TTK elevado —como Apex Legends, Overwatch 2 y Warzone— la victoria depende del tiempo efectivo que la cruceta se mantiene sobre la hitbox del enemigo en movimiento.",
      "Anti-Strafe Jitter Trainer opera bajo la API HTML5 Pointer Lock con traducción 1:1 directa de hardware y marcas de tiempo de alta precisión performance.now(). Al suprimir la latencia de interpolación del software (Woods et al., 2015), ofrece métricas precisas para adiestrar a los músculos antagonistas y eliminar los temblores en la mira.",
      "Evaluación del rendimiento: cada décima de segundo de puntería se computa de forma local en tu ordenador. Mantén constantes los ajustes de DPI y sensibilidad para consolidar patrones motores estables."
    ],
    benchmarks: {
      title: "Benchmarks de Latencia en Inversión de Sentido y Tracking",
      headers: ["Fase de Procesamiento / Nivel", "Rango Típico de Latencia", "Vía Neural y Función Biomecánica", "Implicación en Combate"],
      rows: [
        ["Detección Visual del Cambio de Dirección", "160 – 210 ms", "Señales de deslizamiento retiniano en V1 y área visual MT/V5", "Retardo inicial antes de advertir que el objetivo ha invertido el movimiento"],
        ["Latencia de Reversión Motora del Brazo", "80 – 130 ms", "Transmisión corticoespinal a flexores/extensores y frenado antagonista", "Tiempo físico para detener la deriva del ratón e iniciar el vector opuesto"],
        ["Microalineamiento Foveal Terminal", "60 – 100 ms", "Centrado foveal fino y reajuste subumbral", "Eliminación de sobreimpulso y bloqueo definitivo de la mira en la hitbox"],
        ["Ventana Total de Reincorporación sin Preaviso", "300 – 440 ms", "Suma de detección visual, reversión motora y recentrado final", "Penalización humana inevitable ante giros completamente imprevistos"],
        ["Tracking Reactivo de Élite con Preparación", "210 – 290 ms", "Amortiguación de velocidad anticipatoria y supresión motora relajada", "Nivel de maestría de profesionales en torneos de Apex Legends y Overwatch"]
      ],
      note: "Datos basados en estudios oculomotores (Rashbass, 1961; Krauzlis, 2004), ciencias cognitivas del videojuego (Green & Bavelier, 2003) y cronometría digital (Woods et al., 2015). La precisión final varía con los hercios de la pantalla y la relajación muscular."
    },
    techniques: {
      title: "Técnicas Comprobadas de Tracking y Anti-Strafe",
      items: [
        {
          name: "Relajación Muscular Antagonista (Evitar el Death Grip)",
          desc: "El fallo más habitual en strafes cortos es apretar el ratón con demasiada fuerza. La cocontracción muscular bloquea la muñeca y genera saltos irregulares en la mira con exceso de recorrido.",
          tips: "Mantén un agarre suelto. Deja que los dedos y la muñeca amortigüen las oscilaciones cortas mientras el brazo guía los barridos amplios."
        },
        {
          name: "Fijación Visual Centrada en el Objetivo",
          desc: "No te quedes mirando tu propia mira. Clava los ojos en la masa central del rival. La corteza visual analiza la velocidad de forma automática gracias al contraste del cuerpo.",
          tips: "Si notas que la mira se queda rezagada, enfoca el cien por cien de tu atención en las caderas y el torso del enemigo."
        },
        {
          name: "Inversiones Suaves (Evitar Flicks Excesivos)",
          desc: "Cuando el blanco cambia de sentido, los jugadores novatos lanzan un flick violento hacia el otro lado y fallan por sobreimpulso. Los jugadores expertos frenan de forma controlada y deslizan la mira de vuelta.",
          tips: "Trata los cambios de sentido como un ciclo fluido de frenado y aceleración, no como dos disparos separados."
        },
        {
          name: "Lectura de Caderas y Cuadros de Desaceleración",
          desc: "En juegos con inercia (como Apex Legends), los personajes deben desacelerar antes de cambiar de dirección. Observar la inclinación del cuerpo otorga entre 30 y 50 ms de aviso visual previo.",
          tips: "Fíjate en la inclinación del torso para preparar los músculos antes de que la velocidad cambie totalmente."
        }
      ]
    },
    steps: [
      "Ajusta tu sensibilidad para mantener la misma memoria muscular 1:1 que tienes en tu juego habitual.",
      "Pulsa Iniciar Drill para pasar a pantalla completa y activar la entrada directa de ratón Pointer Lock.",
      "Clava la mirada en la esfera que ejecuta movimientos erráticos laterales en ADAD.",
      "Mantén la cruceta pegada al blanco absorbiendo las oscilaciones con la muñeca relajada.",
      "Acumula tiempo sobre el objetivo para desbloquear niveles y revisa tu precisión al terminar."
    ],
    audience: "Jugadores de Apex Legends, Overwatch 2, Warzone, The Finals y shooters con TTK alto que buscan dominar el tracking a corta distancia y erradicar los temblores en la mira.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'green2003', 'rashbass1961'),
    related: [
      { href: "/drills/fps/fps-tracking-trainer", label: "Entrenador de Tracking FPS" },
      { href: "/drills/fps/pro-smooth-pursuit", label: "Entrenador de Persecución Suave" },
      { href: "/drills/fps/flick-shot-training", label: "Entrenamiento de Flick Shot" },
      { href: "/drills/fps/180-degree-awareness", label: "Entrenamiento de Giro 180°" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Test de Tiempo de Reacción" }
    ]
  };

  const copyEs = {
    h1Keyword: "Tracking Reactivo",
    h1Suffix: " — Entrenamiento Anti-Strafe",
    statScore: "Puntos",
    statTime: "Tiempo",
    statAccuracy: "Precisión",
    statBestScore: "Récord",
    startTitle: "Duelo Anti-Strafe Jitter",
    startSubtitle: "Tracking Reactivo • Progresión Infinita de Niveles",
    getReady: "PREPÁRATE",
    pausedTitle: "PAUSADO",
    pausedSubtitle: "Haz clic para reanudar — el cursor se bloqueará de nuevo.",
    stageCaption: "Mantén el retículo sobre blancos rápidos en ADAD. ¡Relaja la mano para cambiar de dirección con soltura!",
    rulesTitle: "Reglas de Entrenamiento y Puntuación",
    rulesItems: [
      { num: "1", text: "Alineación de Mira", highlight: "+50 PTS (+0.4s/s)", result: "×Mult de Combo" },
      { num: "2", text: "Combo Continuo", highlight: "Hasta 3.0×", result: "Multiplicador Máx" },
      { num: "3", text: "Progresión de Nivel", highlight: "+1 Nivel / 1400 PTS", result: "Jitter Adaptativo" },
      { num: "4", text: "Penalización de Desvío", highlight: "1.0s Fuera del Blanco", result: "Reinicia Combo (-0.6s)" }
    ],
    aboutTitle: "Sobre el Tracking Reactivo Anti-Strafe"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <AntiStrafeJitterClient copy={copyEs} />
      <DrillGuide guide={antiStrafeGuideEs} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/anti-strafe-jitter-duel"
          locale="es"
        />
      </div>
      <DrillFooter />
    </>
  );
}
