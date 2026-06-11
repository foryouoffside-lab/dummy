import os
import re

project_dir = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy"
drills_dir = os.path.join(project_dir, "app", "drills")

# State variables to inject at component start
state_variables = """  const [drillXP, setDrillXP] = useState(0);
  const [lifetimeGames, setLifetimeGames] = useState(0);
  const [sessionGrade, setSessionGrade] = useState('');
  const [sessionXpEarned, setSessionXpEarned] = useState(0);
  const [sessionLeveledUp, setSessionLeveledUp] = useState(false);
  const [sessionLatency, setSessionLatency] = useState(0);
  const [sessionCli, setSessionCli] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(window.location.pathname + '_progression');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.level) setLevel(parsed.level);
        if (parsed.xp) setDrillXP(parsed.xp);
        if (parsed.totalGames) setLifetimeGames(parsed.totalGames);
      }
    } catch (e) {}
  }, []);

  const handleDrillSessionEnd = (finalScore, accuracy) => {
    try {
      const latency = finalScore > 0 ? Math.min(5000, Math.max(100, Math.round((60 * 1000) / finalScore))) : 250;
      const cli = Math.round((finalScore * (accuracy / 100)));
      setSessionLatency(latency);
      setSessionCli(cli);

      const earnedXp = Math.round((finalScore * (accuracy / 100)) / 2) + 10;
      let newXp = (drillXP || 0) + earnedXp;
      let newLevel = level || 1;
      let leveledUp = false;
      if (newXp >= 100) {
        newXp = newXp % 100;
        newLevel += 1;
        leveledUp = true;
        try {
          if (typeof soundEnabled === 'undefined' || soundEnabled) {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.connect(g); g.connect(ctx.destination);
            const now = ctx.currentTime;
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.linearRampToValueAtTime(659.25, now + 0.15);
            osc.frequency.linearRampToValueAtTime(783.99, now + 0.3);
            osc.frequency.linearRampToValueAtTime(1046.50, now + 0.45);
            g.gain.setValueAtTime(0.1, now);
            g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            osc.start(now); osc.stop(now + 0.6);
          }
        } catch (se) {}
      }
      setLevel(newLevel);
      setDrillXP(newXp);
      setLifetimeGames(prev => prev + 1);
      setSessionGrade(getPerformanceGrade(finalScore, accuracy));
      setSessionXpEarned(earnedXp);
      setSessionLeveledUp(leveledUp);
      
      localStorage.setItem(window.location.pathname + '_progression', JSON.stringify({
        level: newLevel,
        xp: newXp,
        totalGames: lifetimeGames + 1,
        bestScore: Math.max(bestScore, finalScore)
      }));
      localStorage.setItem(window.location.pathname + '_level', newLevel.toString());
    } catch (e) {}
  };

  const getPerformanceGrade = (s, acc) => {
    if (acc < 50) return 'F';
    const ratio = s / (bestScore || 1);
    if (acc >= 98 && ratio >= 0.95) return 'S+';
    if (acc >= 95 && ratio >= 0.90) return 'S';
    if (acc >= 90 && ratio >= 0.80) return 'A';
    if (acc >= 80 && ratio >= 0.70) return 'B';
    if (acc >= 70 && ratio >= 0.50) return 'C';
    return 'D';
  };

  useEffect(() => {
    if (gameState === 'gameOver' || gameState === 'ended') {
      const finalScore = typeof score !== 'undefined' ? score : (typeof points !== 'undefined' ? points : (typeof reps !== 'undefined' ? reps : (typeof wpm !== 'undefined' ? wpm : 0)));
      const finalAccuracy = typeof getAccuracy === 'function' ? getAccuracy() : 100;
      handleDrillSessionEnd(finalScore, finalAccuracy);
    }
  }, [gameState]);
"""

# Premium StatCard component
stat_card_new = """function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`group rounded-xl border p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] ${isDark ? 'bg-gray-800/90 border-gray-700/80 hover:border-blue-500/40 text-white' : 'bg-white/90 border-gray-100/80 hover:border-blue-400/40 text-gray-900'} backdrop-blur-sm`}>
      <div className="mb-0.5 flex justify-center text-blue-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{icon}</div>
      <p className="text-xs sm:text-base md:text-lg font-extrabold tracking-tight truncate">{value}<span className="text-[10px] sm:text-xs font-semibold ml-0.5 opacity-80">{unit}</span></p>
      <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 truncate">{label}</p>
    </div>
  );
}"""

