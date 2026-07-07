import { useState } from 'react';
import { useProductSearch } from '@/hooks/useData';
import { SearchBar } from '@/components/shared/SearchBar';
import { ProductCard } from '@/components/shared/ProductCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ProductGridSkeleton } from '@/components/shared/LoadingSpinner';
import { ProductDetailModal } from '@/components/shared/ProductDetailModal';
import { Search } from 'lucide-react';
import type { Product } from '@/types';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const { results, loading } = useProductSearch(query);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="page-container py-4 animate-fade-in">
      <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        Search
      </h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search products by name..."
        autoFocus
      />

      <div className="mt-4">
        {!query.trim() ? (
          <EmptyState
            title="Search for a product"
            message="Type a product name to find its price instantly."
            icon={<Search size={28} style={{ color: 'var(--color-primary-400)' }} />}
          />
        ) : loading ? (
          <ProductGridSkeleton count={4} />
        ) : results.length === 0 ? (
          <EmptyState
            title="No results found"
            message={`We couldn't find products matching "${query}".`}
          />
        ) : (
          <>
            <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-text-muted)' }}>
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
