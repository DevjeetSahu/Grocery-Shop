import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'Nothing found',
  message = 'Try adjusting your search or browse categories.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--color-surface-secondary)' }}
      >
        {icon || <SearchX size={28} style={{ color: 'var(--color-text-muted)' }} />}
      </div>
      <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: 'var(--color-text-secondary)' }}>
        {message}
      </p>
    </div>
  );
}
