import type { Metadata } from 'next';
import React from 'react';

import {
    getBlogCategories,
    getBlogStats,
    getFeaturedPosts,
    getRecentPosts,
} from '@/lib/blog';

import BlogPageClient from './blog-page-client';

export default async function BlogPage() {
    const featuredArticles = (await getFeaturedPosts()) || [];
    const recentArticles = (await getRecentPosts()) || [];
    const categories = (await getBlogCategories()) || [];
    const blogStats = (await getBlogStats()) || [];

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
