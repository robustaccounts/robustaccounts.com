'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';
import { ArrowIcon } from '@/lib/icons';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

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

            // Background scale animation
            if (backgroundRef.current) {
                gsap.fromTo(
                    backgroundRef.current,
                    { scale: 1.08 },
                    {
                        scale: 1,
                        duration: 1.6,
                        ease: 'power2.out',
                        overwrite: true,
                    },
                );

                // Parallax scroll effect
                gsap.to(backgroundRef.current, {
                    yPercent: 10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            }

            // Overlay fade on scroll
            if (overlayRef.current) {
                gsap.fromTo(
                    overlayRef.current,
                    { opacity: 0.7 },
                    {
                        opacity: 0.9,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top top',
                            end: 'bottom top',
                            scrub: true,
                        },
                    },
                );
            }
        },
        { scope: containerRef, dependencies: [prefersReducedMotion] },
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-theme-black py-0 text-white"
            data-header-tone="dark"
        >
            {/* Background Image */}
            <div
                ref={backgroundRef}
                className="absolute inset-0 z-0 will-change-transform"
            >
                <Image
                    src="/images/how-it-works-hero.webp"
                    alt="How It Works"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority
                />
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-gradient-to-t from-theme-black/90 via-theme-black/40 to-theme-black/60"
                />
            </div>

            {/* Main Content Container */}
            <div className="cust-container relative z-20 flex h-full flex-col items-center justify-center text-center">
                {/* Centered Content */}
                <div className="mx-auto max-w-5xl">
                    {/* Eyebrow */}
                    <span
                        className="mb-6 block text-xs font-bold tracking-[0.2em] text-primary-light uppercase"
                        data-hero-reveal
                    >
                        Our Process
                    </span>

                    <h1
                        className="mb-8 text-4xl leading-[1.1] font-light tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                        data-hero-reveal
                    >
                        Simple Process,
                        <br />
                        <span className="font-medium">Exceptional Results</span>
                    </h1>

                    {/* CTA Button */}
                    <div className="flex justify-center" data-hero-reveal>
                        <Link
                            href="/lead-form/schedule"
                            className="btn-div uppercase"
                        >
                            <span className="text-box">Get Started Today</span>
                            <span className="icon-box">
                                <ArrowIcon size={14} className="text-white" />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Bottom Left Description */}
                <div
                    className="cust-container absolute bottom-16 left-0 w-full"
                    data-hero-reveal
                >
                    <p className="max-w-md text-left text-sm leading-relaxed text-white/80 md:text-base">
                        Our streamlined 3-step process ensures smooth transition
                        and timely management of your accounting needs.
                        Simplicity is our best policy.
                    </p>
                </div>
            </div>
        </section>
    );
}
