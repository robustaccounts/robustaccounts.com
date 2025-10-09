/**
 * Environment Variable Validation with Zod
 *
 * This file validates all environment variables at build time and runtime,
 * providing type safety and clear error messages for missing/invalid config.
 */
import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
    // Database
    DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),

    // SMTP Configuration
    SMTP_HOST: z
        .string()
        .min(1, 'SMTP_HOST is required for email functionality'),
    SMTP_PORT: z
        .string()
        .regex(/^\d+$/, 'SMTP_PORT must be a number')
        .transform((val) => parseInt(val, 10))
        .pipe(
            z.number().min(1).max(65535, 'SMTP_PORT must be between 1-65535'),
        ),
    SMTP_USER: z
        .string()
        .email('SMTP_USER must be a valid email address')
        .min(1, 'SMTP_USER is required'),
    SMTP_PASS: z
        .string()
        .min(1, 'SMTP_PASS is required for SMTP authentication'),

    // Email Addresses
    EMAIL_FROM: z
        .string()
        .min(1, 'EMAIL_FROM is required')
        .refine(
            (val) => {
                // Allow either plain email or "Name <email@domain.com>" format
                return (
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
                    /^.+\s*<[^\s@]+@[^\s@]+\.[^\s@]+>$/.test(val)
                );
            },
            {
                message:
                    'EMAIL_FROM must be a valid email or "Name <email@domain.com>" format',
            },
        ),

    // At least one notification recipient is required
    LEAD_NOTIFY_TO: z
        .string()
        .email('LEAD_NOTIFY_TO must be a valid email address')
        .optional(),
    EMAIL_TO: z
        .string()
        .email('EMAIL_TO must be a valid email address')
        .optional(),

    // Customer Confirmation Emails
    SEND_CUSTOMER_CONFIRMATION_EMAILS: z
        .string()
        .optional()
        .default('false')
        .transform((val) => val === 'true'),

    // Email Assets (optional with defaults)
    EMAIL_LOGO_URL: z
        .string()
        .url('EMAIL_LOGO_URL must be a valid URL')
        .optional()
        .default(
            'https://zqjl1difgpgsu6cq.public.blob.vercel-storage.com/email-assets/logo.png',
        ),
    EMAIL_GOOGLE_CALENDAR_ICON_URL: z
        .string()
        .url('EMAIL_GOOGLE_CALENDAR_ICON_URL must be a valid URL')
        .optional()
        .default(
            'https://zqjl1difgpgsu6cq.public.blob.vercel-storage.com/email-assets/google-calendar-icon.png',
        ),

    // Debug Mode (optional)
    EMAIL_DEBUG: z
        .string()
        .optional()
        .default('0')
        .transform((val) => val === '1'),

    // Node Environment
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
});

// Refine to ensure at least one notification recipient is set
const envSchemaWithRefinements = envSchema.refine(
    (data) => data.LEAD_NOTIFY_TO || data.EMAIL_TO,
    {
        message:
            'Either LEAD_NOTIFY_TO or EMAIL_TO must be set to receive lead notifications',
        path: ['LEAD_NOTIFY_TO', 'EMAIL_TO'],
    },
);

// Type for validated environment variables
export type Env = z.infer<typeof envSchema>;

/**
 * Validates environment variables and returns them with proper types
 * Throws detailed error if validation fails
 */
function validateEnv(): Env {
    const result = envSchemaWithRefinements.safeParse(process.env);

    if (!result.success) {
        // Format error messages nicely
        const errorMessages = result.error.issues
            .map((issue) => {
                const path = issue.path.join('.');
                return `  ❌ ${path}: ${issue.message}`;
            })
            .join('\n');

        console.error('❌ Environment variable validation failed:\n');
        console.error(errorMessages);
        console.error(
            '\n💡 Please check your .env.local file or Vercel environment variables.',
        );
        console.error(
            '📖 See VERCEL_EMAIL_SETUP.md or ENV_VARS_TEMPLATE.txt for setup instructions.\n',
        );

        throw new Error('Invalid environment variables');
    }

    return result.data;
}

// Export validated environment variables
export const env = validateEnv();

// Export individual validated config objects for convenience
export const smtpConfig = {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    secure: env.SMTP_PORT === 465, // true for 465, false for other ports
} as const;

export const emailConfig = {
    from: env.EMAIL_FROM,
    notifyTo: env.LEAD_NOTIFY_TO || env.EMAIL_TO || '',
    sendCustomerConfirmations: env.SEND_CUSTOMER_CONFIRMATION_EMAILS,
    logoUrl: env.EMAIL_LOGO_URL,
    calendarIconUrl: env.EMAIL_GOOGLE_CALENDAR_ICON_URL,
    debug: env.EMAIL_DEBUG,
} as const;

export const databaseConfig = {
    url: env.DATABASE_URL,
} as const;
