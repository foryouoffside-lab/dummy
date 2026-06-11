import os
import re

PROJECT_DIR = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy"
MEMORY_DIR = os.path.join(PROJECT_DIR, "app", "drills", "memory")

PREMIUM_STATCARD = """function StatCard({icon,value,label,unit='',d}){return(<div className={`rounded-xl border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${d?'bg-slate-900/50 border-slate-800/80 hover:border-slate-700/80 text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)]':'bg-white border-slate-100 hover:border-slate-200 text-slate-800 shadow-sm'}`}><div className="mb-1 flex justify-center opacity-85">{icon}</div><p className={`text-lg sm:text-xl font-extrabold tracking-tight truncate ${d?'text-white':'text-slate-900'}`}>{value}<span className="text-xs font-semibold ml-0.5 text-slate-500">{unit}</span></p><p className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider truncate ${d?'text-slate-500':'text-slate-400'}`}>{label}</p></div>);}"""

PREMIUM_RC = """function RC({label,v,unit='',i,c,d}){const m={yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',purple:'bg-purple-500/10 border-purple-500/30 text-purple-500',green:'bg-green-500/10 border-green-500/30 text-green-500',orange:'bg-orange-500/10 border-orange-500/30 text-orange-500',cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500'};const o=m[c]||m.yellow;const[bg,border,text]=o.split(' ');return(<div className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${bg} ${border} shadow-sm`}><div className="flex items-center gap-2.5"><div className={`${text} p-1.5 bg-slate-900/50 rounded-lg`}>{i}</div><span className={`text-xs sm:text-sm font-semibold ${d?'text-slate-350':'text-slate-600'}`}>{label}</span></div><span className={`font-extrabold text-base sm:text-lg tracking-tight ${text}`}>{v}<span className="text-xs font-bold ml-0.5">{unit}</span></span></div>);}"""

STANDARD_RELATED_DRILLS = """[
                { href: "/drills/memory/short-term-memory/digit-span", color: "blue", icon: <Brain className="w-4 h-4 text-blue-600" />, cat: "Memory", title: "Digit Span", desc: "Recall increasingly long digit sequences to test and improve short-term memory capacity." },
                { href: "/drills/memory/working-memory/n-back", color: "green", icon: <Brain className="w-4 h-4 text-green-600" />, cat: "Memory", title: "Dual N-Back", desc: "Gold standard working memory training with both visual and auditory stimuli combined." },
                { href: "/drills/memory/associative-memory/concept-linking", color: "purple", icon: <Star className="w-4 h-4 text-purple-600" />, cat: "Memory", title: "Concept Linking", desc: "Memorize and recall concept chains step by step with adaptive length progression." },
                { href: "/drills/memory/long-term-memory/paired-associates", color: "orange", icon: <Heart className="w-4 h-4 text-orange-600" />, cat: "Memory", title: "Paired Associates", desc: "Memorize word pairs then select the correct match from 3 options with adaptive rounds." },
                { href: "/drills/memory/spatial-memory/grid-memorization", color: "cyan", icon: <Star className="w-4 h-4 text-cyan-600" />, cat: "Memory", title: "Grid Memorization", desc: "Memorize lit cell positions on progressive grids." },
                { href: "/drills/memory/associative-memory/sound-pattern", color: "red", icon: <Star className="w-4 h-4 text-red-600" />, cat: "Memory", title: "Sound Pattern", desc: "Listen to rhythmic patterns then reproduce them using Tap and Rest buttons." },
                { href: "/drills/memory/long-term-memory/story-recall", color: "teal", icon: <Star className="w-4 h-4 text-teal-600" />, cat: "Memory", title: "Story Recall", desc: "Read short stories then answer detailed questions to improve narrative memory." },
                { href: "/drills/cognitive/memory/card-matching", color: "indigo", icon: <Activity className="w-4 h-4 text-indigo-600" />, cat: "Cognitive", title: "Card Matching", desc: "Classic memory card game to improve visual memory and concentration skills." }
              ]"""

def remove_js_function(code, func_name):
    """Safely find and remove a function declaration by matching braces, skipping parameter list destructuring braces."""
    idx = code.find(f"function {func_name}")
    if idx == -1:
        idx = code.find(f"const {func_name}")
    if idx == -1:
        return code, False
        
    # Find the parameters opening parenthesis
    paren_start = code.find("(", idx)
    if paren_start == -1:
        return code, False
        
    # Find the matching closing parenthesis
    count = 1
    paren_end = -1
    for i in range(paren_start + 1, len(code)):
        if code[i] == "(":
            count += 1
        elif code[i] == ")":
            count -= 1
            if count == 0:
                paren_end = i
                break
                
    if paren_end == -1:
        return code, False
        
    # Find the function body opening brace after the parameters
    brace_start = code.find("{", paren_end)
    if brace_start == -1:
        return code, False
        
    # Find the matching closing brace of the function body
    count = 1
    brace_end = -1
    for i in range(brace_start + 1, len(code)):
        if code[i] == "{":
            count += 1
        elif code[i] == "}":
            count -= 1
            if count == 0:
                brace_end = i
                break
                
    if brace_end != -1:
        return code[:idx] + code[brace_end + 1:], True
    return code, False

