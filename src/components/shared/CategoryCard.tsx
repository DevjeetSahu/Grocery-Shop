import { Link } from 'react-router-dom';
import type { Category } from '@/types';
import { CategoryIcon } from './CategoryIcon';

interface CategoryCardProps {
  category: Category;
}

// Pastel background colors for categories
const bgColors = [
  '#e8f5e9', '#e3f2fd', '#fff3e0', '#fce4ec',
  '#f3e5f5', '#e0f7fa', '#fff8e1', '#f1f8e9',
  '#e8eaf6', '#fbe9e7', '#e0f2f1', '#ede7f6',
];

export function CategoryCard({ category }: CategoryCardProps) {
  const bgColor = bgColors[category.display_order % bgColors.length];

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/60 group-hover:bg-white/80 transition-colors">
        <CategoryIcon
          iconName={category.icon}
          size={24}
          style={{ color: 'var(--color-primary-600)' }}
        />
      </div>
      <span className="text-xs font-semibold text-center leading-tight" style={{ color: 'var(--color-text-primary)' }}>
        {category.name}
      </span>
    </Link>
  );
}
