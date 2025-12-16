'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import React, { useRef } from 'react';

import IntuitQuickbooks from '@/components/ui/logo/intuit-quickbooks';
import Sage from '@/components/ui/logo/sage';
import Xero from '@/components/ui/logo/xero';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';


const SOFTWARE_PLATFORMS = [
    {
        name: 'QuickBooks',
        description: 'Industry-leading accounting and bookkeeping',
        Logo: IntuitQuickbooks,
    },
    {
        name: 'Xero',
        description: 'Cloud-based accounting for modern businesses',
        Logo: Xero,
    },
    {
        name: 'Sage',
        description: 'Comprehensive business management solutions',
        Logo: Sage,
    },
];

const EXPERTISE_BENEFITS = [
    'Certified Experts in all major platforms',
    'Seamless Integration with your existing systems',
    'Best Practices to maximize your software investment',
    'Ongoing Support and continuous training',
];

const SoftwaresMasterySection = () => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            const logos = gsap.utils.toArray<HTMLElement>('.software-logo');

            gsap.fromTo(
                logos,
                { autoAlpha: 0, y: 30 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
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
            className="bg-white py-20 text-theme-black lg:py-28"
        >
            <div className="cust-container">
                {/* Header */}
                <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <span
                            className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                            data-animate="fade-up"
                        >
                            Software Expertise
                        </span>
                        <h2
                            className="text-4xl leading-[1.1] font-light tracking-tight text-theme-black md:text-5xl"
                            data-animate="fade-up"
                        >
                            Masters of Leading
                            <br />
                            Accounting Platforms.
                        </h2>
                    </div>
                    <div className="flex flex-col justify-end">
                        <p
                            className="max-w-md text-base leading-relaxed text-gray-600"
                            data-animate="fade-up"
                        >
                            We're certified experts in the world's most trusted
                            accounting platforms. Your business deserves the
                            best tools, and we know how to use them effectively.
                        </p>
                    </div>
                </div>

                {/* Software Grid */}
                <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {SOFTWARE_PLATFORMS.map((platform, index) => (
                        <div
                            key={index}
                            className="software-logo flex flex-col items-center border border-gray-200 bg-theme-offwhite p-8 text-center transition-all duration-500 hover:border-transparent hover:shadow-lg lg:p-10"
                        >
                            {/* Actual Logo */}
                            <div className="mb-6 flex h-16 items-center justify-center">
                                <platform.Logo className="h-12 w-auto max-w-[180px]" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-theme-black">
                                {platform.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {platform.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Benefits Bar */}
                <div className="border border-gray-200 bg-theme-offwhite p-8 lg:p-10">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {EXPERTISE_BENEFITS.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                                    <svg
                                        className="h-3 w-3 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-theme-black">
                                    {benefit}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SoftwaresMasterySection;
