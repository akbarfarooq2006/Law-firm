/**
 * Loads .env.local / .env into process.env BEFORE any other module
 * initializes (import side effects run in import order).
 * tsx doesn't run Next.js, so Next-style env loading isn't available here.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

function loadEnvFile(file: string): void {
  const full = path.resolve(process.cwd(), file);
  if (!existsSync(full)) return;
  for (const line of readFileSync(full, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!match) continue;
    const key = match[1];
    const value = match[2].replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");
