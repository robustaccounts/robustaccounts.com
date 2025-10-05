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
        <footer className="bg-secondary/30">
            <div className="flex flex-col gap-10 px-5 py-12 sm:gap-12 sm:px-8 sm:py-14 md:grid md:grid-cols-5 md:gap-12 lg:px-16 lg:py-16">
                <div className="col-span-2 flex flex-col gap-5 lg:max-w-4/5">
                    <span className="text-xl font-bold text-primary sm:text-2xl">
                        Robust Accounts
                    </span>
                    <p className="text-sm leading-relaxed font-medium text-gray-700 sm:text-base">
                        Transform your business with expert accounting
                        outsourcing services. We provide comprehensive financial
                        solutions tailored to your needs.
                    </p>
                    {/* phone email and address */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <Link
                            href={`tel:${contactInfo.phoneHref}`}
                            className="flex items-center gap-3 transition-colors hover:text-accent"
                        >
                            <div className="rounded-full bg-accent/10 p-2">
                                <Call className="h-5 w-5 fill-accent" />
                            </div>
                            <span className="text-sm font-semibold sm:text-base">
                                {contactInfo.phoneDisplay}
                            </span>
                        </Link>
                        <Link
                            href={`mailto:${contactInfo.emailHref}`}
                            className="flex items-center gap-3 transition-colors hover:text-accent"
                        >
                            <div className="rounded-full bg-accent/10 p-2">
                                <Mail className="h-5 w-5 fill-accent" />
                            </div>
                            <span className="text-sm font-semibold sm:text-base">
                                {contactInfo.emailDisplay}
                            </span>
                        </Link>
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 rounded-full bg-accent/10 p-2">
                                <LocationOn className="h-5 w-5 fill-accent" />
                            </div>
                            <span className="text-sm font-semibold sm:text-base">
                                {contactInfo.addressDisplay}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12">
                    {/* Services */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <h4 className="text-base font-bold text-primary sm:text-lg">
                            Services
                        </h4>
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            {services.map((service) => (
                                <Link
                                    key={service.title}
                                    href={service.href}
                                    className="text-sm font-medium text-gray-700 transition-colors hover:text-accent sm:text-base"
                                >
                                    {service.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Company */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <h4 className="text-base font-bold text-primary sm:text-lg">
                            About us
                        </h4>
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            {about.map((about) => (
                                <Link
                                    key={about.title}
                                    href={about.href}
                                    className="text-sm font-medium text-gray-700 transition-colors hover:text-accent sm:text-base"
                                >
                                    {about.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Resources */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <h4 className="text-base font-bold text-primary sm:text-lg">
                            Resources
                        </h4>
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            {resources.map((resource) => (
                                <Link
                                    key={resource.title}
                                    href={resource.href}
                                    className="text-sm font-medium text-gray-700 transition-colors hover:text-accent sm:text-base"
                                >
                                    {resource.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Policies */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <h4 className="text-base font-bold text-primary sm:text-lg">
                            Policies
                        </h4>
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            {policies.map((policy) => (
                                <Link
                                    key={policy.title}
                                    href={policy.href}
                                    className="text-sm font-medium text-gray-700 transition-colors hover:text-accent sm:text-base"
                                >
                                    {policy.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Footer fine print */}
                <div className="mt-6 border-t border-gray-200 pt-6 md:col-span-5">
                    <div className="flex w-full flex-col gap-3 text-center md:text-left">
                        <span className="text-sm font-semibold text-gray-700 sm:text-base">
                            © {new Date().getFullYear()} Robust Accounts. All
                            rights reserved.
                        </span>
                        <p className="w-full text-xs leading-relaxed text-gray-600 sm:text-sm">
                            Disclaimer: Robust Accounts is a part of KY Books
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