def replace_result_cards(content):
    """Replace all <ResultCard ... /> elements with <RC ... /> and rename attributes."""
    def rep(match):
        inner = match.group(1)
        # Rename attributes for RC
        inner = re.sub(r'\bvalue\s*=\s*', 'v=', inner)
        inner = re.sub(r'\bicon\s*=\s*', 'i=', inner)
        inner = re.sub(r'\bcolor\s*=\s*', 'c=', inner)
        inner = re.sub(r'\bisDark\s*=\s*', 'd=', inner)
        return f"<RC {inner} />"
    
    return re.sub(r'<ResultCard\s+([\s\S]*?)\s*/>', rep, content)

def refactor_matrix_path(content):
    """Custom refactor logic for MatrixPathRecallClient.js to add StatCard and RC."""
    print("  -> Running custom refactor for MatrixPathRecallClient.js")
    
    # 1. Update imports to include TrendingUp
    content = content.replace("Award, Volume2", "Award, Volume2, TrendingUp")
    
    # 2. Make isDarkMode default to true
    content = content.replace("const [isDarkMode, setIsDarkMode] = useState(false);", "const [isDarkMode, setIsDarkMode] = useState(true);")
    content = content.replace("const [isDarkMode, setIsDarkMode] = useState(true);", "const [isDarkMode, setIsDarkMode] = useState(true);")
    
    # 3. Replace the stats grid
    old_grid = """        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Current Score</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">{score}</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Best Score</p>
            <p className="text-2xl font-bold text-slate-200 mt-1">{bestScore}</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Time Left</p>
            <p className="text-2xl font-bold text-slate-200 mt-1">{timeLeft}s</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Path Length</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">{pathLength} steps</p>
          </div>
        </div>"""
        
    new_grid = """{/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 h-auto md:h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={pathLength} label="Path Length" unit=" steps" d={isDarkMode} />
        </div>"""
        
    if old_grid in content:
        content = content.replace(old_grid, new_grid)
    else:
        pattern = r'\{\/\*\s*Stats Grid\s*\*\/\}[\s\S]*?<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">[\s\S]*?<\/div>'
        content = re.sub(pattern, new_grid, content)

    # 4. Replace gameOver overlay screen
    old_gameover_block = """          {/* Game Over Overlay */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center">
              <Award className="w-16 h-16 text-yellow-500 mb-4 animate-bounce" />
              <h2 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wide">Recall Concluded</h2>
              <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed font-mono">
                Final Score: <span className="text-indigo-400 font-bold">{score}</span> points.
              </p>
              <div className="flex gap-4">
                <Link href="/drills/memory" className="px-6 py-2.5 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-mono transition">
                  Sector HQ
                </Link>
                <button onClick={startGame} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-bold transition">
                  Retry Run
                </button>
              </div>
            </div>
          )}"""
          
    new_gameover_block = """          {/* Game Over Overlay */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-10 h-10 text-yellow-500 animate-bounce" />
                <h2 className="text-2xl font-extrabold text-white uppercase tracking-wide">Recall Concluded</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6 w-full max-w-[500px]">
                <RC label="Score" v={score} i={<Target className="w-4 h-4" />} c="yellow" d={isDarkMode} />
                <RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4" />} c="yellow" d={isDarkMode} />
                <RC label="Path Length" v={pathLength} i={<Award className="w-4 h-4" />} c="purple" d={isDarkMode} />
                <RC label="Combo" v={combo} i={<Zap className="w-4 h-4" />} c="orange" d={isDarkMode} />
                <RC label="Time Left" v={timeLeft} unit="s" i={<Timer className="w-4 h-4" />} c="cyan" d={isDarkMode} />
                <RC label="Lives" v={lives} i={<Heart className="w-4 h-4" />} c="green" d={isDarkMode} />
              </div>
              <div className="flex gap-4 w-full max-w-[500px]">
                <Link href="/drills/memory" className="flex-1">
                  <button className="w-full px-6 py-2.5 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-mono transition">
                    Sector HQ
                  </button>
                </Link>
                <button onClick={startGame} className="flex-1 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-bold transition">
                  Retry Run
                </button>
              </div>
            </div>
          )}"""
    
    if old_gameover_block in content:
        content = content.replace(old_gameover_block, new_gameover_block)
    else:
        pattern_go = r'\{\/\*\s*Game Over Overlay\s*\*\/\}[\s\S]*?\{gameState === \x27gameOver\x27\s*&&\s*\([\s\S]*?\x7b\s*startGame\s*\x7d[\s\S]*?<\/div>\s*\}\)'
        content = re.sub(pattern_go, new_gameover_block, content)

    # 5. Expand related drills from 4 to 8
    new_related_section = f"""Explore Related Drills</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {{{STANDARD_RELATED_DRILLS}.map"""
              
    content = re.sub(r'Explore Related Drills[\s\S]*?\{\s*\[[\s\S]*?\]\s*\.map', new_related_section, content)

    # Append StatCard and RC at the bottom
    content = content.rstrip()
    if not content.endswith('}'):
        content += '\n'
        
    content += f"\n\n{PREMIUM_STATCARD}\n{PREMIUM_RC}\n"
    return content

