import { blogPosts } from '@/data/blog-posts';

import { MetadataRoute } from 'next';

import { config } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = config.baseUrl;

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/services',
        '/services/bookkeeping',
        '/services/payroll',
        '/services/financial-advisory',
        '/services/business-advisory',
        '/pricing',
        '/how-it-works',
        '/our-expertise',
        '/contact',
        '/faq',
        '/testimonials',
        '/blog',
        '/privacy-policy',
        '/terms-of-service',
        '/cookie-policy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Blog posts from your data
    const blogPostRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...blogPostRoutes];
}
