'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

/**
 * DrillGuide — the long-form guide and benchmark reference below the drill.
 *
 * WHY IT LOOKS LIKE THE ACCORDIONS ABOVE IT
 * It used to render as one large bordered card with emoji section headings, so
 * the bottom of the page read as a separate document pasted under the drill
 * rather than a continuation of it. Its sections are now the same collapsible
 * panels the drill's own Instructions/About blocks use, so the whole column
 * below the canvas is one system.
 *
 * WHY EVERY PANEL STILL RENDERS ITS CONTENT
 * The body is always in the DOM and hidden with the `hidden` attribute when
 * collapsed — never `{isOpen && ...}`. This is the same rule DrillAccordion
 * follows and for the same reason: this guide is roughly half the page's
 * indexable words, and the FAQ panel is the only place the page's FAQPage
 * JSON-LD answers actually appear. Conditionally rendering any of it would
 * strip the content from the server HTML and put the structured data back into
 * the state where it described answers no visitor could see.
 *
 * The intro paragraphs are deliberately NOT collapsible. They carry the plain
 * definition of what the drill measures, which is what a reader needs first and
 * what an assistant quotes when asked.
 */

function GuidePanel({ id, title, open, onToggle, children }) {
  return (
    <div className="mt-2.5 border border-white/[0.07] bg-white/[0.012] rounded-xl overflow-hidden transition-colors duration-200 hover:border-white/[0.11]">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`guide-panel-${id}`}
        id={`guide-header-${id}`}
        className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <h2 className="text-[15px] font-bold text-white tracking-tight">{title}</h2>
        <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-slate-300' : ''}`} />
      </button>
      <div
        id={`guide-panel-${id}`}
        role="region"
        aria-labelledby={`guide-header-${id}`}
        hidden={!open}
        className={`px-5 pb-5 pt-4 border-t border-white/[0.06] text-slate-300 text-[13px] leading-relaxed ${open ? 'fx-fade-up' : ''}`}
      >
        {children}
      </div>
    </div>
  );
}


/**
 * Some pages call this component with a flat set of props --
 * `<DrillGuide lead={...} metrics={...} benchmarks={...} science={...}
 * protocols={...} faqs={...} related={...} />` -- instead of a single `guide`
 * object. None of those names were in the signature, so `guide` arrived
 * undefined, the component returned null, and EVERY word of that content
 * rendered nowhere: the long-form copy, the benchmark table, and the ten FAQ
 * answers the page's FAQPage JSON-LD was advertising to search engines.
 *
 * That is the same failure as FpsStartCard's unrendered `rules`: props a
 * component never declared are silently discarded by React. Rather than leave a
 * trap that fires whenever someone uses the other calling convention, accept
 * both and normalise the flat form into the object form here.
 */
// A section that carries content is one of: a non-empty array, or an object
// (the `{ title, items }` / `{ title, rows }` wrappers the pages use).
const has = (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v));

// `items` may arrive bare (`[...]`) or wrapped (`{ title, description, items }`).
// Return both halves so a panel can keep the page's own heading.
function unwrap(v) {
  if (Array.isArray(v)) return { title: undefined, note: undefined, items: v };
  if (v && typeof v === 'object') {
    return {
      title: v.title,
      note: v.note ?? v.caption ?? v.description,
      items: Array.isArray(v.items) ? v.items : [],
    };
  }
  return { title: undefined, note: undefined, items: [] };
}

/**
 * Benchmark tables reach this component in three shapes, and two of them used
 * to be dropped:
 *   1. `benchmarks: [{ tier, range, ... }]`        — bare array of row objects
 *   2. `benchmarks: { title, headers, rows: [[]] }`— rows already arrays
 *   3. `benchmark:  { title, columns, rows: [{}] }`— SINGULAR key, object rows
 * Shape 3 is what most of the motor pages write. `benchmark` was never
 * destructured, so those tables rendered nowhere at all.
 */
function normalizeTable(raw) {
  if (Array.isArray(raw) && raw.length) {
    const keys = Object.keys(raw[0]);
    return {
      title: 'Performance benchmarks',
      headers: keys.map((k) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()).trim()),
      rows: raw.map((row) => keys.map((k) => row[k])),
    };
  }
  if (raw && Array.isArray(raw.rows) && raw.rows.length) {
    const first = raw.rows[0];
    return {
      title: raw.title,
      // `columns` is the alias the motor pages use for `headers`.
      headers: raw.headers ?? raw.columns
        ?? (Array.isArray(first) ? [] : Object.keys(first)),
      // Object rows are positional against `columns`, so take values in key order.
      rows: raw.rows.map((row) => (Array.isArray(row) ? row : Object.values(row))),
      note: raw.note ?? raw.caption ?? raw.description,
    };
  }
  return null;
}

