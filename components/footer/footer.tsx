import contactInfo from '@/data/contact-info';

import React from 'react';

import { Call, LocationOn, Mail } from '@/ui/icons/google-icons';
import Link from '@/ui/link';

const services = [
    {
        title: 'Bookkeeping',
        href: '/services/bookkeeping',
    },
    {
        title: 'Payroll Services',
        href: '/services/payroll',
    },
    {
        title: 'Financial Advisory',
        href: '/services/financial-advisory',
    },
    {
        title: 'Business Advisory',
        href: '/services/business-advisory',
    },
];

const about = [
    {
        title: 'About Us',
        href: '/about',
    },
    {
        title: 'How It Works',
        href: '/how-it-works',
    },

    {
        title: 'Blog',
        href: '/blog',
    },
    {
        title: 'Contact Us',
        href: '/contact',
    },
];

const resources = [
    {
        title: 'Blog',
        href: '/blog',
    },
    {
        title: 'FAQ',
        href: '/faq',
    },
];

const policies = [
    {
        title: 'Privacy Policy',
        href: '/privacy-policy',
    },
    {
        title: 'Terms of Service',
        href: '/terms-of-service',
    },
    {
        title: 'Cookie Policy',
        href: '/cookie-policy',
    },
];

export default function Footer() {
    return (
        <footer className="">
            <div className="flex flex-col gap-12 px-4 py-8 sm:px-6 md:grid md:grid-cols-5 lg:px-12">
                <div className="col-span-2 flex flex-col gap-4 lg:max-w-4/5">
                    <span className="text-xl font-bold">
                        robustaccounts.com
                    </span>
                    <p className="text-base font-medium">
                        Transform your business with expert accounting
                        outsourcing services. We provide comprehensive financial
                        solutions tailored to your needs.
                    </p>
                    {/* phone email and address */}
                    <div className="flex flex-col gap-4">
                        <Link
                            href={`tel:${contactInfo.phoneHref}`}
                            className="flex items-center gap-2"
                        >
                            <Call className="h-6 w-6 fill-primary" />
                            <span className="text-sm font-medium">
                                {contactInfo.phoneDisplay}
                            </span>
                        </Link>
                        <Link
                            href={`mailto:${contactInfo.emailHref}`}
                            className="flex items-center gap-2"
                        >
                            <Mail className="h-6 w-6 fill-primary" />
                            <span className="text-sm font-medium">
                                {contactInfo.emailDisplay}
                            </span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <LocationOn className="h-6 w-6 fill-primary" />
                            <span className="text-sm font-medium">
                                {contactInfo.addressDisplay}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
                    {/* Services */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-lg font-semibold text-primary">
                            Services
                        </h4>
                        <div className="flex flex-col gap-2">
                            {services.map((service) => (
                                <Link
                                    key={service.title}
                                    href={service.href}
                                    className="text-sm font-medium transition-colors sm:text-base"
                                >
                                    {service.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Company */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-lg font-semibold text-primary">
                            About us
                        </h4>
                        <div className="flex flex-col gap-2">
                            {about.map((about) => (
                                <Link
                                    key={about.title}
                                    href={about.href}
                                    className="text-sm font-medium transition-colors sm:text-base"
                                >
                                    {about.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Resources */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-lg font-semibold text-primary">
                            Resources
                        </h4>
                        <div className="flex flex-col gap-2">
                            {resources.map((resource) => (
                                <Link
                                    key={resource.title}
                                    href={resource.href}
                                    className="text-sm font-medium transition-colors sm:text-base"
                                >
                                    {resource.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Policies */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-lg font-semibold text-primary">
                            Policies
                        </h4>
                        <div className="flex flex-col gap-2">
                            {policies.map((policy) => (
                                <Link
                                    key={policy.title}
                                    href={policy.href}
                                    className="text-sm font-medium transition-colors sm:text-base"
                                >
                                    {policy.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Footer fine print */}
                <div className="pt-4 mt-6 border-t border-gray-200 md:col-span-5">
                    <div className="flex w-full flex-col gap-2 text-center md:text-left">
                        <span className="text-sm">
                            © 2025 Robust Accounts. All rights reserved.
                        </span>
                        <p className="w-full text-sm leading-relaxed">
                            Disclaimer: Robustaccounts.com is a part of KY Books
                            Inc. We are an independent entity and are not
                            affiliated with, endorsed by, or connected to any
                            other brand, company, or organization unless
                            explicitly stated. All trademarks, brand names, and
                            logos appearing on this website are the property of
                            their respective owners and are used strictly for
                            informational and reference purposes only.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
