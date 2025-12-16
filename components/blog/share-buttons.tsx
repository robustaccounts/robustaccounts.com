'use client';

import { Check, Link2 } from 'lucide-react';
import { useState } from 'react';

interface CopyLinkButtonProps {
    slug: string;
}

export default function CopyLinkButton({ slug }: CopyLinkButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        const shareUrl =
            typeof window !== 'undefined'
                ? `${window.location.origin}/blog/${slug}`
                : `/blog/${slug}`;

        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link');
        }
    };

    return (
        <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-all hover:border-primary hover:bg-primary hover:text-white"
            aria-label="Copy link"
        >
            {copied ? (
                <>
                    <Check size={16} className="text-green-500" />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <Link2 size={16} />
                    <span>Copy Link</span>
                </>
            )}
        </button>
    );
}
