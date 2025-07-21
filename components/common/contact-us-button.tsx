import Link from 'next/link';

import { ArrowForward } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

export default function ContactUsButton({
    className,
}: Readonly<{
    className?: string;
}>) {
    return (
        <Link
            href="/contact"
            className={cn(
                'flex cursor-pointer items-center justify-center gap-2 rounded-full bg-secondary py-1 pr-4 pl-1 font-semibold text-primary backdrop-blur-2xl transition-all hover:bg-accent',
                className,
            )}
        >
            <div className="rounded-full bg-white p-2">
                <ArrowForward className="fill-accent" />
            </div>
            Contact Us
        </Link>
    );
}
