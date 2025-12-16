'use client';

import React from 'react';

const BENEFITS = [
    {
        number: '01',
        title: 'Lower Operating Costs',
        description:
            'Reduce fixed overhead with a dedicated offshore team sized to your needs. No recruitment, training, or infrastructure costs.',
    },
    {
        number: '02',
        title: 'Qualified Team',
        description:
            'CPAs and finance professionals with deep industry experience, assigned exclusively to your account.',
    },
    {
        number: '03',
        title: 'More Time for Operations',
        description:
            'Offload daily financial tasks so your leadership team can focus on revenue-generating work.',
    },
    {
        number: '04',
        title: 'Secure Infrastructure',
        description:
            'End-to-end encryption and strict access controls protect your financial data at every step.',
    },
];

const WhyChooseUsSection = () => {
    return (
        <section className="bg-theme-offwhite py-20 text-theme-black lg:py-28">
            <div className="cust-container">
                {/* Header */}
                <div className="mb-16">
                    <span
                        className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                        data-animate="fade-up"
                    >
                        Why Work With Us
                    </span>
                    <h2
                        className="max-w-2xl text-4xl leading-[1.1] font-light tracking-tight text-theme-black md:text-5xl"
                        data-animate="fade-up"
                    >
                        Built for businesses
                        <br />
                        that demand more.
                    </h2>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                    {BENEFITS.map((benefit) => (
                        <div
                            key={benefit.number}
                            className="flex flex-col border border-gray-200 bg-white p-8 transition-all duration-500 hover:scale-[1.02] hover:border-transparent hover:shadow-lg lg:p-10"
                            data-animate="fade-up"
                        >
                            {/* Number */}
                            <span className="mb-6 text-4xl font-light text-primary/40 lg:text-5xl">
                                {benefit.number}
                            </span>

                            {/* Title */}
                            <h3 className="mb-3 text-xl font-semibold text-theme-black lg:text-2xl">
                                {benefit.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm leading-relaxed text-gray-600">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
