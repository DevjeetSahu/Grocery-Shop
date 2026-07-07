import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCategories, useProducts } from '@/hooks/useData';
import { Grid3X3, Package, LogOut, Tag, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { categories } = useCategories();
  const { products } = useProducts();

  const availableProducts = products.filter((p) => p.is_available).length;

  return (
    <div className="page-container py-4 space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Dashboard
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Welcome, {user?.email?.split('@')[0] || 'Admin'}
          </p>
        </div>
        <button
          onClick={signOut}
          className="touch-target flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-red-50"
          style={{ color: 'var(--color-error)' }}
          id="admin-logout-button"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Grid3X3 size={22} />}
          label="Categories"
          value={categories.length}
          color="var(--color-primary-500)"
          bgColor="var(--color-primary-50)"
        />
        <StatCard
          icon={<Package size={22} />}
          label="Products"
          value={products.length}
          color="var(--color-info)"
          bgColor="#eff6ff"
        />
        <StatCard
          icon={<TrendingUp size={22} />}
          label="Available"
          value={availableProducts}
          color="var(--color-success)"
          bgColor="#f0fdf4"
        />
        <StatCard
          icon={<Tag size={22} />}
          label="Out of Stock"
          value={products.length - availableProducts}
          color="var(--color-warning)"
          bgColor="#fffbeb"
        />
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ActionLink
            to="/admin/categories"
            icon={<Grid3X3 size={20} />}
            title="Manage Categories"
            description="Add, edit, or reorder categories"
          />
          <ActionLink
            to="/admin/products"
            icon={<Package size={20} />}
            title="Manage Products"
            description="Add, edit prices, or remove products"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}) {
  return (
    <div
      className="bg-white rounded-xl p-4 flex items-center gap-3"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: bgColor, color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          {value}
        </p>
        <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </p>
      </div>
    </div>
  );
}

function ActionLink({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-4 bg-white rounded-xl transition-all duration-200 hover:shadow-md active:scale-[0.98]"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-500)' }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </p>
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          {description}
        </p>
      </div>
    </Link>
  );
}
