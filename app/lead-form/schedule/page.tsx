'use client';

import { useLeadForm } from '@/contexts/lead-form-context';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ArrowForward, Close } from '@/ui/icons/google-icons';

import { getAvailableDates, getTimeSlots } from '@/lib/lead-form-utils';

import cn from '@/utils/cn';

export default function SchedulePage() {
    const router = useRouter();
    const { formData, setSelectedDate, setSelectedTimeSlot } = useLeadForm();
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Only generate dates on the client to avoid hydration mismatch
        setAvailableDates(getAvailableDates());
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Set default selected date to first available date if none selected
        if (isMounted && !formData.selectedDate && availableDates.length > 0) {
            setSelectedDate(availableDates[0]);
        }
    }, [formData.selectedDate, setSelectedDate, availableDates, isMounted]);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        // Reset time slot when date changes
        setSelectedTimeSlot(null);
    };

    const handleTimeSelect = (slotId: string) => {
        setSelectedTimeSlot(slotId);
    };

    const handleContinue = () => {
        if (formData.selectedDate && formData.selectedTimeSlot) {
            router.push('/lead-form/contact');
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

    const formatFullDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const timeSlots =
        isMounted && formData.selectedDate
            ? getTimeSlots(formData.selectedDate)
            : [];

    // Show loading state until mounted to prevent hydration mismatch
    if (!isMounted) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Header - Sticky */}
            <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6">
                <div className="w-10"></div>
                <div className="px-2 text-center">
                    <h2 className="text-base font-bold text-foreground sm:text-lg">
                        Select a time for your call.
                    </h2>
                </div>
                <Link
                    href="/"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-gray-200 sm:h-10 sm:w-10"
                    aria-label="Close"
                >
                    <Close className="h-5 w-5 fill-foreground sm:h-6 sm:w-6" />
                </Link>
            </div>

            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-4xl p-4 sm:p-6">
                    {/* Date Selection */}
                    <div className="mb-8">
                        <h3 className="mb-4 text-lg font-semibold text-foreground sm:text-xl">
                            Select a Date
                        </h3>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
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
                                            'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-3 transition-all sm:p-4',
                                            isSelected
                                                ? 'border-accent bg-accent text-white'
                                                : 'border-gray-200 text-gray-700 hover:border-accent hover:bg-accent/5',
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'text-2xl font-bold sm:text-3xl',
                                                isSelected
                                                    ? 'text-white'
                                                    : 'text-foreground',
                                            )}
                                        >
                                            {date.getDate()}
                                        </div>
                                        <div
                                            className={cn(
                                                'text-xs font-medium sm:text-sm',
                                                isSelected
                                                    ? 'text-white'
                                                    : 'text-gray-600',
                                            )}
                                        >
                                            {date.toLocaleDateString('en-US', {
                                                weekday: 'short',
                                            })}
                                        </div>
                                        {isToday && (
                                            <div
                                                className={cn(
                                                    'mt-1 text-xs',
                                                    isSelected
                                                        ? 'text-white'
                                                        : 'text-accent',
                                                )}
                                            >
                                                Today
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Selected Date Display */}
                    {formData.selectedDate && (
                        <div className="mb-6 text-center">
                            <p className="text-sm text-gray-600 sm:text-base">
                                Selected:{' '}
                                <span className="font-semibold text-foreground">
                                    {formatFullDate(formData.selectedDate)}
                                </span>
                            </p>
                        </div>
                    )}

                    {/* Time Selection */}
                    {formData.selectedDate ? (
                        <div className="mb-8">
                            <h3 className="mb-4 text-lg font-semibold text-foreground sm:text-xl">
                                Select a Time
                            </h3>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5">
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
                                                'cursor-pointer rounded-xl border-2 px-3 py-3 text-sm font-semibold transition-all sm:px-4 sm:py-4 sm:text-base',
                                                isSelected
                                                    ? 'border-accent bg-accent text-white'
                                                    : 'border-gray-200 text-gray-700 hover:border-accent hover:bg-accent/5',
                                                !slot.available &&
                                                    'cursor-not-allowed opacity-40',
                                            )}
                                        >
                                            {slot.time}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Timezone Info */}
                            <div className="mt-4 text-center text-xs text-gray-500 sm:text-sm">
                                Times displayed in Eastern Time (ET) • 30 minute
                                consultation
                            </div>
                        </div>
                    ) : (
                        <div className="mb-8 rounded-xl bg-gray-50 p-8 text-center">
                            <p className="text-gray-500">
                                Select a date to view available times
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer - Sticky */}
            <div className="sticky bottom-0 border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
                <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:justify-between">
                    <Link
                        href="/"
                        className="cursor-pointer rounded-xl border-2 border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:text-base"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={handleContinue}
                        disabled={
                            !formData.selectedDate || !formData.selectedTimeSlot
                        }
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                    >
                        Continue
                        <ArrowForward className="h-5 w-5 fill-current" />
                    </button>
                </div>
            </div>
        </div>
    );
}