def process_file(filepath):
    filename = os.path.basename(filepath)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content
    modified = False

    # 1. Custom handling for MatrixPathRecall
    if "MatrixPathRecallClient.js" in filepath:
        content = refactor_matrix_path(content)
        modified = True
    else:
        # 2. General upgrades for all other drills
        # Update dark mode states default to true (safely and specifically)
        content = content.replace("const [isDarkMode, setIsDarkMode] = useState(false);", "const [isDarkMode, setIsDarkMode] = useState(true);")
        content = content.replace("const [isBoxDarkMode, setIsBoxDarkMode] = useState(false);", "const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);")
        
        # Replace StatCard function
        content, stat_removed = remove_js_function(content, "StatCard")
        # Replace ResultCard function
        content, rc_removed = remove_js_function(content, "ResultCard")
        
        # Append premium StatCard and RC at the end of the file
        content = content.rstrip()
        content += f"\n\n{PREMIUM_STATCARD}\n{PREMIUM_RC}\n"
        
        # Update call sites
        # Replace StatCard calls
        content = content.replace("isDark={isDarkMode}", "d={isDarkMode}")
        content = content.replace("isDark={isBoxDarkMode}", "d={isBoxDarkMode}")
        
        # Replace ResultCard calls with RC calls and attribute renaming
        content = replace_result_cards(content)
        
        modified = True

    # 3. Clean up pattern-recall links to avoid 404
    if "pattern-recall" in content:
        content = content.replace("pattern-recall", "grid-memorization")
        content = content.replace("Pattern Recall", "Grid Memorization")
        content = content.replace("Reproduce spatial patterns on a grid", "Memorize lit cell positions on progressive grids")
        content = content.replace("Memorize and reproduce spatial patterns on a grid to strengthen visual-spatial memory.", "Memorize lit cell positions on progressive grids.")
        print(f"  -> Fixed pattern-recall broken link reference in {filename}")

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [SUCCESS] Refactored: {filename}")
        return True
    return False

# Execute refactoring
print("=== Upgrading Memory Drills to Premium Dark Mode & Layout ===")
for root, dirs, files in os.walk(MEMORY_DIR):
    for f in files:
        if f.endswith('Client.js') and f != 'MemoryClient.js':
            path = os.path.join(root, f)
            try:
                process_file(path)
            except Exception as e:
                print(f"  [ERROR] {f}: {e}")

# Fix MemoryClient.js structured schema duplicate position index
memory_client_path = os.path.join(MEMORY_DIR, "MemoryClient.js")
if os.path.exists(memory_client_path):
    print("\n=== Fixing MemoryClient.js duplicate JSON-LD schema index ===")
    with open(memory_client_path, "r", encoding="utf-8") as f:
        hub_content = f.read()
    
    old_schema_part = """"itemListElement": memoryCategories.flatMap(category =>
              category.drills.map((drill, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "WebApplication",
                  "name": drill.name,
                  "url": `https://skilldrills.online/drills/memory/${category.folderName}/${drill.folderName}`,
                  "description": drill.description,
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "Web"
                }
              }))
            )"""

    new_schema_part = """"itemListElement": memoryCategories.flatMap(category => 
              category.drills.map(drill => ({
                category,
                drill
              }))
            ).map(({ category, drill }, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebApplication",
                "name": drill.name,
                "url": `https://skilldrills.online/drills/memory/${category.folderName}/${drill.folderName}`,
                "description": drill.description,
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web"
              }
            }))"""

    if old_schema_part in hub_content:
        hub_content = hub_content.replace(old_schema_part, new_schema_part)
        with open(memory_client_path, "w", encoding="utf-8") as f:
            f.write(hub_content)
        print("  [SUCCESS] MemoryClient.js schema position bug fixed.")
    else:
        pattern_schema = r'"itemListElement":\s*memoryCategories\.flatMap\([\s\S]*?category\.drills\.map\([\s\S]*?"position":\s*index\s*\+\s*1[\s\S]*?\)\s*\)\s*\)'
        hub_content = re.sub(pattern_schema, new_schema_part, hub_content)
        with open(memory_client_path, "w", encoding="utf-8") as f:
            f.write(hub_content)
        print("  [SUCCESS] MemoryClient.js schema position bug fixed (regex match).")

print("\n=== Refactoring Finished ===")
