import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Category, Product } from '@/types';

// ─── Category Admin Operations ──────────────────────────

export async function createCategory(
  category: Omit<Category, 'id' | 'created_at' | 'updated_at'>
): Promise<{ data: Category | null; error: string | null }> {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();

  return {
    data: data as Category | null,
    error: error?.message ?? null,
  };
}

export async function updateCategory(
  id: string,
  updates: Partial<Omit<Category, 'id' | 'created_at'>>
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('categories')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);

  return { error: error?.message ?? null };
}

export async function deleteCategory(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  return { error: error?.message ?? null };
}

// ─── Product Admin Operations ───────────────────────────

export async function createProduct(
  product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category'>
): Promise<{ data: Product | null; error: string | null }> {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select('*, category:categories(*)')
    .single();

  return {
    data: data as Product | null,
    error: error?.message ?? null,
  };
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, 'id' | 'created_at' | 'category'>>
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);

  return { error: error?.message ?? null };
}

export async function deleteProduct(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  return { error: error?.message ?? null };
}

export async function updateProductPrice(
  id: string,
  price: number
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('products')
    .update({ price, updated_at: new Date().toISOString() })
    .eq('id', id);

  return { error: error?.message ?? null };
}

export async function toggleProductAvailability(
  id: string,
  is_available: boolean
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('products')
    .update({ is_available, updated_at: new Date().toISOString() })
    .eq('id', id);

  return { error: error?.message ?? null };
}

// Hook for simple toast-style notifications
export function useToast() {
  const show = useCallback(
    (message: string, type: 'success' | 'error' = 'success') => {
      // Create toast element
      const toast = document.createElement('div');
      toast.className = `fixed bottom-20 left-1/2 -translate-x-1/2 z-[200] px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-lg transition-all duration-300 animate-fade-in`;
      toast.style.backgroundColor =
        type === 'success' ? 'var(--color-success)' : 'var(--color-error)';
      toast.textContent = message;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 10px)';
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    },
    []
  );

  return { show };
}
