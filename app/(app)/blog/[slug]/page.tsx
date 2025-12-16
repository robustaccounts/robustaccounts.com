import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

import { type BlogPost, getBlogPostBySlug, getRelatedPosts } from '@/lib/blog';

import ReadingProgressBar from '@/components/blog/reading-progress-bar';
import CopyLinkButton from '@/components/blog/share-buttons';
import MDXRenderer from '@/components/mdx-renderer';

// Error boundary wrapper for MDX content
function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Suspense
            fallback={
                <div className="py-12 text-center text-gray-500">
                    <p>Loading article content...</p>
                </div>
            }
        >
            {children}
        </Suspense>
    );
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Validate params
    const resolvedParams = await params;
    if (!resolvedParams || typeof resolvedParams.slug !== 'string') {
        notFound();
    }

    // Resolve params (Next.js 15 provides params as a Promise)
    const { slug } = resolvedParams;

    const post = await getBlogPostBySlug(slug);

    if (!post || !post.title || !post.content) {
        notFound();
    }

    const relatedPosts = (await getRelatedPosts(post, 3)) || [];

    return (
        <main className="flex min-h-screen flex-col">
            {/* Reading Progress Bar */}
            <ReadingProgressBar />

            {/* Article Header */}
            <section className="bg-white pt-24 pb-8 lg:pt-32 lg:pb-12">
                <div className="cust-container">
                    {/* Centered header wrapper to match content width */}
                    <div className="mx-auto max-w-3xl">
                        {/* Breadcrumb */}
                        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                            <Link
                                href="/blog"
                                className="transition-colors hover:text-primary"
                            >
                                Blog
                            </Link>
                            <span>/</span>
                            <span className="text-theme-black">
                                {String(post.category || 'Article')}
                            </span>
                        </nav>

                        {/* Category & Meta */}
                        <div className="mb-6 flex flex-wrap items-center gap-4">
                            {post.category && (
                                <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
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
                                    • {String(post.readTime)}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="mb-8 text-3xl leading-[1.15] font-semibold tracking-tight text-theme-black md:text-4xl lg:text-5xl">
                            {String(post.title)}
                        </h1>

                        {/* Author & Share */}
                        <div className="flex flex-col gap-6 border-b border-gray-200 pb-8 sm:flex-row sm:items-center sm:justify-between">
                            {/* Author */}
                            {post.author && (
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                                        <span className="text-lg font-semibold text-white">
                                            {String(post.author)
                                                .split(' ')
                                                .filter(
                                                    (n) => n && n.length > 0,
                                                )
                                                .map(
                                                    (n) =>
                                                        n[0]?.toUpperCase() ||
                                                        '',
                                                )
                                                .join('')
                                                .slice(0, 2) || 'A'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-theme-black">
                                            {String(post.author)}
                                        </p>
                                        {post.date && (
                                            <p className="text-sm text-gray-500">
                                                Published on {String(post.date)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Copy Link Button */}
                            <CopyLinkButton slug={slug} />
                        </div>

                        {/* Tags */}
                        {Array.isArray(post.tags) && post.tags.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {post.tags
                                    .filter((tag) => tag && String(tag).trim())
                                    .map((tag, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full border border-gray-200 bg-theme-offwhite px-3 py-1 text-xs text-gray-600"
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
            <div className="bg-white">
                <div className="cust-container">
                    {/* Centered content wrapper for optimal reading width */}
                    <article id="article-content" className="mx-auto max-w-3xl">
                        <div className="prose prose-lg lg:prose-xl prose-gray /* Headings */ prose-headings:font-semibold prose-headings:text-theme-black prose-headings:tracking-tight prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-4 prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-3 /* Paragraphs */ prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:text-base prose-p:lg:text-lg prose-p:mb-6 /* Links */ prose-a:text-primary prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-primary /* Strong/Bold */ prose-strong:text-theme-black prose-strong:font-semibold /* Lists */ prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:my-2 prose-li:leading-[1.7] marker:prose-ul:text-primary marker:prose-ol:text-primary /* Blockquotes */ prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-theme-offwhite prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:text-gray-700 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:my-8 /* Code */ prose-code:bg-theme-offwhite prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-theme-black prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:bg-theme-black prose-pre:text-white prose-pre:rounded-lg prose-pre:my-8 /* Images */ prose-img:rounded-lg prose-img:my-8 /* Tables */ prose-table:my-8 prose-th:bg-theme-offwhite prose-th:font-semibold">
                            {post.content ? (
                                <ErrorBoundaryWrapper>
                                    <MDXRenderer content={post.content} />
                                </ErrorBoundaryWrapper>
                            ) : (
                                <div className="py-12 text-center text-gray-500">
                                    <p>Article content is not available.</p>
                                </div>
                            )}
                        </div>
                    </article>
                </div>
            </div>

            {/* Related Articles */}
            {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
                <section className="bg-theme-offwhite">
                    <div className="cust-container">
                        <div className="mb-12">
                            <span className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase">
                                Keep Reading
                            </span>
                            <h2 className="text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl">
                                Related Articles
                            </h2>
                        </div>
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
                                        key={relatedPost.id || relatedPost.slug}
                                        href={`/blog/${encodeURIComponent(relatedPost.slug)}`}
                                        className="group border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-primary hover:shadow-lg"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                {relatedPost.category && (
                                                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                                                        {String(
                                                            relatedPost.category,
                                                        )}
                                                    </span>
                                                )}
                                                {relatedPost.readTime && (
                                                    <span className="text-xs text-gray-500">
                                                        {String(
                                                            relatedPost.readTime,
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="line-clamp-2 text-lg leading-tight font-semibold text-theme-black transition-colors group-hover:text-primary">
                                                {String(relatedPost.title)}
                                            </h3>
                                            {relatedPost.excerpt && (
                                                <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                                                    {String(
                                                        relatedPost.excerpt,
                                                    )}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                                                {relatedPost.author && (
                                                    <span>
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
                </section>
            )}

            {/* CTA Section */}
            <section className="bg-white py-20 lg:py-28">
                <div className="cust-container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl">
                            Need Expert Help?
                        </h2>
                        <p className="mb-10 text-base text-gray-600">
                            Our team is ready to help with your accounting
                            needs.
                        </p>
                        <Link
                            href="/lead-form/schedule?source=blog"
                            className="btn-div inline-flex uppercase"
                        >
                            <span className="text-box">Schedule a Call</span>
                            <span className="icon-box">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.67227 14.6363L4.59045 13.5545L12.0086 6.13632H5.36318V4.59087H14.6359V13.8636H13.0905V7.21814L5.67227 14.6363Z"
                                        fill="white"
                                    />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) {
        return {
            title: 'Article',
            description: 'Read expert insights from Robust Accounts.',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.excerpt,
            url: `/blog/${post.slug}`,
            authors: post.author ? [post.author] : undefined,
        },
        twitter: {
            card: 'summary',
            title: post.title,
            description: post.excerpt,
        },
    };
}
