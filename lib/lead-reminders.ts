'use server';

import { neon } from '@neondatabase/serverless';
import { databaseConfig } from '@/lib/env';
import { sendAppointmentReminderEmail, sendRescheduleEmail } from '@/lib/email';
import { generateRescheduleToken } from '@/lib/reschedule-token';

const sql = neon(databaseConfig.url);

/**
 * Create an audit log entry for a lead
 */
export async function createAuditLog(
    leadId: number,
    action: string,
    oldValue?: Record<string, unknown>,
    newValue?: Record<string, unknown>,
    changedBy: string = 'system',
) {
    try {
        await sql`
            INSERT INTO lead_audit_logs (lead_id, action, old_value, new_value, changed_by)
            VALUES (${leadId}, ${action}, ${oldValue ? JSON.stringify(oldValue) : null}, ${newValue ? JSON.stringify(newValue) : null}, ${changedBy})
        `;
    } catch (error) {
        console.error('Failed to create audit log:', error);
    }
}

/**
 * Send daily appointment reminders for appointments happening tomorrow
 */
export async function sendDailyReminders() {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const dayAfter = new Date(tomorrow);
        dayAfter.setDate(dayAfter.getDate() + 1);

        // Find all leads with appointments tomorrow that are not resolved
        const leads = await sql`
            SELECT 
                id,
                first_name,
                last_name,
                email,
                appointment_datetime
            FROM leads
            WHERE appointment_datetime >= ${tomorrow.toISOString()}
            AND appointment_datetime < ${dayAfter.toISOString()}
            AND resolved = false
        `;

        let sentCount = 0;
        let errorCount = 0;

        for (const lead of leads) {
            try {
                const appointmentDate = new Date(lead.appointment_datetime);
                
                // Format date in Eastern Time
                const appointmentDateStr = new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'America/New_York',
                }).format(appointmentDate);

                // Format time in ET
                const formatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: 'America/New_York',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                });
                const appointmentTimeStr = formatter.format(appointmentDate);

                const result = await sendAppointmentReminderEmail({
                    firstName: lead.first_name,
                    lastName: lead.last_name,
                    email: lead.email,
                    appointmentDate: appointmentDateStr,
                    appointmentTime: appointmentTimeStr,
                    appointmentTimezone: 'ET',
                    leadId: lead.id,
                });

                if (result.sent) {
                    await createAuditLog(
                        lead.id,
                        'reminder_sent',
                        undefined,
                        { appointmentDate: appointmentDateStr, appointmentTime: appointmentTimeStr },
                        'system',
                    );
                    sentCount++;
                } else {
                    errorCount++;
                }
            } catch (error) {
                console.error(`Failed to send reminder for lead ${lead.id}:`, error);
                errorCount++;
            }
        }

        return {
            success: true,
            sent: sentCount,
            errors: errorCount,
            total: leads.length,
        };
    } catch (error) {
        console.error('Failed to send daily reminders:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Send reschedule emails for leads whose appointments have passed and are not resolved
 */
export async function sendRescheduleEmails() {
    try {
        const now = new Date();
        
        // Find all leads with appointments in the past that are not resolved
        const leads = await sql`
            SELECT 
                id,
                first_name,
                last_name,
                email,
                appointment_datetime
            FROM leads
            WHERE appointment_datetime < ${now.toISOString()}
            AND resolved = false
        `;

        let sentCount = 0;
        let errorCount = 0;

        for (const lead of leads) {
            try {
                // Generate reschedule token
                const token = await generateRescheduleToken(lead.id);

                const result = await sendRescheduleEmail({
                    firstName: lead.first_name,
                    lastName: lead.last_name,
                    email: lead.email,
                    leadId: lead.id,
                    rescheduleToken: token,
                });

                if (result.sent) {
                    await createAuditLog(
                        lead.id,
                        'reschedule_email_sent',
                        undefined,
                        { token },
                        'system',
                    );
                    sentCount++;
                } else {
                    errorCount++;
                }
            } catch (error) {
                console.error(`Failed to send reschedule email for lead ${lead.id}:`, error);
                errorCount++;
            }
        }

        return {
            success: true,
            sent: sentCount,
            errors: errorCount,
            total: leads.length,
        };
    } catch (error) {
        console.error('Failed to send reschedule emails:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

