import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useProducts, useCategories } from '@/hooks/useData';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProductGridSkeleton } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { ProductDetailModal } from '@/components/shared/ProductDetailModal';
import type { Product } from '@/types';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading } = useProducts(slug);
  const { categories } = useCategories();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const category = categories.find((c) => c.slug === slug);

  return (
    <div className="page-container py-4 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4">
        <Link
          to="/"
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: 'var(--color-primary-500)' }}
        >
          <ChevronLeft size={16} />
          Back
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        {category?.name || 'Category'}
      </h1>

      {/* Products */}
      {loading ? (
        <ProductGridSkeleton />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products yet"
          message="This category doesn't have any products."
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
