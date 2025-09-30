'use client';

import { useConsent } from '@/contexts/consent-context';

import Script from 'next/script';
import React, { useEffect } from 'react';

import GoogleTag from '@/components/analytics/google-tag';

export default function ConsentedAnalytics() {
    const { state } = useConsent();

    // Optionally, respect DNT to auto-reject
    useEffect(() => {
        if (
            typeof navigator !== 'undefined' &&
            (navigator as any).doNotTrack === '1'
        ) {
            // no-op here; banner will still show but user can reject.
        }
    }, []);

    if (state !== 'accepted') return null;

    return (
        <>
            <GoogleTag />
            <Script
                src="//code.tidio.co/9itfrqnmmdew7a6oktqq4yb0mm6cqddb.js"
                strategy="afterInteractive"
                id="tidio-chat"
            />
        </>
    );
}
