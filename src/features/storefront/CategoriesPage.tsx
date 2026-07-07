import { useCategories } from '@/hooks/useData';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { CategoryGridSkeleton } from '@/components/shared/LoadingSpinner';

export function CategoriesPage() {
  const { categories, loading } = useCategories();

  return (
    <div className="page-container py-4 animate-fade-in">
      <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        All Categories
      </h1>

      {loading ? (
        <CategoryGridSkeleton count={12} />
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
}
