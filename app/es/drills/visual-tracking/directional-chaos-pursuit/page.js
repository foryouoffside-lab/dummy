import DirectionalChaosPursuitClient from '@/app/drills/visual-tracking/directional-chaos-pursuit/DirectionalChaosPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Seguimiento Ocular Caótico – Chaos Pursuit | SkillDrills",
  description: "Entrenamiento gratuito de seguimiento ocular caótico: mejora la recuperación sacádica y la refixación foveal inmediata ante trayectorias impredecibles.",
  keywords: [
    "seguimiento ocular caótico",
    "entrenamiento de persecución caótica",
    "recuperación sacádica visual",
    "ejercicios de motilidad ocular errática",
    "rastreo visual reactivo",
    "test de fijación foveal dinámica",
    "entrenamiento de puntería tracking caótico",
    "reflejo oculomotor ejercicios",
    "gimnasia visual para esports",
    "agilidad visual de reacción online",
    "control ocular de trayectorias impredecibles",
    "test de seguimiento ocular gratis"
  ],
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual-tracking/directional-chaos-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/directional-chaos-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Seguimiento Ocular Caótico – Chaos Pursuit | SkillDrills",
    description: "Entrenamiento gratuito de seguimiento ocular caótico: mejora la recuperación sacádica y la refixación foveal inmediata ante trayectorias impredecibles.",
    url: "https://skilldrills.online/es/drills/visual-tracking/directional-chaos-pursuit",
    siteName: "SkillDrills",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguimiento Ocular Caótico – Chaos Pursuit | SkillDrills",
    description: "Entrenamiento gratuito de seguimiento ocular caótico: mejora la recuperación sacádica y la refixación foveal inmediata ante trayectorias impredecibles.",
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
      "name": "Persecución Caótica Direccional",
      "item": "https://skilldrills.online/es/drills/visual-tracking/directional-chaos-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Persecución Caótica Direccional – Seguimiento Ocular",
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
  "name": "Test de Seguimiento Ocular Caótico y Recuperación Sacádica",
  "url": "https://skilldrills.online/es/drills/visual-tracking/directional-chaos-pursuit",
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
  "name": "Directional Chaos Pursuit – Entrenador de Motilidad Visual",
  "description": "Entrenador visual reflexivo en el navegador para rastrear blancos con quiebres caóticos y aceleraciones súbitas sin predicción motora.",
  "genre": ["Aparato de Entrenamiento Ocular", "Entrenador de Visión Deportiva", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Entrenar la Recuperación Sacádica con Persecución Caótica",
  "description": "Protocolo para condicionar reflejos visomotores reactivos inmediatos frente a trayectorias erráticas.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fija la Postura y Aísla los Ojos",
      "text": "Siéntate erguido a 50-60 cm de la pantalla. Mantén cabeza y cuello inmóviles para desactivar el reflejo vestíbulo-ocular (RVO) y exigir el trabajo exclusivo de los músculos extraoculares.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/directional-chaos-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Selecciona la Velocidad Base",
      "text": "Empieza en 1.0x para habituar la retina periférica a los rebotes elásticos y a los impulsos estocásticos de aceleración.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/directional-chaos-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ejecuta Sacadas de Corrección Inmediatas",
      "text": "Cuando el blanco cambie de sentido bruscamente, no intentes adivinar su rumbo. Deja que la retina capte el deslizamiento y dispara una microsacada veloz para recentrar la fóvea.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/directional-chaos-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Mantén Series Cortas de Máxima Intensidad",
      "text": "Realiza entre 5 y 8 rondas de 60 segundos con descansos intermedios para mantener al máximo la velocidad de procesamiento neuronal.",
      "url": "https://skilldrills.online/es/drills/visual-tracking/directional-chaos-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el ejercicio de Persecución Caótica Direccional (Directional Chaos Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es un ejercicio de motilidad ocular avanzada en el que el objetivo sufre continuas perturbaciones de velocidad y rebotes estocásticos en los bordes. Esto anula la predicción motora del cerebelo y obliga al sistema visual a reaccionar en circuito cerrado foveal."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es una sacada de recuperación (Catch-up Saccade)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cuando el blanco cambia de rumbo bruscamente, la velocidad de la imagen supera el límite del seguimiento suave (~30°/s), provocando deslizamiento retiniano. El colículo superior y la corteza frontal disparan un salto balístico de 150 a 200 ms (sacada de corrección) para reubicar la fóvea sobre el blanco."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre este seguimiento caótico y las rutas predecibles (Lissajous, círculos)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En patrones geométricos repetitivos, el cerebelo toma el mando con modelos predictivos de latencia cero (Bahill et al., 1980). En el movimiento caótico no hay ciclos repetidos; la anticipación falla siempre, entrenando reflejos visuales puros en tiempo real."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo ayuda este ejercicio al apuntado y tracking en videojuegos FPS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En títulos competitivos como Apex Legends, Overwatch 2 y CS2, los rivales utilizan strafe errático y cambios bruscos de ritmo. Entrenar la recuperación sacádica reduce la desorientación visual y permite volver a centrar la retícula sobre el enemigo con mucha mayor rapidez."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es crucial mantener la cabeza inmóvil durante el entrenamiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mover la cabeza activa el reflejo vestíbulo-ocular (RVO) guiado por el oído interno, anulando el esfuerzo de los músculos oculares. Fijar la cabeza garantiza que los seis músculos extraoculares soporten toda la carga neuromuscular del ejercicio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el tiempo diario y la estructura de sesión recomendada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomendamos de 5 a 10 minutos al día (entre 5 y 8 series de 60 segundos). Debido a la gran demanda neuronal y al continuo disparo de sacadas de ajuste, mantener sesiones breves previene la fatiga ocular y maximiza la neuroplasticidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué debo hacer si la velocidad sube y pierdo de vista el objetivo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si pierdes el objetivo, no barras la pantalla al azar. Mantén la mirada atenta en la zona media, detecta el movimiento periférico y lanza una sacada directa hacia el nuevo vector. Si te ocurre con frecuencia, baja la velocidad a 0.8x."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué impacto tiene la tasa de refresco del monitor (Hz) en el seguimiento de trayectorias caóticas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pantallas de alta frecuencia (144 Hz, 240 Hz o superior) reducen la latencia de muestra a menos de 4 ms (Woods et al., 2015). Esto permite percibir las inflexiones del vector decenas de milisegundos antes, facilitando sacadas de corrección mucho más precisas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Tiene transferencia a deportes reales como tenis, béisbol o fútbol?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Los balones con efectos aerodinámicos, botes irregulares y desviaciones súbitas exigen una refijación foveal constante. Mejorar la velocidad sacádica permite a los deportistas no perder la trayectoria de la pelota tras un quiebre imprevisto."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es gratuito y seguro realizar este test de seguimiento caótico a diario?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, el test es totalmente gratuito, funciona directamente en el navegador sin registros ni descargas, y todos tus registros de rendimiento quedan almacenados exclusivamente en la memoria local de tu dispositivo."
      }
    }
  ]
};

