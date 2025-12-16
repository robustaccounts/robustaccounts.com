'use client';

import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { ArrowIcon } from '@/lib/icons';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Blog post error:', error);
    }, [error]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white">
            {/* Grid lines background */}
            <div className="grid-lines pointer-events-none absolute inset-0" />

            <div className="cust-container relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    {/* Error Badge */}
                    <span className="mb-6 inline-block text-xs font-bold tracking-[0.2em] text-red-600 uppercase">
                        Something went wrong
                    </span>

                    {/* Icon */}
                    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                        <AlertTriangle className="h-10 w-10 text-red-600" />
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-2xl font-semibold tracking-tight text-theme-black md:text-3xl">
                        Unable to Load Article
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mb-4 max-w-md text-base leading-relaxed text-gray-600">
                        We encountered an error while trying to display this
                        blog post. The article may contain formatting issues or
                        be temporarily unavailable.
                    </p>

                    {/* Error details for debugging (only in development) */}
                    {process.env.NODE_ENV === 'development' && (
                        <details className="mx-auto mb-8 max-w-lg rounded-lg border border-red-200 bg-red-50 p-4 text-left">
                            <summary className="cursor-pointer text-sm font-semibold text-red-900">
                                Error Details (Development Only)
                            </summary>
                            <pre className="mt-4 overflow-auto text-xs break-words whitespace-pre-wrap text-red-800">
                                {error.message}
                                {error.digest &&
                                    `\n\nError Digest: ${error.digest}`}
                            </pre>
                        </details>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button onClick={reset} className="btn-div uppercase">
                            <span className="text-box">Try Again</span>
                            <span className="icon-box">
                                <ArrowIcon size={14} className="text-white" />
                            </span>
                        </button>
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center border border-theme-black/15 px-8 py-[1rem] text-[0.85rem] font-bold tracking-[0.1em] text-theme-black uppercase transition-all hover:border-primary hover:text-primary"
                        >
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
