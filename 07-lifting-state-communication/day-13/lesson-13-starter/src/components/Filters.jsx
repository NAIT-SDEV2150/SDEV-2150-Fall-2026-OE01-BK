import { useState } from 'react';
import Card from './ui/Card';

export default function Filters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openNowOnly, setOpenNowOnly] = useState(false);

  function toggleCategory(category) {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }

      return [...prev, category];
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Filters submitted');
  }

  return (
    <Card title="Filters">
      <div className="space-y-4 p-4">
        <form onSubmit={handleSubmit} id="frm-filter" className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <input
              id="q"
              type="text"
              placeholder="Try: tutoring, mental health, bursary"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
          {/* <p className="text-sm text-base-content/70">
            Searching for: {searchTerm}
          </p> */}

          <hr className="border-gray-200" />

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">Category</div>
            <div className="flex flex-wrap gap-2" aria-label="Category filters">
              {['All', 'Academic', 'Wellness', 'Financial', 'Tech'].map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`${selectedCategories.includes(label) && 'bg-sky-600 text-white'} rounded border border-sky-600 px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50 hover:text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-200`}
                  onClick={() => toggleCategory(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                id="openNow"
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600 accent-sky-600"
                checked={openNowOnly}
                onChange={(e) => setOpenNowOnly(e.target.checked)}
              />
              Open now
            </label>

            {/* Have students implement state for this checkbox */}
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                id="virtual"
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600 accent-sky-600"
              />
              Virtual options
            </label>
          </div>

          <hr className="border-gray-200" />

          <div className="flex gap-2">
            <button
              type="button"
              className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              // First student exercise solution
              onClick={() => {
                setSearchTerm('');
                setSelectedCategories([]);
                setOpenNowOnly(false);
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Filter
            </button>
            {/* <p className="text-sm">
              Open now only: {openNowOnly ? 'Yes' : 'No'}
            </p> */}
          </div>
        </form>
      </div>
    </Card >
  );
}