# Premium ResultCard component
result_card_new = """function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = {
    yellow: { bg: 'bg-yellow-500/5', border: 'border-yellow-500/20', text: 'text-yellow-500', icon: 'bg-yellow-500/10 text-yellow-500' },
    purple: { bg: 'bg-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-500', icon: 'bg-purple-500/10 text-purple-500' },
    green: { bg: 'bg-green-500/5', border: 'border-green-500/20', text: 'text-green-500', icon: 'bg-green-500/10 text-green-500' },
    emerald: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-500', icon: 'bg-emerald-500/10 text-emerald-500' },
    red: { bg: 'bg-red-500/5', border: 'border-red-500/20', text: 'text-red-500', icon: 'bg-red-500/10 text-red-500' },
    orange: { bg: 'bg-orange-500/5', border: 'border-orange-500/20', text: 'text-orange-500', icon: 'bg-orange-500/10 text-orange-500' },
    amber: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-500', icon: 'bg-amber-500/10 text-amber-500' },
    cyan: { bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', text: 'text-cyan-500', icon: 'bg-cyan-500/10 text-cyan-500' },
    pink: { bg: 'bg-pink-500/5', border: 'border-pink-500/20', text: 'text-pink-500', icon: 'bg-pink-500/10 text-pink-500' }
  };
  const colors = colorMap[color] || colorMap.yellow;
  return (
    <div className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${colors.bg} ${colors.border} shadow-sm`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`p-2 rounded-lg ${colors.icon}`} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm font-semibold truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-extrabold text-base sm:text-lg tracking-tight ml-2 ${colors.text}`}>{value}<span className="text-xs font-bold ml-0.5">{unit}</span></span>
    </div>
  );
}"""

# Premium RC component
rc_new = """function RC({ label, v, unit = '', i, c, d }) {
  const colorMap = {
    yellow: { bg: 'bg-yellow-500/5', border: 'border-yellow-500/20', text: 'text-yellow-500', icon: 'bg-yellow-500/10 text-yellow-500' },
    purple: { bg: 'bg-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-500', icon: 'bg-purple-500/10 text-purple-500' },
    green: { bg: 'bg-green-500/5', border: 'border-green-500/20', text: 'text-green-500', icon: 'bg-green-500/10 text-green-500' },
    emerald: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-500', icon: 'bg-emerald-500/10 text-emerald-500' },
    red: { bg: 'bg-red-500/5', border: 'border-red-500/20', text: 'text-red-500', icon: 'bg-red-500/10 text-red-500' },
    orange: { bg: 'bg-orange-500/5', border: 'border-orange-500/20', text: 'text-orange-500', icon: 'bg-orange-500/10 text-orange-500' },
    amber: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-500', icon: 'bg-amber-500/10 text-amber-500' },
    cyan: { bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', text: 'text-cyan-500', icon: 'bg-cyan-500/10 text-cyan-500' },
    pink: { bg: 'bg-pink-500/5', border: 'border-pink-500/20', text: 'text-pink-500', icon: 'bg-pink-500/10 text-pink-500' }
  };
  const colors = colorMap[c] || colorMap.yellow;
  return (
    <div className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${colors.bg} ${colors.border} shadow-sm`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`p-2 rounded-lg ${colors.icon}`} aria-hidden="true">{i}</div>
        <span className={`text-xs sm:text-sm font-semibold truncate ${d ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-extrabold text-base sm:text-lg tracking-tight ml-2 ${colors.text}`}>{v}<span className="text-xs font-bold ml-0.5">{unit}</span></span>
    </div>
  );
}"""

# Lobby card styling
lobby_progression_card = """<div className={`mb-6 p-4 rounded-xl border ${ (typeof isDarkMode !== 'undefined' ? isDarkMode : (typeof isBoxDarkMode !== 'undefined' ? isBoxDarkMode : true)) ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'} text-left`}>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${ (typeof isDarkMode !== 'undefined' ? isDarkMode : (typeof isBoxDarkMode !== 'undefined' ? isBoxDarkMode : true)) ? 'text-gray-400' : 'text-gray-500'}`}>Level {level} Diagnostic</span>
          <span className="text-xs font-bold text-blue-500">{drillXP}% XP</span>
        </div>
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500" style={{ width: `${drillXP}%` }}></div>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className={`${ (typeof isDarkMode !== 'undefined' ? isDarkMode : (typeof isBoxDarkMode !== 'undefined' ? isBoxDarkMode : true)) ? 'text-gray-400' : 'text-gray-500'}`}>Drill Rank:</span>
          <span className="font-extrabold text-blue-400 uppercase">
            {level >= 10 ? 'Grandmaster' : level >= 7 ? 'Master' : level >= 4 ? 'Expert' : 'Novice'}
          </span>
        </div>
      </div>
      """

result_grid_replacement = """<div className="text-center mb-5">
        <span className={`inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full font-black text-xs uppercase tracking-widest ${sessionLeveledUp ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse'}`}>
          Grade {sessionGrade || 'A'}
        </span>
        {sessionLeveledUp && (
          <p className="text-xs text-green-400 font-bold mt-2 animate-bounce">🎉 Level Up! Advanced to Level {level}!</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6">
        <ResultCard label="Cognitive Load Index (CLI)" value={sessionCli} icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12h3l2-6 2 12 2-9 2 4 3-1h3" /></svg>} color="purple" isDark={typeof isDarkMode !== 'undefined' ? isDarkMode : (typeof isBoxDarkMode !== 'undefined' ? isBoxDarkMode : true)} />
        <ResultCard label="Avg Input Latency" value={sessionLatency} unit="ms" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="cyan" isDark={typeof isDarkMode !== 'undefined' ? isDarkMode : (typeof isBoxDarkMode !== 'undefined' ? isBoxDarkMode : true)} />"""

