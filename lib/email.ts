'use server';

import { emailConfig, smtpConfig } from '@/lib/env';

// Lazy import to avoid loading in environments that don't need it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let nodemailer: any | null = null;

export type LeadNotification = {
    id: string | number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    businessName: string;
    industry: string;
    message?: string | null;
    appointmentDatetimeISO: string; // ISO string
};

/**
 * Get SMTP configuration from validated environment variables
 * @deprecated Use smtpConfig and emailConfig from env.ts directly
 */
function getSmtpConfig() {
    return {
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        auth: { user: smtpConfig.user, pass: smtpConfig.pass },
        user: smtpConfig.user,
        from: emailConfig.from,
        to: emailConfig.notifyTo,
    } as const;
}

export async function sendLeadNotificationEmail(lead: LeadNotification) {
    try {
        const cfg = getSmtpConfig();
        const debugEnabled = emailConfig.debug;

        if (debugEnabled) {
            console.log('SMTP config verified for lead notifications', {
                host: cfg.host,
                port: cfg.port,
                secure: cfg.secure,
                from: cfg.from,
                to: cfg.to,
            });
        }

        if (!nodemailer) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mod: any = await import('nodemailer');
            // Support both CommonJS and ESM default export shapes
            nodemailer = mod?.default ?? mod;
        }

        const transporter = nodemailer.createTransport({
            host: cfg.host,
            port: cfg.port,
            secure: cfg.secure,
            auth: cfg.auth,
            requireTLS: !cfg.secure,
            logger: debugEnabled,
            debug: debugEnabled,
            connectionTimeout: 10000, // 10 second timeout
            greetingTimeout: 10000,
            socketTimeout: 10000,
        });

        const subject = `New lead #${lead.id}: ${lead.firstName} ${lead.lastName} — ${lead.businessName}`;

        const textBody = [
            'A new lead has been submitted on robustaccounts.com',
            '',
            `Lead ID: ${lead.id}`,
            `Name: ${lead.firstName} ${lead.lastName}`,
            `Email: ${lead.email}`,
            `Phone: ${lead.countryCode} ${lead.phone}`,
            `Business: ${lead.businessName}`,
            `Industry: ${lead.industry}`,
            `Appointment (UTC ISO): ${lead.appointmentDatetimeISO}`,
            '',
            'Message:',
            lead.message?.trim() ? lead.message : '(none)',
        ].join('\n');

        const htmlBody = `
            <!doctype html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <title>New Lead Submitted</title>
                    <style type="text/css">
                        body {
                            margin: 0 !important;
                            padding: 0 !important;
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }
                        table, td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
                        table {
                            border-collapse: collapse !important;
                        }
                        @media only screen and (max-width: 600px) {
                            .mobile-padding {
                                padding: 15px !important;
                            }
                            .mobile-table td {
                                display: block !important;
                                width: 100% !important;
                                padding: 4px 0 !important;
                            }
                            .mobile-table strong {
                                display: block !important;
                                margin-bottom: 2px !important;
                            }
                        }
                    </style>
                </head>
                <body style="margin: 0; padding: 0; width: 100%;">
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif; line-height: 1.5; color: #111827; padding: 20px;" class="mobile-padding">
                      <h2 style="margin: 0 0 12px; font-size: 24px;">New Lead Submitted</h2>
                      <p style="margin: 0 0 16px; font-size: 16px;">A new lead has been submitted on <strong>robustaccounts.com</strong>.</p>
                      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;" class="mobile-table">
                        <tbody>
                          <tr><td style="padding: 6px;"><strong>Lead ID</strong></td><td style="padding: 6px;">${lead.id}</td></tr>
                          <tr><td style="padding: 6px;"><strong>Name</strong></td><td style="padding: 6px;">${lead.firstName} ${lead.lastName}</td></tr>
                          <tr><td style="padding: 6px;"><strong>Email</strong></td><td style="padding: 6px;"><a href="mailto:${lead.email}" style="color: #1a4d3a; text-decoration: none;">${lead.email}</a></td></tr>
                          <tr><td style="padding: 6px;"><strong>Phone</strong></td><td style="padding: 6px;"><a href="tel:${lead.countryCode}${lead.phone}" style="color: #1a4d3a; text-decoration: none;">${lead.countryCode} ${lead.phone}</a></td></tr>
                          <tr><td style="padding: 6px;"><strong>Business</strong></td><td style="padding: 6px;">${lead.businessName}</td></tr>
                          <tr><td style="padding: 6px;"><strong>Industry</strong></td><td style="padding: 6px;">${lead.industry}</td></tr>
                          <tr><td style="padding: 6px;"><strong>Appointment (UTC ISO)</strong></td><td style="padding: 6px;">${lead.appointmentDatetimeISO}</td></tr>
                        </tbody>
                      </table>
                      <div style="margin-top: 16px;">
                        <strong>Message</strong>
                        <div style="white-space: pre-wrap; margin-top: 8px; padding: 12px; background-color: #f9fafb; border-radius: 6px; border-left: 3px solid #1a4d3a;">${
                            lead.message?.trim()
                                ? escapeHtml(lead.message)
                                : '(none)'
                        }</div>
                      </div>
                    </div>
                </body>
            </html>
        `;

        const envelopeFrom = extractAddress(cfg.from || cfg.user || '');

        const info = await transporter.sendMail({
            from: cfg.from,
            to: cfg.to,
            subject,
            text: textBody,
            html: htmlBody,
            envelope: {
                from: envelopeFrom,
                to: cfg.to,
            },
        });

        if (debugEnabled) {
            console.log('Lead notification email sent successfully:', {
                messageId: info.messageId,
                accepted: info.accepted,
                rejected: info.rejected,
            });
        }

        return { sent: true } as const;
    } catch (err) {
        console.error('Failed to send lead notification email:', err);
        // Log additional details about the error
        if (err instanceof Error) {
            console.error('Error details:', {
                message: err.message,
                name: err.name,
                stack: err.stack,
            });
        }
        return { sent: false, reason: 'send_failed' } as const;
    }
}

