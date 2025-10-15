import {
    type BlogMetadata,
    getAllBlogsFromDB,
    getBlogWithContent,
    metadataToPostMeta,
} from './blog-service';

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

// Helper to convert BlogMetadata to BlogPost
function metadataToPost(
    metadata: BlogMetadata & { content: string },
): BlogPost {
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
        content: metadata.content,
    };
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
    try {
        const blogs = await getAllBlogsFromDB();
        return blogs.map(metadataToPostMeta);
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return [];
    }
}

export async function getBlogPostBySlug(
    slug: string,
): Promise<BlogPost | null> {
    try {
        // Validate input
        if (!slug || typeof slug !== 'string' || slug.trim() === '') {
            console.warn('Invalid slug provided to getBlogPostBySlug');
            return null;
        }

        const blogWithContent = await getBlogWithContent(slug.trim());
        if (!blogWithContent) {
            return null;
        }

        return metadataToPost(blogWithContent);
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}

export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
    try {
        const allPosts = await getAllBlogPosts();

        if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) {
            return [];
        }

        return allPosts.filter((post) => post && post.featured === true);
    } catch (error) {
        console.error('Error getting featured posts:', error);
        return [];
    }
}

export async function getRecentPosts(): Promise<BlogPostMeta[]> {
    try {
        const allPosts = await getAllBlogPosts();

        if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) {
            return [];
        }

        return allPosts.filter((post) => post && post.featured !== true);
    } catch (error) {
        console.error('Error getting recent posts:', error);
        return [];
    }
}

export async function getRelatedPosts(
    currentPost: BlogPostMeta | null,
    limit: number = 3,
): Promise<BlogPostMeta[]> {
    try {
        if (!currentPost || !currentPost.category || !currentPost.id) {
            console.warn('Invalid currentPost provided to getRelatedPosts');
            return [];
        }

        const allPosts = await getAllBlogPosts();

        if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) {
            return [];
        }

        const validLimit = Math.max(0, Math.min(limit || 3, 10)); // Cap at 10 related posts

        return allPosts
            .filter(
                (post) =>
                    post &&
                    post.category &&
                    post.id &&
                    post.category === currentPost.category &&
                    post.id !== currentPost.id,
            )
            .slice(0, validLimit);
    } catch (error) {
        console.error('Error getting related posts:', error);
        return [];
    }
}

// Get unique categories from all posts
export async function getBlogCategories() {
    try {
        const allPosts = await getAllBlogPosts();

        if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) {
            return [{ name: 'All Articles', count: 0, active: true }];
        }

        const validPosts = allPosts.filter(
            (post) => post && post.category && String(post.category).trim(),
        );
        const categories = new Set(
            validPosts
                .map((post) => String(post.category).trim())
                .filter(Boolean),
        );

        const categoryList = [
            { name: 'All Articles', count: validPosts.length, active: true },
            ...Array.from(categories)
                .filter(Boolean)
                .map((category) => ({
                    name: category,
                    count: validPosts.filter(
                        (post) => post && post.category === category,
                    ).length,
                    active: false,
                })),
        ];

        return categoryList;
    } catch (error) {
        console.error('Error getting blog categories:', error);
        return [{ name: 'All Articles', count: 0, active: true }];
    }
}

export async function getBlogStats() {
    try {
        const allPosts = await getAllBlogPosts();

        if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) {
            return [
                { number: '0', label: 'Expert Articles' },
                { number: '0', label: 'Topics' },
                { number: '0 min', label: 'Avg Read Time' },
                { number: '24/7', label: 'Knowledge Access' },
            ];
        }

        const validPosts = allPosts.filter(
            (post) => post && post.category && post.readTime,
        );
        const categories = new Set(
            validPosts
                .map((post) => String(post.category).trim())
                .filter(Boolean),
        );

        const totalReadTime = validPosts.reduce((acc, post) => {
            if (!post.readTime || typeof post.readTime !== 'string') return acc;

            const timeMatch = post.readTime.match(/\d+/);
            const minutes = timeMatch ? parseInt(timeMatch[0], 10) : 0;
            return acc + (isNaN(minutes) ? 0 : minutes);
        }, 0);

        const avgReadTime =
            validPosts.length > 0
                ? Math.round(totalReadTime / validPosts.length)
                : 0;

        return [
            {
                number: validPosts.length.toString(),
                label:
                    validPosts.length === 1
                        ? 'Expert Article'
                        : 'Expert Articles',
            },
            {
                number: categories.size.toString(),
                label: categories.size === 1 ? 'Topic' : 'Topics',
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
    } catch (error) {
        console.error('Error getting blog stats:', error);
        return [
            { number: '0', label: 'Expert Articles' },
            { number: '0', label: 'Topics' },
            { number: '0 min', label: 'Avg Read Time' },
            { number: '24/7', label: 'Knowledge Access' },
        ];
    }
}
