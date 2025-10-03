'use client';

import { useLeadForm } from '@/contexts/lead-form-context';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ArrowForward, CalendarClock, Close } from '@/ui/icons/google-icons';

import { formatDate, getTimeSlots } from '@/lib/lead-form-utils';

import ProgressSteps from '@/components/lead-form/progress-steps';

import cn from '@/utils/cn';

export default function TimePage() {
    const router = useRouter();
    const { formData, setSelectedTimeSlot } = useLeadForm();

    useEffect(() => {
        // Redirect to calendar if no date is selected
        if (!formData.selectedDate) {
            router.push('/lead-form/calendar');
        }
    }, [formData.selectedDate, router]);

    if (!formData.selectedDate) {
        return null;
    }

    const timeSlots = getTimeSlots(formData.selectedDate);

    const handleTimeSelect = (slotId: string) => {
        setSelectedTimeSlot(slotId);
    };

    const handleContinue = () => {
        if (formData.selectedTimeSlot) {
            router.push('/lead-form/contact');
        }
    };

    const handleBack = () => {
        router.push('/lead-form/calendar');
    };

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-5xl items-center justify-between">
                    <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
                        Schedule Your Consultation
                    </h1>
                    <Link
                        href="/"
                        className="cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500"
                    >
                        <Close className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
                        <span className="sr-only">Close</span>
                    </Link>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="border-b border-gray-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <ProgressSteps currentStep={2} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
                        {/* Title */}
                        <div className="mb-6 flex items-start gap-3">
                            <div className="rounded-full bg-accent/10 p-2">
                                <CalendarClock className="h-6 w-6 fill-accent" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    Choose a Time
                                </h2>
                                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                                    {formatDate(formData.selectedDate)}
                                </p>
                            </div>
                        </div>

                        {/* Time Slots Grid */}
                        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                            {timeSlots.map((slot) => {
                                const isSelected =
                                    formData.selectedTimeSlot === slot.id;

                                return (
                                    <button
                                        key={slot.id}
                                        onClick={() =>
                                            handleTimeSelect(slot.id)
                                        }
                                        disabled={!slot.available}
                                        className={cn(
                                            'cursor-pointer rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all sm:text-base',
                                            isSelected
                                                ? 'border-accent bg-accent text-white'
                                                : 'border-gray-200 text-gray-700 hover:border-accent/50 hover:bg-gray-50',
                                            !slot.available &&
                                                'cursor-not-allowed opacity-40',
                                        )}
                                    >
                                        {slot.time}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Info Text */}
                        <div className="mb-6 rounded-lg bg-blue-50 p-4">
                            <p className="text-sm text-blue-900">
                                <strong>Note:</strong> Times are displayed in
                                your local timezone. Your consultation will be
                                60 minutes.
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                            <button
                                onClick={handleBack}
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:text-base"
                            >
                                <svg
                                    className="h-5 w-5 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                                </svg>
                                Back
                            </button>
                            <button
                                onClick={handleContinue}
                                disabled={!formData.selectedTimeSlot}
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                            >
                                Continue
                                <ArrowForward className="h-5 w-5 fill-current" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
