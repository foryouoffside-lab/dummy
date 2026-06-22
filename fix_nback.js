const fs = require('fs');
const file = 'C:/Users/sangmesh/Desktop/global-drill-system-nextjs - Copy/app/drills/memory/working-memory/n-back/NBackClient.js';
let content = fs.readFileSync(file, 'utf8');

// Replace instructions block and everything up to the end of the footer wrapper
const startStr = '        {/* Instructions */}';

const lines = content.split('\n');
const startIdx = lines.findIndex(l => l.includes(startStr));

let endFooterIdx = -1;
for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].includes('</footer>')) {
        endFooterIdx = i;
        if (i + 1 < lines.length && lines[i+1].includes(')}')) {
            endFooterIdx = i + 1;
        }
        break;
    }
}

const uiHelperIdx = lines.findIndex(l => l.includes('// UI HELPER COMPONENTS'));

if (startIdx !== -1 && endFooterIdx !== -1) {
    const newSection = `      {/* ABOUT, FAQ & RELATED DRILLS */}
      {!isFullscreen && (
        <>
          <section className="mt-12 text-left max-w-4xl mx-auto" aria-label="About this drill">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                About N-Back Training
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  This free N-Back drill implements the gold-standard cognitive training task used in neuroscientific research to expand working memory capacity and fluid intelligence. You must determine if the current letter matches the letter presented 'N' steps ago. Built on a highly challenging Endless Time-Attack format, the game starts at 2-Back and automatically scales up as you achieve streaks, actively pushing your cognitive control limits.
                </p>
                
                <div className="mb-6 p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Drill Rules & High-Stakes Economy</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li><strong className="text-green-400">Correct Decision:</strong> +3 PTS | +3s Time Bonus</li>
                    <li><strong className="text-cyan-400">10 Streak:</strong> Level Up | N-Back Increases</li>
                    <li><strong className="text-red-400">Wrong/Timeout:</strong> -3 PTS | -2s Time (Resets Streak)</li>
                    <li><strong className="text-orange-400">Infinite Scaling:</strong> Speed increases | Endless Survival</li>
                  </ul>
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play</h3>
                  </div>
                  <ol className="space-y-3 list-decimal pl-5 text-sm text-gray-400">
                    <li><strong className="text-white">Remember:</strong> Keep the last N letters continuously updated in your mind.</li>
                    <li><strong className="text-white">Decide:</strong> Does the current letter match the one from exactly N steps ago?</li>
                    <li><strong className="text-white">Act:</strong> Click Match or No Match quickly before the timer runs out.</li>
                  </ol>
                </div>
                
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Who is this for?</h4>
                      <p className="text-xs text-gray-400 mt-1">Students preparing for rigorous exams, programmers holding multiple variables in mind, professionals needing sharp focus, and anyone wanting to elevate their baseline fluid intelligence.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">What skills are improved?</h4>
                      <p className="text-xs text-gray-400 mt-1">Fluid intelligence, working memory capacity, continuous mental updating, and deep concentration.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RELATED DRILLS */}
          <section className="mt-14 max-w-4xl mx-auto" aria-label="Explore related memory drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/memory/short-term-memory/digit-span" title="Digit Span" desc="Train numerical short-term memory." color="purple" icon={<Hash className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/working-memory/mental-arithmetic" title="Mental Arithmetic" desc="Perform calculations under pressure." color="blue" icon={<Hash className="w-4 h-4" />} />
              <RelatedCard href="/drills/memory/associative-memory/concept-linking" title="Concept Linking" desc="Memorize and recall concept chains." color="orange" icon={<Brain className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual/visual-recognition/visual-search" title="Visual Search" desc="Conjunctive search for hidden items." color="teal" icon={<Search className="w-4 h-4" />} />
            </div>
          </section>

          {/* GLOBAL FOOTER */}
          <footer className="mt-16 bg-gray-950 text-gray-400 rounded-3xl py-12 px-8 border border-gray-800 shadow-xl max-w-4xl mx-auto" role="contentinfo">
            <div className="max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-600/20">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-black text-xl tracking-tight">SkillDrills</span>
              </div>
              <p className="text-sm mb-3 font-medium">&copy; 2026 SkillDrills. All rights reserved.</p>
              <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-8 text-gray-500">
                Premium online cognitive training. Push your brain's processing speed, focus stamina, and memory to the limit with hardcore, data-driven web drills.
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 flex-wrap text-slate-500">
              <button onClick={() => { if (typeof window !== 'undefined' && navigator.share) navigator.share({ title: document.title, url: window.location.href }).catch(() => {}); }} className="hover:text-white transition-colors p-2 bg-slate-900 rounded-full hover:bg-slate-800" title="Share"><Share2 className="w-4 h-4" /></button>
              <button onClick={() => { if (typeof window !== 'undefined') { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); } }} className="hover:text-white transition-colors p-2 bg-slate-900 rounded-full hover:bg-slate-800" title="Copy Link"><Copy className="w-4 h-4" /></button>
              <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 bg-slate-900 rounded-full hover:bg-slate-800" title="X / Twitter"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 bg-slate-900 rounded-full hover:bg-slate-800" title="Instagram"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
              <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 bg-slate-900 rounded-full hover:bg-slate-800" title="YouTube"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
            </div>
          </footer>
        </>
      )}`;

    lines.splice(startIdx, (endFooterIdx - startIdx) + 1, newSection);
    
    const hasRelatedCard = lines.some(l => l.includes('function RelatedCard'));
    if (!hasRelatedCard && uiHelperIdx !== -1) {
        lines.push(`function RelatedCard({ href, title, desc, color, icon }) {
  const gradients = {
    blue: 'from-blue-500 to-indigo-500',
    cyan: 'from-cyan-500 to-teal-500',
    purple: 'from-purple-500 to-violet-500',
    rose: 'from-rose-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    green: 'from-green-500 to-emerald-500',
    teal: 'from-teal-500 to-cyan-500'
  };
  
  return (
    <Link href={href} className={\`group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] hover:-translate-y-1 hover:border-cyan-500/50\`}>
      <div className={\`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r \${gradients[color] || 'from-cyan-500 to-blue-500'}\`}></div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#050508] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-cyan-400 transition-colors tracking-tight">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
        <div className="flex items-center gap-1.5 mt-4 text-cyan-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
          Start Drill <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}`);
    }
    
    fs.writeFileSync(file, lines.join('\n'));
    console.log('Fixed NBackClient.js successfully.');
} else {
    console.log('Failed to find markers.', startIdx, endFooterIdx);
}
