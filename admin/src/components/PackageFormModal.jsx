import { useEffect, useState } from "react";

export function PackageFormModal({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    bestFor: "",
    popular: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        features: initialData.features.join(", "),
      });
    }
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = () => {
    onSave({
      ...form,
      features: form.features.split(",").map(f => f.trim()),
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            {initialData ? "Edit Package" : "Add New Package"}
          </h3>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Package name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="text"
              placeholder="Package price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Brief description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            <textarea
              placeholder="Feature 1, Feature 2, Feature 3"
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm min-h-[80px] resize-y"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate features with commas
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Best For
            </label>
            <input
              type="text"
              placeholder="Package name"
              value={form.bestFor}
              onChange={(e) => setForm({ ...form, bestFor: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="popular"
              checked={form.popular}
              onChange={(e) => setForm({ ...form, popular: e.target.checked })}
              className="h-4 w-4 text-gray-600 border-gray-300 rounded"
            />
            <label htmlFor="popular" className="ml-2 text-sm text-gray-700">
              Mark as popular package
            </label>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}