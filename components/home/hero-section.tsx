'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

import GetStartedButton from '../common/get-started-button';

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
    return (
        <section
            className={cn(
                'relative flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 sm:py-0 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <motion.div
                variants={heroContainer}
                initial="hidden"
                animate="show"
                className="flex w-full flex-col items-center gap-8 pt-8"
            >
                {/* Badge */}
                <motion.div
                    variants={heroItem}
                    className="mt-8 inline-flex w-max items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium backdrop-blur-sm"
                >
                    <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                    <span>Trusted by Growing Businesses</span>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    variants={heroItem}
                    className="flex flex-col items-center justify-center space-y-6 text-center sm:space-y-8 xl:max-w-4/5"
                >
                    {/* Main Headline */}
                    <motion.h1
                        variants={heroItem}
                        className="text-center text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl"
                        transition={{ duration: 0.5 }}
                    >
                        Transform Your{' '}
                        <span className="text-accent">Business</span> with{' '}
                        <span className="text-accent">Expert Accounting</span>{' '}
                        Solutions.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={heroItem}
                        className="text-center text-base leading-relaxed sm:text-lg lg:text-xl"
                        transition={{ duration: 0.5 }}
                    >
                        Save 40+ hours monthly and reduce costs by 60% with our
                        comprehensive accounting outsourcing services. Focus on
                        growth while we handle your finances.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={heroItem}
                        className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6"
                        transition={{ duration: 0.5 }}
                    >
                        <GetStartedButton className="w-xs" size="lg" />
                    </motion.div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    variants={heroItem}
                    className="flex flex-col items-center gap-4 px-4 py-12"
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-x-4 text-sm">
                        <Check className="h-4 w-4 fill-accent" />
                        <span>No setup fees</span>
                        <Check className="h-4 w-4 fill-accent" />
                        <span>Cancel anytime</span>
                        <Check className="h-4 w-4 fill-accent" />
                        <span>24/7 support</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
