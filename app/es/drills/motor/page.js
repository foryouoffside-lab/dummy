import MotorDrillsClient from '@/app/drills/motor/MotorDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const motorDrills = DRILLS.filter((d) => d.category === 'motor');

export const metadata = {
  title: 'Precisión del Ratón & Test de CPS | SkillDrills',
  description: 'Entrenamiento motor y puntería online. 9 ejercicios científicos para velocidad de clic (CPS), pulso firme, velocidad de teclado y coordinación mano-ojo.',
  keywords: [
    'test de precisión del mouse online', 'aim trainer gratis', 'test de cps clicks por segundo',
    'velocidad de clic prueba online', 'test de pulso firme raton', 'test de velocidad de teclado online',
    'test de ghosting teclado', 'test de chattering teclado mecanico', 'ejercicios de coordinacion mano ojo',
    'control micromotor del mouse', 'jitter click test gratis', 'butterfly click tecnica entrenamiento',
    'juego del laberinto del pulso', 'mejorar precision mouse fps', 'calculadora edpi sensibilidad raton'
  ],
  openGraph: {
    title: 'Precisión del Ratón & Test de CPS | SkillDrills',
    description: 'Entrenamiento motor y puntería online. 9 ejercicios científicos para velocidad de clic (CPS), pulso firme, velocidad de teclado y coordinación mano-ojo.',
    type: 'website',
    url: 'https://skilldrills.online/es/drills/motor',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Precisión de Ratón y Entrenamiento Motor en SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precisión del Ratón & Test de CPS | SkillDrills',
    description: 'Velocidad de clic (CPS), pulso firme, test de teclado y puntería de precisión: 9 ejercicios científicos gratis en el navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor',
    languages: getAlternateLanguages('/es/drills/motor'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Ejercicios de Rendimiento", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Habilidades Motoras & Precisión", "item": "https://skilldrills.online/es/drills/motor" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Precisión de Ratón & Habilidades Motoras (9 Ejercicios)",
  "url": "https://skilldrills.online/es/drills/motor",
  "description": "9 ejercicios interactivos para velocidad de clic (CPS), puntería de precisión, supresión de temblor, test de teclado y coordinación mano-ojo.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": motorDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'es', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/es${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
      "description": loc.tagline || drill.description,
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo mejoran los ejercicios motores online la coordinación óculo-manual (mano-ojo)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los ejercicios motores fortalecen el bucle de retroalimentación sensoriomotor entre la detección retiniana en la corteza visual, la planificación del movimiento en el cerebelo y la transmisión sináptica a través de la corteza motora primaria hacia los músculos de la mano. Las microcorrecciones de alta frecuencia y el ajuste continuo del cursor minimizan la latencia neuromuscular, permitiendo ejecutar acciones motoras de alta precisión en menos de 180 ms."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el promedio normal de CPS (clics por segundo) y qué técnicas de cliqueo existen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Con la técnica estándar de golpeo con un solo dedo, el promedio poblacional se sitúa entre 6 y 8 CPS. En el ámbito competitivo y los eSports se emplean técnicas avanzadas: Jitter Clicking (vibración controlada de los músculos del antebrazo, 10–14 CPS) y Butterfly Clicking (golpeo alterno con dos dedos sobre el pulsador, 15–22 CPS). Para prevenir lesiones por esfuerzo repetitivo (tendinitis), se recomienda priorizar la relajación muscular y un ritmo cadencioso sostenido."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo ayudan el trazado de trayectorias y los ejercicios de pulso firme a eliminar el temblor del ratón?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El sobrepasamiento del objetivo (overshooting) y las microvibraciones erráticas se deben a una capacidad de frenado insuficiente en los grupos musculares antagonistas. Desplazarse por pasillos estrechos y trazar curvas sinusoidales obliga a estabilizar el cursor a nivel subpíxel, fortaleciendo las fibras musculares estabilizadoras de muñeca y antebrazo para suprimir temblores involuntarios."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué establece la Ley de Fitts y cómo optimiza la relación entre velocidad y puntería?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La Ley de Fitts es un principio ergonómico fundamental que postula que el tiempo necesario para alcanzar un objetivo depende logarítmicamente de la distancia y del ancho del blanco (MT = a + b * log2(2D/W)). Una puntería de élite combina una fase balística inicial rápida (cubriendo el 80–90 % de la trayectoria) con una fase final de desaceleración y microajuste visual guiado para posarse exactamente en el centro sin perder cadencia."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es fundamental la independencia digital de los dedos para la velocidad en el teclado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anatómicamente, el dedo anular y el meñique comparten conexiones tendinosas en los flexores profundos, lo que dificulta su articulación autónoma. El entrenamiento de velocidad y reconocimiento de teclas segrega los patrones motores corticales en el cerebro, reduciendo la latencia de transición interdigital y evitando bloqueos o pulsaciones fantasmas en situaciones de alta tasa de acciones por minuto (APM)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué nivel de precisión ofrecen los tests de ratón y teclado ejecutados en el navegador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills emplea la API estándar de alta resolución performance.now(), que ofrece una precisión temporal de hasta 0,1 milisegundos. Los límites físicos de la medición quedan determinados por la tasa de refresco del monitor (p. ej., ~4,1 ms a 240 Hz) y la tasa de sondeo (polling rate) del periférico (1 ms a 1000 Hz), proporcionando una exactitud idéntica a la de un laboratorio de biomecánica."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo influyen el DPI, la sensibilidad del juego y el eDPI en el control neuromuscular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El eDPI (DPI del sensor multiplicado por la sensibilidad en el juego) determina la proporción de unidades motoras reclutadas entre la musculatura fina (dedos y muñeca) y la gruesa (antebrazo y hombro). Una sensibilidad alta permite giros veloces pero amplifica el temblor, mientras que una sensibilidad baja aporta mayor consistencia balística. Mantener un eDPI uniforme es crucial para que el cerebelo consolide mapas motores fiables."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué impacto tienen el chattering y el ghosting del teclado en el rendimiento del jugador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El chattering es un fallo de rebote en los contactos de los interruptores mecánicos que genera dobles pulsaciones involuntarias, mientras que el ghosting surge por interferencias en la matriz del circuito impreso que anulan pulsaciones múltiples o registran teclas no deseadas. Nuestro test de teclado evalúa el N-Key Rollover (NKRO) y la estabilidad de contacto en tiempo real para descartar cuellos de botella de hardware."
      }
    }
  ]
};

export default function SpanishMotorHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MotorDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

