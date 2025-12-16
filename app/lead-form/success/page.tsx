'use client';

import { useLeadForm } from '@/contexts/lead-form-context';

import { Calendar, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import GoogleCalendarIcon from '@/components/ui/icons/google-calendar';

import { formatDate, getTimeSlots } from '@/lib/lead-form-utils';

const AUTO_REDIRECT_SECONDS = 15;

export default function SuccessPage() {
    const router = useRouter();
    const { formData, resetForm } = useLeadForm();
    const [countdown, setCountdown] = useState(AUTO_REDIRECT_SECONDS);

    const handleReturnHome = useCallback(() => {
        resetForm();
        window.location.href = '/';
    }, [resetForm]);

    useEffect(() => {
        // Redirect if no data exists
        if (!formData.selectedDate || !formData.selectedTimeSlot) {
            router.push('/lead-form/schedule');
        }
    }, [formData.selectedDate, formData.selectedTimeSlot, router]);

    // Auto-redirect countdown
    useEffect(() => {
        if (!formData.selectedDate || !formData.selectedTimeSlot) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleReturnHome();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [formData.selectedDate, formData.selectedTimeSlot, handleReturnHome]);

    if (!formData.selectedDate || !formData.selectedTimeSlot) {
        return null;
    }

    const timeSlots = getTimeSlots(formData.selectedDate);
    const selectedSlot = timeSlots.find(
        (slot) => slot.id === formData.selectedTimeSlot,
    );

    const handleAddToCalendar = () => {
        if (!selectedSlot) return;

        const startDate = new Date(selectedSlot.startDateUtc);
        const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

        const formatGoogleCalendarDate = (date: Date) => {
            return date
                .toISOString()
                .replace(/-|:|\.\d+/g, '')
                .replace(/Z$/, 'Z');
        };

        const title = encodeURIComponent(
            'Accounting Consultation - Robust Accounts',
        );
        const description = encodeURIComponent(
            `Consultation with Robust Accounts about ${formData.contactData.businessName}`,
        );
        const dates = `${formatGoogleCalendarDate(startDate)}/${formatGoogleCalendarDate(endDate)}`;

        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${description}&ctz=${selectedSlot.timezone}`;

        window.open(googleCalendarUrl, '_blank');
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-theme-offwhite">
            {/* Header */}
            <div className="flex w-full shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-5">
                <div className="w-10"></div>
                <div className="text-center">
                    <p className="text-xs font-medium text-primary">
                        Confirmed
                    </p>
                    <h2 className="mt-0.5 text-base font-bold text-theme-black sm:text-lg">
                        Consultation Scheduled
                    </h2>
                </div>
                <Link
                    href="/"
                    onClick={handleReturnHome}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center bg-gray-100 transition-all duration-300 hover:bg-gray-200 sm:h-10 sm:w-10"
                    aria-label="Close"
                >
                    <X className="h-5 w-5 text-gray-600" />
                </Link>
            </div>

            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                <div className="mx-auto w-full max-w-2xl py-6 sm:py-10 lg:py-12">
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center bg-primary sm:h-20 sm:w-20">
                            <Check
                                className="h-10 w-10 text-white sm:h-12 sm:w-12"
                                strokeWidth={3}
                            />
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-3 text-2xl font-bold text-theme-black sm:text-3xl">
                            You're All Set!
                        </h1>
                        <p className="text-base text-gray-600">
                            Thank you, {formData.contactData.firstName}! Your
                            consultation has been successfully scheduled.
                        </p>
                    </div>

                    {/* Appointment Details Card */}
                    <div className="mb-6 border-l-4 border-primary bg-white p-5 sm:p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <h2 className="text-base font-semibold text-theme-black">
                                Appointment Details
                            </h2>
                        </div>
                        <div className="grid gap-3 text-sm sm:grid-cols-3">
                            <div>
                                <p className="font-medium text-gray-500">
                                    Date
                                </p>
                                <p className="text-theme-black">
                                    {formatDate(formData.selectedDate)}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-500">
                                    Time
                                </p>
                                <p className="text-theme-black">
                                    {selectedSlot?.time}{' '}
                                    {selectedSlot?.timezoneAbbrev}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-500">
                                    Duration
                                </p>
                                <p className="text-theme-black">30 minutes</p>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation Email Notice */}
                    <div className="mb-6 bg-white p-4 text-center text-sm text-gray-600">
                        A confirmation email has been sent to{' '}
                        <span className="font-medium text-theme-black">
                            {formData.contactData.email}
                        </span>{' '}
                        with your appointment details and a meeting link.
                    </div>

                    {/* Need Changes Notice */}
                    <div className="text-center text-sm text-gray-500">
                        Need to make changes? Contact us at{' '}
                        <Link
                            href="mailto:consultations@robustaccounts.com"
                            className="text-primary hover:underline"
                        >
                            consultations@robustaccounts.com
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
                <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        onClick={handleAddToCalendar}
                        className="flex cursor-pointer items-center justify-center gap-2 border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:text-primary sm:text-base"
                    >
                        <GoogleCalendarIcon className="h-5 w-5" />
                        Add to Calendar
                    </button>

                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                        <p className="text-xs text-gray-400">
                            Redirecting in {countdown}s
                        </p>
                        <button
                            onClick={handleReturnHome}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 sm:w-auto sm:text-base"
                        >
                            Back to Website
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
