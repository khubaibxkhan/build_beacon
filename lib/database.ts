import {neon} from '@neondatabase/serverless';
export function db(){const url=process.env.DATABASE_URL;if(!url)return null;return neon(url)}
let ready:Promise<void>|null=null;
export function ensureDb(){if(!ready){ready=(async()=>{const sql=db();if(!sql)return;await sql`CREATE TABLE IF NOT EXISTS campus_events (id TEXT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`;await sql`CREATE TABLE IF NOT EXISTS campus_admins (email TEXT PRIMARY KEY, password_hash TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`})().catch(e=>{ready=null;throw e})}return ready}
