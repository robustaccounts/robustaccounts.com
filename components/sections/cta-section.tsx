import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="relative flex items-center justify-center overflow-hidden bg-theme-black py-32">
            {/* Background Grid */}
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-10" />

            {/* Gradient Orb */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

            <div className="cust-container relative z-10 text-center">
                <div className="mx-auto max-w-4xl">
                    <h2
                        className="heading-lg mb-8 text-white"
                        data-animate="fade-up"
                    >
                        Ready to streamline your{' '}
                        <span style={{ color: '#34d399' }}>
                            financial operations?
                        </span>
                    </h2>
                    <p
                        className="mb-12 text-xl leading-relaxed font-light"
                        style={{ color: '#ffffff' }}
                        data-animate="fade-up"
                    >
                        Share your business details with us, and we&apos;ll
                        create a customized financial operations plan tailored
                        to your growth.
                    </p>

                    <div
                        className="flex flex-col justify-center gap-6 md:flex-row"
                        data-animate="fade-up"
                    >
                        <Link
                            href="/lead-form/schedule"
                            className="btn-div uppercase"
                        >
                            Set Your Books Right
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-none border border-white/20 px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 hover:bg-white hover:text-black"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
