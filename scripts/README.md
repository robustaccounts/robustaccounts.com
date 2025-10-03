# Scripts Documentation

## Blog Migration Scripts

### migrate-blogs-to-blob.mjs

Migrates blog content from local MDX files to Vercel Blob storage.

**Purpose**: Upload blog post content from `content/blog/` directory to Vercel Blob storage and update the database with blob URLs.

**Usage**:

```bash
pnpm run migrate:blogs-to-blob
```

**What it does**:

1. Scans the `content/blog/` directory for `.mdx` files
2. For each file:
    - Checks if a blog post with that slug exists in the database
    - Verifies if the blob URL is already accessible
    - Uploads the content to Vercel Blob if needed
    - Updates the database with the blob URL and path

**Requirements**:

- `DATABASE_URL` environment variable (Neon database connection)
- `BLOB_READ_WRITE_TOKEN` environment variable (Vercel Blob token)

**Features**:

- ✅ Skips already migrated posts with accessible blob URLs
- ✅ Re-uploads posts with broken/missing blob URLs
- ✅ Handles new MDX files automatically
- ✅ Provides detailed progress output

**Output Example**:

```
Starting blog migration to Vercel Blob...

Found 7 blog files to migrate

Processing: no-tax-on-tips...
  ✓  Uploaded to blob: https://...
  ✓  Database updated

✓ Migration completed successfully!
```

### Other Blog Scripts

#### migrate-blog-posts.mjs

Creates the initial blog posts in the database from MDX files.

**Usage**:

```bash
pnpm run migrate:blog
```

#### apply-blog-migrations.mjs

Applies database schema migrations for blog posts.

**Usage**:

```bash
pnpm run migrate:blog:apply
```

## Adding New Blog Posts

### Method 1: Through Admin CMS (Recommended)

1. Navigate to `/admin/blog/cms`
2. Log in with admin credentials
3. Create or edit blog posts
4. Content is automatically uploaded to blob storage

### Method 2: Manual Migration

1. Add `.mdx` file to `content/blog/`
2. Run `pnpm run migrate:blog` (if needed to create DB entry)
3. Run `pnpm run migrate:blogs-to-blob` to upload content

## Troubleshooting

### "BLOB_READ_WRITE_TOKEN is not configured"

Make sure you have the Vercel Blob token in your `.env` file:

```env
BLOB_READ_WRITE_TOKEN=your_token_here
```

### "Post not found in database"

The blog post needs to exist in the database first. Run:

```bash
pnpm run migrate:blog
```

### "Failed to fetch blob content: 404"

The blob URL doesn't exist or is inaccessible. Run the migration script to re-upload:

```bash
pnpm run migrate:blogs-to-blob
```
