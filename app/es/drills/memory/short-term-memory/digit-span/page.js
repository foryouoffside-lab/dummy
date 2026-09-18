import DigitSpanClient from '@/app/drills/memory/short-term-memory/digit-span/DigitSpanClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Dígitos Online – Amplitud de Memoria | SkillDrills",
  description: "Test de dígitos online gratis: Memoriza secuencias numéricas crecientes y evalúa tu bucle fonológico y memoria de trabajo directamente en el navegador.",
  keywords: [
    "test de digitos",
    "amplitud de digitos",
    "test de digitos wais",
    "bucle fonologico test",
    "memoria de trabajo numerica",
    "juego de recordar numeros",
    "evaluacion de memoria a corto plazo",
    "test de retencion numerica",
    "ejercicios de amplitud mnemonica",
    "tecnica de agrupamiento numeros",
    "test neuropsicologico digitos",
    "entrenamiento de memoria de trabajo"
  ],
  openGraph: {
    title: "Test de Dígitos Online – Amplitud de Memoria | SkillDrills",
    description: "Test de dígitos online gratis: Memoriza secuencias numéricas crecientes y evalúa tu bucle fonológico y memoria de trabajo directamente en el navegador.",
    type: 'website',
    url: 'https://skilldrills.online/es/drills/memory/short-term-memory/digit-span',
    siteName: 'SkillDrills',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Dígitos Online – Amplitud de Memoria | SkillDrills",
    description: "Test de dígitos online gratis: Memoriza secuencias numéricas crecientes y evalúa tu bucle fonológico y memoria de trabajo directamente en el navegador.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/memory/short-term-memory/digit-span',
    languages: getAlternateLanguages('/drills/memory/short-term-memory/digit-span'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Entrenamiento de Memoria", "item": "https://skilldrills.online/es/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "Memoria a Corto Plazo", "item": "https://skilldrills.online/es/drills/memory/short-term-memory" },
    { "@type": "ListItem", "position": 4, "name": "Test de Dígitos", "item": "https://skilldrills.online/es/drills/memory/short-term-memory/digit-span" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Dígitos Online (Digit Span)",
  "url": "https://skilldrills.online/es/drills/memory/short-term-memory/digit-span",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Test de Dígitos Online (Digit Span)",
  "url": "https://skilldrills.online/es/drills/memory/short-term-memory/digit-span",
  "description": "Evaluación neuropsicológica interactiva para medir la amplitud de memoria de trabajo numérica, el bucle fonológico y la velocidad de repaso articulatorio.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Working Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Dígitos Online (Digit Span)",
  "url": "https://skilldrills.online/es/drills/memory/short-term-memory/digit-span",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo entrenar la amplitud de dígitos y la memoria numérica",
  "description": "Protocolo sistemático de cuatro pasos para codificar y retener secuencias numéricas mediante agrupamiento rítmico.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/es/drills/memory/short-term-memory/digit-span#step-1",
      
      "name": "Fijar la atención en el centro",
      "text": "Enfoca la mirada en el recuadro central durante los 3 segundos de exposición de la secuencia numérica."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/es/drills/memory/short-term-memory/digit-span#step-2",
      
      "name": "Agrupamiento rítmico en tríadas",
      "text": "Divide los números en grupos de 2 o 3 dígitos (como un número telefónico: '739 - 281') para compactar la información."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/es/drills/memory/short-term-memory/digit-span#step-3",
      
      "name": "Repaso subvocal en bucle continuo",
      "text": "Repite mentalmente la secuencia a gran velocidad para evitar que la huella acústica desaparezca a los 2 segundos."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/es/drills/memory/short-term-memory/digit-span#step-4",
      
      "name": "Escritura fluida en el teclado",
      "text": "Introduce los números con ritmo constante en cuanto aparezca el teclado numérico antes de que se disipe el eco."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el test de dígitos (Digit Span)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es una prueba neuropsicológica clásica que mide la capacidad de la memoria de trabajo verbal, la memoria a corto plazo y la atención focalizada mediante la retención y reproducción de secuencias numéricas en orden directo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la puntuación media en el test de dígitos en adultos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El promedio adulto en orden directo se sitúa entre 5 y 7 dígitos (desviación típica 1–2), alineado con la ley de Miller ($7 \\pm 2$). Puntuaciones de 9 o más dígitos indican un uso experto de técnicas de chunking o agrupamiento."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué diferencia hay entre dígitos directos e inversos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los dígitos directos evalúan el almacenamiento pasivo y el bucle fonológico. Los dígitos inversos exigen invertir el orden de la serie mentalmente, reclutando el ejecutivo central y midiendo la memoria de trabajo activa."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es el subtest de dígitos de la escala WAIS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es una prueba esencial de la Escala de Inteligencia de Wechsler para Adultos (WAIS-IV) que puntúa para el Índice de Memoria de Trabajo (IMT), valorando control mental, secuenciación y resistencia a la distracción."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo influye el bucle fonológico en el rendimiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En el modelo de Baddeley, los números se guardan en el almacén fonológico y se mantienen mediante el habla interna (repaso articulatorio). Como la huella se borra en 1,5–2 segundos, la velocidad de habla mental determina la amplitud máxima."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es la ley de Miller y el número mágico 7?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Formulada en 1956 por George A. Miller, postula que la mente humana puede retener $7 \\pm 2$ elementos de información. Modelos recientes (Cowan, 2001) precisan que la capacidad pura sin agrupar es de solo 4 unidades."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo ayuda el agrupamiento (chunking) a memorizar números?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Agrupar dígitos en bloques rítmicos ('839 - 241') transforma 6 elementos sueltos en 2 unidades de información, eludiendo la saturación del umbral de memoria de trabajo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué disminuye la longitud tras cometer un error?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El ejercicio aplica un protocolo adaptativo de escalera 1-up / 1-down. Reducir un dígito tras un fallo permite encontrar tu umbral de capacidad real sin generar fatiga innecesaria."
      }
    },
    {
      "@type": "Question",
      "name": "¿Entrenar la memoria de dígitos mejora la concentración diaria?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, fortalece la atención sostenida, reduce la dispersión mental y habitúa al cerebro a comprimir información compleja para el estudio, las matemáticas y la programación."
      }
    },
    {
      "@type": "Question",
      "name": "¿Este test de dígitos online es gratuito y sin instalación?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, el test de SkillDrills es 100% gratuito, se ejecuta en el navegador sin registro y mide los tiempos de respuesta con precisión de milisegundos."
      }
    }
  ]
};

