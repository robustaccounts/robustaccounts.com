'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import Link from 'next/link';
import React, { useMemo, useRef, useState } from 'react';

import type { BlogPostMeta } from '@/lib/blog';
import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';

interface BlogCategory {
    name: string;
    count: number;
    active: boolean;
}

interface BlogStat {
    number: string;
    label: string;
}

interface BlogPageClientProps {
    featuredArticles: BlogPostMeta[];
    recentArticles: BlogPostMeta[];
    categories: BlogCategory[];
    blogStats: BlogStat[];
}

export default function BlogPageClient({
    featuredArticles,
    recentArticles,
    categories,
    blogStats,
}: BlogPageClientProps) {
    const [activeCategory, setActiveCategory] = useState('All Articles');
    const prefersReducedMotion = usePrefersReducedMotion();
    const pageRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((el) => {
                gsap.fromTo(
                    el,
                    { autoAlpha: 0, y: 20 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            once: true,
                        },
                    },
                );
            });
        },
        { scope: pageRef, dependencies: [prefersReducedMotion] },
    );

    // Filter articles based on active category with null checks
    const filteredArticles = useMemo(() => {
        const safeFeatures = Array.isArray(featuredArticles)
            ? featuredArticles
            : [];
        const safeRecent = Array.isArray(recentArticles) ? recentArticles : [];

        let filtered = [...safeFeatures, ...safeRecent].filter(
            (article) =>
                article && article.title && article.slug && article.category,
        );

        // Filter by category
        if (activeCategory && activeCategory !== 'All Articles') {
            filtered = filtered.filter(
                (article) => article && article.category === activeCategory,
            );
        }

        return filtered;
    }, [activeCategory, featuredArticles, recentArticles]);

    // Update category active state with null checks
    const updatedCategories = useMemo(() => {
        const safeCategories = Array.isArray(categories) ? categories : [];
        return safeCategories
            .filter((category) => category && category.name)
            .map((category) => ({
                ...category,
                active: category.name === activeCategory,
            }));
    }, [activeCategory, categories]);

    return (
        <main ref={pageRef} className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white py-24 lg:py-32">
                <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
                <div className="cust-container relative z-10">
                    <div className="max-w-3xl">
                        <span
                            className="mb-6 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                            data-animate
                        >
                            Blog
                        </span>
                        <h1
                            className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl"
                            data-animate
                        >
                            Insights & Resources
                            <br />
                            <span className="text-primary">
                                For Your Business
                            </span>
                        </h1>
                        <p
                            className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg"
                            data-animate
                        >
                            Stay ahead with expert insights on accounting, tax
                            planning, compliance, and business strategy from our
                            team.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories & Articles */}
            <section className="bg-theme-offwhite py-20 lg:py-28">
                <div className="cust-container">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                        {/* Categories Sidebar */}
                        <div className="lg:col-span-1" data-animate>
                            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-primary uppercase">
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {Array.isArray(updatedCategories) &&
                                updatedCategories.length > 0 ? (
                                    updatedCategories.map((category, index) => (
                                        <button
                                            key={category?.name || index}
                                            type="button"
                                            onClick={() => {
                                                if (category?.name) {
                                                    setActiveCategory(
                                                        category.name,
                                                    );
                                                }
                                            }}
                                            aria-pressed={Boolean(
                                                category?.active,
                                            )}
                                            className={`flex w-full items-center justify-between border px-4 py-3 text-left transition-all ${
                                                category?.active
                                                    ? 'border-primary bg-primary text-white'
                                                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary'
                                            }`}
                                        >
                                            <span className="text-sm font-medium">
                                                {String(
                                                    category?.name || 'Unknown',
                                                )}
                                            </span>
                                            <span className="text-xs opacity-60">
                                                ({Number(category?.count || 0)})
                                            </span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="py-4 text-center text-gray-500">
                                        No categories available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Articles */}
                        <div className="lg:col-span-3">
                            <div
                                className="mb-8 flex items-center justify-between"
                                data-animate
                            >
                                <h3 className="text-2xl font-light text-theme-black">
                                    {activeCategory === 'All Articles'
                                        ? 'All Articles'
                                        : activeCategory}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {filteredArticles.length} article
                                    {filteredArticles.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            {!Array.isArray(filteredArticles) ||
                            filteredArticles.length === 0 ? (
                                <div className="py-12 text-center" data-animate>
                                    <p className="text-lg text-gray-500">
                                        {activeCategory &&
                                        activeCategory !== 'All Articles'
                                            ? `No articles found in "${activeCategory}".`
                                            : 'No articles available at the moment.'}
                                    </p>
                                    {activeCategory &&
                                        activeCategory !== 'All Articles' && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveCategory(
                                                        'All Articles',
                                                    );
                                                }}
                                                className="mt-4 font-medium text-primary hover:underline"
                                            >
                                                View all articles
                                            </button>
                                        )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {filteredArticles.map((article) => {
                                        if (
                                            !article ||
                                            !article.slug ||
                                            !article.title
                                        ) {
                                            return null;
                                        }

                                        return (
                                            <Link
                                                key={article.id || article.slug}
                                                href={`/blog/${encodeURIComponent(article.slug)}`}
                                                className="group border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-primary hover:shadow-lg"
                                                data-animate
                                            >
                                                <div className="flex flex-col gap-4">
                                                    {/* Category & Date */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                                                            {String(
                                                                article.category ||
                                                                    'Uncategorized',
                                                            )}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {String(
                                                                article.date ||
                                                                    '',
                                                            )}
                                                        </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h4 className="text-lg leading-tight font-semibold text-theme-black transition-colors group-hover:text-primary">
                                                        {String(article.title)}
                                                    </h4>

                                                    {/* Excerpt */}
                                                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                                                        {String(
                                                            article.excerpt ||
                                                                '',
                                                        )}
                                                    </p>

                                                    {/* Author & Read Time */}
                                                    <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                                                        <span className="text-xs text-gray-500">
                                                            {String(
                                                                article.author ||
                                                                    'Unknown Author',
                                                            )}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {String(
                                                                article.readTime ||
                                                                    '5 min read',
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
