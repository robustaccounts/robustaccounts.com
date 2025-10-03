-- Migration: Align existing blog_posts table with new CMS schema
-- Description: Adds missing columns, converts types, and seeds defaults for legacy rows
-- Date: 2025-02-06

ALTER TABLE blog_posts
    ADD COLUMN IF NOT EXISTS display_date TEXT,
    ADD COLUMN IF NOT EXISTS blob_path TEXT,
    ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Ensure published_at/display_date have sensible defaults for legacy content
UPDATE blog_posts
SET
    published_at = COALESCE(published_at, created_at),
    display_date = COALESCE(
        display_date,
        to_char(COALESCE(published_at, created_at), 'FMMonth DD, YYYY')
    )
WHERE published_at IS NULL OR display_date IS NULL;

-- Convert tags JSON payloads into text[] for consistency
ALTER TABLE blog_posts
    ADD COLUMN IF NOT EXISTS tags_text TEXT[] DEFAULT ARRAY[]::TEXT[];

UPDATE blog_posts
SET tags_text = CASE
    WHEN tags IS NULL THEN ARRAY[]::TEXT[]
    WHEN pg_typeof(tags)::text = 'jsonb'
        THEN ARRAY(SELECT jsonb_array_elements_text(tags::jsonb))
    WHEN pg_typeof(tags)::text = '_text'
        THEN tags
    ELSE ARRAY[tags::TEXT]
END;

ALTER TABLE blog_posts DROP COLUMN IF EXISTS tags;
ALTER TABLE blog_posts RENAME COLUMN tags_text TO tags;

-- Backfill blob_path with empty string to avoid null constraint when inserting new rows later
UPDATE blog_posts
SET blob_path = COALESCE(blob_path, '');

CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique
    ON blog_posts (slug)
    WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx
    ON blog_posts ((COALESCE(published_at, created_at)));
