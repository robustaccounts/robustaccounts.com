'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';

import { mdxComponents } from '@/components/mdx/config';

interface MDXRendererProps {
    content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
    const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const compileMDX = async () => {
            try {
                // Validate content
                if (!content || typeof content !== 'string' || content.trim() === '') {
                    setError('No content provided');
                    setIsLoading(false);
                    return;
                }

                const trimmedContent = content.trim();
                
                const mdxSource = await serialize(trimmedContent, {
                    mdxOptions: {
                        remarkPlugins: [],
                        rehypePlugins: [],
                    },
                });
                
                if (!mdxSource) {
                    setError('Failed to compile MDX content');
                    setIsLoading(false);
                    return;
                }
                
                setMdxSource(mdxSource);
                setError(null);
            } catch (error) {
                console.error('Error compiling MDX:', error);
                setError(error instanceof Error ? error.message : 'Unknown error occurred while compiling content');
            } finally {
                setIsLoading(false);
            }
        };

        compileMDX();
    }, [content]);

    // Loading state
    if (isLoading) {
        return (
            <div className="flex h-32 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
                <span className="ml-3 text-gray-600">Loading content...</span>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
                <div className="mb-2 text-lg font-semibold text-red-800">
                    Content Error
                </div>
                <p className="text-red-600">{error}</p>
                <p className="mt-2 text-sm text-red-500">
                    Please check the article format and try again.
                </p>
            </div>
        );
    }

    // No content state
    if (!mdxSource) {
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

    // Render content
    return (
        <div className="max-w-none">
            <MDXRemote {...mdxSource} components={mdxComponents} />
        </div>
    );
}