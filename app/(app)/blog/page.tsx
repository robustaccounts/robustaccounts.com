import type { Metadata } from 'next';
import React from 'react';

import {
    getBlogCategories,
    getBlogStats,
    getFeaturedPosts,
    getRecentPosts,
} from '@/lib/blog';

import BlogPageClient from './blog-page-client';

// Revalidate every 60 seconds
export const revalidate = 60;

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
    title: 'Accounting & Bookkeeping Blog | Robust Accounts',
    description:
        'Expert insights on accounting, bookkeeping, tax planning, compliance, and small-business strategy from the Robust Accounts team.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Accounting & Bookkeeping Blog | Robust Accounts',
        description:
            'Expert insights on accounting, bookkeeping, tax planning, compliance, and small-business strategy.',
        url: '/blog',
        type: 'website',
    },
};
