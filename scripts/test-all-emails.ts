#!/usr/bin/env node

/**
 * Test script to send all email types:
 * 1. Initial confirmation email
 * 2. Reminder email
 * 3. Reschedule email (for past appointments)
 * 4. Reschedule confirmation email
 * 
 * Run: npx tsx scripts/test-all-emails.ts
 */

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables
config({ path: join(process.cwd(), '.env.local') });
config({ path: join(process.cwd(), '.env') });

const TEST_EMAIL = 'developer.piyushgambhir@gmail.com';

async function sendAllTestEmails() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    // Dynamically import email functions after env is loaded
    const { sendCustomerConfirmationEmail, sendAppointmentReminderEmail, sendRescheduleEmail } = await import('../lib/email');
    const { generateRescheduleToken } = await import('../lib/reschedule-token');

    console.log('📧 Sending all test emails...\n');

    // 1. Create lead for initial confirmation email (tomorrow)
    console.log('1️⃣ Creating lead for initial confirmation email...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0);

    const initialLead = await sql`
      INSERT INTO leads (
        first_name, last_name, email, phone, country_code,
        business_name, industry, message, appointment_datetime, resolved
      ) VALUES (
        'Test', 'Initial', ${TEST_EMAIL}, '5551234567', '+1',
        'Test Business', 'technology', 'Initial booking test', ${tomorrow.toISOString()}, false
      )
      RETURNING id, first_name, last_name, email, appointment_datetime
    `;
    const lead1 = initialLead[0];
    console.log(`✅ Lead ID ${lead1.id} created\n`);

    // Send initial confirmation email
    console.log('📧 Sending initial confirmation email...');
    const initialAppointmentDate = new Date(lead1.appointment_datetime);
    const initialDateStr = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/New_York',
    }).format(initialAppointmentDate);
    const initialFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const initialTimeStr = initialFormatter.format(initialAppointmentDate);

    const initialResult = await sendCustomerConfirmationEmail({
      firstName: lead1.first_name,
      lastName: lead1.last_name,
      email: lead1.email,
      businessName: 'Test Business',
      appointmentDate: initialDateStr,
      appointmentTime: initialTimeStr,
      appointmentTimezone: 'ET',
      appointmentDatetimeISO: lead1.appointment_datetime.toISOString(),
      leadId: lead1.id,
    });

    if (initialResult.sent) {
      console.log('✅ Initial confirmation email sent!\n');
    } else {
      console.log('⚠️  Initial confirmation email failed:', initialResult.reason, '\n');
    }

    // 2. Create lead for reminder email (tomorrow)
    console.log('2️⃣ Creating lead for reminder email...');
    const tomorrowReminder = new Date();
    tomorrowReminder.setDate(tomorrowReminder.getDate() + 1);
    tomorrowReminder.setHours(15, 0, 0, 0);

    const reminderLead = await sql`
      INSERT INTO leads (
        first_name, last_name, email, phone, country_code,
        business_name, industry, message, appointment_datetime, resolved
      ) VALUES (
        'Test', 'Reminder', ${TEST_EMAIL}, '5551234567', '+1',
        'Test Business', 'technology', 'Reminder test', ${tomorrowReminder.toISOString()}, false
      )
      RETURNING id, first_name, last_name, email, appointment_datetime
    `;
    const lead2 = reminderLead[0];
    console.log(`✅ Lead ID ${lead2.id} created\n`);

    // Send reminder email
    console.log('📧 Sending reminder email...');
    const reminderAppointmentDate = new Date(lead2.appointment_datetime);
    const reminderDateStr = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/New_York',
    }).format(reminderAppointmentDate);
    const reminderFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const reminderTimeStr = reminderFormatter.format(reminderAppointmentDate);

    const reminderResult = await sendAppointmentReminderEmail({
      firstName: lead2.first_name,
      lastName: lead2.last_name,
      email: lead2.email,
      appointmentDate: reminderDateStr,
      appointmentTime: reminderTimeStr,
      appointmentTimezone: 'ET',
      leadId: lead2.id,
    });

    if (reminderResult.sent) {
      console.log('✅ Reminder email sent!\n');
    } else {
      console.log('⚠️  Reminder email failed:', reminderResult.reason, '\n');
    }

    // 3. Create lead for reschedule email (past appointment)
    console.log('3️⃣ Creating lead for reschedule email (past appointment)...');
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    pastDate.setHours(14, 0, 0, 0);

    const pastLead = await sql`
      INSERT INTO leads (
        first_name, last_name, email, phone, country_code,
        business_name, industry, message, appointment_datetime, resolved
      ) VALUES (
        'Test', 'Reschedule', ${TEST_EMAIL}, '5551234567', '+1',
        'Test Business', 'technology', 'Reschedule email test', ${pastDate.toISOString()}, false
      )
      RETURNING id, first_name, last_name, email
    `;
    const lead3 = pastLead[0];
    console.log(`✅ Lead ID ${lead3.id} created\n`);

    // Send reschedule email
    console.log('📧 Sending reschedule email (for past appointment)...');
    const rescheduleToken = await generateRescheduleToken(lead3.id);

    const rescheduleResult = await sendRescheduleEmail({
      firstName: lead3.first_name,
      lastName: lead3.last_name,
      email: lead3.email,
      leadId: lead3.id,
      rescheduleToken: rescheduleToken,
    });

    if (rescheduleResult.sent) {
      console.log('✅ Reschedule email sent!');
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://robustaccounts.com';
      console.log(`   Reschedule link: ${baseUrl}/reschedule/${rescheduleToken}\n`);
    } else {
      console.log('⚠️  Reschedule email failed:', rescheduleResult.reason, '\n');
    }

    // 4. Create lead and reschedule it to send reschedule confirmation email
    console.log('4️⃣ Creating lead for reschedule confirmation email...');
    const pastDate2 = new Date();
    pastDate2.setDate(pastDate2.getDate() - 2);
    pastDate2.setHours(10, 0, 0, 0);

    const rescheduleConfirmLead = await sql`
      INSERT INTO leads (
        first_name, last_name, email, phone, country_code,
        business_name, industry, message, appointment_datetime, resolved
      ) VALUES (
        'Test', 'RescheduleConfirm', ${TEST_EMAIL}, '5551234567', '+1',
        'Test Business', 'technology', 'Reschedule confirmation test', ${pastDate2.toISOString()}, false
      )
      RETURNING id, first_name, last_name, email, appointment_datetime
    `;
    const lead4 = rescheduleConfirmLead[0];
    console.log(`✅ Lead ID ${lead4.id} created\n`);

    // Reschedule the appointment
    console.log('📧 Rescheduling appointment and sending confirmation email...');
    const newAppointmentDate = new Date();
    newAppointmentDate.setDate(newAppointmentDate.getDate() + 3);
    newAppointmentDate.setHours(16, 0, 0, 0);

    // Update the appointment
    await sql`
      UPDATE leads
      SET appointment_datetime = ${newAppointmentDate.toISOString()},
          resolved = false
      WHERE id = ${lead4.id}
    `;

    // Send reschedule confirmation email
    const rescheduleConfirmDate = new Date(newAppointmentDate);
    const rescheduleConfirmDateStr = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/New_York',
    }).format(rescheduleConfirmDate);
    const rescheduleConfirmFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const rescheduleConfirmTimeStr = rescheduleConfirmFormatter.format(rescheduleConfirmDate);

    const rescheduleConfirmResult = await sendCustomerConfirmationEmail({
      firstName: lead4.first_name,
      lastName: lead4.last_name,
      email: lead4.email,
      businessName: 'Test Business',
      appointmentDate: rescheduleConfirmDateStr,
      appointmentTime: rescheduleConfirmTimeStr,
      appointmentTimezone: 'ET',
      appointmentDatetimeISO: newAppointmentDate.toISOString(),
      leadId: lead4.id,
    });

    if (rescheduleConfirmResult.sent) {
      console.log('✅ Reschedule confirmation email sent!\n');
    } else {
      console.log('⚠️  Reschedule confirmation email failed:', rescheduleConfirmResult.reason, '\n');
    }

    console.log('✅ All test emails sent!');
    console.log(`📧 Check your inbox at ${TEST_EMAIL}`);
    console.log('\nTest leads created:');
    console.log(`  - Lead ID ${lead1.id}: Initial confirmation (tomorrow)`);
    console.log(`  - Lead ID ${lead2.id}: Reminder email (tomorrow)`);
    console.log(`  - Lead ID ${lead3.id}: Reschedule email (past appointment)`);
    console.log(`  - Lead ID ${lead4.id}: Reschedule confirmation (rescheduled to ${rescheduleConfirmDateStr})`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

sendAllTestEmails();

