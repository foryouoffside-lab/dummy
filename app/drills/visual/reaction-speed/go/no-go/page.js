import ChromaSyncClient from './ChromaSyncClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — go/no-go (visual-no-go)
// PRIMARY:  "go no go test"                 — Global high-intent neurocognitive term (~1,400 searches/mo)
//           "impulse control test"          — Clinical and behavioral search intent
//           "response inhibition test"      — Neuropsychological standard query
// SECONDARY / LSI:
//           "go no go test online"          — Direct browser search
//           "go no go task"                 — Experimental psychology paradigm
//           "continuous performance test go no go" — CPT clinical variant
//           "sustained attention response task" — SART paradigm (Robertson et al., 1997)
//           "sart test"                     — Acronym search query
//           "trigger discipline drill"      — Tactical FPS gaming query
//           "donders c reaction"            — Mental chronometry origin (Donders, 1868)
//           "motor inhibition test"         — Behavioral motor braking query
//           "stop signal task"              — Horse-race inhibition model (Logan et al., 1984)
//           "executive function go nogo"    — Prefrontal cortex evaluation
// LOCALES:
//           ja: "ゴーノーゴー 課題" (Go No-Go Kadai — Japanese neurocognitive test)
//           ko: "고노고 과제" (Go-No-Go Gwoje — Korean response inhibition task)
//           de: "go no-go test" (German cognitive inhibition test)
// ============================================================

