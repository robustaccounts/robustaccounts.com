'use client';

import { useLeadForm } from '@/contexts/lead-form-context';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ArrowForward, CalendarMonth, Close } from '@/ui/icons/google-icons';

import { formatDate, getAvailableDates } from '@/lib/lead-form-utils';

import ProgressSteps from '@/components/lead-form/progress-steps';

import cn from '@/utils/cn';

export default function CalendarPage() {
    const router = useRouter();
    const { formData, setSelectedDate } = useLeadForm();
    const availableDates = getAvailableDates();

    useEffect(() => {
        // Set default selected date to first available date if none selected
        if (!formData.selectedDate && availableDates.length > 0) {
            setSelectedDate(availableDates[0]);
        }
    }, [formData.selectedDate, setSelectedDate, availableDates]);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const handleContinue = () => {
        if (formData.selectedDate) {
            router.push('/lead-form/time');
        }
    };

    const isSameDay = (date1: Date | null, date2: Date) => {
        if (!date1) return false;
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
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
                    <ProgressSteps currentStep={1} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
                        {/* Title */}
                        <div className="mb-6 flex items-start gap-3">
                            <div className="rounded-full bg-accent/10 p-2">
                                <CalendarMonth className="h-6 w-6 fill-accent" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    Select a Date
                                </h2>
                                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                                    Choose a convenient date for your
                                    consultation
                                </p>
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div className="space-y-3">
                            {availableDates.map((date) => {
                                const isSelected = isSameDay(
                                    formData.selectedDate,
                                    date,
                                );
                                const isToday =
                                    new Date().toDateString() ===
                                    date.toDateString();

                                return (
                                    <button
                                        key={date.toISOString()}
                                        onClick={() => handleDateSelect(date)}
                                        className={cn(
                                            'group relative w-full cursor-pointer rounded-lg border-2 p-4 text-left transition-all sm:p-5',
                                            isSelected
                                                ? 'border-accent bg-accent/5'
                                                : 'border-gray-200 hover:border-accent/50 hover:bg-gray-50',
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div
                                                    className={cn(
                                                        'text-base font-semibold sm:text-lg',
                                                        isSelected
                                                            ? 'text-accent'
                                                            : 'text-gray-900',
                                                    )}
                                                >
                                                    {formatDate(date)}
                                                </div>
                                                {isToday && (
                                                    <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-white">
                                                        Today
                                                    </span>
                                                )}
                                            </div>
                                            {isSelected && (
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent">
                                                    <svg
                                                        className="h-4 w-4 fill-white"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Continue Button */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                            <Link
                                href="/"
                                className="cursor-pointer rounded-lg border border-gray-300 px-6 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:text-base"
                            >
                                Cancel
                            </Link>
                            <button
                                onClick={handleContinue}
                                disabled={!formData.selectedDate}
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
