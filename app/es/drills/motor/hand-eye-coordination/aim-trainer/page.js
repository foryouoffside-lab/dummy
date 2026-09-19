import AimTrainerClient from '@/app/drills/motor/hand-eye-coordination/aim-trainer/AimTrainerClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — es-ES / LATAM (motor / hand-eye-coordination / aim-trainer)
// PRIMARY DOMESTIC: "aim trainer" — 174 exact / 294 broad Bing searches/mo (Dominant term in Spain & LATAM)
//                   "entrenador de punteria" — High-intent Spanish query
//                   "mejorar punteria mouse" — Practical training query
//                   "test de punteria" — Assessment query
// WINNER TITLE:     Aim Trainer Online – Entrenador de Puntería Gratis & Precisión de Mouse FPS | SkillDrills
// ============================================================

export const metadata = {
  title: "Aim Trainer Online – Entrenador de Puntería | SkillDrills",
  description: "Entrenador de puntería online gratis: Mejora tu precisión con el ratón, micro-flicks y velocidad de reacción en el navegador según la Ley de Fitts.",
  keywords: ['aim trainer online', 'entrenador de punteria gratis', 'entrenar punteria raton', 'test de punteria fps', 'ejercicios de flick shot', 'ley de fitts punteria', 'aim trainer navegador gratis', 'calentamiento aim valorant', 'precision de raton test', 'velocidad de reaccion punteria', 'mejorar punteria cs2', 'entrenamiento de punteria online'],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/aim-trainer',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/aim-trainer'),
  },
  openGraph: {
    title: 'Aim Trainer Online – Entrenador de Puntería Gratis & Precisión de Mouse FPS | SkillDrills',
    description:
      'Entrenador de puntería online gratis en el navegador. Perfecciona tu precisión de ratón y micro-flicks con escalado continuo.',
    url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/aim-trainer',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aim Trainer Online – Entrenador de Puntería Gratis & Precisión de Mouse FPS | SkillDrills',
    description:
      'Entrenador de puntería online para shooters FPS. Mejora tu puntería y reflejos con el ratón.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Inicio', item: 'https://skilldrills.online/es' },
    { '@type': 'ListItem', position: 2, name: 'Centro de Ejercicios', item: 'https://skilldrills.online/es/drills' },
    { '@type': 'ListItem', position: 3, name: 'Control Motor & Precisión', item: 'https://skilldrills.online/es/drills/motor' },
    { '@type': 'ListItem', position: 4, name: 'Coordinación Ojo-Mano', item: 'https://skilldrills.online/es/drills/motor' },
    { '@type': 'ListItem', position: 5, name: 'Aim Trainer Online', item: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/aim-trainer' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Aim Trainer Online – Entrenador de Puntería Gratis FPS',
  alternateName: ['Aim Trainer', 'Entrenador de Puntería', 'Test de Puntería', 'Aim Trainer Online'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Herramienta web gratuita para mejorar la puntería, micro-flicks y coordinación visomotora con el ratón en juegos FPS.',
  browserRequirements: 'Navegador moderno con soporte para JavaScript y Pointer Lock (Chrome, Firefox, Safari, Edge)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Aim Trainer Online — Entrenador de Puntería Gratis FPS | SkillDrills',
  url: 'https://skilldrills.online/es/drills/motor/hand-eye-coordination/aim-trainer',
  description:
    'Entrena puntería y reflejos para juegos de disparos con objetivos dinámicos y dificultad adaptativa.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navegador moderno con soporte para JavaScript y Pointer Lock.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Puntería con ratón, micro-flicks, control visomotor, reflejos rápidos, cadencia de disparo',
};


const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Aim Trainer Online (Entrenador de Puntería)",
  "url": "https://skilldrills.online/es/drills/motor/hand-eye-coordination/aim-trainer",
  "description": "Free online browser-based 2D aim trainer for FPS gamers. Practice target acquisition, mouse accuracy, and click timing.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Aim Trainer", "FPS Training", "Hand-Eye Coordination", "Reaction Speed"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo entrenar la puntería con el ratón en el navegador',
  description: 'Guía paso a paso para maximizar tu puntería y reflejos con el Aim Trainer de SkillDrills.',
  step: [
    {
      '@type': 'HowToStep',
      "position": 1,
      "url": "https://skilldrills.online/es/drills/motor/hand-eye-coordination/aim-trainer#step-1",
      
      name: 'Iniciar el Entrenamiento',
      text: 'Pulsa en "Iniciar Entrenamiento" para entrar al modo pantalla completa y bloquear el cursor.',
    },
    {
      '@type': 'HowToStep',
      "position": 2,
      "url": "https://skilldrills.online/es/drills/motor/hand-eye-coordination/aim-trainer#step-2",
      
      name: 'Adquisición Visual del Objetivo',
      text: 'Localiza con la vista el objetivo dinámico en cuanto aparezca en el escenario.',
    },
    {
      '@type': 'HowToStep',
      "position": 3,
      "url": "https://skilldrills.online/es/drills/motor/hand-eye-coordination/aim-trainer#step-3",
      
      name: 'Micro-Flick y Disparo Preciso',
      text: 'Desplaza el ratón velozmente y frena sobre el centro del objetivo antes de que desaparezca.',
    },
    {
      '@type': 'HowToStep',
      "position": 4,
      "url": "https://skilldrills.online/es/drills/motor/hand-eye-coordination/aim-trainer#step-4",
      
      name: 'Mantener Combo y Superar Niveles',
      text: 'Encadena aciertos sucesivos para alcanzar el multiplicador de 3.0x y enfrentar niveles más veloces.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es un Aim Trainer y cómo mejora la puntería?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un Aim Trainer es un simulador que mide y perfecciona la rapidez y precisión con la que mueves el cursor del ratón hacia un objetivo. Permite aislar los micro-flicks y el timing de disparo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo influye la Ley de Fitts en el entrenamiento de puntería?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Ley de Fitts describe cómo el tiempo de movimiento depende de la distancia y el tamaño del objetivo. Objetivos más pequeños exigen un control motor fino superior.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el modelo de dos fases de la puntería?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consta de un impulso balístico inicial que cubre el 80–90% de la distancia sin corrección visual, y una fase terminal de desaceleración guiada por la vista para fijar el tiro exacto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Ayuda a mejorar en shooters como Valorant y CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, de forma directa. La precisión del primer disparo a la cabeza depende de micro-flicks de 5 a 15 grados, exactamente el patrón neuromuscular que calibra este ejercicio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué puntuación se considera buena en el Aim Trainer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los principiantes suelen puntuar por debajo de 8.000. Jugadores intermedios logran de 18.000 a 31.999 puntos, y jugadores de nivel competitivo superan los 48.000 puntos con más del 95% de precisión.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo escala la dificultad durante el ejercicio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada 1.750 puntos se sube de nivel. El radio de los objetivos disminuye de 26px a 8px, la velocidad aumenta de 80px/s a 370px/s y el tiempo de vida del objetivo baja de 2,8s a 0,40s.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los fallos tienen penalización?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Errar disparos o dejar expirar objetivos reinicia el combo a 1.0x, premiando el disparo deliberado y castigando el spam apresurado.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo sincronizar la sensibilidad de mi juego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El ejercicio utiliza entrada directa de ratón con Pointer Lock y se conecta con el ajuste global de sensibilidad para mantener los mismos cm/360 de tu juego habitual.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Afecta la tasa de refresco del monitor al rendimiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Pantallas de 144Hz o 240Hz reducen el retardo visual en 10–12 ms, permitiendo correcciones visuales más nítidas y seguras en la fase terminal del movimiento.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la mejor rutina de calentamiento diaria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un calentamiento de 10 a 15 minutos al día priorizando una precisión superior al 90% activa la corteza motora y aporta consistencia en partidas competitivas.',
      },
    },
  ],
};

