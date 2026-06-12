export interface Category {
  id: number;
  name: string;
  slug: string;
  emoji: string | null;
  description: string | null;
  display_order: number;
  banner_image: string | null;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  description: string | null;
  min_order: number;
  price_range: string | null;
  images: string; // JSON Array String
  cover_image: string | null;
  is_active: number; // 0 = taslak, 1 = aktif
  display_order: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProductWithCategory extends Omit<Product, "images"> {
  images: string[];
  category_name: string;
  category_slug: string;
  category_emoji: string | null;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  avatar: string | null;
  display_order: number;
  is_active: number; // 0 = taslak, 1 = yayında
  created_at: string;
}

