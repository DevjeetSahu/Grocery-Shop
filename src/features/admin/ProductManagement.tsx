import { useState } from 'react';
import { useProducts, useCategories } from '@/hooks/useData';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductPrice,
  toggleProductAvailability,
  useToast,
} from '@/hooks/useAdmin';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  Plus, Pencil, Trash2, X, Check, IndianRupee, Search, ToggleLeft, ToggleRight,
} from 'lucide-react';
import type { Product } from '@/types';

export function ProductManagement() {
  const { products, loading: prodLoading, refetch } = useProducts();
  const { categories } = useCategories();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Inline price editing
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editingPriceValue, setEditingPriceValue] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: '',
    quantity: '',
    is_available: true,
    description: '',
    image_url: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category_id: categories[0]?.id || '',
      price: '',
      quantity: '',
      is_available: true,
      description: '',
      image_url: '',
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      category_id: product.category_id,
      price: String(product.price),
      quantity: product.quantity,
      is_available: product.is_available,
      description: product.description || '',
      image_url: product.image_url || '',
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: formData.name,
      category_id: formData.category_id,
      price: parseFloat(formData.price),
      quantity: formData.quantity,
      is_available: formData.is_available,
      description: formData.description || null,
      image_url: formData.image_url || null,
    };

    if (editingId) {
      const { error } = await updateProduct(editingId, payload);
      if (error) {
        toast.show(error, 'error');
      } else {
        toast.show('Product updated!');
        resetForm();
        refetch();
      }
    } else {
      const { error } = await createProduct(payload);
      if (error) {
        toast.show(error, 'error');
      } else {
        toast.show('Product created!');
        resetForm();
        refetch();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setDeletingId(id);
    const { error } = await deleteProduct(id);
    if (error) {
      toast.show(error, 'error');
    } else {
      toast.show('Product deleted');
      refetch();
    }
    setDeletingId(null);
  };

  const handlePriceSave = async (id: string) => {
    const price = parseFloat(editingPriceValue);
    if (isNaN(price) || price <= 0) {
      toast.show('Invalid price', 'error');
      return;
    }
    const { error } = await updateProductPrice(id, price);
    if (error) {
      toast.show(error, 'error');
    } else {
      toast.show('Price updated!');
      refetch();
    }
    setEditingPriceId(null);
  };

  const handleToggleAvailability = async (product: Product) => {
    const { error } = await toggleProductAvailability(product.id, !product.is_available);
    if (error) {
      toast.show(error, 'error');
    } else {
      toast.show(product.is_available ? 'Marked out of stock' : 'Marked available');
      refetch();
    }
  };

  // Filter products by search
  const filteredProducts = searchQuery
    ? products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

  if (prodLoading) return <LoadingSpinner message="Loading products..." />;

  return (
    <div className="page-container py-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Products
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary-500)' }}
          id="add-product-button"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter products..."
          className="w-full h-10 pl-9 pr-4 rounded-lg border text-sm focus:outline-none focus:ring-2"
          style={{ borderColor: 'var(--color-border)' }}
          id="admin-product-search"
        />
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
              {editingId ? 'Edit Product' : 'New Product'}
            </h3>
            <button type="button" onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>

          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
            placeholder="Product name"
            required
            className="w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
            id="product-name-input"
          />

          <select
            value={formData.category_id}
            onChange={(e) => setFormData((f) => ({ ...f, category_id: e.target.value }))}
            required
            className="w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2 bg-white"
            style={{ borderColor: 'var(--color-border)' }}
            id="product-category-select"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((f) => ({ ...f, price: e.target.value }))}
              placeholder="Price (₹)"
              required
              step="0.01"
              min="0"
              className="w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--color-border)' }}
              id="product-price-input"
            />
            <input
              type="text"
              value={formData.quantity}
              onChange={(e) => setFormData((f) => ({ ...f, quantity: e.target.value }))}
              placeholder="Quantity (e.g. 100g)"
              required
              className="w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--color-border)' }}
              id="product-quantity-input"
            />
          </div>

          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
            placeholder="Description (optional)"
            className="w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
            id="product-description-input"
          />

          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData((f) => ({ ...f, image_url: e.target.value }))}
            placeholder="Image URL (optional)"
            className="w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-border)' }}
            id="product-image-input"
          />

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_available}
              onChange={(e) => setFormData((f) => ({ ...f, is_available: e.target.checked }))}
              className="w-4 h-4 rounded"
            />
            <span style={{ color: 'var(--color-text-secondary)' }}>Available in stock</span>
          </label>

          <button
            type="submit"
            disabled={saving}
            className="w-full h-10 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--color-primary-500)' }}
            id="product-save-button"
          >
            {saving ? 'Saving...' : (
              <>
                <Check size={16} />
                {editingId ? 'Update' : 'Create'} Product
              </>
            )}
          </button>
        </form>
      )}

      {/* Product list */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          message={searchQuery ? 'Try a different search term.' : 'Add your first product to get started.'}
        />
      ) : (
        <div className="space-y-2">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl p-3"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                      {product.name}
                    </p>
                    <span className={product.is_available ? 'badge-available' : 'badge-unavailable'}>
                      {product.is_available ? 'In Stock' : 'Out'}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    {product.category?.name} · {product.quantity}
                  </p>
                </div>

                {/* Price (inline edit) */}
                <div className="flex items-center gap-2 ml-3">
                  {editingPriceId === product.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={editingPriceValue}
                        onChange={(e) => setEditingPriceValue(e.target.value)}
                        className="w-20 h-8 px-2 rounded border text-sm text-right focus:outline-none focus:ring-1"
                        style={{ borderColor: 'var(--color-primary-300)' }}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handlePriceSave(product.id);
                          if (e.key === 'Escape') setEditingPriceId(null);
                        }}
                      />
                      <button
                        onClick={() => handlePriceSave(product.id)}
                        className="p-1 rounded hover:bg-green-50"
                        style={{ color: 'var(--color-success)' }}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setEditingPriceId(null)}
                        className="p-1 rounded hover:bg-gray-100"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingPriceId(product.id);
                        setEditingPriceValue(String(product.price));
                      }}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-green-50 transition-colors"
                      title="Click to edit price"
                    >
                      <span className="price-tag text-sm flex items-center gap-0.5">
                        <IndianRupee size={12} strokeWidth={2.5} />
                        {product.price}
                      </span>
                      <Pencil size={12} style={{ color: 'var(--color-text-muted)' }} />
                    </button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 mt-2 pt-2 border-t" style={{ borderColor: 'var(--color-border-light)' }}>
                <button
                  onClick={() => handleToggleAvailability(product)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
                  style={{ color: product.is_available ? 'var(--color-success)' : 'var(--color-text-muted)' }}
                >
                  {product.is_available ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  {product.is_available ? 'Available' : 'Unavailable'}
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => handleEdit(product)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors"
                  style={{ color: 'var(--color-info)' }}
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                  style={{ color: 'var(--color-error)' }}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
