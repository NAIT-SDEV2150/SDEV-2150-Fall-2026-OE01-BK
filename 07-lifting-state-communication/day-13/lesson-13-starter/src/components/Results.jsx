import { useState } from 'react';

import ResultsItem from './ResultsItem';
import { resources } from '../data/resources';
import Card from './ui/Card';

export default function Results() {
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <Card title="Results">
      <ul className="divide-y divide-gray-200">
        {resources.map((r) => (
          <ResultsItem
            key={r.id}
            title={r.title}
            category={r.category}
            summary={r.summary}
            location={r.location}
            onClick={() => setSelectedResource(r)}
            selected={selectedResource?.id === r.id}
          >
            {/* children: optional badge content */}
            {r.openNow && (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                Open now
              </span>
            )}
          </ResultsItem>
        ))}
      </ul>
    </Card >
  );
}