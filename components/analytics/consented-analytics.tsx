'use client';

import { useConsent } from '@/contexts/consent-context';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import React, { useEffect } from 'react';

import GoogleTag from '@/components/analytics/google-tag';

export default function ConsentedAnalytics() {
    const { state } = useConsent();
    const pathname = usePathname();

    // Check if we're on a lead form page
    const isLeadFormPage = pathname?.startsWith('/lead-form');

    // Optionally, respect DNT to auto-reject
    useEffect(() => {
        if (
            typeof navigator !== 'undefined' &&
            'doNotTrack' in navigator &&
            (navigator as { doNotTrack?: string }).doNotTrack === '1'
        ) {
            // no-op here; banner will still show but user can reject.
        }
    }, []);

    // Hide Tidio widget on lead form pages even if it was already loaded
    useEffect(() => {
        if (isLeadFormPage && typeof window !== 'undefined') {
            // Hide Tidio if it's already loaded
            const tidioWidget = document.getElementById('tidio-chat');
            if (tidioWidget) {
                tidioWidget.style.display = 'none';
            }
            // Also try to hide via Tidio API if available
            if ((window as any).tidioChatApi) {
                try {
                    (window as any).tidioChatApi.hide();
                } catch (e) {
                    // Silently fail if API is not available
                }
            }
        } else if (!isLeadFormPage && typeof window !== 'undefined') {
            // Show Tidio on non-lead-form pages
            const tidioWidget = document.getElementById('tidio-chat');
            if (tidioWidget) {
                tidioWidget.style.display = '';
            }
            if ((window as any).tidioChatApi) {
                try {
                    (window as any).tidioChatApi.show();
                } catch (e) {
                    // Silently fail if API is not available
                }
            }
        }
    }, [isLeadFormPage]);

    if (state !== 'accepted') return null;

    return (
        <>
            <GoogleTag />
            {/* Only load Tidio chat on non-lead-form pages */}
            {!isLeadFormPage && (
                <Script
                    src="//code.tidio.co/9itfrqnmmdew7a6oktqq4yb0mm6cqddb.js"
                    strategy="afterInteractive"
                    id="tidio-chat"
                />
            )}
        </>
    );
}
