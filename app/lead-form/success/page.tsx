'use client';

import { useLeadForm } from '@/contexts/lead-form-context';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { CalendarMonth } from '@/ui/icons/google-icons';

import { formatDate, getTimeSlots } from '@/lib/lead-form-utils';

export default function SuccessPage() {
    const router = useRouter();
    const { formData, resetForm } = useLeadForm();

    useEffect(() => {
        // Redirect if no data exists
        if (!formData.selectedDate || !formData.selectedTimeSlot) {
            router.push('/lead-form/schedule');
        }
    }, [formData.selectedDate, formData.selectedTimeSlot, router]);

    if (!formData.selectedDate || !formData.selectedTimeSlot) {
        return null;
    }

    const timeSlots = getTimeSlots(formData.selectedDate);
    const selectedSlot = timeSlots.find(
        (slot) => slot.id === formData.selectedTimeSlot,
    );

    const handleReturnHome = () => {
        resetForm();
        window.location.href = '/';
    };

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
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl">
                <div className="rounded-lg bg-white p-6 text-center sm:p-10">
                    {/* Success Icon */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 sm:h-20 sm:w-20">
                        <svg
                            className="h-10 w-10 fill-green-600 sm:h-12 sm:w-12"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                        Consultation Scheduled!
                    </h1>

                    {/* Description */}
                    <p className="mb-8 text-base text-gray-600 sm:text-lg">
                        Thank you, {formData.contactData.firstName}! Your
                        consultation has been successfully scheduled.
                    </p>

                    {/* Appointment Details */}
                    <div className="mb-8 rounded-lg bg-accent/5 p-6">
                        <div className="mb-4 flex items-center justify-center gap-2">
                            <CalendarMonth className="h-6 w-6 fill-accent" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Appointment Details
                            </h2>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700 sm:text-base">
                            <p>
                                <strong>Date:</strong>{' '}
                                {formatDate(formData.selectedDate)}
                            </p>
                            <p>
                                <strong>Time:</strong>{' '}
                                {selectedSlot?.time}{' '}
                                {selectedSlot?.timezoneAbbrev}
                            </p>
                            <p>
                                <strong>Duration:</strong> 30 minutes
                            </p>
                        </div>
                    </div>

                    {/* Confirmation Message */}
                    <div className="mb-8 p-4">
                        <p className="text-sm text-blue-900">
                            A confirmation email has been sent to{' '}
                            <strong>{formData.contactData.email}</strong> with
                            your appointment details and a meeting link.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            onClick={handleAddToCalendar}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-accent bg-white px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/5 sm:text-base"
                        >
                            <CalendarMonth className="h-5 w-5 fill-current" />
                            Add to Google Calendar
                        </button>
                        <button
                            onClick={handleReturnHome}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 sm:text-base"
                        >
                            <svg
                                className="h-5 w-5 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                            Return Home
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 border-t border-gray-200 pt-6 text-sm text-gray-500">
                        <p>
                            Need to make changes? Contact us at{' '}
                            <Link
                                href="mailto:consultations@robustaccounts.com"
                                className="text-accent hover:underline"
                            >
                                consultations@robustaccounts.com
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
