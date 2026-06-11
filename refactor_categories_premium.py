import os
import re

PROJECT_DIR = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy"
DRILLS_DIR = os.path.join(PROJECT_DIR, "app", "drills")

# Excluded files
EXCLUDED_FILES = [
    "AcademicDrillsClient.js",
    "CognitiveHubClient.js",
    "MentalFitnessClient.js",
    "MotorDrillsClient.js",
    "PhysicalDrillsClient.js",
    "ProductivityDrillsClient.js",
    "VisualDrillsClient.js",
    "MemoryClient.js",
    "FPSHubClient.js"
]

PREMIUM_STATCARD = """function StatCard({icon,value,label,unit='',d}){return(<div className={`rounded-xl border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${d?'bg-slate-900/50 border-slate-800/80 hover:border-slate-700/80 text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)]':'bg-white border-slate-100 hover:border-slate-200 text-slate-800 shadow-sm'}`}><div className="mb-1 flex justify-center opacity-85">{icon}</div><p className={`text-lg sm:text-xl font-extrabold tracking-tight truncate ${d?'text-white':'text-slate-900'}`}>{value}<span className="text-xs font-semibold ml-0.5 text-slate-500">{unit}</span></p><p className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider truncate ${d?'text-slate-500':'text-slate-400'}`}>{label}</p></div>);}"""

PREMIUM_RC = """function RC({label,v,unit='',i,c,d}){const m={yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',purple:'bg-purple-500/10 border-purple-500/30 text-purple-500',green:'bg-green-500/10 border-green-500/30 text-green-500',orange:'bg-orange-500/10 border-orange-500/30 text-orange-500',cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500'};const o=m[c]||m.yellow;const[bg,border,text]=o.split(' ');return(<div className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${bg} ${border} shadow-sm`}><div className="flex items-center gap-2.5"><div className={`${text} p-1.5 bg-slate-900/50 rounded-lg`}>{i}</div><span className={`text-xs sm:text-sm font-semibold ${d?'text-slate-350':'text-slate-600'}`}>{label}</span></div><span className={`font-extrabold text-base sm:text-lg tracking-tight ${text}`}>{v}<span className="text-xs font-bold ml-0.5">{unit}</span></span></div>);}"""

