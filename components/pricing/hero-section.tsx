'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import React, { useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';

export default function HeroSection() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                '[data-hero-label]',
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.6 },
            )
                .fromTo(
                    '[data-hero-title]',
                    { autoAlpha: 0, y: 30 },
                    { autoAlpha: 1, y: 0, duration: 0.8 },
                    '-=0.3',
                )
                .fromTo(
                    '[data-hero-desc]',
                    { autoAlpha: 0, y: 20 },
                    { autoAlpha: 1, y: 0, duration: 0.6 },
                    '-=0.4',
                )
                .fromTo(
                    '[data-hero-badges]',
                    { autoAlpha: 0, y: 20 },
                    { autoAlpha: 1, y: 0, duration: 0.6 },
                    '-=0.3',
                );
        },
        { scope: sectionRef, dependencies: [prefersReducedMotion] },
    );

    return (
        <section
            ref={sectionRef}
            className="relative flex items-center justify-center overflow-hidden bg-white py-24 pb-0 lg:py-32 lg:pb-0!"
        >
            {/* Background Grid */}
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

            <div className="cust-container relative z-10">
                <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
                    {/* Label */}
                    <span
                        className="mb-6 text-xs font-bold tracking-[0.2em] text-primary uppercase"
                        data-hero-label
                    >
                        Simple, Transparent Pricing
                    </span>

                    {/* Main Heading */}
                    <h1
                        className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl"
                        data-hero-title
                    >
                        Pricing That Scales
                        <br />
                        <span className="text-primary">With Your Business</span>
                    </h1>

                    {/* Description */}
                    <p
                        className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg"
                        data-hero-desc
                    >
                        No surprises, no hidden fees. Pick a plan based on your
                        monthly expenses and get expert accounting that grows
                        with your business.
                    </p>

                    {/* Trust Badges */}
                    {/* <div
                        className="flex flex-wrap items-center justify-center gap-4"
                        data-hero-badges
                    >
                        <div className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm text-gray-700">
                            <svg
                                className="h-4 w-4 text-primary"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Cancel anytime
                        </div>
                        <div className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm text-gray-700">
                            <svg
                                className="h-4 w-4 text-primary"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            No setup fees
                        </div>
                        <div className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm text-gray-700">
                            <svg
                                className="h-4 w-4 text-primary"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Save 10% annually
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
