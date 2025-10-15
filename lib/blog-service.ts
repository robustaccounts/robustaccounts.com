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
function dbRowToMetadata(row: any): BlogMetadata {
    // Format date as YYYY-MM-DD string
    const formatDate = (dateValue: any): string => {
        if (!dateValue) return new Date().toISOString().split('T')[0];
        if (dateValue instanceof Date) {
            return dateValue.toISOString().split('T')[0];
        }
        // If it's already a string, parse it and format it
        const date = new Date(dateValue);
        return date.toISOString().split('T')[0];
    };

    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        category: row.category,
        author: row.author,
        date: formatDate(row.date),
        readTime: row.read_time,
        featured: row.featured,
        tags: row.tags || [],
        contentUrl: row.content_url,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    };
}

// Convert BlogMetadata to BlogPostMeta (for backwards compatibility)
function metadataToPostMeta(metadata: BlogMetadata): BlogPostMeta {
    return {
        id: metadata.slug,
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
        return result.map(dbRowToMetadata);
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

        if (result.length === 0) {
            return null;
        }

        return dbRowToMetadata(result[0]);
    } catch (error) {
        console.error(`Error fetching blog ${slug}:`, error);
        return null;
    }
}

// Fetch content from Vercel Blob
export async function fetchBlogContent(contentUrl: string): Promise<string> {
    try {
        const response = await fetch(contentUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error fetching blog content from Blob:', error);
        return '';
    }
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

        return dbRowToMetadata(result[0]);
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

        return dbRowToMetadata(result[0]);
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

        if (result.length === 0) {
            return null;
        }

        return dbRowToMetadata(result[0]);
    } catch (error) {
        console.error(`Error toggling featured for blog ${slug}:`, error);
        throw error;
    }
}

// Get blogs by category
export async function getBlogsByCategory(
    category: string,
): Promise<BlogMetadata[]> {
    try {
        const result = await sql`
            SELECT * FROM blogs 
            WHERE category = ${category}
            ORDER BY date DESC
        `;
        return result.map(dbRowToMetadata);
    } catch (error) {
        console.error(`Error fetching blogs for category ${category}:`, error);
        return [];
    }
}

// Get featured blogs
export async function getFeaturedBlogs(): Promise<BlogMetadata[]> {
    try {
        const result = await sql`
            SELECT * FROM blogs 
            WHERE featured = true
            ORDER BY date DESC
        `;
        return result.map(dbRowToMetadata);
    } catch (error) {
        console.error('Error fetching featured blogs:', error);
        return [];
    }
}

// Export for backwards compatibility
export { metadataToPostMeta };
