'use client';

import gsap from 'gsap';
import { Check, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';
import { ArrowIcon } from '@/lib/icons';

const comparisonData = [
    {
        category: 'Technology & Innovation',
        robustAccounts: {
            title: 'Cutting-Edge Technology',
            features: [
                'Cloud-based accounting platforms',
                'Real-time financial reporting',
                'Automated processes and AI integration',
                'Mobile accessibility',
                'Advanced security protocols',
            ],
        },
        traditional: {
            title: 'Traditional Methods',
            features: [
                'Manual paper-based processes',
                'Delayed reporting cycles',
                'Limited automation',
                'Office-bound access only',
                'Basic security measures',
            ],
        },
    },
    {
        category: 'Accessibility & Convenience',
        robustAccounts: {
            title: '24/7 Global Access',
            features: [
                'Round-the-clock service availability',
                'Global team across time zones',
                'Instant communication channels',
                'No geographical limitations',
                'Flexible engagement models',
            ],
        },
        traditional: {
            title: 'Limited Availability',
            features: [
                'Business hours only',
                'Local team constraints',
                'Phone/email communication only',
                'Geographical restrictions',
                'Fixed service packages',
            ],
        },
    },
    {
        category: 'Cost & Efficiency',
        robustAccounts: {
            title: 'Cost-Effective Solutions',
            features: [
                'Predictable monthly pricing',
                'No overhead costs passed to clients',
                'Scalable services as you grow',
                'Reduced operational expenses',
                'Higher ROI on accounting spend',
            ],
        },
        traditional: {
            title: 'Higher Costs',
            features: [
                'Variable hourly billing',
                'Office overhead included in fees',
                'Fixed service limitations',
                'Additional charges for extra work',
                'Lower cost efficiency',
            ],
        },
    },
    {
        category: 'Expertise & Specialization',
        robustAccounts: {
            title: 'Specialized Expertise',
            features: [
                'Industry-specific knowledge',
                'Multi-country compliance expertise',
                'Dedicated specialists for each service',
                'Continuous training and certification',
                'Access to global best practices',
            ],
        },
        traditional: {
            title: 'General Practice',
            features: [
                'Limited industry specialization',
                'Local compliance focus only',
                'Generalist approach',
                'Variable training standards',
                'Local market knowledge only',
            ],
        },
    },
];

export default function ComparisonSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from('[data-animate]', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section ref={sectionRef} className="bg-theme-offwhite py-20 lg:py-28">
            <div className="cust-container">
                {/* Header */}
                <div className="mb-16 text-center">
                    <span
                        data-animate
                        className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                    >
                        Why Choose Us
                    </span>
                    <h2
                        data-animate
                        className="mb-4 text-3xl leading-[1.1] font-light tracking-tight text-theme-black md:text-4xl lg:text-5xl"
                    >
                        Robust Accounts vs Traditional Firms
                    </h2>
                    <p data-animate className="mx-auto max-w-2xl text-gray-600">
                        Discover why modern businesses choose our innovative
                        approach over traditional accounting methods.
                    </p>
                </div>

                {/* Comparison Cards */}
                <div className="space-y-8">
                    {comparisonData.map((category, index) => (
                        <div
                            key={index}
                            data-animate
                            className="border border-gray-200 bg-white p-6 lg:p-10"
                        >
                            {/* Category Header */}
                            <h3 className="mb-8 text-center text-xl font-semibold text-theme-black lg:text-2xl">
                                {category.category}
                            </h3>

                            {/* Comparison Grid */}
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
                                {/* Robust Accounts Column */}
                                <div className="border border-primary/20 bg-primary/5 p-6 lg:p-8">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-primary">
                                            {category.robustAccounts.title}
                                        </h4>
                                        <span className="text-xs font-bold tracking-wider text-primary uppercase">
                                            Robust Accounts
                                        </span>
                                    </div>
                                    <ul className="space-y-3">
                                        {category.robustAccounts.features.map(
                                            (feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className="flex items-start gap-3"
                                                >
                                                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                                    <span className="text-gray-700">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>

                                {/* Traditional Firms Column */}
                                <div className="border border-gray-200 bg-gray-50 p-6 lg:p-8">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-gray-500">
                                            {category.traditional.title}
                                        </h4>
                                        <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                                            Traditional
                                        </span>
                                    </div>
                                    <ul className="space-y-3">
                                        {category.traditional.features.map(
                                            (feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className="flex items-start gap-3"
                                                >
                                                    <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                                                    <span className="text-gray-500">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div data-animate className="mt-16 text-center">
                    <p className="mx-auto mb-6 max-w-xl text-gray-600">
                        Ready to experience the difference? Join thousands of
                        businesses that have already made the switch to modern
                        accounting.
                    </p>
                    <Link
                        href="/lead-form/contact"
                        className="btn-div uppercase"
                    >
                        <span className="text-box">Schedule a Call</span>
                        <span className="icon-box">
                            <ArrowIcon size={14} className="text-white" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
