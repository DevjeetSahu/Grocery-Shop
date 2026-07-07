import type { Category, Product } from '@/types';

// Mock data for development without Supabase connection
export const mockCategories: Category[] = [
  { id: '1', name: 'Fruits', slug: 'fruits', icon: 'apple', display_order: 0, created_at: '', updated_at: '' },
  { id: '2', name: 'Vegetables', slug: 'vegetables', icon: 'carrot', display_order: 1, created_at: '', updated_at: '' },
  { id: '3', name: 'Dairy', slug: 'dairy', icon: 'milk', display_order: 2, created_at: '', updated_at: '' },
  { id: '4', name: 'Grains & Pulses', slug: 'grains-pulses', icon: 'wheat', display_order: 3, created_at: '', updated_at: '' },
  { id: '5', name: 'Beverages', slug: 'beverages', icon: 'coffee', display_order: 4, created_at: '', updated_at: '' },
  { id: '6', name: 'Snacks', slug: 'snacks', icon: 'cookie', display_order: 5, created_at: '', updated_at: '' },
  { id: '7', name: 'Spices', slug: 'spices', icon: 'flame', display_order: 6, created_at: '', updated_at: '' },
  { id: '8', name: 'Household', slug: 'household', icon: 'spray', display_order: 7, created_at: '', updated_at: '' },
];

export const mockProducts: Product[] = [
  // Fruits
  { id: 'p1', name: 'Banana (Dozen)', category_id: '1', price: 50, quantity: '1 Dozen', image_url: null, is_available: true, description: 'Fresh yellow bananas', created_at: '', updated_at: '' },
  { id: 'p2', name: 'Apple (Shimla)', category_id: '1', price: 180, quantity: '1 kg', image_url: null, is_available: true, description: 'Premium Shimla apples', created_at: '', updated_at: '' },
  { id: 'p3', name: 'Mango (Alphonso)', category_id: '1', price: 350, quantity: '1 kg', image_url: null, is_available: true, description: 'Ratnagiri Alphonso', created_at: '', updated_at: '' },
  { id: 'p4', name: 'Grapes (Green)', category_id: '1', price: 120, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p5', name: 'Papaya', category_id: '1', price: 40, quantity: '1 piece', image_url: null, is_available: false, description: null, created_at: '', updated_at: '' },

  // Vegetables
  { id: 'p6', name: 'Tomato', category_id: '2', price: 30, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p7', name: 'Onion', category_id: '2', price: 35, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p8', name: 'Potato', category_id: '2', price: 25, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p9', name: 'Green Chilli', category_id: '2', price: 60, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p10', name: 'Capsicum', category_id: '2', price: 80, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },

  // Dairy
  { id: 'p11', name: 'Amul Toned Milk', category_id: '3', price: 28, quantity: '500ml', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p12', name: 'Amul Butter (100g)', category_id: '3', price: 56, quantity: '100g', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p13', name: 'Paneer (Fresh)', category_id: '3', price: 320, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p14', name: 'Curd (400g)', category_id: '3', price: 35, quantity: '400g', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },

  // Grains
  { id: 'p15', name: 'Basmati Rice', category_id: '4', price: 85, quantity: '1 kg', image_url: null, is_available: true, description: '1121 Basmati', created_at: '', updated_at: '' },
  { id: 'p16', name: 'Toor Dal', category_id: '4', price: 140, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p17', name: 'Wheat Flour (Atta)', category_id: '4', price: 45, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },

  // Beverages
  { id: 'p18', name: 'Tata Tea Gold (250g)', category_id: '5', price: 130, quantity: '250g', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p19', name: 'Nescafe Classic (50g)', category_id: '5', price: 165, quantity: '50g', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },

  // Snacks
  { id: 'p20', name: 'Lays Classic (52g)', category_id: '6', price: 20, quantity: '52g', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p21', name: 'Parle-G (250g)', category_id: '6', price: 25, quantity: '250g', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p22', name: 'Haldiram Namkeen (200g)', category_id: '6', price: 55, quantity: '200g', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },

  // Spices
  { id: 'p23', name: 'Red Chilli Powder', category_id: '7', price: 220, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p24', name: 'Turmeric Powder', category_id: '7', price: 180, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p25', name: 'Garam Masala', category_id: '7', price: 75, quantity: '100g', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p28', name: 'Chicken Masala', category_id: '7', price: 40, quantity: '50g', image_url: null, is_available: true, description: 'Authentic spice blend', created_at: '', updated_at: '' },
  { id: 'p29', name: 'Chicken Masala', category_id: '7', price: 75, quantity: '100g', image_url: null, is_available: true, description: 'Authentic spice blend', created_at: '', updated_at: '' },

  // Household
  { id: 'p26', name: 'Vim Dishwash Bar', category_id: '8', price: 30, quantity: '1 piece', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
  { id: 'p27', name: 'Surf Excel (1kg)', category_id: '8', price: 195, quantity: '1 kg', image_url: null, is_available: true, description: null, created_at: '', updated_at: '' },
];
