import {
    getBlogCategories,
    getBlogStats,
    getFeaturedPosts,
    getRecentPosts,
} from '@/lib/blog';

import React from 'react';

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