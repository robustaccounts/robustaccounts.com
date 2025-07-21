import React from 'react';

import { ArrowForward, Check } from '@/ui/icons/google-icons';
import Link from '@/ui/link';

import cn from '@/utils/cn';

const benefits = [
    'Save 40+ hours monthly on bookkeeping tasks',
    'Reduce accounting costs by up to 60%',
    'Access to certified bookkeeping professionals',
    'Real-time financial reporting and insights',
    'Improved cash flow management',
    'Better tax preparation and compliance',
    'Bank-grade security and data protection',
    'Dedicated account manager support',
];

function BenefitItem({ benefit }: Readonly<{ benefit: string }>) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-4 w-4 fill-accent" />
                </div>
            </div>
            <span className="text-sm text-gray-700 sm:text-base">{benefit}</span>
        </div>
    );
}

export default function BookkeepingBenefitsSection() {
    return (
        <section className={cn(
            'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
        )}>
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Why Choose Our Bookkeeping Services
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Transform your financial management with professional bookkeeping expertise that scales with your business
                </p>
            </div>

            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                {benefits.map((benefit, index) => (
                    <BenefitItem key={index} benefit={benefit} />
                ))}
            </div>

            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <p className="text-base sm:text-lg">
                    Ready to streamline your bookkeeping?
                </p>
                <Link
                    href="/contact"
                    className="group flex transform cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition-all hover:bg-accent/80 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none sm:px-8 sm:py-4 sm:text-lg"
                >
                    Get Free Consultation
                    <ArrowForward className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </section>
    );
} 