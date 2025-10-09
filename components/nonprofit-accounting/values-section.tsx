import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

const coreValues = [
    {
        title: 'Faith',
        description:
            'We honor the sacred trust placed in us by churches and faith-based organizations.',
    },
    {
        title: 'Integrity',
        description:
            'We maintain the highest standards of financial stewardship and transparency.',
    },
    {
        title: 'Excellence',
        description:
            'We deliver world-class financial services with ministry-minded care.',
    },
    {
        title: 'Service',
        description:
            'We are committed to helping you focus on your calling by handling the numbers.',
    },
];

const whyChoose = [
    {
        title: 'Ministry Experience',
        description:
            'We started serving churches and non-profits from day one. We understand your unique challenges, compliance requirements, and reporting needs.',
    },
    {
        title: 'Specialized Expertise',
        description:
            'Our team is trained in fund accounting, grant management, donor reporting, and IRS compliance specific to non-profit organizations.',
    },
    {
        title: 'Confidentiality & Trust',
        description:
            'We understand the sensitivity of church finances and maintain strict confidentiality while keeping your books transparent to leadership.',
    },
    {
        title: 'Cost-Effective Solutions',
        description:
            'Get professional-level financial support without the cost of a full-time staff position. Save on salaries, benefits, and training.',
    },
];

export default function NonprofitValuesSection() {
    return (
        <>
            {/* Core Values */}
            <section
                className={cn(
                    'flex w-full flex-col items-center justify-center gap-12 bg-white px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
                )}
            >
                <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                        Our <span className="text-accent">Core Values</span>
                    </h2>
                    <p className="max-w-3xl text-base sm:text-lg">
                        Built on a foundation of faith, integrity, and service
                        to mission-driven organizations
                    </p>
                </div>

                <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {coreValues.map((value, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center gap-4 rounded-2xl bg-secondary p-8 text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-lg"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-sm transition-transform group-hover:scale-110">
                                <Check className="h-8 w-8 fill-white" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">
                                {value.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-700">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section
                className={cn(
                    'flex w-full flex-col items-center justify-center gap-12 bg-gradient-to-br from-primary to-accent px-4 py-16 text-white sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
                )}
            >
                <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                        Why Churches & Non-Profits Choose Us
                    </h2>
                    <p className="max-w-3xl text-base text-white/90 sm:text-lg">
                        We're not just accountants. We're ministry partners who
                        understand your mission.
                    </p>
                </div>

                <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                    {whyChoose.map((reason, index) => (
                        <div
                            key={index}
                            className="group flex flex-col gap-4 rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                        >
                            <h3 className="text-xl font-bold">
                                {reason.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-white/80 group-hover:text-white/90">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
