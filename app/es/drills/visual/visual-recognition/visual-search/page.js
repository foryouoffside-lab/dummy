import VisualSearchClient from '@/app/drills/visual/visual-recognition/visual-search/VisualSearchClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Búsqueda Visual: Rastreo Conjuntivo | SkillDrills",
  description: "Test de búsqueda visual y rastreo conjuntivo gratis online. Localiza objetivos entre 96 caracteres densos y entrena la velocidad de exploración y atención.",
  keywords: [
    "test de búsqueda visual",
    "búsqueda conjuntiva visual",
    "rastreo visual test",
    "teoría de integración de características",
    "atención selectiva visual",
    "discriminación de objetivos",
    "inspección visual online",
    "velocidad de exploración visual",
    "tarea de búsqueda visual",
    "amplitud de atención visual",
    "entrenamiento de campo periférico",
    "test de símbolos visuales"
],
  openGraph: {
    title: "Test de Búsqueda Visual: Rastreo Conjuntivo | SkillDrills",
    description: "Test de búsqueda visual y rastreo conjuntivo gratis online. Localiza objetivos entre 96 caracteres densos y entrena la velocidad de exploración y atención.",
    type: "website",
    url: "https://skilldrills.online/es/drills/visual/visual-recognition/visual-search",
    siteName: "SkillDrills",
  },
  twitter: {
    card: "summary_large_image",
    title: "Test de Búsqueda Visual: Rastreo Conjuntivo | SkillDrills",
    description: "Test de búsqueda visual y rastreo conjuntivo gratis online. Localiza objetivos entre 96 caracteres densos y entrena la velocidad de exploración y atención.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/es/drills/visual/visual-recognition/visual-search",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/visual-search', 'es'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es/" },
    { "@type": "ListItem", "position": 2, "name": "Entrenamiento Visual", "item": "https://skilldrills.online/es/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Reconocimiento Visual", "item": "https://skilldrills.online/es/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "Test de Búsqueda Visual – Rastreo Conjuntivo", "item": "https://skilldrills.online/es/drills/visual/visual-recognition/visual-search" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Búsqueda Visual – Rastreo Conjuntivo",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Evaluación gratuita de búsqueda visual conjuntiva. Escanea matrices densas de 96 caracteres rotados para cuantificar la latencia y atención selectiva.",
  "url": "https://skilldrills.online/es/drills/visual/visual-recognition/visual-search",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Búsqueda Visual Conjuntiva",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/es/drills/visual/visual-recognition/visual-search",
  "applicationCategory": "EducationalApplication",
  "dateModified": "2026-09-05"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Juego de Búsqueda Visual y Rastreo Conjuntivo",
  "url": "https://skilldrills.online/es/drills/visual/visual-recognition/visual-search",
  "description": "Juego cognitivo de rastreo visual. Localiza símbolos objetivo en densas matrices de 96 caracteres rotados en 45 segundos.",
  "genre": ["Action", "Brain Game", "Search Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo entrenar la velocidad de búsqueda visual y rastreo conjuntivo",
  "description": "Perfecciona tu velocidad de adquisición de objetivos, integración de características y atención selectiva con base científica.",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Memoriza el carácter objetivo asignado",
      "text": "Registra en tu memoria de trabajo la forma geométrica y orientación exacta del símbolo situado en el encabezado.",
      "url": "https://skilldrills.online/es/drills/visual/visual-recognition/visual-search#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Aplica un filtrado periférico preliminar",
      "text": "Mantén la mirada relajada y emplea la visión periférica para descartar bloques de símbolos con morfología dispar.",
      "url": "https://skilldrills.online/es/drills/visual/visual-recognition/visual-search#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ejecuta un barrido sacádico en patrón continuo",
      "text": "Desplaza la fóvea en trayectorias ordenadas de zigzag a través de la matriz de 96 celdas sin retrocesos redundantes.",
      "url": "https://skilldrills.online/es/drills/visual/visual-recognition/visual-search#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Confirma con un clic decisivo e instantáneo",
      "text": "Pulsa sobre el carácter en cuanto lo identifiques para registrar tu latencia de respuesta en milisegundos.",
      "url": "https://skilldrills.online/es/drills/visual/visual-recognition/visual-search#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué mide el test de búsqueda visual y cómo se estructura?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evalúa la rapidez de rastreo visual, la integración de rasgos conjuntivos y la capacidad de atención selectiva al buscar un carácter específico en una matriz 12x8 con 96 distractores rotados en un lapso de 45 segundos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre búsqueda simple y búsqueda conjuntiva?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La búsqueda simple se basa en un rasgo sobresaliente y produce un pop-out automático. La conjuntiva combina varios atributos y requiere una revisión atencional serial de cada elemento (Treisman & Gelade, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué los distractores están orientados en distintas posiciones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Porque una orientación idéntica permite al cerebro agrupar el fondo de forma automática. La rotación aleatoria elimina esa ventaja e impone una inspección foveal rigurosa (Duncan & Humphreys, 1989)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo funciona el modelo Guided Search de Wolfe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plantea que las áreas visuales tempranas computan mapas de rasgos en paralelo y generan un mapa de prioridades que dirige las sacadas hacia las regiones con más probabilidades de éxito (Wolfe, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué puntuación se considera destacada en este test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los principiantes obtienen entre 300 y 550 puntos (2–3 aciertos). La media habitual oscila entre 600 y 1.000 puntos (4–6 aciertos), y los jugadores de alto nivel superan los 1.500 puntos (más de 10 dianas con latencias < 450 ms)."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué consiste la Teoría de la Carga Perceptiva de Lavie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Explica que una elevada demanda sensorial satura los recursos atencionales del cerebro, impidiendo que estímulos irrelevantes o distracciones internas desvíen el foco (Lavie, 1995)."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué diferencia los movimientos oculares de un experto de los de un novato?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los expertos emplean trayectorias metódicas en zigzag, usan la visión periférica y fijan durante solo 200–250 ms, mientras que los novatos saltan caóticamente y se demoran en cada distractor."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se penalizan los errores al pulsar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No se restan puntos ni se pierde tiempo. Un fallo genera únicamente una alerta visual momentánea, permitiendo mantener un ritmo de exploración dinámico."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué entornos profesionales y deportivos es crucial esta destreza?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En radiología, control del espacio aéreo, inspección aduanera, seguridad táctica y deportes de ritmo rápido o videojuegos de acción donde detectar objetivos camuflados es decisivo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la mejor táctica para reducir el tiempo de adquisición?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aplicar barridos ordenados en zigzag, filtrar en bloque con la visión periférica y no permanecer fijado en ningún distractor más de una cuarta de segundo."
      }
    }
  ]
};

