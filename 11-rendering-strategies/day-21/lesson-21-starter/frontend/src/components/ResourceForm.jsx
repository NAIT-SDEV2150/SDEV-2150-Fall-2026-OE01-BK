import { Form, useNavigate } from 'react-router';
import { useState } from 'react';

export default function ResourceForm({
  initialData,
  isEditing,
  isSubmitting,
}) {
  const [formData, setFormData] = useState(initialData);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleReset() {
    if (isEditing) {
      navigate('/admin');
    } else {
      setFormData(initialData);
    }
  }

  return (
    <Form method="post" className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
          Hours
        </label>
        <input
          id="hours"
          name="hours"
          type="text"
          value={formData.hours}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
          Contact
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          value={formData.contact}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          name="virtual"
          type="checkbox"
          checked={formData.virtual}
          onChange={handleChange}
        />
        Virtual
      </label>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          name="openNow"
          type="checkbox"
          checked={formData.openNow}
          onChange={handleChange}
        />
        Open now
      </label>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          {isEditing ? 'Clear' : 'Reset'}
        </button>

        <button
          type="submit"
          className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Saving...'
            : isEditing
              ? 'Update Resource'
              : 'Add Resource'}
        </button>
      </div>
    </Form>
  );
}