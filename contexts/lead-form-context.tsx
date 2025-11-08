'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

interface LeadFormData {
    selectedDate: Date | null;
    selectedTimeSlot: string | null;
    emailConsent: boolean;
    smsConsent: boolean;
    contactData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        countryCode: string;
        businessName: string;
        industry: string;
        message: string;
    };
}

interface LeadFormContextType {
    formData: LeadFormData;
    setSelectedDate: (date: Date | null) => void;
    setSelectedTimeSlot: (slot: string | null) => void;
    setEmailConsent: (consent: boolean) => void;
    setSmsConsent: (consent: boolean) => void;
    setContactData: (data: Partial<LeadFormData['contactData']>) => void;
    resetForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextType | undefined>(
    undefined,
);

const initialFormData: LeadFormData = {
    selectedDate: null,
    selectedTimeSlot: null,
    emailConsent: true,
    smsConsent: true,
    contactData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+1',
        businessName: '',
        industry: '',
        message: '',
    },
};

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
    const [formData, setFormData] = useState<LeadFormData>(initialFormData);

    const setSelectedDate = useCallback((date: Date | null) => {
        setFormData((prev) => ({ ...prev, selectedDate: date }));
    }, []);

    const setSelectedTimeSlot = useCallback((slot: string | null) => {
        setFormData((prev) => ({ ...prev, selectedTimeSlot: slot }));
    }, []);

    const setEmailConsent = useCallback((consent: boolean) => {
        setFormData((prev) => ({ ...prev, emailConsent: consent }));
    }, []);

    const setSmsConsent = useCallback((consent: boolean) => {
        setFormData((prev) => ({ ...prev, smsConsent: consent }));
    }, []);

    const setContactData = useCallback(
        (data: Partial<LeadFormData['contactData']>) => {
            setFormData((prev) => ({
                ...prev,
                contactData: { ...prev.contactData, ...data },
            }));
        },
        [],
    );

    const resetForm = useCallback(() => {
        setFormData(initialFormData);
    }, []);

    return (
        <LeadFormContext.Provider
            value={{
                formData,
                setSelectedDate,
                setSelectedTimeSlot,
                setEmailConsent,
                setSmsConsent,
                setContactData,
                resetForm,
            }}
        >
            {children}
        </LeadFormContext.Provider>
    );
}

export function useLeadForm() {
    const context = useContext(LeadFormContext);
    if (context === undefined) {
        throw new Error('useLeadForm must be used within a LeadFormProvider');
    }
    return context;
}
