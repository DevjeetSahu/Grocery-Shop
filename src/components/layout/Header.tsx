import { Link, useLocation } from 'react-router-dom';
import { Store, Shield, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
}

export function Header({ isAdmin }: HeaderProps) {
  const location = useLocation();
  const showBack = isAdmin && location.pathname !== '/admin';

  return (
    <header className="sticky top-0 z-50 safe-top" style={{ backgroundColor: 'var(--color-primary-500)' }}>
      <div className="page-container flex items-center justify-between h-14">
        {/* Left: Back button or Logo */}
        <div className="flex items-center gap-3">
          {showBack && (
            <Link
              to="/admin"
              className="touch-target flex items-center justify-center -ml-2 text-white/80 hover:text-white transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={22} />
            </Link>
          )}
          <Link to={isAdmin ? '/admin' : '/'} className="flex items-center gap-2 text-white">
            <Store size={24} strokeWidth={2.5} />
            <span className="font-bold text-lg tracking-tight">
              PriceCat
            </span>
            {isAdmin && (
              <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full ml-1">
                Admin
              </span>
            )}
          </Link>
        </div>

        {/* Right: Admin link (public) or nothing (admin) */}
        {!isAdmin && (
          <Link
            to="/admin"
            className="touch-target flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Admin dashboard"
          >
            <Shield size={20} />
          </Link>
        )}
      </div>
    </header>
  );
}
