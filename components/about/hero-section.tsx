'use client';

import gsap from 'gsap';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';
import { ArrowIcon } from '@/lib/icons';

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from('[data-animate]', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[80vh] w-full overflow-hidden bg-white"
        >
            {/* Grid lines background */}
            <div className="grid-lines pointer-events-none absolute inset-0" />

            <div className="cust-container relative z-10 flex min-h-[80vh] flex-col justify-center py-24 lg:py-32">
                <div className="max-w-4xl">
                    <span
                        data-animate
                        className="mb-6 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                    >
                        About Robust Accounts
                    </span>
                    <h1
                        data-animate
                        className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl"
                    >
                        Your Trusted Financial Partner for Global Success
                    </h1>
                    <p
                        data-animate
                        className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl"
                    >
                        With years of expertise in international accounting and
                        taxation, we serve clients across the USA, UK, Canada,
                        Australia, and India. Our mission is to provide
                        world-class financial services that help businesses
                        thrive globally.
                    </p>
                    <div data-animate>
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
            </div>
        </section>
    );
}
