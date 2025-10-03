#!/usr/bin/env node

import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error('DATABASE_URL must be set to run migrations.');
    process.exit(1);
}

const sql = neon(databaseUrl);

const migrationFiles = [
    'migrations/20250205_create_blog_posts.sql',
    'migrations/20250206_patch_blog_posts_columns.sql',
    'migrations/20250206_transform_existing_blog_posts.sql',
];

async function applyMigration(filePath) {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const statements = await readFile(absolutePath, 'utf8');

    if (!statements.trim()) {
        console.log(`Skipping ${filePath} (empty file).`);
        return;
    }

    console.log(`Applying ${filePath}...`);
    await sql.unsafe(statements);
    console.log(`✔ Applied ${filePath}`);
}

async function main() {
    for (const file of migrationFiles) {
        try {
            await applyMigration(file);
        } catch (error) {
            console.error(`✖ Failed to apply ${file}:`, error);
            process.exit(1);
        }
    }

    console.log('All blog migrations applied successfully.');
}

main();
