import { neon } from '@neondatabase/serverless';

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

async function runMigration() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('❌ DATABASE_URL is not set in environment (.env)');
        process.exit(1);
    }
    const sql = neon(databaseUrl);

    console.log('Running blog table migration...');

    try {
        const migrationPath = path.join(
            process.cwd(),
            'migrations',
            'create-blogs-table.sql',
        );
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        // Split multiple statements and run sequentially
        const statements = migrationSQL
            .split(';')
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

        for (const stmt of statements) {
            await sql.query(stmt);
        }

        console.log('✅ Blog table created successfully!');
    } catch (error) {
        console.error('❌ Error running migration:', error);
        process.exit(1);
    }
}

runMigration();
