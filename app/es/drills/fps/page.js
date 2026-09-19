import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const fpsDrills = DRILLS.filter((d) => d.category === 'fps');

export const metadata = {
  title: 'Mejorar Puntería FPS – Aim Trainer Online | SkillDrills',
  description: 'Aim Trainer gratis para Valorant, CS2 y Apex. 15 ejercicios de flicks, tracking, control de retroceso y reflejos directamente en tu navegador.',
  keywords: [
    'mejorar puntería fps', 'entrenar puntería valorant', 'cs2 puntería entrenamiento',
    'flick shots ejercicios', 'tracking puntería', 'colocación de la mira',
    'sensibilidad ratón shooter', 'aim trainer online gratis', 'reflejos gaming test',
    'control de retroceso online', 'apuntar con brazo o muñeca', 'microajustes puntería',
    'precisión de ratón test', 'calculadora edpi shooter', 'aim trainer navegador gratis'
  ],
  openGraph: {
    title: 'Mejorar Puntería FPS – Aim Trainer Online | SkillDrills',
    description: 'Aim Trainer gratis para Valorant, CS2 y Apex. 15 ejercicios de flicks, tracking, control de retroceso y reflejos directamente en tu navegador.',
    type: 'website',
    url: 'https://skilldrills.online/es/drills/fps',
    siteName: 'SkillDrills',
    locale: 'es_ES',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Aim Trainer FPS Online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mejorar Puntería FPS – Aim Trainer Online | SkillDrills',
    description: 'Entrenador de puntería gratis para Valorant, CS2 y Apex. 15 ejercicios profesionales en tu navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/fps',
    languages: getAlternateLanguages('/es/drills/fps'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/es" },
    { "@type": "ListItem", "position": 2, "name": "Directorio de Ejercicios", "item": "https://skilldrills.online/es/drills" },
    { "@type": "ListItem", "position": 3, "name": "Puntería FPS", "item": "https://skilldrills.online/es/drills/fps" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Entrenador de Puntería FPS Gratis – Centro de Entrenamiento Online",
  "url": "https://skilldrills.online/es/drills/fps",
  "description": `15 ejercicios profesionales de puntería para Valorant, CS2 y Apex Legends. Flick shots, seguimiento (tracking), control de retroceso, giros de 180° y reflejos. Sin descargas ni registros.`,
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": fpsDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'es', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/es${drill.href}`
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo se transfiere el entrenamiento de puntería en navegador a shooters tácticos como Valorant y CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En shooters tácticos como Valorant y CS2, el tiempo para matar (TTK) suele ser inferior a 200 ms, por lo que la precisión del primer impacto y los microajustes finales deciden cada duelo. Las partidas de combate a muerte (Deathmatch) en el juego conllevan tiempos muertos de reaparición y desplazamientos pasivos, mientras que un aim trainer dedicado aísla cientos de movimientos balísticos (flicks) y mecánicas de frenado en solo 10 minutos. Esto automatiza los patrones neuromusculares en la corteza motora, liberando ancho de banda cognitivo para la colocación de la mira (crosshair placement) y la toma de decisiones tácticas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre Click Timing (Flicks), Tracking y Cambio de Objetivo (Target Switching)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La mecánica de disparo en videojuegos FPS se divide en tres pilares: 1) Click Timing / Flicks: mover el ratón velozmente hacia un objetivo e interceptar la hitbox con un clic exacto, vital para armas de un solo toque como Vandal o AK-47. 2) Tracking (Seguimiento continuo): mantener la retícula sincronizada con la trayectoria de un enemigo en movimiento continuo, fundamental para el fuego automático en Apex Legends y Overwatch 2. 3) Target Switching: alternar la mira entre múltiples objetivos a máxima velocidad con mínimo tiempo de transición, esencial en situaciones de clutch y desventaja numérica."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es mejor apuntar con la muñeca, con el antebrazo o usar una técnica híbrida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En el ámbito competitivo profesional predomina la técnica de puntería híbrida: el antebrazo y el hombro ejecutan los giros amplios de 180 grados y las transiciones espaciales mayores; la muñeca gestiona la adquisición de blancos a media distancia; y los dedos aportan los microajustes subpíxel y el control fino del retroceso vertical. Apuntar exclusivamente con la muñeca limita el ángulo de giro y eleva el riesgo de sufrir síndrome del túnel carpiano, mientras que usar solo el brazo carece de la destreza motora fina necesaria para tiros a la cabeza milimétricos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo encontrar la sensibilidad y distancia de giro (cm/360) óptima en el ratón?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La sensibilidad se mide de forma estandarizada en centímetros por giro de 360 grados (cm/360). En shooters tácticos (Valorant, CS2), una sensibilidad baja de 35 a 55 cm/360 (eDPI de 200 a 320) otorga la máxima estabilidad en microcorrecciones. En shooters de arena con mucho tracking (Apex Legends, Overwatch 2), una sensibilidad media de 24 a 38 cm/360 equilibra giros rápidos y suavidad de seguimiento. La sensibilidad ideal es aquella que te permite hacer strafes laterales manteniendo la mira fija en un punto estático sin que la retícula tiemble."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué tiembla mi puntería o sobrepasa el objetivo (overshooting) y cómo corregirlo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El temblor y el exceso de recorrido (overshooting) suelen originarse por tensión muscular excesiva en el antebrazo, agarrar el ratón con demasiada fuerza o usar una sensibilidad que supera tu capacidad actual de control neuromuscular de frenado. Para resolverlo: 1) aprovecha la fricción de tu alfombrilla ejerciendo una ligera presión hacia abajo con la base de la palma y las yemas al detener el movimiento balístico; 2) practica ejercicios de seguimiento suave (smooth pursuit) para relajar la musculatura; y 3) reduce tu sensibilidad entre un 10% y un 15% para ampliar el margen de error."
      }
    },
    {
      "@type": "Question",
      "name": "¿Un aim trainer en navegador es tan rápido y sensible como un software descargable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. SkillDrills implementa la API estándar W3C Raw Pointer Lock y renderizado por aceleración de hardware en HTML5 Canvas. Esto omite por completo las curvas de aceleración del ratón del sistema operativo y los bordes del escritorio, procesando deltas de movimiento directos del sensor (movementX y movementY). Gracias a una física de paso de tiempo fijo desacoplada del renderizado, la plataforma ofrece una respuesta instantánea 1:1 apta para monitores de 144 Hz, 240 Hz y 360 Hz sin requerir instalaciones ni consumir espacio en disco."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es más determinante en partida: la colocación de la mira (pre-aim) o el flick reactivo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En los shooters tácticos, aproximadamente el 70% de los enfrentamientos se ganan gracias a una correcta colocación de la mira (pre-aiming a la altura de la cabeza) antes de asomarse a una esquina. Sin embargo, cuando los rivales se colocan en ángulos inesperados (off-angles), realizan picos abiertos o entran en juego varios enemigos a la vez, el pre-aim no basta. En ese 30% crítico de situaciones impredecibles, la velocidad de flick balístico y la microcorrección refleja en menos de 200 ms marcan la diferencia entre sobrevivir o ser eliminado."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuántos minutos al día se debe practicar puntería para progresar de manera óptima?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La neurociencia del aprendizaje motor demuestra que tras unos 30 o 35 minutos de práctica continua de motricidad fina, la fatiga neuromuscular reduce notablemente la consolidación del aprendizaje. Por ello, la rutina más efectiva consiste en sesiones concentradas de 15 a 25 minutos al día, de 4 a 6 días por semana. Las sesiones breves y de alta intensidad seguidas de un descanso adecuado promueven la mielinización de las conexiones neuronales, consolidando la memoria muscular con mayor rapidez que las maratones esporádicas de fin de semana."
      }
    }
  ]
};

export default function SpanishFPSHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FPSHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

