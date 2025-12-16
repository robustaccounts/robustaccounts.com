'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import Link from 'next/link';
import React, { useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';

const industries = [
    {
        name: 'Technology & SaaS',
        description:
            'Revenue recognition, equity accounting, and investor-ready financials.',
        href: '/lead-form/schedule?source=services&industry=technology',
    },
    {
        name: 'E-commerce & Retail',
        description:
            'Multi-channel reconciliation, inventory tracking, and sales tax compliance.',
        href: '/lead-form/schedule?source=services&industry=ecommerce',
    },
    {
        name: 'Healthcare',
        description:
            'Compliance-focused accounting with grant and regulatory reporting.',
        href: '/lead-form/schedule?source=services&industry=healthcare',
    },
    {
        name: 'Professional Services',
        description:
            'Project-based accounting, time tracking, and client billing.',
        href: '/lead-form/schedule?source=services&industry=professional-services',
    },
    {
        name: 'Real Estate',
        description:
            'Property accounting, tenant billing, and investment reporting.',
        href: '/lead-form/schedule?source=services&industry=real-estate',
    },
    {
        name: 'Non-Profit',
        description: 'Fund accounting, grant reporting, and donor management.',
        href: '/lead-form/schedule?source=services&industry=non-profit',
    },
];

export default function IndustriesSection() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            const cards = gsap.utils.toArray<HTMLElement>('.industry-card');

            gsap.fromTo(
                cards,
                { autoAlpha: 0, y: 20 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.06,
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
        <section
            ref={sectionRef}
            className="bg-theme-black py-20 text-white lg:py-28"
        >
            <div className="cust-container">
                {/* Header */}
                <div className="mb-16">
                    <span
                        className="mb-4 block text-xs font-bold tracking-[0.2em] uppercase"
                        style={{ color: '#34d399' }}
                    >
                        Industries
                    </span>
                    <h2 className="mb-4 text-4xl leading-[1.05] font-light tracking-tight md:text-5xl">
                        Specialized Expertise
                        <br />
                        Across Sectors
                    </h2>
                    <p
                        className="max-w-lg text-base"
                        style={{ color: '#ffffff' }}
                    >
                        Industry-specific accounting solutions tailored to your
                        unique business needs
                    </p>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {industries.map((industry, index) => (
                        <Link
                            key={index}
                            href={industry.href}
                            className="industry-card group border border-white/20 p-8 transition-colors duration-300 hover:border-primary"
                        >
                            <h3 className="mb-3 text-lg font-semibold transition-colors group-hover:text-primary">
                                {industry.name}
                            </h3>
                            <p
                                className="mb-4 text-sm leading-relaxed"
                                style={{ color: '#ffffff' }}
                            >
                                {industry.description}
                            </p>
                            <span
                                className="text-sm font-semibold"
                                style={{ color: '#34d399' }}
                            >
                                Learn More →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
