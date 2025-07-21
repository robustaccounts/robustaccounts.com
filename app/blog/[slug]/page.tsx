import {
    type BlogPost,
    getBlogPostBySlug,
    getRelatedPosts,
} from '@/data/blog-posts';

import { notFound } from 'next/navigation';
import React from 'react';

import Link from '@/ui/link';

interface BlogPageProps {
    params: {
        slug: string;
    };
}

// Component to render blog content with proper formatting
const BlogContentRenderer = ({ content }: { content: BlogPost['content'] }) => {
    return (
        <article className="max-w-none">
            {/* Introduction */}
            <div className="mb-16 rounded-2xl bg-secondary/30 p-8">
                <p className="text-xl leading-relaxed text-gray-700 first-letter:float-left first-letter:mr-4 first-letter:text-7xl first-letter:leading-none first-letter:font-bold first-letter:text-accent">
                    {content.introduction}
                </p>
            </div>

            {/* Sections */}
            <div className="space-y-20">
                {content.sections.map((section, sectionIndex) => (
                    <section key={sectionIndex} className="group">
                        {/* Section Header */}
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                                {section.title}
                            </h2>
                            <div className="mt-6 h-1 w-24 rounded-full bg-accent"></div>
                        </div>

                        {/* Section Content */}
                        {section.content && (
                            <div className="mb-10">
                                <p className="text-xl leading-relaxed text-gray-700">
                                    {section.content}
                                </p>
                            </div>
                        )}

                        {/* Section-level list */}
                        {section.list && (
                            <div className="mb-10 rounded-xl bg-white p-8">
                                <ul className="space-y-5">
                                    {section.list.map((item, itemIndex) => (
                                        <li
                                            key={itemIndex}
                                            className="flex items-start gap-5"
                                        >
                                            <div className="mt-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                                                <div className="h-2.5 w-2.5 rounded-full bg-accent"></div>
                                            </div>
                                            <span className="text-lg leading-relaxed text-gray-700">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Subsections */}
                        {section.subsections && (
                            <div className="space-y-10">
                                {section.subsections.map(
                                    (subsection, subIndex) => (
                                        <div
                                            key={subIndex}
                                            className="rounded-xl bg-white p-8 transition-all duration-300 hover:bg-secondary/20"
                                        >
                                            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                                                {subsection.title}
                                            </h3>

                                            {subsection.content && (
                                                <p className="mb-8 text-lg leading-relaxed text-gray-700">
                                                    {subsection.content}
                                                </p>
                                            )}

                                            {subsection.list && (
                                                <div className="rounded-lg bg-secondary/30 p-6">
                                                    <ul className="space-y-4">
                                                        {subsection.list.map(
                                                            (
                                                                item,
                                                                itemIndex,
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        itemIndex
                                                                    }
                                                                    className="flex items-start gap-4"
                                                                >
                                                                    <div className="mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
                                                                        <div className="h-2 w-2 rounded-full bg-accent"></div>
                                                                    </div>
                                                                    <span className="text-base leading-relaxed text-gray-700">
                                                                        {item.includes(
                                                                            ':',
                                                                        ) ? (
                                                                            <>
                                                                                <span className="font-semibold text-gray-900">
                                                                                    {
                                                                                        item.split(
                                                                                            ':',
                                                                                        )[0]
                                                                                    }

                                                                                    :
                                                                                </span>
                                                                                <span className="ml-1">
                                                                                    {item
                                                                                        .split(
                                                                                            ':',
                                                                                        )
                                                                                        .slice(
                                                                                            1,
                                                                                        )
                                                                                        .join(
                                                                                            ':',
                                                                                        )}
                                                                                </span>
                                                                            </>
                                                                        ) : (
                                                                            item
                                                                        )}
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ),
                                )}
                            </div>
                        )}
                    </section>
                ))}
            </div>

            {/* Conclusion */}
            <div className="mt-20 rounded-2xl bg-secondary/30 p-10">
                <div className="mb-8 flex items-center gap-4">
                    <div className="h-10 w-1 rounded-full bg-accent"></div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Key Takeaways
                    </h2>
                </div>
                <p className="text-xl leading-relaxed text-gray-700">
                    {content.conclusion}
                </p>
            </div>
        </article>
    );
};

export default function BlogPost({ params }: BlogPageProps) {
    const post = getBlogPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(post, 3);

    return (
        <main className="flex min-h-screen flex-col">
            {/* Article Header */}
            <section className="pyx-16 flex flex-col gap-4 lg:pt-32">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="mb-8 flex items-center gap-2 text-sm">
                            <Link href="/blog">Blog</Link>
                            <span>/</span>
                            <span>{post.title}</span>
                        </nav>

                        {/* Article Meta */}
                        <div className="mb-6 flex flex-wrap items-center gap-4">
                            <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary">
                                {post.category}
                            </span>
                            <span className="text-sm text-gray-500">
                                {post.date}
                            </span>
                            <span className="text-sm text-gray-500">
                                {post.readTime}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="mb-6 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
                            {post.title}
                        </h1>

                        {/* Author */}
                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary">
                                <span className="text-lg font-semibold text-white">
                                    {post.author
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </span>
                            </div>
                            <div>
                                <p className="font-medium">{post.author}</p>
                                <p className="text-sm">
                                    Published on {post.date}
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="mb-8 flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200"
                                >
                                    #{tag.replace(/\s+/g, '').toLowerCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <BlogContentRenderer content={post.content} />
                    </div>
                </div>
            </section>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-6xl">
                            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        href={`/blog/${relatedPost.slug}`}
                                        className="group rounded-xl bg-secondary p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary">
                                                    {relatedPost.category}
                                                </span>
                                                <span className="text-sm">
                                                    {relatedPost.readTime}
                                                </span>
                                            </div>
                                            <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-accent">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="line-clamp-3 text-sm">
                                                {relatedPost.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs">
                                                <span>
                                                    By {relatedPost.author}
                                                </span>
                                                <span>{relatedPost.date}</span>
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
