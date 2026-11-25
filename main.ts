// Fortune Cookie for the Liquidated Trader — make.fun entry.
// Writes one fortune cookie line for a crypto trader who was just
// liquidated: oracular on the surface, rueful underneath.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const FORTUNE =
  "The stars say your portfolio will rise again. They did not say whose portfolio.";

function entryPath(argv: string[]): string {
  const target = argv[2];
  if (!target) return "/output/entry.txt";
  return target.endsWith(".txt") ? target : join(target, "entry.txt");
}

function main(): void {
  const words = FORTUNE.trim().split(/\s+/).length;
  if (FORTUNE.length < 1 || FORTUNE.length > 160) {
    throw new Error(`fortune must be 1-160 characters, got ${FORTUNE.length}`);
  }
  if (words > 20) {
    throw new Error(`fortune must be at most 20 words, got ${words}`);
  }
  const out = entryPath(process.argv);
  mkdirSync(dirname(out), { recursive: true });
  // No trailing newline: the file is the fortune itself, exactly as judged.
  writeFileSync(out, FORTUNE, "utf8");
  console.log(`wrote ${out} (${FORTUNE.length} characters, ${words} words)`);
}

main();
