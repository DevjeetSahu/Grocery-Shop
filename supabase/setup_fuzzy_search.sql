-- ============================================
-- Setup Fuzzy Search using pg_trgm
-- ============================================

-- Ensure the trigram extension is enabled
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create an index on the description column to speed up text searches (name is already indexed)
CREATE INDEX IF NOT EXISTS idx_products_description ON products USING gin(description gin_trgm_ops);

-- Create the RPC function that the frontend will call
CREATE OR REPLACE FUNCTION search_products(search_term text)
RETURNS TABLE (
  id uuid,
  name text,
  category_id uuid,
  price numeric,
  quantity text,
  image_url text,
  is_available boolean,
  description text,
  created_at timestamptz,
  updated_at timestamptz,
  category json
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id, 
    p.name, 
    p.category_id, 
    p.price, 
    p.quantity, 
    p.image_url, 
    p.is_available, 
    p.description, 
    p.created_at, 
    p.updated_at,
    -- Build the nested category object exactly how the frontend expects it
    json_build_object(
      'id', c.id,
      'name', c.name,
      'slug', c.slug,
      'icon', c.icon,
      'display_order', c.display_order
    ) as category
  FROM products p
  JOIN categories c ON c.id = p.category_id
  WHERE
    -- Exact or partial match (fastest)
    p.name ILIKE '%' || search_term || '%' OR
    p.description ILIKE '%' || search_term || '%' OR
    -- Fuzzy match for spelling mistakes (e.g. pyaz -> pyaaz)
    word_similarity(search_term, p.name) > 0.2 OR
    word_similarity(search_term, p.description) > 0.2
  ORDER BY
    -- Rank exact matches highest, then fuzzy matches
    GREATEST(
      CASE WHEN p.name ILIKE '%' || search_term || '%' THEN 1 ELSE 0 END,
      CASE WHEN p.description ILIKE '%' || search_term || '%' THEN 0.9 ELSE 0 END,
      word_similarity(search_term, p.name),
      word_similarity(search_term, p.description)
    ) DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;