export default function VisualSearchLocalePage() {
  const sources = pickSources('treisman1980', 'wolfe1994', 'duncan1989', 'lavie1995', 'eriksen1986', 'bacon1994', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <VisualSearchClient copy={{ title: "Juego de Búsqueda Visual y Rastreo Conjuntivo" }} />
      <DrillGuide
        eyebrow="Psicofísica Cognitiva & Atención Visual"
        title="La Ciencia de la Búsqueda Visual, Integración de Características & Atención Selectiva"
        sources={sources}
      >
        <p dangerouslySetInnerHTML={{ __html: `La capacidad de localizar con rapidez un estímulo diana dentro de un entorno visual saturado es un pilar esencial del procesamiento cognitivo humano. Desde la lectura de radiografías en medicina clínica hasta el control aéreo, las operaciones de seguridad y el seguimiento de rivales en los deportes electrónicos, la búsqueda visual depende de una sinergia perfecta entre los campos receptores de la retina y las redes atencionales frontoparietales (Treisman & Gelade, 1980; Wolfe, 1994).` }} />

        <h3>Teoría de Integración de Características: Pop-Out Paralelo vs. Búsqueda Serial</h3>
        <p dangerouslySetInnerHTML={{ __html: `Anne Treisman y Garry Gelade (1980) postularon la Teoría de Integración de Características (FIT). Cuando la diana se distingue por un único rasgo aislado (como color o brillo), la detección ocurre de forma <strong>paralela y preatencional</strong> produciendo un efecto de 'pop-out' instantáneo independiente del número de distractores. En cambio, si el objetivo se define por una <strong>conjunción de características</strong> o si los distractores están orientados aleatoriamente, el pop-out se inhabilita. El cerebro debe aplicar atención focal secuencial elemento por elemento en una <strong>búsqueda serial</strong>, elevando el tiempo de respuesta de forma proporcional a los elementos en pantalla (Treisman & Gelade, 1980; Duncan & Humphreys, 1989).` }} />

        <h3>Modelo de Búsqueda Guiada y Principios de Similitud (Wolfe, 1994; Duncan & Humphreys, 1989)</h3>
        <p dangerouslySetInnerHTML={{ __html: `El modelo Guided Search de Jeremy Wolfe (Wolfe, 1994) demostró que el cerebro no explora a ciegas: las etapas sensoriales tempranas calculan un 'mapa de prioridades' que guía las sacadas oculares hacia las zonas más prometedoras. Duncan y Humphreys (1989) establecieron que la eficacia de este proceso depende de la <em>similitud diana-distractor</em> y la <em>homogeneidad entre distractores</em>. Cuando los distractores presentan orientaciones variadas, el agrupamiento gestáltico del fondo desaparece, obligando a un análisis foveal pormenorizado.` }} />

        <h3>Lente Zoom Atencional y Carga Perceptiva (Lavie, 1995; Eriksen & St. James, 1986)</h3>
        <p dangerouslySetInnerHTML={{ __html: `El modelo zoom-lens de Eriksen y St. James (1986) describe la atención como un foco de amplitud adaptable: ampliar el campo disminuye la resolución discriminativa, mientras que constreñirlo sobre una sola celda maximiza la agudeza. Por su parte, la Teoría de la Carga Perceptiva de Nilli Lavie (1995) demuestra que la saturación sensorial previene distracciones irrelevantes. En condiciones de alta carga perceptiva —como nuestra densa matriz de 96 caracteres bajo el cronómetro de 45 segundos—, los recursos atencionales se agotan íntegramente en la tarea, facilitando un estado de flujo ininterrumpido (Lavie, 1995; Bacon & Egeth, 1994).` }} />

        <h3>Baremos de Rendimiento en Búsqueda Visual (Matriz de 96 Celdas)</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Nivel</th>
                <th className="py-2.5 px-3 font-semibold">Latencia de Adquisición</th>
                <th className="py-2.5 px-3 font-semibold">Puntuación 45s</th>
                <th className="py-2.5 px-3 font-semibold">Rango Editorial</th>
                <th className="py-2.5 px-3 font-semibold">Clasificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">&lt; 450 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 1.500 PTS (10+ aciertos)</td>
                <td className="py-2.5 px-3 tabular-nums">Excepcional</td>
                <td className="py-2.5 px-3">Esports de Élite / Operador de Radar</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">450 – 700 ms</td>
                <td className="py-2.5 px-3 tabular-nums">1.050 – 1.450 PTS (7–9 aciertos)</td>
                <td className="py-2.5 px-3 tabular-nums">Avanzado</td>
                <td className="py-2.5 px-3">Atleta Visual Competitivo</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">701 – 1.100 ms</td>
                <td className="py-2.5 px-3 tabular-nums">600 – 1.000 PTS (4–6 aciertos)</td>
                <td className="py-2.5 px-3 tabular-nums">Típico</td>
                <td className="py-2.5 px-3">Promedio General No Entrenado</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">1.101 – 1.600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">300 – 550 PTS (2–3 aciertos)</td>
                <td className="py-2.5 px-3 tabular-nums">Por Debajo de la Media</td>
                <td className="py-2.5 px-3">Rastreo Lento / Fatiga Visual</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">&gt; 1.600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 300 PTS (0–1 acierto)</td>
                <td className="py-2.5 px-3 tabular-nums">Inicial</td>
                <td className="py-2.5 px-3">Visión en Túnel / Saturación Perceptiva</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Estrategias de Entrenamiento para Maximizar el Rendimiento</h3>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>Filtrado Periférico por Silueta (Wolfe, 1994):</strong> No fijes cada letra una por una. Deja que la visión periférica descarte a la vez grupos de caracteres que no concuerden con el contorno básico del objetivo.
          </li>
          <li>
            <strong>Pauta Sacádica en Zigzag:</strong> Evita saltos desordenados por la pantalla. Sigue un barrido continuo en zigzag horizontal o vertical para recorrer las 96 posiciones sin repeticiones.
          </li>
          <li>
            <strong>Control de Fijaciones (200–250 ms):</strong> Limita el tiempo de fijación a 200–250 ms. Si la celda evaluada no encaja con la diana, pasa de inmediato al siguiente elemento.
          </li>
          <li>
            <strong>Mantenimiento de la Plantilla Mental:</strong> Conserva activa en tu mente la imagen del objetivo para que la vía visual ventral inhiba de manera refleja los distractores disonantes (Duncan & Humphreys, 1989).
          </li>
        </ol>

        <h3>Preguntas Frecuentes (FAQ)</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">¿Qué mide el test de búsqueda visual y cómo se estructura?</h4>
            <p className="text-slate-300 mt-1">
              Evalúa la rapidez de rastreo visual, la integración de rasgos conjuntivos y la capacidad de atención selectiva al buscar un carácter específico en una matriz 12x8 con 96 distractores rotados en un lapso de 45 segundos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">¿Cuál es la diferencia entre búsqueda simple y búsqueda conjuntiva?</h4>
            <p className="text-slate-300 mt-1">
              La búsqueda simple se basa en un rasgo sobresaliente y produce un pop-out automático. La conjuntiva combina varios atributos y requiere una revisión atencional serial de cada elemento (Treisman & Gelade, 1980).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">¿Por qué los distractores están orientados en distintas posiciones?</h4>
            <p className="text-slate-300 mt-1">
              Porque una orientación idéntica permite al cerebro agrupar el fondo de forma automática. La rotación aleatoria elimina esa ventaja e impone una inspección foveal rigurosa (Duncan & Humphreys, 1989).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">¿Cómo funciona el modelo Guided Search de Wolfe?</h4>
            <p className="text-slate-300 mt-1">
              Plantea que las áreas visuales tempranas computan mapas de rasgos en paralelo y generan un mapa de prioridades que dirige las sacadas hacia las regiones con más probabilidades de éxito (Wolfe, 1994).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">¿Qué puntuación se considera destacada en este test?</h4>
            <p className="text-slate-300 mt-1">
              Los principiantes obtienen entre 300 y 550 puntos (2–3 aciertos). La media habitual oscila entre 600 y 1.000 puntos (4–6 aciertos), y los jugadores de alto nivel superan los 1.500 puntos (más de 10 dianas con latencias &lt; 450 ms).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">¿En qué consiste la Teoría de la Carga Perceptiva de Lavie?</h4>
            <p className="text-slate-300 mt-1">
              Explica que una elevada demanda sensorial satura los recursos atencionales del cerebro, impidiendo que estímulos irrelevantes o distracciones internas desvíen el foco (Lavie, 1995).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">¿Qué diferencia los movimientos oculares de un experto de los de un novato?</h4>
            <p className="text-slate-300 mt-1">
              Los expertos emplean trayectorias metódicas en zigzag, usan la visión periférica y fijan durante solo 200–250 ms, mientras que los novatos saltan caóticamente y se demoran en cada distractor.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">¿Se penalizan los errores al pulsar?</h4>
            <p className="text-slate-300 mt-1">
              No se restan puntos ni se pierde tiempo. Un fallo genera únicamente una alerta visual momentánea, permitiendo mantener un ritmo de exploración dinámico.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">¿En qué entornos profesionales y deportivos es crucial esta destreza?</h4>
            <p className="text-slate-300 mt-1">
              En radiología, control del espacio aéreo, inspección aduanera, seguridad táctica y deportes de ritmo rápido o videojuegos de acción donde detectar objetivos camuflados es decisivo.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">¿Cuál es la mejor táctica para reducir el tiempo de adquisición?</h4>
            <p className="text-slate-300 mt-1">
              Aplicar barridos ordenados en zigzag, filtrar en bloque con la visión periférica y no permanecer fijado en ningún distractor más de una cuarta de segundo.
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/es/drills/visual/visual-recognition/visual-search" />
      </div>
    </>
  );
}
