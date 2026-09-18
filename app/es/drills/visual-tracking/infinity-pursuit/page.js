import InfinityPursuitClient from '@/app/drills/visual-tracking/infinity-pursuit/InfinityPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Ejercicio Ocular del Ocho Tumbado – Infinity | SkillDrills",
  description: "Ejercicio gratuito de seguimiento ocular en ocho tumbado: entrena el cruce de la línea media, coordinación binocular y persecución suave en el navegador.",
  keywords: [
    "ejercicio ocular del ocho tumbado",
    "entrenamiento de movimientos en ocho",
    "coordinación ocular binocular",
    "cruce de la línea media visual",
    "seguimiento continuo en lemniscata",
    "gimnasia visual del ocho infinito",
    "ejercicios de motilidad ocular gratis",
    "test de seguimiento visual online",
    "entrenamiento de visión deportiva",
    "estabilidad foveal en curvas complejas",
    "puntería tracking para esports",
    "agudeza visual de movimiento test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/infinity-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/infinity-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Ejercicio Ocular del Ocho Tumbado – Infinity | SkillDrills",
    description: "Ejercicio gratuito de seguimiento ocular en ocho tumbado: entrena el cruce de la línea media, coordinación binocular y persecución suave en el navegador.",
    url: "https://skilldrills.online/es/drills/visual-tracking/infinity-pursuit",
    siteName: "SkillDrills",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ejercicio Ocular del Ocho Tumbado – Infinity | SkillDrills",
    description: "Ejercicio gratuito de seguimiento ocular en ocho tumbado: entrena el cruce de la línea media, coordinación binocular y persecución suave en el navegador.",
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
      "name": "Persecución en Ocho Infinito",
      "item": "https://skilldrills.online/es/drills/visual-tracking/infinity-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Persecución en Ocho Infinito – Seguimiento Ocular",
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
  "name": "Test de Seguimiento Ocular en Ocho Tumbado y Cruce de Línea Media",
  "url": "https://skilldrills.online/es/drills/visual-tracking/infinity-pursuit",
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
  "name": "Infinity Pursuit – Entrenador Ocular en Lemniscata",
  "description": "Entrenador visual en el navegador para armonizar la motilidad binocular en trayectorias continuas de ocho tumbado sin sacadas parásitas.",
  "genre": ["Aparato de Entrenamiento Ocular", "Entrenador de Visión Deportiva", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Realizar el Ejercicio del Ocho Tumbado para los Ojos",
  "description": "Protocolo para entrenar el seguimiento suave y la coordinación binocular a lo largo de la lemniscata de Bernoulli.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Estabiliza la Cabeza y la Postura",
      "text": "Siéntate a 50-70 cm de la pantalla con la cabeza inmóvil para forzar la acción exclusiva de los músculos extraoculares.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/infinity-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Selecciona la Velocidad Base",
      "text": "Comienza en 1.0x para habituar la mirada a la transición ininterrumpida entre el bucle izquierdo y el derecho.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/infinity-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Cruza el Centro sin Saltos",
      "text": "Al atravesar la intersección central de la línea media, mantén un deslizamiento foveal fluido sin parpadeos ni sacadas involuntarias.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/infinity-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Mantén Series Breves de Foco Puro",
      "text": "Ejecuta de 5 a 8 rondas de 60 segundos con descansos intercalados para consolidar la calibración sináptica cerebelosa.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/infinity-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el ejercicio de Persecución en Ocho Infinito (Infinity Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es un ejercicio de motilidad ocular avanzada que guía los ojos de forma continua por la lemniscata de Bernoulli (ocho tumbado), coordinando los seis pares de músculos extraoculares y reforzando el cruce fluido de la línea media."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es tan relevante entrenar el cruce de la línea media visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La línea media vertical marca el traspaso neural entre hemisferios cerebrales a través del cuerpo calloso. Si no está bien entrenado, el sistema visual genera titubeos o pequeñas sacadas de corrección al cambiar de hemisferio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué músculos oculares participan en la trayectoria del ocho tumbado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los seis músculos extraoculares de cada ojo (recto interno, externo, superior, inferior, y oblicuos mayor y menor) actúan en sinergia continua para lograr la inclinación y curvatura suave de los bucles."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué mide la ganancia de persecución (Pursuit Gain)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La ganancia de persecución es la relación entre la velocidad angular del ojo y la del objetivo. Un valor de 1,0 refleja sincronización ideal. Cifras inferiores a 0,80 denotan retraso y disparan sacadas de alcance (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "¿De qué manera contribuye este ejercicio a la puntería en videojuegos (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En títulos con desplazamientos tridimensionales y verticales, los rivales trazan diagonales y arcos continuos. Dominar la lemniscata elimina la rigidez de la mira en transiciones angulares complejas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué se exige mantener la cabeza fija durante el entrenamiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mover la cabeza activa el reflejo vestíbulo-ocular (RVO), permitiendo que el oído interno compense el movimiento. Fijar el mentón asegura que los ojos soporten el 100 % del esfuerzo neuromuscular."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo se recomienda entrenar cada día?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De 5 a 10 minutos al día (entre 5 y 8 bloques de 60 segundos). La práctica concentrada y breve evita la fatiga de los fotorreceptores y estimula el aprendizaje motor cerebeloso."
      }
    },
    {
      "@type": "Question",
      "name": "¿Ayuda este ejercicio a aliviar la fatiga ocular frente a pantallas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. El trabajo prolongado de oficina mantiene la visión anclada en un punto fijo. Trazar el ocho tumbado estira de forma dinámica los músculos extraoculares y favorece la flexibilidad acomodativa."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué beneficios aporta en deportes tradicionales como tenis o fútbol?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En deportes con pelota, las trayectorias parabólicas y cruzadas exigen coordinar ambos ojos sin perder el enfoque de la costura y el efecto. Mejora la anticipación espacial y el cálculo de distancias."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es gratuito y confidencial este test del ocho infinito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, el test es 100 % gratuito, funciona de manera nativa en el navegador sin descargas ni registros, y los índices de precisión se guardan únicamente en el almacenamiento local de tu ordenador o móvil."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Neurofisiológicas de la Lemniscata y Coordinación Binocular",
  intro: [
    "La trayectoria en forma de ocho tumbado (lemniscata de Bernoulli) constituye uno de los estándares más exigentes y completos para evaluar la motilidad ocular. A diferencia de los desplazamientos meramente ortogonales, la lemniscata requiere la activación coordinada y simultánea de los seis músculos extraoculares a lo largo de gradientes helicoidales y diagonales continuos (Robinson, 1965; Barnes, 2008).",
    "Neurodinámica del Cruce de la Línea Media: en el punto neurálgico central de la figura, el blanco cruza el meridiano vertical foveal. Este cruce impone una rápida transferencia inter-hemisférica de datos visuales y motores entre ambos lóbulos a través del cuerpo calloso (Leigh & Zee, 2015). En sujetos con déficits funcionales, el seguimiento suave colapsa en este cruce, generando sacadas de reajuste o micro-frenazos.",
    "Hardware y Fluidez Cinética: paneles a 144 Hz o superiores ofrecen trayectorias ultra-suaves con desfases de refresco inferiores a 6,9 ms (Woods et al., 2015). La herramienta corre en el navegador web garantizando plena privacidad y almacenamiento local de tus datos."
  ],
  benchmarks: {
    title: "Métricas de Rendimiento en Ocho Tumbado (Lemniscate Pursuit Benchmarks)",
    headers: ["Nivel de Rendimiento", "Ganancia de Persecución (Pursuit Gain)", "Tasa de Sacadas en Línea Media", "Precisión de Trayectoria", "Nivel Neurofisiológico"],
    rows: [
      ["Élite (Atletas Profesionales & Esports)", "0,96 – 1,02", "< 2% (Deslizamiento Continuo)", "98%+", "Coordinación neuromuscular impecable. Sin sacadas en la línea media; modelo predictivo cerebeloso en máxima sincronía (Barnes, 2008)."],
      ["Avanzado (Nivel Competitivo)", "0,90 – 0,95", "2% – 5%", "92% – 97%", "Notable estabilidad en seguimiento suave. Mínimo desfase de fase en los extremos; anclaje foveal firme (Krauzlis, 2004)."],
      ["Competente (Adultos Sanos)", "0,80 – 0,89", "6% – 12%", "82% – 91%", "Rango funcional sólido para actividades cotidianas. Sacadas esporádicas de corrección al cruzar el centro o en giros cerrados."],
      ["En Desarrollo (Fatiga / Latencia)", "0,68 – 0,79", "13% – 22%", "70% – 81%", "Atraso visible del seguimiento; interrupciones sacádicas repetidas; posibles signos de fatiga muscular o compensación cefálica."],
      ["Principiante / Inestabilidad", "< 0,68", "> 22%", "< 70%", "El seguimiento continuo se interrumpe frecuentemente; el ojo busca a saltos el objetivo; se aconseja práctica a velocidades lentas."]
    ],
    note: "※ Baremos de referencia determinados para distancias de pantalla entre 50 y 70 cm. La ganancia de persecución se calcula dividiendo la velocidad angular del ojo por la del objetivo (valor ideal = 1,0) de acuerdo con Barnes (2008) y Leigh & Zee (2015)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('barnes2008', 'krauzlis2004', 'robinson1965', 'leighzee2015', 'woods2015', 'salthouse1980'),
  related: [
    { href: "/es/drills/visual-tracking/constant-slow-pursuit", label: "Seguimiento Ocular Lento (Constant Slow)" },
    { href: "/es/drills/visual-tracking/directional-chaos-pursuit", label: "Persecución Caótica Direccional (Chaos Pursuit)" },
    { href: "/es/drills/visual-tracking/dynamic-evasion-pursuit", label: "Persecución Evasiva Dinámica (Dynamic Evasion)" },
    { href: "/es/drills/visual-tracking/sine-wave-pursuit", label: "Rastreo en Onda Sinusoidal (Sine Wave)" }
  ]
};

export default function InfinityPursuitPageEs() {
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
      <InfinityPursuitClient
        copy={{
          title: "Persecución en Ocho Infinito – Seguimiento Ocular",
          subtitle: "Entrenamiento de Coordinación Binocular y Cruce de Línea Media",
          description: "Ejercicio de seguimiento suave continuo en la lemniscata de Bernoulli. Fortalece la coordinación de los seis músculos extraoculares y la estabilidad foveal sin saltos sacádicos al cruzar el meridiano central (Robinson, 1965; Barnes, 2008)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/infinity-pursuit" />
      </div>
    </>
  );
}
