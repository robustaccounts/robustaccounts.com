#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Load environment variables
config({ path: join(process.cwd(), '.env.local') });
config({ path: join(process.cwd(), '.env') });

async function addTrigger() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    console.log('🚀 Creating trigger function and trigger...');
    
    // Create function
    await sql.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER
      LANGUAGE plpgsql
      AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$;
    `);
    console.log('✓ Function created');

    // Drop trigger if exists
    await sql.query(`DROP TRIGGER IF EXISTS update_leads_updated_at ON leads`);
    console.log('✓ Dropped existing trigger (if any)');

    // Create trigger
    await sql.query(`
      CREATE TRIGGER update_leads_updated_at
      BEFORE UPDATE ON leads
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column()
    `);
    console.log('✓ Trigger created');
    
    console.log('✅ Trigger setup completed successfully!');
  } catch (error) {
    console.error('❌ Failed to create trigger:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    process.exit(1);
  }
}

addTrigger();

