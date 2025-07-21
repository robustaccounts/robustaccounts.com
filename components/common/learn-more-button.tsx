import { ArrowForward } from '@/ui/icons/google-icons';
import Link from '@/ui/link';

import cn from '@/utils/cn';

export default function LearnMoreButton({
    href,
    className,
}: Readonly<{
    href: string;
    className?: string;
}>) {
    return (
        <Link
            href={href}
            className={cn(
                'flex w-max cursor-pointer items-center justify-center gap-x-2 rounded-full bg-accent py-1 pr-4 pl-1 text-sm font-semibold text-white transition-all hover:bg-accent/80 sm:text-base',
                className,
            )}
        >
            <div className="rounded-full bg-white p-1">
                <ArrowForward className="h-6 w-6 fill-accent" />
            </div>
            Learn More
        </Link>
    );
}
