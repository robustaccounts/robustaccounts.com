'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

import ScheduleMyCallButton from '../ui/schedule-my-call-button';

// Animation variants and speed matching the reference
const heroContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const heroItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
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

    // Parallax factors for each layer
    const overlayParallax = scrollY * 0.18;
    const contentParallax = scrollY * 0.08;
    const trustParallax = scrollY * 0.18;

    return (
        <section
            ref={sectionRef}
            className={cn(
                'hero-section relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden',
            )}
        >
            {/* Optimized Background Image */}
            <Image
                src="/assets/images/hero-section-bg-2.png"
                alt=""
                fill
                priority
                className="object-cover"
                aria-hidden="true"
            />
            {/* Parallax Overlay for better text contrast */}
            <motion.div
                className={cn(
                    'pointer-events-none absolute inset-0 z-10 bg-black/70 will-change-transform',
                )}
                style={{
                    // Use Tailwind for overlay, but keep parallax effect
                    transform: overlayParallax
                        ? `translateY(${overlayParallax}px)`
                        : undefined,
                }}
                aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/40 to-transparent" />
            <motion.div
                variants={heroContainer}
                initial="hidden"
                animate="show"
                className={cn(
                    'relative z-20 flex h-full w-full flex-col items-center justify-center gap-6 px-4 py-8 will-change-transform sm:gap-8 sm:px-6 sm:py-16 md:gap-10 md:px-12 lg:px-16',
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
                    className="flex w-full max-w-4xl flex-col items-center justify-center space-y-4 text-center sm:space-y-6"
                >
                    {/* Main Headline */}
                    <motion.h1
                        variants={heroItem}
                        className="text-center text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
                        transition={{ duration: 0.5 }}
                    >
                        Transform Your{' '}
                        <span className="text-white">Business</span> with{' '}
                        <span className="text-white">Expert Accounting</span>{' '}
                        Solutions.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={heroItem}
                        className="max-w-3xl text-center text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl"
                        transition={{ duration: 0.5 }}
                    >
                        Save 40+ hours monthly and reduce costs by 60% with our
                        comprehensive accounting outsourcing services. Focus on
                        growth while we handle your finances.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={heroItem}
                        className="flex flex-col justify-center gap-3 sm:gap-4 md:flex-row md:gap-6"
                        transition={{ duration: 0.5 }}
                    >
                        <ScheduleMyCallButton size="lg" />
                    </motion.div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    variants={heroItem}
                    className={cn('flex flex-col items-center gap-3 px-4 py-6 will-change-transform sm:gap-4 sm:py-8')}
                    transition={{ duration: 0.5 }}
                    style={{
                        transform: trustParallax
                            ? `translateY(-${trustParallax}px)`
                            : undefined,
                    }}
                >
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-white sm:gap-x-4 sm:text-sm md:text-base">
                        <Check className="h-4 w-4 fill-white" />
                        <span>No setup fees</span>
                        <Check className="h-4 w-4 fill-white" />
                        <span>Cancel anytime</span>
                        <Check className="h-4 w-4 fill-white" />
                        <span>24/7 support</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