const digitSpanGuide = {
  intro: [
  "El Test de Dígitos (Digit Span Memory Test) es la prueba de referencia en neuropsicología para evaluar la memoria verbal a corto plazo, la amplitud de memoria de trabajo y el procesamiento fonológico.",
  "Sus cimientos teóricos proceden de George A. Miller (1956) y su célebre artículo sobre el número mágico $7 \\pm 2$. David Wechsler (1939, 1955, 2008) incorporó dígitos directos, inversos y crecientes en la escala WAIS, instaurándolo como estándar clínico para el Índice de Memoria de Trabajo (IMT).",
  "Según el modelo de Alan Baddeley (1974, 2000), las cadenas numéricas se sustentan en el 'Bucle Fonológico'. La huella acústica se desvanece en menos de dos segundos si no interviene el repaso articulatorio ('voz interior'). Además, Nelson Cowan (2001) demostró que la capacidad focal pura se limita a $4 \\pm 1$ unidades; superar esta marca requiere imprescindiblemente el agrupamiento rítmico (chunking).",
  "Calibrado con cronometría digital de alta resolución (Woods et al., 2015), este test presenta una exposición de 3 segundos y una progresión adaptativa de dificultad para calcular tu límite real de memoria.",
  "Metodología de medición: cada pulsación se registra con el reloj performance.now() del navegador localmente en tu equipo. No se envían puntuaciones a servidores. Los temporizadores del navegador están ajustados a ~1 ms y sincronizados con el refresco de pantalla (~16,7 ms a 60 Hz; Woods et al., 2015). Compara siempre tus puntuaciones en el mismo dispositivo.",
  "Transparencia de datos: SkillDrills no recopila estadísticas de usuario ni datos personales. Tus récords se guardan únicamente en el localStorage de tu navegador. Todos los baremos provienen de investigaciones científicas publicadas.",
  "Este ejercicio es un juego educativo gratuito de entrenamiento cognitivo; no es un producto médico ni una herramienta de diagnóstico clínico. Si tienes inquietudes sobre tu salud cognitiva, consulta con un profesional de la salud."
],
  benchmarks: {
    title: "Baremos normativos de amplitud de dígitos y memoria de trabajo",
    headers: ["Nivel de Rendimiento", "Amplitud (Dígitos)", "Escala WAIS Equiv.", "Perfil Cognitivo y Agrupamiento"],
    rows: [
  [
    "Nivel 1 (Sobresaliente / Percentil 99)",
    "9 – 12+ Dígitos",
    "Puntuación Escalar 16 – 19",
    "Nivel mnemónico de élite; agrupa en bloques rítmicos de 3 a 4 cifras; mantenimiento fonológico impecable; cadencia menor a 350 ms."
  ],
  [
    "Nivel 2 (Alto / Percentil 85-95)",
    "7 – 8 Dígitos",
    "Puntuación Escalar 12 – 15",
    "Alcanza el umbral de Miller (7 dígitos); construye tríadas estables; resistente al paso del tiempo; cadencia de 350 a 500 ms."
  ],
  [
    "Nivel 3 (Promedio Adulto / Percentil 50)",
    "5 – 6 Dígitos",
    "Puntuación Escalar 8 – 11",
    "Media poblacional adulta; procesa parejas sencillas; a partir de 6 dígitos surgen confusiones acústicas; cadencia de 500 a 700 ms."
  ],
  [
    "Nivel 4 (Bajo Promedio / Cuello de Botella)",
    "4 Dígitos",
    "Puntuación Escalar 5 – 7",
    "Opera en el límite fisiológico básico de Cowan; tropieza al superar 4 dígitos sin repaso verbal; cadencia de 700 a 950 ms."
  ],
  [
    "Nivel 5 (Bajo / Requiere Entrenamiento)",
    "3 Dígitos",
    "Puntuación Escalar 1 – 4",
    "Dificultad para mantener 3 cifras seguidas; alta vulnerabilidad a la distracción y al olvido inmediato; cadencia superior a 950 ms."
  ]
],
    note: "La amplitud indica la longitud máxima de números repetida sin fallos. La equivalencia WAIS proviene de baremos normativos en adultos (Wechsler, 2008; Woods et al., 2015)."
  },
  techniques: {
    title: "Estrategias comprobadas para ampliar la memoria de dígitos",
    items: [
  {
    "name": "Ritmo fonético y agrupamiento en tríadas",
    "desc": "Divide las cadenas numéricas en bloques de 3 dígitos (ej.: '739 - 281 - 405') imitando el ritmo de un teléfono (Miller, 1956). Nueve cifras se reducen a 3 piezas cognitivas fáciles de retener.",
    "tips": "Eleva mentalmente el tono en la primera cifra de cada grupo para fijar los límites del bloque."
  },
  {
    "name": "Sincronización del repaso articulatorio",
    "desc": "Repite los números internamente a gran velocidad como un estribillo continuo (Baddeley, 1986). Al refrescar la señal antes de 2 segundos evitas que se borre del almacén fonológico.",
    "tips": "Pronuncia mentalmente los grupos como palabras unificadas en lugar de números sueltos."
  },
  {
    "name": "Trazado espacial en teclado numérico",
    "desc": "Asocia los números con rutas físicas sobre la cuadrícula del teclado 3x3 (Logie, 1995). Convertir números en trazos espaciales activa la memoria motriz además de la auditiva.",
    "tips": "Visualiza la línea o zigzag que dibujan tus dedos en el teclado mientras aparecen las cifras."
  },
  {
    "name": "Efecto de primacía y recencia",
    "desc": "Los primeros dígitos se consolidan con el repaso inicial (primacía) y los dos últimos quedan frescos en la memoria ecoica reciente. Dedica el esfuerzo consciente a retener los números intermedios.",
    "tips": "Asegura el primer bloque de inmediato y confía en el eco auditivo reciente para los últimos números."
  }
]
  },
  steps: [
  "Centra la mirada en el recuadro numérico y espera la exposición de 3 segundos.",
  "Divide de inmediato las cifras en grupos rítmicos de 2 o 3 números.",
  "Repite la secuencia mentalmente en un bucle continuo para evitar el olvido.",
  "Al activarse el teclado, pulsa los números en el orden exacto con un ritmo ágil.",
  "Permite que la escalera adaptativa calibre y expanda tu capacidad de retención."
],
  audience: "Estudiantes, opositores que preparan pruebas psicotécnicas (WAIS, aptitud), programadores y cualquier persona que desee potenciar su memoria y agilidad mental.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'baddeley2000', 'logie1995', 'woods2015'),
  related: [
  {
    "href": "/drills/memory/working-memory/n-back",
    "label": "Test N-Back (Memoria de Trabajo)"
  },
  {
    "href": "/drills/memory/spatial-memory/grid-memorization",
    "label": "Test de Memoria Visual (Cuadrícula)"
  },
  {
    "href": "/drills/cognitive/focus/concentration-grid",
    "label": "Tabla de Schulte (Cuadrícula de Concentración)"
  },
  {
    "href": "/drills/reaction-speed/reaction-time-test",
    "label": "Test de Reflejos (Tiempo de Reacción)"
  },
  {
    "href": "/drills/reaction-speed/reflex-training-drill",
    "label": "Juego de Reflejos (Multi-Objetivo)"
  }
]
};

