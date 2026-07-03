import PrioritySortingClient from './PrioritySortingClient';

// ============================================================
// SEO RESEARCH FINDINGS — priority-sorting
// PRIMARY:  "decision making game online"   ~5,400/mo, KD ~25%
// SECONDARY:"task prioritization training"  ~1,600/mo, KD ~18%
//           "prioritization skills test"    ~880/mo,   KD ~15%
//           "executive function games"      ~1,900/mo, KD ~22%
//           "speed sorting game"            ~720/mo,   KD ~14%
// LONG-TAIL:"how to prioritize tasks quickly" ~3,600/mo
//           "triage decision game online"   ~390/mo
//           "priority sorting brain game"   ~210/mo
// INTENT:   Training / Productivity / Educational
// COMPETITORS: Lumosity, BrainHQ, leadership training sites
// ============================================================

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "Problem Solving", "item": "https://skilldrills.online/drills/cognitive" },
    { "@type": "ListItem", "position": 4, "name": "Priority Sorting", "item": "https://skilldrills.online/drills/cognitive/problem-solving/priority-sorting" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Priority Sorting Game – Task Triage & Decision Speed Drill",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online priority sorting and triage decision game. Sort tasks by priority, practice rapid rule-based decision making, and train executive function for faster real-world prioritization. No sign-up.",
  "genre": "Cognitive Brain Training / Decision Making / Executive Function",
  "url": "https://skilldrills.online/drills/cognitive/problem-solving/priority-sorting",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "934" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is priority sorting in brain training?",
      "acceptedAnswer": { "@type": "Answer", "text": "Priority sorting is a cognitive exercise where you rapidly categorize or sort incoming stimuli based on a hierarchy of importance or urgency rules. It trains the executive function skill of fast rule-based decision making — critical for any real-world situation where you must quickly determine what to handle first when multiple demands arrive simultaneously." }
    },
    {
      "@type": "Question",
      "name": "How can I improve my prioritization skills?",
      "acceptedAnswer": { "@type": "Answer", "text": "Effective prioritization training includes: (1) Using decision frameworks like Eisenhower Matrix (urgent/important), ABC analysis, or MoSCoW prioritization under time pressure, (2) Practicing rule-based sorting games that simulate triage scenarios, (3) Deliberate practice with rapidly shifting priority criteria, and (4) Post-session review of decisions to identify patterns in prioritization errors." }
    },
    {
      "@type": "Question",
      "name": "What is cognitive triage and why is it important?",
      "acceptedAnswer": { "@type": "Answer", "text": "Cognitive triage is the mental process of rapidly assessing multiple competing demands and sorting them by priority order — deciding what requires immediate attention versus what can wait. It is used by emergency room physicians, military commanders, air traffic controllers, and project managers. High-speed accurate triage under cognitive load is a trainable executive skill." }
    },
    {
      "@type": "Question",
      "name": "How does this priority sorting game train executive function?",
      "acceptedAnswer": { "@type": "Answer", "text": "The game requires simultaneous activation of three executive functions: (1) Working memory — holding active priority rules in mind while processing new stimuli, (2) Cognitive flexibility — adapting when rules shift mid-game, (3) Inhibitory control — suppressing automatic responses to sort items by intrinsic properties rather than following the current priority rules." }
    },
    {
      "@type": "Question",
      "name": "What is the Eisenhower Matrix for task prioritization?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Eisenhower Matrix (also known as the Urgent-Important Matrix) is a decision framework for prioritizing tasks. It categorizes tasks into four quadrants: Do First (urgent + important), Schedule (not urgent + important), Delegate (urgent + not important), and Eliminate (not urgent + not important). This mental model forms the psychological basis for real-world priority sorting under time pressure." }
    },
    {
      "@type": "Question",
      "name": "Why is decision-making speed important in cognitive performance?",
      "acceptedAnswer": { "@type": "Answer", "text": "Decision latency — the time between stimulus presentation and response — determines throughput in any fast-paced environment. In trading, surgery, emergency response, and competitive gaming, faster and more accurate decisions directly translate to better outcomes. Cognitive training that compresses decision latency while maintaining accuracy is extremely high-value for professionals in these fields." }
    },
    {
      "@type": "Question",
      "name": "How does rule-switching difficulty affect performance in sorting tasks?",
      "acceptedAnswer": { "@type": "Answer", "text": "When sorting rules switch mid-task (e.g., 'now sort by urgency instead of importance'), your brain must flush the old ruleset from working memory and load the new one — incurring a switch cost in both time and accuracy. The magnitude of this penalty reflects your set-shifting capacity. The Priority Sorting drill trains precisely this rule-adaptation process." }
    },
    {
      "@type": "Question",
      "name": "What professions benefit most from priority sorting training?",
      "acceptedAnswer": { "@type": "Answer", "text": "Emergency room nurses and physicians (patient triage), air traffic controllers (aircraft prioritization), military commanders (threat assessment), project managers (backlog prioritization), customer service managers (ticket routing), software engineers (bug triaging), and crisis managers all directly benefit from fast and accurate priority sorting under cognitive load." }
    },
    {
      "@type": "Question",
      "name": "Can sorting games help with time management?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Sorting games train the same mental process you use when looking at a full to-do list and deciding what to tackle first. By exercising rapid priority evaluation under time constraints, you build faster, more consistent real-world prioritization habits — which translates to better time allocation, fewer missed deadlines, and reduced decision fatigue across the day." }
    },
    {
      "@type": "Question",
      "name": "Is this priority sorting game free to play?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Priority Sorting drill on SkillDrills is completely free. No sign-up, downloads, or subscriptions required. It runs directly in your web browser on both desktop and mobile devices." }
    }
  ]
};

export const metadata = {
  title: "Priority Sorting Game – Free Task Triage & Decision Speed Drill | SkillDrills",
  description: "Train decision-making speed and task prioritization online. Free rule-based priority sorting game to improve executive function and triage skills. No sign-up required.",
  keywords: [
    "decision making game online",
    "task prioritization training",
    "prioritization skills test",
    "executive function games",
    "speed sorting game",
    "how to prioritize tasks quickly",
    "triage decision game",
    "priority sorting brain game",
    "priority decision training",
    "rule based sorting game",
    "cognitive triage training",
    "fast decision making exercise"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/problem-solving/priority-sorting",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Priority Sorting Game – Free Task Triage & Decision Speed Drill | SkillDrills",
    description: "Train decision-making speed and task prioritization online. Free rule-based priority sorting game to improve executive function and triage skills. No sign-up required.",
    url: "https://skilldrills.online/drills/cognitive/problem-solving/priority-sorting",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Priority Sorting Game – Task Triage & Decision Speed Drill" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Priority Sorting Game – Free Task Triage & Decision Speed Drill | SkillDrills",
    description: "Train decision-making speed and task prioritization online. Free rule-based priority sorting game to improve executive function and triage skills. No sign-up required.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function PrioritySortingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PrioritySortingClient />
    </>
  );
}
