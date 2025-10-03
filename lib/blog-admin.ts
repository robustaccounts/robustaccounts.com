import { del, put } from '@vercel/blob';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { sql } from '@/lib/db';

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
    blob_path: string;
    blob_url: string;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface AdminBlogPostSummary {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    displayDate: string;
    author: string;
    featured: boolean;
    tags: string[];
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AdminBlogPostDetail extends AdminBlogPostSummary {
    content: string;
    blobUrl: string;
}

export interface BlogPostInput {
    id?: string;
    title: string;
    slug?: string;
    excerpt: string;
    category: string;
    readTime: string;
    displayDate: string;
    author: string;
    featured: boolean;
    tags: string[];
    content: string;
}

const BLOB_FOLDER = 'blog';

function getBlobToken(): string {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
        throw new Error('BLOB_READ_WRITE_TOKEN is not configured.');
    }
    return token;
}

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function sanitizeTags(tags: string[]): string[] {
    return tags
        .map((tag) => tag || '')
        .map((tag) => tag.replace(/^#+/, '').trim())
        .filter(Boolean)
        .map((tag) => `#${tag.replace(/^#/, '')}`);
}

function parsePublishedAt(value: string): string | null {
    if (!value) {
        return null;
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    return parsed.toISOString();
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

async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
    if (!slug) {
        return false;
    }

    if (excludeId) {
        const result = await sql`
            SELECT 1
            FROM blog_posts
            WHERE slug = ${slug}
                AND deleted_at IS NULL
                AND id <> ${excludeId}
            LIMIT 1
        `;
        return result.length > 0;
    }

    const result = await sql`
        SELECT 1
        FROM blog_posts
        WHERE slug = ${slug}
            AND deleted_at IS NULL
        LIMIT 1
    `;
    return result.length > 0;
}

async function ensureUniqueSlug(
    initial: string,
    excludeId?: string,
): Promise<string> {
    let base = initial || 'post';
    base = slugify(base);

    if (!base) {
        base = 'post';
    }

    if (!(await slugExists(base, excludeId))) {
        return base;
    }

    for (let i = 2; i < 200; i++) {
        const candidate = `${base}-${i}`;
        if (!(await slugExists(candidate, excludeId))) {
            return candidate;
        }
    }

    throw new Error('Unable to generate unique slug');
}

function mapRowToSummary(row: BlogPostRow): AdminBlogPostSummary {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        category: row.category,
        readTime: row.read_time ?? '5 min read',
        displayDate: deriveDisplayDate(row),
        author: row.author ?? 'Robust Accounts Team',
        featured: Boolean(row.featured),
        tags: Array.isArray(row.tags) ? row.tags.filter(Boolean) : [],
        publishedAt: row.published_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

async function fetchContent(url: string): Promise<string> {
    if (!url) {
        return '';
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch blob content: ${response.status}`);
    }

    return response.text();
}

export async function listAdminBlogPosts(): Promise<AdminBlogPostSummary[]> {
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
            blob_path,
            blob_url,
            published_at,
            created_at,
            updated_at
        FROM blog_posts
        WHERE deleted_at IS NULL
        ORDER BY COALESCE(published_at, created_at) DESC
    `) ?? [];

    return rows.map((row) => mapRowToSummary(row as BlogPostRow));
}

export async function getAdminBlogPostById(
    id: string,
): Promise<AdminBlogPostDetail | null> {
    if (!id) {
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
            blob_path,
            blob_url,
            published_at,
            created_at,
            updated_at
        FROM blog_posts
        WHERE id = ${id}
        LIMIT 1
    `;

    const row = rows?.[0];

    if (!row) {
        return null;
    }

    const content = await fetchContent(row.blob_url);

    return {
        ...mapRowToSummary(row as BlogPostRow),
        content,
        blobUrl: row.blob_url,
    };
}

export async function createAdminBlogPost(
    input: BlogPostInput,
): Promise<AdminBlogPostDetail> {
    const slug = await ensureUniqueSlug(input.slug || input.title, undefined);
    const normalizedTags = sanitizeTags(input.tags);
    const blobPath = `${BLOB_FOLDER}/${slug}/${Date.now()}.mdx`;

    const blob = await put(blobPath, input.content, {
        access: 'public',
        contentType: 'text/markdown; charset=utf-8',
        token: getBlobToken(),
    });

    const publishedAt = parsePublishedAt(input.displayDate);

    const rows = await sql`
        INSERT INTO blog_posts (
            slug,
            title,
            excerpt,
            category,
            read_time,
            display_date,
            author,
            featured,
            tags,
            blob_path,
            blob_url,
            published_at
        ) VALUES (
            ${slug},
            ${input.title},
            ${input.excerpt},
            ${input.category},
            ${input.readTime || null},
            ${input.displayDate || null},
            ${input.author || null},
            ${input.featured},
            ${normalizedTags},
            ${blob.pathname},
            ${blob.url},
            ${publishedAt}
        )
        RETURNING
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
            blob_path,
            blob_url,
            published_at,
            created_at,
            updated_at
    `;

    const row = rows?.[0];

    if (!row) {
        throw new Error('Failed to create blog post');
    }

    return {
        ...mapRowToSummary(row as BlogPostRow),
        content: input.content,
        blobUrl: row.blob_url,
    };
}

export async function updateAdminBlogPost(
    input: BlogPostInput,
): Promise<AdminBlogPostDetail> {
    if (!input.id) {
        throw new Error('Blog post ID is required for update');
    }

    const existingRows = await sql`
        SELECT *
        FROM blog_posts
        WHERE id = ${input.id}
        LIMIT 1
    `;

    const existing = existingRows?.[0];

    if (!existing) {
        throw new Error('Blog post not found');
    }

    const normalizedTags = sanitizeTags(input.tags);
    const slug = await ensureUniqueSlug(input.slug || input.title, input.id);
    const publishedAt = parsePublishedAt(input.displayDate);

    let blobUrl = existing.blob_url;
    let blobPath = existing.blob_path;

    if (input.content) {
        const newPath = `${BLOB_FOLDER}/${slug}/${Date.now()}.mdx`;
        const blob = await put(newPath, input.content, {
            access: 'public',
            contentType: 'text/markdown; charset=utf-8',
            token: getBlobToken(),
        });

        blobUrl = blob.url;
        blobPath = blob.pathname;

        try {
            if (existing.blob_path) {
                await del(existing.blob_path, {
                    token: getBlobToken(),
                });
            }
        } catch (deleteErr) {
            console.error('Failed to delete previous blob version', deleteErr);
        }
    }

    const rows = await sql`
        UPDATE blog_posts
        SET
            slug = ${slug},
            title = ${input.title},
            excerpt = ${input.excerpt},
            category = ${input.category},
            read_time = ${input.readTime || null},
            display_date = ${input.displayDate || null},
            author = ${input.author || null},
            featured = ${input.featured},
            tags = ${normalizedTags},
            blob_path = ${blobPath},
            blob_url = ${blobUrl},
            published_at = ${publishedAt},
            updated_at = NOW()
        WHERE id = ${input.id}
        RETURNING
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
            blob_path,
            blob_url,
            published_at,
            created_at,
            updated_at
    `;

    const row = rows?.[0];

    if (!row) {
        throw new Error('Failed to update blog post');
    }

    return {
        ...mapRowToSummary(row as BlogPostRow),
        content: input.content,
        blobUrl,
    };
}

export async function softDeleteAdminBlogPost(id: string): Promise<void> {
    if (!id) {
        return;
    }

    await sql`
        UPDATE blog_posts
        SET deleted_at = NOW()
        WHERE id = ${id} AND deleted_at IS NULL
    `;
}

export async function restoreSoftDeletedBlogPost(id: string): Promise<void> {
    if (!id) {
        return;
    }

    await sql`
        UPDATE blog_posts
        SET deleted_at = NULL
        WHERE id = ${id}
    `;
}
