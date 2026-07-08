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
  ('Gota Lanka', (SELECT id FROM categories WHERE name = 'Spices'), 30, '100g', true, 'lal mirch whole red chilli sukha lanka', 'https://images.unsplash.com/photo-1596647970725-728b2a3a5a75?w=500&q=80'),
  ('Lanka Gunda', (SELECT id FROM categories WHERE name = 'Spices'), 40, '100g', true, 'lal mirch lanka gunda red chilli powder', 'https://images.unsplash.com/photo-1596647895246-88c774620625?w=500&q=80'),
  ('Gota Dhania', (SELECT id FROM categories WHERE name = 'Spices'), 20, '100g', true, 'sabut dhaniya coriander seeds whole', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80'),
  ('Dhania Powder', (SELECT id FROM categories WHERE name = 'Spices'), 35, '100g', true, 'dhaniya powder dhania gunda coriander powder', 'https://plus.unsplash.com/premium_photo-1675237625695-1f91b7d5ee82?w=500&q=80'),
  ('Methi', (SELECT id FROM categories WHERE name = 'Spices'), 40, '100g', true, 'methi dana fenugreek seeds', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80'),
  ('Juani', (SELECT id FROM categories WHERE name = 'Spices'), 30, '100g', true, 'ajwain carom seeds juani', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80'),
  ('Panamahuri', (SELECT id FROM categories WHERE name = 'Spices'), 20, '100g', true, 'saunf fennel seeds panamahuri mouri', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80'),
  ('Kaka Gota Jeera', (SELECT id FROM categories WHERE name = 'Spices'), 40, '100g', true, 'sabut jeera cumin seeds jira', 'https://plus.unsplash.com/premium_photo-1667057077555-5206de617ca1?w=500&q=80'),
  ('Kaka Gota Jeera', (SELECT id FROM categories WHERE name = 'Spices'), 20, '50g', true, 'sabut jeera cumin seeds jira', 'https://plus.unsplash.com/premium_photo-1667057077555-5206de617ca1?w=500&q=80'),
  ('Jeera Powder', (SELECT id FROM categories WHERE name = 'Spices'), 50, '100g', true, 'jeera jira cumin powder', 'https://plus.unsplash.com/premium_photo-1675237625695-1f91b7d5ee82?w=500&q=80'),
  ('Harada dal', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 150, '1 kg', true, 'arhar dal harada dali toor dal pigeon pea', 'https://images.unsplash.com/photo-1585996884085-0551062b083c?w=500&q=80'),
  ('Moong Dal', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 120, '1 kg', false, 'moong dal muga dali green gram yellow', 'https://images.unsplash.com/photo-1615486171448-4dfcbdb40307?w=500&q=80'),
  ('Masoor Dal', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 80, '1 kg', true, 'masoor dal masura dali red lentil', 'https://images.unsplash.com/photo-1585996884085-0551062b083c?w=500&q=80'),
  ('White Gold Rice', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 35, '1kg', true, 'chawal chaula premium rice basmati', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80'),
  ('Handia Rice', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 30, '1 kg', true, 'chawal chaula handia rice boiled', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80'),
  ('Tulsi Ata', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 40, '1kg', true, 'atta ata wheat flour tulsi', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80'),
  ('Aashirvaad Ata', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 250, '5 kg', true, 'atta ata aashirvaad wheat flour', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80'),
  ('Besan', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 40, '500g', true, 'besan besana gram flour chickpea', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80'),
  ('Chana', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 80, '1kg', true, 'chana chickpeas kabuli buta', 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=500&q=80'),
  ('Matar', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 55, '1kg', true, 'matar dried peas matar buta green peas', 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=500&q=80'),
  ('Chowmein', (SELECT id FROM categories WHERE name = 'Packaged Food'), 60, '1packet', true, 'chowmein noodles hakka', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80'),
  ('China Salt', (SELECT id FROM categories WHERE name = 'Spices'), 85, '500g', true, 'ajinomoto msg tasting salt china salt', 'https://images.unsplash.com/photo-1615486511484-92e172cb4efa?w=500&q=80'),
  ('Tomato Sauce', (SELECT id FROM categories WHERE name = 'Packaged Food'), 50, '1kg', true, 'tomato sauce ketchup', 'https://plus.unsplash.com/premium_photo-1664301524345-90a694774519?w=500&q=80'),
  ('Chilly Sauce', (SELECT id FROM categories WHERE name = 'Packaged Food'), 50, '700g', true, 'chilli sauce green red spicy', 'https://images.unsplash.com/photo-1584852033621-03099908cf67?w=500&q=80'),
  ('Soy Sauce', (SELECT id FROM categories WHERE name = 'Packaged Food'), 50, '200g', true, 'soya sauce dark soy', 'https://images.unsplash.com/photo-1584852033621-03099908cf67?w=500&q=80'),
  ('Vinegar', (SELECT id FROM categories WHERE name = 'Packaged Food'), 50, '700ml', true, 'vinegar sirka white', 'https://images.unsplash.com/photo-1607593226490-349f87c1264c?w=500&q=80'),
  ('Bharat Tomato Ketchup', (SELECT id FROM categories WHERE name = 'Packaged Food'), 15, '100g', true, 'tomato ketchup pouch sachet bharat', 'https://plus.unsplash.com/premium_photo-1664301524345-90a694774519?w=500&q=80'),
  ('Hati Mustard Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 185, '1l', true, 'mustard oil sarso tel sorisa tela hati', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80'),
  ('Hati Mustard Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 95, '500ml', true, 'mustard oil sarso tel sorisa tela hati', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80'),
  ('Rani Mustard Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 100, '500ml', true, 'mustard oil sarso tel sorisa tela rani', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80'),
  ('Best Choice Refined Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 60, '500ml', true, 'refined oil sunflower oil best choice', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80'),
  ('Freedom Refined Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 100, '500ml', true, 'refined oil sunflower oil freedom', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80'),
  ('Egg', (SELECT id FROM categories WHERE name = 'Dairy & Eggs'), 9, '1piece', true, 'anda egg anda', 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80'),
  ('Egg carat', (SELECT id FROM categories WHERE name = 'Dairy & Eggs'), 240, '30pieces', true, 'anda egg tray carat', 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&q=80'),
  ('Rani Mustard Oil', (SELECT id FROM categories WHERE name = 'Oil & Ghee'), 23, '100ml', true, 'mustard oil sarso tel sorisa tela rani', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80'),
  ('Thermocol Plate', (SELECT id FROM categories WHERE name = 'Household'), 35, '1packet', true, 'thermocol plate disposable thali', 'https://images.unsplash.com/photo-1616421455524-749e0b8e62f5?w=500&q=80'),
  ('Thermocol Chauti', (SELECT id FROM categories WHERE name = 'Household'), 30, '1packet', true, 'thermocol bowl disposable katori chauti', 'https://images.unsplash.com/photo-1616421455524-749e0b8e62f5?w=500&q=80'),
  ('Plastic Glass', (SELECT id FROM categories WHERE name = 'Household'), 30, '1packet', true, 'plastic glass disposable cup', 'https://images.unsplash.com/photo-1590457632943-346765790479?w=500&q=80'),
  ('Nadia', (SELECT id FROM categories WHERE name = 'Fruits'), 35, '1piece', true, 'nariyal coconut nadia', 'https://images.unsplash.com/photo-1526344966-89049886b28d?w=500&q=80'),
  ('Chini', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 50, '1kg', true, 'chini sugar sakkar', 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&q=80'),
  ('Mishri Chini', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 20, '100g', true, 'mishri rock sugar', 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&q=80'),
  ('Sagu', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 10, '100g', true, 'sagu sabudana sago tapioca pearl', 'https://plus.unsplash.com/premium_photo-1675237625695-1f91b7d5ee82?w=500&q=80'),
  ('Palua', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 20, '100g', true, 'palua arrowroot powder', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80'),
  ('Soyabean', (SELECT id FROM categories WHERE name = 'Grains & Pulses'), 20, '150g', true, 'soyabean soya chunks bari', 'https://images.unsplash.com/photo-1585996884085-0551062b083c?w=500&q=80')
ON CONFLICT (name, quantity) DO UPDATE SET price = EXCLUDED.price, is_available = EXCLUDED.is_available, description = EXCLUDED.description, image_url = EXCLUDED.image_url;