export const metadata = {
  title: "Go/No-Go Test - Free Online Impulse Control Drill",
  description: "Free go/no-go test. Tap the green Go targets, hold back on the red No-Go ones, and measure how well you can stop an action already under way.",
  keywords: [
    "go no go test",
    "go no go test online",
    "impulse control test",
    "response inhibition test",
    "go no go task",
    "response inhibition drill",
    "trigger discipline drill",
    "sustained attention response task",
    "sart test",
    "donders c reaction",
    "motor inhibition test",
    "executive function go nogo",
    "reaction speed test",
    "stop signal task",
    "visual training online"
  ],
  openGraph: {
    title: "Go/No-Go Test - Free Online Impulse Control Drill | SkillDrills",
    description: "Measure prefrontal response inhibition and motor braking latency with this free online Go/No-Go impulse control drill.",
    type: "website",
    url: "https://skilldrills.online/drills/visual/reaction-speed/go/no-go",
    siteName: "SkillDrills",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Go/No-Go Test - Free Online Impulse Control Drill | SkillDrills",
    description: "Train impulse control, trigger discipline, and response inhibition online. Free browser-based Go/No-Go drill.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/reaction-speed/go/no-go",
    languages: getAlternateLanguages('/drills/visual/reaction-speed/go/no-go'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Drills Hub", "item": "https://skilldrills.online/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "Go/No-Go Impulse Control Test", "item": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Go/No-Go Impulse Control Test",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Interactive neurocognitive Go/No-Go response inhibition test measuring behavioral motor braking latency, commission error rates, and trigger discipline.",
  "featureList": [
    "Millisecond reaction chronometry via the performance.now() API",
    "Dynamic difficulty scaling with progressively tightening stimulus windows",
    "Commission error (false alarm) and omission error tracking",
    "Strict client-side local performance storage with zero telemetry"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Go/No-Go Impulse Control Test — Online Response Inhibition Drill | SkillDrills",
  "alternateName": "Go/No-Go Pro",
  "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go",
  "dateModified": "2026-09-05",
  "description": "Free online Go/No-Go impulse control test. React instantly to green Go targets while actively suppressing motor taps when red No-Go triggers appear.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with HTML5 Canvas support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Response Inhibition, Cognitive Behavioral Braking, Impulse Control, Motor Suppression Latency, Trigger Discipline"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Go/No-Go Impulse Control Test",
  "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go",
  "description": "Free online Go/No-Go impulse control test. React instantly to green Go targets while actively suppressing motor taps when red No-Go triggers appear.",
  "genre": ["Action", "Brain Game", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Take the Go/No-Go Impulse Control Test",
  "dateModified": "2026-09-05",
  "description": "Step-by-step instructions to test and train motor response inhibition and impulse suppression using the Go/No-Go protocol.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Anchor Visual Gaze on the Center Target Reticle",
      "text": "Position your eyes at the center of the display canvas where target stimuli appear, maintaining a relaxed yet vigilant visual posture.",
      "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Execute Rapid Motor Response on Green GO Targets",
      "text": "Click the canvas or press the Spacebar as fast as possible whenever the emerald green GO stimulus flashes (+150 PTS × Combo).",
      "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Actively Suppress Motor Firing on Red NO-GO Targets",
      "text": "Withhold your finger and refrain from tapping whenever the crimson red NO-GO stimulus appears (+100 PTS on successful restraint).",
      "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintain Trigger Discipline Under Accelerating Speeds",
      "text": "As your streak climbs, display presentation windows compress down to 100 ms, testing peak prefrontal hyperdirect motor braking.",
      "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go#step-4"
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
      "name": "What is the Go/No-Go test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Go/No-Go test is a classic experimental neurocognitive task designed to evaluate motor response inhibition, selective attention, and impulse control. Participants must execute a rapid motor response (such as a keypress or click) upon perceiving frequent 'Go' stimuli while actively withholding any motor response when rare or alternating 'No-Go' stimuli appear."
      }
    },
    {
      "@type": "Question",
      "name": "What cognitive functions does the Go/No-Go test measure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Go/No-Go task primarily measures executive function and response inhibition, specifically mediated by the right inferior frontal cortex (rIFC), presupplementary motor area (preSMA), and subthalamic nucleus (STN). It quantifies your ability to suppress a prepotent (automatic) motor impulse after sensory detection."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a commission error and an omission error?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A commission error (false alarm) occurs when you click on a red 'No-Go' target, indicating a failure of impulse suppression or motor inhibition. An omission error occurs when you fail to click on a green 'Go' target within the presentation window, indicating a lapse in sustained vigilance or processing delay."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Horse-Race Model of response inhibition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Formalized by Gordon Logan and colleagues (1984), the Horse-Race Model posits that response inhibition is a race between two independent neurological processes: a 'Go process' (driving motor execution toward threshold) and a 'Stop process' (driving prefrontal motor braking). If the Go process crosses threshold first, a commission error occurs; if the Stop process finishes first, the action is successfully inhibited."
      }
    },
    {
      "@type": "Question",
      "name": "What is considered a normal score or error rate on the Go/No-Go task?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Healthy young adults typically achieve commission error rates between 5% and 10% on standard Go/No-Go tasks with moderate stimulus windows. Elite tactical gamers, martial artists, and trained athletes frequently achieve commission error rates below 3% while maintaining rapid Go reaction latencies under 280 ms."
      }
    },
    {
      "@type": "Question",
      "name": "How do FPS gamers and tactical athletes benefit from Go/No-Go training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In first-person tactical shooters (such as Counter-Strike 2, Valorant, and Rainbow Six Siege), trigger discipline is vital. Firing prematurely at utility flashes, teammates cross-peeking, or decaying smokes exposes player positions and costs rounds. Go/No-Go drills train the brain to decouple visual stimulus detection from reflexive finger contraction."
      }
    },
    {
      "@type": "Question",
      "name": "Why do I instinctively click on red No-Go signals even when I know they are red?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This phenomenon is driven by 'prepotent motor priming.' When the nervous system is primed for high-speed tapping on frequent Go targets, motor cortical excitability spikes. Visual motion and luminance changes register in the visual pathway before chromatic identity (color) is fully resolved, causing the motor cortex to fire ballistically before the frontal cortex can abort the command."
      }
    },
    {
      "@type": "Question",
      "name": "Can response inhibition and impulse control be improved with training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Neuroplasticity research demonstrates that consistent, targeted response inhibition training strengthens functional connectivity within fronto-basal ganglia pathways. Regular practice reduces premature motor releases and tightens the stop-signal reaction time (SSRT), improving self-regulation and trigger discipline in real-world tasks."
      }
    },
    {
      "@type": "Question",
      "name": "How does monitor refresh rate and input lag affect Go/No-Go scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Display refresh rates introduce temporal quantization delays. A standard 60 Hz display adds up to 16.7 ms of frame latency, whereas a 144 Hz display reduces this to 6.9 ms, and a 240 Hz display to 4.1 ms. Combined with a 1,000 Hz gaming mouse (~1 ms polling), high-refresh setups give the visual cortex earlier chromatic confirmation, significantly reducing commission errors."
      }
    },
    {
      "@type": "Question",
      "name": "Is this Go/No-Go test free, and is my data private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Go/No-Go Impulse Control Test on SkillDrills is 100% free with no account creation, paywalls, or third-party ads. All scoring data, combo counts, and accuracy statistics are stored entirely in your web browser's local storage and are never transmitted to external servers."
      }
    }
  ]
};

