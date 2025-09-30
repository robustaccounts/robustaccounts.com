import React from 'react';

import { ArrowForward } from '@/ui/icons/google-icons';

export default function NewsletterSubscription() {
    return (
        <section className="m-4 rounded-2xl bg-secondary text-primary lg:m-8">
            <div className="px-6 py-8 lg:px-12">
                <div className="flex flex-col items-center gap-6 text-left lg:flex-row lg:justify-between">
                    {/* Content */}
                    <div className="space-y-4 lg:max-w-2xl">
                        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                            Stay Updated with Industry Insights
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg">
                            Subscribe to our newsletter for the latest
                            accounting trends, tax updates, and business
                            insights delivered to your inbox.
                        </p>
                    </div>

                    {/* Subscribe Form */}
                    <div className="flex w-full flex-col gap-3 sm:flex-row lg:flex-col lg:items-end lg:gap-3">
                        <div className="flex w-full flex-col gap-2 sm:grid sm:grid-cols-2 lg:w-auto xl:flex xl:flex-col">
                            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-full border border-primary bg-transparent px-6 py-3 text-sm text-primary placeholder:text-primary/70 focus:ring-2 focus:ring-primary/20 focus:outline-none sm:py-4 sm:text-base lg:w-sm"
                            />
                            <button className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition-all sm:px-8 sm:py-4 sm:text-lg lg:w-sm">
                                Subscribe
                                <ArrowForward className="h-4 w-4 fill-white transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
