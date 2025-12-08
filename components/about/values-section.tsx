import React from 'react';

import cn from '@/utils/cn';
const values = [
    {
        title: 'Precision in Accounting',
        description:
            'We deliver accurate financial records with meticulous attention to detail, ensuring your books are always perfect.',
    },
    {
        title: 'Data Security',
        description:
            'Your financial data is protected with bank-level security and GDPR compliance standards.',
    },
    {
        title: 'Speed & Efficiency',
        description:
            'Quick turnaround times and streamlined processes to keep your business moving forward.',
    },
    {
        title: 'Partnership Approach',
        description:
            'We work as an extension of your team, understanding your business goals and challenges.',
    },
    {
        title: 'Growth Focused',
        description:
            'Our services are designed to scale with your business and support your growth objectives.',
    },
    {
        title: 'Innovation',
        description:
            'We leverage the latest accounting technology and best practices to serve you better.',
    },
];

import FadeIn from '@/components/ui/fade-in';

export default function ValuesSection() {
    return (
        <section className="bg-white py-24 lg:py-32">
            <div className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-5 sm:gap-16 sm:px-8 lg:px-12">
                <FadeIn className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                        Our Core Values
                    </h2>
                    <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
                        The principles that guide everything we do and define
                        who we are as a company.
                    </p>
                </FadeIn>

                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                    {values.map((value, index) => {
                        // Bento logic: 2-1, 1-2, 2-1 pattern
                        // Row 1 (0,1): 0=Span2, 1=Span1
                        // Row 2 (2,3): 2=Span1, 3=Span2
                        // Row 3 (4,5): 4=Span2, 5=Span1
                        const isWide =
                            index === 0 ||
                            index === 3 ||
                            index === 4;

                        return (
                            <FadeIn
                                key={index}
                                delay={index * 0.1}
                                className={cn(
                                    'h-full',
                                    isWide ? 'md:col-span-2' : 'md:col-span-1',
                                )}
                            >
                                <div className="group h-full cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
