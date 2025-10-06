'use server';

import contactInfo from '@/data/contact-info';

// Lazy import to avoid loading in environments that don't need it.
// Intentionally typed as unknown and imported via eval to avoid a hard TS dependency
// on the 'nodemailer' package unless it's actually installed.
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

function getSmtpConfig() {
    const host = process.env.SMTP_HOST;
    const portRaw = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.EMAIL_FROM || user || undefined;
    const to =
        process.env.LEAD_NOTIFY_TO ||
        process.env.EMAIL_TO ||
        contactInfo.emailHref;

    const port = portRaw ? Number(portRaw) : 587;
    const secure = port === 465; // true for 465, false for everything else

    return {
        host,
        port,
        secure,
        auth: user && pass ? { user, pass } : undefined,
        user,
        from,
        to,
    } as const;
}

export async function sendLeadNotificationEmail(lead: LeadNotification) {
    try {
        const cfg = getSmtpConfig();
        const debugEnabled = process.env.EMAIL_DEBUG === '1';

        if (debugEnabled) {
            console.log('SMTP config verified for lead notifications', {
                hasHost: Boolean(cfg.host),
                port: cfg.port,
                hasAuth: Boolean(cfg.auth),
                from: cfg.from,
                to: cfg.to,
            });
        }

        if (!cfg.host || !cfg.from || !cfg.to) {
            console.warn(
                'Email notification skipped: missing SMTP_HOST/EMAIL_FROM/EMAIL_TO (or LEAD_NOTIFY_TO).',
            );
            return { sent: false, reason: 'missing_config' } as const;
        }

        if (!cfg.auth) {
            console.error(
                'Email notification failed: SMTP authentication credentials (SMTP_USER and SMTP_PASS) are missing!',
            );
            return { sent: false, reason: 'missing_auth' } as const;
        }

        if (!nodemailer) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodemailer = await (eval('import("nodemailer")') as Promise<any>);
        }

        const transporter = nodemailer.createTransport({
            host: cfg.host,
            port: cfg.port,
            secure: cfg.secure,
            auth: cfg.auth,
            requireTLS: !cfg.secure,
            logger: debugEnabled,
            debug: debugEnabled,
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
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif; line-height: 1.5; color: #111827;">
              <h2 style="margin: 0 0 12px;">New Lead Submitted</h2>
              <p style="margin: 0 0 12px;">A new lead has been submitted on <strong>robustaccounts.com</strong>.</p>
              <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
                <tbody>
                  <tr><td><strong>Lead ID</strong></td><td>${lead.id}</td></tr>
                  <tr><td><strong>Name</strong></td><td>${lead.firstName} ${lead.lastName}</td></tr>
                  <tr><td><strong>Email</strong></td><td>${lead.email}</td></tr>
                  <tr><td><strong>Phone</strong></td><td>${lead.countryCode} ${lead.phone}</td></tr>
                  <tr><td><strong>Business</strong></td><td>${lead.businessName}</td></tr>
                  <tr><td><strong>Industry</strong></td><td>${lead.industry}</td></tr>
                  <tr><td><strong>Appointment (UTC ISO)</strong></td><td>${lead.appointmentDatetimeISO}</td></tr>
                </tbody>
              </table>
              <div style="margin-top: 12px;">
                <strong>Message</strong>
                <div style="white-space: pre-wrap; margin-top: 6px;">${
                    lead.message?.trim() ? escapeHtml(lead.message) : '(none)'
                }</div>
              </div>
            </div>
        `;

        const envelopeFrom = extractAddress(cfg.from || cfg.user || '');

        await transporter.sendMail({
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

        return { sent: true } as const;
    } catch (err) {
        console.error('Failed to send lead notification email:', err);
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
        const sendCustomerEmails =
            process.env.SEND_CUSTOMER_CONFIRMATION_EMAILS === 'true';
        const debugEnabled = process.env.EMAIL_DEBUG === '1';
        if (!sendCustomerEmails) {
            console.log('Customer confirmation emails are disabled');
            return { sent: false, reason: 'disabled' } as const;
        }

        const cfg = getSmtpConfig();

        if (!cfg.host || !cfg.from) {
            console.warn(
                'Customer confirmation email skipped: missing SMTP_HOST/EMAIL_FROM.',
            );
            return { sent: false, reason: 'missing_config' } as const;
        }

        if (!cfg.auth) {
            console.error(
                'Customer confirmation email failed: SMTP authentication credentials are missing!',
            );
            return { sent: false, reason: 'missing_auth' } as const;
        }

        if (!nodemailer) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodemailer = await (eval('import("nodemailer")') as Promise<any>);
        }

        const transporter = nodemailer.createTransport({
            host: cfg.host,
            port: cfg.port,
            secure: cfg.secure,
            auth: cfg.auth,
            requireTLS: !cfg.secure,
            logger: debugEnabled,
            debug: debugEnabled,
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
                    <title>Consultation Confirmed - Robust Accounts</title>
                </head>
                <body
                    style="
                        margin: 0;
                        font-family:
                            -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                            'Helvetica Neue', Arial, sans-serif;
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
                            <td align="center" style="padding: 40px 20px">
                                <table
                                    role="presentation"
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
                                                src="https://robustaccounts.com/assets/logo.png"
                                                alt="Robust Accounts Logo"
                                                width="120"
                                            />
                                            <h1
                                                style="
                                                    margin: 20px 0 0;
                                                    color: #ffffff;
                                                    font-size: 28px;
                                                    font-weight: 700;
                                                "
                                            >
                                                Your Consultation Is Confirmed!
                                            </h1>
                                        </td>
                                    </tr>

                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px">
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

                                                <div style="margin-bottom: 12px">
                                                    <strong
                                                        style="
                                                            color: #1f2937;
                                                            font-size: 15px;
                                                        "
                                                        >Date:</strong
                                                    >
                                                    <span
                                                        style="
                                                            color: #1f2937;
                                                            font-size: 15px;
                                                            float: right;
                                                        "
                                                        >${escapeHtml(confirmation.appointmentDate)}</span
                                                    >
                                                    <div style="clear: both"></div>
                                                </div>

                                                <div style="margin-bottom: 12px">
                                                    <strong
                                                        style="
                                                            color: #1f2937;
                                                            font-size: 15px;
                                                        "
                                                        >Time:</strong
                                                    >
                                                    <span
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

                                                <div style="margin-bottom: 12px">
                                                    <strong
                                                        style="
                                                            color: #1f2937;
                                                            font-size: 15px;
                                                        "
                                                        >Duration:</strong
                                                    >
                                                    <span
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
                                                    <td align="center">
                                                        <a
                                                            href="https://www.google.com/calendar/render?action=TEMPLATE&text=Accounting+Consultation+-+Robust+Accounts&details=Consultation+with+Robust+Accounts"
                                                            target="_blank"
                                                            style="
                                                                display: inline-flex;
                                                                align-items: center;
                                                                padding: 14px 18px;
                                                                border: 2px solid #1a4d3a;
                                                                color: #1a4d3a;
                                                                text-decoration: none;
                                                                border-radius: 8px;
                                                                font-size: 16px;
                                                                font-weight: 600;
                                                            "
                                                        >
                                                            <img
                                                                src="https://www.robustaccounts.com/assets/google-calendar.svg"
                                                                alt="Google Calendar"
                                                                width="28"
                                                                height="28"
                                                                style="margin-right: 10px"
                                                            />
                                                            Add to Google Calendar
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

        await transporter.sendMail({
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
        );
        return { sent: true } as const;
    } catch (err) {
        console.error('Failed to send customer confirmation email:', err);
        return { sent: false, reason: 'send_failed' } as const;
    }
}
