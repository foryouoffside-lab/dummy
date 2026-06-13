import os
import re

drill_dir = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy\app\drills\fps"
client_files = []

for root, dirs, files in os.walk(drill_dir):
    for f in files:
        if f.endswith("Client.js") and f != "FPSHubClient.js":
            client_files.append(os.path.join(root, f))

print(f"Found {len(client_files)} files to refactor.")

def refactor_file(content, filename):
    # Skip if already refactored
    if "universalSens" in content and "currentTargetSize" in content and "const gameType = 'universal'" in content:
        print(f"-> {filename} already refactored. Skipping.")
        return content

    # 1. Remove game-specific and 3D states, variables, and constants
    content = re.sub(r"const\s*\[gameType\s*,\s*setGameType\].*?;", "", content)
    content = re.sub(r"const\s*\[dpi\s*,\s*setDpi\].*?;", "", content)
    content = re.sub(r"const\s*\[inGameSens\s*,\s*setInGameSens\].*?;", "", content)
    content = re.sub(r"const\s*\[cmPer360\s*,\s*setCmPer360\].*?;", "", content)
    content = re.sub(r"const\s*\[fovSimulator\s*,\s*setFovSimulator\].*?;", "", content)
    content = re.sub(r"const\s*\[fovAngle\s*,\s*setFovAngle\].*?;", "", content)
    content = re.sub(r"const\s*\[cameraYaw\s*,\s*setCameraYaw\].*?;", "", content)
    content = re.sub(r"const\s*\[cameraPitch\s*,\s*setCameraPitch\].*?;", "", content)
    content = re.sub(r"const\s*cameraYawRef\s*=\s*useRef\(.*?\);", "", content)
    content = re.sub(r"const\s*cameraPitchRef\s*=\s*useRef\(.*?\);", "", content)
    content = re.sub(r"const\s*sensitivityMultiplierRef\s*=\s*useRef\(.*?\);", "", content)
    
    # Remove GAME_YAWS completely
    content = re.sub(r"const\s*GAME_YAWS\s*=\s*\{.*?\};", "", content, flags=re.DOTALL)

    # 2. Insert new states and local stubs right after gameState state definition
    match_gs = re.search(r"const\s*\[gameState\s*,\s*setGameState\].*?;", content)
    if match_gs:
        idx = match_gs.end()
        stubs = """
  // Pure 2D Universal Standard States
  const [universalSens, setUniversalSens] = useState(1.0);
  const [currentTargetSize, setCurrentTargetSize] = useState(28);

  // Stubs to preserve telemetry and coaching dependencies
  const gameType = 'universal';
  const setGameType = () => {};
  const dpi = 800;
  const setDpi = () => {};
  const inGameSens = universalSens;
  const setInGameSens = setUniversalSens;
  const cmPer360 = (30 / universalSens).toFixed(1);
  const setCmPer360 = () => {};
  const sensitivityMultiplierRef = { current: universalSens };
  const fovSimulator = false;
  const setFovSimulator = () => {};
  const fovAngle = 103;
  const setFovAngle = () => {};
"""
        content = content[:idx] + stubs + content[idx:]

    # 3. Add auto-save useEffect right after our new states
    save_effect = """
  // Auto-save user preferences
  useEffect(() => {
    if (gameState === 'playing') return;
    try {
      localStorage.setItem('universalSens', universalSens.toString());
    } catch (e) {}
  }, [universalSens, gameState]);
"""
    # Insert right after sensitivityMultiplierRef stub
    match_stub = re.search(r"const\s*sensitivityMultiplierRef\s*=\s*\{\s*current:\s*universalSens\s*\};", content)
    if match_stub:
        idx = match_stub.end()
        content = content[:idx] + save_effect + content[idx:]

    # 4. Clean up mount useEffect to load universalSens instead of proSens/proDpi/proGame
    content = re.sub(
        r"const\s*savedDpi\s*=\s*localStorage\.getItem\('proDpi'\);.*?const\s*savedGame\s*=\s*localStorage\.getItem\('proGame'\);.*?if\s*\(savedGame\)\s*\{\s*setGameType\(savedGame\);\s*\}",
        "const savedSens = localStorage.getItem('universalSens');\n      if (savedSens) setUniversalSens(parseFloat(savedSens));",
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r"const\s*savedDpi\s*=\s*localStorage\.getItem\('proDpi'\);.*?const\s*savedSens\s*=\s*localStorage\.getItem\('proSens'\);.*?if\s*\(savedSens\)\s*\{\s*setInGameSens\(parseFloat\(savedSens\)\);\s*\}",
        "const savedSens = localStorage.getItem('universalSens');\n      if (savedSens) setUniversalSens(parseFloat(savedSens));",
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r"const\s*savedSens\s*=\s*localStorage\.getItem\('proSens'\);.*?if\s*\(savedSens\)\s*\{\s*setInGameSens\(parseFloat\(savedSens\)\);\s*\}",
        "const savedSens = localStorage.getItem('universalSens');\n      if (savedSens) setUniversalSens(parseFloat(savedSens));",
        content,
        flags=re.DOTALL
    )
    # Generic load cleanup for other variations
    content = re.sub(
        r"const\s*savedSens\s*=\s*localStorage\.getItem\([^)]+\);.*?if\s*\(savedSens\)\s*\{\s*setInGameSens[^}]+\}",
        "const savedSens = localStorage.getItem('universalSens');\n      if (savedSens) setUniversalSens(parseFloat(savedSens));",
        content,
        flags=re.DOTALL
    )

    # Remove old proSens auto-save useEffects completely
    content = re.sub(
        r"useEffect\(\(\)\s*=>\s*\{\s*if\s*\(gameState\s*===\s*'playing'\)\s*return;.*?localStorage\.setItem\('proSens',.*?\s*\},\s*\[inGameSens,\s*dpi,\s*gameType,\s*gameState\]\);",
        "",
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r"useEffect\(\(\)\s*=>\s*\{\s*if\s*\(gameState\s*===\s*'playing'\)\s*return;.*?localStorage\.setItem\('proSens',.*?\s*\},\s*\[[^\]]*\]\);",
        "",
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r"useEffect\(\(\)\s*=>\s*\{\s*if\s*\(gameState\s*===\s*'playing'\)\s*return;.*?localStorage\.setItem\('[^']+',\s*inGameSens.*?\}\s*,\s*\[[^\]]*\]\s*\);",
        "",
        content,
        flags=re.DOTALL
    )
    # Generic sensitivity compute useEffect clean
    content = re.sub(
        r"useEffect\(\(\)\s*=>\s*\{\s*const\s*yaw\s*=.*?\},\s*\[dpi,\s*inGameSens(?:,\s*gameType)?\]\);",
        "",
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r"useEffect\(\(\)\s*=>\s*\{\s*const\s*yaw\s*=.*?\},\s*\[[^\]]*\]\s*\);",
        "",
        content,
        flags=re.DOTALL
    )

    # 5. Standardize Pointer Lock movement logic (2D mouse translation)
    # Look for the mouse listener and coordinate updates
    # Option A: dx, dy updates
    content = re.sub(
        r"const\s*sens\s*=\s*(?:sensitivityMultiplierRef\.current|inGameSens);?\s*const\s*dx\s*=\s*\(e\.movementX\s*\|\|\s*0\)\s*\*\s*sens;?\s*const\s*dy\s*=\s*\(e\.movementY\s*\|\|\s*0\)\s*\*\s*sens;?\s*virtualCrosshair\.current\.x\s*\+=\s*dx;?\s*virtualCrosshair\.current\.y\s*\+=\s*dy;?",
        "const dx = (e.movementX || 0) * universalSens;\n      const dy = (e.movementY || 0) * universalSens;\n      virtualCrosshair.current.x += dx;\n      virtualCrosshair.current.y += dy;",
        content
    )
    # Option B: direct updates
    content = re.sub(
        r"const\s*sens\s*=\s*(?:sensitivityMultiplierRef\.current|inGameSens);?\s*virtualCrosshair\.current\.x\s*\+=\s*\(e\.movementX\s*\|\|\s*0\)\s*\*\s*sens;?\s*virtualCrosshair\.current\.y\s*\+=\s*\(e\.movementY\s*\|\|\s*0\)\s*\*\s*sens;?",
        "const dx = (e.movementX || 0) * universalSens;\n      const dy = (e.movementY || 0) * universalSens;\n      virtualCrosshair.current.x += dx;\n      virtualCrosshair.current.y += dy;",
        content
    )
    
    # Ensure standard bounding constraint follows
    content = re.sub(
        r"virtualCrosshair\.current\.x\s*=\s*Math\.max\(0,\s*Math\.min\(c\.width,\s*virtualCrosshair\.current\.x\)\);?\s*virtualCrosshair\.current\.y\s*=\s*Math\.max\(0,\s*Math\.min\(c\.height,\s*virtualCrosshair\.current\.y\)\);?",
        "virtualCrosshair.current.x = Math.max(0, Math.min((c?.width || cvs?.width || 800), virtualCrosshair.current.x));\n      virtualCrosshair.current.y = Math.max(0, Math.min((c?.height || cvs?.height || 450), virtualCrosshair.current.y));",
        content
    )

    # 6. Replace crosshair drawing code with exact Sniper Scope reticle
    # Find crosshair rendering blocks and replace
    ch_draw_pattern = r"if\s*\(\s*virtualCrosshair\.current\.x\s*>\s*0\s*&&\s*virtualCrosshair\.current\.x\s*<\s*cvs\.width.*?(?=if\s*\(!pointerLocked|if\s*\(!isLocked|//|const|let|ctx\.restore)"
    # We will search for if (virtualCrosshair.current.x > 0) or if (ch.x > 0)
    # and replace with the exact Sniper Scope reticle code block
    
    sniper_scope_reticle = """const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        const activeColor = pointerLocked ? '#00ff88' : '#ffbb00';
        ctx.strokeStyle = activeColor;
        
        // Outer Scope Ring
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 20, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Scope Crosshairs
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        const innerGap = 8;
        ctx.moveTo(ch.x, ch.y - 20); ctx.lineTo(ch.x, ch.y - innerGap); // Top
        ctx.moveTo(ch.x, ch.y + 20); ctx.lineTo(ch.x, ch.y + innerGap); // Bottom
        ctx.moveTo(ch.x - 20, ch.y); ctx.lineTo(ch.x - innerGap, ch.y); // Left
        ctx.moveTo(ch.x + 20, ch.y); ctx.lineTo(ch.x + innerGap, ch.y); // Right
        ctx.stroke();
        
        // Center Dot
        ctx.fillStyle = activeColor;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
      }
      """
      
    # Try replacing standard crosshair pattern
    content = re.sub(
        r"if\s*\(\s*(?:virtualCrosshair\.current|ch|crosshair)\.x\s*>\s*0\s*&&.*?(?:ctx\.stroke\(\)|ctx\.fill\(\)|fill\(\))\s*;?\s*\}",
        sniper_scope_reticle,
        content,
        flags=re.DOTALL
    )

    # 7. Remove trajectory trail drawing from drawing loop
    # We remove blocks drawing trail history
    content = re.sub(
        r"//\s*Draw\s+Trajectory\s+Trail.*?(?=const\s+ch\s*=|const\s+crosshair\s*=|\n\s*if\s*\()",
        "",
        content,
        flags=re.DOTALL | re.IGNORECASE
    )
    content = re.sub(
        r"//\s*Draw\s+trail.*?(?=const\s+ch\s*=|const\s+crosshair\s*=|\n\s*if\s*\()",
        "",
        content,
        flags=re.DOTALL | re.IGNORECASE
    )

    # 8. Remove on-canvas click-to-capture text helper
    content = re.sub(
        r"if\s*\(!pointerLocked\)\s*\{\s*ctx\.fillStyle\s*=\s*'rgba\(8,\s*13,\s*26,\s*0\.85\)'.*?\}\s*\}",
        "",
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r"if\s*\(!pointerLocked\)\s*\{\s*ctx\.fillStyle\s*=\s*['\"]rgba\(8,\s*13,\s*26,\s*0\.\d+\)['\"].*?\}",
        "",
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r"if\s*\(!pointerLocked\)\s*\{.*?CLICK\s+CANVAS\s+TO\s+CAPTURE.*?\}",
        "",
        content,
        flags=re.DOTALL | re.IGNORECASE
    )

    # 9. Calibration UI block replacement
    h_match = re.search(r"<h[23][^>]*>(?:(?!</h[23]>).)*?(?:CALIBRATE|Calibration|CALIBRATION|MATCH COORDINATION INDEX|STANDARDIZE SENSITIVITY).*?</h[23]>", content, re.DOTALL | re.IGNORECASE)
    if not h_match:
        h_match = re.search(r"<h[23][^>]*>(?:(?!</h[23]>).)*?(?:Calculator|Cpu|TrendingUp).*?</h[23]>", content, re.DOTALL | re.IGNORECASE)
        
    if h_match:
        start_idx = h_match.end()
        btn_match = re.search(r"<div\s+className=['\"]mt-[68]\s+flex", content[start_idx:])
        if btn_match:
            end_idx = start_idx + btn_match.start()
            
            sliders_block = """
                  <div className="mb-6 p-4 bg-slate-950/45 rounded border border-slate-900">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Sensitivity</label>
                      <span className="text-red-400 font-mono text-xs font-bold">{universalSens.toFixed(2)}x</span>
                    </div>
                    <input type="range" min="0.1" max="3.0" step="0.05" value={universalSens} onChange={(e) => setUniversalSens(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg accent-red-500 cursor-pointer" />
                  </div>

                  <div className="mb-6 p-4 bg-slate-950/45 rounded border border-slate-900">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Target Size</label>
                      <span className="text-red-400 font-mono text-xs font-bold">{currentTargetSize}px</span>
                    </div>
                    <input type="range" min="10" max="50" step="2" value={currentTargetSize} onChange={(e) => setCurrentTargetSize(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg accent-red-500 cursor-pointer" />
                  </div>
                </div>
                """
            content = content[:start_idx] + sliders_block + content[end_idx:]

    return content

print(f"Refactoring all client files...")
for filepath in client_files:
    rel = os.path.relpath(filepath, drill_dir)
    print(f"Refactoring {rel}...")
    with open(filepath, "r", encoding="utf-8") as f:
        orig = f.read()
    
    refactored = refactor_file(orig, rel)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(refactored)

print("All client files refactored!")