export default function LocalizedDigitSpanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <DigitSpanClient copy={{
        "h1Keyword": "Test de Dígitos",
        "h1Suffix": " – Juego de Memoria Numérica Digit Span Gratis",
        "caption": "Memoriza la secuencia de números que aparece en pantalla y escribe los dígitos en el orden exacto.",
        "statScore": "Puntos",
        "statTime": "Tiempo",
        "statSpan": "Amplitud",
        "digitsUnit": "Dígitos",
        "statBest": "Récord",
        "hudScore": "Puntos",
        "hudTime": "Tiempo",
        "memorizeTitle": "MEMORIZA LA SECUENCIA",
        "evaluating": "Evaluando...",
        "startTitle": "Test de Dígitos Pro",
        "startSubtitle": "Memoria Numérica a Corto Plazo • Amplitud de Dígitos",
        "countdownSubtitle": "PREPÁRATE",
        "newBest": "NUEVO RÉCORD",
        "pointsLabel": "Puntos",
        "statAccuracy": "Precisión",
        "statPeakSpan": "Amplitud Máx",
        "statPerfects": "Perfectos",
        "btnPlayAgain": "Jugar de nuevo",
        "rulesTitle": "Instrucciones del Ejercicio y Puntuación",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Retención de Dígitos",
                        "highlight": "+100 PTS",
                        "result": "Memoriza la secuencia numérica y escríbela con el teclado"
                },
                {
                        "num": "2",
                        "text": "Bonus de Amplitud",
                        "highlight": "Hasta +120% PTS",
                        "result": "Secuencias más largas otorgan más puntos por acierto"
                },
                {
                        "num": "3",
                        "text": "Fallo / Tiempo límite",
                        "highlight": "-1 Dígito",
                        "result": "Sin penalización de puntos; retrocede 1 dígito para recalibrar"
                },
                {
                        "num": "4",
                        "text": "Escalera Adaptativa",
                        "highlight": "Ajuste continuo",
                        "result": "Converge de forma precisa en tu límite real de memoria"
                }
        ]
}} />
      <DrillGuide guide={digitSpanGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/digit-span"
          locale="es"
        />
      </div>
    </>
  );
}
