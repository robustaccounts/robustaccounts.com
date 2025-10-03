import { MetadataRoute } from 'next';

import { getAllBlogPosts } from '@/lib/blog';
import { config } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

    // Blog posts from content folder
    const blogPosts = await getAllBlogPosts();
    const blogPostRoutes = blogPosts.map((post) => {
        const parsedDate = post?.date ? new Date(post.date) : new Date();

        return {
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        };
    });

    return [...staticRoutes, ...blogPostRoutes];
}
