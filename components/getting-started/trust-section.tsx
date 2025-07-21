import React from 'react';

const trustMetrics = [
    {
        icon: '💰',
        title: '60% Cost Savings',
        description: 'Average cost reduction compared to in-house accounting',
    },
    {
        icon: '⚡',
        title: '40+ Hours Saved',
        description: 'Monthly time savings for business owners',
    },
    {
        icon: '🔒',
        title: '100% Secure',
        description: 'Bank-grade security for all your financial data',
    },
];

export default function TrustSection() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 text-center">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
                        Trusted by 500+ Growing Businesses
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {trustMetrics.map((metric, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center"
                            >
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                                    <span className="text-2xl">
                                        {metric.icon}
                                    </span>
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                    {metric.title}
                                </h3>
                                <p className="text-gray-600">
                                    {metric.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
