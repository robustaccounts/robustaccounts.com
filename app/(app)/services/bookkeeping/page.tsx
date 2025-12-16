'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';

import FAQSection from '@/components/ui/faq-section';

const features = [
    {
        title: 'Daily Transaction Categorization',
        description:
            'We categorize every transaction daily so your books are always up to date.',
    },
    {
        title: 'Bank Reconciliation',
        description:
            'Monthly reconciliation of all bank and credit card accounts to ensure accuracy.',
    },
    {
        title: 'Financial Reporting',
        description:
            'Get detailed Profit & Loss, Balance Sheet, and Cash Flow statements every month.',
    },
    {
        title: 'Tax-Ready Financials',
        description:
            'We prepare clean financial packages ready for your tax CPA at year-end.',
    },
];

const processSteps = [
    {
        title: 'Connect Your Accounts',
        description:
            'Securely connect your bank feeds and credit cards. We integrate with QuickBooks, Xero, and more.',
    },
    {
        title: 'We Categorize & Reconcile',
        description:
            'Our bookkeepers categorize daily transactions and reconcile accounts monthly.',
    },
    {
        title: 'Receive Monthly Reports',
        description:
            'By the 15th of each month, you get accurate P&L and Balance Sheet reports.',
    },
];

const audience = [
    'Small Business Owners overwhelmed by paperwork',
    'Startups needing investor-ready financials',
    'Agencies wanting to track profitability per client',
    'E-commerce stores with high transaction volume',
    'Businesses preparing for tax season',
    'Companies replacing an expensive in-house bookkeeper',
];

const faqs = [
    {
        question: 'Do you work with my CPA?',
        answer: 'Absolutely. We prepare your books so your CPA can focus on tax strategy and filing.',
    },
    {
        question: 'Which accounting software do you support?',
        answer: 'We primarily work with QuickBooks Online and Xero, the industry standards.',
    },
    {
        question: 'How secure is my financial data?',
        answer: 'We use bank-level 256-bit encryption. We never have authority to move your money.',
    },
    {
        question: 'What if I am behind on my books?',
        answer: 'No problem! We offer catch-up services to bring messy data up to date.',
    },
];

