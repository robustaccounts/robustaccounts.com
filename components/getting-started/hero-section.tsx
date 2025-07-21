'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { ArrowForward, Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

import SchedulingModal from '../scheduling-modal';

export default function HeroSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="relative mt-32 min-h-[80vh]">
            <div className="container mx-auto flex min-h-[80vh] items-center">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 px-4 py-8 md:grid-cols-2 lg:gap-x-16">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center space-y-6">
                        {/* Badge */}
                        <div className="inline-flex w-fit items-center rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary ring-1 ring-blue-200">
                            <span className="mr-2 h-2 w-2 rounded-full bg-accent"></span>
                            Trusted by 500+ businesses worldwide
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">
                                Get Started with{' '}
                                <span className="text-accent">
                                    Expert Accounting
                                </span>{' '}
                                Services
                            </h1>

                            <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">
                                Transform your business finances with our
                                comprehensive accounting outsourcing services.
                                Get your free consultation and custom solution
                                today.
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    <Check className="h-4 w-4 fill-accent" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        Free consultation
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        No obligation
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                    <Check className="h-4 w-4 fill-blue-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        Custom solution
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Tailored to you
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                                    <Check className="h-4 w-4 fill-purple-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        24-hour response
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Always available
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <button
                                onClick={handleOpenModal}
                                className={cn(
                                    'flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-white backdrop-blur-2xl transition-all hover:bg-accent/80 sm:w-auto',
                                )}
                            >
                                <div
                                    className={cn(
                                        'rounded-full bg-white p-1.5',
                                    )}
                                >
                                    <ArrowForward className="h-5 w-5 fill-accent" />
                                </div>
                                <span className="text-base">
                                    Schedule My Free Consultation
                                </span>
                            </button>

                            <p className="text-center text-sm text-gray-500 sm:text-left">
                                No credit card required • 30-minute call
                            </p>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            {/* Image container with decorative elements */}
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 p-6 shadow-2xl ring-1 ring-gray-200">
                                <Image
                                    src="/assets/images/headshot.png"
                                    alt="Professional accounting expert"
                                    width={400}
                                    height={400}
                                    className="relative z-10 rounded-xl object-cover shadow-lg"
                                    priority
                                />

                                {/* Floating elements */}
                                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-20"></div>
                                <div className="absolute -bottom-3 -left-3 h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-20"></div>
                            </div>

                            {/* Stats card */}
                            <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-3 shadow-lg ring-1 ring-gray-200">
                                <div className="text-center">
                                    <p className="text-xl font-bold text-gray-900">
                                        98%
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Client satisfaction
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scheduling Modal */}
            <SchedulingModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </section>
    );
}
