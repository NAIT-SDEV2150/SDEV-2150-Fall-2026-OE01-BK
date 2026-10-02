export default function PageLayout({ header, children }) { //({ header, left, middle, right }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-sky-600 bg-white px-6 py-4">
        {header}
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3">
        {children}
      </main>

      {/* <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3">
        <aside>{left}</aside>
        <section className="md:col-span-2">{middle}</section>
        <aside>{right}</aside>
      </main> */}
    </div>
  );
}

// Sample solution for the student layout variant exercise
/*
export default function PageLayout({ header, layout = 'standard', children }) {
  const layoutClasses = {
    standard:
      'grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6',
    wide:
      'grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4">
        {header}
      </header>

      <main
        className={`mx-auto max-w-7xl px-6 py-6 ${
          layoutClasses[layout]
        }`}
      >
        {children}
      </main>
    </div>
  );
}*/