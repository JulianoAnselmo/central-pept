import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../drizzle/schema';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL não definida');

// `max: 1` necessário para serverless (Vercel/Neon) — evita pool overflow
const client = postgres(connectionString, { max: 1 });
export const db = drizzle(client, { schema });
