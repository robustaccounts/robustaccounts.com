import React from 'react';

import cn from '@/utils/cn';

const countries = [
    { name: 'USA', status: 'Licensed & Compliant' },
    { name: 'Canada', status: 'Licensed & Compliant' },
    { name: 'UK', status: 'Licensed & Compliant' },
    { name: 'Australia', status: 'Licensed & Compliant' },
    { name: 'Singapore', status: 'Licensed & Compliant' },
];

export default function GlobalReachSection() {
    return (
        <section className="m-8 rounded-2xl bg-secondary py-16 lg:py-20">
            <div
                className={cn(
                    'flex w-full flex-col items-center justify-center gap-12 px-4 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
                )}
            >
                <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                        Global Reach, Local Expertise
                    </h2>
                    <p className="max-w-3xl text-base sm:text-lg">
                        Serving clients across multiple countries with deep
                        understanding of local regulations
                    </p>
                </div>

                <div className="grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {countries.map((country, index) => (
                        <div
                            key={index}
                            className="secondary rounded-2xl bg-white p-6 text-center"
                        >
                            <div className="text-2xl font-bold sm:text-3xl">
                                {country.name}
                            </div>
                            <div className="mt-2 text-sm">{country.status}</div>
                        </div>
                    ))}
                </div>

                {/* Additional Stats */}
                <div className="grid w-full max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
                    <div className="text-center">
                        <div className="text-2xl font-bold sm:text-3xl">
                            24/7
                        </div>
                        <div className="text-sm">Global Support</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold sm:text-3xl">5</div>
                        <div className="text-sm">Countries</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold sm:text-3xl">12</div>
                        <div className="text-sm">Time Zones</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
