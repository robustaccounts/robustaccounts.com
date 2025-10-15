import { neon } from '@neondatabase/serverless';
import { put } from '@vercel/blob';

import 'dotenv/config';
import * as fs from 'fs';
import matter from 'gray-matter';
import * as path from 'path';

interface BlogFrontmatter {
    title: string;
    excerpt: string;
    category: string;
    readTime?: string;
    date: string;
    author: string;
    featured?: boolean;
    tags?: string[];
    slug?: string;
}

async function migrateBlogsToDatabase() {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
        console.error(
            '❌ BLOB_READ_WRITE_TOKEN is not set in environment (.env)',
        );
        process.exit(1);
    }
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('❌ DATABASE_URL is not set in environment (.env)');
        process.exit(1);
    }

    // Initialize SQL client directly (bypass env.ts validation)
    const sql = neon(databaseUrl);
    console.log('🚀 Starting blog migration to database + Vercel Blob...\n');

    const contentDirectory = path.join(process.cwd(), 'content/blog');

    // Check if content directory exists
    if (!fs.existsSync(contentDirectory)) {
        console.error(
            `❌ Blog content directory does not exist: ${contentDirectory}`,
        );
        process.exit(1);
    }

    const fileNames = fs.readdirSync(contentDirectory);
    const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));

    console.log(`📁 Found ${mdxFiles.length} MDX files to migrate\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const fileName of mdxFiles) {
        try {
            console.log(`Processing: ${fileName}...`);

            const fullPath = path.join(contentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            const frontmatter = data as BlogFrontmatter;

            // Generate slug from filename if not in frontmatter
            const slug = frontmatter.slug || fileName.replace(/\.mdx$/, '');

            // Validate required fields
            if (
                !frontmatter.title ||
                !frontmatter.excerpt ||
                !frontmatter.category ||
                !frontmatter.date ||
                !frontmatter.author
            ) {
                console.error(
                    `  ⚠️  Skipping ${fileName}: Missing required fields`,
                );
                errorCount++;
                continue;
            }

            // Upload content to Vercel Blob
            console.log(`  📤 Uploading content to Vercel Blob...`);
            const blob = await put(`blogs/${slug}.mdx`, content, {
                access: 'public',
                contentType: 'text/markdown',
            });

            console.log(`  ✅ Blob URL: ${blob.url}`);

            // Insert into database
            console.log(`  💾 Inserting into database...`);

            // Check if blog already exists
            const existing = await sql`
                SELECT id FROM blogs WHERE slug = ${slug}
            `;

            if (existing.length > 0) {
                console.log(
                    `  ⚠️  Blog with slug "${slug}" already exists, skipping...`,
                );
                continue;
            }

            await sql`
                INSERT INTO blogs (
                    slug, title, excerpt, category, author, date, 
                    read_time, featured, tags, content_url
                )
                VALUES (
                    ${slug},
                    ${frontmatter.title},
                    ${frontmatter.excerpt},
                    ${frontmatter.category},
                    ${frontmatter.author},
                    ${frontmatter.date},
                    ${frontmatter.readTime || '5 min read'},
                    ${frontmatter.featured || false},
                    ${frontmatter.tags || []},
                    ${blob.url}
                )
            `;

            console.log(`  ✅ Successfully migrated: ${slug}\n`);
            successCount++;
        } catch (error) {
            console.error(`  ❌ Error migrating ${fileName}:`, error);
            errorCount++;
        }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`  ✅ Successfully migrated: ${successCount}`);
    console.log(`  ❌ Failed: ${errorCount}`);
    console.log(`  📝 Total processed: ${mdxFiles.length}`);

    if (successCount > 0) {
        console.log('\n🎉 Migration completed successfully!');
        console.log(
            '💡 You can now manage these blogs from the admin panel at /blogs',
        );
    }
}

// Run migration
migrateBlogsToDatabase()
    .then(() => {
        console.log('\n✨ Done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    });
