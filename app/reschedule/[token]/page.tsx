'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAvailableDates, getTimeSlots, formatDate } from '@/lib/lead-form-utils';
import { rescheduleLead, getLeadByToken } from '@/lib/reschedule-lead';
import { ArrowRight, X, Calendar } from 'lucide-react';
import cn from '@/lib/cn';

export default function ReschedulePage() {
    const params = useParams();
    const router = useRouter();
    const token = params.token as string;
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lead, setLead] = useState<{
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        business_name?: string | null;
        appointment_datetime: Date | string;
    } | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [isRescheduled, setIsRescheduled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [availableDates, setAvailableDates] = useState<Date[]>([]);

    useEffect(() => {
        async function fetchLead() {
            if (!token) {
                setError('Invalid reschedule link');
                setLoading(false);
                return;
            }

            try {
                const result = await getLeadByToken(token);
                if (result.success && result.lead) {
                    setLead({
                        id: result.lead.id as number,
                        first_name: result.lead.first_name as string,
                        last_name: result.lead.last_name as string,
                        email: result.lead.email as string,
                        business_name: result.lead.business_name as string | null | undefined,
                        appointment_datetime: result.lead.appointment_datetime as Date | string,
                    });
                } else {
                    setError(result.error || 'Lead not found');
                }
            } catch (err) {
                setError('Failed to load appointment details');
                console.error('Error fetching lead:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchLead();
        setAvailableDates(getAvailableDates());
        setIsMounted(true);
    }, [token]);
    
    useEffect(() => {
        if (isMounted && availableDates.length > 0 && !selectedDate) {
            setSelectedDate(availableDates[0]);
        }
    }, [isMounted, availableDates, selectedDate]);

    const timeSlots = isMounted && selectedDate ? getTimeSlots(selectedDate) : [];
    const selectedSlotDetails = selectedTimeSlot
        ? timeSlots.find((slot) => slot.id === selectedTimeSlot)
        : undefined;

    const handleReschedule = async () => {
        if (!selectedSlotDetails || !selectedDate || !token) return;

        setIsRescheduling(true);

        try {
            const appointmentStart = new Date(selectedSlotDetails.startDateUtc);

            const result = await rescheduleLead(
                token,
                appointmentStart,
            );

            if (result.success) {
                setIsRescheduled(true);
            } else {
                setError(result.error || 'Failed to reschedule appointment');
            }
        } catch (err) {
            setError('Failed to reschedule appointment');
            console.error('Reschedule error:', err);
        } finally {
            setIsRescheduling(false);
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
        // Extract date components directly to avoid timezone issues
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        
        // Create a new date at noon local time to avoid timezone shifts
        const dateAtNoon = new Date(year, month, day, 12, 0, 0);
        
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(dateAtNoon);
    };

    const formatAppointmentDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
            timeZone: 'America/New_York',
        }).format(date);
    };

    const handleAddToCalendar = () => {
        if (!selectedSlotDetails || !selectedDate) return;

        const startDate = new Date(selectedSlotDetails.startDateUtc);
        const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

        const formatGoogleCalendarDate = (date: Date) => {
            return date
                .toISOString()
                .replace(/-|:|\.\d+/g, '')
                .replace(/Z$/, 'Z');
        };

        const businessName = lead?.business_name || 'your business';
        const title = encodeURIComponent(
            'Accounting Consultation - Robust Accounts',
        );
        const description = encodeURIComponent(
            `Consultation with Robust Accounts about ${businessName}`,
        );
        const dates = `${formatGoogleCalendarDate(startDate)}/${formatGoogleCalendarDate(endDate)}`;

        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${description}&ctz=${selectedSlotDetails.timezone}`;

        window.open(googleCalendarUrl, '_blank');
    };

    const handleReturnHome = () => {
        router.push('/');
    };

    if (loading || !isMounted) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white">
                <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent mx-auto"></div>
                    <p className="text-gray-600">Loading appointment details...</p>
                </div>
            </div>
        );
    }

    if (error && !lead) {
        return (
            <div className="flex min-h-screen flex-col bg-white">
                <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6">
                    <div className="w-10"></div>
                    <div className="px-2 text-center">
                        <h2 className="text-base font-bold text-foreground sm:text-lg">
                            Unable to Load Appointment
                        </h2>
                    </div>
                    <Link
                        href="/"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-gray-200 sm:h-10 sm:w-10"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5 fill-foreground sm:h-6 sm:w-6" />
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <p className="text-gray-600 mb-6">{error}</p>
                        <a
                            href="mailto:consultations@robustaccounts.com"
                            className="text-accent hover:text-primary underline"
                        >
                            Contact us for assistance
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Header - Sticky */}
            {!isRescheduled && (
                <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6">
                    <div className="w-10"></div>
                    <div className="px-2 text-center">
                        <h2 className="text-base font-bold text-foreground sm:text-lg">
                            Reschedule your appointment
                        </h2>
                    </div>
                    <Link
                        href="/"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-gray-200 sm:h-10 sm:w-10"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5 fill-foreground sm:h-6 sm:w-6" />
                    </Link>
                </div>
            )}

            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-4xl p-4 sm:p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            {error}
                        </div>
                    )}

                    {isRescheduled ? (
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
                                        Appointment Rescheduled!
                                    </h1>

                                    {/* Description */}
                                    <p className="mb-8 text-base text-gray-600 sm:text-lg">
                                        {lead?.first_name ? `Thank you, ${lead.first_name}! ` : ''}Your
                                        appointment has been successfully rescheduled.
                                    </p>

                                    {/* Appointment Details */}
                                    {selectedDate && selectedSlotDetails && (
                                        <div className="mb-8 rounded-lg bg-accent/5 p-6">
                                            <div className="mb-4 flex items-center justify-center gap-2">
                                                <Calendar className="h-6 w-6 text-accent" />
                                                <h2 className="text-lg font-semibold text-gray-900">
                                                    Appointment Details
                                                </h2>
                                            </div>
                                            <div className="space-y-2 text-sm text-gray-700 sm:text-base">
                                                <p>
                                                    <strong>Date:</strong>{' '}
                                                    {formatDate(selectedDate)}
                                                </p>
                                                <p>
                                                    <strong>Time:</strong>{' '}
                                                    {selectedSlotDetails.time}{' '}
                                                    {selectedSlotDetails.timezoneAbbrev}
                                                </p>
                                                <p>
                                                    <strong>Duration:</strong> 30 minutes
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Confirmation Message */}
                                    <div className="mb-8 p-4">
                                        <p className="text-sm text-blue-900">
                                            A confirmation email has been sent to{' '}
                                            {lead?.email && (
                                                <strong>{lead.email}</strong>
                                            )}{' '}
                                            with your appointment details and a meeting link.
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                                        <button
                                            onClick={handleAddToCalendar}
                                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-accent bg-white px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/5 sm:text-base"
                                        >
                                            <Calendar className="h-5 w-5" />
                                            Add to Google Calendar
                                        </button>
                                        <button
                                            onClick={handleReturnHome}
                                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 sm:text-base"
                                        >
                                            <svg
                                                className="h-5 w-5"
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
                    ) : (
                        <>
                            {/* Current Appointment Info */}
                            {lead?.appointment_datetime && (
                                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm font-semibold text-blue-900 mb-1">
                                        Current Appointment:
                                    </p>
                                    <p className="text-blue-800">
                                        {formatAppointmentDateTime(
                                            typeof lead.appointment_datetime === 'string' 
                                                ? lead.appointment_datetime 
                                                : lead.appointment_datetime.toISOString()
                                        )}
                                    </p>
                                </div>
                            )}

                            {/* Date Selection */}
                            <div className="mb-8">
                                <h3 className="mb-4 text-lg font-semibold text-foreground sm:text-xl">
                                    Select a Date
                                </h3>
                                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
                                    {availableDates.map((date) => {
                                        const isSelected = isSameDay(selectedDate, date);
                                        const isToday =
                                            new Date().toDateString() ===
                                            date.toDateString();

                                        return (
                                            <button
                                                key={date.toISOString()}
                                                onClick={() => {
                                                    setSelectedDate(date);
                                                    setSelectedTimeSlot(null);
                                                }}
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
                                                {new Intl.DateTimeFormat('en-US', {
                                                    weekday: 'short',
                                                }).format(date)}
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
                            {selectedDate && (
                                <div className="mb-6 text-center">
                                    <p className="text-sm text-gray-600 sm:text-base">
                                        Selected:{' '}
                                        <span className="font-semibold text-foreground">
                                            {formatFullDate(selectedDate)}
                                        </span>
                                    </p>
                                </div>
                            )}

                            {/* Time Selection */}
                            {selectedDate ? (
                                <div className="mb-8">
                                    <h3 className="mb-4 text-lg font-semibold text-foreground sm:text-xl">
                                        Select a Time
                                    </h3>
                                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5">
                                        {timeSlots.map((slot) => {
                                            const isSelected =
                                                selectedTimeSlot === slot.id;

                                            return (
                                                <button
                                                    key={slot.id}
                                                    onClick={() =>
                                                        slot.available && setSelectedTimeSlot(slot.id)
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
                                        All times shown in Eastern Time (ET) • 30 minute
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
                        </>
                    )}
                </div>
            </div>

            {/* Footer - Sticky */}
            {!isRescheduled && (
                <div className="sticky bottom-0 border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
                    <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:justify-between">
                        <Link
                            href="/"
                            className="cursor-pointer rounded-xl border-2 border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:text-base"
                        >
                            Cancel
                        </Link>
                        <button
                            onClick={handleReschedule}
                            disabled={
                                !selectedDate || !selectedTimeSlot || isRescheduling
                            }
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                        >
                            {isRescheduling ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-5 sm:w-5" />
                                    Rescheduling...
                                </>
                            ) : (
                                <>
                                    Confirm New Appointment
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
