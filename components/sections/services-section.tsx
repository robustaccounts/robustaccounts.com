'use client';

import Link from 'next/link';
import React from 'react';

import { ArrowIcon } from '@/lib/icons';

const SERVICES = [
    {
        id: 1,
        title: 'Bookkeeping & Accounting',
        description:
            'Comprehensive bookkeeping services including accounts payable/receivable, general ledger maintenance, and monthly financial statements.',
        href: '/services/bookkeeping',
    },
    {
        id: 2,
        title: 'Payroll Management',
        description:
            'End-to-end payroll processing including employee payments, tax withholdings, and regulatory compliance reporting.',
        href: '/services/payroll',
    },
    {
        id: 3,
        title: 'Financial Advisory',
        description:
            'Strategic financial insights and advisory services to support budgeting, forecasting, and long-term business growth.',
        href: '/services/financial-advisory',
    },
];

const ServicesSection = () => {
    return (
        <section className="bg-white py-20 text-theme-black lg:py-28">
            <div className="cust-container">
                {/* Header */}
                <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <span
                            className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                            data-animate="fade-up"
                        >
                            Services
                        </span>
                        <h2
                            className="text-4xl leading-[1.1] font-light tracking-tight text-theme-black md:text-5xl"
                            data-animate="fade-up"
                        >
                            What We Handle
                            <br />
                            For Your Business.
                        </h2>
                    </div>
                    <div className="flex flex-col justify-end">
                        <p
                            className="mb-6 max-w-md text-base leading-relaxed text-gray-600"
                            data-animate="fade-up"
                        >
                            A complete finance function, managed offshore. We
                            provide the dedicated team and expertise — you
                            maintain full control.
                        </p>
                        <div data-animate="fade-up">
                            <Link
                                href="/services"
                                className="btn-div uppercase"
                            >
                                <span className="text-box">All Services</span>
                                <span className="icon-box">
                                    <ArrowIcon
                                        size={14}
                                        className="text-white"
                                    />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {SERVICES.map((service, index) => (
                        <Link
                            key={service.id}
                            href={service.href}
                            className="group flex flex-col border border-gray-200 bg-theme-offwhite p-8 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:border-transparent hover:shadow-xl lg:p-10"
                            data-animate="fade-up"
                        >
                            {/* Number */}
                            <span className="mb-6 text-xs font-bold tracking-[0.2em] text-primary uppercase">
                                0{index + 1}
                            </span>

                            {/* Title */}
                            <h3 className="mb-4 text-xl font-semibold text-theme-black transition-colors group-hover:text-primary lg:text-2xl">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="mb-8 flex-grow text-sm leading-relaxed text-gray-600">
                                {service.description}
                            </p>

                            {/* Arrow - always visible but more prominent on hover */}
                            <div className="flex items-center gap-2 text-sm font-medium text-primary/60 transition-all group-hover:gap-3 group-hover:text-primary">
                                <span>Learn More</span>
                                <ArrowIcon
                                    size={12}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
