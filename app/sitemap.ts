import { readdirSync, statSync } from 'fs';
import { MetadataRoute } from 'next';
import { join } from 'path';

import { getAllBlogPosts } from '@/lib/blog';
import { config } from '@/lib/config';

// Function to recursively get all page routes from app directory
function getPageRoutes(dir: string, baseRoute: string = ''): string[] {
    const routes: string[] = [];

    try {
        const items = readdirSync(dir);

        for (const item of items) {
            const fullPath = join(dir, item);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
                // Skip special Next.js directories and route groups
                if (
                    item.startsWith('(') ||
                    item.startsWith('_') ||
                    item === 'api'
                ) {
                    // For route groups like (app), explore inside but don't add to route
                    if (item.startsWith('(')) {
                        const nestedRoutes = getPageRoutes(fullPath, baseRoute);
                        routes.push(...nestedRoutes);
                    }
                    continue;
                }

                // Check if directory has a page.tsx file
                const hasPage =
                    items.includes('page.tsx') ||
                    items.includes('page.ts') ||
                    items.includes('page.jsx') ||
                    items.includes('page.js');

                // Add the directory as a route
                const newRoute = baseRoute
                    ? `${baseRoute}/${item}`
                    : `/${item}`;

                // Recursively get nested routes
                const nestedRoutes = getPageRoutes(fullPath, newRoute);
                routes.push(...nestedRoutes);
            } else if (
                item === 'page.tsx' ||
                item === 'page.ts' ||
                item === 'page.jsx' ||
                item === 'page.js'
            ) {
                // Found a page file, add the current route
                routes.push(baseRoute || '/');
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
    }

    return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = config.baseUrl;

    // Dynamically get all routes from app directory
    const appDir = join(process.cwd(), 'app');
    const dynamicRoutes = getPageRoutes(appDir);

    // Remove duplicates and sort
    const uniqueRoutes = [...new Set(dynamicRoutes)].sort();

    // Map routes to sitemap entries with priorities
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

        // Set priority based on route type
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

    // Blog posts from content folder
    const blogPosts = getAllBlogPosts();
    const blogPostRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routeEntries, ...blogPostRoutes];
}
