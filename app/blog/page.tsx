'use client';

import {
    blogCategories,
    blogStats,
    getFeaturedPosts,
    getRecentPosts,
} from '@/data/blog-posts';

import React, { useMemo, useState } from 'react';

import Link from '@/ui/link';

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('All Articles');

    const featuredArticles = getFeaturedPosts();
    const recentArticles = getRecentPosts();

    // Filter articles based on active category
    const filteredArticles = useMemo(() => {
        let filtered = [...featuredArticles, ...recentArticles];

        // Filter by category
        if (activeCategory !== 'All Articles') {
            filtered = filtered.filter(
                (article) => article.category === activeCategory,
            );
        }

        return filtered;
    }, [activeCategory, featuredArticles, recentArticles]);

    // Update category counts based on all articles
    const updatedCategories = useMemo(() => {
        const allArticles = [...featuredArticles, ...recentArticles];
        return blogCategories.map((category) => ({
            ...category,
            active: category.name === activeCategory,
            count:
                category.name === 'All Articles'
                    ? allArticles.length
                    : allArticles.filter(
                          (article) => article.category === category.name,
                      ).length,
        }));
    }, [activeCategory, featuredArticles, recentArticles]);

    return (
        <main className="mt-16 flex flex-col">
            {/* Hero Section */}
            <section className="relative flex h-full px-4 py-20 sm:px-6 lg:px-12">
                <div className="container mx-auto flex h-auto w-full flex-col items-center justify-center gap-8 px-4 py-12 sm:gap-12 sm:px-6 lg:px-12 lg:py-16">
                    {/* Main Content */}
                    <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
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
                    <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
                        {blogStats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">
                                    {stat.number}
                                </div>
                                <div className="text-sm sm:text-base">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories & Articles */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                        {/* Categories Sidebar */}
                        <div className="lg:col-span-1">
                            <h3 className="mb-6 text-xl font-semibold text-gray-900">
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {updatedCategories.map((category, index) => (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            setActiveCategory(category.name)
                                        }
                                        className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-all ${
                                            category.active
                                                ? 'bg-secondary text-accent'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="font-medium">
                                            {category.name}
                                        </span>
                                        <span className="text-sm">
                                            ({category.count})
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Articles */}
                        <div className="lg:col-span-3">
                            <div className="mb-8 flex items-center justify-between">
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

                            {filteredArticles.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-lg text-gray-500">
                                        No articles found in this category.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setActiveCategory('All Articles');
                                        }}
                                        className="mt-4 font-medium text-accent hover:text-accent/80"
                                    >
                                        View all articles
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    {filteredArticles.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={`/blog/${article.slug}`}
                                            className="group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:shadow-sm"
                                        >
                                            <div className="flex flex-col gap-4">
                                                {/* Category & Date */}
                                                <div className="flex items-center justify-between">
                                                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-accent">
                                                        {article.category}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {article.date}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h4 className="text-xl font-semibold transition-all duration-300 group-hover:text-accent">
                                                    {article.title}
                                                </h4>

                                                {/* Excerpt */}
                                                <p className="line-clamp-3 text-base text-primary/60">
                                                    {article.excerpt}
                                                </p>

                                                {/* Author & Read Time */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">
                                                        By {article.author}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {article.readTime}
                                                    </span>
                                                </div>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2">
                                                    {article.tags
                                                        .slice(0, 3)
                                                        .map(
                                                            (tag, tagIndex) => (
                                                                <span
                                                                    key={
                                                                        tagIndex
                                                                    }
                                                                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ),
                                                        )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
