import Link from 'next/link';

/**
 * DrillGuide — Server-rendered long-form authoritative guide & benchmark table.
 *
 * Sits directly below the interactive drill canvas in server HTML.
 * Solves the "interactive gaming thin content" problem:
 * Search crawlers (Googlebot, Bingbot, Perplexity) see hundreds of words of
 * structured data, benchmark ranking tables, E-E-A-T scientific context, and FAQs
 * without slowing down or disrupting the interactive drill experience.
 */
export default function DrillGuide({ guide }) {
  if (!guide) return null;
  const { heading, intro, benchmarks, techniques, steps, audience, faqs, related } = guide;

  return (
    <section className="max-w-6xl w-full mx-auto px-4 pb-12 font-sans text-slate-300">
      <div className="border border-white/10 bg-neutral-950/80 backdrop-blur-md rounded-2xl px-6 py-8 space-y-8 shadow-2xl">
        {/* Intro */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">{heading}</h2>
          {intro && intro.map((p, i) => (
            <p key={i} className="text-sm sm:text-base leading-relaxed text-slate-300 mb-3 last:mb-0">{p}</p>
          ))}
        </div>

        {/* Benchmarks Table (Critical for Google AI Overviews and Rich Snippets) */}
        {benchmarks && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
              📊 {benchmarks.title || 'Performance Benchmarks & Ranking Tiers'}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-white/5 text-white font-bold border-b border-white/10 uppercase tracking-wider text-[11px]">
                  <tr>
                    {benchmarks.headers.map((h, i) => (
                      <th key={i} className="px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {benchmarks.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      {row.map((cell, j) => (
                        <td key={j} className={`px-4 py-2.5 ${j === 0 ? 'font-bold text-white' : 'text-slate-300'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {benchmarks.note && (
              <p className="text-xs text-slate-400 mt-2 italic">{benchmarks.note}</p>
            )}
          </div>
        )}

        {/* Techniques / Methodology Comparison */}
        {techniques && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-3">
              ⚡ {techniques.title || 'Techniques & Execution Protocols'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techniques.items.map((tech, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h4 className="text-sm font-bold text-white mb-1.5">{tech.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">{tech.desc}</p>
                  {tech.tips && (
                    <span className="text-[11px] font-semibold text-emerald-400 block">
                      💡 Pro Tip: {tech.tips}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        {steps && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-3">🎯 How to train with this drill</h3>
            <ol className="space-y-2.5">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <span className="shrink-0 w-6 h-6 rounded-md bg-white/[0.06] border border-white/10 text-xs font-bold text-white flex items-center justify-center font-mono">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Audience */}
        {audience && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">👥 Who this drill is for</h3>
            <p className="text-sm leading-relaxed text-slate-300">{audience}</p>
          </div>
        )}

        {/* FAQs */}
        {faqs?.length ? (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-3">❓ Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.map((f, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h4 className="text-sm font-bold text-white mb-1.5">{f.q}</h4>
                  <p className="text-xs leading-relaxed text-slate-300">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Related Links */}
        {related?.length ? (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-3">🔗 Recommended Skill Progression</h3>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-3 py-2 transition-colors bg-white/[0.02]"
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

