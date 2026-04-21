import { Pool, type PoolClient, type QueryResultRow } from "pg";

declare global {
  var __hazelnutPool: Pool | undefined;
}

function getPool() {
  if (global.__hazelnutPool) {
    return global.__hazelnutPool;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to run survey APIs.");
  }

  const pool = new Pool({ connectionString });
  if (process.env.NODE_ENV !== "production") {
    global.__hazelnutPool = pool;
  }
  return pool;
}

export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function query<T extends QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  const pool = getPool();
  return pool.query<T>(text, params);
}
