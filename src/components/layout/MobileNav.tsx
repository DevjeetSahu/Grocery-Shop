import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, Search } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/categories', label: 'Categories', icon: Grid3X3 },
  { path: '/search', label: 'Search', icon: Search },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur-md"
      style={{ borderColor: 'var(--color-border)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

          return (
            <Link
              key={path}
              to={path}
              className="touch-target flex flex-col items-center justify-center gap-0.5 px-4 py-1 transition-colors"
              style={{
                color: isActive ? 'var(--color-primary-500)' : 'var(--color-text-muted)',
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
