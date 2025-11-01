import { NextRequest, NextResponse } from 'next/server';

import { sendDailyReminders, sendRescheduleEmails } from '@/lib/lead-reminders';

/**
 * Cron job endpoint for sending appointment reminders
 * Should be called daily at 7:30 AM ET (via Vercel Cron Jobs)
 *
 * To set up in Vercel:
 * 1. Go to your project settings
 * 2. Navigate to Cron Jobs
 * 3. Add a new cron job with:
 *    - Path: /api/cron/appointment-reminders
 *    - Schedule: 30 12 * * * (runs at 12:30 PM UTC = 7:30 AM ET EST daily)
 *    - Note: During EDT (daylight saving), this will run at 8:30 AM EDT
 */
export async function GET(request: NextRequest) {
    try {
        // Send daily reminders for appointments tomorrow
        const reminderResult = await sendDailyReminders();

        // Send reschedule emails for past appointments
        const rescheduleResult = await sendRescheduleEmails();

        return NextResponse.json({
            success: true,
            reminders: reminderResult,
            rescheduleEmails: rescheduleResult,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 },
        );
    }
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
    return GET(request);
}
