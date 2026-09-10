#!/usr/bin/env node
// PostToolUse:Task hook. When the debug-runtime subagent finishes, drop a
// per-session marker so debug-gate.js stops blocking source edits.
const fs = require("fs");
const path = require("path");

function main() {
  let raw = "";
  try {
    raw = fs.readFileSync(0, "utf8");
  } catch {
    process.exit(0);
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const subagent =
    payload?.tool_input?.subagent_type || payload?.tool_input?.subagentType;
  if (subagent !== "debug-runtime") process.exit(0);

  const base = process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();
  const dir = path.join(base, ".claude", ".debug-state");
  const session = String(payload.session_id || "unknown").replace(/[^\w.-]/g, "_");

  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${session}.debugged`), new Date().toISOString());
  } catch {
    // fail open
  }
  process.exit(0);
}

main();
