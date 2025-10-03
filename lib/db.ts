import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set in environment variables.');
}

export const sql = neon(databaseUrl);

export type SqlClient = typeof sql;
