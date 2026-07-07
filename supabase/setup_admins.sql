-- ============================================
-- Setup Admins & Secure RLS Policies
-- ============================================

-- 1. Create the admins table
CREATE TABLE IF NOT EXISTS admins (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Insert the authorized shop owners
INSERT INTO admins (email) VALUES 
  ('devjeetsahu03@gmail.com'),
  ('sunilsahu.cp@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- 3. Enable RLS on admins table (so random users can't read/write it)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Only admins can read the admins table (optional, but good for security)
CREATE POLICY "admins_read_own" ON admins FOR SELECT TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- ============================================
-- 4. Update Policies for Categories Table
-- ============================================

-- Drop the old overly-permissive policy
DROP POLICY IF EXISTS "categories_admin_all" ON categories;

-- Create the new secure policy (Only admins can Insert/Update/Delete)
CREATE POLICY "categories_admin_all" ON categories 
  FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'))
  WITH CHECK (EXISTS (SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'));

-- ============================================
-- 5. Update Policies for Products Table
-- ============================================

-- Drop the old overly-permissive policy
DROP POLICY IF EXISTS "products_admin_all" ON products;

-- Create the new secure policy (Only admins can Insert/Update/Delete)
CREATE POLICY "products_admin_all" ON products 
  FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'))
  WITH CHECK (EXISTS (SELECT 1 FROM admins WHERE email = auth.jwt() ->> 'email'));
