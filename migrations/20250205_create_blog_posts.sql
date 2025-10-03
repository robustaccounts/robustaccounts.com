-- Migration: Create blog_posts table for CMS-managed blog content
-- Description: Stores blog metadata and blob references for MDX content
-- Date: 2025-02-05

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    category TEXT NOT NULL,
    read_time TEXT,
    display_date TEXT,
    author TEXT,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    blob_path TEXT NOT NULL,
    blob_url TEXT NOT NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique
    ON blog_posts (slug)
    WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx
    ON blog_posts ((COALESCE(published_at, created_at)));

CREATE INDEX IF NOT EXISTS blog_posts_deleted_at_idx
    ON blog_posts (deleted_at)
    WHERE deleted_at IS NULL;
