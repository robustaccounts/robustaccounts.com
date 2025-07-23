import contactInfo from '@/data/contact-info';

import React from 'react';

import Link from '@/ui/link';

export default function TermsOfService() {
    return (
        <div className="mt-28 min-h-screen">
            <div className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
                            Terms of Service
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
                                    1. Agreement to Terms
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    These Terms of Service ("Terms") govern your
                                    use of the Robust Accounts website and
                                    services. By accessing or using our
                                    services, you agree to be bound by these
                                    Terms. If you disagree with any part of
                                    these terms, you may not access our
                                    services.
                                </p>
                                <p className="mt-4 leading-relaxed text-gray-700">
                                    Robust Accounts ("we," "us," or "our")
                                    provides accounting, bookkeeping, financial
                                    advisory, and business advisory services to
                                    businesses and individuals.
                                </p>
                            </section>

                            {/* Services */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    2. Services
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    We provide the following services:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>Bookkeeping and accounting services</li>
                                    <li>Financial advisory and consulting</li>
                                    <li>Business advisory services</li>
                                    <li>Payroll processing and management</li>
                                    <li>Tax preparation and filing</li>
                                    <li>Financial statement preparation</li>
                                    <li>Budgeting and forecasting</li>
                                    <li>Compliance and regulatory support</li>
                                </ul>
                                <p className="mt-4 leading-relaxed text-gray-700">
                                    All services are subject to separate service
                                    agreements and engagement letters that will
                                    be provided to clients.
                                </p>
                            </section>

                            {/* User Accounts */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    3. User Accounts and Registration
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    When you create an account with us, you must
                                    provide accurate, complete, and current
                                    information. You are responsible for:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        Maintaining the confidentiality of your
                                        account credentials
                                    </li>
                                    <li>
                                        All activities that occur under your
                                        account
                                    </li>
                                    <li>
                                        Notifying us immediately of any
                                        unauthorized use
                                    </li>
                                    <li>
                                        Ensuring your account information
                                        remains accurate and up-to-date
                                    </li>
                                </ul>
                                <p className="mt-4 leading-relaxed text-gray-700">
                                    We reserve the right to terminate accounts
                                    that violate these Terms or are inactive for
                                    extended periods.
                                </p>
                            </section>

                            {/* Acceptable Use */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    4. Acceptable Use
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    You agree to use our services only for
                                    lawful purposes and in accordance with these
                                    Terms. You agree not to:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        Use our services for any illegal or
                                        unauthorized purpose
                                    </li>
                                    <li>
                                        Violate any applicable laws or
                                        regulations
                                    </li>
                                    <li>Infringe upon the rights of others</li>
                                    <li>
                                        Transmit harmful, offensive, or
                                        inappropriate content
                                    </li>
                                    <li>
                                        Attempt to gain unauthorized access to
                                        our systems
                                    </li>
                                    <li>
                                        Interfere with or disrupt our services
                                    </li>
                                    <li>
                                        Use our services to transmit spam or
                                        unsolicited communications
                                    </li>
                                    <li>
                                        Provide false or misleading information
                                    </li>
                                </ul>
                            </section>

                            {/* Payment Terms */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    5. Payment Terms
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Payment terms for our services are as
                                    follows:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        Fees are due upon receipt of invoice
                                        unless otherwise agreed in writing
                                    </li>
                                    <li>
                                        Late payments may result in additional
                                        charges and service suspension
                                    </li>
                                    <li>
                                        All fees are non-refundable unless
                                        otherwise specified
                                    </li>
                                    <li>
                                        We reserve the right to modify our
                                        pricing with appropriate notice
                                    </li>
                                    <li>
                                        Payment methods accepted will be
                                        specified in your service agreement
                                    </li>
                                </ul>
                                <p className="mt-4 leading-relaxed text-gray-700">
                                    For detailed pricing information, please
                                    refer to our pricing page or contact us
                                    directly.
                                </p>
                            </section>

                            {/* Intellectual Property */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    6. Intellectual Property Rights
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Our website and services contain
                                    intellectual property owned by Robust
                                    Accounts, including:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        Copyrights, trademarks, and service
                                        marks
                                    </li>
                                    <li>
                                        Trade secrets and proprietary
                                        information
                                    </li>
                                    <li>
                                        Software, algorithms, and technology
                                    </li>
                                    <li>Content, designs, and branding</li>
                                </ul>
                                <p className="mt-4 leading-relaxed text-gray-700">
                                    You may not reproduce, distribute, modify,
                                    or create derivative works without our
                                    express written consent.
                                </p>
                            </section>

                            {/* Privacy and Data */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    7. Privacy and Data Protection
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Your privacy is important to us. Our
                                    collection and use of personal information
                                    is governed by our{' '}
                                    <Link
                                        href="/privacy-policy"
                                        className="text-blue-600 underline hover:text-blue-800"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                                <p className="leading-relaxed text-gray-700">
                                    We implement appropriate security measures
                                    to protect your data and comply with
                                    applicable data protection laws.
                                </p>
                            </section>

                            {/* Disclaimers */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    8. Disclaimers and Limitations
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    <strong>Service Disclaimer:</strong> Our
                                    services are provided "as is" and "as
                                    available" without warranties of any kind,
                                    either express or implied.
                                </p>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    <strong>Financial Disclaimer:</strong> We
                                    provide accounting and advisory services,
                                    but we do not guarantee specific financial
                                    outcomes. Investment decisions should be
                                    made based on your own research and
                                    consultation with qualified professionals.
                                </p>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    <strong>Limitation of Liability:</strong> To
                                    the maximum extent permitted by law, Robust
                                    Accounts shall not be liable for any
                                    indirect, incidental, special,
                                    consequential, or punitive damages.
                                </p>
                            </section>

                            {/* Indemnification */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    9. Indemnification
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    You agree to indemnify and hold harmless
                                    Robust Accounts, its officers, directors,
                                    employees, and agents from and against any
                                    claims, damages, obligations, losses,
                                    liabilities, costs, or debt arising from
                                    your use of our services or violation of
                                    these Terms.
                                </p>
                            </section>

                            {/* Termination */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    10. Termination
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    We may terminate or suspend your access to
                                    our services immediately, without prior
                                    notice, for any reason, including breach of
                                    these Terms.
                                </p>
                                <p className="leading-relaxed text-gray-700">
                                    Upon termination, your right to use our
                                    services will cease immediately, and we may
                                    delete your account and data in accordance
                                    with our data retention policies.
                                </p>
                            </section>

                            {/* Governing Law */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    11. Governing Law and Dispute Resolution
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    These Terms shall be governed by and
                                    construed in accordance with the laws of
                                    [Your State/Country], without regard to its
                                    conflict of law provisions.
                                </p>
                                <p className="leading-relaxed text-gray-700">
                                    Any disputes arising from these Terms or our
                                    services shall be resolved through binding
                                    arbitration in accordance with the rules of
                                    [Arbitration Organization], unless otherwise
                                    required by law.
                                </p>
                            </section>

                            {/* Severability */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    12. Severability
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    If any provision of these Terms is found to
                                    be unenforceable or invalid, that provision
                                    will be limited or eliminated to the minimum
                                    extent necessary so that these Terms will
                                    otherwise remain in full force and effect.
                                </p>
                            </section>

                            {/* Changes to Terms */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    13. Changes to Terms
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    We reserve the right to modify these Terms
                                    at any time. We will notify users of any
                                    material changes by posting the new Terms on
                                    this page and updating the "Last updated"
                                    date. Your continued use of our services
                                    after such changes constitutes acceptance of
                                    the new Terms.
                                </p>
                            </section>

                            {/* Contact Information */}
                            <section className="flex flex-col gap-y-4">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    14. Contact Information
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    If you have any questions about these Terms
                                    of Service, please contact us:
                                </p>
                                <div className="flex flex-col gap-y-2 text-gray-700">
                                    <div>
                                        <span className="font-bold">
                                            Email:{' '}
                                        </span>
                                        <Link
                                            className="text-accent"
                                            href={`mailto:${contactInfo.emailHref}`}
                                        >
                                            {contactInfo.emailDisplay}
                                        </Link>
                                    </div>
                                    <div>
                                        <span className="font-bold">
                                            Phone:{' '}
                                        </span>
                                        <span className="text-accent">
                                            {contactInfo.phoneDisplay}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-bold">
                                            Address:{' '}
                                        </span>
                                        <span className="text-accent">
                                            {contactInfo.addressDisplay}
                                        </span>
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
