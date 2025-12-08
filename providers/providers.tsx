'use client';


import { ConsentProvider, useConsent } from '@/contexts/consent-context';

import React, { useEffect } from 'react';

import { initializeAmplitude } from '@/lib/amplitude';


import CookieBanner from '@/components/consent/cookie-banner';
import ConsentedAnalytics from '@/components/analytics/consented-analytics';
import BotpressChat from '@/providers/botpress-chat';



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
            {children}
            <CookieBanner />
            <ConsentedAnalytics />
            <BotpressChat />
        </ConsentProvider>
    );
}
