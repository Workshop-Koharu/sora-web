import pg from "pg";
const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.ulgoztichdbwuhgrcsjw:sora-bot*3123@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres";

// Use global singleton for Next.js hot-reloading & serverless
let pool: pg.Pool;

declare global {
  // eslint-disable-next-line no-var
  var __supabase_pg_pool__: pg.Pool | undefined;
}

if (!global.__supabase_pg_pool__) {
  global.__supabase_pg_pool__ = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
}
pool = global.__supabase_pg_pool__;

export const dbPool = pool;