RELATED_DRILLS = {
    "academic": """[
        { href: "/drills/academic/reading-speed/speed-reader", color: "blue", icon: <BookOpen className="w-4 h-4 text-blue-600" />, cat: "Academic", title: "Speed Reader", desc: "Train your reading speed and reading compression." },
        { href: "/drills/academic/reading-speed/rsvp-reader", color: "green", icon: <Brain className="w-4 h-4 text-green-600" />, cat: "Academic", title: "RSVP Reader", desc: "Read text block-by-block rapidly using RSVP style." },
        { href: "/drills/academic/reading-speed/peripheral-reader", color: "purple", icon: <Star className="w-4 h-4 text-purple-600" />, cat: "Academic", title: "Peripheral Reader", desc: "Read numbers and letters at visual edges." },
        { href: "/drills/academic/math-speed/mental-math", color: "orange", icon: <Target className="w-4 h-4 text-orange-600" />, cat: "Academic", title: "Mental Math", desc: "Advanced mental calculation with 3 difficulty tiers." },
        { href: "/drills/academic/math-speed/arithmetic-race", color: "cyan", icon: <TrendingUp className="w-4 h-4 text-cyan-600" />, cat: "Academic", title: "Arithmetic Race", desc: "Speed math race with customizable difficulty levels." },
        { href: "/drills/academic/math-speed/multiplication-tables", color: "red", icon: <Trophy className="w-4 h-4 text-red-600" />, cat: "Academic", title: "Multiplication Tables", desc: "Calibrate and practice multiplication operations." },
        { href: "/drills/academic/math-speed/Math-Reaction", color: "teal", icon: <Activity className="w-4 h-4 text-teal-600" />, cat: "Academic", title: "Math Reaction", desc: "Odd/even parity identification under adaptive timer." },
        { href: "/drills/academic/writing-speed/typing-test", color: "rose", icon: <Keyboard className="w-4 h-4 text-rose-600" />, cat: "Academic", title: "Typing Test", desc: "WPM test with real-time feedback and quotes." }
    ]""",
    "cognitive": """[
        { href: "/drills/cognitive/attention/sustained-attention", color: "blue", icon: <Timer className="w-4 h-4 text-blue-600" />, cat: "Cognitive", title: "Sustained Attention", desc: "Maintain focus on targets over extended periods." },
        { href: "/drills/cognitive/attention/selective-attention", color: "green", icon: <Target className="w-4 h-4 text-green-600" />, cat: "Cognitive", title: "Selective Attention", desc: "Ignore distractor stimuli while clicking correct numbers." },
        { href: "/drills/cognitive/attention/divided-attention", color: "purple", icon: <Zap className="w-4 h-4 text-purple-600" />, cat: "Cognitive", title: "Divided Attention", desc: "Handle multiple simultaneous attention tasks." },
        { href: "/drills/cognitive/focus/concentration-grid", color: "orange", icon: <Activity className="w-4 h-4 text-orange-600" />, cat: "Cognitive", title: "Concentration Grid", desc: "Click numbers sequentially in grid structure." },
        { href: "/drills/cognitive/focus/distraction-fighter", color: "cyan", icon: <Brain className="w-4 h-4 text-cyan-600" />, cat: "Cognitive", title: "Distraction Fighter", desc: "Track primary target with flashing distractors." },
        { href: "/drills/cognitive/memory/card-matching", color: "red", icon: <Star className="w-4 h-4 text-red-600" />, cat: "Cognitive", title: "Card Matching", desc: "Classic matching card game with custom memory theme." },
        { href: "/drills/cognitive/memory/memory-sequence", color: "teal", icon: <Award className="w-4 h-4 text-teal-600" />, cat: "Cognitive", title: "Memory Sequence", desc: "Recall growing pattern sequences in grid." },
        { href: "/drills/cognitive/problem-solving/logic-puzzles", color: "rose", icon: <Trophy className="w-4 h-4 text-rose-600" />, cat: "Cognitive", title: "Logic Puzzles", desc: "Deduce correct patterns using logical rules." }
    ]""",
    "mental-fitness": """[
        { href: "/drills/mental-fitness/breathing-exercises/box-breathing", color: "blue", icon: <Timer className="w-4 h-4 text-blue-600" />, cat: "Mental Fitness", title: "Box Breathing", desc: "Equal duration inhale, hold, exhale, hold breathing." },
        { href: "/drills/mental-fitness/breathing-exercises/wim-hof", color: "green", icon: <Zap className="w-4 h-4 text-green-600" />, cat: "Mental Fitness", title: "Wim Hof Breathing", desc: "Deep hyperventilation rounds followed by long holds." },
        { href: "/drills/mental-fitness/breathing-exercises/4-7-8", color: "purple", icon: <Heart className="w-4 h-4 text-purple-600" />, cat: "Mental Fitness", title: "4-7-8 Breathing", desc: "Relaxing breathing pattern targeting vagus nerve stimulation." },
        { href: "/drills/mental-fitness/stress-control/biofeedback", color: "orange", icon: <Activity className="w-4 h-4 text-orange-600" />, cat: "Mental Fitness", title: "Biofeedback", desc: "Coherence breathing with visual feedback metrics." },
        { href: "/drills/mental-fitness/stress-control/calm-under-pressure", color: "cyan", icon: <Brain className="w-4 h-4 text-cyan-600" />, cat: "Mental Fitness", title: "Calm Under Pressure", desc: "Input puzzle answers with stress stimulators." },
        { href: "/drills/mental-fitness/stress-control/stress-inoculation", color: "red", icon: <Target className="w-4 h-4 text-red-600" />, cat: "Mental Fitness", title: "Stress Inoculation", desc: "Calibrate response times during auditory challenges." },
        { href: "/drills/cognitive/attention/sustained-attention", color: "teal", icon: <Star className="w-4 h-4 text-teal-600" />, cat: "Cognitive", title: "Sustained Attention", desc: "Maintain vigilance over long duration task." },
        { href: "/drills/cognitive/focus/focus-timer", color: "rose", icon: <Trophy className="w-4 h-4 text-rose-600" />, cat: "Cognitive", title: "Focus Timer", desc: "Structured concentration interval timer." }
    ]""",
    "motor": """[
        { href: "/drills/motor/hand-eye-coordination/aim-trainer", color: "blue", icon: <Target className="w-4 h-4 text-blue-600" />, cat: "Motor", title: "Aim Trainer Elite", desc: "Shrinking circular target click aim calibration." },
        { href: "/drills/motor/hand-eye-coordination/click-accuracy", color: "green", icon: <Trophy className="w-4 h-4 text-green-600" />, cat: "Motor", title: "Click Accuracy", desc: "Rapid click small targets to practice precision control." },
        { href: "/drills/motor/movement-speed/finger-sequencing", color: "purple", icon: <Brain className="w-4 h-4 text-purple-600" />, cat: "Motor", title: "Finger Sequencing", desc: "Tap correct number finger sequences in order." },
        { href: "/drills/motor/movement-speed/gesture-speed", color: "orange", icon: <Zap className="w-4 h-4 text-orange-600" />, cat: "Motor", title: "Gesture Speed", desc: "Swipe/drag gestures rapidly across visual paths." },
        { href: "/drills/motor/movement-speed/rapid-tapping", color: "cyan", icon: <Activity className="w-4 h-4 text-cyan-600" />, cat: "Motor", title: "Rapid Tapping", desc: "Speed click/tap buttons within set time limit." },
        { href: "/drills/motor/precision-control/fine-motor", color: "red", icon: <Star className="w-4 h-4 text-red-600" />, cat: "Motor", title: "Fine Motor Precision", desc: "Follow path lines with cursor under close boundaries." },
        { href: "/drills/motor/precision-control/steady-hand", color: "teal", icon: <Heart className="w-4 h-4 text-teal-600" />, cat: "Motor", title: "Steady Hand", desc: "Hold cursor still inside moving target zones." },
        { href: "/drills/motor/precision-control/tracing", color: "rose", icon: <TrendingUp className="w-4 h-4 text-rose-600" />, cat: "Motor", title: "Path Tracing", desc: "Trace complex visual paths with mouse accuracy." }
    ]""",
    "physical": """[
        { href: "/drills/physical/Balance-Training/dynamic-balance", color: "blue", icon: <Activity className="w-4 h-4 text-blue-600" />, cat: "Physical", title: "Dynamic Balance", desc: "Keep balance marker inside bounds during movement." },
        { href: "/drills/physical/Balance-Training/single-leg-hold", color: "green", icon: <Timer className="w-4 h-4 text-green-600" />, cat: "Physical", title: "Single Leg Equilibrium", desc: "Maintain balance on one leg with virtual aids." },
        { href: "/drills/physical/Balance-Training/stability-challenge", color: "purple", icon: <Heart className="w-4 h-4 text-purple-600" />, cat: "Physical", title: "Stability Challenge", desc: "Test static stabilization against changing vectors." },
        { href: "/drills/physical/Coordination/complex-pattern", color: "orange", icon: <Brain className="w-4 h-4 text-orange-600" />, cat: "Physical", title: "Complex Pattern Coordination", desc: "Synchronize visual and hand-tap responses." },
        { href: "/drills/physical/Coordination/cross-body-movement", color: "cyan", icon: <Star className="w-4 h-4 text-cyan-600" />, cat: "Physical", title: "Cross Body Movement", desc: "Click left/right visual targets alternately." },
        { href: "/drills/physical/Fitness/agility-ladder", color: "red", icon: <Zap className="w-4 h-4 text-red-600" />, cat: "Physical", title: "Agility Ladder", desc: "Practice rapid footwork and speed mapping." },
        { href: "/drills/physical/Fitness/jump-sequence", color: "teal", icon: <TrendingUp className="w-4 h-4 text-teal-600" />, cat: "Physical", title: "Jump Sequence", desc: "Coordinate vertical jumps with visual instructions." },
        { href: "/drills/physical/Fitness/speed-drill", color: "rose", icon: <Trophy className="w-4 h-4 text-rose-600" />, cat: "Physical", title: "Speed Drill", desc: "Test maximum acceleration and response time." }
    ]""",
    "productivity": """[
        { href: "/drills/productivity/focus-endurance/concentration-stamina", color: "blue", icon: <Timer className="w-4 h-4 text-blue-600" />, cat: "Productivity", title: "Concentration Stamina", desc: "Build focus stamina over extended sessions." },
        { href: "/drills/productivity/focus-endurance/deep-work", color: "green", icon: <Brain className="w-4 h-4 text-green-600" />, cat: "Productivity", title: "Deep Work Lab", desc: "Maintain focus ring inside tracking target." },
        { href: "/drills/productivity/focus-endurance/flow-state", color: "purple", icon: <Zap className="w-4 h-4 text-purple-600" />, cat: "Productivity", title: "Flow Induction", desc: "Calibrate performance with task-switching flow." },
        { href: "/drills/productivity/task-switching/context-switch", color: "orange", icon: <Activity className="w-4 h-4 text-orange-600" />, cat: "Productivity", title: "Context Switch", desc: "Switch sorting rules rapidly under pressure." },
        { href: "/drills/productivity/task-switching/multi-tasking", color: "cyan", icon: <Star className="w-4 h-4 text-cyan-600" />, cat: "Productivity", title: "Dual Target Flow", desc: "Handle multiple distinct tasks simultaneously." },
        { href: "/drills/productivity/task-switching/switch-cost", color: "red", icon: <TrendingUp className="w-4 h-4 text-red-600" />, cat: "Productivity", title: "Switch Cost Integrator", desc: "Analyze cognitive penalty of switching rules." },
        { href: "/drills/productivity/time-management/pomodoro-timer", color: "teal", icon: <Trophy className="w-4 h-4 text-teal-600" />, cat: "Productivity", title: "Pomodoro Sync", desc: "Time management using focus intervals." },
        { href: "/drills/productivity/time-management/priority-sorting", color: "rose", icon: <Target className="w-4 h-4 text-rose-600" />, cat: "Productivity", title: "Priority Sorting", desc: "Categorize tasks using Eisenhower matrix." }
    ]""",
    "visual": """[
        { href: "/drills/visual/depth-perception/distance-judgment", color: "blue", icon: <Target className="w-4 h-4 text-blue-600" />, cat: "Visual", title: "Distance Judgment", desc: "Intercept expanding circles at exact sizing overlap." },
        { href: "/drills/visual/peripheral-vision/peripheral-flash", color: "green", icon: <Eye className="w-4 h-4 text-green-600" />, cat: "Visual", title: "Peripheral Flash", desc: "Detect brief flashing numbers in visual periphery." },
        { href: "/drills/visual/peripheral-vision/wide-field", color: "purple", icon: <Star className="w-4 h-4 text-purple-600" />, cat: "Visual", title: "Wide Field Awareness", desc: "Calibrate wide-angle target identification." },
        { href: "/drills/visual/reaction-speed/go/no-go", color: "orange", icon: <Zap className="w-4 h-4 text-orange-600" />, cat: "Visual", title: "Chroma Sync", desc: "Respond to matching color indicators rapidly." },
        { href: "/drills/visual/reaction-speed/light-reaction", color: "cyan", icon: <Activity className="w-4 h-4 text-cyan-600" />, cat: "Visual", title: "Strobe Latency", desc: "Calibrate simple visual click reaction speed." },
        { href: "/drills/visual/reaction-speed/sound-reaction", color: "red", icon: <Volume2 className="w-4 h-4 text-red-600" />, cat: "Visual", title: "Neuro Switch", desc: "Click when sound and visual shapes align." },
        { href: "/drills/visual/tracking-accuracy/moving-target", color: "teal", icon: <TrendingUp className="w-4 h-4 text-teal-600" />, cat: "Visual", title: "Kinetic Intercept", desc: "Intercept rapidly moving target points." },
        { href: "/drills/visual/tracking-accuracy/pursuit-tracker", color: "rose", icon: <Trophy className="w-4 h-4 text-rose-600" />, cat: "Visual", title: "Auto Pursuit", desc: "Maintain cursor tracking on dynamic spline targets." }
    ]"""
}

