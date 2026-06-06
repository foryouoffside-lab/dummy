import os
import re

drill_dir = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy\app\drills\fps"
subdirs = [d for d in os.listdir(drill_dir) if os.path.isdir(os.path.join(drill_dir, d))]

def find_matching_bracket(text, start_idx, open_char="(", close_char=")"):
    count = 0
    for idx in range(start_idx, len(text)):
        if text[idx] == open_char:
            count += 1
        elif text[idx] == close_char:
            count -= 1
            if count == 0:
                return idx
    return -1

def find_matching_tag_end(text, start_idx):
    idx = start_idx
    open_count = 0
    while idx < len(text):
        if text[idx:idx+4] == "<div":
            # Find the closing '>' of this opening tag, skipping JSX curly braces {...}
            scan_idx = idx + 4
            brace_count = 0
            is_self_closing = False
            while scan_idx < len(text):
                char = text[scan_idx]
                if char == "{":
                    brace_count += 1
                elif char == "}":
                    brace_count -= 1
                elif char == ">" and brace_count == 0:
                    # Found the closing '>' of the tag!
                    # Check if it was self-closing (character right before '>' is '/')
                    lookback_idx = scan_idx - 1
                    while lookback_idx > idx and text[lookback_idx].isspace():
                        lookback_idx -= 1
                    if text[lookback_idx] == "/":
                        is_self_closing = True
                    break
                scan_idx += 1
            
            if is_self_closing:
                idx = scan_idx + 1
                continue
            
            open_count += 1
            idx = scan_idx + 1
        elif text[idx:idx+6] == "</div>":
            open_count -= 1
            if open_count == 0:
                return idx + 6
            idx += 6
        else:
            idx += 1
    return -1

def refactor_client_file(fpath):
    with open(fpath, "r", encoding="utf-8") as f:
        code = f.read()

    # Find canvas index
    canvas_idx = code.find("<canvas ref={canvasRef}")

    # 1. Replace setTimeout pointer lock block with synchronous version
    timeout_pattern = r"setTimeout\s*\(\s*\(\s*\)\s*=>\s*\{\s*requestPointerLock\(\s*\)\s*;?\s*([a-zA-Z0-9_]+)\.current\s*=\s*true\s*;?\s*\}\s*,\s*150\s*\);?"
    sync_replacement = r"""if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    \1.current = true;"""
    code = re.sub(timeout_pattern, sync_replacement, code)

    # 2. Refactor start overlay block
    start_match = re.search(r"\{gameState\s*===\s*['\"]start['\"]\s*&&\s*\(", code)
    if start_match:
        start_idx = start_match.start()
        paren_start = code.find("(", start_idx)
        paren_end = find_matching_bracket(code, paren_start, "(", ")")
        if paren_end != -1:
            inner = code[paren_start + 1 : paren_end]
            wrapped = f'\n          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">\n            {inner.strip()}\n          </div>\n        '
            code = code[:paren_start + 1] + wrapped + code[paren_end:]

    # 3. Refactor gameOver overlay block
    game_over_match = re.search(r"\{gameState\s*===\s*['\"]gameOver['\"]\s*&&\s*\(", code)
    if game_over_match:
        go_idx = game_over_match.start()
        paren_start = code.find("(", go_idx)
        paren_end = find_matching_bracket(code, paren_start, "(", ")")
        if paren_end != -1:
            inner = code[paren_start + 1 : paren_end]
            wrapped = f'\n          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">\n            {inner.strip()}\n          </div>\n        '
            code = code[:paren_start + 1] + wrapped + code[paren_end:]

    # Find canvas index again (after potential length changes)
    canvas_idx = code.find("<canvas ref={canvasRef}")

    # 4. Modify playing screen container and HUD positioning
    # Extract HUD first
    hud_pattern = r"(<div\s+className=['\"]grid\s+grid-cols-[34]\s+gap-4\s+mb-4\s+text-xs\s+font-mono\s+relative\s+z-20['\"]>)"
    hud_match = re.search(hud_pattern, code)
    hud_block = ""
    if hud_match:
        hud_start = hud_match.start()
        tag_end = find_matching_tag_end(code, hud_start)
        if tag_end != -1:
            hud_block = code[hud_start : tag_end]
            code = code[:hud_start] + code[tag_end:]

    # Make playing screen wrapper always mounted block
    if "gameState === 'playing' ? 'block' : 'hidden'" in code:
        code = code.replace("<div className={gameState === 'playing' ? 'block' : 'hidden'}>", '<div className="block">')
    elif 'gameState === "playing" ? "block" : "hidden"' in code:
        code = code.replace('<div className={gameState === "playing" ? "block" : "hidden"}>', '<div className="block">')
    else:
        # It uses conditional {gameState === 'playing' && (
        # Find the specific match that wraps the canvas!
        matches = list(re.finditer(r"\{gameState\s*===\s*['\"]playing['\"]\s*&&\s*\(", code))
        for m in matches:
            start_idx = m.start()
            paren_start = code.find("(", start_idx)
            paren_end = find_matching_bracket(code, paren_start, "(", ")")
            if paren_end != -1 and start_idx < canvas_idx < paren_end:
                # Replace ONLY this conditional match with {true && (
                code = code[:start_idx] + "{true && (" + code[paren_start + 1:]
                break

    # Now insert HUD inside containerRef (right after canvas tag)
    if hud_block:
        hud_modified = re.sub(
            r"className=['\"]grid\s+grid-cols-([34])\s+gap-4\s+mb-4\s+text-xs\s+font-mono\s+relative\s+z-20['\"]",
            r"className='absolute top-4 left-4 right-4 grid grid-cols-\1 gap-4 text-xs font-mono z-20 pointer-events-none'",
            hud_block
        )
        canvas_pattern = r"(<canvas[^>]*ref=\{canvasRef\}[^>]*>)"
        canvas_match = re.search(canvas_pattern, code)
        if canvas_match:
            canvas_end = canvas_match.end()
            wrapped_hud = f"\n            {{gameState === 'playing' && (\n              {hud_modified.strip()}\n            )}}\n"
            code = code[:canvas_end] + wrapped_hud + code[canvas_end:]

    # 5. Move AI coach overlay position from top-4 to top-24 to prevent overlap
    code = re.sub(
        r"className=['\"]absolute\s+top-4\s+left-4\s+bg-slate-950/90",
        r'className="absolute top-24 left-4 bg-slate-950/90',
        code
    )

    return code

print("Starting precise refactor for all 16 client components...")
for sd in subdirs:
    sd_path = os.path.join(drill_dir, sd)
    for f in os.listdir(sd_path):
        if f.endswith("Client.js"):
            path = os.path.join(sd_path, f)
            print(f"Refactoring {sd}/{f}...")
            # Backup first
            with open(path, "r", encoding="utf-8") as file:
                backup_content = file.read()
            with open(path + ".bak", "w", encoding="utf-8") as file:
                file.write(backup_content)
            
            try:
                refactored_content = refactor_client_file(path)
                with open(path, "w", encoding="utf-8") as file:
                    file.write(refactored_content)
                print(f"Successfully refactored {sd}/{f}")
            except Exception as e:
                print(f"Error refactoring {sd}/{f}: {e}")
                # Restore
                with open(path, "w", encoding="utf-8") as file:
                    file.write(backup_content)

print("\nRefactor completed.")
