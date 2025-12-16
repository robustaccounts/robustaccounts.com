'use client';

import React from 'react';

const comparisonData = [
    {
        feature: 'Monthly Bookkeeping',
        starter: '✓',
        professional: '✓',
        enterprise: '✓',
    },
    {
        feature: 'Financial Statements',
        starter: 'Basic',
        professional: 'Advanced',
        enterprise: 'Custom',
    },
    {
        feature: 'Month-End Close',
        starter: '15 days',
        professional: '10 days (GAAP)',
        enterprise: '5 days',
    },
    {
        feature: 'Dedicated Account Manager',
        starter: '-',
        professional: '✓',
        enterprise: '✓',
    },
    {
        feature: 'Phone Support',
        starter: '-',
        professional: '✓',
        enterprise: 'Priority',
    },
    {
        feature: 'Payroll Processing',
        starter: '-',
        professional: '✓',
        enterprise: 'Unlimited',
    },
    {
        feature: 'Accounts Payable / Bill Pay',
        starter: '-',
        professional: '✓',
        enterprise: '✓',
    },
    {
        feature: 'Financial Advisory',
        starter: '-',
        professional: 'Quarterly',
        enterprise: 'Monthly',
    },
    {
        feature: 'Custom Reporting',
        starter: '-',
        professional: '-',
        enterprise: '✓',
    },
    {
        feature: 'Multi-Entity Management',
        starter: '-',
        professional: '-',
        enterprise: '✓',
    },
    {
        feature: 'CFO Advisory',
        starter: '-',
        professional: '-',
        enterprise: '✓',
    },
];

export default function ComparisonTableSection() {
    return (
        <section className="bg-white py-20 lg:py-28">
            <div className="cust-container">
                <span className="mb-4 block text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                    Plan Comparison
                </span>
                <h2 className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl">
                    Compare Features
                </h2>
                <p className="mb-12 max-w-2xl text-gray-600">
                    See what's included in each plan at a glance. All plans
                    include dedicated support and secure access.
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse">
                        <thead>
                            <tr className="bg-theme-black text-white">
                                <th className="p-4 text-left text-sm font-semibold">
                                    Feature
                                </th>
                                <th className="p-4 text-center text-sm font-semibold">
                                    Starter
                                </th>
                                <th className="p-4 text-center text-sm font-semibold">
                                    Professional
                                </th>
                                <th className="p-4 text-center text-sm font-semibold">
                                    Enterprise
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row, index) => (
                                <tr
                                    key={index}
                                    className={
                                        index % 2 === 0
                                            ? 'bg-theme-offwhite'
                                            : 'bg-white'
                                    }
                                >
                                    <td className="p-4 text-sm font-medium text-theme-black">
                                        {row.feature}
                                    </td>
                                    <td className="p-4 text-center text-sm">
                                        {row.starter === '✓' ? (
                                            <span className="inline-flex items-center justify-center">
                                                <svg
                                                    className="h-5 w-5 text-primary"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        ) : row.starter === '-' ? (
                                            <span className="text-gray-400">
                                                -
                                            </span>
                                        ) : (
                                            <span className="text-gray-600">
                                                {row.starter}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-center text-sm">
                                        {row.professional === '✓' ? (
                                            <span className="inline-flex items-center justify-center">
                                                <svg
                                                    className="h-5 w-5 text-primary"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        ) : row.professional === '-' ? (
                                            <span className="text-gray-400">
                                                -
                                            </span>
                                        ) : (
                                            <span className="text-gray-600">
                                                {row.professional}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-center text-sm">
                                        {row.enterprise === '✓' ? (
                                            <span className="inline-flex items-center justify-center">
                                                <svg
                                                    className="h-5 w-5 text-primary"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        ) : row.enterprise === '-' ? (
                                            <span className="text-gray-400">
                                                -
                                            </span>
                                        ) : (
                                            <span className="text-gray-600">
                                                {row.enterprise}
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