# The bypassable rotate overlay JSX structure
BYPASSABLE_ROTATE_OVERLAY = """{isMobile && !isLandscape && !bypassMobile && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center z-[100] text-center p-6">
              <div className="w-16 h-16 mb-4 border border-red-500/30 bg-red-500/10 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold mb-2 font-mono uppercase tracking-wider">Rotate Device</h3>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-4">
                Please rotate your device to landscape mode to start this training drill.
              </p>
              <button 
                onClick={() => setBypassMobile(true)} 
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition shadow-md hover:shadow-lg active:scale-95"
              >
                Bypass & Play Anyway
              </button>
            </div>
          )}"""

STATE_INJECTION = """  const [isMobile, setIsMobile] = useState(false);
  const [bypassMobile, setBypassMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) || 
                     (window.innerWidth < 768 && 'ontouchstart' in window);
      setIsMobile(mobile);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    const handleOrientation = () => setTimeout(checkDevice, 100);
    window.addEventListener('orientationchange', handleOrientation);
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);"""

def find_container_tag_bounds(code):
    # Find ref={containerRef} or ref={gameContainerRef}
    match = re.search(r'ref=\{\s*(?:containerRef|gameContainerRef)\s*\}', code)
    if not match:
        return None
    
    ref_idx = match.start()
    
    # Walk backwards to find opening '<div'
    start_idx = -1
    for i in range(ref_idx, -1, -1):
        if code[i:i+4] == '<div' and (i == 0 or code[i-1].isspace() or code[i-1] in ['{', '>', ';']):
            start_idx = i
            break
            
    if start_idx == -1:
        return None
        
    # Walk forwards from start_idx to find the closing '>' of the tag
    brace_count = 0
    quote_char = None
    escape = False
    end_idx = -1
    
    for i in range(start_idx, len(code)):
        char = code[i]
        
        if escape:
            escape = False
            continue
        if char == '\\':
            escape = True
            continue
            
        if quote_char:
            if char == quote_char:
                quote_char = None
            continue
            
        if char in ['"', "'", '`']:
            quote_char = char
            continue
            
        if char == '{':
            brace_count += 1
        elif char == '}':
            brace_count -= 1
        elif char == '>' and brace_count == 0:
            end_idx = i + 1
            break
            
    if end_idx != -1:
        return start_idx, end_idx
    return None

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

