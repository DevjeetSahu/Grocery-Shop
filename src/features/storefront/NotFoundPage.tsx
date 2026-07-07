import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="page-container flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: '#fff3e0' }}
      >
        <AlertTriangle size={28} style={{ color: 'var(--color-accent-500)' }} />
      </div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
        Page Not Found
      </h1>
      <p className="text-sm mb-6 max-w-xs" style={{ color: 'var(--color-text-secondary)' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors hover:opacity-90"
        style={{ backgroundColor: 'var(--color-primary-500)' }}
      >
        <Home size={16} />
        Go Home
      </Link>
    </div>
  );
}
