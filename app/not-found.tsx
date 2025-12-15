import Link from 'next/link';

import { ArrowIcon } from '@/lib/icons';

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white">
            {/* Grid lines background */}
            <div className="grid-lines pointer-events-none absolute inset-0" />

            <div className="cust-container relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    {/* 404 Badge */}
                    <span className="mb-6 inline-block text-xs font-bold tracking-[0.2em] text-primary uppercase">
                        Error 404
                    </span>

                    {/* Large 404 */}
                    <h1 className="mb-6 text-8xl font-light tracking-tight text-theme-black md:text-9xl">
                        404
                    </h1>

                    {/* Title */}
                    <h2 className="mb-4 text-2xl font-semibold tracking-tight text-theme-black md:text-3xl">
                        Page Not Found
                    </h2>

                    {/* Description */}
                    <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-gray-600">
                        Sorry, the page you're looking for doesn't exist or has
                        been moved. Let's get you back on track.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/" className="btn-div uppercase">
                            <span className="text-box">Back to Home</span>
                            <span className="icon-box">
                                <ArrowIcon size={14} className="text-white" />
                            </span>
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center border border-theme-black/15 px-8 py-[1rem] text-[0.85rem] font-bold tracking-[0.1em] text-theme-black uppercase transition-all hover:border-primary hover:text-primary"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
