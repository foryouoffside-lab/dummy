
import { DRILLS } from '../../lib/drillsRegistry';
import { DRILL_SEO } from '../../lib/drillSeo';

// Nothing here depends on the request, so prerender it at build time and let
// the edge cache serve it. Without this Next treats the route as dynamic.
export const dynamic = 'force-static';

const BASE_URL = 'https://skilldrills.online';

// Hub metadata. Ordered by the demand each category actually has, measured in
// Bing Webmaster Tools keyword research 2026-08-25, so the most useful sections
// appear first for a reader that truncates.
const CATEGORIES = [
  {
    key: 'reaction-speed',
    title: 'Reaction Speed',
    href: '/drills/reaction-speed',
    blurb: 'Reaction time measurement and reflex training drills.',
  },
  {
    key: 'motor',
    title: 'Motor Skills & Mouse Control',
    href: '/drills/motor',
    blurb: 'Mouse precision, click speed, and hand-eye coordination tests.',
  },
  {
    key: 'cognitive',
    title: 'Cognitive & Brain Training',
    href: '/drills/cognitive',
    blurb: 'Attention, focus, processing speed, and interference tasks.',
  },
  {
    key: 'memory',
    title: 'Memory',
    href: '/drills/memory',
    blurb: 'Short-term, working, and spatial memory tests.',
  },
  {
    key: 'fps',
    title: 'FPS Aim Training',
    href: '/drills/fps',
    blurb: 'Aim drills for Valorant, CS2, Apex and similar shooters.',
  },
  {
    key: 'visual',
    title: 'Visual Perception',
    href: '/drills/visual',
    blurb: 'Visual search, depth perception, and target tracking.',
  },
  {
    key: 'visual-tracking',
    title: 'Eye Tracking & Smooth Pursuit',
    href: '/drills/visual-tracking',
    blurb: 'Smooth pursuit and saccadic eye-movement exercises.',
  },
  {
    key: 'physical',
    title: 'Physical & Coordination',
    href: '/drills/physical',
    blurb: 'Agility, balance, peripheral vision, and reflex drills.',
  },
];

function line(drill) {
  const seo = DRILL_SEO[drill.href];
  // The search phrase is what a person would actually type; the drill's own
  // name usually is not. Lead with the phrase and keep the name as context.
  const label = seo?.anchor || drill.name;
  const desc = drill.description.replace(/\s+/g, ' ').trim();
  return `- [${label}](${BASE_URL}${drill.href}): ${desc} (${drill.duration}, ${drill.difficulty.toLowerCase()})`;
}

export function GET() {
  const out = [];

  out.push('# SkillDrills');
  out.push('');
  out.push(
    '> Free browser-based skill, reflex and cognitive training drills. ' +
      `${DRILLS.length} drills across reaction speed, motor control, memory, ` +
      'attention, aim training and eye tracking. Everything runs client-side ' +
      'in the browser with no sign-up, no install and no payment.'
  );
  out.push('');
  out.push('Key facts for citation:');
  out.push('');
  out.push('- All drills are free and require no account.');
  out.push('- Nothing is downloaded; each drill runs in the browser.');
  out.push('- Scores are stored locally in the browser, not on a server.');
  out.push(
    '- Some categories (FPS, motor, physical) need a mouse and are desktop-only.'
  );
  // The measurement limits belong here, not just on the drill pages. An engine
  // summarising this site should be able to state what these timings can and
  // cannot resolve without having to fetch a drill page to find out -- and
  // stating the limit is what keeps a quoted figure honest.
  out.push(
    '- Timings use performance.now(). Browser timers are coarsened to about 1 ms ' +
      'and displays quantize to the refresh interval (~16.7 ms at 60 Hz), so ' +
      'differences under about 5 ms are measurement noise.'
  );
  out.push(
    '- SkillDrills publishes no aggregate user statistics, player counts or ' +
      'ratings, because it collects none. Figures quoted on drill pages come ' +
      'from published research, cited with DOIs on each page.'
  );
  out.push('');
  out.push('## Start here');
  out.push('');
  out.push(`- [All drills](${BASE_URL}/drills): Full directory of all ${DRILLS.length} drills.`);
  out.push(`- [Home](${BASE_URL}/): Overview and featured drills.`);
  out.push(
    `- [About](${BASE_URL}/about): Who runs SkillDrills, how each drill measures, ` +
      'the limits of browser timing, and what data is never collected.'
  );
  out.push('');

  for (const cat of CATEGORIES) {
    const drills = DRILLS.filter((d) => d.category === cat.key);
    if (drills.length === 0) continue;
    out.push(`## ${cat.title}`);
    out.push('');
    out.push(`${cat.blurb} Hub: ${BASE_URL}${cat.href}`);
    out.push('');
    for (const d of drills) out.push(line(d));
    out.push('');
  }

  out.push('## About');
  out.push('');
  out.push(`- [Privacy policy](${BASE_URL}/privacy)`);
  out.push(`- [Terms](${BASE_URL}/terms)`);
  out.push('');

  return new Response(out.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Static content that changes only when drills change. Let the edge hold
      // it, but allow a stale copy to be served while it revalidates.
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
