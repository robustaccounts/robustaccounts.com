import React from 'react';

import Accounts from '@/ui/icons/accounts';
import BusinessAdvisory from '@/ui/icons/business-advisory';
import { Check } from '@/ui/icons/google-icons';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

import cn from '@/utils/cn';

const accountingServices = [
    'Record deposits by total and designation',
    'Full-service managed payroll',
    'Manage credit card transactions',
    'Process accounts payable',
    'Bank account reconciliation',
    'Close of month and financial reports by the 10th of each month',
    'Grant accounting & reporting',
    'Fund accounting',
    'Donor management & reporting',
    'IRS Form 990 preparation',
];

const advisoryServices = [
    'Church & ministry operations',
    'Financial planning & budgeting',
    'Compliance & regulatory guidance',
    'Strategic planning support',
    'Board reporting & presentations',
];

export default function NonprofitServicesSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 bg-secondary px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Services Designed for{' '}
                    <span className="text-accent">Churches & Non-Profits</span>
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    From day-to-day bookkeeping to strategic financial guidance,
                    we understand the unique needs of faith-based and
                    mission-driven organizations.
                </p>
            </div>

            <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Accounting Services */}
                <div className="group flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary transition-colors group-hover:bg-accent/10">
                            <Accounts className="h-8 w-8 fill-accent" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-primary">
                                Accounting Services
                            </h3>
                            <p className="text-sm text-gray-600">
                                Complete financial management
                            </p>
                        </div>
                    </div>

                    <p className="text-base text-gray-700">
                        Imagine reducing your staff costs without having to lead
                        or develop another staff member. Imagine your
                        organization having a ministry-minded expert who knows
                        non-profit finances.
                    </p>

                    <div className="space-y-3">
                        {accountingServices.map((service, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 fill-accent" />
                                <span className="text-sm text-gray-700">
                                    {service}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Advisory Services */}
                <div className="group flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary transition-colors group-hover:bg-accent/10">
                            <BusinessAdvisory className="h-8 w-8 fill-accent" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-primary">
                                Advisory & Support
                            </h3>
                            <p className="text-sm text-gray-600">
                                Strategic financial guidance
                            </p>
                        </div>
                    </div>

                    <p className="text-base text-gray-700">
                        As a church or non-profit leader, your calling isn't to
                        manage spreadsheets or chase receipts. Your calling is
                        to serve your community and advance your mission.
                    </p>

                    <div className="space-y-3">
                        {advisoryServices.map((service, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 fill-accent" />
                                <span className="text-sm text-gray-700">
                                    {service}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center">
                <ScheduleMyCallButton size="lg" showSubtext={false} />
            </div>
        </section>
    );
}
