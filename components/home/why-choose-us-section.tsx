import React from 'react';

import { Check } from '@/ui/icons/google-icons';
import Link from '@/ui/link';

import cn from '@/utils/cn';

const benefits = [
    {
        title: 'Cost-Effective Solutions',
        description:
            'Reduce overhead costs by up to 60% with our scalable outsourcing services, tailored to your budget and business size.',
    },
    {
        title: 'Expert Team',
        description:
            'Access a global team of certified public accountants and financial experts with 10+ years of experience.',
    },
    {
        title: 'Time Savings',
        description:
            'Free up 40+ hours monthly to focus on core business activities while we handle your complete financial operations.',
    },
    {
        title: 'Advanced Security',
        description:
            'Bank-grade security with end-to-end encryption, ensuring your financial data is protected at all times.',
    },
];

function WhyChooseUsCard({
    title,
    description,
}: Readonly<{
    title: string;
    description: string;
}>) {
    return (
        <div className={cn('flex items-start gap-4')}>
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-secondary/80">
                    <Check className="h-5 w-5 fill-accent" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
                <p className="text-sm leading-relaxed sm:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function WhyChooseUsSection() {
    return (
        <section
            className={cn(
                'flex min-h-screen w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto xl:py-24',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Why Choose Our Accounting Services
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Transform your financial operations with efficiency and
                    expertise. Join hundreds of successful businesses who trust
                    us.
                </p>
            </div>
            <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                {benefits.map((benefit, index) => (
                    <WhyChooseUsCard
                        key={index}
                        title={benefit.title}
                        description={benefit.description}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <p className="text-base sm:text-lg">
                    Ready to transform your business finances?
                </p>
                <Link
                    href="/contact"
                    className="flex transform cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition-all hover:bg-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none sm:px-8 sm:py-4 sm:text-lg"
                >
                    Get Started
                </Link>
            </div>
        </section>
    );
}
