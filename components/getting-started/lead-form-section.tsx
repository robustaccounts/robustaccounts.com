import React from 'react';

import LeadForm from '@/components/lead-form';

export default function LeadFormSection() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-4xl text-center">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl xl:text-4xl">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-lg text-gray-600">
                        Get started with a free consultation and discover how we
                        can help streamline your accounting operations.
                    </p>
                </div>
                <LeadForm />
            </div>
        </section>
    );
}
