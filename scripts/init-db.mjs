import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import pg from "pg";

const { Pool } = pg;

async function loadEnvFileIfPresent(filePath) {
  try {
    const content = await readFile(filePath, "utf8");
    const lines = content.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }
      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex <= 0) {
        continue;
      }
      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // Ignore missing env files.
  }
}

await loadEnvFileIfPresent(path.join(process.cwd(), ".env.local"));
await loadEnvFileIfPresent(path.join(process.cwd(), ".env"));

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is required. Set it in .env.local/.env or pass it in the shell.",
  );
}

const pool = new Pool({ connectionString });

try {
  const schemaPath = path.join(process.cwd(), "db", "schema.sql");
  const sql = await readFile(schemaPath, "utf8");
  await pool.query(sql);
  console.log("Database initialized with survey and analytics schemas.");
} finally {
  await pool.end();
}
