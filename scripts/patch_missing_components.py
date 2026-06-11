import os

project_dir = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy"
drills_dir = os.path.join(project_dir, "app", "drills")

# Premium Component Definitions
stat_card_new = """

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`group rounded-xl border p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] ${isDark ? 'bg-gray-800/90 border-gray-700/80 hover:border-blue-500/40 text-white' : 'bg-white/90 border-gray-100/80 hover:border-blue-400/40 text-gray-900'} backdrop-blur-sm`}>
      <div className="mb-0.5 flex justify-center text-blue-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{icon}</div>
      <p className="text-xs sm:text-base md:text-lg font-extrabold tracking-tight truncate">{value}<span className="text-[10px] sm:text-xs font-semibold ml-0.5 opacity-80">{unit}</span></p>
      <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 truncate">{label}</p>
    </div>
  );
}
"""

result_card_new = """

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
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
}
"""

rc_new = """

function RC({ label, v, unit = '', i, c, d }) {
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
}
"""

patched_count = 0

for root, dirs, files in os.walk(drills_dir):
    if "fps" in root.replace(project_dir, "").split(os.sep):
        continue
    for f in files:
        if f.endswith('Client.js') or (f == 'page.js' and 'reaction-time' in root):
            filepath = os.path.join(root, f)
            try:
                with open(filepath, 'r', encoding='utf-8') as file_obj:
                    code = file_obj.read()
                
                modified = False
                
                # Check if StatCard is used in JSX but function StatCard is not defined
                if "<StatCard" in code and "function StatCard(" not in code:
                    code += stat_card_new
                    modified = True
                    print(f"Patched StatCard in {f}")
                    
                # Check if ResultCard is used in JSX but function ResultCard is not defined
                if "<ResultCard" in code and "function ResultCard(" not in code:
                    code += result_card_new
                    modified = True
                    print(f"Patched ResultCard in {f}")
                    
                # Check if RC is used in JSX but function RC is not defined
                if "<RC" in code and "function RC(" not in code:
                    code += rc_new
                    modified = True
                    print(f"Patched RC in {f}")
                
                if modified:
                    with open(filepath, 'w', encoding='utf-8') as file_obj:
                        file_obj.write(code)
                    patched_count += 1
            except Exception as e:
                print(f"Error patching {f}: {e}")

print(f"\nCompleted patching. Patched files count: {patched_count}")
