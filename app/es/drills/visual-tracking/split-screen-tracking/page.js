import SplitScreenTrackingClient from '@/app/drills/visual-tracking/split-screen-tracking/SplitScreenTrackingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Seguimiento en Pantalla Dividida – SkillDrills",
  description: "Entrena la atencion visual dividida siguiendo dos objetivos ortogonales en pantalla dividida. Ejercicio ocular bilateral gratis sin registro.",
  keywords: [
    "entrenamiento de atencion dividida pantalla dividida",
    "seguimiento visual en pantalla dividida",
    "ejercicio ocular de atencion bilateral",
    "vision periferica simultanea",
    "rastreo ortogonal dual de blancos",
    "seguimiento de multiples objetivos mot",
    "evitar vision de tunel ejercicio",
    "coordinacion visual bihemisferica",
    "rastreo con pantalla dividida",
    "agilidad visual de atencion difusa",
    "ejercicio de enfoque periferico dual",
    "entrenamiento de vision periferica gaming"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/split-screen-tracking",
    languages: getAlternateLanguages('/drills/visual-tracking/split-screen-tracking'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Seguimiento en Pantalla Dividida – SkillDrills",
    description: "Entrena la atencion visual dividida siguiendo dos objetivos ortogonales en pantalla dividida. Ejercicio ocular bilateral gratis sin registro.",
    url: "https://skilldrills.online/es/drills/visual-tracking/split-screen-tracking",
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Seguimiento en Pantalla Dividida – SkillDrills",
    description: "Entrena la atencion visual dividida siguiendo dos objetivos ortogonales en pantalla dividida. Ejercicio ocular bilateral gratis sin registro.",
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
      "name": "Seguimiento en Pantalla Dividida",
      "item": "https://skilldrills.online/es/drills/visual-tracking/split-screen-tracking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Seguimiento en Pantalla Dividida",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Herramienta de atencion visual dividida disenada para acondicionar el rastreo bimodal bilateral de blancos ortogonales sin dispersión sacádica."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Ejercicio de Seguimiento en Pantalla Dividida",
  "url": "https://skilldrills.online/es/drills/visual-tracking/split-screen-tracking",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos los navegadores modernos",
  "browserRequirements": "Requiere soporte para JavaScript y HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Split-Screen Tracking",
  "description": "Reto de atencion visual dividida que exige seguir simultaneamente dos objetivos independientes en planos ortogonales.",
  "genre": ["Entrenamiento Visual", "Atención Dividida", "Entrenamiento de Reflejos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar la Atención Dividida en Pantalla Dividida",
  "description": "Instrucciones metodologicas para ampliar la atencion periferica y monitorear blancos ortogonales sin alternancia sacadica.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fije el Eje Central",
      "text": "Coloquesee a 50-70 cm del monitor y pose la mirada relajada en la linea divisoria central que separa ambos campos."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Amplíe la Atención Periférica Bimodal",
      "text": "Expanda la atencion hacia los lados empleando los bastones de la retina periferica sin desviar el centro del ojo."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Disocie los Vectores Ortogonales",
      "text": "Distinga el desplazamiento vertical a la izquierda y el horizontal a la derecha como dos dinamicas separadas."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Suprima el Salto Sacádico Involuntario",
      "text": "Evite alternar la mirada de un lado a otro para no generar supresion sacadica que interrumpa la vision continua."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Que es el ejercicio Split-Screen Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Split-Screen Tracking ejercita la atencion dividida obligando al sistema visual a seguir dos blancos independientes en direcciones perpendiculares a traves de campos divididos."
      }
    },
    {
      "@type": "Question",
      "name": "Por que la vision humana no enfoca directamente dos blancos a la vez?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La fovea centralis cubre escasamente 1 a 2 grados del campo visual. Rastrear multiples objetos exige recurrir a la atencion periferica encubierta (Pylyshyn & Storm, 1988)."
      }
    },
    {
      "@type": "Question",
      "name": "Que es la ventaja del hemicampo bilateral?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Al situar un blanco en cada hemicampo, cada hemisferio cerebral procesa su objetivo en paralelo, duplicando la capacidad frente a rastrear dos blancos en un solo lado (Alvarez & Cavanagh, 2005)."
      }
    },
    {
      "@type": "Question",
      "name": "Que es la supresion sacadica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Durante los movimientos sacadicos rapidos, la captacion visual se atenua durante 20 a 50 ms. Saltar con la vista entre objetivos genera pequenas lagunas sensoriales."
      }
    },
    {
      "@type": "Question",
      "name": "Como ayuda este ejercicio a jugadores de shooters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En videojuegos competitivos como CS2 o Valorant, permite fijar la reticula en el centro y registrar informacion periferica como el minimapa sin perder precision (Green & Bavelier, 2006)."
      }
    },
    {
      "@type": "Question",
      "name": "Por que pierdo con mayor frecuencia el blanco de un lado concreto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La dominancia de un ojo o hemisferio predispone a atender prioritariamente una mitad del campo. Concentrar esfuerzo consciente en el lado mas debil equilibra el reparto espacial."
      }
    },
    {
      "@type": "Question",
      "name": "Que efecto produce ocultar la linea guia (Hide Line)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Al prescindir de la trayectoria visual, el cortex parietal se ve forzado a recrear un esquema predictivo interno de ambos recorridos cinematicos."
      }
    },
    {
      "@type": "Question",
      "name": "Que utilidad tiene en deportes de equipo y conduccion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En futbol o conduccion, ayuda a preservar el foco frontal sin dejar de registrar la llegada de rivales o vehiculos por los lados."
      }
    },
    {
      "@type": "Question",
      "name": "Tiene algun coste esta aplicacion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, SkillDrills ofrece esta plataforma interactiva sin costes y directamente en su navegador web sin formularios ni registros."
      }
    },
    {
      "@type": "Question",
      "name": "Cual es la rutina de entrenamiento recomendada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se aconsejan de 2 a 3 series de 60 segundos al dia (unos 5 minutos en total). Intervalos cortos y exigentes afianzan la adaptacion sin saturar el cerebro."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Científicas del Seguimiento en Pantalla Dividida y Atención Dividida",
  intro: [
    "El sistema visual de los primates se halla estrictamente condicionado por las reducidas dimensiones de la fovea central, que apenas abarca una apertura angular de 1 a 2 grados. Cuando dos objetivos se mueven a la par en sectores espaciales distantes, la foveacion optica directa y simultanea resulta inviable. El cerebro se ve ante una eleccion: saltar alternadamente con sacadas rapidas, o establecer un anclaje ocular medio y proyectar la atencion espacial encubierta a ambos flancos perifericos.",
    "Las investigaciones pioneras de Pylyshyn & Storm (1988) sobre seguimiento de multiples objetos (MOT) confirmaron la existencia de indices visuales paralelos en el cerebro. Posteriormente, Alvarez & Cavanagh (2005) constataron que los recursos atencionales se reparten entre ambos hemisferios cerebrales: ubicar un objetivo en el campo izquierdo (hemisferio derecho) y otro en el campo derecho (hemisferio izquierdo) produce una ventaja bilateral que elude interferencias.",
    "Cambiar alternativamente de un objetivo al otro genera un desgaste considerable. Cada sacada dura entre 20 y 50 milisegundos y dispara el fenomeno de supresion sacadica, bloqueando brevemente la recepcion de estimulos. El ejercicio Split-Screen Tracking consolida un punto de mira central firme acompanado de un despliegue periferico multifocal (Cavanagh & Alvarez, 2005; Green & Bavelier, 2006). La disposicion ortogonal evita la fusion perceptiva forzando un procesamiento cognitivo dual autentico."
  ],
  benchmarks: {
    title: "Baremos de Rendimiento en Atención Dividida y Seguimiento Bilateral",
    headers: ["Nivel de Rendimiento", "Velocidad del Objetivo", "Estabilidad del Anclaje Central", "Simetría Hemisférica (Error)", "Percentil Poblacional"],
    rows: [
      ["Élite (Esports / Pilotos)", "3.5x – 5.0x+", "Anclaje central firme; 0 sacadas intrusivas", "< 3% de discrepancia (bloqueo bimodal)", "Top 1.5%"],
      ["Avanzado (Competitivo)", "2.5x – 3.5x", "Anclaje estable; mínimas micro-sacadas", "< 7% de discrepancia (monitoreo dual firme)", "Top 8%"],
      ["Competente (Adulto Sano)", "1.8x – 2.5x", "Foco central firme; leves sacadas en picos", "< 12% de discrepancia (leve dominancia lateral)", "Top 25%"],
      ["En Desarrollo (División Ineficiente)", "1.2x – 1.8x", "Frecuentes sacadas involuntarias al objetivo más veloz", "15% – 25% de retraso en hemicampo no dominante", "45% Intermedios"],
      ["Principiante (Visión de Túnel)", "0.5x – 1.2x", "Alternancia sacádica constante entre pantallas", "> 25% de pérdida completa de un blanco", "Nivel Inicial"]
    ],
    note: "※ Evaluado segun los modelos MOT de Pylyshyn & Storm (1988) y metricas de reparto hemisferico de Alvarez & Cavanagh (2005) en pantallas 1080p a 50–70 cm de distancia."
  },
  techniques: {
    title: "Cuatro Técnicas Clave para la Atención Dividida en Pantalla Dividida",
    items: [
      {
        name: "Anclaje Visual Central y Foco Suave",
        desc: "Dirija el eje ocular central a la particion media entre pantallas con una mirada suave. Deje que los bastones perifericos capten la dinamica de los objetivos en ambos costados.",
        tips: "No mire de frente a ninguno de los blancos; mantenga la linea divisoria como anclaje fijo."
      },
      {
        name: "Disociación de Vectores Ortogonales",
        desc: "La mente tiende a ensamblar movimientos perpendiculares en un vector diagonal resultante. Aisle el ritmo del rebote vertical respecto al avance horizontal.",
        tips: "Emplee los virajes de cada objetivo como comprobaciones visuales separadas."
      },
      {
        name: "Equilibrio de Dominancia Hemisférica",
        desc: "La asimetria cerebral motiva que se atienda con preferencia a un hemicampo. Reasigne un 60% de su capacidad atencional a la mitad con menor eficacia para compensar el desajuste.",
        tips: "Detecte cual de los objetivos pierde seguimiento con mayor frecuencia y reoriente la concentracion hacia alli."
      },
      {
        name: "Supresión de Sacadas y Sincronía de Parpadeo",
        desc: "Frene la tentacion de lanzar miradas directas al objetivo que acelere. Parpadee unicamente cuando las trayectorias sean altamente estables.",
        tips: "Alinee el parpadeo en las cumbres y extremos donde los blancos se desaceleran antes de cambiar de sentido."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('pylyshyn1988', 'alvarez2005', 'green2006', 'cavanagh2005', 'woods2015', 'leigh2015'),
  related: [
    { href: "/es/drills/visual-tracking/constant-slow-pursuit", label: "Seguimiento Lento Continuo (Constant Slow)" },
    { href: "/es/drills/visual-tracking/directional-chaos-pursuit", label: "Seguimiento en Caos Direccional (Directional Chaos)" },
    { href: "/es/drills/visual-tracking/dynamic-evasion-pursuit", label: "Seguimiento con Evasión Dinámica (Dynamic Evasion)" },
    { href: "/es/drills/visual-tracking/ghosting-suppress-pursuit", label: "Supresión de Imágenes Fantasma (Ghosting Suppress)" },
    { href: "/es/drills/visual-tracking/infinity-pursuit", label: "Ejercicio Ocular en Forma de Ocho (Infinity)" },
    { href: "/es/drills/visual-tracking/sine-wave-pursuit", label: "Seguimiento en Onda Sinusoidal (Sine Wave)" }
  ]
};

export default function SplitScreenTrackingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SplitScreenTrackingClient copy={{ title: "Seguimiento en Pantalla Dividida", subtitle: "Prueba de Atención Visual Dividida" }} />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/split-screen-tracking" />
      </div>
    </>
  );
}
