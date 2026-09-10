#!/usr/bin/env node
// PreToolUse:Edit|Write|MultiEdit hook — Debug2Fix "tool-limiting", hybrid mode.
//
// Blocks the FIRST source-code edit of a session ONLY when the recent transcript
// shows runtime-error evidence AND the debug-runtime subagent has not run yet.
// Docs, config, styles and non-code files are never blocked. Fails open on any
// internal error so a hook bug can never wedge editing.
//
// Escape hatch (simple deterministic bug, static analysis is conclusive):
//   node .claude/hooks/debug-gate.js ack <session_id>

const fs = require("fs");
const path = require("path");

const CODE_EXT = new Set([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"]);

const SIGNALS = [
  /\bTypeError\b/, /\bReferenceError\b/, /\bRangeError\b/,
  /is not a function/, /is not defined/, /Cannot read propert/,
  /Cannot access '.*' before initialization/, /undefined is not/, /null is not/,
  /Unhandled(?:PromiseRejection)?/, /\bERR_[A-Z_]+/, /ECONNREFUSED/,
  /[Hh]ydration failed/, /Text content does not match/, /Maximum call stack/,
  /Internal Server Error/, /\b500\b.*(?:Internal|error)/i, /Traceback \(most recent/,
  /\bat Object\.<anonymous>/, /digest: ?['"]?\d/, /Application error: a (?:client|server)/,
  /Warning: .*did not match/, /Each child in a list should have a unique/,
];

function stateDir(base) {
  return path.join(base, ".claude", ".debug-state");
}
function sanitize(s) {
  return String(s || "unknown").replace(/[^\w.-]/g, "_");
}

// --- manual ack subcommand -------------------------------------------------
if (process.argv[2] === "ack") {
  const base = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const dir = stateDir(base);
  const session = sanitize(process.argv[3]);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${session}.static-ack`), new Date().toISOString());
  console.log(`static-analysis ack recorded for session ${session}`);
  process.exit(0);
}

// --- hook mode -----------------------------------------------------------------
function readTail(file, bytes) {
  const fd = fs.openSync(file, "r");
  try {
    const size = fs.fstatSync(fd).size;
    const start = Math.max(0, size - bytes);
    const buf = Buffer.alloc(size - start);
    fs.readSync(fd, buf, 0, buf.length, start);
    return buf.toString("utf8");
  } finally {
    fs.closeSync(fd);
  }
}

function recentTranscriptText(transcriptPath) {
  try {
    const tail = readTail(transcriptPath, 200 * 1024);
    const lines = tail.split("\n").filter(Boolean).slice(-60);
    const chunks = [];
    for (const line of lines) {
      try {
        const ev = JSON.parse(line);
        chunks.push(JSON.stringify(ev.message ?? ev));
      } catch {
        chunks.push(line);
      }
    }
    return chunks.join("\n");
  } catch {
    return "";
  }
}

function main() {
  let payload = {};
  try {
    payload = JSON.parse(fs.readFileSync(0, "utf8"));
  } catch {
    process.exit(0);
  }

  const base = process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();
  const session = sanitize(payload.session_id);
  const dir = stateDir(base);

  // Already debugged or explicitly acked this session -> allow.
  if (
    fs.existsSync(path.join(dir, `${session}.debugged`)) ||
    fs.existsSync(path.join(dir, `${session}.static-ack`))
  ) {
    process.exit(0);
  }

  // Only gate real source files.
  const ti = payload.tool_input || {};
  const target = ti.file_path || ti.path || (Array.isArray(ti.edits) ? ti.file_path : "");
  if (!target) process.exit(0);
  const relRaw = path.relative(base, target).replace(/\\/g, "/");
  if (relRaw.startsWith(".claude/")) process.exit(0);
  if (!CODE_EXT.has(path.extname(target).toLowerCase())) process.exit(0);
  const rel =
    relRaw.startsWith("..") || path.isAbsolute(relRaw)
      ? path.basename(target)
      : relRaw;

  // Runtime-error evidence in recent context?
  const text = recentTranscriptText(payload.transcript_path || "");
  const hit = SIGNALS.some((re) => re.test(text));
  if (!hit) process.exit(0);

  const ackCmd = `node .claude/hooks/debug-gate.js ack ${session}`;
  const msg = [
    "BLOCKED by Debug2Fix runtime-debugging mandate.",
    "",
    `Runtime-error evidence is present in this session and no runtime investigation has been done yet. Editing "${rel}" before observing the actual failure is print-debugging by another name.`,
    "",
    "Do this first:",
    "  Task(subagent_type: \"debug-runtime\", prompt: <runtime question> + <reproduction: failing route/script/steps> + optional path/lines/variables)",
    "Apply the fix from its <debug_answer> evidence, then delegate again to verify.",
    "",
    "Override — ONLY for a simple deterministic bug that static analysis resolves conclusively:",
    `  ${ackCmd}`,
    "then retry the edit.",
  ].join("\n");

  process.stderr.write(msg + "\n");
  process.exit(2); // exit 2 => block, stderr shown to the agent
}

try {
  main();
} catch {
  process.exit(0); // fail open
}