const goNoGoGuide = {
  heading: "Neurocognitive Response Inhibition & Motor Suppression Standards",
  intro: [
    "Response inhibition represents the cornerstone executive faculty that allows humans to actively cancel, delay, or withhold actions that are no longer appropriate or advantageous. In tactical combat sports, competitive gaming, high-speed driving, and everyday decision-making, the ability to rapidly suppress a prepotent, reflexive motor action is often far more critical than raw movement velocity.",
    "The Go/No-Go paradigm traces its psychophysical origins to Franciscus Cornelis Donders (1868), who introduced the seminal 'C-reaction' subtraction method in mental chronometry. Donders demonstrated that presenting two distinct stimuli while instructing participants to respond to only one requires an additional layer of cognitive discrimination and selective motor withholding compared to simple reaction time.",
    "In 1984, Gordon D. Logan and colleagues formulated the 'Horse-Race Model' of response inhibition, demonstrating that behavioral restraint reflects an active computational contest between a sensory Go process and an inhibitory Stop process. Contemporary functional neuroimaging (Aron et al., 2014) confirms that this inhibitory brake is executed via a dedicated hyperdirect pathway connecting the right inferior frontal cortex (rIFC), presupplementary motor area, and subthalamic nucleus (STN).",
    "Timing & Measurement Methodology: All stimulus presentations and motor click events are captured client-side using the high-resolution performance.now() API. Hardware latency adds display frame quantization (~16.7 ms at 60 Hz, ~6.9 ms at 144 Hz, ~4.1 ms at 240 Hz) and input polling intervals (~8 ms at 125 Hz vs ~1 ms at 1,000 Hz), as documented by Woods et al. (2015). All scores and error tracking remain strictly confined to your local browser storage with zero telemetry."
  ],
  benchmarks: {
    title: "Response inhibition bands (editorial guide)",
    headers: ["Performance Band", "Commission Error Rate (CER)", "Score & Combo Threshold", "Neuromuscular & Executive Profile"],
    rows: [
      ["Tier 1: Apex Executive Braking", "< 2.0% CER", "Score: 16,000+ | Combo 30x+", "Elite rIFC-STN hyperdirect motor suppression; complete decoupling of sensory onset from reflexive motor firing."],
      ["Tier 2: Superior Response Inhibition", "2.0% – 4.9% CER", "Score: 11,000 – 15,999 | Combo 20x+", "High-tier trigger discipline; rapid recovery from chromatic switches with minimal anticipation drift."],
      ["Tier 3: Solid Baseline Inhibition", "5.0% – 9.9% CER", "Score: 6,500 – 10,999 | Combo 12x+", "Healthy adult baseline; reliable Go target execution with occasional false alarm slips under high-frequency pacing."],
      ["Tier 4: Moderate Impulsivity", "10.0% – 18.0% CER", "Score: 3,000 – 6,499 | Combo 6x+", "Elevated prepotent motor priming; tendency to initiate finger flexion on visual onset before color identity verification."],
      ["Tier 5: High Prepotent Priming", "> 18.0% CER", "Score: < 3,000 | Combo < 6x", "Substantial behavioral impulsivity; inability to arrest ballistic motor releases when red No-Go triggers flash."]
    ],
    note: "These tiers represent an editorial reference benchmark grounded in classical mental chronometry and response inhibition literature (Donders, 1868; Logan et al., 1984; Robertson et al., 1997; Aron et al., 2014). Individual scores fluctuate with circadian arousal, stimulant intake, ocular fatigue, and hardware input polling."
  },
  techniques: {
    title: "How to train response inhibition",
    items: [
      {
        name: "Chromatic Discrimination Prior to Motor Priming",
        desc: "As established by Donders (1868) in C-reaction chronometry, luminance and motion transients reach the primary visual cortex before parvocellular color pathways fully resolve chromatic identity in visual area V4.",
        tips: "Do not trigger muscle contraction upon the initial luminance shift; train your motor cortex to delay release until emerald green hue verification is completed."
      },
      {
        name: "The Horse-Race Inhibition Reset",
        desc: "According to the Horse-Race Model (Logan et al., 1984), if the inhibitory Stop process is initiated before the Go motor activation reaches action potential threshold, the motor spike is canceled in the spinal cord.",
        tips: "Maintain a light, neutral finger hover above the mouse or screen. Relax the forearm flexor muscles so the inhibitory brake encounters zero mechanical resistance."
      },
      {
        name: "Combating Mindless Autopilot Automaticity",
        desc: "Robertson et al. (1997) demonstrated that repetitive Go stimuli induce an automatic rhythmic tapping cadence, drastically elevating commission errors when unexpected No-Go stimuli appear.",
        tips: "Treat every single trial as a distinct, novel visual event rather than entering a rhythmic tapping cadence. Actively attend to the central reticle between flashes."
      },
      {
        name: "Hardware Latency & High-Refresh Calibration",
        desc: "At tight stimulus presentation windows down to 160 ms, a 60 Hz monitor adds up to 16.7 ms of display lag, eating into precious motor cancellation time (Woods et al., 2015).",
        tips: "Use a high-refresh monitor (144 Hz or 240 Hz) and ensure your mouse is set to a 1,000 Hz USB polling rate to minimize hardware delay and debounce lag."
      }
    ]
  },
  steps: [
    "Click Start Drill to initialize the 45-second Go/No-Go session.",
    "Fixate your eyes on the center target reticle where stimulus disks appear.",
    "Click or tap instantly when the emerald green GO stimulus appears to score points and extend the clock.",
    "Withhold your click and remain stationary when the crimson red NO-GO stimulus appears to bank restraint points.",
    "Review your final accuracy, commission errors, peak combo, and performance grade upon round completion."
  ],
  audience: "Tactical FPS gamers (Valorant, CS2, Siege) refining trigger discipline, high-speed drivers, competitive athletes, martial artists, and individuals seeking executive function and impulse control training.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'logan1984', 'robertson1997', 'aron2014', 'woods2015'),
  related: [
    { href: "/drills/visual/reaction-speed/light-reaction", label: "Light Reaction Test" },
    { href: "/drills/visual/depth-perception/distance-judgment", label: "Distance Judgment Depth Test" },
    { href: "/drills/visual/tracking-accuracy/moving-target", label: "Moving Target Intercept" },
    { href: "/drills/visual/tracking-accuracy/multiple-targets", label: "Multiple Object Tracking" },
    { href: "/drills/visual/tracking-accuracy/pursuit-tracker", label: "Smooth Pursuit Tracker" },
    { href: "/drills/visual/visual-recognition/entropic-grid", label: "Entropic Grid Search" }
  ]
};

export default function ChromaSyncPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <ChromaSyncClient copy={{ title: "Go/No-Go Impulse Control Test" }} />
      <DrillGuide guide={goNoGoGuide} />
    </>
  );
}
