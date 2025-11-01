#!/usr/bin/env node

/**
 * Migration script to add resolved column and audit logs table
 * Run: pnpm migrate
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Load environment variables
config({ path: join(process.cwd(), '.env.local') });
config({ path: join(process.cwd(), '.env') });

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set');
    console.error('   Make sure you have a .env.local file with DATABASE_URL');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    console.log('📦 Reading migration file...');
    const migrationPath = join(process.cwd(), 'migrations', 'add-resolved-column-and-audit-logs.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    console.log('🚀 Running migration...');
    console.log(`   Database URL: ${databaseUrl.substring(0, 30)}...`);
    
    // Execute statements individually for better error handling
    // Split by semicolon, but handle multi-line statements
    const statements = migrationSQL
      .split(/\s*;\s*/)
      .map(s => s.trim())
      .filter(s => {
        // Filter out empty strings and comments
        if (!s || s.length === 0) return false;
        // Remove comment lines
        const lines = s.split('\n').filter(line => {
          const trimmed = line.trim();
          return trimmed.length > 0 && !trimmed.startsWith('--');
        });
        return lines.length > 0;
      })
      .map(s => s.split('\n').filter(line => !line.trim().startsWith('--')).join('\n').trim())
      .filter(s => s.length > 0);

    console.log(`   Found ${statements.length} statements to execute\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          const result = await sql.query(statement);
          const preview = statement.substring(0, 80).replace(/\n/g, ' ').replace(/\s+/g, ' ');
          console.log(`✓ [${i + 1}/${statements.length}] ${preview}...`);
        } catch (err) {
          // Ignore errors for "already exists" - these are fine
          const errorMessage = err instanceof Error ? err.message : String(err);
          if (errorMessage.includes('already exists') || 
              errorMessage.includes('duplicate') ||
              errorMessage.includes('already defined')) {
            const preview = statement.substring(0, 80).replace(/\n/g, ' ').replace(/\s+/g, ' ');
            console.log(`⚠️  [${i + 1}/${statements.length}] Skipped (already exists): ${preview}...`);
          } else {
            const preview = statement.substring(0, 80).replace(/\n/g, ' ').replace(/\s+/g, ' ');
            console.error(`❌ [${i + 1}/${statements.length}] Error: ${preview}...`);
            console.error(`   Error details: ${errorMessage}`);
            if (err && typeof err === 'object' && 'code' in err) {
              console.error(`   Error code: ${String(err.code)}`);
            }
            throw err;
          }
        }
      }
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('\nChanges applied:');
    console.log('  ✓ Added resolved column to leads table');
    console.log('  ✓ Created lead_audit_logs table');
    console.log('  ✓ Added indexes for performance');
    console.log('  ✓ Added created_at column to leads (if not exists)');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    process.exit(1);
  }
}

runMigration();
