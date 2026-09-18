import RecoilControlClient from '@/app/drills/fps/recoil-control/RecoilControlClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Control de Retroceso FPS – Spray Pattern | SkillDrills",
  description: "Entrena el control de retroceso y patrones de spray en tu navegador. Domina la compensación vertical y ráfagas para CS2 y Valorant gratis.",
  keywords: [
    "control de retroceso fps",
    "entrenamiento de recoil cs2",
    "controlar spray valorant",
    "como controlar el retroceso raton",
    "entrenar spray pattern cs2",
    "bajar el raton retroceso",
    "entrenador de recoil gratis",
    "compensacion de retroceso fps",
    "spray transfer entrenamiento",
    "patron de dispersion de armas",
    "mejorar precision de rafaga",
    "entrenar retroceso armas pc"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/fps/recoil-control",
    languages: getAlternateLanguages('/drills/fps/recoil-control'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Control de Retroceso FPS – Spray Pattern | SkillDrills",
    description: "Entrena el control de retroceso y patrones de spray en tu navegador. Domina la compensación vertical y ráfagas para CS2 y Valorant gratis.",
    url: "https://skilldrills.online/es/drills/fps/recoil-control",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Control de Retroceso FPS – Spray Pattern | SkillDrills",
    description: "Entrena el control de retroceso y patrones de spray en tu navegador. Domina la compensación vertical y ráfagas para CS2 y Valorant gratis.",
  },
};

