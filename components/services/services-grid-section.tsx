'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React, { useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';


const services = [
    {
        id: 'bookkeeping',
        title: 'Bookkeeping & Accounting',
        description:
            'Comprehensive bookkeeping services to keep your financial records accurate and up-to-date.',
        features: [
            'Daily transaction recording',
            'Bank reconciliation',
            'Accounts payable/receivable',
            'Monthly financial statements',
        ],
        pricing: 'Starting at $160/month',
        popular: true,
    },
    {
        id: 'payroll',
        title: 'Payroll Management',
        description:
            'Complete payroll processing including payments, taxes, and compliance reporting.',
        features: [
            'Employee payment processing',
            'Tax withholding & filings',
            'Benefits administration',
            'Direct deposit setup',
        ],
        pricing: 'Starting at $150/month',
        popular: false,
    },
    {
        id: 'financial-advisory',
        title: 'Financial Advisory',
        description:
            'Strategic financial insights to support budgeting, forecasting, and business growth.',
        features: [
            'Budget planning & analysis',
            'Cash flow forecasting',
            'Financial reporting',
            'Growth strategy consulting',
        ],
        pricing: 'Starting at $300/month',
        popular: false,
    },
];

export default function ServicesGridSection() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            const cards = gsap.utils.toArray<HTMLElement>('.service-card');

            gsap.fromTo(
                cards,
                { autoAlpha: 0, y: 24 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 95%',
                        once: true,
                    },
                },
            );
        },
        { scope: sectionRef, dependencies: [prefersReducedMotion] },
    );

    return (
        <section ref={sectionRef} className="bg-theme-offwhite py-20 lg:py-28">
            <div className="cust-container">
                {/* Header */}
                <div className="mb-16">
                    <span className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase">
                        What We Offer
                    </span>
                    <h2 className="mb-4 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl">
                        Choose Your Service
                    </h2>
                    <p className="max-w-lg text-base text-gray-600">
                        Professional accounting services designed to scale with
                        your business
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`service-card relative flex flex-col border bg-white p-8 transition-all duration-300 hover:shadow-lg ${
                                service.popular
                                    ? 'border-2 border-primary'
                                    : 'border-gray-200 hover:border-primary'
                            }`}
                        >
                            {/* Popular Badge */}
                            {service.popular && (
                                <div className="absolute -top-3 left-6 bg-primary px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
                                    Most Popular
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex flex-grow flex-col">
                                <h3 className="mb-2 text-xl font-semibold text-theme-black">
                                    {service.title}
                                </h3>
                                <p className="mb-4 text-sm font-semibold text-primary">
                                    {service.pricing}
                                </p>
                                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <div className="mb-8 flex-grow space-y-3">
                                    {service.features.map(
                                        (feature, featureIndex) => (
                                            <div
                                                key={featureIndex}
                                                className="flex items-start gap-2"
                                            >
                                                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                                                <span className="text-sm text-gray-700">
                                                    {feature}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>

                                {/* CTA */}
                                <Link
                                    href={`/services/${service.id}`}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                                >
                                    Learn More
                                    <svg
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
