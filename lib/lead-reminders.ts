'use server';

import { neon } from '@neondatabase/serverless';

import { sendAppointmentReminderEmail, sendRescheduleEmail } from '@/lib/email';
import { databaseConfig } from '@/lib/env';
import { logger } from '@/lib/logger';
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
        logger.error('Failed to create audit log', error, { leadId, action });
    }
}

/**
 * Send daily appointment reminders for all future appointments
 * Sends reminders every day until the appointment date
 */
export async function sendDailyReminders() {
    const startTime = Date.now();
    logger.info('sendDailyReminders - Starting', {
        function: 'sendDailyReminders',
    });

    try {
        const now = new Date();

        logger.debug('Querying for leads with future appointments', {
            now: now.toISOString(),
        });

        // Find all leads with future appointments that have opted in and are not resolved
        const leads = await sql`
            SELECT 
                id,
                first_name,
                last_name,
                email,
                appointment_datetime
            FROM leads
            WHERE appointment_datetime > ${now.toISOString()}
            AND email_consent = true
            AND resolved = false
        `;

        logger.info(`Found ${leads.length} leads with future appointments`, {
            leadCount: leads.length,
        });

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

                logger.debug('Sending reminder email', {
                    leadId: lead.id,
                    email: lead.email,
                    appointmentDate: appointmentDateStr,
                    appointmentTime: appointmentTimeStr,
                });

                const result = await sendAppointmentReminderEmail({
                    firstName: lead.first_name,
                    lastName: lead.last_name,
                    email: lead.email,
                    appointmentDate: appointmentDateStr,
                    appointmentTime: appointmentTimeStr,
                    appointmentTimezone: 'ET',
                    appointmentDatetime: lead.appointment_datetime,
                    leadId: lead.id,
                });

                if (result.sent) {
                    await createAuditLog(
                        lead.id,
                        'reminder_sent',
                        undefined,
                        {
                            appointmentDate: appointmentDateStr,
                            appointmentTime: appointmentTimeStr,
                        },
                        'system',
                    );
                    logger.info('Reminder email sent successfully', {
                        leadId: lead.id,
                        email: lead.email,
                    });
                    sentCount++;
                } else {
                    logger.warn('Failed to send reminder email', {
                        leadId: lead.id,
                        email: lead.email,
                        reason: result.reason,
                    });
                    errorCount++;
                }
            } catch (error) {
                logger.error(
                    `Failed to send reminder for lead ${lead.id}`,
                    error,
                    {
                        leadId: lead.id,
                        email: lead.email,
                    },
                );
                errorCount++;
            }
        }

        const duration = Date.now() - startTime;
        const result = {
            success: true,
            sent: sentCount,
            errors: errorCount,
            total: leads.length,
        };

        logger.info('sendDailyReminders - Completed', {
            ...result,
            duration: `${duration}ms`,
        });

        return result;
    } catch (error) {
        const duration = Date.now() - startTime;
        logger.error('sendDailyReminders - Failed', error, {
            duration: `${duration}ms`,
        });
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
    const startTime = Date.now();
    logger.info('sendRescheduleEmails - Starting', {
        function: 'sendRescheduleEmails',
    });

    try {
        const now = new Date();

        logger.debug('Querying for leads with past appointments', {
            now: now.toISOString(),
        });

        // Find all leads with appointments in the past that have opted in and are not resolved
        const leads = await sql`
            SELECT 
                id,
                first_name,
                last_name,
                email,
                appointment_datetime
            FROM leads
            WHERE appointment_datetime < ${now.toISOString()}
            AND email_consent = true
            AND resolved = false
        `;

        logger.info(`Found ${leads.length} leads with past appointments`, {
            leadCount: leads.length,
        });

        let sentCount = 0;
        let errorCount = 0;

        for (const lead of leads) {
            try {
                // Generate reschedule token
                const token = await generateRescheduleToken(lead.id);

                logger.debug('Sending reschedule email', {
                    leadId: lead.id,
                    email: lead.email,
                });

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
                    logger.info('Reschedule email sent successfully', {
                        leadId: lead.id,
                        email: lead.email,
                    });
                    sentCount++;
                } else {
                    logger.warn('Failed to send reschedule email', {
                        leadId: lead.id,
                        email: lead.email,
                        reason: result.reason,
                    });
                    errorCount++;
                }
            } catch (error) {
                logger.error(
                    `Failed to send reschedule email for lead ${lead.id}`,
                    error,
                    {
                        leadId: lead.id,
                        email: lead.email,
                    },
                );
                errorCount++;
            }
        }

        const duration = Date.now() - startTime;
        const result = {
            success: true,
            sent: sentCount,
            errors: errorCount,
            total: leads.length,
        };

        logger.info('sendRescheduleEmails - Completed', {
            ...result,
            duration: `${duration}ms`,
        });

        return result;
    } catch (error) {
        const duration = Date.now() - startTime;
        logger.error('sendRescheduleEmails - Failed', error, {
            duration: `${duration}ms`,
        });
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
