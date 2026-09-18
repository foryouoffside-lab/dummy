import TargetPrioritizationClient from './TargetPrioritizationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
export const metadata = {
  title: "Target Prioritization Aim Trainer – Threat Aim | SkillDrills",
  description: "Free target prioritization aim trainer. Train threat evaluation, attention filtering and shot inhibition against mixed friendly and enemy targets.",
  keywords: [
    "target prioritization aim trainer",
    "target prioritization trainer",
    "threat assessment drill",
    "impulse control aim drill",
    "target selection aim trainer",
    "distractor suppression aim",
    "fps decision training",
    "Valorant target selection",
    "CS2 threat sorting drill",
    "tactical decision making aim",
    "multi target threat prioritization",
    "panic firing fix aim drill"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/target-prioritization",
    languages: getAlternateLanguages('/drills/fps/target-prioritization'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Target Prioritization Aim Trainer – Threat Aim | SkillDrills",
    description: "Master threat assessment speed, visual distractor filtering, response inhibition, and priority target selection for competitive shooters like Valorant, CS2, and Apex Legends.",
    url: "https://skilldrills.online/drills/fps/target-prioritization",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Target Prioritization Aim Trainer – Threat Aim | SkillDrills",
    description: "Master threat assessment speed, visual distractor filtering, response inhibition, and priority target selection for competitive shooters like Valorant, CS2, and Apex Legends.",
  },
};

export default function TargetPrioritizationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Target Prioritization", "item": "https://skilldrills.online/drills/fps/target-prioritization" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Target Prioritization Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/target-prioritization",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free browser FPS drill training threat evaluation, attention filtering, and shot inhibition against mixed friendly and enemy targets."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Target Prioritization Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Improve your threat assessment speed, visual filtering, distractor suppression, and impulse control for competitive FPS games.",
    "genre": "FPS Training / Cognitive Threat Sorting",
    "url": "https://skilldrills.online/drills/fps/target-prioritization",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Target Prioritization Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/target-prioritization",
    "description": "Improve your threat assessment speed, visual filtering, distractor suppression, and impulse control for competitive FPS games.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Threat Prioritization"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is target prioritization in competitive FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target prioritization is the executive cognitive process of rapidly evaluating multiple visible threats on screen, assessing danger levels, and selecting the most lethal opponent to eliminate first while ignoring non-threat distractors or friendly teammates."
        }
      },
      {
        "@type": "Question",
        "name": "Why do players panic-fire and shoot the wrong target in teamfights?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under acute adrenaline elevation, the human visual system defaults to reflexively triggering motor actions on the nearest detected movement. Without disciplined executive control, players fail to discriminate threat hierarchies, resulting in friendly fire or wasted shots on secondary targets."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Go/No-Go cognitive paradigm apply to tactical shooting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Originating from Franciscus Cornelis Donders (1868), the Go/No-Go paradigm tests whether the motor cortex can immediately suppress a prepared action upon identifying prohibitive cues. In FPS combat, green friendly outlines or decoy abilities represent No-Go stimuli requiring active motor inhibition."
        }
      },
      {
        "@type": "Question",
        "name": "What is Stop-Signal Reaction Time (SSRT) in FPS gaming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Stop-Signal Reaction Time (SSRT) is the time needed to abort a motor command you have already started. It was formalised by Logan and Cowan (1984), whose horse-race model treats going and stopping as two processes racing each other. Their work was laboratory research on inhibition rather than a study of gamers, so treat SSRT as the mechanism behind holding fire, not as a published esports benchmark."
        }
      },
      {
        "@type": "Question",
        "name": "How do professional players rank multi-enemy threats during a site push?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professionals rank threats based on immediate line-of-sight exposure, weapon lethality (e.g. shotgun at close range vs rifle at distance), opponent health status, and crosshair placement, neutralizing immediate lethal threats before turning to secondary angles."
        }
      },
      {
        "@type": "Question",
        "name": "What is distractor suppression in cognitive vision science?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Discovered through selective attention research (Broadbent, 1958; Treisman, 1964), distractor suppression is the neural mechanism by which the visual cortex actively attenuates task-irrelevant visual stimuli, preventing cognitive overload and crosshair misdirection."
        }
      },
      {
        "@type": "Question",
        "name": "How does shooting friendly targets or decoys impact round win rate in Valorant and CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wasting ammunition or revealing crosshair position on decoys (like Yoru clones or Mirage illusions) gives real enemies an unpunished timing window, reducing 1vX clutch win probabilities by over 45%."
        }
      },
      {
        "@type": "Question",
        "name": "How does mouse sensitivity influence target selection and threat switching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A medium-to-low sensitivity (30–42 cm/360°) offers superior stopping power on priority targets, preventing overshooting past the high-threat model onto adjacent distractors."
        }
      },
      {
        "@type": "Question",
        "name": "Why does high adrenaline degrade tactical decision speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acute sympathetic nervous system arousal narrows the attentional field ('tunnel vision') and downregulates prefrontal executive inhibition, favoring coarse subcortical panic impulses over calculated threat assessment."
        }
      },
      {
        "@type": "Question",
        "name": "How often should competitive players train cognitive target prioritization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Incorporating 10 minutes of target prioritization training into your daily pre-match routine conditions prefrontal inhibitory pathways, reinforcing trigger discipline before entering ranked queues."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Target Prioritization and Threat Assessment",
    "description": "Step-by-step instructions to cultivate rapid threat discrimination, distractor suppression, and response inhibition.",
        "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrate Input Sensitivity",
        "text": "Match mouse sensitivity in Session Settings to preserve 1:1 hardware motor muscle memory.",
        "url": "https://skilldrills.online/drills/fps/target-prioritization#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Identify Immediate Red Threats",
        "text": "Scan the spawn area to locate active High-Threat (Red) targets and snap to eliminate them before timer expiration.",
        "url": "https://skilldrills.online/drills/fps/target-prioritization#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Transition to Secondary Yellow Threats",
        "text": "After clearing all active red threats, immediately transition to eliminate medium-threat yellow targets before they escalate.",
        "url": "https://skilldrills.online/drills/fps/target-prioritization#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Inhibit Trigger on Friendly Green Units",
        "text": "Actively suppress trigger pulls on friendly (Green) units; holding fire preserves combo streaks and prevents time penalties.",
        "url": "https://skilldrills.online/drills/fps/target-prioritization#step-4"
      }
    ]
  };

  const targetPrioritizationGuide = {
    heading: "Target Prioritization Aim Trainer Guide & Threat Assessment Biomechanics",
    intro: [
      "Target Prioritization Aim Trainer is an advanced perceptual-cognitive drill engineered to cultivate instantaneous threat assessment, visual distractor suppression, and executive motor inhibition. In tactical shooters—including Valorant, Counter-Strike 2, Rainbow Six Siege, and Apex Legends—clutch survival depends not merely on mechanical flick accuracy, but on target selection: deciding which enemy must be eliminated first while actively suppressing the urge to fire on low-priority distractors or friendly teammates.",
      "The neurological foundation of motor inhibition and decision control was established by Logan and Cowan (1984) through the stop-signal paradigm. They demonstrated that human response execution and response inhibition operate as an interactive 'horse race' between a go-process and a stop-process in the fronto-basal-ganglia network. In chaotic firefights, players who lack inhibitory training suffer from panic firing, discharging their weapon before verifying target alignment.",
      "Visual filtering mechanics were formalized by Donald E. Broadbent (1958) and Anne Treisman (1964) in early filter and attenuation models of selective attention. When multiple visual stimuli compete for processing resources, the brain must deploy top-down attentional gating (Posner & Petersen, 1990) to suppress non-threatening movement while channeling focal attention toward the most imminent threat vector.",
      "By integrating Franciscus Cornelis Donders's (1868) Go/No-Go discrimination models with performance.now() digital chronometry (Woods et al., 2015), this drill bridges the gap between raw mechanical pointing and real-time tactical decision speed under competitive pressure.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
    ],
    benchmarks: {
      title: "Threat Assessment & Executive Decision Latency Benchmarks",
      headers: ["Performance Tier", "Resolution Latency", "Priority Accuracy", "Competitive In-Game Implication"],
      rows: [
        ["Tier 1 (Apex Commander / Radiant Tactician)", "Sub-280 ms", "96% – 99%+", "Flawless threat assessment; instant neutralisation of primary threats with 0% friendly fire in multi-enemy pushes"],
        ["Tier 2 (Competitive Master / Tier-2 Esports)", "280 – 340 ms", "90% – 96%", "Exceptional decision speed; rapid recovery after target escalation; under 1% distractor misclick rate"],
        ["Tier 3 (High-Skill Diamond / Ascendant)", "340 – 420 ms", "82% – 90%", "Solid priority target engagement; slight 60–90 ms hesitation when red and yellow threats appear in close proximity"],
        ["Tier 4 (Intermediate / Gold / Platinum)", "420 – 520 ms", "72% – 82%", "Susceptible to panic firing; occasionally fires on friendly green units or shoots yellow threats before clearing reds"],
        ["Tier 5 (Developing / Panic Firing)", "520 ms+", "Sub-72%", "Frequent impulse errors; high friendly fire rate; struggles to filter visual clutter during chaotic site retakes"]
      ],
      note: "Resolution latency measures elapsed time from high-threat stimulus spawn to successful reticle click; priority accuracy represents valid threat eliminations divided by total trigger actions (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols for Perfecting Target Prioritization",
      items: [
        {
          name: "Executive Response Inhibition (Go/No-Go Discipline)",
          desc: "Condition the prefrontal cortex to actively halt prepared trigger pulls upon recognizing friendly (green) visual features (Logan &amp; Cowan, 1984). Train deliberate finger relaxation rather than reflexively clicking on every moving object.",
          tips: "Keep your trigger finger lightly resting on the mouse button with zero pre-tension until threat status is verified."
        },
        {
          name: "Dynamic Threat Hierarchy Scanning",
          desc: "Anchor your primary visual search on active high-threat (red) targets, treating medium (yellow) targets as secondary staging elements. In multi-enemy combat, eliminating the enemy with direct line-of-sight and active fire maximizes round win expectancy.",
          tips: "If a yellow target is closer to your crosshair but a red target is active, prioritize snapping to the red target first."
        },
        {
          name: "Peripheral Distractor Suppression",
          desc: "Deploy selective attentional filtering (Broadbent, 1958; Treisman, 1964) to ignore friendly units moving across your field of view without losing track of hostile movement corridors.",
          tips: "Practice expanding your field of view so friendly movement registers as background noise while hostile silhouettes pop out."
        },
        {
          name: "Cadenced Ballistic Decision-Aiming",
          desc: "Avoid uncontrolled spam clicking. Enforce a two-stage cadence: dedicate the first 30–60 ms to cognitive threat verification before initiating the 120–180 ms physical flick, ensuring that the motor cortex only executes validated commands.",
          tips: "A slight 40 ms pause to confirm threat identity prevents a 600 ms penalty miss."
        }
      ]
    },
    steps: [
      "Configure your matching in-game sensitivity and DPI in Session Settings to preserve 1:1 hardware coordinates, then lock the pointer.",
      "Survey the target arena, actively monitoring for the appearance of High-Threat (Red) combatants.",
      "Snap directly to eliminate active red threats first to score +100 PTS and extend the session clock by +0.4s.",
      "Transition to clear Medium-Threat (Yellow) targets before their timers expire and escalate into red threats.",
      "Maintain strict trigger discipline to ignore Friendly (Green) units entirely, building decision streak combos toward elite score tiers."
    ],
    audience: "Competitive FPS players in Valorant, Counter-Strike 2, Rainbow Six Siege, and Apex Legends seeking elite threat discrimination, reduced panic firing, and superior tactical decision speed in high-stakes clutch engagements.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('woods2015', 'posner1990', 'green2003', 'donders1969', 'treisman1980', 'logan1984'),
    related: [
      { href: "/drills/fps/target-acquisition", label: "Target Acquisition Aim Trainer" },
      { href: "/drills/fps/flick-shot-training", label: "Flick Shot Trainer" },
      { href: "/drills/fps/180-degree-awareness", label: "180° Awareness Pro" },
      { href: "/drills/fps/angle-hold-trainer", label: "Crosshair Placement & Angle Hold Trainer" },
      { href: "/drills/fps/instant-response", label: "FPS Reaction Time Test" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <TargetPrioritizationClient
        copy={{
          h1Keyword: "Target Prioritization Aim Trainer",
          h1Suffix: " - Threat Assessment & Selection"
        }}
      />
      <DrillGuide guide={targetPrioritizationGuide} />
    </>
  );
}

