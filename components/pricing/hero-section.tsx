'use client';

import React from 'react';

export default function HeroSection() {
    return (
        <section className="relative flex h-full min-h-[60vh] flex-col items-center justify-center px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16">
            <div className="container mx-auto flex h-auto w-full flex-col items-center justify-center gap-6 sm:gap-8">
                {/* Main Content */}
                <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
                    <h1 className="text-center text-4xl leading-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                        Simple, <span className="text-accent">Transparent</span>{' '}
                        Pricing
                    </h1>
                    <p className="max-w-3xl text-center text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                        Choose the plan that fits your business needs. No hidden
                        fees, no surprises. All plans include our core
                        accounting services with transparent pricing you can
                        count on.
                    </p>
                </div>
            </div>
        </section>
    );
}
