-- ===========================================
-- Auto-generated from inventory.csv
-- ===========================================

-- 1. Insert Categories (Ignores duplicates automatically)
INSERT INTO categories (name, slug) VALUES
  ('Vegetables', 'vegetables'),
  ('Fruits', 'fruits'),
  ('Spices', 'spices'),
  ('Grains & Pulses', 'grains-pulses')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Products
INSERT INTO products (name, category_id, price, quantity, is_available, description) VALUES
  ('Potato', (SELECT id FROM categories WHERE name = 'Vegetables'), 18, '1 kg', true, 'aalu aloo alu'),
  ('Onion', (SELECT id FROM categories WHERE name = 'Vegetables'), 40, '1 kg', true, 'pyaaz piaja kanda'),
  ('Garlic', (SELECT id FROM categories WHERE name = 'Vegetables'), 200, '1 kg', true, 'lahsun rasuna'),
  ('Ginger', (SELECT id FROM categories WHERE name = 'Vegetables'), 150, '1 kg', true, 'adrak ada'),
  ('Banana', (SELECT id FROM categories WHERE name = 'Fruits'), 50, '1 dozen', true, 'kela kadali'),
  ('Red Chilli Powder', (SELECT id FROM categories WHERE name = 'Spices'), 40, '100g', true, 'lal mirch lanka gunda'),
  ('Coriander Powder', (SELECT id FROM categories WHERE name = 'Spices'), 35, '100g', true, 'dhaniya powder dhania gunda'),
  ('Cumin Seeds', (SELECT id FROM categories WHERE name = 'Spices'), 50, '100g', true, 'jeera jira'),
  ('Mustard Seeds', (SELECT id FROM categories WHERE name = 'Spices'), 20, '100g', true, 'sarson sorisha'),
  ('Black Pepper', (SELECT id FROM categories WHERE name = 'Spices'), 80, '100g', true, 'kali mirch gol maricha'),
  ('Garam Masala', (SELECT id FROM categories WHERE name = 'Spices'), 60, '100g', true, 'garam masala'),
  ('Cardamom', (SELECT id FROM categories WHERE name = 'Spices'), 150, '50g', true, 'elaichi alaicha'),
  ('Cloves', (SELECT id FROM categories WHERE name = 'Spices'), 120, '50g', true, 'laung labanga'),
  ('Cinnamon', (SELECT id FROM categories WHERE name = 'Spices'), 80, '50g', true, 'dalchini dalchini'),
  ('Toor Dal', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 150, '1 kg', true, 'arhar dal harada dali'),
  ('Moong Dal', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 120, '1 kg', true, 'moong dal muga dali'),
  ('Chana Dal', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 90, '1 kg', true, 'chana dal buta dali'),
  ('Masoor Dal', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 100, '1 kg', true, 'masoor dal masura dali'),
  ('Rice', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 60, '1 kg', true, 'chawal chaula'),
  ('Wheat Flour', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 40, '1 kg', true, 'atta ata'),
  ('Besan', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 80, '1 kg', true, 'besan besana')
ON CONFLICT (name, quantity) DO UPDATE SET price = EXCLUDED.price, is_available = EXCLUDED.is_available, description = EXCLUDED.description;
