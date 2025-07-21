import React from 'react';

import Link from '@/ui/link';

export default function PrivacyPolicy() {
    return (
        <div className="mt-28 min-h-screen">
            <div className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-gray-600">
                            Last updated:{' '}
                            {new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg rounded-lg bg-white p-4 shadow-sm">
                        <div className="space-y-8">
                            {/* Introduction */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    1. Introduction
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    Robust Accounts ("we," "our," or "us") is
                                    committed to protecting your privacy. This
                                    Privacy Policy explains how we collect, use,
                                    disclose, and safeguard your information
                                    when you visit our website, use our
                                    services, or interact with us in any way.
                                </p>
                                <p className="mt-4 leading-relaxed text-gray-700">
                                    By using our services, you agree to the
                                    collection and use of information in
                                    accordance with this policy. If you do not
                                    agree with our policies and practices,
                                    please do not use our services.
                                </p>
                            </section>

                            {/* Information We Collect */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    2. Information We Collect
                                </h2>

                                <h3 className="mb-3 text-xl font-medium text-gray-900">
                                    2.1 Personal Information
                                </h3>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    We may collect personal information that you
                                    voluntarily provide to us, including:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        Name and contact information (email
                                        address, phone number, mailing address)
                                    </li>
                                    <li>
                                        Business information (company name,
                                        industry, business size)
                                    </li>
                                    <li>
                                        Financial information (for service
                                        provision)
                                    </li>
                                    <li>Communication preferences</li>
                                    <li>
                                        Information you provide in forms,
                                        surveys, or consultations
                                    </li>
                                </ul>

                                <h3 className="mt-6 mb-3 text-xl font-medium text-gray-900">
                                    2.2 Automatically Collected Information
                                </h3>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    When you visit our website, we automatically
                                    collect certain information, including:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>IP address and device information</li>
                                    <li>Browser type and version</li>
                                    <li>Operating system</li>
                                    <li>
                                        Pages visited and time spent on pages
                                    </li>
                                    <li>Referring website</li>
                                    <li>
                                        Cookies and similar tracking
                                        technologies
                                    </li>
                                </ul>
                            </section>

                            {/* How We Use Information */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    3. How We Use Your Information
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    We use the information we collect for
                                    various purposes, including:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        Providing and maintaining our accounting
                                        and advisory services
                                    </li>
                                    <li>
                                        Processing transactions and managing
                                        accounts
                                    </li>
                                    <li>
                                        Communicating with you about our
                                        services
                                    </li>
                                    <li>
                                        Sending important updates and
                                        notifications
                                    </li>
                                    <li>Improving our website and services</li>
                                    <li>Analyzing usage patterns and trends</li>
                                    <li>Complying with legal obligations</li>
                                    <li>
                                        Marketing and promotional purposes (with
                                        your consent)
                                    </li>
                                </ul>
                            </section>

                            {/* Information Sharing */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    4. Information Sharing and Disclosure
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    We do not sell, trade, or otherwise transfer
                                    your personal information to third parties
                                    without your consent, except in the
                                    following circumstances:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        <strong>Service Providers:</strong> We
                                        may share information with trusted
                                        third-party service providers who assist
                                        us in operating our business
                                    </li>
                                    <li>
                                        <strong>Legal Requirements:</strong> We
                                        may disclose information when required
                                        by law or to protect our rights and
                                        safety
                                    </li>
                                    <li>
                                        <strong>Business Transfers:</strong> In
                                        the event of a merger, acquisition, or
                                        sale of assets, your information may be
                                        transferred
                                    </li>
                                    <li>
                                        <strong>Consent:</strong> We may share
                                        information with your explicit consent
                                    </li>
                                </ul>
                            </section>

                            {/* Data Security */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    5. Data Security
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    We implement appropriate technical and
                                    organizational security measures to protect
                                    your personal information against
                                    unauthorized access, alteration, disclosure,
                                    or destruction. These measures include:
                                </p>
                                <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>Encryption of sensitive data</li>
                                    <li>Regular security assessments</li>
                                    <li>Access controls and authentication</li>
                                    <li>Secure data transmission protocols</li>
                                    <li>
                                        Employee training on data protection
                                    </li>
                                </ul>
                            </section>

                            {/* Cookies */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    6. Cookies and Tracking Technologies
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    We use cookies and similar tracking
                                    technologies to enhance your experience on
                                    our website. For detailed information about
                                    our use of cookies, please see our{' '}
                                    <a
                                        href="/cookie-policy"
                                        className="text-blue-600 underline hover:text-blue-800"
                                    >
                                        Cookie Policy
                                    </a>
                                    .
                                </p>
                            </section>

                            {/* Your Rights */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    7. Your Rights and Choices
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    You have certain rights regarding your
                                    personal information, including:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        <strong>Access:</strong> Request access
                                        to your personal information
                                    </li>
                                    <li>
                                        <strong>Correction:</strong> Request
                                        correction of inaccurate information
                                    </li>
                                    <li>
                                        <strong>Deletion:</strong> Request
                                        deletion of your personal information
                                    </li>
                                    <li>
                                        <strong>Portability:</strong> Request a
                                        copy of your data in a portable format
                                    </li>
                                    <li>
                                        <strong>Opt-out:</strong> Opt out of
                                        marketing communications
                                    </li>
                                    <li>
                                        <strong>Restriction:</strong> Request
                                        restriction of processing
                                    </li>
                                </ul>
                                <p className="mt-4 leading-relaxed text-gray-700">
                                    To exercise these rights, please contact us
                                    using the information provided below.
                                </p>
                            </section>

                            {/* Data Retention */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    8. Data Retention
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    We retain your personal information for as
                                    long as necessary to fulfill the purposes
                                    outlined in this Privacy Policy, unless a
                                    longer retention period is required or
                                    permitted by law. When we no longer need
                                    your information, we will securely delete or
                                    anonymize it.
                                </p>
                            </section>

                            {/* Children's Privacy */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    9. Children's Privacy
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    Our services are not intended for children
                                    under the age of 13. We do not knowingly
                                    collect personal information from children
                                    under 13. If you believe we have collected
                                    information from a child under 13, please
                                    contact us immediately.
                                </p>
                            </section>

                            {/* International Transfers */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    10. International Data Transfers
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    Your information may be transferred to and
                                    processed in countries other than your own.
                                    We ensure that such transfers comply with
                                    applicable data protection laws and
                                    implement appropriate safeguards to protect
                                    your information.
                                </p>
                            </section>

                            {/* Changes to Policy */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    11. Changes to This Privacy Policy
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    We may update this Privacy Policy from time
                                    to time. We will notify you of any changes
                                    by posting the new Privacy Policy on this
                                    page and updating the "Last updated" date.
                                    We encourage you to review this Privacy
                                    Policy periodically.
                                </p>
                            </section>

                            {/* Contact Information */}
                            <section className="flex flex-col gap-y-4">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    12. Contact Us
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    If you have any questions about this Privacy
                                    Policy or our data practices, please contact
                                    us:
                                </p>
                                <div className="flex flex-col gap-y-2 text-gray-700">
                                    <div>
                                        <span className="font-bold">
                                            Email:{' '}
                                        </span>
                                        <Link
                                            className="text-accent"
                                            href="mailto:privacy@robustaccounts.com"
                                        >
                                            privacy@robustaccounts.com
                                        </Link>
                                    </div>
                                    <div>
                                        <span className="font-bold">
                                            Phone:{' '}
                                        </span>
                                        <Link
                                            className="text-accent"
                                            href="tel:+14153000000"
                                        >
                                            +1 (415) 300-0000
                                        </Link>
                                    </div>

                                    <div>
                                        <span className="font-bold">
                                            Address:{' '}
                                        </span>
                                        <Link
                                            className="text-accent"
                                            href="https://maps.app.goo.gl/1234567890"
                                        >
                                            [Your Business Address] (TODO)
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
