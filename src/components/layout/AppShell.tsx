import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { MobileNav } from './MobileNav';

export function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--color-surface-secondary)]">
      <Header isAdmin={isAdminRoute} />
      <main className="flex-1 has-bottom-nav">
        <Outlet />
      </main>
      {!isAdminRoute && <MobileNav />}
    </div>
  );
}