const guideProps = {
  heading: "Fundamentos Neurocientíficos del Seguimiento Ocular Caótico y Recuperación Sacádica",
  intro: [
    "La mayoría de entrenamientos de seguimiento ocular utilizan figuras geométricas predecibles, lo que induce al cerebelo a sustituir el procesamiento sensorial en tiempo real por un modelo motor predictivo (Bahill, Iandolo, & Troost, 1980). La Persecución Caótica Direccional (Directional Chaos Pursuit) suprime esta ventaja: perturbaciones estocásticas continuas y rebotes elásticos impiden cualquier anticipación, forzando a los centros oculomotores a operar en circuito cerrado reflexivo estricto (Closed-Loop Tracking).",
    "Dinámica de la Recuperación Sacádica y Retinal Slip: ante un giro o aceleración imprevista, la velocidad angular desborda el límite del seguimiento suave (~30°/s), proyectando la imagen fuera de la fóvea central. El córtex visual y el colículo superior miden el error posicional y disparan una sacada de compensación (Catch-up Saccade) en 150-200 ms (Rashbass, 1961; Krauzlis, 2004; Barnes, 2008). La velocidad con que se refija el objetivo y se recupera la ganancia de persecución determina la eficacia visomotora en escenarios de alta exigencia competitiva.",
    "Latencia de Hardware y Frecuencia de Muestreo: las pantallas habituales de 60 Hz imponen un retardo de visualización de hasta 16,7 ms, mientras que monitores para gaming a 144 Hz o 240 Hz acortan ese intervalo por debajo de 4,2 ms (Woods et al., 2015). Esta herramienta funciona 100% en el navegador, preservando tu privacidad y garantizando el guardado local exclusivo de datos."
  ],
  benchmarks: {
    title: "Estándares de Rendimiento en Seguimiento Caótico y Recuperación Sacádica",
    headers: ["Nivel de Rendimiento", "Multiplicador de Velocidad", "Tiempo de Refijación y Estabilidad Ocular", "Perfil Neuromotor y Oculomotor"],
    rows: [
      ["Nivel 1: Apex Reactivo – Reflejos de Élite", "2.0x+ Ultra-Velocidad", "La sacada de corrección impacta al instante del quiebre; fijación suave y continua sin oscilaciones sobre el nuevo vector.", "Máxima velocidad de conducción sináptica entre retina periférica y núcleos motores oculares. Nivel profesional para esports y deportes de alta dinámica."],
      ["Nivel 2: Recuperación Sacádica Superior", "1.4x – 1.9x Alta Velocidad", "Recentrado veloz con mínimo sobreimpulso oscilatorio; retoma la persecución suave en menos de 180 ms.", "Excelente control de los músculos extraoculares. Gran adaptabilidad a cambios bruscos de dirección y ritmo."],
      ["Nivel 3: Estándar Funcional Sólido", "1.0x – 1.3x Velocidad Estándar", "Seguimiento fiable a velocidad normal; ligero retardo de latencia en rebotes con ángulos muy agudos.", "Rango habitual de adultos sanos. Totalmente suficiente para conducción vial, deportes de recreo y videojuegos."],
      ["Nivel 4: Refijación Tardía – Requiere Práctica", "0.7x – 0.9x Velocidad Moderada", "El blanco escapa habitualmente del área foveal; se requieren varias sacadas sucesivas para reenganchar la trayectoria.", "Latencia sensoriomotora aumentada ante giros imprevistos. Se recomienda consolidar la motilidad en velocidades más lentas."],
      ["Nivel 5: Inestabilidad Ocular – Principiante", "< 0.7x Baja Velocidad", "Pérdida continua del objetivo; la mirada busca de forma errática por la pantalla en lugar de acompañar la trayectoria.", "Conviene afianzar primero el seguimiento suave en trayectorias sinusoidales continuas antes de afrontar perturbaciones caóticas."]
    ],
    note: "Baremos fundamentados en la cinemática de respuesta oculomotora y compensación sacádica ante trayectorias estocásticas (Bahill et al., 1980; Barnes, 2008; Krauzlis, 2004; Robinson, 1965)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'barnes2008', 'krauzlis2004', 'robinson1965', 'rashbass1961', 'woods2015'),
  related: [
    { href: "/es/drills/visual-tracking/constant-slow-pursuit", label: "Seguimiento Ocular Lento (Constant Slow)" },
    { href: "/es/drills/visual-tracking/sine-wave-pursuit", label: "Rastreo en Onda Sinusoidal (Sine Wave)" },
    { href: "/es/drills/visual-tracking/infinity-pursuit", label: "Seguimiento en Ocho Infinito (Figure-8)" },
    { href: "/es/drills/visual-tracking/dynamic-evasion-pursuit", label: "Persecución Evasiva Dinámica (Dynamic Evasion)" }
  ]
};

export default function DirectionalChaosPursuitPageEs() {
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
      <DirectionalChaosPursuitClient
        copy={{
          title: "Persecución Caótica Direccional – Seguimiento Ocular",
          subtitle: "Entrenamiento de Recuperación Sacádica y Refixación Visual Inmediata",
          description: "A diferencia de los patrones geométricos predecibles, este ejercicio aplica perturbaciones continuas y rebotes elásticos aleatorios. El sistema oculomotor no puede anticipar el movimiento mediante modelos cerebelosos internos y se ve obligado a operar en circuito cerrado reflexivo, disparando microsacadas correctivas veloces para re-centrar el blanco en la fóvea (Bahill et al., 1980; Krauzlis, 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/es/drills/visual-tracking/directional-chaos-pursuit" />
      </div>
    </>
  );
}
