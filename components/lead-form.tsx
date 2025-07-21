'use client';

import React, { useState } from 'react';

import Dropdown, { DropdownOption } from '@/ui/dropdown';
import { ArrowForward, Call, Check, Mail } from '@/ui/icons/google-icons';
import Input from '@/ui/input';
import MultiSelect, { MultiSelectOption } from '@/ui/multi-select';
import PhoneInput from '@/ui/phone-input';
import Textarea from '@/ui/textarea';

import cn from '@/utils/cn';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    company: string;
    industry: string;
    employees: string;
    services: string[];
    message: string;
}

interface FormErrors {
    [key: string]: string;
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

const employeeRanges: DropdownOption[] = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '500+', label: '500+ employees' },
];

const serviceOptions: MultiSelectOption[] = [
    { value: 'bookkeeping', label: 'Bookkeeping & Accounting' },
    { value: 'payroll', label: 'Payroll Management' },
    { value: 'financial-advisory', label: 'Financial Advisory' },
    { value: 'business-advisory', label: 'Business Advisory' },
];

export default function LeadForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+1',
        company: '',
        industry: '',
        employees: '',
        services: [],
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.company.trim()) {
            newErrors.company = 'Company name is required';
        }

        if (!formData.industry) {
            newErrors.industry = 'Please select an industry';
        }

        if (!formData.employees) {
            newErrors.employees = 'Please select company size';
        }

        if (formData.services.length === 0) {
            newErrors.services = 'Please select at least one service';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearError = (fieldName: string) => {
        if (errors[fieldName]) {
            setErrors((prev) => ({
                ...prev,
                [fieldName]: '',
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log('Form submitted:', formData);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="p-8 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                        <Check className="h-8 w-8 fill-primary" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                        Thank You for Your Interest!
                    </h2>
                    <p className="mb-6 text-base text-gray-600 sm:text-lg">
                        We've received your information and will contact you
                        within 24 hours to discuss your accounting needs.
                    </p>
                    <p className="text-sm text-gray-500">
                        In the meantime, feel free to explore our services or
                        contact us directly.
                    </p>
                </div>

                <div className="bg-gray-50 p-8">
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                                <Call className="h-4 w-4 text-accent" />
                            </div>
                            <span className="font-medium">
                                +1 (555) 123-4567
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                                <Mail className="h-4 w-4 text-accent" />
                            </div>
                            <span className="font-medium">
                                info@accountingagency.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-8 text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                    Get Your Free Consultation
                </h2>
                <p className="text-base text-gray-600 sm:text-lg">
                    Tell us about your business and we'll help you find the
                    perfect accounting solution.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Input
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    firstName: value,
                                }));
                                clearError('firstName');
                            }}
                            placeholder="Enter your first name"
                            required
                            error={errors.firstName}
                        />
                    </div>

                    <div>
                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    lastName: value,
                                }));
                                clearError('lastName');
                            }}
                            placeholder="Enter your last name"
                            required
                            error={errors.lastName}
                        />
                    </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    email: value,
                                }));
                                clearError('email');
                            }}
                            placeholder="Enter your email address"
                            required
                            error={errors.email}
                        />
                    </div>

                    <div>
                        <PhoneInput
                            label="Phone Number"
                            value={formData.phone}
                            countryCode={formData.countryCode}
                            onChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    phone: value,
                                }));
                                clearError('phone');
                            }}
                            onCountryChange={(countryCode) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    countryCode,
                                }));
                            }}
                            required
                            error={errors.phone}
                        />
                    </div>
                </div>

                {/* Company Information */}
                <div>
                    <Input
                        label="Company Name"
                        name="company"
                        value={formData.company}
                        onChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                company: value,
                            }));
                            clearError('company');
                        }}
                        placeholder="Enter your company name"
                        required
                        error={errors.company}
                    />
                </div>

                {/* Industry and Company Size */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Dropdown
                            label="Industry"
                            name="industry"
                            value={formData.industry}
                            options={industries}
                            onChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    industry: value,
                                }));
                                clearError('industry');
                            }}
                            placeholder="Select your industry"
                            required
                            error={errors.industry}
                        />
                    </div>

                    <div>
                        <Dropdown
                            label="Number of Employees"
                            name="employees"
                            value={formData.employees}
                            options={employeeRanges}
                            onChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    employees: value,
                                }));
                                clearError('employees');
                            }}
                            placeholder="Select company size"
                            required
                            error={errors.employees}
                        />
                    </div>
                </div>

                {/* Services */}
                <div>
                    <MultiSelect
                        label="Services You're Interested In"
                        name="services"
                        value={formData.services}
                        options={serviceOptions}
                        onChange={(values) => {
                            setFormData((prev) => ({
                                ...prev,
                                services: values,
                            }));
                            clearError('services');
                        }}
                        placeholder="Select services you need"
                        required
                        error={errors.services}
                        maxDisplay={2}
                    />
                </div>

                {/* Message */}
                <div>
                    <Textarea
                        label="Additional Message"
                        name="message"
                        value={formData.message}
                        onChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                message: value,
                            }));
                            clearError('message');
                        }}
                        placeholder="Tell us more about your accounting needs..."
                        rows={4}
                        error={errors.message}
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                            'flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-white shadow-md transition-all',
                            isSubmitting
                                ? 'cursor-not-allowed opacity-50'
                                : 'transform cursor-pointer hover:scale-[1.02] hover:bg-accent/90 hover:shadow-lg',
                        )}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                Get Free Consultation
                                <ArrowForward className="h-5 w-5" />
                            </>
                        )}
                    </button>
                </div>

                {/* Debug: Test Calendly button (remove in production) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="border-t border-gray-200 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                // Fill form with test data
                                setFormData({
                                    firstName: 'John',
                                    lastName: 'Doe',
                                    email: 'john@example.com',
                                    phone: '1234567890',
                                    countryCode: '+1',
                                    company: 'Test Company',
                                    industry: 'technology',
                                    employees: '11-50',
                                    services: ['bookkeeping'],
                                    message: 'Test message',
                                });
                                setIsSubmitted(true);
                            }}
                            className="w-full rounded-full border-2 border-gray-300 px-8 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                        >
                            🔧 Debug: Test Calendar Integration
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
