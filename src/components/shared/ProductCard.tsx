import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Package, IndianRupee } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <button
      onClick={() => onSelect?.(product)}
      className="group w-full text-left bg-white rounded-xl transition-all duration-200 hover:shadow-md active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] overflow-hidden flex flex-col"
      style={{ boxShadow: 'var(--shadow-card)' }}
      aria-label={`${product.name}, ${formatPrice(product.price)} for ${product.quantity}`}
    >
      {/* Product Image or Placeholder */}
      <div
        className="w-full aspect-square flex items-center justify-center overflow-hidden shrink-0"
        style={{ backgroundColor: 'var(--color-surface-secondary)' }}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('fallback-icon');
            }}
          />
        ) : (
          <Package
            size={32}
            style={{ color: 'var(--color-text-muted)' }}
            className="group-hover:scale-110 transition-transform duration-200 fallback-icon-svg"
          />
        )}
      </div>

      {/* Product info */}
      <div className="p-3 space-y-1 flex-1 flex flex-col justify-between w-full">
        <div>
          <h3
            className="text-sm font-semibold leading-tight line-clamp-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {product.name}
          </h3>

          <p className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
            {product.quantity}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="price-tag text-base flex items-center">
            <IndianRupee size={14} strokeWidth={2.5} className="mr-0.5" />
            {product.price}
          </span>

          {!product.is_available && (
            <span className="badge-unavailable">Out</span>
          )}
        </div>
      </div>
    </button>
  );
}