success_count = 0
failed_count = 0

for root, dirs, files in os.walk(drills_dir):
    # Skip FPS sector entirely
    if "fps" in root.replace(project_dir, "").split(os.sep):
        continue
        
    for f in files:
        if f.endswith('Client.js') or (f == 'page.js' and 'reaction-time' in root):
            filepath = os.path.join(root, f)
            try:
                with open(filepath, 'r', encoding='utf-8') as file_obj:
                    code = file_obj.read()
                
                # Verify it is a valid client component file
                if "export default function" not in code:
                    continue
                
                # Regex match for the component name
                comp_match = re.search(r"export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\(\s*\)\s*\{", code)
                if not comp_match:
                    continue
                
                comp_name = comp_match.group(1)
                comp_decl = f"export default function {comp_name}() {{"
                
                # Check if progression states have already been injected (to prevent duplicates)
                if "drillXP" in code or "sessionGrade" in code:
                    print(f"Skipping already-injected file: {f}")
                    continue
                
                # 1. Handle level initialization variable if exists
                # Check if "level" state is declared at all in the file (any format)
                has_level = "const [level" in code or "const [ level" in code
                
                level_regex = r"const\s*\[\s*level\s*,\s*setLevel\s*\]\s*=\s*useState\(\s*(\d+)\s*\);?"
                if has_level:
                    # Dynamically replace level declaration with persistent localstorage version
                    def replace_level(match):
                        val = match.group(1)
                        return f"const [level, setLevel] = useState(() => {{ try {{ const saved = localStorage.getItem(window.location.pathname + '_level'); return saved ? parseInt(saved, 10) : {val}; }} catch (e) {{ return {val}; }} }});"
                    code = re.sub(level_regex, replace_level, code)
                
                # 2. Inject states and session progression handlers
                injected_states = state_variables
                if not has_level:
                    # Inject level state as well if not already defined
                    injected_states = "  const [level, setLevel] = useState(() => { try { const saved = localStorage.getItem(window.location.pathname + '_level'); return saved ? parseInt(saved, 10) : 1; } catch (e) { return 1; } });\n" + state_variables
                
                code = code.replace(comp_decl, comp_decl + "\n" + injected_states)
                
                # 3. Optimize Stats Header Board Layout
                code = code.replace('className="grid grid-cols-7 gap-3 mb-4 h-[88px]"', 'className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3 mb-4 h-auto min-h-[88px] py-1"')
                code = code.replace('className="grid grid-cols-6 gap-3 mb-4 h-[88px]"', 'className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-4 h-auto min-h-[88px] py-1"')
                code = code.replace('className="grid grid-cols-5 gap-3 mb-4 h-[88px]"', 'className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mb-4 h-auto min-h-[88px] py-1"')
                code = code.replace('className="grid grid-cols-4 gap-3 mb-4 h-[88px]"', 'className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 h-auto min-h-[88px] py-1"')

                # 4. Optimize ResultCard List Layout
                code = code.replace('<div className="grid grid-cols-2 gap-3 mb-6">', result_grid_replacement)
                code = code.replace('<div className="grid grid-cols-2 gap-3 mb-4">', result_grid_replacement)
                code = code.replace('<div className="grid grid-cols-2 gap-4 mb-6">', result_grid_replacement)
                
                # 5. Prepend progression card to Start Lobby button
                code = code.replace('<button onClick={handleStartTraining}', lobby_progression_card + '<button onClick={handleStartTraining}')
                code = code.replace('<button onClick={startGame}', lobby_progression_card + '<button onClick={startGame}')
                code = code.replace('<button onClick={startDrill}', lobby_progression_card + '<button onClick={startDrill}')
                code = code.replace('<button onClick={startSession}', lobby_progression_card + '<button onClick={startSession}')
                
                # 6. Replace StatCard, ResultCard, RC implementations at the bottom of the file
                def_statcard_pattern = r"function\s+StatCard\s*\([^)]*\)\s*\{[^}]*return\s*\([^;]*\);?\s*\}"
                code = re.sub(def_statcard_pattern, stat_card_new, code)
                
                def_resultcard_pattern = r"function\s+ResultCard\s*\([^)]*\)\s*\{[^}]*const\s+colors\s*=\s*colorMap\[color\][^;]*;?\s*return\s*\([^;]*\);?\s*\}"
                code = re.sub(def_resultcard_pattern, result_card_new, code)
                
                def_rc_pattern = r"function\s+RC\s*\([^)]*\)\s*\{[^}]*const\s*\[bg,\s*border,\s*text\s*\]\s*=\s*o\.split[^;]*;?\s*return\s*\([^;]*\);?\s*\}"
                code = re.sub(def_rc_pattern, rc_new, code)
                
                # Write changes back
                with open(filepath, 'w', encoding='utf-8') as file_obj:
                    file_obj.write(code)
                success_count += 1
                print(f"Successfully processed: {f}")
            except Exception as e:
                print(f"Error in {f}: {e}")
                failed_count += 1

print(f"\nBatch refactor finished. Success: {success_count}, Failed: {failed_count}")
