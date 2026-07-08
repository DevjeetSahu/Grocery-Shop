import { useEffect, useCallback } from 'react';
import { X, IndianRupee, Tag, Package, Info } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [handleEscape]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Product details: ${product.name}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden animate-fade-in"
        style={{ boxShadow: 'var(--shadow-lg)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
          aria-label="Close"
        >
          <X size={18} style={{ color: 'var(--color-text-secondary)' }} />
        </button>

        {/* Product icon area / Hero Image */}
        <div
          className="w-full h-48 sm:h-56 flex items-center justify-center overflow-hidden relative"
          style={{ backgroundColor: 'var(--color-surface-secondary)' }}
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('fallback-icon-modal');
              }}
            />
          ) : (
            <Package size={64} style={{ color: 'var(--color-text-muted)' }} />
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Name & availability */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                {product.name}
              </h2>
              <span className={product.is_available ? 'badge-available' : 'badge-unavailable'}>
                {product.is_available ? 'Available' : 'Out of stock'}
              </span>
            </div>

            {product.category && (
              <p className="text-sm mt-1 flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                <Tag size={13} />
                {product.category.name}
              </p>
            )}
          </div>

          {/* Price */}
          <div
            className="flex items-center gap-3 p-4 rounded-xl"
            style={{ backgroundColor: 'var(--color-primary-50)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary-100)' }}
            >
              <IndianRupee size={20} style={{ color: 'var(--color-primary-700)' }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-primary-700)' }}>
                {formatPrice(product.price)}
              </p>
              <span className="text-sm font-medium" style={{ color: 'var(--color-primary-600)' }}>
                {product.quantity}
              </span>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <Info size={16} className="mt-0.5 shrink-0" />
              <p>{product.description}</p>
            </div>
          )}
        </div>

        {/* Safe area padding for mobile */}
        <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }} />
      </div>
    </div>
  );
}
