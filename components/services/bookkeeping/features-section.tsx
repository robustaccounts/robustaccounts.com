import React from 'react';

import cn from '@/utils/cn';

const features = [
    {
        title: 'Daily Transaction Recording',
        description:
            'Accurate recording of all business transactions including sales, purchases, and expenses with real-time updates.',
    },
    {
        title: 'Bank Reconciliation',
        description:
            'Monthly bank reconciliation to ensure your records match your bank statements perfectly.',
    },
    {
        title: 'Accounts Payable Management',
        description:
            'Track and manage vendor payments, purchase orders, and invoice processing efficiently.',
    },
    {
        title: 'Accounts Receivable Management',
        description:
            'Monitor customer payments, generate invoices, and manage collections seamlessly.',
    },
    {
        title: 'General Ledger Maintenance',
        description:
            'Maintain accurate general ledger with proper chart of accounts structure and compliance.',
    },
    {
        title: 'Monthly Financial Statements',
        description:
            'Comprehensive profit & loss, balance sheet, and cash flow statements delivered on time.',
    },
];

function FeatureCard({
    title,
    description,
}: Readonly<{
    title: string;
    description: string;
}>) {
    return (
        <div className="group cursor-pointer rounded-2xl bg-secondary p-6 transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-lg sm:p-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 group-hover:text-white sm:text-xl">
                {title}
            </h3>
            <p className="text-sm text-gray-600 group-hover:text-white sm:text-base">
                {description}
            </p>
        </div>
    );
}

export default function BookkeepingFeaturesSection() {
    return (
        <section className={cn(
            'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
        )}>
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Complete Bookkeeping Solutions
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Everything you need to keep your books organized, compliant, and ready for growth
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </section>
    );
} 