import React from 'react';

const team = [
    {
        name: 'Sarah Johnson',
        role: 'Chief Financial Officer',
        image: '/images/team/sarah.jpg',
        bio: 'CPA with 15+ years in international accounting and taxation.',
    },
    {
        name: 'Michael Chen',
        role: 'Senior Tax Advisor',
        image: '/images/team/michael.jpg',
        bio: 'Expert in multi-jurisdictional tax planning and compliance.',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Bookkeeping Manager',
        image: '/images/team/emily.jpg',
        bio: 'Specialized in automated bookkeeping and financial reporting.',
    },
    {
        name: 'David Kumar',
        role: 'Technology Director',
        image: '/images/team/david.jpg',
        bio: 'Leading our digital transformation and security initiatives.',
    },
];

export default function TeamSection() {
    return (
        <section className="py-12 lg:py-16">
            <div className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 sm:gap-16 sm:px-6 lg:px-12">
                <div className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                        Meet Our Leadership Team
                    </h2>
                    <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
                        Experienced professionals dedicated to your financial
                        success.
                    </p>
                </div>

                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-200">
                                    <div className="flex h-full w-full items-center justify-center text-4xl text-gray-400"></div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm font-medium text-blue-600">
                                        {member.role}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
