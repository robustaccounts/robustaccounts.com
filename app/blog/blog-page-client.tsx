'use client';

import React, { useMemo, useState } from 'react';

import type { BlogPostMeta } from '@/lib/blog';
import Link from '@/ui/link';

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

    // Filter articles based on active category with null checks
    const filteredArticles = useMemo(() => {
        const safeFeatures = Array.isArray(featuredArticles) ? featuredArticles : [];
        const safeRecent = Array.isArray(recentArticles) ? recentArticles : [];
        
        let filtered = [...safeFeatures, ...safeRecent].filter(article => 
            article && 
            article.title && 
            article.slug && 
            article.category
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
            .filter(category => category && category.name)
            .map((category) => ({
                ...category,
                active: category.name === activeCategory,
            }));
    }, [activeCategory, categories]);

    return (
        <main className="hero-section flex flex-col">
            {/* Hero Section */}
            <section className="relative flex h-full px-4 py-12 sm:px-6 lg:px-12">
                <div className="container mx-auto flex h-auto w-full flex-col items-center justify-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 lg:px-12 lg:py-12">
                    {/* Main Content */}
                    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
                        <h1 className="text-center text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                            Professional Insights for{' '}
                            <span className="text-accent">
                                Business Success
                            </span>
                        </h1>
                        <p className="max-w-3xl text-center text-base leading-relaxed sm:text-lg lg:text-xl">
                            Stay ahead with expert insights on accounting, tax
                            planning, compliance, and business strategy. Our
                            team of certified professionals shares practical
                            knowledge to help your business thrive.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                        {Array.isArray(blogStats) && blogStats.length > 0 ? (
                            blogStats
                                .filter(stat => stat && stat.number && stat.label)
                                .map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">
                                            {String(stat.number || '0')}
                                        </div>
                                        <div className="text-sm sm:text-base">
                                            {String(stat.label || '')}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">
                                No blog statistics available
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Categories & Articles */}
            <section className="py-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Categories Sidebar */}
                        <div className="lg:col-span-1">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {Array.isArray(updatedCategories) && updatedCategories.length > 0 ? (
                                    updatedCategories.map((category, index) => (
                                        <div
                                            key={category?.name || index}
                                            onClick={() => {
                                                if (category?.name) {
                                                    setActiveCategory(category.name);
                                                }
                                            }}
                                            className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-all ${
                                                category?.active
                                                    ? 'bg-secondary text-accent'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span className="font-medium">
                                                {String(category?.name || 'Unknown')}
                                            </span>
                                            <span className="text-sm">
                                                ({Number(category?.count || 0)})
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-4">
                                        No categories available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Articles */}
                        <div className="lg:col-span-3">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    {activeCategory === 'All Articles'
                                        ? 'All Articles'
                                        : activeCategory}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {filteredArticles.length} article
                                    {filteredArticles.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            {!Array.isArray(filteredArticles) || filteredArticles.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-lg text-gray-500">
                                        {activeCategory && activeCategory !== 'All Articles' 
                                            ? `No articles found in the "${activeCategory}" category.`
                                            : 'No articles available at the moment.'}
                                    </p>
                                    {activeCategory && activeCategory !== 'All Articles' && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setActiveCategory('All Articles');
                                            }}
                                            className="mt-4 font-medium text-accent hover:text-accent/80"
                                        >
                                            View all articles
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {filteredArticles.map((article) => {
                                        if (!article || !article.slug || !article.title) {
                                            return null;
                                        }
                                        
                                        return (
                                            <Link
                                                key={article.id || article.slug}
                                                href={`/blog/${encodeURIComponent(article.slug)}`}
                                                className="group cursor-pointer rounded-xl p-5 transition-all duration-300 hover:shadow-sm"
                                            >
                                                <div className="flex flex-col gap-3">
                                                    {/* Category & Date */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-accent">
                                                            {String(article.category || 'Uncategorized')}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {String(article.date || '')}
                                                        </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h4 className="text-xl font-semibold transition-all duration-300 group-hover:text-accent">
                                                        {String(article.title)}
                                                    </h4>

                                                    {/* Excerpt */}
                                                    <p className="line-clamp-3 text-base text-primary/60">
                                                        {String(article.excerpt || '')}
                                                    </p>

                                                    {/* Author & Read Time */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-500">
                                                            By {String(article.author || 'Unknown Author')}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {String(article.readTime || '5 min read')}
                                                        </span>
                                                    </div>

                                                    {/* Tags */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {Array.isArray(article.tags) && article.tags.length > 0 && (
                                                            article.tags
                                                                .filter(tag => tag && String(tag).trim())
                                                                .slice(0, 3)
                                                                .map((tag, tagIndex) => (
                                                                    <span
                                                                        key={tagIndex}
                                                                        className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                                                                    >
                                                                        {String(tag).replace(/^#/, '')}
                                                                    </span>
                                                                ))
                                                        )}
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