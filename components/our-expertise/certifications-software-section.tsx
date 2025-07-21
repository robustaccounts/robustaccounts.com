import React from 'react';

import cn from '@/utils/cn';

const certifications = [
    { name: 'CPA', description: 'Certified Public Accountants' },
    { name: 'CMA', description: 'Certified Management Accountants' },
    { name: 'CIA', description: 'Certified Internal Auditors' },
    {
        name: 'ACCA',
        description: 'Association of Chartered Certified Accountants',
    },
    {
        name: 'IFRS',
        description: 'International Financial Reporting Standards',
    },
    { name: 'SOX', description: 'Sarbanes-Oxley Act Compliance' },
];

const softwareExpertise = [
    'QuickBooks Enterprise',
    'Xero',
    'Sage Intacct',
    'NetSuite',
    'SAP',
    'Oracle Financials',
    'Workday',
    'Dynamics 365',
    'FreshBooks',
    'Wave Accounting',
];

export default function CertificationsSoftwareSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Certifications */}
                <div className="flex flex-col gap-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                            {' '}
                            Professional Certifications
                        </h2>
                        <p className="mt-4 text-base sm:text-lg">
                            Our team holds industry-leading certifications
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                className="secondary rounded-2xl bg-secondary p-4 text-center"
                            >
                                <div className="font-bold">{cert.name}</div>
                                <div className="text-xs">
                                    {cert.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Software Expertise */}
                <div className="flex flex-col gap-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                            Software Expertise
                        </h2>
                        <p className="mt-4 text-base sm:text-lg">
                            Proficient in all major accounting platforms
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {softwareExpertise.map((software, index) => (
                            <div
                                key={index}
                                className="secondary rounded-2xl bg-secondary p-3 text-center"
                            >
                                <div className="text-sm font-medium">
                                    {software}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
