import siteConfig from '@/siteconfig';

import Link from 'next/link';
import React from 'react';

export default function PrivacyPolicy() {
    const { contactInfo } = siteConfig;

    return (
        <main className="flex min-h-screen flex-col bg-white">
            {/* Hero Section */}
            <div className="cust-container pt-24 lg:pt-32">
                <h1 className="text-4xl font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl">
                    Privacy Policy
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
                                This policy explains how we collect and use your
                                personal information on this website. The policy
                                may be amended from time to time. When we do, we
                                will let you know by appropriate means such as
                                by posting the revised policy on this page with
                                a new "Last Updated" date. By using this site
                                you agree to the collection and use of your
                                information in accordance with this policy. If
                                you do not wish to accept our privacy practices,
                                please do not use this site.
                            </p>
                            <p className="mt-4 text-sm text-gray-500">
                                Last Updated: December 3, 2025
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                1. Information We Collect
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We may collect personal information that you
                                voluntarily provide to us, including your name,
                                email address, phone number, mailing address,
                                business information (company name, industry,
                                business size), financial information (for
                                service provision), and any information you
                                provide through forms, surveys, or
                                consultations. We also automatically collect
                                certain information when you visit our website,
                                including your IP address, browser type,
                                operating system, pages visited, and cookies.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                2. How We Use Your Information
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We use the information we collect for providing
                                and maintaining our accounting and advisory
                                services, processing transactions and managing
                                accounts, communicating with you about our
                                services, sending important updates and
                                notifications, improving our website and
                                services, analyzing usage patterns and trends,
                                complying with legal obligations, and marketing
                                and promotional purposes (with your consent).
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                3. Information Sharing
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We do not sell, trade, or otherwise transfer
                                your personal information to third parties
                                without your consent, except when sharing with
                                trusted third-party service providers who assist
                                us in operating our business, when required by
                                law or to protect our rights and safety, in the
                                event of a merger, acquisition, or sale of
                                assets, or with your explicit consent.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                4. Data Security
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We implement appropriate technical and
                                organizational security measures to protect your
                                personal information against unauthorized
                                access, alteration, disclosure, or destruction.
                                These measures include encryption of sensitive
                                data, regular security assessments, access
                                controls and authentication, secure data
                                transmission protocols, and employee training on
                                data protection.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                5. Cookies
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We use cookies and similar tracking technologies
                                to enhance your experience on our website. For
                                detailed information about our use of cookies,
                                please see our{' '}
                                <Link
                                    href="/cookie-policy"
                                    className="text-primary underline"
                                >
                                    Cookie Policy
                                </Link>
                                .
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                6. Your Rights
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                You have certain rights regarding your personal
                                information, including the right to access your
                                personal information, request correction of
                                inaccurate information, request deletion of your
                                personal information, request a copy of your
                                data in a portable format, opt out of marketing
                                communications, and request restriction of
                                processing. To exercise these rights, please
                                contact us using the information provided below.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                7. Data Retention
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We retain your personal information for as long
                                as necessary to fulfill the purposes outlined in
                                this Privacy Policy, unless a longer retention
                                period is required or permitted by law. When we
                                no longer need your information, we will
                                securely delete or anonymize it.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                8. Children's Privacy
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Our services are not intended for children under
                                the age of 13. We do not knowingly collect
                                personal information from children under 13. If
                                you believe we have collected information from a
                                child under 13, please contact us immediately.
                            </p>
                        </div>

                        {/* Section 9 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                9. Changes to This Policy
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We may update this Privacy Policy from time to
                                time. We will notify you of any changes by
                                posting the new Privacy Policy on this page and
                                updating the "Last updated" date. We encourage
                                you to review this Privacy Policy periodically.
                            </p>
                        </div>

                        {/* Section 10 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                10. Contact Us
                            </h2>
                            <p className="mb-2 leading-relaxed text-gray-700">
                                If you have any questions about this Privacy
                                Policy or our data practices, please contact us:
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
