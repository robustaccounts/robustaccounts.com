import { readdirSync, statSync } from 'fs';
import { MetadataRoute } from 'next';
import { join } from 'path';

import { getAllBlogPosts } from '@/lib/blog';
import { config } from '@/lib/config';

// Top-level segments under app/ that should never appear in the sitemap:
// utility flows (lead-form, reschedule), dev-only previews, route groups,
// internal Next.js dirs, and the API tree.
const EXCLUDED_TOP_SEGMENTS = new Set([
    'lead-form',
    'reschedule',
    'error-preview',
    'api',
]);

function getPageRoutes(dir: string, baseRoute: string = ''): string[] {
    const routes: string[] = [];

    let items: string[];
    try {
        items = readdirSync(dir);
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
        return routes;
    }

    for (const item of items) {
        const fullPath = join(dir, item);
        let stat;
        try {
            stat = statSync(fullPath);
        } catch {
            continue;
        }

        if (stat.isDirectory()) {
            // Dynamic-route segments like [slug] or [token] must never be
            // emitted as literal sitemap URLs — those are 404s. Concrete
            // children (blog posts) come from getAllBlogPosts() below.
            if (item.startsWith('[')) continue;

            // Underscore-prefixed dirs are private/Next.js internals.
            if (item.startsWith('_')) continue;

            // Skip the API tree entirely.
            if (item === 'api') continue;

            // Route groups like (app) — recurse but don't add to path.
            if (item.startsWith('(')) {
                routes.push(...getPageRoutes(fullPath, baseRoute));
                continue;
            }

            // At the app/ root, drop excluded top-level utility flows.
            if (baseRoute === '' && EXCLUDED_TOP_SEGMENTS.has(item)) continue;

            const newRoute = baseRoute
                ? `${baseRoute}/${item}`
                : `/${item}`;

            routes.push(...getPageRoutes(fullPath, newRoute));
        } else if (
            item === 'page.tsx' ||
            item === 'page.ts' ||
            item === 'page.jsx' ||
            item === 'page.js' ||
            item === 'page.mdx'
        ) {
            routes.push(baseRoute || '/');
        }
    }

    return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = config.baseUrl;

    const appDir = join(process.cwd(), 'app');
    const dynamicRoutes = getPageRoutes(appDir);
    const uniqueRoutes = [...new Set(dynamicRoutes)].sort();

    const routeEntries = uniqueRoutes.map((route) => {
        let priority = 0.8;
        let changeFrequency:
            | 'always'
            | 'hourly'
            | 'daily'
            | 'weekly'
            | 'monthly'
            | 'yearly'
            | 'never' = 'weekly';

        if (route === '/') {
            priority = 1.0;
            changeFrequency = 'daily';
        } else if (route.startsWith('/solutions/')) {
            priority = 0.9;
            changeFrequency = 'weekly';
        } else if (route.startsWith('/services/')) {
            priority = 0.9;
            changeFrequency = 'weekly';
        } else if (route.startsWith('/blog/')) {
            priority = 0.6;
            changeFrequency = 'monthly';
        } else if (
            route === '/about' ||
            route === '/contact' ||
            route === '/pricing'
        ) {
            priority = 0.9;
            changeFrequency = 'weekly';
        } else if (
            route === '/privacy-policy' ||
            route === '/terms-of-service' ||
            route === '/cookie-policy'
        ) {
            priority = 0.3;
            changeFrequency = 'yearly';
        }

        return {
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency,
            priority,
        };
    });

    const blogPosts = await getAllBlogPosts();
    const blogPostRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routeEntries, ...blogPostRoutes];
}
