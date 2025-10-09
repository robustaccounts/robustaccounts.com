/**
 * Email Configuration Checker with Zod Validation
 *
 * Usage:
 *   pnpm check-env              # Check local .env.local
 *   pnpm check-env:vercel       # Pull from Vercel and check
 */
// Load environment variables from .env.local or .env.vercel
import 'dotenv/config';

async function checkConfig() {
    console.log('🔍 Validating Email Configuration with Zod...\n');

    try {
        // Import and validate environment - this will throw if validation fails
        const { env, smtpConfig, emailConfig } = await import('../lib/env.js');

        console.log('✅ Environment Validation Successful!\n');

        console.log('📧 SMTP Configuration:');
        console.log(`   ✓ Host: ${smtpConfig.host}`);
        console.log(`   ✓ Port: ${smtpConfig.port}`);
        console.log(`   ✓ User: ${smtpConfig.user}`);
        console.log(`   ✓ Password: SET (hidden)`);
        console.log(`   ✓ Security: ${smtpConfig.secure ? 'SSL' : 'TLS'}`);

        console.log('\n📨 Email Configuration:');
        console.log(`   ✓ From: ${emailConfig.from}`);
        console.log(`   ✓ Notify To: ${emailConfig.notifyTo}`);
        console.log(
            `   ${emailConfig.sendCustomerConfirmations ? '✓' : '⚠️'} Customer Confirmations: ${emailConfig.sendCustomerConfirmations ? 'ENABLED' : 'DISABLED'}`,
        );
        console.log(
            `   ${emailConfig.debug ? '✓' : '-'} Debug Mode: ${emailConfig.debug ? 'ENABLED' : 'DISABLED'}`,
        );

        console.log('\n🎨 Email Assets:');
        console.log(`   ✓ Logo URL: ${emailConfig.logoUrl}`);
        console.log(`   ✓ Calendar Icon URL: ${emailConfig.calendarIconUrl}`);

        console.log('\n🌍 Environment:');
        console.log(`   ✓ Node Environment: ${env.NODE_ENV}`);

        const warnings = [];

        if (!emailConfig.sendCustomerConfirmations) {
            warnings.push(
                'Customer confirmation emails are DISABLED. Set SEND_CUSTOMER_CONFIRMATION_EMAILS=true to enable.',
            );
        }

        if (!emailConfig.debug) {
            warnings.push(
                'Email debugging is DISABLED. Set EMAIL_DEBUG=1 to see detailed SMTP logs.',
            );
        }

        if (warnings.length > 0) {
            console.log('\n⚠️  Warnings:');
            warnings.forEach((warning) => console.log(`   - ${warning}`));
        }

        console.log('\n✅ All required environment variables are valid!');
        console.log('   Your email configuration is ready to use.\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Environment Validation Failed!\n');

        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unknown error occurred during validation');
        }

        console.log('\n💡 Next Steps:');
        console.log('   1. Check your .env.local file (for local development)');
        console.log(
            '   2. For Vercel: Run "pnpm check-env:vercel" to check production env',
        );
        console.log(
            '   3. Check app/api/test-email-config/route.ts for details\n',
        );

        process.exit(1);
    }
}

checkConfig();
