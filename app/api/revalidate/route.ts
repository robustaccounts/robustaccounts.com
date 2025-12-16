import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { apiConfig } from '@/lib/env';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
    const startTime = Date.now();
    logger.apiStart('POST', '/api/revalidate');

    try {
        // Get secret from query params or body
        const secret =
            request.nextUrl.searchParams.get('secret') ||
            (await request.json().catch(() => ({})))?.secret;

        // Verify secret token
        if (
            !apiConfig.revalidationSecret ||
            secret !== apiConfig.revalidationSecret
        ) {
            logger.warn('Revalidation request with invalid token', {
                hasSecret: !!secret,
            });
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 401 },
            );
        }

        // Get optional path to revalidate
        const path =
            request.nextUrl.searchParams.get('path') ||
            (await request.json().catch(() => ({})))?.path;

        // Revalidate blog paths
        revalidatePath('/blog');
        revalidateTag('blog', 'max');

        // If a specific path is provided, revalidate it too
        if (path) {
            revalidatePath(path);
        }

        const duration = Date.now() - startTime;
        const response = {
            revalidated: true,
            now: Date.now(),
            paths: ['/blog', path].filter(Boolean),
        };

        logger.apiSuccess('POST', '/api/revalidate', 200, duration, {
            paths: response.paths,
        });

        return NextResponse.json(response);
    } catch (error) {
        logger.apiError('POST', '/api/revalidate', error, 500);

        return NextResponse.json(
            {
                message: 'Error revalidating',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 },
        );
    }
}