export default function BookkeepingPage() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const pageRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((el) => {
                gsap.fromTo(
                    el,
                    { autoAlpha: 0, y: 20 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            once: true,
                        },
                    },
                );
            });
        },
        { scope: pageRef, dependencies: [prefersReducedMotion] },
    );

    return (
        <main ref={pageRef} className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white py-24 lg:py-32">
                <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
                <div className="cust-container relative z-10">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <span
                                className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                                data-animate
                            >
                                Bookkeeping
                            </span>
                            <h1
                                className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl"
                                data-animate
                            >
                                Accurate bookkeeping for{' '}
                                <span className="text-primary">
                                    peace of mind
                                </span>
                            </h1>
                            <p
                                className="mb-8 max-w-lg text-base leading-relaxed text-gray-600 md:text-lg"
                                data-animate
                            >
                                Stop worrying about your books. Our expert team
                                handles daily transactions, reconciliations, and
                                reporting so you can focus on growing your
                                business.
                            </p>
                            <div data-animate>
                                <Link
                                    href="/lead-form/schedule?source=bookkeeping"
                                    className="btn-div inline-flex uppercase"
                                >
                                    <span className="text-box">
                                        Get Started
                                    </span>
                                    <span className="icon-box">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.67227 14.6363L4.59045 13.5545L12.0086 6.13632H5.36318V4.59087H14.6359V13.8636H13.0905V7.21814L5.67227 14.6363Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div
                            className="relative h-[400px] overflow-hidden shadow-2xl lg:h-[500px]"
                            data-animate
                        >
                            <Image
                                src="/assets/images/bookkeeping-hero.png"
                                alt="Bookkeeping service"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Team Section */}
            <section className="bg-theme-offwhite py-20 lg:py-28">
                <div className="cust-container">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        <div
                            className="relative h-[400px] overflow-hidden shadow-xl lg:h-[500px]"
                            data-animate
                        >
                            <Image
                                src="/assets/images/bookkeeping-team-v2.png"
                                alt="Our expert accounting team"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        <div>
                            <span
                                className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                                data-animate
                            >
                                Our Team
                            </span>
                            <h2
                                className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl"
                                data-animate
                            >
                                Real Humans,{' '}
                                <span className="text-primary">
                                    Real Expertise
                                </span>
                            </h2>
                            <p
                                className="mb-8 text-base leading-relaxed text-gray-600"
                                data-animate
                            >
                                Behind every report is a dedicated team of
                                accounting professionals. We aren't just
                                software – we're real people who care about your
                                business's financial health.
                            </p>
                            <ul className="space-y-4" data-animate>
                                {[
                                    'Dedicated bookkeeper for your account',
                                    'Senior accountant review for every close',
                                    'Direct access via email and phone',
                                    'Proactive advice, not just data entry',
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3 text-sm text-gray-700"
                                    >
                                        <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-white py-20 lg:py-28">
                <div className="cust-container">
                    <div className="mb-16">
                        <span
                            className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                            data-animate
                        >
                            What's Included
                        </span>
                        <h2
                            className="text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl"
                            data-animate
                        >
                            Comprehensive Bookkeeping
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="border-l-2 border-primary py-2 pl-6"
                                data-animate
                            >
                                <h3 className="mb-2 text-lg font-semibold text-theme-black">
                                    {feature.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="bg-theme-offwhite py-20 lg:py-28">
                <div className="cust-container">
                    <div className="mb-16">
                        <span
                            className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                            data-animate
                        >
                            How It Works
                        </span>
                        <h2
                            className="text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl"
                            data-animate
                        >
                            Simple 3-Step Process
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {processSteps.map((step, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 transition-shadow hover:shadow-lg"
                                data-animate
                            >
                                <span className="mb-4 block text-sm font-bold text-primary">
                                    0{index + 1}
                                </span>
                                <h3 className="mb-3 text-xl font-semibold text-theme-black">
                                    {step.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Is This For - Dark Section */}
            <section className="bg-theme-black py-20 text-white lg:py-28">
                <div className="cust-container">
                    <div className="mb-16">
                        <span
                            className="mb-4 block text-xs font-bold tracking-[0.2em] uppercase"
                            style={{ color: '#34d399' }}
                            data-animate
                        >
                            Perfect For
                        </span>
                        <h2
                            className="text-4xl leading-[1.05] font-light tracking-tight md:text-5xl"
                            data-animate
                        >
                            Who Is This For?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {audience.map((item, index) => (
                            <div
                                key={index}
                                className="border border-white/20 p-6 transition-colors hover:border-primary"
                                data-animate
                            >
                                <p
                                    className="text-sm"
                                    style={{ color: '#ffffff' }}
                                >
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection
                faqs={faqs}
                eyebrow="FAQ"
                title={`Common
Questions.`}
                description="Answers to frequently asked questions about our bookkeeping services."
                showViewAllButton={false}
            />

            {/* CTA Section */}
            <section className="bg-theme-offwhite py-20 lg:py-28">
                <div className="cust-container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2
                            className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl"
                            data-animate
                        >
                            Ready to Get Started?
                        </h2>
                        <p
                            className="mb-10 text-base text-gray-600"
                            data-animate
                        >
                            Let us handle your books so you can focus on what
                            you do best.
                        </p>
                        <div data-animate>
                            <Link
                                href="/lead-form/schedule?source=bookkeeping"
                                className="btn-div inline-flex uppercase"
                            >
                                <span className="text-box">
                                    Schedule a Call
                                </span>
                                <span className="icon-box">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.67227 14.6363L4.59045 13.5545L12.0086 6.13632H5.36318V4.59087H14.6359V13.8636H13.0905V7.21814L5.67227 14.6363Z"
                                            fill="white"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
