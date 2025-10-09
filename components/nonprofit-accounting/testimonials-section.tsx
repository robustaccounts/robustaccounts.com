'use client';

import React, { useState } from 'react';

import cn from '@/utils/cn';

const testimonials = [
    {
        quote: 'We had a meeting when they first started, and we got along great. They understood what I needed and I understood what they needed. It has been a really good matchup between us. The financial clarity we have gained has been invaluable for our church.',
        author: 'Sarah Johnson',
        role: 'Office Administrator',
        organization: 'Grace Community Church',
    },
    {
        quote: 'They are very timely and responsive. One of the biggest accomplishments for me is that we get our financials on time every month. Having the personality they do and being the type of professionals they are makes it easy to work with them. They are a good fit for our ministry.',
        author: 'Pastor Michael Chen',
        role: 'Lead Pastor',
        organization: 'New Hope Fellowship',
    },
    {
        quote: 'As a non-profit, we needed someone who understood fund accounting and grant reporting. Robust Accounts has been a game-changer. They handle all the complexities so we can focus on serving our community.',
        author: 'David Martinez',
        role: 'Executive Director',
        organization: 'Community Outreach Foundation',
    },
];

export default function NonprofitTestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 bg-secondary px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Trusted By{' '}
                    <span className="text-accent">Churches & Non-Profits</span>
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Hear from ministry leaders who have partnered with us
                </p>
            </div>

            {/* Testimonial Display */}
            <div className="w-full max-w-4xl">
                <div className="rounded-2xl bg-white p-8 shadow-lg md:p-12">
                    <div className="mb-6 text-6xl text-accent">"</div>
                    <p className="mb-8 text-lg leading-relaxed text-gray-700">
                        {testimonials[activeIndex].quote}
                    </p>
                    <div className="border-t border-gray-200 pt-6">
                        <p className="font-bold text-primary">
                            {testimonials[activeIndex].author}
                        </p>
                        <p className="text-sm text-gray-600">
                            {testimonials[activeIndex].role}
                        </p>
                        <p className="text-sm text-accent">
                            {testimonials[activeIndex].organization}
                        </p>
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="mt-8 flex justify-center gap-3">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                'h-3 w-3 rounded-full transition-all',
                                activeIndex === index
                                    ? 'w-8 bg-accent'
                                    : 'bg-gray-300 hover:bg-gray-400',
                            )}
                            aria-label={`View testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 text-center md:grid-cols-3">
                <div className="rounded-xl bg-white p-6">
                    <div className="mb-2 text-3xl font-bold text-accent">
                        500+
                    </div>
                    <div className="text-sm text-gray-600">
                        Churches & Non-Profits Served
                    </div>
                </div>
                <div className="rounded-xl bg-white p-6">
                    <div className="mb-2 text-3xl font-bold text-accent">
                        98%
                    </div>
                    <div className="text-sm text-gray-600">
                        Client Satisfaction Rate
                    </div>
                </div>
                <div className="rounded-xl bg-white p-6">
                    <div className="mb-2 text-3xl font-bold text-accent">
                        15+
                    </div>
                    <div className="text-sm text-gray-600">
                        Years Serving Ministries
                    </div>
                </div>
            </div>
        </section>
    );
}
