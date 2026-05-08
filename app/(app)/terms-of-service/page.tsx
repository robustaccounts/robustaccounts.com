import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import siteConfig from '@/siteconfig';

export const metadata: Metadata = {
    title: 'Terms of Service | Robust Accounts',
    description:
        'The terms and conditions that govern your use of Robust Accounts services, including engagement scope, fees, and responsibilities.',
    alternates: { canonical: '/terms-of-service' },
    robots: { index: true, follow: true },
};

export default function TermsOfService() {
    const { contactInfo } = siteConfig;

    return (
        <main className="flex min-h-screen flex-col bg-white">
            {/* Hero Section */}
            <div className="cust-container pt-24 lg:pt-32">
                <h1 className="text-4xl font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl">
                    Terms of Service
                </h1>
            </div>

            {/* Content */}
            <div className="py-12">
                <div className="cust-container">
                    <div className="space-y-8">
                        {/* Important Notice */}
                        <div className="pb-12">
                            <p className="mb-4 text-xl font-semibold tracking-wide text-primary uppercase">
                                IMPORTANT NOTICE: PLEASE READ CAREFULLY BEFORE
                                USING THIS WEBSITE:
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                These Terms of Service ("Terms") govern your use
                                of the Robust Accounts website and services. By
                                accessing or using our services, you agree to be
                                bound by these Terms. If you disagree with any
                                part of these terms, you may not access our
                                services. Robust Accounts ("we," "us," or "our")
                                provides accounting, bookkeeping, and financial
                                advisory services to businesses and individuals.
                            </p>
                            <p className="mt-4 text-sm text-gray-500">
                                Last Updated: December 3, 2025
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                1. Services
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We provide the following services: bookkeeping
                                and accounting services, financial advisory and
                                consulting, payroll processing and management,
                                tax preparation and filing, financial statement
                                preparation, budgeting and forecasting, and
                                compliance and regulatory support. All services
                                are subject to separate service agreements and
                                engagement letters that will be provided to
                                clients.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                2. User Accounts
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                When you create an account with us, you must
                                provide accurate, complete, and current
                                information. You are responsible for maintaining
                                the confidentiality of your account credentials,
                                all activities that occur under your account,
                                notifying us immediately of any unauthorized
                                use, and ensuring your account information
                                remains accurate and up-to-date. We reserve the
                                right to terminate accounts that violate these
                                Terms or are inactive for extended periods.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                3. Acceptable Use
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                You agree to use our services only for lawful
                                purposes and in accordance with these Terms. You
                                agree not to use our services for any illegal or
                                unauthorized purpose, violate any applicable
                                laws or regulations, infringe upon the rights of
                                others, transmit harmful, offensive, or
                                inappropriate content, attempt to gain
                                unauthorized access to our systems, interfere
                                with or disrupt our services, use our services
                                to transmit spam or unsolicited communications,
                                or provide false or misleading information.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                4. Payment Terms
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Fees are due upon receipt of invoice unless
                                otherwise agreed in writing. Late payments may
                                result in additional charges and service
                                suspension. All fees are non-refundable unless
                                otherwise specified. We reserve the right to
                                modify our pricing with appropriate notice.
                                Payment methods accepted will be specified in
                                your service agreement. For detailed pricing
                                information, please refer to our pricing page or
                                contact us directly.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                5. Intellectual Property
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Our website and services contain intellectual
                                property owned by Robust Accounts, including
                                copyrights, trademarks, service marks, trade
                                secrets and proprietary information, software,
                                algorithms, and technology, and content,
                                designs, and branding. You may not reproduce,
                                distribute, modify, or create derivative works
                                without our express written consent.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                6. Privacy
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Your privacy is important to us. Our collection
                                and use of personal information is governed by
                                our{' '}
                                <Link
                                    href="/privacy-policy"
                                    className="text-primary underline"
                                >
                                    Privacy Policy
                                </Link>
                                . We implement appropriate security measures to
                                protect your data and comply with applicable
                                data protection laws.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                7. Disclaimers
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Our services are provided "as is" and "as
                                available" without warranties of any kind,
                                either express or implied. We provide accounting
                                and advisory services, but we do not guarantee
                                specific financial outcomes. Investment
                                decisions should be made based on your own
                                research and consultation with qualified
                                professionals. To the maximum extent permitted
                                by law, Robust Accounts shall not be liable for
                                any indirect, incidental, special,
                                consequential, or punitive damages.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                8. Indemnification
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                You agree to indemnify and hold harmless Robust
                                Accounts, its officers, directors, employees,
                                and agents from and against any claims, damages,
                                obligations, losses, liabilities, costs, or debt
                                arising from your use of our services or
                                violation of these Terms.
                            </p>
                        </div>

                        {/* Section 9 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                9. Termination
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We may terminate or suspend your access to our
                                services immediately, without prior notice, for
                                any reason, including breach of these Terms.
                                Upon termination, your right to use our services
                                will cease immediately, and we may delete your
                                account and data in accordance with our data
                                retention policies.
                            </p>
                        </div>

                        {/* Section 10 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                10. Governing Law
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                These Terms shall be governed by and construed
                                in accordance with the laws of Florida, United
                                States, without regard to its conflict of law
                                provisions. Any disputes arising from these
                                Terms or our services shall be resolved through
                                binding arbitration in accordance with the rules
                                of the American Arbitration Association, unless
                                otherwise required by law.
                            </p>
                        </div>

                        {/* Section 11 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                11. Changes To Terms
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We reserve the right to modify these Terms at
                                any time. We will notify users of any material
                                changes by posting the new Terms on this page
                                and updating the "Last updated" date. Your
                                continued use of our services after such changes
                                constitutes acceptance of the new Terms.
                            </p>
                        </div>

                        {/* Section 12 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                12. Contact Us
                            </h2>
                            <p className="mb-2 leading-relaxed text-gray-700">
                                If you have any questions about these Terms of
                                Service, please contact us:
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                Email:{' '}
                                <Link
                                    href={`mailto:${contactInfo.emailHref}`}
                                    className="text-primary underline"
                                >
                                    {contactInfo.emailDisplay}
                                </Link>
                                , Phone:{' '}
                                <Link
                                    href={`tel:${contactInfo.phoneHref}`}
                                    className="text-primary underline"
                                >
                                    {contactInfo.phoneDisplay}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
