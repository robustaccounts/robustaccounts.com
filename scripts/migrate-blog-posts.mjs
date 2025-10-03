#!/usr/bin/env node

import 'dotenv/config';

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import { neon } from '@neondatabase/serverless';
import { put } from '@vercel/blob';

const BLOG_DIRECTORY = path.resolve(process.cwd(), 'content/blog');
const BLOB_FOLDER = 'blog';

const databaseUrl = process.env.DATABASE_URL;
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

if (!databaseUrl) {
    console.error('DATABASE_URL is required to run this script.');
    process.exit(1);
}

if (!blobToken) {
    console.error('BLOB_READ_WRITE_TOKEN is required to upload MDX files.');
    process.exit(1);
}

const sql = neon(databaseUrl);

const isDryRun = process.argv.includes('--dry-run');

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function sanitizeTags(tags) {
    if (!Array.isArray(tags)) {
        return [];
    }

    return tags
        .map((tag) => (typeof tag === 'string' ? tag : ''))
        .map((tag) => tag.replace(/^#/, '').trim())
        .filter(Boolean)
        .map((tag) => `#${tag}`);
}

function parsePublishedAt(displayDate) {
    if (!displayDate) {
        return null;
    }

    const parsed = new Date(displayDate);

    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    return parsed.toISOString();
}

async function slugExists(slug) {
    const rows = await sql`
        SELECT 1
        FROM blog_posts
        WHERE slug = ${slug}
            AND deleted_at IS NULL
        LIMIT 1
    `;

    return rows.length > 0;
}

async function ensureUniqueSlug(initial) {
    let base = slugify(initial || 'post');

    if (!base) {
        base = 'post';
    }

    if (!(await slugExists(base))) {
        return base;
    }

    for (let index = 2; index < 200; index += 1) {
        const candidate = `${base}-${index}`;
        if (!(await slugExists(candidate))) {
            return candidate;
        }
    }

    throw new Error('Unable to generate a unique slug for the blog post.');
}

async function migrateFile(fileName) {
    const filePath = path.join(BLOG_DIRECTORY, fileName);
    const mdx = await readFile(filePath, 'utf8');

    const { data, content } = matter(mdx);

    if (!data?.title || !data?.excerpt || !data?.category) {
        console.warn(`Skipping ${fileName} — missing required frontmatter fields.`);
        return;
    }

    const rawSlug = data.slug || path.basename(fileName, path.extname(fileName));
    const slug = await ensureUniqueSlug(rawSlug);

    const readTime = typeof data.readTime === 'string' ? data.readTime : '5 min read';
    const displayDate = typeof data.date === 'string' ? data.date : '';
    const publishedAt = parsePublishedAt(displayDate);
    const featured = Boolean(data.featured);
    const author = typeof data.author === 'string' ? data.author : 'Robust Accounts Team';
    const tags = sanitizeTags(data.tags);

    const blobPath = `${BLOB_FOLDER}/${slug}/${Date.now()}.mdx`;

    console.log(`→ Migrating ${fileName} as slug "${slug}"${isDryRun ? ' (dry run)' : ''}`);

    if (isDryRun) {
        return;
    }

    const blob = await put(blobPath, content, {
        access: 'public',
        contentType: 'text/markdown; charset=utf-8',
        token: blobToken,
    });

    await sql`
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
            ${String(data.title)},
            ${String(data.excerpt)},
            ${String(data.category)},
            ${readTime},
            ${displayDate || null},
            ${author},
            ${featured},
            ${tags},
            ${blob.pathname},
            ${blob.url},
            ${publishedAt}
        )
        ON CONFLICT (slug) DO UPDATE SET
            title = EXCLUDED.title,
            excerpt = EXCLUDED.excerpt,
            category = EXCLUDED.category,
            read_time = EXCLUDED.read_time,
            display_date = EXCLUDED.display_date,
            author = EXCLUDED.author,
            featured = EXCLUDED.featured,
            tags = EXCLUDED.tags,
            blob_path = EXCLUDED.blob_path,
            blob_url = EXCLUDED.blob_url,
            published_at = EXCLUDED.published_at,
            updated_at = NOW(),
            deleted_at = NULL;
    `;
}

async function main() {
    const entries = await readdir(BLOG_DIRECTORY, { withFileTypes: true });
    const mdxFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'));

    if (mdxFiles.length === 0) {
        console.log('No MDX files found to migrate.');
        return;
    }

    console.log(`Found ${mdxFiles.length} MDX files.`);

    for (const file of mdxFiles) {
        try {
            await migrateFile(file.name);
        } catch (error) {
            console.error(`Failed to migrate ${file.name}:`, error);
        }
    }

    console.log(isDryRun ? 'Dry run complete.' : 'Migration complete.');
}

main().catch((error) => {
    console.error('Unexpected error while migrating blog posts:', error);
    process.exit(1);
});