/**
 * Some pages call this component with a flat set of props --
 * `<DrillGuide lead={...} metrics={...} benchmarks={...} science={...}
 * protocols={...} faqs={...} related={...} />` -- instead of a single `guide`
 * object. None of those names were in the signature, so `guide` arrived
 * undefined, the component returned null, and EVERY word of that content
 * rendered nowhere: the long-form copy, the benchmark table, and the ten FAQ
 * answers the page's FAQPage JSON-LD was advertising to search engines.
 *
 * That is the same failure as FpsStartCard's unrendered `rules`: props a
 * component never declared are silently discarded by React. Rather than leave a
 * trap that fires whenever someone uses the other calling convention, accept
 * every alias the pages actually write and normalise them here.
 *
 * The aliases below are not hypothetical. Each was found in the tree with real
 * copy behind it that no visitor and no crawler could see:
 *   `benchmark` (singular)        5 motor pages — whole table missing
 *   `faqs: { title, items }`      7 motor pages — every FAQ answer missing while
 *                                 the page's FAQPage JSON-LD advertised them
 *   `protocols: { title, items }` 7 motor pages — item bodies keyed `description`
 *   `intro: { title, paragraphs}` 2 motor pages — the definition paragraphs
 *   `children` + `title`          8 pages sitewide — the ENTIRE guide
 */
function normalizeFlatGuide(flat) {
  if (!flat || typeof flat !== 'object') return null;
  const {
    heading, title, eyebrow, lead, intro, overview, metrics,
    benchmarks, benchmark, science, protocols, steps, audience,
    faqs, sources, related, children,
  } = flat;
  if (![lead, intro, overview, metrics, benchmarks, benchmark, science,
        protocols, faqs, related, children].some(has)) return null;

  const proto = unwrap(protocols);
  const faq = unwrap(faqs);
  const sci = unwrap(science);

  // `metrics` ({label, desc}) and `protocols` ({title, description}) both
  // describe "how to do this well", so they share the technique panel.
  const techItems = [
    ...(Array.isArray(metrics) ? metrics : []).map((m) => ({
      name: m.label ?? m.title, desc: m.desc ?? m.body ?? m.description, tips: m.tips ?? m.cue,
    })),
    ...proto.items.map((m) => ({
      name: m.title ?? m.label, desc: m.body ?? m.desc ?? m.description, tips: m.tips ?? m.cue,
    })),
  ].filter((t) => t.name || t.desc);

  // `intro` is either the paragraph array itself or `{ title, paragraphs }`.
  const introObj = Array.isArray(intro) ? { paragraphs: intro } : (intro ?? overview ?? {});
  const paragraphs = Array.isArray(lead)
    ? lead
    : lead
      ? [lead]
      : (Array.isArray(introObj.paragraphs) ? introObj.paragraphs : undefined);

  return {
    eyebrow,
    heading: heading ?? introObj.title ?? title,
    intro: paragraphs,
    children,
    benchmarks: normalizeTable(benchmarks ?? benchmark),
    mechanisms: sci.items.length
      ? {
          title: sci.title || 'The science behind it',
          items: sci.items.map((x) => ({ name: x.title ?? x.name, desc: x.body ?? x.desc ?? x.description })),
        }
      : undefined,
    techniques: techItems.length ? { title: proto.title || 'Technique and execution', items: techItems } : undefined,
    steps,
    audience,
    faqs: faq.items.length ? { title: faq.title, items: faq.items } : undefined,
    sources,
    // `related` may arrive as {href, title, desc} instead of {href, label}.
    related: Array.isArray(related) ? related.map((r) => ({ href: r.href, label: r.label ?? r.title })) : undefined,
  };
}

/**
 * The `guide={...}` object form writes the same aliases, so run its sections
 * through the same coercion rather than fixing only the flat path. `faqs` in
 * particular is an array on some pages and `{ title, items }` on others; the
 * render below reads one shape, so it has to be settled here.
 */
