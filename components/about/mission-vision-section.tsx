import React from 'react';

import FadeIn from '@/components/ui/fade-in';
import cn from '@/utils/cn';

export default function MissionVisionSection() {
    return (
        <section className="w-full bg-gray-50 py-24 lg:py-32">
            <div className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-5 sm:gap-16 sm:px-8 lg:px-12">
                <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <FadeIn
                        className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md lg:p-12"
                        direction="right"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Our Mission
                        </h2>
                        <p className="text-base text-gray-600 sm:text-lg">
                            To empower businesses worldwide by providing
                            exceptional accounting and financial services that
                            drive growth, ensure compliance, and create lasting
                            value. We believe that every business deserves
                            access to professional financial expertise,
                            regardless of size or location.
                        </p>
                    </FadeIn>
                    <FadeIn
                        className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md lg:p-12"
                        direction="left"
                        delay={0.2}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Our Vision
                        </h2>
                        <p className="text-base text-gray-600 sm:text-lg">
                            To become the world's most trusted accounting
                            outsourcing partner, known for our commitment to
                            excellence, innovation, and client success. We
                            envision a future where businesses can focus
                            entirely on their core operations while we handle
                            their financial complexities.
                        </p>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
