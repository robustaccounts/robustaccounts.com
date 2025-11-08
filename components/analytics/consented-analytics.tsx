'use client';

import { useConsent } from '@/contexts/consent-context';

import Script from 'next/script';
import React, { useEffect } from 'react';

import GoogleTag from '@/components/analytics/google-tag';

const rawGoogleTagIds =
    process.env.NEXT_PUBLIC_GOOGLE_TAG_IDS ??
    process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ??
    '';
const parsedGoogleTagIds = rawGoogleTagIds
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
const serializedGoogleTagIds =
    parsedGoogleTagIds.length > 0 ? parsedGoogleTagIds.join(',') : undefined;
const clarityProjectId =
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() ?? '';

export default function ConsentedAnalytics() {
    const { state } = useConsent();

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

    // Previously used for Tidio - now using Botpress
    // Tidio logic removed

    // Only block analytics if user explicitly rejected (opt-out approach)
    if (state === 'rejected') return null;

    return (
        <>
            {serializedGoogleTagIds && <GoogleTag ids={serializedGoogleTagIds} />}
            {/* Microsoft Clarity Analytics */}
            {clarityProjectId && (
                <Script
                    id="microsoft-clarity"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(c,l,a,r,i,t,y){
                          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "${clarityProjectId}");`,
                    }}
                />
            )}
        </>
    );
}
