'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Checkbox from '@/ui/checkbox';
import Dropdown, { DropdownOption } from '@/ui/dropdown';
import GoogleCalendar from '@/ui/icons/google-calendar';
import { ArrowForward, ChevronRight, Close } from '@/ui/icons/google-icons';
import Input from '@/ui/input';
import PhoneInput from '@/ui/phone-input';
import Textarea from '@/ui/textarea';

import cn from '@/utils/cn';

interface SchedulingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    businessName: string;
    industry: string;
    message: string;
}

interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
    pstTime: string;
}

const industries: DropdownOption[] = [
    { value: 'technology', label: 'Technology' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'professional-services', label: 'Professional Services' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'retail', label: 'Retail' },
    { value: 'non-profit', label: 'Non-profit' },
    { value: 'other', label: 'Other' },
];

export default function SchedulingModal({
    isOpen,
    onClose,
}: SchedulingModalProps) {
    const [step, setStep] = useState<'calendar' | 'contact'>('calendar');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
        null,
    );
    const [contactData, setContactData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        businessName: '',
        industry: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [smsOptOut, setSmsOptOut] = useState(false);
    const [smsUpdates, setSmsUpdates] = useState(false);

    // Helper to reset all modal state
    const resetModalState = React.useCallback(() => {
        setStep('calendar');
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        setContactData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            businessName: '',
            industry: '',
            message: '',
        });
        setErrors({});
        setIsBooking(false);
        setIsBooked(false);
        setSmsOptOut(false);
        setSmsUpdates(false);
    }, []);

    // Handle animation timing
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            // Store the current scroll position
            const scrollY = window.scrollY;

            // Add styles to prevent scrolling
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            // Cleanup function to restore scrolling
            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    // Generate dates from current day through Friday of current week
    const getAvailableDates = () => {
        const dates = [];
        const today = new Date();
        const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const friday = 5; // Friday is day 5

        // If today is Saturday or Sunday, start from next Monday
        const startDate = new Date(today);
        if (currentDay === 0) {
            // Sunday
            startDate.setDate(today.getDate() + 1); // Move to Monday
        } else if (currentDay === 6) {
            // Saturday
            startDate.setDate(today.getDate() + 2); // Move to Monday
        }

        // Add days from start date through Friday
        for (let i = 0; i <= friday - startDate.getDay(); i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

    // Set default selected date to current day
    React.useEffect(() => {
        const availableDates = getAvailableDates();
        if (availableDates.length > 0 && !selectedDate) {
            setSelectedDate(availableDates[0]);
        }
    }, [selectedDate]);

    // Convert PST time to local time
    const convertPSTToLocal = (pstTime: string): string => {
        try {
            // Create a date object for today
            const today = new Date();

            // Create a date string in PST timezone
            const pstDateString = today.toLocaleDateString('en-CA', {
                timeZone: 'America/Los_Angeles',
            }); // YYYY-MM-DD format
            const pstDateTimeString = `${pstDateString}T${pstTime.padStart(5, '0')}:00`;

            // Create a date object that represents this time in PST
            const pstDate = new Date(pstDateTimeString + '-08:00'); // PST is UTC-8

            // Convert to local time
            const localHours = pstDate.getHours();
            const localMinutes = pstDate.getMinutes();
            const ampm = localHours >= 12 ? 'pm' : 'am';
            const displayHours = localHours % 12 || 12;
            return `${displayHours}:${localMinutes.toString().padStart(2, '0')}${ampm}`;
        } catch (error) {
            console.error('Time conversion error:', error);
            // Fallback: return the PST time as is with proper formatting
            const [hours, minutes] = pstTime.split(':').map(Number);
            const ampm = hours >= 12 ? 'pm' : 'am';
            const displayHours = hours % 12 || 12;
            return `${displayHours}:${minutes.toString().padStart(2, '0')}${ampm}`;
        }
    };

    // Generate time slots for selected date (11 AM to 7 PM PST)
    const getTimeSlots = (date: Date): TimeSlot[] => {
        const slots: TimeSlot[] = [];

        // PST time slots from 11 AM to 7 PM (hourly and half-hourly)
        const pstTimeSlots = [
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
        ];

        pstTimeSlots.forEach((pstTime, index) => {
            const localTime = convertPSTToLocal(pstTime);
            slots.push({
                id: `${date.toISOString().split('T')[0]}-${index}`,
                time: localTime,
                available: true,
                pstTime: `${pstTime.includes(':') ? pstTime : pstTime + ':00'} PST`,
            });
        });

        return slots;
    };

    const availableDates = getAvailableDates();
    const timeSlots = selectedDate ? getTimeSlots(selectedDate) : [];

    const validateContactForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!contactData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!contactData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!contactData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!contactData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }
        if (!contactData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }
        if (!contactData.industry) {
            newErrors.industry = 'Please select an industry';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTimeSlotSelect = () => {
        if (selectedDate && selectedTimeSlot) {
            setStep('contact');
        }
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateContactForm()) {
            handleBooking();
        }
    };

    const handleBooking = async () => {
        if (!selectedDate || !selectedTimeSlot) return;

        setIsBooking(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const selectedSlot = timeSlots.find(
                (slot) => slot.id === selectedTimeSlot,
            );
            console.log('Booking details:', {
                contactData,
                date: selectedDate,
                timeSlot: selectedTimeSlot,
                localTime: selectedSlot?.time,
                pstTime: selectedSlot?.pstTime,
                smsOptOut,
                smsUpdates,
            });

            setIsBooked(true);
        } catch (error) {
            console.error('Booking error:', error);
        } finally {
            setIsBooking(false);
        }
    };

    // Modified handleBack to reset state if closing
    const handleBack = () => {
        if (step === 'contact') {
            setStep('calendar');
        } else {
            resetModalState();
            onClose();
        }
    };

    // New handler for close button to always reset state
    const handleClose = () => {
        resetModalState();
        onClose();
    };

    const clearError = (fieldName: string) => {
        if (errors[fieldName]) {
            setErrors((prev) => ({
                ...prev,
                [fieldName]: '',
            }));
        }
    };

    const formatDate = (date: Date) => {
        const day = date.getDate();
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        return `${day} ${dayName}`;
    };

    const formatFullDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Get user's timezone
    const getUserTimezone = () => {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 h-screen bg-black/20"
                >
                    {isBooked ? (
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 200,
                                duration: 0.5,
                            }}
                            className="absolute right-0 bottom-0 left-0 flex h-full flex-col bg-white"
                        >
                            {/* Header with close button on the right - Sticky */}
                            <div className="sticky top-0 z-10 container mx-auto flex items-center justify-between border-b border-gray-200 bg-white p-4 sm:p-6">
                                <div className="w-10"></div>{' '}
                                {/* Spacer for centering */}
                                <div className="px-2 text-center">
                                    <h2 className="text-base font-bold text-foreground sm:text-lg">
                                        Consultation Scheduled!
                                    </h2>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-secondary transition-all duration-300 hover:bg-gray-200 focus:ring-2 focus:ring-accent/20 focus:outline-none sm:h-10 sm:w-10"
                                    aria-label="Close modal"
                                    type="button"
                                >
                                    <Close className="h-5 w-5 fill-foreground sm:h-6 sm:w-6" />
                                </button>
                            </div>

                            {/* Content - Scrollable */}
                            <div className="container mx-auto">
                                <div className="flex h-full flex-col items-center justify-center p-4 sm:p-6 xl:mt-12">
                                    {/* Success Title */}
                                    <div className="mb-8 flex flex-col items-center">
                                        <h3 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                                            Consultation Scheduled!
                                        </h3>
                                        <p className="text-sm text-gray-600 sm:text-base">
                                            You're all set for your free
                                            consultation
                                        </p>
                                    </div>

                                    {/* Appointment Details Card */}
                                    <div className="mb-8 w-full max-w-md rounded-xl bg-gradient-to-br from-secondary to-gray-50 p-6 shadow-lg">
                                        <div className="text-center">
                                            <div className="mb-3 text-sm font-medium text-gray-600 sm:text-base">
                                                Your appointment is scheduled
                                                for:
                                            </div>
                                            <div className="mb-2 text-lg font-bold text-foreground sm:text-xl">
                                                {selectedDate &&
                                                    formatFullDate(
                                                        selectedDate,
                                                    )}
                                            </div>
                                            <div className="mb-1 text-xl font-bold text-accent sm:text-2xl">
                                                {
                                                    timeSlots.find(
                                                        (slot) =>
                                                            slot.id ===
                                                            selectedTimeSlot,
                                                    )?.time
                                                }
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                (
                                                {
                                                    timeSlots.find(
                                                        (slot) =>
                                                            slot.id ===
                                                            selectedTimeSlot,
                                                    )?.pstTime
                                                }
                                                )
                                            </div>
                                        </div>
                                    </div>
                                    {/* Calendar Integration Section */}
                                    <div className="mb-6 w-full max-w-md">
                                        <div className="space-y-3">
                                            {/* Google Calendar */}
                                            <button
                                                onClick={() => {
                                                    const selectedSlot =
                                                        timeSlots.find(
                                                            (slot) =>
                                                                slot.id ===
                                                                selectedTimeSlot,
                                                        );
                                                    if (
                                                        selectedDate &&
                                                        selectedSlot
                                                    ) {
                                                        const startTime =
                                                            new Date(
                                                                selectedDate,
                                                            );
                                                        const [hours, minutes] =
                                                            selectedSlot.pstTime
                                                                .split(' ')[0]
                                                                .split(':')
                                                                .map(Number);
                                                        startTime.setHours(
                                                            hours,
                                                            minutes,
                                                            0,
                                                            0,
                                                        );

                                                        const endTime =
                                                            new Date(startTime);
                                                        endTime.setHours(
                                                            endTime.getHours() +
                                                                1,
                                                        );

                                                        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Free Accounting Consultation - Robust Accounts&dates=${startTime
                                                            .toISOString()
                                                            .replace(
                                                                /[-:]/g,
                                                                '',
                                                            )
                                                            .replace(
                                                                /\.\d{3}/,
                                                                '',
                                                            )}/${endTime
                                                            .toISOString()
                                                            .replace(
                                                                /[-:]/g,
                                                                '',
                                                            )
                                                            .replace(
                                                                /\.\d{3}/,
                                                                '',
                                                            )}&details=Free consultation with Robust Accounts to discuss your accounting needs. We'll call you at the scheduled time.&location=Phone Call`;
                                                        window.open(
                                                            googleUrl,
                                                            '_blank',
                                                        );
                                                    }
                                                }}
                                                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md sm:px-6 sm:py-4 sm:text-base"
                                            >
                                                <GoogleCalendar className="h-5 w-5" />
                                                Add to Google Calendar
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirmation Details */}
                                    <div className="w-full max-w-md space-y-4 text-center">
                                        <div className="space-y-3 text-sm text-gray-600 sm:text-base">
                                            <p className="font-medium">
                                                We'll call you at the scheduled
                                                time to discuss your accounting
                                                needs.
                                            </p>
                                            <p>
                                                Need to reschedule? Contact us
                                                at{' '}
                                                <Link
                                                    href="tel:+14153000000"
                                                    className="font-semibold text-accent"
                                                >
                                                    +1 (415) 300-0000
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 200,
                                duration: 0.5,
                            }}
                            className="absolute right-0 bottom-0 left-0 flex h-full flex-col bg-white"
                        >
                            {/* Header with close button on the right - Sticky */}
                            <div className="sticky top-0 z-10 container mx-auto flex items-center justify-between border-b border-gray-200 bg-white p-4 sm:p-6">
                                <button
                                    onClick={handleBack}
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-secondary transition-all duration-300 hover:bg-gray-200 focus:ring-2 focus:ring-accent/20 focus:outline-none sm:h-10 sm:w-10"
                                    aria-label="Go back"
                                    type="button"
                                >
                                    <ChevronRight className="h-5 w-5 rotate-180 fill-foreground sm:h-7 sm:w-7" />
                                </button>
                                <div className="px-2 text-center">
                                    <h2 className="text-base font-bold text-foreground sm:text-lg">
                                        {step === 'calendar'
                                            ? 'Select a time for your call.'
                                            : 'Enter your info to confirm.'}
                                    </h2>

                                    {step === 'contact' &&
                                        selectedDate &&
                                        selectedTimeSlot && (
                                            <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                                                {formatFullDate(selectedDate)}{' '}
                                                at{' '}
                                                {
                                                    timeSlots.find(
                                                        (slot) =>
                                                            slot.id ===
                                                            selectedTimeSlot,
                                                    )?.time
                                                }
                                            </p>
                                        )}
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-secondary transition-all duration-300 hover:bg-gray-200 focus:ring-2 focus:ring-accent/20 focus:outline-none sm:h-10 sm:w-10"
                                    aria-label="Close modal"
                                    type="button"
                                >
                                    <Close className="h-5 w-5 fill-foreground sm:h-6 sm:w-6" />
                                </button>
                            </div>

                            {/* Content - Scrollable */}
                            <div className="container mx-auto flex-1 overflow-y-auto">
                                {step === 'calendar' ? (
                                    <div className="p-4 sm:p-6">
                                        {/* Date and Time Selection Grid */}
                                        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
                                            {/* Date Selection - Left Column */}
                                            <div className="lg:col-span-1">
                                                <div className="space-y-2 sm:space-y-3">
                                                    {availableDates.map(
                                                        (date) => (
                                                            <button
                                                                key={date.toISOString()}
                                                                onClick={() => {
                                                                    setSelectedDate(
                                                                        date,
                                                                    );
                                                                    setSelectedTimeSlot(
                                                                        null,
                                                                    );
                                                                }}
                                                                className={cn(
                                                                    'w-full cursor-pointer rounded-lg border-2 p-3 text-center transition-all sm:p-4',
                                                                    selectedDate?.toDateString() ===
                                                                        date.toDateString()
                                                                        ? 'border-accent bg-accent text-white'
                                                                        : 'border-gray-200 bg-white text-foreground hover:border-accent hover:bg-secondary',
                                                                )}
                                                            >
                                                                <div className="text-base font-medium sm:text-lg">
                                                                    {formatDate(
                                                                        date,
                                                                    )}
                                                                </div>
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            </div>

                                            {/* Time Selection - Right Grid */}
                                            <div className="lg:col-span-2">
                                                {selectedDate ? (
                                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                                                        {timeSlots.map(
                                                            (slot) => (
                                                                <button
                                                                    key={
                                                                        slot.id
                                                                    }
                                                                    disabled={
                                                                        !slot.available
                                                                    }
                                                                    onClick={() =>
                                                                        slot.available &&
                                                                        setSelectedTimeSlot(
                                                                            slot.id,
                                                                        )
                                                                    }
                                                                    className={cn(
                                                                        'rounded-lg border-2 p-2 text-center transition-all sm:p-3',
                                                                        !slot.available
                                                                            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                                                                            : selectedTimeSlot ===
                                                                                slot.id
                                                                              ? 'cursor-pointer border-accent bg-accent text-white'
                                                                              : 'cursor-pointer border-gray-200 bg-white text-foreground hover:border-accent hover:bg-secondary',
                                                                    )}
                                                                >
                                                                    <div className="text-xs font-medium sm:text-sm">
                                                                        {
                                                                            slot.time
                                                                        }
                                                                    </div>
                                                                    {!slot.available && (
                                                                        <div className="text-xs">
                                                                            unavailable
                                                                        </div>
                                                                    )}
                                                                </button>
                                                            ),
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-sm text-gray-500 sm:text-base">
                                                        Select a date to view
                                                        available times
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Timezone Display */}
                                        <div className="mt-4 px-2 text-center text-xs text-gray-500 sm:mt-6 sm:text-sm">
                                            Times shown in your local timezone (
                                            {getUserTimezone()}) • Available 11
                                            AM - 7 PM PST
                                        </div>

                                        <div className="mt-4 flex justify-center sm:mt-6">
                                            <button
                                                onClick={handleTimeSlotSelect}
                                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary hover:shadow-lg sm:px-8 sm:py-4 sm:text-base lg:w-auto"
                                                type="button"
                                                disabled={
                                                    !selectedDate ||
                                                    !selectedTimeSlot
                                                }
                                            >
                                                Continue to Contact Form
                                                <ArrowForward className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 sm:p-6">
                                        <form
                                            onSubmit={handleContactSubmit}
                                            className="space-y-4 sm:space-y-6"
                                        >
                                            <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
                                                <Input
                                                    label="First Name"
                                                    name="firstName"
                                                    value={
                                                        contactData.firstName
                                                    }
                                                    onChange={(value) => {
                                                        setContactData(
                                                            (prev) => ({
                                                                ...prev,
                                                                firstName:
                                                                    value,
                                                            }),
                                                        );
                                                        clearError('firstName');
                                                    }}
                                                    placeholder="Enter your first name"
                                                    required
                                                    error={errors.firstName}
                                                />
                                                <Input
                                                    label="Last Name"
                                                    name="lastName"
                                                    value={contactData.lastName}
                                                    onChange={(value) => {
                                                        setContactData(
                                                            (prev) => ({
                                                                ...prev,
                                                                lastName: value,
                                                            }),
                                                        );
                                                        clearError('lastName');
                                                    }}
                                                    placeholder="Enter your last name"
                                                    required={true}
                                                    error={errors.lastName}
                                                />
                                                <Input
                                                    label="Email"
                                                    name="email"
                                                    type="email"
                                                    value={contactData.email}
                                                    onChange={(value) => {
                                                        setContactData(
                                                            (prev) => ({
                                                                ...prev,
                                                                email: value,
                                                            }),
                                                        );
                                                        clearError('email');
                                                    }}
                                                    placeholder="Enter your email address"
                                                    required
                                                    error={errors.email}
                                                />
                                                <PhoneInput
                                                    label="Phone"
                                                    value={contactData.phone}
                                                    countryCode="+1"
                                                    onChange={(value) => {
                                                        setContactData(
                                                            (prev) => ({
                                                                ...prev,
                                                                phone: value,
                                                            }),
                                                        );
                                                        clearError('phone');
                                                    }}
                                                    onCountryChange={() => {}}
                                                    required
                                                    error={errors.phone}
                                                />
                                                <Input
                                                    label="Business Name"
                                                    name="businessName"
                                                    value={
                                                        contactData.businessName
                                                    }
                                                    onChange={(value) => {
                                                        setContactData(
                                                            (prev) => ({
                                                                ...prev,
                                                                businessName:
                                                                    value,
                                                            }),
                                                        );
                                                        clearError(
                                                            'businessName',
                                                        );
                                                    }}
                                                    placeholder="Enter your business name"
                                                    required
                                                    error={errors.businessName}
                                                />
                                                <Dropdown
                                                    label="Industry"
                                                    options={industries}
                                                    value={contactData.industry}
                                                    onChange={(value) => {
                                                        setContactData(
                                                            (prev) => ({
                                                                ...prev,
                                                                industry: value,
                                                            }),
                                                        );
                                                        clearError('industry');
                                                    }}
                                                    placeholder="Select your industry"
                                                    required
                                                    error={errors.industry}
                                                />
                                                <div className="lg:col-span-2">
                                                    <Textarea
                                                        label="Message"
                                                        name="message"
                                                        value={
                                                            contactData.message
                                                        }
                                                        onChange={(value) => {
                                                            setContactData(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    message:
                                                                        value,
                                                                }),
                                                            );
                                                        }}
                                                        placeholder="Tell us about your accounting needs or any specific questions..."
                                                        rows={4}
                                                    />
                                                </div>
                                            </div>

                                            {/* Terms and SMS Communication */}
                                            <div className="space-y-4 sm:space-y-6">
                                                <p className="text-sm leading-relaxed text-gray-600">
                                                    By clicking 'Confirm My
                                                    Appointment' you agree to
                                                    our{' '}
                                                    <Link
                                                        href="/terms-of-service"
                                                        className="text-accent underline hover:text-primary"
                                                    >
                                                        Terms of Service
                                                    </Link>{' '}
                                                    and{' '}
                                                    <Link
                                                        href="/privacy-policy"
                                                        className="text-accent underline hover:text-primary"
                                                    >
                                                        Privacy Policy
                                                    </Link>
                                                    . This includes permission
                                                    to communicate with you
                                                    about your appointments via
                                                    phone, email, or SMS.
                                                </p>

                                                <div className="space-y-4 sm:space-y-5">
                                                    <Checkbox
                                                        name="smsOptOut"
                                                        label="If you prefer to opt-out of SMS communications you may uncheck this box"
                                                        checked={smsOptOut}
                                                        onChange={(checked) =>
                                                            setSmsOptOut(
                                                                checked,
                                                            )
                                                        }
                                                    />

                                                    <Checkbox
                                                        name="smsUpdates"
                                                        label="I'd like to receive SMS communications about upcoming tax deadlines and important tax updates"
                                                        checked={smsUpdates}
                                                        onChange={(checked) =>
                                                            setSmsUpdates(
                                                                checked,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-center">
                                                <button
                                                    type="submit"
                                                    disabled={isBooking}
                                                    className={cn(
                                                        'flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all sm:w-full sm:px-8 sm:py-4 sm:text-base lg:w-auto',
                                                        isBooking
                                                            ? 'cursor-not-allowed bg-gray-300'
                                                            : 'cursor-pointer bg-accent hover:bg-primary hover:shadow-lg',
                                                    )}
                                                >
                                                    {isBooking ? (
                                                        <>
                                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-5 sm:w-5" />
                                                            Booking...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Confirm My
                                                            Appointment
                                                            <ArrowForward className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
