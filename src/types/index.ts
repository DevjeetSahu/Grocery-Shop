export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  category_id: string;
  price: number;
  quantity: string;
  image_url: string | null;
  is_available: boolean;
  description: string | null;
  created_at: string;
  updated_at: string;
  // Joined field
  category?: Category;
}

export interface AdminProfile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}
