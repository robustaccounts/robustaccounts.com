import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';
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
    const startTime = Date.now();
    const jobName = 'appointment-reminders';
    
    logger.cronStart(jobName, {
        method: request.method,
        url: request.url,
        userAgent: request.headers.get('user-agent'),
    });

    try {
        // Send daily reminders for appointments tomorrow
        logger.info('Starting daily reminders process');
        const reminderResult = await sendDailyReminders();
        logger.info('Daily reminders completed', {
            reminders: reminderResult,
        });

        // Send reschedule emails for past appointments
        logger.info('Starting reschedule emails process');
        const rescheduleResult = await sendRescheduleEmails();
        logger.info('Reschedule emails completed', {
            rescheduleEmails: rescheduleResult,
        });

        const duration = Date.now() - startTime;
        const response = {
            success: true,
            reminders: reminderResult,
            rescheduleEmails: rescheduleResult,
            timestamp: new Date().toISOString(),
            duration: `${duration}ms`,
        };

        // Extract values safely with type checking
        const remindersSent = reminderResult.success && 'sent' in reminderResult ? reminderResult.sent : 0;
        const remindersErrors = reminderResult.success && 'errors' in reminderResult ? reminderResult.errors : 0;
        const rescheduleSent = rescheduleResult.success && 'sent' in rescheduleResult ? rescheduleResult.sent : 0;
        const rescheduleErrors = rescheduleResult.success && 'errors' in rescheduleResult ? rescheduleResult.errors : 0;

        logger.cronSuccess(jobName, duration, {
            remindersSent,
            remindersErrors,
            rescheduleSent,
            rescheduleErrors,
        });

        return NextResponse.json(response);
    } catch (error) {
        const duration = Date.now() - startTime;
        logger.cronError(jobName, error, { duration: `${duration}ms` });
        
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
            },
            { status: 500 },
        );
    }
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
    return GET(request);
}
