'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

interface LeadFormData {
    selectedDate: Date | null;
    selectedTimeSlot: string | null;
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
    setContactData: (data: Partial<LeadFormData['contactData']>) => void;
    resetForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextType | undefined>(
    undefined,
);

const initialFormData: LeadFormData = {
    selectedDate: null,
    selectedTimeSlot: null,
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
