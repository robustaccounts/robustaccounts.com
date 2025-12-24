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
        title: 'Fund Accounting',
        description:
            'Track donations, grants, and program funds separately with proper fund accounting that meets donor and regulatory requirements.',
    },
    {
        title: 'Form 990 Preparation',
        description:
            'Expert preparation of Form 990, 990-EZ, or 990-N to maintain your tax-exempt status and satisfy IRS requirements.',
    },
    {
        title: 'Grant Reporting',
        description:
            'Accurate financial reports for grantors showing how funds were used in compliance with grant agreements.',
    },
    {
        title: 'Donor Management',
        description:
            'Track contributions, generate donor acknowledgment letters, and maintain records for tax-deductible donations.',
    },
];

const processSteps = [
    {
        title: 'Initial Assessment',
        description:
            'We review your current financial setup, 501(c)(3) status, and reporting requirements to understand your needs.',
    },
    {
        title: 'Dedicated Team Assignment',
        description:
            'Get a team familiar with non-profit regulations, fund accounting, and state/federal compliance requirements.',
    },
    {
        title: 'Ongoing Compliance',
        description:
            'Monthly bookkeeping, annual Form 990 filing, and regular financial reporting to keep your organization in good standing.',
    },
];

const audience = [
    'Charitable organizations focused on social good',
    'Religious organizations and churches',
    'Educational institutions and foundations',
    'Healthcare non-profits and clinics',
    'Arts and cultural organizations',
    'Environmental and advocacy groups',
];

const taxServices = [
    {
        title: 'Form 990 Filing',
        description:
            'Annual information returns filed accurately and on time to maintain tax-exempt status.',
    },
    {
        title: '501(c)(3) Applications',
        description:
            'Expert assistance with Form 1023 to help your organization achieve tax-exempt status.',
    },
    {
        title: 'Public Support Testing',
        description:
            'Calculations to ensure your organization meets public charity status requirements.',
    },
    {
        title: 'UBI Analysis',
        description:
            'Unrelated Business Income tax analysis and activity cost allocations.',
    },
];

const faqs = [
    {
        question: 'What is Form 990 and when is it due?',
        answer: 'Form 990 is an annual information return required by the IRS for tax-exempt organizations. It is due on the 15th day of the 5th month after your fiscal year ends (typically May 15th for calendar-year organizations).',
    },
    {
        question: 'What accounting software do you use for non-profits?',
        answer: 'We work with QuickBooks Online and specialized non-profit accounting software that supports fund accounting and restricted fund tracking.',
    },
    {
        question: 'Can you help us apply for 501(c)(3) status?',
        answer: 'Yes, we assist with Form 1023 preparation and filing to help your organization obtain tax-exempt status under section 501(c)(3).',
    },
    {
        question: 'How do you handle restricted vs unrestricted funds?',
        answer: 'We set up proper fund accounting to track restricted donations separately from unrestricted funds, ensuring compliance with donor restrictions and grant requirements.',
    },
];

export default function NonProfitPage() {
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
                                Non-Profit
                            </span>
                            <h1
                                className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl"
                                data-animate
                            >
                                Accounting for organizations{' '}
                                <span className="text-primary">
                                    that make a difference
                                </span>
                            </h1>
                            <p
                                className="mb-8 max-w-lg text-base leading-relaxed text-gray-600 md:text-lg"
                                data-animate
                            >
                                Non-profit accounting is complex. From fund
                                accounting to Form 990 filings, our team ensures
                                your books are accurate and your tax-exempt
                                status is protected.
                            </p>
                            <div data-animate>
                                <Link
                                    href="/lead-form/schedule?source=non-profit"
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
                                src="/assets/images/nonprofit-hero.png"
                                alt="Non-profit accounting services"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Non-Profit Expertise Section */}
            <section className="bg-theme-offwhite py-20 lg:py-28">
                <div className="cust-container">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        <div
                            className="relative h-[400px] overflow-hidden shadow-xl lg:h-[500px]"
                            data-animate
                        >
                            <Image
                                src="/assets/images/nonprofit-team.png"
                                alt="Non-profit accounting experts"
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
                                Our Expertise
                            </span>
                            <h2
                                className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl"
                                data-animate
                            >
                                Non-Profit Know-How,{' '}
                                <span className="text-primary">
                                    Real Results
                                </span>
                            </h2>
                            <p
                                className="mb-8 text-base leading-relaxed text-gray-600"
                                data-animate
                            >
                                Our team understands the unique challenges
                                non-profits face. We're familiar with state and
                                federal laws, IRS requirements, and the
                                reporting standards that keep your organization
                                compliant and transparent.
                            </p>
                            <ul className="space-y-4" data-animate>
                                {[
                                    'CPAs experienced with 501(c)(3) organizations',
                                    'Knowledge of state and federal non-profit regulations',
                                    'Expertise in fund accounting and restricted funds',
                                    'Direct access for questions and guidance',
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
                            Comprehensive Non-Profit Accounting
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

            {/* Tax Services Section */}
            <section className="bg-theme-offwhite py-20 lg:py-28">
                <div className="cust-container">
                    <div className="mb-16">
                        <span
                            className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                            data-animate
                        >
                            Tax Services
                        </span>
                        <h2
                            className="text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl"
                            data-animate
                        >
                            Non-Profit Tax Compliance
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {taxServices.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 transition-shadow hover:shadow-lg"
                                data-animate
                            >
                                <h3 className="mb-3 text-xl font-semibold text-theme-black">
                                    {service.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="bg-white py-20 lg:py-28">
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
                                className="border border-gray-200 p-8 transition-shadow hover:shadow-lg"
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
                description="Answers to frequently asked questions about our non-profit accounting services."
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
                            Let us handle your non-profit accounting so you can
                            focus on your mission.
                        </p>
                        <div data-animate>
                            <Link
                                href="/lead-form/schedule?source=non-profit"
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
