import React from 'react';

export default function MissionVisionSection() {
    return (
        <section className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 py-12 sm:gap-16 sm:px-6 lg:px-12 lg:py-16">
            <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col gap-6 rounded-2xl bg-secondary p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Our Mission
                    </h2>
                    <p className="text-base text-gray-600 sm:text-lg">
                        To empower businesses worldwide by providing exceptional
                        accounting and financial services that drive growth,
                        ensure compliance, and create lasting value. We believe
                        that every business deserves access to professional
                        financial expertise, regardless of size or location.
                    </p>
                </div>
                <div className="flex flex-col gap-6 rounded-2xl bg-secondary p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Our Vision
                    </h2>
                    <p className="text-base text-gray-600 sm:text-lg">
                        To become the world's most trusted accounting
                        outsourcing partner, known for our commitment to
                        excellence, innovation, and client success. We envision
                        a future where businesses can focus entirely on their
                        core operations while we handle their financial
                        complexities.
                    </p>
                </div>
            </div>
        </section>
    );
}