function escapeHtml(input: string) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function extractAddress(addr: string): string {
    const match = addr.match(/<([^>]+)>/);
    return match ? match[1] : addr;
}

export type CustomerConfirmation = {
    firstName: string;
    lastName: string;
    email: string;
    businessName: string;
    appointmentDate: string; // e.g., "Monday, January 15, 2024"
    appointmentTime: string; // e.g., "2:00 PM"
    appointmentTimezone: string; // e.g., "EST"
};

export async function sendCustomerConfirmationEmail(
    confirmation: CustomerConfirmation,
) {
    try {
        // Check if customer emails are enabled
        const sendCustomerEmails = emailConfig.sendCustomerConfirmations;
        const debugEnabled = emailConfig.debug;

        if (!sendCustomerEmails) {
            console.log('Customer confirmation emails are disabled');
            return { sent: false, reason: 'disabled' } as const;
        }

        const cfg = getSmtpConfig();

        // Get asset URLs from validated config
        const logoUrl = emailConfig.logoUrl;
        const calendarIconUrl = emailConfig.calendarIconUrl;

        if (!nodemailer) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mod: any = await import('nodemailer');
            // Support both CommonJS and ESM default export shapes
            nodemailer = mod?.default ?? mod;
        }

        const transporter = nodemailer.createTransport({
            host: cfg.host,
            port: cfg.port,
            secure: cfg.secure,
            auth: cfg.auth,
            requireTLS: !cfg.secure,
            logger: debugEnabled,
            debug: debugEnabled,
            connectionTimeout: 10000, // 10 second timeout
            greetingTimeout: 10000,
            socketTimeout: 10000,
        });

        const subject = `Consultation Confirmed - ${confirmation.appointmentDate}`;

        const textBody = [
            `Hi ${confirmation.firstName},`,
            '',
            'Your consultation with Robust Accounts has been successfully scheduled!',
            '',
            'APPOINTMENT DETAILS',
            `Date: ${confirmation.appointmentDate}`,
            `Time: ${confirmation.appointmentTime} ${confirmation.appointmentTimezone}`,
            'Duration: 30 minutes',
            '',
            'We look forward to discussing your accounting needs and how we can help your business thrive.',
            '',
            "If you need to make any changes to your appointment, please don't hesitate to contact us at consultations@robustaccounts.com",
            '',
            'Best regards,',
            'The Robust Accounts Team',
            '',
            '---',
            'Robust Accounts',
            'Professional Accounting Services',
            'https://robustaccounts.com',
        ].join('\n');

        const htmlBody = `
            <!doctype html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="x-apple-disable-message-reformatting" />
                    <title>Consultation Confirmed - Robust Accounts</title>
                    <!--[if mso]>
                    <style type="text/css">
                        body, table, td {font-family: Arial, sans-serif !important;}
                    </style>
                    <![endif]-->
                    <style type="text/css">
                        /* Base styles */
                        body {
                            margin: 0 !important;
                            padding: 0 !important;
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }
                        
                        /* Prevent WebKit and Windows mobile from changing default text sizes */
                        table, td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
                        
                        /* Remove spacing between tables in Outlook 2007 and up */
                        table {
                            border-collapse: collapse !important;
                        }
                        
                        /* Mobile styles */
                        @media only screen and (max-width: 600px) {
                            .email-container {
                                width: 100% !important;
                                min-width: 100% !important;
                                box-shadow: none !important;
                            }
                            
                            .mobile-padding {
                                padding: 20px !important;
                            }
                            
                            .mobile-header-padding {
                                padding: 30px 20px 20px !important;
                            }
                            
                            .mobile-font-size {
                                font-size: 24px !important;
                                line-height: 1.3 !important;
                            }
                            
                            .mobile-details-row {
                                display: block !important;
                                width: 100% !important;
                            }
                            
                            .mobile-details-label,
                            .mobile-details-value {
                                display: block !important;
                                float: none !important;
                                width: 100% !important;
                                text-align: left !important;
                                margin-bottom: 4px !important;
                            }
                            
                            .mobile-details-value {
                                margin-bottom: 12px !important;
                            }
                            
                            .mobile-button {
                                width: 100% !important;
                                display: block !important;
                                text-align: center !important;
                            }
                            
                            .mobile-button a {
                                display: block !important;
                                width: 100% !important;
                            }
                            
                            .mobile-logo {
                                width: 100px !important;
                                height: auto !important;
                            }
                            
                            .mobile-icon {
                                width: 24px !important;
                                height: 24px !important;
                            }
                            
                            .mobile-outer-padding {
                                padding: 0 !important;
                            }
                        }
                        
                        /* Dark mode support */
                        @media (prefers-color-scheme: dark) {
                            .dark-mode-bg {
                                background-color: #1f2937 !important;
                            }
                            .dark-mode-text {
                                color: #f9fafb !important;
                            }
                        }
                    </style>
                </head>
                <body
                    style="
                        margin: 0;
                        padding: 0;
                        font-family:
                            -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                            'Helvetica Neue', Arial, sans-serif;
                        width: 100%;
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    "
                >
                    <table
                        role="presentation"
                        style="
                            width: 100%;
                            border-collapse: collapse;
                            background-color: #f3f4f6;
                        "
                    >
                        <tr>
                            <td align="center" style="padding: 40px 20px" class="mobile-outer-padding">
                                <table
                                    role="presentation"
                                    class="email-container"
                                    style="
                                        width: 100%;
                                        max-width: 600px;
                                        border-collapse: collapse;
                                        background-color: #ffffff;
                                        border-radius: 12px;
                                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                    "
                                >
                                    <!-- Header -->
                                    <tr>
                                        <td
                                            class="mobile-header-padding"
                                            style="
                                                padding: 40px 40px 30px;
                                                text-align: center;
                                                background: linear-gradient(
                                                    135deg,
                                                    #1a4d3a 0%,
                                                    #2d7a5f 100%
                                                );
                                                border-radius: 12px 12px 0 0;
                                            "
                                        >
                                            <img
                                                src="${logoUrl}"
                                                alt="Robust Accounts Logo"
                                                width="120"
                                                class="mobile-logo"
                                                style="max-width: 120px; height: auto; display: block; margin: 0 auto;"
                                            />
                                            <h1
                                                class="mobile-font-size"
                                                style="
                                                    margin: 20px 0 0;
                                                    color: #ffffff;
                                                    font-size: 28px;
                                                    font-weight: 700;
                                                    line-height: 1.2;
                                                "
                                            >
                                                Your Consultation Is Confirmed!
                                            </h1>
                                        </td>
                                    </tr>

                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px" class="mobile-padding">
                                            <p
                                                style="
                                                    margin: 0 0 20px;
                                                    color: #111827;
                                                    font-size: 16px;
                                                "
                                            >
                                                Hi <strong>${escapeHtml(confirmation.firstName)}</strong>,
                                            </p>

                                            <p
                                                style="
                                                    margin: 0 0 30px;
                                                    color: #4b5563;
                                                    font-size: 16px;
                                                    line-height: 1.6;
                                                "
                                            >
                                                Great news — your consultation with
                                                <strong>Robust Accounts</strong> has been
                                                scheduled successfully! We're looking
                                                forward to learning more about your
                                                accounting needs and exploring how we can
                                                help your business grow.
                                            </p>

                                            <!-- Appointment Details -->
                                            <div style="margin-bottom: 30px">
                                                <h2
                                                    style="
                                                        margin: 0 0 16px;
                                                        color: #1a4d3a;
                                                        font-size: 18px;
                                                        font-weight: 600;
                                                    "
                                                >
                                                    Appointment Details
                                                </h2>

                                                <div style="margin-bottom: 12px" class="mobile-details-row">
                                                    <strong
                                                        class="mobile-details-label"
                                                        style="
                                                            color: #1f2937;
                                                            font-size: 15px;
                                                        "
                                                        >Date:</strong
                                                    >
                                                    <span
                                                        class="mobile-details-value"
                                                        style="
                                                            color: #1f2937;
                                                            font-size: 15px;
                                                            float: right;
                                                        "
                                                        >${escapeHtml(confirmation.appointmentDate)}</span
                                                    >
                                                    <div style="clear: both"></div>
                                                </div>

                                                <div style="margin-bottom: 12px" class="mobile-details-row">
                                                    <strong
                                                        class="mobile-details-label"
                                                        style="
                                                            color: #1f2937;
                                                            font-size: 15px;
                                                        "
                                                        >Time:</strong
                                                    >
                                                    <span
                                                        class="mobile-details-value"
                                                        style="
                                                            color: #1f2937;
                                                            font-size: 15px;
                                                            float: right;
                                                        "
                                                        >${escapeHtml(confirmation.appointmentTime)}
                                                        ${escapeHtml(confirmation.appointmentTimezone)}</span
                                                    >
                                                    <div style="clear: both"></div>
                                                </div>

                                                <div style="margin-bottom: 12px" class="mobile-details-row">
                                                    <strong
                                                        class="mobile-details-label"
                                                        style="
                                                            color: #1f2937;
                                                            font-size: 15px;
                                                        "
                                                        >Duration:</strong
                                                    >
                                                    <span
                                                        class="mobile-details-value"
                                                        style="
                                                            color: #1f2937;
                                                            font-size: 15px;
                                                            float: right;
                                                        "
                                                        >30 minutes</span
                                                    >
                                                    <div style="clear: both"></div>
                                                </div>
                                            </div>

                                            <!-- Call to Action -->
                                            <table
                                                role="presentation"
                                                style="
                                                    width: 100%;
                                                    border-collapse: collapse;
                                                    margin-bottom: 30px;
                                                "
                                            >
                                                <tr>
                                                    <td align="center" class="mobile-button">
                                                        <a
                                                            href="https://www.google.com/calendar/render?action=TEMPLATE&text=Accounting+Consultation+-+Robust+Accounts&details=Consultation+with+Robust+Accounts"
                                                            target="_blank"
                                                            style="
                                                                display: inline-flex;
                                                                align-items: center;
                                                                justify-content: center;
                                                                padding: 14px 18px;
                                                                border: 2px solid #1a4d3a;
                                                                color: #1a4d3a;
                                                                text-decoration: none;
                                                                border-radius: 8px;
                                                                font-size: 16px;
                                                                font-weight: 600;
                                                                box-sizing: border-box;
                                                                max-width: 100%;
                                                            "
                                                        >
                                                            <img
                                                                src="${calendarIconUrl}"
                                                                alt="Google Calendar"
                                                                width="28"
                                                                height="28"
                                                                class="mobile-icon"
                                                                style="margin-right: 10px; display: inline-block; vertical-align: middle;"
                                                            />
                                                            <span style="display: inline-block; vertical-align: middle;">Add to Google Calendar</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>

                                            <p
                                                style="
                                                    margin: 0 0 20px;
                                                    color: #4b5563;
                                                    font-size: 15px;
                                                    line-height: 1.6;
                                                "
                                            >
                                                If you'd like to make changes or reschedule
                                                your appointment, just reply to this email
                                                or reach us directly at
                                                <a
                                                    href="mailto:consultations@robustaccounts.com"
                                                    style="
                                                        color: #1a4d3a;
                                                        text-decoration: none;
                                                        font-weight: 600;
                                                    "
                                                    >consultations@robustaccounts.com</a
                                                >.
                                            </p>

                                            <p
                                                style="
                                                    margin: 0;
                                                    color: #111827;
                                                    font-size: 16px;
                                                    line-height: 1.6;
                                                "
                                            >
                                                Looking forward to speaking with you
                                                soon!<br />
                                                <strong>The Robust Accounts Team</strong>
                                            </p>
                                        </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                        <td
                                            class="mobile-padding"
                                            style="
                                                padding: 30px 40px;
                                                text-align: center;
                                                background-color: #f9fafb;
                                                border-radius: 0 0 12px 12px;
                                                border-top: 1px solid #e5e7eb;
                                            "
                                        >
                                            <p
                                                style="
                                                    margin: 0 0 12px;
                                                    color: #6b7280;
                                                    font-size: 14px;
                                                "
                                            >
                                                <strong>Robust Accounts</strong><br />
                                                Professional Accounting & Advisory Services
                                            </p>
                                            <p
                                                style="
                                                    margin: 0;
                                                    color: #6b7280;
                                                    font-size: 14px;
                                                "
                                            >
                                                <a
                                                    href="https://robustaccounts.com"
                                                    style="
                                                        color: #1a4d3a;
                                                        text-decoration: none;
                                                    "
                                                    >robustaccounts.com</a
                                                >
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        `;

        const envelopeFrom = extractAddress(cfg.from || cfg.user || '');

        const info = await transporter.sendMail({
            from: cfg.from,
            to: confirmation.email,
            subject,
            text: textBody,
            html: htmlBody,
            envelope: {
                from: envelopeFrom,
                to: confirmation.email,
            },
        });

        console.log(
            `Customer confirmation email sent to ${confirmation.email}`,
            debugEnabled
                ? {
                      messageId: info.messageId,
                      accepted: info.accepted,
                      rejected: info.rejected,
                  }
                : '',
        );
        return { sent: true } as const;
    } catch (err) {
        console.error('Failed to send customer confirmation email:', err);
        // Log additional details about the error
        if (err instanceof Error) {
            console.error('Error details:', {
                message: err.message,
                name: err.name,
                stack: err.stack,
            });
        }
        return { sent: false, reason: 'send_failed' } as const;
    }
}
