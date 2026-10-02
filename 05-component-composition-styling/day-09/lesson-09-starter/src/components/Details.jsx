// src/components/Details.jsx
export default function Details() {
  return (
    <section className="h-full">
      <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-3">
          <strong className="text-sm text-gray-900">Details</strong>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Peer Tutoring Centre</h2>
            <p className="text-sm text-gray-500">Drop-in tutoring and study support.</p>
          </div>

          <dl className="grid grid-cols-12 gap-y-2 text-sm">
            <dt className="col-span-4 font-semibold text-gray-700">Category</dt>
            <dd className="col-span-8 text-gray-600">Academic</dd>

            <dt className="col-span-4 font-semibold text-gray-700">Location</dt>
            <dd className="col-span-8 text-gray-600">Building W, Room W101</dd>

            <dt className="col-span-4 font-semibold text-gray-700">Hours</dt>
            <dd className="col-span-8 text-gray-600">Mon-Thu 10:00-16:00</dd>

            <dt className="col-span-4 font-semibold text-gray-700">Contact</dt>
            <dd className="col-span-8 text-gray-600">tutoring@nait.ca</dd>
          </dl>
        </div>

        <div className="flex gap-2 border-t border-gray-200 px-4 py-3">
          <button
            type="button"
            className="rounded border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Copy email
          </button>
          <button
            type="button"
            className="rounded border border-blue-600 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Open map
          </button>
        </div>
      </div>
    </section>
  );
}
