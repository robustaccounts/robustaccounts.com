import Image from 'next/image';
import React from 'react';

import { Check } from 'lucide-react';

import FadeIn from '@/components/ui/fade-in';

export default function OurStorySection() {
    return (
        <section className="w-full bg-gray-50 py-24 lg:py-32">
            <div className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-5 sm:gap-16 sm:px-8 lg:px-12">
                <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                    <FadeIn className="flex flex-col gap-6" direction="right">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            Our Story
                        </h2>
                        <p className="text-base text-gray-600 sm:text-lg">
                            Founded with a vision to democratize access to
                            professional accounting services, Glocal Accounting
                            has grown from a small team of passionate
                            accountants to a globally recognized financial
                            services provider.
                        </p>
                        <p className="text-base text-gray-600 sm:text-lg">
                            We understand that every business is unique, which
                            is why we offer personalized solutions that adapt to
                            your specific needs. Our team combines traditional
                            accounting expertise with modern technology to
                            deliver exceptional results.
                        </p>
                        <div className="flex flex-col gap-3">
                            {/* List items */}
                            {[
                                'IFRS Reporting & GAAP Accounting Standards',
                                'International Payroll & Tax Expertise',
                                'One-Stop-Shop for Financial Outsourcing',
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                                        <Check className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-gray-700">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                    <FadeIn className="relative" direction="left" delay={0.2}>
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg transition-all hover:shadow-xl">
                            <Image
                                src="/assets/images/hero-section-bg.png"
                                alt="Our Story"
                                width={1200}
                                height={900}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
