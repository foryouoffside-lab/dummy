import Link from 'next/link';

/**
 * Server-rendered long-form guide that sits under a drill's interactive client.
 *
 * Why this exists: every drill's instructions, About copy and FAQ used to live
 * inside collapsed <DrillAccordion> bodies in a 'use client' component. The
 * accordion now keeps its children in the DOM, but the visual-tracking drills
 * still only carried ~150 words of drill-specific prose each, which left the 15
 * pages at 0.77 mean pairwise text similarity -- near-duplicates, and all 15
 * were sitting at "Discovered - currently not indexed" in Search Console.
 *
 * This block is a plain server component so the text is in the initial HTML with
 * no hydration involved, and it is keyed off per-drill content so each page
 * carries several hundred words that exist nowhere else on the site.
 */
export default function DrillGuide({ guide }) {
  if (!guide) return null;
  const { heading, intro, steps, audience, faqs, related } = guide;

  return (
    <section className="max-w-6xl w-full mx-auto px-4 pb-12 font-sans">
      <div className="border border-gray-800 bg-black rounded-2xl px-6 py-7 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight mb-3">{heading}</h2>
          {intro.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-gray-300 mb-3 last:mb-0">{p}</p>
          ))}
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-3">How to train with this drill</h3>
          <ol className="space-y-2.5">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                <span className="shrink-0 w-6 h-6 rounded-md bg-white/[0.06] border border-gray-800 text-xs font-bold text-white flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2">Who this drill is for</h3>
          <p className="text-sm leading-relaxed text-gray-300">{audience}</p>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-3">Common questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                <h4 className="text-sm font-bold text-white mb-1.5">{f.q}</h4>
                <p className="text-xs leading-relaxed text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {related?.length ? (
          <div>
            <h3 className="text-base font-bold text-white mb-3">Train the next skill</h3>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="text-xs font-semibold text-gray-300 hover:text-white border border-gray-800 hover:border-gray-600 rounded-lg px-3 py-2 transition-colors"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
