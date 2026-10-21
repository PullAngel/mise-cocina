import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const markdownFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "TRADEMARKS.md",
  "ROADMAP.md",
  "CHANGELOG.md",
  "docs/README.md",
  "docs/PRODUCT_BRIEF.md",
  "docs/releases/v0.4.1.md"
];

const failures = [];
let checked = 0;

function checkTarget(from, target) {
  if (/^(https?:|mailto:|#)/.test(target)) return;
  const clean = decodeURIComponent(target.split("#")[0]);
  if (!clean) return;
  checked += 1;
  const absolute = resolve(root, dirname(from), clean);
  if (!existsSync(absolute)) failures.push(`${from} → ${target}`);
}

for (const file of markdownFiles) {
  const content = readFileSync(resolve(root, file), "utf8");
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) checkTarget(file, match[1]);
}

const htmlFile = "website/index.html";
const html = readFileSync(resolve(root, htmlFile), "utf8");
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) checkTarget(htmlFile, match[1]);

if (failures.length) {
  console.error("Referencias públicas rotas:\n" + failures.map(item => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Referencias públicas verificadas: ${checked}`);
