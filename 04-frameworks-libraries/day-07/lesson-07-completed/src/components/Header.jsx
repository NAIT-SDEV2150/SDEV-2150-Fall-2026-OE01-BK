export default function Header({tagline}) {
  // tagline = true;
  return (
    <header className="mb-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-sky-600">NAIT Resource Directory</h1>
          <p className="text-sm text-gray-500">
            {/* Conditional rendering with or (||) operator */}
            {tagline ? tagline : 'Find student support services, labs, and campus resources.'}
          </p>
        </div>
      </div>
    </header>
  );
}