-- ===========================================
-- Auto-generated from inventory.csv
-- ===========================================

-- 1. Insert Categories (Ignores duplicates automatically)
INSERT INTO categories (name, slug) VALUES
  ('Vegetables', 'vegetables'),
  ('Fruits', 'fruits'),
  ('Spices', 'spices'),
  ('Grains & Pulses', 'grains-pulses'),
  ('Packaged Food', 'packaged-food'),
  ('Oil & Ghee', 'oil-ghee'),
  ('Dairy & Eggs', 'dairy-eggs'),
  ('Household', 'household')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Products
INSERT INTO products (name, category_id, price, quantity, is_available, description, image_url) VALUES
  ('Aloo', (SELECT id FROM categories WHERE name = 'Vegetables'), 18, '1 kg', true, 'aalu aloo alu potato', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80'),
  ('Piyaz', (SELECT id FROM categories WHERE name = 'Vegetables'), 40, '1 kg', true, 'pyaaz piaja kanda onion', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80'),
  ('Rasuna', (SELECT id FROM categories WHERE name = 'Vegetables'), 20, '100g', true, 'lahsun rasuna garlic', 'https://images.unsplash.com/photo-1540148426946-57ac8af4528c?w=500&q=80'),
  ('Ada', (SELECT id FROM categories WHERE name = 'Vegetables'), 20, '100g', true, 'adrak ada ginger', 'https://images.unsplash.com/photo-1596365547053-469b82eb4b74?w=500&q=80'),
  ('Kadali', (SELECT id FROM categories WHERE name = 'Fruits'), 5, '1piece', true, 'kela kadali banana', 'https://images.unsplash.com/photo-1571501478200-a5d08796bc61?w=500&q=80'),
  ('Gota Lanka', (SELECT id FROM categories WHERE name = 'Spices'), 30, '100g', true, 'lal mirch whole red chilli sukha lanka', NULL),
  ('Lanka Gunda', (SELECT id FROM categories WHERE name = 'Spices'), 40, '100g', true, 'lal mirch lanka gunda red chilli powder', NULL),
  ('Gota Dhania', (SELECT id FROM categories WHERE name = 'Spices'), 20, '100g', true, 'sabut dhaniya coriander seeds whole', NULL),
  ('Dhania Powder', (SELECT id FROM categories WHERE name = 'Spices'), 35, '100g', true, 'dhaniya powder dhania gunda coriander powder', NULL),
  ('Methi', (SELECT id FROM categories WHERE name = 'Spices'), 40, '100g', true, 'methi dana fenugreek seeds', NULL),
  ('Juani', (SELECT id FROM categories WHERE name = 'Spices'), 30, '100g', true, 'ajwain carom seeds juani', NULL),
  ('Panamahuri', (SELECT id FROM categories WHERE name = 'Spices'), 20, '100g', true, 'saunf fennel seeds panamahuri mouri', NULL),
  ('Kaka Gota Jeera', (SELECT id FROM categories WHERE name = 'Spices'), 40, '100g', true, 'sabut jeera cumin seeds jira', NULL),
  ('Kaka Gota Jeera', (SELECT id FROM categories WHERE name = 'Spices'), 20, '50g', true, 'sabut jeera cumin seeds jira', NULL),
  ('Jeera Powder', (SELECT id FROM categories WHERE name = 'Spices'), 50, '100g', true, 'jeera jira cumin powder', NULL),
  ('Harada dal', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 150, '1 kg', true, 'arhar dal harada dali toor dal pigeon pea', NULL),
  ('Moong Dal', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 120, '1 kg', false, 'moong dal muga dali green gram yellow', NULL),
  ('Masoor Dal', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 80, '1 kg', true, 'masoor dal masura dali red lentil', NULL),
  ('White Gold Rice', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 35, '1kg', true, 'chawal chaula premium rice basmati', NULL),
  ('Handia Rice', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 30, '1 kg', true, 'chawal chaula handia rice boiled', NULL),
  ('Tulsi Ata', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 40, '1kg', true, 'atta ata wheat flour tulsi', NULL),
  ('Aashirvaad Ata', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 250, '5 kg', true, 'atta ata aashirvaad wheat flour', NULL),
  ('Besan', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 40, '500g', true, 'besan besana gram flour chickpea', NULL),
  ('Chana', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 80, '1kg', true, 'chana chickpeas kabuli buta', NULL),
  ('Matar', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 55, '1kg', true, 'matar dried peas matar buta green peas', NULL),
  ('Chowmein', (SELECT id FROM categories WHERE name = 'Packaged Food'), 60, '1packet', true, 'chowmein noodles hakka', NULL),
  ('China Salt', (SELECT id FROM categories WHERE name = 'Spices'), 85, '500g', true, 'ajinomoto msg tasting salt china salt', NULL),
  ('Tomato Sauce', (SELECT id FROM categories WHERE name = 'Packaged Food'), 50, '1kg', true, 'tomato sauce ketchup', NULL),
  ('Chilly Sauce', (SELECT id FROM categories WHERE name = 'Packaged Food'), 50, '700g', true, 'chilli sauce green red spicy', NULL),
  ('Soy Sauce', (SELECT id FROM categories WHERE name = 'Packaged Food'), 50, '200g', true, 'soya sauce dark soy', NULL),
  ('Vinegar', (SELECT id FROM categories WHERE name = 'Packaged Food'), 50, '700ml', true, 'vinegar sirka white', NULL),
  ('Bharat Tomato Ketchup', (SELECT id FROM categories WHERE name = 'Packaged Food'), 15, '100g', true, 'tomato ketchup pouch sachet bharat', NULL),
  ('Hati Mustard Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 185, '1l', true, 'mustard oil sarso tel sorisa tela hati', NULL),
  ('Hati Mustard Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 95, '500ml', true, 'mustard oil sarso tel sorisa tela hati', NULL),
  ('Rani Mustard Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 100, '500ml', true, 'mustard oil sarso tel sorisa tela rani', NULL),
  ('Best Choice Refined Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 60, '500ml', true, 'refined oil sunflower oil best choice', NULL),
  ('Freedom Refined Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 100, '500ml', true, 'refined oil sunflower oil freedom', NULL),
  ('Egg', (SELECT id FROM categories WHERE name = 'Dairy & Eggs'), 9, '1piece', true, 'anda egg anda', 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80'),
  ('Egg carat', (SELECT id FROM categories WHERE name = 'Dairy & Eggs'), 240, '30pieces', true, 'anda egg tray carat', NULL),
  ('Rani Mustard Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 23, '100ml', true, 'mustard oil sarso tel sorisa tela rani', NULL),
  ('Thermocol Plate', (SELECT id FROM categories WHERE name = 'Household'), 35, '1packet', true, 'thermocol plate disposable thali', NULL),
  ('Thermocol Chauti', (SELECT id FROM categories WHERE name = 'Household'), 30, '1packet', true, 'thermocol bowl disposable katori chauti', NULL),
  ('Plastic Glass', (SELECT id FROM categories WHERE name = 'Household'), 30, '1packet', true, 'plastic glass disposable cup', NULL),
  ('Nadia', (SELECT id FROM categories WHERE name = 'Fruits'), 35, '1piece', true, 'nariyal coconut nadia', 'https://images.unsplash.com/photo-1526344966-89049886b28d?w=500&q=80'),
  ('Chini', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 50, '1kg', true, 'chini sugar sakkar', NULL),
  ('Mishri Chini', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 20, '100g', true, 'mishri rock sugar', NULL),
  ('Sagu', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 10, '100g', true, 'sagu sabudana sago tapioca pearl', NULL),
  ('Palua', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 20, '100g', true, 'palua arrowroot powder', NULL),
  ('Soyabean', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 20, '150g', true, 'soyabean soya chunks bari', NULL)
ON CONFLICT (name, quantity) DO UPDATE SET price = EXCLUDED.price, is_available = EXCLUDED.is_available, description = EXCLUDED.description, image_url = EXCLUDED.image_url;
