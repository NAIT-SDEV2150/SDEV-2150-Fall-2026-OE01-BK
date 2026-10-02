export default function ResultsItem({ title, category, summary, location, children }) {
  return (
    <li className="px-4 py-3 text-gray-900 hover:bg-gray-50">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {children}
          <small className="text-xs text-gray-500">{category}</small>
        </div>
      </div>

      <p className="mt-1 text-xs text-gray-500">{summary}</p>

      <small className="mt-1 block text-xs text-gray-500">{location}</small>
    </li>
  );
}
