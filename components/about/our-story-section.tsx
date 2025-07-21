import Image from 'next/image';
import React from 'react';

import { Check } from '@/ui/icons/google-icons';

export default function OurStorySection() {
    return (
        <section className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 py-12 sm:gap-16 sm:px-6 lg:px-12 lg:py-16">
            <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                        Our Story
                    </h2>
                    <p className="text-base text-gray-600 sm:text-lg">
                        Founded with a vision to democratize access to
                        professional accounting services, Glocal Accounting has
                        grown from a small team of passionate accountants to a
                        globally recognized financial services provider.
                    </p>
                    <p className="text-base text-gray-600 sm:text-lg">
                        We understand that every business is unique, which is
                        why we offer personalized solutions that adapt to your
                        specific needs. Our team combines traditional accounting
                        expertise with modern technology to deliver exceptional
                        results.
                    </p>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 fill-primary" />
                            <span className="text-gray-700">
                                IFRS Reporting & GAAP Accounting Standards
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 fill-primary" />
                            <span className="text-gray-700">
                                International Payroll & Tax Expertise
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 fill-primary" />
                            <span className="text-gray-700">
                                One-Stop-Shop for Financial Outsourcing
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
                        <Image
                            src="/images/about-story.jpg"
                            alt="Our Story"
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
