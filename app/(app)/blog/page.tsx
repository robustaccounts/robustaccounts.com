import React from 'react';
import type { Metadata } from 'next';

import {
    getBlogCategories,
    getBlogStats,
    getFeaturedPosts,
    getRecentPosts,
} from '@/lib/blog';

import BlogPageClient from './blog-page-client';

export default async function BlogPage() {
    const [featuredArticles, recentArticles, categories, blogStats] = await Promise.all([
        getFeaturedPosts(),
        getRecentPosts(),
        getBlogCategories(),
        getBlogStats(),
    ]);

    return (
        <BlogPageClient
            featuredArticles={featuredArticles ?? []}
            recentArticles={recentArticles ?? []}
            categories={categories ?? []}
            blogStats={blogStats ?? []}
        />
    );
}

export const metadata: Metadata = {
    title: 'Blog',
    description:
        'Expert insights on accounting, tax planning, compliance, and business strategy from the Robust Accounts team.',
    alternates: { canonical: '/blog' },
};
