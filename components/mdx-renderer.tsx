import { MDXRemote } from 'next-mdx-remote/rsc';

import { mdxComponents } from '@/components/mdx/config';

interface MDXRendererProps {
    content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
    const trimmed = typeof content === 'string' ? content.trim() : '';

    if (!trimmed) {
        return (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                <div className="mb-2 text-lg font-semibold text-gray-700">
                    No Content Available
                </div>
                <p className="text-gray-600">
                    This article appears to be empty or unavailable.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-none">
            <MDXRemote source={trimmed} components={mdxComponents as any} />
        </div>
    );
}