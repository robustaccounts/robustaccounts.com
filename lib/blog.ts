import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content/blog');

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

export function getAllBlogPosts(): BlogPostMeta[] {
    try {
        // Check if content directory exists
        if (!fs.existsSync(contentDirectory)) {
            console.warn(`Blog content directory does not exist: ${contentDirectory}`);
            return [];
        }

        const fileNames = fs.readdirSync(contentDirectory);
        
        if (!fileNames || fileNames.length === 0) {
            console.warn('No files found in blog content directory');
            return [];
        }

        const allPostsData = fileNames
            .filter((fileName) => fileName && fileName.endsWith('.mdx'))
            .map((fileName) => {
                try {
                    const slug = fileName.replace(/\.mdx$/, '');
                    const fullPath = path.join(contentDirectory, fileName);
                    
                    if (!fs.existsSync(fullPath)) {
                        console.warn(`Blog post file not found: ${fullPath}`);
                        return null;
                    }

                    const fileContents = fs.readFileSync(fullPath, 'utf8');
                    
                    if (!fileContents || fileContents.trim() === '') {
                        console.warn(`Blog post file is empty: ${fullPath}`);
                        return null;
                    }

                    const { data } = matter(fileContents);
                    
                    if (!data) {
                        console.warn(`No frontmatter found in: ${fullPath}`);
                        return null;
                    }

                    // Validate required fields
                    if (!data.title || !data.excerpt || !data.category || !data.date || !data.author) {
                        console.warn(`Missing required fields in: ${fullPath}`);
                        return null;
                    }

                    return {
                        id: slug,
                        slug,
                        title: String(data.title || '').trim(),
                        excerpt: String(data.excerpt || '').trim(),
                        category: String(data.category || '').trim(),
                        readTime: String(data.readTime || '5 min read').trim(),
                        date: String(data.date || '').trim(),
                        author: String(data.author || '').trim(),
                        featured: Boolean(data.featured),
                        tags: Array.isArray(data.tags) ? data.tags.filter(tag => tag && String(tag).trim()) : [],
                    };
                } catch (fileError) {
                    console.error(`Error processing file ${fileName}:`, fileError);
                    return null;
                }
            })
            .filter((post): post is BlogPostMeta => post !== null);

        // Sort posts by date (newest first) with null checks
        return allPostsData.sort((a, b) => {
            if (!a.date || !b.date) return 0;
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            
            // Check for invalid dates
            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
            
            return dateB.getTime() - dateA.getTime();
        });
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return [];
    }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
    try {
        // Validate input
        if (!slug || typeof slug !== 'string' || slug.trim() === '') {
            console.warn('Invalid slug provided to getBlogPostBySlug');
            return null;
        }

        // Check if content directory exists
        if (!fs.existsSync(contentDirectory)) {
            console.warn(`Blog content directory does not exist: ${contentDirectory}`);
            return null;
        }

        const sanitizedSlug = slug.trim();
        const fullPath = path.join(contentDirectory, `${sanitizedSlug}.mdx`);
        
        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        if (!fileContents || fileContents.trim() === '') {
            console.warn(`Blog post file is empty: ${fullPath}`);
            return null;
        }

        const { data, content } = matter(fileContents);
        
        if (!data) {
            console.warn(`No frontmatter found in: ${fullPath}`);
            return null;
        }

        // Validate required fields
        if (!data.title || !data.excerpt || !data.category || !data.date || !data.author) {
            console.warn(`Missing required fields in: ${fullPath}`);
            return null;
        }

        return {
            id: sanitizedSlug,
            slug: sanitizedSlug,
            title: String(data.title || '').trim(),
            excerpt: String(data.excerpt || '').trim(),
            category: String(data.category || '').trim(),
            readTime: String(data.readTime || '5 min read').trim(),
            date: String(data.date || '').trim(),
            author: String(data.author || '').trim(),
            featured: Boolean(data.featured),
            tags: Array.isArray(data.tags) ? data.tags.filter(tag => tag && String(tag).trim()) : [],
            content: String(content || '').trim(),
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}

export function getFeaturedPosts(): BlogPostMeta[] {
    try {
        const allPosts = getAllBlogPosts();
        
        if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) {
            return [];
        }

        return allPosts.filter((post) => post && post.featured === true);
    } catch (error) {
        console.error('Error getting featured posts:', error);
        return [];
    }
}

export function getRecentPosts(): BlogPostMeta[] {
    try {
        const allPosts = getAllBlogPosts();
        
        if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) {
            return [];
        }

        return allPosts.filter((post) => post && post.featured !== true);
    } catch (error) {
        console.error('Error getting recent posts:', error);
        return [];
    }
}

export function getRelatedPosts(currentPost: BlogPostMeta | null, limit: number = 3): BlogPostMeta[] {
    try {
        if (!currentPost || !currentPost.category || !currentPost.id) {
            console.warn('Invalid currentPost provided to getRelatedPosts');
            return [];
        }

        const allPosts = getAllBlogPosts();
        
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
export function getBlogCategories() {
    try {
        const allPosts = getAllBlogPosts();
        
        if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) {
            return [{ name: 'All Articles', count: 0, active: true }];
        }

        const validPosts = allPosts.filter(post => post && post.category && String(post.category).trim());
        const categories = new Set(validPosts.map((post) => String(post.category).trim()).filter(Boolean));
        
        const categoryList = [
            { name: 'All Articles', count: validPosts.length, active: true },
            ...Array.from(categories)
                .filter(Boolean)
                .map((category) => ({
                    name: category,
                    count: validPosts.filter((post) => post && post.category === category).length,
                    active: false,
                })),
        ];

        return categoryList;
    } catch (error) {
        console.error('Error getting blog categories:', error);
        return [{ name: 'All Articles', count: 0, active: true }];
    }
}

export function getBlogStats() {
    try {
        const allPosts = getAllBlogPosts();
        
        if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) {
            return [
                { number: '0', label: 'Expert Articles' },
                { number: '0', label: 'Topics' },
                { number: '0 min', label: 'Avg Read Time' },
                { number: '24/7', label: 'Knowledge Access' },
            ];
        }

        const validPosts = allPosts.filter(post => post && post.category && post.readTime);
        const categories = new Set(
            validPosts
                .map(post => String(post.category).trim())
                .filter(Boolean)
        );
        
        const totalReadTime = validPosts.reduce((acc, post) => {
            if (!post.readTime || typeof post.readTime !== 'string') return acc;
            
            const timeMatch = post.readTime.match(/\d+/);
            const minutes = timeMatch ? parseInt(timeMatch[0], 10) : 0;
            return acc + (isNaN(minutes) ? 0 : minutes);
        }, 0);

        const avgReadTime = validPosts.length > 0 ? Math.round(totalReadTime / validPosts.length) : 0;

        return [
            { 
                number: validPosts.length.toString(), 
                label: validPosts.length === 1 ? 'Expert Article' : 'Expert Articles' 
            },
            { 
                number: categories.size.toString(), 
                label: categories.size === 1 ? 'Topic' : 'Topics' 
            },
            { 
                number: `${avgReadTime} min`, 
                label: 'Avg Read Time' 
            },
            { 
                number: '24/7', 
                label: 'Knowledge Access' 
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