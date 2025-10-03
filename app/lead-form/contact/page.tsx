'use client';

import { useLeadForm } from '@/contexts/lead-form-context';
import { sendGAEvent } from '@next/third-parties/google';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Checkbox from '@/ui/checkbox';
import Dropdown, { DropdownOption } from '@/ui/dropdown';
import { Close } from '@/ui/icons/google-icons';
import Input from '@/ui/input';
import PhoneInput from '@/ui/phone-input';
import Textarea from '@/ui/textarea';

import { getTimeSlots, getUtcForTimeZone } from '@/lib/lead-form-utils';
import { saveLead } from '@/lib/save-lead';

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

export default function ContactPage() {
    const router = useRouter();
    const { formData, setContactData, setSmsOptOut, setSmsUpdates } =
        useLeadForm();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Redirect to schedule if no date or time is selected
        if (!formData.selectedDate || !formData.selectedTimeSlot) {
            router.push('/lead-form/schedule');
        }
    }, [formData.selectedDate, formData.selectedTimeSlot, router]);

    if (!formData.selectedDate || !formData.selectedTimeSlot) {
        return null;
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.contactData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.contactData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.contactData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactData.email)
        ) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.contactData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }
        if (!formData.contactData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }
        if (!formData.contactData.industry) {
            newErrors.industry = 'Please select an industry';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (!formData.selectedDate) {
                setIsSubmitting(false);
                return;
            }

            const timeSlots = getTimeSlots(formData.selectedDate);
            const selectedSlot = timeSlots.find(
                (slot) => slot.id === formData.selectedTimeSlot,
            );

            if (!selectedSlot) {
                setIsSubmitting(false);
                return;
            }

            // Use EST timezone to generate correct UTC (handles EST/EDT)
            const estTime = selectedSlot.pstTime.split(' ')[0];
            const [slotHour, slotMinute] = estTime.split(':').map(Number);
            const estDateStr = new Intl.DateTimeFormat('en-CA', {
                timeZone: 'America/New_York',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(formData.selectedDate);
            const [estYear, estMonth, estDay] = estDateStr
                .split('-')
                .map((n) => parseInt(n, 10));
            const utcAppointmentDatetime = getUtcForTimeZone(
                estYear,
                estMonth,
                estDay,
                slotHour,
                slotMinute,
                'America/New_York',
            );

            const leadData = {
                firstName: formData.contactData.firstName,
                lastName: formData.contactData.lastName,
                email: formData.contactData.email,
                phone: formData.contactData.phone,
                countryCode: formData.contactData.countryCode,
                businessName: formData.contactData.businessName,
                industry: formData.contactData.industry,
                message: formData.contactData.message,
                appointmentDatetime: utcAppointmentDatetime,
                smsOptOut: formData.smsOptOut,
                smsUpdates: formData.smsUpdates,
            };

            // Format appointment details for customer email
            const appointmentDetails = {
                appointmentDate: formData.selectedDate.toLocaleDateString(
                    'en-US',
                    {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    },
                ),
                appointmentTime: selectedSlot.time,
                appointmentTimezone: 'EST',
            };

            const result = await saveLead(leadData, appointmentDetails);

            if (result.success) {
                console.log('Lead saved successfully with ID:', result.leadId);

                // Fire Google Ads conversion event for lead form submission
                sendGAEvent('event', 'conversion', {
                    send_to: 'AW-17600938444/jfkaCOHz5aEbEMyD5MhB',
                    value: 1.0,
                    currency: 'USD',
                });

                router.push('/lead-form/success');
            } else {
                console.error('Failed to save lead:', result.error);
                setErrors({
                    submit: 'Failed to submit form. Please try again.',
                });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ submit: 'An error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        router.push('/lead-form/schedule');
    };

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Header - Sticky */}
            <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6">
                <div className="w-10"></div>
                <div className="px-2 text-center">
                    <h2 className="text-base font-bold text-foreground sm:text-lg">
                        Enter your details.
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
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-4xl">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Input
                                label="First Name"
                                value={formData.contactData.firstName}
                                onChange={(value) =>
                                    setContactData({
                                        firstName: value,
                                    })
                                }
                                error={errors.firstName}
                                required
                            />
                            <Input
                                label="Last Name"
                                value={formData.contactData.lastName}
                                onChange={(value) =>
                                    setContactData({
                                        lastName: value,
                                    })
                                }
                                error={errors.lastName}
                                required
                            />
                        </div>

                        {/* Email and Phone */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Input
                                label="Email"
                                type="email"
                                value={formData.contactData.email}
                                onChange={(value) =>
                                    setContactData({ email: value })
                                }
                                error={errors.email}
                                required
                            />
                            <PhoneInput
                                label="Phone Number"
                                value={formData.contactData.phone}
                                countryCode={formData.contactData.countryCode}
                                onChange={(value) =>
                                    setContactData({ phone: value })
                                }
                                onCountryChange={(code) =>
                                    setContactData({ countryCode: code })
                                }
                                error={errors.phone}
                                required
                            />
                        </div>

                        {/* Business Name */}
                        <Input
                            label="Business Name"
                            value={formData.contactData.businessName}
                            onChange={(value) =>
                                setContactData({
                                    businessName: value,
                                })
                            }
                            error={errors.businessName}
                            required
                        />

                        {/* Industry */}
                        <Dropdown
                            label="Industry"
                            options={industries}
                            value={formData.contactData.industry}
                            onChange={(value) =>
                                setContactData({ industry: value })
                            }
                            placeholder="Select your industry"
                            error={errors.industry}
                            required
                        />

                        {/* Message */}
                        <Textarea
                            label="Message (Optional)"
                            value={formData.contactData.message}
                            onChange={(value) =>
                                setContactData({ message: value })
                            }
                            placeholder="Tell us about your accounting needs..."
                            rows={4}
                        />

                        {/* SMS Preferences */}
                        {/* <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                            <Checkbox
                                checked={formData.smsUpdates}
                                onChange={(checked) => setSmsUpdates(checked)}
                                label="Send me SMS updates about my appointment"
                            />
                            <Checkbox
                                checked={formData.smsOptOut}
                                onChange={(checked) => setSmsOptOut(checked)}
                                label="I don't want to receive SMS messages"
                            />
                        </div> */}

                        {/* Terms Agreement */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-xs text-gray-600 sm:text-sm">
                                By clicking 'Confirm My Appointment' you agree
                                to our{' '}
                                <Link
                                    href="/terms-of-service"
                                    target="_blank"
                                    className="cursor-pointer text-accent underline hover:text-accent/80"
                                >
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link
                                    href="/privacy-policy"
                                    target="_blank"
                                    className="cursor-pointer text-accent underline hover:text-accent/80"
                                >
                                    Privacy Policy
                                </Link>
                                . This includes permission to communicate with
                                you about your appointments via phone, email, or
                                SMS.
                            </p>
                        </div>

                        {/* Error Message */}
                        {errors.submit && (
                            <div className="rounded-lg bg-red-50 p-4">
                                <p className="text-sm text-red-900">
                                    {errors.submit}
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Footer - Sticky */}
            <div className="sticky bottom-0 border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
                <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:justify-between">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:text-base"
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
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                    >
                        {isSubmitting
                            ? 'Submitting...'
                            : 'Confirm My Appointment'}
                    </button>
                </div>
            </div>
        </div>
    );
}
