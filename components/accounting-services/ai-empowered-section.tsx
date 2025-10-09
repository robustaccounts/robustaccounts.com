import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

const aiCapabilities = [
    {
        title: 'Automated Transaction Categorization',
        description:
            'AI-powered tools automatically categorize transactions, saving hours of manual work while maintaining accuracy.',
    },
    {
        title: 'Invoice & Expense Automation',
        description:
            'Streamline invoice processing and expense tracking with intelligent automation that learns from your business patterns.',
    },
    {
        title: 'Real-Time Financial Insights & Forecasting',
        description:
            'Get instant visibility into your financial health with AI-driven insights and predictive forecasting.',
    },
];

export default function AIEmpoweredSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 bg-gradient-to-br from-primary to-accent px-4 py-16 text-white sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    AI-Empowered Financial Professionals
                </h2>
                <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
                    <strong>
                        Proven Systems. Human Expertise. AI-Empowered
                        Efficiency.
                    </strong>
                </p>
                <p className="max-w-3xl text-base text-white/80 sm:text-lg">
                    At Robust Accounts, our Financial Experts leverage AI and
                    automation tools to enhance — not replace — true financial
                    expertise. In today's fast-paced market, software delivers
                    speed — but a Financial Expert ensures you have the right
                    tools, secure processes, and clear, timely data to lead with
                    confidence.
                </p>
            </div>

            <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
                {aiCapabilities.map((capability, index) => (
                    <div
                        key={index}
                        className="group rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.05] hover:bg-white/20"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 shadow-sm transition-transform group-hover:scale-110">
                            <Check className="h-6 w-6 fill-white" />
                        </div>
                        <h3 className="mb-3 text-lg font-bold">
                            {capability.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-white/80 group-hover:text-white/90">
                            {capability.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
