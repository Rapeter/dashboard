import { readFile } from "node:fs/promises";
import path from "node:path";
import { query } from "@/lib/db/client";

let schemaReady = false;

export async function ensureSchema() {
  if (schemaReady) {
    return;
  }

  const schemaPath = path.join(process.cwd(), "db", "schema.sql");
  const sql = await readFile(schemaPath, "utf8");
  await query(sql);
  schemaReady = true;
}