export default function RecoilControlPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://skilldrills.online/es"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ejercicios FPS",
        "item": "https://skilldrills.online/es/drills/fps"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Control de Retroceso",
        "item": "https://skilldrills.online/es/drills/fps/recoil-control"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entrenador de Control de Retroceso SkillDrills",
    "url": "https://skilldrills.online/es/drills/fps/recoil-control",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requiere navegador moderno con soporte de API Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entrenamiento de Control de Retroceso y Spray",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Recoil Control Pattern Trainer",
    "description": "Simulador de patrones de retroceso y compensación motora con bloqueo de cursor.",
    "genre": ["Action", "Esports Trainer", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Browser Game"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es el control de retroceso (Recoil Control) en FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El control de retroceso es la habilidad psicomotora de contrarrestar la elevación y dispersión lateral de las armas automáticas desplazando el ratón en la trayectoria opuesta al patrón de disparo del arma."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué los primeros 8 a 10 disparos son la fase más crítica del spray?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En la mayoría de shooters tácticos, las primeras 8 a 10 balas siguen un retroceso principalmente vertical altamente predecible. Controlar esta fase inicial garantiza bajas letales en la fracción inicial del duelo."
        }
      },
      {
        "@type": "Question",
        "name": "¿En qué se diferencia el retroceso entre CS2, Valorant y Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En CS2 el spray sigue trayectorias fijas y reproducibles. En Valorant el retroceso vertical es fijo, pero la dispersión horizontal final tiene factores aleatorios. En Apex Legends el retroceso es continuo y adaptado a objetivos en rápido movimiento."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo explica el Programa Motor Generalizado (GMP) la memoria muscular del spray?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Según Schmidt & Lee (2011), el cerebro almacena la trayectoria compensatoria en programas motores de bucle abierto. Como las armas disparan cada 70 ms y la visión tarda unos 200 ms en reaccionar, el control del spray se ejecuta por memoria anticipada sin esperar la vista."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es un spray transfer y cómo se ejecuta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consiste en cambiar el punto de apuntado hacia un segundo enemigo sin soltar el clic de disparo continuo, ajustando simultáneamente la posición del spray actual en el cargador y la distancia angular al nuevo blanco."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo influyen la sensibilidad y el rozamiento de la alfombrilla en el control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Una sensibilidad moderada facilita un deslizamiento vertical del antebrazo con mayor precisión. Alfombrillas con fricción equilibrada ayudan a frenar tirones excesivos hacia abajo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Se debe tirar hacia abajo con la muñeca o con el antebrazo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Para ráfagas cortas de 5 a 7 balas la muñeca y los dedos son suficientes. En sprays prolongados de 30 balas es indispensable involucrar el antebrazo para no bloquear el rango articular de la muñeca."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es la diferencia entre dispersión aleatoria (bloom) y patrón de retroceso?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El retroceso es un desplazamiento ordenado y compensable mecánicamente. El bloom es el cono estocástico aleatorio de desviación de cada proyectil que no se puede anticipar completamente."
        }
      },
      {
        "@type": "Question",
        "name": "¿Este simulador de retroceso es totalmente gratuito en navegador?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, funciona directamente en el navegador con soporte de Pointer Lock API de baja latencia sin registros ni descargas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Con qué frecuencia se debe practicar el control de retroceso?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Se recomiendan entre 10 y 15 minutos diarios antes de competir para consolidar la memoria motora fina sin sobrecargar los tendones flexores de la mano."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo Entrenar el Control de Retroceso en Disparos FPS",
    "description": "Protocolo estructurado para memorizar la bajada del ratón y el control de patrones de spray.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configuración y Bloqueo de Puntero",
        "text": "Ajusta tus parámetros exactos de DPI y sensibilidad y activa el Pointer Lock para mantener correspondencia 1:1."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Bajada Vertical en Disparo Inicial",
        "text": "Al iniciar el fuego sostenido, desplaza el ratón hacia abajo con velocidad constante compensando la subida del arma."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Compensación de Oscilaciones Laterales",
        "text": "A partir del décimo proyectil, modula el ratón hacia los lados en sentido opuesto a la dispersión de la trayectoria."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Mantenimiento del Grupo de Impactos",
        "text": "Conserva todos los impactos agrupados en la silueta central para elevar tu multiplicador de puntuación."
      }
    ]
  };

  const copyEs = {
    h1Keyword: "Control de Retroceso",
    h1Suffix: " – Entrenador de Spray FPS",
    caption: "Controla el retroceso vertical y lateral arrastrando el ratón en la dirección opuesta al patrón de disparo.",
    statScore: "Puntuación",
    statTime: "Tiempo",
    statAccuracy: "Precisión",
    statBest: "Récord",
    statAmmo: "Munición",
    statReloading: "RECARGANDO...",
    pausedTitle: "Juego Pausado",
    pausedPrompt: "Haz clic en la pantalla para reactivar el bloqueo de cursor.",
    startTitle: "Entrenador Profesional de Retroceso",
    startSubtitle: "Patrones de Spray y Compensación Motora • Progresión Continua",
    startButtonText: "INICIAR ENTRENAMIENTO",
    getReady: "PREPÁRATE",
    statHeadshots: "Headshots",
    statMaxCombo: "Combo Máximo",
    statPeakLevel: "Nivel Máximo",
    playAgainText: "JUGAR DE NUEVO",
    shareText: "COMPARTIR RESULTADO",
    rulesTitle: "Instrucciones de Entrenamiento y Puntuación",
    rulesItems: [
      { num: "1", text: "Compensar Subida Inicial", highlight: "+10 pts/tiro", result: "Baja el ratón en los primeros 10 disparos" },
      { num: "2", text: "Ajuste Horizontal", highlight: "hasta +35 pts/tiro", result: "Corrige las desviaciones laterales del spray" },
      { num: "3", text: "Subida de Nivel", highlight: "cada 1.500 puntos", result: "Incrementa cadencia y dispersión del arma" },
      { num: "4", text: "Pérdida de Precisión", highlight: "Reinicia Combo", result: "Disparos fuera del blanco restablecen el combo" }
    ],
    aboutTitle: "Sobre el Entrenamiento de Retroceso",
    aboutHeading: "¿Qué es el Control de Retroceso (Recoil)?",
    aboutText: "El retroceso es el movimiento ascendente y lateral acumulativo que experimenta el arma al disparar en ráfagas. Su control demanda programas motores de bucle abierto (Schmidt & Lee, 2011) que corrigen la trayectoria por anticipación muscular sin depender del retardo visual."
  };

  const recoilControlGuide = {
    heading: "Guía de Control de Retroceso & Padrón de Spray en Shooters FPS",
    intro: [
      "El Entrenador Profesional de Control de Retroceso es un simulador psicomotor concebido para aislar y perfeccionar la compensación mecánica en armas automáticas. En títulos tácticos y de alta movilidad como CS2, Valorant, Apex Legends y PUBG, la concentración del spray decide de forma fulminante los tiroteos.",
      "A diferencia de los ajustes finos pausados, las armas de fuego sostenido operan a cadencias de entre 600 y 900 disparos por minuto, expulsando un proyectil cada 66 a 100 ms. Puesto que la respuesta visual humana promedia los 200 ms, compensar el retroceso depende de Programas Motores Generalizados (GMP) de circuito abierto (Schmidt & Lee, 2011; Wolpert & Kawato, 1998) grabados en la memoria muscular.",
      "El módulo condiciona al tirador en dos etapas críticas: un arrastre vertical uniforme durante los primeros 10 tiros y una modulación lateral compensatoria durante el resto del cargador, simulando las dinámicas auténticas del armamento de competición.",
      "Mediante la API de Pointer Lock y cronometría de alta resolución con performance.now() (Woods et al., 2015), la herramienta mide el agrupamiento milimétrico de los impactos respecto al centro de masa para eliminar sobrecompensaciones y tirones involuntarios.",
      "Cómo se mide: el porcentaje de impactos y el agrupamiento se computan localmente en tu navegador. Variaciones menores a 5 ms corresponden a tolerancias habituales de frecuencia de monitor y tasa de sondeo del sensor."
    ],
    benchmarks: {
      title: "Niveles de Rendimiento de Precisión por Cargador y Control de Spray",
      headers: ["Nivel de Habilidad", "Precisión por Cargador (%)", "Características de Control Motor", "Impacto Competitivo en Juego"],
      rows: [
        ["Tier 1 (Láser Apex)", "78% – 90%+", "Ajuste de velocidad casi perfecto; micro compensaciones laterales a lo largo de las 30 balas sin dispersión", "Spray transfers letales sobre múltiples rivales en CS2 Faceit Nivel 10, Valorant Radiant y Apex Predator"],
        ["Tier 2 (Pro Competitivo)", "62% – 78%", "Agrupación precisa en los primeros 10 disparos; recentrado ágil en oscilaciones laterales del spray", "Gana sistemáticamente duelos de fusil a media distancia; excelente regularidad en spray transfers dobles"],
        ["Tier 3 (Nivel Avanzado FPS)", "48% – 62%", "Buena bajada vertical; ligeras vacilaciones o sobrecompensación entre las balas 12 y 25", "Sprays consistentes a corta y media distancia; leve dificultad en transferencias lejanas"],
        ["Tier 4 (Intermedio)", "35% – 48%", "Velocidad de bajada desigual; dudas en torno a la séptima bala permitiendo que la mira supere la cabeza", "Vulnerable en intercambios directos de fuego continuo; obligado a recurrir a ráfagas cortas"],
        ["Tier 5 (En Desarrollo)", "Menos de 35%", "Arrastre vertical tardío o errático; falta de ajuste lateral que produce dispersión descontrolada", "Pérdida continua de duelos directos; la ráfaga se dispersa por completo alrededor del blanco"]
      ],
      note: "Los niveles valoran el porcentaje de impactos logrados en la silueta central en sprays completos de 30 balas medidos con performance.now() (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Basados en Evidencia para Optimizar el Control de Retroceso",
      items: [
        {
          name: "División del Spray en Dos Fases Motoras",
          desc: "Estructura el cargador como dos acciones distintas: una bajada vertical firme y fluida en las primeras 10 balas y micro ajustes laterales con los dedos en las restantes.",
          tips: "La inmensa mayoría de bajas tácticas se producen en los primeros 8 disparos; perfecciona esa primera fase."
        },
        {
          name: "Deslizamiento con el Antebrazo",
          desc: "Mueve el antebrazo sobre el escritorio para ejecutar la bajada continua, evitando forzar la muñeca hacia una flexión extrema.",
          tips: "Doblar la muñeca al límite bloquea la movilidad lateral necesaria para corregir las oscilaciones finales del spray."
        },
        {
          name: "Aprovechamiento de la Fricción Dinámica",
          desc: "Ejerce una presión descendente suave y regular para apoyarte en la fricción de la alfombrilla y evitar tirones verticales excesivos.",
          tips: "Una alfombrilla con textura controlada facilita descensos más homogéneos sin aceleraciones desmedidas."
        },
        {
          name: "Fijación Visual en el Objetivo y no en la Retícula",
          desc: "Mantén tu mirada clavada en la silueta del adversario. Deja que la mano ejecute la trayectoria inversa de forma automatizada.",
          tips: "Intentar seguir la retícula genera correcciones tardías de 200 ms que empeoran el agrupamiento de los tiros."
        }
      ]
    },
    steps: [
      "Configura tu sensibilidad y DPI habituales para garantizar equivalencia muscular de cm/360 y bloquea el cursor.",
      "Al iniciar el fuego, aplica una bajada suave y constante que neutralice la subida inicial del cañón.",
      "Superada la décima bala, modula el ratón a los lados en sentido opuesto a la desviación horizontal del arma.",
      "Mantén todos los disparos agrupados en la diana central para elevar el multiplicador de combo y avanzar de nivel."
    ],
    audience: "Jugadores de CS2, Valorant, Apex Legends y PUBG interesados en dominar sprays prolongados, suprimir el retroceso y transferir fuego con solvencia.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'woodworth1899'),
    related: [
      { href: "/es/drills/fps/flick-shot-training", label: "Entrenamiento de Flick Shot" },
      { href: "/es/drills/fps/pro-smooth-pursuit", label: "Tracking Suave Profesional" },
      { href: "/es/drills/fps/micro-correction-precision", label: "Micro Corrección de Puntería" },
      { href: "/es/drills/fps/anti-strafe-jitter-duel", label: "Duelo Anti-Strafe Jitter" }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <RecoilControlClient copy={copyEs} />

      <DrillGuide guide={recoilControlGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/recoil-control"
          locale="es"
        />
      </div>
    </>
  );
}
