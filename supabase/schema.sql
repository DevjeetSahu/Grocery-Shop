-- ============================================
-- PriceCat - Grocery Price Catalogue
-- Database Schema for Supabase (PostgreSQL)
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ─── Categories Table ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT, -- Lucide icon name
  display_order INT4 DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Products Table ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  quantity TEXT NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(name, quantity)
);

-- Create index for faster category-based lookups
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- ─── Row Level Security ───────────────────────────────────

-- Enable RLS on both tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access (anon users can SELECT)
CREATE POLICY "categories_public_read" ON categories
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "products_public_read" ON products
  FOR SELECT TO anon, authenticated
  USING (true);

-- Authenticated users can do everything
CREATE POLICY "categories_admin_all" ON categories
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "products_admin_all" ON products
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- ─── Seed Data ────────────────────────────────────────────

-- Removed to start with a clean slate for CSV import.

