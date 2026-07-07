import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { mockCategories, mockProducts } from '@/lib/mock-data';
import type { Category, Product } from '@/types';

// Check if we're using real Supabase or mock data
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return url && !url.includes('placeholder') && !url.includes('your-project');
};

// ─── Categories ─────────────────────────────────────────

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      // Use mock data
      await new Promise((r) => setTimeout(r, 300)); // Simulate network delay
      setCategories(mockCategories);
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;
      setCategories(data || []);
    } catch (err) {
      console.error('Supabase fetchCategories error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load categories');
      // Fallback to mock data
      setCategories(mockCategories);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

// ─── Products ───────────────────────────────────────────

export function useProducts(categorySlug?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      await new Promise((r) => setTimeout(r, 300));
      let filtered = mockProducts;
      if (categorySlug) {
        const cat = mockCategories.find((c) => c.slug === categorySlug);
        if (cat) {
          filtered = mockProducts.filter((p) => p.category_id === cat.id);
        }
      }
      // Attach category data
      const withCategory = filtered.map((p) => ({
        ...p,
        category: mockCategories.find((c) => c.id === p.category_id),
      }));
      setProducts(withCategory);
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from('products')
        .select('*, category:categories(*)');

      if (categorySlug) {
        // First get the category id from the slug
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .single();

        if (catData) {
          query = query.eq('category_id', catData.id);
        }
      }

      const { data, error: fetchError } = await query.order('name');

      if (fetchError) throw fetchError;
      setProducts(data || []);
    } catch (err) {
      console.error('Supabase fetchProducts error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

// ─── Product Search ─────────────────────────────────────

export function useProductSearch(query: string) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const search = async () => {
      if (!isSupabaseConfigured()) {
        await new Promise((r) => setTimeout(r, 200));
        const q = query.toLowerCase();
        const filtered = mockProducts
          .filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.description?.toLowerCase().includes(q)
          )
          .map((p) => ({
            ...p,
            category: mockCategories.find((c) => c.id === p.category_id),
          }));
        setResults(filtered);
        setLoading(false);
        return;
      }

      try {
        const { data, error: searchError } = await supabase
          .rpc('search_products', { search_term: query });

        if (searchError) throw searchError;
        setResults(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query]);

  return { results, loading, error };
}

// ─── Single Product ─────────────────────────────────────

export function useProduct(productId: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      setError(null);

      if (!isSupabaseConfigured()) {
        await new Promise((r) => setTimeout(r, 200));
        const p = mockProducts.find((p) => p.id === productId);
        if (p) {
          setProduct({
            ...p,
            category: mockCategories.find((c) => c.id === p.category_id),
          });
        }
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*, category:categories(*)')
          .eq('id', productId)
          .single();

        if (fetchError) throw fetchError;
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [productId]);

  return { product, loading, error };
}
