'use server';

import { neon } from '@neondatabase/serverless';
import { databaseConfig } from '@/lib/env';
import { createAuditLog } from '@/lib/lead-reminders';
import { decodeRescheduleToken } from '@/lib/reschedule-token';
import { sendCustomerConfirmationEmail } from '@/lib/email';

const sql = neon(databaseConfig.url);

/**
 * Get lead by reschedule token
 */
export async function getLeadByToken(token: string) {
    try {
        const leadId = await decodeRescheduleToken(token);
        if (!leadId) {
            return { success: false, error: 'Invalid token' };
        }

        const result = await sql`
            SELECT 
                id,
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
            FROM leads
            WHERE id = ${leadId}
        `;

        if (!result || result.length === 0) {
            return { success: false, error: 'Lead not found' };
        }

        return {
            success: true,
            lead: result[0],
        };
    } catch (error) {
        console.error('Error getting lead by token:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Reschedule a lead's appointment
 * @param token - Reschedule token for the lead
 * @param newAppointmentDatetime - New appointment datetime
 * @param _appointmentDetails - Optional appointment details (reserved for future use)
 */
export async function rescheduleLead(
    token: string,
    newAppointmentDatetime: Date,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _appointmentDetails?: {
        appointmentDate: string;
        appointmentTime: string;
        appointmentTimezone: string;
    },
) {
    try {
        const leadId = await decodeRescheduleToken(token);
        if (!leadId) {
            return { success: false, error: 'Invalid token' };
        }

        // Get current lead data
        const currentLeadResult = await sql`
            SELECT appointment_datetime, resolved
            FROM leads
            WHERE id = ${leadId}
        `;

        if (!currentLeadResult || currentLeadResult.length === 0) {
            return { success: false, error: 'Lead not found' };
        }

        const oldAppointmentDatetime = currentLeadResult[0].appointment_datetime;

        // Update appointment
        await sql`
            UPDATE leads
            SET appointment_datetime = ${newAppointmentDatetime.toISOString()},
                resolved = false
            WHERE id = ${leadId}
        `;

        // Create audit log
        await createAuditLog(
            leadId,
            'rescheduled',
            { appointment_datetime: oldAppointmentDatetime },
            { appointment_datetime: newAppointmentDatetime.toISOString() },
            'system',
        );

        // Send confirmation email (always send, not just when appointmentDetails provided)
        const leadResult = await sql`
            SELECT first_name, last_name, email, business_name
            FROM leads
            WHERE id = ${leadId}
        `;

        if (leadResult && leadResult.length > 0) {
            const lead = leadResult[0];
            
            // Format appointment details for email
            const appointmentDate = new Date(newAppointmentDatetime);
            const appointmentDateStr = new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'America/New_York',
            }).format(appointmentDate);
            
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/New_York',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            const appointmentTimeStr = formatter.format(appointmentDate);
            
            await sendCustomerConfirmationEmail({
                firstName: lead.first_name,
                lastName: lead.last_name,
                email: lead.email,
                businessName: lead.business_name || '',
                appointmentDate: appointmentDateStr,
                appointmentTime: appointmentTimeStr,
                appointmentTimezone: 'ET',
                appointmentDatetimeISO: newAppointmentDatetime.toISOString(),
                leadId: leadId,
            }).catch((err) => {
                console.error('Failed to send reschedule confirmation email:', err);
            });
        }

        return { success: true, leadId };
    } catch (error) {
        console.error('Error rescheduling lead:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

