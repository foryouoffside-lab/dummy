import StaircaseStepClient from '@/app/drills/visual-tracking/staircase-step/StaircaseStepClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Seguimiento Ocular Vertical – SkillDrills",
  description: "Entrena el seguimiento ocular vertical y sacadas de elevacion en trayectorias escalonadas. Estimulacion del mesencefalo gratis sin registro.",
  keywords: [
    "entrenamiento de seguimiento ocular vertical",
    "ejercicio ocular en escalones",
    "movimiento ocular vertical sacadico",
    "control de punteria vertical reflejos",
    "ganancia de velocidad ocular vertical",
    "estimulacion del mesencefalo rimlf",
    "estabilidad visual de elevacion",
    "entrenamiento de mira vertical fps",
    "ejercicio de rastreo en zigzag",
    "enfoque ocular en trayectorias angulares",
    "agilidad ocular para deportes aereos",
    "entrenamiento visual para control de retroceso"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/staircase-step",
    languages: getAlternateLanguages('/drills/visual-tracking/staircase-step'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Seguimiento Ocular Vertical – SkillDrills",
    description: "Entrena el seguimiento ocular vertical y sacadas de elevacion en trayectorias escalonadas. Estimulacion del mesencefalo gratis sin registro.",
    url: "https://skilldrills.online/es/drills/visual-tracking/staircase-step",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Seguimiento Ocular Vertical – SkillDrills",
    description: "Entrena el seguimiento ocular vertical y sacadas de elevacion en trayectorias escalonadas. Estimulacion del mesencefalo gratis sin registro.",
  },
};

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
      "name": "Ejercicios",
      "item": "https://skilldrills.online/es/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Rastreo Visual",
      "item": "https://skilldrills.online/es/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Seguimiento en Escalones",
      "item": "https://skilldrills.online/es/drills/visual-tracking/staircase-step"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Seguimiento Ocular Vertical en Escalones",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Herramienta de acondicionamiento oculomotor vertical disenada para estimular el mesencefalo (riMLF) y optimizar la precision de sacadas y seguimiento vertical."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Ejercicio de Seguimiento en Escalones",
  "url": "https://skilldrills.online/es/drills/visual-tracking/staircase-step",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos los navegadores modernos",
  "browserRequirements": "Requiere soporte para JavaScript y HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Staircase Step",
  "description": "Reto de coordinacion visual vertical donde el usuario fija objetivos dinamicos a lo largo de perfiles en zigzag escalonados.",
  "genre": ["Entrenamiento Visual", "Seguimiento Ocular Vertical", "Entrenamiento de Reflejos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar el Seguimiento Vertical en Escalones",
  "description": "Metodologia cientifica para optimizar la motricidad ocular vertical y las sacadas de cambio de plano sin mover el cuello.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Inmovilice la Cabeza",
      "text": "Sitatese a 50-70 cm de la pantalla con la cabeza fija para que el esfuerzo recaiga exclusivamente en los musculos oculares."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Recorra las Rampas Diagonales",
      "text": "Siga el objetivo con ritmo uniforme a traves de las lineas inclinadas manteniendo la foveacion centrada."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Anticipe las Esquinas Angulares",
      "text": "Aplique una suave deceleracion antes de alcanzar el vertice para evitar rebasar la curva de cambio de sentido."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Ejecute Sacadas Rápidas de Elevación",
      "text": "Dispare un salto sacadico vertical certero para reenganchar al instante con la siguiente seccion escalonada."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Que es el ejercicio Staircase Step?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Staircase Step entrena el seguimiento visual vertical y sacadas de elevacion mediante recorridos escalonados ortogonales, estimulando nucleos del mesencefalo (Büttner-Ennever & Horn, 1997)."
      }
    },
    {
      "@type": "Question",
      "name": "Por que es mas complejo el seguimiento vertical que el horizontal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las conexiones del tronco encefalico encargadas del eje vertical (riMLF y Cajal) presentan de forma congenita menor ganancia de velocidad, mas retraso y asimetrias hacia arriba (Rottach et al., 1996)."
      }
    },
    {
      "@type": "Question",
      "name": "Que funcion desempena el nucleo riMLF en la mirada vertical?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El riMLF alberga neuronas de disparo rapido que originan sacadas verticales a gran velocidad coordinando los musculos rectos superior e inferior."
      }
    },
    {
      "@type": "Question",
      "name": "Como mejora la punteria en videojuegos de accion (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En shooters como Apex Legends y Overwatch 2, los adversarios escalan y saltan constantemente. Este ejercicio suprime temblores de mira ante cambios repentinos de cota vertical."
      }
    },
    {
      "@type": "Question",
      "name": "Que utilidad tiene en deportes como voleibol o tenis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En remates de voleibol o globos en tenis, la pelota asciende con perfiles parabolicos. Mejorar la agilidad visual vertical perfecciona la coordinacion espaciotemporal."
      }
    },
    {
      "@type": "Question",
      "name": "Por que no se debe mover la cabeza durante el ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Al mover el cuello se esquiva el esfuerzo de los musculos oculares, limitando la adaptacion sinaptica en los centros del tronco cerebral (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Que funcion tiene la opcion de ocultar la guia (Hide Line)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eliminar la linea visual visible obliga al cerebro a generar una proyeccion cinematica interna pura de la trayectoria escalonada."
      }
    },
    {
      "@type": "Question",
      "name": "Importa la tasa de refresco del monitor (144Hz+)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los monitores de alta frecuencia visualizan las esquinas de los escalones con nitidez total, permitiendo a las neuronas del mesencefalo guiar sacadas limpias (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Es gratuito este entrenamiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si, SkillDrills ofrece esta aplicacion de forma libre y gratuita en el navegador sin tramites de registro."
      }
    },
    {
      "@type": "Question",
      "name": "Cual es la duracion de sesion aconsejada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se recomiendan de 2 a 3 tandas de 45 a 60 segundos por jornada (unos 3 a 5 minutos). La musculatura vertical se fatiga antes, por lo que series cortas resultan optimas."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Científicas del Seguimiento Vertical y Control Oculomotor",
  intro: [
    "El sistema de la motilidad ocular humana recurre a vias neuroanatomicas independientes para movimientos en los ejes horizontal y vertical. Mientras que la dinamica horizontal se vehicula a traves de la formacion reticular pontina paramediana (PPRF), el control de los desplazamientos verticales corre a cargo exclusivo de estructuras especificas del mesencefalo: de modo primordial, el nucleo intersticial rostral del fasciculo longitudinal medial (riMLF) y el nucleo de Cajal (Büttner-Ennever & Horn, 1997).",
    "Los datos experimentales (Rottach et al., 1996; Ke et al., 2013) evidencian que el seguimiento ocular suave vertical cuenta intrinsecamente con una menor ganancia de velocidad, mayor desfase de tiempo y respuestas mas pausadas que su homologo horizontal. Ademas, se advierte una visible asimetria: la capacidad de elevacion de la mirada declina con rapidez ante aumentos de ritmo, demandando sacadas de recuperacion mas tempranas.",
    "Las costumbres de vision modernas centran la estimulacion en planos laterales horizontales, postergando la musculatura vertical. El drill Staircase Step desafia esta asimetria forzando la mirada por rampas escalonadas en zigzag, combinando persecucion continua en planos inclinados con sacadas correctoras puntuales en las esquinas de transicion (Collewijn & Tamminga, 1984; Lisberger, 2010)."
  ],
  benchmarks: {
    title: "Baremos de Rendimiento en Seguimiento Vertical y Sacadas en Escalones",
    headers: ["Nivel de Rendimiento", "Velocidad del Objetivo", "Precisión en Esquinas de Escalón", "Ganancia Vertical Estimada", "Percentil Poblacional"],
    rows: [
      ["Élite (Esports / Pilotos)", "3.5x – 5.0x+", "Fijación limpia sin rebasar esquinas", "0.92 – 0.98 (sincronización casi instantánea)", "Top 1.5%"],
      ["Avanzado (Competitivo)", "2.5x – 3.5x", "Foveación rápida mediante micro-sacada única", "0.85 – 0.92 (enfoque muy estable)", "Top 8%"],
      ["Competente (Adulto Sano)", "1.8x – 2.5x", "Seguimiento regular en rampas; vacilación leve en vértices", "0.75 – 0.85 (control adecuado)", "Top 25%"],
      ["En Desarrollo (Latencia)", "1.2x – 1.8x", "Demora en trayectos ascendentes; compensación cervical", "0.60 – 0.75 (frecuentes sacadas correctoras)", "45% Intermedios"],
      ["Principiante (Ajuste Motor)", "0.5x – 1.2x", "Pérdida del blanco en esquinas; la cabeza sigue al objeto", "< 0.60 (saltos sacádicos desordenados)", "Nivel Inicial"]
    ],
    note: "※ Basado en parametros de latencia vertical (Rottach et al., 1996) y dinamica celular del riMLF (Büttner-Ennever & Horn, 1997) en monitores 1080p a 50–70 cm."
  },
  techniques: {
    title: "Cuatro Técnicas Clave para el Seguimiento en Escalones",
    items: [
      {
        name: "Inmovilización Cervical Absoluta",
        desc: "Fije con firmeza la posicion del menton evitando balanceos de cuello en ascensos y descensos, obligando a los musculos oculares a realizar todo el trabajo motor.",
        tips: "Mantenga la sensacion de apoyo en la barbilla para neutralizar giros de cabeza."
      },
      {
        name: "Frenado Anticipado en Esquinas",
        desc: "Antes de llegar al vertice de giro del escalon, modere proactivamente la inercia del movimiento para no sobrepasar el cambio de rasante.",
        tips: "Trate la esquina como un acantilado donde se debe amortiguar la velocidad antes de virar."
      },
      {
        name: "Impulso de Elevación Vertical",
        desc: "Dado que la motilidad hacia arriba posee menor ganancia refleja, proporcione voluntariamente un estimulo muscular mas enérgico al subir los tramos.",
        tips: "Aplique un pulso deliberado hacia arriba para contrarrestar la inercia de elevacion."
      },
      {
        name: "Reenganche Sacádico Post-Escalón",
        desc: "No permita pausas en la esquina del escalon. Dirija el foco central de inmediato al nuevo plano para conservar la velocidad de crucero sin tirones.",
        tips: "Sienta la mirada como un escalador ágil pisando con precision de peldano en peldano."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('buttner1997', 'rottach1996', 'ke2013', 'collewijn1984', 'lisberger2010', 'woods2015'),
  related: [
    { href: "/es/drills/visual-tracking/constant-slow-pursuit", label: "Seguimiento Lento Continuo (Constant Slow)" },
    { href: "/es/drills/visual-tracking/directional-chaos-pursuit", label: "Seguimiento en Caos Direccional (Directional Chaos)" },
    { href: "/es/drills/visual-tracking/dynamic-evasion-pursuit", label: "Seguimiento con Evasión Dinámica (Dynamic Evasion)" },
    { href: "/es/drills/visual-tracking/ghosting-suppress-pursuit", label: "Supresión de Imágenes Fantasma (Ghosting Suppress)" },
    { href: "/es/drills/visual-tracking/infinity-pursuit", label: "Ejercicio Ocular en Forma de Ocho (Infinity)" },
    { href: "/es/drills/visual-tracking/sine-wave-pursuit", label: "Seguimiento en Onda Sinusoidal (Sine Wave)" }
  ]
};

export default function StaircaseStepPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <StaircaseStepClient copy={{ title: "Seguimiento en Escalones", subtitle: "Ejercicio Ocular Vertical y Sacádico" }} />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/staircase-step" />
      </div>
    </>
  );
}
