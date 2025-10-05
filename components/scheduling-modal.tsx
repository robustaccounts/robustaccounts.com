'use client';

import { sendGAEvent } from '@next/third-parties/google';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Dropdown, { DropdownOption } from '@/ui/dropdown';
import GoogleCalendar from '@/ui/icons/google-calendar';
import { ArrowForward, ChevronRight, Close } from '@/ui/icons/google-icons';
import Input from '@/ui/input';
import PhoneInput from '@/ui/phone-input';
import Textarea from '@/ui/textarea';

import { saveLead } from '@/lib/save-lead';
import {
    getAvailableDates,
    getTimeSlots,
} from '@/lib/lead-form-utils';

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
    countryCode: string;
    businessName: string;
    industry: string;
    message: string;
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
        countryCode: '+1',
        businessName: '',
        industry: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isBooking, setIsBooking] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const overlayRef = React.useRef<HTMLDivElement>(null);
    const previouslyFocused = React.useRef<HTMLElement | null>(null);

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
            countryCode: '+1',
            businessName: '',
            industry: '',
            message: '',
        });
        setErrors({});
        setIsBooking(false);
        setIsBooked(false);
    }, []);

    // Prevent body scrolling when modal is open; manage focus
    useEffect(() => {
        if (isOpen) {
            previouslyFocused.current =
                (document.activeElement as HTMLElement) || null;
            // Store the current scroll position
            const scrollY = window.scrollY;

            // Add styles to prevent scrolling
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            // Focus modal container when opened
            setTimeout(() => {
                overlayRef.current?.focus();
            }, 0);

            // Cleanup function to restore scrolling and focus
            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
                previouslyFocused.current?.focus?.();
            };
        }
    }, [isOpen]);

    const availableDates = React.useMemo(() => getAvailableDates(), []);

    React.useEffect(() => {
        if (availableDates.length > 0 && !selectedDate) {
            setSelectedDate(availableDates[0]);
        }
    }, [availableDates, selectedDate]);

    const timeSlots = React.useMemo(
        () => (selectedDate ? getTimeSlots(selectedDate) : []),
        [selectedDate],
    );

    const selectedSlotDetails = selectedTimeSlot
        ? timeSlots.find((slot) => slot.id === selectedTimeSlot)
        : undefined;

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
        if (!selectedSlotDetails) return;

        setIsBooking(true);

        try {
            const appointmentStart = new Date(selectedSlotDetails.startDateUtc);

            const leadData = {
                firstName: contactData.firstName,
                lastName: contactData.lastName,
                email: contactData.email,
                phone: contactData.phone,
                countryCode: contactData.countryCode,
                businessName: contactData.businessName,
                industry: contactData.industry,
                message: contactData.message,
                appointmentDatetime: appointmentStart,
            };

            const result = await saveLead(leadData);

            if (result.success) {
                console.log('Lead saved successfully with ID:', result.leadId);

                // Fire Google Ads conversion event for lead form submission
                sendGAEvent('event', 'conversion', {
                    send_to: 'AW-17600938444/jfkaCOHz5aEbEMyD5MhB',
                    value: 1.0,
                    currency: 'USD',
                });

                setIsBooked(true);
            } else {
                console.error('Failed to save lead:', result.error);
                // Handle error - you might want to show an error message to the user
            }
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
                    ref={overlayRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] flex h-screen w-screen bg-black/50 outline-none"
                    onClick={handleClose}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="scheduling-modal-title"
                    tabIndex={-1}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            e.stopPropagation();
                            handleClose();
                        }
                    }}
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
                            className="relative h-full w-full flex-col bg-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header with close button on the right - Sticky */}
                            <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6">
                                <div className="w-10"></div>{' '}
                                {/* Spacer for centering */}
                                <div className="px-2 text-center">
                                    <h2
                                        id="scheduling-modal-title"
                                        className="text-base font-bold text-foreground sm:text-lg"
                                    >
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
                            <div className="w-full">
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
                                    <div className="mb-8 w-full max-w-md rounded-xl p-6">
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
                                                {selectedSlotDetails?.time}
                                            </div>
                                            <div className="text-sm font-semibold text-gray-600">
                                                {selectedSlotDetails?.timezoneAbbrev}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Calendar Integration Section */}
                                    <div className="mb-6 flex w-full items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (selectedSlotDetails) {
                                                    const startTimeUtc =
                                                        new Date(
                                                            selectedSlotDetails.startDateUtc,
                                                        );
                                                    const endTimeUtc = new Date(
                                                        startTimeUtc.getTime() +
                                                            30 * 60 * 1000,
                                                    );

                                                    const guestEmail =
                                                        'consultations@robustaccounts.com';
                                                    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Free Accounting Consultation - Robust Accounts&dates=${startTimeUtc
                                                        .toISOString()
                                                        .replace(/[-:]/g, '')
                                                        .replace(
                                                            /\.\d{3}/,
                                                            '',
                                                        )}/${endTimeUtc
                                                        .toISOString()
                                                        .replace(/[-:]/g, '')
                                                        .replace(
                                                            /\.\d{3}/,
                                                            '',
                                                        )}&details=Free consultation with Robust Accounts to discuss your accounting needs. We'll call you at the scheduled time.&location=Phone Call&add=${guestEmail}&ctz=${selectedSlotDetails.timezone}`;
                                                    window.open(
                                                        googleUrl,
                                                        '_blank',
                                                    );
                                                }
                                            }}
                                            className="flex w-auto cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all sm:px-6 sm:py-4 sm:text-base"
                                        >
                                            <GoogleCalendar className="h-5 w-5" />
                                            Add to Google Calendar
                                        </button>
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
                            className="relative h-full w-full flex-col bg-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header with close button on the right - Sticky */}
                            <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6">
                                <button
                                    onClick={handleBack}
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-secondary transition-all duration-300 hover:bg-gray-200 focus:ring-2 focus:ring-accent/20 focus:outline-none sm:h-10 sm:w-10"
                                    aria-label="Go back"
                                    type="button"
                                >
                                    <ChevronRight className="h-5 w-5 rotate-180 fill-foreground sm:h-7 sm:w-7" />
                                </button>
                                <div className="px-2 text-center">
                                    <h2
                                        id="scheduling-modal-title"
                                        className="text-base font-bold text-foreground sm:text-lg"
                                    >
                                        {step === 'calendar'
                                            ? 'Select a time for your call.'
                                            : 'Enter your info to confirm.'}
                                    </h2>

                                    {step === 'contact' &&
                                        selectedDate &&
                                        selectedSlotDetails && (
                                            <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                                                {formatFullDate(selectedDate)}{' '}
                                                at{' '}
                                                {selectedSlotDetails.time}{' '}
                                                {selectedSlotDetails.timezoneAbbrev}
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
                            <div className="w-full flex-1 overflow-y-auto">
                                {step === 'calendar' ? (
                                    <div className="p-3 sm:p-4 md:p-6">
                                        {/* Date and Time Selection Grid */}
                                        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
                                            {/* Date Selection - Left Column */}
                                            <div className="lg:col-span-1">
                                                <div className="space-y-2 sm:space-y-3">
                                                    {availableDates.map(
                                                        (date) => (
                                                            <button
                                                                key={date.toISOString()}
                                                                type="button"
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
                                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                                                        {timeSlots.map(
                                                            (slot) => (
                                                                <button
                                                                    key={
                                                                        slot.id
                                                                    }
                                                                    type="button"
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
                                    <div className="p-3 sm:p-4 md:p-6">
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
                                                    countryCode={
                                                        contactData.countryCode
                                                    }
                                                    onChange={(value) => {
                                                        setContactData(
                                                            (prev) => ({
                                                                ...prev,
                                                                phone: value,
                                                            }),
                                                        );
                                                        clearError('phone');
                                                    }}
                                                    onCountryChange={(code) => {
                                                        setContactData(
                                                            (prev) => ({
                                                                ...prev,
                                                                countryCode:
                                                                    code,
                                                            }),
                                                        );
                                                    }}
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
                                                <p className="text-start text-sm leading-relaxed text-gray-600">
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
                                                    phone and email.
                                                </p>
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
