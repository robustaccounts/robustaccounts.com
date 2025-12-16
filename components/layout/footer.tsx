'use client';

import Link from 'next/link';
import React from 'react';

import { LinkedInIcon, TwitterIcon } from '@/lib/icons';
import { SOCIAL_LINKS } from '@/lib/layout-constants';

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white pt-16 pb-8 text-theme-black">
            <div className="cust-container">
                {/* Main Footer Grid - 4 Columns */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                    {/* Column 1: Contact Us + Head Office */}
                    <div>
                        <h4 className="mb-6 text-xs font-bold tracking-widest text-theme-black! uppercase">
                            Contact Us
                        </h4>
                        <div className="mb-8 space-y-3 text-sm">
                            <p>
                                <a
                                    href="tel:+18133370109"
                                    className="transition-colors hover:text-primary"
                                >
                                    +1 (813) 337-0109
                                </a>
                            </p>
                            <p>
                                <a
                                    href="mailto:consultations@robustaccounts.com"
                                    className="transition-colors hover:text-primary"
                                >
                                    consultations@robustaccounts.com
                                </a>
                            </p>
                        </div>

                        <h4 className="mb-4 text-xs font-bold tracking-widest text-theme-black uppercase">
                            Head Office
                        </h4>
                        <p className="text-sm leading-relaxed text-gray-600">
                            280 Fallswater Road Northeast,
                            <br />
                            Calgary, AB T3J 1B3, Canada
                        </p>
                    </div>

                    {/* Column 2: Empty spacer */}
                    <div className="hidden lg:block"></div>

                    {/* Columns 3 & 4: Services + Company (2-column grid on mobile) */}
                    <div className="col-span-1 grid grid-cols-2 gap-8 py-8 md:contents">
                        {/* Services */}
                        <div>
                            <h4 className="mb-6 text-xs font-bold tracking-widest text-theme-black uppercase">
                                Services
                            </h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/services/bookkeeping"
                                        className="text-sm transition-colors hover:text-primary"
                                    >
                                        Bookkeeping
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/services/payroll"
                                        className="text-sm transition-colors hover:text-primary"
                                    >
                                        Payroll
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/services/financial-advisory"
                                        className="text-sm transition-colors hover:text-primary"
                                    >
                                        Financial Advisory
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="mb-6 text-xs font-bold tracking-widest text-theme-black uppercase">
                                Company
                            </h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-sm transition-colors hover:text-primary"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/pricing"
                                        className="text-sm transition-colors hover:text-primary"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/how-it-works"
                                        className="text-sm transition-colors hover:text-primary"
                                    >
                                        How It Works
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-sm transition-colors hover:text-primary"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/faq"
                                        className="text-sm transition-colors hover:text-primary"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright & Legal Row */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-6 md:flex-row">
                    {/* Copyright - Left */}
                    <p className="text-sm!" style={{ color: '#0f0f0f' }}>
                        © {new Date().getFullYear()} Robust Accounts. All rights
                        reserved.
                    </p>

                    {/* Legal Links - Right */}
                    <div
                        className="flex gap-6 text-sm"
                        style={{ color: '#0f0f0f' }}
                    >
                        <Link
                            href="/privacy-policy"
                            className="transition-colors hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/cookie-policy"
                            className="transition-colors hover:text-primary"
                        >
                            Cookie Policy
                        </Link>
                        <Link
                            href="/terms-of-service"
                            className="transition-colors hover:text-primary"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>

                {/* Social Links - Commented out for future use
                <div className="flex items-center gap-4 border-t border-gray-200 py-6">
                    <span className="text-xs font-bold tracking-widest text-theme-black uppercase">
                        Follow Us
                    </span>
                    <div className="flex gap-3">
                        <a
                            href={SOCIAL_LINKS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-theme-black transition-colors hover:text-primary"
                        >
                            <LinkedInIcon />
                        </a>
                        <a
                            href={SOCIAL_LINKS.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-theme-black transition-colors hover:text-primary"
                        >
                            <TwitterIcon />
                        </a>
                    </div>
                </div>
                */}

                {/* Disclaimer Row */}
                <div className="border-t border-gray-200 py-4">
                    <p className="text-left !text-sm text-gray-400">
                        Disclaimer: Robust Accounts is a part of KY Books Inc.
                        We are an independent entity and are not affiliated
                        with, endorsed by, or connected to any other brand,
                        company, or organization unless explicitly stated. All
                        trademarks, brand names, and logos appearing on this
                        website are the property of their respective owners and
                        are used strictly for informational and reference
                        purposes only.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
