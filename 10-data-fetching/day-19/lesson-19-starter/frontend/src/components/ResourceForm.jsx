import { useState } from 'react';

export default function ResourceForm({ initialData, isEditing, onSubmit, onReset }) {
  const [formData, setFormData] = useState(initialData);

  return (
    <form onSubmit={(e) => onSubmit(e, formData)} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium">Title</label>
        <input
          className="input input-bordered w-full"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          onClick={() => {
            setFormData(initialData);
            onReset();
          }}
        >
          Reset
        </button>

        <button type="submit" className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
          {isEditing ? 'Update Resource' : 'Add Resource'}
        </button>
      </div>
    </form>
  );
}