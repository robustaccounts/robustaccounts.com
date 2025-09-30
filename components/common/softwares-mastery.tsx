'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

import { Check } from '@/ui/icons/google-icons';
import IntuitQuickbooks from '@/ui/logo/intuit-quickbooks';
import SageGreenLogo19544 from '@/ui/logo/sage';
import XeroSvgrepoCom from '@/ui/logo/xero';

import cn from '@/utils/cn';

const softwarePlatforms = [
    {
        name: 'Sage',
        logo: <SageGreenLogo19544 className="h-12 w-12" />,
        description: 'Comprehensive business management solutions',
    },
    {
        name: 'QuickBooks',
        logo: <IntuitQuickbooks className="h-12 w-12" />,
        description: 'Industry-leading accounting and bookkeeping',
    },
    {
        name: 'Xero',
        logo: <XeroSvgrepoCom className="h-12 w-12" />,
        description: 'Cloud-based accounting for modern businesses',
    },
];

const expertiseBenefits = [
    {
        title: 'Certified Experts',
        description:
            'Our team holds official certifications in all major accounting platforms',
    },
    {
        title: 'Seamless Integration',
        description:
            'We ensure your existing software works perfectly with your business processes',
    },
    {
        title: 'Best Practices',
        description:
            'We implement industry best practices to maximize your software investment',
    },
    {
        title: 'Ongoing Support',
        description:
            'Continuous training and support to keep your team up to date',
    },
];

function SoftwareCard({
    name,
    logo,
    description,
}: Readonly<{
    name: string;
    logo: React.ReactNode;
    description: string;
}>) {
    return (
        <div className={cn('flex items-start gap-4')}>
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-secondary/80">
                    {logo}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-accent sm:text-2xl">
                    {name}
                </h3>
                <p className="text-base leading-relaxed text-gray-800 sm:text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
}

function ExpertiseCard({
    title,
    description,
}: Readonly<{
    title: string;
    description: string;
}>) {
    return (
        <div className={cn('flex items-start gap-4')}>
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-secondary/80">
                    <Check className="h-6 w-6 fill-accent" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-accent sm:text-2xl">
                    {title}
                </h3>
                <p className="text-base leading-relaxed text-gray-800 sm:text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function SoftwaresMasterySection() {
    // Section ref for scroll tracking
    const sectionRef = useRef<HTMLDivElement>(null);
    // Framer Motion scroll progress for this section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Parallax transforms (tweak values for desired effect)
    const bgY = useTransform(scrollYProgress, [0, 1], ['0px', '80px']);
    const overlayY = useTransform(scrollYProgress, [0, 1], ['0px', '50px']);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-30px']);

    return (
        <section
            ref={sectionRef}
            className={cn(
                'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-20 sm:px-8 md:px-16 lg:px-24 xl:py-32',
            )}
        >
            {/* Parallax Overlay for better text contrast */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 will-change-transform"
                style={{ y: overlayY }}
                aria-hidden="true"
            />
            <motion.div
                className="relative z-20 flex w-full max-w-6xl flex-col gap-16 will-change-transform lg:flex-row lg:items-center lg:justify-center"
                style={{ y: contentY }}
            >
                {/* Left: Heading and Description */}
                <div className="flex w-full flex-col items-center justify-center gap-8 text-center sm:gap-10 lg:w-1/2 lg:items-start lg:text-left">
                    <h2 className="text-3xl font-bold text-accent sm:text-4xl lg:text-5xl">
                        Master of Leading{' '}
                        <span className="text-accent">Accounting Software</span>
                    </h2>
                    <p className="max-w-3xl text-lg text-gray-700 sm:text-xl">
                        We're certified experts in the world's most trusted
                        accounting platforms. Your business deserves the best
                        tools, and we know how to use them effectively.
                    </p>
                </div>
                {/* Right: Software Platforms List */}
                <div className="grid w-full grid-cols-1 gap-10 lg:w-1/2 lg:gap-12">
                    {softwarePlatforms.map((platform, index) => (
                        <SoftwareCard
                            key={index}
                            name={platform.name}
                            logo={platform.logo}
                            description={platform.description}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Additional Expertise Section */}
            <motion.div
                className="relative z-20 mt-16 w-full max-w-6xl will-change-transform"
                style={{ y: contentY }}
            >
                <div className="rounded-2xl bg-secondary p-8 md:p-12">
                    <h3 className="mb-8 text-center text-2xl font-bold text-accent sm:text-3xl">
                        Why Choose Our Software Expertise?
                    </h3>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {expertiseBenefits.map((benefit, index) => (
                            <ExpertiseCard
                                key={index}
                                title={benefit.title}
                                description={benefit.description}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
