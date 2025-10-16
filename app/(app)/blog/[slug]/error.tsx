'use client';

import { useEffect } from 'react';

import Link from '@/ui/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to console for debugging
        console.error('Blog post error:', error);
    }, [error]);

    return (
        <main className="hero-section flex min-h-screen flex-col items-center justify-center px-4">
            <div className="mx-auto max-w-2xl text-center">
                <div className="mb-8">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                        <svg
                            className="h-10 w-10 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Unable to Load Article
                    </h1>
                    <p className="mb-2 text-lg text-gray-600">
                        We encountered an error while trying to display this
                        blog post.
                    </p>
                    <p className="text-sm text-gray-500">
                        The article may contain formatting issues or be
                        temporarily unavailable.
                    </p>
                </div>

                {/* Error details for debugging (only in development) */}
                {process.env.NODE_ENV === 'development' && (
                    <details className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-left">
                        <summary className="cursor-pointer font-semibold text-red-900">
                            Error Details (Development Only)
                        </summary>
                        <pre className="mt-4 overflow-auto text-sm break-words whitespace-pre-wrap text-red-800">
                            {error.message}
                            {error.digest &&
                                `\n\nError Digest: ${error.digest}`}
                        </pre>
                    </details>
                )}

                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button
                        onClick={reset}
                        className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/blog"
                        className="rounded-lg border-2 border-accent px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent/10"
                    >
                        Back to Blog
                    </Link>
                </div>
            </div>
        </main>
    );
}
