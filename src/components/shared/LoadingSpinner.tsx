interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div
        className={`${sizeMap[size]} rounded-full border-2 border-t-transparent animate-spin`}
        style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-primary-500)' }}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {message}
        </p>
      )}
    </div>
  );
}

// Skeleton cards for loading states
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-3" style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="skeleton w-full aspect-square rounded-lg mb-2" />
      <div className="space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-5 w-1/3 rounded mt-1" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-xl" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
      <div className="skeleton w-12 h-12 rounded-full" />
      <div className="skeleton h-3 w-14 rounded" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  );
}
