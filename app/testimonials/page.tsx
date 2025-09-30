import React from 'react';

import { Check } from '@/ui/icons/google-icons';

// ContactUsBanner is rendered globally in layout; avoid double-render on this page.

const testimonials = [
    {
        name: 'John Dobrik',
        role: 'CEO',
        company: 'TechFlow Solutions',
        industry: 'Technology',
        image: '/images/testimonials/john-dobrik.jpg',
        rating: 5,
        quote: "Robust Accounts is highly knowledgeable about accounting as well as the internal controls of our organization. We've had the best experience working with them and letting them take charge of our bookkeeping. Truly the best decision ever made.",
        results: [
            'Reduced accounting costs by 65%',
            'Improved financial reporting accuracy',
            'Streamlined month-end processes',
        ],
    },
    {
        name: 'Liam Stamos',
        role: 'Founder',
        company: 'GrowthCorp',
        industry: 'E-commerce',
        image: '/images/testimonials/liam-stamos.jpg',
        rating: 5,
        quote: 'The biggest benefit of working with Robust Accounts is that they are a true full-service accounting firm. I am highly impressed with their level of expertise with top-notch accounting services.',
        results: [
            'Comprehensive financial management',
            'Expert tax planning and compliance',
            'Scalable accounting solutions',
        ],
    },
    {
        name: 'Samantha Matthews',
        role: 'CFO',
        company: 'Healthcare Innovations',
        industry: 'Healthcare',
        image: '/images/testimonials/samantha-matthews.jpg',
        rating: 5,
        quote: 'The knowledge that each person at Robust Accounts brings to our account and their expertise in various fields, bookkeeping, managing accounts and handling payrolls gives us peace of mind.',
        results: [
            'Regulatory compliance assurance',
            'Specialized healthcare accounting',
            'Efficient payroll management',
        ],
    },
    {
        name: 'Stefan Bennett',
        role: 'Managing Director',
        company: 'Bennett Manufacturing',
        industry: 'Manufacturing',
        image: '/images/testimonials/stefan-bennett.jpg',
        rating: 5,
        quote: 'Their key management staff is highly consistent and dependable for all accounting needs. Robust Accounts helped me understand how easy it is to outsource my accounting needs and save money as well as valuable time.',
        results: [
            'Significant cost savings achieved',
            'Time-efficient accounting processes',
            'Reliable and consistent service',
        ],
    },
    {
        name: 'Maria Rodriguez',
        role: 'Owner',
        company: 'Bella Vista Restaurants',
        industry: 'Hospitality',
        image: '/images/testimonials/maria-rodriguez.jpg',
        rating: 5,
        quote: 'Working with Robust Accounts has transformed our financial management. Their expertise in hospitality accounting and multi-location reporting has been invaluable for our restaurant chain.',
        results: [
            'Multi-location financial consolidation',
            'Improved cash flow management',
            'Industry-specific expertise',
        ],
    },
    {
        name: 'David Chen',
        role: 'President',
        company: 'Chen Real Estate Group',
        industry: 'Real Estate',
        image: '/images/testimonials/david-chen.jpg',
        rating: 5,
        quote: 'The team at Robust Accounts understands the complexities of real estate accounting. Their property accounting expertise and investor reporting capabilities have exceeded our expectations.',
        results: [
            'Accurate property accounting',
            'Comprehensive investor reporting',
            'Tax optimization strategies',
        ],
    },
];

const caseStudies = [
    {
        title: 'TechFlow Solutions: 65% Cost Reduction',
        industry: 'Technology',
        challenge:
            'Growing tech startup needed scalable accounting solution while managing complex equity structures and revenue recognition.',
        solution:
            'Implemented cloud-based accounting system with automated processes and specialized startup accounting expertise.',
        results: [
            '65% reduction in accounting costs',
            '75% faster month-end closing',
            'Streamlined investor reporting',
            'Improved financial accuracy',
        ],
        testimonial:
            '"The ROI was immediate and substantial. We now have more time to focus on product development and growth."',
    },
    {
        title: 'Healthcare Innovations: Regulatory Compliance',
        industry: 'Healthcare',
        challenge:
            'Healthcare company required specialized accounting for clinical trials, grant management, and regulatory compliance.',
        solution:
            'Dedicated healthcare accounting team with expertise in clinical trial accounting and regulatory reporting.',
        results: [
            '100% regulatory compliance',
            'Efficient grant accounting',
            'Accurate clinical trial costing',
            'Streamlined audit processes',
        ],
        testimonial:
            '"Their healthcare expertise gave us confidence in our financial reporting and compliance."',
    },
    {
        title: 'Bennett Manufacturing: Operational Efficiency',
        industry: 'Manufacturing',
        challenge:
            'Manufacturing company needed better cost accounting, inventory management, and financial reporting.',
        solution:
            'Implemented comprehensive cost accounting system with real-time inventory tracking and management reporting.',
        results: [
            '40% improvement in cost accuracy',
            'Real-time inventory visibility',
            'Enhanced management reporting',
            'Better decision-making data',
        ],
        testimonial:
            '"The insights we now have into our costs and operations have been game-changing."',
    },
];

