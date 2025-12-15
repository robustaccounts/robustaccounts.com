'use client';

import { useLeadForm } from '@/contexts/lead-form-context';
import { sendGAEvent } from '@next/third-parties/google';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

import Checkbox from '@/components/ui/checkbox';
import Dropdown, { DropdownOption } from '@/components/ui/dropdown';
import Input from '@/components/ui/input';
import PhoneInput from '@/components/ui/phone-input';
import Textarea from '@/components/ui/textarea';

import { getTimeSlots } from '@/lib/lead-form-utils';
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

// Zod validation schema for contact form
const contactFormSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    businessName: z.string().min(1, 'Business name is required'),
    industry: z.string().min(1, 'Please select an industry'),
});

export default function ContactPage() {
    const router = useRouter();
    const { formData, setContactData, setEmailConsent, setSmsConsent } =
        useLeadForm();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Redirect to schedule if no date or time is selected
        if (!formData.selectedDate || !formData.selectedTimeSlot) {
            router.push('/lead-form/schedule');
        }
    }, [formData.selectedDate, formData.selectedTimeSlot, router]);

    // Check if form is valid for enabling/disabling submit button
    const isFormValid = useMemo(() => {
        const result = contactFormSchema.safeParse({
            firstName: formData.contactData.firstName.trim(),
            lastName: formData.contactData.lastName.trim(),
            email: formData.contactData.email.trim(),
            phone: formData.contactData.phone.trim(),
            businessName: formData.contactData.businessName.trim(),
            industry: formData.contactData.industry,
        });
        return result.success;
    }, [formData.contactData]);

    if (!formData.selectedDate || !formData.selectedTimeSlot) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) {
            return;
        }

        setSubmitError(null);
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

            const appointmentStart = new Date(selectedSlot.startDateUtc);

            const leadData = {
                firstName: formData.contactData.firstName,
                lastName: formData.contactData.lastName,
                email: formData.contactData.email,
                phone: formData.contactData.phone,
                countryCode: formData.contactData.countryCode,
                businessName: formData.contactData.businessName,
                industry: formData.contactData.industry,
                message: formData.contactData.message,
                appointmentDatetime: appointmentStart,
                emailConsent: formData.emailConsent,
                smsConsent: formData.smsConsent,
            };

            // Format appointment details for customer email
            // Format date using actual date components (not timezone-converted)
            // to preserve the selected date
            const year = formData.selectedDate.getFullYear();
            const month = formData.selectedDate.getMonth();
            const day = formData.selectedDate.getDate();
            const dateAtNoon = new Date(year, month, day, 12, 0, 0);

            const appointmentDetails = {
                appointmentDate: new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }).format(dateAtNoon),
                appointmentTime: selectedSlot.time,
                appointmentTimezone: selectedSlot.timezoneAbbrev,
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
                setSubmitError('Failed to submit form. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        router.push('/lead-form/schedule');
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-theme-offwhite">
            {/* Header */}
            <div className="flex w-full shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-5">
                <div className="w-10"></div>
                <div className="text-center">
                    <p className="text-xs font-medium text-gray-500">
                        Step 2 of 2
                    </p>
                    <h2 className="mt-0.5 text-base font-bold text-theme-black sm:text-lg">
                        Your Details
                    </h2>
                </div>
                <Link
                    href="/"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center bg-gray-100 transition-all duration-300 hover:bg-gray-200 sm:h-10 sm:w-10"
                    aria-label="Close"
                >
                    <X className="h-5 w-5 text-gray-600" />
                </Link>
            </div>

            {/* Main Content - Scrollable on mobile, optimized for desktop */}
            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
                <div className="mx-auto w-full max-w-4xl">
                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3 lg:space-y-4"
                    >
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

                        {/* Consent Checkboxes */}
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <Checkbox
                                    label="I consent to receive email communications about my appointment and related services"
                                    checked={formData.emailConsent}
                                    onChange={setEmailConsent}
                                    name="email-consent"
                                />
                                <Checkbox
                                    label="I consent to receive SMS/text messages about my appointment and related services"
                                    checked={formData.smsConsent}
                                    onChange={setSmsConsent}
                                    name="sms-consent"
                                />
                            </div>
                        </div>

                        {/* Terms Agreement */}
                        <div className="pt-4">
                            <p className="text-sm! text-gray-600">
                                By clicking 'Confirm My Appointment' you agree
                                to our{' '}
                                <Link
                                    href="/terms-of-service"
                                    target="_blank"
                                    className="cursor-pointer text-primary underline hover:text-primary/80"
                                >
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link
                                    href="/privacy-policy"
                                    target="_blank"
                                    className="cursor-pointer text-primary underline hover:text-primary/80"
                                >
                                    Privacy Policy
                                </Link>
                                . This includes permission to communicate with
                                you about your appointments via phone and email.
                            </p>
                        </div>

                        {/* Error Message */}
                        {submitError && (
                            <div className="bg-red-50 p-3 lg:p-4">
                                <p className="text-sm text-red-900">
                                    {submitError}
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
                <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="cursor-pointer border-2 border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:text-base"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !isFormValid}
                        className="flex cursor-pointer items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                    >
                        {isSubmitting ? (
                            <>
                                <span
                                    className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Submitting</span>
                            </>
                        ) : (
                            'Confirm My Appointment'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
