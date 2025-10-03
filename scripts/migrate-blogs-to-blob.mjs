/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from '@vercel/blob';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '..', '.env') });

const BLOB_FOLDER = 'blog-content';

// Initialize database
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set in environment variables.');
}
const sql = neon(databaseUrl);

function getBlobToken() {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
        throw new Error('BLOB_READ_WRITE_TOKEN is not configured.');
    }
    return token;
}

async function migrateBlogsToBlob() {
    console.log('Starting blog migration to Vercel Blob...\n');

    const contentDir = join(__dirname, '..', 'content', 'blog');
    
    try {
        // Get all MDX files
        const files = await readdir(contentDir);
        const mdxFiles = files.filter(file => file.endsWith('.mdx'));
        
        console.log(`Found ${mdxFiles.length} blog files to migrate\n`);

        for (const file of mdxFiles) {
            const slug = file.replace('.mdx', '');
            console.log(`Processing: ${slug}...`);

            try {
                // Read the MDX content
                const filePath = join(contentDir, file);
                const content = await readFile(filePath, 'utf-8');

                // Check if this post exists in the database
                const existingRows = await sql`
                    SELECT id, slug, blob_url
                    FROM blog_posts
                    WHERE slug = ${slug}
                    LIMIT 1
                `;

                if (!existingRows || existingRows.length === 0) {
                    console.log(`  ⚠️  Post "${slug}" not found in database. Skipping.`);
                    continue;
                }

                const post = existingRows[0];

                // Check if blob already exists and is accessible
                if (post.blob_url) {
                    try {
                        const response = await fetch(post.blob_url);
                        if (response.ok) {
                            console.log(`  ✓  Blob already exists and is accessible`);
                            continue;
                        }
                    } catch (error) {
                        console.log(`  ⚠️  Existing blob not accessible, re-uploading...`);
                    }
                }

                // Upload to Vercel Blob
                const blobPath = `${BLOB_FOLDER}/${slug}/${Date.now()}.mdx`;
                const blob = await put(blobPath, content, {
                    access: 'public',
                    contentType: 'text/markdown; charset=utf-8',
                    token: getBlobToken(),
                });

                // Update database with blob info
                await sql`
                    UPDATE blog_posts
                    SET 
                        blob_path = ${blob.pathname},
                        blob_url = ${blob.url},
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = ${post.id}
                `;

                console.log(`  ✓  Uploaded to blob: ${blob.url}`);
                console.log(`  ✓  Database updated\n`);

            } catch (error) {
                console.error(`  ✗  Error processing ${slug}:`, error.message);
                console.log('');
            }
        }

        console.log('\n✓ Migration completed successfully!');

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

// Run the migration
migrateBlogsToBlob().catch(console.error);