export default function AimTrainerSpanishPage() {
  const sources = pickSources('fitts1954', 'mackenzie1992', 'elliott2010', 'woodworth1899', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <AimTrainerClient
        copy={{
          title: 'Aim Trainer Online (Entrenador de Puntería)',
          subtitle: 'Objetivos en Movimiento Dinámicos & Precisión de Clic • Niveles Infinitos',
          caption: 'Apunta y haz clic en los objetivos en movimiento lo más rápido y preciso posible antes de que expiren. Basado en la Ley de Fitts.',
          startButtonText: 'INICIAR ENTRENAMIENTO',
          playAgainText: 'Jugar de Nuevo',
          shareText: 'Compartir Puntuación',
          exitText: 'Salir',
          rulesTitle: 'Instrucciones & Sistema de Puntuación',
          aboutTitle: 'Sobre Aim Trainer Elite',
          rulesItems: [
            {
              num: "1",
              text: "Impacto al Blanco",
              highlight: "+100 PTS / +0,6s",
              result: "Detecta y haz clic en blancos móviles"
            },
            {
              num: "2",
              text: "Combo Continuo",
              highlight: "Hasta 3,0× Multiplicador",
              result: "Encadena aciertos limpios sin fallar"
            },
            {
              num: "3",
              text: "Progresión de Nivel",
              highlight: "+1 Nivel / 1750 PTS",
              result: "Los blancos se reducen y aceleran"
            },
            {
              num: "4",
              text: "Fallo y Expiración",
              highlight: "Reinicio de Combo",
              result: "Penalización activa resta -0,8s"
            }
          ]
        }}
      />

      <DrillGuide
        eyebrow="Psicofísica del Control Motor & Interacción Persona-Ordenador (IPO)"
        title="La Ciencia del Aim Training: Ley de Fitts y Precisión Visomotora en Shooters"
        sources={sources}
      >
        <p>
          La adquisición de objetivos con ratón de ordenador es una de las tareas psicomotoras de coordinación fina más complejas investigadas en ergonomía e interacción persona-ordenador (IPO). Tanto al despejar esquinas en shooters tácticos como en simulaciones de precisión, el sistema neuromuscular humano debe traducir coordenadas visuales en microcontracciones físicas instantáneas de la mano, muñeca y antebrazo (Fitts, 1954; MacKenzie, 1992).
        </p>

        <h3>La Ley de Fitts y el Índice de Dificultad (ID)</h3>
        <p>
          En 1954, Paul M. Fitts demostró que el tiempo de movimiento (\(MT\)) requerido para alcanzar un objetivo se modela matemáticamente por la distancia (\(D\)) y el ancho del objetivo (\(W\)):
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 my-3 text-center font-mono text-sm text-cyan-300">
          MT = a + b · log₂(2D / W) = a + b · ID
        </div>
        <p>
          Este factor logarítmico se denomina <strong>Índice de Dificultad (ID)</strong>. En el <em>Aim Trainer</em> de SkillDrills, a medida que avanzas, el tamaño del objetivo disminuye de 26 a 8 píxeles mientras la distancia y velocidad aumentan exponencialmente, poniendo a prueba tu capacidad visomotora (Fitts, 1954; MacKenzie, 1992).
        </p>

        <h3>El Modelo de Dos Fases del Disparo Guiado (Woodworth 1899; Elliott et al. 2010)</h3>
        <p>
          Mover el ratón hacia un objetivo no es un movimiento plano y continuo. La evidencia neurofisiológica demuestra que consta de dos fases:
        </p>
        <ol className="list-decimal pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Impulso Balístico Inicial (Bucle Abierto):</strong> Una orden motora preprogramada que cubre el 80% al 90% de la trayectoria en 120–180 milisegundos, demasiado veloz para incorporar correcciones visuales en vuelo.
          </li>
          <li>
            <strong>Desaceleración Terminal y Control Fino (Bucle Cerrado):</strong> Cuando el retículo entra en el perímetro del objetivo, el sistema visual detecta el error retiniano y aplica microajustes milimétricos antes del clic.
          </li>
        </ol>
        <p>
          Los tiradores novatos suelen sufrir de <em>over-flicking</em> (pasarse de largo) o <em>under-flicking</em> (frenar antes de tiempo). Los mejores jugadores calibran el impulso para frenar exactamente sobre el blanco (Elliott et al., 2010; Woods et al., 2015).
        </p>

        <h3>Frecuencia de Muestreo, Refresco y Latencia Sensorial</h3>
        <p>
          La precisión milimétrica exige minimizar el retraso de hardware. Como señalaron Woods et al. (2015), los retrasos neuronales biológicos suman entre 130 y 190 ms. Pantallas de 144Hz o 240Hz reducen el tiempo entre cuadros a 6,9 ms o 4,1 ms, facilitando lecturas visuales claras durante la fase crítica de frenado.
        </p>

        <h3>Baremos de Puntuación y Clasificación (Test de 45 Segundos)</h3>
        <p>
          Compara tus resultados con esta escala de rendimiento:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left border-collapse border border-white/10 text-xs sm:text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-200">
                <th className="p-2.5 border border-white/10 font-bold">Nivel</th>
                <th className="p-2.5 border border-white/10 font-bold">Puntuación</th>
                <th className="p-2.5 border border-white/10 font-bold">Fase</th>
                <th className="p-2.5 border border-white/10 font-bold">Precisión</th>
                <th className="p-2.5 border border-white/10 font-bold">Perfil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-emerald-400">Tier 1 (Élite)</td>
                <td className="p-2.5 border border-white/10">&gt; 48.000 PTS</td>
                <td className="p-2.5 border border-white/10">Level 12+</td>
                <td className="p-2.5 border border-white/10">&gt; 95% (Combo 25+)</td>
                <td className="p-2.5 border border-white/10">Nivel E-Sports / Tirador de Élite</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-cyan-400">Tier 2 (Experto)</td>
                <td className="p-2.5 border border-white/10">32.000 – 47.999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 9–11</td>
                <td className="p-2.5 border border-white/10">88% – 94% (Combo 18–24)</td>
                <td className="p-2.5 border border-white/10">Competitivo Alto / Fragger Preciso</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-blue-400">Tier 3 (Medio)</td>
                <td className="p-2.5 border border-white/10">18.000 – 31.999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 6–8</td>
                <td className="p-2.5 border border-white/10">78% – 87% (Combo 12–17)</td>
                <td className="p-2.5 border border-white/10">Jugador Habitual / Puntería Estable</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-amber-400">Tier 4 (Básico)</td>
                <td className="p-2.5 border border-white/10">8.000 – 17.999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 3–5</td>
                <td className="p-2.5 border border-white/10">65% – 77% (Combo 6–11)</td>
                <td className="p-2.5 border border-white/10">En Proceso / Errores Frecuentes</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-rose-400">Tier 5 (Inicial)</td>
                <td className="p-2.5 border border-white/10">&lt; 8.000 PTS</td>
                <td className="p-2.5 border border-white/10">Level 1–2</td>
                <td className="p-2.5 border border-white/10">&lt; 65% (Combo &lt; 6)</td>
                <td className="p-2.5 border border-white/10">Puntería Inestable / Disparos Apresurados</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>4 Claves para un Entrenamiento Efectivo de Puntería</h3>
        <p>
          Para comprimir sistemáticamente la latencia de adquisición y maximizar la precisión en micro-flicks, aplique estos cuatro protocolos motores basados en la evidencia durante sus sesiones:
        </p>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Flick Inicial Decidido (Woodworth, 1899):</strong> Recorre la mayor parte de la distancia en un solo movimiento fluido y sin titubeos.
          </li>
          <li>
            <strong>Frenado Terminal Estable (Fitts, 1954):</strong> Desacelera suavemente justo antes de hacer clic para evitar que el ratón rebote fuera del objetivo.
          </li>
          <li>
            <strong>Sensibilidad Homogénea (MacKenzie, 1992):</strong> Mantén la misma relación cm/360 en todos tus juegos para asentar la memoria muscular.
          </li>
          <li>
            <strong>Agarre Relajado (Woods et al., 2015):</strong> No tenses la mano ni aprietes el ratón al disparar; pulsar el botón debe ser un movimiento limpio e independiente.
          </li>
        </ul>

        <h3>Preguntas Frecuentes (FAQ)</h3>
        <div className="space-y-4 my-4">
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">¿Qué es un Aim Trainer y cómo mejora la puntería?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Un Aim Trainer es un simulador que mide y perfecciona la rapidez y precisión con la que mueves el cursor del ratón hacia un objetivo. Permite aislar los micro-flicks y el timing de disparo.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">¿Cómo influye la Ley de Fitts en el entrenamiento de puntería?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              La Ley de Fitts describe cómo el tiempo de movimiento depende de la distancia y el tamaño del objetivo. Objetivos más pequeños exigen un control motor fino superior.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">¿Qué es el modelo de dos fases de la puntería?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Consta de un impulso balístico inicial que cubre el 80–90% de la distancia sin corrección visual, y una fase terminal de desaceleración guiada por la vista para fijar el tiro exacto.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">¿Ayuda a mejorar en shooters como Valorant y CS2?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Sí, de forma directa. La precisión del primer disparo a la cabeza depende de micro-flicks de 5 a 15 grados, exactamente el patrón neuromuscular que calibra este ejercicio.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">¿Qué puntuación se considera buena en el Aim Trainer?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Los principiantes suelen puntuar por debajo de 8.000. Jugadores intermedios logran de 18.000 a 31.999 puntos, y jugadores de nivel competitivo superan los 48.000 puntos con más del 95% de precisión.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">¿Cómo escala la dificultad durante el ejercicio?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Cada 1.750 puntos se sube de nivel. El radio de los objetivos disminuye de 26px a 8px, la velocidad aumenta de 80px/s a 370px/s y el tiempo de vida del objetivo baja de 2,8s a 0,40s.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">¿Los fallos tienen penalización?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Errar disparos o dejar expirar objetivos reinicia el combo a 1.0x, premiando el disparo deliberado y castigando el spam apresurado.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">¿Puedo sincronizar la sensibilidad de mi juego?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Sí. El ejercicio utiliza entrada directa de ratón con Pointer Lock y se conecta con el ajuste global de sensibilidad para mantener los mismos cm/360 de tu juego habitual.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">¿Afecta la tasa de refresco del monitor al rendimiento?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Sí. Pantallas de 144Hz o 240Hz reducen el retardo visual en 10–12 ms, permitiendo correcciones visuales más nítidas y seguras en la fase terminal del movimiento.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">¿Cuál es la mejor rutina de calentamiento diaria?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Un calentamiento de 10 a 15 minutos al día priorizando una precisión superior al 90% activa la corteza motora y aporta consistencia en partidas competitivas.
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="motor"
          currentHref="/drills/motor/hand-eye-coordination/aim-trainer"
          locale="es"
        />
      </div>
      <DrillFooter />
    </>
  );
}
