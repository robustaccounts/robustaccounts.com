'use client';

import { motion, Variants } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import { Check } from 'lucide-react';

import cn from '@/utils/cn';

import ScheduleMyCallButton from '../ui/schedule-my-call-button';

// Animation variants with improved timing
const heroContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const heroItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeInOut',
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

    // Parallax factors for each layer
    const contentParallax = scrollY * 0.08;
    const trustParallax = scrollY * 0.18;

    return (
        <section
            ref={sectionRef}
            className={cn(
                'hero-section relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden',
            )}
        >

            <motion.div
                variants={heroContainer}
                initial="hidden"
                animate="show"
                className={cn(
                    'relative z-20 flex h-full w-full flex-col items-center justify-center gap-8 px-5 py-12 will-change-transform sm:gap-10 sm:px-8 sm:py-16 md:gap-12 md:px-12 lg:px-16',
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
                    className="flex w-full max-w-5xl flex-col items-center justify-center space-y-4 text-center sm:space-y-5 md:space-y-6"
                >
                    {/* Main Headline */}
                    <motion.h1
                        variants={heroItem}
                        className="text-center text-4xl leading-[1.1] font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        Transform Your{' '}
                        <span className="bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent">
                            Business
                        </span>{' '}
                        with{' '}
                        <span className="bg-gradient-to-r from-accent via-accent/90 to-accent/80 bg-clip-text text-transparent">
                            Expert Accounting
                        </span>{' '}
                        Solutions
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={heroItem}
                        className="max-w-xl px-4 text-center text-base leading-relaxed text-gray-600 sm:max-w-2xl sm:text-lg md:text-xl lg:text-2xl"
                    >
                        Save 40+ hours monthly and reduce costs by 60% with our
                        comprehensive accounting outsourcing services. Focus on
                        growth while we handle your finances.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={heroItem}
                        className="flex w-full flex-col justify-center gap-3 pt-2 sm:w-auto sm:gap-4 md:flex-row"
                    >
                        <ScheduleMyCallButton size="lg" />
                    </motion.div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    variants={heroItem}
                    className={cn(
                        'flex flex-col items-center gap-3 px-4 py-4 will-change-transform sm:gap-4 sm:py-6',
                    )}
                    style={{
                        transform: trustParallax
                            ? `translateY(-${trustParallax}px)`
                            : undefined,
                    }}
                >
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-gray-600 sm:gap-x-4 sm:text-sm md:text-base">
                        <div className="flex items-center gap-1.5">
                            <div className="rounded-full bg-accent/20 p-1">
                                <Check className="h-3 w-3 text-accent sm:h-4 sm:w-4" />
                            </div>
                            <span className="font-medium">No setup fees</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="rounded-full bg-accent/20 p-1">
                                <Check className="h-3 w-3 text-accent sm:h-4 sm:w-4" />
                            </div>
                            <span className="font-medium">Cancel anytime</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="rounded-full bg-accent/20 p-1">
                                <Check className="h-3 w-3 text-accent sm:h-4 sm:w-4" />
                            </div>
                            <span className="font-medium">24/7 support</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
