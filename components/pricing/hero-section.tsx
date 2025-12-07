export default function HeroSection() {
    return (
        <section className="hero-section flex min-h-[50vh] items-center justify-center px-4 sm:min-h-[55vh] sm:px-6 lg:min-h-[60vh] lg:px-12">
            <div className="container mx-auto flex h-auto w-full flex-col items-center justify-center gap-6 sm:gap-8">
                {/* Main Content */}
                <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
                    <h1 className="text-center text-4xl leading-tight font-semibold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                        Pricing That <span className="text-accent">Scales</span>{' '}
                        With You
                    </h1>
                    <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-gray-600 sm:text-xl">
                        No surprises, no hidden fees. Pick a plan based on your monthly expenses 
                        and get expert accounting that grows with your business.
                    </p>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 sm:gap-6">
                    <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-gray-700">
                        <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Cancel anytime
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-gray-700">
                        <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        No setup fees
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-gray-700">
                        <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Save 10% annually
                    </div>
                </div>
            </div>
        </section>
    );
}
