import { notFound } from 'next/navigation';
import React from 'react';

import Link from '@/ui/link';

import { type BlogPost, getBlogPostBySlug, getRelatedPosts } from '@/lib/blog';

import MDXRenderer from '@/components/mdx-renderer';

interface BlogPageProps {
    params: {
        slug: string;
    };
}

export default function BlogPost({ params }: BlogPageProps) {
    // Validate params
    if (!params || !params.slug || typeof params.slug !== 'string') {
        notFound();
    }

    const post = getBlogPostBySlug(params.slug);

    if (!post || !post.title || !post.content) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(post, 3) || [];

    return (
        <main className="mt-24 flex min-h-screen flex-col">
            {/* Article Header */}
            <section className="flex flex-col gap-4 py-12 lg:pt-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="mb-6 flex items-center gap-2 text-sm">
                            <Link href="/blog">Blog</Link>
                            <span>/</span>
                            <span>{String(post.title || 'Article')}</span>
                        </nav>

                        {/* Article Meta */}
                        <div className="mb-4 flex flex-wrap items-center gap-4">
                            {post.category && (
                                <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary">
                                    {String(post.category)}
                                </span>
                            )}
                            {post.date && (
                                <span className="text-sm text-gray-500">
                                    {String(post.date)}
                                </span>
                            )}
                            {post.readTime && (
                                <span className="text-sm text-gray-500">
                                    {String(post.readTime)}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="mb-4 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
                            {String(post.title)}
                        </h1>

                        {/* Author */}
                        {post.author && (
                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary">
                                    <span className="text-lg font-semibold text-white">
                                        {String(post.author)
                                            .split(' ')
                                            .filter((n) => n && n.length > 0)
                                            .map(
                                                (n) =>
                                                    n[0]?.toUpperCase() || '',
                                            )
                                            .join('')
                                            .slice(0, 2) || 'A'}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {String(post.author)}
                                    </p>
                                    {post.date && (
                                        <p className="text-sm">
                                            Published on {String(post.date)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {Array.isArray(post.tags) && post.tags.length > 0 && (
                            <div className="mb-6 flex flex-wrap gap-2">
                                {post.tags
                                    .filter((tag) => tag && String(tag).trim())
                                    .map((tag, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200"
                                        >
                                            #
                                            {String(tag)
                                                .replace(/^#+/, '')
                                                .replace(/\s+/g, '')
                                                .toLowerCase()}
                                        </span>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                    {post.content ? (
                        <MDXRenderer content={post.content} />
                    ) : (
                        <div className="py-12 text-center text-gray-500">
                            <p>Article content is not available.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Related Articles */}
            {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
                <section className="py-12 lg:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-6xl">
                            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {relatedPosts
                                    .filter(
                                        (relatedPost) =>
                                            relatedPost &&
                                            relatedPost.slug &&
                                            relatedPost.title,
                                    )
                                    .map((relatedPost) => (
                                        <Link
                                            key={
                                                relatedPost.id ||
                                                relatedPost.slug
                                            }
                                            href={`/blog/${encodeURIComponent(relatedPost.slug)}`}
                                            className="group rounded-xl bg-secondary p-5 transition-all duration-300"
                                        >
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center justify-between">
                                                    {relatedPost.category && (
                                                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                                                            {String(
                                                                relatedPost.category,
                                                            )}
                                                        </span>
                                                    )}
                                                    {relatedPost.readTime && (
                                                        <span className="text-sm text-gray-500">
                                                            {String(
                                                                relatedPost.readTime,
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-accent">
                                                    {String(relatedPost.title)}
                                                </h3>
                                                {relatedPost.excerpt && (
                                                    <p className="line-clamp-3 text-sm text-gray-600">
                                                        {String(
                                                            relatedPost.excerpt,
                                                        )}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    {relatedPost.author && (
                                                        <span>
                                                            By{' '}
                                                            {String(
                                                                relatedPost.author,
                                                            )}
                                                        </span>
                                                    )}
                                                    {relatedPost.date && (
                                                        <span>
                                                            {String(
                                                                relatedPost.date,
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
