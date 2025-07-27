import { MetadataRoute } from 'next';

import { config } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/_next/', '/admin/', '/private/'],
        },
        sitemap: `${config.baseUrl}/sitemap.xml`,
    };
}