def fix_imports(content):
    # 1. Add Link import if missing
    if "import Link from 'next/link'" not in content and 'import Link from "next/link"' not in content:
        # Insert after client directive
        if content.startswith("'use client';") or content.startswith('"use client";'):
            content = content.replace("'use client';", "'use client';\nimport Link from 'next/link';")
            content = content.replace('"use client";', '"use client";\nimport Link from "next/link";')
        else:
            content = "import Link from 'next/link';\n" + content
            
    # 2. Add icons to lucide-react import
    lucide_match = re.search(r'import\s*\{([^}]*)\}\s*from\s*[\x27\"]lucide-react[\x27\"];?', content)
    if lucide_match:
        imported_icons = [icon.strip() for icon in re.split(r'[\s,]+', lucide_match.group(1)) if icon.strip()]
        icons_to_add = ['Brain', 'Target', 'Trophy', 'Timer', 'Activity', 'Zap', 'Award', 'Star', 'Heart', 'TrendingUp', 'BookOpen', 'Keyboard', 'BarChart3', 'ArrowRight']
        for icon in icons_to_add:
            if icon not in imported_icons:
                imported_icons.append(icon)
        new_import = "import { " + ", ".join(imported_icons) + " } from 'lucide-react';"
        content = content.replace(lucide_match.group(0), new_import)
    return content

