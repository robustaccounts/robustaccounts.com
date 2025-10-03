-- Migration: Ensure blog_posts has all expected columns
-- Description: Adds missing columns used by the CMS code when migrating from an earlier schema
-- Date: 2025-02-06

ALTER TABLE blog_posts
    ADD COLUMN IF NOT EXISTS display_date TEXT,
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Ensure the slug uniqueness constraint only considers non-deleted posts
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_indexes
        WHERE schemaname = 'public'
          AND indexname = 'blog_posts_slug_unique'
    ) THEN
        CREATE UNIQUE INDEX blog_posts_slug_unique
            ON blog_posts (slug)
            WHERE deleted_at IS NULL;
    END IF;
END $$;

-- Index for published_at ordering if it is missing
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_indexes
        WHERE schemaname = 'public'
          AND indexname = 'blog_posts_published_at_idx'
    ) THEN
        CREATE INDEX blog_posts_published_at_idx
            ON blog_posts ((COALESCE(published_at, created_at)));
    END IF;
END $$;

