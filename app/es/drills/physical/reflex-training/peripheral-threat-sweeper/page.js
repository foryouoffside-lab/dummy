import PeripheralThreatSweeperClient from '@/app/drills/physical/reflex-training/peripheral-threat-sweeper/PeripheralThreatSweeperClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Spain & Latin America (ES / ES-ES / ES-MX)
// Primary Intent: entrenar vision periferica, test de vision periferica online, ampliar campo visual ejercicios
// Hispanic Gaming & Athletic Context: Prevención de visión de túnel en shooters (Valorant, CS2) y expansión del campo de visión útil (UFOV) para atletas
// High-Demand, Low-Competition Target Keywords:
//   - "entrenar vision periferica" (Core athletic vision conditioning query)
//   - "test de vision periferica online" (Visual field testing query)
//   - "ampliar campo visual ejercicios" (Visual field expansion exercises)
//   - "evitar vision de tunel gaming" (Tunnel vision prevention in esports)
//   - "test de reflejos perifericos" (Peripheral reaction chronometry)
//   - "ejercicios de vision periferica para deportes" (Sports visual conditioning)
//   - "test ufov online" (Useful Field of View cognitive assessment)
//   - "mejorar percepcion espacial y reflejos" (Spatial perception & reflexes)
//   - "atencion visual encubierta test" (Covert visual attention paradigm)
//   - "entrenamiento visual para gamers" (Esports visual training query)
// ============================================================

