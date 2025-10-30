#!/usr/bin/env node

/**
 * Test script to create a test lead and send reminder/reschedule emails
 * Run from robustaccounts.com directory: pnpm test:emails
 */

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables
config({ path: join(process.cwd(), '.env.local') });
config({ path: join(process.cwd(), '.env') });

const TEST_EMAIL = 'developer.piyushgambhir@gmail.com';

async function createTestLead() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    // Dynamically import email functions after env is loaded
    const { sendAppointmentReminderEmail, sendRescheduleEmail } = await import('../lib/email');
    const { generateRescheduleToken } = await import('../lib/reschedule-token');

    console.log('📝 Creating test lead...');
    
    // Create an appointment for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0); // 2 PM ET

    const result = await sql`
      INSERT INTO leads (
        first_name,
        last_name,
        email,
        phone,
        country_code,
        business_name,
        industry,
        message,
        appointment_datetime,
        resolved
      ) VALUES (
        'Test',
        'Lead',
        ${TEST_EMAIL},
        '5551234567',
        '+1',
        'Test Business',
        'technology',
        'This is a test lead for reminder and reschedule email testing',
        ${tomorrow.toISOString()},
        false
      )
      RETURNING id, first_name, last_name, email, appointment_datetime
    `;

    const lead = result[0];
    console.log('✅ Test lead created:', lead);

    // Send reminder email
    console.log('\n📧 Sending reminder email...');
    const appointmentDate = new Date(lead.appointment_datetime);
    const appointmentDateStr = appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const appointmentTimeStr = formatter.format(appointmentDate);

    const reminderResult = await sendAppointmentReminderEmail({
      firstName: lead.first_name,
      lastName: lead.last_name,
      email: lead.email,
      appointmentDate: appointmentDateStr,
      appointmentTime: appointmentTimeStr,
      appointmentTimezone: 'ET',
      leadId: lead.id,
    });

    if (reminderResult.sent) {
      console.log('✅ Reminder email sent successfully!');
    } else {
      console.log('⚠️  Reminder email failed:', reminderResult.reason);
    }

    // Create a past appointment for reschedule email testing
    console.log('\n📝 Creating test lead with past appointment for reschedule email...');
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    pastDate.setHours(14, 0, 0, 0);

    const pastLeadResult = await sql`
      INSERT INTO leads (
        first_name,
        last_name,
        email,
        phone,
        country_code,
        business_name,
        industry,
        message,
        appointment_datetime,
        resolved
      ) VALUES (
        'Test',
        'Reschedule',
        ${TEST_EMAIL},
        '5551234567',
        '+1',
        'Test Business',
        'technology',
        'This is a test lead for reschedule email testing',
        ${pastDate.toISOString()},
        false
      )
      RETURNING id, first_name, last_name, email
    `;

    const pastLead = pastLeadResult[0];
    console.log('✅ Test lead with past appointment created:', pastLead);

    // Send reschedule email
    console.log('\n📧 Sending reschedule email...');
    const token = await generateRescheduleToken(pastLead.id);

    const rescheduleResult = await sendRescheduleEmail({
      firstName: pastLead.first_name,
      lastName: pastLead.last_name,
      email: pastLead.email,
      leadId: pastLead.id,
      rescheduleToken: token,
    });

    if (rescheduleResult.sent) {
      console.log('✅ Reschedule email sent successfully!');
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://robustaccounts.com';
      console.log(`   Reschedule link: ${baseUrl}/reschedule/${token}`);
    } else {
      console.log('⚠️  Reschedule email failed:', rescheduleResult.reason);
    }

    console.log('\n✅ Test complete!');
    console.log(`📧 Check your inbox at ${TEST_EMAIL}`);
    console.log(`\nTest leads created:`);
    console.log(`  - Lead ID ${lead.id}: Appointment tomorrow (reminder email sent)`);
    console.log(`  - Lead ID ${pastLead.id}: Past appointment (reschedule email sent)`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

createTestLead();
