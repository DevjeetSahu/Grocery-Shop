-- ============================================
-- Migration: Replace 'unit' with 'quantity'
-- ============================================

-- 1. Rename the 'unit' column to 'quantity'
ALTER TABLE products RENAME COLUMN unit TO quantity;

-- 2. Add the unique constraint for name + quantity
ALTER TABLE products ADD CONSTRAINT unique_product_name_quantity UNIQUE (name, quantity);

-- (Optional) If you want to update the existing data in the database from e.g. "per kg" to "1 kg":
-- UPDATE products SET quantity = '1 kg' WHERE quantity = 'per kg';
-- UPDATE products SET quantity = '100g' WHERE quantity = 'per pack' AND name LIKE '%Masala%';
