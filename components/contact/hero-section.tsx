import contactInfo from '@/data/contact-info';

import React from 'react';

import cn from '@/utils/cn';

import ScheduleMyCallButton from '../ui/schedule-my-call-button';

const stats = [
    { value: contactInfo.responseTime, label: 'Response Time' },
    { value: '500+', label: 'Happy Clients' },
    { value: '99.9%', label: 'Uptime' },
    { value: '5★', label: 'Client Rating' },
];

const ContactHeroSection = () => {
    return (
        <section
            className={cn(
                'hero-section relative flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex w-full flex-col items-center gap-8 pt-8">
                {/* Main Content */}
                <div className="flex flex-col items-center justify-center space-y-6 text-center sm:space-y-8 xl:max-w-4/5">
                    <h1 className="text-center text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">
                        Let's <span className="text-accent">Transform</span>{' '}
                        Your Business Together
                    </h1>
                    <p className="max-w-3xl text-center text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                        Ready to streamline your finances and focus on growing
                        your business? Get in touch with our expert team for a
                        free consultation and discover how we can help you
                        achieve your financial goals.
                    </p>
                    {/* CTA Button */}
                    <ScheduleMyCallButton subTextClassName="text-gray-500 text-xs" />
                </div>
                {/* Stats Section */}
                <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
                    {stats.map((stat, idx) => (
                        <div className="text-center" key={idx}>
                            <div className="text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 sm:text-base">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactHeroSection;
