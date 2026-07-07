import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { useCategories, useProducts } from '@/hooks/useData';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { ProductCard } from '@/components/shared/ProductCard';
import { CategoryGridSkeleton, ProductGridSkeleton } from '@/components/shared/LoadingSpinner';
import { ProductDetailModal } from '@/components/shared/ProductDetailModal';
import type { Product } from '@/types';

export function HomePage() {
  const { categories, loading: catLoading } = useCategories();
  const { products, loading: prodLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="page-container py-4 space-y-6 animate-fade-in">
      {/* Search bar link */}
      <Link
        to="/search"
        className="flex items-center gap-3 w-full h-11 px-4 rounded-xl border bg-white text-sm transition-colors hover:border-[var(--color-primary-300)]"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
        id="home-search-trigger"
      >
        <Search size={18} />
        <span>Search for products...</span>
      </Link>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Categories
          </h2>
          <Link
            to="/categories"
            className="text-xs font-semibold flex items-center gap-0.5 transition-colors hover:opacity-80"
            style={{ color: 'var(--color-primary-500)' }}
          >
            See all <ChevronRight size={14} />
          </Link>
        </div>
        {catLoading ? (
          <CategoryGridSkeleton />
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </section>

      {/* Products */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
            All Products
          </h2>
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
            {products.length} items
          </span>
        </div>
        {prodLoading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.filter(p => p.is_available).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* Product detail modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
