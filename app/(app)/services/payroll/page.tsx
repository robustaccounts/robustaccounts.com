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
        title: 'Automated Payroll Runs',
        description:
            'Set it and forget it. We handle your payroll schedule, whether weekly, bi-weekly, or monthly.',
    },
    {
        title: 'Tax Filing & Compliance',
        description:
            'We calculate, file, and pay your federal, state, and local payroll taxes automatically.',
    },
    {
        title: 'Employee Self-Service',
        description:
            'Employees get their own portal to view pay stubs, W-2s, and manage personal details.',
    },
    {
        title: 'Year-End W-2s & 1099s',
        description:
            'We generate and distribute all necessary year-end tax forms to your team and contractors.',
    },
];

const processSteps = [
    {
        title: 'Sync Employee Data',
        description:
            'Enter hours worked or sync with your time-tracking software. We verify the data for accuracy.',
    },
    {
        title: 'Review & Approve',
        description:
            "We prepare the payroll run and send you a summary for approval. One click and you're done.",
    },
    {
        title: 'Direct Deposit & Tax Filing',
        description:
            'Funds are deposited directly into employee accounts, and all payroll taxes are filed automatically.',
    },
];

const audience = [
    'Growing companies hiring their first employees',
    'Businesses tired of payroll tax penalties',
    'Remote teams in multiple states/jurisdictions',
    'Companies managing a mix of W-2s and contractors',
    'Owners who want to automate administrative tasks',
];

const faqs = [
    {
        question: 'Do you handle filings for all 50 states?',
        answer: 'Yes, we handle federal, state, and local payroll tax filings for employees in all 50 states.',
    },
    {
        question: 'Can I pay contractors (1099s) through this service?',
        answer: 'Absolutely. We can handle payments and year-end 1099 filings for all your independent contractors.',
    },
    {
        question: 'How long does direct deposit take?',
        answer: 'Standard processing is 2-4 business days. Next-day and same-day options are available.',
    },
    {
        question: 'Who handles onboarding new employees?',
        answer: 'We provide self-service onboarding flows where new hires enter their info securely.',
    },
];

export default function PayrollPage() {
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
                                Payroll
                            </span>
                            <h1
                                className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl"
                                data-animate
                            >
                                Payroll that works for{' '}
                                <span className="text-primary">
                                    you & your team
                                </span>
                            </h1>
                            <p
                                className="mb-8 max-w-lg text-base leading-relaxed text-gray-600 md:text-lg"
                                data-animate
                            >
                                Streamlined payroll processing, automated tax
                                filings, and full compliance. We ensure your
                                team gets paid on time, every time.
                            </p>
                            <div data-animate>
                                <Link
                                    href="/lead-form/schedule?source=payroll"
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
                                src="/assets/images/payroll-hero.png"
                                alt="Payroll service"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-theme-offwhite py-20 lg:py-28">
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
                            Payroll Made Simple
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
                                className="bg-theme-offwhite p-8 transition-shadow hover:shadow-lg"
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
                description="Answers to frequently asked questions about our payroll services."
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
                            Ready to Simplify Payroll?
                        </h2>
                        <p
                            className="mb-10 text-base text-gray-600"
                            data-animate
                        >
                            Let us handle the complexity so you can focus on
                            your team.
                        </p>
                        <div data-animate>
                            <Link
                                href="/lead-form/schedule?source=payroll"
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
