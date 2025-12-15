'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import Link from 'next/link';
import React, { useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';
import { ArrowIcon } from '@/lib/icons';

const HeroSection = () => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            const tl = gsap.timeline();
            const reveals = gsap.utils.toArray<HTMLElement>(
                '[data-hero-reveal]',
                containerRef.current || undefined,
            );

            tl.fromTo(
                reveals,
                { y: 60, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    stagger: 0.16,
                    ease: 'power3.out',
                    delay: 0.25,
                },
            );

            // Subtle parallax on background
            if (backgroundRef.current) {
                gsap.to(backgroundRef.current, {
                    yPercent: 8,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            }
        },
        { scope: containerRef, dependencies: [prefersReducedMotion] },
    );

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen w-full items-center overflow-hidden bg-theme-offwhite py-0 text-theme-black"
            data-header-tone="light"
        >
            {/* Background Pattern */}
            <div
                ref={backgroundRef}
                className="grid-lines absolute inset-0 z-0 opacity-50 will-change-transform"
            />

            {/* Gradient Orbs */}
            <div className="pointer-events-none absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[80px]" />

            {/* Main Content Container */}
            <div className="cust-container relative z-20 py-32 lg:py-40">
                <div className="max-w-4xl">
                    {/* Label */}
                    <div className="mb-6" data-hero-reveal>
                        <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                            Accounting Operations
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1
                        className="mb-8 text-4xl leading-[1.05] font-light tracking-tight text-theme-black sm:text-5xl md:text-6xl lg:text-7xl"
                        data-hero-reveal
                    >
                        Run your finance function
                        <br />
                        <span className="font-medium">
                            without the overhead.
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        className="mb-10 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg"
                        data-hero-reveal
                    >
                        Accounting, payroll, and financial reporting — fully
                        owned and operated by a dedicated offshore team. Built
                        for growing businesses that need control, accuracy, and
                        accountability.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col gap-4 sm:flex-row"
                        data-hero-reveal
                    >
                        <Link
                            href="/lead-form/schedule"
                            className="btn-div uppercase"
                        >
                            <span className="text-box">
                                Get a Financial Ops Plan
                            </span>
                            <span className="icon-box">
                                <ArrowIcon size={14} className="text-white" />
                            </span>
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center border border-theme-black/15 px-8 py-[1rem] text-[0.85rem] font-bold tracking-[0.1em] text-theme-black uppercase transition-all hover:border-primary hover:text-primary"
                        >
                            View Pricing
                        </Link>
                    </div>

                    {/* Trust Line */}
                    <p className="mt-12 text-sm text-gray-500" data-hero-reveal>
                        Supporting founders managing $500k–$20M businesses
                        across multiple industries.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
