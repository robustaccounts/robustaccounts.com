import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reschedule Your Consultation | Robust Accounts',
    // Token-gated reschedule flow — never indexable, never linked publicly.
    robots: { index: false, follow: false, nocache: true },
};

export default function RescheduleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
