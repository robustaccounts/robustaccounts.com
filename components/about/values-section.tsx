import React from 'react';

const values = [
    {
        title: 'Precision in Accounting',
        description:
            'We deliver accurate financial records with meticulous attention to detail, ensuring your books are always perfect.',
    },
    {
        title: 'Data Security',
        description:
            'Your financial data is protected with bank-level security and GDPR compliance standards.',
    },
    {
        title: 'Speed & Efficiency',
        description:
            'Quick turnaround times and streamlined processes to keep your business moving forward.',
    },
    {
        title: 'Partnership Approach',
        description:
            'We work as an extension of your team, understanding your business goals and challenges.',
    },
    {
        title: 'Growth Focused',
        description:
            'Our services are designed to scale with your business and support your growth objectives.',
    },
    {
        title: 'Innovation',
        description:
            'We leverage the latest accounting technology and best practices to serve you better.',
    },
];

export default function ValuesSection() {
    return (
        <section className="py-12 lg:py-16">
            <div className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 sm:gap-16 sm:px-6 lg:px-12">
                <div className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                        Our Core Values
                    </h2>
                    <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
                        The principles that guide everything we do and define
                        who we are as a company.
                    </p>
                </div>

                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:shadow-lg sm:p-8"
                        >
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
