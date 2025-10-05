import React from 'react';
import { Check } from '@/ui/icons/google-icons';
import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';
const benefits = [
    'Scalable Solutions',
    'Growth Support',
    'Full Compliance',
    'Strategic Planning',
];
export default function HeroSection() {
    return (
        <section className="hero-section relative w-full bg-white">
            {/* Content */}
            <div className="flex min-h-[80vh] w-full flex-col items-center justify-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto">
                {/* Main Heading */}
                <div className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center">
                    <h1 className="text-center text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        Grow Your Business,{' '}
                        <span className="text-accent">
                            We'll Keep the IRS Happy
                        </span>
                    </h1>
                    <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                        Scale confidently with accounting solutions that grow
                        with you while ensuring complete tax compliance. Focus
                        on expansion while we handle all the financial
                        complexity and regulatory requirements.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center gap-2"
                        >
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                                <Check className="h-3 w-3 fill-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                {benefit}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <ScheduleMyCallButton showSubtext={false} />
                </div>
            </div>
        </section>
    );
}
