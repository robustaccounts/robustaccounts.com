'use client';

import { ModalProvider, useModal } from '@/contexts/modal-context';
import { ConsentProvider, useConsent } from '@/contexts/consent-context';

import React, { useEffect } from 'react';

import { initializeAmplitude } from '@/lib/amplitude';

import SchedulingModal from '@/components/scheduling-modal';
import CookieBanner from '@/components/consent/cookie-banner';
import ConsentedAnalytics from '@/components/analytics/consented-analytics';

function ModalWrapper() {
    const { isSchedulingModalOpen, setSchedulingModalOpen } = useModal();

    return (
        <SchedulingModal
            isOpen={isSchedulingModalOpen}
            onClose={() => setSchedulingModalOpen(false)}
        />
    );
}

function ConsentAmplitudeInit() {
    const { state } = useConsent();
    useEffect(() => {
        if (state === 'accepted') {
            initializeAmplitude();
        }
    }, [state]);
    return null;
}

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ConsentProvider>
            <ConsentAmplitudeInit />
            <ModalProvider>
                {children}
                <ModalWrapper />
                <CookieBanner />
                <ConsentedAnalytics />
            </ModalProvider>
        </ConsentProvider>
    );
}
