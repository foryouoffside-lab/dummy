import Link from 'next/link';
import { DRILLS } from '@/lib/drillsRegistry';

// WHY THIS PAGE EXISTS
// Both Google's quality guidance and every current answer engine weight who is
// making a claim, not just the claim. This site was an anonymous domain with no
// About page and no contact route, which caps how often it gets cited no matter
// how good the drill pages are.
//
// The honest version of "who we are" here is short, and that is fine. What this
// page can do well is the part most tool sites skip: state exactly how a
// measurement is taken, what it cannot control, and what is never collected.
// Method transparency is a genuine trust signal and it costs nothing but candour.
//
// NOTHING ON THIS PAGE MAY BE EMBELLISHED. No team size, no credentials, no user
// counts, no ratings -- the site collects no aggregate data and has no such
// figures. If a byline is ever added it must be a real person who consents to it.

const CONTACT_EMAIL = 'support@skilldrills.online';
const LAST_UPDATED = 'September 5, 2026';
const DRILL_COUNT = DRILLS.length;

export const metadata = {
  title: 'About SkillDrills - How These Drills Measure',
  description:
    'SkillDrills is a free, independent browser training site. Read how each drill measures reaction time, what browser timers can and cannot resolve, and what data is never collected.',
  alternates: { canonical: 'https://skilldrills.online/about' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'About SkillDrills - How These Drills Measure',
    description:
      'How SkillDrills measures reaction time and eye movement in the browser, the limits of those measurements, and why no score ever leaves your device.',
    url: 'https://skilldrills.online/about',
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About SkillDrills',
  url: 'https://skilldrills.online/about',
  dateModified: '2026-09-05',
  description:
    'How SkillDrills measures reaction time and eye movement in the browser, the limits of those measurements, and what data is never collected.',
  mainEntity: {
    '@type': 'Organization',
    name: 'SkillDrills',
    url: 'https://skilldrills.online',
    logo: 'https://skilldrills.online/icons/icon-512x512.png',
    email: CONTACT_EMAIL,
    foundingDate: '2026',
    description: `A free, independent browser-based training site with ${DRILL_COUNT} drills for reaction speed, aim, memory, focus and motor control. No accounts, no downloads, no score collection.`,
    areaServed: { '@type': 'World', name: 'Worldwide' },
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      contactType: 'customer support',
      availableLanguage: ['English'],
    },
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://skilldrills.online' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://skilldrills.online/about' },
  ],
};

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-[15px] font-bold text-white mb-2.5">{title}</h2>
      <div className="text-[13px] text-slate-400 leading-relaxed space-y-2.5">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div
        className="min-h-[100dvh] bg-[#050508] text-slate-100 px-5 pb-16"
        style={{ paddingTop: 'calc(24px + env(safe-area-inset-top))' }}
      >
        <div className="max-w-[640px] mx-auto">
          <Link href="/" className="text-[12px] text-violet-400 font-semibold">
            &larr; Back to SkillDrills
          </Link>

          <h1 className="text-[26px] font-black text-white mt-5 mb-1">About SkillDrills</h1>
          <p className="text-[12px] text-slate-500 mb-6">Last updated: {LAST_UPDATED}</p>

          {/* The extractable answer, first, standalone. */}
          <p className="text-[13px] text-slate-300 leading-relaxed mb-8">
            SkillDrills is a free, independent training site with {DRILL_COUNT} browser drills for
            reaction speed, aim, visual tracking, memory, focus and motor control. Everything runs
            in the browser with no account, no download and no payment, and no score you record is
            ever sent anywhere.
          </p>

          <Section title="Who makes this">
            <p>
              SkillDrills is an independently built and self-funded project. It is not affiliated
              with, endorsed by, or connected to any game publisher, esports organisation, clinic or
              university, and nothing here is a commercial product for any third party.
            </p>
            <p>
              You can reach the person who maintains it at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-violet-400 hover:text-violet-300 underline decoration-violet-400/40 underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              . Corrections to anything factual on this site are genuinely welcome &mdash; if a
              figure or a citation here is wrong, say so and it will be fixed or removed.
            </p>
          </Section>

          <Section title="How the drills measure">
            <p>
              Every drill records events using the browser&apos;s{' '}
              <code className="text-slate-300 font-mono text-[12px]">performance.now()</code>{' '}
              high-resolution clock, entirely on your own device. Rendering runs on a canvas driven
              by <code className="text-slate-300 font-mono text-[12px]">requestAnimationFrame</code>,
              so the drill is paced by your display rather than by a fixed timer.
            </p>
            <p>
              What that measurement contains is you <em>plus your hardware</em>. It is not a
              laboratory instrument, and three things it cannot separate out are worth knowing
              before you read anything into a score:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-slate-600">
              <li>
                <span className="text-slate-300">Timer resolution.</span> Browsers deliberately
                coarsen high-resolution timers as a Spectre-era side-channel mitigation &mdash;
                typically to around 1&nbsp;ms.
              </li>
              <li>
                <span className="text-slate-300">Display quantization.</span> A stimulus cannot
                appear between frames. That is about 16.7&nbsp;ms per frame at 60&nbsp;Hz,
                6.9&nbsp;ms at 144&nbsp;Hz and 4.1&nbsp;ms at 240&nbsp;Hz.
              </li>
              <li>
                <span className="text-slate-300">Input polling.</span> A mouse polling at
                125&nbsp;Hz reports a click up to about 8&nbsp;ms late; at 1000&nbsp;Hz, about
                1&nbsp;ms.
              </li>
            </ul>
            <p>
              Taken together, that means a drill here resolves real differences of roughly
              5&nbsp;ms and upward. Treat anything finer as measurement noise, and compare your own
              runs on the same machine rather than your number against someone else&apos;s on
              different hardware. Any site claiming sub-millisecond precision from a web browser is
              overstating what the platform can do.
            </p>
          </Section>

          <Section title="What is never collected">
            <p>
              Scores, personal bests and settings are written to your browser&apos;s local storage
              and stay there. They are not uploaded, not pooled, and not visible to anyone but you
              &mdash; clearing your browser data deletes them permanently.
            </p>
            <p>
              Because of that, this site has no aggregate performance statistics and will never
              publish any. You will not find &ldquo;average user scores X&rdquo;, player counts,
              star ratings or testimonials here, because there is no honest way to produce them.
              The benchmark tables on drill pages are labelled as editorial guides drawn from
              published literature, not as norms measured from visitors.
            </p>
            <p>
              See the{' '}
              <Link href="/privacy" className="text-violet-400 hover:text-violet-300 underline decoration-violet-400/40 underline-offset-2">
                privacy policy
              </Link>{' '}
              for the full detail.
            </p>
          </Section>

          <Section title="Where the numbers come from">
            <p>
              Reaction time, saccadic eye movement, smooth pursuit and choice reaction are
              genuinely researched subjects, so the figures quoted across this site are taken from
              published work and cited by name with a DOI in the References panel on each drill
              page. Nothing is attributed to this site&apos;s own users, and no statistic, study or
              quotation is invented to make a page look more authoritative.
            </p>
            <p>
              If a citation here does not say what the page claims it says, that is a bug. Report
              it to{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-violet-400 hover:text-violet-300 underline decoration-violet-400/40 underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              and it will be corrected.
            </p>
          </Section>

          <Section title="Not medical or diagnostic">
            <p>
              These drills are training and entertainment tools. They are not a medical device, not
              a clinical assessment, and not a diagnostic test for any condition. Nothing here
              diagnoses, treats, prevents or screens for anything, and a score should never be used
              to reason about your health. If you are concerned about your vision, reaction speed
              or cognition, talk to a qualified clinician.
            </p>
          </Section>

          <Section title="Start training">
            <p>
              All {DRILL_COUNT} drills are free and open at{' '}
              <Link href="/drills" className="text-violet-400 hover:text-violet-300 underline decoration-violet-400/40 underline-offset-2">
                the drill directory
              </Link>
              . The most-used starting points are the{' '}
              <Link href="/drills/reaction-speed/reaction-time-test" className="text-violet-400 hover:text-violet-300 underline decoration-violet-400/40 underline-offset-2">
                reaction time test
              </Link>{' '}
              and the{' '}
              <Link href="/drills/reaction-speed" className="text-violet-400 hover:text-violet-300 underline decoration-violet-400/40 underline-offset-2">
                reaction speed drills
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </>
  );
}