function coerceGuide(guide) {
  if (!guide) return null;
  const table = normalizeTable(guide.benchmarks ?? guide.benchmark);
  const faq = unwrap(guide.faqs);
  return {
    ...guide,
    benchmarks: table,
    faqs: faq.items.length ? { title: faq.title, items: faq.items } : undefined,
  };
}

export default function DrillGuide({ guide, ...flat }) {
  const [open, setOpen] = useState(null);
  // Accept both the `guide={...}` object form and the flat prop form.
  guide = coerceGuide(guide ?? normalizeFlatGuide(flat));
  if (!guide) return null;

  const {
    overview,
    benchmarks,
    mechanisms,
    techniques,
    steps,
    audience,
    faqs,
    sources,
    related,
  } = guide;
  // `overview: { title, paragraphs }` is an accepted alias for heading/intro.
  const heading = guide.heading ?? overview?.title;
  const intro = guide.intro ?? overview?.paragraphs;
  const eyebrow = guide.eyebrow;
  const children = guide.children;
  const toggle = (id) => setOpen((cur) => (cur === id ? null : id));

  return (
    <section className="max-w-6xl w-full mx-auto px-4 pb-14 font-sans">
      {/* Intro — always visible. The definition belongs above the fold of this
          section, not behind a click. */}
      {(heading || eyebrow || intro?.length) && (
        <div className="pt-2 pb-1">
          {eyebrow && (
            <p className="text-[9.5px] uppercase tracking-[0.12em] text-slate-500 mb-1.5">{eyebrow}</p>
          )}
          {heading && (
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2.5">{heading}</h2>
          )}
          {intro?.map((p, i) => (
            <p key={i} className="text-[13px] leading-relaxed text-slate-400 mb-2.5 last:mb-0">{p}</p>
          ))}
        </div>
      )}

      {/* The `<DrillGuide title=... >{prose}</DrillGuide>` calling convention.
          `children` was never in the signature, so on the 8 pages that use this
          form React discarded the entire guide — every heading, table and
          paragraph of it. It stays outside a panel and always visible for the
          same reason the intro does: it carries the page's definition. */}
      {children && (
        <div className="pt-1 pb-1 text-[13px] leading-relaxed text-slate-400 space-y-2.5 [&_h3]:text-[15px] [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-5 [&_h3]:mb-1.5 [&_strong]:text-slate-200 [&_em]:text-slate-300">
          {children}
        </div>
      )}

      {benchmarks && (
        <GuidePanel id="benchmarks" title={benchmarks.title || 'Performance benchmarks'} open={open === 'benchmarks'} onToggle={() => toggle('benchmarks')}>
          <div className="overflow-x-auto rounded-lg border border-white/[0.06]">
            <table className="w-full text-left text-[12px] border-collapse">
              <thead className="bg-white/[0.03] text-slate-300 border-b border-white/[0.06]">
                <tr>
                  {(benchmarks.headers ?? benchmarks.columns ?? []).map((h, i) => (
                    <th key={i} className="px-3 py-2.5 font-semibold uppercase tracking-[0.08em] text-[10px] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {(benchmarks.rows ?? []).map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-3 py-2.5 align-top ${j === 0 ? 'font-semibold text-white font-mono whitespace-nowrap' : 'text-slate-400'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {benchmarks.note && (
            <p className="text-[11.5px] text-slate-500 mt-2.5 leading-relaxed">{benchmarks.note}</p>
          )}
        </GuidePanel>
      )}

      {/* `mechanisms` is the same shape as `techniques` and is written by several
          pages. It used to be dropped on the floor because the component never
          destructured it, so the copy existed in the source and appeared nowhere. */}
      {mechanisms && (
        <GuidePanel id="mechanisms" title={mechanisms.title || 'How it works'} open={open === 'mechanisms'} onToggle={() => toggle('mechanisms')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {(mechanisms.items ?? []).map((item, i) => (
              <div key={i} className="p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.015]">
                <h3 className="text-[13px] font-bold text-white mb-1">{item.name}</h3>
                <p className="text-[12px] text-slate-400 leading-relaxed">{item.desc}</p>
                {(item.tips || item.cue) && (
                  <p className="text-[12px] text-slate-300 leading-relaxed mt-1.5 pt-1.5 border-t border-white/[0.06]">
                    <span className="font-semibold text-slate-200">Tip. </span>{item.tips || item.cue}
                  </p>
                )}
              </div>
            ))}
          </div>
        </GuidePanel>
      )}

      {techniques && (
        <GuidePanel id="technique" title={techniques.title || 'Technique and execution'} open={open === 'technique'} onToggle={() => toggle('technique')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {(techniques.items ?? []).map((tech, i) => (
              <div key={i} className="p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.015]">
                <h3 className="text-[13px] font-bold text-white mb-1">{tech.name}</h3>
                <p className="text-[12px] text-slate-400 leading-relaxed">{tech.desc}</p>
                {(tech.tips || tech.cue) && (
                  <p className="text-[12px] text-slate-300 leading-relaxed mt-1.5 pt-1.5 border-t border-white/[0.06]">
                    <span className="font-semibold text-slate-200">Tip. </span>{tech.tips || tech.cue}
                  </p>
                )}
              </div>
            ))}
          </div>
        </GuidePanel>
      )}

      {(steps?.length || audience) && (
        <GuidePanel id="howto" title="How to train with this drill" open={open === 'howto'} onToggle={() => toggle('howto')}>
          {steps?.length ? (
            <ol className="space-y-2">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-400">
                  <span className="shrink-0 w-5 h-5 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10.5px] font-bold text-slate-200 flex items-center justify-center font-mono mt-[1px]">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          ) : null}
          {audience && (
            <p className="text-[12.5px] leading-relaxed text-slate-400 mt-3.5 pt-3.5 border-t border-white/[0.06]">
              <span className="font-semibold text-slate-200">Who it is for. </span>{audience}
            </p>
          )}
        </GuidePanel>
      )}

      {/* Every question in the page's FAQPage JSON-LD appears here, in the DOM,
          hidden only by the `hidden` attribute. `faqs` reaches this component as
          a bare array on some pages and as `{ title, items }` on others; before
          coerceGuide settled that, the object form failed the `?.length` test
          and the whole panel vanished while the structured data kept promising
          the answers to search engines. */}
      {faqs?.items?.length ? (
        <GuidePanel id="faq" title={faqs.title || 'Frequently asked questions'} open={open === 'faq'} onToggle={() => toggle('faq')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {faqs.items.map((f, i) => (
              <div key={i} className="p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.015]">
                <h3 className="text-[12.5px] font-bold text-white mb-1 leading-snug">{f.q}</h3>
                <p className="text-[12px] leading-relaxed text-slate-400">{f.a}</p>
              </div>
            ))}
          </div>
        </GuidePanel>
      ) : null}

      {/* References. The pages state real published figures -- reaction latencies,
          saccade velocities, refresh-rate quantization -- and a reader (or an
          answer engine) has no way to check a bare "(Woods et al., 2015)".
          Linking the DOI is what turns a name-drop into a verifiable claim, and
          it is the one GEO tactic this site can use honestly: it has no data of
          its own to cite, so it cites other people's properly. Every entry here
          must be a real work that says what the page claims it says. */}
      {sources?.length ? (
        <GuidePanel id="sources" title="References" open={open === 'sources'} onToggle={() => toggle('sources')}>
          <ol className="space-y-2">
            {sources.map((src, i) => (
              <li key={i} className="text-[12px] leading-relaxed text-slate-400 flex gap-2.5">
                <span className="shrink-0 w-5 h-5 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10.5px] font-bold text-slate-200 flex items-center justify-center font-mono mt-[1px]">
                  {i + 1}
                </span>
                <span>
                  <span className="text-slate-300">{src.authors}</span>{' '}
                  {src.year ? <span className="text-slate-500">({src.year}). </span> : null}
                  <span className="italic">{src.title}</span>
                  {src.venue ? <span className="text-slate-500">. {src.venue}</span> : null}
                  {src.url ? (
                    <>
                      {'. '}
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-slate-300 underline decoration-white/20 underline-offset-2 hover:text-white hover:decoration-white/50 transition-colors break-all"
                      >
                        {src.url.replace(/^https?:\/\//, '')}
                      </a>
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
          <p className="text-[11.5px] text-slate-500 mt-3 leading-relaxed">
            SkillDrills collects no aggregate performance data &mdash; scores stay in your
            browser&apos;s local storage and are never uploaded. Every figure quoted on this page
            comes from the published work listed above, not from this site&apos;s visitors.
          </p>
        </GuidePanel>
      ) : null}

      {related?.length ? (
        <div className="mt-5 pt-4 border-t border-white/[0.06]">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-2.5">Continue training</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="text-[12px] font-medium text-slate-300 hover:text-white border border-white/[0.07] hover:border-white/20 rounded-lg px-3 py-1.5 transition-colors"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
