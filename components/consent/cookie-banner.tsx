'use client';

import { useConsent } from '@/contexts/consent-context';

import React from 'react';

export default function CookieBanner() {
    const { state, ready, accept, reject } = useConsent();

    // Avoid initial flash before stored preference is checked
    if (!ready || state !== 'unset') return null;

    return (
        <div
            role="region"
            aria-label="Cookie consent"
            className="fixed inset-x-0 bottom-0 z-[10000] mx-4 mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:mx-auto sm:max-w-3xl sm:p-5"
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700">
                    We use cookies to enhance your experience and understand how
                    you use our site. By continuing to browse, you agree to our
                    use of cookies. You can opt out anytime. See our{' '}
                    <a
                        href="/privacy-policy"
                        className="text-accent underline underline-offset-2"
                    >
                        Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                        href="/cookie-policy"
                        className="text-accent underline underline-offset-2"
                    >
                        Cookie Policy
                    </a>
                    .
                </p>
                <div className="flex shrink-0 gap-2">
                    <button
                        onClick={reject}
                        className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                        Opt Out
                    </button>
                    <button
                        onClick={accept}
                        className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
                    >
                        Got It
                    </button>
                </div>
            </div>
        </div>
    );
}
