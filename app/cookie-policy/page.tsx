import contactInfo from '@/data/contact-info';

import React from 'react';

import Link from '@/ui/link';

export default function CookiePolicy() {
    return (
        <div className="mt-28 min-h-screen">
            <div className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
                            Cookie Policy
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
                                    This Cookie Policy explains how Robust
                                    Accounts ("we," "us," or "our") uses cookies
                                    and similar technologies when you visit our
                                    website. This policy should be read
                                    alongside our{' '}
                                    <Link
                                        href="/privacy-policy"
                                        className="text-blue-600 underline hover:text-blue-800"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                                <p className="mt-4 leading-relaxed text-gray-700">
                                    By using our website, you consent to the use
                                    of cookies in accordance with this policy.
                                    If you do not agree to our use of cookies,
                                    you should set your browser settings
                                    accordingly or refrain from using our
                                    website.
                                </p>
                            </section>

                            {/* What Are Cookies */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    2. What Are Cookies?
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Cookies are small text files that are placed
                                    on your device (computer, tablet, or mobile
                                    phone) when you visit a website. They are
                                    widely used to make websites work more
                                    efficiently and provide information to
                                    website owners.
                                </p>
                                <p className="leading-relaxed text-gray-700">
                                    Cookies can be "persistent" or "session"
                                    cookies. Persistent cookies remain on your
                                    device for a set period or until you delete
                                    them, while session cookies are deleted when
                                    you close your browser.
                                </p>
                            </section>

                            {/* How We Use Cookies */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    3. How We Use Cookies
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    We use cookies for several purposes,
                                    including:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        <strong>Essential Cookies:</strong>{' '}
                                        Required for the website to function
                                        properly
                                    </li>
                                    <li>
                                        <strong>Analytics Cookies:</strong> Help
                                        us understand how visitors interact with
                                        our website
                                    </li>
                                    <li>
                                        <strong>Functional Cookies:</strong>{' '}
                                        Remember your preferences and settings
                                    </li>
                                    <li>
                                        <strong>Marketing Cookies:</strong> Used
                                        to deliver relevant advertisements
                                    </li>
                                    <li>
                                        <strong>Security Cookies:</strong> Help
                                        protect against fraud and ensure
                                        security
                                    </li>
                                </ul>
                            </section>

                            {/* Types of Cookies We Use */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    4. Types of Cookies We Use
                                </h2>

                                <h3 className="mb-3 text-xl font-medium text-gray-900">
                                    4.1 Essential Cookies
                                </h3>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    These cookies are necessary for the website
                                    to function and cannot be switched off in
                                    our systems. They are usually only set in
                                    response to actions made by you, such as:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>Setting your privacy preferences</li>
                                    <li>Logging in or filling in forms</li>
                                    <li>Shopping cart functionality</li>
                                    <li>Security features</li>
                                </ul>

                                <h3 className="mt-6 mb-3 text-xl font-medium text-gray-900">
                                    4.2 Analytics Cookies
                                </h3>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    These cookies allow us to count visits and
                                    traffic sources so we can measure and
                                    improve the performance of our site. They
                                    help us know which pages are popular and
                                    least popular and see how visitors move
                                    around the site.
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>Google Analytics cookies</li>
                                    <li>Page view tracking</li>
                                    <li>User behavior analysis</li>
                                    <li>Performance monitoring</li>
                                </ul>

                                <h3 className="mt-6 mb-3 text-xl font-medium text-gray-900">
                                    4.3 Functional Cookies
                                </h3>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    These cookies enable the website to provide
                                    enhanced functionality and personalization.
                                    They may be set by us or by third-party
                                    providers whose services we have added to
                                    our pages.
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>Language preferences</li>
                                    <li>Region settings</li>
                                    <li>User interface customization</li>
                                    <li>Form auto-completion</li>
                                </ul>

                                <h3 className="mt-6 mb-3 text-xl font-medium text-gray-900">
                                    4.4 Marketing Cookies
                                </h3>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    These cookies may be set through our site by
                                    our advertising partners. They may be used
                                    by those companies to build a profile of
                                    your interests and show you relevant
                                    advertisements.
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>Social media integration</li>
                                    <li>Advertising tracking</li>
                                    <li>Retargeting campaigns</li>
                                    <li>Conversion tracking</li>
                                </ul>
                            </section>

                            {/* Third-Party Cookies */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    5. Third-Party Cookies
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Our website may use third-party services
                                    that set their own cookies. These services
                                    include:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        <strong>Google Analytics:</strong> For
                                        website analytics and performance
                                        monitoring
                                    </li>
                                    <li>
                                        <strong>Google Ads:</strong> For
                                        advertising and conversion tracking
                                    </li>
                                    <li>
                                        <strong>Facebook Pixel:</strong> For
                                        social media advertising
                                    </li>
                                    <li>
                                        <strong>LinkedIn Insight Tag:</strong>{' '}
                                        For professional networking analytics
                                    </li>
                                    <li>
                                        <strong>Chat Services:</strong> For
                                        customer support and communication
                                    </li>
                                </ul>
                                <p className="mt-4 leading-relaxed text-gray-700">
                                    These third-party services have their own
                                    privacy policies and cookie policies. We
                                    encourage you to review their policies for
                                    more information.
                                </p>
                            </section>

                            {/* Cookie Management */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    6. Managing Your Cookie Preferences
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    You can control and manage cookies in
                                    several ways:
                                </p>

                                <h3 className="mb-3 text-xl font-medium text-gray-900">
                                    6.1 Browser Settings
                                </h3>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Most web browsers allow you to control
                                    cookies through their settings preferences.
                                    However, if you limit the ability of
                                    websites to set cookies, you may worsen your
                                    overall user experience.
                                </p>

                                <h3 className="mb-3 text-xl font-medium text-gray-900">
                                    6.2 Cookie Consent
                                </h3>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    When you first visit our website, you will
                                    see a cookie consent banner. You can manage
                                    your cookie preferences through this banner
                                    or by clicking the "Cookie Settings" link in
                                    our footer.
                                </p>

                                <h3 className="mb-3 text-xl font-medium text-gray-900">
                                    6.3 Opt-Out Tools
                                </h3>
                                <p className="leading-relaxed text-gray-700">
                                    You can opt out of certain types of cookies,
                                    particularly marketing cookies, through
                                    industry opt-out tools such as:
                                </p>
                                <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>Digital Advertising Alliance (DAA)</li>
                                    <li>
                                        Network Advertising Initiative (NAI)
                                    </li>
                                    <li>
                                        European Interactive Digital Advertising
                                        Alliance (EDAA)
                                    </li>
                                </ul>
                            </section>

                            {/* Specific Cookie Details */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    7. Specific Cookies We Use
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-900">
                                                    Cookie Name
                                                </th>
                                                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-900">
                                                    Purpose
                                                </th>
                                                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-900">
                                                    Duration
                                                </th>
                                                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-900">
                                                    Type
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    _ga
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Google Analytics -
                                                    Distinguishes unique users
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    2 years
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Analytics
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    _gid
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Google Analytics -
                                                    Distinguishes users
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    24 hours
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Analytics
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    _gat
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Google Analytics - Throttles
                                                    request rate
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    1 minute
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Analytics
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    cookie_consent
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Remembers your cookie
                                                    preferences
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    1 year
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Functional
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    session_id
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Maintains your session
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Session
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-sm">
                                                    Essential
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Updates to Policy */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    8. Updates to This Cookie Policy
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    We may update this Cookie Policy from time
                                    to time to reflect changes in our practices
                                    or for other operational, legal, or
                                    regulatory reasons. We will notify you of
                                    any material changes by posting the updated
                                    policy on our website and updating the "Last
                                    updated" date.
                                </p>
                            </section>

                            {/* Contact Information */}
                            <section className="flex flex-col gap-y-4">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    9. Contact Us
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    If you have any questions about our use of
                                    cookies or this Cookie Policy, please
                                    contact us:
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
                                        <Link
                                            className="text-accent"
                                            href={`tel:${contactInfo.phoneHref}`}
                                        >
                                            {contactInfo.phoneDisplay}
                                        </Link>
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

                            {/* Additional Resources */}
                            <section>
                                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                                    10. Additional Resources
                                </h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    For more information about cookies and how
                                    to manage them, you can visit:
                                </p>
                                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
                                    <li>
                                        <Link
                                            href="https://www.allaboutcookies.org"
                                            className="text-blue-600 underline hover:text-blue-800"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            All About Cookies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="https://www.youronlinechoices.com"
                                            className="text-blue-600 underline hover:text-blue-800"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Your Online Choices
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="https://www.networkadvertising.org"
                                            className="text-blue-600 underline hover:text-blue-800"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Network Advertising Initiative
                                        </Link>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
