import { useState } from 'react';
import { useCategories } from '@/hooks/useData';
import { createCategory, updateCategory, deleteCategory, useToast } from '@/hooks/useAdmin';
import { CategoryIcon, availableIcons } from '@/components/shared/CategoryIcon';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { slugify } from '@/lib/utils';

export function CategoryManagement() {
  const { categories, loading, refetch } = useCategories();
  const toast = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', icon: 'package', display_order: 0 });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({ name: '', icon: 'package', display_order: 0 });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (cat: typeof categories[0]) => {
    setFormData({ name: cat.name, icon: cat.icon || 'package', display_order: cat.display_order });
    setEditingId(cat.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = slugify(formData.name);

    if (editingId) {
      const { error } = await updateCategory(editingId, {
        name: formData.name,
        slug,
        icon: formData.icon,
        display_order: formData.display_order,
      });
      if (error) {
        toast.show(error, 'error');
      } else {
        toast.show('Category updated!');
        resetForm();
        refetch();
      }
    } else {
      const { error } = await createCategory({
        name: formData.name,
        slug,
        icon: formData.icon,
        display_order: formData.display_order,
      });
      if (error) {
        toast.show(error, 'error');
      } else {
        toast.show('Category created!');
        resetForm();
        refetch();
      }
    }

    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await deleteCategory(id);
    if (error) {
      toast.show(error, 'error');
    } else {
      toast.show('Category deleted');
      refetch();
    }
    setDeletingId(null);
  };

  if (loading) return <LoadingSpinner message="Loading categories..." />;

  return (
    <div className="page-container py-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Categories
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary-500)' }}
          id="add-category-button"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-4 space-y-3 animate-fade-in"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {editingId ? 'Edit Category' : 'New Category'}
            </h3>
            <button type="button" onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>

          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
            placeholder="Category name"
            required
            className="w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
            id="category-name-input"
          />

          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-text-secondary)' }}>
              Icon
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableIcons.slice(0, 16).map((iconName) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setFormData((f) => ({ ...f, icon: iconName }))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border-2 transition-colors"
                  style={{
                    borderColor: formData.icon === iconName ? 'var(--color-primary-500)' : 'var(--color-border-light)',
                    backgroundColor: formData.icon === iconName ? 'var(--color-primary-50)' : 'transparent',
                  }}
                >
                  <CategoryIcon iconName={iconName} size={16} style={{ color: 'var(--color-text-secondary)' }} />
                </button>
              ))}
            </div>
          </div>

          <input
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData((f) => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
            placeholder="Display order"
            className="w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
            id="category-order-input"
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full h-10 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--color-primary-500)' }}
            id="category-save-button"
          >
            {saving ? 'Saving...' : (
              <>
                <Check size={16} />
                {editingId ? 'Update' : 'Create'} Category
              </>
            )}
          </button>
        </form>
      )}

      {/* Category list */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between bg-white rounded-xl p-3"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary-50)' }}
              >
                <CategoryIcon iconName={cat.icon} size={20} style={{ color: 'var(--color-primary-600)' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {cat.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Order: {cat.display_order}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(cat)}
                className="touch-target flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                style={{ color: 'var(--color-info)' }}
                aria-label={`Edit ${cat.name}`}
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                disabled={deletingId === cat.id}
                className="touch-target flex items-center justify-center p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                style={{ color: 'var(--color-error)' }}
                aria-label={`Delete ${cat.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