const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '99.9%', label: 'Client Satisfaction' },
    { number: '95%', label: 'Client Retention Rate' },
    { number: '24/7', label: 'Support Available' },
];

export default function TestimonialsPage() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="hero-section relative flex h-full min-h-screen px-4 py-16 sm:px-6 lg:px-12">
                <div className="container mx-auto flex h-auto w-full flex-col items-center justify-center gap-8 px-4 py-12 sm:gap-12 sm:px-6 lg:px-12 lg:py-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-sm">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                        <span className="text-gray-700">
                            Client Testimonials
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
                        <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                            What Our Clients{' '}
                            <span className="text-primary">Say About Us</span>
                        </h1>
                        <p className="max-w-3xl text-center text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                            Don't just take our word for it. Here's what our
                            clients have to say about their experience working
                            with Robust Accounts.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-gray-600 sm:text-base">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 py-12 sm:gap-16 sm:px-6 lg:px-12 lg:py-16">
                <div className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                        Client Success Stories
                    </h2>
                    <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
                        Real results from real businesses across various
                        industries
                    </p>
                </div>

                <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer rounded-2xl border border-gray-200 p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="flex flex-col gap-6">
                                {/* Header */}
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200">
                                        <div className="flex h-full w-full items-center justify-center text-2xl text-gray-400">
                                            👤
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {testimonial.role},{' '}
                                            {testimonial.company}
                                        </p>
                                        <div className="mt-1 flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                                            <span className="sr-only">{`${testimonial.rating} out of 5 stars`}</span>
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <span key={i} className="text-yellow-400" aria-hidden>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                        {testimonial.industry}
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="relative">
                                    <span className="absolute -top-2 -left-2 text-3xl text-blue-200">
                                        "
                                    </span>
                                    <blockquote className="pl-6 text-gray-700 italic">
                                        "{testimonial.quote}"
                                    </blockquote>
                                </div>

                                {/* Results */}
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-sm font-semibold text-gray-900">
                                        Key Results:
                                    </h4>
                                    {testimonial.results.map(
                                        (result, resultIndex) => (
                                            <div
                                                key={resultIndex}
                                                className="flex items-center gap-2"
                                            >
                                                <Check className="h-4 w-4 flex-shrink-0 fill-primary" />
                                                <span className="text-sm text-gray-600">
                                                    {result}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Case Studies */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 sm:gap-16 sm:px-6 lg:px-12">
                    <div className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center sm:gap-8">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            Detailed Case Studies
                        </h2>
                        <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
                            In-depth look at how we've helped businesses
                            transform their accounting operations
                        </p>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
                        {caseStudies.map((study, index) => (
                            <div
                                key={index}
                                className="rounded-2xl p-8 shadow-sm"
                            >
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <div className="mb-2 w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
                                            {study.industry}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {study.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900">
                                                Challenge:
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {study.challenge}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900">
                                                Solution:
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {study.solution}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900">
                                                Results:
                                            </h4>
                                            <div className="flex flex-col gap-1">
                                                {study.results.map(
                                                    (result, resultIndex) => (
                                                        <div
                                                            key={resultIndex}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Check className="h-3 w-3 flex-shrink-0 fill-primary" />
                                                            <span className="text-xs text-gray-600">
                                                                {result}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <blockquote className="border-l-4 border-accent pl-4 text-sm text-gray-700 italic">
                                        {study.testimonial}
                                    </blockquote>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry Breakdown */}
            <section className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 py-12 sm:gap-16 sm:px-6 lg:px-12 lg:py-16">
                <div className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                        Trusted Across Industries
                    </h2>
                    <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
                        Our clients span across various industries, each with
                        unique accounting needs
                    </p>
                </div>

                <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                    {[
                        'Technology',
                        'Healthcare',
                        'Manufacturing',
                        'E-commerce',
                        'Real Estate',
                        'Hospitality',
                    ].map((industry, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-gray-200 p-4 text-center shadow-sm"
                        >
                            <div className="text-sm font-medium text-gray-900">
                                {industry}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ContactUsBanner is included in app/layout.tsx */}
        </main>
    );
}
