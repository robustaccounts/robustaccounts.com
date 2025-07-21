import Link from 'next/link';

import { ArrowForward } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

export default function GetStartedButton({
    className,
    size = 'md',
}: Readonly<{
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}>) {
    return (
        <Link
            href="/getting-started"
            className={cn(
                'flex cursor-pointer items-center gap-2 rounded-full bg-accent py-1 pr-4 font-semibold text-white backdrop-blur-2xl transition-all hover:bg-accent/80',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
                className,
            )}
        >
            <div
                className={cn(
                    'ml-1 rounded-full bg-white',
                    size === 'sm' && 'p-1',
                    size === 'md' && 'p-2',
                    size === 'lg' && 'p-3',
                )}
            >
                <ArrowForward className="fill-accent" />
            </div>
            <span className="w-full text-center">Get Started</span>
        </Link>
    );
}
