/**
 * Email Configuration Test Endpoint
 *
 * This endpoint checks if email environment variables are properly configured.
 * Visit: /api/test-email-config
 *
 * IMPORTANT: Remove or protect this endpoint in production!
 */
import { NextResponse } from 'next/server';

import { emailConfig, env, smtpConfig } from '@/lib/env';

export async function GET() {
    try {
        // If we get here, all required env vars are valid (validated by Zod)
        const config = {
            smtp: {
                host: `✅ ${smtpConfig.host}`,
                port: `✅ ${smtpConfig.port}`,
                user: `✅ ${smtpConfig.user}`,
                pass: '✅ SET (hidden)',
                secure: smtpConfig.secure ? '✅ SSL' : '✅ TLS',
            },
            email: {
                from: `✅ ${emailConfig.from}`,
                notifyTo: `✅ ${emailConfig.notifyTo}`,
            },
            features: {
                customerConfirmation: emailConfig.sendCustomerConfirmations
                    ? '✅ ENABLED'
                    : '⚠️ DISABLED',
                debug: emailConfig.debug ? '✅ ENABLED' : '⚠️ DISABLED',
            },
            database: {
                url: '✅ SET (hidden)',
            },
            environment: {
                nodeEnv: `✅ ${env.NODE_ENV}`,
            },
        };

        const warnings = [];

        if (!emailConfig.sendCustomerConfirmations) {
            warnings.push(
                'Customer confirmation emails are disabled. Set SEND_CUSTOMER_CONFIRMATION_EMAILS=true to enable.',
            );
        }

        if (!emailConfig.debug) {
            warnings.push(
                'Email debugging is disabled. Set EMAIL_DEBUG=1 to see detailed logs.',
            );
        }

        return NextResponse.json({
            status: 'OK',
            message:
                'All required email configuration is valid and properly set! ✅',
            config,
            warnings: warnings.length > 0 ? warnings : undefined,
            documentation: '/VERCEL_EMAIL_SETUP.md',
            note: 'Environment variables are validated with Zod at startup',
        });
    } catch (error) {
        // This shouldn't happen if env.ts validation worked correctly
        return NextResponse.json(
            {
                status: 'ERROR',
                message:
                    'Environment validation failed. Check server logs for details.',
                error: error instanceof Error ? error.message : 'Unknown error',
                documentation: '/VERCEL_EMAIL_SETUP.md',
            },
            { status: 500 },
        );
    }
}
