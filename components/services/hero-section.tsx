'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import Link from 'next/link';
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
                '[data-animate-label]',
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.6 },
            )
                .fromTo(
                    '[data-animate-title]',
                    { autoAlpha: 0, y: 30 },
                    { autoAlpha: 1, y: 0, duration: 0.8 },
                    '-=0.3',
                )
                .fromTo(
                    '[data-animate-desc]',
                    { autoAlpha: 0, y: 20 },
                    { autoAlpha: 1, y: 0, duration: 0.6 },
                    '-=0.4',
                )
                .fromTo(
                    '[data-animate-cta]',
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
            className="relative overflow-hidden bg-white py-24 lg:py-32"
        >
            {/* Background Grid */}
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

            <div className="cust-container relative z-10">
                <div className="max-w-3xl">
                    <span
                        className="mb-6 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                        data-animate-label
                    >
                        Our Services
                    </span>
                    <h1
                        className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl"
                        data-animate-title
                    >
                        Complete Accounting
                        <br />
                        For Your Business
                    </h1>
                    <p
                        className="mb-10 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg"
                        data-animate-desc
                    >
                        From daily bookkeeping to strategic financial advisory,
                        we provide comprehensive accounting services tailored to
                        help your business grow.
                    </p>
                    <div data-animate-cta>
                        <Link
                            href="/lead-form/schedule?source=services"
                            className="btn-div inline-flex uppercase"
                        >
                            <span className="text-box">Schedule a Call</span>
                            <span className="icon-box">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
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
    );
}
