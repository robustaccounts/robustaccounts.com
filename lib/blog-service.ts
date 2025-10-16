import { del, put } from '@vercel/blob';

import { sql } from './db';

export interface BlogMetadata {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    featured: boolean;
    tags: string[];
    contentUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BlogPost extends BlogMetadata {
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

// Convert database row to BlogMetadata
function dbRowToMetadata(row: Record<string, unknown>): BlogMetadata {
    // Format date as YYYY-MM-DD string
    const formatDate = (dateValue: unknown): string => {
        if (!dateValue) return new Date().toISOString().split('T')[0];
        if (dateValue instanceof Date) {
            return dateValue.toISOString().split('T')[0];
        }
        // If it's already a string, parse it and format it
        const date = new Date(dateValue as string | number);
        return date.toISOString().split('T')[0];
    };

    return {
        id: row.id as number,
        slug: row.slug as string,
        title: row.title as string,
        excerpt: row.excerpt as string,
        category: row.category as string,
        author: row.author as string,
        date: formatDate(row.date),
        readTime: row.read_time as string,
        featured: row.featured as boolean,
        tags: (row.tags as string[]) || [],
        contentUrl: row.content_url as string,
        createdAt: new Date(row.created_at as string | number),
        updatedAt: new Date(row.updated_at as string | number),
    };
}

// Convert BlogMetadata to BlogPostMeta (for backwards compatibility)
export function metadataToPostMeta(metadata: BlogMetadata): BlogPostMeta {
    return {
        id: metadata.id.toString(),
        slug: metadata.slug,
        title: metadata.title,
        excerpt: metadata.excerpt,
        category: metadata.category,
        readTime: metadata.readTime,
        date: metadata.date,
        author: metadata.author,
        featured: metadata.featured,
        tags: metadata.tags,
    };
}

// Get all blogs from database
export async function getAllBlogsFromDB(): Promise<BlogMetadata[]> {
    try {
        const result = await sql`
            SELECT * FROM blogs 
            ORDER BY date DESC
        `;
        return (result as Record<string, unknown>[]).map(dbRowToMetadata);
    } catch (error) {
        console.error('Error fetching blogs from database:', error);
        return [];
    }
}

// Get single blog by slug
export async function getBlogBySlugFromDB(
    slug: string,
): Promise<BlogMetadata | null> {
    try {
        const result = await sql`
            SELECT * FROM blogs 
            WHERE slug = ${slug}
            LIMIT 1
        `;

        const rows = result as Record<string, unknown>[];
        if (rows.length === 0) {
            return null;
        }

        return dbRowToMetadata(rows[0]);
    } catch (error) {
        console.error(`Error fetching blog ${slug}:`, error);
        return null;
    }
}

// Fetch content from Vercel Blob
export async function fetchBlogContent(contentUrl: string): Promise<string> {
    try {
        const response = await fetch(contentUrl, { cache: 'force-cache' });
        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.statusText}`);
        }
        let content = await response.text();

        // Sanitize content to prevent MDX parsing errors
        content = sanitizeBlogContent(content);

        return content;
    } catch (error) {
        console.error('Error fetching blog content from Blob:', error);
        return '';
    }
}

/**
 * Sanitize blog content to fix common MDX parsing issues
 * This ensures content from the database can be safely rendered
 */
function sanitizeBlogContent(content: string): string {
    // Remove any null bytes that might cause issues
    let sanitized = content.replace(/\0/g, '');

    // Preserve code blocks by temporarily replacing them
    const codeBlocks: string[] = [];
    sanitized = sanitized.replace(/```[\s\S]*?```/g, (match) => {
        codeBlocks.push(match);
        return `___CODE_BLOCK_PLACEHOLDER_${codeBlocks.length - 1}___`;
    });

    // Preserve inline code
    const inlineCode: string[] = [];
    sanitized = sanitized.replace(/`[^`\n]+?`/g, (match) => {
        inlineCode.push(match);
        return `___INLINE_CODE_PLACEHOLDER_${inlineCode.length - 1}___`;
    });

    // Preserve HTML/JSX components (don't escape braces in these)
    const jsxComponents: string[] = [];
    sanitized = sanitized.replace(
        /<[A-Z][A-Za-z0-9]*[\s\S]*?(?:>[\s\S]*?<\/[A-Z][A-Za-z0-9]*>|\/\s*>)/g,
        (match) => {
            jsxComponents.push(match);
            return `___JSX_COMPONENT_${jsxComponents.length - 1}___`;
        },
    );

    // Fix dollar signs followed by curly braces (ES6 template literal syntax)
    // These will be interpreted as expressions by MDX
    sanitized = sanitized.replace(/\$\{/g, '\\$\\{');

    // Escape ALL curly braces that aren't part of valid JSX expressions
    // This is the most common cause of "Could not parse expression with acorn" errors

    // Strategy: Be aggressive and escape ALL curly braces, then we'll unescape valid ones
    sanitized = sanitized.replace(/\{/g, '\\{');
    sanitized = sanitized.replace(/\}/g, '\\}');

    // Restore JSX components (they may have braces in attributes)
    jsxComponents.forEach((component, index) => {
        sanitized = sanitized.replace(
            `___JSX_COMPONENT_${index}___`,
            component,
        );
    });

    // Restore inline code
    inlineCode.forEach((code, index) => {
        sanitized = sanitized.replace(
            `___INLINE_CODE_PLACEHOLDER_${index}___`,
            code,
        );
    });

    // Restore code blocks
    codeBlocks.forEach((block, index) => {
        sanitized = sanitized.replace(
            `___CODE_BLOCK_PLACEHOLDER_${index}___`,
            block,
        );
    });

    return sanitized;
}

// Get blog with content
export async function getBlogWithContent(
    slug: string,
): Promise<BlogPost | null> {
    try {
        const metadata = await getBlogBySlugFromDB(slug);
        if (!metadata) {
            return null;
        }

        const content = await fetchBlogContent(metadata.contentUrl);

        return {
            ...metadata,
            content,
        };
    } catch (error) {
        console.error(`Error fetching blog with content ${slug}:`, error);
        return null;
    }
}

// Create new blog
export async function createBlogInDB(data: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    featured: boolean;
    tags: string[];
    content: string;
}): Promise<BlogMetadata | null> {
    try {
        // Upload content to Vercel Blob
        const blob = await put(`blogs/${data.slug}.mdx`, data.content, {
            access: 'public',
            contentType: 'text/markdown',
        });

        // Insert metadata into database
        const result = await sql`
            INSERT INTO blogs (
                slug, title, excerpt, category, author, date, 
                read_time, featured, tags, content_url
            )
            VALUES (
                ${data.slug}, ${data.title}, ${data.excerpt}, 
                ${data.category}, ${data.author}, ${data.date},
                ${data.readTime}, ${data.featured}, ${data.tags},
                ${blob.url}
            )
            RETURNING *
        `;

        const rows = result as Record<string, unknown>[];
        return dbRowToMetadata(rows[0]);
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
}

// Update existing blog
export async function updateBlogInDB(
    slug: string,
    data: {
        title?: string;
        excerpt?: string;
        category?: string;
        author?: string;
        date?: string;
        readTime?: string;
        featured?: boolean;
        tags?: string[];
        content?: string;
        newSlug?: string;
    },
): Promise<BlogMetadata | null> {
    try {
        // Get existing blog
        const existingBlog = await getBlogBySlugFromDB(slug);
        if (!existingBlog) {
            throw new Error(`Blog with slug ${slug} not found`);
        }

        let contentUrl = existingBlog.contentUrl;

        // If content is being updated, upload new version to Blob
        if (data.content !== undefined) {
            // Delete old blob
            await del(existingBlog.contentUrl);

            // Upload new content
            const finalSlug = data.newSlug || slug;
            const blob = await put(`blogs/${finalSlug}.mdx`, data.content, {
                access: 'public',
                contentType: 'text/markdown',
            });
            contentUrl = blob.url;
        }

        // Update database
        const result = await sql`
            UPDATE blogs
            SET 
                slug = ${data.newSlug || slug},
                title = ${data.title ?? existingBlog.title},
                excerpt = ${data.excerpt ?? existingBlog.excerpt},
                category = ${data.category ?? existingBlog.category},
                author = ${data.author ?? existingBlog.author},
                date = ${data.date ?? existingBlog.date},
                read_time = ${data.readTime ?? existingBlog.readTime},
                featured = ${data.featured ?? existingBlog.featured},
                tags = ${data.tags ?? existingBlog.tags},
                content_url = ${contentUrl},
                updated_at = NOW()
            WHERE slug = ${slug}
            RETURNING *
        `;

        const rows = result as Record<string, unknown>[];
        return dbRowToMetadata(rows[0]);
    } catch (error) {
        console.error(`Error updating blog ${slug}:`, error);
        throw error;
    }
}

// Delete blog
export async function deleteBlogFromDB(slug: string): Promise<boolean> {
    try {
        // Get blog to get content URL
        const blog = await getBlogBySlugFromDB(slug);
        if (!blog) {
            throw new Error(`Blog with slug ${slug} not found`);
        }

        // Delete from Blob storage
        await del(blog.contentUrl);

        // Delete from database
        await sql`
            DELETE FROM blogs
            WHERE slug = ${slug}
        `;

        return true;
    } catch (error) {
        console.error(`Error deleting blog ${slug}:`, error);
        throw error;
    }
}

// Toggle featured status
export async function toggleBlogFeatured(
    slug: string,
): Promise<BlogMetadata | null> {
    try {
        const result = await sql`
            UPDATE blogs
            SET featured = NOT featured, updated_at = NOW()
            WHERE slug = ${slug}
            RETURNING *
        `;

        const rows = result as Record<string, unknown>[];
        if (rows.length === 0) {
            return null;
        }

        return dbRowToMetadata(rows[0]);
    } catch (error) {
        console.error(`Error toggling featured for blog ${slug}:`, error);
        throw error;
    }
}

// Get unique categories
export async function getAllCategories(): Promise<string[]> {
    try {
        const result = await sql`
            SELECT DISTINCT category FROM blogs 
            ORDER BY category ASC
        `;
        const rows = result as Record<string, unknown>[];
        return rows.map((row) => row.category as string);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Get unique authors
export async function getAllAuthors(): Promise<string[]> {
    try {
        const result = await sql`
            SELECT DISTINCT author FROM blogs 
            ORDER BY author ASC
        `;
        const rows = result as Record<string, unknown>[];
        return rows.map((row) => row.author as string);
    } catch (error) {
        console.error('Error fetching authors:', error);
        return [];
    }
}