export const metadata = {
  title: "Entrenar Visión Periférica – Test Online | SkillDrills",
  description: "Test de visión periférica online gratis. Intercepta amenazas en 360° por el rabillo del ojo y amplía tu campo visual útil (UFOV) en el navegador.",
  keywords: [
    "entrenar vision periferica",
    "test de vision periferica online",
    "ampliar campo visual ejercicios",
    "evitar vision de tunel gaming",
    "test de reflejos perifericos",
    "ejercicios de vision periferica para deportes",
    "test ufov online",
    "mejorar percepcion espacial y reflejos",
    "atencion visual encubierta test",
    "entrenamiento visual para gamers"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/physical/reflex-training/peripheral-threat-sweeper',
    languages: getAlternateLanguages('/drills/physical/reflex-training/peripheral-threat-sweeper'),
  },
  openGraph: {
    title: "Entrenar Visión Periférica – Test Online | SkillDrills",
    description: "Test de visión periférica online gratis. Intercepta amenazas en 360° por el rabillo del ojo y amplía tu campo visual útil (UFOV) en el navegador.",
    url: 'https://skilldrills.online/es/drills/physical/reflex-training/peripheral-threat-sweeper',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Entrenar Visión Periférica – Test Online | SkillDrills",
    description: "Test de visión periférica online gratis. Intercepta amenazas en 360° por el rabillo del ojo y amplía tu campo visual útil (UFOV) en el navegador.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills Inicio",
      "item": "https://skilldrills.online/es"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Centro de Entrenamiento Físico",
      "item": "https://skilldrills.online/es/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Entrenamiento de Reflejos",
      "item": "https://skilldrills.online/es/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Visión Periférica y Defensa Radial",
      "item": "https://skilldrills.online/es/drills/physical/reflex-training/peripheral-threat-sweeper"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Simulador de Visión Periférica y Ampliación de Campo Visual (UFOV)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Entrenador de Atención Visual Encubierta y Barrido Radial 360°",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Vision, Attention"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Peripheral Threat Sweeper 360 Challenge",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Cognitive Vision Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo entrena este ejercicio la visión periférica sin requerir el desvío directo de la mirada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El ejercicio aplica el paradigma de atención espacial encubierta de Michael Posner (1980). Al anclar la mirada en el núcleo central, el atleta aprende a proyectar sus recursos atencionales por el rabillo del ojo a lo largo de los 360° periféricos, eliminando los 150 a 200 ms que consumen las sacadas oculares mecánicas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué función cumple la teoría de integración de rasgos de Anne Treisman en este ejercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De acuerdo con Anne Treisman (1980), los estímulos periféricos con alto contraste cromático (nodos rojos y anaranjados en trayectoria convergente) activan detectores de rasgos preatencionales en la retina periférica, generando un efecto de resalte inmediato (pop-out) que alerta al córtex parietal sin necesidad de escaneo foveal."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo se manifiesta el modelo motor de Woodworth (1899) en los barridos con ratón?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cada barrido radial consta de las dos fases descritas por Robert S. Woodworth: una proyección balística inicial de muñeca en bucle abierto que cubre más del 85% de la distancia, seguida de una desaceleración óptica milimétrica en bucle cerrado para hacer clic sobre el nodo antes de que perfore el núcleo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es el Campo de Visión Útil (UFOV) y por qué se amplía mediante este simulador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El Useful Field of View (UFOV), estudiado por Karlene Ball et al. (1988), delimita el área visual en la que el cerebro puede procesar información en un instante sin mover los ojos ni la cabeza. Acelerar los vectores a 520 px/s y reducir el tiempo de aparición a 0,20 s obliga al córtex a expandir este margen funcional, evitando la visión de túnel."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué es fundamental recolocar el cursor en el centro tras neutralizar una amenaza?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mantener el cursor centrado conserva la equidistancia espacial hacia cualquier nuevo vector que emerja en los 360° circundantes. Dejar el ratón estacionado en un extremo exterior duplica la distancia motora requerida para responder en el flanco opuesto conforme a la Ley de Fitts, propiciando brechas en la defensa."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué sucede si una amenaza sobrepasa el escudo e impacta contra el núcleo central?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si un nodo alcanza el perímetro central (breach), el multiplicador acumulado de racha se reinicia de inmediato a 1.0x y la pantalla proyecta un destello rojo de advertencia. Contener las brechas resulta indispensable para mantener la bonificación y acceder al rango de élite de 24.000 puntos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué configuración de sensibilidad de ratón resulta más conveniente para barridos en 360 grados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se recomienda una sensibilidad media a moderadamente alta (eDPI entre 800 y 1400 en shooters tácticos) que facilite realizar movimientos rápidos hacia cualquier cuadrante sin tener que levantar el ratón ni rotar bruscamente el hombro, apoyándose en articulaciones ágiles de muñeca y dedos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué impacto tiene una pantalla de 144Hz o 240Hz en la percepción lateral periférica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La retina periférica posee una sensibilidad extraordinaria a la cinemática y al parpadeo. Los paneles de 144Hz y 240Hz refrescan los nodos a 520 px/s con una latencia de 4,1 ms sin estelas borrosas, activando los fotorreceptores magnocelulares con mucha mayor celeridad que un monitor convencional de 60Hz."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuántas sesiones diarias conviene practicar para evitar la sobrecarga visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se aconseja realizar entre 3 y 5 intentos de 45 segundos por jornada, intercalando pausas de 60 segundos mirando a un punto lejano. El entrenamiento de visión periférica exige un esfuerzo cognitivo intenso a los lóbulos parietales, por lo que estímulos cortos y concentrados aseguran la máxima neuroplasticidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Se transfieren mis métricas de barrido o resultados a plataformas externas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Todo el motor gráfico Canvas, la cronometría basada en performance.now() y la gestión de impactos se calculan estrictamente en tu navegador. Tus récords y puntuaciones se conservan exclusivamente de manera local en el localStorage de tu ordenador."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo en 4 Fases para Barrido Periférico y Defensa Radial 360°",
  "description": "Pauta metódica para ensanchar el campo visual útil, agudizar la atención encubierta y salvaguardar el núcleo ante amenazas multivectoriales.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fijación Central Foveal y Atención Encubierta (Core Eye Fixation)",
      "text": "Ancle los ojos firmemente en el núcleo central y evite rastrear los bordes con la vista, desplegando la percepción por el rabillo del ojo (Posner, 1980).",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/peripheral-threat-sweeper#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Detección Preatencional de Pop-Out de Treisman (Feature Saliency)",
      "text": "Capte al instante los nodos rojos y anaranjados que avanzan hacia el centro en la retina periférica mediante mapas de contraste directo.",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/peripheral-threat-sweeper#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Flick Balístico Radial de Woodworth (Radial Ballistic Snap)",
      "text": "Proyecte la muñeca con un movimiento veloz hacia el vector y presione el clic antes de que el nodo traspase el perímetro del escudo (+0,6s de extensión).",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/peripheral-threat-sweeper#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Recolocación Inmediata en el Centro y Continuidad (Recentering)",
      "text": "Retorne el cursor al centro de inmediato tras cada acierto para restablecer la cobertura simétrica de 360° camino a los 24.000 puntos.",
      "url": "https://skilldrills.online/es/drills/physical/reflex-training/peripheral-threat-sweeper#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('posner1980', 'treisman1980', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "Fundamentos Biomecánicos de la Visión Periférica y del Campo Visual Útil (UFOV)",
    paragraphs: [
      "En el aparato visual humano, la fóvea central —responsable de la agudeza fina y la discriminación cromática— abarca apenas de 1 a 2 grados del campo visual total. El amplio entorno periférico circundante pierde nitidez espacial estática, pero alberga una densidad sobresaliente de fotorreceptores bastones, especializados en percibir movimiento, destellos y contraste con gran premura. Este ejercicio evalúa y desarrolla la atención espacial encubierta (Posner, 1980): la capacidad de orientar recursos cognitivos hacia los flancos laterales sin mover la dirección primaria de los ojos.",
      "La trayectoria de cada barrido responde a los preceptos de la Ley de Fitts (1954) y al modelo motor en dos etapas de Woodworth (1899). El tiempo de movimiento se incrementa de forma logarítmica con la distancia angular y la reducción del diámetro del blanco. Al neutralizar nodos que avanzan hacia el centro, el participante debe lanzar el ratón con un impulso balístico en bucle abierto que cubra más del 85% del trayecto, aplicando una microcorrección óptica final instantes antes de accionar el botón.",
      "Investigaciones conducidas por Karlene Ball et al. (1988) demuestran que, bajo condiciones de sobrecarga o estrés competitivo, el campo de visión funcional puede sufrir una constricción acusada denominada 'visión de túnel'. La presente plataforma previene este deterioro partiendo de intervalos holgados de 1,4 segundos y evolucionando dinámicamente hasta frecuencias vertiginosas de 0,20 segundos con nodos a 520 px/s. Este estímulo perseverante compele al lóbulo parietal a expandir permanentemente el Useful Field of View (UFOV), otorgando una lectura espacial omnidireccional.",
      "Con el fin de certificar una fiabilidad milimétrica libre de interferencias, el sistema monitorea los tiempos mediante la API performance.now() del navegador. En monitores con frecuencias de 144Hz o 240Hz, el rastro de barrido en nodos a 520 px/s desaparece, asegurando una discriminación limpia y sin desfase de imagen (Woods et al., 2015). Tus marcas permanecen resguardadas de forma confidencial en la memoria de tu equipo."
    ]
  },
  benchmarks: {
    title: "Baremo Oficial de Clasificación para Visión Periférica y Defensa Radial",
    headers: ['Nivel (Tier)', 'Título y Clasificación', 'Puntos Meta', 'Precisión y Velocidad', 'Calificación', 'Nivel de Percepción'],
    rows: [
      ['Tier 1', 'Guardián Supremo del Campo Visual (Apex Peripheral Guardian)', '24.000+ pts', '90%+ Aciertos / 450+ px/s', 'Grado S', 'Top 1% (UFOV Extraordinario)'],
      ['Tier 2', 'Interceptor Radial de Precisión (Precision Radial Sweeper)', '17.000 – 23.999 pts', '82–89% Aciertos / 350–449 px/s', 'Grado A', 'Top 10% (Nivel Competitivo)'],
      ['Tier 3', 'Defensor Ágil de Campo (Skilled Field Defender)', '11.000 – 16.999 pts', '74–81% Aciertos / 250–349 px/s', 'Grado B', 'Top 30% (Percepción Sólida)'],
      ['Tier 4', 'Aprendiz Parafoveal en Progreso (Developing Parafoveal Tracker)', '6.000 – 10.999 pts', '65–73% Aciertos / 160–249 px/s', 'Grado C', 'Media (Jugadores Habituales)'],
      ['Tier 5', 'Principiante Expuesto a Visión de Túnel (Novice Tunnel Vision Vulnerable)', '< 6.000 pts', '< 65% Aciertos / < 160 px/s', 'Grado D', 'Básico (Expansión UFOV Recomendada)'],
    ],
    note: "La clasificación evalúa la puntuación total, número de penetraciones al núcleo sufridas, velocidad máxima sobrellevada y longitud máxima de racha.",
  },
  protocols: {
    title: "Protocolo de 4 Fases para la Optimización de la Visión Periférica",
    description: "Plan metódico para consolidar el anclaje foveal, agudizar la visión lateral y coordinar respuestas radiales en tiempo récord.",
    items: [
      {
        title: "Protocolo 1: Condicionamiento de Atención Encubierta de Posner",
        description: "Mantenga los ojos sujetos al punto central e inhiba el impulso de seguir estímulos con la mirada. Neutralice la latencia sacádica proyectando el foco a los cuatro cuadrantes (Posner 1980)."
      },
      {
        title: "Protocolo 2: Reconocimiento Preatencional de Pop-Out de Treisman",
        description: "Adiestre la retina periférica para asimilar nodos convergentes rojos y anaranjados en el borde externo como señales de resalte prioritario sin búsqueda lenta (Treisman & Gelade 1980)."
      },
      {
        title: "Protocolo 3: Flick Radial Balístico de Woodworth con Deceleración",
        description: "Al percibir el vector, proyecte el ratón mediante un golpe rápido de muñeca cubriendo el trayecto en bucle abierto, frenando con los dedos en el clic (Woodworth 1899)."
      },
      {
        title: "Protocolo 4: Ampliación de UFOV ante Alta Densidad y Jerarquización",
        description: "En fases avanzadas con intervalos de 0,20 s, evalúe la cercanía de varios nodos simultáneamente e intercepte en primer lugar los más próximos al núcleo (Woods et al. 2015)."
      }
    ]
  },
  faqs: {
    title: "Preguntas Frecuentes (FAQ) sobre Visión Periférica y Defensa de Amenazas",
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function LocalizedPeripheralThreatSweeperPageEs() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <PeripheralThreatSweeperClient
        copy={{
          title: "Entrenar Visión Periférica & Test de Campo Visual Online",
          subtitle: "Barrido Radial 360° y Defensa de Escudo • Dificultad con Escalado Continuo",
          description: "La visión periférica es aquello que puedes detectar sin mirar directamente. El nivel de detalle decrece de forma acusada desde el centro de la mirada, pero la atención puede dirigirse hacia un punto periférico mientras los ojos permanecen fijos, acelerando la respuesta motriz (Posner, 1980). Una característica única como el color se detecta en un tiempo similar con independencia de distracciones, mientras que objetivos que combinan rasgos demandan búsqueda atencional activa (Treisman & Gelade, 1980) — lo que hace que algunas amenazas sean sencillas de interceptar en el margen y otras no.",
          hudLabels: {
            score: "Puntuación",
            time: "Tiempo",
            bestScore: "Mejor Puntuación",
            bestCombo: "Mejor Racha",
            getReady: "PREPÁRATE",
            accuracy: "Precisión",
            sweeps: "Barridos",
            breaches: "Brechas",
            peakLevel: "Nivel Máximo"
          },
          resultLabels: {
            accuracy: "Precisión",
            sweeps: "Barridos",
            breaches: "Brechas",
            peakLevel: "Nivel Máximo"
          },
          rulesTitle: "Instrucciones del Drill y Sistema de Puntuación",
          rulesItems: [
            { title: "Defensa del Núcleo y Puntos", text: "Haga clic en los nodos rojos y anaranjados convergentes antes de que penetren en el núcleo central. Cada barrido concede 100 puntos base (multiplicados por nivel y racha) y +0,6s de tiempo." },
            { title: "Penalización por Penetración", text: "Si un nodo alcanza el núcleo central, se produce una brecha (breach): la racha de combo se reinicia a 1.0x y la pantalla emite un parpadeo rojo." },
            { title: "Escalado Continuo de Amenazas", text: "A medida que la puntuación asciende, el intervalo de aparición disminuye de 1,4s a 0,20s y la velocidad de los vectores se acelera de 160 px/s a 520 px/s." },
            { title: "Recolocación Táctica Central", text: "Retorne el cursor al núcleo central tras cada eliminación para mantener la equidistancia simétrica de 360° ante amenazas en cualquier ángulo." }
          ],
          aboutTitle: "Sobre el Entrenamiento de Visión Periférica y Atención Encubierta",
          aboutSections: [
            {
              title: "Orientación Atencional Encubierta y Barrido Periférico",
              subtitle: "Direccionamiento espacial de Posner sin desvío de la fijación foveal",
              content: "La intercepción de amenazas en la periferia ejercita la atención visual encubierta (Posner, 1980). En lugar de desplazar la mirada continuamente, el jugador mantiene la fijación en el centro mientras proyecta recursos atencionales hacia los 360° exteriores."
            },
            {
              title: "Integración Preatencional y Mapas de Prominencia",
              subtitle: "Búsqueda visual paralela de Treisman a través de ángulos radiales",
              content: "Los nuevos vectores de peligro estimulan detectores preatencionales de color y movimiento en la retina periférica (Treisman & Gelade, 1980). Los nodos contrastados suscitan el efecto pop-out, guiando al cerebro para frenar la incursión."
            },
            {
              title: "Flick Balístico y Protección del Núcleo",
              subtitle: "Movimiento rápido de Woodworth articulado con frenada precisa",
              content: "Los barridos requieren el control en dos etapas de Woodworth (1899): un latigazo inicial de muñeca cubriendo más del 85% de la trayectoria, seguido de ajustes visuales microscópicos antes del clic."
            },
            {
              title: "Campo Visual Útil y Procesamiento Multivectorial",
              subtitle: "Ampliación de la capacidad cognitiva bajo alta frecuencia de aparición",
              content: "Al comprimirse los tiempos de generación y escalar la velocidad a 520 px/s, el drill expande el Useful Field of View (UFOV), habituando al sistema nervioso a gestionar múltiples peligros simultáneamente."
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/peripheral-threat-sweeper" />
    </>
  );
}
