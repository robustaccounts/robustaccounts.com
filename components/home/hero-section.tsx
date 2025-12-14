'use client';

import { motion, Variants } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import cn from '@/utils/cn';

// Animation variants with improved timing
const heroContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const heroItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

export default function HeroSection() {
    // Parallax state
    const [scrollY, setScrollY] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            // Only update if the hero is in the viewport
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                setScrollY(window.scrollY);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Parallax factor for content
    const contentParallax = scrollY * 0.06;

    return (
        <section
            ref={sectionRef}
            className={cn(
                'hero-section relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden',
                'bg-gradient-to-b from-white via-secondary/30 to-secondary/60',
            )}
        >
            {/* Subtle background decorative elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Top-right glow */}
                <div 
                    className="absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full opacity-[0.07]"
                    style={{
                        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                    }}
                />
                {/* Bottom-left glow */}
                <div 
                    className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full opacity-[0.05]"
                    style={{
                        background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                    }}
                />
            </div>

            <motion.div
                variants={heroContainer}
                initial="hidden"
                animate="show"
                className={cn(
                    'relative z-20 flex h-full w-full flex-col items-center justify-center gap-6 px-5 py-16 will-change-transform sm:gap-8 sm:px-8 sm:py-20 md:gap-10 md:px-12 md:py-24 lg:px-16',
                )}
                style={{
                    transform: contentParallax
                        ? `translateY(-${contentParallax}px)`
                        : undefined,
                }}
            >
                {/* Main Content */}
                <motion.div
                    variants={heroItem}
                    className="flex w-full max-w-4xl flex-col items-center justify-center space-y-6 text-center sm:space-y-7 md:space-y-8"
                >
                    {/* Main Headline */}
                    <motion.h1
                        variants={heroItem}
                        className="text-center text-[1.85rem] leading-[1.15] font-bold tracking-[-0.025em] text-primary sm:text-[2.5rem] md:text-[3rem] lg:text-[3.75rem]"
                    >
                        Run your finance function
                        <br />
                        <span className="font-medium text-primary/80">
                            without building an internal team.
                        </span>
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.p
                        variants={heroItem}
                        className="max-w-2xl px-4 text-center text-base leading-[1.7] text-gray-600 sm:text-lg md:text-xl md:leading-[1.6]"
                    >
                        Accounting, payroll, and financial reporting — fully owned and operated by a dedicated offshore team.
                    </motion.p>

                    {/* Supporting Line */}
                    <motion.p
                        variants={heroItem}
                        className="max-w-xl px-4 text-center text-[0.8125rem] leading-relaxed text-gray-500 sm:text-sm md:text-base"
                    >
                        Built for growing businesses that need control, accuracy, and accountability.
                    </motion.p>

                    {/* Primary CTA */}
                    <motion.div
                        variants={heroItem}
                        className="flex flex-col items-center gap-5 pt-4 sm:pt-6"
                    >
                        <Link
                            href="/lead-form/schedule"
                            className={cn(
                                'group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-7 py-3.5 text-[0.9375rem] font-medium text-white transition-all duration-300 sm:px-9 sm:py-4 sm:text-base',
                                'hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20',
                                'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
                            )}
                        >
                            <span className="relative z-10">Get a Financial Ops Plan</span>
                        </Link>

                        {/* Authority Line */}
                        <p className="max-w-md text-center text-[0.8125rem] leading-relaxed text-gray-500 sm:text-sm">
                            Supporting founders managing $500k–$20M businesses across multiple industries.
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Bottom fade for smooth transition */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
