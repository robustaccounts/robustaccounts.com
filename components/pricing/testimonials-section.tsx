import React from 'react';

const testimonials = [
    {
        name: 'Sarah Johnson',
        company: 'TechStart Inc.',
        role: 'CEO',
        quote: 'The Professional plan has been perfect for our growing startup. The dedicated account manager and tax preparation services have saved us countless hours.',
        plan: 'Professional',
    },
    {
        name: 'Michael Chen',
        company: 'Manufacturing Solutions',
        role: 'CFO',
        quote: "Enterprise plan's custom reporting and CFO advisory services have transformed how we make financial decisions. The ROI has been incredible.",
        plan: 'Enterprise',
    },
    {
        name: 'Lisa Rodriguez',
        company: 'Local Retail Shop',
        role: 'Owner',
        quote: 'As a small business owner, the Starter plan gives me everything I need at a price I can afford. The monthly reports are clear and helpful.',
        plan: 'Starter',
    },

    {
        name: 'Sarah Johnson',
        company: 'TechStart Inc.',
        role: 'CEO',
        quote: 'The Professional plan has been perfect for our growing startup. The dedicated account manager and tax preparation services have saved us countless hours.',
        plan: 'Professional',
    },
    {
        name: 'Michael Chen',
        company: 'Manufacturing Solutions',
        role: 'CFO',
        quote: "Enterprise plan's custom reporting and CFO advisory services have transformed how we make financial decisions. The ROI has been incredible.",
        plan: 'Enterprise',
    },
    {
        name: 'Lisa Rodriguez',
        company: 'Local Retail Shop',
        role: 'Owner',
        quote: 'As a small business owner, the Starter plan gives me everything I need at a price I can afford. The monthly reports are clear and helpful.',
        plan: 'Starter',
    },
];

export default function TestimonialsSection() {
    return (
        <section className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:px-6 md:px-12 lg:px-16 lg:py-24 xl:min-h-screen xl:py-0">
            <div className="text-center">
                <h2 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                    What Our Clients Say
                </h2>
                <p className="mx-auto max-w-3xl text-base sm:text-lg">
                    See how our pricing plans have helped businesses like yours
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="rounded-xl bg-secondary p-6 text-primary"
                    >
                        <div className="mb-4 flex flex-col gap-3">
                            <div className="flex justify-between">
                                <div className="h-min rounded-full bg-secondary px-2 py-1 text-xs text-primary">
                                    {testimonial.plan}
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-primary px-1"
                                        >
                                            <span className="text-white">
                                                ★
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "{testimonial.quote}"
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold text-gray-900">
                                    {testimonial.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {testimonial.role}, {testimonial.company}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
