/* eslint-disable @typescript-eslint/no-explicit-any */
import { sql } from '@/lib/db';

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    author: string;
    featured: boolean;
    tags: string[];
    content: string;
}

export interface BlogPostMeta {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    author: string;
    featured: boolean;
    tags: string[];
}

interface BlogPostRow {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    read_time: string | null;
    display_date: string | null;
    author: string | null;
    featured: boolean | null;
    tags: string[] | null;
    blob_url: string;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

function rowToMeta(row: BlogPostRow): BlogPostMeta {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        category: row.category,
        readTime: row.read_time ?? '5 min read',
        date: deriveDisplayDate(row),
        author: row.author ?? 'Robust Accounts Team',
        featured: Boolean(row.featured),
        tags: Array.isArray(row.tags) ? row.tags.filter(Boolean) : [],
    };
}

async function fetchContentFromBlob(url: string): Promise<string> {
    if (!url) {
        return '';
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(
                'Failed to fetch blog content',
                response.status,
                response.statusText,
            );
            return '';
        }

        return await response.text();
    } catch (error) {
        console.error('Error fetching blog content from blob storage', error);
        return '';
    }
}

function deriveDisplayDate(row: {
    display_date: string | null;
    published_at: string | null;
}): string {
    if (row.display_date && row.display_date.trim()) {
        return row.display_date;
    }

    if (!row.published_at) {
        return '';
    }

    const parsed = new Date(row.published_at);
    if (Number.isNaN(parsed.getTime())) {
        return '';
    }

    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(parsed);
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
    const rows =
        (await sql`
        SELECT
            id,
            slug,
            title,
            excerpt,
            category,
            read_time,
            display_date,
            author,
            featured,
            tags,
            blob_url,
            published_at,
            created_at,
            updated_at
        FROM blog_posts
        WHERE deleted_at IS NULL
        ORDER BY COALESCE(published_at, created_at) DESC
    `) ?? [];

    return rows.map((row) => rowToMeta(row as BlogPostRow));
}

export async function getBlogPostBySlug(
    slug: string,
): Promise<BlogPost | null> {
    if (!slug || typeof slug !== 'string') {
        return null;
    }

    const rows = await sql`
        SELECT
            id,
            slug,
            title,
            excerpt,
            category,
            read_time,
            display_date,
            author,
            featured,
            tags,
            blob_url,
            published_at,
            created_at,
            updated_at
        FROM blog_posts
        WHERE slug = ${slug} AND deleted_at IS NULL
        LIMIT 1
    `;

    const row = rows?.[0];

    if (!row) {
        return null;
    }

    const content = await fetchContentFromBlob(row.blob_url);

    return {
        ...rowToMeta(row as BlogPostRow),
        content,
    };
}

export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
    const rows =
        (await sql`
        SELECT
            id,
            slug,
            title,
            excerpt,
            category,
            read_time,
            display_date,
            author,
            featured,
            tags,
            blob_url,
            published_at,
            created_at,
            updated_at
        FROM blog_posts
        WHERE deleted_at IS NULL AND featured = true
        ORDER BY COALESCE(published_at, created_at) DESC
    `) ?? [];

    return rows.map((row) => rowToMeta(row as BlogPostRow));
}

export async function getRecentPosts(
    limit: number = 6,
): Promise<BlogPostMeta[]> {
    const rows =
        (await sql`
        SELECT
            id,
            slug,
            title,
            excerpt,
            category,
            read_time,
            display_date,
            author,
            featured,
            tags,
            blob_url,
            published_at,
            created_at,
            updated_at
        FROM blog_posts
        WHERE deleted_at IS NULL AND (featured IS NULL OR featured = false)
        ORDER BY COALESCE(published_at, created_at) DESC
        LIMIT ${Math.max(1, Math.min(limit, 12))}
    `) ?? [];

    return rows.map((row) => rowToMeta(row as BlogPostRow));
}

export async function getRelatedPosts(
    currentPost: BlogPostMeta | null,
    limit: number = 3,
): Promise<BlogPostMeta[]> {
    if (!currentPost?.category || !currentPost?.id) {
        return [];
    }

    const rows =
        (await sql`
        SELECT
            id,
            slug,
            title,
            excerpt,
            category,
            read_time,
            display_date,
            author,
            featured,
            tags,
            blob_url,
            published_at,
            created_at,
            updated_at
        FROM blog_posts
        WHERE deleted_at IS NULL
          AND category = ${currentPost.category}
          AND id <> ${currentPost.id}
        ORDER BY COALESCE(published_at, created_at) DESC
        LIMIT ${Math.max(1, Math.min(limit, 10))}
    `) ?? [];

    return rows.map((row) => rowToMeta(row as BlogPostRow));
}

export async function getBlogCategories() {
    const rows = await sql`
        SELECT category, COUNT(*)::int AS count
        FROM blog_posts
        WHERE deleted_at IS NULL
        GROUP BY category
        ORDER BY category
    `;

    const validRows = rows ?? [];
    const totalCount = validRows.reduce(
        (acc, row) => acc + ((row as any)?.count ?? 0),
        0,
    );

    return [
        { name: 'All Articles', count: totalCount, active: true },
        ...validRows
            .filter((row) => (row as any)?.category)
            .map((row) => ({
                name: (row as any).category,
                count: (row as any).count,
                active: false,
            })),
    ];
}

export async function getBlogStats() {
    const rows = await sql`
        SELECT category, read_time, COUNT(*) OVER ()::int AS count
        FROM blog_posts
        WHERE deleted_at IS NULL
    `;

    const validRows = rows ?? [];

    if (validRows.length === 0) {
        return [
            { number: '0', label: 'Expert Articles' },
            { number: '0', label: 'Topics' },
            { number: '0 min', label: 'Avg Read Time' },
            { number: '24/7', label: 'Knowledge Access' },
        ];
    }

    const uniqueCategories = new Set<string>();
    let totalReadTime = 0;
    let readTimeCount = 0;

    for (const row of validRows) {
        if ((row as any)?.category) {
            uniqueCategories.add((row as any).category);
        }

        if ((row as any)?.read_time) {
            const match = (row as any).read_time.match(/\d+/);
            const minutes = match ? Number.parseInt(match[0]!, 10) : 0;
            if (!Number.isNaN(minutes) && minutes > 0) {
                totalReadTime += minutes;
                readTimeCount += 1;
            }
        }
    }

    const articleCount = (validRows[0] as any)?.count ?? validRows.length;
    const avgReadTime =
        readTimeCount > 0 ? Math.round(totalReadTime / readTimeCount) : 0;

    return [
        {
            number: articleCount.toString(),
            label: articleCount === 1 ? 'Expert Article' : 'Expert Articles',
        },
        {
            number: uniqueCategories.size.toString(),
            label: uniqueCategories.size === 1 ? 'Topic' : 'Topics',
        },
        {
            number: `${avgReadTime} min`,
            label: 'Avg Read Time',
        },
        {
            number: '24/7',
            label: 'Knowledge Access',
        },
    ];
}
