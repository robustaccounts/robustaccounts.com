import siteConfig from '@/siteconfig';

import React from 'react';

import cn from '@/utils/cn';
import FadeIn from '@/components/ui/fade-in';

import ScheduleMyCallButton from '../ui/schedule-my-call-button';

const { contactInfo } = siteConfig;

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
                'hero-section relative flex min-h-screen w-full flex-col items-center justify-center bg-white',
            )}
        >
            <div className="relative z-20 flex w-full flex-col items-center justify-center gap-10 px-4 py-24 sm:gap-14 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto">
                <div className="flex w-full flex-col items-center gap-8 pt-8">
                    {/* Main Content */}
                    <FadeIn className="flex flex-col items-center justify-center space-y-6 text-center sm:space-y-8 xl:max-w-4/5">
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
                    </FadeIn>
                    
                    {/* Stats Section */}
                    <FadeIn delay={0.2} className="w-full max-w-4xl">
                        <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
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
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default ContactHeroSection;
