'use server';

import { neon } from '@neondatabase/serverless';

interface LeadData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    businessName: string;
    industry: string;
    message: string;
    appointmentDatetime: Date;
    smsOptOut: boolean;
    smsUpdates: boolean;
}

export async function saveLead(leadData: LeadData) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        
        const result = await sql`
            INSERT INTO leads (
                first_name, 
                last_name, 
                email, 
                phone, 
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
                ${leadData.businessName},
                ${leadData.industry},
                ${leadData.message || null},
                ${leadData.appointmentDatetime.toISOString()},
                ${leadData.smsOptOut},
                ${leadData.smsUpdates}
            )
            RETURNING id
        `;

        return { success: true, leadId: result[0].id };
    } catch (error) {
        console.error('Error saving lead:', error);
        return { success: false, error: 'Failed to save lead data' };
    }
}