def refactor_file(filepath, cat):
    filename = os.path.basename(filepath)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content
    
    # 1. Fix imports first
    content = fix_imports(content)

    # 2. Default dark modes to true
    content = content.replace("const [isDarkMode, setIsDarkMode] = useState(false);", "const [isDarkMode, setIsDarkMode] = useState(true);")
    content = content.replace("const [isBoxDarkMode, setIsBoxDarkMode] = useState(false);", "const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);")
    content = content.replace("const [isInnerDarkMode, setIsInnerDarkMode] = useState(false);", "const [isInnerDarkMode, setIsInnerDarkMode] = useState(true);")

    # 3. Clean up existing helper definitions of StatCard, ResultCard, RC
    while True:
        content, r = remove_js_function(content, "StatCard")
        if not r: break
    while True:
        content, r = remove_js_function(content, "ResultCard")
        if not r: break
    while True:
        content, r = remove_js_function(content, "RC")
        if not r: break

    # Append premium definitions at the end
    content = content.rstrip()
    if content.endswith('}'):
        content += f"\n\n{PREMIUM_STATCARD}\n{PREMIUM_RC}\n"
    else:
        content += f"\n\n{PREMIUM_STATCARD}\n{PREMIUM_RC}"

    # 4. Update calls
    content = content.replace("isDark={isDarkMode}", "d={isDarkMode}")
    content = content.replace("isDark={isBoxDarkMode}", "d={isBoxDarkMode}")
    content = content.replace("isDark={isInnerDarkMode}", "d={isInnerDarkMode}")
    content = replace_result_cards(content)

    # 5. Inject mobile warning states if not present
    if "isMobile" not in content:
        # Inject right after containerRef declaration or first state
        state_match = re.search(r'const\s+\[[a-zA-Z0-9_]+,\s*set[a-zA-Z0-9_]+\]\s*=\s*useState\(', content)
        if state_match:
            content = content.replace(state_match.group(0), STATE_INJECTION + "\n  " + state_match.group(0))

    # 6. Inject/Replace mobile warning in JSX container
    bounds = find_container_tag_bounds(content)
    if bounds:
        start_idx, end_idx = bounds
        opening_tag = content[start_idx:end_idx]
        # Check if it already has Rotate Device warning or Desktop Required block
        # If it has Rotate Device warning, replace it or bypass it
        rotate_match = re.search(r'\{isMobile\s*&&\s*!isLandscape\s*&&\s*\([\s\S]*?Rotate Device[\s\S]*?</div>\s*\)\}', content)
        desktop_block_match = re.search(r'\{isMobile\s*&&\s*\([\s\S]*?Desktop Required[\s\S]*?</div>\s*\)\}', content)
        bypass_match = re.search(r'\{isMobile\s*&&\s*!bypassMobile\s*&&\s*\([\s\S]*?Desktop Required[\s\S]*?</div>\s*\)\}', content)
        
        if bypass_match:
            content = content.replace(bypass_match.group(0), BYPASSABLE_ROTATE_OVERLAY)
        elif rotate_match:
            content = content.replace(rotate_match.group(0), BYPASSABLE_ROTATE_OVERLAY)
        elif desktop_block_match:
            content = content.replace(desktop_block_match.group(0), BYPASSABLE_ROTATE_OVERLAY)
        else:
            # Inject right after opening tag
            content = content[:end_idx] + "\n          " + BYPASSABLE_ROTATE_OVERLAY + content[end_idx:]

    # 7. Clean up early returns `if (isMobile) return;` or `if(isMobile)return;`
    content = re.sub(r'if\s*\(\s*isMobile\s*\)\s*return\s*;?', 'if (isMobile && !bypassMobile && !isLandscape) return;', content)

    # 8. Add/replace Explore Related Drills
    related_list = RELATED_DRILLS.get(cat)
    if related_list:
        new_related_section = """{!isFullscreen && (
        <div className="mt-12 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Drills</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {__RELATED_LIST__.map((drill, index) => (
              <Link key={index} href={drill.href} className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      {drill.icon}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{drill.cat}</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>{drill.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{drill.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}""".replace('__RELATED_LIST__', related_list)

        # First, remove any existing related drills section
        existing_related_pattern = r'(?:\{\s*/\*\s*.*?RELATED DRILLS.*?\s*\*/\}\s*)?\{\s*!\s*isFullscreen\s*&&\s*\(\s*<(section|div)[^>]*>(?:(?!\{\s*!\s*isFullscreen)[\s\S])*?Explore Related[\s\S]*?<\/\1\s*>\s*\)\s*\}'
        content = re.sub(existing_related_pattern, '', content)

        # Next, find the very last footer match to insert the new related drills above it
        footer_matches = list(re.finditer(r'<footer\b', content))
        if footer_matches:
            last_match = footer_matches[-1]
            footer_idx = last_match.start()
            start_idx = footer_idx
            
            # Look backwards up to 100 characters for wrapping isFullscreen conditional
            back_window = content[max(0, footer_idx - 100):footer_idx]
            match_wrapper = re.search(r'\{\s*!\s*isFullscreen\s*&&\s*\(\s*$', back_window)
            if match_wrapper:
                start_idx = max(0, footer_idx - 100) + match_wrapper.start()
                
            content = content[:start_idx] + new_related_section + "\n      " + content[start_idx:]
        else:
            # Fallback: insert before the very last closing div tag of return
            return_match = re.search(r'return\s*\([\s\S]*?(\n\s*<\/div>\s*\);\s*\})', content)
            if return_match:
                content = content.replace(return_match.group(1), "\n      " + new_related_section + return_match.group(1))

    # 9. Make stats grid responsive
    # Replace grid-cols-6, 7, 8, etc. with responsive versions
    content = re.sub(
        r'className=(["\'])grid grid-cols-(\d+) gap-3 mb-4 h-\[88px\]\1',
        r'className=\1grid grid-cols-2 sm:grid-cols-4 md:grid-cols-\2 gap-2 sm:gap-3 mb-4 h-auto md:h-[88px]\1',
        content
    )
    content = re.sub(
        r'className=(["\'])grid grid-cols-(\d+) gap-4 mb-6\1',
        r'className=\1grid grid-cols-2 sm:grid-cols-4 md:grid-cols-\2 gap-2 sm:gap-4 mb-6 h-auto md:h-[88px]\1',
        content
    )
    
    # 10. Instant loading delay speedup
    content = content.replace("setTimeout(() => setLoading(false), 300)", "setTimeout(() => setLoading(false), 0)")
    content = content.replace("setTimeout(()=>setLoading(false),300)", "setTimeout(()=>setLoading(false),0)")

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [SUCCESS] Refactored: {filename}")
        return True
    return False

# Main Execution
print("=== Starting Category-Wide Refactoring ===")
cats = ["academic", "cognitive", "mental-fitness", "physical", "motor", "productivity", "visual"]
modified_count = 0
total_count = 0

for cat in cats:
    cat_dir = os.path.join(DRILLS_DIR, cat)
    if os.path.exists(cat_dir):
        print(f"\nProcessing category: {cat}")
        for root, dirs, files in os.walk(cat_dir):
            for f in files:
                if f.endswith('Client.js') and f not in EXCLUDED_FILES:
                    path = os.path.join(root, f)
                    total_count += 1
                    try:
                        if refactor_file(path, cat):
                            modified_count += 1
                    except Exception as e:
                        print(f"  [ERROR] {f}: {e}")

print(f"\n=== Refactoring Finished. Modified {modified_count} out of {total_count} files. ===")
