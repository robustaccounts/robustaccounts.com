'use server';

import { neon } from '@neondatabase/serverless';

import {
    sendCustomerConfirmationEmail,
    sendLeadNotificationEmail,
} from '@/lib/email';

interface LeadData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    businessName: string;
    industry: string;
    message: string;
    appointmentDatetime: Date;
    smsOptOut: boolean;
    smsUpdates: boolean;
}

interface AppointmentDetails {
    appointmentDate: string;
    appointmentTime: string;
    appointmentTimezone: string;
}

export async function saveLead(
    leadData: LeadData,
    appointmentDetails?: AppointmentDetails,
) {
    try {
        const sql = neon(process.env.DATABASE_URL!);

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
                sms_opt_out, 
                sms_updates
            ) VALUES (
                ${leadData.firstName},
                ${leadData.lastName},
                ${leadData.email},
                ${leadData.phone},
                ${leadData.countryCode},
                ${leadData.businessName},
                ${leadData.industry},
                ${leadData.message || null},
                ${leadData.appointmentDatetime.toISOString()},
                ${leadData.smsOptOut},
                ${leadData.smsUpdates}
            )
            RETURNING id
        `;

        const leadId = result[0].id;

        // Fire-and-forget email notifications; don't block user if they fail
        try {
            // Send internal notification email
            await sendLeadNotificationEmail({
                id: leadId,
                firstName: leadData.firstName,
                lastName: leadData.lastName,
                email: leadData.email,
                phone: leadData.phone,
                countryCode: leadData.countryCode,
                businessName: leadData.businessName,
                industry: leadData.industry,
                message: leadData.message || null,
                appointmentDatetimeISO:
                    leadData.appointmentDatetime.toISOString(),
                smsOptOut: leadData.smsOptOut,
                smsUpdates: leadData.smsUpdates,
            });
        } catch (notifyErr) {
            console.error(
                'Lead saved but internal notification email failed:',
                notifyErr,
            );
        }

        // Send customer confirmation email if appointment details are provided
        if (appointmentDetails) {
            try {
                await sendCustomerConfirmationEmail({
                    firstName: leadData.firstName,
                    lastName: leadData.lastName,
                    email: leadData.email,
                    businessName: leadData.businessName,
                    appointmentDate: appointmentDetails.appointmentDate,
                    appointmentTime: appointmentDetails.appointmentTime,
                    appointmentTimezone: appointmentDetails.appointmentTimezone,
                });
            } catch (confirmErr) {
                console.error(
                    'Lead saved but customer confirmation email failed:',
                    confirmErr,
                );
            }
        }

        return { success: true, leadId };
    } catch (error) {
        console.error('Error saving lead:', error);
        return { success: false, error: 'Failed to save lead data' };
    }
}
