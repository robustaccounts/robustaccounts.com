import {
    getBlogCategories,
    getBlogStats,
    getFeaturedPosts,
    getRecentPosts,
} from '@/lib/blog';

import React from 'react';
import type { Metadata } from 'next';

import BlogPageClient from './blog-page-client';

export default function BlogPage() {
    const featuredArticles = getFeaturedPosts() || [];
    const recentArticles = getRecentPosts() || [];
    const categories = getBlogCategories() || [];
    const blogStats = getBlogStats() || [];

    return (
        <BlogPageClient
            featuredArticles={featuredArticles}
            recentArticles={recentArticles}
            categories={categories}
            blogStats={blogStats}
        />
    );
}

export const metadata: Metadata = {
    title: 'Blog',
    description:
        'Expert insights on accounting, tax planning, compliance, and business strategy from the Robust Accounts team.',
    alternates: { canonical: '/blog' },
};
