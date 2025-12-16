import siteConfig from '@/siteconfig';

import Link from 'next/link';
import React from 'react';

export default function CookiePolicy() {
    const { contactInfo } = siteConfig;

    return (
        <main className="flex min-h-screen flex-col bg-white">
            {/* Hero Section */}
            <div className="cust-container pt-24 lg:pt-32">
                <h1 className="text-4xl font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl">
                    Cookie Policy
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
                                This policy explains how cookies are used on
                                this website. The policy may be amended from
                                time to time. When we do, we will let you know
                                by appropriate means such as by posting the
                                revised policy on this page with a new "Last
                                Updated" date. By using this site you agree to
                                the placement of cookies on your computer in
                                accordance with the terms of this policy. If you
                                do not wish to accept cookies from this site
                                please either disable cookies or refrain from
                                using this site.
                            </p>
                            <p className="mt-4 text-sm text-gray-500">
                                Last Updated: December 3, 2025
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                1. What Are Cookies?
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                A cookie is a text-only string of information
                                that a website transfers to the cookie file of
                                the browser on your computer's hard disk so that
                                the website can recognise you when you revisit
                                and remember certain information about you. This
                                can include which pages you have visited,
                                choices you have made from menus, any specific
                                information you have entered into forms and the
                                time and date of your visit.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                2. Types Of Cookies
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Session cookies: these are temporary cookies
                                that expire at the end of a browser session;
                                that is, when you leave the site. Session
                                cookies allow the website to recognise you as
                                you navigate between pages during a single
                                browser session and allow you to use the website
                                most efficiently. For example, session cookies
                                enable a website to remember that a user has
                                placed items in an online shopping basket.
                                Persistent cookies: in contrast to session
                                cookies, persistent cookies are stored on your
                                equipment between browsing sessions until expiry
                                or deletion. They, therefore, enable the website
                                to "recognise" you on your return, remember your
                                preferences, and tailor services to you. In
                                addition to session cookies and persistent
                                cookies, there may be other cookies which are
                                set by the website which you have chosen to
                                visit, such as this website, in order to provide
                                us or third parties with information.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                3. Our Use Of Cookies
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We use cookies to distinguish you from other
                                users of our website. This helps us provide you
                                with a good experience when you browse and also
                                allows us to improve our site. We use the
                                following categories of cookies: Essential
                                cookies (required for the website to function
                                properly), Analytics cookies (help us understand
                                how visitors interact with our website),
                                Functional cookies (remember your preferences
                                and settings), and Marketing cookies (used to
                                deliver relevant advertisements).
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                4. Third-Party Cookies
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Our website may use third-party services that
                                set their own cookies. These services include
                                Google Analytics for website analytics and
                                performance monitoring, Google Ads for
                                advertising and conversion tracking, and various
                                chat services for customer support and
                                communication. These third-party services have
                                their own privacy policies and cookie policies.
                                We encourage you to review their policies for
                                more information.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                5. Managing Cookies
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                You can control and manage cookies in several
                                ways. Most web browsers allow you to control
                                cookies through their settings preferences.
                                However, if you limit the ability of websites to
                                set cookies, you may worsen your overall user
                                experience. You can also opt out of certain
                                types of cookies, particularly marketing
                                cookies, through industry opt-out tools such as
                                the Digital Advertising Alliance (DAA), Network
                                Advertising Initiative (NAI), and European
                                Interactive Digital Advertising Alliance (EDAA).
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                6. Changes To This Policy
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We may update this Cookie Policy from time to
                                time to reflect changes in our practices or for
                                other operational, legal, or regulatory reasons.
                                We will notify you of any material changes by
                                posting the updated policy on our website and
                                updating the "Last updated" date.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div>
                            <h2 className="mb-3 text-xl !font-medium text-primary">
                                7. Contact Us
                            </h2>
                            <p className="mb-2 leading-relaxed text-gray-700">
                                If you have any questions about our use of
                                cookies or this Cookie Policy, please contact
                                us:
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
