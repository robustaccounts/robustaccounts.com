import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';


import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

export default function BookkeepingHeroSection() {
    return (
        <section className={cn(
            'relative flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 sm:gap-12 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
        )}>
            {/* Badge */}
            <div className="flex flex-col items-center gap-8 pt-8">
                <div className="mt-8 inline-flex w-max items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                    <span>Professional Bookkeeping Services</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col justify-center space-y-6 text-center sm:space-y-8 xl:max-w-4/5">
                <h1 className="text-center text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">
                    Expert <span className="text-accent">Bookkeeping</span> &{' '}
                    <span className="text-accent">Accounting Services</span>
                </h1>
                <p className="text-center text-base leading-relaxed sm:text-lg lg:text-xl">
                    Keep your financial records accurate and up-to-date with our comprehensive bookkeeping services. 
                    Focus on growing your business while we handle the numbers with precision and expertise.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
                    <ScheduleMyCallButton className="w-xs" size="lg" showSubtext={false} />
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col items-center gap-4 py-12">
                <div className="grid grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-accent sm:text-3xl">40+</div>
                        <div className="text-sm text-gray-600 sm:text-base">Hours Saved Monthly</div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-accent sm:text-3xl">60%</div>
                        <div className="text-sm text-gray-600 sm:text-base">Cost Reduction</div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-accent sm:text-3xl">99.9%</div>
                        <div className="text-sm text-gray-600 sm:text-base">Accuracy Rate</div>
                    </div>
                </div>

                <div className="flex items-center gap-x-4 text-sm">
                    <Check className="h-4 w-4 fill-accent" />
                    <span>No setup fees</span>
                    <Check className="h-4 w-4 fill-accent" />
                    <span>Cancel anytime</span>
                    <Check className="h-4 w-4 fill-accent" />
                    <span>24/7 support</span>
                </div>
            </div>
        </section>
    );
} 