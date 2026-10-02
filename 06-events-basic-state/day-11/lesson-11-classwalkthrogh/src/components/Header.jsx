// src/components/Header.jsx
export default function Header({ tagline }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h1 className="text-xl font-semibold text-sky-600">NAIT Resource Directory</h1>
        <p className="text-sm text-gray-500">
          {tagline ? tagline : 'Find student support services, labs, and campus resources.'}
        </p>
        {/* <button className="btn btn-soft btn-outline btn-primary">Test Button</button>
        <button className="btn btn-xs">Xsmall</button>
        <button className="btn btn-sm">Small</button>
        <button className="btn">Medium</button>
        <button className="btn btn-lg">Large</button>
        <button className="btn btn-xl">Xlarge</button> */}

      </div>
    </div>
  );
}
