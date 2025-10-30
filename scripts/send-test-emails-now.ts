#!/usr/bin/env node

/**
 * Quick script to send reminder and reschedule emails right now
 * Run: pnpm tsx scripts/send-test-emails-now.ts
 */

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables
config({ path: join(process.cwd(), '.env.local') });
config({ path: join(process.cwd(), '.env') });

const TEST_EMAIL = 'developer.piyushgambhir@gmail.com';

async function sendTestEmails() {
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

    console.log('📧 Sending test emails...\n');

    // Find or create a lead with appointment tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0);

    let reminderLead = await sql`
      SELECT id, first_name, last_name, email, appointment_datetime
      FROM leads
      WHERE email = ${TEST_EMAIL}
      AND appointment_datetime >= ${tomorrow.toISOString()}
      AND resolved = false
      ORDER BY appointment_datetime ASC
      LIMIT 1
    `;

    if (!reminderLead || reminderLead.length === 0) {
      console.log('📝 Creating test lead for reminder email...');
      const result = await sql`
        INSERT INTO leads (
          first_name, last_name, email, phone, country_code,
          business_name, industry, message, appointment_datetime, resolved
        ) VALUES (
          'Test', 'Reminder', ${TEST_EMAIL}, '5551234567', '+1',
          'Test Business', 'technology', 'Test reminder email', ${tomorrow.toISOString()}, false
        )
        RETURNING id, first_name, last_name, email, appointment_datetime
      `;
      reminderLead = result;
    }

    const lead = reminderLead[0];
    console.log(`✅ Found/Created lead ID ${lead.id} for reminder`);

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

    // Find or create a lead with past appointment
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    pastDate.setHours(14, 0, 0, 0);

    let rescheduleLead = await sql`
      SELECT id, first_name, last_name, email, appointment_datetime
      FROM leads
      WHERE email = ${TEST_EMAIL}
      AND appointment_datetime < ${new Date().toISOString()}
      AND resolved = false
      ORDER BY appointment_datetime DESC
      LIMIT 1
    `;

    if (!rescheduleLead || rescheduleLead.length === 0) {
      console.log('\n📝 Creating test lead for reschedule email...');
      const result = await sql`
        INSERT INTO leads (
          first_name, last_name, email, phone, country_code,
          business_name, industry, message, appointment_datetime, resolved
        ) VALUES (
          'Test', 'Reschedule', ${TEST_EMAIL}, '5551234567', '+1',
          'Test Business', 'technology', 'Test reschedule email', ${pastDate.toISOString()}, false
        )
        RETURNING id, first_name, last_name, email
      `;
      rescheduleLead = result;
    }

    const pastLead = rescheduleLead[0];
    console.log(`✅ Found/Created lead ID ${pastLead.id} for reschedule`);

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

    console.log('\n✅ Test emails sent!');
    console.log(`📧 Check your inbox at ${TEST_EMAIL}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

sendTestEmails();

