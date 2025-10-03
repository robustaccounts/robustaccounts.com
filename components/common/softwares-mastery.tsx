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
        <div
            className={cn(
                'group flex items-start gap-4 rounded-xl p-4 transition-all hover:bg-secondary/50 sm:gap-5',
            )}
        >
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md sm:h-16 sm:w-16">
                    {logo}
                </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
                <h3 className="text-xl font-bold text-accent sm:text-2xl">
                    {name}
                </h3>
                <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
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
        <div className={cn('flex items-start gap-4 sm:gap-5')}>
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 transition-colors sm:h-12 sm:w-12">
                    <Check className="h-5 w-5 fill-accent sm:h-6 sm:w-6" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-primary sm:text-xl">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
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
    const overlayY = useTransform(scrollYProgress, [0, 1], ['0px', '50px']);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-30px']);

    return (
        <section
            ref={sectionRef}
            className={cn(
                'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20',
            )}
        >
            {/* Parallax Overlay for better text contrast */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 will-change-transform"
                style={{ y: overlayY }}
                aria-hidden="true"
            />
            <motion.div
                className="relative z-20 flex w-full max-w-6xl flex-col gap-12 will-change-transform sm:gap-16 lg:flex-row lg:items-center lg:justify-center"
                style={{ y: contentY }}
            >
                {/* Left: Heading and Description */}
                <div className="flex w-full flex-col items-center justify-center gap-4 text-center sm:gap-5 lg:w-1/2 lg:items-start lg:text-left">
                    <h2 className="text-2xl leading-tight font-bold text-primary sm:text-3xl lg:text-4xl">
                        Masters of Leading{' '}
                        <span className="text-accent">Accounting Software</span>
                    </h2>
                    <p className="max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                        We're certified experts in the world's most trusted
                        accounting platforms. Your business deserves the best
                        tools, and we know how to use them effectively.
                    </p>
                </div>
                {/* Right: Software Platforms List */}
                <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 lg:w-1/2">
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
                className="relative z-20 mt-8 w-full max-w-6xl will-change-transform sm:mt-10"
                style={{ y: contentY }}
            >
                <div className="rounded-2xl bg-secondary/50 p-5 shadow-sm sm:p-6 md:p-8">
                    <h3 className="mb-5 text-center text-xl font-bold text-primary sm:mb-6 sm:text-2xl lg:text-3xl">
                        Why Choose Our{' '}
                        <span className="text-accent">Software Expertise</span>?
                    </h3>
                    <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
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
