'use client';

import Link from 'next/link';
import React from 'react';

import { ArrowIcon } from '@/lib/icons';

export default function ContactUsBanner() {
    return (
        <section className="relative flex items-center justify-center overflow-hidden bg-theme-black py-24 lg:py-32">
            {/* Background Grid */}
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-10" />

            {/* Gradient Orb */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

            <div className="cust-container relative z-10 text-center">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-8 text-3xl leading-[1.1] font-light text-white md:text-4xl lg:text-5xl">
                        Ready to streamline your{' '}
                        <span style={{ color: '#34d399' }}>
                            financial operations?
                        </span>
                    </h2>
                    <p
                        className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed font-light"
                        style={{ color: '#ffffff' }}
                    >
                        Share your business details with us, and we'll create a
                        customized financial operations plan tailored to your
                        growth.
                    </p>

                    <div className="flex flex-col justify-center gap-4 md:flex-row">
                        <Link
                            href="/lead-form/schedule"
                            className="btn-div uppercase"
                        >
                            <span className="text-box">
                                Set Your Books Right
                            </span>
                            <span className="icon-box">
                                <ArrowIcon size={14} className="text-white" />
                            </span>
                        </Link>
                        <Link
                            href="/contact"
                            className="border border-white/20 px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 hover:bg-white hover:text-black"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
