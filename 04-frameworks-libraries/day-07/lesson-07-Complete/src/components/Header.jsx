// src/components/Header.js
 export default function Header({tagline}) {
  //tagline = false;
  return (
    <header className="mb-4">
     <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
            <h1 className="text-xl font-semibold text-sky-500"> NAIT Resource Directory</h1>
            <p className="text-sm text-gray-500"> 
              { tagline ? tagline :  'Find student support services, lab , and campus resources'}
              </p>

        </div>
     </div>
    </header>
  )
}
