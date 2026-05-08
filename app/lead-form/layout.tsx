import { LeadFormProvider } from '@/contexts/lead-form-context';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Schedule a Consultation | Robust Accounts',
    description: 'Schedule a free consultation with our accounting experts.',
    // Lead-form flow is a multi-step utility — no SEO value, kept out of
    // the index so it doesn't compete with /contact and /pricing.
    robots: { index: false, follow: false },
};

export default function LeadFormLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <LeadFormProvider>{children}</LeadFormProvider>;
}
