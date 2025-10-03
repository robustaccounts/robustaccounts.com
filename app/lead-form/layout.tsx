import { LeadFormProvider } from '@/contexts/lead-form-context';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Schedule a Consultation',
    description: 'Schedule a free consultation with our accounting experts.',
};

export default function LeadFormLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <LeadFormProvider>{children}</LeadFormProvider>;
}
