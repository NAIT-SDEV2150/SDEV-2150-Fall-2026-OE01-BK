// src/components/Filters.jsx
export default function Filters() {
  return (
    <aside className="h-full mb-4">
      <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-3">
          <strong className="text-sm text-gray-900">Filters</strong>
        </div>

        <div className="space-y-4 p-4">
          <form id="frm-filter" className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="q" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                id="q"
                type="text"
                placeholder="Try: tutoring, mental health, bursary"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-800">Category</div>
              <div className="flex flex-wrap gap-2" aria-label="Category filters">
                {['All', 'Academic', 'Wellness', 'Financial', 'Tech'].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded border border-sky-600 px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50"
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
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                Open now
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  id="virtual"
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                Virtual options
              </label>
            </div>

            <hr className="border-gray-200" />

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Filter
              </button>
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
}
