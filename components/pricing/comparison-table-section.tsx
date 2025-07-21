import React from 'react';

import { Check } from '@/ui/icons/google-icons';

const comparisonFeatures = [
    {
        feature: 'Monthly Bookkeeping',
        starter: true,
        professional: true,
        enterprise: true,
    },
    {
        feature: 'Financial Statements',
        starter: 'Basic',
        professional: 'Advanced',
        enterprise: 'Custom',
    },
    {
        feature: 'Dedicated Account Manager',
        starter: false,
        professional: true,
        enterprise: true,
    },
    {
        feature: 'Phone Support',
        starter: false,
        professional: true,
        enterprise: true,
    },
    {
        feature: 'Financial Advisory',
        starter: false,
        professional: 'Limited',
        enterprise: 'Unlimited',
    },
    {
        feature: 'Custom Reporting',
        starter: false,
        professional: false,
        enterprise: true,
    },
    {
        feature: 'Multi-Entity Management',
        starter: false,
        professional: false,
        enterprise: true,
    },
    {
        feature: 'CFO Advisory',
        starter: false,
        professional: false,
        enterprise: true,
    },
    {
        feature: 'Priority Support',
        starter: false,
        professional: false,
        enterprise: true,
    },
];

export default function ComparisonTableSection() {
    return (
        <section className="flex min-h-screen items-center py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
                        Compare Plans
                    </h2>
                    <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
                        See what's included in each plan at a glance
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full rounded-xl">
                        <thead className="">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold text-gray-900">
                                    Features
                                </th>
                                <th className="p-4 text-center text-sm font-semibold text-gray-900">
                                    Starter
                                </th>
                                <th className="p-4 text-center text-sm font-semibold text-gray-900">
                                    Professional
                                </th>
                                <th className="p-4 text-center text-sm font-semibold text-gray-900">
                                    Enterprise
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {comparisonFeatures.map((feature, index) => (
                                <tr key={index} className="hover:">
                                    <td className="p-4 text-sm text-gray-900">
                                        {feature.feature}
                                    </td>
                                    <td className="p-4 text-center text-sm">
                                        {feature.starter === true ? (
                                            <Check className="mx-auto h-5 w-5 fill-primary" />
                                        ) : feature.starter === false ? (
                                            <span className="text-gray-400">
                                                —
                                            </span>
                                        ) : (
                                            <span className="text-gray-600">
                                                {feature.starter}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-center text-sm">
                                        {feature.professional === true ? (
                                            <Check className="mx-auto h-5 w-5 fill-primary" />
                                        ) : feature.professional === false ? (
                                            <span className="text-gray-400">
                                                —
                                            </span>
                                        ) : (
                                            <span className="text-gray-600">
                                                {feature.professional}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-center text-sm">
                                        {feature.enterprise === true ? (
                                            <Check className="mx-auto h-5 w-5 fill-primary" />
                                        ) : feature.enterprise === false ? (
                                            <span className="text-gray-400">
                                                —
                                            </span>
                                        ) : (
                                            <span className="text-gray-600">
                                                {feature.enterprise}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
