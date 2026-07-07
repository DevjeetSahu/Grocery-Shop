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
      className="group w-full text-left bg-white rounded-xl p-3 transition-all duration-200 hover:shadow-md active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
      style={{ boxShadow: 'var(--shadow-card)' }}
      aria-label={`${product.name}, ${formatPrice(product.price)} for ${product.quantity}`}
    >
      {/* Icon placeholder */}
      <div
        className="w-full aspect-square rounded-lg mb-2 flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-surface-secondary)' }}
      >
        <Package
          size={32}
          style={{ color: 'var(--color-text-muted)' }}
          className="group-hover:scale-110 transition-transform duration-200"
        />
      </div>

      {/* Product info */}
      <div className="space-y-1">
        <h3
          className="text-sm font-semibold leading-tight line-clamp-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {product.name}
        </h3>

        <p className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
          {product.quantity}
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="price-tag text-base flex items-center gap-0.5">
            <IndianRupee size={14} strokeWidth={2.5} />
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
