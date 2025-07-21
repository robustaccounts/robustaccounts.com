import React from 'react';

const additionalServices = [
    {
        category: 'Bookkeeping Services',
        services: [
            {
                name: 'Basic Bookkeeping',
                price: '$299 - $499/month',
                description: 'Monthly bookkeeping and reconciliation',
            },
            {
                name: 'Advanced Bookkeeping',
                price: '$499 - $799/month',
                description: 'Comprehensive accounting services',
            },
            {
                name: 'Financial Statements',
                price: '$200 - $500/month',
                description: 'Monthly financial reporting',
            },
            {
                name: 'Accounts Receivable Management',
                price: '$150 - $300/month',
                description: 'Invoice and collections management',
            },
        ],
    },
    {
        category: 'Payroll Services',
        services: [
            {
                name: 'Basic Payroll Processing',
                price: '$50/month + $5/employee',
                description: 'Up to 25 employees',
            },
            {
                name: 'Full-Service Payroll',
                price: '$100/month + $8/employee',
                description: 'Includes tax filing',
            },
            {
                name: 'HR Support',
                price: '$150/month',
                description: 'Employee handbook & compliance',
            },
            {
                name: 'Benefits Administration',
                price: '$25/employee/month',
                description: 'Health insurance & 401k',
            },
        ],
    },
    {
        category: 'Financial Advisory',
        services: [
            {
                name: 'Financial Planning',
                price: '$200/hour',
                description: 'Strategic financial guidance',
            },
            {
                name: 'Cash Flow Analysis',
                price: '$500 - $1,500',
                description: 'Detailed cash flow forecasting',
            },
            {
                name: 'Budget Planning',
                price: '$300 - $800',
                description: 'Annual budget development',
            },
            {
                name: 'Financial Consulting',
                price: '$150 - $300/hour',
                description: 'Ongoing financial advisory',
            },
        ],
    },
    {
        category: 'Business Advisory',
        services: [
            {
                name: 'Strategic Planning',
                price: '$2,500 - $5,000',
                description: 'Business strategy development',
            },
            {
                name: 'Business Valuation',
                price: '$2,500 - $10,000',
                description: 'Professional valuation services',
            },
            {
                name: 'M&A Advisory',
                price: '$5,000 - $25,000',
                description: 'Merger & acquisition support',
            },
            {
                name: 'Performance Analysis',
                price: '$1,000 - $3,000',
                description: 'Business performance review',
            },
        ],
    },
];

export default function AdditionalServicesSection() {
    return (
        <section className="flex min-h-screen items-center py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
                        Additional Services
                    </h2>
                    <p className="mx-auto max-w-3xl text-base sm:text-lg">
                        Enhance your plan with specialized services tailored to
                        your business needs
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {additionalServices.map((category, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-secondary p-6"
                        >
                            <h3 className="mb-4 text-xl font-semibold">
                                {category.category}
                            </h3>
                            <div className="space-y-4">
                                {category.services.map(
                                    (service, serviceIndex) => (
                                        <div
                                            key={serviceIndex}
                                            className="group relative flex items-center justify-between"
                                        >
                                            <div className="flex-1">
                                                <h4
                                                    className="cursor-help font-medium"
                                                    title={service.description}
                                                >
                                                    {service.name}
                                                </h4>
                                                {/* Tooltip */}
                                                <div className="invisible absolute bottom-full left-0 z-10 mb-2 w-48 rounded-lg bg-black px-3 py-2 text-sm text-white opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                                    {service.description}
                                                    <div className="absolute top-[90%] left-4 h-2 w-2 rotate-45 bg-black"></div>
                                                </div>
                                            </div>
                                            <div className="ml-4 text-right">
                                                <span className="font-semibold text-accent">
                                                    {service.price}
                                                </span>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
