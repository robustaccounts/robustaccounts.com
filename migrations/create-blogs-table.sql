-- Create blogs table for storing blog metadata and Vercel Blob references
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  read_time VARCHAR(50) DEFAULT '5 min read',
  featured BOOLEAN DEFAULT false,
  tags TEXT[], -- PostgreSQL array for tags
  content_url TEXT NOT NULL, -- Vercel Blob URL
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

-- Create index on date for sorting
CREATE INDEX IF NOT EXISTS idx_blogs_date ON blogs(date DESC);

-- Create index on featured for filtering
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);

